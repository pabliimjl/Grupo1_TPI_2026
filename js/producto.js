export class Producto{
    
    id;
    nombre_producto;
    formato;
    precio;
    url_imagen;
    static #IDContador = 0;

    constructor(marca, nombre_producto,formato,precio,url_imagen){
        this.id = ++Producto.#IDContador;
        this.marca = marca;
        this.nombre_producto = nombre_producto;
        this.formato = formato;
        this.precio = precio;
        this.url_imagen = url_imagen;
        }

    toJsonString(){
        return JSON.stringify(this)
    }
}

export class Lubricante extends Producto{
        densidad;
        tipo;
        constructor(marca,nombre_producto,formato,densidad,tipo,precio,url_imagen){
            super(marca,nombre_producto,formato,precio
                ,url_imagen)
            this.densidad = densidad;
            this.tipo = tipo;
        }

    

    createHtmlElement(){
        const HTMLCarta = document.createElement("div");

        HTMLCarta.innerHTML = `<div id="producto">
        <h6>${(this.nombre_producto).toUpperCase()}</h6>
            <img 
                src="${this.url_imagen}" 
            >

        <p>Marca: ${this.marca}</p><p>Tipo: ${this.tipo}</p><p>Densidad: ${this.densidad ?? 'No aplica'}</p><p>Formato: ${this.formato}</p><p>Precio: $${this.precio}</p>

        <button class="botonCarrito"" id="agregarAlCarrito"><img height= "30px" src="../resources/icons/add_shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            Agregar al carrito
        </button></div>`
          
        const botonAgregarAlCarrito = HTMLCarta.querySelector("#agregarAlCarrito");

        botonAgregarAlCarrito.addEventListener("click", () => {
            Lubricante.agregarAlCarrito(this);
    });
        return HTMLCarta;
    }

    toJsonString(){
        return JSON.stringify(this)
    }

    static agregarAlCarrito(lubricante){

        let productosEnCarrito =
            localStorage.getItem("productosEnCarrito");

        if(productosEnCarrito == null){
            productosEnCarrito = [];
        }
        else{
            productosEnCarrito =
                JSON.parse(productosEnCarrito);
        }
        
        const indice = productosEnCarrito.findIndex(p=> p.nombre_producto === lubricante.nombre_producto)
        
        if(indice <0){
        
        productosEnCarrito.push({...lubricante, cantidad:1})}
        else{productosEnCarrito[indice].cantidad++}

        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
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
        }else{
        productosEnCarrito.splice(i,1)
        const evento = new CustomEvent('carritoActualizado',{detail:{index:i}});
        window.dispatchEvent(evento);
}

        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
    }

    createHtmlCarrito(){

        const HTMLProducto = document.createElement("div");

        HTMLProducto.innerHTML = `<div id="producto">
        <h6>${this.nombre_producto}</h6>
        <p>Precio: $${this.precio}</p>
        <p id="cantidadElemento">Cantidad: </p>

        <button class="botonCarrito"" id="quitarDelCarrito"><img height= "30px" src="../resources/icons/remove_shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            QuitarDelCarrito
        </button></div>`
          
        const botonAgregarAlCarrito = HTMLProducto.querySelector("#quitarDelCarrito");

        botonAgregarAlCarrito.addEventListener("click", () => {
            Lubricante.quitarDelCarrito(this);
    });
        return HTMLProducto;

    }
}

export class EsteticaVehicular extends Producto{
    categoria;
    constructor(marca, nombre_producto, categoria, formato, precio, url_imagen){
        super(marca,nombre_producto,formato,precio
                ,url_imagen)
        this.categoria = categoria;
                }


    createHtmlElement(){
        const HTMLProducto = document.createElement("div");

        HTMLProducto.innerHTML = `<div id="producto">
        <h6>${(this.nombre_producto).toUpperCase()}</h6>
            <img 
                src="${this.url_imagen}" 
            >

        <p>Marca: ${this.marca ?? 'No aplica'}</p><p>Categoria: ${this.categoria}</p><p>Formato: ${this.formato ?? 'No aplica'}</p><p>Precio: $${this.precio}</p>

        <button class="botonCarrito"" id="agregarAlCarrito"><img height= "30px" src="../resources/icons/add_shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            Agregar al carrito
        </button></div>`
          
        const botonAgregarAlCarrito = HTMLProducto.querySelector("#agregarAlCarrito");

        botonAgregarAlCarrito.addEventListener("click", () => {
            Lubricante.agregarAlCarrito(this);
    });
        return HTMLProducto;
    }

    toJsonString(){
        return JSON.stringify(this)
    }

    static agregarAlCarrito(producto){

        let productosEnCarrito =
            localStorage.getItem("productosEnCarrito");

        if(productosEnCarrito == null){
            productosEnCarrito = [];
        }
        else{
            productosEnCarrito =
                JSON.parse(productosEnCarrito);
        }
        
        const indice = productosEnCarrito.findIndex(p=> p.nombre_producto === producto.nombre_producto)
        
        if(indice <0){
        
        productosEnCarrito.push({...producto, cantidad:1})}
        else{productosEnCarrito[indice].cantidad++}

        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
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
        }else{
        productosEnCarrito.splice(i,1)
        const evento = new CustomEvent('carritoActualizado',{detail:{index:i}});
        window.dispatchEvent(evento);}


        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
        
    }

    createHtmlCarrito(){

        const HTMLProducto = document.createElement("div");

        HTMLProducto.innerHTML = `<div id="producto">
        <h6>${this.nombre_producto}</h6>
        <p>Precio: $${this.precio}</p>
        <p id="cantidadElemento">Cantidad: </p>

        <button class="botonCarrito"" id="quitarDelCarrito"><img height= "30px" src="../resources/icons/remove_shopping_cart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"/>
            QuitarDelCarrito
        </button></div>`
          
        const botonAgregarAlCarrito = HTMLProducto.querySelector("#quitarDelCarrito");

        botonAgregarAlCarrito.addEventListener("click", () => {
            EsteticaVehicular.quitarDelCarrito(this);
    });
        return HTMLProducto;

    }
}


