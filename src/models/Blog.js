const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    followList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

blogSchema.method('getFollow', function () {
    return this.followList.map(x => x._id);
});

blogSchema.method('getUsername', function () {
    return this.followList.map(x => x.username);
})

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;