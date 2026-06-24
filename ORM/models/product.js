const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Lubricant = require('./lubricant');
const CarCare = require('./carCare');
const SalesDetail = require('./salesDetail');

const Product = connection.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('LUBRICANTE', 'ESTETICA_VEHICULAR'),
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productName: {
        column: 'product_name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    format: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grossPrice: {
        column: 'gross_price',
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imageUrl: {
        column: 'image_url',
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creationDate: {
        column: 'creation_date',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    productEnabled: {
        column: 'product_enabled',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'product',
    timestamps: false,
});

module.exports = Product;
