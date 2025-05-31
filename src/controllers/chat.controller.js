const { Chat, User, Message } = require('../models');
const { Op } = require('sequelize');

const getUserChats = async (req, res) => {
    const userId = req.user.id;


    try {
        const chats = await Chat.findAll({
            where: {
                [Op.or]: [{ user1_id: userId }, { user2_id: userId }],
            },
            include: [
                { model: User, as: 'user1', attributes: ['user_id', 'username', 'profile_picture_url'] },
                { model: User, as: 'user2', attributes: ['user_id', 'username', 'profile_picture_url'] },
            ],
        });

        const formattedChats = await Promise.all(
            chats.map(async (chat) => {
                const otherUser = chat.user1.user_id === userId ? chat.user2 : chat.user1;

                const lastMessage = await Message.findOne({
                    where: { chat_id: chat.chat_id },
                    order: [['sent_at', 'DESC']],
                });

                return {
                    chat_id: chat.chat_id,
                    username: otherUser.username,
                    user_avatar: otherUser.profile_picture_url,
                    last_message: lastMessage?.content ?? '',
                    time: lastMessage?.sent_at?.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) ?? '',
                };
            })
        );

        res.json(formattedChats);
    } catch (err) {
        console.error('Ошибка при получении чатов:', err);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};


const createChat = async (req, res) => {
    const userId = req.user.id;

    const { targetUserId } = req.body;

    if (userId === targetUserId) {
        return res.status(400).json({ message: 'Нельзя создать чат с собой' });
    }

    try {
        let chat = await Chat.findOne({
            where: {
                [Op.or]: [
                    { user1_id: userId, user2_id: targetUserId },
                    { user1_id: targetUserId, user2_id: userId },
                ],
            },
        });

        if (!chat) {
            chat = await Chat.create({ user1_id: userId, user2_id: targetUserId });
        }

        res.status(201).json(chat);
    } catch (err) {
        console.error('Ошибка создания чата:', err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    getUserChats,
    createChat,
};
