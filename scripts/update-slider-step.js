const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Reemplazar step="0.05" por step="0.01" en los sliders de volumen de música de fondo
html = html.replace(
    'id="bg-music-vol-slider" class="bg-music-slider" min="0" max="1" step="0.05"',
    'id="bg-music-vol-slider" class="bg-music-slider" min="0" max="1" step="0.01"'
);

html = html.replace(
    'id="bg-music-modal-vol-slider" class="bg-music-modal-slider" min="0" max="1" step="0.05"',
    'id="bg-music-modal-vol-slider" class="bg-music-modal-slider" min="0" max="1" step="0.01"'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Slider step updated to 0.01 (1% increments) successfully!');
