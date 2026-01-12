// Base de datos de rutas de audio
const audioPaths = {
    es: {
        joyful: "src/mp3/Latin/Gaudii.mp3",
        sorrowful: "src/mp3/Latin/Doloris.mp3",
        luminous: "src/mp3/Latin/Lucis.mp3",
        glorious: "src/mp3/Latin/Doloris/Gloriae.mp3",
        img: "https://images.unsplash.com/photo-1544427928-c49cdfebf194" // Imagen para español
    },
    en: {
        joyful: "ev/otros/Rosario/English/Misterios Gososos.mp3",
        sorrowful: "ev/otros/Rosario/English/Misterios Dolorosos.mp3",
        luminous: "ev/otros/Rosario/English/Misterios Luminosos.mp3",
        glorious: "ev/otros/Rosario/English/Misterios Gloriosos.mp3",
        img: "https://images.unsplash.com/photo-1601614919934-58580269389f" // Imagen para inglés
    },
    it: {
        joyful: "ev/otros/Rosario/italiani/Misteri gaudiosi.mp3",
        sorrowful: "ev/otros/Rosario/italiani/Misteri Dolorosi.mp3",
        luminous: "ev/otros/Rosario/italiani/Misteri luminosi.mp3",
        glorious: "ev/otros/Rosario/italiani/Misteri Gloriosi.mp3",
        img: "https://images.unsplash.com/photo-1548625361-195fe576566a" // Imagen para italiano
    },
    la: {
        joyful: "src/mp3/Latin/Gaudii.mp3",
        sorrowful: "src/mp3/Latin/Doloris.mp3",
        luminous: "src/mp3/Latin/Lucis.mp3",
        glorious: "src/mp3/Latin/Gloriae.mp3",
        img: "https://images.unsplash.com/photo-1594911776735-269368940711" // Imagen para Latín
    }
    // Puedes agregar pt, ar, he de la misma forma
};

const langSelect = document.getElementById('language-select');
const mysteriesContainer = document.getElementById('mysteries-container');
const audioPlayer = document.getElementById('audio-player');
const mainImg = document.getElementById('main-image');
const radioButtons = document.querySelectorAll('input[name="mystery"]');

// Cambiar al seleccionar idioma
langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    if (lang && audioPaths[lang]) {
        mysteriesContainer.classList.remove('hidden');
        mainImg.src = audioPaths[lang].img;
        resetRadios();
    } else {
        mysteriesContainer.classList.add('hidden');
    }
});

// Cambiar audio al seleccionar misterio
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        const lang = langSelect.value;
        const mystery = radio.value;
        
        if (lang && audioPaths[lang][mystery]) {
            audioPlayer.src = audioPaths[lang][mystery];
            audioPlayer.play();
        }
    });
});

function resetRadios() {
    radioButtons.forEach(r => r.checked = false);
    audioPlayer.src = "";
}