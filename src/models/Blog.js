const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 5,
    },
    image: {
        type: String,
        require: true,
        validate: /^https?:\/\//i,
        
    },
    content: {
        type: String,
        require: true,
        minLength: 10,
    },
    category: {
        type: String,
        require: true,
        minLength: 3,
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
}, {
    timestamps: true
});

blogSchema.method('getFollow', function () {
    return this.followList.map(x => x._id);
});

blogSchema.method('getUsername', function () {
    return this.followList.map(x => x.username);
})

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;