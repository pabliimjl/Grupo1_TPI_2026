export function loadTemplate() {
    const headerDiv = document.getElementById("headerDiv");

    fetch("../../../html/template/header.html")
        .then(response => response.text())
        .then(data => {
            headerDiv.innerHTML = data;
        });
}