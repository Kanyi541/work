function toggleMenu() {
    var menuContent = document.getElementById("menuContent");
    if (menuContent.style.display === "block") {
        menuContent.style.display = "none";
    } else {
        menuContent.style.display = "block";
    }
}

function closeMenu() {
    document.getElementById("menuContent").style.display = "none";
}

// Optional: Close the menu when clicking outside of it
window.onclick = function(event) {
    if (!event.target.matches('.hamburger')) {
        var menuContent = document.getElementById("menuContent");
        if (menuContent.style.display === "block") {
            menuContent.style.display = "none";
        }
    }
}