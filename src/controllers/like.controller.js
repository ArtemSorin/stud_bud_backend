const Like = require('../models/like.model');
const Post = require('../models/post.model');

exports.toggleLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.user_id;

    try {
        const existingLike = await Like.findOne({
            where: {
                user_id: userId,
                post_id: postId,
                comment_id: null
            }
        });

        if (existingLike) {
            await existingLike.destroy();
        } else {
            await Like.create({
                user_id: userId,
                post_id: postId
            });
        }

        const likeCount = await Like.count({
            where: { post_id: postId, comment_id: null }
        });

        res.json({ likesCount: likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};


exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.findAll();
        res.json(likes);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка загрузки лайков' });
    }
};
