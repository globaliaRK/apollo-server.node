const { Schema, model } = require('mongoose');

const userModel = new Schema({
    firstName: String,
    mobileNumber: Number,
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    myPost: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }],
    myComment: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

module.exports = model('user', userModel, 'users');