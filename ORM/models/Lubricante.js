const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Lubricante", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        densidad: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: "lubricantes",
        timestamps: false
    });
};