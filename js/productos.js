const botonLubricantes = document.getElementById("lubricantes")
botonLubricantes.addEventListener("click",mostrarLubricantes);
const botonEsteticaVehicular = document.getElementById("esteticaVehicular")
botonEsteticaVehicular.addEventListener("click",mostrarEstetica)

document.addEventListener("DOMContentLoaded", ()=>{
    const saludo = document.getElementById("saludo")
    const nombre = localStorage.getItem('nombre')
    saludo.innerHTML = `Hola ${nombre}!`
    mostrarLubricantes()
})

function mostrarLubricantes(){
    botonEsteticaVehicular.style.backgroundColor="skyblue"
    console.log("estetica");
    botonLubricantes.style.backgroundColor="#0f9ea5"
    console.log("lubricantes");
    
}

function mostrarEstetica(){
    botonLubricantes.style.backgroundColor="skyblue"
    console.log("lubricantes");
    botonEsteticaVehicular.style.backgroundColor="#0f9ea5"
    console.log("estetica");
    
}