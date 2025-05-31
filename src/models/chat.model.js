const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Chat = sequelize.define('Chat', {
    chat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'chats',
    timestamps: false,
});

Chat.belongsTo(User, { as: 'user1', foreignKey: 'user1_id', targetKey: 'user_id' });
Chat.belongsTo(User, { as: 'user2', foreignKey: 'user2_id', targetKey: 'user_id' });

module.exports = Chat;
