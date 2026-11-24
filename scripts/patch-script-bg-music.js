const fs = require('fs');

let js = fs.readFileSync('src/script.js', 'utf8');

// 1. Actualizar togglePlay para incluir el pre-roll de 2 segundos de música de fondo y pausa coordinada
const oldTogglePlay = `function togglePlay() {
    const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
    let mystery = currentMystery;
    if (syncModal && syncModal.classList.contains('open') && syncMysterySelect) {
        mystery = syncMysterySelect.value;
    }
    const useSegmented = (activeSyncAudioMode === 'segmented');

    if (useSegmented) {
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
    }

    // Modo Continuo Estándar
    isPlayingSegmentedRosary = false;
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
            console.log("Error al reproducir audio:", err);
        });
    } else {
        audioPlayer.pause();
        updatePlayPauseButton(false);
    }
}`;

const newTogglePlay = `function togglePlay() {
    const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
    let mystery = currentMystery;
    if (syncModal && syncModal.classList.contains('open') && syncMysterySelect) {
        mystery = syncMysterySelect.value;
    }
    const useSegmented = (activeSyncAudioMode === 'segmented');

    if (useSegmented) {
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
    } else {
        audioPlayer.pause();
        if (window.RosaryBgMusic) window.RosaryBgMusic.pausePlayback();
        updatePlayPauseButton(false);
    }
}`;

if (js.includes(oldTogglePlay)) {
    js = js.replace(oldTogglePlay, newTogglePlay);
    console.log('1. togglePlay updated with 2-second background music pre-roll.');
} else {
    console.log('1. oldTogglePlay anchor not found, checking alternatives...');
}

// 2. Actualizar fin de reproducción en playSegmentedRosary para los 5 segundos de post-roll
const oldFinishedCheck = `    if (stepIndex >= currentSteps.length) {
        isPlayingSegmentedRosary = false;
        updatePlayPauseButton(false);
        showRosaryToast('🌹 ¡Santo Rosario completado con devoción!');
        if (syncListContainer) {
            syncListContainer.querySelectorAll('.sync-item-row').forEach(r => r.classList.remove('playing-active'));
        }
        return;
    }`;

const newFinishedCheck = `    if (stepIndex >= currentSteps.length) {
        isPlayingSegmentedRosary = false;
        showRosaryToast('🌹 ¡Santo Rosario completado con devoción! La música de fondo continuará 5 segundos más...');
        if (window.RosaryBgMusic) {
            window.RosaryBgMusic.finishRosaryWithPostRoll(() => {
                updatePlayPauseButton(false);
            });
        } else {
            updatePlayPauseButton(false);
        }
        if (syncListContainer) {
            syncListContainer.querySelectorAll('.sync-item-row').forEach(r => r.classList.remove('playing-active'));
        }
        return;
    }`;

if (js.includes(oldFinishedCheck)) {
    js = js.replace(oldFinishedCheck, newFinishedCheck);
    console.log('2. playSegmentedRosary finish updated with 5-second background music post-roll.');
} else {
    console.log('2. oldFinishedCheck anchor not found.');
}

// 3. Actualizar audioPlayer 'ended' event para el post-roll en el paso final
const oldEndedEvent = `audioPlayer.addEventListener('ended', () => {
    if (isPlayingSegmentedRosary) {
        if (currentStepIndex < currentSteps.length - 1) {
            playSegmentedRosary(currentStepIndex + 1);
        } else {
            isPlayingSegmentedRosary = false;
            updatePlayPauseButton(false);
            showRosaryToast('🌹 ¡Santo Rosario completado con devoción!');
        }
    }
});`;

const newEndedEvent = `audioPlayer.addEventListener('ended', () => {
    if (isPlayingSegmentedRosary) {
        if (currentStepIndex < currentSteps.length - 1) {
            playSegmentedRosary(currentStepIndex + 1);
        } else {
            isPlayingSegmentedRosary = false;
            showRosaryToast('🌹 ¡Santo Rosario completado con devoción! La música de fondo continuará 5 segundos más...');
            if (window.RosaryBgMusic) {
                window.RosaryBgMusic.finishRosaryWithPostRoll(() => {
                    updatePlayPauseButton(false);
                });
            } else {
                updatePlayPauseButton(false);
            }
        }
    }
});`;

if (js.includes(oldEndedEvent)) {
    js = js.replace(oldEndedEvent, newEndedEvent);
    console.log('3. audioPlayer ended event updated with 5-second background music post-roll.');
} else {
    console.log('3. oldEndedEvent anchor not found.');
}

fs.writeFileSync('src/script.js', js, 'utf8');
console.log('src/script.js successfully patched for Background Music timing!');
