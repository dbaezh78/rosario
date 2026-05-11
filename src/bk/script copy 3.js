const langSelect = document.getElementById('language-select');
const audioPlayer = document.getElementById('audio-player');
const mainImg = document.getElementById('main-image');
const radioButtons = document.querySelectorAll('input[name="mystery"]');
const dots = document.querySelectorAll('.dot');
const statusDisplay = document.getElementById('current-status');

let currentMysteryData = null;

// 1. Obtener el misterio según el día (Lógica de la Iglesia)
function getMysteryByDay() {
    const days = ['Gloriosos', 'Gozosos', 'Dolorosos', 'Gloriosos', 'Luminosos', 'Dolorosos', 'Gozosos'];
    const today = new Date().getDay(); // 0: Domingo, 1: Lunes...
    return days[today];
}

// 2. Actualizar el letrero grande (2.1rem)
function updateStatusText(mysteryName, index) {
    const labels = ["Principio", "1er Misterio", "2do Misterio", "3er Misterio", "4to Misterio", "5to Misterio", "Letanías"];
    if (mysteryName) {
        statusDisplay.innerText = `${mysteryName} — ${labels[index]}`;
    } else {
        statusDisplay.innerText = "";
    }
}

// 3. Selección automática (se usa al cargar y al cambiar idioma)
function selectMysteryByDay() {
    const mysteryToday = getMysteryByDay();
    const radioToSelect = document.querySelector(`input[name="mystery"][value="${mysteryToday}"]`);
    
    if (radioToSelect) {
        radioToSelect.checked = true;
        // Disparamos el evento para que cargue el audio desde content.js
        radioToSelect.dispatchEvent(new Event('change'));
    }
}

// Clic en los puntos para saltar en el audio
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (currentMysteryData && currentMysteryData.timeline[index]) {
            audioPlayer.currentTime = currentMysteryData.timeline[index].s;
            audioPlayer.play();
        }
    });
});

// Sincronización de Tiempo -> Imagen, Puntos y Letrero
audioPlayer.addEventListener('timeupdate', () => {
    if (!currentMysteryData) return;

    const currentTime = audioPlayer.currentTime;
    const timeline = currentMysteryData.timeline;
    let activeIndex = 0;

    for (let i = 0; i < timeline.length; i++) {
        if (currentTime >= timeline[i].s) {
            activeIndex = i;
        } else { break; }
    }

    // Actualizar Imagen
    if (mainImg.getAttribute('src') !== timeline[activeIndex].img) {
        mainImg.src = timeline[activeIndex].img;
    }

    // Actualizar Puntos
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });

    // Actualizar el letrero grande dinámicamente
    const activeMystery = document.querySelector('input[name="mystery"]:checked')?.value;
    updateStatusText(activeMystery, activeIndex);
});

// Cambio de Misterio (Radio Buttons)
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        const lang = langSelect.value;
        const mystery = radio.value;
        
        // Buscamos en el objeto audioData que ahora vive en content.js
        if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][mystery]) {
            currentMysteryData = audioData[lang][mystery];
            audioPlayer.src = currentMysteryData.src;
            mainImg.src = currentMysteryData.timeline[0].img;
            audioPlayer.play();
        } else {
            currentMysteryData = null;
            audioPlayer.src = "";
            statusDisplay.innerText = "Audio no disponible";
        }
    });
});

// Cambio de Idioma
langSelect.addEventListener('change', () => {
    audioPlayer.pause();
    audioPlayer.src = "";
    mainImg.src = "src/img/inicio.png";
    dots.forEach(d => d.classList.remove('active'));
    
    // Seleccionar automáticamente el misterio del día para el nuevo idioma
    selectMysteryByDay();
});

// Al cargar la página
window.onload = () => {
    mainImg.src = "src/img/inicio.png";
    selectMysteryByDay();
};