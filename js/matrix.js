// LLUVIA MATRIX
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    drops.forEach((y, i) => {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}

// EFECTO DESENCRIPTADO
function decryptText(element) {
    const finalName = element.getAttribute('data-text');
    const possibleChars = "0123456789/?!@#$%^&*()";
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = finalName.split("")
            .map((letter, index) => {
                if (finalName[index] === " ") return " ";
                if (index < iterations) return finalName[index];
                return possibleChars[Math.floor(Math.random() * possibleChars.length)];
            }).join("");
        if (iterations >= finalName.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}

// LOADER
const logs = ["> Iniciando...", "> User Persona...", "> Journey Map...", "> Insights...", "> LISTO."];

function startLoading() {
    const progressBar = document.getElementById('progress-bar');
    const loadingLogs = document.getElementById('loading-logs');
    const loaderScreen = document.getElementById('loader-screen');
    const mainContent = document.getElementById('main-content');
    const univHeader = document.querySelector('.univ-header-top');

    let progress = 0;
    let logIndex = 0;

    const interval = setInterval(() => {
        progress += 4;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + "%";
        if(window.SFX && progress % 8 === 0) SFX.loadingTick();

        if (progress > (100 / logs.length) * logIndex && logIndex < logs.length) {
            const p = document.createElement('p');
            p.innerText = logs[logIndex];
            loadingLogs.appendChild(p);
            logIndex++;
        }

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderScreen.classList.add('fade-out');
                // IMPORTANTE: Mostrar el contenido inmediatamente al terminar
                mainContent.style.display = 'flex'; 
                setTimeout(() => {
                    loaderScreen.style.display = 'none';
                    univHeader.classList.add('show');
                    document.querySelectorAll('.decrypt').forEach(el => decryptText(el));
                }, 800);
            }, 400);
        }
    }, 80);
}

window.onload = () => {
    setInterval(drawMatrix, 35);
    startLoading();
};
function iniciarTransicion() {
    const layer = document.getElementById('transition-layer');
    if (layer) {
        // Activa la capa visual
        layer.classList.add('active');
        
        // Espera 800ms (duración de la animación) y cambia de página
        setTimeout(() => {
            window.location.href = 'nuestroEquipo.html';
        }, 800);
    } else {
        // Si no encuentra la capa, cambia de página inmediatamente
        window.location.href = 'nuestroEquipo.html';
    }
}