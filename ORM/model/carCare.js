const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Product = require('./product');

const CarCare = connection.define('CarCare', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        column: 'product_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_car_care',
    timestamps: false,
});

module.exports = CarCare;