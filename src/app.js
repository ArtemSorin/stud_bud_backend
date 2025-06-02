const express = require('express');
const cors = require('cors');
const { sequelize, initModels } = require('./models');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const chatRoutes = require('./routes/chat.routes')
const messageRoutes = require('./routes/message.routes');
const likeRoutes = require('./routes/like.routes');
const commentRoutes = require('./routes/comment.routes');
const announcementRoutes = require('./routes/announcement.routes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/announcements', announcementRoutes);



app.use('/uploads', express.static('uploads'));


initModels()
    .then(() => console.log('База данных синхронизирована'))
    .catch((err) => console.error('Ошибка синхронизации базы данных', err));

module.exports = app;
