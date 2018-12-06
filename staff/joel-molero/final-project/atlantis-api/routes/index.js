const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')
//const io = require('socket.io')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process

router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.registerUser(username, password)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
    }, res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.post('/messages', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { message } = req.body
        
        return logic.postMessage(message)
            .then(() => {
                res.status(201)

                res.json({
                    message: `message successfully posted`
                })
            })
    }, res)
})

router.get('/messages', (req, res) => {
    routeHandler(() => {
        
        return logic.getMessages()
            .then(messages => {
                debugger
                res.json({
                    data: messages
                })
                
            })
    }, res)
})

//io.on('connection', () => {
//   console.log('a user is connected')
//})


module.exports = router