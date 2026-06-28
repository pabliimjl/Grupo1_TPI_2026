export class Ticket{
    id_ticket;
    nombre_comprador;
    items = [];

    constructor(id_ticket,nombre_comprador,items){
        this.id_ticket= id_ticket;
        this.nombre_comprador= nombre_comprador;
        this.items = items;
    }
    
    calcularTotal(){
        let total = 0;
        this.items.forEach((item)=>{
            total += item.precio * item.cantidad;
        })
        return total;
    }

    obtenerItemsParaTabla(){
        const filas = this.items.map(item =>[
         item.id, item.nombre_producto, item.precio, item.cantidad, item.cantidad*item.precio ]
        )
        return filas;
    }
}