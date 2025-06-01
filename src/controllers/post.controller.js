const { Post, User, Like } = require('../models');

const getAllPosts = async (req, res) => {
    const currentUserId = req.user ? req.user.user_id || req.user.id : null;

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

        const result = await Promise.all(posts.map(async post => {
            const likesCount = await Like.count({
                where: { post_id: post.post_id, comment_id: null }
            });

            let likedByCurrentUser = false;
            if (currentUserId) {
                const userLike = await Like.findOne({
                    where: {
                        post_id: post.post_id,
                        user_id: currentUserId,
                        comment_id: null
                    }
                });
                likedByCurrentUser = !!userLike;
            }

            return {
                post_id: post.post_id,
                content: post.content,
                image_url: post.image_url,
                created_at: post.created_at,
                author: post.author.username,
                author_picture_url: post.author.profile_picture_url,
                likes_count: likesCount,
                liked_by_current_user: likedByCurrentUser,
            };
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
