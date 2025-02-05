const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db');

const User = sequelize.define('User', {
    User_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;