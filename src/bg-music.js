// =============================================================================
// SANTO ROSARIO - GESTOR DE MÚSICA DE FONDO SAGRADA
// =============================================================================

const RosaryBgMusic = (function() {
    const DB_NAME = 'RosaryBgMusicDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'bg_tracks';

    const STORAGE_KEY_ACTIVE_ID = 'rosary_active_bg_track_id';
    const STORAGE_KEY_ENABLED = 'rosary_bg_music_enabled';
    const STORAGE_KEY_VOLUME = 'rosary_bg_music_volume';

    // Pistas Predeterminadas Oficiales en src/mp3/Segm
    const SYSTEM_TRACKS = [
        {
            id: 'bg_sleep_music',
            name: 'Sleep Music No. 1 - Chris Haugen',
            fileName: 'Sleep Music No. 1 - Chris Haugen.mp3',
            src: 'src/mp3/Segm/Sleep Music No. 1 - Chris Haugen.mp3',
            isSystem: true
        },
        {
            id: 'bg_spirit_of_fire',
            name: 'Spirit of Fire',
            fileName: 'Spirit of Fire.mp3',
            src: 'src/mp3/Segm/Spirit of Fire.mp3',
            isSystem: true
        },
        {
            id: 'bg_violin_ave',
            name: 'Violin-Ave',
            fileName: 'Violin-Ave.mp3',
            src: 'src/mp3/Segm/Violin-Ave.mp3',
            isSystem: true
        },
        {
            id: 'bg_regina_caeli',
            name: 'ReginaCealiAlleluia',
            fileName: 'ReginaCealiAlleluia.mp3',
            src: 'src/mp3/Segm/ReginaCealiAlleluia.mp3',
            isSystem: true
        }
    ];

    const DEFAULT_SYSTEM_TRACK = SYSTEM_TRACKS[0]; // Sleep Music No. 1
    const SYSTEM_TRACK = DEFAULT_SYSTEM_TRACK; // Compatibilidad regresiva

    let dbInstance = null;
    let bgAudioElem = null;
    let previewAudioElem = null;
    let previewingTrackId = null;
    let fadeOutInterval = null;
    let preRollTimer = null;
    let postRollTimer = null;

    // Cache de URLs para blobs de IndexedDB
    const blobUrlCache = new Map();

    // 1. GESTIÓN DE INDEXEDDB PARA AUDIOS SUBIDOS POR EL USUARIO
    function openDB() {
        if (dbInstance) return Promise.resolve(dbInstance);
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
            req.onsuccess = (e) => {
                dbInstance = e.target.result;
                resolve(dbInstance);
            };
            req.onerror = (e) => {
                console.error('[BgMusic] Error al abrir IndexedDB:', e);
                reject(e);
            };
        });
    }

    async function getUserTracks() {
        try {
            const db = await openDB();
            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.getAll();
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = () => resolve([]);
            });
        } catch (e) {
            console.warn('[BgMusic] Error al obtener pistas del usuario:', e);
            return [];
        }
    }

    async function saveUserTrack(file) {
        const db = await openDB();
        const id = 'bg_usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        const name = file.name.replace(/\.[^/.]+$/, "");
        const record = {
            id,
            name,
            fileName: file.name,
            size: file.size,
            type: file.type || 'audio/mpeg',
            blob: file,
            createdAt: new Date().toISOString()
        };

        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.add(record);
            req.onsuccess = () => resolve(record);
            req.onerror = (err) => reject(err);
        });
    }

    async function deleteUserTrack(id) {
        const db = await openDB();
        if (blobUrlCache.has(id)) {
            URL.revokeObjectURL(blobUrlCache.get(id));
            blobUrlCache.delete(id);
        }
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.delete(id);
            req.onsuccess = () => resolve(true);
            req.onerror = () => resolve(false);
        });
    }

    // 2. CONFIGURACIÓN Y ESTADO ACTIVO
    function isEnabled() {
        try {
            return localStorage.getItem(STORAGE_KEY_ENABLED) !== 'false';
        } catch (e) {
            return true;
        }
    }

    function setEnabled(val) {
        try {
            localStorage.setItem(STORAGE_KEY_ENABLED, val ? 'true' : 'false');
        } catch (e) {}
        if (!val && bgAudioElem && !bgAudioElem.paused) {
            bgAudioElem.pause();
        }
    }

    function getVolume() {
        try {
            const v = parseFloat(localStorage.getItem(STORAGE_KEY_VOLUME));
            return (!isNaN(v) && v >= 0 && v <= 1) ? v : 0.25;
        } catch (e) {
            return 0.25;
        }
    }

    function setVolume(vol) {
        const clamped = Math.max(0, Math.min(1, vol));
        try {
            localStorage.setItem(STORAGE_KEY_VOLUME, clamped.toFixed(2));
        } catch (e) {}
        if (bgAudioElem) {
            bgAudioElem.volume = clamped;
        }
        updateVolumeSlidersUI(clamped);
    }

    function getActiveTrackId() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
            if (saved) {
                if (saved === 'sys_regina_caeli') return 'bg_regina_caeli';
                return saved;
            }
            return DEFAULT_SYSTEM_TRACK.id;
        } catch (e) {
            return DEFAULT_SYSTEM_TRACK.id;
        }
    }

    function setActiveTrackId(id) {
        try {
            localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id);
        } catch (e) {}
        syncActiveTrackSource();
    }

    async function getTrackUrl(track) {
        if (!track) return '';
        if (track.isSystem || track.src) {
            return track.src;
        }
        if (track.blob) {
            if (!blobUrlCache.has(track.id)) {
                blobUrlCache.set(track.id, URL.createObjectURL(track.blob));
            }
            return blobUrlCache.get(track.id);
        }
        return '';
    }

    async function getAllAvailableTracks() {
        const userTracks = await getUserTracks();
        return [...SYSTEM_TRACKS, ...userTracks];
    }

    async function getActiveTrackObject() {
        const activeId = getActiveTrackId();
        const all = await getAllAvailableTracks();
        const found = all.find(t => t.id === activeId || (t.id === 'bg_regina_caeli' && activeId === 'sys_regina_caeli'));
        return found || DEFAULT_SYSTEM_TRACK;
    }

    async function syncActiveTrackSource() {
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
    }

    // 3. CONTROL LITÚRGICO: 2 SEGUNDOS ANTES Y 5 SEGUNDOS DESPUÉS
    function clearTimers() {
        if (preRollTimer) {
            clearTimeout(preRollTimer);
            preRollTimer = null;
        }
        if (postRollTimer) {
            clearTimeout(postRollTimer);
            postRollTimer = null;
        }
        if (fadeOutInterval) {
            clearInterval(fadeOutInterval);
            fadeOutInterval = null;
        }
    }

    // Iniciar con 2 segundos de pre-roll antes de la voz
    async function startPlaybackWithPreRoll(onVoiceStartCallback) {
        clearTimers();
        if (!bgAudioElem) bgAudioElem = document.getElementById('bg-music-player');

        if (!isEnabled()) {
            // Si la música de fondo está desactivada, iniciar la voz inmediatamente
            if (typeof onVoiceStartCallback === 'function') onVoiceStartCallback();
            return;
        }

        await syncActiveTrackSource();
        const configuredVol = getVolume();
        bgAudioElem.volume = configuredVol;
        bgAudioElem.loop = true;

        try {
            await bgAudioElem.play();
        } catch (err) {
            console.warn('[BgMusic] No se pudo reproducir audio de fondo directamente:', err);
        }

        // Regla: Sonar exactamente 2 segundos antes de que comience el rezo vocal
        preRollTimer = setTimeout(() => {
            preRollTimer = null;
            if (typeof onVoiceStartCallback === 'function') {
                onVoiceStartCallback();
            }
        }, 2000);
    }

    // Pausar ambos
    function pausePlayback() {
        clearTimers();
        if (bgAudioElem && !bgAudioElem.paused) {
            bgAudioElem.pause();
        }
    }

    // Reanudar ambos (cuando se quita la pausa en medio del rezo)
    async function resumePlayback() {
        clearTimers();
        if (!bgAudioElem) bgAudioElem = document.getElementById('bg-music-player');
        if (isEnabled() && bgAudioElem) {
            bgAudioElem.volume = getVolume();
            bgAudioElem.loop = true;
            try {
                await bgAudioElem.play();
            } catch (err) {
                console.warn('[BgMusic] Error al reanudar fondo:', err);
            }
        }
    }

    // Concluir con 5 segundos de post-roll y fade-out suave
    function finishRosaryWithPostRoll(onFullyStoppedCallback) {
        clearTimers();
        if (!bgAudioElem) bgAudioElem = document.getElementById('bg-music-player');

        if (!isEnabled() || !bgAudioElem || bgAudioElem.paused) {
            if (typeof onFullyStoppedCallback === 'function') onFullyStoppedCallback();
            return;
        }

        // Regla: Continuar sonando 5 segundos después de que termina la oración final
        postRollTimer = setTimeout(() => {
            postRollTimer = null;
            // Fade out suave durante 1.5 segundos
            const startVol = bgAudioElem.volume;
            const steps = 20;
            let step = 0;
            fadeOutInterval = setInterval(() => {
                step++;
                const ratio = Math.max(0, 1 - (step / steps));
                if (bgAudioElem) bgAudioElem.volume = startVol * ratio;
                if (step >= steps) {
                    clearInterval(fadeOutInterval);
                    fadeOutInterval = null;
                    if (bgAudioElem) {
                        bgAudioElem.pause();
                        bgAudioElem.currentTime = 0;
                        bgAudioElem.volume = getVolume(); // Restaurar volumen original
                    }
                    if (typeof onFullyStoppedCallback === 'function') {
                        onFullyStoppedCallback();
                    }
                }
            }, 75);
        }, 5000);
    }

    // 4. INTERFAZ DE USUARIO Y EVENTOS
    function updateVolumeSlidersUI(vol) {
        const pct = Math.round(vol * 100) + '%';
        const sliderMain = document.getElementById('bg-music-vol-slider');
        const textMain = document.getElementById('bg-music-vol-pct');
        const sliderModal = document.getElementById('bg-music-modal-vol-slider');
        const textModal = document.getElementById('bg-music-modal-vol-val');

        if (sliderMain) sliderMain.value = vol;
        if (textMain) textMain.innerText = pct;
        if (sliderModal) sliderModal.value = vol;
        if (textModal) textModal.innerText = pct;
    }

    async function renderTracksList() {
        const listContainer = document.getElementById('bg-music-tracks-list');
        if (!listContainer) return;

        const allTracks = await getAllAvailableTracks();
        const activeId = getActiveTrackId();

        listContainer.innerHTML = '';

        allTracks.forEach(track => {
            const isSelected = (track.id === activeId);
            const isSys = !!track.isSystem;

            const item = document.createElement('div');
            item.className = 'bg-track-item' + (isSelected ? ' active' : '');
            item.dataset.id = track.id;

            item.innerHTML = `
                <div class="bg-track-left">
                    <label class="bg-track-radio-label" title="Seleccionar esta pista">
                        <input type="radio" name="active-bg-track" value="${track.id}" ${isSelected ? 'checked' : ''}>
                        <span class="bg-track-radio-custom"></span>
                    </label>
                    <div class="bg-track-info">
                        <div class="bg-track-name-row">
                            <span class="bg-track-name">${escapeHtml(track.name)}</span>
                            ${isSys ? '<span class="bg-system-pill">Predeterminada</span>' : '<span class="bg-user-pill">Personalizada</span>'}
                        </div>
                        <span class="bg-track-filename">${escapeHtml(track.fileName || '')}</span>
                    </div>
                </div>
                <div class="bg-track-actions">
                    <button type="button" class="btn-preview-bg-track" data-id="${track.id}" title="Escuchar muestra">
                        ${(previewingTrackId === track.id) ? '⏸ Pausar' : '▶ Escuchar'}
                    </button>
                    ${!isSys ? `<button type="button" class="btn-delete-bg-track" data-id="${track.id}" title="Eliminar de mi lista">🗑️</button>` : ''}
                </div>
            `;

            // Radio change: seleccionar pista activa
            const radio = item.querySelector('input[type="radio"]');
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    setActiveTrackId(track.id);
                    renderTracksList();
                    if (typeof showRosaryToast === 'function') {
                        showRosaryToast(`🎵 Música de fondo seleccionada: <strong>${escapeHtml(track.name)}</strong>`);
                    }
                }
            });

            // Preview button
            const btnPreview = item.querySelector('.btn-preview-bg-track');
            btnPreview.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePreviewTrack(track);
            });

            // Delete button
            const btnDel = item.querySelector('.btn-delete-bg-track');
            if (btnDel) {
                btnDel.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (confirm(`¿Deseas eliminar la pista "${track.name}"?`)) {
                        if (previewingTrackId === track.id && previewAudioElem) {
                            previewAudioElem.pause();
                            previewingTrackId = null;
                        }
                        await deleteUserTrack(track.id);
                        if (getActiveTrackId() === track.id) {
                            setActiveTrackId(DEFAULT_SYSTEM_TRACK.id);
                        }
                        await renderTracksList();
                        if (typeof showRosaryToast === 'function') {
                            showRosaryToast(`🗑️ Pista eliminada.`);
                        }
                    }
                });
            }

            listContainer.appendChild(item);
        });
    }

    async function togglePreviewTrack(track) {
        if (!previewAudioElem) {
            previewAudioElem = new Audio();
        }

        if (previewingTrackId === track.id && !previewAudioElem.paused) {
            previewAudioElem.pause();
            previewingTrackId = null;
            renderTracksList();
            return;
        }

        const url = await getTrackUrl(track);
        if (!url) return;

        previewAudioElem.src = url;
        previewAudioElem.volume = getVolume();
        previewingTrackId = track.id;

        previewAudioElem.onended = () => {
            previewingTrackId = null;
            renderTracksList();
        };

        try {
            await previewAudioElem.play();
            renderTracksList();
        } catch (e) {
            console.warn('Error previewing track:', e);
            previewingTrackId = null;
            renderTracksList();
        }
    }

    function stopPreview() {
        if (previewAudioElem && !previewAudioElem.paused) {
            previewAudioElem.pause();
        }
        previewingTrackId = null;
    }

    function setupDOMEvents() {
        bgAudioElem = document.getElementById('bg-music-player');
        if (bgAudioElem) {
            bgAudioElem.loop = true;
            bgAudioElem.volume = getVolume();
            // Asegurar que la pista se repita en bucle hasta que termine el último audio del rosario
            bgAudioElem.addEventListener('ended', () => {
                if (isEnabled() && !bgAudioElem.paused) {
                    bgAudioElem.currentTime = 0;
                    bgAudioElem.play().catch(e => console.warn('[BgMusic] Error en loop:', e));
                }
            });
            syncActiveTrackSource();
        }

        // Botón principal "Música de fondo"
        const btnMainBg = document.getElementById('btn-bg-music');
        const modal = document.getElementById('bg-music-modal');
        const btnClose = document.getElementById('bg-music-modal-close');
        const btnDone = document.getElementById('btn-bg-music-done');
        const btnFloatingBg = document.getElementById('floating-btn-bg-music');
        const btnMiniBg = document.getElementById('mini-btn-bg-music');

        const openModal = async () => {
            if (modal) {
                modal.classList.add('open');
                await renderTracksList();
            }
        };

        const closeModal = () => {
            if (modal) modal.classList.remove('open');
            stopPreview();
        };

        if (btnMainBg) btnMainBg.addEventListener('click', openModal);
        if (btnFloatingBg) btnFloatingBg.addEventListener('click', openModal);
        if (btnMiniBg) btnMiniBg.addEventListener('click', openModal);
        if (btnClose) btnClose.addEventListener('click', closeModal);
        if (btnDone) btnDone.addEventListener('click', closeModal);

        // Control deslizante de volumen en el reproductor inferior
        const sliderMain = document.getElementById('bg-music-vol-slider');
        if (sliderMain) {
            sliderMain.value = getVolume();
            sliderMain.addEventListener('input', (e) => {
                setVolume(parseFloat(e.target.value));
            });
        }

        // Control deslizante de volumen en el modal
        const sliderModal = document.getElementById('bg-music-modal-vol-slider');
        if (sliderModal) {
            sliderModal.value = getVolume();
            sliderModal.addEventListener('input', (e) => {
                setVolume(parseFloat(e.target.value));
                if (previewAudioElem && !previewAudioElem.paused) {
                    previewAudioElem.volume = parseFloat(e.target.value);
                }
            });
        }

        // Switch maestro de activación
        const toggleEnable = document.getElementById('bg-music-enable-toggle');
        if (toggleEnable) {
            toggleEnable.checked = isEnabled();
            toggleEnable.addEventListener('change', (e) => {
                setEnabled(e.target.checked);
                if (typeof showRosaryToast === 'function') {
                    showRosaryToast(e.target.checked
                        ? '🎵 Música de fondo activada para el rezo.'
                        : '🔇 Música de fondo silenciada.');
                }
            });
        }

        // Dropzone de subida de archivos
        const dropzone = document.getElementById('bg-music-dropzone');
        const fileInput = document.getElementById('bg-music-file-input');
        const btnBrowse = document.getElementById('btn-browse-bg-music');

        if (btnBrowse && fileInput) {
            btnBrowse.addEventListener('click', () => fileInput.click());
        }

        if (dropzone && fileInput) {
            dropzone.addEventListener('click', (e) => {
                if (e.target !== btnBrowse) fileInput.click();
            });

            fileInput.addEventListener('change', async () => {
                if (fileInput.files && fileInput.files.length > 0) {
                    await handleUploadedBgFiles(fileInput.files);
                    fileInput.value = '';
                }
            });

            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });

            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('dragover');
            });

            dropzone.addEventListener('drop', async (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer && e.dataTransfer.files) {
                    await handleUploadedBgFiles(e.dataTransfer.files);
                }
            });
        }

        updateVolumeSlidersUI(getVolume());
    }

    async function handleUploadedBgFiles(files) {
        let addedCount = 0;
        let lastAddedId = null;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
                try {
                    const saved = await saveUserTrack(file);
                    addedCount++;
                    lastAddedId = saved.id;
                } catch (e) {
                    console.error('Error al guardar pista de fondo:', e);
                }
            }
        }

        if (addedCount > 0) {
            if (lastAddedId) {
                setActiveTrackId(lastAddedId);
            }
            await renderTracksList();
            if (typeof showRosaryToast === 'function') {
                showRosaryToast(`🎉 ¡${addedCount} pista(s) de música de fondo agregada(s) y seleccionada(s)!`);
            }
        } else {
            if (typeof showRosaryToast === 'function') {
                showRosaryToast('⚠️ Por favor selecciona archivos de audio válidos (.mp3, .wav).');
            }
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Inicialización al cargar el documento
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupDOMEvents);
    } else {
        setupDOMEvents();
    }

    return {
        SYSTEM_TRACK,
        isEnabled,
        setEnabled,
        getVolume,
        setVolume,
        getActiveTrackId,
        setActiveTrackId,
        getActiveTrackObject,
        getAllAvailableTracks,
        startPlaybackWithPreRoll,
        pausePlayback,
        resumePlayback,
        finishRosaryWithPostRoll,
        clearTimers,
        syncActiveTrackSource,
        renderTracksList
    };
})();

window.RosaryBgMusic = RosaryBgMusic;
