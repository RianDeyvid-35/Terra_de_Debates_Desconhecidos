const Post = require("./postModel");
const User = require("../user/userModel");
const Comment = require("../comment/commentModel");
exports.createPost = async (req, res) => {

    try {
        const { title, content } = req.body;
        if (!title || !content) {
            req.flash(
                "error",
                "Preencha todos os campos."
            );
            return res.redirect("/posts/new");
        }

        // Verifica se existe usuário logado
        if (!req.session.user) {
            req.flash(
                "error",
                "Faça login para criar uma postagem."
            );
            return res.redirect("/login");
        }

        // Cria a postagem
        await Post.create({
            title,
            content,
            userId: req.session.user.id
        });

        req.flash(
            "success",
            "Postagem criada com sucesso!"
        );

        return res.redirect("/feed");

    } catch (error) {
        console.error("Erro ao criar postagem:");
        console.error(error);

        req.flash(
            "error",
            "Erro ao criar postagem."
        );
        return res.redirect("/posts/new");
    }

};

exports.getAllPosts = async () => {

    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "username",
                        "fullName",
                        "profilePicture"
                    ]
                }
            ],
            order: [
                ["createdAt", "DESC"]
            ]
        });

        return posts;

    } catch (error) {
        console.error("Erro ao buscar posts:");
        console.error(error);
        return [];

    }

};

exports.renderPostPage = async (req, res) => {
    try {
        const postId = req.params.id;
        // Busca a postagem juntamente com o autor
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "username",
                        "fullName",
                        "profilePicture"
                    ]
                },

                {
                    model: Comment
                }
            ]
        });

        // Caso não exista
        if (!post) {
            req.flash(
                "error",
                "Postagem não encontrada."
            );

            return res.redirect("/feed");
        }

        // Conta comentários
        const commentsCount = await Comment.count({
            where: {
                postId
            }

        });

        post.dataValues.commentsCount = commentsCount;
                // Busca o usuário logado para a navbar
        let user = null;
        if (req.session.user) {
            user = await User.findByPk(req.session.user.id, {

                attributes: [
                    "id",
                    "username",
                    "fullName",
                    "email",
                    "bio",
                    "profilePicture"
                ]
            });
        }
        // Renderiza a página da postagem
        return res.render("post", {
            title: post.title,
            post,
            user

        });

    } catch (error) {

        console.error("Erro ao carregar postagem:");
        console.error(error);

        req.flash(
            "error",
            "Erro ao carregar postagem."
        );

        return res.redirect("/feed");

    }

};

exports.deletePost = async (req, res) => {

    try {
        const post = await Post.findByPk(req.params.id);
        // Verifica se a postagem existe
        if (!post) {
            req.flash(
                "error",
                "Postagem não encontrada."
            );
            return res.redirect("/feed");
        }

        // Verifica se existe usuário logado
        if (!req.session.user) {
            req.flash(
                "error",
                "Faça login para continuar."
            );
            return res.redirect("/login");
        }
        // Apenas o dono da postagem pode excluir
        if (post.userId !== req.session.user.id) {
            req.flash(
                "error",
                "Você não tem permissão para excluir esta postagem."
            );
            return res.redirect(`/posts/${post.id}`);
        }

        // Remove os comentários relacionados
        await Comment.destroy({
            where: {
                postId: post.id
            }

        });

        // Remove a postagem
        await post.destroy();
        req.flash(
            "success",
            "Postagem excluída com sucesso!"
        );

        return res.redirect("/feed");

    } catch (error) {
        console.error("Erro ao excluir postagem:");
        console.error(error);

        req.flash(
            "error",
            "Erro ao excluir postagem."
        );

        return res.redirect("/feed");
}};