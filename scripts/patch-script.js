const fs = require('fs');

let code = fs.readFileSync('src/script.js', 'utf8');

// 1. Inyectar variables de nuevos elementos DOM al inicio de las declaraciones
const domAnchor = "const syncTipBox = document.getElementById('sync-tip-box');";
const domInsert = `const syncTipBox = document.getElementById('sync-tip-box');

// Nuevos elementos: Grabación de pantalla, Perfil, Temas, Reproductor Flotante y Sincronizador de Versión
const btnRecordScreen = document.getElementById('btn-record-screen');
const btnStopRecording = document.getElementById('btn-stop-recording');
const recordingStatusBar = document.getElementById('recording-status-bar');
const recordingTimer = document.getElementById('recording-timer');
const btnAuthProfile = document.getElementById('btn-auth-profile');
const authAvatarIcon = document.getElementById('auth-avatar-icon');
const authUserLabel = document.getElementById('auth-user-label');
const userProfileModal = document.getElementById('user-profile-modal');
const userProfileModalClose = document.getElementById('user-profile-modal-close');
const btnProfileClose = document.getElementById('btn-profile-close');
const btnGoogleSignin = document.getElementById('btn-google-signin');
const btnGoogleSignout = document.getElementById('btn-google-signout');
const authUserEmail = document.getElementById('auth-user-email');
const authRoleBadge = document.getElementById('auth-role-badge');
const syncVersionSelect = document.getElementById('sync-version-select');
const btnCollapsePlayer = document.getElementById('btn-collapse-player');
const floatingMiniPlayer = document.getElementById('floating-mini-player');
const floatingBtnPlay = document.getElementById('floating-btn-play');
const floatingCurPrayer = document.getElementById('floating-cur-prayer');
const floatingTimeDisplay = document.getElementById('floating-time-display');
const floatingBtnExpand = document.getElementById('floating-btn-expand');
const audioControlsPanel = document.querySelector('.audio-controls-panel');`;

if (!code.includes('const btnRecordScreen = document.getElementById')) {
    code = code.replace(domAnchor, domInsert);
    console.log('1. DOM element declarations injected.');
} else {
    console.log('1. DOM element declarations already present.');
}

// 2. Actualizar updateAudioVersionUI para sincronizar syncVersionSelect
const versionUIAnchor = `    if (btnBrandCross) {
        btnBrandCross.classList.toggle('version-v1', isV1);
        btnBrandCross.classList.toggle('version-v2', !isV1);
        btnBrandCross.title = isV1
            ? "Cruz en V1 (Amarilla) — Clic para alternar a V2"
            : "Cruz en V2 (Roja) — Clic para alternar a V1";
    }`;

const versionUIReplacement = `    if (btnBrandCross) {
        btnBrandCross.classList.toggle('version-v1', isV1);
        btnBrandCross.classList.toggle('version-v2', !isV1);
        btnBrandCross.title = isV1
            ? "Cruz en V1 (Amarilla) — Clic para alternar a V2"
            : "Cruz en V2 (Roja) — Clic para alternar a V1";
    }

    if (syncVersionSelect) {
        syncVersionSelect.value = isV1 ? 'v1' : 'original';
    }`;

if (code.includes(versionUIAnchor) && !code.includes("if (syncVersionSelect) {")) {
    code = code.replace(versionUIAnchor, versionUIReplacement);
    console.log('2. syncVersionSelect hooked into updateAudioVersionUI.');
} else {
    console.log('2. syncVersionSelect already in updateAudioVersionUI or anchor mismatch.');
}

// 3. Actualizar updatePlayPauseButton para sincronizar floatingBtnPlay
const playPauseAnchor = `    if (syncBtnPlayPause) {
        syncBtnPlayPause.innerHTML = symbol;
        syncBtnPlayPause.title = titleText;
    }`;

const playPauseReplacement = `    if (syncBtnPlayPause) {
        syncBtnPlayPause.innerHTML = symbol;
        syncBtnPlayPause.title = titleText;
    }
    if (floatingBtnPlay) {
        floatingBtnPlay.innerHTML = symbol;
        floatingBtnPlay.title = titleText;
    }`;

if (code.includes(playPauseAnchor) && !code.includes("if (floatingBtnPlay) {")) {
    code = code.replace(playPauseAnchor, playPauseReplacement);
    console.log('3. floatingBtnPlay hooked into updatePlayPauseButton.');
} else {
    console.log('3. floatingBtnPlay already in updatePlayPauseButton or anchor mismatch.');
}

// 4. Actualizar timeupdate en modo segmentado para mostrar tiempo acumulado continuo y sincronizar floatingMiniPlayer
const timeupdateAnchor = `    if (isPlayingSegmentedRosary) {
        // En reproducción segmentada, la barra de progreso refleja el avance general del Rosario
        const cur = audioPlayer.currentTime || 0;
        const dur = audioPlayer.duration || 1;
        const stepProgress = dur > 0 ? (cur / dur) : 0;
        const totalSteps = (currentSteps && currentSteps.length > 0) ? currentSteps.length : 80;
        const overallPct = ((currentStepIndex + stepProgress) / totalSteps) * 100;

        if (seekSlider && !isSeeking) seekSlider.value = overallPct;
        if (miniSeekSlider && !isSeeking) miniSeekSlider.value = overallPct;
        if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(cur);
        if (totalTimeDisplay) totalTimeDisplay.innerText = formatTime(dur);
        if (miniTimeDisplay) miniTimeDisplay.innerText = \`\${formatTime(cur)} / \${formatTime(dur)}\`;
        if (miniPrayerTitle && currentSteps && currentSteps[currentStepIndex]) {
            miniPrayerTitle.innerText = currentSteps[currentStepIndex].title;
        }`;

const timeupdateReplacement = `    if (isPlayingSegmentedRosary) {
        // En reproducción segmentada, cálculo de tiempo acumulado continuo para todo el Santo Rosario
        const cur = audioPlayer.currentTime || 0;
        const dur = (audioPlayer.duration && !isNaN(audioPlayer.duration) && audioPlayer.duration > 0) ? audioPlayer.duration : 1;
        const stepProgress = Math.min(1, Math.max(0, cur / dur));

        const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
        const totalSec = (audioData && audioData[lang] && audioData[lang][currentMystery] && audioData[lang][currentMystery].duration)
            ? audioData[lang][currentMystery].duration
            : 1986;

        const curStep = (currentSteps && currentSteps[currentStepIndex]) ? currentSteps[currentStepIndex] : null;
        const stepStartSec = (curStep && typeof curStep.s === 'number') ? curStep.s : 0;
        const nextStepSec = (currentSteps && currentStepIndex < currentSteps.length - 1 && typeof currentSteps[currentStepIndex + 1].s === 'number')
            ? currentSteps[currentStepIndex + 1].s
            : totalSec;
        const stepDuration = Math.max(1, nextStepSec - stepStartSec);
        const accumulatedSec = Math.min(totalSec, stepStartSec + (stepProgress * stepDuration));
        const overallPct = Math.min(100, Math.max(0, (accumulatedSec / totalSec) * 100));

        if (seekSlider && !isSeeking) seekSlider.value = overallPct;
        if (miniSeekSlider && !isSeeking) miniSeekSlider.value = overallPct;
        if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(accumulatedSec);
        if (totalTimeDisplay) totalTimeDisplay.innerText = formatTime(totalSec);
        if (miniTimeDisplay) miniTimeDisplay.innerText = \`\${formatTime(accumulatedSec)} / \${formatTime(totalSec)}\`;
        if (floatingTimeDisplay) floatingTimeDisplay.innerText = \`\${formatTime(accumulatedSec)} / \${formatTime(totalSec)}\`;
        if (miniPrayerTitle && curStep) {
            miniPrayerTitle.innerText = curStep.title;
        }
        if (floatingCurPrayer && curStep) {
            floatingCurPrayer.innerText = curStep.title;
        }`;

if (code.includes(timeupdateAnchor)) {
    code = code.replace(timeupdateAnchor, timeupdateReplacement);
    console.log('4. timeupdate updated for continuous accumulated time display.');
} else {
    console.log('4. timeupdate anchor mismatch.');
}

// 5. Actualizar togglePlay para reanudar con exactitud desde la posición pausada
const togglePlayAnchor = `    if (useSegmented) {
        if (audioPlayer.paused) {
            const isContinuousSrc = audioPlayer.src && (audioPlayer.src.includes('/es/') || audioPlayer.src.includes('Dolorosos') || audioPlayer.src.includes('Gozosos')) && !audioPlayer.src.includes('/Segm/');
            if (audioPlayer.src && !isContinuousSrc && !audioPlayer.ended && currentStepIndex >= 0) {
                isPlayingSegmentedRosary = true;
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {
                    playSegmentedRosary(currentStepIndex);
                });
            } else {
                playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
            }
        } else {
            audioPlayer.pause();
            // Mantener isPlayingSegmentedRosary = true para que al reanudar no se reinicie a segundo 0
            updatePlayPauseButton(false);
            if (syncListContainer) {
                syncListContainer.querySelectorAll('.btn-sync-play-segment').forEach(b => {
                    b.innerText = '▶';
                    b.classList.remove('is-playing');
                });
            }
        }
        return;
    }`;

const togglePlayReplacement = `    if (useSegmented) {
        if (audioPlayer.paused) {
            // Si estaba en pausa dentro de una oración y el audio no ha finalizado, reanudar de inmediato en el segundo exacto
            if (audioPlayer.src && !audioPlayer.ended && audioPlayer.currentTime > 0) {
                isPlayingSegmentedRosary = true;
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {
                    playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                });
            } else {
                playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
            }
        } else {
            audioPlayer.pause();
            updatePlayPauseButton(false);
            if (syncListContainer) {
                syncListContainer.querySelectorAll('.btn-sync-play-segment').forEach(b => {
                    b.innerText = '▶';
                    b.classList.remove('is-playing');
                });
            }
        }
        return;
    }`;

if (code.includes(togglePlayAnchor)) {
    code = code.replace(togglePlayAnchor, togglePlayReplacement);
    console.log('5. togglePlay updated for exact position preservation.');
} else {
    console.log('5. togglePlay anchor mismatch.');
}

// 6. Proteger acciones de edición contra usuarios no administradores (Solo Lectura)
const btnSyncSaveAnchor = "if (btnSyncSave) {\n    btnSyncSave.addEventListener('click', () => {";
const btnSyncSaveReplacement = `if (btnSyncSave) {
    btnSyncSave.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede guardar cambios en la configuración oficial.');
            return;
        }`;

if (code.includes(btnSyncSaveAnchor)) {
    code = code.replace(btnSyncSaveAnchor, btnSyncSaveReplacement);
    console.log('6. btnSyncSave protected for admin-only.');
}

const btnSyncResetAnchor = "if (btnSyncReset) {\n    btnSyncReset.addEventListener('click', () => {";
const btnSyncResetReplacement = `if (btnSyncReset) {
    btnSyncReset.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede restablecer los tiempos.');
            return;
        }`;

if (code.includes(btnSyncResetAnchor)) {
    code = code.replace(btnSyncResetAnchor, btnSyncResetReplacement);
    console.log('6. btnSyncReset protected for admin-only.');
}

const btnSyncImportAnchor = "if (btnSyncImport) {\n    btnSyncImport.addEventListener('click', () => {";
const btnSyncImportReplacement = `if (btnSyncImport) {
    btnSyncImport.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede importar configuraciones.');
            return;
        }`;

if (code.includes(btnSyncImportAnchor)) {
    code = code.replace(btnSyncImportAnchor, btnSyncImportReplacement);
    console.log('6. btnSyncImport protected for admin-only.');
}

const btnCloudRestoreAnchor = "if (btnSyncCloudRestore) {\n    btnSyncCloudRestore.addEventListener('click', async () => {";
const btnCloudRestoreReplacement = `if (btnSyncCloudRestore) {
    btnSyncCloudRestore.addEventListener('click', async () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede restaurar desde la nube.');
            return;
        }`;

if (code.includes(btnCloudRestoreAnchor)) {
    code = code.replace(btnCloudRestoreAnchor, btnCloudRestoreReplacement);
    console.log('6. btnSyncCloudRestore protected for admin-only.');
}

// 7. Insertar funciones para Grabación, Perfil / Auth, Temas Sagrados, Tamaño de Imagen y Reproductor Flotante al final
const finalFunctions = `
// =============================================================================
// 15. FUNCIONALIDADES AVANZADAS: REPRODUCTOR FLOTANTE, GRABACIÓN, PERFIL Y TEMAS
// =============================================================================

// A. REPRODUCTOR FLOTANTE Y BOTÓN OCULTAR / EXPANDIR
function setupPlayerCollapseAndFloatingControls() {
    if (btnCollapsePlayer) {
        btnCollapsePlayer.addEventListener('click', () => {
            if (audioControlsPanel) audioControlsPanel.classList.add('collapsed');
            if (floatingMiniPlayer) floatingMiniPlayer.style.display = 'flex';
            try { localStorage.setItem('rosary_player_collapsed', 'true'); } catch (e) {}
            showRosaryToast('⌄ Reproductor inferior oculto. Puedes controlarlo desde la barra superior flotante.');
        });
    }

    if (floatingBtnExpand) {
        floatingBtnExpand.addEventListener('click', () => {
            if (audioControlsPanel) audioControlsPanel.classList.remove('collapsed');
            if (floatingMiniPlayer) floatingMiniPlayer.style.display = 'none';
            try { localStorage.setItem('rosary_player_collapsed', 'false'); } catch (e) {}
        });
    }

    if (floatingBtnPlay) {
        floatingBtnPlay.addEventListener('click', togglePlay);
    }

    // Restaurar preferencia previa
    try {
        if (localStorage.getItem('rosary_player_collapsed') === 'true') {
            if (audioControlsPanel) audioControlsPanel.classList.add('collapsed');
            if (floatingMiniPlayer) floatingMiniPlayer.style.display = 'flex';
        }
    } catch (e) {}
}

// B. GRABACIÓN DE PANTALLA EN VIDEO PARA YOUTUBE (SIN REPRODUCTOR)
let screenMediaRecorder = null;
let screenRecordedChunks = [];
let screenRecordingTimerInterval = null;
let screenRecordingStartTimestamp = 0;

function setupScreenRecording() {
    if (!btnRecordScreen) return;

    btnRecordScreen.addEventListener('click', async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
                showRosaryToast('⚠️ La grabación de pantalla en vivo no está soportada en este navegador.');
                return;
            }

            // Ocultar reproductor inferior para dejar la pantalla completamente limpia para YouTube
            if (audioControlsPanel) audioControlsPanel.classList.add('collapsed');
            if (floatingMiniPlayer) floatingMiniPlayer.style.display = 'none';

            showRosaryToast('📹 Selecciona la pantalla o pestaña para iniciar la grabación en video para YouTube.');

            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { displaySurface: 'browser' },
                audio: true
            });

            screenRecordedChunks = [];
            const mimeType = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus'))
                ? 'video/webm;codecs=vp9,opus'
                : 'video/webm';

            screenMediaRecorder = new MediaRecorder(stream, { mimeType });

            screenMediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    screenRecordedChunks.push(e.data);
                }
            };

            screenMediaRecorder.onstop = () => {
                stopScreenRecordingUI(stream);
            };

            // Detectar si el usuario detiene la transmisión con el botón nativo del navegador
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.onended = () => {
                    if (screenMediaRecorder && screenMediaRecorder.state !== 'inactive') {
                        screenMediaRecorder.stop();
                    }
                };
            }

            screenMediaRecorder.start(1000);

            // Mostrar barra de estado flotante
            if (recordingStatusBar) recordingStatusBar.style.display = 'flex';
            screenRecordingStartTimestamp = Date.now();
            if (recordingTimer) recordingTimer.innerText = '00:00';
            clearInterval(screenRecordingTimerInterval);
            screenRecordingTimerInterval = setInterval(() => {
                const elapsedSec = Math.floor((Date.now() - screenRecordingStartTimestamp) / 1000);
                const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
                const ss = String(elapsedSec % 60).padStart(2, '0');
                if (recordingTimer) recordingTimer.innerText = \`\${mm}:\${ss}\`;
            }, 1000);

            showRosaryToast('🔴 Grabando video para YouTube. El reproductor ha sido ocultado.');
        } catch (err) {
            console.warn('Error al iniciar grabación de pantalla:', err);
            // Restaurar reproductor si el usuario canceló
            try {
                if (localStorage.getItem('rosary_player_collapsed') !== 'true') {
                    if (audioControlsPanel) audioControlsPanel.classList.remove('collapsed');
                } else {
                    if (floatingMiniPlayer) floatingMiniPlayer.style.display = 'flex';
                }
            } catch (e) {}

            if (err.name !== 'NotAllowedError') {
                showRosaryToast('⚠️ ' + (err.message || 'No se pudo iniciar la grabación'));
            }
        }
    });

    if (btnStopRecording) {
        btnStopRecording.addEventListener('click', () => {
            if (screenMediaRecorder && screenMediaRecorder.state !== 'inactive') {
                screenMediaRecorder.stop();
            }
        });
    }
}

function stopScreenRecordingUI(stream) {
    clearInterval(screenRecordingTimerInterval);
    if (recordingStatusBar) recordingStatusBar.style.display = 'none';

    if (stream) {
        stream.getTracks().forEach(t => t.stop());
    }

    try {
        if (localStorage.getItem('rosary_player_collapsed') === 'true') {
            if (floatingMiniPlayer) floatingMiniPlayer.style.display = 'flex';
        } else {
            if (audioControlsPanel) audioControlsPanel.classList.remove('collapsed');
        }
    } catch (e) {}

    if (screenRecordedChunks.length > 0) {
        const blob = new Blob(screenRecordedChunks, { type: 'video/webm' });
        const fileName = \`Santo_Rosario_\${currentMystery}_Grabacion_YouTube.webm\`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showRosaryToast(\`🎉 ¡Grabación de video completada! Guardado como \${fileName}\`);
    }
}

// C. TEMAS SAGRADOS Y TAMAÑO DE IMAGEN DE LOS MISTERIOS
function setupThemesAndAppearance() {
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('rosary_active_theme', theme); } catch (e) {}
        const radio = document.querySelector(\`input[name="rosary-theme"][value="\${theme}"]\`);
        if (radio) radio.checked = true;
    }

    const savedTheme = localStorage.getItem('rosary_active_theme') || 'dark';
    applyTheme(savedTheme);

    document.querySelectorAll('input[name="rosary-theme"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                applyTheme(e.target.value);
                const themeName = e.target.parentElement.querySelector('.theme-name')?.innerText || e.target.value;
                showRosaryToast(\`🎨 Tema visual aplicado: \${themeName}\`);
            }
        });
    });

    function applyMysteryImageSize(size) {
        document.documentElement.style.setProperty('--mystery-thumb-size', \`\${size}px\`);
        try { localStorage.setItem('rosary_mystery_image_size', size); } catch (e) {}
        const radio = document.querySelector(\`input[name="mystery-image-size"][value="\${size}"]\`);
        if (radio) radio.checked = true;
    }

    const savedSize = localStorage.getItem('rosary_mystery_image_size') || '200';
    applyMysteryImageSize(savedSize);

    document.querySelectorAll('input[name="mystery-image-size"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                applyMysteryImageSize(e.target.value);
                showRosaryToast(\`🖼️ Tamaño de imagen: \${e.target.value}px\`);
            }
        });
    });
}

// D. MODAL DE PERFIL, AUTENTICACIÓN GOOGLE Y PERMISOS
function setupAuthAndPermissions() {
    if (btnAuthProfile && userProfileModal) {
        btnAuthProfile.addEventListener('click', () => {
            userProfileModal.classList.add('open');
        });
    }

    const closeProfileModal = () => {
        if (userProfileModal) userProfileModal.classList.remove('open');
    };

    if (userProfileModalClose) userProfileModalClose.addEventListener('click', closeProfileModal);
    if (btnProfileClose) btnProfileClose.addEventListener('click', closeProfileModal);

    if (btnGoogleSignin) {
        btnGoogleSignin.addEventListener('click', async () => {
            try {
                if (window.RosaryAuth && window.RosaryAuth.loginWithGoogle) {
                    showRosaryToast('Iniciando sesión con Google...');
                    await window.RosaryAuth.loginWithGoogle();
                } else {
                    showRosaryToast('⚠️ Servicio de autenticación no inicializado');
                }
            } catch (err) {
                console.error('Error al iniciar sesión:', err);
                showRosaryToast('❌ ' + (err.message || 'Error al iniciar sesión'));
            }
        });
    }

    if (btnGoogleSignout) {
        btnGoogleSignout.addEventListener('click', async () => {
            try {
                if (window.RosaryAuth && window.RosaryAuth.logout) {
                    await window.RosaryAuth.logout();
                    showRosaryToast('Sesión cerrada.');
                }
            } catch (err) {
                console.error('Error al cerrar sesión:', err);
            }
        });
    }

    if (window.RosaryAuth && window.RosaryAuth.onAuthStateChanged) {
        window.RosaryAuth.onAuthStateChanged(user => {
            handleAuthStateChange(user);
        });
    } else {
        handleAuthStateChange(null);
    }
}

function handleAuthStateChange(user) {
    const isAdmin = window.RosaryAuth ? window.RosaryAuth.checkIsAdmin(user) : false;

    if (user && isAdmin) {
        document.body.classList.remove('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Admin';
        if (authAvatarIcon) authAvatarIcon.innerText = '👑';
        if (authUserEmail) authUserEmail.innerText = user.email || 'dbaezh78@gmail.com';
        if (authRoleBadge) {
            authRoleBadge.innerText = '👑 Administrador (Control Total)';
            authRoleBadge.className = 'auth-role-badge admin';
        }
        if (btnGoogleSignin) btnGoogleSignin.style.display = 'none';
        if (btnGoogleSignout) btnGoogleSignout.style.display = 'inline-block';
        showRosaryToast('👑 Administrador verificado (' + (user.email || 'dbaezh78@gmail.com') + '). Control total activado.');
    } else if (user) {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Visitante';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (authUserEmail) authUserEmail.innerText = user.email;
        if (authRoleBadge) {
            authRoleBadge.innerText = '👁️ Visitante (Solo Lectura)';
            authRoleBadge.className = 'auth-role-badge guest';
        }
        if (btnGoogleSignin) btnGoogleSignin.style.display = 'none';
        if (btnGoogleSignout) btnGoogleSignout.style.display = 'inline-block';
    } else {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Acceder';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (authUserEmail) authUserEmail.innerText = 'Modo Visitante (Solo Lectura)';
        if (authRoleBadge) {
            authRoleBadge.innerText = '👁️ Solo Lectura';
            authRoleBadge.className = 'auth-role-badge guest';
        }
        if (btnGoogleSignin) btnGoogleSignin.style.display = 'inline-flex';
        if (btnGoogleSignout) btnGoogleSignout.style.display = 'none';
    }
}

// E. SINCRONIZACIÓN DEL SELECTOR DE VERSIÓN (CRUZ AMARILLA V1 vs CRUZ ROJA V2) EN EL SINCRONIZADOR
function setupSyncVersionSelector() {
    if (syncVersionSelect) {
        syncVersionSelect.value = (audioVersion === 'v1') ? 'v1' : 'original';
        syncVersionSelect.addEventListener('change', () => {
            audioVersion = syncVersionSelect.value;
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(AUDIO_VERSION_KEY, audioVersion);
                    localStorage.setItem(DOLOROSOS_VERSION_KEY, audioVersion);
                }
            } catch (e) {}
            updateAudioVersionUI();

            const lang = langSelect ? (langSelect.value || 'es') : 'es';
            const newSrc = getActiveMysterySrc(currentMystery, lang);
            if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][currentMystery]) {
                audioData[lang][currentMystery].src = newSrc;
            }
            renderSyncItems(activeSyncLang, activeSyncMystery);
            showRosaryToast(\`Versión cambiada a: \${audioVersion === 'v1' ? '🟡 Versión 1 (Cruz Amarilla)' : '🔴 Versión 2 (Cruz Roja · Original)'}\`);
        });
    }
}

// Inicializar todas las nuevas funcionalidades
function initNewFeatures() {
    setupPlayerCollapseAndFloatingControls();
    setupScreenRecording();
    setupThemesAndAppearance();
    setupAuthAndPermissions();
    setupSyncVersionSelector();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewFeatures);
} else {
    initNewFeatures();
}
`;

if (!code.includes('function setupPlayerCollapseAndFloatingControls')) {
    code += '\n' + finalFunctions;
    console.log('7. Advanced features appended to script.js.');
} else {
    console.log('7. Advanced features already present in script.js.');
}

fs.writeFileSync('src/script.js', code, 'utf8');
console.log('src/script.js successfully patched!');
