const puppeteer = require("puppeteer");
const { Producto, Lubricante, EsteticaVehicular, Venta, DetalleVenta} = require("../ORM/models")(require("../ORM/database/connection"));

function mapearLubricante(p) {

    return {
        id:p.id,
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
        id:p.id,
        marca: p.marca ?? null,
        producto: p.nombre_producto,
        categoria: p.esteticaVehicular?.categoria,
        formato: p.formato,
        precio_bruto: Number(p.precio),
        url: p.url_imagen
    };
}

function generarHtmlTicket(venta) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                width: 80mm;
                font-size: 12px;
            }

            h2 {
                text-align: center;
                margin-bottom: 10px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            td {
                padding: 2px 0;
            }

            .total {
                font-weight: bold;
                border-top: 1px solid black;
            }
        </style>
    </head>
    <body>

        <h2>LubriMarket</h2>

        <p><strong>Venta:</strong> ${venta.id}</p>
        <p><strong>Fecha:</strong> ${venta.fecha}</p>
        <p><strong>Cliente:</strong> ${venta.nombre_comprador}</p>

        <table>
            ${venta.detalles.map(detalle => `
                <tr>
                    <td>${detalle.producto.nombre_producto}</td>
                </tr>
                <tr>
                    <td>x${detalle.cantidad}</td>
                    <td>$${detalle.precio_unitario}</td>
                </tr>
            `).join("")}
        </table>    

        <p class="total">
            Total: $${venta.total}
        </p>

        <p style="text-align:center">
            ¡Gracias por su compra!
        </p>

    </body>
    </html>
    `;
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

async function registrarVenta(req, res) {
    
    try {

        const { nombre_comprador, items } = req.body;

        if (!nombre_comprador || !items || items.length === 0) {
            return res.status(400).json({
                mensaje: "Datos de la venta inválidos."
            });
        }

        let total = 0;
        const detalles = [];

        // Busco los productos y calculo el total
        for (const item of items) {

            const producto = await Producto.findByPk(item.id);

            if (!producto) {
                return res.status(404).json({
                    mensaje: `El producto con id ${item.id} no existe.`
                });
            }

            const precio = Number(producto.precio);
            const subtotal = precio * item.cantidad;

            total += subtotal;

            detalles.push({
                producto_id: producto.id,
                cantidad: item.cantidad,
                precio_unitario: precio,
                subtotal
            });

        }

        // Creo la venta
        const venta = await Venta.create({
            nombre_comprador,
            total
        });

        // Creo el detalle de la venta
        for (const detalle of detalles) {

            await DetalleVenta.create({
                venta_id: venta.id,
                producto_id: detalle.producto_id,
                cantidad: detalle.cantidad,
                precio_unitario: detalle.precio_unitario,
                subtotal: detalle.subtotal
            });

        }

        res.status(201).json({
            mensaje: "Venta registrada correctamente.",
            venta_id: venta.id,
            total
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar la venta."
        });

    }

}


async function obtenerTicket(req, res) {
    try {
        const { id } = req.params;

       const venta = await Venta.findByPk(id, {
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
            ]
        });

        if (!venta) {
            return res.status(404).json({
                error: "Venta no encontrada"
            });
        }

        const html = generarHtmlTicket(venta);

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0"
        });

        const pdf = await page.pdf({
            width: "80mm",
            printBackground: true
        });

        await browser.close();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=ticket-${venta.id}.pdf`
        );

        res.send(pdf);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al generar el ticket"
        });
    }
}
async function crearLubricante(req, res) {
    try {
        const {
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen,
            densidad,
            tipo
        } = req.body;

        if (!nombre_producto || !precio) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios"
            });
        }

        const producto = await Producto.create({
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen,
            tipo_producto: "lubricante"
        });

        await Lubricante.create({
            producto_id: producto.id,
            densidad,
            tipo
        });

        res.status(201).json({
            mensaje: "Lubricante creado correctamente",
            id: producto.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear lubricante"
        });
    }
}

async function crearEstetica(req, res) {
    try {
        const {
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen,
            categoria
        } = req.body;

        if (!nombre_producto || !precio) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios"
            });
        }

        const producto = await Producto.create({
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen,
            tipo_producto: "estetica_vehicular"
        });

        await EsteticaVehicular.create({
            producto_id: producto.id,
            categoria
        });

        res.status(201).json({
            mensaje: "Producto de estética creado correctamente",
            id: producto.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al crear producto de estética"
        });
    }
}
async function actualizarLubricante(req, res) {
    try {
        const { id } = req.params;

        const {
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen,
            densidad,
            tipo
        } = req.body;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        await producto.update({
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen
        });

        const lubricante = await Lubricante.findOne({
            where: { producto_id: id }
        });

        if (lubricante) {
            await lubricante.update({
                densidad,
                tipo
            });
        }

        res.json({
            mensaje: "Lubricante actualizado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar lubricante"
        });
    }
}

async function actualizarEstetica(req, res) {
    try {
        const { id } = req.params;

        const {
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen,
            categoria
        } = req.body;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        await producto.update({
            nombre_producto,
            marca,
            formato,
            precio,
            url_imagen
        });

        const estetica = await EsteticaVehicular.findOne({
            where: { producto_id: id }
        });

        if (estetica) {
            await estetica.update({
                categoria
            });
        }

        res.json({
            mensaje: "Producto de estética actualizado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al actualizar producto"
        });
    }
}
module.exports = {
    obtenerLubricantes,
    obtenerEstetica,
    registrarVenta,
    obtenerTicket,
    crearLubricante,
    crearEstetica,
    actualizarLubricante,
    actualizarEstetica
};