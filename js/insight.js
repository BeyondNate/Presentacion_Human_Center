document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight") {
        // Buscamos el siguiente elemento para mostrar
        const nextItem = document.querySelector('.reveal-item:not(.active)');
        
        if (nextItem) {
            nextItem.classList.add('active');
            if(window.SFX) SFX.select(); // Sonido al revelar insight
            
            if (nextItem.classList.contains('green-node')) {
                nextItem.style.boxShadow = "0 0 30px #00ff41";
            }
        } else {
            // SI YA NO HAY MÁS ELEMENTOS PARA MOSTRAR:
            // Al presionar flecha derecha una vez más, saltamos a la solución
            console.log("Mapa completo. Redirigiendo a Ideación...");
            if(window.SFX) SFX.windowChange();
            window.location.href = 'Solucion.html'; 
        }
    }
});

console.log("Sistema de Insights cargado. Presiona [->] para avanzar.");