const sequelize = require("./ORM/database/connection");

require("./ORM/models")(sequelize);

async function iniciar() {
    try {

        await sequelize.authenticate();
        console.log("Conectado a PostgreSQL");

        await sequelize.sync({ force: true });

        console.log("Tablas sincronizadas");

    } catch (error) {
        console.error(error);
    }
}

iniciar();