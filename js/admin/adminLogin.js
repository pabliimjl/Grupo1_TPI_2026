import { loadTemplate } from "../template.js";

document.addEventListener("DOMContentLoaded", function() {
    loadTemplate();
});

const botonAceptar = document.getElementById("aceptarIngreso");
botonAceptar.addEventListener("click",aceptarIngreso);

function aceptarIngreso(){
    const email = document.getElementById("inputEMail").value;
    const password = document.getElementById("inputPassword").value;
    window.location.href = "./dashboard.html";
    /*
    if (email != "" && password != "") {
        document.getElementById("inputEMail").value = "";
        document.getElementById("inputPassword").value = "";
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        window.location.href = "../../../html/admin/dashboard.html";
    } else {
        alert("Ingrese un email y contraseña por favor.");
    }
        */
}
// Agregar validacion de datos, para que el email tenga formato correcto, 
// y la contraseña tenga al menos 8 caracteres, una mayuscula, una minuscula 
// y un numero.

