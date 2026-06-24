const { Producto, Lubricante, EsteticaVehicular } = require("../ORM/models")(require("../ORM/database/connection"));

function mapearLubricante(p) {

    return {
        marca: p.marca,
        producto: p.nombre_producto,
        formato: p.formato,
        densidad: p.lubricante?.densidad ?? null,
        tipo: p.lubricante?.tipo ?? null,
        precio_bruto: Number(p.precio),
        url: p.url_imagen
    };
}

function mapearEstetica(p) {
    return {
        marca: p.marca ?? null,
        producto: p.nombre_producto,
        categoria: p.esteticaVehicular?.categoria,
        formato: p.formato,
        precio_bruto: Number(p.precio),
        url: p.url_imagen
    };
}


async function obtenerLubricantes(req, res) {
    try {

        const lubricantes = await Producto.findAll({
            where: {
                tipo_producto: "lubricante"
            },
            include: [
                {
                    model: Lubricante,
                    as: "lubricante"
                }
            ]
        });

        res.json(lubricantes.map(mapearLubricante));

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener lubricantes" });
    }
}

async function obtenerEstetica(req, res) {
    try {

        const estetica = await Producto.findAll({
            where: {
                tipo_producto: "estetica_vehicular"
            },
            include: [
                {
                    model: EsteticaVehicular,
                    as: "esteticaVehicular"
                }
            ]
        });

        res.json(estetica.map(mapearEstetica));

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener estética vehicular" });
    }
}

module.exports = {
    obtenerLubricantes,
    obtenerEstetica
};