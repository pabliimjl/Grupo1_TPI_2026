const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Product = require('./product');

const Lubricant = connection.define('Lubricant', {
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
    viscosity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lubricantType: {
        column: 'lubricant_type',
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_lubricant',
    timestamps: false,
});

module.exports = Lubricant;