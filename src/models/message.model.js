const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Chat = require('./chat.model');
const User = require('./user.model');

const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'messages',
    timestamps: false,
});

Message.belongsTo(Chat, { foreignKey: 'chat_id' });
Message.belongsTo(User, {
    foreignKey: 'sender_id',
    targetKey: 'user_id',
    as: 'sender',
});

module.exports = Message;
