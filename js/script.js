const participants = [
    {
        name: "NEO<br>REED",
        desc: "Decodificador de protocolos en tiempo real.",
        img: "https://www.pngarts.com/files/3/Man-Directing-PNG-Transparent-Image.png"
    },
    {
        name: "TRINITY<br>SOL",
        desc: "Experta en optimización de motores cuánticos.",
        img: "https://www.pngarts.com/files/3/Girl-PNG-Photo.png"
    },
    {
        name: "MORPHEUS<br>V",
        desc: "Líder táctico en defensa contra IA hostil.",
        img: "https://www.pngarts.com/files/3/Man-PNG-High-Quality-Image.png"
    },
    {
        name: "ANA<br>DATA",
        desc: "Analista de flujos de información masiva.",
        img: "https://www.pngarts.com/files/3/Woman-Free-PNG-Image.png"
    }
];

let currentIndex = 0;
const modal = document.getElementById('characterModal');
const content = document.getElementById('modalContent');

// 1. Crear la galería dinámicamente
function initGallery() {
    const gallery = document.getElementById('gallery');
    participants.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div style="padding:20px; text-align:center;">SUBJECT_${index}</div>`;
        card.onclick = () => openModal(index);
        gallery.appendChild(card);
    });
}

// 2. Abrir Modal
function openModal(index) {
    currentIndex = index;
    updateData();
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 50);
}

// 3. Actualizar datos (Nombre, Desc, Img)
function updateData() {
    const p = participants[currentIndex];
    document.getElementById('char-name').innerHTML = p.name;
    document.getElementById('char-desc').innerText = p.desc;
    document.getElementById('char-img').src = p.img;
}

// 4. Botón Siguiente con efecto Matrix
function nextCharacter() {
    content.classList.add('glitch-out');
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % participants.length;
        updateData();
        content.classList.remove('glitch-out');
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 50);
    }, 300);
}

// 5. Cerrar
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

// Inicializar al cargar
initGallery();

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight" && modal.style.display === 'block') nextCharacter();
});