const btnTema = document.getElementById("btnTema");
const html = document.documentElement;

const temaGuardado = localStorage.getItem("theme");

if (temaGuardado) {
    html.setAttribute("data-theme", temaGuardado);
} else {
    const oscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

    html.setAttribute(
        "data-theme",
        oscuro ? "dark" : "light"
    );
}

actualizarIcono();

btnTema.addEventListener("click", () => {

    const temaActual = html.getAttribute("data-theme");

    if (temaActual === "light") {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }

    actualizarIcono();
});

function actualizarIcono() {
    btnTema.textContent =
        html.getAttribute("data-theme") === "dark"
            ? "☀️"
            : "🌙";
}