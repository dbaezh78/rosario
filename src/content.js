// =============================================================================
// SANTO ROSARIO - BASE DE DATOS Y CONFIGURACIÓN DE CONTENIDOS
// =============================================================================

// Helper para convertir formato "MM:SS" o número a segundos totales
function toSec(val) {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
        const parts = val.trim().split(':');
        if (parts.length === 2) return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
        if (parts.length === 3) return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseFloat(parts[2]);
        return parseFloat(val) || 0;
    }
    return 0;
}

// Helper para convertir segundos totales a formato "MM:SS" (o "HH:MM:SS")
function formatTime(secs) {
    if (isNaN(secs) || secs < 0) return "00:00";
    const totalSecs = Math.round(secs);
    const m = Math.floor(totalSecs / 60);
    const s = Math.floor(totalSecs % 60);
    if (m >= 60) {
        const h = Math.floor(m / 60);
        const remM = m % 60;
        return `${h}:${remM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Oraciones completas por idioma
const rosaryPrayers = {
    es: {
        senalCruz: {
            title: "Señal de la Cruz",
            text: "Por la señal de la Santa Cruz, de nuestros enemigos líbranos Señor, Dios nuestro.\n\nEn el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."
        },
        invocacion: {
            title: "Invocación al Espíritu Santo y Ofrecimiento",
            text: "Dios mío, ven en mi auxilio. Señor, date prisa en socorrerme.\n\nGloria al Padre y al Hijo y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén."
        },
        actoContricion: {
            title: "Acto de Contrición",
            text: "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión: por mi culpa, por mi culpa, por mi gran culpa.\n\nPor eso ruego a Santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor. Amén.\n\nDios todopoderoso tenga piedad de nosotros, perdone nuestros pecados y nos lleve a la vida eterna. Amén."
        },
        credo: {
            title: "Credo de los Apóstoles",
            text: "Creo en Dios Padre Todopoderoso, Creador del cielo y de la tierra.\n\nCreo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios Padre Todopoderoso.\n\nDesde allí ha de venir a juzgar a vivos y muertos.\n\nCreo en el Espíritu Santo, la santa Iglesia Católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén."
        },
        padreNuestroIntro: {
            title: "Padre Nuestro (Por las intenciones del Santo Padre)",
            text: "Por las intenciones del Santo Padre, el Papa:\n\nPadre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.\n\nDanos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén."
        },
        padreNuestro: {
            title: "Padre Nuestro",
            text: "Padre nuestro que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.\n\nDanos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén."
        },
        aveMariaFe: {
            title: "1ª Ave María (Por el aumento de la Fe)",
            text: "Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\n\nSanta María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
        },
        aveMariaEsperanza: {
            title: "2ª Ave María (Por el aumento de la Esperanza)",
            text: "Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\n\nSanta María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
        },
        aveMariaCaridad: {
            title: "3ª Ave María (Por el aumento de la Caridad)",
            text: "Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\n\nSanta María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
        },
        aveMaria: {
            title: "Ave María",
            text: "Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\n\nSanta María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
        },
        gloria: {
            title: "Gloria al Padre",
            text: "Gloria al Padre y al Hijo y al Espíritu Santo.\n\nComo era en el principio, ahora y siempre, por los siglos de los siglos. Amén."
        },
        jaculatoria: {
            title: "Jaculatoria y Oración de Fátima",
            text: "Ave María Purísima, sin pecado concebida.\nMaría, Madre de gracia, Madre de piedad y misericordia, en la vida y en la muerte ampáranos, gran Señora.\n\nOh Jesús mío, perdona nuestras culpas y pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia. Amén."
        },
        salve: {
            title: "La Salve (Dios te Salve, Reina y Madre)",
            text: "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve.\n\nA ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando, en este valle de lágrimas.\n\nEa, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre.\n\n¡Oh clemente, oh piadosa, oh dulce Virgen María!\n\n— Ruega por nosotros, Santa Madre de Dios.\n— Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén."
        },
        letanias: {
            title: "Letanías Lauretanas a la Santísima Virgen",
            text: "Señor, ten piedad.\nCristo, ten piedad.\nSeñor, ten piedad.\nCristo, óyenos.\nCristo, escúchanos.\n\nDios Padre celestial, ten piedad de nosotros.\nDios Hijo Redentor del mundo, ten piedad de nosotros.\nDios Espíritu Santo, ten piedad de nosotros.\nSantísima Trinidad, un solo Dios, ten piedad de nosotros.\n\nSanta María, ruega por nosotros.\nSanta Madre de Dios, ruega por nosotros.\nSanta Virgen de las Vírgenes, ruega por nosotros.\nMadre de Cristo, ruega por nosotros.\nMadre de la Iglesia, ruega por nosotros.\nMadre de la misericordia, ruega por nosotros.\nMadre de la divina gracia, ruega por nosotros.\nMadre de la esperanza, ruega por nosotros.\nMadre purísima, ruega por nosotros.\nMadre castísima, ruega por nosotros.\nMadre siempre virgen, ruega por nosotros.\nMadre inmaculada, ruega por nosotros.\nMadre amable, ruega por nosotros.\nMadre admirable, ruega por nosotros.\nMadre del buen consejo, ruega por nosotros.\nMadre del Creador, ruega por nosotros.\nMadre del Salvador, ruega por nosotros.\nVirgen prudentísima, ruega por nosotros.\nVirgen digna de veneración, ruega por nosotros.\nVirgen digna de alabanza, ruega por nosotros.\nVirgen poderosa, ruega por nosotros.\nVirgen clemente, ruega por nosotros.\nVirgen fiel, ruega por nosotros.\nEspejo de justicia, ruega por nosotros.\nTrono de la sabiduría, ruega por nosotros.\nCausa de nuestra alegría, ruega por nosotros.\nVaso espiritual, ruega por nosotros.\nVaso digno de honor, ruega por nosotros.\nVaso de insigne devoción, ruega por nosotros.\nRosa mística, ruega por nosotros.\nTorre de David, ruega por nosotros.\nTorre de marfil, ruega por nosotros.\nCasa de oro, ruega por nosotros.\nArca de la Alianza, ruega por nosotros.\nPuerta del cielo, ruega por nosotros.\nEstrella de la mañana, ruega por nosotros.\nSalud de los enfermos, ruega por nosotros.\nRefugio de los pecadores, ruega por nosotros.\nConsuelo de los migrantes, ruega por nosotros.\nConsoladora de los afligidos, ruega por nosotros.\nAuxilio de los cristianos, ruega por nosotros.\nReina de los Ángeles, ruega por nosotros.\nReina de los Patriarcas, ruega por nosotros.\nReina de los Profetas, ruega por nosotros.\nReina de los Apóstoles, ruega por nosotros.\nReina de los Mártires, ruega por nosotros.\nReina de los Confesores, ruega por nosotros.\nReina de las Vírgenes, ruega por nosotros.\nReina de todos los Santos, ruega por nosotros.\nReina concebida sin pecado original, ruega por nosotros.\nReina asunta a los Cielos, ruega por nosotros.\nReina del Santísimo Rosario, ruega por nosotros.\nReina de la familia, ruega por nosotros.\nReina de la paz, ruega por nosotros.\n\nCordero de Dios, que quitas el pecado del mundo: perdónanos, Señor.\nCordero de Dios, que quitas el pecado del mundo: escúchanos, Señor.\nCordero de Dios, que quitas el pecado del mundo: ten misericordia de nosotros."
        },
        oracionFinal: {
            title: "Oración Final y Bendición",
            text: "OREMOS:\n\nTe rogamos nos concedas, Señor Dios nuestro, gozar de continua salud de alma y cuerpo, y por la gloriosa intercesión de la bienaventurada siempre Virgen María, vernos libres de las tristezas de la vida presente y disfrutar de las alegrías eternas. Por Cristo nuestro Señor. Amén.\n\nEn el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."
        }
    },
    en: {
        senalCruz: { title: "Sign of the Cross", text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen." },
        invocacion: { title: "Invocation", text: "O God, come to my assistance. O Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit. Amen." },
        actoContricion: { title: "Act of Contrition", text: "I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do. Through my fault, through my fault, through my most grievous fault..." },
        credo: { title: "The Apostles' Creed", text: "I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord: Who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried..." },
        padreNuestroIntro: { title: "Our Father (For the intentions of the Holy Father)", text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
        padreNuestro: { title: "Our Father", text: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." },
        aveMariaFe: { title: "1st Hail Mary (For Faith)", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
        aveMariaEsperanza: { title: "2nd Hail Mary (For Hope)", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
        aveMariaCaridad: { title: "3rd Hail Mary (For Charity)", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
        aveMaria: { title: "Hail Mary", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." },
        gloria: { title: "Glory Be", text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen." },
        jaculatoria: { title: "Fatima Prayer", text: "O My Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen." },
        salve: { title: "Hail, Holy Queen", text: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears..." },
        letanias: { title: "Litany of Loreto", text: "Lord, have mercy. Christ, have mercy. Lord, have mercy. Christ, hear us. Christ, graciously hear us. God the Father of Heaven, have mercy on us. Holy Mary, pray for us..." },
        oracionFinal: { title: "Concluding Prayer", text: "O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life... Through Christ our Lord. Amen." }
    },
    la: {
        senalCruz: { title: "Signum Crucis", text: "In nomine Patris, et Filii, et Spiritus Sancti. Amen." },
        invocacion: { title: "Invocatio", text: "Deus, in adiutorium meum intende. Domine, ad adiuvandum me festina. Gloria Patri, et Filio, et Spiritui Sancto. Amen." },
        actoContricion: { title: "Actus Contritionis", text: "Confiteor Deo omnipotenti et vobis, fratres, quia peccavi nimis cogitatione, verbo, opere et omissione: mea culpa, mea culpa, mea maxima culpa..." },
        credo: { title: "Symbolum Apostolorum", text: "Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae. Et in Iesum Christum, Filium eius unicum, Dominum nostrum: qui conceptus est de Spiritu Sancto, natus ex Maria Virgine..." },
        padreNuestroIntro: { title: "Pater Noster", text: "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem: sed libera nos a malo. Amen." },
        padreNuestro: { title: "Pater Noster", text: "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem: sed libera nos a malo. Amen." },
        aveMariaFe: { title: "Ave Maria (Fides)", text: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen." },
        aveMariaEsperanza: { title: "Ave Maria (Spes)", text: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen." },
        aveMariaCaridad: { title: "Ave Maria (Caritas)", text: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen." },
        aveMaria: { title: "Ave Maria", text: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen." },
        gloria: { title: "Gloria Patri", text: "Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen." },
        jaculatoria: { title: "Oratio Fatimae", text: "O mi Iesu, dimitte nobis debita nostra, libera nos ab igne inferni, perduc in caelum omnes animas, praesertim eas, quae misericordiae tuae maxime indigent. Amen." },
        salve: { title: "Salve Regina", text: "Salve, Regina, Mater misericordiae, vita, dulcedo, et spes nostra, salve. Ad te clamamus exsules filii Hevae. Ad te suspiramus gementes et flentes in hac lacrimarum valle..." },
        letanias: { title: "Litaniae Lauretanae", text: "Kyrie, eleison. Christe, eleison. Kyrie, eleison. Christe, audi nos. Christe, exaudi nos. Pater de caelis, Deus, miserere nobis. Sancta Maria, ora pro nobis..." },
        oracionFinal: { title: "Oratio Conclusiva", text: "Oremus: Deus, cuius Unigenitus per vitam, mortem et resurrectionem suam nobis salutis aeternae praemia comparavit... Per Christum Dominum nostrum. Amen." }
    }
};

// Fallback a español para otros idiomas si no están traducidos textualmente
rosaryPrayers.it = rosaryPrayers.it || rosaryPrayers.es;
rosaryPrayers.fr = rosaryPrayers.fr || rosaryPrayers.es;
rosaryPrayers.pt = rosaryPrayers.pt || rosaryPrayers.es;
rosaryPrayers.ar = rosaryPrayers.es;
rosaryPrayers.he = rosaryPrayers.es;

// Detalles bíblicos y ofrecimientos de cada misterio
const mysteryDetails = {
    Gozosos: [
        {
            num: 1,
            title: "La Encarnación del Hijo de Dios",
            quote: "«Al sexto mes el ángel Gabriel fue enviado por Dios a una ciudad de Galilea, llamada Nazaret, a una virgen desposada con un hombre llamado José, de la estirpe de David; el nombre de la virgen era María». (Lc 1, 26-27)",
            offering: "Ofrecemos este primer misterio por las almas del purgatorio.",
            img: "src/img/gozosos/gozosos_1.png"
        },
        {
            num: 2,
            title: "La Visitación de Nuestra Señora a su prima Santa Isabel",
            quote: "«En aquellos días María se puso en camino y fue aprisa a la región montañosa, a una ciudad de Judá; entró en casa de Zacarías y saludó a Isabel. Y sucedió que, en cuanto Isabel oyó el saludo de María, saltó de gozo el niño en su seno, e Isabel quedó llena de Espíritu Santo». (Lc 1, 39-41)",
            offering: "Ofrecemos este segundo misterio por los enfermos de nuestra familia y los del mundo entero.",
            img: "src/img/gozosos/gozosos_2.png"
        },
        {
            num: 3,
            title: "El Nacimiento del Hijo de Dios en el portal de Belén",
            quote: "«Y dio a luz a su hijo primogénito, le envolvió en pañales y le acostó en un pesebre, porque no tenían sitio en el alojamiento». (Lc 2, 7)",
            offering: "Ofrecemos este tercer misterio por los encarcelados, los que sufren y los que aún no conocen a Dios en sus corazones.",
            img: "src/img/gozosos/gozosos_3.png"
        },
        {
            num: 4,
            title: "La Presentación de Jesús en el Templo",
            quote: "«Cuando se cumplieron los días de la purificación de ellos, según la Ley de Moisés, llevaron a Jesús a Jerusalén para presentarle al Señor». (Lc 2, 22)",
            offering: "Ofrecemos este cuarto misterio por nuestros padres, hermanos, hijos y toda nuestra familia.",
            img: "src/img/gozosos/gozosos_4.png"
        },
        {
            num: 5,
            title: "El Niño Jesús perdido y hallado en el Templo",
            quote: "«Al cabo de tres días, le encontraron en el Templo sentado en medio de los maestros, escuchándoles y preguntándoles; todos los que le oían estaban estupefactos por su inteligencia y sus respuestas». (Lc 2, 46-47)",
            offering: "Ofrecemos este quinto misterio para que la Virgen María y San José nos acompañen y nos lleven siempre a Cristo.",
            img: "src/img/gozosos/gozosos_5.png"
        }
    ],
    Dolorosos: [
        {
            num: 1,
            title: "La Oración de Jesús en el Huerto de Getsemaní",
            quote: "«Entonces Jesús fue con ellos a un huerto, llamado Getsemaní... Y cayendo rostro en tierra suplicaba: Padre mío, si es posible, que pase de mí esta copa; pero no sea como yo quiero, sino como quieras tú». (Mt 26, 36.39)",
            offering: "Ofrecemos este primer misterio por las almas del purgatorio.",
            img: "src/img/dolorosos/dolorosos_1.png"
        },
        {
            num: 2,
            title: "La Flagelación de Jesús atado a la columna",
            quote: "«Pilato puso en libertad a Barrabás; y a Jesús, después de haberlo hecho azotar, lo entregó para que fuera crucificado». (Mt 27, 26)",
            offering: "Ofrecemos este segundo misterio por los que sufren, los enfermos y quienes pasan momentos de angustia.",
            img: "src/img/dolorosos/dolorosos_2.png"
        },
        {
            num: 3,
            title: "La Coronación de Espinas",
            quote: "«Y trenzando una corona de espinas, se la pusieron sobre la cabeza, y en su mano derecha una caña; doblando la rodilla delante de él, le hacían burla diciendo: ¡Salve, Rey de los judíos!». (Mt 27, 29)",
            offering: "Ofrecemos este tercer misterio para que Dios nos conceda hacer su santa voluntad y reine la humildad en nosotros.",
            img: "src/img/dolorosos/dolorosos_3.png"
        },
        {
            num: 4,
            title: "Jesús con la Cruz a cuestas camino del Calvario",
            quote: "«Y cargando él mismo con la cruz, salió hacia el lugar llamado la Calavera, en hebreo Gólgota». (Jn 19, 17)",
            offering: "Ofrecemos este cuarto misterio para que Dios nos conceda la fortaleza de cargar nuestra cruz de cada día y seguir a Cristo.",
            img: "src/img/dolorosos/dolorosos_4.png"
        },
        {
            num: 5,
            title: "La Crucifixión y Muerte de Nuestro Señor Jesucristo",
            quote: "«Llegados al lugar llamado la Calavera, le crucificaron allí... Jesús dijo: Padre, perdónalos, porque no saben lo que hacen... e inclinando la cabeza, entregó el espíritu». (Lc 23, 33-34; Jn 19, 30)",
            offering: "Ofrecemos este quinto misterio para contemplar a Cristo que dio su vida por nuestra salvación y nos entregó a María por Madre.",
            img: "src/img/dolorosos/dolorosos_5.png"
        }
    ],
    Luminosos: [
        {
            num: 1,
            title: "El Bautismo de Jesús en el Jordán",
            quote: "«Bautizado Jesús, salió luego del agua; y en esto se abrieron los cielos y vio al Espíritu de Dios que bajaba en forma de paloma y venía sobre él. Y una voz del cielo decía: Este es mi Hijo amado, en quien me complazco». (Mt 3, 16-17)",
            offering: "Ofrecemos este primer misterio por las almas del purgatorio y la gracia de vivir nuestra fe bautismal.",
            img: "src/img/luminosos/luminosos_1.png"
        },
        {
            num: 2,
            title: "La Autorrevelación de Jesús en las Bodas de Caná",
            quote: "«Faltando el vino, la madre de Jesús le dice: No tienen vino... Dice su madre a los sirvientes: Haced lo que él os diga». (Jn 2, 3.5)",
            offering: "Ofrecemos este segundo misterio por todos los matrimonios y familias del mundo.",
            img: "src/img/luminosos/luminosos_2.png"
        },
        {
            num: 3,
            title: "El Anuncio del Reino de Dios y la llamada a la conversión",
            quote: "«El tiempo se ha cumplido y el Reino de Dios está cerca; convertíos y creed en el Evangelio». (Mc 1, 15)",
            offering: "Ofrecemos este tercer misterio para que el Reino de los cielos florezca en nuestros corazones y en nuestras obras.",
            img: "src/img/luminosos/luminosos_3.png"
        },
        {
            num: 4,
            title: "La Transfiguración de Jesús en el Monte Tabor",
            quote: "«Y se transfiguró delante de ellos: su rostro brilló como el sol y sus vestidos se volvieron blancos como la luz». (Mt 17, 2)",
            offering: "Ofrecemos este cuarto misterio para alcanzar la pureza del alma y la luz de Cristo en nuestras vidas.",
            img: "src/img/luminosos/luminosos_4.png"
        },
        {
            num: 5,
            title: "La Institución de la Sagrada Eucaristía",
            quote: "«Tomó pan, pronunció la bendición, lo partió y se lo dio diciendo: Tomad, comed, este es mi cuerpo... Haced esto en memoria mía». (Mt 26, 26; Lc 22, 19)",
            offering: "Ofrecemos este quinto misterio para ser dignos de amar y comulgar el Cuerpo y la Sangre de Cristo en la Santa Misa.",
            img: "src/img/luminosos/luminosos_5.png"
        }
    ],
    Gloriosos: [
        {
            num: 1,
            title: "La Resurrección del Hijo de Dios",
            quote: "«¿Por qué buscáis entre los muertos al que vive? No está aquí, ha resucitado como había anunciado». (Lc 24, 5-6)",
            offering: "Ofrecemos este primer misterio por las almas del purgatorio.",
            img: "src/img/gloriosos/gloriosos_1.png"
        },
        {
            num: 2,
            title: "La Ascensión del Señor al Cielo",
            quote: "«El Señor Jesús, después de hablarles, ascendió a los cielos y se sentó a la derecha de Dios». (Mc 16, 19)",
            offering: "Ofrecemos este segundo misterio para que anhelemos los bienes eternos del Reino de Dios.",
            img: "src/img/gloriosos/gloriosos_2.png"
        },
        {
            num: 3,
            title: "La Venida del Espíritu Santo en Pentecostés",
            quote: "«Se les aparecieron unas lenguas como de fuego que se posaron sobre cada uno de ellos; quedaron todos llenos del Espíritu Santo». (Hch 2, 3-4)",
            offering: "Ofrecemos este tercer misterio para que el Espíritu Santo derrame sus siete dones sobre toda la Iglesia.",
            img: "src/img/gloriosos/gloriosos_3.png"
        },
        {
            num: 4,
            title: "La Asunción de la Santísima Virgen María al Cielo",
            quote: "«Todas las generaciones me llamarán bienaventurada, porque el Señor ha hecho obras grandes en mí». (Lc 1, 48-49)",
            offering: "Ofrecemos este cuarto misterio para contemplar la bendición inmensa de la vida eterna junto a la Virgen María.",
            img: "src/img/gloriosos/gloriosos_4.png"
        },
        {
            num: 5,
            title: "La Coronación de María como Reina de Cielos y Tierra",
            quote: "«Una gran señal apareció en el cielo: una mujer vestida del sol, con la luna bajo sus pies, y sobre su cabeza una corona de doce estrellas». (Ap 12, 1)",
            offering: "Ofrecemos este quinto misterio para aceptar confiadamente a María como nuestra Reina y Madre.",
            img: "src/img/gloriosos/gloriosos_5.png"
        }
    ]
};

// =============================================================================
// DATOS DE AUDIOS Y PUNTOS DE CONTROL POR IDIOMA
// =============================================================================
// Estructura compatible con el código original, ampliada con cálculo automático
// de cuentas y soporte para tiempos en "MM:SS" o segundos.
const audioData = {
    es: {
        names: {
            Gozosos: ["La Encarnación del Hijo de Dios", "La Visitación de María a Santa Isabel", "El Nacimiento de Jesús en Belén", "La Presentación en el Templo", "El Niño hallado en el Templo", "Letanías"],
            Dolorosos: ["La Oración en el Huerto", "La Flagelación del Señor", "La Coronación de Espinas", "Jesús con la Cruz a cuestas", "La Crucifixión y Muerte", "Letanías"],
            Luminosos: ["El Bautismo en el Jordán", "Las Bodas de Caná", "El Anuncio del Reino", "La Transfiguración", "La Institución de la Eucaristía", "Letanías"],
            Gloriosos: ["La Resurrección del Señor", "La Ascensión al Cielo", "La Venida del Espíritu Santo", "La Asunción de María", "La Coronación de María Reina", "Letanías"]
        },
        Gozosos: {
            src: "src/mp3/es/Gozosos.mp3",
            duration: 1988,
            checkpoints: [0, 186, 437, 708, 1008, 1287, 1569],
            // =========================================================================
            // AJUSTE DE TIEMPOS PERSONALIZADOS POR CUENTA
            // =========================================================================
            customTimes: {
                d1_meditacion: "03:06", // Anuncio y Meditación del 1er Misterio
                d1_pn: "03:39",         // Padre Nuestro del 1er Misterio
                d1_am_1: "03:56",       // 1ª Ave María del 1er Misterio
                d1_am_2: "04:14",       // 2ª Ave María
                d1_am_3: "04:31",       // 3ª Ave María
                d1_am_4: "04:48",       // 4ª Ave María
                d1_am_5: "05:04",       // 5ª Ave María
                d1_am_6: "05:22",       // 6ª Ave María
                d1_am_7: "05:40",       // 7ª Ave María
                d1_am_8: "05:58",       // 8ª Ave María
                d1_am_9: "06:16",       // 9ª Ave María
                d1_am_10: "06:34",      // 10ª Ave María
                d1_gl: "06:52"          // Gloria del 1er Misterio
            },
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },
                { s: 186, img: "src/img/gozosos/gozosos_1.png" },
                { s: 437, img: "src/img/gozosos/gozosos_2.png" },
                { s: 708, img: "src/img/gozosos/gozosos_3.png" },
                { s: 1008, img: "src/img/gozosos/gozosos_4.png" },
                { s: 1287, img: "src/img/gozosos/gozosos_5.png" },
                { s: 1569, img: "src/img/letanias.png" }
            ]
        },
        Dolorosos: {
            src: "src/mp3/es/Dolorosos.mp3",
            duration: 1863,
            checkpoints: [0, 186, 463, 711, 969, 1217, 1492],
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },
                { s: 186, img: "src/img/dolorosos/dolorosos_1.png" },
                { s: 463, img: "src/img/dolorosos/dolorosos_2.png" },
                { s: 711, img: "src/img/dolorosos/dolorosos_3.png" },
                { s: 969, img: "src/img/dolorosos/dolorosos_4.png" },
                { s: 1217, img: "src/img/dolorosos/dolorosos_5.png" },
                { s: 1492, img: "src/img/letanias.png" }
            ]
        },
        Luminosos: {
            src: "src/mp3/es/Luminosos.mp3",
            duration: 1863,
            checkpoints: [0, 186, 441, 707, 955, 1212, 1467],
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },
                { s: 186, img: "src/img/luminosos/luminosos_1.png" },
                { s: 441, img: "src/img/luminosos/luminosos_2.png" },
                { s: 707, img: "src/img/luminosos/luminosos_3.png" },
                { s: 955, img: "src/img/luminosos/luminosos_4.png" },
                { s: 1212, img: "src/img/luminosos/luminosos_5.png" },
                { s: 1467, img: "src/img/letanias.png" }
            ]
        },
        Gloriosos: {
            src: "src/mp3/es/Gloriosos.mp3",
            duration: 1863,
            checkpoints: [0, 186, 456, 703, 967, 1211, 1462],
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },
                { s: 186, img: "src/img/gloriosos/gloriosos_1.png" },
                { s: 456, img: "src/img/gloriosos/gloriosos_2.png" },
                { s: 703, img: "src/img/gloriosos/gloriosos_3.png" },
                { s: 967, img: "src/img/gloriosos/gloriosos_4.png" },
                { s: 1211, img: "src/img/gloriosos/gloriosos_5.png" },
                { s: 1462, img: "src/img/letanias.png" }
            ]
        }
    },
    en: {
        names: {
            Gozosos: ["The Annunciation of the Lord", "The Visitation of Mary to Elizabeth", "The Birth of Jesus", "The Presentation in the Temple", "The Finding in the Temple", "Litanies"],
            Dolorosos: ["The Agony in the Garden", "The Scourging at the Pillar", "The Crowning with Thorns", "The Carrying of the Cross", "The Crucifixion and Death", "Litanies"],
            Luminosos: ["The Baptism in the Jordan", "The Wedding at Cana", "The Proclamation of the Kingdom", "The Transfiguration", "The Institution of the Eucharist", "Litanies"],
            Gloriosos: ["The Resurrection", "The Ascension of the Lord", "The Descent of the Holy Spirit", "The Assumption of Mary", "The Coronation of Mary", "Litanies"]
        },
        Gozosos: {
            src: "src/mp3/en/Gozosos.mp3",
            duration: 1988,
            checkpoints: [0, 141, 329, 517, 706, 895, 1083],
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },
                { s: 141, img: "src/img/gozosos/gozosos_1.png" },
                { s: 329, img: "src/img/gozosos/gozosos_2.png" },
                { s: 517, img: "src/img/gozosos/gozosos_3.png" },
                { s: 706, img: "src/img/gozosos/gozosos_4.png" },
                { s: 895, img: "src/img/gozosos/gozosos_5.png" },
                { s: 1083, img: "src/img/letanias.png" }
            ]
        },
        Dolorosos: {
            src: "src/mp3/en/Dolorosos.mp3",
            duration: 1863,
            checkpoints: [0, 141, 329, 518, 706, 895, 1083],
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },
                { s: 141, img: "src/img/dolorosos/dolorosos_1.png" },
                { s: 329, img: "src/img/dolorosos/dolorosos_2.png" },
                { s: 518, img: "src/img/dolorosos/dolorosos_3.png" },
                { s: 706, img: "src/img/dolorosos/dolorosos_4.png" },
                { s: 895, img: "src/img/dolorosos/dolorosos_5.png" },
                { s: 1083, img: "src/img/letanias.png" }
            ]
        },
        Luminosos: {
            src: "src/mp3/en/Luminosos.mp3",
            duration: 1863,
            checkpoints: [0, 141, 329, 517, 706, 895, 1083],
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },
                { s: 141, img: "src/img/luminosos/luminosos_1.png" },
                { s: 329, img: "src/img/luminosos/luminosos_2.png" },
                { s: 517, img: "src/img/luminosos/luminosos_3.png" },
                { s: 706, img: "src/img/luminosos/luminosos_4.png" },
                { s: 895, img: "src/img/luminosos/luminosos_5.png" },
                { s: 1083, img: "src/img/letanias.png" }
            ]
        },
        Gloriosos: {
            src: "src/mp3/en/Gloriosos.mp3",
            duration: 1863,
            checkpoints: [0, 141, 329, 517, 706, 895, 1083],
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },
                { s: 141, img: "src/img/gloriosos/gloriosos_1.png" },
                { s: 329, img: "src/img/gloriosos/gloriosos_2.png" },
                { s: 517, img: "src/img/gloriosos/gloriosos_3.png" },
                { s: 706, img: "src/img/gloriosos/gloriosos_4.png" },
                { s: 895, img: "src/img/gloriosos/gloriosos_5.png" },
                { s: 1083, img: "src/img/letanias.png" }
            ]
        }
    },
    it: {
        names: {
            Gozosos: ["L'Annunciazione", "La Visitazione", "La Nascita di Gesù", "La Presentazione al Tempio", "Il Ritrovamento nel Tempio", "Litanie"],
            Dolorosos: ["L'Agonia nell'orto", "La Flagellazione", "L'Incoronazione di spine", "Il Viaggio al Calvario", "La Crocifissione", "Litanie"],
            Luminosos: ["Il Battesimo nel Giordano", "Le Nozze di Cana", "L'Annuncio del Regno", "La Trasfigurazione", "L'Eucaristia", "Litanie"],
            Gloriosos: ["La Risurrezione", "L'Ascensione al Cielo", "La Discesa dello Spirito Santo", "L'Assunzione di Maria", "L'Incoronazione di Maria", "Litanie"]
        },
        Gozosos: { src: "src/mp3/it/Gozosos.mp3", duration: 1988, checkpoints: [0, 82, 394, 701, 1005, 1308, 1625] },
        Dolorosos: { src: "src/mp3/it/Dolorosos.mp3", duration: 1863, checkpoints: [0, 78, 395, 713, 1040, 1328, 1658] },
        Luminosos: { src: "src/mp3/it/Luminosos.mp3", duration: 1863, checkpoints: [0, 83, 399, 703, 1024, 1344, 1667] },
        Gloriosos: { src: "src/mp3/it/Gloriosos.mp3", duration: 1863, checkpoints: [0, 81, 408, 704, 1041, 1362, 1667] }
    },
    la: {
        names: {
            Gozosos: ["Annuntiatio", "Visitatio", "Nativitas", "Praesentatio", "Inventio in Templo", "Litaniae"],
            Dolorosos: ["Agonia in Horto", "Flagellatio", "Coronatio Spinis", "Baiulatio Crucis", "Crucifixio", "Litaniae"],
            Luminosos: ["Baptisma in Iordane", "Nuptiae Canenses", "Regni Dei Proclamatio", "Transfiguratio", "Eucharistiae Institutio", "Litaniae"],
            Gloriosos: ["Resurrectio", "Ascensio", "Descensus Spiritus Sancti", "Assumptio", "Coronatio in Caelo", "Litaniae"]
        },
        Gozosos: { src: "src/mp3/la/Gozosos.mp3", duration: 1988, checkpoints: [0, 82, 394, 701, 1005, 1308, 1625] },
        Dolorosos: { src: "src/mp3/la/Dolorosos.mp3", duration: 1863, checkpoints: [0, 78, 395, 713, 1040, 1328, 1658] },
        Luminosos: { src: "src/mp3/la/Luminosos.mp3", duration: 1863, checkpoints: [0, 83, 399, 703, 1024, 1344, 1667] },
        Gloriosos: { src: "src/mp3/la/Gloriosos.mp3", duration: 1863, checkpoints: [0, 81, 408, 704, 1041, 1362, 1667] }
    },
    fr: {
        names: {
            Gozosos: ["L'Annonciation", "La Visitation", "La Nativité", "La Présentation au Temple", "Le Recouvrement au Temple", "Litanies"],
            Dolorosos: ["L'Agonie au Jardin", "La Flagellation", "Le Couronnement d'épines", "Le Portement de Croix", "Le Crucifiement", "Litanies"],
            Luminosos: ["Le Baptême au Jourdain", "Les Noces de Cana", "L'Annonce du Royaume", "La Transfiguration", "L'Institution de l'Eucharistie", "Litanies"],
            Gloriosos: ["La Résurrection", "L'Ascension", "La Pentecôte", "L'Assomption", "Le Couronnement de Marie", "Litanies"]
        },
        Gozosos: { src: "src/mp3/fr/Gozosos.mp3", duration: 1988, checkpoints: [0, 82, 394, 701, 1005, 1308, 1625] },
        Dolorosos: { src: "src/mp3/fr/Dolorosos.mp3", duration: 1863, checkpoints: [0, 78, 395, 713, 1040, 1328, 1658] },
        Luminosos: { src: "src/mp3/fr/Luminosos.mp3", duration: 1863, checkpoints: [0, 83, 399, 703, 1024, 1344, 1667] },
        Gloriosos: { src: "src/mp3/fr/Gloriosos.mp3", duration: 1863, checkpoints: [0, 81, 408, 704, 1041, 1362, 1667] }
    },
    pt: {
        names: {
            Gozosos: ["A Anunciação", "A Visitação", "O Nascimento de Jesus", "A Apresentação no Templo", "A Perda e Encontro", "Ladainhas"],
            Dolorosos: ["A Agonia no Horto", "A Flagelação", "A Coroação de Espinhos", "O Caminho do Calvário", "A Crucificação e Morte", "Ladainhas"],
            Luminosos: ["O Batismo no Jordão", "As Bodas de Caná", "O Anúncio do Reino", "A Transfiguração", "A Instituição da Eucaristia", "Ladainhas"],
            Gloriosos: ["A Ressurreição", "A Ascensão ao Céu", "A Vinda do Espírito Santo", "A Assunção de Maria", "A Coroação de Maria", "Ladainhas"]
        },
        Gozosos: { src: "src/mp3/pt/Gozosos.mp3", duration: 1988, checkpoints: [0, 82, 394, 701, 1005, 1308, 1625] },
        Dolorosos: { src: "src/mp3/pt/Dolorosos.mp3", duration: 1863, checkpoints: [0, 78, 395, 713, 1040, 1328, 1658] },
        Luminosos: { src: "src/mp3/pt/Luminosos.mp3", duration: 1863, checkpoints: [0, 83, 399, 703, 1024, 1344, 1667] },
        Gloriosos: { src: "src/mp3/pt/Gloriosos.mp3", duration: 1863, checkpoints: [0, 81, 408, 704, 1041, 1362, 1667] }
    }
};

// =============================================================================
// GESTIÓN DE TIEMPOS PERSONALIZADOS (ALMACENAMIENTO Y LECTURA)
// =============================================================================

const ROSARY_CUSTOM_TIMES_KEY = 'rosary_custom_times_v1';

// Obtiene los tiempos personalizados efectivos combinando audioData con localStorage
function getEffectiveCustomTimes(lang, mysteryKey) {
    const custom = {};
    if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][mysteryKey] && audioData[lang][mysteryKey].customTimes) {
        Object.assign(custom, audioData[lang][mysteryKey].customTimes);
    }
    try {
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(ROSARY_CUSTOM_TIMES_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed[lang] && parsed[lang][mysteryKey]) {
                    Object.assign(custom, parsed[lang][mysteryKey]);
                }
            }
        }
    } catch (e) {
        console.warn("Aviso: no se pudo leer localStorage:", e);
    }
    return custom;
}

// Guarda tiempos personalizados en localStorage
function saveCustomTimesToStorage(lang, mysteryKey, timesObj) {
    try {
        if (typeof localStorage === 'undefined') return;
        const raw = localStorage.getItem(ROSARY_CUSTOM_TIMES_KEY);
        const all = raw ? JSON.parse(raw) : {};
        if (!all[lang]) all[lang] = {};
        all[lang][mysteryKey] = Object.assign({}, all[lang][mysteryKey] || {}, timesObj);
        localStorage.setItem(ROSARY_CUSTOM_TIMES_KEY, JSON.stringify(all));
    } catch (e) {
        console.error("Error guardando en localStorage:", e);
    }
}

// Elimina tiempos personalizados de localStorage para restaurar originales
function clearCustomTimesFromStorage(lang, mysteryKey) {
    try {
        if (typeof localStorage === 'undefined') return;
        const raw = localStorage.getItem(ROSARY_CUSTOM_TIMES_KEY);
        if (!raw) return;
        const all = JSON.parse(raw);
        if (all[lang] && all[lang][mysteryKey]) {
            delete all[lang][mysteryKey];
            localStorage.setItem(ROSARY_CUSTOM_TIMES_KEY, JSON.stringify(all));
        }
    } catch (e) {
        console.error("Error limpiando localStorage:", e);
    }
}

// Obtiene todo el registro de localStorage
function getAllStoredCustomTimes() {
    try {
        if (typeof localStorage === 'undefined') return {};
        const raw = localStorage.getItem(ROSARY_CUSTOM_TIMES_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

// =============================================================================
// DEFINICIÓN DE ESTRUCTURA CANÓNICA DE LAS 75 CUENTAS / EVENTOS DEL ROSARIO
// =============================================================================
// Esta función provee la lista completa y organizada de todas las cuentas,
// oraciones, badges y tiempos (calculados o personalizados) para el formulario
// de sincronización y para la generación de la línea de tiempo interactiva.
function getRosaryStructureDefinition(lang = 'es', mysteryKey = 'Gozosos') {
    const prayers = rosaryPrayers[lang] || rosaryPrayers.es;
    const details = mysteryDetails[mysteryKey] || mysteryDetails.Gozosos;
    const mData = (audioData[lang] && audioData[lang][mysteryKey]) ? audioData[lang][mysteryKey] : (audioData.es[mysteryKey] || audioData.es.Gozosos);
    const checkpoints = mData.checkpoints || [0, 186, 437, 708, 1008, 1287, 1569];
    const totalDuration = mData.duration || 1900;
    const customTimes = getEffectiveCustomTimes(lang, mysteryKey);
    const introEnd = checkpoints[1] || 186;

    const sections = [
        {
            id: "sync-sec-intro",
            title: "📿 Oraciones Iniciales (Colgante y Crucifijo)",
            items: [
                {
                    key: "crucifix_intro",
                    badge: "† Cruz",
                    title: prayers.senalCruz ? prayers.senalCruz.title : "Señal de la Cruz",
                    subtitle: "Principio del Santo Rosario",
                    beadId: "crucifix",
                    type: "intro_start",
                    decade: 0,
                    beadNum: 0,
                    prayerText: prayers.senalCruz.text + "\n\n" + prayers.invocacion.text + "\n\n" + prayers.actoContricion.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: 0
                },
                {
                    key: "credo",
                    badge: "† Credo",
                    title: prayers.credo ? prayers.credo.title : "Credo de los Apóstoles",
                    subtitle: "Símbolo de los Apóstoles",
                    beadId: "crucifix",
                    type: "credo",
                    decade: 0,
                    beadNum: 0,
                    prayerText: prayers.credo.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: Math.round(introEnd * 0.22)
                },
                {
                    key: "intro_pn",
                    badge: "○ Grande",
                    title: prayers.padreNuestroIntro ? prayers.padreNuestroIntro.title : "Padre Nuestro",
                    subtitle: "Por las intenciones del Santo Padre",
                    beadId: "intro_pn",
                    type: "padre_nuestro",
                    decade: 0,
                    beadNum: 0,
                    prayerText: prayers.padreNuestroIntro.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: Math.round(introEnd * 0.48)
                },
                {
                    key: "intro_am_1",
                    badge: "• Fe",
                    title: prayers.aveMariaFe ? prayers.aveMariaFe.title : "1ª Ave María (Fe)",
                    subtitle: "1ª Ave María — Por el aumento de la Fe",
                    beadId: "intro_am_1",
                    type: "ave_maria",
                    decade: 0,
                    beadNum: 1,
                    prayerText: prayers.aveMariaFe.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: Math.round(introEnd * 0.62)
                },
                {
                    key: "intro_am_2",
                    badge: "• Esperanza",
                    title: prayers.aveMariaEsperanza ? prayers.aveMariaEsperanza.title : "2ª Ave María (Esperanza)",
                    subtitle: "2ª Ave María — Por el aumento de la Esperanza",
                    beadId: "intro_am_2",
                    type: "ave_maria",
                    decade: 0,
                    beadNum: 2,
                    prayerText: prayers.aveMariaEsperanza.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: Math.round(introEnd * 0.74)
                },
                {
                    key: "intro_am_3",
                    badge: "• Caridad",
                    title: prayers.aveMariaCaridad ? prayers.aveMariaCaridad.title : "3ª Ave María (Caridad)",
                    subtitle: "3ª Ave María — Por el aumento de la Caridad",
                    beadId: "intro_am_3",
                    type: "ave_maria",
                    decade: 0,
                    beadNum: 3,
                    prayerText: prayers.aveMariaCaridad.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: Math.round(introEnd * 0.85)
                },
                {
                    key: "intro_gloria",
                    badge: "○ Gloria",
                    title: prayers.gloria ? prayers.gloria.title : "Gloria al Padre",
                    subtitle: "Gloria y Jaculatoria Inicial",
                    beadId: "intro_gloria",
                    type: "gloria",
                    decade: 0,
                    beadNum: 0,
                    prayerText: prayers.gloria.text + "\n\n" + prayers.jaculatoria.text,
                    img: `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}.png`,
                    defaultSec: Math.round(introEnd * 0.94)
                }
            ]
        }
    ];

    // Las 5 Decenas / Misterios
    for (let d = 1; d <= 5; d++) {
        const start = checkpoints[d];
        const end = d < 5 ? checkpoints[d + 1] : checkpoints[6];
        const dur = end - start;
        const info = details[d - 1];
        const mysteryTitle = info ? info.title : `${d}º Misterio`;
        const img = info ? info.img : `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}_${d}.png`;

        const pnBeadId = d === 1 ? "medal" : (d === 2 ? "d1_gl" : (d === 3 ? "d2_gl" : (d === 4 ? "d3_gl" : "d4_gl")));
        const glBeadId = d === 1 ? "d1_gl" : (d === 2 ? "d2_gl" : (d === 3 ? "d3_gl" : (d === 4 ? "d4_gl" : "medal")));

        const amStart = Math.round(start + dur * 0.22);
        const amEnd = Math.round(start + dur * 0.90);
        const amStep = (amEnd - amStart) / 9;

        const decadeItems = [
            {
                key: `d${d}_meditacion`,
                badge: "📖 Cita",
                title: `${d}º Misterio: ${mysteryTitle}`,
                subtitle: "Anuncio del Misterio y Meditación",
                beadId: pnBeadId,
                type: "meditacion",
                decade: d,
                beadNum: 0,
                prayerText: info ? (info.quote + "\n\n" + info.offering) : '',
                img: img,
                defaultSec: start
            },
            {
                key: `d${d}_pn`,
                badge: "○ P. Nuestro",
                title: `Padre Nuestro — ${d}º Misterio`,
                subtitle: mysteryTitle,
                beadId: pnBeadId,
                type: "padre_nuestro",
                decade: d,
                beadNum: 0,
                prayerText: prayers.padreNuestro.text,
                img: img,
                defaultSec: Math.round(start + dur * 0.13)
            }
        ];

        for (let i = 1; i <= 10; i++) {
            decadeItems.push({
                key: `d${d}_am_${i}`,
                badge: `• ${i}/10`,
                title: `${i}ª Ave María — ${d}º Misterio`,
                subtitle: `Cuenta ${i} de 10 • ${mysteryTitle}`,
                beadId: `d${d}_am_${i}`,
                type: "ave_maria",
                decade: d,
                beadNum: i,
                prayerText: prayers.aveMaria.text,
                img: img,
                defaultSec: Math.round(amStart + (i - 1) * amStep)
            });
        }

        decadeItems.push({
            key: `d${d}_gl`,
            badge: "○ Gloria",
            title: `Gloria y Jaculatoria — ${d}º Misterio`,
            subtitle: "Alabanza a la Santísima Trinidad",
            beadId: glBeadId,
            type: "gloria",
            decade: d,
            beadNum: 0,
            prayerText: prayers.gloria.text + "\n\n" + prayers.jaculatoria.text,
            img: img,
            defaultSec: Math.round(start + dur * 0.91)
        });

        sections.push({
            id: `sync-sec-d${d}`,
            title: `🕊️ ${d}º Misterio: ${mysteryTitle}`,
            items: decadeItems
        });
    }

    // Letanías Lauretanas y Conclusión
    const letStart = checkpoints[6];
    const letDur = totalDuration - letStart;
    sections.push({
        id: "sync-sec-letanias",
        title: "🌹 Letanías Lauretanas y Conclusión",
        items: [
            {
                key: "salve",
                badge: "👑 Salve",
                title: prayers.salve ? prayers.salve.title : "La Salve",
                subtitle: "Oración a Nuestra Señora",
                beadId: "medal",
                type: "salve",
                decade: 6,
                beadNum: 0,
                prayerText: prayers.salve.text,
                img: "src/img/letanias.png",
                defaultSec: letStart
            },
            {
                key: "letanias",
                badge: "📜 Letanías",
                title: prayers.letanias ? prayers.letanias.title : "Letanías Lauretanas",
                subtitle: "Súplicas a la Santísima Virgen María",
                beadId: "medal",
                type: "letanias",
                decade: 6,
                beadNum: 0,
                prayerText: prayers.letanias.text,
                img: "src/img/letanias.png",
                defaultSec: Math.round(letStart + Math.min(65, letDur * 0.16))
            },
            {
                key: "oracion_final",
                badge: "† Final",
                title: prayers.oracionFinal ? prayers.oracionFinal.title : "Oración Final",
                subtitle: "Bendición Final",
                beadId: "crucifix",
                type: "oracion_final",
                decade: 6,
                beadNum: 0,
                prayerText: prayers.oracionFinal.text,
                img: "src/img/inicio.png",
                defaultSec: Math.round(letStart + Math.min(270, letDur * 0.85))
            }
        ]
    });

    // Calcular tiempo efectivo y formateado para cada elemento
    sections.forEach(sec => {
        sec.items.forEach(item => {
            const effectiveSec = (customTimes[item.key] !== undefined) ? toSec(customTimes[item.key]) : item.defaultSec;
            item.sec = effectiveSec;
            item.formatted = formatTime(effectiveSec);
            item.isCustom = (customTimes[item.key] !== undefined);
        });
    });

    return sections;
}

// =============================================================================
// GENERADOR DINÁMICO DE LÍNEA DE TIEMPO
// =============================================================================
function generateDetailedTimeline(mysteryKey, mysteryObj, lang = 'es') {
    const structure = getRosaryStructureDefinition(lang, mysteryKey);
    const steps = [];

    structure.forEach(sec => {
        sec.items.forEach(item => {
            steps.push({
                key: item.key,
                s: item.sec,
                beadId: item.beadId,
                type: item.type,
                decade: item.decade,
                beadNum: item.beadNum,
                title: item.title,
                subtitle: item.subtitle,
                prayerText: item.prayerText,
                img: item.img
            });
        });
    });

    // Ordenar cronológicamente según el tiempo en segundos
    steps.sort((a, b) => a.s - b.s);

    return steps;
}
