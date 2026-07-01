const express = require("express");
const router = express.Router();

const commentController = require("./commentController");

const {
    createCommentValidator
} = require("./commentValidator");

const authMiddleware =
    require("../../middlewares/auth");

// Buscar comentários de um post

router.get(
    "/posts/:id/comments",
    commentController.getComments
);

// Criar comentário

router.post(
    "/posts/:id/comments",
    authMiddleware,
    createCommentValidator,
    commentController.createComment
);

module.exports = router;