import { EsteticaVehicular, Lubricante, Producto } from "../producto.js";
import { loadTemplate } from "../template.js";

document.addEventListener("DOMContentLoaded", function() {
    loadTemplate();
    cargarFormularios();
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const formLubricantes = document.querySelector("#formLubricantes");
const formEsteticaVehicular = document.querySelector("#formEsteticaVehicular");

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

function cargarFormularios() {
    console.log(`Cargando formularios...`);
    
    const formularioLubricantes = cargarFormularioLubricantes();
    const formularioEsteticaVehicular = cargarFormularioEsteticaVehicular();
    const formLubricantes = document.querySelector("#formLubricantes table tbody");
    const formEsteticaVehicular = document.querySelector("#formEsteticaVehicular table tbody");
    console.log(`Formularios cargados:`, formularioLubricantes, formularioEsteticaVehicular);
    formLubricantes.appendChild(formularioLubricantes);
    formEsteticaVehicular.appendChild(formularioEsteticaVehicular);
}