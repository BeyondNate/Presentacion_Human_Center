// ============================================================
//  MATRIX SOUND ENGINE v2 — sounds.js
// ============================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let _ctx = null;
function getCtx() {
    if (!_ctx) _ctx = new AudioCtx();
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
}

function playTone(freq, type, duration, vol, startTime) {
    const ctx = getCtx();
    const t = startTime ?? ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol ?? 0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t); osc.stop(t + duration + 0.01);
}

function noise(duration, vol, startTime) {
    const ctx = getCtx();
    const t = startTime ?? ctx.currentTime;
    const bufSize = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol ?? 0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    src.connect(gain); gain.connect(ctx.destination);
    src.start(t); src.stop(t + duration + 0.01);
}

// ── Sonidos ───────────────────────────────────────────────────
function sfx_typewriter() {
    noise(0.04, 0.07);
    playTone(700 + Math.random() * 300, 'square', 0.03, 0.05);
}

function sfx_tv_static() {
    noise(0.25, 0.18);
    playTone(60, 'sine', 0.25, 0.05);
}

function sfx_loading_tick() {
    const t = getCtx().currentTime;
    playTone(440, 'square', 0.04, 0.07, t);
    playTone(660, 'square', 0.03, 0.04, t + 0.06);
}

function sfx_boot() {
    const t = getCtx().currentTime;
    [300, 500, 750, 1000].forEach((f, i) => playTone(f, 'square', 0.10, 0.10, t + i * 0.13));
}

function sfx_glitch() {
    const t = getCtx().currentTime;
    noise(0.15, 0.28, t);
    playTone(80,  'sawtooth', 0.08, 0.18, t);
    playTone(160, 'sawtooth', 0.06, 0.12, t + 0.05);
    playTone(40,  'sawtooth', 0.10, 0.20, t + 0.10);
}

function sfx_button() {
    const t = getCtx().currentTime;
    playTone(600, 'square', 0.05, 0.12, t);
    playTone(900, 'square', 0.04, 0.08, t + 0.05);
}

function sfx_select() {
    const t = getCtx().currentTime;
    playTone(440, 'square', 0.05, 0.10, t);
    playTone(660, 'square', 0.05, 0.12, t + 0.06);
    playTone(880, 'square', 0.07, 0.10, t + 0.12);
}

function sfx_success() {
    const t = getCtx().currentTime;
    [523, 659, 784, 1047].forEach((f, i) => playTone(f, 'square', 0.11, 0.14, t + i * 0.09));
    playTone(1047, 'square', 0.30, 0.16, t + 0.42);
    playTone(1568, 'sine',   0.18, 0.10, t + 0.76);
}

function sfx_error() {
    const t = getCtx().currentTime;
    playTone(200, 'sawtooth', 0.12, 0.18, t);
    playTone(150, 'sawtooth', 0.15, 0.20, t + 0.10);
    noise(0.10, 0.12, t + 0.05);
}

function sfx_window_change() {
    const t = getCtx().currentTime;
    playTone(300, 'sawtooth', 0.06, 0.10, t);
    playTone(500, 'square',   0.05, 0.08, t + 0.07);
    noise(0.05, 0.05, t);
}

function sfx_vhs_glitch() {
    const t = getCtx().currentTime;
    noise(0.10, 0.22, t);
    playTone(55,  'sawtooth', 0.08, 0.18, t);
    playTone(110, 'sawtooth', 0.05, 0.12, t + 0.03);
}

function sfx_click() {
    const t = getCtx().currentTime;
    noise(0.025, 0.22, t);
    playTone(1400, 'square', 0.02, 0.14, t);
}

function sfx_bsod() {
    const t = getCtx().currentTime;
    // Acorde grave tipo Windows error
    playTone(196, 'sine', 0.50, 0.22, t);
    playTone(247, 'sine', 0.50, 0.16, t);
    playTone(165, 'sine', 0.70, 0.20, t + 0.08);
    noise(0.20, 0.09, t + 0.35);
    // Beeps descendentes de pánico
    [440, 330, 220].forEach((f, i) => playTone(f, 'square', 0.07, 0.11, t + 0.55 + i * 0.09));
}

// ── Star Wars: MP3 del usuario o fanfare 8-bit ────────────────

let _swBuffer = null;
let _swAudioEl = null;

window.loadStarWarsMp3 = function(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        getCtx().decodeAudioData(e.target.result.slice(0),
            (buf) => { _swBuffer = buf; console.log('SW MP3 listo (WebAudio)'); },
            ()    => { _loadSwEl(file); }
        );
    };
    reader.readAsArrayBuffer(file);
};

function _loadSwEl(file) {
    _swAudioEl = new Audio(URL.createObjectURL(file));
    _swAudioEl.preload = 'auto';
    console.log('SW MP3 listo (Audio element)');
}

function sfx_starwars_fallback() {
    const t = getCtx().currentTime;
    const seq = [
        [392,0.18],[392,0.18],[392,0.18],[311,0.28],[466,0.09],
        [392,0.28],[311,0.28],[466,0.09],[392,0.50]
    ];
    let off = 0;
    seq.forEach(([f, dur]) => {
        playTone(f,       'square',   dur, 0.18, t + off);
        playTone(f * 1.5, 'sawtooth', dur, 0.07, t + off);
        off += dur + 0.02;
    });
}

function sfx_starwars() {
    // Primero busca el elemento <audio> embebido en el HTML
    const audioEl = document.getElementById('sw-cover-audio');
    if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play().catch(() => sfx_starwars_fallback());
        return;
    }
    // Fallback: buffer cargado manualmente o fanfare 8-bit
    if (_swBuffer) {
        const ctx = getCtx();
        const src = ctx.createBufferSource();
        src.buffer = _swBuffer;
        src.connect(ctx.destination);
        src.start();
    } else if (_swAudioEl) {
        _swAudioEl.currentTime = 0;
        _swAudioEl.play();
    } else {
        sfx_starwars_fallback();
    }
}

// ── API pública ────────────────────────────────────────────────
window.SFX = {
    typewriter:   sfx_typewriter,
    tv:           sfx_tv_static,
    loadingTick:  sfx_loading_tick,
    boot:         sfx_boot,
    glitch:       sfx_glitch,
    button:       sfx_button,
    select:       sfx_select,
    success:      sfx_success,
    error:        sfx_error,
    windowChange: sfx_window_change,
    vhsGlitch:    sfx_vhs_glitch,
    click:        sfx_click,
    bsod:         sfx_bsod,
    starwars:     sfx_starwars,
};

// ── Inicializar AudioContext al primer gesto ───────────────────
document.addEventListener('click',   () => getCtx(), { once: true });
document.addEventListener('keydown', () => getCtx(), { once: true });

// ── GLOBAL: sonido en TODOS los botones (incluye dinámicos) ───
document.addEventListener('DOMContentLoaded', () => {
    function attachBtn(btn) {
        if (btn._sfxAttached) return;
        btn._sfxAttached = true;
        btn.addEventListener('click', () => { if (window.SFX) SFX.button(); });
    }
    document.querySelectorAll('button').forEach(attachBtn);
    new MutationObserver(muts => {
        muts.forEach(m => m.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;
            if (node.tagName === 'BUTTON') attachBtn(node);
            if (node.querySelectorAll) node.querySelectorAll('button').forEach(attachBtn);
        }));
    }).observe(document.body, { childList: true, subtree: true });
});

// ── GLOBAL: tecla ArrowRight → sonido 8-bit de selección ──────
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && window.SFX) SFX.select();
});
