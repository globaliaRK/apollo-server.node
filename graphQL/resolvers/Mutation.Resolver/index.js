const { sign } = require("jsonwebtoken");
const { hash } = require("bcryptjs");
const UserModel = require("../../../models/User.model");
const PostModel = require("../../../models/Post.model");
const CommentModel = require("../../../models/Comment.model");
const { findOne } = require("../../../models/Comment.model");


const setUser = async (root, { user }, context, info) => {
    try {
        const { firstName, mobileNumber, email, password } = user;
        const hashPassword = await hash(password, 10);
        const User = new UserModel({
            firstName: firstName,
            mobileNumber: mobileNumber,
            email: email,
            password: hashPassword,
        });
        await User.save();
        const Token = await sign({ firstName, mobileNumber, email }, "mongoDB", { expiresIn: "1h" })
        return { _id: User._id, Token, ExpireTime: "1 hour" };
    } catch (error) {
        throw new Error(error.message && "Email Already in used" || "can't add user", error)
    }
}

const addPost = async (root, { post }, { email, message }, info) => {
    try {
        if (message) throw new Error(message);
        const { postTitle, postMessage, postImg } = post;
        if (!await UserModel.findOne({ email })) throw new Error('User Not Found...!');
        const Post = new PostModel({ postTitle, postMessage, postImg });
        await UserModel.findOneAndUpdate({ email }, { $push: { myPost: Post._id } });
        const data = await Post.save();
        return data;
    } catch (error) {
        throw new Error(error.message || "can't add post")
    }
}

const addComment = async (root, { comment }, { email, message }, info) => {
    try {
        if (message) throw new Error(message);
        const { commentTitle, commentBody, postID } = comment;
        if (!await UserModel.findOne({ email })) throw new Error('Login First');
        const Comment = new CommentModel({ commentTitle, commentBody, postID });
        const postWithComment = await PostModel.findByIdAndUpdate(postID, {
            $push: { postComment: Comment._id },
        }, { new: true });
        if (!postWithComment) throw new Error('Post not exist...!');
        await Comment.save();
        await UserModel.findOneAndUpdate({ email }, { $push: { myComment: Comment._id } });
        return Comment;
    } catch (error) {
        if (error) throw new Error(error.message || "can't add post")
    }
}


const uploadFile = async (root, { comment }, context, info) => {
    try {

        return "comment";
    } catch (error) {
        throw new Error(error.message || "can't add post")
    }
}

module.exports = { setUser, addPost, addComment };