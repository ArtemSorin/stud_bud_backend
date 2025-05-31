const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/profile', authMiddleware, async (req, res) => {
    const { User } = require('../models');
    const user = await User.findByPk(req.user.user_id, {
        attributes: ['user_id', 'username', 'email', 'first_name', 'last_name']
    });

    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    res.json({ user });
});