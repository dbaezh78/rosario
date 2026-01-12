// Base de datos de rutas de audio
const audioPaths = {
    es: {
        joyful:		"src/mp3/es/Gozosos.mp3",
        sorrowful:	"src/mp3/es/Doloros.mp3",
        luminous:	"src/mp3/es/Luminosos.mp3",
        glorious:	"src/mp3/es/Gloriosos.mp3",
        img: "https://images.unsplash.com/photo-1544427928-c49cdfebf194" // Imagen para español
    },
    en: {
        joyful:		"src/mp3/en/Gozosos.mp3",
        sorrowful:	"src/mp3/en/Doloros.mp3",
        luminous:	"src/mp3/en/Luminosos.mp3",
        glorious:	"src/mp3/en/Gloriosos.mp3",
        img: "https://images.unsplash.com/photo-1601614919934-58580269389f" // Imagen para inglés
    },
    it: {
        joyful:		"src/mp3/it/Gozosos.mp3",
        sorrowful:	"src/mp3/it/Doloros.mp3",
        luminous:	"src/mp3/it/Luminosos.mp3",
        glorious:	"src/mp3/it/Gloriosos.mp3",
        img: "https://images.unsplash.com/photo-1548625361-195fe576566a" // Imagen para italiano
    },
    la: {
        joyful:		"src/mp3/la/Gozosos.mp3",
        sorrowful:	"src/mp3/la/Doloros.mp3",
        luminous:	"src/mp3/la/Luminosos.mp3",
        glorious:	"src/mp3/la/Gloriosos.mp3",
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