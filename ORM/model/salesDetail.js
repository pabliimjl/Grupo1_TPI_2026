const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Sale = require('./sale');
const Product = require('./product');

const SalesDetail = connection.define('SalesDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    saleId: {
        column: 'sale_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        column: 'product_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'sales_detail',
    timestamps: false,
});

module.exports = SalesDetail;