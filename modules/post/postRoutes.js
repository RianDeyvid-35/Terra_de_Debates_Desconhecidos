const express = require("express");
var router = express.Router();
const postController = require("./postController");
const userController = require("../user/userController");
const authMiddleware = require("../../middlewares/auth");
const { createPostValidator } = require("./postValidator");

// Rotas aqui
router.get("/new", authMiddleware, async (req, res) => {

    const user = await userController.getProfile(req.session.user.id);

    res.render("new-post", {
        title: "Nova Postagem | Terra de Debates",
        user
    });

});

router.post("/", 
    authMiddleware,
    createPostValidator,
    postController.createPost);

router.get("/:id", 
    postController.renderPostPage);

router.post("/:id/delete", 
    authMiddleware, 
    postController.deletePost);

module.exports = router;