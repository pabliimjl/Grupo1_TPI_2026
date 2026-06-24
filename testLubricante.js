const sequelize = require('./ORM/database/connection'); // Tu conexión
const Lubricante = require('./ORM/models/Lubricante');  // Tu modelo corregido

async function inicializarBaseDeDatos() {
  try {
    // Autentica que la conexión a MySQL funcione
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // sync({ alter: true }) crea la tabla si no existe, o la actualiza si cambió
    await sequelize.sync({ alter: true });
    console.log('¡La tabla "lubricantes" ha sido creada con éxito!');
    
    process.exit(0); // Cierra el proceso sin errores
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
}

inicializarBaseDeDatos();
