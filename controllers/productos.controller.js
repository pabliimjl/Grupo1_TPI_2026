const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
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

async function listarLubricantes() {

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

    return lubricantes.map(mapearLubricante);

}

async function listarLubricantesActivos() {

    const lubricantes = await Producto.findAll({
        where: {
            tipo_producto: "lubricante",
            activo:true
        },
        include: [
            {
                model: Lubricante,
                as: "lubricante"
            }
        ]
    });

    return lubricantes.map(mapearLubricante);

}

async function listarEstetica() {
    
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

    return estetica.map(mapearEstetica);

}

async function listarEsteticaActivos() {
    
    const estetica = await Producto.findAll({
        where: {
            tipo_producto: "estetica_vehicular",
            activo:true
        },
        include: [
            {
                model: EsteticaVehicular,
                as: "esteticaVehicular"
            }
        ]
    });
    
    return estetica.map(mapearEstetica);
    
}

async function obtenerLubricantes(req, res) {

    try {

        const lubricantes = await listarLubricantesActivos();

        res.json(lubricantes);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener lubricantes"
        });

    }

}

async function obtenerLubricantesPaginado(req, res) {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        const lubricantes = await Producto.findAndCountAll({
            where: {
                tipo_producto: "lubricante",
                activo:true
            },
            include: [
                {
                    model: Lubricante,
                    as: "lubricante"
                }
            ],
            limit,
            offset,
            order: [["id", "ASC"]]
        });

        res.json({
            productos: lubricantes.rows,
            total: lubricantes.count,
            paginaActual: page,
            totalPaginas: Math.ceil(lubricantes.count / limit)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener lubricantes"
        });

    }
}

async function obtenerEstetica(req, res) {

    try {

        const estetica = await listarEsteticaActivos();

        res.json(estetica);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener estética vehicular"
        });

    }

}

async function obtenerEsteticaPaginado(req, res) {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = 12;
        const offset = (page - 1) * limit;

        const estetica = await Producto.findAndCountAll({
            where: {
                tipo_producto: "estetica_vehicular",
                activo:true
            },
            include: [
                {
                    model: EsteticaVehicular,
                    as: "esteticaVehicular"
                }
            ],
            limit,
            offset,
            order: [["id", "ASC"]]
        });

        res.json({
            productos: estetica.rows,
            total: estetica.count,
            paginaActual: page,
            totalPaginas: Math.ceil(estetica.count / limit)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener estética vehicular"
        });

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

        const venta = await Venta.create({
            nombre_comprador,
            total
        });

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

async function crearProducto(req, res) {
    try {
        const {
            marca,
            nombre_producto,
            formato,
            precio,
            tipo_producto,
            densidad,
            tipo,
            categoria
        } = req.body;

        if (!marca || !nombre_producto || !formato || !precio || !tipo_producto) {
            return res.status(400).send("Faltan datos obligatorios");
        }

        const producto = await Producto.create({
            marca,
            nombre_producto,
            formato,
            precio,
            tipo_producto,
            url_imagen: null,
            activo: true
        });

        if (req.file) {

            const ext = path.extname(req.file.originalname);

            const newFileName = `producto-${producto.id}${ext}`;

            const oldPath = req.file.path;
            const newPath = path.join(
                "public/resources/images",
                newFileName
            );

            fs.renameSync(oldPath, newPath);

            const urlImagen = "/images/" + newFileName;

            await producto.update({ url_imagen: urlImagen });
        }

        if (tipo_producto === "lubricante") {
            await Lubricante.create({
                producto_id: producto.id,
                densidad,
                tipo
            });
        }

        if (tipo_producto === "estetica_vehicular") {
            await EsteticaVehicular.create({
                producto_id: producto.id,
                categoria
            });
        }

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al crear producto");
    }
}

async function desactivarProducto(req, res) {
    try {
        const { id } = req.params;

        await Producto.update(
            { activo: false },
            { where: { id } }
        );

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error("Error al desactivar producto:", error);
        return res.status(500).send("Error interno");
    }
}

async function activarProducto(req, res) {
    try {
        const { id } = req.params;

        await Producto.update(
            { activo: true },
            { where: { id } }
        );

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error("Error al activar producto:", error);
        return res.status(500).send("Error interno");
    }
}

async function editarProducto(req, res) {
    try {
        const { id } = req.params;

        const {
            marca,
            nombre_producto,
            formato,
            precio,
            tipo_producto,
            activo,
            densidad,
            tipo,
            categoria,
            url_imagen
        } = req.body;
        console.log(tipo_producto);
        
        let imagenFinal = url_imagen;

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            imagenFinal = `/images/producto-${id}${ext}`;
        }
        await Producto.update(
            {
                marca,
                nombre_producto,
                formato,
                precio,
                tipo_producto,
                activo: activo === "true",
                url_imagen: imagenFinal
            },
            { where: { id } }
        );

        if (tipo_producto === "lubricante") {
            await Lubricante.update(
                {
                    densidad,
                    tipo
                },
                {
                    where: { producto_id: id }
                }
            );
        }

        if (tipo_producto === "estetica_vehicular") {
            await EsteticaVehicular.update(
                {
                    categoria
                },
                {
                    where: { producto_id: id }
                }
            );
        }

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error("Error editando producto:", error);
        return res.status(500).send("Error interno");
    }
}

module.exports = { editarProducto };


module.exports = {
    obtenerLubricantes,
    obtenerEstetica,
    registrarVenta,
    obtenerTicket,
    listarEstetica,
    listarLubricantes,
    activarProducto,
    desactivarProducto,
    editarProducto,
    crearProducto,
    obtenerEsteticaPaginado,
    obtenerLubricantesPaginado
};