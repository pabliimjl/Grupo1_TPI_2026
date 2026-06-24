const express = require("express");
const router = express.Router();

const {
    obtenerLubricantes,
    obtenerEstetica
} = require("../controllers/productos.controller");

router.get("/lubricantes", obtenerLubricantes);
router.get("/estetica", obtenerEstetica);

module.exports = router;