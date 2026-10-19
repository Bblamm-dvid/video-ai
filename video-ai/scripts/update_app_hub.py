# -*- coding: utf-8 -*-
import sys

app_path = r"video-ai\prototype\app.js"
with open(app_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update accordionHeaders in setupSidebarNavigation
old_acc = """    const accordionHeaders = [
      { id: 'header-video-ai', group: 'accordion-video-ai' },
      { id: 'header-resource-vaults', group: 'accordion-resource-vaults' }
    ];"""

new_acc = """    const accordionHeaders = [
      { id: 'header-hub-projects', group: 'accordion-hub-projects' },
      { id: 'header-video-ai', group: 'accordion-video-ai' },
      { id: 'header-resource-vaults', group: 'accordion-resource-vaults' }
    ];"""

if old_acc in code:
    code = code.replace(old_acc, new_acc)
    print("Updated accordionHeaders in app.js")
else:
    print("Could not find old_acc")

# 2. Update initApp default panel and initialization
old_init_panel = """      // Switch to default panel
      switchPanel('panel-multi-engine');"""

new_init_panel = """      // Setup Studio Hub & Projects Hub (To-Be Architecture)
      setupHomeHubHandlers();
      renderHomeRecentProjects();
      setupProjectsHubHandlers();
      renderProjectsHub();

      // Switch to default panel: Studio Hub (Home Page)
      switchPanel('panel-home-hub');"""

if old_init_panel in code:
    code = code.replace(old_init_panel, new_init_panel)
    print("Updated initApp default panel to panel-home-hub")
else:
    print("Could not find old_init_panel")

# 3. Update postprod render redirection
old_render_redirect = """              // Điều hướng sang Kho Thành Phẩm
              switchPanel('panel-content-kits');
              showToast(`✓ Đã render hậu kỳ hoàn tất ${toRenderIndices.length} clip và lưu vào Kho Thành Phẩm!`, 'success');"""

new_render_redirect = """              // Điều hướng sang Quản Lý Dự Án (Projects Hub - Single Destination)
              if (window.renderProjectsHub) window.renderProjectsHub();
              switchPanel('panel-projects-hub');
              showToast(`✓ Đã render hậu kỳ hoàn tất ${toRenderIndices.length} clip và lưu vào Dự Án tương ứng!`, 'success');"""

if old_render_redirect in code:
    code = code.replace(old_render_redirect, new_render_redirect)
    print("Updated render redirection to panel-projects-hub")
else:
    print("Could not find old_render_redirect")

# 4. Append Implementation of Home Hub and Projects Hub
hub_implementation = '''
  /* ==========================================================================
     MODULE: STUDIO HUB & PROJECT-CENTRIC HUB (TO-BE ARCHITECTURE)
     Matching User Uploaded Image 1 (HeyGen Projects Layout) & Image 2 (Card)
     ========================================================================== */
  let currentProjectFolder = 'all';
  let currentProjectCoreCategory = 'all';
  let currentProjectSearch = '';
  let currentProjectStatus = 'all';
  let activeModalProject = null;

  function setupHomeHubHandlers() {
    // Launch Core 1: Livestream to Shorts
    const btnLaunchLive = document.getElementById('home-btn-launch-live');
    if (btnLaunchLive) {
      btnLaunchLive.addEventListener('click', () => {
        switchPanel('panel-livestream');
      });
    }

    // Launch Core 2: Image to Video
    const btnLaunchImg2Vid = document.getElementById('home-btn-launch-img2vid');
    if (btnLaunchImg2Vid) {
      btnLaunchImg2Vid.addEventListener('click', () => {
        switchPanel('panel-multi-engine');
      });
    }

    // Launch Core 3: Raw Video Editor
    const btnLaunchRaw = document.getElementById('home-btn-launch-raw');
    if (btnLaunchRaw) {
      btnLaunchRaw.addEventListener('click', () => {
        switchPanel('panel-raw-editor');
      });
    }

    // View All Projects button
    const btnViewAll = document.getElementById('home-btn-view-all-projects');
    if (btnViewAll) {
      btnViewAll.addEventListener('click', () => {
        switchPanel('panel-projects-hub');
      });
    }
  }

  function renderHomeRecentProjects() {
    const container = document.getElementById('home-recent-projects-grid');
    if (!container || !window.PROTOTYPE_VIDEO_PROJECTS) return;

    const recentProjects = window.PROTOTYPE_VIDEO_PROJECTS.slice(0, 3);
    container.innerHTML = recentProjects.map(p => createProjectCardHTML(p)).join('');
  }

  function setupProjectsHubHandlers() {
    // 1. Core Category Tabs (Matching Image 1: My Projects, Avatar Video, Agent...)
    const catTabs = document.querySelectorAll('#projects-core-category-tabs .project-cat-tab');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentProjectCoreCategory = tab.getAttribute('data-core-cat') || 'all';
        renderProjectsCards();
      });
    });

    // 2. Folder Navigation (Left Sub-sidebar)
    const folderAllBtn = document.getElementById('btn-folder-all');
    if (folderAllBtn) {
      folderAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.sub-sidebar-nav-item').forEach(el => el.classList.remove('active'));
        folderAllBtn.classList.add('active');
        currentProjectFolder = 'all';
        renderProjectsCards();
      });
    }

    // 3. Search & Filter
    const searchInput = document.getElementById('projects-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentProjectSearch = e.target.value.toLowerCase().trim();
        renderProjectsCards();
      });
    }

    const statusFilter = document.getElementById('projects-status-filter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        currentProjectStatus = e.target.value;
        renderProjectsCards();
      });
    }

    // 4. Create New Folder Trigger
    const btnNewFolder = document.getElementById('btn-trigger-new-folder-modal');
    const btnFolderShortcut = document.getElementById('btn-create-folder-shortcut');
    const handleNewFolder = () => {
      const folderName = prompt('Nhập tên thư mục dự án mới (ví dụ: FLASH SALE 11/11, CHIẾN DỊCH TẾT...):');
      if (folderName && folderName.trim()) {
        const newId = 'folder_' + Date.now();
        window.PROTOTYPE_PROJECT_FOLDERS.push({
          id: newId,
          name: folderName.trim(),
          count: 0
        });
        renderProjectFoldersTree();
        showToast(`Đã tạo thư mục [${folderName.trim()}]`, 'success');
      }
    };
    if (btnNewFolder) btnNewFolder.addEventListener('click', handleNewFolder);
    if (btnFolderShortcut) btnFolderShortcut.addEventListener('click', handleNewFolder);

    // 5. Create New Project button
    const btnCreateProj = document.getElementById('btn-projects-create-new');
    if (btnCreateProj) {
      btnCreateProj.addEventListener('click', () => {
        const choice = prompt('Chọn loại quy trình muốn tạo dự án:\\n1. Cắt Highlight Live (Ưu tiên)\\n2. Dựng Video Từ Ảnh Sản Phẩm\\n3. Chỉnh Sửa Video Gốc\\n(Nhập 1, 2 hoặc 3):', '1');
        if (choice === '1') {
          switchPanel('panel-livestream');
          showToast('Đã mở Studio Cắt Highlight Live để tạo dự án mới', 'info');
        } else if (choice === '2') {
          switchPanel('panel-multi-engine');
          showToast('Đã mở Studio Dựng Video Từ Ảnh', 'info');
        } else if (choice === '3') {
          switchPanel('panel-raw-editor');
          showToast('Đã mở Studio Chỉnh Sửa Video Gốc', 'info');
        }
      });
    }

    // 6. Modal Tab Switching in Project Detail
    const modalTabs = document.querySelectorAll('.project-modal-tab-btn');
    modalTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        modalTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-ptab');
        switchProjectModalTab(tabKey);
      });
    });

    // 7. Modal Open in Studio Button
    const btnModalOpen = document.getElementById('btn-modal-open-in-studio');
    if (btnModalOpen) {
      btnModalOpen.addEventListener('click', () => {
        closeModal('modal-project-detail');
        if (activeModalProject) {
          window.openProjectInStudio(activeModalProject.id);
        }
      });
    }
  }

  function renderProjectsHub() {
    renderProjectFoldersTree();
    renderProjectsCards();
    renderHomeRecentProjects();
  }
  window.renderProjectsHub = renderProjectsHub;

  function renderProjectFoldersTree() {
    const listEl = document.getElementById('project-folders-tree-list');
    if (!listEl || !window.PROTOTYPE_PROJECT_FOLDERS) return;

    // Skip the first "all" folder
    const customFolders = window.PROTOTYPE_PROJECT_FOLDERS.filter(f => f.id !== 'all');
    listEl.innerHTML = customFolders.map(folder => `
      <button class="sub-sidebar-nav-item ${currentProjectFolder === folder.id ? 'active' : ''}" data-folder-id="${folder.id}">
        <span class="sub-sidebar-nav-lead">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          </svg>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px;">${folder.name}</span>
        </span>
        <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">${folder.count}</span>
      </button>
    `).join('');

    // Attach click events
    listEl.querySelectorAll('.sub-sidebar-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.sub-sidebar-nav-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        currentProjectFolder = item.getAttribute('data-folder-id');
        renderProjectsCards();
      });
    });
  }

  function createProjectCardHTML(p) {
    const chipsHtml = (p.chips || []).map(chip => `
      <span class="project-chip-tag ${chip.icon === 'check' ? 'success-accent' : (chip.icon === 'live' ? 'primary-accent' : '')}">
        ${chip.label} · <strong>${chip.count}</strong>
      </span>
    `).join('');

    return `
      <div class="project-card-item" data-project-id="${p.id}">
        <!-- Poster Container (Matching Ảnh 1) -->
        <div class="project-card-poster-wrap" onclick="window.viewProjectDetails('${p.id}', 'finished')">
          <img src="${p.thumbnail}" alt="${p.name}" class="project-card-poster-img" />
          <span class="project-card-type-badge">${p.categoryLabel}</span>
          <span class="project-card-progress-pill ${p.statusCode === 'completed' ? 'completed' : ''}">
            ${p.status} ${p.progress ? `(${p.progress}%)` : ''}
          </span>
          <div class="project-card-play-hover-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span class="project-card-duration-badge">${p.duration}</span>
        </div>

        <!-- Card Body (Chuẩn 100% Theo Ảnh 2: TO-BE · ĐIỀU HƯỚNG THEO DỰ ÁN) -->
        <div class="project-card-body">
          <div class="project-card-title-row" onclick="window.viewProjectDetails('${p.id}', 'finished')" style="cursor: pointer;">
            <div class="project-card-title-left">
              <svg class="project-card-folder-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
              </svg>
              <span>${p.name}</span>
            </div>
            <svg class="project-card-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>

          <div class="project-card-status-line">
            Trạng thái: <strong>${p.status}</strong> · Cập nhật gần nhất: <strong>${p.updatedAt}</strong>
          </div>

          <!-- Chips Row (Ảnh 2: Livestream nguồn · 1 | Clip thô · 10 | Video thành phẩm · 4) -->
          <div class="project-card-chips-row">
            ${chipsHtml}
          </div>

          <div class="project-card-subtext">
            ${p.subtext || 'Mọi dữ liệu thuộc cùng một công việc nằm trong dự án, có trạng thái và quan hệ nguồn—đầu ra rõ ràng.'}
          </div>

          <!-- Action Buttons Footer -->
          <div class="project-card-footer-actions">
            <button class="btn-project-action-primary" onclick="window.openProjectInStudio('${p.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Mở Trong Studio</span>
            </button>
            <button class="btn-project-action-view" onclick="window.viewProjectDetails('${p.id}', 'finished')">
              <span>Xem Video Thành Phẩm (${p.finalVideos ? p.finalVideos.length : 0})</span>
            </button>
            ${p.rawClips && p.rawClips.length > 0 ? `
            <button class="btn-project-action-view" onclick="window.viewProjectDetails('${p.id}', 'raw')" title="Xem các clip thô đã cắt từ livestream này">
              <span>Clip Thô (${p.rawClips.length})</span>
            </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderProjectsCards() {
    const grid = document.getElementById('projects-list-grid');
    if (!grid || !window.PROTOTYPE_VIDEO_PROJECTS) return;

    let filtered = [...window.PROTOTYPE_VIDEO_PROJECTS];

    // Filter by Folder
    if (currentProjectFolder !== 'all') {
      filtered = filtered.filter(p => p.folderId === currentProjectFolder);
    }

    // Filter by Core Category (3 features)
    if (currentProjectCoreCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentProjectCoreCategory);
    }

    // Filter by Status
    if (currentProjectStatus !== 'all') {
      filtered = filtered.filter(p => p.statusCode === currentProjectStatus);
    }

    // Filter by Search Query
    if (currentProjectSearch) {
      filtered = filtered.filter(p => {
        const fullStr = `${p.name} ${p.categoryLabel} ${p.streamer || ''} ${p.folderName || ''}`.toLowerCase();
        return fullStr.includes(currentProjectSearch);
      });
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3.5rem 1rem; text-align: center; color: var(--text-muted);">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; opacity: 0.5;">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Không tìm thấy dự án phù hợp</div>
          <div style="font-size: 0.8rem;">Thử thay đổi bộ lọc hoặc bấm "+ Tạo Dự Án Mới" để bắt đầu quy trình làm video.</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => createProjectCardHTML(p)).join('');
  }

  // GLOBAL HELPER: OPEN PROJECT DIRECTLY IN STUDIO
  window.openProjectInStudio = function(projectId) {
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    if (proj.category === 'livestream') {
      switchPanel('panel-livestream');
      showToast(`Đã mở dự án [${proj.name}] trong Studio Cắt Highlight Live`, 'success');
    } else if (proj.category === 'image_to_video') {
      switchPanel('panel-multi-engine');
      showToast(`Đã mở dự án [${proj.name}] trong Studio Dựng Video Từ Ảnh`, 'success');
    } else if (proj.category === 'raw_edit') {
      switchPanel('panel-raw-editor');
      showToast(`Đã mở dự án [${proj.name}] trong Studio Chỉnh Sửa Video Gốc`, 'success');
    }
  };

  // GLOBAL HELPER: VIEW PROJECT DETAILS MODAL
  window.viewProjectDetails = function(projectId, defaultTab = 'finished') {
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    activeModalProject = proj;

    // Header info
    const titleEl = document.getElementById('modal-prj-title');
    const badgeEl = document.getElementById('modal-prj-type-badge');
    const statusLineEl = document.getElementById('modal-prj-status-line');
    const finishedCountEl = document.getElementById('modal-prj-finished-count');
    const rawCountEl = document.getElementById('modal-prj-raw-count');

    if (titleEl) titleEl.textContent = proj.name;
    if (badgeEl) {
      badgeEl.textContent = proj.categoryLabel;
      badgeEl.style.color = proj.categoryBadgeColor || 'var(--xcorp-blue-600)';
    }
    if (statusLineEl) {
      statusLineEl.textContent = `Thư mục: ${proj.folderName || 'Chung'} • Trạng thái: ${proj.status} • Cập nhật gần nhất: ${proj.updatedAt}`;
    }
    if (finishedCountEl) finishedCountEl.textContent = proj.finalVideos ? proj.finalVideos.length : 0;
    if (rawCountEl) rawCountEl.textContent = proj.rawClips ? proj.rawClips.length : 0;

    // Render Tab 1: Finished Videos
    renderModalFinishedVideos(proj.finalVideos || []);

    // Render Tab 2: Raw Clips
    renderModalRawClips(proj.rawClips || []);

    // Render Tab 3: Source Media
    renderModalSourceMedia(proj.sourceMedia);

    // Switch tab
    switchProjectModalTab(defaultTab);

    // Open Modal
    openModal('modal-project-detail');
  };

  function switchProjectModalTab(tabKey) {
    const btnFinished = document.getElementById('btn-ptab-finished');
    const btnRaw = document.getElementById('btn-ptab-raw');
    const btnSource = document.getElementById('btn-ptab-source');

    const contentFinished = document.getElementById('modal-ptab-content-finished');
    const contentRaw = document.getElementById('modal-ptab-content-raw');
    const contentSource = document.getElementById('modal-ptab-content-source');

    [btnFinished, btnRaw, btnSource].forEach(b => b && b.classList.remove('active'));
    [contentFinished, contentRaw, contentSource].forEach(c => c && (c.style.display = 'none'));

    if (tabKey === 'finished') {
      if (btnFinished) btnFinished.classList.add('active');
      if (contentFinished) contentFinished.style.display = 'block';
    } else if (tabKey === 'raw') {
      if (btnRaw) btnRaw.classList.add('active');
      if (contentRaw) contentRaw.style.display = 'block';
    } else if (tabKey === 'source') {
      if (btnSource) btnSource.classList.add('active');
      if (contentSource) contentSource.style.display = 'block';
    }
  }

  function renderModalFinishedVideos(videos) {
    const grid = document.getElementById('modal-prj-finished-grid');
    if (!grid) return;

    if (!videos || videos.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-muted);">
          Chưa có video thành phẩm nào được render cho dự án này.
        </div>
      `;
      return;
    }

    grid.innerHTML = videos.map(v => `
      <div class="project-modal-clip-card">
        <div class="project-modal-clip-thumb-wrap">
          <img src="${v.thumbnail}" alt="${v.title}" class="project-modal-clip-thumb-img" />
          <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.75); color: #fff; font-size: 0.68rem; font-family: var(--font-mono); padding: 2px 6px; border-radius: 4px; font-weight: 700;">
            ${v.duration}
          </span>
          ${v.qualityScore ? `
            <span style="position: absolute; top: 6px; left: 6px; background: rgba(16, 185, 129, 0.85); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
              AI Score: ${v.qualityScore}
            </span>
          ` : ''}
        </div>
        <div class="project-modal-clip-body">
          <div class="project-modal-clip-title">${v.title}</div>
          <div class="project-modal-clip-hook"><strong>Hook:</strong> ${v.hook}</div>
          <div class="project-modal-clip-actions">
            <button class="btn btn-outline btn-xs" style="flex: 1;" onclick="window.previewVideoModal('${v.videoUrl}', '${v.title}')">
              ▶ Phát Video
            </button>
            <button class="btn btn-secondary btn-xs" onclick="navigator.clipboard.writeText('${v.caption.replace(/'/g, "\\\\'")}'); showToast('Đã copy caption TikTok!', 'success');">
              📋 Copy Caption
            </button>
            <a href="${v.videoUrl}" download="${v.title}.mp4" class="btn btn-primary btn-xs" style="text-decoration: none;">
              ⬇ Tải MP4
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderModalRawClips(clips) {
    const grid = document.getElementById('modal-prj-raw-grid');
    if (!grid) return;

    if (!clips || clips.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-muted);">
          Dự án này không có clip thô trung gian (sản xuất trực tiếp từ kịch bản/ảnh).
        </div>
      `;
      return;
    }

    grid.innerHTML = clips.map(c => `
      <div class="project-modal-clip-card">
        <div style="padding: 0.85rem; background: var(--bg-surface-subtle); border-bottom: 1px solid var(--border-default); display: flex; justify-content: space-between; align-items: center;">
          <span class="badge-tag" style="font-size: 0.68rem; font-weight: 700;">${c.topic}</span>
          <span style="font-size: 0.72rem; color: var(--xcorp-blue-600); font-family: var(--font-mono); font-weight: 700;">${c.timeRange}</span>
        </div>
        <div class="project-modal-clip-body">
          <div class="project-modal-clip-title">${c.title}</div>
          <div class="project-modal-clip-hook" style="font-style: italic;">"${c.hookQuote}"</div>
          <div class="project-modal-clip-actions">
            <button class="btn btn-primary btn-xs" style="width: 100%;" onclick="closeModal('modal-project-detail'); switchPanel('panel-livestream'); showToast('Đã nạp clip thô vào Studio để tiếp tục hậu kỳ', 'info');">
              Tiếp Tục Hậu Kỳ Clip Này →
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderModalSourceMedia(source) {
    const box = document.getElementById('modal-prj-source-box');
    if (!box) return;

    if (!source) {
      box.innerHTML = '<div style="color: var(--text-muted);">Không có thông tin file nguồn.</div>';
      return;
    }

    box.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
        <div>
          <strong style="font-size: 0.95rem; color: var(--text-main); display: block;">${source.title}</strong>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">${source.filename}</span>
        </div>
        <span class="badge-tag" style="background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 700;">${source.asrStatus || 'Sẵn sàng'}</span>
      </div>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-body);">
        <div>Thời lượng: <strong>${source.duration}</strong></div>
        <div>Độ phân giải: <strong>${source.resolution}</strong></div>
        <div>Dung lượng: <strong>${source.size}</strong></div>
      </div>
    `;
  }

  window.previewVideoModal = function(videoUrl, title) {
    const player = document.getElementById('quick-video-player');
    const modal = document.getElementById('modal-quick-preview');
    const titleEl = document.getElementById('quick-preview-title');
    if (player && modal) {
      player.src = videoUrl;
      if (titleEl) titleEl.textContent = title;
      openModal('modal-quick-preview');
      player.play().catch(() => {});
    } else {
      window.open(videoUrl, '_blank');
    }
  };
'''

# Append before the closing tag of the main IIFE
old_iife_end = "})();"
if old_iife_end in code:
    code = code[:-len(old_iife_end)] + hub_implementation + "\n})();"
    print("Appended hub implementation to app.js")

with open(app_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Successfully updated app.js!")
