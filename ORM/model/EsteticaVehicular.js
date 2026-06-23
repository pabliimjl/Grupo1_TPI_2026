const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Tu archivo de conexión

const EsteticaVehicular = sequelize.define('EsteticaVehicular', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true, // <-- CAMBIAR A TRUE
    defaultValue: 'Sin marca'
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  formato: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:'Sin formato'
  },
  precio_bruto: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:true
  }
}, {
  tableName: 'esteticas-vehicular',
  timestamps: true // Crea automáticamente las columnas createdAt y updatedAt
});

module.exports = EsteticaVehicular;
