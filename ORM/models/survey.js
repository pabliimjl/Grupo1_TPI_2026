const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Client = require('./client');

const Survey = connection.define('Survey', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        column: 'client_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    referenceImage: {
        column: 'reference_image',
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        column: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'survey',
    timestamps: false,
});

module.exports = Survey;