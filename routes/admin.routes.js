const express = require("express");
const router = express.Router();


const{
    registrarUsuario,
    login,
    cambiarPassword,
    eliminarUsuario,
    logout,
    mostrarAdmin,
    mostrarEditarProducto,
    mostrarFormularioNuevoProducto} = require("../controllers/usuarios.controller")
    
const authMiddleware = require("../middlewares/auth.middleware")
const guestMiddleware = require("../middlewares/guest.middleware")

router.post("/registrarUsuario",registrarUsuario)
router.post("/login",login)
router.get("/logout",logout)
router.patch("/cambiarPassword", cambiarPassword);
router.delete("/eliminarUsuario", eliminarUsuario);
router.get("/login",guestMiddleware, (req, res) => {res.render("login");});
router.get("/admin/productos", mostrarAdmin);
router.get("/admin/productos/:id/editar", mostrarEditarProducto);
router.get("/admin/productos/nuevo",mostrarFormularioNuevoProducto)

module.exports = router;