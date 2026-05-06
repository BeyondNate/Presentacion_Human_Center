document.addEventListener('DOMContentLoaded', () => {
    const p = document.getElementById('typewriter-prob');
    const texto = p.innerHTML;
    p.innerHTML = '';
    let i = 0;

    function escribir() {
        if (i < texto.length) {
            p.innerHTML += texto.charAt(i);
            if(window.SFX && i%2===0) SFX.typewriter();
            i++;
            setTimeout(escribir, 25);
        }
    }
    escribir();
});