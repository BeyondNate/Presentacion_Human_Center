const integrantes = [
    {
        name: "BRAD CÁRDENAS PARIÁN",
        desc: "Especialista en infiltración de redes y decodificación de datos cifrados en tiempo real.",
        img: "assets/p1.png"
    },
    {
        name: "CÉSAR APCHO MENESES",
        desc: "Futuro ingeniero informático. Entiende desde Python hasta Ensamblandor pero no a las mujeres. Futuro Trikero en Algoritmos",
        img: "assets/p2.png"
    },
    {
        name: "JOSEPH LOMBARDI QUISPE",
        desc: "Estudiante universitario apasionado por la tecnología, la programación y la innovación. Interés en desarrollar proyectos relacionados con inteligencia artificial y automatización, buscando crear soluciones útiles y creativas para problemas reales. Me considero una persona curiosa, responsable y siempre dispuesta a aprender cosas nuevas.",
        img: "assets/p3.png"
    },
    {
        name: "MATTEW QUISPE PANIAGUA",
        desc: "Analista de patrones complejos y experta en recuperación de información corrupta.",
        img: "assets/p4.png"
    }
];

function cargarGaleria() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    integrantes.forEach((persona, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        // Limpiamos el nombre para el atributo de datos
        card.setAttribute('data-name', persona.name);
        card.innerHTML = `<span>INTEGRANTE_0${index + 1}</span>`;
        
        card.onclick = () => { if(window.SFX) SFX.select(); mostrarDetalles(index); };
        gallery.appendChild(card);
    });
}

function mostrarDetalles(index) {
    const p = integrantes[index];
    const modal = document.getElementById('characterModal');
    
    document.getElementById('char-name').innerText = p.name;
    document.getElementById('char-desc').innerText = p.desc;
    document.getElementById('char-img').src = p.img;
    
    modal.style.display = 'block';
    // Pequeño timeout para activar la animación de escala
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function cerrarDetalles() {
    const modal = document.getElementById('characterModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}

// Inicializar al cargar el DOM
window.addEventListener('DOMContentLoaded', cargarGaleria);
function mostrarDetalles(index) {
    const p = integrantes[index];
    const modal = document.getElementById('characterModal');
    const imgElement = document.getElementById('char-name'); // Para aplicar glitch al nombre también si quieres
    
    // Cambiamos el contenido
    document.getElementById('char-name').innerText = p.name;
    document.getElementById('char-desc').innerText = p.desc;
    document.getElementById('char-img').src = p.img;
    
    // Mostramos el modal
    modal.style.display = 'block';
    
    // Al añadir 'active', se disparan las animaciones CSS
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}
function transicionAReto() {
    // Reutilizamos el efecto de glitch o simplemente redireccionamos con la capa
    const layer = document.createElement('div');
    layer.id = 'transition-layer';
    layer.className = 'active'; // Usando el estilo que ya definimos en style.css
    document.body.appendChild(layer);
    
    setTimeout(() => {
        window.location.href = 'RetoInicial.html';
    }, 800);
}
// ── Sonido hover en cards de integrantes ──
function attachHoverSound() {
    document.querySelectorAll('.card').forEach(card => {
        if (card._hoverSfx) return;
        card._hoverSfx = true;
        card.addEventListener('mouseenter', () => { if(window.SFX) SFX.select(); });
    });
}
// Llamar después de que se cargue la galería
const _origCargar = window.cargarGaleria;
window.cargarGaleria = function() {
    if (_origCargar) _origCargar();
    setTimeout(attachHoverSound, 100);
};
document.addEventListener('DOMContentLoaded', () => setTimeout(attachHoverSound, 300));
