const Comment = require("./commentModel");
const Post = require("../post/postModel");
const User = require("../user/userModel");

exports.getComments = async (req, res) => {

    try {

        const comments = await Comment.findAll({

            where: {
                postId: req.params.id
            },

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

        return res.json({
            comments
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro ao carregar comentários."
        });

    }

};

exports.createComment = async (req, res) => {

    try {

        const { content } = req.body;

        if (!content || !content.trim()) {

            return res.status(400).json({
                message: "Comentário não pode ser vazio."
            });

        }

        const post = await Post.findByPk(
            req.params.id
        );

        if (!post) {

            return res.status(404).json({
                message: "Postagem não encontrada."
            });

        }

        const comment = await Comment.create({

            content,

            userId: req.session.user.id,

            postId: post.id

        });

        return res.status(201).json({
            message: "Comentário criado com sucesso.",
            comment
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro ao criar comentário."
        });

    }

};