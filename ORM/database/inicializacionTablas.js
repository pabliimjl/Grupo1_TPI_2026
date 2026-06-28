const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    // PRODUCTO

    const Producto = sequelize.define("Producto", {
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
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        tableName: "productos",
        timestamps: false
    });

    // LUBRICANTE

    const Lubricante = sequelize.define("Lubricante", {
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

    // ESTETICA VEHICULAR

    const EsteticaVehicular = sequelize.define("EsteticaVehicular", {
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
  
    // VENTA

    const Venta = sequelize.define("Venta", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    // DETALLE VENTA

    const DetalleVenta = sequelize.define("DetalleVenta", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        venta_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }

    }, {
        tableName: "detalle_ventas",
        timestamps: false
    });

    // RELACION PRODUCTO -> LUBRICANTE (1 A 1)

    Producto.hasOne(Lubricante, {
        foreignKey: "producto_id",
        as: "lubricante",
        onDelete: "CASCADE"
    });

    Lubricante.belongsTo(Producto, {
        foreignKey: "producto_id",
        as: "producto"
    });

    // RELACION PRODUCTO -> ESTETICA VEHICULAR (1 A 1)

    Producto.hasOne(EsteticaVehicular, {
        foreignKey: "producto_id",
        as: "esteticaVehicular",
        onDelete: "CASCADE"
    });

    EsteticaVehicular.belongsTo(Producto, {
        foreignKey: "producto_id",
        as: "producto"
    });

    // RELACION VENTA -> DETALLEVENTA (1 A MUCHOS)

    Venta.hasMany(DetalleVenta, {
        foreignKey: "venta_id",
        as: "detalles",
        onDelete: "CASCADE"
    });

    DetalleVenta.belongsTo(Venta, {
        foreignKey: "venta_id",
        as: "venta"
    });

    // RELACION PRODUCTO -> DETALLEVENTA (1 A MUCHOS)

    Producto.hasMany(DetalleVenta, {
        foreignKey: "producto_id",
        as: "detalles",
        onDelete: "CASCADE"
    });

    DetalleVenta.belongsTo(Producto, {
        foreignKey: "producto_id",
        as: "producto"
    });

    // RELACION MUCHOS A MUCHOS
    // PRODUCTO <-> VENTA
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