const express = require("express");
const router = express.Router();


const{
    registrarUsuario,
    login,
    cambiarPassword,
    eliminarUsuario} = require("../controllers/usuarios.controller")

router.post("/registrarUsuario",registrarUsuario)
router.post("/login",login)
router.patch("/cambiarPassword", cambiarPassword);
router.delete("/eliminarUsuario", eliminarUsuario);
router.get("/login", (req, res) => {res.render("login");});
router.get("/",(req,res)=>{res.render("admin");})

module.exports = router;