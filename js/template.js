export function loadTemplate() {
    const headerDiv = document.getElementById("headerDiv");
    const footerDiv = document.getElementById("footerDiv");

    fetch("../../../html/template/header.html")
        .then(response => response.text())
        .then(data => {
            headerDiv.innerHTML = data;
        });

    fetch("../../../html/template/navbar.html")
        .then(response => response.text())
        .then(data => {
            footerDiv.innerHTML = data;
        }); 
}