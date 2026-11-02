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

// 3. ESTADO GLOBAL
let currentMystery = 'Gozosos';
let currentSteps = [];
let currentStepIndex = -1;
let currentFontSize = 1.18;
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
        <image href="src/img/rosario_virgen_gold.png" x="0" y="0" width="305" height="609" />
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
        const mData = audioData[lang][mysteryKey];
        currentSteps = generateDetailedTimeline(mysteryKey, mData, lang);

        audioPlayer.src = mData.src;
        audioPlayer.load();

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
    if (currentDayBadge) {
        currentDayBadge.innerText = (mysteryKey === todayMystery) ? `Hoy: ${todayMystery}` : `Día recomendado: ${todayMystery}`;
    }
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
        audioPlayer.currentTime = targetStep.s;
        audioPlayer.play().catch(() => {});
        updatePlayPauseButton(true);
    }
}

// 11. ACTUALIZAR TIEMPO Y SINCRONIZACIÓN DE AMBOS REPRODUCTORES
audioPlayer.addEventListener('timeupdate', () => {
    if (!currentSteps || currentSteps.length === 0) return;

    const curTime = audioPlayer.currentTime;
    const dur = audioPlayer.duration || currentSteps[currentSteps.length - 1].s + 60;
    const formattedCur = formatTime(curTime);
    const formattedDur = formatTime(dur);

    // Actualizar controles del reproductor principal
    if (!isSeeking && dur > 0) {
        const pct = (curTime / dur) * 100;
        if (seekSlider) seekSlider.value = pct;
        if (miniSeekSlider) miniSeekSlider.value = pct;

        if (currentTimeDisplay) currentTimeDisplay.innerText = formattedCur;
        if (totalTimeDisplay) totalTimeDisplay.innerText = formattedDur;
        if (miniTimeDisplay) miniTimeDisplay.innerText = `${formattedCur} / ${formattedDur}`;

        // Sincronizador de tiempos
        if (syncTimeCur) syncTimeCur.innerText = formattedCur;
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
}

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(err => {
            console.log("Error al reproducir audio:", err);
        });
    } else {
        audioPlayer.pause();
        updatePlayPauseButton(false);
    }
}

if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);
if (miniBtnPlayPause) miniBtnPlayPause.addEventListener('click', togglePlay);

audioPlayer.addEventListener('play', () => updatePlayPauseButton(true));
audioPlayer.addEventListener('pause', () => updatePlayPauseButton(false));

// Deslizadores de tiempo
function handleSeekInput() {
    isSeeking = true;
}
function handleSeekChange(sliderElem) {
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
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    });
}
if (btnSkipForward) {
    btnSkipForward.addEventListener('click', () => {
        const dur = audioPlayer.duration || 2000;
        audioPlayer.currentTime = Math.min(dur, audioPlayer.currentTime + 10);
    });
}

// Cuentas anterior / siguiente
function goPrevBead() {
    if (currentStepIndex > 0) {
        audioPlayer.currentTime = currentSteps[currentStepIndex - 1].s;
    }
}
function goNextBead() {
    if (currentStepIndex < currentSteps.length - 1) {
        audioPlayer.currentTime = currentSteps[currentStepIndex + 1].s;
    }
}

if (btnPrevBead) btnPrevBead.addEventListener('click', goPrevBead);
if (btnNextBead) btnNextBead.addEventListener('click', goNextBead);
if (miniBtnPrev) miniBtnPrev.addEventListener('click', goPrevBead);
if (miniBtnNext) miniBtnNext.addEventListener('click', goNextBead);

// Velocidad de reproducción
if (speedSelect) {
    speedSelect.addEventListener('change', () => {
        audioPlayer.playbackRate = parseFloat(speedSelect.value) || 1.0;
    });
}

// Clic en los 7 puntos de las decenas
decadeDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (!currentSteps) return;
        const step = currentSteps.find(s => s.decade === index);
        if (step) {
            audioPlayer.currentTime = step.s;
            audioPlayer.play().catch(() => {});
        }
    });
});

// Clic en selector de misterio
mysteryPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const mystery = pill.dataset.mystery;
        if (mystery) {
            loadMystery(mystery);
            audioPlayer.play().catch(() => {});
        }
    });
});

// Cambio de idioma
langSelect.addEventListener('change', () => {
    loadMystery(currentMystery);
});

// Controles de tamaño de fuente
if (btnFontPlus) {
    btnFontPlus.addEventListener('click', () => {
        currentFontSize = Math.min(1.7, currentFontSize + 0.1);
        document.documentElement.style.setProperty('--prayer-font-size', `${currentFontSize}rem`);
    });
}
if (btnFontMinus) {
    btnFontMinus.addEventListener('click', () => {
        currentFontSize = Math.max(0.9, currentFontSize - 0.1);
        document.documentElement.style.setProperty('--prayer-font-size', `${currentFontSize}rem`);
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

// Formateador de tiempo mm:ss
function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// =============================================================================
// 14. CONTROLADOR DEL FORMULARIO SINCRONIZADOR DE TIEMPOS
// =============================================================================

function renderSyncItems(lang, mystery) {
    if (!syncListContainer) return;
    if (typeof getRosaryStructureDefinition !== 'function') return;

    const sections = getRosaryStructureDefinition(lang, mystery);
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
            html += `
                <div class="sync-item-row" data-key="${item.key}">
                    <div class="sync-item-left">
                        <span class="sync-badge">${item.badge}</span>
                        <div class="sync-item-titles">
                            <span class="sync-item-title">${item.title}</span>
                            <span class="sync-item-subtitle">${item.subtitle}</span>
                        </div>
                    </div>
                    <div class="sync-item-right">
                        <button type="button" class="btn-sync-adjust" data-delta="-1" title="Restar 1 segundo">-1s</button>
                        <input type="text" class="sync-input-time" data-key="${item.key}" value="${item.formatted}" placeholder="MM:SS" spellcheck="false" autocomplete="off">
                        <button type="button" class="btn-sync-adjust" data-delta="1" title="Sumar 1 segundo">+1s</button>
                        <button type="button" class="btn-sync-stamp" data-key="${item.key}" title="Fijar tiempo actual del audio en esta casilla">⏱️ Ahora</button>
                        <button type="button" class="btn-sync-test" data-key="${item.key}" title="Reproducir audio desde este tiempo">▶ Probar</button>
                    </div>
                </div>
            `;
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
        const input = row.querySelector('.sync-input-time');
        const btnStamp = row.querySelector('.btn-sync-stamp');
        const btnTest = row.querySelector('.btn-sync-test');
        const adjustBtns = row.querySelectorAll('.btn-sync-adjust');
        const itemTitle = row.querySelector('.sync-item-title') ? row.querySelector('.sync-item-title').innerText : '';

        input.addEventListener('input', () => {
            row.classList.add('modified');
        });

        adjustBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
                const curSec = Math.max(0, toSec(input.value) + delta);
                input.value = formatTime(curSec);
                row.classList.add('modified');
            });
        });

        btnStamp.addEventListener('click', () => {
            const curSec = audioPlayer.currentTime;
            input.value = formatTime(curSec);
            row.classList.add('modified');
            if (syncStatusMsg) {
                syncStatusMsg.innerText = `⏱️ Fijado ${input.value} para: ${itemTitle}`;
            }
        });

        btnTest.addEventListener('click', () => {
            const sec = toSec(input.value);
            audioPlayer.currentTime = sec;
            audioPlayer.play().then(() => updatePlayPauseButton(true)).catch(() => {});
            if (syncStatusMsg) {
                syncStatusMsg.innerText = `▶ Probando en ${input.value}: ${itemTitle}`;
            }
        });
    });
}

function openSyncModal() {
    if (!syncModal) return;
    if (syncLangSelect) syncLangSelect.value = langSelect.value || 'es';
    if (syncMysterySelect) syncMysterySelect.value = currentMystery || 'Gozosos';
    
    renderSyncItems(syncLangSelect.value, syncMysterySelect.value);
    syncModal.classList.add('open');
    updatePlayPauseButton(!audioPlayer.paused);

    // Actualizar tiempos en el monitor del modal
    const curTime = audioPlayer.currentTime;
    const dur = audioPlayer.duration || 1800;
    if (syncTimeCur) syncTimeCur.innerText = formatTime(curTime);
    if (syncTimeDur) syncTimeDur.innerText = formatTime(dur);
    if (syncAudioSlider && dur > 0) syncAudioSlider.value = (curTime / dur) * 100;
}

function closeSyncModal() {
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

// Cambio de idioma o misterio dentro del formulario
function onSyncSelectionChange() {
    const lang = syncLangSelect.value;
    const mystery = syncMysterySelect.value;

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
    }

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
        }
    });
});

// Guardar y Aplicar
if (btnSyncSave) {
    btnSyncSave.addEventListener('click', () => {
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

        // Guardar en almacenamiento permanente de navegador
        saveCustomTimesToStorage(lang, mystery, times);

        // Guardar en la nube (Cloud Firestore) si está disponible
        if (window.RosaryCloud && typeof window.RosaryCloud.saveTimesToCloud === 'function') {
            window.RosaryCloud.saveTimesToCloud(lang, mystery, times).then(success => {
                if (success && syncStatusMsg) {
                    syncStatusMsg.innerHTML = '✅ <strong style="color: #4ade80;">¡Guardado en la nube (Firestore) y sincronizado en todos tus dispositivos!</strong>';
                }
            });
        }

        // Actualizar en el objeto de datos en memoria
        if (audioData[lang] && audioData[lang][mystery]) {
            audioData[lang][mystery].customTimes = Object.assign({}, audioData[lang][mystery].customTimes || {}, times);
        }

        // Si es el misterio e idioma que el usuario está rezando, aplicar en vivo
        if (lang === langSelect.value && mystery === currentMystery) {
            currentSteps = generateDetailedTimeline(currentMystery, audioData[lang][currentMystery], lang);
            updateUIForStep(currentStepIndex);
            if (currentSteps[currentStepIndex]) {
                updateBeadHighlights(currentSteps[currentStepIndex].beadId);
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
        const lang = syncLangSelect.value;
        const mystery = syncMysterySelect.value;
        if (confirm(`¿Deseas restablecer los tiempos de ${mystery} (${lang.toUpperCase()}) a sus valores calculados originales?`)) {
            clearCustomTimesFromStorage(lang, mystery);
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

// Exponer refresco de línea de tiempo interactiva para sincronizaciones en la nube
window.refreshActiveTimeline = function() {
    const lang = langSelect ? (langSelect.value || 'es') : 'es';
    if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][currentMystery]) {
        currentSteps = generateDetailedTimeline(currentMystery, audioData[lang][currentMystery], lang);
        updateUIForStep(currentStepIndex);
        if (currentSteps[currentStepIndex]) {
            updateBeadHighlights(currentSteps[currentStepIndex].beadId);
        }
    }
};

// 13. INICIALIZACIÓN AL CARGAR LA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    buildRosarySvg();
    const todayMystery = getMysteryByDay();
    loadMystery(todayMystery);
});
