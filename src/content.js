// Base de datos de rutas. 
// Para el tiempo (s), usa la fórmula: (minutos * 60) + segundos
const audioData = {
    es: {
        names: {
            Gozosos: [  "La Encarnación del Hijo de Dios", 
                        " Visitación de Nuestra Señora a su prima Santa Isabel", 
                        "El Nacimiento del Hijo de Dios en el portal de Belén", 
                        "La presentación de Jesús en el Templo", 
                        "El Niño Jesús perdido y hallado en el Templo", 
                        "Letanías"],

            Dolorosos: ["La oración en el Huerto", 
                        "La flagelación de Jesús atado a la columna", 
                        "La coronación de espinas", 
                        "Jesús con la Cruz a cuestas camino del Calvario", 
                        "La crucifixión y muerte de Jesús", 
                        "Letanías"],

            Luminosos: ["El Bautismo en el Jordán", 
                        "Las Bodas de Caná", 
                        "El anuncio del Reino de Dios", 
                        "La Transfiguración", 
                        "La institución de la Eucaristía", 
                        "Letanías"],

            Gloriosos: ["La resurrección del Hijo de Dios", 
                        "La Ascensión del Señor al cielo", 
                        "La venida del Espíritu Santo", 
                        "La Asunción de María al cielo", 
                        "La coronación de María como Reina y Señora de todo lo creado", 
                        "Letanías"]
        },
        Gozosos: {
            src: "src/mp3/es/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 189, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 410, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 644, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 903, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1146, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1329, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
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
        names: {
                Gozosos: [  "The Annunciation of the Lord", 
                            "The Visitation of Mary to Elizabeth", 
                            "The Birth of Jesus", 
                            "The Presentation of Jesus in the Temple", 
                            "The Finding of Jesus in the Temple", 
                            "Litanies"],

                Dolorosos: ["The Agony in the Garden", 
                            "The Scourging at the Pillar", 
                            "The Crowning with Thorns", 
                            "The Carrying of the Cross", 
                            "The Crucifixion and Death of Jesus", 
                            "Litanies"],

                Luminosos: ["The Baptism in the Jordan", 
                            "The Wedding at Cana", 
                            "The Proclamation of the Kingdom", 
                            "The Transfiguration", 
                            "The Institution of the Eucharist", 
                            "Litanies"],

                Gloriosos: ["The Resurrection", 
                            "The Ascension of the Lord", 
                            "The Descent of the Holy Spirit", 
                            "The Assumption of Mary into Heaven", 
                            "The Coronation of Mary", 
                            "Litanies"]
            },

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
                names: {
                        Gozosos: [  "L'Annunciazione dell'Angelo a Maria Vergine", 
                                    "La Visitazione di Maria Santissima a Santa Elisabetta", 
                                    "La Nascita di Gesù a Betlemme", 
                                    "La Presentazione di Gesù al Tempio", 
                                    "Il Ritrovamento di Gesù nel Tempio", 
                                    "Litanie"],

                        Dolorosos: ["L'Agonia di Gesù nell'orto degli ulivi", 
                                    "La Flagellazione di Gesù alla colonna", 
                                    "L'Incoronazione di spine", 
                                    "Il Viaggio al Calvario di Gesù carico della Croce", 
                                    "La Crocifissione e la Morte di Gesù", 
                                    "Litanie"],

                        Luminosos: ["Il Battesimo di Gesù nel fiume Giordano", 
                                    "Le Nozze di Cana", 
                                    "L'Annuncio del Regno di Dio", 
                                    "La Trasfigurazione di Gesù sul monte Tabor", 
                                    "L'Istituzione dell'Eucaristia", 
                                    "Litanie"],

                        Gloriosos: ["La Risurrezione di Gesù", 
                                    "L'Ascensione di Gesù al Cielo", 
                                    "La Discesa dello Spirito Santo", 
                                    "L'Assunzione di Maria Vergine al Cielo", 
                                    "L'Incoronazione di Maria Vergine", 
                                    "Litanie"]
                    },
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
          names: {
                    Gozosos: [  "Annuntiatio Beatae Mariae Virginis", 
                                "Visitatio Beatae Mariae Virginis", 
                                "Nativitas Domini Nostri Iesu Christi", 
                                "Praesentatio Pueri Iesu in Templo", 
                                "Inventio Pueri Iesu in Templo", 
                                "Litaniae"],

                    Dolorosos: ["Agonia Domini Nostri in Hortu", 
                                "Flagellatio Domini Nostri Iesu Christi", 
                                "Coronatio Spinis", 
                                "Baiulatio Crucis", 
                                "Crucifixio et Mors Domini Nostri Iesu Christi", 
                                "Litaniae"],

                    Luminosos: ["Baptisma apud Iordanem", 
                                "Autorevelatio apud Canense convivium", 
                                "Regni Dei proclamatio", 
                                "Transfiguratio Domini Nostri Iesu Christi", 
                                "Institutio Eucharistiae", 
                                "Litaniae"],

                    Gloriosos: ["Resurrectio Domini Nostri Iesu Christi", 
                                "Ascensio Domini Nostri Iesu Christi", 
                                "Missio Spiritus Sancti", 
                                "Assumptio Beatae Mariae Virginis in Caelum", 
                                "Coronatio Beatae Mariae Virginis", 
                                "Litaniae"]
                },

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
           names: {
                    Gozosos: [  "A Anunciação do Anjo a Nossa Senhora", 
                                "A Visitação de Nossa Senhora a sua prima Santa Isabel", 
                                "O Nascimento do Filho de Deus em Belém", 
                                "A Apresentação do Menino Jesus no Templo", 
                                "A Perda e o Encontro do Menino Jesus no Templo", 
                                "Ladainha"],

                    Dolorosos: ["A Agonia de Jesus no Horto", 
                                "A Flagelação de Jesus atado à coluna", 
                                "A Coroação de espinhos", 
                                "Jesus carregando a Cruz a caminho del Calvário", 
                                "A Crucifixão e morte de Jesus", 
                                "Ladainha"],

                    Luminosos: ["O Batismo de Jesus no Rio Jordão", 
                                "As Bodas de Caná", 
                                "O Anúncio do Reino de Deus", 
                                "A Transfiguração de Jesus", 
                                "A Instituição da Eucaristia", 
                                "Ladainha"],

                    Gloriosos: ["A Ressurreição de Jesus", 
                                "A Ascensão de Jesus ao Céu", 
                                "A Vinda do Espírito Santo", 
                                "A Assunção de Nossa Senhora ao Céu", 
                                "A Coroação de Nossa Senhora como Rainha do Céu e da Terra", 
                                "Ladainha"]
                },
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

        fr: {
            names: {
                Gozosos: [  "L'Annonciation", 
                            "La Visitation de la Vierge Marie", 
                            "La Naissance de Jésus", 
                            "La Présentation de Jésus au Temple", 
                            "Le Recouvrement de Jésus au Temple", 
                            "Litanies"],

                Dolorosos: ["L'Agonie de Jésus au Jardin des Oliviers", 
                            "La Flagellation de Jésus", 
                            "Le Couronnement d'épines", 
                            "Le Portement de la Croix", 
                            "La Crucifixion et la Mort de Jésus sur la Croix", 
                            "Litanies"],

                Luminosos: ["Le Baptême de Jésus au Jourdain", 
                            "Les Noces de Cana", 
                            "L'Annonce du Royaume de Dieu", 
                            "La Transfiguration", 
                            "L'Institution de l'Eucharistie", 
                            "Litanies"],

                Gloriosos: ["La Résurrection", 
                            "L'Ascension de Jésus au Ciel", 
                            "La Descente du Saint-Esprit", 
                            "L'Assomption de la Vierge Marie", 
                            "Le Couronnement de la Vierge Marie", 
                            "Litanies"]
            },

        Gozosos: {
            src: "src/mp3/fr/Gozosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gozosos/gozosos.png" },          // 0:00
                { s: 187, img: "src/img/gozosos/gozosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 452, img: "src/img/gozosos/gozosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 717, img: "src/img/gozosos/gozosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 983, img: "src/img/gozosos/gozosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1250, img: "src/img/gozosos/gozosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1514, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },

        Dolorosos: {
            src: "src/mp3/fr/Dolorosos.mp3",
            timeline: [
                { s: 0, img: "src/img/dolorosos/dolorosos.png" },          // 0:00
                { s: 189, img: "src/img/dolorosos/dolorosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 458, img: "src/img/dolorosos/dolorosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 721, img: "src/img/dolorosos/dolorosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 987, img: "src/img/dolorosos/dolorosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1247, img: "src/img/dolorosos/dolorosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1514, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Luminosos: {
            src: "src/mp3/fr/Luminosos.mp3",
            timeline: [
                { s: 0, img: "src/img/luminosos/luminosos.png" },          // 0:00
                { s: 188, img: "src/img/luminosos/luminosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 455, img: "src/img/luminosos/luminosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 716, img: "src/img/luminosos/luminosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 984, img: "src/img/luminosos/luminosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1245, img: "src/img/luminosos/luminosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1511, img: "src/img/letanias.png" },      // 27:02 -> (27*60)+2 = 1622
            ]
        },
        Gloriosos: {
            src: "src/mp3/fr/Gloriosos.mp3",
            timeline: [
                { s: 0, img: "src/img/gloriosos/gloriosos.png" },          // 0:00
                { s: 188, img: "src/img/gloriosos/gloriosos_1.png" },       // 1:22 -> (1*60)+22 = 80
                { s: 453, img: "src/img/gloriosos/gloriosos_2.png" },      // 6:33 -> (6*60)+33 = 393
                { s: 715, img: "src/img/gloriosos/gloriosos_3.png" },      // 11:40 -> (11*60)+40 = 700
                { s: 981, img: "src/img/gloriosos/gloriosos_4.png" },     // 16:45 -> (16*60)+45 = 1005
                { s: 1243, img: "src/img/gloriosos/gloriosos_5.png" },     // 21:47 -> (21*60)+47 = 1307
                { s: 1510, img: "src/img/letanias.png" },                // 27:02 -> (27*60)+2 = 1622 
            ]
        }
    },

    ar: {
        names: {
            Gozosos: [  "La Encarnación del Hijo de Dios", 
                        " Visitación de Nuestra Señora a su prima Santa Isabel", 
                        "El Nacimiento del Hijo de Dios en el portal de Belén", 
                        "La presentación de Jesús en el Templo", 
                        "El Niño Jesús perdido y hallado en el Templo", 
                        "Letanías"],

            Dolorosos: ["La oración en el Huerto", 
                        "La flagelación de Jesús atado a la columna", 
                        "La coronación de espinas", 
                        "Jesús con la Cruz a cuestas camino del Calvario", 
                        "La crucifixión y muerte de Jesús", 
                        "Letanías"],

            Luminosos: ["El Bautismo en el Jordán", 
                        "Las Bodas de Caná", 
                        "El anuncio del Reino de Dios", 
                        "La Transfiguración", 
                        "La institución de la Eucaristía", 
                        "Letanías"],

            Gloriosos: ["La resurrección del Hijo de Dios", 
                        "La Ascensión del Señor al cielo", 
                        "La venida del Espíritu Santo", 
                        "La Asunción de María al cielo", 
                        "La coronación de María como Reina y Señora de todo lo creado", 
                        "Letanías"]
        },
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

    he: {
        names: {
            Gozosos: [  "La Encarnación del Hijo de Dios", 
                        " Visitación de Nuestra Señora a su prima Santa Isabel", 
                        "El Nacimiento del Hijo de Dios en el portal de Belén", 
                        "La presentación de Jesús en el Templo", 
                        "El Niño Jesús perdido y hallado en el Templo", 
                        "Letanías"],

            Dolorosos: ["La oración en el Huerto", 
                        "La flagelación de Jesús atado a la columna", 
                        "La coronación de espinas", 
                        "Jesús con la Cruz a cuestas camino del Calvario", 
                        "La crucifixión y muerte de Jesús", 
                        "Letanías"],

            Luminosos: ["El Bautismo en el Jordán", 
                        "Las Bodas de Caná", 
                        "El anuncio del Reino de Dios", 
                        "La Transfiguración", 
                        "La institución de la Eucaristía", 
                        "Letanías"],

            Gloriosos: ["La resurrección del Hijo de Dios", 
                        "La Ascensión del Señor al cielo", 
                        "La venida del Espíritu Santo", 
                        "La Asunción de María al cielo", 
                        "La coronación de María como Reina y Señora de todo lo creado", 
                        "Letanías"]
        },
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
    // Para agregar English o Latin, copia la estructura de arriba cambiando 'es' por 'en' o 'la'
};