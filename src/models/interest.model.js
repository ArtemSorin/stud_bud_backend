const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Interest = sequelize.define('Interest', {
    interest_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'interests',
    timestamps: false,
});

module.exports = Interest;