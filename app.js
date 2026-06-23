const express = require('express');
const sequelize = require('./ORM/database/connection');

const Lubricante = require('./ORM/model/Lubricante');
const EsteticaVehicular = require('./ORM/model/EsteticaVehicular');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que el servidor entienda JSON
app.use(express.json());

// ENDPOINTS PARA LUBRICANTES

// 1. Obtener todos los lubricantes
app.get('/api/lubricantes', async (req, res) => {
  try {
    const lubricantes = await Lubricante.findAll();
    res.json(lubricantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los lubricantes', detalles: error.message });
  }
});

// 2. Obtener un lubricante por su ID
app.get('/api/lubricantes/:id', async (req, res) => {
  try {
    const lubricante = await Lubricante.findByPk(req.params.id);
    if (!lubricante) {
      return res.status(404).json({ error: 'Lubricante no encontrado' });
    }
    res.json(lubricante);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el lubricante', detalles: error.message });
  }
});

// ENDPOINTS PARA ESTÉTICA VEHICULAR

// 3. Obtener todos los productos de estética
app.get('/api/estetica', async (req, res) => {
  try {
    const productos = await EsteticaVehicular.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos de estética', detalles: error.message });
  }
});

// 4. Obtener un producto de estética por su ID
app.get('/api/estetica/:id', async (req, res) => {
  try {
    const producto = await EsteticaVehicular.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', detalles: error.message });
  }
});

// ARRANQUE DEL SERVIDOR
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con la base de datos verificada.');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

iniciarServidor();
