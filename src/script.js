// Base de datos de rutas. 
// Para el tiempo (s), usa la fórmula: (minutos * 60) + segundos
const audioData = {
    es: {
        Gozosos: {
            src: "src/mp3/es/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gososos/gozosos.png" },          // 0:00
                { s: 82, img: "src/img/gososos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 393, img: "src/img/gososos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 700, img: "src/img/gososos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 1005, img: "src/img/gososos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1307, img: "src/img/gososos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1622, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Dolorosos: {
            src: "src/mp3/es/Dolorosos.mp3",
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },          // 0:00
                { s: 82, img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 393, img: "src/img/dolorosos/dolorosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 700, img: "src/img/dolorosos/dolorosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 1005, img: "src/img/dolorosos/dolorosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1307, img: "src/img/dolorosos/dolorosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1622, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Luminosos: {
            src: "ev/otros/Rosario/Español/Misterios Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/es/luminosos.png" },
                { s: 120, img: "src/img/es/luminosos_1.png" }
            ]
        },
        Gloriosos: {
            src: "ev/otros/Rosario/Español/Mistérios Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/es/gloriosos.png" },
                { s: 120, img: "src/img/es/gloriosos_1.png" }
            ]
        }
    }
    // Para agregar English o Latin, copia la estructura de arriba cambiando 'es' por 'en' o 'la'
};

const langSelect = document.getElementById('language-select');
const audioPlayer = document.getElementById('audio-player');
const mainImg = document.getElementById('main-image');
const radioButtons = document.querySelectorAll('input[name="mystery"]');

let currentMysteryData = null;

// Sincronización de Imagen con el Audio
audioPlayer.addEventListener('timeupdate', () => {
    if (!currentMysteryData) return;

    const currentTime = audioPlayer.currentTime;
    const timeline = currentMysteryData.timeline;

    // Buscamos cuál es la última imagen que debe mostrarse según el tiempo actual
    let activeStep = timeline[0];
    for (let i = 0; i < timeline.length; i++) {
        if (currentTime >= timeline[i].s) {
            activeStep = timeline[i];
        } else {
            break; 
        }
    }

    // Solo actualizamos el SRC si es diferente para evitar parpadeos
    // Comparamos el final de la ruta para evitar errores con http://localhost...
    const currentImgName = mainImg.getAttribute('src');
    if (currentImgName !== activeStep.img) {
        mainImg.src = activeStep.img;
    }
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
        } else {
            alert("Audio no encontrado para este idioma/misterio");
        }
    });
});

// Al cambiar idioma, reseteamos todo
langSelect.addEventListener('change', () => {
    radioButtons.forEach(r => r.checked = false);
    audioPlayer.pause();
    audioPlayer.src = "";
    mainImg.src = "src/img/inicio.png";
    currentMysteryData = null;
});

// Al cargar por primera vez (Español por defecto)
window.onload = () => {
    mainImg.src = "src/img/inicio.png";
};