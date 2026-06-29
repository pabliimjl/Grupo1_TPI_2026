const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Usuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        tableName: "usuarios",
        timestamps: false
    });
};