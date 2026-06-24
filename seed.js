const fs = require("fs");
const path = require("path");

const sequelize = require("./ORM/database/connection");

const {
    Producto,
    Lubricante,
    EsteticaVehicular
} = require("./ORM/models")(sequelize);

async function seed() {

    try {

        await sequelize.authenticate();

        const rutaEstetica = path.join(
            __dirname,
            "resources",
            "productos",
            "esteticaVehicular.json"
        );

        const estetica = JSON.parse(
            fs.readFileSync(rutaEstetica, "utf8")
        );

        for (const item of estetica) {

            const producto = await Producto.create({
                marca: item.marca ?? 'Sin marca',
                nombre_producto: item.producto,
                formato: item.formato ?? 'No especificado',
                precio: item.precio_bruto,
                url_imagen: item.url,
                tipo_producto: "estetica_vehicular"
            });

            await EsteticaVehicular.create({
                producto_id: producto.id,
                categoria: item.categoria
            });
        }

        console.log("✔ Estética cargada");

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

seed();