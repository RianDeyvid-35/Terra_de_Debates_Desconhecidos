class CommentService {

    create(data) {

        const { content, userId, postId } = data;

        if (!content || !content.trim()) {
            throw new Error("Comentário não pode ser vazio");
        }

        return {
            content: content.trim(),
            userId,
            postId
        };
    }

}

module.exports = new CommentService();