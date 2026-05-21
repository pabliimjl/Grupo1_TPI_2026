const botonLubricantes = document.getElementById("lubricantes")
botonLubricantes.addEventListener("click",mostrarLubricantes);
const botonEsteticaVehicular = document.getElementById("esteticaVehicular")
botonEsteticaVehicular.addEventListener("click",mostrarEstetica)

document.addEventListener("DOMContentLoaded", ()=>{
    const saludo = document.getElementById("saludo")
    const nombre = localStorage.getItem('nombre')
    saludo.innerHTML = `Hola ${nombre}!`
})

function mostrarLubricantes(){
    botonLubricantes.style.backgroundColor="skyblue"
    console.log("lubricantes");
    
}

function mostrarEstetica(){
    botonEsteticaVehicular.style.backgroundColor="skyblue"
    console.log("estetica");
    
}