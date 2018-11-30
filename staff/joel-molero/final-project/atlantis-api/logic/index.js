const { User, Message } = require('../data')
const { AlreadyExistsError, AuthError, NotAllowedError, NotFoundError } = require('../errors')
const validate = require('../utils/validate')

const logic = {
    registerUser(username, password) {
        validate([{ key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({ username, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {
        validate([{ key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate([{ key: 'id', value: id, type: String }])

        return (async () => {
            const user = await User.findById(id, { '_id': 0, password: 0, __v: 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.id = id

            return user
        })()
    },

    postMessage(message) {
        validate([{ key: 'message', value: message, type: String }])

        return (async () => {
            message = new Message({ message })

            await message.save()
        })()
    },

    getMessage(message) {

        return (async () => {
            const message = await Message.find({}).lean()

            return message
        })()
    }


}

module.exports = logic