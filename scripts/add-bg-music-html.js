const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Agregar controles en la barra inferior (al lado de speed-select)
const speedSelectAnchor = '<div class="volume-speed-controls">\n                            <select id="speed-select"';
const bgMusicControls = `<div class="volume-speed-controls">
                            <div class="bg-music-control-wrap">
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
                            <select id="speed-select"`;

if (html.includes(speedSelectAnchor) && !html.includes('id="btn-bg-music"')) {
    html = html.replace(speedSelectAnchor, bgMusicControls);
    console.log('1. Background music controls added to player controls in index.html.');
} else {
    console.log('1. Background music controls already present or anchor mismatch.');
}

// 2. Agregar botón de acceso en el reproductor flotante
const floatingAnchor = '<button id="floating-btn-expand" class="floating-btn-expand"';
const floatingBgBtn = `<button type="button" id="floating-btn-bg-music" class="floating-btn-bg-music" title="Música de fondo">🎵 Fondo</button>
            <button id="floating-btn-expand" class="floating-btn-expand"`;

if (html.includes(floatingAnchor) && !html.includes('id="floating-btn-bg-music"')) {
    html = html.replace(floatingAnchor, floatingBgBtn);
    console.log('2. Floating background music button added to floating mini player.');
}

// 3. Agregar elemento <audio id="bg-music-player">
const audioPlayerAnchor = '<audio id="audio-player" preload="metadata"></audio>';
const bgAudioTag = `<audio id="audio-player" preload="metadata"></audio>
    <audio id="bg-music-player" loop preload="auto" src="src/mp3/Segm/ReginaCealiAlleluia.mp3"></audio>`;

if (html.includes(audioPlayerAnchor) && !html.includes('id="bg-music-player"')) {
    html = html.replace(audioPlayerAnchor, bgAudioTag);
    console.log('3. bg-music-player audio tag added.');
}

// 4. Agregar modal de Música de Fondo antes de <!-- Modal de Perfil de Usuario
const modalAnchor = '<!-- Modal de Perfil de Usuario y Ajustes Visuales / Temas -->';
const bgMusicModal = `<!-- Modal de Gestión y Selección de Música de Fondo -->
    <div id="bg-music-modal" class="modal-overlay">
        <div class="profile-modal-window bg-music-modal-window" role="dialog" aria-modal="true" aria-labelledby="bg-music-modal-title">
            <div class="profile-modal-header">
                <div class="profile-modal-title-wrap">
                    <span class="profile-modal-icon">🎵</span>
                    <div>
                        <h2 id="bg-music-modal-title" class="profile-modal-title">Música de Fondo del Santo Rosario</h2>
                        <p class="profile-modal-subtitle">Acompañamiento sacro con control de volumen independiente y tiempos litúrgicos</p>
                    </div>
                </div>
                <button type="button" id="bg-music-modal-close" class="modal-close-btn" title="Cerrar modal">✕</button>
            </div>

            <div class="profile-modal-body">
                <!-- Control Maestro y Volumen -->
                <div class="profile-section-card">
                    <div class="bg-music-master-toggle-row">
                        <label class="bg-toggle-label">
                            <input type="checkbox" id="bg-music-enable-toggle" checked>
                            <span class="bg-toggle-switch"></span>
                            <span class="bg-toggle-title">Activar Música de Fondo durante el rezo</span>
                        </label>
                    </div>
                    <div class="bg-music-liturgical-rule-box">
                        <span class="rule-icon">🕊️</span>
                        <div class="rule-text">
                            <strong>Regla de Acompañamiento Litúrgico:</strong>
                            La música de fondo empezará a sonar suavemente <strong>2 segundos antes</strong> de la primera oración para invitar al recogimiento y oración, acompañará todo el Santo Rosario en segundo plano, y continuará sonando durante <strong>5 segundos después</strong> de concluida la oración final.
                        </div>
                    </div>
                    <div class="bg-modal-vol-control-row">
                        <label for="bg-music-modal-vol-slider" class="bg-modal-vol-label">
                            <span>🔉 Volumen de fondo:</span>
                            <span id="bg-music-modal-vol-val" class="bg-vol-val-pill">25%</span>
                        </label>
                        <input type="range" id="bg-music-modal-vol-slider" class="bg-music-modal-slider" min="0" max="1" step="0.05" value="0.25">
                    </div>
                </div>

                <!-- Lista de Pistas: Selección Exclusiva (Solo 1 activa a la vez para evitar copyright) -->
                <div class="profile-section-card">
                    <div class="bg-tracks-header">
                        <h3 class="profile-section-title">🎶 Pistas de Fondo Disponibles</h3>
                        <span class="bg-single-track-badge">🛡️ Solo sonará la pista seleccionada (sin copyright)</span>
                    </div>
                    <p class="profile-setting-desc">Selecciona el acompañamiento que deseas escuchar. Puedes preescuchar cada pista antes de seleccionarla:</p>

                    <div id="bg-music-tracks-list" class="bg-music-tracks-list">
                        <!-- Se poblará dinámicamente con ReginaCealiAlleluia.mp3 y pistas subidas -->
                    </div>
                </div>

                <!-- Subir Nuevas Pistas de Fondo -->
                <div class="profile-section-card">
                    <h3 class="profile-section-title">📤 Subir Nuevos Audios de Fondo</h3>
                    <p class="profile-setting-desc">Agrega más cantos gregorianos, himnos o melodías sacras sin derechos de autor (.mp3, .wav):</p>
                    <div class="bg-upload-dropzone" id="bg-music-dropzone">
                        <span class="bg-upload-icon">🎼</span>
                        <div class="bg-upload-info">
                            <span class="bg-upload-main">Haz clic o arrastra un archivo de audio aquí</span>
                            <span class="bg-upload-sub">Formatos soportados: MP3, WAV, OGG (Guardado local persistente)</span>
                        </div>
                        <input type="file" id="bg-music-file-input" accept="audio/*" style="display: none;">
                        <button type="button" id="btn-browse-bg-music" class="btn-sync-sec">Explorar Archivo</button>
                    </div>
                </div>
            </div>

            <div class="profile-modal-footer">
                <button type="button" id="btn-bg-music-done" class="btn-sync-prim">Listo</button>
            </div>
        </div>
    </div>

    <!-- Modal de Perfil de Usuario y Ajustes Visuales / Temas -->`;

if (html.includes(modalAnchor) && !html.includes('id="bg-music-modal"')) {
    html = html.replace(modalAnchor, bgMusicModal);
    console.log('4. bg-music-modal added to index.html.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated with Background Music features!');
