const { Server } = require('socket.io');
const { Message } = require('./models');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares/auth.middleware');

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('🔌 Новый клиент подключен');

        socket.on('joinChat', (chatId) => {
            socket.join(`chat_${chatId}`);
            console.log(`📥 Пользователь присоединился к комнате chat_${chatId}`);
        });

        socket.on('sendMessage', async (data) => {
            try {
                const { chatId, userId, text } = data;

                const newMessage = await Message.create({
                    chat_id: chatId,
                    sender_id: userId,
                    text,
                });

                const messageForClient = {
                    message_id: newMessage.message_id,
                    chat_id: chatId,
                    sender_id: userId,
                    text: text,
                    sent_at: newMessage.sent_at,
                };

                io.to(`chat_${chatId}`).emit('newMessage', messageForClient);
                console.log(`📨 Сообщение отправлено в чат chat_${chatId}`);
            } catch (err) {
                console.error('❌ Ошибка при отправке сообщения через сокет:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('❌ Клиент отключён');
        });
    });
}

module.exports = { initSocket, getIO: () => io };
