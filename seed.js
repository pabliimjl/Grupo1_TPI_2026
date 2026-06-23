const fs = require('fs');
const path = require('path');
const sequelize = require('./ORM/database/connection');

// Importa tus modelos corregidos
const Lubricante = require('./ORM/model/Lubricante'); 
const EsteticaVehicular = require('./ORM/model/EsteticaVehicular'); 

async function cargarDatos() {
  try {
    // 1. Conectar y asegurar que las tablas existan
    await sequelize.authenticate();
    console.log('🔄 Conectado a la base de datos. Sincronizando tablas...');
    await sequelize.sync({ alter: true }); 

    // 2. Leer y parsear los archivos JSON
    // Ajusta las rutas ('./ruta/al/archivo.json') si tus JSON están en otra carpeta
    const rutaLubricantes = path.join(__dirname, './resources/productos/lubricantes.json');
    const rutaEstetica = path.join(__dirname, './resources/productos/esteticaVehicular.json');

    const datosLubricantes = JSON.parse(fs.readFileSync(rutaLubricantes, 'utf-8'));
    const datosEstetica = JSON.parse(fs.readFileSync(rutaEstetica, 'utf-8'));

    // 3. Insertar los datos de forma masiva
    console.log('⏳ Insertando datos de Lubricantes...');
    await Lubricante.bulkCreate(datosLubricantes);
    console.log(`✅ ¡${datosLubricantes.length} lubricantes guardados con éxito!`);

    console.log('⏳ Insertando datos de Estética Vehicular...');
    await EsteticaVehicular.bulkCreate(datosEstetica);
    console.log(`✅ ¡${datosEstetica.length} productos de estética guardados con éxito!`);

    console.log('\n🚀 ¡Proceso de carga masiva finalizado correctamente!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error durante la carga de datos:', error);
    process.exit(1);
  }
}

cargarDatos();
