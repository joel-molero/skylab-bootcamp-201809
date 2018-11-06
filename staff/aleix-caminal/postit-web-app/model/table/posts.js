const Table = require('../table')
const Post = require('../entity/post')

class PostsTable extends Table {
    constructor() {
        super('posts')
    }

    newEntity(query) {
        return new Post(query)
    }
}

module.exports = PostsTable
