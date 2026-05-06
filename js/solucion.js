document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('fake-cursor');
    const errorBox = document.getElementById('error-box');
    const contextMenu = document.getElementById('context-menu');
    const deleteOption = document.getElementById('delete-option');
    const terminal = document.getElementById('terminal-window');
    const newChallenge = document.getElementById('new-challenge');
    const confirmModal = document.getElementById('confirm-modal');
    const bsod = document.getElementById('bsod');
    const crawlText = document.getElementById('crawl-text');
    const systemBody = document.getElementById('system-body');
    const viewport = document.querySelector('.main-viewport');

    let step = 0;

    // Manejador para el botón de créditos que aparece en la BSOD
    // Manejador de teclado para activar las secuencias
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight") {
            if (step === 0) {
                step = 1;
                runInitialSequence(); // Esto inicia el movimiento del mouse y el borrado inicial
            } else if (step === 1) {
                // Si ya terminó la primera parte, la flecha derecha activa el modal de apagado
                const confirmModal = document.getElementById('confirm-modal');
                confirmModal.classList.remove('hidden');
            }
        }
    });

    async function runInitialSequence() {
        cursor.classList.remove('hidden');
        const box = errorBox.getBoundingClientRect();
        cursor.style.transition = "all 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95)";
        cursor.style.top = `${box.top + 60}px`;
        cursor.style.left = `${box.left + 160}px`;
        await wait(1300);

        contextMenu.classList.remove('hidden');
        if(window.SFX) { SFX.click(); setTimeout(()=>SFX.click(),180); setTimeout(()=>SFX.click(),320); }
        await wait(600);
        deleteOption.style.background = "red";
        if(window.SFX) SFX.click();
        await wait(400);

        errorBox.classList.add('disintegrate');
        await wait(800);
        errorBox.classList.add('hidden');
        cursor.classList.add('hidden');
        
        terminal.classList.remove('hidden');
        await ejecutarTerminal();
        terminal.classList.add('hidden');
        
        newChallenge.classList.remove('hidden');
        await typeWrite("[RETO]: ¿Cómo presentar información política clara a estudiantes?", "typewriter-text");
        document.getElementById('final-btn').classList.remove('hidden');
    }

    // Lógica de Forzar Apagado CORREGIDA
   // Busca esta sección en tu archivo solucion_5.js y reemplázala
    document.getElementById('confirm-exit').addEventListener('click', async () => {
        // 1. Ocultar modal y empezar efecto de fallo
        confirmModal.classList.add('hidden');
        systemBody.classList.add('glitch-active');
        if(window.SFX) SFX.glitch(); // Cascada de errores
        
        // 2. Generar cascada de errores
        const errorCount = 20;
        for(let i = 0; i < errorCount; i++) {
            createWindowsError();
            // Acelera la aparición de cada error
            await wait(150 - (i * 5)); 
        }
        
        await wait(1000);
        
        // 3. Limpieza total antes del BSOD
        const activeErrors = document.querySelectorAll('.popup-error');
        activeErrors.forEach(err => err.remove());
        
        viewport.style.opacity = '0';
        systemBody.classList.remove('glitch-active');
        systemBody.style.backgroundColor = "#0078d7";
        
        await wait(500);
        
        // 4. Mostrar Pantalla Azul
        bsod.classList.remove('hidden');
        bsod.style.display = 'flex';
        if(window.SFX) SFX.bsod();

        // 5. Simulación de carga realista
        let percent = 0;
        const percentEl = document.getElementById('progress-percent');
        const creditsBtn = document.getElementById('credits-btn');

        while (percent < 100) {
            percent += Math.floor(Math.random() * 10) + 5; 
            if (percent > 100) percent = 100;
            
            percentEl.innerText = percent;
            // Esperas aleatorias para que parezca que el sistema "piensa"
            await wait(Math.random() * 500 + 200); 
        }

        // 6. Hacer aparecer el botón de créditos al terminar
        creditsBtn.style.opacity = "1";
        creditsBtn.style.pointerEvents = "auto";
        creditsBtn.classList.remove('hidden');
    });

    function createWindowsError() {
        const error = document.createElement('div');
        error.className = 'popup-error shake-anim';
        error.style.top = `${Math.random() * 60 + 10}%`;
        error.style.left = `${Math.random() * 60 + 10}%`;
        error.style.zIndex = 10000 + document.querySelectorAll('.popup-error').length;
        
        error.innerHTML = `
            <div class="popup-header">System Critical Error</div>
            <div class="popup-body">
                <p>Memory at 0x0045F8 can't be "read".</p>
                <button class="win-btn">OK</button>
            </div>
        `;
        document.body.appendChild(error);
        if(window.SFX) SFX.windowChange();
    }

    document.getElementById('cancel-exit').addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
        if (e.target.id === 'credits-btn') {
            bsod.classList.add('hidden');
            document.getElementById('credits-modal').classList.remove('hidden');
            if(window.SFX) setTimeout(() => SFX.starwars(), 300);
            // Reinicio de animación Star Wars
            crawlText.style.animation = 'none';
            crawlText.offsetHeight; 
            crawlText.style.animation = "crawl 40s linear forwards";
        }
    });

    // Helpers
    function ejecutarTerminal() {
        return new Promise(resolve => {
            const lines = ["> wipe_data...", "> optimize_ui...", "> status: READY"];
            let i = 0;
            const body = document.getElementById('terminal-body');
            function next() {
                if (i < lines.length) {
                    const p = document.createElement('p');
                    p.textContent = lines[i++];
                    body.appendChild(p);
                    setTimeout(next, 700);
                } else resolve();
            }
            next();
        });
    }

    function typeWrite(text, targetId) {
        return new Promise(resolve => {
            let i = 0;
            const el = document.getElementById(targetId);
            function next() {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i++);
                    if(window.SFX && i % 2 === 0) SFX.typewriter();
                    setTimeout(next, 40);
                } else resolve();
            }
            next();
        });
    }

    function wait(ms) { return new Promise(r => setTimeout(r, Math.max(ms, 0))); }
});