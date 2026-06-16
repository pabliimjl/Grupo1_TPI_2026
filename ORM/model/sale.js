const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Client = require('./client');
const SalesDetail = require('./salesDetail');

const Sale = connection.define('Sale', {
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
    saleDate: {
        column: 'sale_date',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    totalAmount: {
        column: 'total_amount',
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'sale',
    timestamps: false,
});

module.exports = Sale;