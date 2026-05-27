import { EsteticaVehicular, Lubricante, Producto } from "./producto.js";

const botonLubricantes = document.getElementById("lubricantes")
botonLubricantes.addEventListener("click",mostrarLubricantes);

const botonEsteticaVehicular = document.getElementById("esteticaVehicular")
botonEsteticaVehicular.addEventListener("click",mostrarEstetica)

const paginaAnterior = document.getElementById('paginaAnterior')
paginaAnterior.addEventListener('click', bajarPagina)

const paginaSiguiente = document.getElementById('paginaSiguiente')
paginaSiguiente.addEventListener('click',subirPagina)

const numeroPagina = document.getElementById('numeroPagina')

const grillaProductos = document.getElementById("productos")

let estoyLubricantes = true;
let arrayLubricantes = []
let arrayEstetica = []
let paginaLubricantes = 1;
let paginaEstetica = 1;



document.addEventListener("DOMContentLoaded", async ()=>{
    const saludo = document.getElementById("saludo")
    const nombre = localStorage.getItem('nombre')
    saludo.innerHTML = `Hola ${nombre}!`
    await agregarLubricantesAlArray()
    await agregarEsteticaAlArray()
    mostrarLubricantes()
})

function mostrarLubricantes(){
    limpiarProductos()
    botonEsteticaVehicular.style.backgroundColor="skyblue"
    botonLubricantes.style.backgroundColor="#0f9ea5"
    mostrarPaginaLubricantes(paginaLubricantes);
    estoyLubricantes = true;
    numeroPagina.innerHTML = paginaLubricantes;
}

function mostrarEstetica(){
    limpiarProductos()
    botonLubricantes.style.backgroundColor="skyblue"
    botonEsteticaVehicular.style.backgroundColor="#0f9ea5"
    mostrarPaginaEstetica(paginaEstetica)
    estoyLubricantes = false;
    numeroPagina.innerHTML = paginaEstetica;
}

function limpiarProductos(){
    grillaProductos.innerHTML = "";
}

function subirPagina(){
    if(estoyLubricantes){
        paginaLubricantes++;
        mostrarLubricantes()
    }else{
        paginaEstetica++;
        mostrarEstetica()
    }
}

function bajarPagina(){
    if(estoyLubricantes){
        if(paginaLubricantes>1){
            paginaLubricantes--;
        mostrarLubricantes()
        }else{
            alert('Estas en la primer pagina')
        }
    }else{
        if(paginaEstetica>1){
        paginaEstetica--;
        mostrarEstetica()}
        else{
            alert('Estas en la primer pagina')
        }
    }
    console.log(paginaLubricantes);
    console.log(paginaEstetica);
}
async function cargarLubricantes(){
    const response = await fetch("../resources/productos/lubricantes.json")
    const lubricantes = await response.json()
    
    return lubricantes
}

async function agregarLubricantesAlArray(){
    const lubricantes = await cargarLubricantes()
    
    for(const lubricante of lubricantes){
        const lub = new Lubricante(lubricante.marca,lubricante.producto,lubricante.formato,lubricante.densidad,lubricante.tipo,lubricante.precio_bruto,lubricante.url)
        arrayLubricantes.push(lub)
        //grillaProductos.appendChild(lub.createHtmlElement());
        
    }
    
}

async function cargarEsteticaVehicular(){
    const response = await fetch("../resources/productos/esteticaVehicular.json")
    const esteticaVehicular = await response.json()
    
    
    return esteticaVehicular
}

async function agregarEsteticaAlArray(){
    const esteticaVehicular = await cargarEsteticaVehicular()
    
    for(const estetica of esteticaVehicular){
        const est = new EsteticaVehicular(estetica.marca,estetica.producto,estetica.categoria,estetica.formato,estetica.precio_bruto,estetica.url)
        arrayEstetica.push(est)
        //grillaProductos.appendChild(est.createHtmlElement());
        
    }
}

async function mostrarPaginaLubricantes(pagina){
  const inicio = 12*(pagina-1)
    const fin = inicio + 12

    const paginaActual = arrayLubricantes.slice(inicio,fin)
    
    for(const est of paginaActual){        
        grillaProductos.appendChild(est.createHtmlElement())
    }
}

async function mostrarPaginaEstetica(pagina){
    const inicio = 12*(pagina-1)
    const fin = inicio + 12

    const paginaActual = arrayEstetica.slice(inicio,fin)
    
    for(const est of paginaActual){
        grillaProductos.appendChild(est.createHtmlElement())
    }
}
