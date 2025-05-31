const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id',
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    birth_date: DataTypes.DATE,
    profile_picture_url: DataTypes.STRING(255),
    bio: DataTypes.TEXT,
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    last_login: DataTypes.DATE,
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'users',
    timestamps: false,
    id: false,
});

const Post = require('./post.model');
User.hasMany(Post, { as: 'posts', foreignKey: 'author_id' });

module.exports = User;
