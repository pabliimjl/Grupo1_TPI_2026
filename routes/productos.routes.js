const express = require("express");
const router = express.Router();

const {
    obtenerLubricantes,
    obtenerEstetica,
    registrarVenta,
    obtenerTicket
} = require("../controllers/productos.controller");

const upload = require("../config/multer");

const { subirImagen } = require("../controllers/images.controller");

router.post("/imagen", upload.single("imagen"), subirImagen);


router.get("/lubricantes", obtenerLubricantes);
router.get("/estetica", obtenerEstetica);
router.post("/venta",registrarVenta)
router.get("/ticket/:id", obtenerTicket)

module.exports = router;