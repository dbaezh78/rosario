// =============================================================================
// SANTO ROSARIO - ALMACÉN DE AUDIOS SEGMENTADOS Y EXPORTADOR
// =============================================================================

// Normalizador de cadenas para comparación sin espacios, acentos ni puntuación
function normAudioStr(str) {
    if (!str) return '';
    return str.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
}

// Catálogo predeterminado de audios segmentados oficiales del Santo Rosario en src/mp3/Segm
const SYSTEM_AUDIO_CATALOG = [
    { id: 'sys_avemaria', name: 'Avemaria', fileName: 'avemaria.mp3', path: 'src/mp3/Segm/avemaria.mp3', duration: 21 },
    { id: 'sys_padrenuestro', name: 'Padrenuestro', fileName: 'Padrenuestro.mp3', path: 'src/mp3/Segm/Padrenuestro.mp3', duration: 21 },
    { id: 'sys_gloria', name: 'Gloria', fileName: 'gloria.mp3', path: 'src/mp3/Segm/gloria.mp3', duration: 36 },
    { id: 'sys_credo', name: 'Credo', fileName: 'credo.mp3', path: 'src/mp3/Segm/credo.mp3', duration: 39 },
    { id: 'sys_senaldelacruz', name: 'Señaldelacruz', fileName: 'señaldelaCruz.mp3', path: 'src/mp3/Segm/señaldelaCruz.mp3', duration: 43 },
    { id: 'sys_sumopontifice', name: 'Sumopontifice', fileName: 'sumopontifice.mp3', path: 'src/mp3/Segm/sumopontifice.mp3', duration: 20 },
    { id: 'sys_letanias', name: 'Letanias', fileName: 'letanias.mp3', path: 'src/mp3/Segm/letanias.mp3', duration: 321 },
    { id: 'sys_diostesalve', name: 'Diostesalve', fileName: 'Diostesalve.mp3', path: 'src/mp3/Segm/Diostesalve.mp3', duration: 35 },
    { id: 'sys_oracion', name: 'Oracion', fileName: 'oracion.mp3', path: 'src/mp3/Segm/oracion.mp3', duration: 26 },
    { id: 'sys_pedirgracia', name: 'PedirGracia', fileName: 'pedirGracia.mp3', path: 'src/mp3/Segm/pedirGracia.mp3', duration: 6 },

    // Gozosos 1 a 5
    { id: 'sys_1gozoso', name: '1gozoso', fileName: '1gozoso.mp3', path: 'src/mp3/Segm/1gozoso.mp3', duration: 6 },
    { id: 'sys_2gozoso', name: '2gozoso', fileName: '2gozoso.mp3', path: 'src/mp3/Segm/2gozoso.mp3', duration: 6 },
    { id: 'sys_3gozoso', name: '3gozoso', fileName: '3gozoso.mp3', path: 'src/mp3/Segm/3gozoso.mp3', duration: 6 },
    { id: 'sys_4gozoso', name: '4gozoso', fileName: '4gozoso.mp3', path: 'src/mp3/Segm/4gozoso.mp3', duration: 5 },
    { id: 'sys_5gozoso', name: '5gozoso', fileName: '5gozoso.mp3', path: 'src/mp3/Segm/5gozoso.mp3', duration: 6 },

    // Dolorosos 1 a 5
    { id: 'sys_dolorosos1', name: 'Dolorosos1', fileName: 'Dolorosos1.mp3', path: 'src/mp3/Segm/Dolorosos1.mp3', duration: 6 },
    { id: 'sys_dolorosos2', name: 'Dolorosos2', fileName: 'Dolorosos2.mp3', path: 'src/mp3/Segm/Dolorosos2.mp3', duration: 6 },
    { id: 'sys_dolorosos3', name: 'Dolorosos3', fileName: 'Dolorosos3.mp3', path: 'src/mp3/Segm/Dolorosos3.mp3', duration: 5 },
    { id: 'sys_dolorosos4', name: 'Dolorosos4', fileName: 'Dolorosos4.mp3', path: 'src/mp3/Segm/Dolorosos4.mp3', duration: 6 },
    { id: 'sys_dolorosos5', name: 'Dolorosos5', fileName: 'Dolorosos5.mp3', path: 'src/mp3/Segm/Dolorosos5.mp3', duration: 5 },

    // Gloriosos 1 a 5
    { id: 'sys_gloriosos1', name: 'Gloriosos1', fileName: 'Gloriosos1.mp3', path: 'src/mp3/Segm/Gloriosos1.mp3', duration: 8 },
    { id: 'sys_gloriosos2', name: 'Gloriosos2', fileName: 'Gloriosos2.mp3', path: 'src/mp3/Segm/Gloriosos2.mp3', duration: 6 },
    { id: 'sys_gloriosos3', name: 'Gloriosos3', fileName: 'Gloriosos3.mp3', path: 'src/mp3/Segm/Gloriosos3.mp3', duration: 5 },
    { id: 'sys_gloriosos4', name: 'Gloriosos4', fileName: 'Gloriosos4.mp3', path: 'src/mp3/Segm/Gloriosos4.mp3', duration: 5 },
    { id: 'sys_gloriosos5', name: 'Gloriosos5', fileName: 'Gloriosos5.mp3', path: 'src/mp3/Segm/Gloriosos5.mp3', duration: 7 },

    // Luminosos 1 a 5
    { id: 'sys_luminosos1', name: 'Luminosos1', fileName: 'Luminosos1.mp3', path: 'src/mp3/Segm/Luminosos1.mp3', duration: 7 },
    { id: 'sys_luminosos2', name: 'Luminosos2', fileName: 'Luminosos2.mp3', path: 'src/mp3/Segm/Luminosos2.mp3', duration: 5 },
    { id: 'sys_luminosos3', name: 'Luminosos3', fileName: 'Luminosos3.mp3', path: 'src/mp3/Segm/Luminosos3.mp3', duration: 5 },
    { id: 'sys_luminosos4', name: 'Luminosos4', fileName: 'Luminosos4.mp3', path: 'src/mp3/Segm/Luminosos4.mp3', duration: 5 },
    { id: 'sys_luminosos5', name: 'Luminosos5', fileName: 'Luminosos5.mp3', path: 'src/mp3/Segm/Luminosos5.mp3', duration: 5 },

    // AveMaria-GLORIA
    { id: 'sys_avemaria_gloria', name: 'AveMaria-GLORIA', fileName: 'AveMaria-GLORIA.mp3', path: 'src/mp3/Segm/AveMaria-GLORIA.mp3', duration: 20 },

    // Ave Maria y Ave Maria-GLORIA (Voz de Mujer)
    { id: 'sys_avemaria_m', name: 'Avemaria (Mujer)', fileName: 'AveMaria_m.mp3', path: 'src/mp3/Segm/AveMaria_m.mp3', duration: 21 },
    { id: 'sys_avemaria_gloria_m', name: 'AveMaria-GLORIA (Mujer)', fileName: 'AveMariaGLORIA_m.mp3', path: 'src/mp3/Segm/AveMariaGLORIA_m.mp3', duration: 20 }
];

const RosaryAudioStore = (function() {
    const DB_NAME = 'RosaryAudioStoreDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'audio_segments';
    const DELETED_AUDIOS_KEY = 'rosary_deleted_audio_ids_v1';
    let dbInstance = null;
    const objectUrlCache = new Map();

    function getDeletedAudioIds() {
        try {
            const raw = localStorage.getItem(DELETED_AUDIOS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function saveDeletedAudioIds(ids) {
        try {
            localStorage.setItem(DELETED_AUDIOS_KEY, JSON.stringify(ids));
        } catch (e) {}
    }

    function openDB() {
        if (dbInstance) return Promise.resolve(dbInstance);
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('name', 'name', { unique: false });
                    store.createIndex('createdAt', 'createdAt', { unique: false });
                }
            };
            req.onsuccess = (e) => {
                dbInstance = e.target.result;
                resolve(dbInstance);
            };
            req.onerror = (e) => {
                console.error('[AudioStore] Error al abrir IndexedDB:', e);
                reject(e);
            };
        });
    }

    // Calcula la duración en segundos de un archivo de audio
    function getBlobDuration(blob) {
        return new Promise((resolve) => {
            try {
                const url = URL.createObjectURL(blob);
                const tempAudio = new Audio();
                tempAudio.preload = 'metadata';
                tempAudio.onloadedmetadata = () => {
                    const dur = tempAudio.duration || 0;
                    URL.revokeObjectURL(url);
                    resolve(Math.round(dur * 100) / 100);
                };
                tempAudio.onerror = () => {
                    URL.revokeObjectURL(url);
                    resolve(0);
                };
                tempAudio.src = url;
            } catch (err) {
                resolve(0);
            }
        });
    }

    // Limpia el nombre del archivo para que sea legible
    function cleanAudioName(fileName) {
        if (!fileName) return 'Audio sin título';
        let name = fileName.replace(/\.[^/.]+$/, ''); // Quitar extensión
        name = name.replace(/[_-]+/g, ' ').trim();
        return name.replace(/\b\w/g, c => c.toUpperCase());
    }

    return {
        init() {
            return openDB();
        },

        // Guardar uno o varios archivos en el almacén de IndexedDB
        async saveAudio(fileOrBlob, customName = '') {
            const db = await openDB();
            const dur = await getBlobDuration(fileOrBlob);
            const fileName = fileOrBlob.name || (customName ? `${customName}.mp3` : 'audio.mp3');
            const name = customName.trim() || cleanAudioName(fileName);
            const id = 'aud_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);

            const record = {
                id,
                name,
                fileName,
                type: fileOrBlob.type || 'audio/mpeg',
                size: fileOrBlob.size || 0,
                duration: dur,
                blob: fileOrBlob,
                createdAt: new Date().toISOString()
            };

            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const req = store.add(record);
                req.onsuccess = () => resolve(record);
                req.onerror = (e) => reject(e);
            });
        },

        // Obtener lista completa de audios: fusiona IndexedDB con el catálogo oficial de src/mp3/Segm
        async getAllAudios() {
            const deletedSet = new Set(getDeletedAudioIds());
            const db = await openDB();
            const idbRecords = await new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.getAll();
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = (e) => reject(e);
            });

            const results = [];
            const seenNorms = new Set();

            // 1. Audios de IndexedDB guardados por el usuario
            idbRecords.forEach(item => {
                if (deletedSet.has(item.id)) return;
                const norm = normAudioStr(item.name || item.fileName);
                seenNorms.add(norm);
                results.push({
                    id: item.id,
                    name: item.name,
                    fileName: item.fileName,
                    size: item.size,
                    duration: item.duration,
                    type: item.type,
                    isSystem: false,
                    createdAt: item.createdAt
                });
            });

            // 2. Audios del catálogo del sistema (src/mp3/Segm) si no han sido sobreescritos ni eliminados
            SYSTEM_AUDIO_CATALOG.forEach(sys => {
                if (deletedSet.has(sys.id)) return;
                const sysNorm = normAudioStr(sys.name);
                if (!seenNorms.has(sysNorm)) {
                    results.push({
                        id: sys.id,
                        name: sys.name,
                        fileName: sys.fileName,
                        size: sys.size || 220000,
                        duration: sys.duration,
                        path: sys.path,
                        type: 'audio/mpeg',
                        isSystem: true,
                        createdAt: '2026-11-24T00:00:00.000Z'
                    });
                }
            });

            results.sort((a, b) => a.name.localeCompare(b.name));
            return results;
        },

        // Obtener registro completo por ID o por nombre
        async getAudioById(id) {
            if (!id) return null;

            // Revisar si es ID del sistema
            const sys = SYSTEM_AUDIO_CATALOG.find(s => s.id === id || normAudioStr(s.name) === normAudioStr(id));
            if (sys && !id.startsWith('aud_')) {
                return {
                    id: sys.id,
                    name: sys.name,
                    fileName: sys.fileName,
                    path: sys.path,
                    duration: sys.duration,
                    isSystem: true
                };
            }

            const db = await openDB();
            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.get(id);
                req.onsuccess = () => {
                    if (req.result) {
                        resolve(req.result);
                    } else if (sys) {
                        resolve({
                            id: sys.id,
                            name: sys.name,
                            fileName: sys.fileName,
                            path: sys.path,
                            duration: sys.duration,
                            isSystem: true
                        });
                    } else {
                        resolve(null);
                    }
                };
                req.onerror = () => resolve(sys ? {
                    id: sys.id,
                    name: sys.name,
                    fileName: sys.fileName,
                    path: sys.path,
                    duration: sys.duration,
                    isSystem: true
                } : null);
            });
        },

        // Obtener URL reproducible (Object URL de IndexedDB o URL directa del archivo en src/mp3/Segm)
        async getAudioUrl(id) {
            if (!id) return null;
            if (objectUrlCache.has(id)) {
                return objectUrlCache.get(id);
            }

            // 1. Si es del catálogo del sistema
            const sysMatch = SYSTEM_AUDIO_CATALOG.find(s => s.id === id || normAudioStr(s.name) === normAudioStr(id) || s.path === id);
            if (sysMatch && !id.startsWith('aud_')) {
                return sysMatch.path;
            }

            // 2. Si es un registro de IndexedDB por ID
            const record = await this.getAudioById(id);
            if (record) {
                if (record.blob) {
                    const url = URL.createObjectURL(record.blob);
                    objectUrlCache.set(id, url);
                    return url;
                } else if (record.path) {
                    return record.path;
                }
            }

            // 3. Buscar coincidencia por nombre en IndexedDB
            const all = await this.getAllAudios();
            const nameMatch = all.find(a => a.id === id || normAudioStr(a.name) === normAudioStr(id) || normAudioStr(a.fileName).includes(normAudioStr(id)));
            if (nameMatch) {
                if (nameMatch.isSystem && nameMatch.path) return nameMatch.path;
                const rec = await this.getAudioById(nameMatch.id);
                if (rec && rec.blob) {
                    const url = URL.createObjectURL(rec.blob);
                    objectUrlCache.set(nameMatch.id, url);
                    return url;
                }
            }

            if (sysMatch) return sysMatch.path;
            return null;
        },

        // Eliminar audio por ID (tanto subidos en IndexedDB como audios del sistema)
        async deleteAudio(id) {
            if (!id) return false;

            // 1. Registrar en lista de IDs eliminados para ocultarlo persistentemente
            const delList = getDeletedAudioIds();
            if (!delList.includes(id)) {
                delList.push(id);
                saveDeletedAudioIds(delList);
            }

            // 2. Revocar URL de objeto si estaba en caché
            if (objectUrlCache.has(id)) {
                URL.revokeObjectURL(objectUrlCache.get(id));
                objectUrlCache.delete(id);
            }

            // 3. Si existe en IndexedDB, eliminarlo de la base de datos
            try {
                const db = await openDB();
                await new Promise((resolve) => {
                    const tx = db.transaction(STORE_NAME, 'readwrite');
                    const store = tx.objectStore(STORE_NAME);
                    const req = store.delete(id);
                    req.onsuccess = () => resolve(true);
                    req.onerror = () => resolve(false);
                });
            } catch (err) {
                console.warn('[AudioStore] Error eliminando de IndexedDB:', err);
            }

            // 4. Limpiar cualquier asignación en el Sincronizador que apunte a este audio
            try {
                const rawAssign = localStorage.getItem('rosary_segmented_audio_assignments_v1');
                if (rawAssign) {
                    const assignStore = JSON.parse(rawAssign);
                    let changed = false;
                    for (const lang in assignStore) {
                        for (const mystery in assignStore[lang]) {
                            for (const k in assignStore[lang][mystery]) {
                                if (assignStore[lang][mystery][k] === id) {
                                    delete assignStore[lang][mystery][k];
                                    changed = true;
                                }
                            }
                        }
                    }
                    if (changed) {
                        localStorage.setItem('rosary_segmented_audio_assignments_v1', JSON.stringify(assignStore));
                    }
                }
            } catch (e) {}

            return true;
        },

        // Restaurar todos los audios originales del sistema
        restoreSystemAudios() {
            try {
                localStorage.removeItem(DELETED_AUDIOS_KEY);
            } catch (e) {}
            return true;
        },

        // Renombrar audio
        async renameAudio(id, newName) {
            const db = await openDB();
            const record = await this.getAudioById(id);
            if (!record) return null;
            record.name = newName.trim();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const req = store.put(record);
                req.onsuccess = () => resolve(record);
                req.onerror = (e) => reject(e);
            });
        }
    };
})();

// =============================================================================
// GESTOR DE PERFILES DE VOCES DEL SANTO ROSARIO
// =============================================================================

const RosaryVoiceManager = (function() {
    const VOICES_KEY = 'rosary_voices_v1';
    const ACTIVE_VOICE_KEY = 'rosary_active_voice_id';
    const DEFAULT_VOICE_KEY = 'rosary_default_voice_id';

    const INITIAL_VOICES = [
        {
            id: 'voice_default',
            name: 'Voz Oficial (Sistema)',
            isDefault: true,
            templates: {
                ave_maria: 'sys_avemaria',
                ave_maria_gloria: 'sys_avemaria_gloria',
                padre_nuestro: 'sys_padrenuestro',
                intro_pn: 'sys_sumopontifice',
                gloria: 'sys_gloria',
                credo: 'sys_credo',
                crucifix_intro: 'sys_senaldelacruz',
                pedir_gracia: 'sys_pedirgracia',
                salve: 'sys_diostesalve',
                letanias: 'sys_letanias',
                oracion_final: 'sys_oracion'
            }
        },
        {
            id: 'voice_david',
            name: 'Voz de David',
            isDefault: false,
            templates: {
                ave_maria: 'sys_avemaria',
                ave_maria_gloria: 'sys_avemaria_gloria',
                padre_nuestro: 'sys_padrenuestro',
                intro_pn: 'sys_sumopontifice',
                gloria: 'sys_gloria',
                credo: 'sys_credo',
                crucifix_intro: 'sys_senaldelacruz',
                pedir_gracia: 'sys_pedirgracia',
                salve: 'sys_diostesalve',
                letanias: 'sys_letanias',
                oracion_final: 'sys_oracion'
            }
        },
        {
            id: 'voice_mujer',
            name: 'Voz de Mujer',
            isDefault: false,
            templates: {
                ave_maria: 'sys_avemaria_m',
                ave_maria_gloria: 'sys_avemaria_gloria_m',
                padre_nuestro: 'sys_padrenuestro',
                intro_pn: 'sys_sumopontifice',
                gloria: 'sys_gloria',
                credo: 'sys_credo',
                crucifix_intro: 'sys_senaldelacruz',
                pedir_gracia: 'sys_pedirgracia',
                salve: 'sys_diostesalve',
                letanias: 'sys_letanias',
                oracion_final: 'sys_oracion'
            }
        }
    ];

    function getVoices() {
        try {
            const raw = localStorage.getItem(VOICES_KEY);
            if (raw) {
                const list = JSON.parse(raw);
                if (Array.isArray(list) && list.length > 0) {
                    let changed = false;
                    // Asegurar que las voces del sistema tengan sus audios litúrgicos actualizados
                    const vMujer = list.find(v => v.id === 'voice_mujer');
                    if (vMujer) {
                        if (!vMujer.templates) vMujer.templates = {};
                        if (vMujer.templates.ave_maria === 'sys_avemaria' || !vMujer.templates.ave_maria) {
                            vMujer.templates.ave_maria = 'sys_avemaria_m';
                            changed = true;
                        }
                        if (vMujer.templates.ave_maria_gloria === 'sys_avemaria_gloria' || !vMujer.templates.ave_maria_gloria) {
                            vMujer.templates.ave_maria_gloria = 'sys_avemaria_gloria_m';
                            changed = true;
                        }
                    }
                    if (changed) saveVoices(list);
                    return list;
                }
            }
        } catch (e) {}
        saveVoices(INITIAL_VOICES);
        return INITIAL_VOICES;
    }

    function saveVoices(voices) {
        try {
            localStorage.setItem(VOICES_KEY, JSON.stringify(voices));
        } catch (e) {}
    }

    function getDefaultVoiceId() {
        try {
            const def = localStorage.getItem(DEFAULT_VOICE_KEY);
            if (def) return def;
        } catch (e) {}
        const voices = getVoices();
        const found = voices.find(v => v.isDefault);
        return found ? found.id : 'voice_default';
    }

    function setDefaultVoiceId(voiceId) {
        try {
            localStorage.setItem(DEFAULT_VOICE_KEY, voiceId);
        } catch (e) {}
        const voices = getVoices();
        voices.forEach(v => {
            v.isDefault = (v.id === voiceId);
        });
        saveVoices(voices);
    }

    function getActiveVoiceId() {
        try {
            const active = localStorage.getItem(ACTIVE_VOICE_KEY);
            if (active) {
                const voices = getVoices();
                if (voices.some(v => v.id === active)) return active;
            }
        } catch (e) {}
        return getDefaultVoiceId();
    }

    function setActiveVoiceId(voiceId) {
        try {
            localStorage.setItem(ACTIVE_VOICE_KEY, voiceId);
        } catch (e) {}
    }

    function getVoice(voiceId) {
        const voices = getVoices();
        return voices.find(v => v.id === voiceId) || voices[0];
    }

    function createVoice(name) {
        const voices = getVoices();
        const cleanName = (name && name.trim()) ? name.trim() : `Voz ${voices.length + 1}`;
        const newId = 'voice_' + Date.now();
        const newVoice = {
            id: newId,
            name: cleanName,
            isDefault: false,
            templates: Object.assign({}, voices[0].templates)
        };
        voices.push(newVoice);
        saveVoices(voices);
        return newVoice;
    }

    function updateVoice(voiceId, updates = {}) {
        const voices = getVoices();
        const v = voices.find(item => item.id === voiceId);
        if (!v) return null;
        if (updates.name && updates.name.trim()) v.name = updates.name.trim();
        if (updates.templates) v.templates = Object.assign({}, v.templates || {}, updates.templates);
        if (updates.isDefault !== undefined) {
            if (updates.isDefault) setDefaultVoiceId(voiceId);
            else v.isDefault = false;
        }
        saveVoices(voices);
        return v;
    }

    function deleteVoice(voiceId) {
        if (voiceId === 'voice_default') return false;
        let voices = getVoices();
        voices = voices.filter(v => v.id !== voiceId);
        saveVoices(voices);
        if (getActiveVoiceId() === voiceId) {
            setActiveVoiceId(getDefaultVoiceId());
        }
        return true;
    }

    function autoAssignToVoice(voiceId, availableAudios = []) {
        const v = getVoice(voiceId);
        if (!v) return 0;
        const vNorm = normAudioStr(v.name).replace('vozde', '').replace('voz', '').trim();
        const t = Object.assign({}, v.templates);
        let count = 0;

        availableAudios.forEach(aud => {
            const aNorm = normAudioStr(aud.name);
            const fNorm = normAudioStr(aud.fileName);
            const combined = `${aNorm} ${fNorm}`;
            const matchesVoice = vNorm ? combined.includes(vNorm) : true;

            if ((combined.includes('avemariagloria') || (combined.includes('avemaria') && combined.includes('gloria'))) && matchesVoice) {
                t.ave_maria_gloria = aud.id;
                count++;
            } else if ((combined.includes('avemaria') || combined.includes('hailmary')) && !combined.includes('gloria') && matchesVoice) {
                t.ave_maria = aud.id;
                count++;
            } else if ((combined.includes('padrenuestro') || combined.includes('ourfather')) && matchesVoice) {
                t.padre_nuestro = aud.id;
                count++;
            } else if ((combined.includes('sumopontifice') || combined.includes('papa')) && matchesVoice) {
                t.intro_pn = aud.id;
                count++;
            } else if ((combined.includes('gloria') || combined.includes('glory')) && !combined.includes('avemaria') && matchesVoice) {
                t.gloria = aud.id;
                count++;
            } else if ((combined.includes('credo') || combined.includes('creed')) && matchesVoice) {
                t.credo = aud.id;
                count++;
            } else if ((combined.includes('senaldelacruz') || combined.includes('cruz')) && matchesVoice) {
                t.crucifix_intro = aud.id;
                count++;
            } else if ((combined.includes('pedirgracia') || combined.includes('gracia')) && matchesVoice) {
                t.pedir_gracia = aud.id;
                count++;
            } else if ((combined.includes('diostesalve') || combined.includes('salve')) && matchesVoice) {
                t.salve = aud.id;
                count++;
            } else if ((combined.includes('letania') || combined.includes('litany')) && matchesVoice) {
                t.letanias = aud.id;
                count++;
            } else if ((combined.includes('oracion') || combined.includes('conclusion')) && matchesVoice) {
                t.oracion_final = aud.id;
                count++;
            }
        });

        updateVoice(voiceId, { templates: t });
        return count;
    }

    return {
        getVoices,
        saveVoices,
        getDefaultVoiceId,
        setDefaultVoiceId,
        getActiveVoiceId,
        setActiveVoiceId,
        getVoice,
        createVoice,
        updateVoice,
        deleteVoice,
        autoAssignToVoice
    };
})();

// =============================================================================
// GESTOR DE ASIGNACIONES DE AUDIOS POR ORACIÓN Y MISTERIO
// =============================================================================

const RosaryAudioAssignments = (function() {
    const STORAGE_KEY = 'rosary_segmented_audio_assignments_v1';

    function getStore() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    function saveStore(store) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        } catch (e) {}
    }

    // Calcula asignaciones predeterminadas para que todo esté completo sin requerir configuración manual
    function calculateDefaultAssignments(mystery = 'Gozosos', availableAudios = [], voice = null) {
        function resolveId(keyWord, fallbackId) {
            const normKey = normAudioStr(keyWord);
            if (availableAudios && availableAudios.length > 0) {
                // 1. Coincidencia exacta por nombre o por nombre de archivo (sin extensión)
                const exact = availableAudios.find(a => {
                    const nName = normAudioStr(a.name);
                    const nFile = normAudioStr(a.fileName ? a.fileName.replace(/\.[^/.]+$/, '') : '');
                    return nName === normKey || nFile === normKey;
                });
                if (exact) return exact.id;

                // 2. Coincidencia segura evitando falsos positivos entre AveMaría, Gloria y AveMaría-GLORIA
                const safeMatch = availableAudios.find(a => {
                    const nName = normAudioStr(a.name);
                    const nFile = normAudioStr(a.fileName ? a.fileName.replace(/\.[^/.]+$/, '') : '');
                    if (normKey === 'gloria') {
                        return (nName.includes('gloria') || nFile.includes('gloria')) && !nName.includes('avemaria') && !nFile.includes('avemaria');
                    }
                    if (normKey === 'avemaria') {
                        return (nName.includes('avemaria') || nFile.includes('avemaria')) && !nName.includes('gloria') && !nFile.includes('gloria');
                    }
                    if (normKey === 'avemariagloria') {
                        return nName.includes('avemariagloria') || nFile.includes('avemariagloria') || (nName.includes('avemaria') && nName.includes('gloria'));
                    }
                    return nName.includes(normKey) || nFile.includes(normKey);
                });
                if (safeMatch) return safeMatch.id;
            }
            return fallbackId;
        }

        const effectiveVoice = voice || (window.RosaryVoices ? window.RosaryVoices.getVoice(window.RosaryVoices.getActiveVoiceId()) : null);
        const vTemplates = (effectiveVoice && effectiveVoice.templates) ? effectiveVoice.templates : {};

        const aveMariaId = vTemplates.ave_maria || resolveId('avemaria', 'sys_avemaria');
        const aveMariaGloriaId = vTemplates.ave_maria_gloria || resolveId('avemariagloria', 'sys_avemaria_gloria');
        const padreNuestroId = vTemplates.padre_nuestro || resolveId('padrenuestro', 'sys_padrenuestro');
        const gloriaId = vTemplates.gloria || resolveId('gloria', 'sys_gloria');
        const credoId = vTemplates.credo || resolveId('credo', 'sys_credo');
        const senalCruzId = vTemplates.crucifix_intro || resolveId('senaldelacruz', 'sys_senaldelacruz');
        const sumoPontificeId = vTemplates.intro_pn || resolveId('sumopontifice', padreNuestroId);
        const letaniasId = vTemplates.letanias || resolveId('letanias', 'sys_letanias');
        const salveId = vTemplates.salve || resolveId('diostesalve', 'sys_diostesalve');
        const oracionId = vTemplates.oracion_final || resolveId('oracion', 'sys_oracion');
        const pedirGraciaId = vTemplates.pedir_gracia || resolveId('pedirgracia', 'sys_pedirgracia');

        const def = {};

        // Iniciales
        def['crucifix_intro'] = senalCruzId;
        def['credo'] = credoId;
        def['intro_pn'] = sumoPontificeId;
        def['intro_am_1'] = aveMariaId;
        def['intro_am_2'] = aveMariaId;
        def['intro_am_3'] = aveMariaGloriaId; // 3ª Ave María (Sumo Pontífice)
        def['intro_gloria'] = gloriaId;

        // 5 Decenas (Pedir Gracia, Padre Nuestro, 10 Ave Marías, Gloria)
        for (let d = 1; d <= 5; d++) {
            def[`d${d}_gracia`] = pedirGraciaId;
            def[`d${d}_pn`] = padreNuestroId;
            for (let a = 1; a <= 9; a++) {
                def[`d${d}_am_${a}`] = aveMariaId;
            }
            def[`d${d}_am_10`] = aveMariaGloriaId; // 10ª Ave María de todos los misterios
            def[`d${d}_gl`] = gloriaId;
        }

        // Meditaciones según el misterio
        if (mystery === 'Gozosos') {
            def['d1_meditacion'] = resolveId('1gozoso', 'sys_1gozoso');
            def['d2_meditacion'] = resolveId('2gozoso', 'sys_2gozoso');
            def['d3_meditacion'] = resolveId('3gozoso', 'sys_3gozoso');
            def['d4_meditacion'] = resolveId('4gozoso', 'sys_4gozoso');
            def['d5_meditacion'] = resolveId('5gozoso', 'sys_5gozoso');
        } else if (mystery === 'Dolorosos') {
            def['d1_meditacion'] = resolveId('dolorosos1', 'sys_dolorosos1');
            def['d2_meditacion'] = resolveId('dolorosos2', 'sys_dolorosos2');
            def['d3_meditacion'] = resolveId('dolorosos3', 'sys_dolorosos3');
            def['d4_meditacion'] = resolveId('dolorosos4', 'sys_dolorosos4');
            def['d5_meditacion'] = resolveId('dolorosos5', 'sys_dolorosos5');
        } else if (mystery === 'Gloriosos') {
            def['d1_meditacion'] = resolveId('gloriosos1', 'sys_gloriosos1');
            def['d2_meditacion'] = resolveId('gloriosos2', 'sys_gloriosos2');
            def['d3_meditacion'] = resolveId('gloriosos3', 'sys_gloriosos3');
            def['d4_meditacion'] = resolveId('gloriosos4', 'sys_gloriosos4');
            def['d5_meditacion'] = resolveId('gloriosos5', 'sys_gloriosos5');
        } else if (mystery === 'Luminosos') {
            def['d1_meditacion'] = resolveId('luminosos1', 'sys_luminosos1');
            def['d2_meditacion'] = resolveId('luminosos2', 'sys_luminosos2');
            def['d3_meditacion'] = resolveId('luminosos3', 'sys_luminosos3');
            def['d4_meditacion'] = resolveId('luminosos4', 'sys_luminosos4');
            def['d5_meditacion'] = resolveId('luminosos5', 'sys_luminosos5');
        }

        // Conclusión
        def['letanias'] = letaniasId;
        def['salve'] = salveId;
        def['oracion_final'] = oracionId;

        return def;
    }

    return {
        // Obtener asignaciones para un misterio e idioma (incluye predeterminados automáticos)
        getAssignments(lang = 'es', mystery = 'Gozosos', availableAudios = [], voiceId = null) {
            const activeVoiceId = voiceId || (window.RosaryVoices ? window.RosaryVoices.getActiveVoiceId() : 'voice_default');
            const voice = window.RosaryVoices ? window.RosaryVoices.getVoice(activeVoiceId) : null;
            const defaults = calculateDefaultAssignments(mystery, availableAudios, voice);
            const store = getStore();

            // Solo personalizaciones que pertenecen estrictamente a esta voz activa
            const userCustom = (store[activeVoiceId] && store[activeVoiceId][lang] && store[activeVoiceId][lang][mystery])
                ? store[activeVoiceId][lang][mystery]
                : ((activeVoiceId === 'voice_default' && store[lang] && store[lang][mystery]) ? store[lang][mystery] : {});

            // La plantilla de la voz seleccionada es la base litúrgica para todas las cuentas
            const merged = Object.assign({}, defaults);

            // Sanear y superponer solo personalizaciones explícitas guardadas para esta voz
            for (const k in userCustom) {
                if (userCustom[k] && userCustom[k] !== '__upload__') {
                    // Evitar que asignaciones erróneas de gloria o credo sobrescriban cuentas que no corresponden
                    if (k.includes('_am_') && (userCustom[k] === 'sys_gloria' || userCustom[k] === 'gloria')) {
                        continue;
                    }
                    if ((k.includes('_gl') || k === 'intro_gloria') && (userCustom[k] === 'sys_credo' || userCustom[k] === 'credo')) {
                        continue;
                    }
                    merged[k] = userCustom[k];
                }
            }

            return merged;
        },

        // Limpiar sobreescrituras individuales de filas para una voz específica,
        // asegurando que todas las oraciones adopten de inmediato la configuración de la voz
        clearVoiceRowOverrides(voiceId) {
            const store = getStore();
            if (store[voiceId]) {
                delete store[voiceId];
            }
            if (voiceId === 'voice_default' || voiceId === window.RosaryVoices?.getDefaultVoiceId()) {
                for (const l in store) {
                    if (l !== 'voice_default' && !l.startsWith('voice_')) {
                        delete store[l];
                    }
                }
            }
            saveStore(store);
        },

        // Asignar un audio a una oración específica
        setAssignment(lang, mystery, itemKey, audioId, voiceId = null) {
            const activeVoiceId = voiceId || (window.RosaryVoices ? window.RosaryVoices.getActiveVoiceId() : 'voice_default');
            const store = getStore();
            if (!store[activeVoiceId]) store[activeVoiceId] = {};
            if (!store[activeVoiceId][lang]) store[activeVoiceId][lang] = {};
            if (!store[activeVoiceId][lang][mystery]) store[activeVoiceId][lang][mystery] = {};

            if (audioId) {
                store[activeVoiceId][lang][mystery][itemKey] = audioId;
            } else {
                delete store[activeVoiceId][lang][mystery][itemKey];
            }

            // Retrocompatibilidad con store plano para la voz por defecto
            if (activeVoiceId === 'voice_default' || activeVoiceId === window.RosaryVoices?.getDefaultVoiceId()) {
                if (!store[lang]) store[lang] = {};
                if (!store[lang][mystery]) store[lang][mystery] = {};
                if (audioId) store[lang][mystery][itemKey] = audioId;
                else delete store[lang][mystery][itemKey];
            }

            saveStore(store);

            if (window.RosaryCloud && typeof window.RosaryCloud.saveAssignmentsToCloud === 'function') {
                window.RosaryCloud.saveAssignmentsToCloud(lang, mystery, store[activeVoiceId][lang][mystery]).catch(() => {});
            }
        },

        // Guardar lote completo de asignaciones
        setAllAssignments(lang, mystery, assignmentsMap, voiceId = null) {
            const activeVoiceId = voiceId || (window.RosaryVoices ? window.RosaryVoices.getActiveVoiceId() : 'voice_default');
            const store = getStore();
            if (!store[activeVoiceId]) store[activeVoiceId] = {};
            if (!store[activeVoiceId][lang]) store[activeVoiceId][lang] = {};
            store[activeVoiceId][lang][mystery] = Object.assign({}, assignmentsMap);

            if (activeVoiceId === 'voice_default' || activeVoiceId === window.RosaryVoices?.getDefaultVoiceId()) {
                if (!store[lang]) store[lang] = {};
                store[lang][mystery] = Object.assign({}, assignmentsMap);
            }

            saveStore(store);

            if (window.RosaryCloud && typeof window.RosaryCloud.saveAssignmentsToCloud === 'function') {
                window.RosaryCloud.saveAssignmentsToCloud(lang, mystery, store[activeVoiceId][lang][mystery]).catch(() => {});
            }
        },

        // Auto-asignación inteligente por similitud de nombres (robusto a mayúsculas, acentos y sin espacios)
        autoAssign(lang, mystery, availableAudios, structureItems, voiceId = null) {
            const assignments = Object.assign({}, this.getAssignments(lang, mystery, availableAudios, voiceId));
            let assignedCount = 0;

            structureItems.forEach(item => {
                const key = item.key.toLowerCase();
                const type = (item.type || '').toLowerCase();

                for (const aud of availableAudios) {
                    const aNorm = normAudioStr(aud.name);
                    const fNorm = normAudioStr(aud.fileName);
                    const combined = `${aNorm} ${fNorm}`;

                    let isMatch = false;

                    // 1. Padre Nuestro
                    if (type === 'padre_nuestro' || key.includes('_pn')) {
                        if (key === 'intro_pn' && (combined.includes('sumopontifice') || combined.includes('papa'))) {
                            isMatch = true;
                        } else if (combined.includes('padrenuestro') || combined.includes('ourfather') || combined.includes('paternoster')) {
                            isMatch = true;
                        }
                    }
                    // 2. Ave María
                    else if (type === 'ave_maria' || key.includes('_am_')) {
                        const isTenthOrThird = (key === 'intro_am_3' || key.endsWith('_am_10'));
                        if (isTenthOrThird) {
                            // La 3ª del Sumo Pontífice y la 10ª de cada misterio: asignar AveMaria-GLORIA
                            if (combined.includes('avemariagloria') || combined.includes('avemaria-gloria')) {
                                isMatch = true;
                            }
                        } else {
                            // Cuentas 1 a 9 y 1-2 iniciales: asignar Avemaria ordinaria (NO AveMaria-GLORIA)
                            if ((combined.includes('avemaria') || combined.includes('hailmary')) && !combined.includes('gloria')) {
                                isMatch = true;
                            }
                        }
                    }
                    // 3. Gloria al Padre
                    else if (type === 'gloria' || key.includes('_gl')) {
                        // El Gloria al Padre puro: NO asignar AveMaria-GLORIA, sino Gloria ordinario
                        if ((combined.includes('gloria') || combined.includes('glory')) && !combined.includes('avemaria')) {
                            isMatch = true;
                        }
                    }
                    // 4. Credo
                    else if (key === 'credo' || type === 'credo') {
                        if (combined.includes('credo') || combined.includes('creed')) {
                            isMatch = true;
                        }
                    }
                    // 5. Señal de la Cruz
                    else if (key === 'crucifix_intro') {
                        if (combined.includes('senaldelacruz') || combined.includes('cruz') || combined.includes('signofthecross')) {
                            isMatch = true;
                        }
                    }
                    // 6. La Salve
                    else if (key === 'salve') {
                        if (combined.includes('diostesalve') || combined.includes('salve')) {
                            isMatch = true;
                        }
                    }
                    // 7. Letanías
                    else if (key === 'letanias') {
                        if (combined.includes('letania') || combined.includes('litany')) {
                            isMatch = true;
                        }
                    }
                    // 8. Oración Final
                    else if (key === 'oracion_final') {
                        if (combined.includes('oracion') || combined.includes('conclusion')) {
                            isMatch = true;
                        }
                    }
                    // 9. Pedir una Gracia
                    else if (key.includes('_gracia') || type === 'gracia') {
                        if (combined.includes('pedirgracia') || combined.includes('gracia')) {
                            isMatch = true;
                        }
                    }
                    // 10. Meditaciones de misterios (Gozosos, Dolorosos, Gloriosos, Luminosos...)
                    else if (key.startsWith('d') && key.includes('_meditacion')) {
                        const decNum = item.decade;
                        const mystNorm = normAudioStr(mystery);
                        if (combined.includes(`${decNum}${mystNorm}`) || combined.includes(`${mystNorm}${decNum}`) ||
                            combined.includes(`${decNum}misterio`) || combined.includes(`misterio${decNum}`) ||
                            combined.includes(`meditacion${decNum}`)) {
                            isMatch = true;
                        } else if (mystNorm.includes('gozoso') && combined.includes(`${decNum}gozoso`)) {
                            isMatch = true;
                        } else if (mystNorm.includes('doloroso') && (combined.includes(`doloroso${decNum}`) || combined.includes(`dolorosos${decNum}`))) {
                            isMatch = true;
                        } else if (mystNorm.includes('glorioso') && (combined.includes(`glorioso${decNum}`) || combined.includes(`gloriosos${decNum}`))) {
                            isMatch = true;
                        } else if (mystNorm.includes('luminoso') && (combined.includes(`luminoso${decNum}`) || combined.includes(`luminosos${decNum}`))) {
                            isMatch = true;
                        }
                    }

                    if (isMatch) {
                        assignments[item.key] = aud.id;
                        assignedCount++;
                        break;
                    }
                }
            });

            this.setAllAssignments(lang, mystery, assignments, voiceId);
            return { assignments, assignedCount };
        }
    };
})();

// =============================================================================
// EXPORTADOR Y CONCATENADOR DE AUDIOS A UN SOLO ARCHIVO (.WAV)
// =============================================================================

const RosaryAudioExporter = (function() {
    function audioBufferToWavBlob(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;
        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;

        const numSamples = buffer.length;
        const dataByteLength = numSamples * blockAlign;
        const headerByteLength = 44;
        const totalByteLength = headerByteLength + dataByteLength;

        const arrayBuffer = new ArrayBuffer(totalByteLength);
        const view = new DataView(arrayBuffer);

        function writeString(offset, string) {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        // RIFF descriptor
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + dataByteLength, true);
        writeString(8, 'WAVE');

        // FMT sub-chunk
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);

        // DATA sub-chunk
        writeString(36, 'data');
        view.setUint32(40, dataByteLength, true);

        const channels = [];
        for (let c = 0; c < numChannels; c++) {
            channels.push(buffer.getChannelData(c));
        }

        let offset = 44;
        for (let i = 0; i < numSamples; i++) {
            for (let c = 0; c < numChannels; c++) {
                let sample = channels[c][i];
                sample = Math.max(-1, Math.min(1, sample));
                const intSample = sample < 0 ? sample * 32768 : sample * 32767;
                view.setInt16(offset, intSample, true);
                offset += 2;
            }
        }

        return new Blob([arrayBuffer], { type: 'audio/wav' });
    }

    return {
        // Concatena todos los audios asignados en orden litúrgico y descarga el archivo completo
        async exportRosaryAudio(steps, assignments, onProgress = null) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                throw new Error('La API de Audio no es compatible con este navegador.');
            }

            const audioCtx = new AudioContextClass();
            const buffers = [];
            const pauseSeconds = 0.20; // 200ms de pausa natural entre oraciones
            let sampleRate = 44100;
            let maxChannels = 1;

            const total = steps.length;
            for (let i = 0; i < total; i++) {
                const step = steps[i];
                const audioId = assignments[step.key];

                if (onProgress) {
                    onProgress(i + 1, total, step.title);
                }

                if (audioId) {
                    const record = await RosaryAudioStore.getAudioById(audioId);
                    if (record) {
                        try {
                            let arrayBuf = null;
                            if (record.blob) {
                                arrayBuf = await record.blob.arrayBuffer();
                            } else if (record.path) {
                                const resp = await fetch(record.path);
                                arrayBuf = await resp.arrayBuffer();
                            }
                            if (arrayBuf) {
                                const decoded = await audioCtx.decodeAudioData(arrayBuf);
                                buffers.push(decoded);
                                sampleRate = decoded.sampleRate || sampleRate;
                                maxChannels = Math.max(maxChannels, decoded.numberOfChannels || 1);
                            }
                        } catch (decodeErr) {
                            console.warn(`[AudioExporter] No se pudo decodificar audio de ${step.title}:`, decodeErr);
                        }
                    }
                }
            }

            if (buffers.length === 0) {
                audioCtx.close();
                throw new Error('No hay audios asignados para exportar.');
            }

            const pauseSamples = Math.round(pauseSeconds * sampleRate);
            let totalLength = 0;
            buffers.forEach((b, idx) => {
                totalLength += b.length;
                if (idx < buffers.length - 1) {
                    totalLength += pauseSamples;
                }
            });

            const masterBuffer = audioCtx.createBuffer(maxChannels, totalLength, sampleRate);
            let currentOffset = 0;

            buffers.forEach((b, idx) => {
                for (let c = 0; c < maxChannels; c++) {
                    const srcChannel = b.getChannelData(Math.min(c, b.numberOfChannels - 1));
                    masterBuffer.getChannelData(c).set(srcChannel, currentOffset);
                }
                currentOffset += b.length;
                if (idx < buffers.length - 1) {
                    currentOffset += pauseSamples;
                }
            });

            if (onProgress) {
                onProgress(total, total, 'Generando archivo de audio final...');
            }

            const wavBlob = audioBufferToWavBlob(masterBuffer);
            audioCtx.close();
            return wavBlob;
        }
    };
})();

// Exportar globalmente
window.normAudioStr = normAudioStr;
window.SYSTEM_AUDIO_CATALOG = SYSTEM_AUDIO_CATALOG;
window.RosaryAudioStore = RosaryAudioStore;
window.RosaryVoices = RosaryVoiceManager;
window.RosaryAudioAssignments = RosaryAudioAssignments;
window.RosaryAudioExporter = RosaryAudioExporter;
