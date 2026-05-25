import { ItemCarrito } from "./ItemCarrito.js";

const grillaProductos = document.getElementById("productos")
let productosEnCarrito = []
const pTotal = document.getElementById("total")

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
    const productos = JSON.parse(cargarProductos())

    for(const producto of productos){
            const item = new ItemCarrito(producto.nombre_producto, producto.precio,producto.cantidad)
            productosEnCarrito.push(item)            
        }
        
    
    console.log(productosEnCarrito);
    
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
