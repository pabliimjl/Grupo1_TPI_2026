import { EsteticaVehicular, Lubricante } from "./Producto.js";
const API_URL = "http://localhost:3000";
const botonLubricantes = document.getElementById("lubricantes");
const botonEsteticaVehicular = document.getElementById("esteticaVehicular");

const paginaAnterior = document.getElementById("paginaAnterior");
const paginaSiguiente = document.getElementById("paginaSiguiente");
const numeroPagina = document.getElementById("numeroPagina");

const grillaProductos = document.getElementById("productos");

botonLubricantes.addEventListener("click", mostrarLubricantes);
botonEsteticaVehicular.addEventListener("click", mostrarEstetica);

paginaAnterior.addEventListener("click", bajarPagina);
paginaSiguiente.addEventListener("click", subirPagina);

let estoyLubricantes = true;

let paginaLubricantes = 1;
let paginaEstetica = 1;

let totalPaginasLubricantes = 1;
let totalPaginasEstetica = 1;

document.addEventListener("DOMContentLoaded", async () => {

    const saludo = document.getElementById("saludo");
    const nombre = localStorage.getItem("nombre");
    saludo.innerHTML = `Hola ${nombre}!`;

    await mostrarLubricantes();
});

function limpiarProductos() {
    grillaProductos.innerHTML = "";
}

function actualizarPaginaUI() {
    numeroPagina.innerHTML = estoyLubricantes
        ? paginaLubricantes
        : paginaEstetica;
}


async function cargarLubricantes(page = 1) {

    const response = await fetch(`http://localhost:3000/api/lubricantesPaginado?page=${page}`);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error API:", errorText);
        throw new Error("Error al cargar lubricantes");
    }

    return await response.json();
}

async function mostrarLubricantes() {
    
    botonLubricantes.style.backgroundColor="#2563EB"
    botonEsteticaVehicular.style.backgroundColor="#232d3e"
    limpiarProductos();

    const data = await cargarLubricantes(paginaLubricantes);

    totalPaginasLubricantes = data.totalPaginas;

    estoyLubricantes = true;
    actualizarPaginaUI();

    for (const item of data.productos) {

        const lub = new Lubricante(
            item.id,
            item.marca,
            item.nombre_producto,
            item.formato,
            item.lubricante?.densidad,
            item.lubricante?.tipo,
            item.precio,
            API_URL+item.url_imagen
        );

        grillaProductos.appendChild(lub.createHtmlElement());
    }
}

async function cargarEstetica(page = 1) {

    const response = await fetch(`http://localhost:3000/api/esteticaPaginado?page=${page}`);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error API:", errorText);
        throw new Error("Error al cargar estética");
    }

    return await response.json();
}

async function mostrarEstetica() {

    botonEsteticaVehicular.style.backgroundColor="#2563EB"
    botonLubricantes.style.backgroundColor="#232d3e"
    limpiarProductos();

    const data = await cargarEstetica(paginaEstetica);

    totalPaginasEstetica = data.totalPaginas;

    estoyLubricantes = false;
    actualizarPaginaUI();

    for (const item of data.productos) {

        const est = new EsteticaVehicular(
            item.id,
            item.marca,
            item.nombre_producto,
            item.esteticaVehicular?.categoria,
            item.formato,
            item.precio,
            API_URL+item.url_imagen
        );

        grillaProductos.appendChild(est.createHtmlElement());
    }
}

function subirPagina() {

    if (estoyLubricantes) {

        if (paginaLubricantes < totalPaginasLubricantes) {
            paginaLubricantes++;
            mostrarLubricantes();
        }

    } else {

        if (paginaEstetica < totalPaginasEstetica) {
            paginaEstetica++;
            mostrarEstetica();
        }
    }
}

function bajarPagina() {

    if (estoyLubricantes) {

        if (paginaLubricantes > 1) {
            paginaLubricantes--;
            mostrarLubricantes();
        }

    } else {

        if (paginaEstetica > 1) {
            paginaEstetica--;
            mostrarEstetica();
        }
    }
}