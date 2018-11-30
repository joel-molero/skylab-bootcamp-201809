const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


const User = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    // surname: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chat: [{
        type: ObjectId,
        ref: 'User'
    }]
})

const Message = new Schema({
    message: {
        type: String
    }
})

module.exports = {
    User, Message
}

