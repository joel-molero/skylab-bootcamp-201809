const { User, Postit } = require('./data')


const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (user) throw Error(`username ${username} already registered`)

                user = new User({ name, surname, username, password })

                return user.save()

            })


    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (!user || user.password !== password) throw Error('invalid username or password')

                return user.id
            })
    },

    retrieveUser(id) {
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        return User.findById(id)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                const _user = user.toObject()

                _user.id = id

                delete _user.password

                return _user
            })
    },

    createPostit(text, id) {
        return User.findById(id)
            .then(user => {
                const userPostits = user.postits

                let _postit = new Postit(text)

                userPostits.push(_postit)

                return user.save()
            })

    },

    deletePostit(userId, postitId) {
        return User.findById(userId)
            .then(user => {
                const userPostits = user.postits

                const index = userPostits.findIndex(post => post.id === parseFloat(postitId))

                userPostits.splice(index, 1)

                return user.save()
            })
    },

    saveEditPostit(userId, postitId, newText) {
        return User.findById(userId)
            .then(user => {
                const userPostits = user.postits

                const postit = userPostits.find(post => post.id === parseFloat(postitId))

                postit.text = newText

                return user.save()
            })
    }
}

module.exports = logic