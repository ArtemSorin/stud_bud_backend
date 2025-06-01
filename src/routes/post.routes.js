const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { Post } = require('../models');

router.get('/', require('../controllers/post.controller').getAllPosts);

router.post(
    '/',
    authenticate,
    upload.single('image'),
    async (req, res) => {
        try {
            const { content } = req.body;
            const userId = req.user.id;
            const imageUrl = req.file ? `/uploads/posts/${req.file.filename}` : null;

            const post = await Post.create({
                user_id: userId,
                content,
                image_url: imageUrl,
            });

            res.status(201).json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Ошибка при создании поста' });
        }
    }
);

module.exports = router;
