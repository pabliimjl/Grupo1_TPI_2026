

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

        HTMLCarta.innerHTML = `<div id="producto"
        <h2>${this.nombre_producto}</h2>
            <img 
                src="${this.url_imagen}" 
            >

        <p>Marca: ${this.marca}</p><p>Tipo: ${this.tipo}</p><p>Densidad: ${this.densidad ?? 'No aplica'}</p><p>Formato: ${this.formato}</p><p>Precio: $${this.precio}</p>

        <button class="botonCarrito"" id="agregarAlCarrito">
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
        productosEnCarrito.push(lubricante)

        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
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
        const HTMLCarta = document.createElement("div");

        HTMLCarta.innerHTML = `<div id="producto">
        <h2>${this.nombre_producto}</h2>
            <img 
                src="${this.url_imagen}" 
            >

        <p>Marca: ${this.marca ?? 'No aplica'}</p><p>Categoria: ${this.categoria}</p><p>Formato: ${this.formato ?? 'No aplica'}</p><p>Precio: $${this.precio}</p>

        <button class="botonCarrito"" id="agregarAlCarrito">
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
        productosEnCarrito.push(producto)

        localStorage.setItem(
            "productosEnCarrito",
            JSON.stringify(productosEnCarrito)
        );
    }
}


