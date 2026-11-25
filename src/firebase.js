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
import { 
    getAuth, 
    signInWithPopup, 
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

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
let auth = null;
let isConnected = false;
const ADMIN_EMAIL = "dbaezh78@gmail.com";
let currentUser = null;
let isAdmin = false;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    isConnected = true;
    console.log("🔥 Firebase inicializado con éxito para ElSantoRosario");
} catch (err) {
    console.warn("⚠️ No se pudo inicializar Firebase:", err);
}

// Escucha en tiempo real del estado de autenticación
if (auth) {
    // Recuperar usuario si vuelve de redirección en navegadores móviles (Chrome Android/Safari)
    getRedirectResult(auth).then((result) => {
        if (result && result.user) {
            currentUser = result.user;
            isAdmin = !!(currentUser && currentUser.email && currentUser.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase());
            console.log(`👤 Sesión Google recuperada tras redirección: ${currentUser.email} | Admin: ${isAdmin}`);
            if (typeof window.onRosaryAuthStateChanged === 'function') {
                window.onRosaryAuthStateChanged(currentUser, isAdmin);
            }
            window.dispatchEvent(new CustomEvent('rosary-auth-changed', { 
                detail: { user: currentUser, isAdmin, email: currentUser.email } 
            }));
        }
    }).catch((err) => {
        console.warn("⚠️ Advertencia al verificar resultado de redirección Auth:", err);
    });

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        isAdmin = !!(user && user.email && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase());
        console.log(`👤 Auth State: ${user ? user.email : 'Visitante (No autenticado)'} | Admin: ${isAdmin}`);
        
        if (typeof window.onRosaryAuthStateChanged === 'function') {
            window.onRosaryAuthStateChanged(user, isAdmin);
        }
        window.dispatchEvent(new CustomEvent('rosary-auth-changed', { 
            detail: { user, isAdmin, email: user ? user.email : null } 
        }));
    });
}

async function loginWithGoogle() {
    if (!auth) throw new Error("Firebase Auth no disponible");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    // Detección de dispositivos móviles para usar redirección si los popups son bloqueados
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    try {
        if (isMobile) {
            console.log("📱 Navegador móvil detectado: intentando signInWithPopup con fallback a signInWithRedirect...");
        }
        const result = await signInWithPopup(auth, provider);
        currentUser = result.user;
        isAdmin = !!(currentUser && currentUser.email && currentUser.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase());
        window.dispatchEvent(new CustomEvent('rosary-auth-changed', { 
            detail: { user: currentUser, isAdmin, email: currentUser.email } 
        }));
        return { user: currentUser, isAdmin };
    } catch (popupErr) {
        console.warn("Popup bloqueado o no soportado, activando redirección:", popupErr);
        if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request' || popupErr.code === 'auth/popup-closed-by-user' || isMobile) {
            await signInWithRedirect(auth, provider);
            return null;
        }
        throw popupErr;
    }
}

async function logout() {
    if (!auth) return;
    await signOut(auth);
    currentUser = null;
    isAdmin = false;
    window.dispatchEvent(new CustomEvent('rosary-auth-changed', { 
        detail: { user: null, isAdmin: false, email: null } 
    }));
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

// Restaura tiempos desde Cloud Firestore para un misterio e idioma
async function restoreTimesFromCloud(lang, mystery) {
    if (!db) {
        console.warn("Firestore no está disponible.");
        return false;
    }
    try {
        const docRef = doc(db, "rosary_times", `${lang}_${mystery}`);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            const data = snap.data();
            if (data && data.times) {
                if (typeof saveCustomTimesToStorage === 'function') {
                    saveCustomTimesToStorage(lang, mystery, data.times);
                }
                if (typeof audioData !== 'undefined' && audioData[lang] && audioData[lang][mystery]) {
                    audioData[lang][mystery].customTimes = Object.assign({}, audioData[lang][mystery].customTimes || {}, data.times);
                }
                if (typeof renderSyncItems === 'function' && typeof syncLangSelect !== 'undefined' && typeof syncMysterySelect !== 'undefined') {
                    renderSyncItems(lang, mystery);
                }
                if (typeof window.refreshActiveTimeline === 'function') {
                    window.refreshActiveTimeline();
                }
                if (typeof window.refreshSyncModalTimesUI === 'function') {
                    window.refreshSyncModalTimesUI();
                }
                return true;
            }
        }
        return false;
    } catch (e) {
        console.error("Error restaurando de Firestore:", e);
        return false;
    }
}

// Guarda asignaciones de audios en Cloud Firestore
async function saveAssignmentsToCloud(lang, mystery, assignments) {
    if (!db) {
        console.warn("Firestore no está disponible.");
        return false;
    }
    try {
        const docRef = doc(db, "rosary_assignments", `${lang}_${mystery}`);
        await setDoc(docRef, {
            lang: lang,
            mystery: mystery,
            assignments: assignments,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        console.log(`☁️ Asignaciones guardadas en la nube: ${mystery} (${lang})`);
        return true;
    } catch (e) {
        console.error("Error al guardar asignaciones en Firestore:", e);
        return false;
    }
}

// Carga todas las asignaciones desde Cloud Firestore
async function loadAllAssignmentsFromCloud() {
    if (!db) return null;
    try {
        const querySnapshot = await getDocs(collection(db, "rosary_assignments"));
        const cloudData = {};
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.lang && data.mystery && data.assignments) {
                if (!cloudData[data.lang]) cloudData[data.lang] = {};
                cloudData[data.lang][data.mystery] = data.assignments;
            }
        });
        return cloudData;
    } catch (e) {
        console.error("Error al cargar asignaciones de Firestore:", e);
        return null;
    }
}

// Escucha en tiempo real cambios de asignaciones desde Cloud Firestore
function subscribeToCloudAssignments(onUpdateCallback) {
    if (!db) return () => {};
    try {
        const unsubscribe = onSnapshot(collection(db, "rosary_assignments"), (snapshot) => {
            const cloudData = {};
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.lang && data.mystery && data.assignments) {
                    if (!cloudData[data.lang]) cloudData[data.lang] = {};
                    cloudData[data.lang][data.mystery] = data.assignments;
                }
            });
            if (typeof onUpdateCallback === 'function') {
                onUpdateCallback(cloudData);
            }
        }, (error) => {
            console.warn("Error en suscripción Firestore asignaciones:", error);
        });
        return unsubscribe;
    } catch (e) {
        console.warn("No se pudo iniciar suscripción a asignaciones Firestore:", e);
        return () => {};
    }
}

// Exponer la interfaz en window.RosaryCloud y window.RosaryAuth
window.RosaryCloud = {
    app,
    db,
    auth,
    isConnected,
    saveTimesToCloud,
    loadAllTimesFromCloud,
    subscribeToCloudTimes,
    restoreTimesFromCloud,
    savePrayersToCloud,
    loadAllPrayersFromCloud,
    subscribeToCloudPrayers,
    saveItemContentToCloud,
    loadAllContentFromCloud,
    subscribeToCloudContent,
    saveAssignmentsToCloud,
    loadAllAssignmentsFromCloud,
    subscribeToCloudAssignments
};

window.RosaryAuth = {
    auth,
    ADMIN_EMAIL,
    loginWithGoogle,
    logout,
    checkIsAdmin: (u) => {
        const target = u || currentUser;
        return !!(target && target.email && target.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase());
    },
    getCurrentUser: () => currentUser,
    onAuthStateChanged: (callback) => {
        if (!auth) {
            if (typeof callback === 'function') callback(null, false);
            return () => {};
        }
        return onAuthStateChanged(auth, (user) => {
            currentUser = user;
            isAdmin = !!(user && user.email && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase());
            if (typeof callback === 'function') {
                callback(user, isAdmin);
            }
        });
    }
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
                if (typeof window.refreshSyncModalTimesUI === 'function') {
                    window.refreshSyncModalTimesUI();
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
                if (typeof window.refreshSyncModalTimesUI === 'function') {
                    window.refreshSyncModalTimesUI();
                }
                if (typeof window.refreshSyncModalContentUI === 'function') {
                    window.refreshSyncModalContentUI();
                }
            }
            updateBadges();
        });

        // 4. Escuchar asignaciones de audios en tiempo real desde Cloud Firestore
        subscribeToCloudAssignments((cloudAssignments) => {
            console.log("☁️ Actualización de asignaciones recibida desde Cloud Firestore:", cloudAssignments);
            if (typeof localStorage !== 'undefined' && cloudAssignments) {
                const STORAGE_KEY = 'rosary_segmented_audio_assignments_v1';
                const raw = localStorage.getItem(STORAGE_KEY);
                const local = raw ? JSON.parse(raw) : {};
                for (const l in cloudAssignments) {
                    if (!local[l]) local[l] = {};
                    for (const m in cloudAssignments[l]) {
                        local[l][m] = Object.assign({}, local[l][m] || {}, cloudAssignments[l][m]);
                    }
                }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(local));

                if (typeof window.renderSyncItems === 'function' && typeof syncLangSelect !== 'undefined' && typeof syncMysterySelect !== 'undefined') {
                    const l = syncLangSelect ? syncLangSelect.value : 'es';
                    const m = syncMysterySelect ? syncMysterySelect.value : 'Gozosos';
                    window.renderSyncItems(l, m);
                }
            }
            updateBadges();
        });
    } catch (e) {
        console.warn("Error en sincronización inicial Firestore:", e);
    }
}

initCloudSync();
