import { loadTemplate } from "../template.js";

document.addEventListener("DOMContentLoaded", function() {
    loadTemplate();
});

const inputNombre = document.getElementById("inputNombre")

const botonAceptar = document.getElementById("aceptarIngreso")
botonAceptar.addEventListener("click",aceptarIngreso)

function aceptarIngreso(){
    const nombre = inputNombre.value
    if(nombre != ""){
        inputNombre.value = ""
        localStorage.setItem('nombre', nombre)
        window.location.href = "./productos.html"}
    else{
        alert("Ingrese un nombre por favor.")
    }
}