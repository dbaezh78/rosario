// =============================================================================
// SANTO ROSARIO - SINCRONIZACIÓN EN LA NUBE (FIREBASE / CLOUD FIRESTORE)
// =============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    getDocs, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

// Configuración de Firebase para el proyecto 'elsantorosario'
const firebaseConfig = {
    apiKey: "AIzaSyCnyPyX1yQdr0135xpDHIihS1dPY3hm8Kw",
    authDomain: "elsantorosario.firebaseapp.com",
    projectId: "elsantorosario",
    storageBucket: "elsantorosario.firebasestorage.app",
    messagingSenderId: "486740638167",
    appId: "1:486740638167:web:6094eb91fb04c85f363392"
};

let app = null;
let db = null;
let isConnected = false;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isConnected = true;
    console.log("🔥 Firebase inicializado con éxito para ElSantoRosario");
} catch (err) {
    console.warn("⚠️ No se pudo inicializar Firebase:", err);
}

// Guarda los tiempos en Cloud Firestore
async function saveTimesToCloud(lang, mystery, times) {
    if (!db) {
        console.warn("Firestore no está disponible.");
        return false;
    }
    try {
        const docRef = doc(db, "rosary_times", `${lang}_${mystery}`);
        await setDoc(docRef, {
            lang: lang,
            mystery: mystery,
            times: times,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        console.log(`☁️ Guardado en la nube: ${mystery} (${lang})`);
        return true;
    } catch (e) {
        console.error("Error al guardar en Firestore:", e);
        return false;
    }
}

// Carga todos los tiempos desde Cloud Firestore
async function loadAllTimesFromCloud() {
    if (!db) return null;
    try {
        const querySnapshot = await getDocs(collection(db, "rosary_times"));
        const cloudData = {};
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.lang && data.mystery && data.times) {
                if (!cloudData[data.lang]) cloudData[data.lang] = {};
                cloudData[data.lang][data.mystery] = data.times;
            }
        });
        return cloudData;
    } catch (e) {
        console.error("Error al cargar de Firestore:", e);
        return null;
    }
}

// Escucha cambios en tiempo real desde la nube (sincroniza automáticamente en móvil, tablet y PC)
function subscribeToCloudTimes(onUpdateCallback) {
    if (!db) return () => {};
    try {
        const unsubscribe = onSnapshot(collection(db, "rosary_times"), (snapshot) => {
            const cloudData = {};
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.lang && data.mystery && data.times) {
                    if (!cloudData[data.lang]) cloudData[data.lang] = {};
                    cloudData[data.lang][data.mystery] = data.times;
                }
            });
            if (typeof onUpdateCallback === 'function') {
                onUpdateCallback(cloudData);
            }
        }, (error) => {
            console.warn("Error en suscripción Firestore:", error);
        });
        return unsubscribe;
    } catch (e) {
        console.warn("No se pudo iniciar suscripción a Firestore:", e);
        return () => {};
    }
}

// Guarda oraciones en Cloud Firestore
async function savePrayersToCloud(lang, prayers) {
    if (!db) {
        console.warn("Firestore no está disponible.");
        return false;
    }
    try {
        const docRef = doc(db, "rosary_prayers", lang);
        await setDoc(docRef, {
            lang: lang,
            prayers: prayers,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        console.log(`☁️ Oraciones guardadas en la nube (${lang})`);
        return true;
    } catch (e) {
        console.error("Error al guardar oraciones en Firestore:", e);
        return false;
    }
}

// Carga todas las oraciones desde Cloud Firestore
async function loadAllPrayersFromCloud() {
    if (!db) return null;
    try {
        const querySnapshot = await getDocs(collection(db, "rosary_prayers"));
        const cloudData = {};
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.lang && data.prayers) {
                cloudData[data.lang] = data.prayers;
            }
        });
        return cloudData;
    } catch (e) {
        console.error("Error al cargar oraciones de Firestore:", e);
        return null;
    }
}

// Escucha cambios de oraciones en tiempo real desde la nube
function subscribeToCloudPrayers(onUpdateCallback) {
    if (!db) return () => {};
    try {
        const unsubscribe = onSnapshot(collection(db, "rosary_prayers"), (snapshot) => {
            const cloudData = {};
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.lang && data.prayers) {
                    cloudData[data.lang] = data.prayers;
                }
            });
            if (typeof onUpdateCallback === 'function') {
                onUpdateCallback(cloudData);
            }
        }, (error) => {
            console.warn("Error en suscripción Firestore oraciones:", error);
        });
        return unsubscribe;
    } catch (e) {
        console.warn("No se pudo iniciar suscripción a oraciones Firestore:", e);
        return () => {};
    }
}

// Guarda contenido personalizado de una cuenta/oración específica en Cloud Firestore
async function saveItemContentToCloud(lang, mystery, itemKey, content) {
    if (!db) {
        console.warn("Firestore no está disponible.");
        return false;
    }
    try {
        const docRef = doc(db, "rosary_content", `${lang}_${mystery}`);
        const updatePayload = {
            lang: lang,
            mystery: mystery,
            items: {
                [itemKey]: {
                    title: content.title || '',
                    subtitle: content.subtitle || '',
                    prayerText: content.prayerText || '',
                    reset: !!content.reset,
                    updatedAt: new Date().toISOString()
                }
            },
            updatedAt: new Date().toISOString()
        };
        await setDoc(docRef, updatePayload, { merge: true });
        console.log(`☁️ Contenido de [${itemKey}] guardado en la nube (${lang} - ${mystery})`);
        return true;
    } catch (e) {
        console.error("Error al guardar contenido en Firestore:", e);
        return false;
    }
}

// Carga todos los contenidos personalizados de cuentas desde Cloud Firestore
async function loadAllContentFromCloud() {
    if (!db) return null;
    try {
        const querySnapshot = await getDocs(collection(db, "rosary_content"));
        const cloudData = {};
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.lang && data.mystery && data.items) {
                if (!cloudData[data.lang]) cloudData[data.lang] = {};
                cloudData[data.lang][data.mystery] = data.items;
            }
        });
        return cloudData;
    } catch (e) {
        console.error("Error al cargar contenido de Firestore:", e);
        return null;
    }
}

// Escucha cambios en tiempo real de contenidos personalizados desde Cloud Firestore
function subscribeToCloudContent(onUpdateCallback) {
    if (!db) return () => {};
    try {
        const unsubscribe = onSnapshot(collection(db, "rosary_content"), (snapshot) => {
            const cloudData = {};
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.lang && data.mystery && data.items) {
                    if (!cloudData[data.lang]) cloudData[data.lang] = {};
                    cloudData[data.lang][data.mystery] = data.items;
                }
            });
            if (typeof onUpdateCallback === 'function') {
                onUpdateCallback(cloudData);
            }
        }, (error) => {
            console.warn("Error en suscripción Firestore contenidos:", error);
        });
        return unsubscribe;
    } catch (e) {
        console.warn("No se pudo iniciar suscripción a contenidos Firestore:", e);
        return () => {};
    }
}

// Exponer la interfaz en window.RosaryCloud
window.RosaryCloud = {
    app,
    db,
    isConnected,
    saveTimesToCloud,
    loadAllTimesFromCloud,
    subscribeToCloudTimes,
    savePrayersToCloud,
    loadAllPrayersFromCloud,
    subscribeToCloudPrayers,
    saveItemContentToCloud,
    loadAllContentFromCloud,
    subscribeToCloudContent
};

// Auto-sincronización inicial al cargar el script
async function initCloudSync() {
    if (!isConnected) return;
    try {
        // Actualizar badges visuales si ya están en el DOM
        const updateBadges = () => {
            const syncBadge = document.getElementById('sync-cloud-status');
            if (syncBadge) syncBadge.innerHTML = '☁️ <span style="color: #4ade80;">Conectado a Firestore (Nube)</span>';
            const prayersBadge = document.getElementById('prayers-cloud-status');
            if (prayersBadge) prayersBadge.innerHTML = '☁️ <span style="color: #4ade80;">Conectado a Firestore (Nube)</span>';
            const editBadge = document.getElementById('edit-content-cloud-status');
            if (editBadge) editBadge.innerHTML = '☁️ <span style="color: #4ade80;">Conectado a Firestore (Nube)</span>';
        };
        updateBadges();

        // 1. Escuchar tiempos en tiempo real
        subscribeToCloudTimes((cloudData) => {
            console.log("☁️ Actualización de tiempos recibida desde Cloud Firestore:", cloudData);
            if (typeof localStorage !== 'undefined' && cloudData) {
                const raw = localStorage.getItem('rosary_custom_times_v1');
                const local = raw ? JSON.parse(raw) : {};
                for (const l in cloudData) {
                    if (!local[l]) local[l] = {};
                    for (const m in cloudData[l]) {
                        local[l][m] = Object.assign({}, local[l][m] || {}, cloudData[l][m]);
                        if (typeof audioData !== 'undefined' && audioData[l] && audioData[l][m]) {
                            audioData[l][m].customTimes = Object.assign({}, audioData[l][m].customTimes || {}, cloudData[l][m]);
                        }
                    }
                }
                localStorage.setItem('rosary_custom_times_v1', JSON.stringify(local));

                if (typeof window.refreshActiveTimeline === 'function') {
                    window.refreshActiveTimeline();
                }
            }
            updateBadges();
        });

        // 2. Escuchar oraciones en tiempo real
        subscribeToCloudPrayers((cloudPrayers) => {
            console.log("☁️ Actualización de oraciones recibida desde Cloud Firestore:", cloudPrayers);
            if (typeof localStorage !== 'undefined' && cloudPrayers) {
                const raw = localStorage.getItem('rosary_custom_prayers_v1');
                const local = raw ? JSON.parse(raw) : {};
                for (const l in cloudPrayers) {
                    local[l] = Object.assign({}, local[l] || {}, cloudPrayers[l]);
                }
                localStorage.setItem('rosary_custom_prayers_v1', JSON.stringify(local));

                if (typeof window.refreshActivePrayersUI === 'function') {
                    window.refreshActivePrayersUI();
                }
            }
            updateBadges();
        });

        // 3. Escuchar contenidos específicos de items en tiempo real
        subscribeToCloudContent((cloudContent) => {
            console.log("☁️ Actualización de contenidos recibida desde Cloud Firestore:", cloudContent);
            if (typeof localStorage !== 'undefined' && cloudContent) {
                const raw = localStorage.getItem('rosary_custom_item_content_v1');
                const local = raw ? JSON.parse(raw) : {};
                for (const l in cloudContent) {
                    if (!local[l]) local[l] = {};
                    for (const m in cloudContent[l]) {
                        if (!local[l][m]) local[l][m] = {};
                        for (const k in cloudContent[l][m]) {
                            const itemData = cloudContent[l][m][k];
                            if (itemData && itemData.reset) {
                                delete local[l][m][k];
                            } else if (itemData) {
                                local[l][m][k] = Object.assign({}, local[l][m][k] || {}, itemData);
                            }
                        }
                    }
                }
                localStorage.setItem('rosary_custom_item_content_v1', JSON.stringify(local));

                if (typeof window.refreshActiveTimeline === 'function') {
                    window.refreshActiveTimeline();
                }
                if (typeof window.refreshSyncModalContentUI === 'function') {
                    window.refreshSyncModalContentUI();
                }
            }
            updateBadges();
        });
    } catch (e) {
        console.warn("Error en sincronización inicial Firestore:", e);
    }
}

initCloudSync();
