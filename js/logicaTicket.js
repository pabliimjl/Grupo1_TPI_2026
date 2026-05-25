import { Ticket } from "./Ticket.js";
const ultimoTicket = obtenerUltimoTicket()
const ticket = new Ticket(ultimoTicket.id_ticket,ultimoTicket.nombre_comprador,ultimoTicket.items)

const descargarTicket = document.getElementById("descargarTicket")
descargarTicket.addEventListener("click",()=>{
    crearPDF()
})

window.addEventListener('DOMContentLoaded',()=>{
    agregarFilas()
})

function obtenerUltimoTicket(){
    let tickets = localStorage.getItem('tickets')
    tickets = JSON.parse(tickets)
    return tickets[tickets.length-1];
}

function agregarFilas() {
    const cuerpoTabla = document.getElementById("ticket");

    const filas = ticket.obtenerItemsParaTabla()
    filas.forEach(item => {
    cuerpoTabla.innerHTML += `
        <tr>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
            <td>${item[2]}</td>
            <td>${item[3]}</td>
            <td>$${item[4]}</td>
        </tr>
    `;
        
    });
    cuerpoTabla.innerHTML += `
            <p>Total: $${ticket.calcularTotal()}</p>
    `;
        

}

async function crearPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text(`Ticket #${ticket.id_ticket}`, 14, 20);
    pdf.text(`Cliente: ${ticket.nombre_comprador}`, 14, 30);


    const items = ticket.obtenerItemsParaTabla();

    const filas = items.map(item => [
        item[0],
        item[1], 
        `$${item[2]}`, 
        item[3], 
        `$${item[4]}` 
    ]);

    pdf.autoTable({
        startY: 40,

        head: [[
            'ID',
            'Producto',
            'Precio',
            'Cantidad',
            'Subtotal'
        ]],

        body: filas,

        styles: {
            fontSize: 10,
            cellPadding: 3
        },

        headStyles: {
            fillColor: [40, 40, 40]
        }
    });

    const posicionFinal = pdf.lastAutoTable.finalY + 10;

    pdf.setFontSize(14);

    pdf.text(
        `Total: $${ticket.calcularTotal()}`,
        14,
        posicionFinal
    );

    pdf.save(`ticket${ticket.id_ticket}.pdf`);
    localStorage.removeItem('nombre')
    window.location.href = '../index.html'
}