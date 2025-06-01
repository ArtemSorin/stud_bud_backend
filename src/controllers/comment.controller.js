const { Comment, User } = require('../models');

exports.getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: { post_id: postId, parent_comment_id: null, deleted: false },
            include: [
                { model: User, attributes: ['username', 'profile_picture_url'] },
                {
                    model: Comment,
                    as: 'replies',
                    where: { deleted: false },
                    required: false,
                    include: [{ model: User, attributes: ['username', 'profile_picture_url'] }]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.json(comments);
    } catch (err) {
        console.error('Ошибка загрузки комментариев:', err);
        res.status(500).json({ error: 'Ошибка загрузки комментариев' });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, parent_comment_id } = req.body;
        const userId = req.user.id; // предполагается, что используется auth middleware

        const comment = await Comment.create({
            post_id: postId,
            user_id: userId,
            content,
            parent_comment_id: parent_comment_id || null
        });

        res.status(201).json(comment);
    } catch (err) {
        console.error('Ошибка создания комментария:', err);
        res.status(500).json({ error: 'Не удалось создать комментарий' });
    }
};
