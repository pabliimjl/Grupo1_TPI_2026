const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Sale = require('./sale');
const Survey = require('./survey');

const Client = connection.define('Client', {
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
    creationDate: {
        column: 'creation_date',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Client',
    timestamps: false,
});

module.exports = Client;