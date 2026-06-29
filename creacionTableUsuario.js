
const { Sequelize } = require("sequelize");

// IMPORTA TU CONEXIÓN (ajustá la ruta)
const sequelize = require("./ORM/database/connection");

// IMPORTA EL MODELO
const UsuarioModel = require("./ORM/models/Usuario");

// inicializar modelo
const Usuario = UsuarioModel(sequelize);

async function createTable() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a DB OK");

    await sequelize.sync({ force: false }); 
    // force: false => no borra datos si existe
    // si querés recrearla: force: true

    console.log("Tabla 'usuarios' creada/verificada correctamente");

    process.exit(0);
  } catch (error) {
    console.error("Error creando tabla:", error);
    process.exit(1);
  }
}

createTable();