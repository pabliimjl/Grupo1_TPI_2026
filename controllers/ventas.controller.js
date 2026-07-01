const { Venta, DetalleVenta, Producto } = require("../ORM/models")(require("../ORM/database/connection"));

async function listarVentas(req, res) {
    try {

        const ventas = await Venta.findAll({
            include: [
                {
                    model: DetalleVenta,
                    as: "detalles",
                    include: [
                        {
                            model: Producto,
                            as: "producto"
                        }
                    ]
                }
            ],
            order: [["id", "DESC"]]
        });

        return res.render("ventas", {
            ventas
        });

    } catch (error) {
        console.error("Error al listar ventas:", error);
        return res.status(500).send("Error al obtener ventas");
    }
}

module.exports = {
    listarVentas
};