// Base de datos de rutas. 
// Para el tiempo (s), usa la fórmula: (minutos * 60) + segundos
const audioData = {
    es: {
        Gozosos: {
            src: "src/mp3/es/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 82, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 394, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 701, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 1005, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1308, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1625, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Dolorosos: {
            src: "src/mp3/es/Dolorosos.mp3",
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },          // 0:00
                { s: 78, img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 395, img: "src/img/dolorosos/dolorosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 713, img: "src/img/dolorosos/dolorosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 1040, img: "src/img/dolorosos/dolorosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1328, img: "src/img/dolorosos/dolorosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1658, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Luminosos: {
            src: "src/mp3/es/Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },          // 0:00
                { s: 83, img: "src/img/luminosos/luminosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 399, img: "src/img/luminosos/luminosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 703, img: "src/img/luminosos/luminosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 1024, img: "src/img/luminosos/luminosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1344, img: "src/img/luminosos/luminosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1667, img: "src/img/letanias.png" },                 // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Gloriosos: {
            src: "src/mp3/es/Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },          // 0:00
                { s: 81, img: "src/img/gloriosos/gloriosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 408, img: "src/img/gloriosos/gloriosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 704, img: "src/img/gloriosos/gloriosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 1041, img: "src/img/gloriosos/gloriosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1362, img: "src/img/gloriosos/gloriosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1667, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        }
    },

    en: {

        Gozosos: {
            src: "src/mp3/en/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 141, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 329, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 517, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 706, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 895, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1083, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },

        Dolorosos: {
            src: "src/mp3/en/Dolorosos.mp3",
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },          // 0:00
                { s: 141, img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 329, img: "src/img/dolorosos/dolorosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 518, img: "src/img/dolorosos/dolorosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 706, img: "src/img/dolorosos/dolorosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 895, img: "src/img/dolorosos/dolorosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1083, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },

        Luminosos: {
            src: "src/mp3/en/Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },          // 0:00
                { s: 141, img: "src/img/luminosos/luminosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 329, img: "src/img/luminosos/luminosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 517, img: "src/img/luminosos/luminosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 706, img: "src/img/luminosos/luminosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 895, img: "src/img/luminosos/luminosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1083, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Gloriosos: {
            src: "src/mp3/en/Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },          // 0:00
                { s: 141, img: "src/img/gloriosos/gloriosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 329, img: "src/img/gloriosos/gloriosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 517, img: "src/img/gloriosos/gloriosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 706, img: "src/img/gloriosos/gloriosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 895, img: "src/img/gloriosos/gloriosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1083, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        }
    },
    
    it: {
        Gozosos: {
            src: "src/mp3/it/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 194, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 469, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 728, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 988, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1249, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1507, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Dolorosos: {
            src: "src/mp3/it/Dolorosos.mp3",
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },          // 0:00
                { s: 194, img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 469, img: "src/img/dolorosos/dolorosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 728, img: "src/img/dolorosos/dolorosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 988, img: "src/img/dolorosos/dolorosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1249, img: "src/img/dolorosos/dolorosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1507, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Luminosos: {
            src: "src/mp3/it/Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },          // 0:00
                { s: 194,img: "src/img/luminosos/luminosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 469, img: "src/img/luminosos/luminosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 728, img: "src/img/luminosos/luminosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 988, img: "src/img/luminosos/luminosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1249, img: "src/img/luminosos/luminosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1507, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Gloriosos: {
            src: "src/mp3/it/Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },          // 0:00
                { s: 194, img: "src/img/gloriosos/gloriosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 469, img: "src/img/gloriosos/gloriosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 728, img: "src/img/gloriosos/gloriosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 988, img: "src/img/gloriosos/gloriosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1249, img: "src/img/gloriosos/gloriosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1507, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        }
    },

        la: {
        Gozosos: {
            src: "src/mp3/la/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 176, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 418, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 660, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 902, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1144, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1473, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Dolorosos: {
            src: "src/mp3/la/Dolorosos.mp3",
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },          // 0:00
                { s: 176, img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 418, img: "src/img/dolorosos/dolorosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 660, img: "src/img/dolorosos/dolorosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 902, img: "src/img/dolorosos/dolorosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1144, img: "src/img/dolorosos/dolorosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1473, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Luminosos: {
            src: "src/mp3/la/Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },          // 0:00
                { s: 176, img: "src/img/luminosos/luminosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 418, img: "src/img/luminosos/luminosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 660, img: "src/img/luminosos/luminosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 902, img: "src/img/luminosos/luminosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1144, img: "src/img/luminosos/luminosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1473, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Gloriosos: {
            src: "src/mp3/la/Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },          // 0:00
                { s: 176, img: "src/img/gloriosos/gloriosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 418, img: "src/img/gloriosos/gloriosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 660, img: "src/img/gloriosos/gloriosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 902, img: "src/img/gloriosos/gloriosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1144, img: "src/img/gloriosos/gloriosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1473, img: "src/img/letanias.png" },                // 27:02 -> (27*60)+2 = 1622 
            ]
        }
    },
        pt: {
        Gozosos: {
            src: "src/mp3/pt/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 53, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 350, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 643, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 940, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1212, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1495, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Dolorosos: {
            src: "src/mp3/pt/Dolorosos.mp3",
            timeline: [
                { s: 0,     img: "src/img/dolorosos/dolorosos.png" },         // 0:00
                { s: 53,    img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 327,   img: "src/img/dolorosos/dolorosos_2.png" },       // 6:33 -> (6*60)+33 = 393
                { s: 610,   img: "src/img/dolorosos/dolorosos_3.png" },       // 11:40 -> (11*60)+40 = 700
                { s: 878,   img: "src/img/dolorosos/dolorosos_4.png" },       // 16:45 -> (16*60)+45 = 1005
                { s: 1160,  img: "src/img/dolorosos/dolorosos_5.png" },       // 21:47 -> (21*60)+47 = 1307
                { s: 1448,  img: "src/img/letanias.png" },                    // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Luminosos: {
            src: "src/mp3/pt/Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },          // 0:00
                { s: 52, img: "src/img/luminosos/luminosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 328, img: "src/img/luminosos/luminosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 595, img: "src/img/luminosos/luminosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 875, img: "src/img/luminosos/luminosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1162, img: "src/img/luminosos/luminosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1441, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Gloriosos: {
            src: "src/mp3/pt/Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },          // 0:00
                { s: 52, img: "src/img/gloriosos/gloriosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 332, img: "src/img/gloriosos/gloriosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 611, img: "src/img/gloriosos/gloriosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 893, img: "src/img/gloriosos/gloriosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1165, img: "src/img/gloriosos/gloriosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1438, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        }
    },


    // Para agregar English o Latin, copia la estructura de arriba cambiando 'es' por 'en' o 'la'
};

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