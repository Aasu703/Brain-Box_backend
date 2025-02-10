const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db');
const bcrypt = require('bcrypt');

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

// Hook to hash password before saving the user
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
});

// Method to compare password
User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.Password);
};

module.exports = User;