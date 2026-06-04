export class ControladorCarrito {
    nombreCliente
    items = []
    constructor(nombreCliente){
        this.nombreCliente = nombreCliente;
        this.items = []
    }

    agregarItem(producto){
        if(producto in this.items){
            console.log('si');
            
        }
    }

}