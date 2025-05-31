const { Post, User } = require('../models');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, attributes: ['username', 'profile_picture_url'], as: 'author' },
                {
                    model: User,
                    attributes: ['user_id'],
                    as: 'LikedBy'
                }
            ],
            order: [['created_at', 'DESC']],
        });

        const result = posts.map(post => ({
            post_id: post.post_id,
            content: post.content,
            image_url: post.image_url,
            created_at: post.created_at,
            author: post.author.username,
            author_picture_url: post.author.profile_picture_url,
            likes_count: 0,
            liked_by_current_user: false,
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

const createPost = async (req, res) => {
    try {
        const { user_id, content, image_url } = req.body;

        const newPost = await Post.create({
            user_id,
            content,
            image_url,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Ошибка создания поста:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    getAllPosts,
    createPost,
};
