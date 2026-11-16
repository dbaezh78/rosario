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
    "es": {
        "senalCruz": {
            "title": "Señal de la Cruz",
            "text": "Por la señal de la Santa Cruz, de nuestros enemigos líbranos Señor, Dios nuestro.\n\nEn el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."
        },
        "invocacion": {
            "title": "Invocación al Espíritu Santo",
            "text": "Dios mío, ven en mi auxilio. Señor, date prisa en socorrerme.\n\nGloria al Padre y al Hijo y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén."
        },
        "actoContricion": {
            "title": "Acto de Contrición",
            "text": "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión: por mi culpa, por mi culpa, por mi gran culpa.\n\nPor eso ruego a Santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor. Amén.\n\nDios todopoderoso tenga piedad de nosotros, perdone nuestros pecados y nos lleve a la vida eterna. Amén."
        },
        "credo": {
            "title": "Credo de los Apóstoles",
            "text": "Creo en Dios Padre Todopoderoso, Creador del cielo y de la tierra.\n\nCreo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios Padre Todopoderoso.\n\nDesde allí ha de venir a juzgar a vivos y muertos.\n\nCreo en el Espíritu Santo, la santa Iglesia Católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén."
        },
        "padreNuestroIntro": {
            "title": "Padre Nuestro (Por las intenciones del Santo Padre)",
            "text": "Padre nuestro, que estás en el cielo, santificado sea tu nombre, venga a nosotros tu reino, hágase tu voluntad, en la tierra como en el cielo. Danos hoy nuestro pan de cada día, perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden. No nos dejes caer en la tentación, y líbranos del mal. Amén"
        },
        "padreNuestro": {
            "title": "Padre Nuestro",
            "text": "Padre nuestro, que estás en el cielo, santificado sea tu nombre, venga a nosotros tu reino, hágase tu voluntad, en la tierra como en el cielo. Danos hoy nuestro pan de cada día, perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden. No nos dejes caer en la tentación, y líbranos del mal. Amén"
        },
        "aveMariaFe": {
            "title": "1ª Ave María (Por el aumento de la Fe)",
            "text": "Dios te Salve, María, llena eres de gracia, el Señor está contigo. Bendita tú eres entre todas las mujeres y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén"
        },
        "aveMariaEsperanza": {
            "title": "2ª Ave María (Por el aumento de la Esperanza)",
            "text": "Dios te Salve, María, llena eres de gracia, el Señor está contigo. Bendita tú eres entre todas las mujeres y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén"
        },
        "aveMariaCaridad": {
            "title": "3ª Ave María (Por el aumento de la Caridad)",
            "text": "Dios te Salve, María, llena eres de gracia, el Señor está contigo. Bendita tú eres entre todas las mujeres y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén"
        },
        "aveMaria": {
            "title": "Ave María",
            "text": "Dios te Salve, María, llena eres de gracia, el Señor está contigo. Bendita tú eres entre todas las mujeres y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén"
        },
        "gloria": {
            "title": "Gloria al Padre",
            "text": "Gloria al Padre y al Hijo y al Espíritu Santo. Como era en el principio ahora y siempre, por los siglos de los siglos. Amén."
        },
        "jaculatoria": {
            "title": "Jaculatoria y Oración de Fátima",
            "text": "Ave María Purísima, sin pecado concebida.\nMaría, Madre de gracia, Madre de piedad y misericordia, en la vida y en la muerte ampáranos, gran Señora.\n\nOh Jesús mío, perdona nuestras culpas y pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia. Amén."
        },
        "salve": {
            "title": "La Salve (Dios te Salve, Reina y Madre)",
            "text": "Dios te Salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra, Dios te salve.\nA ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando, en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos, y, después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María!"
        },
        "letanias": {
            "title": "Letanías Lauretanas a la Santísima Virgen",
            "text": "LETANÍAS DE LA VIRGEN\n\nSeñor, ten piedad\nCristo, ten piedad\nSeñor, ten piedad.\nCristo, óyenos.\nCristo, escúchanos.\n\nDios, Padre celestial, \nten piedad de nosotros.\n\nDios, Hijo, Redentor del mundo, \nDios, Espíritu Santo, \nSantísima Trinidad, un solo Dios,\n\nSanta María, \nruega por nosotros.\nSanta Madre de Dios,\nSanta Virgen de las Vírgenes,\nMadre de Cristo, \nMadre de la Iglesia, \nMadre de la misericordia, \nMadre de la divina gracia, \nMadre de la esperanza, \nMadre purísima, \nMadre castísima, \nMadre siempre virgen,\nMadre inmaculada, \nMadre amable, \nMadre admirable, \nMadre del buen consejo, \nMadre del Creador, \nMadre del Salvador, \nVirgen prudentísima, \nVirgen digna de veneración, \nVirgen digna de alabanza, \nVirgen poderosa, \nVirgen clemente, \nVirgen fiel, \nEspejo de justicia, \nTrono de la sabiduría, \nCausa de nuestra alegría, \nVaso espiritual, \nVaso digno de honor, \nVaso de insigne devoción, \nRosa mística, \nTorre de David, \nTorre de marfil, \nCasa de oro, \nArca de la Alianza, \nPuerta del cielo, \nEstrella de la mañana, \nSalud de los enfermos, \nRefugio de los pecadores, \nConsuelo de los migrantes,\nConsoladora de los afligidos, \nAuxilio de los cristianos, \nReina de los Ángeles, \nReina de los Patriarcas, \nReina de los Profetas, \nReina de los Apóstoles, \nReina de los Mártires, \nReina de los Confesores, \nReina de las Vírgenes, \nReina de todos los Santos, \nReina concebida sin pecado original, \nReina asunta a los Cielos, \nReina del Santísimo Rosario, \nReina de la familia, \nReina de la paz.\n\nCordero de Dios, que quitas el pecado del mundo, \nperdónanos, Señor.\n\nCordero de Dios, que quitas el pecado del mundo, \nescúchanos, Señor.\n\nCordero de Dios, que quitas el pecado del mundo, \nten misericordia de nosotros.\n\nRuega por nosotros, Santa Madre de Dios. \nPara que seamos dignos de las promesas de Cristo."
        },
        "oracionFinal": {
            "title": "Oración Final y Bendición",
            "text": "Te rogamos nos concedas, \nSeñor Dios nuestro, \ngozar de continua salud de alma y cuerpo, \ny por la gloriosa intercesión \nde la bienaventurada siempre Virgen María, \nvernos libres de las tristezas de la vida presente \ny disfrutar de las alegrías eternas. \nPor Cristo nuestro Señor. \nAmén.\n\nEn el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén."
        }
    },
    "en": {
        "senalCruz": {
            "title": "Sign of the Cross",
            "text": "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."
        },
        "invocacion": {
            "title": "Invocation",
            "text": "O God, come to my assistance. O Lord, make haste to help me.\n\nGlory be to the Father, and to the Son, and to the Holy Spirit. Amen."
        },
        "actoContricion": {
            "title": "Act of Contrition",
            "text": "I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do: through my fault, through my fault, through my most grievous fault. Therefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God. Amen."
        },
        "credo": {
            "title": "The Apostles' Creed",
            "text": "I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord: Who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead.\n\nI believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen."
        },
        "padreNuestroIntro": {
            "title": "Our Father (For the intentions of the Holy Father)",
            "text": "Our Father, who art in heaven, hallowed be thy name, thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread and forgive us our trespasses as we forgive those who trespass against us, and lead us not into temptation but deliver us from evil. Amen."
        },
        "padreNuestro": {
            "title": "Our Father",
            "text": "Our Father, who art in heaven, hallowed be thy name, thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread and forgive us our trespasses as we forgive those who trespass against us, and lead us not into temptation but deliver us from evil. Amen."
        },
        "aveMariaFe": {
            "title": "1st Hail Mary (For Faith)",
            "text": "Hail, Mary, full of grace, the Lord is with thee: blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now, and at the hour of our death. Amen."
        },
        "aveMariaEsperanza": {
            "title": "2nd Hail Mary (For Hope)",
            "text": "Hail, Mary, full of grace, the Lord is with thee: blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now, and at the hour of our death. Amen."
        },
        "aveMariaCaridad": {
            "title": "3rd Hail Mary (For Charity)",
            "text": "Hail, Mary, full of grace, the Lord is with thee: blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now, and at the hour of our death. Amen."
        },
        "aveMaria": {
            "title": "Hail Mary",
            "text": "Hail, Mary, full of grace, the Lord is with thee: blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now, and at the hour of our death. Amen."
        },
        "gloria": {
            "title": "Glory Be",
            "text": "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen."
        },
        "jaculatoria": {
            "title": "Fatima Prayer",
            "text": "O My Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen."
        },
        "salve": {
            "title": "Hail, Holy Queen (Salve Regina)",
            "text": "Hail, holy Queen, mother of mercy; hail, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy towards us; and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Amen."
        },
        "letanias": {
            "title": "The Litany of Loreto",
            "text": "The Litany of Loreto\nLord have mercy.\nChrist have mercy.\nLord have mercy.\nChrist hear us.\nChrist graciously hear us.\n\nGod, the Father of heaven, \nhave mercy on us.\n\nGod the Son, Redeemer of the world, \nGod the Holy Spirit, \nHoly Trinity, one God,\n\nHoly Mary, \npray for us.\nHoly Mother of God,\nHoly Virgin of virgins, \nMother of Christ, \nMother of the Church, \nMother of Mercy,\nMother of divine grace,\nMother of Hope, \nMother most pure, \nMother most chaste, \nMother inviolate, \nMother undefiled, \nMother most amiable, \nMother most admirable, \nMother of good counsel, \nMother of our Creator, \nMother of our Saviour, \nVirgin most prudent, \nVirgin most venerable, \nVirgin most renowned, \nVirgin most powerful, \nVirgin most merciful, \nVirgin most faithful, \nMirror of justice, \nSeat of wisdom, \nCause of our joy, \nSpiritual vessel, \nVessel of honour, \nSingular vessel of devotion, \nMystical rose, \nTower of David, \nTower of ivory, \nHouse of gold, \nArk of the covenant, \nGate of heaven, \nMorning star, \nHealth of the sick, \nRefuge of sinners, \nSolace of Migrants,\nComfort of the afflicted, \nHelp of Christians, \nQueen of Angels, \nQueen of Patriarchs, \nQueen of Prophets, \nQueen of Apostles, \nQueen of Martyrs, \nQueen of Confessors, \nQueen of Virgins, \nQueen of all Saints, \nQueen conceived without original sin, \nQueen assumed into heaven, \nQueen of the most holy Rosary, \nQueen of families, \nQueen of peace.\n\nLamb of God, who takes away the sins of the world, \nspare us, O Lord.\n\nLamb of God, who takes away the sins of the world, \ngraciously hear us, O Lord.\n\nLamb of God, who takes away the sins of the world, \nhave mercy on us.\n\nPray for us, O holy Mother of God. \nThat we may be made worthy of the promises of Christ."
        },
        "oracionFinal": {
            "title": "Concluding Prayer",
            "text": "Grant, we beseech thee, \nO Lord God, \nthat we, your servants,\nmay enjoy perpetual health of mind and body; \nand by the glorious intercession of the Blessed Mary, ever Virgin, \nmay be delivered from present sorrow, \nand obtain eternal joy. \nThrough Christ our Lord. \nAmen."
        }
    },
    "la": {
        "senalCruz": {
            "title": "Signum Crucis",
            "text": "In nomine Patris, et Filii, et Spiritus Sancti. Amen."
        },
        "invocacion": {
            "title": "Invocatio",
            "text": "Deus, in adiutorium meum intende. Domine, ad adiuvandum me festina.\n\nGloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen."
        },
        "actoContricion": {
            "title": "Actus Contritionis",
            "text": "Confiteor Deo omnipotenti et vobis, fratres, quia peccavi nimis cogitatione, verbo, opere et omissione: mea culpa, mea culpa, mea maxima culpa. Ideo precor beatam Mariam semper Virginem, omnes Angelos et Sanctos, et vos, fratres, orare pro me ad Dominum Deum nostrum. Amen."
        },
        "credo": {
            "title": "Symbolum Apostolorum",
            "text": "Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae. Et in Iesum Christum, Filium eius unicum, Dominum nostrum: qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus, descendit ad inferos, tertia die resurrexit a mortuis, ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis, inde venturus est iudicare vivos et mortuos.\n\nCredo in Spiritum Sanctum, sanctam Ecclesiam catholicam, sanctorum communionem, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen."
        },
        "padreNuestroIntro": {
            "title": "Pater Noster (Pro summi Pontificis)",
            "text": "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem: sed libera nos a malo. Amen."
        },
        "padreNuestro": {
            "title": "Pater Noster",
            "text": "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem: sed libera nos a malo. Amen."
        },
        "aveMariaFe": {
            "title": "Ave Maria (Fides)",
            "text": "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen."
        },
        "aveMariaEsperanza": {
            "title": "Ave Maria (Spes)",
            "text": "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen."
        },
        "aveMariaCaridad": {
            "title": "Ave Maria (Caritas)",
            "text": "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen."
        },
        "aveMaria": {
            "title": "Ave Maria",
            "text": "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen."
        },
        "gloria": {
            "title": "Gloria Patri",
            "text": "Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen."
        },
        "jaculatoria": {
            "title": "Oratio Fatimae",
            "text": "O mi Iesu, dimitte nobis debita nostra, libera nos ab igne inferni, perduc in caelum omnes animas, praesertim eas, quae misericordiae tuae maxime indigent. Amen."
        },
        "salve": {
            "title": "Salve Regina",
            "text": "Salve, Regina, Mater misericordiae, vita, dulcedo, et spes nostra, salve. Ad te clamamus exsules filii Hevae. Ad te suspiramus gementes et flentes in hac lacrimarum valle. Eia, ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, o pia, o dulcis Virgo Maria. Ora pro nobis, Sancta Dei Genetrix, ut digni efficiamur promissionibus Christi. Amen."
        },
        "letanias": {
            "title": "Litaniae Lauretanae",
            "text": "Kyrie, eleison. Christe, eleison. Kyrie, eleison. Christe, audi nos. Christe, exaudi nos.\n\nPater de caelis, Deus, miserere nobis.\nFilius, Redemptor mundi, Deus, miserere nobis.\nSpiritus Sancte, Deus, miserere nobis.\nSancta Trinitas, unus Deus, miserere nobis.\n\nSancta Maria, ora pro nobis.\nSancta Dei Genetrix, ora pro nobis.\nSancta Virgo virginum, ora pro nobis.\nMater Christi, ora pro nobis.\nMater Ecclesiae, ora pro nobis.\nMater misericordiae, ora pro nobis.\nMater divinae gratiae, ora pro nobis.\nMater spei, ora pro nobis.\nMater purissima, ora pro nobis.\nMater castissima, ora pro nobis.\nMater inviolata, ora pro nobis.\nMater intemerata, ora pro nobis.\nMater amabilis, ora pro nobis.\nMater admirabilis, ora pro nobis.\nMater boni consilii, ora pro nobis.\nMater Creatoris, ora pro nobis.\nMater Salvatoris, ora pro nobis.\nVirgo prudentissima, ora pro nobis.\nVirgo veneranda, ora pro nobis.\nVirgo praedicanda, ora pro nobis.\nVirgo potens, ora pro nobis.\nVirgo clemens, ora pro nobis.\nVirgo fidelis, ora pro nobis.\nSpeculum iustitiae, ora pro nobis.\nSedes sapientiae, ora pro nobis.\nCausa nostrae laetitiae, ora pro nobis.\nVas spirituale, ora pro nobis.\nVas honorabile, ora pro nobis.\nVas insigne devotionis, ora pro nobis.\nRosa mystica, ora pro nobis.\nTurris Davidica, ora pro nobis.\nTurris eburnea, ora pro nobis.\nDomus aurea, ora pro nobis.\nFoederis arca, ora pro nobis.\nIanua caeli, ora pro nobis.\nStella matutina, ora pro nobis.\nSalus infirmorum, ora pro nobis.\nRefugium peccatorum, ora pro nobis.\nSolacium migrantium, ora pro nobis.\nConsolatrix afflictorum, ora pro nobis.\nAuxilium Christianorum, ora pro nobis.\nRegina Angelorum, ora pro nobis.\nRegina Patriarcharum, ora pro nobis.\nRegina Prophetarum, ora pro nobis.\nRegina Apostolorum, ora pro nobis.\nRegina Martyrum, ora pro nobis.\nRegina Confessorum, ora pro nobis.\nRegina Virginum, ora pro nobis.\nRegina Sanctorum omnium, ora pro nobis.\nRegina sine labe originali concepta, ora pro nobis.\nRegina in caelum assumpta, ora pro nobis.\nRegina sacratissimi Rosarii, ora pro nobis.\nRegina familiae, ora pro nobis.\nRegina pacis, ora pro nobis.\n\nAgnus Dei, qui tollis peccata mundi, parce nobis, Domine.\nAgnus Dei, qui tollis peccata mundi, exaudi nos, Domine.\nAgnus Dei, qui tollis peccata mundi, miserere nobis.\n\nOra pro nobis, Sancta Dei Genetrix. Ut digni efficiamur promissionibus Christi. Amen."
        },
        "oracionFinal": {
            "title": "Oratio Conclusiva",
            "text": "Oremus: Deus, cuius Unigenitus per vitam, mortem et resurrectionem suam nobis salutis aeternae praemia comparavit, concede, quaesumus: ut haec mysteria sacratissimo beatae Mariae Virginis Rosario recolentes, et imitemur quod continent, et quod promittunt assequamur. Per Christum Dominum nostrum. Amen."
        }
    },
    "fr": {
        "senalCruz": {
            "title": "Signe de la Croix",
            "text": "Au nom du Père, et du Fils, et du Saint-Esprit. Amen."
        },
        "invocacion": {
            "title": "Invocation",
            "text": "Dieu, viens à mon aide. Seigneur, à notre secours.\n\nGloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen."
        },
        "actoContricion": {
            "title": "Acte de Contrition",
            "text": "Je confesse à Dieu tout-puissant, je reconnais devant mes frères, que j'ai péché en pensée, en parole, par action et par omission. Oui, j'ai vraiment péché. C'est pourquoi je supplie la bienheureuse Vierge Marie, les anges et tous les saints, et vous aussi, mes frères, de prier pour moi le Seigneur notre Dieu. Amen."
        },
        "credo": {
            "title": "Symbole des Apôtres (Credo)",
            "text": "Je crois en Dieu, le Père tout-puissant, Créateur du ciel et de la terre.\n\nEt en Jésus Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers.\n\nLe troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d'où il viendra juger les vivants et les morts.\n\nJe crois en l'Esprit Saint, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Amen."
        },
        "padreNuestroIntro": {
            "title": "Notre Père (Pour les intentions du Saint-Père)",
            "text": "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour, pardonne-nous nos offenses, come nous pardonnons aussi à ceux qui nous ont offensés, et ne nous laisse pas entrer en tentation, mais délivre-nous du mal. Amen"
        },
        "padreNuestro": {
            "title": "Notre Père",
            "text": "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour, pardonne-nous nos offenses, come nous pardonnons aussi à ceux qui nous ont offensés, et ne nous laisse pas entrer en tentation, mais délivre-nous du mal. Amen"
        },
        "aveMariaFe": {
            "title": "1ère Je vous salue Marie (Pour la Foi)",
            "text": "Je vous salue, Marie, pleine de grâces, le Seigneur est avec vous, vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant, et à l'heure de notre mort. Amen"
        },
        "aveMariaEsperanza": {
            "title": "2ème Je vous salue Marie (Pour l'Espérance)",
            "text": "Je vous salue, Marie, pleine de grâces, le Seigneur est avec vous, vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant, et à l'heure de notre mort. Amen"
        },
        "aveMariaCaridad": {
            "title": "3ème Je vous salue Marie (Pour la Charité)",
            "text": "Je vous salue, Marie, pleine de grâces, le Seigneur est avec vous, vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant, et à l'heure de notre mort. Amen"
        },
        "aveMaria": {
            "title": "Je vous salue Marie",
            "text": "Je vous salue, Marie, pleine de grâces, le Seigneur est avec vous, vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant, et à l'heure de notre mort. Amen"
        },
        "gloria": {
            "title": "Gloire au Père",
            "text": "Gloire au Père et au Fils at au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen."
        },
        "jaculatoria": {
            "title": "Prière de Fatima",
            "text": "Ô mon Jésus, pardonne-nous nos péchés, préserve-nous du feu de l'enfer, et conduis au ciel toutes les âmes, surtout celles qui ont le plus besoin de ta miséricorde. Amen."
        },
        "salve": {
            "title": "Salut, ô Reine (Salve Regina)",
            "text": "Salut, ô Reine, mère de miséricorde: notre vie, notre douceur et notre espérance, salut!\nEnfants d'Ève, exilés, nous crions vers toi; vers toi, nous soupirons, gémissant et pleurant dans cette vallée de larmes.\nÔ toi, notre avocate, tourne vers nous ton regard miséricordieux. Et après cet exil, montre-nous Jésus, le fruit béni de tes entrailles, ô clémente, ô miséricordieuse, ô douce Vierge Marie!"
        },
        "letanias": {
            "title": "Litanies de Lorette",
            "text": "Litanies de Lorette\n\nSeigneur, prends pitié.\nÔ Christ, prends pitié.\nSeigneur, prends pitié..\nChrist, écoute-nous.\nChrist, écoute-nous.\n\nPère du Ciel, toi qui es Dieu, \naie pitié de nous.\n\nFils, Rédempteur du monde, toi qui es Dieu, \nEsprit Saint, toi qui es Dieu, \nTrinité sainte,  toi qui es un seul Dieu,\n\nSainte Marie, \nprie pour nous.\nSainte Mère de Dieu,\nSainte Vierge des vierges, \nMère du Christ, \nMère de l'Église,\nMère de Miséricorde, \nMère de la grâce divine, \nMère de l'Espérance, \nMère très pure, \nMère très chaste, \nMère toujours vierge, \nMère sans taches, \nMère très aimable, \nMère admirable, \nMère du bon conseil, \nMère du Créateur, \nMère du Sauveur, \nMère très prudente, \nMère digne d'honneur, \nMère digne de louange, \nVierge puissante, \nVierge clémente, \nVierge fidèle, \nMiroir de la sainteté divine, \nSiège de la Sagesse, \nCause de notre joie, \nTemple de l'Esprit Saint, \nTabernacle de la gloire éternelle, \nDemeure toute consacrée à Dieu, \nRose mystique, \nTour de David, \nTour d'ivoire, \nMaison d'or, \nArche d'alliance, \nPorte du ciel, \nÉtoile du matin, \nSalut des  malades, \nRefuge des pécheurs, \nRéconfort des Migrants,\nConsolatrice des affligés, \nSecours des chrétiens, \nReine des Anges, \nReine des Patriarches, \nReine des Prophètes, \nReine des Apôtres, \nReine des Martyrs, \nReine des Confesseurs, \nReine des Vierges, \nReine de tous les Saints, \nReine conçue sans le péché originel, \nReine élevée au ciel, \nReine du Saint Rosaire, \nReine de la famille, \nReine de la paix.\n\nAgneau de Dieu, qui enlèves le péché du  monde, \npardonne-nous, Seigneur.\n\nAgneau de Dieu, qui enlèves le péché du  monde, \nécoute-nous, Seigneur.\n\nAgneau de Dieu, qui enlèves le péché du  monde, \naie pitié de nous, Seigneur.\n\nPrie pour nous, Sainte Mère de Dieu, \nafin que nous devenions dignes des promesses du Christ."
        },
        "oracionFinal": {
            "title": "Prière Conclusive",
            "text": "Accorde à tes fidèles, \nSeigneur notre Dieu, \nde bénéficier de la santé de l'âme et du corps, \npar la glorieuse intercession \nde la bienheureuse Marie toujours vierge, \ndélivre-nous des tristesse du temps présent \net conduis-nous au bonheur éternel, \nPar Jésus, le Christ, notre Seigneur. \nAmen."
        }
    },
    "it": {
        "senalCruz": {
            "title": "Segno della Croce",
            "text": "Nel nome del Padre, del Figlio e dello Spirito Santo. Amen."
        },
        "invocacion": {
            "title": "Invocazione",
            "text": "O Dio, vieni a salvarmi. Signore, vieni presto in mio aiuto.\n\nGloria al Padre e al Figlio e allo Spirito Santo. Come era nel principio e ora e sempre, nei secoli dei secoli. Amen."
        },
        "actoContricion": {
            "title": "Atto di Dolore (Confesso)",
            "text": "Confesso a Dio onnipotente e a voi, fratelli, che ho molto peccato in pensieri, parole, opere e omissioni, per mia colpa, mia colpa, mia grandissima colpa. E supplico la beata sempre vergine Maria, gli angeli, i santi e voi, fratelli, di pregare per me il Signore Dio nostro. Amen."
        },
        "credo": {
            "title": "Credo Apostolico",
            "text": "Io credo in Dio, Padre onnipotente, Creatore del cielo e della terra.\n\nE in Gesù Cristo, suo unico Figlio, nostro Signore, il quale fu concepito di Spirito Santo, nacque da Maria Vergine, patì sotto Ponzio Pilato, fu crocifisso, morì e fu sepolto; discese agli inferi; il terzo giorno risuscitò da morte; salì al cielo, siede alla destra di Dio Padre onnipotente: di là verrà a giudicare i vivi e i morti.\n\nCredo nello Spirito Santo, la santa Chiesa cattolica, la comunione dei saints, la remissione dei peccati, la risurrezione della carne, la vita eterna. Amen."
        },
        "padreNuestroIntro": {
            "title": "Padre Nostro (Per le intenzioni del Santo Padre)",
            "text": "Padre Nostro che sei nei cieli, sia santificato il tuo nome, venga il tuo regno, sia fatta la tua volontà, come in cielo così in terra. Dacci oggi il nostro pane quotidiano, e rimetti a noi i nostri debiti come anche noi li rimettiamo ai nostri debitori, e non abbandonarci alla tentazione, ma liberaci dal male. Amen"
        },
        "padreNuestro": {
            "title": "Padre Nostro",
            "text": "Padre Nostro che sei nei cieli, sia santificato il tuo nome, venga il tuo regno, sia fatta la tua volontà, come in cielo così in terra. Dacci oggi il nostro pane quotidiano, e rimetti a noi i nostri debiti come anche noi li rimettiamo ai nostri debitori, e non abbandonarci alla tentazione, ma liberaci dal male. Amen"
        },
        "aveMariaFe": {
            "title": "1ª Ave Maria (Per la Fede)",
            "text": "Ave o Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del seno tuo, Gesù. Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen"
        },
        "aveMariaEsperanza": {
            "title": "2ª Ave Maria (Per la Speranza)",
            "text": "Ave o Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del seno tuo, Gesù. Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen"
        },
        "aveMariaCaridad": {
            "title": "3ª Ave Maria (Per la Carità)",
            "text": "Ave o Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del seno tuo, Gesù. Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen"
        },
        "aveMaria": {
            "title": "Ave Maria",
            "text": "Ave o Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del seno tuo, Gesù. Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen"
        },
        "gloria": {
            "title": "Gloria al Padre",
            "text": "Gloria al Padre e al Figlio e allo Spirito Santo. Come era nel principio e ora e sempre, nei secoli dei secoli. Amen."
        },
        "jaculatoria": {
            "title": "Preghiera di Fatima",
            "text": "Gesù mio, perdona le nostre colpe, preservaci dal fuoco dell'inferno, porta in cielo tutte le anime, specialmente le più bisognose della tua misericordia. Amen."
        },
        "salve": {
            "title": "Salve Regina",
            "text": "Salve, o Regina, madre di misericordia, vita, dolcezza e speranza nostra, salve.\nA te ricorriamo, esuli figli di Eva: a te sospiriamo, gementi e piangenti in questa valle di lacrime.\nOrsù dunque, avvocata nostra, rivolgi a noi gli occhi tuoi misericordiosi. E mostraci, dopo questo esilio, Gesù, il frutto benedetto del tuo seno. O clemente, o pia, o dolce Vergine Maria."
        },
        "letanias": {
            "title": "Litanie Lauretane",
            "text": "Litanie Lauretane\nSignore, pietà\n  Signore, pietà\nCristo, pietà\nSignore, pietà.\n\nCristo, ascoltaci.\nCristo, esaudiscici.\nPadre del cielo, che sei Dio, \n  abbi pietà di noi.\n\nFiglio, Redentore del mondo, che sei Dio, \nSpirito Santo, che sei Dio, \nSanta Trinità, unico Dio,\n\nSanta Maria, \n  prega per noi.\nSanta Madre di Dio, \nSanta Vergine delle vergini, \nMadre di Cristo, \nMadre della Chiesa, \nMadre di misericordia, \nMadre della divina grazia, \nMadre della speranza, \nMadre purissima, \nMadre castissima, \nMadre sempre vergine, \nMadre immacolata, \nMadre degna d'amore, \nMadre ammirabile, \nMadre del buon consiglio, \nMadre del Creatore, \nMadre del Salvatore, \nVergine prudente, \nVergine degna di onore, \nVergine degna di lode, \nVergine potente, \nVergine clemente, \nVergine fedele, \nSpecchio di perfezione, \nSede della Sapienza, \nFonte della nostra gioia, \nTempio dello Spirito Santo, \nTabernacolo dell'eterna gloria, \nDimora consacrata di Dio, \nRosa mistica, \nTorre della santa città di Davide, \nFortezza inespugnabile, \nSantuario della divina presenza, \nArca dell'alleanza, \nPorta del cielo, \nStella del mattino, \nSalute degli infermi, \nRifugio dei peccatori, \nConforto dei migranti,\nConsolatrice degli afflitti, \nAiuto dei cristiani, \nRegina degli angeli, \nRegina dei patriarchi, \nRegina dei profeti, \nRegina degli Apostoli, \nRegina dei martiri, \nRegina dei confessori della fede, \nRegina delle vergini, \nRegina di tutti i santi, \nRegina concepita senza peccato, \nRegina assunta in cielo, \nRegina del rosario, \nRegina della famiglia, \nRegina della pace,\n\nAgnello di Dio che togli i peccati del mondo, \n  perdonaci, Signore.\n\nAgnello di Dio che togli i peccati del mondo, \n  ascoltaci, Signore.\n\nAgnello di Dio che togli i peccati del mondo, \n  abbi pietà di noi.\n\nPrega per noi, Santa Madre di Dio. \n  E saremo degni\n  delle promesse di Cristo."
        },
        "oracionFinal": {
            "title": "Preghiamo (Orazione Conclusiva)",
            "text": "Concedi ai tuoi fedeli, \nSignore Dio nostro, di godere sempre\nla salute del corpo e dello spirito, \nper la gloriosa intercessione \ndi Maria santissima, sempre vergine, \nsalvaci dai mali che ora ci rattristano \ne guidaci alla gioia senza fine. \nPer Cristo nostro Signore. \nAmen."
        }
    },
    "pt": {
        "senalCruz": {
            "title": "Sinal da Cruz",
            "text": "Em nome do Pai, do Filho e do Espírito Santo. Amém."
        },
        "invocacion": {
            "title": "Invocação",
            "text": "Vinde, ó Deus, em meu auxílio. Socorrei-me sem demora.\n\nGlória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém."
        },
        "actoContricion": {
            "title": "Ato de Contrição (Confesso a Deus)",
            "text": "Confesso a Deus Todo-Poderoso e a vós, irmãos, que pequei muitas vezes por pensamentos e palavras, atos e omissões, por minha culpa, minha tão grande culpa. E peço à Virgem Maria, aos Anjos e Santos, e a vós, irmãos, que rogueis por mim a Deus, Nosso Senhor. Amém."
        },
        "credo": {
            "title": "Credo dos Apóstolos",
            "text": "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos.\n\nCreio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém."
        },
        "padreNuestroIntro": {
            "title": "Pai Nosso (Pelas intenções do Santo Padre)",
            "text": "Pai Nosso, que estais no céu, santificado seja o Vosso Nome, venha a nós o Vosso Reino, seja feita a Vossa Vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tenha ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
        },
        "padreNuestro": {
            "title": "Pai Nosso",
            "text": "Pai Nosso, que estais no céu, santificado seja o Vosso Nome, venha a nós o Vosso Reino, seja feita a Vossa Vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tenha ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
        },
        "aveMariaFe": {
            "title": "1ª Ave Maria (Pelo aumento da Fé)",
            "text": "Ave Maria,  cheia de graça, o Senhor é convosco. Bendita sois Vós entre as mulheres, bendito é o fruto de Vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
        },
        "aveMariaEsperanza": {
            "title": "2ª Ave Maria (Pelo aumento da Esperança)",
            "text": "Ave Maria,  cheia de graça, o Senhor é convosco. Bendita sois Vós entre as mulheres, bendito é o fruto de Vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
        },
        "aveMariaCaridad": {
            "title": "3ª Ave Maria (Pelo aumento da Caridade)",
            "text": "Ave Maria,  cheia de graça, o Senhor é convosco. Bendita sois Vós entre as mulheres, bendito é o fruto de Vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
        },
        "aveMaria": {
            "title": "Ave Maria",
            "text": "Ave Maria,  cheia de graça, o Senhor é convosco. Bendita sois Vós entre as mulheres, bendito é o fruto de Vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém."
        },
        "gloria": {
            "title": "Glória ao Pai",
            "text": "Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém."
        },
        "jaculatoria": {
            "title": "Oração de Fátima",
            "text": "Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem da Vossa misericórdia. Amém."
        },
        "salve": {
            "title": "Salve Rainha",
            "text": "Salve Rainha, Mãe de Misericórdia, vida, doçura e esperança nossa, salve! A Vós bradamos, os degredados filhos de Eva. A Vós suspiramos, gemendo e chorando neste vale de lágrimas.\nEia, pois, Advogada nossa, esses Vossos olhos misericordiosos a nós volvei, e, depois deste desterro, mostrai-nos Jesus, bendito fruto de Vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria.\nRogai por nós, santa Mãe de Deus,\nPara que sejamos dignos das promessas de Cristo.\nAmém."
        },
        "letanias": {
            "title": "Ladainha de Nossa Senhora",
            "text": "Ladainha de Nossa Senhora\nSenhor, tende piedade de nós\nCristo, tende piedade de nós\nSenhor, tende piedade de nós\nCristo, ouvi-nos\nCristo, atendei-nos\nDeus Pai do céu, tende piedade de nós\nDeus Filho Redentor do mundo, tende piedade de nós\nDeus Espírito Santo, tende piedade de nós\nSantíssima Trindade, que sois um só Deus, tende piedade de nós\n\nSanta Maria, rogai por nós.\nSanta Mãe de Deus, \nSanta Virgem das virgens, \nMãe de Cristo,\nMãe da Igreja,\nMãe de misericórdia,\nMãe da divina graça, \nMãe da esperança,\nMãe puríssima, \nMãe castíssima, \nMãe sempre virgem,\nMãe imaculada, \nMãe digna de amor, \nMãe admirável, \nMãe do bom conselho, \nMãe do Criador, \nMãe do Salvador, \nVirgem prudentíssima,\nVirgem venerável,\nVirgem louvável, \nVirgem poderosa, \nVirgem clemente, \nVirgem fiel,\nEspelho de perfeição, \nSede da Sabedoria, \nFonte de nossa alegria, \nVaso espiritual, \nTabernáculo da eterna glória,\nMoradia consagrada a Deus, \nRosa mística, \nTorre de Davi, \nTorre de marfim,\nCasa de ouro,\nArca da aliança,\nPorta do céu,\nEstrela da manhã,\nSaúde dos enfermos,\nRefúgio dos pecadores,\nSocorro dos migrantes, \nConsoladora dos aflitos,\nAuxílio dos cristãos,\nRainha dos Anjos, \nRainha dos Patriarcas,\nRainha dos Profetas,\nRainha dos Apóstolos,\nRainha dos Mártires,\nRainha dos confessores da fé,\nRainha das Virgens,\nRainha de todos os Santos,\nRainha concebida sem pecado original,\nRainha assunta ao céu,\nRainha do santo Rosário,\nRainha da paz.\n\nCordeiro de Deus, que tirais os pecados do mundo, perdoai-nos, Senhor.\n\nCordeiro de Deus, que tirais os pecados do mundo, ouvi-nos, Senhor.\n\nCordeiro de Deus, que tirais os pecados do mundo, tende piedade de nós.\n\nRogai por nós, santa Mãe de Deus.\n\nPara que sejamos dignos das promessas de Cristo."
        },
        "oracionFinal": {
            "title": "Oração Conclusiva",
            "text": "Oremos:\n\nConcedei, Senhor Deus, aos vossos servos, a graça de gozar de perpétua saúde de corpo e de alma; e que, pela gloriosa intercessão da bem-aventurada sempre Virgem Maria, sejamos livres das tristezas presentes e alcancemos a eterna alegria.\n\nPor Cristo, nosso Senhor. Amém."
        }
    }
};

// Fallbacks para otros idiomas si no están traducidos textualmente
rosaryPrayers.ar = rosaryPrayers.es;
rosaryPrayers.he = rosaryPrayers.es;

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

const ROSARY_LITANY_SPEED_KEY = 'rosary_litany_scroll_speed_v1';

// Obtiene la velocidad configurada para el desplazamiento automático de las Letanías
function getEffectiveLitanyScrollSpeed(lang = 'es', mysteryKey = 'Gozosos') {
    const custom = getEffectiveCustomTimes(lang, mysteryKey);
    if (custom && custom.letanias_scroll_speed) {
        return custom.letanias_scroll_speed;
    }
    try {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem(ROSARY_LITANY_SPEED_KEY);
            if (saved) return saved;
        }
    } catch (e) {}
    return "1.0x";
}

// =============================================================================
// GESTIÓN DE ORACIONES PERSONALIZADAS (ALMACENAMIENTO, FORMULARIO Y LECTURA)
// =============================================================================

const ROSARY_CUSTOM_PRAYERS_KEY = 'rosary_custom_prayers_v1';

// Obtiene todo el registro de oraciones personalizadas de localStorage
function getAllStoredCustomPrayers() {
    try {
        if (typeof localStorage === 'undefined') return {};
        const raw = localStorage.getItem(ROSARY_CUSTOM_PRAYERS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

// Obtiene las oraciones efectivas para un idioma (combinando predeterminadas con personalizadas)
function getEffectivePrayers(lang = 'es') {
    const base = rosaryPrayers[lang] || rosaryPrayers.es;
    const effective = {};
    for (const key in base) {
        effective[key] = {
            title: base[key].title,
            text: base[key].text
        };
    }
    try {
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(ROSARY_CUSTOM_PRAYERS_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed[lang]) {
                    for (const key in parsed[lang]) {
                        if (effective[key]) {
                            if (parsed[lang][key].title !== undefined) effective[key].title = parsed[lang][key].title;
                            if (parsed[lang][key].text !== undefined) effective[key].text = parsed[lang][key].text;
                        } else {
                            effective[key] = parsed[lang][key];
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.warn('Aviso al leer oraciones personalizadas:', e);
    }
    return effective;
}

// Guarda oraciones personalizadas en localStorage
function saveCustomPrayersToStorage(lang, prayersObj) {
    try {
        if (typeof localStorage === 'undefined') return;
        const all = getAllStoredCustomPrayers();
        if (!all[lang]) all[lang] = {};
        all[lang] = Object.assign({}, all[lang], prayersObj);
        localStorage.setItem(ROSARY_CUSTOM_PRAYERS_KEY, JSON.stringify(all));
    } catch (e) {
        console.error('Error guardando oraciones en localStorage:', e);
    }
}

// Elimina oraciones personalizadas de un idioma para restaurar originales
function clearCustomPrayersFromStorage(lang) {
    try {
        if (typeof localStorage === 'undefined') return;
        const all = getAllStoredCustomPrayers();
        if (all[lang]) {
            delete all[lang];
            localStorage.setItem(ROSARY_CUSTOM_PRAYERS_KEY, JSON.stringify(all));
        }
    } catch (e) {
        console.error('Error eliminando oraciones de localStorage:', e);
    }
}

// =============================================================================
// DEFINICIÓN DE ESTRUCTURA CANÓNICA DE LAS 75 CUENTAS / EVENTOS DEL ROSARIO
// =============================================================================
// Esta función provee la lista completa y organizada de todas las cuentas,
// oraciones, badges y tiempos (calculados o personalizados) para el formulario
// de sincronización y para la generación de la línea de tiempo interactiva.
function getRosaryStructureDefinition(lang = 'es', mysteryKey = 'Gozosos') {
    const prayers = getEffectivePrayers(lang);
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
        const localizedTitle = (audioData[lang]?.names?.[mysteryKey] && audioData[lang].names[mysteryKey][d - 1]) || (info ? info.title : `${d}º Misterio`);
        const mysteryTitle = localizedTitle;
        const img = info ? info.img : `src/img/${mysteryKey.toLowerCase()}/${mysteryKey.toLowerCase()}_${d}.png`;

        const pnBeadId = d === 1 ? "medal" : (d === 2 ? "d1_gl" : (d === 3 ? "d2_gl" : (d === 4 ? "d3_gl" : "d4_gl")));
        const glBeadId = d === 1 ? "d1_gl" : (d === 2 ? "d2_gl" : (d === 3 ? "d3_gl" : (d === 4 ? "d4_gl" : "medal")));

        const amStart = Math.round(start + dur * 0.22);
        const amEnd = Math.round(start + dur * 0.90);
        const amStep = (amEnd - amStart) / 9;

        const pnTitle = prayers.padreNuestro?.title || "Padre Nuestro";
        const amTitle = prayers.aveMaria?.title || "Ave María";
        const glTitle = prayers.gloria?.title || "Gloria al Padre";

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
                title: `${pnTitle} — ${d}º Misterio`,
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
                title: `${i}ª ${amTitle} — ${d}º Misterio`,
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
            title: `${glTitle} — ${d}º Misterio`,
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
            if (item.key === 'letanias') {
                item.scrollSpeed = getEffectiveLitanyScrollSpeed(lang, mysteryKey);
            }
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
                img: item.img,
                scrollSpeed: item.scrollSpeed || '1.0x'
            });
        });
    });

    // Ordenar cronológicamente según el tiempo en segundos
    steps.sort((a, b) => a.s - b.s);

    return steps;
}
