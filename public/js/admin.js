document.addEventListener("DOMContentLoaded", () => {

    const btnLogout = document.getElementById("btnLogout");
    const btnVentas = document.getElementById("btnVentas");

    const modal = document.getElementById("modalConfirm");
    const modalText = document.getElementById("modalText");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnConfirmar = document.getElementById("btnConfirmar");

    let urlAccion = "";

    btnLogout.addEventListener("click", () => {
        window.location.href = "/logout";
    });

    btnVentas.addEventListener("click", () => {
        window.location.href = "/admin/ventas";
    });

    document.querySelectorAll(".btn-activar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            urlAccion = btn.href;

            modalText.innerText = "¿Seguro que querés activar este producto?";
            btnConfirmar.href = urlAccion;

            modal.classList.remove("hidden");
        });
    });

    document.querySelectorAll(".btn-desactivar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            urlAccion = btn.href;

            modalText.innerText = "¿Seguro que querés desactivar este producto?";
            btnConfirmar.href = urlAccion;

            modal.classList.remove("hidden");
        });
    });

    btnCancelar.addEventListener("click", () => {
        modal.classList.add("hidden");
        btnConfirmar.href = "#";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

});