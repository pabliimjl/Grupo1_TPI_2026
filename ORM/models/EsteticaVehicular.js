const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("EsteticaVehicular", {
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
        categoria: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: "estetica_vehicular",
        timestamps: false
    });
};