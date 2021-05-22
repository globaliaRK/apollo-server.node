const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { populate } = require("../../../models/Comment.model");
const CommentModel = require("../../../models/Comment.model");
const PostModel = require("../../../models/Post.model");
const UserModel = require("../../../models/User.model");


const getMyInfo = async (root, { }, { email, message }, info) => {
    try {
        if (message) throw new Error(message)
        const Users = await UserModel.findOne({ email: email }, "-__v -password").populate({
            path: "myPost",
            populate: "postComment",
        }).populate({
            path: "myComment",
            populate: "postID",
        });
        if (!Users) throw new Error('not User Found...!');
        return Users;
    } catch (error) {
        throw new Error(error.message || "can't find user or user not avalable")
    }
}

const Users = async () => {
    try {
        const Users = await UserModel.find({}).populate({
            path: 'myPost',
            populate: {
                path: 'postComment'
            }
        });
        return Users;
    } catch (error) {
        throw new Error("can't find users")
    }
}

const Post = async () => {
    try {
        const Post = await PostModel.find({}).populate("postComment");
        return Post;
    } catch (error) {
        throw new Error("can't find posts")
    }
}

const Comment = async (root, { comment }, context, info) => {
    try {
        const Comment = await CommentModel.find({}).populate("postID");
        return Comment;
    } catch (error) {
        throw new Error(error.message || "can't find users")
    }
}

const loginUser = async (root, { email, password }, context, info) => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (await compare(password, user.password)) {
            const { firstName, mobileNumber } = user;
            const Token = await sign({ firstName, mobileNumber, email }, "mongoDB", { expiresIn: '1h' });
            return { _id: user._id, Token, ExpireTime: '1 hour' };
        }
        throw new Error("Password Invalid...!");
    }
    catch (error) {
        throw new Error("can't find user")
    }
};

module.exports = { getMyInfo, Users, Post, Comment, loginUser };
