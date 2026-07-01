var express = require('express');
var router = express.Router();

const userController = require('../modules/user/userController');
const postController = require('../modules/post/postController');
const commentController = require('../modules/comment/commentController');

const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/multer');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Anonymus'
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Criar Conta'
    });
});

router.post('/register', userController.register);

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Entrar'
    });
});

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/feed', authMiddleware, async (req, res) => {

    try {

        const user = await userController.getProfile(req.session.user.id);
        const posts = await postController.getAllPosts();

        res.render('home', {
            title: 'Feed',
            user,
            posts
        });

    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }

});

router.get('/profile/edit', authMiddleware, async (req, res) => {

    try {

        const user = await userController.getProfile(req.session.user.id);

        if (!user) {
            return res.redirect('/feed');
        }

        res.render('edit-profile', {
            title: 'Editar Perfil',
            user
        });

    } catch (error) {
        console.error(error);
        res.redirect('/feed');
    }

});

router.post(
    '/profile/edit',
    authMiddleware,
    upload.single('profilePicture'),
    userController.updateProfile
);

router.post('/posts/:id/comments', authMiddleware, async (req, res) => {

    try {

        await commentController.createComment(req, res);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Erro ao salvar comentário.'
        });

    }

});

module.exports = router;