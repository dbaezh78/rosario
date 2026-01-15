const langSelect = document.getElementById('language-select');
const audioPlayer = document.getElementById('audio-player');
const mainImg = document.getElementById('main-image');
const radioButtons = document.querySelectorAll('input[name="mystery"]');
const dots = document.querySelectorAll('.dot');
const statusDisplay = document.getElementById('current-status');
const mysteryDetailDisplay = document.getElementById('mystery-name-detail');

let currentMysteryData = null;

function getMysteryByDay() {
    const days = ['Gloriosos', 'Gozosos', 'Dolorosos', 'Gloriosos', 'Luminosos', 'Dolorosos', 'Gozosos'];
    const today = new Date().getDay();
    return days[today];
}

function updateStatusText(mysteryKey, index) {
    const labels = ["Principio", "1er Misterio", "2do Misterio", "3er Misterio", "4to Misterio", "5to Misterio", "Letanías"];
    const lang = langSelect.value;

    // Limpieza inicial
    statusDisplay.innerText = "";
    if (mysteryDetailDisplay) mysteryDetailDisplay.innerText = "";

    // CORTOCIRCUITO: Si el idioma o los datos no existen, salimos de la función sin dar error
    if (!mysteryKey || !audioData || !audioData[lang]) return;

    // Título 2.1rem
    statusDisplay.innerText = `${mysteryKey} — ${labels[index]}`;

    // Búsqueda segura del nombre del misterio
    try {
        const langNames = audioData[lang].names;
        if (index > 0 && langNames && langNames[mysteryKey]) {
            const specificName = langNames[mysteryKey][index - 1];
            if (mysteryDetailDisplay) mysteryDetailDisplay.innerText = specificName || "";
        }
    } catch (e) {
        // Silenciamos cualquier error de lectura
    }
}

function selectMysteryByDay() {
    const mysteryToday = getMysteryByDay();
    const radioToSelect = document.querySelector(`input[name="mystery"][value="${mysteryToday}"]`);
    if (radioToSelect) {
        radioToSelect.checked = true;
        radioToSelect.dispatchEvent(new Event('change'));
    }
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (currentMysteryData && currentMysteryData.timeline && currentMysteryData.timeline[index]) {
            audioPlayer.currentTime = currentMysteryData.timeline[index].s;
            
            audioPlayer.play();
            /*
            audioPlayer.play().catch(error => {
                console.log("Autoplay bloqueado: El usuario debe interactuar para escuchar el audio."); 
                }); */
        }
    });
});

audioPlayer.addEventListener('timeupdate', () => {
    // Si no hay datos cargados, no procesamos nada
    if (!currentMysteryData || !currentMysteryData.timeline) return;

    const currentTime = audioPlayer.currentTime;
    const timeline = currentMysteryData.timeline;
    let activeIndex = 0;

    for (let i = 0; i < timeline.length; i++) {
        if (currentTime >= timeline[i].s) {
            activeIndex = i;
        } else { break; }
    }

    // Actualizar Imagen
    if (timeline[activeIndex] && mainImg.getAttribute('src') !== timeline[activeIndex].img) {
        mainImg.src = timeline[activeIndex].img;
    }

    // Actualizar Puntos
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });

    const activeMystery = document.querySelector('input[name="mystery"]:checked')?.value;
    updateStatusText(activeMystery, activeIndex);
});

radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        const lang = langSelect.value;
        const mystery = radio.value;
        
        // Verificamos existencia de datos antes de asignar
        if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][mystery]) {
            currentMysteryData = audioData[lang][mystery];
            audioPlayer.src = currentMysteryData.src;
            if (currentMysteryData.timeline && currentMysteryData.timeline[0]) {
                mainImg.src = currentMysteryData.timeline[0].img;
            }
            //audioPlayer.play();
            audioPlayer.play().catch(error => {
                    console.log("Autoplay bloqueado: El usuario debe interactuar para escuchar el audio.");
                });
        } else {
            // Reset seguro
            currentMysteryData = null;
            audioPlayer.src = "";
            statusDisplay.innerText = "Audio no disponible";
            if (mysteryDetailDisplay) mysteryDetailDisplay.innerText = "";
            dots.forEach(d => d.classList.remove('active'));
        }
    });
});

langSelect.addEventListener('change', () => {
    audioPlayer.pause();
    audioPlayer.src = "";
    mainImg.src = "src/img/inicio.png";
    dots.forEach(d => d.classList.remove('active'));
    selectMysteryByDay();
});

window.onload = () => {
    mainImg.src = "src/img/inicio.png";
    selectMysteryByDay();
};