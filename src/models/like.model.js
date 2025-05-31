const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Like = sequelize.define('Like', {
    like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'likes',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'post_id', 'comment_id'],
        },
    ],
    validate: {
        oneTargetOnly() {
            if ((this.post_id === null && this.comment_id === null) ||
                (this.post_id !== null && this.comment_id !== null)) {
                throw new Error('Like must be related to either post_id or comment_id, but not both.');
            }
        },
    },
});

module.exports = Like;
