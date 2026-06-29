const express = require("express");
const router = express.Router();

const {
    obtenerLubricantes,
    obtenerEstetica,
    registrarVenta,
    obtenerTicket,
    registrarUsuario,
    login
} = require("../controllers/productos.controller");

router.get("/lubricantes", obtenerLubricantes);
router.get("/estetica", obtenerEstetica);
router.post("/venta",registrarVenta)
router.get("/ticket/:id", obtenerTicket)
router.post("/registrarUsuario",registrarUsuario)
router.post("/login",login)
module.exports = router;