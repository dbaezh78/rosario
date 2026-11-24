const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Header buttons: add screen recording and auth profile button
const headerSearch = `<button id="btn-fullscreen" class="btn-icon" title="Pantalla Completa" aria-label="Pantalla Completa">`;
const headerIdx = html.indexOf(headerSearch);
if (headerIdx !== -1) {
    const endBtnIdx = html.indexOf('</button>', headerIdx);
    const endHeaderIdx = html.indexOf('</header>', endBtnIdx);
    if (endBtnIdx !== -1 && endHeaderIdx !== -1) {
        const fullBtn = html.substring(headerIdx, endBtnIdx + 9);
        const replacement = `${fullBtn}
                <button id="btn-record-screen" class="btn-icon btn-record-icon" title="Grabar video de la pantalla para YouTube (sin reproductor)" aria-label="Grabar Pantalla">📹</button>
                <button id="btn-auth-profile" class="btn-auth-profile" title="Perfil y Ajustes / Iniciar Sesión con Google" aria-label="Perfil y Autenticación">
                    <span id="auth-avatar-icon" class="auth-avatar-icon">👤</span>
                    <span id="auth-user-label" class="auth-user-label">Acceder</span>
                </button>`;
        html = html.substring(0, headerIdx) + replacement + html.substring(endBtnIdx + 9);
        console.log('1. Header buttons added');
    }
}

// 2. Floating mini-player and recording indicator right after </header>
const afterHeaderSearch = '</header>';
const afterHeaderIdx = html.indexOf(afterHeaderSearch);
if (afterHeaderIdx !== -1) {
    const floatingSnippet = `\n
        <!-- Indicador de Grabación de Pantalla en Vivo para YouTube -->
        <div id="recording-status-bar" class="recording-status-bar" style="display: none;">
            <div class="recording-pulse"></div>
            <span class="recording-label">🔴 Grabando pantalla para YouTube</span>
            <span id="recording-timer" class="recording-timer">00:00</span>
            <button id="btn-stop-recording" class="btn-stop-recording" title="Detener grabación y guardar video WebM">⏹ Detener y Descargar</button>
        </div>

        <!-- Reproductor Flotante cuando el panel inferior está oculto -->
        <div id="floating-mini-player" class="floating-mini-player" style="display: none;">
            <button id="floating-btn-play" class="floating-btn-play" title="Reproducir / Pausar">▶</button>
            <div class="floating-time-info">
                <span id="floating-cur-prayer" class="floating-cur-prayer">Señal de la Cruz</span>
                <span id="floating-time-display" class="floating-time-display">00:00 / 33:06</span>
            </div>
            <button id="floating-btn-expand" class="floating-btn-expand" title="Mostrar barra completa del reproductor">⤊ Mostrar Reproductor</button>
        </div>\n`;
    html = html.substring(0, afterHeaderIdx + afterHeaderSearch.length) + floatingSnippet + html.substring(afterHeaderIdx + afterHeaderSearch.length);
    console.log('2. Floating mini player added');
}

// 3. Bottom player collapse button
const collapseSearch = `<button id="btn-next-bead" class="btn-ctrl btn-step" title="Siguiente cuenta (Flecha Abajo)" aria-label="Siguiente cuenta">⏭</button>`;
const collapseIdx = html.indexOf(collapseSearch);
if (collapseIdx !== -1) {
    const replacement = `${collapseSearch}
                            <button id="btn-collapse-player" class="btn-ctrl btn-collapse" title="Ocultar reproductor (para vista limpia o grabar)">⌄ Ocultar</button>`;
    html = html.substring(0, collapseIdx) + replacement + html.substring(collapseIdx + collapseSearch.length);
    console.log('3. Collapse button added to player');
}

// 4. Version selector in sync-modal
const syncMysterySearch = `id="sync-mystery-select" class="sync-select" aria-label="Misterio para sincronizar">`;
const syncMysteryIdx = html.indexOf(syncMysterySearch);
if (syncMysteryIdx !== -1) {
    const endDivIdx = html.indexOf('</div>', syncMysteryIdx);
    if (endDivIdx !== -1) {
        const versionSelectSnippet = `\n
                    <div class="sync-field-group sync-version-group">
                        <label for="sync-version-select">Versión:</label>
                        <select id="sync-version-select" class="sync-select" aria-label="Versión de audio para sincronizar">
                            <option value="original" selected>🔴 Versión 2 (Cruz Roja · Original)</option>
                            <option value="v1">🟡 Versión 1 (Cruz Amarilla · V1)</option>
                        </select>
                    </div>`;
        html = html.substring(0, endDivIdx + 6) + versionSelectSnippet + html.substring(endDivIdx + 6);
        console.log('4. Version select added to sync modal');
    }
}

// 5. User Profile & Settings Modal before </body>
const bodySearch = `</body>`;
const bodyIdx = html.lastIndexOf(bodySearch);
if (bodyIdx !== -1) {
    const modalSnippet = `
    <!-- Modal de Perfil de Usuario y Ajustes Visuales / Temas -->
    <div id="user-profile-modal" class="modal-overlay">
        <div class="profile-modal-window" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
            <div class="profile-modal-header">
                <div class="profile-modal-title-wrap">
                    <span class="profile-modal-icon">⚙️</span>
                    <div>
                        <h2 id="profile-modal-title" class="profile-modal-title">Ajustes y Perfil de Usuario</h2>
                        <p class="profile-modal-subtitle">Configuración de temas, tamaño de arte sacro y autenticación</p>
                    </div>
                </div>
                <button id="profile-modal-close" class="modal-close-btn" title="Cerrar modal">✕</button>
            </div>

            <div class="profile-modal-body">
                <!-- Sección de Autenticación de Google -->
                <div class="profile-section-card auth-card">
                    <h3 class="profile-section-title">🔑 Acceso y Administración</h3>
                    <div id="auth-status-box" class="auth-status-box visitor-state">
                        <div class="auth-status-info">
                            <div id="auth-modal-avatar" class="auth-modal-avatar">👤</div>
                            <div class="auth-modal-user-details">
                                <div id="auth-modal-name" class="auth-modal-name">Visitante</div>
                                <div id="auth-modal-email" class="auth-modal-email">Modo lectura (Puedes orar y escuchar libremente)</div>
                                <div id="auth-modal-badge" class="auth-modal-badge visitor">👀 Solo Lectura</div>
                            </div>
                        </div>
                        <div class="auth-actions-row">
                            <button type="button" id="btn-google-signin" class="btn-google-signin">
                                <svg class="google-svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                                Iniciar sesión con Google
                            </button>
                            <button type="button" id="btn-google-signout" class="btn-google-signout" style="display: none;">Cerrar Sesión</button>
                        </div>
                    </div>
                    <p class="auth-role-note">
                        💡 <em>Nota:</em> Todos los fieles pueden rezar, escuchar y descargar libremente el Rosario. Solo el administrador con correo <strong>dbaezh78@gmail.com</strong> puede modificar, guardar o eliminar tiempos y configuraciones oficiales.
                    </p>
                </div>

                <!-- Sección de Temas Visuales -->
                <div class="profile-section-card">
                    <h3 class="profile-section-title">🎨 Temas Visuales Sagrados</h3>
                    <div class="theme-options-grid">
                        <label class="theme-option-card">
                            <input type="radio" name="rosary-theme" value="dark" checked>
                            <div class="theme-preview dark-theme-preview">
                                <span class="theme-dot gold"></span>
                                <span class="theme-dot dark"></span>
                            </div>
                            <span class="theme-name">Modo Oscuro (Predeterminado)</span>
                        </label>
                        <label class="theme-option-card">
                            <input type="radio" name="rosary-theme" value="light">
                            <div class="theme-preview light-theme-preview">
                                <span class="theme-dot gold"></span>
                                <span class="theme-dot light"></span>
                            </div>
                            <span class="theme-name">Modo Claro</span>
                        </label>
                        <label class="theme-option-card">
                            <input type="radio" name="rosary-theme" value="azul-cielo">
                            <div class="theme-preview cielo-theme-preview">
                                <span class="theme-dot gold"></span>
                                <span class="theme-dot azul-cielo"></span>
                            </div>
                            <span class="theme-name">Modo Azul Cielo</span>
                        </label>
                        <label class="theme-option-card">
                            <input type="radio" name="rosary-theme" value="azul-celeste">
                            <div class="theme-preview celeste-theme-preview">
                                <span class="theme-dot gold"></span>
                                <span class="theme-dot azul-celeste"></span>
                            </div>
                            <span class="theme-name">Modo Azul Celeste</span>
                        </label>
                    </div>
                </div>

                <!-- Sección de Tamaño de Imagen de los Misterios -->
                <div class="profile-section-card">
                    <h3 class="profile-section-title">🖼️ Tamaño de Imagen de los Misterios</h3>
                    <p class="profile-setting-desc">Elige qué tan grande deseas contemplar la pintura sacra del misterio en la pantalla principal:</p>
                    <div class="image-size-options">
                        <label class="size-pill">
                            <input type="radio" name="mystery-image-size" value="100">
                            <span>100px (Compacto)</span>
                        </label>
                        <label class="size-pill">
                            <input type="radio" name="mystery-image-size" value="150">
                            <span>150px (Mediano)</span>
                        </label>
                        <label class="size-pill">
                            <input type="radio" name="mystery-image-size" value="200" checked>
                            <span>200px (Grande - Recomendado)</span>
                        </label>
                        <label class="size-pill">
                            <input type="radio" name="mystery-image-size" value="250">
                            <span>250px (Extra Grande)</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="profile-modal-footer">
                <button type="button" id="btn-profile-close" class="btn-sync-prim">Listo</button>
            </div>
        </div>
    </div>\n`;
    html = html.substring(0, bodyIdx) + modalSnippet + html.substring(bodyIdx);
    console.log('5. Profile modal added');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('HTML update finished successfully!');
