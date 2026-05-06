document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.vhs-glitch-img');

    function triggerRandomGlitch() {
        // Seleccionamos una imagen al azar para glitchear
        const randomImg = images[Math.floor(Math.random() * images.length)];
        
        // Guardamos la original y la alternativa
        const originalSrc = randomImg.src;
        const altSrc = randomImg.getAttribute('data-alt');

        // Activamos glitch visual
        randomImg.classList.add('active-glitch');
        if(window.SFX) SFX.vhsGlitch(); // Sonido glitch VHS
        
        // Cambiamos la imagen durante el glitch
        if(altSrc) randomImg.src = altSrc;

        setTimeout(() => {
            randomImg.classList.remove('active-glitch');
            // Volvemos a la original (o la dejamos cambiada, según prefieras)
            // Para efecto "parpadeo", volvemos a la original:
            randomImg.src = originalSrc;
        }, 500); // Duración del glitch

        // Programar el siguiente glitch en un tiempo aleatorio
        setTimeout(triggerRandomGlitch, Math.random() * 3000 + 1000);
    }

    triggerRandomGlitch();
});

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node-item');
    const arrows = document.querySelectorAll('.arrow');
    let currentStep = 0; // Rastrea qué dolor toca iluminar

    function iluminarSiguiente() {
        // Si ya iluminamos todos, no hacer nada
        if (currentStep >= nodes.length) return;

        // Iluminar el nodo actual
        nodes[currentStep].classList.add('reveal');

        // Si hay una flecha después de este nodo, iluminarla también
        if (arrows[currentStep]) {
            setTimeout(() => {
                arrows[currentStep].classList.add('reveal');
            }, 150);
        }

        currentStep++; // Avanzar el contador para la próxima pulsación
        console.log(`Sistema: Dolor ${currentStep} activado.`);
    }

    // Escuchar la tecla derecha
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight") {
            iluminarSiguiente();
        }
    });

    // --- Mantener lógica de Glitch VHS ---
    const vhsImages = document.querySelectorAll('.vhs-glitch-img');
    function triggerRandomGlitch() {
        const randomImg = vhsImages[Math.floor(Math.random() * vhsImages.length)];
        if(!randomImg) return;
        const originalSrc = randomImg.src;
        const altSrc = randomImg.getAttribute('data-alt');
        randomImg.classList.add('active-glitch');
        if(window.SFX) SFX.vhsGlitch();
        if(altSrc) randomImg.src = altSrc;
        setTimeout(() => {
            randomImg.classList.remove('active-glitch');
            randomImg.src = originalSrc;
        }, 300);
        setTimeout(triggerRandomGlitch, Math.random() * 4000 + 2000);
    }
    triggerRandomGlitch();
});