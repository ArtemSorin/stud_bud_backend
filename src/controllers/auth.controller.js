const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const {
            username, email, password, first_name, last_name, birth_date
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password_hash: hashedPassword,
            first_name,
            last_name,
            birth_date
        });

        return res.status(201).json({ message: 'Регистрация прошла успешно', user_id: user.user_id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ошибка регистрации' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            attributes: ['user_id', 'username', 'email', 'password_hash']
        });

        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return res.status(401).json({ error: 'Ошибка пароля' });

        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'Успешный вход',
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Ошибка входа' });
    }
};

