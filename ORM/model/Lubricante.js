const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Tu archivo de conexión

const Lubricante = sequelize.define('Lubricante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  formato: {
    type: DataTypes.STRING,
    allowNull: false
  },
  densidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
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
  tableName: 'lubricantes',
  timestamps: true // Crea automáticamente las columnas createdAt y updatedAt
});

module.exports = Lubricante;
