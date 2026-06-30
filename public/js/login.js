document.addEventListener("DOMContentLoaded", () => {

    const btnAccesoRapido = document.getElementById("btnAccesoRapido");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const form = document.getElementById("loginForm");
    const mensajeError = document.getElementById("mensajeError");

form.addEventListener("submit", async (e) => {

    e.preventDefault(); // Evita que cambie de página

    mensajeError.textContent = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch("/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            mensajeError.textContent = data.mensaje;
            return;
        }

        // Login correcto
        window.location.href = "/admin";

    } catch (error) {

        mensajeError.textContent = "\nNo se pudo conectar con el servidor.";

    }

});

    btnAccesoRapido.addEventListener("click", () => {

        email.value = "admin@lubrimarket.com";
        password.value = "profeapruebeme";

        email.focus();

    });



});