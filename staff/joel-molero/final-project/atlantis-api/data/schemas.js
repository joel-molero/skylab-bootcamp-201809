const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Message = new Schema({
    message: {
        type: String
    }
})

module.exports = {
    User, Message
}

