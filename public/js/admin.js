document.addEventListener("DOMContentLoaded", () => {

    const btnLogout = document.getElementById("btnLogout");

    const productos = document.getElementById("productos");

    const ventas = document.getElementById("ventas");

    btnLogout.addEventListener("click", () => {

        window.location.href = "/logout";

    });

    productos.querySelector("button").addEventListener("click", () => {

        window.location.href = "/admin/productos";

    });

    ventas.querySelector("button").addEventListener("click", () => {

        window.location.href = "/admin/ventas";

    });

});