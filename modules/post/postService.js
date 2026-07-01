class PostService {

    create(data) {

        const { title, content, userId } = data;

        if (!title || !title.trim()) {
            throw new Error("Título obrigatório");
        }

        if (!content || !content.trim()) {
            throw new Error("Conteúdo obrigatório");
        }

        if (!userId) {
            throw new Error("Usuário obrigatório");
        }

        return {
            title: title.trim(),
            content: content.trim(),
            userId
        };
    }

    canDelete(post, userId) {

        return post.userId === userId;
    }
}

module.exports = new PostService();