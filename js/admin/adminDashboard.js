import { EsteticaVehicular, Lubricante, Producto } from "../producto.js";
import { loadTemplate } from "../template.js";

document.addEventListener("DOMContentLoaded", function() {
    loadTemplate();
    cargarTablas();
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const tablaLubricantes = document.querySelector("#tablaLubricantes table tbody");
const tablaEsteticaVehicular = document.querySelector("#tablaEsteticaVehicular table tbody");

let listadoLubricantes = [];
let listadoEsteticaVehicular = [];

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        // Quitamos la clase active de todos los botones y contenidos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        // Activamos el botón y contenido correspondiente
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});


async function cargarTablas() {
    console.log(`Cargando tablas...`);
    
    listadoLubricantes = await cargarLubricantes();
    listadoEsteticaVehicular = await cargarEsteticaVehicular();

    const tablaLubricantes = document.querySelector("#tablaLubricantes table tbody");
    const tablaEsteticaVehicular = document.querySelector("#tablaEsteticaVehicular table tbody");

    console.log(`Lubricantes cargados:`, listadoLubricantes.length);
    listadoLubricantes.forEach(lubricante => {
        const lub = new Lubricante(lubricante.marca,lubricante.producto,lubricante.formato,lubricante.densidad,lubricante.tipo,lubricante.precio_bruto,lubricante.url);
        const trLub = lub.createHtmlTr();
        tablaLubricantes.appendChild(trLub);
        const modificarButtonLub = trLub.querySelector("#modificarLubButton");
        const eliminarButtonLub = trLub.querySelector("#eliminarLubButton");
        eliminarButtonLub.addEventListener("click", () => {
            // Aquí puedes implementar la lógica para eliminar el producto
            console.log(`Eliminando producto: ${lub.nombre_producto}`);
            const fila = eliminarButtonLub.closest('tr');
            fila.remove();
            listadoLubricantes = listadoLubricantes.filter(l => l.nombre_producto !== lub.nombre_producto);
        });

        modificarButtonLub.addEventListener("click", () => {
            console.log(`Modificar producto: ${lub.nombre_producto}`);
            //Lubricante.modificar(this);
        });
    });
    
    console.log(`Estética vehicular cargada:`, listadoEsteticaVehicular.length);
    listadoEsteticaVehicular.forEach(estetica => {
        const est = new EsteticaVehicular(estetica.marca,estetica.producto,estetica.categoria,estetica.formato,estetica.precio_bruto,estetica.url);
        const trEst = est.createHtmlTr();
        tablaEsteticaVehicular.appendChild(trEst);
        const modificarButtonEst = trEst.querySelector("#modificarEstButton");
        const eliminarButtonEst = trEst.querySelector("#eliminarEstButton");
        eliminarButtonEst.addEventListener("click", () => {
            // Aquí puedes implementar la lógica para eliminar el producto
            console.log(`Eliminar producto: ${est.nombre_producto}`);
            const fila = eliminarButtonEst.closest('tr');
            fila.remove();
            listadoEsteticaVehicular = listadoEsteticaVehicular.filter(e => e.nombre_producto !== est.nombre_producto);
        });

        modificarButtonEst.addEventListener("click", () => {
            console.log(`Modificar producto: ${est.nombre_producto}`);
            //EsteticaVehicular.modificar(this);
        });
    });
}

async function cargarLubricantes(){
    const response = await fetch("../../resources/productos/lubricantes.json");
    const lubricantes = await response.json();
    console.log(lubricantes);
    return lubricantes;
}

async function cargarEsteticaVehicular(){
    const response = await fetch("../../resources/productos/esteticaVehicular.json");
    const esteticaVehicular = await response.json();
    console.log(esteticaVehicular);
    return esteticaVehicular;
}
