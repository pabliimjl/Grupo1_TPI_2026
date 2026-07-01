const express = require("express");
const router = express.Router();

const {
    listarVentas
} = require("../controllers/ventas.controller");

router.get("/admin/ventas", listarVentas);

module.exports = router;