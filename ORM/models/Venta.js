const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Venta", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_comprador: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: "ventas",
        timestamps: false
    });
};