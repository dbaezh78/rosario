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

// Exponer la interfaz en window.RosaryCloud
window.RosaryCloud = {
    app,
    db,
    isConnected,
    saveTimesToCloud,
    loadAllTimesFromCloud,
    subscribeToCloudTimes
};

// Auto-sincronización inicial al cargar el script
async function initCloudSync() {
    if (!isConnected) return;
    try {
        // Escuchar en tiempo real
        subscribeToCloudTimes((cloudData) => {
            console.log("☁️ Actualización recibida desde Cloud Firestore:", cloudData);
            
            // Integrar en localStorage
            if (typeof localStorage !== 'undefined' && cloudData) {
                const raw = localStorage.getItem('rosary_custom_times_v1');
                const local = raw ? JSON.parse(raw) : {};
                
                // Mezclar datos de la nube con locales
                for (const l in cloudData) {
                    if (!local[l]) local[l] = {};
                    for (const m in cloudData[l]) {
                        local[l][m] = Object.assign({}, local[l][m] || {}, cloudData[l][m]);
                        
                        // Actualizar objeto en memoria si existe
                        if (typeof audioData !== 'undefined' && audioData[l] && audioData[l][m]) {
                            audioData[l][m].customTimes = Object.assign({}, audioData[l][m].customTimes || {}, cloudData[l][m]);
                        }
                    }
                }
                localStorage.setItem('rosary_custom_times_v1', JSON.stringify(local));

                // Si la función de actualización existe en script.js, refrescar
                if (typeof window.refreshActiveTimeline === 'function') {
                    window.refreshActiveTimeline();
                }
            }

            // Notificar indicador visual si existe
            const badge = document.getElementById('sync-cloud-status');
            if (badge) {
                badge.innerHTML = '☁️ <span style="color: #4ade80;">Conectado a Firestore (Nube)</span>';
            }
        });
    } catch (e) {
        console.warn("Error en sincronización inicial Firestore:", e);
    }
}

initCloudSync();
