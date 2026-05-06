
document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos
    const elementoCita = document.querySelector('.cita');
    const elementoAutor = document.querySelector('.autor');
    const elementoReto = document.querySelector('.espacio-reto p');

    // Guardamos los textos originales y limpiamos los contenedores
    const textoCita = elementoCita.innerText;
    const textoAutor = elementoAutor.innerText;
    const textoReto = elementoReto.innerText;

    elementoCita.innerText = '';
    elementoAutor.innerText = '';
    elementoReto.innerText = '';

    // 2. Función de escritura reutilizable
    function escribirTexto(elemento, texto, velocidad, callback) {
        let i = 0;
        function tipear() {
            if (i < texto.length) {
                elemento.innerHTML += texto.charAt(i);
                if(window.SFX && i%2===0) SFX.typewriter();
                i++;
                setTimeout(tipear, velocidad);
            } else if (callback) {
                callback(); // Ejecuta la siguiente tarea cuando termina esta
            }
        }
        tipear();
    }

    // 3. Cadena de ejecución (La secuencia)
    // Primero la cita...
    escribirTexto(elementoCita, textoCita, 30, () => {
        // Luego el autor...
        escribirTexto(elementoAutor, textoAutor, 50, () => {
            // Y finalmente el reto inicial
            escribirTexto(elementoReto, textoReto, 20);
        });
    });
});