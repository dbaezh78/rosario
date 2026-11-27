// =============================================================================
// SANTO ROSARIO INTERACTIVO - CONTROLADOR PRINCIPAL
// =============================================================================

// 1. DEFINICIÓN DE COORDENADAS DE TODAS LAS CUENTAS (Sistema 305x609)
// Orden de los misterios: Inician por la DERECHA y terminan por la IZQUIERDA
const ROSARY_BEADS = [
    // --- COLGANTE INICIAL ---
    { id: "crucifix", x: 157, y: 568, r: 12, type: "cross", label: "Crucifijo: Señal de la Cruz y Credo" },
    { id: "intro_pn", x: 157, y: 525, r: 8, type: "large", label: "Padre Nuestro (Intenciones del Papa)" },
    { id: "intro_am_1", x: 157, y: 500, r: 6, type: "small", label: "1ª Ave María (Fe)" },
    { id: "intro_am_2", x: 157, y: 486, r: 6, type: "small", label: "2ª Ave María (Esperanza)" },
    { id: "intro_am_3", x: 157, y: 471, r: 6, type: "small", label: "3ª Ave María (Caridad)" },
    { id: "intro_gloria", x: 157, y: 448, r: 8, type: "large", label: "Gloria al Padre y Jaculatoria" },
    { id: "medal", x: 157, y: 415, r: 12, type: "medal", label: "Medalla de la Virgen María" },

    // --- DECENA 1 (Inicia por la DERECHA, de abajo hacia arriba) ---
    { id: "d1_am_1", x: 195, y: 401, r: 6, type: "small", decade: 1, num: 1, label: "1er Misterio - 1ª Ave María" },
    { id: "d1_am_2", x: 206, y: 390, r: 6, type: "small", decade: 1, num: 2, label: "1er Misterio - 2ª Ave María" },
    { id: "d1_am_3", x: 216, y: 379, r: 6, type: "small", decade: 1, num: 3, label: "1er Misterio - 3ª Ave María" },
    { id: "d1_am_4", x: 224, y: 366, r: 6, type: "small", decade: 1, num: 4, label: "1er Misterio - 4ª Ave María" },
    { id: "d1_am_5", x: 231, y: 353, r: 6, type: "small", decade: 1, num: 5, label: "1er Misterio - 5ª Ave María" },
    { id: "d1_am_6", x: 239, y: 339, r: 6, type: "small", decade: 1, num: 6, label: "1er Misterio - 6ª Ave María" },
    { id: "d1_am_7", x: 245, y: 326, r: 6, type: "small", decade: 1, num: 7, label: "1er Misterio - 7ª Ave María" },
    { id: "d1_am_8", x: 251, y: 311, r: 6, type: "small", decade: 1, num: 8, label: "1er Misterio - 8ª Ave María" },
    { id: "d1_am_9", x: 256, y: 297, r: 6, type: "small", decade: 1, num: 9, label: "1er Misterio - 9ª Ave María" },
    { id: "d1_am_10", x: 261, y: 282, r: 6, type: "small", decade: 1, num: 10, label: "1er Misterio - 10ª Ave María" },
    { id: "d1_gl", x: 268, y: 252, r: 8, type: "large", decade: 1, label: "1er Misterio - Gloria / 2º Misterio - Padre Nuestro" },

    // --- DECENA 2 (DERECHA media, subiendo hacia el arco) ---
    { id: "d2_am_1", x: 275, y: 224, r: 6, type: "small", decade: 2, num: 1, label: "2º Misterio - 1ª Ave María" },
    { id: "d2_am_2", x: 279, y: 209, r: 6, type: "small", decade: 2, num: 2, label: "2º Misterio - 2ª Ave María" },
    { id: "d2_am_3", x: 281, y: 194, r: 6, type: "small", decade: 2, num: 3, label: "2º Misterio - 3ª Ave María" },
    { id: "d2_am_4", x: 283, y: 178, r: 6, type: "small", decade: 2, num: 4, label: "2º Misterio - 4ª Ave María" },
    { id: "d2_am_5", x: 285, y: 163, r: 6, type: "small", decade: 2, num: 5, label: "2º Misterio - 5ª Ave María" },
    { id: "d2_am_6", x: 285, y: 148, r: 6, type: "small", decade: 2, num: 6, label: "2º Misterio - 6ª Ave María" },
    { id: "d2_am_7", x: 283, y: 132, r: 6, type: "small", decade: 2, num: 7, label: "2º Misterio - 7ª Ave María" },
    { id: "d2_am_8", x: 278, y: 117, r: 6, type: "small", decade: 2, num: 8, label: "2º Misterio - 8ª Ave María" },
    { id: "d2_am_9", x: 272, y: 103, r: 6, type: "small", decade: 2, num: 9, label: "2º Misterio - 9ª Ave María" },
    { id: "d2_am_10", x: 264, y: 90, r: 6, type: "small", decade: 2, num: 10, label: "2º Misterio - 10ª Ave María" },
    { id: "d2_gl", x: 245, y: 66, r: 8, type: "large", decade: 2, label: "2º Misterio - Gloria / 3er Misterio - Padre Nuestro" },

    // --- DECENA 3 (Arco superior, cruzando de DERECHA a IZQUIERDA) ---
    { id: "d3_am_1", x: 221, y: 49, r: 6, type: "small", decade: 3, num: 1, label: "3er Misterio - 1ª Ave María" },
    { id: "d3_am_2", x: 208, y: 44, r: 6, type: "small", decade: 3, num: 2, label: "3er Misterio - 2ª Ave María" },
    { id: "d3_am_3", x: 194, y: 38, r: 6, type: "small", decade: 3, num: 3, label: "3er Misterio - 3ª Ave María" },
    { id: "d3_am_4", x: 180, y: 35, r: 6, type: "small", decade: 3, num: 4, label: "3er Misterio - 4ª Ave María" },
    { id: "d3_am_5", x: 165, y: 33, r: 6, type: "small", decade: 3, num: 5, label: "3er Misterio - 5ª Ave María" },
    { id: "d3_am_6", x: 148, y: 33, r: 6, type: "small", decade: 3, num: 6, label: "3er Misterio - 6ª Ave María" },
    { id: "d3_am_7", x: 133, y: 35, r: 6, type: "small", decade: 3, num: 7, label: "3er Misterio - 7ª Ave María" },
    { id: "d3_am_8", x: 119, y: 38, r: 6, type: "small", decade: 3, num: 8, label: "3er Misterio - 8ª Ave María" },
    { id: "d3_am_9", x: 105, y: 44, r: 6, type: "small", decade: 3, num: 9, label: "3er Misterio - 9ª Ave María" },
    { id: "d3_am_10", x: 92, y: 50, r: 6, type: "small", decade: 3, num: 10, label: "3er Misterio - 10ª Ave María" },
    { id: "d3_gl", x: 68, y: 66, r: 8, type: "large", decade: 3, label: "3er Misterio - Gloria / 4º Misterio - Padre Nuestro" },

    // --- DECENA 4 (IZQUIERDA media, bajando) ---
    { id: "d4_am_1", x: 49, y: 90, r: 6, type: "small", decade: 4, num: 1, label: "4º Misterio - 1ª Ave María" },
    { id: "d4_am_2", x: 40, y: 103, r: 6, type: "small", decade: 4, num: 2, label: "4º Misterio - 2ª Ave María" },
    { id: "d4_am_3", x: 34, y: 117, r: 6, type: "small", decade: 4, num: 3, label: "4º Misterio - 3ª Ave María" },
    { id: "d4_am_4", x: 30, y: 132, r: 6, type: "small", decade: 4, num: 4, label: "4º Misterio - 4ª Ave María" },
    { id: "d4_am_5", x: 28, y: 148, r: 6, type: "small", decade: 4, num: 5, label: "4º Misterio - 5ª Ave María" },
    { id: "d4_am_6", x: 28, y: 163, r: 6, type: "small", decade: 4, num: 6, label: "4º Misterio - 6ª Ave María" },
    { id: "d4_am_7", x: 29, y: 178, r: 6, type: "small", decade: 4, num: 7, label: "4º Misterio - 7ª Ave María" },
    { id: "d4_am_8", x: 31, y: 194, r: 6, type: "small", decade: 4, num: 8, label: "4º Misterio - 8ª Ave María" },
    { id: "d4_am_9", x: 34, y: 209, r: 6, type: "small", decade: 4, num: 9, label: "4º Misterio - 9ª Ave María" },
    { id: "d4_am_10", x: 37, y: 224, r: 6, type: "small", decade: 4, num: 10, label: "4º Misterio - 10ª Ave María" },
    { id: "d4_gl", x: 45, y: 253, r: 8, type: "large", decade: 4, label: "4º Misterio - Gloria / 5º Misterio - Padre Nuestro" },

    // --- DECENA 5 (Termina por la IZQUIERDA inferior, bajando hacia la medalla) ---
    { id: "d5_am_1", x: 52, y: 282, r: 6, type: "small", decade: 5, num: 1, label: "5º Misterio - 1ª Ave María" },
    { id: "d5_am_2", x: 57, y: 297, r: 6, type: "small", decade: 5, num: 2, label: "5º Misterio - 2ª Ave María" },
    { id: "d5_am_3", x: 62, y: 312, r: 6, type: "small", decade: 5, num: 3, label: "5º Misterio - 3ª Ave María" },
    { id: "d5_am_4", x: 68, y: 326, r: 6, type: "small", decade: 5, num: 4, label: "5º Misterio - 4ª Ave María" },
    { id: "d5_am_5", x: 74, y: 340, r: 6, type: "small", decade: 5, num: 5, label: "5º Misterio - 5ª Ave María" },
    { id: "d5_am_6", x: 82, y: 353, r: 6, type: "small", decade: 5, num: 6, label: "5º Misterio - 6ª Ave María" },
    { id: "d5_am_7", x: 89, y: 366, r: 6, type: "small", decade: 5, num: 7, label: "5º Misterio - 7ª Ave María" },
    { id: "d5_am_8", x: 97, y: 379, r: 6, type: "small", decade: 5, num: 8, label: "5º Misterio - 8ª Ave María" },
    { id: "d5_am_9", x: 107, y: 390, r: 6, type: "small", decade: 5, num: 9, label: "5º Misterio - 9ª Ave María" },
    { id: "d5_am_10", x: 118, y: 401, r: 6, type: "small", decade: 5, num: 10, label: "5º Misterio - 10ª Ave María" }
];

// 2. REFERENCIAS AL DOM
const audioPlayer = document.getElementById('audio-player');
const langSelect = document.getElementById('language-select');
const rosarySvg = document.getElementById('rosary-svg');
const mysteryPills = document.querySelectorAll('.mystery-pill');
const decadeDots = document.querySelectorAll('.decade-dot');
const currentDayBadge = document.getElementById('today-badge');

// Elementos de la tarjeta de oración
const prayerTitleElem = document.getElementById('prayer-title');
const prayerSubtitleElem = document.getElementById('prayer-subtitle');
const prayerBodyElem = document.getElementById('prayer-body');
const prayerScrollArea = document.querySelector('.prayer-text-scroll-area');
const beadCounterText = document.getElementById('bead-counter-text');
const beadMiniDotsContainer = document.getElementById('bead-mini-dots');
const beadCurrentHover = document.getElementById('bead-current-hover');

// Elementos del banner del misterio
const mysteryBannerCard = document.getElementById('mystery-banner-card');
const mysteryBannerThumb = document.getElementById('mystery-banner-thumb');
const mysteryBannerTag = document.getElementById('mystery-banner-tag');
const mysteryBannerTitle = document.getElementById('mystery-banner-title');
const mysteryBannerSub = document.getElementById('mystery-banner-sub');

// Elementos del reproductor principal (en pestaña de Oración y en Desktop)
const btnPlayPause = document.getElementById('btn-play-pause');
const seekSlider = document.getElementById('seek-slider');
const currentTimeDisplay = document.getElementById('current-time-display');
const totalTimeDisplay = document.getElementById('total-time-display');
const btnPrevBead = document.getElementById('btn-prev-bead');
const btnNextBead = document.getElementById('btn-next-bead');
const btnSkipBack = document.getElementById('btn-skip-back');
const btnSkipForward = document.getElementById('btn-skip-forward');
const speedSelect = document.getElementById('speed-select');
const btnFullscreen = document.getElementById('btn-fullscreen');

// Elementos del Mini-Reproductor Ligero (en la vista de Rosario)
const miniBtnPlayPause = document.getElementById('mini-btn-play-pause');
const miniBtnPrev = document.getElementById('mini-btn-prev');
const miniBtnNext = document.getElementById('mini-btn-next');
const miniSeekSlider = document.getElementById('mini-seek-slider');
const miniTimeDisplay = document.getElementById('mini-time-display');
const miniPrayerTitle = document.getElementById('mini-prayer-title');
const miniSpeedSelect = document.getElementById('mini-speed-select');

// Controles de tamaño de fuente
const btnFontMinus = document.getElementById('btn-font-minus');
const btnFontPlus = document.getElementById('btn-font-plus');

// Modal de imagen
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');

// Pestañas móviles
const mobileTabRosary = document.getElementById('mobile-tab-rosary');
const mobileTabPrayer = document.getElementById('mobile-tab-prayer');
const rosaryColumn = document.getElementById('rosary-column');
const prayerColumn = document.getElementById('prayer-column');

// Elementos del Sincronizador de Tiempos
const btnOpenSync = document.getElementById('btn-open-sync');
const syncModal = document.getElementById('sync-modal');
const syncModalClose = document.getElementById('sync-modal-close');
const syncLangSelect = document.getElementById('sync-lang-select');
const syncMysterySelect = document.getElementById('sync-mystery-select');
const syncBtnPlayPause = document.getElementById('sync-btn-play-pause');
const syncBtnBack5 = document.getElementById('sync-btn-back-5');
const syncBtnBack1 = document.getElementById('sync-btn-back-1');
const syncBtnFwd1 = document.getElementById('sync-btn-fwd-1');
const syncBtnFwd5 = document.getElementById('sync-btn-fwd-5');
const syncTimeCur = document.getElementById('sync-time-cur');
const syncTimeDur = document.getElementById('sync-time-dur');
const syncAudioSlider = document.getElementById('sync-audio-slider');
const syncListContainer = document.getElementById('sync-list-container');
const syncStatusMsg = document.getElementById('sync-status-msg');
const btnSyncReset = document.getElementById('btn-sync-reset');
const btnSyncCopy = document.getElementById('btn-sync-copy');
const btnSyncExport = document.getElementById('btn-sync-export');
const btnSyncImport = document.getElementById('btn-sync-import');
const syncFileInput = document.getElementById('sync-file-input');
const btnSyncSave = document.getElementById('btn-sync-save');
const syncNavPills = document.querySelectorAll('.sync-nav-pill');
// Elementos del Modo de Sincronización y Almacén de Audios
const syncModeSegmentedBtn = document.getElementById('sync-mode-segmented-btn');
const syncModeTimeBtn = document.getElementById('sync-mode-time-btn');
const btnOpenAudioStore = document.getElementById('btn-open-audio-store');
const btnSyncAutoAssign = document.getElementById('btn-sync-auto-assign');
const btnSyncDownloadFull = document.getElementById('btn-sync-download-full');
const btnSyncDownloadFullFooter = document.getElementById('btn-sync-download-full-footer');
const syncStoreCountBadge = document.getElementById('sync-store-count-badge');
const syncTipBox = document.getElementById('sync-tip-box');

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
const audioControlsPanel = document.querySelector('.audio-controls-panel');

// Modal Almacén de Audios
const audioStoreModal = document.getElementById('audio-store-modal');
const audioStoreModalClose = document.getElementById('audio-store-modal-close');
const audioStoreDropzone = document.getElementById('audio-store-dropzone');
const audioStoreFileInput = document.getElementById('audio-store-file-input');
const audioStoreList = document.getElementById('audio-store-list');
const storeStatsText = document.getElementById('store-stats-text');
const btnStoreAutoAssign = document.getElementById('btn-store-auto-assign');
const btnStoreClearAll = document.getElementById('btn-store-clear-all');
const btnAudioStoreDone = document.getElementById('btn-audio-store-done');
const audioStoreStatusMsg = document.getElementById('audio-store-status-msg');

// Estado del Modo de Audio y Reproductor Segmentado (Segmentado como predeterminado oficial)
let activeSyncAudioMode = 'segmented';
try {
    const savedMode = localStorage.getItem('rosary_sync_mode');
    if (savedMode === 'time') {
        activeSyncAudioMode = 'time';
    } else {
        localStorage.setItem('rosary_sync_mode', 'segmented');
    }
} catch (e) {
    activeSyncAudioMode = 'segmented';
}
let isPlayingSegmentedRosary = false;
let currentPreviewAudio = null;
let previewingAudioKey = null;
let previewingStoreAudioId = null;


// 3. ESTADO GLOBAL
let currentMystery = 'Gozosos';
let currentSteps = [];
let currentStepIndex = -1;
let currentFontSize = parseFloat(localStorage.getItem('rosary_prayer_font_size')) || 1.18;
try {
    document.documentElement.style.setProperty('--prayer-font-size', `${currentFontSize}rem`);
} catch (e) {}
let isSeeking = false;
let isSyncSeeking = false;

// 4. FUNCIÓN PARA DETERMINAR EL MISTERIO DEL DÍA
function getMysteryByDay() {
    const days = ['Gloriosos', 'Gozosos', 'Dolorosos', 'Gloriosos', 'Luminosos', 'Dolorosos', 'Gozosos'];
    const today = new Date().getDay(); // 0: Domingo, 1: Lunes...
    return days[today];
}

// 5. CONSTRUCCIÓN DEL SVG INTERACTIVO DEL ROSARIO
function buildRosarySvg() {
    if (!rosarySvg) return;

    let svgHtml = `
        <image id="rosary-img-base" href="src/img/rosario_virgen_gold.png" xlink:href="src/img/rosario_virgen_gold.png" x="0" y="0" width="305" height="609" />
        <image id="rosary-img-gloria" class="rosary-img-gloria" href="src/img/rosario_virgen_gold_gloria.png" xlink:href="src/img/rosario_virgen_gold_gloria.png" x="0" y="0" width="305" height="609" />
        <g id="beads-group">
    `;

    ROSARY_BEADS.forEach(bead => {
        const isCross = bead.type === 'cross';
        const isMedal = bead.type === 'medal';
        const isLarge = bead.type === 'large';
        const radius = bead.r || (isLarge ? 8 : 6);

        if (isMedal) {
            // MEDALLA: Siempre transparente en el centro (fill: none) para dejar visible el dibujo
            // Se ilumina solo alrededor de su contorno
            svgHtml += `
                <g class="bead bead-medal" id="bead-${bead.id}" data-id="${bead.id}" data-label="${bead.label}">
                    <ellipse class="bead-touch-target" cx="${bead.x}" cy="${bead.y}" rx="15" ry="20" />
                    <ellipse class="medal-rim" cx="${bead.x}" cy="${bead.y}" rx="12" ry="16" />
                    <ellipse class="medal-border" cx="${bead.x}" cy="${bead.y}" rx="10" ry="14" />
                </g>
            `;
        } else if (isCross) {
            // CRUCIFIJO
            svgHtml += `
                <g class="bead" id="bead-${bead.id}" data-id="${bead.id}" data-label="${bead.label}">
                    <circle class="bead-touch-target" cx="${bead.x}" cy="${bead.y}" r="22" />
                    <path class="cross-path bead-circle" d="M ${bead.x - 3} ${bead.y - 18} h 6 v 7 h 8 v 5 h -8 v 18 h -6 v -18 h -8 v -5 h 8 z" />
                </g>
            `;
        } else {
            // CUENTAS NORMALES (ESTÁTICAS en su posición exacta, sin traslación)
            svgHtml += `
                <g class="bead" id="bead-${bead.id}" data-id="${bead.id}" data-label="${bead.label}">
                    <circle class="bead-touch-target" cx="${bead.x}" cy="${bead.y}" r="${radius + 7}" />
                    <circle class="bead-circle ${isLarge ? 'large-bead' : ''}" cx="${bead.x}" cy="${bead.y}" r="${radius}" />
                </g>
            `;
        }
    });

    svgHtml += `</g>`;
    rosarySvg.innerHTML = svgHtml;

    // Asignar eventos de clic y hover a cada cuenta
    document.querySelectorAll('.bead').forEach(el => {
        const beadId = el.getAttribute('data-id');
        const label = el.getAttribute('data-label');

        el.addEventListener('click', () => {
            seekToBead(beadId);
        });

        el.addEventListener('mouseenter', () => {
            if (beadCurrentHover) beadCurrentHover.innerText = label;
        });

        el.addEventListener('mouseleave', () => {
            if (beadCurrentHover) {
                const activeStep = currentSteps[currentStepIndex];
                beadCurrentHover.innerText = activeStep ? activeStep.subtitle : 'Toca cualquier cuenta';
            }
        });
    });
}

// =============================================================================
// GESTOR DE VERSIONES DE AUDIO (V1 vs V2 / Original)
// =============================================================================

const AUDIO_VERSION_KEY = 'rosary_audio_version';
const DOLOROSOS_VERSION_KEY = 'rosary_dolorosos_version';
// Por defecto siempre 'v1' según requerimiento ("pongas la version Dolorososv1.mp3 por defecto")
let audioVersion = (typeof localStorage !== 'undefined' && (localStorage.getItem(AUDIO_VERSION_KEY) || localStorage.getItem(DOLOROSOS_VERSION_KEY))) || 'v1';

const btnBrandCross = document.getElementById('btn-brand-cross');
const btnVersionSwitch = document.getElementById('btn-version-switch');

function getActiveMysterySrc(mysteryKey, lang = 'es') {
    if (lang === 'es') {
        return (audioVersion === 'v1')
            ? `src/mp3/es/${mysteryKey}v1.mp3`
            : `src/mp3/es/${mysteryKey}.mp3`;
    }
    return (audioData[lang] && audioData[lang][mysteryKey]) ? audioData[lang][mysteryKey].src : '';
}

function updateAudioVersionUI() {
    const isV1 = (audioVersion === 'v1');
    
    // 1. Actualizar color de la Cruz: Amarilla (V1) vs Roja (V2)
    if (btnBrandCross) {
        btnBrandCross.classList.toggle('version-v1', isV1);
        btnBrandCross.classList.toggle('version-v2', !isV1);
        btnBrandCross.title = isV1
            ? "Cruz Amarilla (V1 activa) — Clic para cambiar a Cruz Roja (V2)"
            : "Cruz Roja (V2 activa) — Clic para volver a Cruz Amarilla (V1)";
    }

    // 2. Actualizar Switch visual (V1 / V2)
    if (btnVersionSwitch) {
        btnVersionSwitch.classList.toggle('is-v1', isV1);
        btnVersionSwitch.classList.toggle('is-v2', !isV1);
        btnVersionSwitch.title = isV1
            ? "Switch en V1 — Clic para alternar a V2"
            : "Switch en V2 — Clic para alternar a V1";
    }

    // 3. Sincronizar selector de versión del modal de sincronizador
    if (syncVersionSelect) {
        syncVersionSelect.value = isV1 ? 'v1' : 'original';
    }
}

function showVersionToast(msg) {
    let toast = document.getElementById('rosary-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'rosary-toast';
        toast.className = 'rosary-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}
const showRosaryToast = showVersionToast;

function toggleAudioVersion() {
    audioVersion = (audioVersion === 'v1') ? 'original' : 'v1';
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

    // Aplicar cambio en vivo al reproductor
    const wasPlaying = !audioPlayer.paused;
    if (activeSyncAudioMode !== 'segmented') {
        audioPlayer.src = newSrc;
        audioPlayer.load();
    }

    if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][currentMystery]) {
        currentSteps = generateDetailedTimeline(currentMystery, audioData[lang][currentMystery], lang);
        if (activeSyncAudioMode !== 'segmented') {
            currentStepIndex = 0;
            updateUIForStep(0);
            if (currentSteps[0]) {
                updateBeadHighlights(currentSteps[0].beadId);
            }
        } else {
            if (currentStepIndex >= currentSteps.length) currentStepIndex = 0;
            updateUIForStep(currentStepIndex);
            if (currentSteps[currentStepIndex]) {
                updateBeadHighlights(currentSteps[currentStepIndex].beadId);
            }
        }
    }

    if (wasPlaying) {
        if (activeSyncAudioMode === 'segmented') {
            playSegmentedRosary(currentStepIndex >= 0 ? currentStepIndex : 0);
        } else {
            audioPlayer.play().catch(() => {});
            updatePlayPauseButton(true);
        }
    } else {
        updatePlayPauseButton(false);
    }

    // Si el sincronizador de tiempos está abierto
    if (syncModal && syncModal.classList.contains('open')) {
        renderSyncItems(syncLangSelect ? syncLangSelect.value : 'es', syncMysterySelect ? syncMysterySelect.value : currentMystery);
    }

    const currentFile = (audioVersion === 'v1') ? `${currentMystery}v1.mp3` : `${currentMystery}.mp3`;
    const toastMsg = (audioVersion === 'v1')
        ? `🟡 <strong>Cruz Amarilla · Versión 1</strong> (${currentFile}) activada`
        : `🔴 <strong>Cruz Roja · Versión 2</strong> (${currentFile} original) activada`;
    showVersionToast(toastMsg);
}

if (btnBrandCross) {
    btnBrandCross.addEventListener('click', toggleAudioVersion);
}
if (btnVersionSwitch) {
    btnVersionSwitch.addEventListener('click', toggleAudioVersion);
}

// 6. INICIALIZAR Y CARGAR MISTERIO
function loadMystery(mysteryKey) {
    currentMystery = mysteryKey;
    const lang = langSelect.value || 'es';

    // Actualizar botones de misterios
    mysteryPills.forEach(pill => {
        pill.classList.toggle('active', pill.dataset.mystery === mysteryKey);
    });

    // Cargar datos del audio y generar pasos
    if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][mysteryKey]) {
        if (lang === 'es') {
            audioData[lang][mysteryKey].src = getActiveMysterySrc(mysteryKey, lang);
        }
        const mData = audioData[lang][mysteryKey];
        currentSteps = generateDetailedTimeline(mysteryKey, mData, lang);

        if (activeSyncAudioMode === 'segmented') {
            audioPlayer.src = 'src/mp3/Segm/señaldelaCruz.mp3';
            audioPlayer.load();
        } else {
            audioPlayer.src = mData.src;
            audioPlayer.load();
        }
        if (speedSelect) {
            audioPlayer.playbackRate = parseFloat(speedSelect.value) || 1.0;
        }

        // Reiniciar al primer paso
        currentStepIndex = 0;
        updateUIForStep(0);
        updateBeadHighlights(currentSteps[0].beadId);

        // Actualizar miniaturas iniciales
        if (mData.timeline && mData.timeline[0]) {
            mysteryBannerThumb.src = mData.timeline[0].img;
            modalImage.src = mData.timeline[0].img;
        }
    }

    // Actualizar nombre del misterio del día
    const todayMystery = getMysteryByDay();
    const isToday = (mysteryKey === todayMystery);
    const dayPrefixElem = document.getElementById('day-prefix');
    const mysteryNameElem = document.getElementById('mystery-name-txt');

    if (dayPrefixElem) {
        dayPrefixElem.innerText = isToday ? 'Hoy: ' : '';
    }
    if (mysteryNameElem) {
        mysteryNameElem.innerText = mysteryKey;
    } else if (currentDayBadge) {
        currentDayBadge.innerText = isToday ? `Hoy: ${mysteryKey}` : mysteryKey;
    }

    if (currentDayBadge) {
        currentDayBadge.title = isToday
            ? `Hoy corresponden los Misterios ${mysteryKey} — Clic para cambiar`
            : `Misterios ${mysteryKey} (Hoy: ${todayMystery}) — Clic para cambiar`;
    }

    // Actualizar elemento activo en el menú desplegable de misterios
    document.querySelectorAll('.mystery-dropdown-item').forEach(item => {
        const itemM = item.getAttribute('data-mystery');
        item.classList.toggle('active', itemM === mysteryKey);
    });
}

// 7. ACTUALIZACIÓN DE UI SEGÚN EL PASO ACTUAL
function updateUIForStep(stepIndex) {
    if (!currentSteps || stepIndex < 0 || stepIndex >= currentSteps.length) return;

    const step = currentSteps[stepIndex];

    // 1. Textos principales de la oración
    prayerTitleElem.innerText = step.title;
    prayerSubtitleElem.innerText = step.subtitle;
    prayerBodyElem.innerText = step.prayerText;

    // Actualizar también en el mini-reproductor de la vista del Rosario
    if (miniPrayerTitle) {
        miniPrayerTitle.innerText = step.title;
    }

    // 2. Indicador de cuentas de la decena (1 a 10)
    if (step.decade >= 1 && step.decade <= 5) {
        if (step.beadNum > 0) {
            beadCounterText.innerText = `Cuenta ${step.beadNum} de 10 — Ave María`;
        } else if (step.type === 'padre_nuestro') {
            beadCounterText.innerText = `Padre Nuestro — Decena ${step.decade}`;
        } else if (step.type === 'gloria') {
            beadCounterText.innerText = `Gloria al Padre — Decena ${step.decade}`;
        } else if (step.type === 'gracia') {
            beadCounterText.innerText = `Petición de Gracia — Decena ${step.decade}`;
        } else {
            beadCounterText.innerText = `Misterio ${step.decade} de 5`;
        }
        renderMiniDots(step.beadNum);
    } else if (step.decade === 0) {
        beadCounterText.innerText = step.title;
        renderMiniDots(0);
    } else {
        beadCounterText.innerText = "Letanías y Conclusión";
        renderMiniDots(0);
    }

    // 3. Banner del misterio e ilustración
    const lang = langSelect.value || 'es';
    const langNames = audioData[lang]?.names?.[currentMystery] || [];
    const decName = (step.decade >= 1 && step.decade <= 5) ? langNames[step.decade - 1] : (step.decade === 6 ? "Letanías Lauretanas" : "Inicio del Rosario");

    mysteryBannerTag.innerText = `${currentMystery} — Decena ${step.decade > 0 && step.decade <= 5 ? step.decade : (step.decade === 6 ? 'Final' : 'Inicial')}`;
    mysteryBannerTitle.innerText = decName || step.title;
    mysteryBannerSub.innerText = step.subtitle;

    if (step.img && mysteryBannerThumb.getAttribute('src') !== step.img) {
        mysteryBannerThumb.src = step.img;
        modalImage.src = step.img;
    }

    // 4. Puntos de progreso de las decenas (7 puntos)
    decadeDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === step.decade);
    });

    // 5. Texto de estado al pie del rosario
    if (beadCurrentHover) {
        beadCurrentHover.innerText = `${step.subtitle}`;
    }

    // 6. Resetear o preparar scroll del área de oración
    if (prayerScrollArea) {
        if (step.key !== 'letanias' && step.type !== 'letanias') {
            prayerScrollArea.scrollTop = 0;
        } else {
            // Si apenas comienzan las letanías, asegurar inicio arriba
            if (audioPlayer.currentTime <= (step.s + 1)) {
                prayerScrollArea.scrollTop = 0;
            }
        }
    }

    // 7. Inclinación reverente de la cabeza de la Virgen durante el Gloria al Padre
    if (isPlayingSegmentedRosary) {
        const isGloria = (step.type === 'gloria' || step.key === 'intro_gloria' || (step.key && step.key.includes('_gl')));
        setVirginBow(isGloria, step.key);
    } else {
        const effectiveTime = (audioPlayer && !isNaN(audioPlayer.currentTime) && audioPlayer.currentTime > 0)
            ? audioPlayer.currentTime
            : (step.s || 0);
        setVirginBow(isGloriaTime(effectiveTime));
    }
}

// =============================================================================
// CONFIGURACIÓN DINÁMICA DE REVERENCIA DE LA VIRGEN (GLORIA AL PADRE)
// =============================================================================
const DEFAULT_VIRGIN_BOW_CONFIG = {
    introStartSec: 8.0,          // Segundo en que baja la cabeza en Señal de la Cruz (1s antes del seg 9)
    introDurationSec: 4.5,       // Tiempo que dura inclinada (sube en 12.5s, medio segundo antes)
    mysteryAnticipationSec: 1.0, // Anticipación en 10ª Ave María (1s antes de empezar el Gloria)
    mysteryDurationSec: 4.5      // Tiempo que dura inclinada en el Gloria (4.5s, medio segundo antes)
};

function getVirginBowConfig() {
    try {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('rosary_virgin_bow_config');
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    introStartSec: (typeof parsed.introStartSec === 'number' && parsed.introStartSec >= 0) ? parsed.introStartSec : DEFAULT_VIRGIN_BOW_CONFIG.introStartSec,
                    introDurationSec: (typeof parsed.introDurationSec === 'number' && parsed.introDurationSec > 0) ? parsed.introDurationSec : DEFAULT_VIRGIN_BOW_CONFIG.introDurationSec,
                    mysteryAnticipationSec: (typeof parsed.mysteryAnticipationSec === 'number' && parsed.mysteryAnticipationSec >= 0) ? parsed.mysteryAnticipationSec : DEFAULT_VIRGIN_BOW_CONFIG.mysteryAnticipationSec,
                    mysteryDurationSec: (typeof parsed.mysteryDurationSec === 'number' && parsed.mysteryDurationSec > 0) ? parsed.mysteryDurationSec : DEFAULT_VIRGIN_BOW_CONFIG.mysteryDurationSec
                };
            }
        }
    } catch (e) {}
    return { ...DEFAULT_VIRGIN_BOW_CONFIG };
}

function saveVirginBowConfig(cfg) {
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('rosary_virgin_bow_config', JSON.stringify(cfg));
        }
    } catch (e) {}
}

// Determina si el segundo actual corresponde a la reverencia del Gloria al Padre:
// Comienza 1 segundo antes de que empiece el Gloria y se mantiene durante la alabanza trinitaria (4.5s)
function isGloriaTime(curTime) {
    if (!currentSteps || currentSteps.length === 0 || isNaN(curTime)) return false;
    const bowCfg = getVirginBowConfig();

    // Inclinación reverente en la Señal de la Cruz inicial (Gloria al Padre de la invocación inicial)
    // El Gloria al Padre se pronuncia cerca del segundo 9; la cabeza baja a los 8.0s y sube medio segundo antes (12.5s)
    const introStep = currentSteps.find(s => s.key === 'crucifix_intro');
    if (introStep) {
        const introStart = (typeof introStep.s === 'number' && !isNaN(introStep.s)) ? introStep.s : 0;
        const bowStart = introStart + bowCfg.introStartSec;
        const bowEnd = bowStart + bowCfg.introDurationSec;
        if (curTime >= bowStart && curTime < bowEnd) {
            return true;
        }
    }

    for (let i = 0; i < currentSteps.length; i++) {
        const step = currentSteps[i];
        if (step.type === 'gloria' || step.key === 'intro_gloria' || (step.key && step.key.includes('gl'))) {
            const gloriaStart = (typeof step.s === 'number' && !isNaN(step.s)) ? step.s : 0;
            const start = Math.max(0, gloriaStart - bowCfg.mysteryAnticipationSec); // 1 segundo antes del Gloria
            const end = gloriaStart + bowCfg.mysteryDurationSec; // 4.5s (sube medio segundo antes)
            if (curTime >= start && curTime < end) {
                return true;
            }
        }
    }
    return false;
}

// Control de inclinación reverente de la Virgen (Gloria al Padre)
// Oculta la imagen base para que solo quede visible la imagen inclinada sin superposiciones
function setVirginBow(shouldBow, targetKey = null) {
    const baseImg = document.getElementById('rosary-img-base');
    const gloriaImg = document.getElementById('rosary-img-gloria');
    if (baseImg) {
        baseImg.classList.toggle('is-bowing', !!shouldBow);
    }
    if (gloriaImg) {
        gloriaImg.classList.toggle('active', !!shouldBow);
    }
    // Si el sincronizador de tiempos está abierto, destacar visualmente la fila de Gloria activa durante la reverencia
    if (syncListContainer) {
        const activeKey = targetKey || (currentSteps && currentSteps[currentStepIndex] ? currentSteps[currentStepIndex].key : null);
        syncListContainer.querySelectorAll('.sync-item-row').forEach(row => {
            const key = row.getAttribute('data-key') || '';
            if (key === 'intro_gloria' || key.includes('_gl')) {
                const isThisGloria = activeKey ? (key === activeKey) : true;
                row.classList.toggle('bowing-active', !!shouldBow && isThisGloria);
            }
        });
    }
}

// 8. RENDERIZADO DE LOS 10 MINI-PUNTOS DE LA DECENA
function renderMiniDots(activeNum) {
    if (!beadMiniDotsContainer) return;
    let html = '';
    for (let i = 1; i <= 10; i++) {
        let cls = 'b-dot';
        if (i < activeNum) cls += ' done';
        else if (i === activeNum) cls += ' active';
        html += `<span class="${cls}"></span>`;
    }
    beadMiniDotsContainer.innerHTML = html;
}

// 9. ILUMINACIÓN DE CUENTAS EN EL SVG
function updateBeadHighlights(activeBeadId) {
    const allBeadNodes = document.querySelectorAll('.bead');
    let passedActive = false;

    allBeadNodes.forEach(beadNode => {
        const beadId = beadNode.getAttribute('data-id');

        if (beadId === activeBeadId) {
            beadNode.classList.add('active');
            beadNode.classList.remove('completed');
            passedActive = true;
        } else {
            beadNode.classList.remove('active');
            // Cuentas previas completadas en la secuencia
            if (!passedActive && currentStepIndex > 0) {
                beadNode.classList.add('completed');
            } else {
                beadNode.classList.remove('completed');
            }
        }
    });
}

// 10. NAVEGACIÓN Y BÚSQUEDA POR CUENTA
function seekToBead(beadId) {
    if (!currentSteps || currentSteps.length === 0) return;

    // Buscar el paso que corresponde a este beadId en la decena actual o más cercana
    let targetStep = currentSteps.find((s, idx) => s.beadId === beadId && idx >= currentStepIndex);
    if (!targetStep) {
        targetStep = currentSteps.find(s => s.beadId === beadId);
    }

    if (targetStep) {
        const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
        const targetIdx = currentSteps.indexOf(targetStep);
        if (activeSyncAudioMode === 'segmented' && hasSegmentedAudiosForMystery(lang, currentMystery) && targetIdx !== -1) {
            playSegmentedRosary(targetIdx);
        } else {
            audioPlayer.currentTime = targetStep.s;
            audioPlayer.play().catch(() => {});
            updatePlayPauseButton(true);
        }
    }
}

// 11. ACTUALIZAR TIEMPO Y SINCRONIZACIÓN DE AMBOS REPRODUCTORES
audioPlayer.addEventListener('timeupdate', () => {
    if (!currentSteps || currentSteps.length === 0) return;

    if (isPlayingSegmentedRosary) {
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
        if (miniTimeDisplay) miniTimeDisplay.innerText = `${formatTime(accumulatedSec)} / ${formatTime(totalSec)}`;
        if (floatingTimeDisplay) floatingTimeDisplay.innerText = `${formatTime(accumulatedSec)} / ${formatTime(totalSec)}`;
        if (miniPrayerTitle && curStep) {
            miniPrayerTitle.innerText = curStep.title;
        }
        if (floatingCurPrayer && curStep) {
            floatingCurPrayer.innerText = curStep.title;
        }

        // Si el sincronizador de tiempos está abierto, actualizar su monitor y slider
        if (syncTimeCur) syncTimeCur.innerText = formatTime(cur, true);
        if (syncTimeDur) syncTimeDur.innerText = formatTime(dur);
        if (syncAudioSlider && !isSyncSeeking) syncAudioSlider.value = overallPct;

        // Inclinación reverente de la cabeza de la Virgen:
        // EXCLUSIVAMENTE 1 segundo antes de decir Gloria al Padre, durante la alabanza ("Gloria al Padre, y al Hijo, y al Espíritu Santo"),
        // y subiendo medio segundo antes según la configuración litúrgica.
        const bowCfg = getVirginBowConfig();
        if (curStep && (curStep.type === 'gloria' || curStep.key === 'intro_gloria' || (curStep.key && curStep.key.includes('_gl')))) {
            // Durante la oración del Gloria al Padre:
            // Sube medio segundo antes según configuración (por defecto 4.5s):
            const isBowing = (cur < bowCfg.mysteryDurationSec);
            setVirginBow(isBowing, curStep.key);
        } else if (curStep && (curStep.key === 'intro_am_3' || (curStep.key && curStep.key.endsWith('_am_10')))) {
            // Anticipación configurable antes de que comience el Gloria al Padre (por defecto 1.0s):
            const is1SecBeforeGloria = (dur > 2 && cur >= (dur - bowCfg.mysteryAnticipationSec));
            setVirginBow(is1SecBeforeGloria, curStep.key);
        } else if (curStep && (curStep.key === 'crucifix_intro' || curStep.type === 'intro_start')) {
            // Señal de la Cruz: Inicia en introStartSec (ej. 8.0s) y dura introDurationSec (ej. 4.5s, subiendo a los 12.5s):
            const bowStart = bowCfg.introStartSec;
            const bowEnd = bowStart + bowCfg.introDurationSec;
            const isGloriaCross = (cur >= bowStart && cur < bowEnd);
            setVirginBow(isGloriaCross, curStep.key);
        } else {
            // En cualquier otro paso (Ave Marías 1-9, Padre Nuestro, meditaciones, etc.), la cabeza permanece erguida
            setVirginBow(false, curStep ? curStep.key : null);
        }
        return;
    }

    const curTime = audioPlayer.currentTime;
    const dur = audioPlayer.duration || currentSteps[currentSteps.length - 1].s + 60;
    const formattedCur = formatTime(curTime);
    const formattedDur = formatTime(dur);

    // Actualizar controles del reproductor principal en modo continuo
    if (!isSeeking && dur > 0) {
        const pct = (curTime / dur) * 100;
        if (seekSlider) seekSlider.value = pct;
        if (miniSeekSlider) miniSeekSlider.value = pct;

        if (currentTimeDisplay) currentTimeDisplay.innerText = formattedCur;
        if (totalTimeDisplay) totalTimeDisplay.innerText = formattedDur;
        if (miniTimeDisplay) miniTimeDisplay.innerText = `${formattedCur} / ${formattedDur}`;

        // Sincronizador de tiempos (con centésimas para precisión total)
        if (syncTimeCur) syncTimeCur.innerText = formatTime(curTime, true);
        if (syncTimeDur) syncTimeDur.innerText = formattedDur;
        if (syncAudioSlider && !isSyncSeeking) syncAudioSlider.value = pct;
    }

    // Buscar el paso activo para este segundo
    let newStepIndex = 0;
    for (let i = 0; i < currentSteps.length; i++) {
        if (curTime >= currentSteps[i].s) {
            newStepIndex = i;
        } else {
            break;
        }
    }

    if (newStepIndex !== currentStepIndex) {
        currentStepIndex = newStepIndex;
        updateUIForStep(currentStepIndex);
        updateBeadHighlights(currentSteps[currentStepIndex].beadId);
    }

    // Inclinación reverente de la cabeza de la Virgen:
    // Comienza exactamente 1 segundo antes del Gloria y se mantiene hasta 1 segundo después del Gloria
    setVirginBow(isGloriaTime(curTime));
});

// 12. CONTROLADORES DE REPRODUCCIÓN (Sincronizados en ambos reproductores)
function updatePlayPauseButton(isPlaying) {
    const symbol = isPlaying ? '⏸' : '▶';
    const titleText = isPlaying ? 'Pausar' : 'Reproducir';

    if (btnPlayPause) {
        btnPlayPause.innerHTML = symbol;
        btnPlayPause.title = titleText;
    }
    if (miniBtnPlayPause) {
        miniBtnPlayPause.innerHTML = symbol;
        miniBtnPlayPause.title = titleText;
    }
    if (syncBtnPlayPause) {
        syncBtnPlayPause.innerHTML = symbol;
        syncBtnPlayPause.title = titleText;
    }
    if (floatingBtnPlay) {
        floatingBtnPlay.innerHTML = symbol;
        floatingBtnPlay.title = titleText;
    }
}


// =============================================================================
// REPRODUCCIÓN SECUENCIAL Y GESTIÓN DE AUDIOS SEGMENTADOS
// =============================================================================

function hasSegmentedAudiosForMystery(lang = 'es', mystery = 'Gozosos') {
    return true; // Siempre activo en modo segmentado con el catálogo oficial y predeterminados
}

async function playSegmentedRosary(stepIndex) {
    if (!currentSteps || currentSteps.length === 0) return;

    // Determinar misterio e idioma activos (sea en el sincronizador o en la vista principal)
    const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
    let mystery = currentMystery || 'Gozosos';
    if (syncModal && syncModal.classList.contains('open') && syncMysterySelect) {
        mystery = syncMysterySelect.value;
    }

    if (currentMystery !== mystery || !currentSteps || currentSteps.length === 0) {
        currentMystery = mystery;
        if (typeof generateDetailedTimeline === 'function' && audioData[lang] && audioData[lang][mystery]) {
            currentSteps = generateDetailedTimeline(mystery, audioData[lang][mystery], lang);
        }
    }

    if (stepIndex >= currentSteps.length) {
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
    }

    if (stepIndex < 0) stepIndex = 0;
    currentStepIndex = stepIndex;
    isPlayingSegmentedRosary = true;

    // Actualizar interfaz completa para este paso (cuentas SVG, tarjeta de rezo y banner)
    updateUIForStep(currentStepIndex);
    updateBeadHighlights(currentSteps[currentStepIndex].beadId);

    const step = currentSteps[currentStepIndex];
    const isGloria = (step.type === 'gloria' || (step.key && step.key.includes('_gl')) || step.key === 'intro_gloria');

    // Inclinación reverente de la Virgen (Gloria al Padre: duración configurable, por defecto 4.5s)
    if (isGloria) {
        setVirginBow(true, step.key);
        const bowDurationMs = (getVirginBowConfig().mysteryDurationSec || 4.5) * 1000;
        setTimeout(() => {
            if (currentStepIndex === stepIndex) {
                setVirginBow(false, step.key);
            }
        }, bowDurationMs);
    } else {
        // En cualquier otro paso (incluidas todas las Ave Marías), la Virgen mantiene su cabeza erguida
        setVirginBow(false, step.key);
    }

    // Si el sincronizador está abierto, destacar visualmente la fila activa y hacer scroll hacia ella
    if (syncListContainer) {
        syncListContainer.querySelectorAll('.sync-item-row').forEach(row => {
            const isCur = (row.getAttribute('data-key') === step.key);
            row.classList.toggle('playing-active', isCur);
            const playBtn = row.querySelector('.btn-sync-play-segment');
            if (playBtn) {
                playBtn.innerText = isCur ? '⏸' : '▶';
                playBtn.classList.toggle('is-playing', isCur);
            }
            if (isCur) {
                row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Buscar audio asignado para este paso respetando estrictamente el perfil de voz activo
    const allAudios = window.RosaryAudioStore ? await window.RosaryAudioStore.getAllAudios() : [];
    const activeVoice = window.RosaryVoices ? window.RosaryVoices.getVoice(window.RosaryVoices.getActiveVoiceId()) : null;
    const isMujer = activeVoice ? (activeVoice.id === 'voice_mujer' || normAudioStr(activeVoice.name).includes('mujer')) : true;
    const isDavid = activeVoice ? (activeVoice.id === 'voice_david' || normAudioStr(activeVoice.name).includes('david')) : false;
    const vT = activeVoice ? (activeVoice.templates || {}) : {};

    const assignments = window.RosaryAudioAssignments ? window.RosaryAudioAssignments.getAssignments(lang, mystery, allAudios) : {};
    let audioId = assignments[step.key];

    // Protección y resolución estricta basada en el perfil de voz activo:
    const isAveMaria = (step.type === 'ave_maria' || step.key.includes('_am_'));
    const isWithGloria = (step.key === 'intro_am_3' || step.key.endsWith('_am_10'));

    if (isMujer && isAveMaria) {
        if (!audioId || audioId === 'sys_avemaria' || audioId === 'sys_avemaria_gloria' || normAudioStr(audioId) === 'avemaria' || normAudioStr(audioId) === 'avemariagloria') {
            audioId = isWithGloria ? (vT.ave_maria_gloria || 'sys_avemaria_gloria_m') : (vT.ave_maria || 'sys_avemaria_m');
        }
    } else if (isDavid && isAveMaria) {
        if (!audioId || audioId === 'sys_avemaria_m' || audioId === 'sys_avemaria_gloria_m' || normAudioStr(audioId).includes('mujer')) {
            audioId = isWithGloria ? (vT.ave_maria_gloria || 'sys_avemaria_gloria') : (vT.ave_maria || 'sys_avemaria');
        }
    }

    if (!audioId && typeof normAudioStr === 'function') {
        if (isWithGloria) audioId = isMujer ? (vT.ave_maria_gloria || 'sys_avemaria_gloria_m') : (vT.ave_maria_gloria || 'sys_avemaria_gloria');
        else if (isAveMaria) audioId = isMujer ? (vT.ave_maria || 'sys_avemaria_m') : (vT.ave_maria || 'sys_avemaria');
        else if (step.type === 'padre_nuestro' || step.key.includes('_pn')) {
            if (step.key === 'intro_pn') audioId = vT.intro_pn || vT.padre_nuestro || 'sys_sumopontifice';
            else audioId = vT.padre_nuestro || 'sys_padrenuestro';
        }
        else if (step.type === 'gloria' || step.key.includes('_gl')) audioId = vT.gloria || 'sys_gloria';
        else if (step.type === 'gracia' || step.key.includes('_gracia')) audioId = vT.pedir_gracia || 'sys_pedirgracia';
        else if (step.key === 'credo' || step.type === 'credo') audioId = vT.credo || 'sys_credo';
        else if (step.key === 'crucifix_intro' || step.type === 'intro_start') audioId = vT.crucifix_intro || 'sys_senaldelacruz';
        else if (step.key === 'letanias' || step.type === 'letanias') audioId = vT.letanias || 'sys_letanias';
        else if (step.key === 'salve' || step.type === 'salve') audioId = vT.salve || 'sys_diostesalve';
        else if (step.key === 'oracion_final' || step.type === 'oracion_final') audioId = vT.oracion_final || 'sys_oracion';
        else if (step.type === 'meditacion') {
            const dec = step.decade || 1;
            const mystNorm = (mystery || 'gozosos').toLowerCase();
            if (mystNorm.includes('gozoso')) audioId = `sys_${dec}gozoso`;
            else if (mystNorm.includes('doloroso')) audioId = `sys_dolorosos${dec}`;
            else if (mystNorm.includes('glorioso')) audioId = `sys_gloriosos${dec}`;
            else if (mystNorm.includes('luminoso')) audioId = `sys_luminosos${dec}`;
        }
    }

    if (audioId && window.RosaryAudioStore) {
        try {
            const url = await window.RosaryAudioStore.getAudioUrl(audioId);
            if (url) {
                audioPlayer.src = url;
                audioPlayer.currentTime = 0;
                await audioPlayer.play();
                updatePlayPauseButton(true);
                return;
            }
        } catch (e) {
            console.warn('[SegmentedPlay] Error al reproducir audio de ' + step.title, e);
            if (e.name === 'NotAllowedError') {
                isPlayingSegmentedRosary = false;
                updatePlayPauseButton(false);
                showRosaryToast('👆 Toca Reproducir para activar el audio en tu dispositivo');
                return;
            }
        }
    }

    // Si no hay audio asignado en este paso (ej. meditaciones que falten), mostrar texto durante 3s y continuar
    if (isPlayingSegmentedRosary) {
        updatePlayPauseButton(true);
        setTimeout(() => {
            if (isPlayingSegmentedRosary && currentStepIndex === stepIndex) {
                playSegmentedRosary(stepIndex + 1);
            }
        }, 3000);
    }
}

function togglePlay() {
    const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
    let mystery = currentMystery;
    if (syncModal && syncModal.classList.contains('open') && syncMysterySelect) {
        mystery = syncMysterySelect.value;
    }
    const useSegmented = (activeSyncAudioMode === 'segmented');

    if (useSegmented) {
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
    } else {
        audioPlayer.pause();
        if (window.RosaryBgMusic) window.RosaryBgMusic.pausePlayback();
        updatePlayPauseButton(false);
    }
}

if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);
if (miniBtnPlayPause) miniBtnPlayPause.addEventListener('click', togglePlay);

audioPlayer.addEventListener('play', () => {
    updatePlayPauseButton(true);
    if (speedSelect) {
        audioPlayer.playbackRate = parseFloat(speedSelect.value) || 1.0;
    }
    if (syncListContainer && currentSteps && currentSteps[currentStepIndex]) {
        const curKey = currentSteps[currentStepIndex].key;
        syncListContainer.querySelectorAll('.sync-item-row').forEach(row => {
            const isCur = (row.getAttribute('data-key') === curKey);
            const playBtn = row.querySelector('.btn-sync-play-segment');
            if (playBtn) {
                playBtn.innerText = isCur ? '⏸' : '▶';
                playBtn.classList.toggle('is-playing', isCur);
            }
        });
    }
});
audioPlayer.addEventListener('pause', () => {
    updatePlayPauseButton(false);
    if (syncListContainer) {
        syncListContainer.querySelectorAll('.btn-sync-play-segment').forEach(b => {
            b.innerText = '▶';
            b.classList.remove('is-playing');
        });
    }
});
audioPlayer.addEventListener('ended', () => {
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
});

audioPlayer.addEventListener('error', (e) => {
    console.warn('[audioPlayer] Error en reproducción de audio:', audioPlayer.error, audioPlayer.src);
    if (isPlayingSegmentedRosary && currentSteps && currentStepIndex < currentSteps.length - 1) {
        showRosaryToast('⚠️ Pasando a la siguiente oración del Rosario...');
        setTimeout(() => {
            if (isPlayingSegmentedRosary) {
                playSegmentedRosary(currentStepIndex + 1);
            }
        }, 1500);
    }
});

// Deslizadores de tiempo
function handleSeekInput() {
    isSeeking = true;
}
function handleSeekChange(sliderElem) {
    if (activeSyncAudioMode === 'segmented' && currentSteps && currentSteps.length > 0) {
        const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
        const totalSec = (audioData && audioData[lang] && audioData[lang][currentMystery] && audioData[lang][currentMystery].duration)
            ? audioData[lang][currentMystery].duration
            : 1986;
        const targetSec = ((sliderElem.value || 0) / 100) * totalSec;
        let targetStepIndex = 0;
        for (let i = 0; i < currentSteps.length; i++) {
            if (targetSec >= currentSteps[i].s) {
                targetStepIndex = i;
            } else {
                break;
            }
        }
        isSeeking = false;
        playSegmentedRosary(targetStepIndex);
        return;
    }
    const dur = audioPlayer.duration || 1800;
    audioPlayer.currentTime = (sliderElem.value / 100) * dur;
    isSeeking = false;
}

if (seekSlider) {
    seekSlider.addEventListener('input', handleSeekInput);
    seekSlider.addEventListener('change', () => handleSeekChange(seekSlider));
}
if (miniSeekSlider) {
    miniSeekSlider.addEventListener('input', handleSeekInput);
    miniSeekSlider.addEventListener('change', () => handleSeekChange(miniSeekSlider));
}

// Botones de salto
if (btnSkipBack) {
    btnSkipBack.addEventListener('click', () => {
        if (activeSyncAudioMode === 'segmented') {
            if (audioPlayer.currentTime > 5) {
                audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
            } else {
                goPrevBead();
            }
        } else {
            audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
        }
    });
}
if (btnSkipForward) {
    btnSkipForward.addEventListener('click', () => {
        if (activeSyncAudioMode === 'segmented') {
            const dur = audioPlayer.duration || 0;
            if (dur > 0 && audioPlayer.currentTime + 10 < dur) {
                audioPlayer.currentTime += 10;
            } else {
                goNextBead();
            }
        } else {
            const dur = audioPlayer.duration || 2000;
            audioPlayer.currentTime = Math.min(dur, audioPlayer.currentTime + 10);
        }
    });
}

// Cuentas anterior / siguiente
function goPrevBead() {
    const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
    if (activeSyncAudioMode === 'segmented' && hasSegmentedAudiosForMystery(lang, currentMystery)) {
        if (currentStepIndex > 0) playSegmentedRosary(currentStepIndex - 1);
    } else {
        if (currentStepIndex > 0) audioPlayer.currentTime = currentSteps[currentStepIndex - 1].s;
    }
}
function goNextBead() {
    const lang = (langSelect && langSelect.value) ? langSelect.value : 'es';
    if (activeSyncAudioMode === 'segmented' && hasSegmentedAudiosForMystery(lang, currentMystery)) {
        if (currentStepIndex < currentSteps.length - 1) playSegmentedRosary(currentStepIndex + 1);
    } else {
        if (currentStepIndex < currentSteps.length - 1) audioPlayer.currentTime = currentSteps[currentStepIndex + 1].s;
    }
}

if (btnPrevBead) btnPrevBead.addEventListener('click', goPrevBead);
if (btnNextBead) btnNextBead.addEventListener('click', goNextBead);
if (miniBtnPrev) miniBtnPrev.addEventListener('click', goPrevBead);
if (miniBtnNext) miniBtnNext.addEventListener('click', goNextBead);

// Velocidad de reproducción con persistencia en localStorage y sincronización
const ROSARY_SPEED_KEY = 'rosary_playback_speed';

function syncSpeedSelects(value) {
    const num = parseFloat(value) || 1.0;
    audioPlayer.playbackRate = num;

    [speedSelect, miniSpeedSelect].forEach(sel => {
        if (!sel) return;
        for (let i = 0; i < sel.options.length; i++) {
            if (Math.abs(parseFloat(sel.options[i].value) - num) < 0.001) {
                sel.selectedIndex = i;
                break;
            }
        }
    });

    try {
        localStorage.setItem(ROSARY_SPEED_KEY, num.toFixed(2));
    } catch (e) {}
}

// Inicializar velocidad guardada
try {
    const savedSpeed = localStorage.getItem(ROSARY_SPEED_KEY);
    if (savedSpeed) {
        syncSpeedSelects(savedSpeed);
    }
} catch (e) {}

if (speedSelect) {
    speedSelect.addEventListener('change', () => syncSpeedSelects(speedSelect.value));
}
if (miniSpeedSelect) {
    miniSpeedSelect.addEventListener('change', () => syncSpeedSelects(miniSpeedSelect.value));
}

audioPlayer.addEventListener('loadedmetadata', () => {
    const curVal = speedSelect ? speedSelect.value : (miniSpeedSelect ? miniSpeedSelect.value : '1.0');
    audioPlayer.playbackRate = parseFloat(curVal) || 1.0;
});

// Clic en los 7 puntos de las decenas (Inicio, 1º, 2º, 3º, 4º, 5º, Letanías)
decadeDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (!currentSteps || currentSteps.length === 0) return;
        let targetIdx = -1;
        if (index === 0) {
            // Inicio: primera oración (Señal de la Cruz)
            targetIdx = 0;
        } else if (index === 6) {
            // Letanías: ir directamente a las Letanías Lauretanas
            targetIdx = currentSteps.findIndex(s => s.key === 'letanias' || s.decade === 6);
        } else {
            // Decenas 1 a 5: ir al inicio de ese misterio (meditación/anuncio)
            targetIdx = currentSteps.findIndex(s => s.decade === index);
        }

        if (targetIdx !== -1) {
            if (activeSyncAudioMode === 'segmented') {
                playSegmentedRosary(targetIdx);
            } else {
                currentStepIndex = targetIdx;
                updateUIForStep(currentStepIndex);
                updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                audioPlayer.currentTime = currentSteps[targetIdx].s;
                audioPlayer.play().catch(() => {});
                updatePlayPauseButton(true);
            }
        }
    });
});

// Clic en selector de misterio (píldoras desktop: Gozosos, Dolorosos, Luminosos, Gloriosos)
mysteryPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const mystery = pill.dataset.mystery;
        if (mystery) {
            loadMystery(mystery);
            if (activeSyncAudioMode === 'segmented') {
                playSegmentedRosary(0);
            } else {
                audioPlayer.play().catch(() => {});
                updatePlayPauseButton(true);
            }
        }
    });
});

// Selector desplegable de misterios (especialmente optimizado para móviles y cabecera)
const mysteryDropdownWrap = document.getElementById('mystery-dropdown-wrap');
const mysteryDropdownMenu = document.getElementById('mystery-dropdown-menu');

function toggleMysteryDropdown(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    if (!mysteryDropdownMenu) return;
    const isOpen = mysteryDropdownMenu.classList.contains('open');
    if (isOpen) {
        closeMysteryDropdown();
    } else {
        openMysteryDropdown();
    }
}

function openMysteryDropdown() {
    if (!mysteryDropdownMenu) return;
    mysteryDropdownMenu.classList.add('open');
    if (currentDayBadge) currentDayBadge.setAttribute('aria-expanded', 'true');
}

function closeMysteryDropdown() {
    if (!mysteryDropdownMenu) return;
    mysteryDropdownMenu.classList.remove('open');
    if (currentDayBadge) currentDayBadge.setAttribute('aria-expanded', 'false');
}

if (currentDayBadge) {
    currentDayBadge.addEventListener('click', toggleMysteryDropdown);
}

document.querySelectorAll('.mystery-dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const mystery = item.getAttribute('data-mystery');
        if (mystery) {
            loadMystery(mystery);
            if (activeSyncAudioMode === 'segmented') {
                playSegmentedRosary(0);
            } else {
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {});
            }
            closeMysteryDropdown();
            showVersionToast(`📿 Misterios <strong>${mystery}</strong> activados`);
        }
    });
});

document.addEventListener('click', (e) => {
    if (mysteryDropdownWrap && !mysteryDropdownWrap.contains(e.target)) {
        closeMysteryDropdown();
    }
});

// Cambio de idioma
langSelect.addEventListener('change', () => {
    loadMystery(currentMystery);
});

// Controles de tamaño de fuente
if (btnFontPlus) {
    btnFontPlus.addEventListener('click', () => {
        currentFontSize = Math.min(3.2, currentFontSize + 0.15);
        document.documentElement.style.setProperty('--prayer-font-size', `${currentFontSize}rem`);
        try { localStorage.setItem('rosary_prayer_font_size', currentFontSize.toFixed(2)); } catch (e) {}
    });
}
if (btnFontMinus) {
    btnFontMinus.addEventListener('click', () => {
        currentFontSize = Math.max(0.85, currentFontSize - 0.15);
        document.documentElement.style.setProperty('--prayer-font-size', `${currentFontSize}rem`);
        try { localStorage.setItem('rosary_prayer_font_size', currentFontSize.toFixed(2)); } catch (e) {}
    });
}

// Pantalla completa
if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });
}

// Modal de imagen de meditación
if (mysteryBannerCard) {
    mysteryBannerCard.addEventListener('click', () => {
        imageModal.classList.add('open');
    });
}
if (modalClose) {
    modalClose.addEventListener('click', () => {
        imageModal.classList.remove('open');
    });
}
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) imageModal.classList.remove('open');
    });
}

// Pestañas móviles (Rosario / Oración)
if (mobileTabRosary && mobileTabPrayer) {
    mobileTabRosary.addEventListener('click', () => {
        mobileTabRosary.classList.add('active');
        mobileTabPrayer.classList.remove('active');
        rosaryColumn.classList.remove('mobile-hidden');
        prayerColumn.classList.add('mobile-hidden');
    });

    mobileTabPrayer.addEventListener('click', () => {
        mobileTabPrayer.classList.add('active');
        mobileTabRosary.classList.remove('active');
        rosaryColumn.classList.add('mobile-hidden');
        prayerColumn.classList.remove('mobile-hidden');
    });
}

// Atajos de teclado
window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowLeft') {
        if (btnSkipBack) btnSkipBack.click();
    } else if (e.code === 'ArrowRight') {
        if (btnSkipForward) btnSkipForward.click();
    } else if (e.code === 'ArrowUp' || e.code === 'PageUp') {
        goPrevBead();
    } else if (e.code === 'ArrowDown' || e.code === 'PageDown') {
        goNextBead();
    }
});

// Formateador de tiempo mm:ss o mm:ss.cc (con centésimas de segundo 00 a 99)
function formatTime(secs, withCentis = false) {
    if (isNaN(secs) || secs < 0) return withCentis ? "00:00.00" : "00:00";
    const totalCentis = Math.round(secs * 100);
    const centis = totalCentis % 100;
    const totalSecsInt = Math.floor(totalCentis / 100);
    const m = Math.floor(totalSecsInt / 60);
    const s = totalSecsInt % 60;
    const centisStr = centis.toString().padStart(2, '0');
    if (m >= 60) {
        const h = Math.floor(m / 60);
        const remM = m % 60;
        const base = `${h}:${remM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return withCentis ? `${base}.${centisStr}` : base;
    }
    const base = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return withCentis ? `${base}.${centisStr}` : base;
}

// =============================================================================
// 13. DESPLAZAMIENTO AUTOMÁTICO SUAVE DE LAS LETANÍAS
// =============================================================================

let userScrollPausedUntil = 0;
let litanyScrollRafId = null;

// Pausar auto-scroll si el usuario interactúa manualmente con el área de texto
if (prayerScrollArea) {
    const pauseOnUserInteraction = () => {
        userScrollPausedUntil = Date.now() + 3500;
    };
    prayerScrollArea.addEventListener('wheel', pauseOnUserInteraction, { passive: true });
    prayerScrollArea.addEventListener('touchstart', pauseOnUserInteraction, { passive: true });
    prayerScrollArea.addEventListener('pointerdown', pauseOnUserInteraction, { passive: true });
}

// Interpreta la velocidad ingresada (ej. '1.0x', '1.2x', '0.8x' o segundos '200s')
function parseLitanyScrollSpeed(speedVal, duration) {
    if (!speedVal) return 1.0;
    const str = String(speedVal).trim().toLowerCase().replace('x', '').replace(',', '.');
    const num = parseFloat(str);
    if (isNaN(num) || num <= 0) return 1.0;
    // Si se ingresó una cantidad de segundos total (número > 15)
    if (num > 15 && duration > 0) {
        return duration / num;
    }
    return num;
}

// Bucle de animación continuo a 60fps para que el texto descienda suavemente durante las letanías
function updateLitanyAutoScroll() {
    if (prayerScrollArea && currentSteps && currentSteps.length > 0 && !audioPlayer.paused) {
        const curStep = currentSteps[currentStepIndex];
        if (curStep && (curStep.key === 'letanias' || curStep.type === 'letanias')) {
            const now = Date.now();
            if (now >= userScrollPausedUntil) {
                const maxScroll = prayerScrollArea.scrollHeight - prayerScrollArea.clientHeight;
                if (maxScroll > 5) {
                    let elapsed = 0;
                    let totalDur = 320;

                    if (activeSyncAudioMode === 'segmented' || (audioPlayer.src && audioPlayer.src.includes('letanias'))) {
                        // En modo segmentado, el audio actual es letanias.mp3 que inicia en t = 0
                        elapsed = Math.max(0, audioPlayer.currentTime || 0);
                        totalDur = (audioPlayer.duration && !isNaN(audioPlayer.duration) && audioPlayer.duration > 10) 
                            ? audioPlayer.duration 
                            : 321;
                    } else {
                        // En modo continuo, el tiempo es relativo al timestamp de inicio del paso
                        const startSec = (typeof curStep.s === 'number' && !isNaN(curStep.s)) ? curStep.s : 0;
                        const nextStep = currentSteps[currentStepIndex + 1];
                        const endSec = nextStep ? nextStep.s : (audioPlayer.duration || (startSec + 300));
                        totalDur = Math.max(30, endSec - startSec);
                        elapsed = Math.max(0, (audioPlayer.currentTime || 0) - startSec);
                    }

                    const speedMultiplier = parseLitanyScrollSpeed(curStep.scrollSpeed, totalDur);
                    const effectiveDuration = totalDur / speedMultiplier;
                    const rawRatio = elapsed / effectiveDuration;
                    const clampedRatio = Math.max(0, Math.min(1.0, rawRatio));

                    const targetScrollTop = maxScroll * clampedRatio;
                    const currentScrollTop = prayerScrollArea.scrollTop;
                    const diff = targetScrollTop - currentScrollTop;

                    // Desplazamiento cinemático suave y continuo (lerp a 60fps)
                    if (Math.abs(diff) > 0.5) {
                        prayerScrollArea.scrollTop = currentScrollTop + diff * 0.08;
                    }
                }
            }
        }
    }
    litanyScrollRafId = requestAnimationFrame(updateLitanyAutoScroll);
}

// Iniciar bucle continuo
if (typeof requestAnimationFrame !== 'undefined') {
    litanyScrollRafId = requestAnimationFrame(updateLitanyAutoScroll);
}

// =============================================================================
// 14. CONTROLADOR DEL FORMULARIO SINCRONIZADOR DE TIEMPOS & AUTOGUARDADO EN VIVO
// =============================================================================

let syncAutoSaveTimer = null;
const ROSARY_CUSTOM_TIMES_BACKUP_KEY = 'rosary_custom_times_backup_v1';
let activeSyncLang = 'es';
let activeSyncMystery = 'Gozosos';

function collectCurrentSyncTimes() {
    if (!syncListContainer) return {};
    const inputs = syncListContainer.querySelectorAll('.sync-input-time');
    const times = {};
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        const val = input.value.trim();
        if (key && val) {
            const sec = toSec(val);
            if (!isNaN(sec)) {
                times[key] = formatTime(sec, true);
            }
        }
    });
    const speedInput = syncListContainer.querySelector('#sync-letanias-speed');
    if (speedInput && speedInput.value.trim()) {
        times.letanias_scroll_speed = speedInput.value.trim();
    }
    return times;
}

function autoSaveSyncTimesImmediate(lang, mystery) {
    if (!syncListContainer) return;
    const times = collectCurrentSyncTimes();
    if (Object.keys(times).length === 0) return;

    // 1. Guardar de inmediato en almacenamiento local (localStorage)
    if (typeof saveCustomTimesToStorage === 'function') {
        saveCustomTimesToStorage(lang, mystery, times);
    }

    // 2. Guardar copia de seguridad histórica local
    try {
        if (typeof localStorage !== 'undefined') {
            const rawBak = localStorage.getItem(ROSARY_CUSTOM_TIMES_BACKUP_KEY);
            const bak = rawBak ? JSON.parse(rawBak) : {};
            if (!bak[lang]) bak[lang] = {};
            bak[lang][mystery] = {
                times: Object.assign({}, times),
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(ROSARY_CUSTOM_TIMES_BACKUP_KEY, JSON.stringify(bak));
        }
    } catch (e) {}

    // 3. Actualizar objeto en memoria
    if (audioData && audioData[lang] && audioData[lang][mystery]) {
        audioData[lang][mystery].customTimes = Object.assign({}, audioData[lang][mystery].customTimes || {}, times);
    }

    // 4. Actualizar línea de tiempo activa en tiempo real si coincide con el rezo activo o el misterio en sincronización
    if (mystery === currentMystery || (syncMysterySelect && mystery === syncMysterySelect.value)) {
        currentMystery = mystery;
        if (langSelect && langSelect.value !== lang) {
            langSelect.value = lang;
        }
        if (typeof generateDetailedTimeline === 'function' && audioData && audioData[lang] && audioData[lang][mystery]) {
            currentSteps = generateDetailedTimeline(mystery, audioData[lang][mystery], lang);
            if (!isPlayingSegmentedRosary && activeSyncAudioMode !== 'segmented') {
                const curTime = (audioPlayer && !isNaN(audioPlayer.currentTime)) ? audioPlayer.currentTime : 0;
                let newStepIndex = 0;
                for (let i = 0; i < currentSteps.length; i++) {
                    if (curTime >= currentSteps[i].s) {
                        newStepIndex = i;
                    } else {
                        break;
                    }
                }
                currentStepIndex = newStepIndex;
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
                setVirginBow(isGloriaTime(curTime));
            } else {
                // En modo segmentado, no resetear currentStepIndex por el tiempo relativo del clip
                if (currentStepIndex >= currentSteps.length) currentStepIndex = 0;
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
            }
        }
    }
}

function autoSaveSyncTimesDebounced(lang, mystery) {
    // Guardado local instantáneo para máxima seguridad contra recargas o cierres
    autoSaveSyncTimesImmediate(lang, mystery);

    if (syncStatusMsg) {
        syncStatusMsg.innerHTML = '💾 <span style="color: #60a5fa;">Guardado localmente en tiempo real...</span>';
    }

    // Debounce para sincronizar con Cloud Firestore en segundo plano sin saturar la red
    clearTimeout(syncAutoSaveTimer);
    syncAutoSaveTimer = setTimeout(() => {
        const times = collectCurrentSyncTimes();
        if (window.RosaryCloud && typeof window.RosaryCloud.saveTimesToCloud === 'function' && Object.keys(times).length > 0) {
            window.RosaryCloud.saveTimesToCloud(lang, mystery, times).then(success => {
                if (success && syncStatusMsg) {
                    syncStatusMsg.innerHTML = '☁️ <span style="color: #4ade80;">¡Autoguardado y sincronizado en Firestore (Nube)!</span>';
                }
            }).catch(() => {});
        }
    }, 1200);
}


async function renderSyncItems(lang, mystery) {
    if (!syncListContainer) return;
    if (typeof getRosaryStructureDefinition !== 'function') return;

    activeSyncLang = lang;
    activeSyncMystery = mystery;

    const sections = getRosaryStructureDefinition(lang, mystery);
    let allAudios = [];
    if (window.RosaryAudioStore) {
        try {
            allAudios = await window.RosaryAudioStore.getAllAudios();
        } catch (e) {
            allAudios = [];
        }
    }

    if (syncStoreCountBadge) {
        syncStoreCountBadge.innerText = allAudios.length;
    }

    const assignments = (window.RosaryAudioAssignments)
        ? window.RosaryAudioAssignments.getAssignments(lang, mystery, allAudios)
        : {};

    const isSegmented = (activeSyncAudioMode === 'segmented');
    const virginBowCfg = (typeof getVirginBowConfig === 'function') ? getVirginBowConfig() : DEFAULT_VIRGIN_BOW_CONFIG;
    const virginBowStartSecStr = (Math.round((virginBowCfg?.introStartSec ?? 8.0) * 10) / 10) + 's';
    let html = '';

    sections.forEach(sec => {
        html += `
            <div class="sync-section-block" id="${sec.id}">
                <div class="sync-section-header" title="Haz clic para contraer o expandir esta sección">
                    <span>${sec.title}</span>
                    <span class="sync-section-toggle-icon">▼</span>
                </div>
                <div class="sync-section-body">
        `;

        sec.items.forEach(item => {
            let assignedAudioId = assignments[item.key] || '';
            const activeVoice = window.RosaryVoices ? window.RosaryVoices.getVoice(window.RosaryVoices.getActiveVoiceId()) : null;
            const isMujer = activeVoice ? (activeVoice.id === 'voice_mujer' || normAudioStr(activeVoice.name).includes('mujer')) : true;
            const isDavid = activeVoice ? (activeVoice.id === 'voice_david' || normAudioStr(activeVoice.name).includes('david')) : false;

            // Descartar audio si no coincide con el género de la voz activa
            if (isMujer && item.key.includes('_am_')) {
                if (assignedAudioId === 'sys_avemaria' || assignedAudioId === 'sys_avemaria_gloria' || normAudioStr(assignedAudioId) === 'avemaria' || normAudioStr(assignedAudioId) === 'avemariagloria') {
                    assignedAudioId = '';
                }
            } else if (isDavid && item.key.includes('_am_')) {
                if (assignedAudioId === 'sys_avemaria_m' || assignedAudioId === 'sys_avemaria_gloria_m' || normAudioStr(assignedAudioId).includes('mujer')) {
                    assignedAudioId = '';
                }
            }

            // Si no hay asignación válida, consultar directamente la plantilla de la voz activa
            if (!assignedAudioId && window.RosaryVoices && typeof window.RosaryVoices.getAudioIdForVoiceItem === 'function') {
                assignedAudioId = window.RosaryVoices.getAudioIdForVoiceItem(activeVoice, item.key, mystery, allAudios);
            }

            const normAssigned = (typeof normAudioStr === 'function') ? normAudioStr(assignedAudioId) : (assignedAudioId || '').toLowerCase();

            html += `
                <div class="sync-item-row ${item.isCustomContent ? 'has-custom-content' : ''}" data-key="${item.key}">
                    <div class="sync-item-left">
                        <span class="sync-badge">${item.badge}</span>
                        <div class="sync-item-titles">
                            <span class="sync-item-title">${item.title}</span>
                            <span class="sync-item-subtitle">${item.subtitle}</span>
                        </div>
                        ${item.isCustomContent ? `<span class="sync-custom-content-badge" title="Contenido personalizado y guardado">✏️ Editado</span>` : ''}
                    </div>
            `;

            if (isSegmented) {
                // Modo Audios Segmentados: Selector de audio + Probar/Reproducir + Quitar + Editar
                let selectOptions = `<option value="">-- Sin audio (o usar continuo) --</option>`;
                let matchedOptionId = null;

                // 1. Coincidencia exacta por ID o por nombre normalizado exacto
                if (assignedAudioId) {
                    const exact = allAudios.find(a => a.id === assignedAudioId);
                    if (exact) {
                        matchedOptionId = exact.id;
                    } else {
                        const normMatch = allAudios.find(a =>
                            normAudioStr(a.id) === normAssigned ||
                            normAudioStr(a.name) === normAssigned ||
                            normAudioStr(a.fileName) === normAssigned
                        );
                        if (normMatch) {
                            matchedOptionId = normMatch.id;
                        }
                    }
                }

                // 2. Fallback litúrgico de alta confiabilidad por plantilla de la voz activa
                if (!matchedOptionId && allAudios.length > 0) {
                    const fallbackSysId = (window.RosaryVoices && typeof window.RosaryVoices.getAudioIdForVoiceItem === 'function')
                        ? window.RosaryVoices.getAudioIdForVoiceItem(activeVoice, item.key, mystery, allAudios)
                        : null;
                    if (fallbackSysId && allAudios.some(a => a.id === fallbackSysId)) {
                        matchedOptionId = fallbackSysId;
                    }
                }

                allAudios.forEach(a => {
                    const isSel = (matchedOptionId === a.id);
                    selectOptions += `<option value="${a.id}" ${isSel ? 'selected' : ''}>🎵 ${escapeHtmlStr(a.name)} (${formatTime(a.duration)})</option>`;
                });
                selectOptions += `<option value="__upload__">➕ Subir nuevo audio...</option>`;
                const hasMatched = !!matchedOptionId;

                html += `
                    <div class="sync-item-right sync-audio-select-wrap">
                        ${item.key === 'crucifix_intro' ? `
                            <button type="button" class="btn-sync-open-virgin-bow" title="Ajustar segundo e inclinación de la cabeza de la Virgen en el Gloria">
                                <img src="src/img/rosario_virgen_gold.png" alt="Virgen" class="sync-virgin-row-icon">
                                <span class="virgin-bow-badge-text">Gloria: ${virginBowStartSecStr}</span>
                            </button>
                        ` : ''}
                        ${item.key === 'letanias' ? `
                            <div class="sync-scroll-speed-wrap" title="Velocidad con la que baja automáticamente el texto de las Letanías">
                                <span class="sync-scroll-speed-label">Vel. Scroll:</span>
                                <input type="text" class="sync-input-scroll-speed" id="sync-letanias-speed" data-key="letanias_scroll_speed" value="${item.scrollSpeed || '1.0x'}" placeholder="1.0x" spellcheck="false" autocomplete="off" title="Velocidad de desplazamiento automático">
                            </div>
                        ` : ''}
                        <select class="sync-audio-select ${hasMatched ? 'has-audio' : ''}" data-key="${item.key}" title="Seleccionar audio para esta oración">
                            ${selectOptions}
                        </select>
                        <button type="button" class="btn-sync-play-segment" data-key="${item.key}" title="Reproducir el Santo Rosario desde esta oración">▶</button>
                        <button type="button" class="btn-sync-clear-segment" data-key="${item.key}" title="Quitar audio de esta oración">✕</button>
                        <button type="button" class="btn-sync-edit ${item.isCustomContent ? 'is-custom' : ''}" data-key="${item.key}" title="Editar texto de esta oración">✏️</button>
                    </div>
                `;
            } else {
                // Modo Tiempo Continuo: Controles de segundos y centésimas
                html += `
                    <div class="sync-item-right">
                        ${item.key === 'crucifix_intro' ? `
                            <button type="button" class="btn-sync-open-virgin-bow" title="Ajustar segundo e inclinación de la cabeza de la Virgen en el Gloria">
                                <img src="src/img/rosario_virgen_gold.png" alt="Virgen" class="sync-virgin-row-icon">
                                <span class="virgin-bow-badge-text">Gloria: ${virginBowStartSecStr}</span>
                            </button>
                        ` : ''}
                        ${item.key === 'letanias' ? `
                            <div class="sync-scroll-speed-wrap" title="Velocidad con la que baja automáticamente el texto de las Letanías">
                                <span class="sync-scroll-speed-label">Vel. Scroll:</span>
                                <input type="text" class="sync-input-scroll-speed" id="sync-letanias-speed" data-key="letanias_scroll_speed" value="${item.scrollSpeed || '1.0x'}" placeholder="1.0x" spellcheck="false" autocomplete="off" title="Velocidad de desplazamiento automático (ej. 1.0x, 1.2x, 0.8x)">
                            </div>
                        ` : ''}
                        <button type="button" class="btn-sync-adjust" data-delta="-1" title="Restar 1 segundo">-1s</button>
                        <button type="button" class="btn-sync-adjust btn-sync-adjust-fine" data-delta="-0.1" title="Restar 0.10s (10 centésimas)">-0.1s</button>
                        <input type="text" class="sync-input-time" data-key="${item.key}" value="${item.formatted}" placeholder="MM:SS.cc" spellcheck="false" autocomplete="off" title="Formato MM:SS.cc (ej. 08:02.99)">
                        <button type="button" class="btn-sync-adjust btn-sync-adjust-fine" data-delta="0.1" title="Sumar 0.10s (10 centésimas)">+0.1s</button>
                        <button type="button" class="btn-sync-adjust" data-delta="1" title="Sumar 1 segundo">+1s</button>
                        <button type="button" class="btn-sync-stamp" data-key="${item.key}" title="Fijar tiempo exacto del audio con centésimas">⏱️ Ahora</button>
                        <button type="button" class="btn-sync-test" data-key="${item.key}" title="Reproducir audio desde este tiempo">▶ Probar</button>
                        <button type="button" class="btn-sync-edit ${item.isCustomContent ? 'is-custom' : ''}" data-key="${item.key}" title="Editar contenido y texto de esta oración">✏️</button>
                    </div>
                `;
            }

            html += `</div>`;
        });

        html += `
                </div>
            </div>
        `;
    });

    syncListContainer.innerHTML = html;

    // Asignar eventos a las cabeceras para contraer / expandir cada sección
    syncListContainer.querySelectorAll('.sync-section-header').forEach(header => {
        header.addEventListener('click', () => {
            const block = header.closest('.sync-section-block');
            if (block) {
                block.classList.toggle('collapsed');
            }
        });
    });

    // Asignar eventos a las filas
    const rows = syncListContainer.querySelectorAll('.sync-item-row');
    rows.forEach(row => {
        const rowKey = row.getAttribute('data-key') || '';
        const itemTitle = row.querySelector('.sync-item-title') ? row.querySelector('.sync-item-title').innerText : '';
        const speedInput = row.querySelector('#sync-letanias-speed');

        if (speedInput) {
            speedInput.addEventListener('input', () => {
                row.classList.add('modified');
                autoSaveSyncTimesDebounced(lang, mystery);
            });
        }

        // EVENTOS EN MODO SEGMENTADO
        const audioSelect = row.querySelector('.sync-audio-select');
        const btnPlaySegment = row.querySelector('.btn-sync-play-segment');
        const btnClearSegment = row.querySelector('.btn-sync-clear-segment');

        function applySegmentAudioAssignment(val) {
            if (window.RosaryAudioAssignments) {
                window.RosaryAudioAssignments.setAssignment(lang, mystery, rowKey, val);
            }
            if (audioSelect) {
                audioSelect.value = val || '';
                audioSelect.classList.toggle('has-audio', !!val);
            }
            row.classList.add('modified');
            if (syncStatusMsg) {
                syncStatusMsg.innerHTML = `🎵 Audio ${val ? 'asignado' : 'desasignado'} para: <strong>${itemTitle}</strong>`;
            }

            // Propagar a la plantilla del perfil de voz activo para mantener sincronía en todas las cuentas de este tipo
            if (window.RosaryVoices && typeof window.RosaryVoices.getTemplateKeyForItemKey === 'function') {
                const tKey = window.RosaryVoices.getTemplateKeyForItemKey(rowKey);
                const activeVoiceId = window.RosaryVoices.getActiveVoiceId();
                const curVoice = window.RosaryVoices.getVoice(activeVoiceId);
                if (tKey && tKey !== 'meditacion' && curVoice && curVoice.templates) {
                    curVoice.templates[tKey] = val || '';
                    window.RosaryVoices.updateVoice(activeVoiceId, curVoice);

                    // Actualizar de inmediato todos los demás selects del mismo tipo en la tabla en pantalla
                    if (syncListContainer) {
                        syncListContainer.querySelectorAll('.sync-item-row').forEach(otherRow => {
                            const otherKey = otherRow.getAttribute('data-key');
                            if (otherKey && window.RosaryVoices.getTemplateKeyForItemKey(otherKey) === tKey) {
                                const otherSel = otherRow.querySelector('.sync-audio-select');
                                if (otherSel && otherSel !== audioSelect) {
                                    otherSel.value = val || '';
                                    otherSel.classList.toggle('has-audio', !!val);
                                    otherRow.classList.add('modified');
                                }
                            }
                        });
                    }

                    if (window.RosaryCloud && typeof window.RosaryCloud.saveVoicesToCloud === 'function') {
                        window.RosaryCloud.saveVoicesToCloud(
                            window.RosaryVoices.getVoices(),
                            activeVoiceId,
                            window.RosaryVoices.getDefaultVoiceId()
                        ).catch(() => {});
                    }
                }
            }
        }

        if (audioSelect) {
            audioSelect.addEventListener('change', async () => {
                const val = audioSelect.value;
                if (val === '__upload__') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'audio/*';
                    fileInput.onchange = async () => {
                        if (fileInput.files && fileInput.files[0]) {
                            const f = fileInput.files[0];
                            if (window.RosaryAudioStore) {
                                const record = await window.RosaryAudioStore.saveAudio(f);
                                applySegmentAudioAssignment(record.id);
                                await renderSyncItems(lang, mystery);
                                showRosaryToast(`🎵 Audio "${record.name}" subido y asignado.`);
                            }
                        } else {
                            audioSelect.value = '';
                        }
                    };
                    fileInput.click();
                    return;
                }

                applySegmentAudioAssignment(val);
            });
        }

        if (btnPlaySegment) {
            btnPlaySegment.addEventListener('click', async () => {
                const stepIdx = currentSteps.findIndex(s => s.key === rowKey);
                // Si ya estamos en esta misma fila y hay un audio cargado
                if (currentStepIndex === stepIdx && audioPlayer.src && !audioPlayer.ended) {
                    if (!audioPlayer.paused) {
                        audioPlayer.pause();
                        updatePlayPauseButton(false);
                        btnPlaySegment.innerText = '▶';
                        btnPlaySegment.classList.remove('is-playing');
                    } else {
                        try {
                            isPlayingSegmentedRosary = true;
                            await audioPlayer.play();
                            updatePlayPauseButton(true);
                            btnPlaySegment.innerText = '⏸';
                            btnPlaySegment.classList.add('is-playing');
                        } catch (err) {
                            playSegmentedRosary(stepIdx >= 0 ? stepIdx : 0);
                        }
                    }
                } else {
                    playSegmentedRosary(stepIdx >= 0 ? stepIdx : 0);
                }
            });
        }

        if (btnClearSegment) {
            btnClearSegment.addEventListener('click', () => {
                applySegmentAudioAssignment(null);
            });
        }

        // EVENTOS EN MODO TIEMPOS CONTINUOS
        const input = row.querySelector('.sync-input-time');
        const btnStamp = row.querySelector('.btn-sync-stamp');
        const btnTest = row.querySelector('.btn-sync-test');
        const adjustBtns = row.querySelectorAll('.btn-sync-adjust');

        if (input) {
            input.addEventListener('input', () => {
                row.classList.add('modified');
                autoSaveSyncTimesDebounced(lang, mystery);
            });

            input.addEventListener('blur', () => {
                const sec = toSec(input.value);
                input.value = formatTime(sec, true);
                autoSaveSyncTimesImmediate(lang, mystery);
            });
        }

        if (adjustBtns.length > 0) {
            adjustBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const delta = parseFloat(btn.getAttribute('data-delta')) || 0;
                    const curSec = Math.max(0, Math.round((toSec(input.value) + delta) * 100) / 100);
                    input.value = formatTime(curSec, true);
                    row.classList.add('modified');
                    autoSaveSyncTimesImmediate(lang, mystery);
                });
            });
        }

        if (btnStamp) {
            btnStamp.addEventListener('click', () => {
                const curSec = Math.round(audioPlayer.currentTime * 100) / 100;
                input.value = formatTime(curSec, true);
                row.classList.add('modified');
                if (syncStatusMsg) {
                    syncStatusMsg.innerHTML = `⏱️ Fijado exacto <strong>${input.value}</strong> para: ${itemTitle} <span style="color:#4ade80;font-size:0.75rem;">(Guardado)</span>`;
                }
                autoSaveSyncTimesImmediate(lang, mystery);
            });
        }

        if (btnTest) {
            btnTest.addEventListener('click', () => {
                autoSaveSyncTimesImmediate(lang, mystery);
                const sec = toSec(input.value);
                audioPlayer.currentTime = sec;
                if (syncTimeCur) {
                    syncTimeCur.innerText = formatTime(sec, true);
                }
                const dur = audioPlayer.duration || 1800;
                if (syncAudioSlider && dur > 0 && !isSyncSeeking) {
                    syncAudioSlider.value = (sec / dur) * 100;
                }
                audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {});
                if (syncStatusMsg) {
                    syncStatusMsg.innerHTML = `▶ Probando en el segundo exacto <strong>${input.value}</strong>: ${itemTitle}`;
                }
            });
        }

        const btnEdit = row.querySelector('.btn-sync-edit');
        if (btnEdit) {
            btnEdit.addEventListener('click', () => {
                const key = btnEdit.getAttribute('data-key');
                let targetItem = null;
                for (const s of sections) {
                    targetItem = s.items.find(it => it.key === key);
                    if (targetItem) break;
                }
                if (targetItem && typeof openEditContentModal === 'function') {
                    openEditContentModal(lang, mystery, targetItem);
                }
            });
        }
    });
}

function openSyncModal() {
    if (!syncModal) return;
    if (syncLangSelect) syncLangSelect.value = langSelect.value || 'es';
    if (syncMysterySelect) syncMysterySelect.value = currentMystery || 'Gozosos';
    
    activeSyncLang = syncLangSelect.value;
    activeSyncMystery = syncMysterySelect.value;

    if (syncModeSegmentedBtn && syncModeTimeBtn) {
        const isSegmented = (activeSyncAudioMode === 'segmented');
        syncModeSegmentedBtn.classList.toggle('active', isSegmented);
        syncModeTimeBtn.classList.toggle('active', !isSegmented);
        if (syncTipBox) {
            if (isSegmented) {
                syncTipBox.innerHTML = '💡 <strong>Modo Audios Segmentados:</strong> Selecciona en el menú de cada fila el audio que le corresponde a esa oración (Padre Nuestro, Ave María, Gloria...). Se reproducirá de forma continua como un solo audio sin desajustes. También puedes pulsar <strong>«📥 Descargar Rosario (.wav)»</strong> para unificar todos los audios en un solo archivo descargable.';
            } else {
                syncTipBox.innerHTML = '💡 <strong>Modo Continuo por Tiempos:</strong> Da clic en <strong>«▶»</strong> para escuchar el audio. Cuando empiece la oración o cuenta deseada, pulsa <strong>«⏱️ Ahora»</strong> en su fila para fijar el tiempo exacto.';
            }
        }
    }

    renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
    syncModal.classList.add('open');
    updatePlayPauseButton(!audioPlayer.paused);

    // Actualizar tiempos en el monitor del modal
    const curTime = audioPlayer.currentTime;
    const dur = audioPlayer.duration || 1800;
    if (syncTimeCur) syncTimeCur.innerText = formatTime(curTime, true);
    if (syncTimeDur) syncTimeDur.innerText = formatTime(dur);
    if (syncAudioSlider && dur > 0) syncAudioSlider.value = (curTime / dur) * 100;
}

function closeSyncModal() {
    if (syncLangSelect && syncMysterySelect) {
        const lang = syncLangSelect.value;
        const mystery = syncMysterySelect.value;
        autoSaveSyncTimesImmediate(lang, mystery);
        currentMystery = mystery;
        if (langSelect && langSelect.value !== lang) {
            langSelect.value = lang;
        }
        mysteryPills.forEach(pill => {
            pill.classList.toggle('active', pill.dataset.mystery === mystery);
        });
        if (audioData[lang] && audioData[lang][mystery]) {
            currentSteps = generateDetailedTimeline(mystery, audioData[lang][mystery], lang);
            if (!isPlayingSegmentedRosary && activeSyncAudioMode !== 'segmented') {
                const curTime = (audioPlayer && !isNaN(audioPlayer.currentTime)) ? audioPlayer.currentTime : 0;
                let newStepIndex = 0;
                for (let i = 0; i < currentSteps.length; i++) {
                    if (curTime >= currentSteps[i].s) {
                        newStepIndex = i;
                    } else {
                        break;
                    }
                }
                currentStepIndex = newStepIndex;
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
                setVirginBow(isGloriaTime(curTime));
            } else {
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
            }
        }
    }
    if (syncModal) syncModal.classList.remove('open');
}

// Abrir / Cerrar modal
if (btnOpenSync) btnOpenSync.addEventListener('click', openSyncModal);
if (syncModalClose) syncModalClose.addEventListener('click', closeSyncModal);
if (syncModal) {
    syncModal.addEventListener('click', (e) => {
        if (e.target === syncModal) closeSyncModal();
    });
}

// Guardar al cerrar o recargar la pestaña
window.addEventListener('beforeunload', () => {
    if (syncModal && syncModal.classList.contains('open') && syncLangSelect && syncMysterySelect) {
        autoSaveSyncTimesImmediate(syncLangSelect.value, syncMysterySelect.value);
    }
});

// Cambio de idioma o misterio dentro del formulario
function onSyncSelectionChange() {
    // Si la selección anterior tenía cambios, autoguardarlos antes de cambiar
    if (activeSyncLang && activeSyncMystery) {
        autoSaveSyncTimesImmediate(activeSyncLang, activeSyncMystery);
    }

    const lang = syncLangSelect.value;
    const mystery = syncMysterySelect.value;
    activeSyncLang = lang;
    activeSyncMystery = mystery;
    currentMystery = mystery;
    if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
    }

    if (lang === 'es' && audioData.es && audioData.es[mystery]) {
        audioData.es[mystery].src = getActiveMysterySrc(mystery, lang);
    }

    if (audioData[lang] && audioData[lang][mystery]) {
        const newSrc = audioData[lang][mystery].src;
        if (!audioPlayer.src.endsWith(newSrc)) {
            const wasPlaying = !audioPlayer.paused;
            audioPlayer.src = newSrc;
            audioPlayer.load();
            if (wasPlaying) {
                audioPlayer.play().catch(() => {});
            }
        }
        currentSteps = generateDetailedTimeline(mystery, audioData[lang][mystery], lang);
        currentStepIndex = 0;
        updateUIForStep(0);
        if (currentSteps[0]) {
            updateBeadHighlights(currentSteps[0].beadId);
        }
        setVirginBow(isGloriaTime(audioPlayer.currentTime || 0));
    }

    // Actualizar píldoras de misterios del rezo
    mysteryPills.forEach(pill => {
        pill.classList.toggle('active', pill.dataset.mystery === mystery);
    });

    renderSyncItems(lang, mystery);
    if (syncStatusMsg) {
        syncStatusMsg.innerText = `Cargado: ${mystery} (${lang.toUpperCase()})`;
    }
}

if (syncLangSelect) syncLangSelect.addEventListener('change', onSyncSelectionChange);
if (syncMysterySelect) syncMysterySelect.addEventListener('change', onSyncSelectionChange);

// Controles de audio del monitor del sincronizador
if (syncBtnPlayPause) syncBtnPlayPause.addEventListener('click', togglePlay);
if (syncBtnBack5) syncBtnBack5.addEventListener('click', () => { audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5); });
if (syncBtnBack1) syncBtnBack1.addEventListener('click', () => { audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 1); });
if (syncBtnFwd1) syncBtnFwd1.addEventListener('click', () => { audioPlayer.currentTime = Math.min(audioPlayer.duration || 2000, audioPlayer.currentTime + 1); });
if (syncBtnFwd5) syncBtnFwd5.addEventListener('click', () => { audioPlayer.currentTime = Math.min(audioPlayer.duration || 2000, audioPlayer.currentTime + 5); });

if (syncAudioSlider) {
    syncAudioSlider.addEventListener('input', () => { isSyncSeeking = true; });
    syncAudioSlider.addEventListener('change', () => {
        const dur = audioPlayer.duration || 1800;
        audioPlayer.currentTime = (syncAudioSlider.value / 100) * dur;
        isSyncSeeking = false;
    });
}

// Píldoras de navegación de secciones
syncNavPills.forEach(pill => {
    pill.addEventListener('click', () => {
        syncNavPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const targetId = pill.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.classList.remove('collapsed');
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Sincronizar el reproductor de audio al tiempo exacto de la sección
            let targetInput = null;
            if (targetId === 'sync-sec-letanias') {
                targetInput = targetEl.querySelector('.sync-input-time[data-key="letanias"]');
            }
            if (!targetInput) {
                targetInput = targetEl.querySelector('.sync-input-time');
            }

            if (targetInput && targetInput.value) {
                const targetSec = toSec(targetInput.value);
                const wasPlaying = !audioPlayer.paused;
                audioPlayer.currentTime = targetSec;
                if (wasPlaying) {
                    audioPlayer.play().catch(() => {});
                }
                const dur = audioPlayer.duration || 1800;
                if (syncTimeCur) syncTimeCur.innerText = formatTime(targetSec, true);
                if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(targetSec);
                if (miniTimeDisplay) miniTimeDisplay.innerText = `${formatTime(targetSec)} / ${formatTime(dur)}`;
                if (syncAudioSlider && dur > 0) syncAudioSlider.value = (targetSec / dur) * 100;
                if (seekSlider && dur > 0) seekSlider.value = (targetSec / dur) * 100;
                if (miniSeekSlider && dur > 0) miniSeekSlider.value = (targetSec / dur) * 100;
                if (syncStatusMsg) {
                    syncStatusMsg.innerText = `⏱️ Sincronizado en ${formatTime(targetSec, true)}: ${pill.innerText.trim()}`;
                }
            }
        }
    });
});

// Guardar y Aplicar
if (btnSyncSave) {
    btnSyncSave.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            const msg = '🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede guardar cambios en la configuración oficial.';
            showRosaryToast(msg);
            if (syncStatusMsg) {
                syncStatusMsg.innerHTML = '<span style="color: #f87171; font-weight: bold;">' + msg + '</span>';
            }
            return;
        }
        const lang = syncLangSelect.value;
        const mystery = syncMysterySelect.value;
        const inputs = syncListContainer.querySelectorAll('.sync-input-time');
        const times = {};

        inputs.forEach(input => {
            const key = input.getAttribute('data-key');
            const val = input.value.trim();
            if (key && val) {
                times[key] = val;
            }
        });

        // Guardar velocidad de scroll de letanías si fue configurada
        const speedInput = syncListContainer.querySelector('#sync-letanias-speed');
        if (speedInput) {
            const speedVal = speedInput.value.trim() || '1.0x';
            times.letanias_scroll_speed = speedVal;
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('rosary_litany_scroll_speed_v1', speedVal);
                }
            } catch (e) {}
        }

        // Guardar en almacenamiento permanente de navegador
        saveCustomTimesToStorage(lang, mystery, times);

        // Guardar asignaciones de audios segmentados si hay selectores en pantalla
        const audioSelects = syncListContainer.querySelectorAll('.sync-audio-select');
        if (audioSelects && audioSelects.length > 0 && window.RosaryAudioAssignments) {
            const currentAssignmentsMap = {};
            audioSelects.forEach(sel => {
                const k = sel.getAttribute('data-key');
                const v = sel.value;
                if (k && v && v !== '__upload__') {
                    currentAssignmentsMap[k] = v;
                }
            });
            window.RosaryAudioAssignments.setAllAssignments(lang, mystery, currentAssignmentsMap);
        }

        // Guardar en la nube (Cloud Firestore) si está disponible
        if (window.RosaryCloud && typeof window.RosaryCloud.saveTimesToCloud === 'function') {
            window.RosaryCloud.saveTimesToCloud(lang, mystery, times).then(success => {
                if (success && syncStatusMsg) {
                    syncStatusMsg.innerHTML = '✅ <strong style="color: #4ade80;">¡Guardado en la nube (Firestore) y sincronizado en todos tus dispositivos!</strong>';
                }
            });
            if (typeof window.RosaryCloud.saveVoicesToCloud === 'function' && window.RosaryVoices) {
                window.RosaryCloud.saveVoicesToCloud(
                    window.RosaryVoices.getVoices(),
                    window.RosaryVoices.getActiveVoiceId(),
                    window.RosaryVoices.getDefaultVoiceId()
                );
            }
        }

        // Actualizar en el objeto de datos en memoria
        if (audioData[lang] && audioData[lang][mystery]) {
            audioData[lang][mystery].customTimes = Object.assign({}, audioData[lang][mystery].customTimes || {}, times);
        }

        // Aplicar de inmediato en el rezo y en la línea de tiempo activa
        currentMystery = mystery;
        if (langSelect && langSelect.value !== lang) {
            langSelect.value = lang;
        }
        mysteryPills.forEach(pill => {
            pill.classList.toggle('active', pill.dataset.mystery === mystery);
        });
        if (audioData[lang] && audioData[lang][mystery]) {
            currentSteps = generateDetailedTimeline(mystery, audioData[lang][mystery], lang);
            if (!isPlayingSegmentedRosary && activeSyncAudioMode !== 'segmented') {
                const curTime = (audioPlayer && !isNaN(audioPlayer.currentTime)) ? audioPlayer.currentTime : 0;
                let newStepIndex = 0;
                for (let i = 0; i < currentSteps.length; i++) {
                    if (curTime >= currentSteps[i].s) {
                        newStepIndex = i;
                    } else {
                        break;
                    }
                }
                currentStepIndex = newStepIndex;
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
                setVirginBow(isGloriaTime(curTime));
            } else {
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
            }
        }

        syncListContainer.querySelectorAll('.sync-item-row.modified').forEach(r => r.classList.remove('modified'));

        if (syncStatusMsg) {
            syncStatusMsg.innerHTML = '✅ <strong style="color: #4ade80;">¡Tiempos guardados localmente y sincronizando con la nube...!</strong>';
        }
    });
}

// Copiar Código JavaScript
if (btnSyncCopy) {
    btnSyncCopy.addEventListener('click', () => {
        const inputs = syncListContainer.querySelectorAll('.sync-input-time');
        const lines = [];
        inputs.forEach(input => {
            const key = input.getAttribute('data-key');
            const val = input.value.trim();
            if (key && val) {
                lines.push(`                ${key}: "${val}"`);
            }
        });

        const speedInput = syncListContainer.querySelector('#sync-letanias-speed');
        if (speedInput && speedInput.value.trim()) {
            lines.push(`                letanias_scroll_speed: "${speedInput.value.trim()}"`);
        }

        const snippet = `// Tiempos personalizados para ${syncMysterySelect.value} (${syncLangSelect.value})\ncustomTimes: {\n${lines.join(',\n')}\n}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(snippet).then(() => {
                if (syncStatusMsg) {
                    syncStatusMsg.innerHTML = '📋 <strong style="color: #60a5fa;">¡Código copiado al portapapeles!</strong>';
                }
            }).catch(() => {
                prompt("Copia este código:", snippet);
            });
        } else {
            prompt("Copia este código:", snippet);
        }
    });
}

// Exportar copia de seguridad en archivo JSON
if (btnSyncExport) {
    btnSyncExport.addEventListener('click', () => {
        const allData = getAllStoredCustomTimes();
        const jsonStr = JSON.stringify(allData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `santo_rosario_tiempos_${syncLangSelect.value}_${syncMysterySelect.value}.json`;
        a.click();
        URL.revokeObjectURL(url);
        if (syncStatusMsg) {
            syncStatusMsg.innerText = '📤 Archivo de copia de seguridad exportado';
        }
    });
}

// Importar copia de seguridad desde archivo JSON
if (btnSyncImport && syncFileInput) {
    btnSyncImport.addEventListener('click', () => {
        syncFileInput.click();
    });

    syncFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (typeof localStorage !== 'undefined') {
                    const currentAll = getAllStoredCustomTimes();
                    const merged = Object.assign({}, currentAll, parsed);
                    localStorage.setItem(ROSARY_CUSTOM_TIMES_KEY, JSON.stringify(merged));
                    renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
                    if (syncStatusMsg) {
                        syncStatusMsg.innerHTML = '📥 <strong style="color: #4ade80;">¡Tiempos importados exitosamente!</strong>';
                    }
                }
            } catch (err) {
                alert("Error al leer el archivo JSON: formato inválido.");
            }
        };
        reader.readAsText(file);
    });
}

// Restablecer tiempos originales
if (btnSyncReset) {
    btnSyncReset.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede restablecer los tiempos.');
            return;
        }
        const lang = syncLangSelect.value;
        const mystery = syncMysterySelect.value;
        if (confirm(`¿Deseas restablecer los tiempos de ${mystery} (${lang.toUpperCase()}) a sus valores calculados originales?`)) {
            clearCustomTimesFromStorage(lang, mystery);
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('rosary_litany_scroll_speed_v1');
                }
            } catch (e) {}
            if (audioData[lang] && audioData[lang][mystery]) {
                delete audioData[lang][mystery].customTimes;
            }
            renderSyncItems(lang, mystery);
            if (lang === langSelect.value && mystery === currentMystery) {
                currentSteps = generateDetailedTimeline(currentMystery, audioData[lang][currentMystery], lang);
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
            }
            if (syncStatusMsg) {
                syncStatusMsg.innerText = '🔄 Tiempos restablecidos a valores originales';
            }
        }
    });
}

// Restaurar última sincronización guardada en Cloud Firestore
const btnSyncCloudRestore = document.getElementById('btn-sync-cloud-restore');
if (btnSyncCloudRestore) {
    btnSyncCloudRestore.addEventListener('click', async () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede restaurar desde la nube.');
            return;
        }
        const lang = syncLangSelect.value;
        const mystery = syncMysterySelect.value;
        if (syncStatusMsg) {
            syncStatusMsg.innerHTML = '☁️ <span style="color: #60a5fa;">Conectando con Cloud Firestore para restaurar...</span>';
        }
        if (window.RosaryCloud && typeof window.RosaryCloud.restoreTimesFromCloud === 'function') {
            const ok = await window.RosaryCloud.restoreTimesFromCloud(lang, mystery);
            if (ok) {
                renderSyncItems(lang, mystery);
                if (syncStatusMsg) {
                    syncStatusMsg.innerHTML = `✅ <strong style="color: #4ade80;">¡Sincronización de ${mystery} restaurada desde Cloud Firestore!</strong>`;
                }
                showVersionToast(`☁️ Tiempos de <strong>${mystery}</strong> restaurados desde la nube`);
            } else {
                if (syncStatusMsg) {
                    syncStatusMsg.innerHTML = `⚠️ No se encontró registro guardado en la nube para ${mystery}.`;
                }
            }
        } else {
            alert('Cloud Firestore no está disponible en este momento.');
        }
    });
}

// Exponer refresco de línea de tiempo interactiva para sincronizaciones en la nube
window.refreshActiveTimeline = function() {
    const lang = langSelect ? (langSelect.value || 'es') : 'es';
    if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][currentMystery]) {
        currentSteps = generateDetailedTimeline(currentMystery, audioData[lang][currentMystery], lang);
        if (!isPlayingSegmentedRosary && activeSyncAudioMode !== 'segmented') {
            const curTime = (audioPlayer && !isNaN(audioPlayer.currentTime)) ? audioPlayer.currentTime : 0;
            let newStepIndex = 0;
            for (let i = 0; i < currentSteps.length; i++) {
                if (curTime >= currentSteps[i].s) {
                    newStepIndex = i;
                } else {
                    break;
                }
            }
            currentStepIndex = newStepIndex;
            updateUIForStep(currentStepIndex);
            if (currentSteps[currentStepIndex]) {
                updateBeadHighlights(currentSteps[currentStepIndex].beadId);
            }
            setVirginBow(isGloriaTime(curTime));
        } else {
            // En modo segmentado, NUNCA resetear currentStepIndex a 0 por el tiempo del fragmento
            if (currentStepIndex >= currentSteps.length) currentStepIndex = 0;
            updateUIForStep(currentStepIndex);
            if (currentSteps[currentStepIndex]) {
                updateBeadHighlights(currentSteps[currentStepIndex].beadId);
            }
        }
    }
};

// Refresco automático de los campos del sincronizador si está abierto al recibir datos de Firestore
window.refreshSyncModalTimesUI = function() {
    if (syncModal && syncModal.classList.contains('open') && syncLangSelect && syncMysterySelect) {
        const hasUnsaved = syncListContainer && syncListContainer.querySelector('.sync-item-row.modified');
        if (!hasUnsaved) {
            renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
        }
    }
};

// =============================================================================
// EDITOR INDIVIDUAL DE CONTENIDO DE CUENTA / ORACIÓN (#edit-content-modal)
// =============================================================================

const editContentModal = document.getElementById('edit-content-modal');
const editContentModalClose = document.getElementById('edit-content-modal-close');
const editContentModalTitle = document.getElementById('edit-content-modal-title');
const editContentModalSubtitle = document.getElementById('edit-content-modal-subtitle');
const editContentBadge = document.getElementById('edit-content-badge');
const editContentMeta = document.getElementById('edit-content-meta');
const editContentStatusPill = document.getElementById('edit-content-status-pill');
const editItemTitleInput = document.getElementById('edit-item-title-input');
const editItemSubtitleInput = document.getElementById('edit-item-subtitle-input');
const editItemTextInput = document.getElementById('edit-item-text-input');
const editContentStatusMsg = document.getElementById('edit-content-status-msg');
const btnEditContentReset = document.getElementById('btn-edit-content-reset');
const btnEditContentCancel = document.getElementById('btn-edit-content-cancel');
const btnEditContentSave = document.getElementById('btn-edit-content-save');

let activeEditItemContext = null;

function openEditContentModal(lang, mystery, item) {
    if (!editContentModal) return;
    activeEditItemContext = {
        lang: lang,
        mystery: mystery,
        itemKey: item.key,
        item: Object.assign({}, item)
    };

    if (editContentBadge) editContentBadge.innerText = item.badge || '📿';
    if (editContentMeta) {
        const langName = (langSelect && langSelect.options) ? (Array.from(langSelect.options).find(o => o.value === lang)?.text || lang) : lang;
        editContentMeta.innerText = `${langName} • ${mystery} • ${item.key}`;
    }

    if (editContentStatusPill) {
        if (item.isCustomContent) {
            editContentStatusPill.innerText = 'Personalizado';
            editContentStatusPill.classList.add('is-custom');
        } else {
            editContentStatusPill.innerText = 'Original';
            editContentStatusPill.classList.remove('is-custom');
        }
    }

    if (editItemTitleInput) editItemTitleInput.value = item.title || '';
    if (editItemSubtitleInput) editItemSubtitleInput.value = item.subtitle || '';
    if (editItemTextInput) editItemTextInput.value = item.prayerText || '';

    if (editContentStatusMsg) editContentStatusMsg.innerText = 'Listo para editar contenido.';

    editContentModal.classList.add('open');
}

function closeEditContentModal() {
    if (editContentModal) editContentModal.classList.remove('open');
    activeEditItemContext = null;
}

if (editContentModalClose) editContentModalClose.addEventListener('click', closeEditContentModal);
if (btnEditContentCancel) btnEditContentCancel.addEventListener('click', closeEditContentModal);
if (editContentModal) {
    editContentModal.addEventListener('click', (e) => {
        if (e.target === editContentModal) closeEditContentModal();
    });
}

// Guardar contenido editado en LocalStorage y Cloud Firestore
if (btnEditContentSave) {
    btnEditContentSave.addEventListener('click', async () => {
        if (!activeEditItemContext) return;
        const { lang, mystery, itemKey } = activeEditItemContext;

        const newTitle = editItemTitleInput ? editItemTitleInput.value.trim() : '';
        const newSubtitle = editItemSubtitleInput ? editItemSubtitleInput.value.trim() : '';
        const newText = editItemTextInput ? editItemTextInput.value.trim() : '';

        if (!newTitle) {
            if (editContentStatusMsg) editContentStatusMsg.innerText = '⚠️ El título no puede quedar vacío';
            if (editItemTitleInput) editItemTitleInput.focus();
            return;
        }

        const contentObj = {
            title: newTitle,
            subtitle: newSubtitle,
            prayerText: newText
        };

        if (editContentStatusMsg) editContentStatusMsg.innerText = '💾 Guardando en Firestore...';

        // 1. Guardar en localStorage
        if (typeof saveItemContentToStorage === 'function') {
            saveItemContentToStorage(lang, mystery, itemKey, contentObj);
        }

        // 2. Guardar en Cloud Firestore
        let cloudSaved = false;
        if (window.RosaryCloud && typeof window.RosaryCloud.saveItemContentToCloud === 'function') {
            cloudSaved = await window.RosaryCloud.saveItemContentToCloud(lang, mystery, itemKey, contentObj);
        }

        // 3. Si la clave corresponde a una oración canónica, sincronizar también en rosaryPrayers
        if (typeof rosaryPrayers !== 'undefined' && rosaryPrayers[lang] && rosaryPrayers[lang][itemKey]) {
            if (typeof saveCustomPrayersToStorage === 'function') {
                saveCustomPrayersToStorage(lang, {
                    [itemKey]: { title: newTitle, text: newText }
                });
            }
            if (window.RosaryCloud && typeof window.RosaryCloud.savePrayersToCloud === 'function') {
                window.RosaryCloud.savePrayersToCloud(lang, {
                    [itemKey]: { title: newTitle, text: newText }
                });
            }
        }

        // 4. Actualizar sincronizador en pantalla
        if (syncLangSelect && syncMysterySelect) {
            renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
        }

        // 5. Actualizar la línea de tiempo activa si coincide el misterio
        if (typeof window.refreshActiveTimeline === 'function') {
            window.refreshActiveTimeline();
        }

        // 6. Notificar al usuario con toast
        const msg = cloudSaved 
            ? '✅ ¡Contenido guardado en Firebase (Nube) y aplicado!'
            : '✅ ¡Contenido guardado localmente y aplicado!';
        showVersionToast(msg);

        closeEditContentModal();
    });
}

// Restablecer contenido original predeterminado
if (btnEditContentReset) {
    btnEditContentReset.addEventListener('click', async () => {
        if (!activeEditItemContext) return;
        const { lang, mystery, itemKey } = activeEditItemContext;

        if (editContentStatusMsg) editContentStatusMsg.innerText = '🔄 Restableciendo al original...';

        // 1. Eliminar de localStorage
        if (typeof clearItemContentFromStorage === 'function') {
            clearItemContentFromStorage(lang, mystery, itemKey);
        }

        // 2. Limpiar en Cloud Firestore
        if (window.RosaryCloud && typeof window.RosaryCloud.saveItemContentToCloud === 'function') {
            await window.RosaryCloud.saveItemContentToCloud(lang, mystery, itemKey, {
                title: '',
                subtitle: '',
                prayerText: '',
                reset: true
            });
        }

        // 3. Volver a renderizar sincronizador
        if (syncLangSelect && syncMysterySelect) {
            renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
        }

        // 4. Actualizar línea de tiempo activa
        if (typeof window.refreshActiveTimeline === 'function') {
            window.refreshActiveTimeline();
        }

        showVersionToast('↺ Contenido restablecido a su valor original.');
        closeEditContentModal();
    });
}

// Actualizar sincronizador desde listener de Firestore si está abierto
window.refreshSyncModalContentUI = function() {
    if (syncModal && syncModal.classList.contains('open') && syncLangSelect && syncMysterySelect) {
        renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
    }
};


// =============================================================================
// FORMULARIO Y EDITOR DE ORACIONES DEL SANTO ROSARIO
// =============================================================================

const btnOpenPrayers = document.getElementById('btn-open-prayers');
const prayersModal = document.getElementById('prayers-modal');
const prayersModalClose = document.getElementById('prayers-modal-close');
const prayersLangSelect = document.getElementById('prayers-lang-select');
const prayersSearchInput = document.getElementById('prayers-search-input');
const prayersPillsNav = document.getElementById('prayers-pills-nav');
const prayersListContainer = document.getElementById('prayers-list-container');
const prayersStatusMsg = document.getElementById('prayers-status-msg');
const btnPrayersReset = document.getElementById('btn-prayers-reset');
const btnPrayersCopy = document.getElementById('btn-prayers-copy');
const btnPrayersSave = document.getElementById('btn-prayers-save');

const PRAYERS_CONFIG_LIST = [
    { key: "padreNuestro", badge: "Padre Nuestro", label: "Padre Nuestro", cat: "padreNuestro" },
    { key: "aveMaria", badge: "Ave María", label: "Ave María", cat: "aveMaria" },
    { key: "gloria", badge: "Gloria al Padre", label: "Gloria al Padre", cat: "gloria" },
    { key: "jaculatoria", badge: "Jaculatoria", label: "Jaculatoria y Oración de Fátima", cat: "gloria" },
    { key: "letanias", badge: "Letanías", label: "Letanías Lauretanas", cat: "letanias", isLarge: true },
    { key: "salve", badge: "La Salve", label: "Dios te Salve, Reina y Madre", cat: "salve", isLarge: true },
    { key: "credo", badge: "Credo", label: "Credo de los Apóstoles", cat: "credo", isLarge: true },
    { key: "padreNuestroIntro", badge: "P. Nuestro (Papa)", label: "Padre Nuestro por las intenciones del Santo Padre", cat: "padreNuestro" },
    { key: "aveMariaFe", badge: "1ª Ave María (Fe)", label: "1ª Ave María por el aumento de la Fe", cat: "aveMaria" },
    { key: "aveMariaEsperanza", badge: "2ª Ave María (Esperanza)", label: "2ª Ave María por el aumento de la Esperanza", cat: "aveMaria" },
    { key: "aveMariaCaridad", badge: "3ª Ave María (Caridad)", label: "3ª Ave María por el aumento de la Caridad", cat: "aveMaria" },
    { key: "senalCruz", badge: "Señal Cruz", label: "Señal de la Santa Cruz", cat: "iniciales" },
    { key: "invocacion", badge: "Invocación", label: "Invocación al Espíritu Santo", cat: "iniciales" },
    { key: "actoContricion", badge: "Acto Contrición", label: "Acto de Contrición", cat: "iniciales" },
    { key: "oracionFinal", badge: "Oración Final", label: "Oración Final y Bendición", cat: "iniciales" }
];

let currentPrayerFilter = 'all';

function escapeHtmlStr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttrStr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPrayersList(lang) {
    if (!prayersListContainer) return;
    const effective = (typeof getEffectivePrayers === 'function') ? getEffectivePrayers(lang) : (rosaryPrayers[lang] || rosaryPrayers.es);
    const base = (typeof rosaryPrayers !== 'undefined' && rosaryPrayers[lang]) ? rosaryPrayers[lang] : (rosaryPrayers.es || {});

    let html = '';
    PRAYERS_CONFIG_LIST.forEach(item => {
        const prayer = effective[item.key] || base[item.key] || { title: item.label, text: '' };
        const basePrayer = base[item.key] || { title: item.label, text: '' };
        const isModified = (prayer.title !== basePrayer.title || prayer.text !== basePrayer.text);
        const rows = item.isLarge ? 12 : 5;

        html += `
            <div class="prayer-card-block ${isModified ? 'prayer-card-modified' : ''}" data-key="${item.key}" data-category="${item.cat}">
                <div class="prayer-card-header">
                    <span class="prayer-badge">${item.badge}</span>
                    <div class="prayer-title-input-wrap">
                        <label class="prayer-label">Título:</label>
                        <input type="text" class="prayer-input-title" data-key="${item.key}" value="${escapeAttrStr(prayer.title || '')}" />
                    </div>
                    ${isModified ? '<span class="sync-row-badge-custom" title="Texto modificado respecto al predeterminado">Modificado</span>' : ''}
                    <button type="button" class="btn-prayer-reset-single" data-key="${item.key}" title="Restablecer sólo esta oración a su valor original">↺</button>
                </div>
                <div class="prayer-card-body">
                    <label class="prayer-label">Texto de la oración:</label>
                    <textarea class="prayer-input-text" data-key="${item.key}" rows="${rows}">${escapeHtmlStr(prayer.text || '')}</textarea>
                </div>
            </div>
        `;
    });

    prayersListContainer.innerHTML = html;

    // Asignar eventos de restablecimiento individual
    prayersListContainer.querySelectorAll('.btn-prayer-reset-single').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-key');
            if (!key) return;
            const card = prayersListContainer.querySelector(`.prayer-card-block[data-key="${key}"]`);
            if (card && base[key]) {
                const titleInput = card.querySelector('.prayer-input-title');
                const textArea = card.querySelector('.prayer-input-text');
                if (titleInput) titleInput.value = base[key].title || '';
                if (textArea) textArea.value = base[key].text || '';
                card.classList.remove('prayer-card-modified');
                const badge = card.querySelector('.sync-row-badge-custom');
                if (badge) badge.remove();
            }
        });
    });

    applyPrayersFilter();
}

function applyPrayersFilter() {
    if (!prayersListContainer) return;
    const q = (prayersSearchInput?.value || '').toLowerCase().trim();
    const cards = prayersListContainer.querySelectorAll('.prayer-card-block');

    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const title = (card.querySelector('.prayer-input-title')?.value || '').toLowerCase();
        const text = (card.querySelector('.prayer-input-text')?.value || '').toLowerCase();

        const matchCat = (currentPrayerFilter === 'all' || cat === currentPrayerFilter);
        const matchQuery = !q || title.includes(q) || text.includes(q);

        card.classList.toggle('hidden', !(matchCat && matchQuery));
    });
}

// Abrir y cerrar modal de oraciones
if (btnOpenPrayers && prayersModal) {
    btnOpenPrayers.addEventListener('click', () => {
        const curLang = langSelect ? (langSelect.value || 'es') : 'es';
        if (prayersLangSelect) prayersLangSelect.value = curLang;
        renderPrayersList(curLang);
        prayersModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

function closePrayersModal() {
    if (prayersModal) {
        prayersModal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

if (prayersModalClose) {
    prayersModalClose.addEventListener('click', closePrayersModal);
}
if (prayersModal) {
    prayersModal.addEventListener('click', (e) => {
        if (e.target === prayersModal) {
            closePrayersModal();
        }
    });
}

// Selector de idioma en modal de oraciones
if (prayersLangSelect) {
    prayersLangSelect.addEventListener('change', () => {
        renderPrayersList(prayersLangSelect.value);
    });
}

// Filtro por búsqueda
if (prayersSearchInput) {
    prayersSearchInput.addEventListener('input', applyPrayersFilter);
}

// Píldoras de filtro rápido
if (prayersPillsNav) {
    prayersPillsNav.querySelectorAll('.sync-nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            prayersPillsNav.querySelectorAll('.sync-nav-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentPrayerFilter = pill.getAttribute('data-filter') || 'all';
            applyPrayersFilter();
        });
    });
}

// Guardar oraciones editadas
if (btnPrayersSave) {
    btnPrayersSave.addEventListener('click', () => {
        const lang = prayersLangSelect ? (prayersLangSelect.value || 'es') : 'es';
        const cards = prayersListContainer.querySelectorAll('.prayer-card-block');
        const customPrayers = {};

        cards.forEach(card => {
            const key = card.getAttribute('data-key');
            const titleInput = card.querySelector('.prayer-input-title');
            const textArea = card.querySelector('.prayer-input-text');
            if (key && titleInput && textArea) {
                customPrayers[key] = {
                    title: titleInput.value.trim(),
                    text: textArea.value.trim()
                };
            }
        });

        // 1. Guardar localmente
        if (typeof saveCustomPrayersToStorage === 'function') {
            saveCustomPrayersToStorage(lang, customPrayers);
        }

        // 2. Guardar en Cloud Firestore si está disponible
        if (window.RosaryCloud && typeof window.RosaryCloud.savePrayersToCloud === 'function') {
            window.RosaryCloud.savePrayersToCloud(lang, customPrayers).then(ok => {
                if (prayersStatusMsg) {
                    prayersStatusMsg.innerText = ok ? `☁️ Guardado en la nube (${lang})` : '💾 Guardado localmente';
                }
            });
        }

        // 3. Actualizar la interfaz si el idioma guardado es el actual
        if (lang === langSelect.value) {
            const mData = (audioData[lang] && audioData[lang][currentMystery]) ? audioData[lang][currentMystery] : audioData.es.Gozosos;
            currentSteps = generateDetailedTimeline(currentMystery, mData, lang);
            updateUIForStep(currentStepIndex);
            if (currentSteps[currentStepIndex]) {
                updateBeadHighlights(currentSteps[currentStepIndex].beadId);
            }
        }

        // 4. Feedback visual
        renderPrayersList(lang);
        if (prayersStatusMsg) {
            prayersStatusMsg.innerText = '✅ ¡Oraciones guardadas y aplicadas con éxito!';
            setTimeout(() => {
                if (prayersStatusMsg) prayersStatusMsg.innerText = 'Textos listos para editar';
            }, 3500);
        }
    });
}

// Restablecer oraciones a originales
if (btnPrayersReset) {
    btnPrayersReset.addEventListener('click', () => {
        const lang = prayersLangSelect ? (prayersLangSelect.value || 'es') : 'es';
        if (confirm(`¿Deseas restablecer todas las oraciones del idioma ${lang.toUpperCase()} a sus textos originales oficiales?`)) {
            if (typeof clearCustomPrayersFromStorage === 'function') {
                clearCustomPrayersFromStorage(lang);
            }
            renderPrayersList(lang);
            if (lang === langSelect.value) {
                const mData = (audioData[lang] && audioData[lang][currentMystery]) ? audioData[lang][currentMystery] : audioData.es.Gozosos;
                currentSteps = generateDetailedTimeline(currentMystery, mData, lang);
                updateUIForStep(currentStepIndex);
                if (currentSteps[currentStepIndex]) {
                    updateBeadHighlights(currentSteps[currentStepIndex].beadId);
                }
            }
            if (prayersStatusMsg) {
                prayersStatusMsg.innerText = '🔄 Oraciones restablecidas a los textos originales';
            }
        }
    });
}

// Copiar JSON
if (btnPrayersCopy) {
    btnPrayersCopy.addEventListener('click', () => {
        const lang = prayersLangSelect ? (prayersLangSelect.value || 'es') : 'es';
        const effective = (typeof getEffectivePrayers === 'function') ? getEffectivePrayers(lang) : (rosaryPrayers[lang] || rosaryPrayers.es);
        const jsonStr = JSON.stringify(effective, null, 2);
        navigator.clipboard.writeText(jsonStr).then(() => {
            if (prayersStatusMsg) {
                prayersStatusMsg.innerText = '📋 ¡Textos en JSON copiados al portapapeles!';
                setTimeout(() => {
                    if (prayersStatusMsg) prayersStatusMsg.innerText = 'Textos listos para editar';
                }, 3000);
            }
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    });
}

// Exponer refresco de oraciones para actualizaciones de Firestore
window.refreshActivePrayersUI = function() {
    const lang = langSelect ? (langSelect.value || 'es') : 'es';
    if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][currentMystery]) {
        currentSteps = generateDetailedTimeline(currentMystery, audioData[lang][currentMystery], lang);
        updateUIForStep(currentStepIndex);
        if (currentSteps[currentStepIndex]) {
            updateBeadHighlights(currentSteps[currentStepIndex].beadId);
        }
    }
    if (prayersModal && prayersModal.classList.contains('open') && prayersLangSelect) {
        renderPrayersList(prayersLangSelect.value);
    }
};


// 13. INICIALIZACIÓN AL CARGAR LA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    updateAudioVersionUI();
    buildRosarySvg();
    const todayMystery = getMysteryByDay();
    loadMystery(todayMystery);
});


// =============================================================================
// GESTOR DEL ALMACÉN DE AUDIOS Y EXPORTACIÓN UNIFICADA
// =============================================================================

async function openAudioStoreModal() {
    if (!audioStoreModal) return;
    audioStoreModal.classList.add('open');
    await renderAudioStoreList();
}

function closeAudioStoreModal() {
    if (!audioStoreModal) return;
    audioStoreModal.classList.remove('open');
    if (currentPreviewAudio) {
        currentPreviewAudio.pause();
        currentPreviewAudio = null;
        previewingStoreAudioId = null;
    }
}

async function renderAudioStoreList() {
    if (!audioStoreList || !window.RosaryAudioStore) return;
    const audios = await window.RosaryAudioStore.getAllAudios();

    if (storeStatsText) {
        storeStatsText.innerText = `${audios.length} audio(s) guardado(s) en el almacén`;
    }
    if (syncStoreCountBadge) {
        syncStoreCountBadge.innerText = audios.length;
    }

    if (audios.length === 0) {
        audioStoreList.innerHTML = `
            <div class="audio-store-empty" style="text-align: center; padding: 30px 15px;">
                <p style="margin-bottom: 12px; color: #94a3b8;">El almacén está vacío. Sube oraciones grabadas o restaura los audios oficiales del sistema.</p>
                <button type="button" id="btn-restore-system-audios" style="background: #eab308; color: #000; font-weight: 600; padding: 8px 18px; border: none; border-radius: 6px; cursor: pointer;">↺ Restaurar audios oficiales del sistema</button>
            </div>
        `;
        const btnRestore = audioStoreList.querySelector('#btn-restore-system-audios');
        if (btnRestore) {
            btnRestore.addEventListener('click', async () => {
                if (window.RosaryAudioStore && typeof window.RosaryAudioStore.restoreSystemAudios === 'function') {
                    window.RosaryAudioStore.restoreSystemAudios();
                    await renderAudioStoreList();
                    await renderSyncItems(activeSyncLang, activeSyncMystery);
                    showRosaryToast('↺ Audios oficiales del sistema restaurados.');
                }
            });
        }
        return;
    }

    let html = '';
    audios.forEach(aud => {
        const sizeMb = (aud.size / (1024 * 1024)).toFixed(2);
        html += `
            <div class="audio-item-card" data-id="${aud.id}">
                <div class="audio-item-info">
                    <span class="audio-item-icon">🎵</span>
                    <div class="audio-item-details">
                        <span class="audio-item-name" title="${escapeHtmlStr(aud.name)}">${escapeHtmlStr(aud.name)}</span>
                        <div class="audio-item-meta">
                            <span class="audio-item-meta-dur">⏱️ ${formatTime(aud.duration)}</span>
                            <span>• ${sizeMb} MB</span>
                            <span>• ${aud.fileName || 'audio'}</span>
                        </div>
                    </div>
                </div>
                <div class="audio-item-actions">
                    <button type="button" class="btn-audio-action btn-audio-play" data-id="${aud.id}" title="Escuchar previsualización">▶ Escuchar</button>
                    <button type="button" class="btn-audio-action btn-audio-rename" data-id="${aud.id}" title="Cambiar nombre">✏️</button>
                    <button type="button" class="btn-audio-action btn-audio-del" data-id="${aud.id}" title="Eliminar este audio">🗑️</button>
                </div>
            </div>
        `;
    });

    audioStoreList.innerHTML = html;

    // Asignar eventos de previsualización, renombrado y borrado
    audioStoreList.querySelectorAll('.btn-audio-play').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (previewingStoreAudioId === id && currentPreviewAudio && !currentPreviewAudio.paused) {
                currentPreviewAudio.pause();
                btn.innerText = '▶ Escuchar';
                btn.classList.remove('is-playing');
                previewingStoreAudioId = null;
                return;
            }

            if (currentPreviewAudio) currentPreviewAudio.pause();
            audioStoreList.querySelectorAll('.btn-audio-play').forEach(b => {
                b.innerText = '▶ Escuchar';
                b.classList.remove('is-playing');
            });

            try {
                const url = await window.RosaryAudioStore.getAudioUrl(id);
                if (!url) return;
                currentPreviewAudio = new Audio(url);
                previewingStoreAudioId = id;
                btn.innerText = '⏸ Pausar';
                btn.classList.add('is-playing');

                currentPreviewAudio.onended = () => {
                    btn.innerText = '▶ Escuchar';
                    btn.classList.remove('is-playing');
                    previewingStoreAudioId = null;
                };
                currentPreviewAudio.onerror = () => {
                    btn.innerText = '▶ Escuchar';
                    btn.classList.remove('is-playing');
                    previewingStoreAudioId = null;
                };
                await currentPreviewAudio.play();
            } catch (err) {
                console.warn('Error al reproducir audio de almacén:', err);
            }
        });
    });

    audioStoreList.querySelectorAll('.btn-audio-rename').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            const card = btn.closest('.audio-item-card');
            const nameEl = card.querySelector('.audio-item-name');
            const currentName = nameEl ? nameEl.innerText : '';
            const newName = prompt('Nuevo nombre para este audio:', currentName);
            if (newName && newName.trim() && newName.trim() !== currentName) {
                await window.RosaryAudioStore.renameAudio(id, newName.trim());
                await renderAudioStoreList();
                await renderSyncItems(activeSyncLang, activeSyncMystery);
                showRosaryToast('✏️ Audio renombrado.');
            }
        });
    });

    audioStoreList.querySelectorAll('.btn-audio-del').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (confirm('¿Eliminar este audio del almacén?')) {
                await window.RosaryAudioStore.deleteAudio(id);
                await renderAudioStoreList();
                await renderSyncItems(activeSyncLang, activeSyncMystery);
                showRosaryToast('🗑️ Audio eliminado del almacén.');
            }
        });
    });
}

// Procesa archivos subidos (desde input o dropzone)
async function processUploadedAudioFiles(fileList) {
    if (!fileList || fileList.length === 0 || !window.RosaryAudioStore) return;
    let savedCount = 0;

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|aac|flac)$/i.test(file.name)) {
            try {
                await window.RosaryAudioStore.saveAudio(file);
                savedCount++;
            } catch (e) {
                console.warn('Error al guardar archivo:', file.name, e);
            }
        }
    }

    if (savedCount > 0) {
        await renderAudioStoreList();
        await renderSyncItems(activeSyncLang, activeSyncMystery);
        showRosaryToast(`📥 ${savedCount} audio(s) guardado(s) exitosamente en el almacén.`);
    } else {
        showRosaryToast('⚠️ No se encontraron archivos de audio compatibles.');
    }
}

// Auto-asignación inteligente de audios del almacén
async function handleAutoAssign() {
    if (!window.RosaryAudioStore || !window.RosaryAudioAssignments) return;
    const allAudios = await window.RosaryAudioStore.getAllAudios();
    if (allAudios.length === 0) {
        showRosaryToast('⚠️ El almacén está vacío. Sube audios primero.');
        return;
    }

    const structure = getRosaryStructureDefinition(activeSyncLang, activeSyncMystery);
    const flatItems = [];
    structure.forEach(s => s.items.forEach(it => flatItems.push(it)));

    const res = window.RosaryAudioAssignments.autoAssign(activeSyncLang, activeSyncMystery, allAudios, flatItems);
    await renderSyncItems(activeSyncLang, activeSyncMystery);
    showRosaryToast(`⚡ ¡${res.assignedCount} oraciones auto-asignadas para ${activeSyncMystery}!`);
}

// Descarga y exportación concatenada del Rosario Completo en un solo archivo WAV
async function handleExportRosaryAudio() {
    if (!window.RosaryAudioExporter || !window.RosaryAudioAssignments) {
        showRosaryToast('⚠️ Módulo exportador no disponible.');
        return;
    }

    const structure = getRosaryStructureDefinition(activeSyncLang, activeSyncMystery);
    const flatItems = [];
    structure.forEach(s => s.items.forEach(it => flatItems.push(it)));

    const assignments = window.RosaryAudioAssignments.getAssignments(activeSyncLang, activeSyncMystery);
    const hasAny = flatItems.some(it => !!assignments[it.key]);

    if (!hasAny) {
        showRosaryToast('⚠️ Asigna al menos un audio a una oración antes de descargar.');
        return;
    }

    const btns = [btnSyncDownloadFull, btnSyncDownloadFullFooter].filter(Boolean);
    btns.forEach(b => {
        b.disabled = true;
        b.dataset.prevText = b.innerText;
        b.innerText = '⏳ Exportando...';
    });

    try {
        showRosaryToast('📥 Preparando y concatenando audios en orden litúrgico...');
        const wavBlob = await window.RosaryAudioExporter.exportRosaryAudio(
            flatItems,
            assignments,
            (curr, total, title) => {
                if (syncStatusMsg) {
                    syncStatusMsg.innerHTML = `📥 Concatenando (${curr}/${total}): <strong>${title}</strong>`;
                }
            }
        );

        const fileName = `Santo_Rosario_${activeSyncMystery}_${activeSyncLang.toUpperCase()}.wav`;
        const downloadUrl = URL.createObjectURL(wavBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

        showRosaryToast(`🎉 ¡Rosario completo descargado! Archivo: ${fileName}`);
        if (syncStatusMsg) {
            syncStatusMsg.innerHTML = `✅ <strong>${fileName}</strong> generado y descargado exitosamente.`;
        }
    } catch (err) {
        console.error('Error al exportar Rosario:', err);
        showRosaryToast('❌ ' + (err.message || 'Error al exportar el archivo'));
    } finally {
        btns.forEach(b => {
            b.disabled = false;
            b.innerText = b.dataset.prevText || '📥 Descargar Rosario (.wav)';
        });
    }
}

// Configuración de eventos de UI para Modo de Audio y Almacén
function setupAudioStoreAndModeEvents() {
    // 1. Selector de Modo: Segmentado vs Continuo
    if (syncModeSegmentedBtn) {
        syncModeSegmentedBtn.addEventListener('click', () => {
            activeSyncAudioMode = 'segmented';
            localStorage.setItem('rosary_sync_mode', 'segmented');
            syncModeSegmentedBtn.classList.add('active');
            if (syncModeTimeBtn) syncModeTimeBtn.classList.remove('active');
            if (syncTipBox) {
                syncTipBox.innerHTML = '💡 <strong>Modo Audios Segmentados:</strong> Selecciona en el menú de cada fila el audio que le corresponde a esa oración (Padre Nuestro, Ave María, Gloria...). Se reproducirá de forma continua como un solo audio sin desajustes. También puedes pulsar <strong>«📥 Descargar Rosario (.wav)»</strong> para unificar todos los audios en un solo archivo descargable.';
            }
            renderSyncItems(activeSyncLang, activeSyncMystery);
        });
    }

    if (syncModeTimeBtn) {
        syncModeTimeBtn.addEventListener('click', () => {
            activeSyncAudioMode = 'time';
            localStorage.setItem('rosary_sync_mode', 'time');
            syncModeTimeBtn.classList.add('active');
            if (syncModeSegmentedBtn) syncModeSegmentedBtn.classList.remove('active');
            if (syncTipBox) {
                syncTipBox.innerHTML = '💡 <strong>Modo Continuo por Tiempos:</strong> Da clic en <strong>«▶»</strong> para escuchar el audio. Cuando empiece la oración o cuenta deseada, pulsa <strong>«⏱️ Ahora»</strong> en su fila para fijar el tiempo exacto.';
            }
            renderSyncItems(activeSyncLang, activeSyncMystery);
        });
    }

    // 2. Abrir / Cerrar Almacén de Audios
    if (btnOpenAudioStore) btnOpenAudioStore.addEventListener('click', openAudioStoreModal);
    if (audioStoreModalClose) audioStoreModalClose.addEventListener('click', closeAudioStoreModal);
    if (btnAudioStoreDone) btnAudioStoreDone.addEventListener('click', closeAudioStoreModal);

    // 3. Dropzone & File Input del Almacén
    if (audioStoreDropzone && audioStoreFileInput) {
        audioStoreDropzone.addEventListener('click', (e) => {
            if (e.target !== audioStoreFileInput) audioStoreFileInput.click();
        });

        audioStoreFileInput.addEventListener('change', () => {
            processUploadedAudioFiles(audioStoreFileInput.files);
            audioStoreFileInput.value = '';
        });

        audioStoreDropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            audioStoreDropzone.classList.add('dragover');
        });
        audioStoreDropzone.addEventListener('dragleave', () => {
            audioStoreDropzone.classList.remove('dragover');
        });
        audioStoreDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            audioStoreDropzone.classList.remove('dragover');
            if (e.dataTransfer && e.dataTransfer.files) {
                processUploadedAudioFiles(e.dataTransfer.files);
            }
        });
    }

    // 4. Auto-asignar audios
    if (btnSyncAutoAssign) btnSyncAutoAssign.addEventListener('click', handleAutoAssign);
    if (btnStoreAutoAssign) btnStoreAutoAssign.addEventListener('click', handleAutoAssign);

    // 5. Vaciar Almacén
    if (btnStoreClearAll) {
        btnStoreClearAll.addEventListener('click', async () => {
            if (confirm('¿Estás seguro de que deseas vaciar todos los audios del almacén? Esta acción no se puede deshacer.')) {
                const audios = await window.RosaryAudioStore.getAllAudios();
                for (const a of audios) {
                    await window.RosaryAudioStore.deleteAudio(a.id);
                }
                await renderAudioStoreList();
                await renderSyncItems(activeSyncLang, activeSyncMystery);
                showRosaryToast('🗑️ Almacén vaciado.');
            }
        });
    }

    // 6. Descargar Rosario completo
    if (btnSyncDownloadFull) btnSyncDownloadFull.addEventListener('click', handleExportRosaryAudio);
    if (btnSyncDownloadFullFooter) btnSyncDownloadFullFooter.addEventListener('click', handleExportRosaryAudio);
}

// Inicializar eventos de almacén al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAudioStoreAndModeEvents);
} else {
    setupAudioStoreAndModeEvents();
}


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
                if (recordingTimer) recordingTimer.innerText = `${mm}:${ss}`;
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
        const fileName = `Santo_Rosario_${currentMystery}_Grabacion_YouTube.webm`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        showRosaryToast(`🎉 ¡Grabación de video completada! Guardado como ${fileName}`);
    }
}

// C. TEMAS SAGRADOS Y TAMAÑO DE IMAGEN DE LOS MISTERIOS
function setupThemesAndAppearance() {
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) document.body.setAttribute('data-theme', theme);
        try { localStorage.setItem('rosary_active_theme', theme); } catch (e) {}
        const radio = document.querySelector(`input[name="rosary-theme"][value="${theme}"]`);
        if (radio) radio.checked = true;
    }

    const savedTheme = localStorage.getItem('rosary_active_theme') || 'dark';
    applyTheme(savedTheme);

    document.querySelectorAll('input[name="rosary-theme"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                applyTheme(e.target.value);
                const themeName = e.target.parentElement.querySelector('.theme-name')?.innerText || e.target.value;
                showRosaryToast(`🎨 Tema visual aplicado: ${themeName}`);
            }
        });
    });

    function applyMysteryImageSize(size) {
        document.documentElement.style.setProperty('--mystery-thumb-size', `${size}px`);
        try { localStorage.setItem('rosary_mystery_image_size', size); } catch (e) {}
        const radio = document.querySelector(`input[name="mystery-image-size"][value="${size}"]`);
        if (radio) radio.checked = true;
    }

    const savedSize = localStorage.getItem('rosary_mystery_image_size') || '200';
    applyMysteryImageSize(savedSize);

    document.querySelectorAll('input[name="mystery-image-size"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                applyMysteryImageSize(e.target.value);
                showRosaryToast(`🖼️ Tamaño de imagen: ${e.target.value}px`);
            }
        });
    });
}

// D. MODAL DE PERFIL, AUTENTICACIÓN GOOGLE Y PERMISOS
function setupAuthAndPermissions() {
    const getModal = () => document.getElementById('user-profile-modal');
    const getBtnProfile = () => document.getElementById('btn-auth-profile');
    const getCloseBtn = () => document.getElementById('profile-modal-close') || document.getElementById('user-profile-modal-close');
    const getDoneBtn = () => document.getElementById('btn-profile-close');

    const btn = getBtnProfile();
    if (btn) {
        btn.addEventListener('click', () => {
            const m = getModal();
            if (m) {
                m.classList.add('open');
            }
        });
    }

    const closeProfileModal = () => {
        const m = getModal();
        if (m) m.classList.remove('open');
    };

    const cBtn = getCloseBtn();
    if (cBtn) cBtn.addEventListener('click', closeProfileModal);
    const dBtn = getDoneBtn();
    if (dBtn) dBtn.addEventListener('click', closeProfileModal);

    // -------------------------------------------------------------------------
    // Limpieza de Caché y Carga Completa desde la Nube (Firestore)
    // -------------------------------------------------------------------------
    const btnClearCache = document.getElementById('btn-profile-clear-cache');
    const btnLoadAll = document.getElementById('btn-profile-load-all');
    const profileDataStatusMsg = document.getElementById('profile-data-status-msg');

    if (btnClearCache) {
        btnClearCache.addEventListener('click', async () => {
            const confirmClear = confirm('🧹 ¿Deseas limpiar la caché local y restablecer los datos temporales del navegador?\n\nLa página se recargará automáticamente para obtener la versión oficial más reciente desde la nube.');
            if (!confirmClear) return;

            btnClearCache.disabled = true;
            btnClearCache.style.opacity = '0.7';
            if (profileDataStatusMsg) {
                profileDataStatusMsg.innerHTML = '<span style="color: #f87171; font-weight: bold;">🧹 Limpiando caché y almacenamiento local...</span>';
            }
            showRosaryToast('🧹 Limpiando caché local del navegador...');

            // 1. Limpiar localStorage de claves temporales del rosario
            const keysToRemove = [
                'rosary_custom_times_v1',
                'rosary_custom_prayers_v1',
                'rosary_custom_item_content_v1',
                'rosary_segmented_audio_assignments_v1',
                'rosary_voices_v1',
                'rosary_active_voice_id',
                'rosary_default_voice_id',
                'rosary_deleted_audio_ids_v1',
                'rosary_sync_mode',
                'rosary_audio_version'
            ];
            keysToRemove.forEach(k => {
                try { localStorage.removeItem(k); } catch (e) {}
            });

            // 2. Limpiar CacheStorage API si está soportada
            if (typeof window !== 'undefined' && 'caches' in window) {
                try {
                    const cacheNames = await caches.keys();
                    await Promise.all(cacheNames.map(name => caches.delete(name)));
                } catch (e) {}
            }

            // 3. Limpiar sessionStorage
            try { sessionStorage.clear(); } catch (e) {}

            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
    }

    if (btnLoadAll) {
        btnLoadAll.addEventListener('click', async () => {
            if (btnLoadAll.disabled) return;
            btnLoadAll.disabled = true;
            const titleEl = btnLoadAll.querySelector('.btn-data-title');
            const originalTitle = titleEl ? titleEl.innerText : 'Cargar Todo';
            if (titleEl) titleEl.innerText = '⏳ Cargando todo...';
            if (profileDataStatusMsg) {
                profileDataStatusMsg.innerHTML = '<span style="color: #93c5fd; font-weight: bold;">☁️ Descargando voces, audios, oraciones y tiempos desde Cloud Firestore...</span>';
            }
            showRosaryToast('☁️ Descargando toda la configuración oficial desde la nube...');

            try {
                if (window.RosaryCloud) {
                    const [cloudVoices, cloudAssignments, cloudTimes, cloudPrayers, cloudContent] = await Promise.all([
                        window.RosaryCloud.loadVoicesFromCloud ? window.RosaryCloud.loadVoicesFromCloud() : null,
                        window.RosaryCloud.loadAllAssignmentsFromCloud ? window.RosaryCloud.loadAllAssignmentsFromCloud() : null,
                        window.RosaryCloud.loadAllTimesFromCloud ? window.RosaryCloud.loadAllTimesFromCloud() : null,
                        window.RosaryCloud.loadAllPrayersFromCloud ? window.RosaryCloud.loadAllPrayersFromCloud() : null,
                        window.RosaryCloud.loadAllContentFromCloud ? window.RosaryCloud.loadAllContentFromCloud() : null
                    ]);

                    // 1. Aplicar voces
                    if (cloudVoices && window.RosaryVoices && typeof window.RosaryVoices.loadFromCloudData === 'function') {
                        window.RosaryVoices.loadFromCloudData(cloudVoices);
                        if (typeof window.refreshVoiceSelects === 'function') {
                            window.refreshVoiceSelects();
                        }
                    }

                    // 2. Aplicar asignaciones segmentadas
                    if (cloudAssignments && typeof localStorage !== 'undefined') {
                        const STORAGE_KEY = 'rosary_segmented_audio_assignments_v1';
                        const raw = localStorage.getItem(STORAGE_KEY);
                        const local = raw ? JSON.parse(raw) : {};
                        for (const l in cloudAssignments) {
                            if (!local[l]) local[l] = {};
                            for (const m in cloudAssignments[l]) {
                                local[l][m] = Object.assign({}, local[l][m] || {}, cloudAssignments[l][m]);
                            }
                        }
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(local));
                    }

                    // 3. Aplicar tiempos
                    if (cloudTimes && typeof localStorage !== 'undefined') {
                        const raw = localStorage.getItem('rosary_custom_times_v1');
                        const local = raw ? JSON.parse(raw) : {};
                        for (const l in cloudTimes) {
                            if (!local[l]) local[l] = {};
                            for (const m in cloudTimes[l]) {
                                local[l][m] = Object.assign({}, local[l][m] || {}, cloudTimes[l][m]);
                                if (typeof audioData !== 'undefined' && audioData[l] && audioData[l][m]) {
                                    audioData[l][m].customTimes = Object.assign({}, audioData[l][m].customTimes || {}, cloudTimes[l][m]);
                                }
                            }
                        }
                        localStorage.setItem('rosary_custom_times_v1', JSON.stringify(local));
                    }

                    // 4. Aplicar oraciones
                    if (cloudPrayers && typeof localStorage !== 'undefined') {
                        const raw = localStorage.getItem('rosary_custom_prayers_v1');
                        const local = raw ? JSON.parse(raw) : {};
                        for (const l in cloudPrayers) {
                            local[l] = Object.assign({}, local[l] || {}, cloudPrayers[l]);
                        }
                        localStorage.setItem('rosary_custom_prayers_v1', JSON.stringify(local));
                    }

                    // 5. Aplicar contenidos personalizados de cuentas
                    if (cloudContent && typeof localStorage !== 'undefined') {
                        const raw = localStorage.getItem('rosary_custom_item_content_v1');
                        const local = raw ? JSON.parse(raw) : {};
                        for (const l in cloudContent) {
                            if (!local[l]) local[l] = {};
                            for (const m in cloudContent[l]) {
                                if (!local[l][m]) local[l] = {};
                                for (const k in cloudContent[l][m]) {
                                    if (cloudContent[l][m][k]) {
                                        local[l][m][k] = Object.assign({}, local[l][m][k] || {}, cloudContent[l][m][k]);
                                    }
                                }
                            }
                        }
                        localStorage.setItem('rosary_custom_item_content_v1', JSON.stringify(local));
                    }

                    // 6. Refrescar toda la interfaz activa
                    if (typeof window.refreshActiveTimeline === 'function') window.refreshActiveTimeline();
                    if (typeof window.refreshActivePrayersUI === 'function') window.refreshActivePrayersUI();
                    if (typeof window.refreshSyncModalTimesUI === 'function') window.refreshSyncModalTimesUI();
                    if (typeof window.refreshSyncModalContentUI === 'function') window.refreshSyncModalContentUI();

                    const currentL = (typeof syncLangSelect !== 'undefined' && syncLangSelect) ? syncLangSelect.value : (langSelect ? langSelect.value : 'es');
                    const currentM = (typeof syncMysterySelect !== 'undefined' && syncMysterySelect) ? syncMysterySelect.value : (currentMystery || 'Gozosos');
                    if (typeof window.renderSyncItems === 'function') {
                        await window.renderSyncItems(currentL, currentM);
                    }

                    if (titleEl) titleEl.innerText = '✅ ¡Todo cargado!';
                    if (profileDataStatusMsg) {
                        profileDataStatusMsg.innerHTML = '<span style="color: #4ade80; font-weight: bold;">✅ ¡Toda la configuración oficial (voces, audios, tiempos y oraciones) ha sido sincronizada desde la nube!</span>';
                    }
                    showRosaryToast('☁️ ¡Todo cargado y sincronizado desde la nube con éxito!');
                } else {
                    throw new Error('Servicio en la nube no conectado');
                }
            } catch (err) {
                console.error('Error al cargar todo desde Firestore:', err);
                if (titleEl) titleEl.innerText = '❌ Error al cargar';
                if (profileDataStatusMsg) {
                    profileDataStatusMsg.innerHTML = `<span style="color: #f87171; font-weight: bold;">❌ Error al sincronizar: ${err.message || 'Sin conexión'}</span>`;
                }
                showRosaryToast('❌ Error al cargar desde la nube');
            } finally {
                setTimeout(() => {
                    btnLoadAll.disabled = false;
                    if (titleEl) titleEl.innerText = originalTitle;
                }, 3000);
            }
        });
    }

    if (btnGoogleSignin) {
        btnGoogleSignin.addEventListener('click', async () => {
            try {
                if (window.RosaryAuth && window.RosaryAuth.loginWithGoogle) {
                    showRosaryToast('Iniciando sesión con Google...');
                    const res = await window.RosaryAuth.loginWithGoogle();
                    if (res && res.user) {
                        handleAuthStateChange(res.user);
                    }
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
                    handleAuthStateChange(null);
                    showRosaryToast('Sesión cerrada.');
                }
            } catch (err) {
                console.error('Error al cerrar sesión:', err);
            }
        });
    }

    // Escuchar evento personalizado global de autenticación
    window.addEventListener('rosary-auth-changed', (e) => {
        const u = e.detail ? e.detail.user : null;
        handleAuthStateChange(u);
    });

    if (window.RosaryAuth && window.RosaryAuth.onAuthStateChanged) {
        window.RosaryAuth.onAuthStateChanged(user => {
            handleAuthStateChange(user);
        });
    } else {
        const curUser = window.RosaryAuth ? window.RosaryAuth.getCurrentUser() : null;
        handleAuthStateChange(curUser);
    }
}

function handleAuthStateChange(user) {
    const isAdmin = window.RosaryAuth ? window.RosaryAuth.checkIsAdmin(user) : false;

    const emailEl = document.getElementById('auth-modal-email') || document.getElementById('auth-user-email');
    const badgeEl = document.getElementById('auth-modal-badge') || document.getElementById('auth-role-badge');
    const nameEl = document.getElementById('auth-modal-name');
    const signinBtn = document.getElementById('btn-google-signin');
    const signoutBtn = document.getElementById('btn-google-signout');

    if (user && isAdmin) {
        document.body.classList.remove('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Admin';
        if (authAvatarIcon) authAvatarIcon.innerText = '👑';
        if (nameEl) nameEl.innerText = user.displayName || 'dbaezh78@gmail.com';
        if (emailEl) emailEl.innerText = user.email || 'dbaezh78@gmail.com';
        if (badgeEl) {
            badgeEl.innerText = '👑 Administrador (Control Total)';
            badgeEl.className = 'auth-modal-badge admin';
        }
        if (signinBtn) signinBtn.style.display = 'none';
        if (signoutBtn) signoutBtn.style.display = 'inline-block';
        showRosaryToast('👑 Administrador verificado (' + (user.email || 'dbaezh78@gmail.com') + '). Control total activado.');
    } else if (user) {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Visitante';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (nameEl) nameEl.innerText = user.displayName || 'Visitante';
        if (emailEl) emailEl.innerText = user.email;
        if (badgeEl) {
            badgeEl.innerText = '👁️ Visitante (Solo Lectura)';
            badgeEl.className = 'auth-modal-badge visitor';
        }
        if (signinBtn) signinBtn.style.display = 'none';
        if (signoutBtn) signoutBtn.style.display = 'inline-block';
    } else {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Acceder';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (nameEl) nameEl.innerText = 'Visitante';
        if (emailEl) emailEl.innerText = 'Modo lectura (Puedes orar y escuchar libremente)';
        if (badgeEl) {
            badgeEl.innerText = '👁️ Solo Lectura';
            badgeEl.className = 'auth-modal-badge visitor';
        }
        if (signinBtn) signinBtn.style.display = 'inline-flex';
        if (signoutBtn) signoutBtn.style.display = 'none';
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
            showRosaryToast(`Versión cambiada a: ${audioVersion === 'v1' ? '🟡 Versión 1 (Cruz Amarilla)' : '🔴 Versión 2 (Cruz Roja · Original)'}`);
        });
    }
}

// F. CONTROLES DE COLAPSO Y EXPANSIÓN DE LA BARRA DE HERRAMIENTAS DEL SINCRONIZADOR
function setupSyncToolbarCollapse() {
    const btnToggleSyncToolbar = document.getElementById('btn-toggle-sync-toolbar');
    const syncToolbarCollapsible = document.getElementById('sync-toolbar-collapsible');
    const syncToolbarToggleIcon = document.getElementById('sync-toolbar-toggle-icon');
    const syncToolbarToggleText = document.getElementById('sync-toolbar-toggle-text');

    if (btnToggleSyncToolbar && syncToolbarCollapsible) {
        btnToggleSyncToolbar.addEventListener('click', () => {
            const isCollapsed = syncToolbarCollapsible.classList.toggle('collapsed');
            if (syncToolbarToggleIcon) syncToolbarToggleIcon.innerText = isCollapsed ? '▾' : '▴';
            if (syncToolbarToggleText) syncToolbarToggleText.innerText = isCollapsed ? 'Mostrar Opciones y Controles' : 'Ocultar Opciones y Controles';
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('rosary_sync_toolbar_collapsed', isCollapsed ? '1' : '0');
                }
            } catch (e) {}
        });

        // Recordar preferencia del usuario o colapsar automáticamente en pantallas móviles
        try {
            if (typeof localStorage !== 'undefined' && localStorage.getItem('rosary_sync_toolbar_collapsed') === '1') {
                syncToolbarCollapsible.classList.add('collapsed');
                if (syncToolbarToggleIcon) syncToolbarToggleIcon.innerText = '▾';
                if (syncToolbarToggleText) syncToolbarToggleText.innerText = 'Mostrar Opciones y Controles';
            }
        } catch (e) {}
    }
}

// G. MODAL Y CONTROLADOR DE INCLINACIÓN DE LA VIRGEN EN EL GLORIA
function setupVirginBowModal() {
    const modal = document.getElementById('virgin-bow-modal');
    const btnOpenHeader = document.getElementById('btn-open-virgin-bow-modal');
    const btnOpenTool = document.getElementById('btn-open-virgin-bow-modal-tool');
    const btnClose = document.getElementById('virgin-bow-modal-close');
    const btnSave = document.getElementById('btn-save-virgin-bow');
    const btnReset = document.getElementById('btn-reset-virgin-bow');
    const btnTest = document.getElementById('btn-test-virgin-bow');

    const inputIntroStart = document.getElementById('virgin-bow-intro-start');
    const inputIntroDur = document.getElementById('virgin-bow-intro-dur');
    const inputMysteryAnticipation = document.getElementById('virgin-bow-mystery-anticipation');
    const inputMysteryDur = document.getElementById('virgin-bow-mystery-dur');
    const endPreview = document.getElementById('virgin-bow-intro-end-preview');
    const demoImg = document.getElementById('virgin-bow-demo-img');
    const statusPill = document.getElementById('virgin-bow-status-pill');

    function updateEndPreview() {
        if (!inputIntroStart || !inputIntroDur || !endPreview) return;
        const start = parseFloat(inputIntroStart.value) || 8.0;
        const dur = parseFloat(inputIntroDur.value) || 4.5;
        const end = Math.round((start + dur) * 10) / 10;
        endPreview.innerText = `${end}s`;
    }

    function populateFields() {
        const cfg = getVirginBowConfig();
        if (inputIntroStart) inputIntroStart.value = cfg.introStartSec;
        if (inputIntroDur) inputIntroDur.value = cfg.introDurationSec;
        if (inputMysteryAnticipation) inputMysteryAnticipation.value = cfg.mysteryAnticipationSec;
        if (inputMysteryDur) inputMysteryDur.value = cfg.mysteryDurationSec;
        updateEndPreview();
    }

    function openModal() {
        populateFields();
        if (modal) modal.classList.add('open');
    }

    function closeModal() {
        if (modal) modal.classList.remove('open');
    }

    if (btnOpenHeader) btnOpenHeader.addEventListener('click', openModal);
    if (btnOpenTool) btnOpenTool.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);

    // Cerrar al hacer clic en el backdrop
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Delegación para botones en filas del sincronizador
    document.addEventListener('click', (e) => {
        const btnRow = e.target.closest('.btn-sync-open-virgin-bow');
        if (btnRow) {
            openModal();
        }
    });

    // Step buttons (-0.5s, +0.5s)
    modal?.querySelectorAll('.btn-bow-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const delta = parseFloat(btn.getAttribute('data-delta')) || 0;
            const input = document.getElementById(targetId);
            if (input) {
                let curVal = parseFloat(input.value) || 0;
                curVal = Math.max(0, Math.round((curVal + delta) * 10) / 10);
                input.value = curVal;
                updateEndPreview();
            }
        });
    });

    if (inputIntroStart) inputIntroStart.addEventListener('input', updateEndPreview);
    if (inputIntroDur) inputIntroDur.addEventListener('input', updateEndPreview);

    // Botón Probar en Vivo
    let testTimeout = null;
    if (btnTest) {
        btnTest.addEventListener('click', () => {
            const dur = (inputMysteryDur ? parseFloat(inputMysteryDur.value) : 4.5) || 4.5;
            btnTest.disabled = true;
            btnTest.innerText = `⏳ Inclinada (${dur}s)...`;
            if (statusPill) {
                statusPill.innerText = "Inclinada ante la Santísima Trinidad";
                statusPill.classList.add('is-bowing');
            }
            if (demoImg) {
                demoImg.src = "src/img/rosario_virgen_gold_gloria.png";
            }
            // Inclinar también la Virgen en el Rosario de fondo
            setVirginBow(true);

            if (testTimeout) clearTimeout(testTimeout);
            testTimeout = setTimeout(() => {
                setVirginBow(false);
                if (demoImg) demoImg.src = "src/img/rosario_virgen_gold.png";
                if (statusPill) {
                    statusPill.innerText = "Cabeza Erguida";
                    statusPill.classList.remove('is-bowing');
                }
                if (btnTest) {
                    btnTest.disabled = false;
                    btnTest.innerText = "👁️ Probar Inclinación en Vivo";
                }
            }, dur * 1000);
        });
    }

    // Botón Restablecer
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            saveVirginBowConfig(DEFAULT_VIRGIN_BOW_CONFIG);
            populateFields();
            showRosaryToast('Valores litúrgicos recomendados restablecidos');
        });
    }

    // Botón Guardar
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const newCfg = {
                introStartSec: parseFloat(inputIntroStart?.value) || DEFAULT_VIRGIN_BOW_CONFIG.introStartSec,
                introDurationSec: parseFloat(inputIntroDur?.value) || DEFAULT_VIRGIN_BOW_CONFIG.introDurationSec,
                mysteryAnticipationSec: parseFloat(inputMysteryAnticipation?.value) || DEFAULT_VIRGIN_BOW_CONFIG.mysteryAnticipationSec,
                mysteryDurationSec: parseFloat(inputMysteryDur?.value) || DEFAULT_VIRGIN_BOW_CONFIG.mysteryDurationSec
            };
            saveVirginBowConfig(newCfg);
            showRosaryToast('🌹 Tiempos de reverencia de la Virgen guardados con éxito');
            closeModal();
            // Actualizar interfaz del sincronizador
            document.querySelectorAll('.btn-sync-open-virgin-bow .virgin-bow-badge-text').forEach(el => {
                el.innerText = `Gloria: ${newCfg.introStartSec}s`;
            });
            if (typeof renderSyncItems === 'function' && typeof activeSyncLang !== 'undefined' && typeof activeSyncMystery !== 'undefined') {
                renderSyncItems(activeSyncLang, activeSyncMystery);
            }
        });
    }
}

// H. SISTEMA DE GESTIÓN Y ASIGNACIÓN DE VOCES LITÚRGICAS (VOICE PROFILES)
function setupVoiceManagement() {
    const headerVoiceSelect = document.getElementById('voice-select');
    const syncVoiceSelect = document.getElementById('sync-voice-select');
    const btnCreateVoice = document.getElementById('btn-create-voice');
    const btnConfigVoice = document.getElementById('btn-config-voice');
    const btnSetDefaultVoice = document.getElementById('btn-set-default-voice');
    const btnDeleteVoice = document.getElementById('btn-delete-voice');

    const voiceModal = document.getElementById('voice-config-modal');
    const voiceModalClose = document.getElementById('voice-config-modal-close');
    const voiceNameInput = document.getElementById('voice-config-name-input');
    const voiceDefaultChk = document.getElementById('voice-config-is-default-chk');
    const btnVoiceAutoAssign = document.getElementById('btn-voice-auto-assign');
    const btnVoiceConfigSave = document.getElementById('btn-voice-config-save');
    const voiceSubtitle = document.getElementById('voice-config-modal-subtitle');

    const voicePreviewAudio = new Audio();
    let currentEditingVoiceId = null;

    function stopVoicePreview() {
        try {
            voicePreviewAudio.pause();
            voicePreviewAudio.currentTime = 0;
        } catch (e) {}
        document.querySelectorAll('.btn-voice-test-play').forEach(b => {
            b.classList.remove('is-playing');
            b.innerText = '▶';
        });
    }

    voicePreviewAudio.addEventListener('ended', stopVoicePreview);
    voicePreviewAudio.addEventListener('error', stopVoicePreview);

    function refreshVoiceSelects() {
        if (!window.RosaryVoices) return;
        const voices = window.RosaryVoices.getVoices();
        const activeId = window.RosaryVoices.getActiveVoiceId();
        const defaultId = window.RosaryVoices.getDefaultVoiceId();

        if (headerVoiceSelect) {
            headerVoiceSelect.innerHTML = '';
            voices.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.id;
                const isDef = (v.id === defaultId);
                let label = v.name;
                if (v.id === 'voice_default') label = 'Voz Oficial';
                opt.textContent = isDef ? `${label} ⭐` : label;
                headerVoiceSelect.appendChild(opt);
            });
            headerVoiceSelect.value = activeId;
        }

        if (syncVoiceSelect) {
            syncVoiceSelect.innerHTML = '';
            voices.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.id;
                const isDef = (v.id === defaultId);
                opt.textContent = `${v.name}${isDef ? ' (⭐ Por Defecto)' : ''}`;
                syncVoiceSelect.appendChild(opt);
            });
            syncVoiceSelect.value = activeId;
        }
    }

    async function handleVoiceChange(newId) {
        if (!window.RosaryVoices) return;
        window.RosaryVoices.setActiveVoiceId(newId);
        refreshVoiceSelects();
        const v = window.RosaryVoices.getVoice(newId);
        if (typeof showRosaryToast === 'function') {
            showRosaryToast(`🎙️ Voz seleccionada: ${v.name}`);
        }
        if (typeof renderSyncItems === 'function' && typeof activeSyncLang !== 'undefined' && typeof activeSyncMystery !== 'undefined') {
            await renderSyncItems(activeSyncLang, activeSyncMystery);
        }
    }

    if (headerVoiceSelect) {
        headerVoiceSelect.addEventListener('change', (e) => handleVoiceChange(e.target.value));
    }
    if (syncVoiceSelect) {
        syncVoiceSelect.addEventListener('change', (e) => handleVoiceChange(e.target.value));
    }

    function findOptionValueForPrayer(sel, prayerKey, preferredVal, isMujerVoice) {
        if (!sel || !sel.options || sel.options.length <= 1) return '';

        // 1. Si preferredVal coincide con una opción existente, seleccionarlo directamente
        if (preferredVal) {
            for (let i = 0; i < sel.options.length; i++) {
                if (sel.options[i].value === preferredVal) {
                    return preferredVal;
                }
            }
            // Probar coincidencia por nombre o valor normalizado
            const normPref = (typeof normAudioStr === 'function') ? normAudioStr(preferredVal) : preferredVal.toLowerCase();
            for (let i = 0; i < sel.options.length; i++) {
                const opt = sel.options[i];
                if (opt.value) {
                    const normVal = (typeof normAudioStr === 'function') ? normAudioStr(opt.value) : opt.value.toLowerCase();
                    const normTxt = (typeof normAudioStr === 'function') ? normAudioStr(opt.textContent) : opt.textContent.toLowerCase();
                    if (normVal === normPref || normTxt === normPref) {
                        return opt.value;
                    }
                }
            }
        }

        // 2. Búsqueda por términos litúrgicos oficiales en las opciones reales del DOM
        const searchTerms = {
            crucifix_intro: ['sys_senaldelacruz', 'senaldelacruz', 'cruz'],
            credo: ['sys_credo', 'credo'],
            intro_pn: ['sys_sumopontifice', 'sumopontifice'],
            padre_nuestro: ['sys_padrenuestro', 'padrenuestro'],
            gloria: ['sys_gloria', 'gloria'],
            ave_maria: isMujerVoice ? ['sys_avemaria_m', 'avemariamujer', 'avemaria_m', 'avemaria'] : ['sys_avemaria', 'avemaria'],
            ave_maria_gloria: isMujerVoice ? ['sys_avemaria_gloria_m', 'avemariagloriamujer', 'avemariagloria_m', 'avemariagloria'] : ['sys_avemaria_gloria', 'avemariagloria'],
            pedir_gracia: ['sys_pedirgracia', 'pedirgracia', 'gracia'],
            salve: ['sys_diostesalve', 'diostesalve', 'salve'],
            letanias: ['sys_letanias', 'letanias'],
            oracion_final: ['sys_oracion', 'oracion']
        };

        const terms = searchTerms[prayerKey] || [];

        // Coincidencia exacta por ID de opción
        for (const term of terms) {
            for (let i = 0; i < sel.options.length; i++) {
                if (sel.options[i].value === term) {
                    return term;
                }
            }
        }

        // Coincidencia por texto legible de la opción en pantalla
        for (const term of terms) {
            const normT = (typeof normAudioStr === 'function') ? normAudioStr(term) : term.toLowerCase();
            for (let i = 0; i < sel.options.length; i++) {
                const opt = sel.options[i];
                if (!opt.value) continue;
                const normText = (typeof normAudioStr === 'function') ? normAudioStr(opt.textContent) : opt.textContent.toLowerCase();
                if (prayerKey === 'gloria' && normText.includes('ave')) continue;
                if (prayerKey === 'ave_maria' && normText.includes('gloria')) continue;

                if (normText === normT || normText.includes(normT) || normT.includes(normText)) {
                    return opt.value;
                }
            }
        }

        return '';
    }

    async function populateTemplateSelects(templates = {}) {
        const allAudios = window.RosaryAudioStore ? await window.RosaryAudioStore.getAllAudios() : [];
        const templateKeys = [
            'ave_maria', 'ave_maria_gloria', 'padre_nuestro', 'intro_pn',
            'gloria', 'credo', 'crucifix_intro', 'pedir_gracia',
            'salve', 'letanias', 'oracion_final'
        ];

        const isMujerVoice = (currentEditingVoiceId === 'voice_mujer');

        templateKeys.forEach(key => {
            const sel = document.getElementById(`voice-template-${key}`);
            if (!sel) return;
            sel.innerHTML = '';

            // Opción vacía o sin asignar
            const optNone = document.createElement('option');
            optNone.value = '';
            optNone.textContent = '-- Seleccionar Audio --';
            sel.appendChild(optNone);

            allAudios.forEach(aud => {
                const opt = document.createElement('option');
                opt.value = aud.id;
                const durStr = aud.duration ? ` (${Math.round(aud.duration)}s)` : '';
                opt.textContent = `🎵 ${aud.name}${durStr}`;
                sel.appendChild(opt);
            });

            // Encontrar y seleccionar el valor de opción correspondiente
            const chosenValue = findOptionValueForPrayer(sel, key, templates[key], isMujerVoice);
            sel.value = chosenValue;
        });

        // Configurar botones de reproducción de prueba
        document.querySelectorAll('.btn-voice-test-play').forEach(btn => {
            btn.onclick = async () => {
                const targetId = btn.getAttribute('data-target');
                const targetSel = document.getElementById(targetId);
                const audioId = targetSel ? targetSel.value : null;

                if (!audioId) {
                    if (typeof showRosaryToast === 'function') {
                        showRosaryToast('Selecciona primero un audio para reproducir');
                    }
                    return;
                }

                if (btn.classList.contains('is-playing')) {
                    stopVoicePreview();
                    return;
                }

                stopVoicePreview();
                if (window.RosaryAudioStore) {
                    try {
                        const url = await window.RosaryAudioStore.getAudioUrl(audioId);
                        if (url) {
                            voicePreviewAudio.src = url;
                            voicePreviewAudio.currentTime = 0;
                            await voicePreviewAudio.play();
                            btn.classList.add('is-playing');
                            btn.innerText = '⏹';
                        }
                    } catch (e) {
                        console.warn('[VoicePreview] Error al reproducir:', e);
                        stopVoicePreview();
                    }
                }
            };
        });
    }

    async function openVoiceConfigModal(voiceId) {
        if (!voiceModal || !window.RosaryVoices) return;
        stopVoicePreview();
        const v = window.RosaryVoices.getVoice(voiceId);
        if (!v) return;

        currentEditingVoiceId = voiceId;
        if (voiceNameInput) voiceNameInput.value = v.name;
        if (voiceDefaultChk) voiceDefaultChk.checked = (voiceId === window.RosaryVoices.getDefaultVoiceId());
        if (voiceSubtitle) voiceSubtitle.innerText = `Configura qué audio corresponde a cada oración para "${v.name}"`;

        await populateTemplateSelects(v.templates || {});
        voiceModal.classList.add('open');
        voiceModal.classList.add('is-visible');
    }

    function closeVoiceConfigModal() {
        stopVoicePreview();
        if (voiceModal) {
            voiceModal.classList.remove('open');
            voiceModal.classList.remove('is-visible');
        }
    }

    if (voiceModalClose) {
        voiceModalClose.addEventListener('click', closeVoiceConfigModal);
    }
    if (voiceModal) {
        voiceModal.addEventListener('click', (e) => {
            if (e.target === voiceModal) closeVoiceConfigModal();
        });
    }

    // Auto-asignar audios para la voz en edición
    if (btnVoiceAutoAssign) {
        btnVoiceAutoAssign.addEventListener('click', async () => {
            if (!currentEditingVoiceId || !window.RosaryVoices) return;
            const allAudios = window.RosaryAudioStore ? await window.RosaryAudioStore.getAllAudios() : [];
            const count = window.RosaryVoices.autoAssignToVoice(currentEditingVoiceId, allAudios);
            const updatedVoice = window.RosaryVoices.getVoice(currentEditingVoiceId);
            await populateTemplateSelects(updatedVoice.templates || {});
            if (typeof showRosaryToast === 'function') {
                showRosaryToast(`⚡ ¡${count} audios auto-asignados para esta voz!`);
            }
        });
    }

    // Guardar configuración de voz
    if (btnVoiceConfigSave) {
        btnVoiceConfigSave.addEventListener('click', async () => {
            if (!currentEditingVoiceId || !window.RosaryVoices) return;
            const allAudios = window.RosaryAudioStore ? await window.RosaryAudioStore.getAllAudios() : [];
            const templateKeys = [
                'ave_maria', 'ave_maria_gloria', 'padre_nuestro', 'intro_pn',
                'gloria', 'credo', 'crucifix_intro', 'pedir_gracia',
                'salve', 'letanias', 'oracion_final'
            ];
            const updatedTemplates = {};
            templateKeys.forEach(k => {
                const sel = document.getElementById(`voice-template-${k}`);
                if (sel && sel.value) {
                    let val = sel.value;
                    const audObj = allAudios.find(a => a.id === val);
                    if (audObj && window.SYSTEM_AUDIO_CATALOG) {
                        const nName = (typeof normAudioStr === 'function') ? normAudioStr(audObj.name) : audObj.name.toLowerCase();
                        const nFile = (typeof normAudioStr === 'function') ? normAudioStr(audObj.fileName ? audObj.fileName.replace(/\.[^/.]+$/, '') : '') : '';
                        const sysMatch = window.SYSTEM_AUDIO_CATALOG.find(s =>
                            s.id === val ||
                            normAudioStr(s.name) === nName ||
                            normAudioStr(s.fileName ? s.fileName.replace(/\.[^/.]+$/, '') : '') === nFile
                        );
                        if (sysMatch) {
                            val = sysMatch.id;
                        }
                    }
                    updatedTemplates[k] = val;
                }
            });

            const newName = voiceNameInput ? voiceNameInput.value.trim() : '';
            const isDef = voiceDefaultChk ? voiceDefaultChk.checked : false;

            window.RosaryVoices.updateVoice(currentEditingVoiceId, {
                name: newName,
                templates: updatedTemplates,
                isDefault: isDef
            });

            if (isDef) {
                window.RosaryVoices.setDefaultVoiceId(currentEditingVoiceId);
            }

            if (window.RosaryAudioAssignments && typeof window.RosaryAudioAssignments.clearVoiceRowOverrides === 'function') {
                window.RosaryAudioAssignments.clearVoiceRowOverrides(currentEditingVoiceId);
            }

            // Sincronizar de inmediato a Cloud Firestore para todos los navegadores y fieles
            if (window.RosaryCloud && typeof window.RosaryCloud.saveVoicesToCloud === 'function') {
                window.RosaryCloud.saveVoicesToCloud(
                    window.RosaryVoices.getVoices(),
                    window.RosaryVoices.getActiveVoiceId(),
                    window.RosaryVoices.getDefaultVoiceId()
                );
            }

            closeVoiceConfigModal();
            refreshVoiceSelects();

            if (typeof renderSyncItems === 'function' && typeof activeSyncLang !== 'undefined' && typeof activeSyncMystery !== 'undefined') {
                await renderSyncItems(activeSyncLang, activeSyncMystery);
            }
            if (typeof showRosaryToast === 'function') {
                showRosaryToast(`🎙️ Voz "${newName || 'Voz'}" guardada y aplicada con éxito.`);
            }
        });
    }

    // Crear nueva voz
    if (btnCreateVoice) {
        btnCreateVoice.addEventListener('click', () => {
            if (!window.RosaryVoices) return;
            const name = prompt('Nombre para el nuevo perfil de voz (ej: "Voz de David", "Voz de María"):', 'Voz Personalizada');
            if (name && name.trim()) {
                const newV = window.RosaryVoices.createVoice(name.trim());
                window.RosaryVoices.setActiveVoiceId(newV.id);
                refreshVoiceSelects();
                openVoiceConfigModal(newV.id);
                if (typeof showRosaryToast === 'function') {
                    showRosaryToast(`🎙️ Perfil de voz "${newV.name}" creado.`);
                }
            }
        });
    }

    // Configurar voz activa
    if (btnConfigVoice) {
        btnConfigVoice.addEventListener('click', () => {
            if (!window.RosaryVoices) return;
            openVoiceConfigModal(window.RosaryVoices.getActiveVoiceId());
        });
    }

    // Establecer como voz por defecto
    if (btnSetDefaultVoice) {
        btnSetDefaultVoice.addEventListener('click', () => {
            if (!window.RosaryVoices) return;
            const activeId = window.RosaryVoices.getActiveVoiceId();
            window.RosaryVoices.setDefaultVoiceId(activeId);
            refreshVoiceSelects();
            const v = window.RosaryVoices.getVoice(activeId);
            if (typeof showRosaryToast === 'function') {
                showRosaryToast(`⭐ "${v.name}" establecida como voz por defecto al iniciar.`);
            }
        });
    }

    // Eliminar perfil de voz
    if (btnDeleteVoice) {
        btnDeleteVoice.addEventListener('click', async () => {
            if (!window.RosaryVoices) return;
            const activeId = window.RosaryVoices.getActiveVoiceId();
            if (activeId === 'voice_default') {
                if (typeof showRosaryToast === 'function') {
                    showRosaryToast('⚠️ La Voz Oficial no se puede eliminar.');
                }
                return;
            }
            const v = window.RosaryVoices.getVoice(activeId);
            if (confirm(`¿Estás seguro de que deseas eliminar el perfil de voz "${v.name}"?`)) {
                window.RosaryVoices.deleteVoice(activeId);
                refreshVoiceSelects();
                if (typeof renderSyncItems === 'function' && typeof activeSyncLang !== 'undefined' && typeof activeSyncMystery !== 'undefined') {
                    await renderSyncItems(activeSyncLang, activeSyncMystery);
                }
                if (typeof showRosaryToast === 'function') {
                    showRosaryToast(`🗑️ Perfil de voz "${v.name}" eliminado.`);
                }
            }
        });
    }

    // Inicializar selectores de voz
    window.refreshVoiceSelects = refreshVoiceSelects;
    refreshVoiceSelects();
}

// Inicializar todas las nuevas funcionalidades
function initNewFeatures() {
    setupPlayerCollapseAndFloatingControls();
    setupScreenRecording();
    setupThemesAndAppearance();
    setupAuthAndPermissions();
    setupSyncVersionSelector();
    setupSyncToolbarCollapse();
    setupVirginBowModal();
    setupVoiceManagement();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewFeatures);
} else {
    initNewFeatures();
}
