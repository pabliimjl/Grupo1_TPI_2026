const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        // Si el host es localhost o 127.0.0.1, desactiva dialectOptions. De lo contrario, aplica SSL.
        dialectOptions: process.env.DB_HOST === '127.0.0.1' || process.env.DB_HOST === 'localhost'
            ? {}
            : {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
    }
);


module.exports = connection;