const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [3, 50],
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    creationDate: {
        column: 'creation_date',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabledUser: {
        column: 'enabled_user',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    freezeTableName: true,
    tableName: 'User',
    timestamps: false,
});

module.exports = User;