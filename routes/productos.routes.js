const express = require("express");
const router = express.Router();

const {
    obtenerLubricantes,
    obtenerEstetica,
    registrarVenta,
    obtenerTicket,
    desactivarProducto,
    activarProducto,
    editarProducto,
    crearProducto,
    obtenerEsteticaPaginado,
    obtenerLubricantesPaginado
} = require("../controllers/productos.controller");

const upload = require("../config/multer");


router.get("/api/lubricantes", obtenerLubricantes);
router.get("/api/estetica", obtenerEstetica);
router.get("/api/esteticaPaginado",obtenerEsteticaPaginado)
router.get("/api/lubricantesPaginado",obtenerLubricantesPaginado)
router.post("/api/venta",registrarVenta)
router.get("/api/ticket/:id", obtenerTicket)
router.get("/admin/productos/:id/desactivar", desactivarProducto);
router.get("/admin/productos/:id/activar", activarProducto);
router.post(
  "/admin/productos/:id/editar",
  upload.single("imagen"),
  editarProducto
);
router.post(
    "/admin/productos/nuevo",
    upload.single("imagen"),
    crearProducto
);


module.exports = router;