import { ItemCarrito } from "./ItemCarrito.js";
import {Ticket} from "./Ticket.js"


const botonAbrir = document.getElementById('abrir-modal');
const botonCerrar = document.getElementById('cerrar-modal');
const modalContainer = document.getElementById('modal-container');

botonAbrir.addEventListener('click', () => {
    modalContainer.classList.add('mostrar');
});

botonCerrar.addEventListener('click', () => {
    modalContainer.classList.remove('mostrar');
});

modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        modalContainer.classList.remove('mostrar');
    }
});

const grillaProductos = document.getElementById("productos")
let productosEnCarrito = []
const pTotal = document.getElementById("total")

const confirmarCarrito = document.getElementById("confirmarCarrito")
confirmarCarrito.addEventListener("click",()=>{
    crearTicket()
})

window.addEventListener('itemEliminado',(e)=>{
    productosEnCarrito.splice(e.detail.index,1)
    limpiarProductos()
    agregarProductosALaGrilla()
})

window.addEventListener('carritoActualizado',(e)=>{   
    productosEnCarrito[e.detail.index].cantidad = productosEnCarrito[e.detail.index].cantidad + e.detail.suma ;
    limpiarProductos()
    agregarProductosALaGrilla()
})

function limpiarProductos(){
    grillaProductos.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", ()=>{
    agregarProductosCarrito()
    agregarProductosALaGrilla()
})


function cargarProductos(){
    limpiarProductos()
    const productos = localStorage.getItem('productosEnCarrito')
    return productos
}

function agregarProductosCarrito(){
    const productos = obtenerProductosEnLocal()
    for(const producto of productos){
            const item = new ItemCarrito(producto.nombre_producto, producto.precio,producto.cantidad)
            productosEnCarrito.push(item)            
        }
        
    
    console.log(productosEnCarrito);
    
}

function obtenerProductosEnLocal(){
    const productos = JSON.parse(cargarProductos())
    return productos;

}

function agregarProductosALaGrilla(){
    let total = 0;
    productosEnCarrito.forEach(p=>{
        console.log(p);
        total+=p.cantidad*p.precio
        
        const HTMLProducto = p.createHtmlItem()
        console.log(HTMLProducto);
        
        grillaProductos.appendChild(HTMLProducto)
    })
    pTotal.innerHTML = `Total: $${total.toFixed(2)}`
    
}

function crearTicket(){
    const items = obtenerProductosEnLocal()
    console.log(items);
    

    if(items!= null && items.length>0){
    const nombre_comprador = localStorage.getItem('nombre')
    let id_ticket;
    let tickets = localStorage.getItem('tickets')
    if(tickets==null){
        tickets = []
        id_ticket = 1;
    }else{
        tickets = JSON.parse(tickets)
        id_ticket = (tickets[tickets.length-1].id_ticket)+1;
    }
    
    const ticketNuevo = new Ticket(id_ticket,nombre_comprador,items)
    tickets.push(ticketNuevo)

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    localStorage.removeItem('productosEnCarrito')
    pTotal.innerHTML="";
    window.location.href = "./ticket.html"

    }else{alert("No hay productos en el carrito!")}
}