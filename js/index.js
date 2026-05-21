const inputNombre = document.getElementById("inputNombre")

const botonAceptar = document.getElementById("aceptarIngreso")
botonAceptar.addEventListener("click",aceptarIngreso)

function aceptarIngreso(){
    const nombre = inputNombre.value
    inputNombre.value = ""
    localStorage.setItem('nombre', nombre)
    window.location.href = "../html/productos.html"
}