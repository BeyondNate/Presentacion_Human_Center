let quizPassed = false;

// Glitch de caracteres: Devuelve un carácter aleatorio de Matrix
function getGlitchChar() {
    const chars = "01$#@&%*<>[]{}¿?";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function validarQuiz() {
    const input = document.getElementById('quiz-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    const quizOverlay = document.getElementById('quiz-overlay');
    const faseContent = document.getElementById('fase-content');

    const normalizedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    if (normalizedInput === "compresion") {
        if(window.SFX) SFX.success(); // Sonido de verificación exitosa
        errorMsg.style.color = "#00ff41";
        errorMsg.innerText = "ACCESO_CONCEDIDO: CORRECTO.";
        
        setTimeout(() => {
            quizOverlay.classList.add('fading-out'); // Efecto de borrado de código
            
            setTimeout(() => {
                quizOverlay.style.display = 'none';
                faseContent.style.display = 'flex';
                faseContent.classList.remove('locked-content');
                iniciarTipeadoFase();
            }, 800);
        }, 500);
        
    } else {
        if(window.SFX) SFX.error(); // Sonido de error de verificación
        errorMsg.innerText = "ERROR: PALABRA_CLAVE_INCORRECTA.";
        document.getElementById('quiz-input').value = "";
    }
}

function iniciarTipeadoFase() {
    // Usamos el selector correcto para la fase de comprensión
    const elementos = document.querySelectorAll('.tp-text-fase');
    const readyMsg = document.getElementById('ready-msg');
    const navBtns = document.getElementById('nav-btns');
    
    const textosOriginales = Array.from(elementos).map(el => {
        let txt = el.innerText;
        el.innerText = '';
        return txt;
    });

    function escribirSecuencia(idx) {
        if (idx >= elementos.length) {
            setTimeout(mostrarListo, 500);
            return;
        }
        
        let el = elementos[idx];
        let txt = textosOriginales[idx];
        let i = 0;

        function tipear() {
            if (i < txt.length) {
                // Lógica de ERROR/GLITCH:
                // Hay un 10% de probabilidad de que aparezca un caracter corrupto antes del real
                if (Math.random() < 0.1) {
                    el.innerHTML += `<span style="color: #fff;">${getGlitchChar()}</span>`;
                    // Pequeño retraso extra cuando hay error
                    setTimeout(() => {
                        el.innerHTML = el.innerHTML.slice(0, -32); // Borra el span de glitch
                        el.innerHTML += txt.charAt(i);
                        i++;
                        setTimeout(tipear, 20);
                    }, 50);
                } else {
                    el.innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(tipear, 20);
                }
            } else {
                setTimeout(() => escribirSecuencia(idx + 1), 300);
            }
        }
        tipear();
    }

    function mostrarListo() {
        let txtListo = "> ACCESO_CONCEDIDO: ¡Listo!";
        let i = 0;
        readyMsg.innerHTML = "";
        
        function tipearListo() {
            if (i < txtListo.length) {
                readyMsg.innerHTML += txtListo.charAt(i);
                if(window.SFX && i%2===0) SFX.typewriter();
                i++;
                setTimeout(tipearListo, 40);
            } else {
                setTimeout(() => {
                    navBtns.classList.remove('hidden');
                    navBtns.classList.add('show-btns'); // Muestra los botones al final[cite: 5]
                }, 600);
            }
        }
        tipearListo();
    }

    escribirSecuencia(0);
}

// Event Listeners
document.getElementById('quiz-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        validarQuiz();
    }
});