document.addEventListener('DOMContentLoaded', () => {
    const elementos = document.querySelectorAll('.tp-text');
    let indexElemento = 0;

    const textosOriginales = Array.from(elementos).map(el => {
        let txt = el.innerText;
        el.innerText = '';
        return txt;
    });

    function escribirSecuencia(idx) {
        if (idx >= elementos.length) return;
        let el = elementos[idx];
        let txt = textosOriginales[idx];
        let i = 0;

        function tipear() {
            if (i < txt.length) {
                el.innerHTML += txt.charAt(i);
                if(window.SFX && i%2===0) SFX.typewriter();
                i++;
                setTimeout(tipear, 15);
            } else {
                escribirSecuencia(idx + 1);
            }
        }
        tipear();
    }
    setTimeout(() => escribirSecuencia(0), 600);
});