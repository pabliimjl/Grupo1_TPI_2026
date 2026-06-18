export class ItemCarrito{
    nombre_producto;
    precio;
    cantidad;
    constructor(nombre_producto,precio,cantidad){
        this.nombre_producto = nombre_producto;
        this.precio = precio
        this.cantidad = cantidad
    }


    static quitarDelCarrito(producto){

        let productosEnCarrito =
            localStorage.getItem("productosEnCarrito");

        if(productosEnCarrito == null){
            alert('No hay productos en carrito');
        }
        else{
            productosEnCarrito =
        JSON.parse(productosEnCarrito);
        }
        const i = productosEnCarrito.findIndex(p=> p.nombre_producto === producto.nombre_producto)
        
        if(productosEnCarrito[i].cantidad >1){
            productosEnCarrito[i].cantidad--;
        const evento = new CustomEvent('carritoActualizado',{detail:{index:i,suma:-1}})
        window.dispatchEvent(evento);
        }else{
        productosEnCarrito.splice(i,1)
        const evento = new CustomEvent('itemEliminado',{detail:{index:i}});
        window.dispatchEvent(evento);}


        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
        
    }

    static eliminar(producto){

        let productosEnCarrito =
            localStorage.getItem("productosEnCarrito");

        if(productosEnCarrito == null){
            alert('No hay productos en carrito');
        }
        else{
            productosEnCarrito =
        JSON.parse(productosEnCarrito);
        }
        const i = productosEnCarrito.findIndex(p=> p.nombre_producto === producto.nombre_producto)
        
        
        productosEnCarrito.splice(i,1)
        const evento = new CustomEvent('itemEliminado',{detail:{index:i}});
        window.dispatchEvent(evento);


        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
        
    }

    static agregarUno(item){
        console.log(item);
        

        let productosEnCarrito =
            localStorage.getItem("productosEnCarrito");
        
        productosEnCarrito = JSON.parse(productosEnCarrito);

        const i = productosEnCarrito.findIndex(p=> p.nombre_producto === item.nombre_producto)
        console.log(i);
        
        productosEnCarrito[i].cantidad++;eliminar

        const evento = new CustomEvent('carritoActualizado',{detail:{index:i,suma:1}})
        window.dispatchEvent(evento);
        
        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
        
    }

    createHtmlItem(){

        const HTMLItem = document.createElement("div");

        HTMLItem.innerHTML = `<div id="producto">
        <h6>${(this.nombre_producto).toUpperCase()}</h6>
        <p>Precio: $${(this.precio*this.cantidad).toFixed(2)}</p>
        <p>Cantidad: ${this.cantidad}</p>

        <button class="botonCarrito"" id="quitarUno"><img height= "20px" src="../resources/icons/remove_shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            -1
        </button><button class="botonCarrito"" id="agregarUno"><img height= "20px" src="../resources/icons/add_shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            +1
        </button>
        <button class="botonCarrito"" style="background-color:#718096" id="eliminar"><img height= "20px" src="../resources/icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            Eliminar
        </button></div>`
          
        const botonQuitarUno= HTMLItem.querySelector("#quitarUno");

        botonQuitarUno.addEventListener("click", () => {
            ItemCarrito.quitarDelCarrito(this);

        });
        const botonAgregarUno = HTMLItem.querySelector('#agregarUno');
        botonAgregarUno.addEventListener("click",()=>{
            ItemCarrito.agregarUno(this)
        });

        const botonEliminar = HTMLItem.querySelector('#eliminar');
        botonEliminar.addEventListener("click",()=>{
            ItemCarrito.eliminar(this)
        });


        return HTMLItem;

    }


}