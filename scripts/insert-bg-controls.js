const fs = require('fs');
let s = fs.readFileSync('index.html', 'utf8');
const target = '<select id="speed-select"';
const lastIdx = s.lastIndexOf(target);
if (lastIdx !== -1 && !s.includes('id="btn-bg-music"')) {
    const insert = `<div class="bg-music-control-wrap">
                                <button type="button" id="btn-bg-music" class="btn-ctrl btn-bg-music" title="Configurar y seleccionar Música de Fondo">
                                    <span class="bg-music-icon">🎵</span>
                                    <span class="bg-music-text">Música de fondo</span>
                                </button>
                                <div class="bg-music-vol-slider-wrap" title="Volumen de la música de fondo">
                                    <span class="bg-music-vol-icon">🔉</span>
                                    <input type="range" id="bg-music-vol-slider" class="bg-music-slider" min="0" max="1" step="0.05" value="0.25" aria-label="Volumen música de fondo">
                                    <span id="bg-music-vol-pct" class="bg-music-pct">25%</span>
                                </div>
                            </div>
                            `;
    s = s.substring(0, lastIdx) + insert + s.substring(lastIdx);
    fs.writeFileSync('index.html', s, 'utf8');
    console.log('Inserted bg-music controls before speed-select successfully!');
} else {
    console.log('Already inserted or target not found.');
}
