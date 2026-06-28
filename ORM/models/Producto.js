const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Producto", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre_producto: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        formato: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        url_imagen: {
            type: DataTypes.TEXT
        },
        tipo_producto: {
            type: DataTypes.ENUM(
                "lubricante",
                "estetica_vehicular"
            ),
            allowNull: false
        }
    }, {
        tableName: "productos",
        timestamps: false
    });
};