const crearProducto = require("./Producto");
const crearLubricante = require("./Lubricante");
const crearEsteticaVehicular = require("./EsteticaVehicular");
const crearVenta = require("./Venta");
const crearDetalleVenta = require("./DetalleVenta");

module.exports = (sequelize) => {

    const Producto = crearProducto(sequelize);
    const Lubricante = crearLubricante(sequelize);
    const EsteticaVehicular = crearEsteticaVehicular(sequelize);
    const Venta = crearVenta(sequelize);
    const DetalleVenta = crearDetalleVenta(sequelize);

    // Producto -> Lubricante

    Producto.hasOne(Lubricante, {
        foreignKey: "producto_id",
        as: "lubricante",
        onDelete: "CASCADE"
    });

    Lubricante.belongsTo(Producto, {
        foreignKey: "producto_id",
        as: "producto"
    });

    // Producto -> Estética Vehicular

    Producto.hasOne(EsteticaVehicular, {
        foreignKey: "producto_id",
        as: "esteticaVehicular",
        onDelete: "CASCADE"
    });

    EsteticaVehicular.belongsTo(Producto, {
        foreignKey: "producto_id",
        as: "producto"
    });

    // Venta -> DetalleVenta

    Venta.hasMany(DetalleVenta, {
        foreignKey: "venta_id",
        as: "detalles",
        onDelete: "CASCADE"
    });

    DetalleVenta.belongsTo(Venta, {
        foreignKey: "venta_id",
        as: "venta"
    });

    // Producto -> DetalleVenta

    Producto.hasMany(DetalleVenta, {
        foreignKey: "producto_id",
        as: "detalles",
        onDelete: "CASCADE"
    });

    DetalleVenta.belongsTo(Producto, {
        foreignKey: "producto_id",
        as: "producto"
    });

    // Muchos a muchos

    Producto.belongsToMany(Venta, {
        through: DetalleVenta,
        foreignKey: "producto_id",
        otherKey: "venta_id"
    });

    Venta.belongsToMany(Producto, {
        through: DetalleVenta,
        foreignKey: "venta_id",
        otherKey: "producto_id"
    });

    return {
        Producto,
        Lubricante,
        EsteticaVehicular,
        Venta,
        DetalleVenta
    };
};