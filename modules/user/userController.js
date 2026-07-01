const User = require('./userModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { username, email, password, confirmPassword, fullName } = req.body;
    try {
        // 1. Validação básica de senhas coincidentes
        if (password !== confirmPassword) {
            req.flash('error', 'As senhas não coincidem.');
            return res.redirect('/register');
        }

        // 2. Verificar se usuário ou e-mail já existem
        const emailExists = await User.findOne({ where: { email } });
        const usernameExists = await User.findOne({ where: { username } });
        
        if (emailExists || usernameExists) {
            req.flash('error', 'Este e-mail ou usuário já está cadastrado.');
            return res.redirect('/register');
        }

        // 3. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Salvar no banco
        await User.create({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        // 5. Redirecionar para login com mensagem de sucesso
        req.flash('success', 'Conta criada com sucesso! Faça seu login.');
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao criar conta. Verifique os dados e tente novamente.');
        res.redirect('/register');
    }
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const { Op } = require("sequelize");

        // Buscar usuário por email ou username
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: login },
                    { username: login }
                ]
            }
        });

        if (!user) {
            req.flash('error', 'E-mail/Usuário ou senha incorretos.');
            return res.redirect('/login');
        }

        const senhaCorreta = await bcrypt.compare(password, user.password);

        if (!senhaCorreta) {
            req.flash('error', 'E-mail/Usuário ou senha incorretos.');
            return res.redirect('/login');
        }

        // Criar sessão
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        // Salvar sessão antes de redirecionar
        req.session.save((err) => {
            if (err) {
                console.error(err);
                req.flash('error', 'Erro ao criar sessão.');
                return res.redirect('/login');
            }

            res.redirect('/feed');
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Ocorreu um erro ao tentar entrar.');
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
   req.session.destroy(() => {
      res.redirect('/');
   });
};

exports.getProfile = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'fullName', 'bio', 'profilePicture']
        });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar perfil do usuário.');
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { fullName, bio } = req.body;
        const userId = req.session.user.id;

        const updateData = { fullName, bio };

        // Se um arquivo foi enviado pelo Multer, ele estará em req.file
        if (req.file) {
            updateData.profilePicture = req.file.filename;
        }

        await User.update(updateData, { where: { id: userId } });

        req.flash('success', 'Perfil atualizado com sucesso!');
        res.redirect('/profile/edit');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Erro ao atualizar perfil.');
        res.redirect('/profile/edit');
    }
};