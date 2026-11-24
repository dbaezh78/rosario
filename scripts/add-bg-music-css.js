const fs = require('fs');

let css = fs.readFileSync('src/style.css', 'utf8');

const bgMusicStyles = `
/* ==========================================================================
   MÚSICA DE FONDO SAGRADA - ESTILOS DEL CONTROLADOR Y MODAL
   ========================================================================== */

/* Grupo de control en el reproductor inferior */
.bg-music-control-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid var(--border-gold-subtle);
    border-radius: 8px;
    padding: 3px 10px;
    margin-right: 8px;
    backdrop-filter: blur(8px);
}

.btn-ctrl.btn-bg-music {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    color: var(--gold-light);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 0.84rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.btn-ctrl.btn-bg-music:hover {
    background: rgba(212, 175, 55, 0.15);
    border-color: var(--gold-bright);
    color: #fff;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.25);
}

.bg-music-vol-slider-wrap {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.bg-music-vol-icon {
    font-size: 0.9rem;
    opacity: 0.85;
}

.bg-music-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 75px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    transition: background 0.2s;
}

.bg-music-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 13px;
    height: 13px;
    background: var(--gold-bright);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 6px rgba(212, 175, 55, 0.6);
    transition: transform 0.15s ease;
}

.bg-music-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

.bg-music-pct {
    font-size: 0.76rem;
    color: var(--gold-light);
    font-family: monospace;
    min-width: 30px;
    text-align: right;
}

/* Botón en el reproductor flotante superior */
.floating-btn-bg-music {
    background: rgba(15, 23, 42, 0.8);
    color: var(--gold-light);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.floating-btn-bg-music:hover {
    background: rgba(212, 175, 55, 0.2);
    color: #fff;
    border-color: var(--gold-bright);
}

/* Modal de Música de Fondo */
.bg-music-modal-window {
    max-width: 620px;
    width: 92%;
}

.bg-music-master-toggle-row {
    margin-bottom: 12px;
}

.bg-toggle-label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    user-select: none;
}

.bg-toggle-label input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.bg-toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    transition: background 0.25s ease;
    border: 1px solid var(--border-gold-subtle);
    flex-shrink: 0;
}

.bg-toggle-switch::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

.bg-toggle-label input[type="checkbox"]:checked + .bg-toggle-switch {
    background: linear-gradient(135deg, var(--gold-bright), #b8860b);
}

.bg-toggle-label input[type="checkbox"]:checked + .bg-toggle-switch::after {
    transform: translateX(20px);
}

.bg-toggle-title {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
}

.bg-music-liturgical-rule-box {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    background: rgba(212, 175, 55, 0.08);
    border-left: 3px solid var(--gold-bright);
    padding: 10px 14px;
    border-radius: 0 8px 8px 0;
    margin: 12px 0 16px;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--text-light);
}

.bg-music-liturgical-rule-box .rule-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    margin-top: 1px;
}

.bg-modal-vol-control-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
}

.bg-modal-vol-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
}

.bg-vol-val-pill {
    background: rgba(212, 175, 55, 0.15);
    color: var(--gold-bright);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.82rem;
    font-family: monospace;
    font-weight: bold;
    border: 1px solid rgba(212, 175, 55, 0.3);
}

.bg-music-modal-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
}

.bg-music-modal-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: var(--gold-bright);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.7);
    transition: transform 0.15s ease;
}

.bg-music-modal-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

/* Lista de pistas disponibles */
.bg-tracks-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 6px;
}

.bg-single-track-badge {
    font-size: 0.75rem;
    padding: 3px 8px;
    border-radius: 10px;
    background: rgba(59, 130, 246, 0.15);
    color: #93c5fd;
    border: 1px solid rgba(59, 130, 246, 0.3);
}

.bg-music-tracks-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 240px;
    overflow-y: auto;
    padding-right: 4px;
    margin-top: 10px;
}

.bg-track-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-gold-subtle);
    border-radius: 8px;
    padding: 10px 14px;
    transition: all 0.2s ease;
}

.bg-track-item:hover {
    background: rgba(212, 175, 55, 0.06);
    border-color: rgba(212, 175, 55, 0.4);
}

.bg-track-item.active {
    background: rgba(212, 175, 55, 0.12);
    border-color: var(--gold-bright);
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.18);
}

.bg-track-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.bg-track-radio-label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.bg-track-radio-label input[type="radio"] {
    cursor: pointer;
    accent-color: var(--gold-bright);
    width: 18px;
    height: 18px;
}

.bg-track-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.bg-track-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.bg-track-name {
    font-weight: 600;
    color: #fff;
    font-size: 0.92rem;
}

.bg-system-pill {
    font-size: 0.7rem;
    padding: 2px 7px;
    border-radius: 10px;
    background: rgba(212, 175, 55, 0.2);
    color: var(--gold-bright);
    border: 1px solid rgba(212, 175, 55, 0.35);
    font-weight: 600;
}

.bg-user-pill {
    font-size: 0.7rem;
    padding: 2px 7px;
    border-radius: 10px;
    background: rgba(34, 197, 94, 0.18);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.35);
    font-weight: 600;
}

.bg-track-filename {
    font-size: 0.75rem;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bg-track-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.btn-preview-bg-track {
    background: rgba(212, 175, 55, 0.15);
    color: var(--gold-light);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-preview-bg-track:hover {
    background: var(--gold-bright);
    color: #000;
}

.btn-delete-bg-track {
    background: rgba(239, 68, 68, 0.12);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-delete-bg-track:hover {
    background: rgba(239, 68, 68, 0.3);
    border-color: #ef4444;
}

/* Dropzone de subida */
.bg-upload-dropzone {
    display: flex;
    align-items: center;
    gap: 16px;
    border: 2px dashed rgba(212, 175, 55, 0.35);
    border-radius: 10px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.02);
    cursor: pointer;
    transition: all 0.25s ease;
    margin-top: 10px;
}

.bg-upload-dropzone:hover,
.bg-upload-dropzone.dragover {
    border-color: var(--gold-bright);
    background: rgba(212, 175, 55, 0.08);
}

.bg-upload-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.bg-upload-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.bg-upload-main {
    font-weight: 600;
    color: #fff;
    font-size: 0.92rem;
}

.bg-upload-sub {
    font-size: 0.78rem;
    color: var(--text-secondary);
}
`;

if (!css.includes('MÚSICA DE FONDO SAGRADA')) {
    css += '\n' + bgMusicStyles;
    fs.writeFileSync('src/style.css', css, 'utf8');
    console.log('Background Music CSS appended successfully to src/style.css!');
} else {
    console.log('Background Music CSS already present.');
}
