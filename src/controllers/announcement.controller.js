const { Announcement, User } = require('../models');

const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            where: { is_active: true },
            include: {
                model: User,
                as: 'announcementAuthor',
                attributes: ['username', 'profile_picture_url'],
            },
            order: [['created_at', 'DESC']],
        });


        res.status(200).json(announcements);
    } catch (error) {
        console.error('Ошибка при получении объявлений:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};
module.exports = { getAllAnnouncements };
