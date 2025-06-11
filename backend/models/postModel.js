
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cat: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;