const fs = require('fs');

// 1. Corregir index.html: mover user-profile-modal antes de los scripts
let html = fs.readFileSync('index.html', 'utf8');

const modalStartTag = '<!-- Modal de Perfil de Usuario y Ajustes Visuales / Temas -->';
const modalEndTag = '</body>';

const modalStartIndex = html.indexOf(modalStartTag);
const modalEndIndex = html.lastIndexOf('</div>\n</body>');

if (modalStartIndex !== -1 && modalEndIndex !== -1) {
    const modalContent = html.substring(modalStartIndex, modalEndIndex + 6);
    html = html.replace(modalContent, '');

    // Insertar antes de <!-- Elemento Audio Oculto -->
    const targetAnchor = '<!-- Elemento Audio Oculto -->';
    html = html.replace(targetAnchor, modalContent + '\n\n    ' + targetAnchor);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('1. user-profile-modal moved before <script> tags in index.html.');
} else {
    console.log('1. user-profile-modal already moved or tags not found.');
}

// 2. Corregir src/style.css: z-index de .rosary-toast para que flote sobre cualquier modal
let css = fs.readFileSync('src/style.css', 'utf8');
css = css.replace(
    /\.rosary-toast\s*\{([^}]+)\}/,
    (match, inner) => {
        if (!inner.includes('z-index')) {
            return `.rosary-toast {\n    z-index: 999999;${inner}}`;
        } else {
            return match.replace(/z-index:\s*\d+;/, 'z-index: 999999;');
        }
    }
);
fs.writeFileSync('src/style.css', css, 'utf8');
console.log('2. rosary-toast z-index set to 999999 in src/style.css.');

// 3. Corregir src/script.js: Selectores robustos para el modal de perfil y mensajes en el modal de sincronización
let js = fs.readFileSync('src/script.js', 'utf8');

// En btnSyncSave: mostrar mensaje en syncStatusMsg además de toast
const syncSaveOld = `if (btnSyncSave) {
    btnSyncSave.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            showRosaryToast('🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede guardar cambios en la configuración oficial.');
            return;
        }`;

const syncSaveNew = `if (btnSyncSave) {
    btnSyncSave.addEventListener('click', () => {
        if (document.body.classList.contains('user-readonly-mode')) {
            const msg = '🔒 Modo Solo Lectura: Solo el administrador (dbaezh78@gmail.com) puede guardar cambios en la configuración oficial.';
            showRosaryToast(msg);
            if (syncStatusMsg) {
                syncStatusMsg.innerHTML = '<span style="color: #f87171; font-weight: bold;">' + msg + '</span>';
            }
            return;
        }`;

if (js.includes(syncSaveOld)) {
    js = js.replace(syncSaveOld, syncSaveNew);
    console.log('3. btnSyncSave updated with syncStatusMsg.');
}

// En setupAuthAndPermissions: consultar elementos en tiempo de ejecución de forma dinámica
const authSetupOld = `function setupAuthAndPermissions() {
    if (btnAuthProfile && userProfileModal) {
        btnAuthProfile.addEventListener('click', () => {
            userProfileModal.classList.add('open');
        });
    }

    const closeProfileModal = () => {
        if (userProfileModal) userProfileModal.classList.remove('open');
    };

    if (userProfileModalClose) userProfileModalClose.addEventListener('click', closeProfileModal);
    if (btnProfileClose) btnProfileClose.addEventListener('click', closeProfileModal);`;

const authSetupNew = `function setupAuthAndPermissions() {
    const getModal = () => document.getElementById('user-profile-modal');
    const getBtnProfile = () => document.getElementById('btn-auth-profile');
    const getCloseBtn = () => document.getElementById('profile-modal-close') || document.getElementById('user-profile-modal-close');
    const getDoneBtn = () => document.getElementById('btn-profile-close');

    const btn = getBtnProfile();
    if (btn) {
        btn.addEventListener('click', () => {
            const m = getModal();
            if (m) {
                m.classList.add('open');
            }
        });
    }

    const closeProfileModal = () => {
        const m = getModal();
        if (m) m.classList.remove('open');
    };

    const cBtn = getCloseBtn();
    if (cBtn) cBtn.addEventListener('click', closeProfileModal);
    const dBtn = getDoneBtn();
    if (dBtn) dBtn.addEventListener('click', closeProfileModal);`;

if (js.includes(authSetupOld)) {
    js = js.replace(authSetupOld, authSetupNew);
    console.log('4. setupAuthAndPermissions updated with dynamic queries.');
}

// En handleAuthStateChange: actualizar selectores para que coincidan con ambos nombres de ID
const handleAuthOld = `function handleAuthStateChange(user) {
    const isAdmin = window.RosaryAuth ? window.RosaryAuth.checkIsAdmin(user) : false;

    if (user && isAdmin) {
        document.body.classList.remove('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Admin';
        if (authAvatarIcon) authAvatarIcon.innerText = '👑';
        if (authUserEmail) authUserEmail.innerText = user.email || 'dbaezh78@gmail.com';
        if (authRoleBadge) {
            authRoleBadge.innerText = '👑 Administrador (Control Total)';
            authRoleBadge.className = 'auth-role-badge admin';
        }
        if (btnGoogleSignin) btnGoogleSignin.style.display = 'none';
        if (btnGoogleSignout) btnGoogleSignout.style.display = 'inline-block';
        showRosaryToast('👑 Administrador verificado (' + (user.email || 'dbaezh78@gmail.com') + '). Control total activado.');
    } else if (user) {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Visitante';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (authUserEmail) authUserEmail.innerText = user.email;
        if (authRoleBadge) {
            authRoleBadge.innerText = '👁️ Visitante (Solo Lectura)';
            authRoleBadge.className = 'auth-role-badge guest';
        }
        if (btnGoogleSignin) btnGoogleSignin.style.display = 'none';
        if (btnGoogleSignout) btnGoogleSignout.style.display = 'inline-block';
    } else {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Acceder';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (authUserEmail) authUserEmail.innerText = 'Modo Visitante (Solo Lectura)';
        if (authRoleBadge) {
            authRoleBadge.innerText = '👁️ Solo Lectura';
            authRoleBadge.className = 'auth-role-badge guest';
        }
        if (btnGoogleSignin) btnGoogleSignin.style.display = 'inline-flex';
        if (btnGoogleSignout) btnGoogleSignout.style.display = 'none';
    }
}`;

const handleAuthNew = `function handleAuthStateChange(user) {
    const isAdmin = window.RosaryAuth ? window.RosaryAuth.checkIsAdmin(user) : false;

    const emailEl = document.getElementById('auth-modal-email') || document.getElementById('auth-user-email');
    const badgeEl = document.getElementById('auth-modal-badge') || document.getElementById('auth-role-badge');
    const nameEl = document.getElementById('auth-modal-name');
    const signinBtn = document.getElementById('btn-google-signin');
    const signoutBtn = document.getElementById('btn-google-signout');

    if (user && isAdmin) {
        document.body.classList.remove('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Admin';
        if (authAvatarIcon) authAvatarIcon.innerText = '👑';
        if (nameEl) nameEl.innerText = user.displayName || 'dbaezh78@gmail.com';
        if (emailEl) emailEl.innerText = user.email || 'dbaezh78@gmail.com';
        if (badgeEl) {
            badgeEl.innerText = '👑 Administrador (Control Total)';
            badgeEl.className = 'auth-modal-badge admin';
        }
        if (signinBtn) signinBtn.style.display = 'none';
        if (signoutBtn) signoutBtn.style.display = 'inline-block';
        showRosaryToast('👑 Administrador verificado (' + (user.email || 'dbaezh78@gmail.com') + '). Control total activado.');
    } else if (user) {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Visitante';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (nameEl) nameEl.innerText = user.displayName || 'Visitante';
        if (emailEl) emailEl.innerText = user.email;
        if (badgeEl) {
            badgeEl.innerText = '👁️ Visitante (Solo Lectura)';
            badgeEl.className = 'auth-modal-badge visitor';
        }
        if (signinBtn) signinBtn.style.display = 'none';
        if (signoutBtn) signoutBtn.style.display = 'inline-block';
    } else {
        document.body.classList.add('user-readonly-mode');
        if (authUserLabel) authUserLabel.innerText = 'Acceder';
        if (authAvatarIcon) authAvatarIcon.innerText = '👤';
        if (nameEl) nameEl.innerText = 'Visitante';
        if (emailEl) emailEl.innerText = 'Modo lectura (Puedes orar y escuchar libremente)';
        if (badgeEl) {
            badgeEl.innerText = '👁️ Solo Lectura';
            badgeEl.className = 'auth-modal-badge visitor';
        }
        if (signinBtn) signinBtn.style.display = 'inline-flex';
        if (signoutBtn) signoutBtn.style.display = 'none';
    }
}`;

if (js.includes(handleAuthOld)) {
    js = js.replace(handleAuthOld, handleAuthNew);
    console.log('5. handleAuthStateChange updated with dual ID support.');
}

fs.writeFileSync('src/script.js', js, 'utf8');
console.log('All fixes applied successfully!');
