document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    toggleButton.addEventListener("click", function () {
        navbar.classList.toggle("retracted");
    });
});

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("retracted"); // Alterna a classe que controla o estado do menu
}


function toggleSubmenu(submenuId) {
    var submenu = document.getElementById(submenuId);
    
    // Alterna entre exibir e ocultar o submenu
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}