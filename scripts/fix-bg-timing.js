const fs = require('fs');

// 1. Corregir syncActiveTrackSource y startPlaybackWithPreRoll en src/bg-music.js
let bgJs = fs.readFileSync('src/bg-music.js', 'utf8');

const oldSyncSource = `    async function syncActiveTrackSource() {
        if (!bgAudioElem) bgAudioElem = document.getElementById('bg-music-player');
        if (!bgAudioElem) return;

        const activeTrack = await getActiveTrackObject();
        const url = await getTrackUrl(activeTrack);
        if (url && bgAudioElem.src !== url) {
            const wasPlaying = !bgAudioElem.paused;
            bgAudioElem.src = url;
            bgAudioElem.load();
            if (wasPlaying) {
                bgAudioElem.play().catch(e => console.warn('Error al reanudar bg audio:', e));
            }
        }
    }`;

const newSyncSource = `    async function syncActiveTrackSource() {
        if (!bgAudioElem) bgAudioElem = document.getElementById('bg-music-player');
        if (!bgAudioElem) return;

        const activeTrack = await getActiveTrackObject();
        const url = await getTrackUrl(activeTrack);
        if (!url) return;

        const currentSrc = bgAudioElem.src || '';
        const isSame = (currentSrc === url) || (currentSrc.endsWith('/' + url)) || (currentSrc.endsWith(url));
        if (!isSame) {
            const wasPlaying = !bgAudioElem.paused;
            bgAudioElem.src = url;
            bgAudioElem.load();
            if (wasPlaying) {
                bgAudioElem.play().catch(e => console.warn('Error al reanudar bg audio:', e));
            }
        }
    }`;

if (bgJs.includes(oldSyncSource)) {
    bgJs = bgJs.replace(oldSyncSource, newSyncSource);
    console.log('1. syncActiveTrackSource fixed in src/bg-music.js');
}

fs.writeFileSync('src/bg-music.js', bgJs, 'utf8');

// 2. Corregir togglePlay en src/script.js para chequear isPlayingSegmentedRosary
let scriptJs = fs.readFileSync('src/script.js', 'utf8');

const oldToggleBlock = `    if (useSegmented) {
        if (audioPlayer.paused) {
            // Si estaba en pausa dentro de una oración y el audio no ha finalizado, reanudar de inmediato en el segundo exacto
            if (audioPlayer.src && !audioPlayer.ended && audioPlayer.currentTime > 0) {
                isPlayingSegmentedRosary = true;
                if (window.RosaryBgMusic) window.RosaryBgMusic.resumePlayback();
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {
                    playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                });
            } else {
                // Iniciar desde el principio (o cuenta seleccionada) con 2 segundos de música de fondo antes de la voz
                if (window.RosaryBgMusic && window.RosaryBgMusic.isEnabled()) {
                    updatePlayPauseButton(true);
                    showRosaryToast('🎵 Música de fondo iniciada (la oración comenzará en 2 segundos)...');
                    window.RosaryBgMusic.startPlaybackWithPreRoll(() => {
                        playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                    });
                } else {
                    playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                }
            }
        } else {
            audioPlayer.pause();
            if (window.RosaryBgMusic) window.RosaryBgMusic.pausePlayback();
            updatePlayPauseButton(false);
            if (syncListContainer) {
                syncListContainer.querySelectorAll('.btn-sync-play-segment').forEach(b => {
                    b.innerText = '▶';
                    b.classList.remove('is-playing');
                });
            }
        }
        return;
    }

    // Modo Continuo Estándar
    isPlayingSegmentedRosary = false;
    if (audioPlayer.paused) {
        if (audioPlayer.currentTime > 0) {
            if (window.RosaryBgMusic) window.RosaryBgMusic.resumePlayback();
            audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
                console.log("Error al reproducir audio:", err);
            });
        } else {
            if (window.RosaryBgMusic && window.RosaryBgMusic.isEnabled()) {
                updatePlayPauseButton(true);
                showRosaryToast('🎵 Música de fondo iniciada (la oración comenzará en 2 segundos)...');
                window.RosaryBgMusic.startPlaybackWithPreRoll(() => {
                    audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
                        console.log("Error al reproducir audio:", err);
                    });
                });
            } else {
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
                    console.log("Error al reproducir audio:", err);
                });
            }
        }
    }`;

const newToggleBlock = `    if (useSegmented) {
        if (audioPlayer.paused) {
            // Si el rosario YA estaba en curso y solo se había pausado a mitad de una oración, reanudar de inmediato
            if (isPlayingSegmentedRosary && audioPlayer.src && !audioPlayer.ended && audioPlayer.currentTime > 0) {
                if (window.RosaryBgMusic) window.RosaryBgMusic.resumePlayback();
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {
                    playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                });
            } else {
                // Iniciar nuevo rezo: pre-roll de 2 segundos de música de fondo antes de que entre la voz
                if (window.RosaryBgMusic && window.RosaryBgMusic.isEnabled()) {
                    updatePlayPauseButton(true);
                    showRosaryToast('🎵 Música de fondo iniciada (la oración comenzará en 2 segundos)...');
                    window.RosaryBgMusic.startPlaybackWithPreRoll(() => {
                        playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                    });
                } else {
                    playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
                }
            }
        } else {
            audioPlayer.pause();
            if (window.RosaryBgMusic) window.RosaryBgMusic.pausePlayback();
            updatePlayPauseButton(false);
            if (syncListContainer) {
                syncListContainer.querySelectorAll('.btn-sync-play-segment').forEach(b => {
                    b.innerText = '▶';
                    b.classList.remove('is-playing');
                });
            }
        }
        return;
    }

    // Modo Continuo Estándar
    if (audioPlayer.paused) {
        if (isPlayingSegmentedRosary && audioPlayer.currentTime > 0) {
            if (window.RosaryBgMusic) window.RosaryBgMusic.resumePlayback();
            audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
                console.log("Error al reproducir audio:", err);
            });
        } else {
            isPlayingSegmentedRosary = false;
            if (window.RosaryBgMusic && window.RosaryBgMusic.isEnabled()) {
                updatePlayPauseButton(true);
                showRosaryToast('🎵 Música de fondo iniciada (la oración comenzará en 2 segundos)...');
                window.RosaryBgMusic.startPlaybackWithPreRoll(() => {
                    audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
                        console.log("Error al reproducir audio:", err);
                    });
                });
            } else {
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
                    console.log("Error al reproducir audio:", err);
                });
            }
        }
    }`;

if (scriptJs.includes(oldToggleBlock)) {
    scriptJs = scriptJs.replace(oldToggleBlock, newToggleBlock);
    console.log('2. togglePlay condition fixed in src/script.js');
} else {
    console.log('2. oldToggleBlock not found in src/script.js');
}

fs.writeFileSync('src/script.js', scriptJs, 'utf8');
console.log('Timing fix applied successfully!');
