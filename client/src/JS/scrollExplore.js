document.addEventListener('DOMContentLoaded', function () {
    let scrollButton = document.getElementById('scrollButton');
    let effectsSection = document.getElementById('effectsSection');
    
    if (scrollButton && effectsSection) {
        scrollButton.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            effectsSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("main-navbar");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 1) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});
