const mongoose = require('mongoose')
const { User, Postit } = require('../data')
const logic = require('.')
const { AlreadyExistsError, ValueError } = require('../errors')
const fs = require('fs-extra')
const path = require('path')
const hasha = require('hasha')
const streamToArray = require('stream-to-array')
const text2png = require('text2png')

const { expect } = require('chai')

const MONGO_URL = 'mongodb://localhost:27017/global-chat-test'

describe('logic', () => {
    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }))

    beforeEach(() => Promise.all(User.deleteMany()))

    describe('user', () => {
        describe('register', () => {
            let username, password

            beforeEach(() => {
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', async () => {
                const res = await logic.registerUser(username, password)

                expect(res).to.be.undefined

                const users = await User.find()

                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.id).to.be.a('string')
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.registerUser(undefined, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty username', () => {
                expect(() => logic.registerUser('', password)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on blank username', () => {
                expect(() => logic.registerUser('   \t\n', password)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on undefined password', () => {
                expect(() => logic.registerUser(username, undefined)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty password', () => {
                expect(() => logic.registerUser(username, '')).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on blank password', () => {
                expect(() => logic.registerUser(username, '   \t\n')).to.throw(ValueError, 'name is empty or blank')
            })

        })

        describe('authenticate', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                return user.save()
            })

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                const users = await User.find()

                const [_user] = users

                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty username', () => {
                expect(() => logic.authenticateUser('', user.password)).to.throw(TypeError, 'empty is not a string')
            })

            it('should fail on blank username', () => {
                expect(() => logic.authenticateUser('   \t\n', user.password)).to.throw(TypeError, 'blank is not a string')
            })

            
        })

        describe('retrieve', () => {
            let user

            beforeEach(async () => {
                user = new User({username: 'userneim', password: '123' })

                await user.save()
            })

            it('should succeed on valid id', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user).not.to.be.instanceof(User)

                const { username, password } = _user

                expect(username).to.equal(user.username)
                expect(password).to.be.undefined
            })
        })
    })
})