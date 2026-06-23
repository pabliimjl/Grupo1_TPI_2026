const Sequelize = require('sequelize');
require('dotenv').config()

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres', 
        logging: false, // Desactiva los logs de Sequelize
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Permite la conexión segura sin certificados locales
            }
        }
});
const createDatabase = new Sequelize(
    'postgres', // Conecta a la BD por defecto del sistema de Postgres
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
});


async function checkDatabaseExistOrCreate() {
    try {
        console.log('Verificando base de datos...');
        const [results] = await createDatabase.query(`SELECT datname FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
        if (results.length === 0) {
            //await createDatabase.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            await createDatabase.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
            await connection.sync({ force: true });
        } else {
            console.log('La base de datos ya existe.');
        }
    } catch (error) {
        console.error('Error al verificar la base de datos:', error);
    }
}

async function initializeDatabase() {
    try {
        await checkDatabaseExistOrCreate();
        console.log('Conexión a la base de datos con exito.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

initializeDatabase();

module.exports =  connection;