document.addEventListener('DOMContentLoaded', () => {
    const elementos = document.querySelectorAll('.tp-text-entrevista');
    
    // Guardar textos y limpiar elementos para empezar de cero
    const textosOriginales = Array.from(elementos).map(el => {
        const txt = el.innerText;
        el.innerText = '';
        return txt;
    });

    function escribirSecuencia(idx) {
        if (idx >= elementos.length) return; // Fin del proceso

        let el = elementos[idx];
        let mensaje = textosOriginales[idx];
        let charIndex = 0;

        function tipear() {
            if (charIndex < mensaje.length) {
                el.innerHTML += mensaje.charAt(charIndex);
                if(window.SFX && charIndex%2===0) SFX.typewriter();
                charIndex++;
                // Velocidad de tipeado fluida
                setTimeout(tipear, 25);
            } else {
                // Pequeña pausa antes de la siguiente línea
                setTimeout(() => escribirSecuencia(idx + 1), 300);
            }
        }
        tipear();
    }

    // Iniciar tipeado tras una breve carga de sistema
    setTimeout(() => escribirSecuencia(0), 1000);
});