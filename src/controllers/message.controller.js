const { Message, User } = require('../models');

const getMessages = async (req, res) => {
    const chatId = req.params.chatId;

    try {
        const messages = await Message.findAll({
            where: { chat_id: chatId },
            include: [
                { model: User, as: 'sender', attributes: ['user_id', 'username', 'profile_picture_url'] },
            ],
            order: [['sent_at', 'ASC']],
        });

        res.json(messages);
    } catch (err) {
        console.error('Ошибка при получении сообщений:', err);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    try {
        const newMessage = await Message.create({
            chat_id: chatId,
            sender_id: userId,
            text,
        });

        res.status(201).json(newMessage);
    } catch (err) {
        console.error('Ошибка отправки сообщения:', err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    getMessages,
    sendMessage,
};
