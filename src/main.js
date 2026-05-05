import { projectTemplates } from './logic/templates.js';

let currentTemplate = null;
let history = []; 
let collapsedFolders = new Set(); 
let currentParentPath = ''; // Hangi klasöre ekleme yapılıyor?

const elements = {
    btnScaffold: document.getElementById('btn-scaffold'),
    projectName: document.getElementById('project-name'),
    projectType: document.getElementById('project-type'),
    templateTree: document.getElementById('template-tree'),
    // Modal Elements
    modal: document.getElementById('modal-folder'),
    modalTitle: document.getElementById('modal-title'),
    modalParentText: document.getElementById('modal-parent-text'),
    modalInput: document.getElementById('input-new-folder'),
    btnModalAdd: document.getElementById('btn-modal-add'),
    btnModalCancel: document.getElementById('btn-modal-cancel'),
    btnUndo: document.getElementById('btn-undo'),
    btnReset: document.getElementById('btn-reset')
};

function saveHistory() {
    history.push(JSON.stringify(currentTemplate));
    if (history.length > 20) history.shift();
    updateToolbarButtons();
}

elements.projectType.addEventListener('change', () => {
    loadTemplate(elements.projectType.value);
});

function loadTemplate(type) {
    currentTemplate = JSON.parse(JSON.stringify(projectTemplates[type]));
    history = [];
    collapsedFolders = new Set(); 
    updateToolbarButtons();
    renderTree();
}

function getFullFolderList() {
    const allPaths = new Set();
    currentTemplate.folders.forEach(path => {
        const parts = path.split('/');
        let current = '';
        parts.forEach(part => {
            current = current ? `${current}/${part}` : part;
            allPaths.add(current);
        });
    });
    return Array.from(allPaths).sort();
}

function renderTree() {
    if (!currentTemplate) return;
    elements.templateTree.innerHTML = '';
    const fullFolders = getFullFolderList();

    fullFolders.forEach((folder) => {
        if (isParentCollapsed(folder)) return;
        const isCollapsed = collapsedFolders.has(folder);
        const depth = (folder.match(/\//g) || []).length;
        const arrow = isCollapsed ? '▶' : '▼';
        const icon = isCollapsed ? '📁' : '📂';
        
        const item = createTreeItem(folder, `${arrow} ${icon}`, depth, true);
        
        item.onclick = (e) => {
            if (!e.target.closest('button')) toggleFolder(folder);
        };
        elements.templateTree.appendChild(item);
    });

    currentTemplate.files.filter(f => !f.path.startsWith('.agents/')).forEach((file) => {
        if (isParentCollapsed(file.path)) return;
        const depth = (file.path.match(/\//g) || []).length;
        const item = createTreeItem(file.path, '   📄', depth, false);
        elements.templateTree.appendChild(item);
    });
}

function isParentCollapsed(path) {
    for (let collapsedPath of collapsedFolders) {
        if (path.startsWith(collapsedPath + '/') && path !== collapsedPath) return true;
    }
    return false;
}

function toggleFolder(path) {
    if (collapsedFolders.has(path)) collapsedFolders.delete(path);
    else collapsedFolders.add(path);
    renderTree();
}

function createTreeItem(label, icon, depth, isFolder) {
    const div = document.createElement('div');
    div.className = `tree-item ${isFolder ? 'folder-item clickable' : 'file-item'}`;
    div.style.paddingLeft = `${(depth * 20) + 12}px`;
    
    const shortLabel = label.split('/').pop();
    
    div.innerHTML = `
        <div class="tree-item-content">
            <span class="tree-icon">${icon}</span>
            <span class="tree-label" title="${label}">${shortLabel}</span>
        </div>
        <div class="tree-actions">
            ${isFolder ? `<button class="btn-add-inline" title="İçine Ekle">+</button>` : ''}
            <button class="btn-remove" title="Sil">×</button>
        </div>
    `;
    
    // Silme
    div.querySelector('.btn-remove').onclick = (e) => {
        e.stopPropagation();
        if (isFolder) removeFolder(label);
        else removeFile(label);
    };

    // Ekleme (Sadece Klasörler için)
    if (isFolder) {
        div.querySelector('.btn-add-inline').onclick = (e) => {
            e.stopPropagation();
            openAddModal(label);
        };
    }
    
    return div;
}

// ✨ MODAL YÖNETİMİ
function openAddModal(parentPath) {
    currentParentPath = parentPath;
    elements.modalTitle.textContent = "Yeni Öğe Ekle";
    elements.modalParentText.textContent = `Konum: ${parentPath}/`;
    elements.modalInput.value = '';
    elements.modal.classList.add('active');
    elements.modalInput.focus();
}

function closeModal() {
    elements.modal.classList.remove('active');
}

elements.btnModalCancel.onclick = closeModal;

elements.btnModalAdd.onclick = () => {
    const name = elements.modalInput.value.trim();
    if (!name) return;

    const type = document.querySelector('input[name="item-type"]:checked').value;
    const fullPath = `${currentParentPath}/${name}`;

    saveHistory();

    if (type === 'folder') {
        if (!currentTemplate.folders.includes(fullPath)) {
            currentTemplate.folders.push(fullPath);
        }
    } else {
        if (!currentTemplate.files.find(f => f.path === fullPath)) {
            currentTemplate.files.push({ path: fullPath, content: '' });
        }
    }

    renderTree();
    closeModal();
};

elements.modalInput.onkeypress = (e) => { if (e.key === 'Enter') elements.btnModalAdd.click(); };
elements.modal.onclick = (e) => { if (e.target === elements.modal) closeModal(); };

function removeFolder(path) {
    saveHistory();
    currentTemplate.folders = currentTemplate.folders.filter(f => !f.startsWith(path));
    currentTemplate.files = currentTemplate.files.filter(f => !f.path.startsWith(path));
    renderTree();
}

function removeFile(path) {
    saveHistory();
    currentTemplate.files = currentTemplate.files.filter(f => f.path !== path);
    renderTree();
}

elements.btnUndo.onclick = () => {
    if (history.length > 0) {
        currentTemplate = JSON.parse(history.pop());
        updateToolbarButtons();
        renderTree();
    }
};

elements.btnReset.onclick = () => {
    if (confirm("Sıfırlansın mı?")) loadTemplate(elements.projectType.value);
};

function updateToolbarButtons() {
    elements.btnUndo.disabled = history.length === 0;
}

elements.btnScaffold.onclick = async () => {
    const name = elements.projectName.value.trim();
    if (!name) return alert("Proje adı?");
    elements.btnScaffold.disabled = true;
    try {
        const response = await fetch('http://localhost:3001/scaffold', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, template: currentTemplate })
        });
        if (response.ok) alert("✅ İnşa edildi!");
        else throw new Error("Backend hatası");
    } catch (err) {
        alert("Hata: " + err.message);
    } finally {
        elements.btnScaffold.disabled = false;
    }
};

loadTemplate(elements.projectType.value);
