const inputNombre = document.getElementById("inputNombre")

const botonAceptar = document.getElementById("aceptarIngreso")
botonAceptar.addEventListener("click",aceptarIngreso)


const input = document.getElementById("inputNombre");

input.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
    document.getElementById("aceptarIngreso").click(); 
}
});

function aceptarIngreso(){
    const nombre = inputNombre.value
    if(nombre != ""){
        inputNombre.value = ""
        localStorage.setItem('nombre', nombre)
        window.location.href = "./html/productos.html"}
    else{
        alert("Ingrese un nombre por favor.")
    }
}