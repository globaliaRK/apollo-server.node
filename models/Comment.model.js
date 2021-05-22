const { Schema, model } = require('mongoose');

const commentModel = new Schema({
    commentTitle: {
        type: String,
        unique: true
    },
    commentBody: String,
    postID: {
        type: Schema.Types.ObjectId,
        ref: "post"
    }
});

module.exports = model('comment', commentModel, "comments");