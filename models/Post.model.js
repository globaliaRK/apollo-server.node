const { Schema, model } = require('mongoose');

const postModel = new Schema({
    postTitle: {
        type: String,
        unique: true
    },
    postMessage: String,
    postImg: String,
    postComment: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]
});

module.exports = model('post', postModel, "posts");