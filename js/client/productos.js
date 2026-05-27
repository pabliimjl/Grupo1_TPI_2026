import { EsteticaVehicular, Lubricante, Producto } from "../producto.js";
import { loadTemplate } from "../template.js";

const botonLubricantes = document.getElementById("lubricantes")
botonLubricantes.addEventListener("click",mostrarLubricantes);

const botonEsteticaVehicular = document.getElementById("esteticaVehicular")
botonEsteticaVehicular.addEventListener("click",mostrarEstetica)

const grillaProductos = document.getElementById("productos")


document.addEventListener("DOMContentLoaded", ()=>{
    loadTemplate();
    const saludo = document.getElementById("saludo")
    const nombre = localStorage.getItem('nombre')
    saludo.innerHTML = `Hola ${nombre}!`
    mostrarLubricantes()
});

function mostrarLubricantes(){
    limpiarProductos()
    botonEsteticaVehicular.style.backgroundColor="skyblue"
    botonLubricantes.style.backgroundColor="#0f9ea5"
    console.log("lubricantes");
    agregarLubricantesGrilla();
}

function mostrarEstetica(){
    limpiarProductos()
    botonLubricantes.style.backgroundColor="skyblue"
    console.log("lubricantes");
    botonEsteticaVehicular.style.backgroundColor="#0f9ea5"
    agregarEsteticaGrilla()
}

function limpiarProductos(){
    grillaProductos.innerHTML = "";
}

async function cargarLubricantes(){
    const response = await fetch("../../resources/productos/lubricantes.json")
    const lubricantes = await response.json()
    console.log(lubricantes);
    
    
    return lubricantes
}

async function agregarLubricantesGrilla(){
    const lubricantes = await cargarLubricantes()
    
    for(const lubricante of lubricantes){
        const lub = new Lubricante(lubricante.marca,lubricante.producto,lubricante.formato,lubricante.densidad,lubricante.tipo,lubricante.precio_bruto,lubricante.url)
        grillaProductos.appendChild(lub.createHtmlElement());
        
    }
}

async function cargarEsteticaVehicular(){
    const response = await fetch("../../resources/productos/esteticaVehicular.json")
    const esteticaVehicular = await response.json()
    
    
    return esteticaVehicular
}

async function agregarEsteticaGrilla(){
    const esteticaVehicular = await cargarEsteticaVehicular()
    
    for(const estetica of esteticaVehicular){
        const est = new EsteticaVehicular(estetica.marca,estetica.producto,estetica.categoria,estetica.formato,estetica.precio_bruto,estetica.url)
        grillaProductos.appendChild(est.createHtmlElement());
        
    }
}
