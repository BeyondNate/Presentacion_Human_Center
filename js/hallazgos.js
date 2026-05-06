const data_personae = {
    "valeria": {
        nombre: "VALERIA TORRES",
        foto: "assets/anamaria.jpg",
        frase: '"No es que no quiera saber, pero da flojera... es mucha información y no entiendo bien."',
        desc: "Estudiante universitaria que prioriza sus estudios y tiempo personal. Contacto político ocasional, pero no se involucra. La forma de presentación no justifica su esfuerzo.",
        objetivos: ["Entender info relevante rápido", "Acceder a contenido de idea rápida", "Evitar procesos largos/confusos", "Valor inmediato"],
        pasatiempos: ["Escuchar música", "Series streaming", "Amigos fines de semana", "Redes en descanso"],
        dolores: ["Info política extensa", "No claro desde el inicio", "Desconfianza en fuentes", "Demasiado tiempo invertido"],
        deseos: ["Contenido que conecte", "Claridad de confianza", "Sin cambiar hábitos", "Fácil de procesar"]
    },
    "diego": {
        nombre: "DIEGO RAMOS",
        foto: "assets/jose.jpg",
        frase: '"No podemos escapar de tres cosas: la vida, la muerte y la política."',
        desc: "Estudiante interesado en política para decisiones conscientes. Sin embargo, su experiencia no es fluida; la información le exige tiempo y esfuerzo excesivo.",
        objetivos: ["Propuestas claras", "Formarse opinión propia", "Comparar opciones rápido", "Sin afectar responsabilidades"],
        pasatiempos: ["YouTube", "Informarse actualidad", "Redes informativas", "Conversar temas varios"],
        dolores: ["Info demasiado extensa", "Falta formatos comparación", "Propuestas no creíbles", "Esfuerzo adicional"],
        deseos: ["Resúmenes organizados", "Info confiable siempre", "Comparar sencillo", "Sin carga de tiempo"]
    }
};

let currentPersona = "valeria";

document.addEventListener('DOMContentLoaded', () => {
    cargarPersona(currentPersona);
});

function cargarPersona(key) {
    const d = data_personae[key];
    
    // 1. Elementos instantáneos (Foto y Nombre)
    document.getElementById('persona-photo').src = d.foto;
    document.getElementById('persona-nombre').innerText = d.nombre;
    document.getElementById('btn-next').innerText = key === "valeria" ? "DIEGO_RAMOS >" : "Dolores";

    // 2. Limpiar áreas de texto para el typewriter
    const fraseEl = document.getElementById('persona-frase');
    const descEl = document.getElementById('persona-desc');
    fraseEl.innerText = '';
    descEl.innerText = '';

    // 3. Preparar listas
    const ids = ['list-obj', 'list-pasa', 'list-dolor', 'list-deseo'];
    const contenidos = [d.objetivos, d.pasatiempos, d.dolores, d.deseos];
    
    ids.forEach(id => document.getElementById(id).innerHTML = '');

    // 4. Iniciar secuencia de tipeado total
    tipearElemento(fraseEl, d.frase, () => {
        tipearElemento(descEl, d.desc, () => {
            tipearListasSecuenciales(ids, contenidos, 0);
        });
    });
}

// Función auxiliar para un solo elemento
function tipearElemento(elemento, texto, callback) {
    let i = 0;
    elemento.style.color = "#ffffff";
    function innerTipear() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            if(window.SFX && i % 3 === 0) SFX.typewriter();
            i++;
            setTimeout(innerTipear, 20);
        } else if (callback) {
            setTimeout(callback, 200);
        }
    }
    innerTipear();
}

// Función para tipear todas las listas una tras otra
function tipearListasSecuenciales(ids, contenidos, listIdx) {
    if (listIdx >= ids.length) return;

    const listaEl = document.getElementById(ids[listIdx]);
    const items = contenidos[listIdx];
    
    let itemIdx = 0;

    function tipearSiguienteItem() {
        if (itemIdx < items.length) {
            const li = document.createElement('li');
            li.style.color = "#ffffff";
            listaEl.appendChild(li);
            
            tipearElemento(li, `> ${items[itemIdx]}`, () => {
                itemIdx++;
                tipearSiguienteItem();
            });
        } else {
            // Cuando termina una lista (ej: Objetivos), empieza la siguiente (ej: Pasatiempos)
            tipearListasSecuenciales(ids, contenidos, listIdx + 1);
        }
    }
    tipearSiguienteItem();
}

function siguientePersona() {
    const personaContainer = document.getElementById('persona-container');
    
    // Aplicamos un efecto de desvanecimiento antes de cambiar
    personaContainer.style.opacity = '0';
    
    setTimeout(() => {
        if (currentPersona === "valeria") {
            if(window.SFX) SFX.tv(); // TV static al cambiar persona
            currentPersona = "diego";
            cargarPersona("diego");
            personaContainer.style.opacity = '1';
        } else {
            // Si ya estamos en Diego, la próxima vez redirige
            console.log("Redirigiendo a Dolores..."); // Esto te ayuda a ver si entra al código
            window.location.href = "Dolores.html"; 
        }
    }, 600);
}