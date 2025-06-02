const User = require('../models/user.model');
const Interest = require('../models/interest.model');
const Post = require('../models/post.model');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['username', 'first_name', 'last_name', 'birth_date', 'gender', 'location', 'profile_picture_url'],


            include: [
                { model: Interest, through: { attributes: [] } },
                { model: Post, order: [['created_at', 'DESC']] }
            ],
        });

        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};
