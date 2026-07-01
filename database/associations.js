const User = require("../modules/user/userModel");
const Post = require("../modules/post/postModel");
const Comment = require("../modules/comment/commentModel");

User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Post.belongsTo(User, {
    foreignKey: "userId",
});

User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "userId",
});

Post.hasMany(Comment, {
    foreignKey: "postId",
    onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
    foreignKey: "postId",
});

module.exports = {
    User,
    Post,
    Comment,
};