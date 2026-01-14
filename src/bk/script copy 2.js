

const langSelect = document.getElementById('language-select');
const audioPlayer = document.getElementById('audio-player');
const mainImg = document.getElementById('main-image');
const radioButtons = document.querySelectorAll('input[name="mystery"]');
const dots = document.querySelectorAll('.dot');

let currentMysteryData = null;

// Lógica para que los puntos sean clicables
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (currentMysteryData && currentMysteryData.timeline[index]) {
            const targetTime = currentMysteryData.timeline[index].s;
            audioPlayer.currentTime = targetTime;
            audioPlayer.play();
        }
    });
});

// Actualización automática (Tiempo -> Imagen y Punto Activo)
audioPlayer.addEventListener('timeupdate', () => {
    if (!currentMysteryData) return;

    const currentTime = audioPlayer.currentTime;
    const timeline = currentMysteryData.timeline;

    let activeIndex = 0;
    let activeStep = timeline[0];

    for (let i = 0; i < timeline.length; i++) {
        if (currentTime >= timeline[i].s) {
            activeStep = timeline[i];
            activeIndex = i;
        } else {
            break; 
        }
    }

    // Actualizar Imagen
    if (mainImg.getAttribute('src') !== activeStep.img) {
        mainImg.src = activeStep.img;
    }

    // Actualizar Puntos
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
});

// Selección de Misterio
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        const lang = langSelect.value;
        const mystery = radio.value;
        
        if (audioData[lang] && audioData[lang][mystery]) {
            currentMysteryData = audioData[lang][mystery];
            audioPlayer.src = currentMysteryData.src;
            mainImg.src = currentMysteryData.timeline[0].img;
            audioPlayer.play();
        }
    });
});

// Reset al cambiar idioma
langSelect.addEventListener('change', () => {
    radioButtons.forEach(r => r.checked = false);
    audioPlayer.pause();
    audioPlayer.src = "";
    mainImg.src = "src/img/inicio.png";
    currentMysteryData = null;
    dots.forEach(dot => dot.classList.remove('active'));
});

window.onload = () => {
    mainImg.src = "src/img/inicio.png";
};



const statusDisplay = document.getElementById('current-status');

// Función para obtener el misterio según el día
function getMysteryByDay() {
    const days = ['Gloriosos', 'Gozosos', 'Dolorosos', 'Gloriosos', 'Luminosos', 'Dolorosos', 'Gozosos'];
    const today = new Date().getDay(); // 0 es Domingo, 1 Lunes...
    return days[today];
}

// Función para actualizar el texto debajo del título
function updateStatusText(mysteryName, index) {
    const labels = ["Principio", "1er Misterio", "2do Misterio", "3er Misterio", "4to Misterio", "5to Misterio", "Letanías"];
    if (mysteryName) {
        statusDisplay.innerText = `${mysteryName} — ${labels[index]}`;
    } else {
        statusDisplay.innerText = "";
    }
}

// Modificación en el timeupdate para actualizar el texto dinámicamente
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

    // Actualizar Imagen y Puntos (tu código actual)
    if (mainImg.getAttribute('src') !== timeline[activeIndex].img) {
        mainImg.src = timeline[activeIndex].img;
    }
    dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));

    // NUEVO: Actualizar el texto (ej: Gozosos — 2do Misterio)
    const activeMystery = document.querySelector('input[name="mystery"]:checked')?.value;
    updateStatusText(activeMystery, activeIndex);
});

// Lógica al cargar la página para seleccionar el día
window.onload = () => {
    mainImg.src = "src/img/inicio.png";
    
    const mysteryToday = getMysteryByDay();
    const radioToSelect = document.querySelector(`input[name="mystery"][value="${mysteryToday}"]`);
    
    if (radioToSelect) {
        radioToSelect.checked = true;
        // Disparamos el evento manual para que cargue el audio
        radioToSelect.dispatchEvent(new Event('change'));
    }
};
