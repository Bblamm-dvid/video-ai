import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Replace renderDriveFolders
old_render_drive_folders = '''  function renderDriveFolders() {
    if (!DOM.driveFolderPills) return;
    const folders = state.productFolders || [];

    DOM.driveFolderPills.innerHTML = folders.map(folder => `
      <button class="folder-pill ${folder.id === state.activeDriveFolderId ? 'active' : ''}" data-folder-id="${folder.id}">
        <span>${folder.id === 'folder_all' ? '🗂️' : '📁'}</span>
        <span>${folder.name}</span>
      </button>
    `).join('');

    DOM.driveFolderPills.querySelectorAll('.folder-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const folderId = pill.getAttribute('data-folder-id');
        state.activeDriveFolderId = folderId;
        renderDriveFolders();
        renderDriveFiles();
      });
    });
  }'''

new_render_drive_folders = '''  function renderDriveFolders() {
    if (!DOM.driveFolderPills) return;
    const folders = state.productFolders || [];

    DOM.driveFolderPills.innerHTML = folders.map(folder => `
      <button class="folder-pill-btn ${folder.id === state.activeDriveFolderId ? 'active' : ''}" data-folder-id="${folder.id}">
        ${ICONS.folder}
        <span>${folder.name}</span>
      </button>
    `).join('');

    DOM.driveFolderPills.querySelectorAll('.folder-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const folderId = pill.getAttribute('data-folder-id');
        state.activeDriveFolderId = folderId;
        renderDriveFolders();
        renderDriveFiles();
      });
    });
  }'''

code = code.replace(old_render_drive_folders, new_render_drive_folders, 1)

# 2. Replace renderProductFolderCards
old_render_product_folder_cards_part = '''            <div class="product-folder-usp-box">
              <div class="product-folder-usp-label">Đặc Điểm Nổi Bật (USP):</div>
              <div class="product-folder-usp-list">
                ${uspList.map(usp => `<span class="product-folder-usp-pill">✨ ${usp}</span>`).join('')}
              </div>
            </div>

            <div class="product-folder-footer">
              <span class="product-folder-meta">
                📁 ${files.length} tệp (${imgCount} ảnh, ${vidCount} video)
              </span>

              <div class="product-folder-actions">
                <button class="btn btn-primary btn-xs btn-open-folder" data-id="${folder.id}">
                  📂 Mở Thư Mục
                </button>
                <button class="btn btn-outline btn-xs btn-edit-folder-info" data-id="${folder.id}" title="Chỉnh sửa thông tin sản phẩm và USP">
                  ✏️ Sửa Thông Tin
                </button>
              </div>
            </div>'''

new_render_product_folder_cards_part = '''            <div class="product-folder-usp-box">
              <div class="product-folder-usp-label">Đặc Điểm Nổi Bật (USP):</div>
              <div class="product-folder-usp-list">
                ${uspList.map(usp => `<span class="product-folder-usp-pill">${ICONS.sparkle} ${usp}</span>`).join('')}
              </div>
            </div>

            <div class="product-folder-footer">
              <span class="product-folder-meta">
                ${ICONS.folder} ${files.length} tệp (${imgCount} ảnh, ${vidCount} video)
              </span>

              <div class="product-folder-actions">
                <button class="btn btn-primary btn-sm btn-open-folder" data-id="${folder.id}">
                  ${ICONS.external} Mở Thư Mục
                </button>
                <button class="btn btn-secondary btn-sm btn-edit-folder-info" data-id="${folder.id}" title="Chỉnh sửa thông tin sản phẩm và USP">
                  ${ICONS.edit} Sửa Thông Tin
                </button>
              </div>
            </div>'''

code = code.replace(old_render_product_folder_cards_part, new_render_product_folder_cards_part, 1)

# Also replace badge in product-folder-card
code = code.replace(
    '<span class="product-folder-badge">📁 THƯ MỤC SẢN PHẨM</span>',
    '<span class="product-folder-badge">THƯ MỤC SẢN PHẨM</span>'
)

# 3. Replace renderModelFolderPills and renderModelFolderCards
old_render_model_pills = '''  function renderModelFolderPills() {
    if (!DOM.modelFolderPills) return;
    const folders = state.modelFolders || [];

    DOM.modelFolderPills.innerHTML = folders.map(folder => `
      <button class="folder-pill ${folder.id === state.activeModelFolderId ? 'active' : ''}" data-model-id="${folder.id}">
        <span>${folder.id === 'model_all' ? '👥' : '👤'}</span>
        <span>${folder.name}</span>
      </button>
    `).join('');

    DOM.modelFolderPills.querySelectorAll('.folder-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const modelId = pill.getAttribute('data-model-id');
        state.activeModelFolderId = modelId;
        renderModelFolderPills();
        renderModelFolderView();
      });
    });
  }'''

new_render_model_pills = '''  function renderModelFolderPills() {
    if (!DOM.modelFolderPills) return;
    const folders = state.modelFolders || [];

    DOM.modelFolderPills.innerHTML = folders.map(folder => `
      <button class="folder-pill-btn ${folder.id === state.activeModelFolderId ? 'active' : ''}" data-model-id="${folder.id}">
        ${folder.id === 'model_all' ? ICONS.users : ICONS.user}
        <span>${folder.name}</span>
      </button>
    `).join('');

    DOM.modelFolderPills.querySelectorAll('.folder-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const modelId = pill.getAttribute('data-model-id');
        state.activeModelFolderId = modelId;
        renderModelFolderPills();
        renderModelFolderView();
      });
    });
  }'''

code = code.replace(old_render_model_pills, new_render_model_pills, 1)

old_render_model_cards_part = '''            <div class="model-folder-meta">
              📸 ${angles.length} ảnh góc chụp gương mặt
            </div>

            <div class="model-folder-footer">
              <div class="model-folder-actions">
                <button class="btn btn-primary btn-xs btn-open-model-folder" data-id="${m.id}">
                  📂 Mở Thư Mục
                </button>
                <button class="btn btn-outline btn-xs btn-rename-model-folder" data-id="${m.id}" title="Đổi tên thư mục model">
                  ✏️ Đổi Tên
                </button>
              </div>
            </div>'''

new_render_model_cards_part = '''            <div class="model-folder-meta">
              ${ICONS.camera} ${angles.length} ảnh góc chụp gương mặt
            </div>

            <div class="model-folder-footer">
              <div class="model-folder-actions">
                <button class="btn btn-primary btn-sm btn-open-model-folder" data-id="${m.id}">
                  ${ICONS.external} Mở Thư Mục
                </button>
                <button class="btn btn-secondary btn-sm btn-rename-model-folder" data-id="${m.id}" title="Đổi tên thư mục model">
                  ${ICONS.edit} Đổi Tên
                </button>
              </div>
            </div>'''

code = code.replace(old_render_model_cards_part, new_render_model_cards_part, 1)

code = code.replace(
    '<span class="model-folder-badge">📁 THƯ MỤC MODEL</span>',
    '<span class="model-folder-badge">THƯ MỤC MODEL</span>'
)

# 4. Replace renderScriptFolderPills & renderHookCategoryPills
old_render_script_pills = '''  function renderScriptFolderPills() {
    if (!DOM.scriptFolderPills) return;
    const groups = ['all', 'Nhóm Giáo Dục', 'Nhóm Giới Thiệu', 'Nhóm POV & Trending', 'Nhóm Trải Nghiệm & ASMR', 'Tải Lên Từ File'];

    DOM.scriptFolderPills.innerHTML = groups.map(grp => `
      <button class="folder-pill ${state.activeScriptFolder === grp ? 'active' : ''}" data-group="${grp}">
        ${grp === 'all' ? '🗂️ Tất Cả Kịch Bản' : '📁 ' + grp}
      </button>
    `).join('');'''

new_render_script_pills = '''  function renderScriptFolderPills() {
    if (!DOM.scriptFolderPills) return;
    const groups = ['all', 'Nhóm Giáo Dục', 'Nhóm Giới Thiệu', 'Nhóm POV & Trending', 'Nhóm Trải Nghiệm & ASMR', 'Tải Lên Từ File'];

    DOM.scriptFolderPills.innerHTML = groups.map(grp => `
      <button class="folder-pill-btn ${state.activeScriptFolder === grp ? 'active' : ''}" data-group="${grp}">
        ${ICONS.folder}
        <span>${grp === 'all' ? 'Tất Cả Kịch Bản' : grp}</span>
      </button>
    `).join('');'''

code = code.replace(old_render_script_pills, new_render_script_pills, 1)

# Hook category pills:
old_render_hook_pills = '''  function renderHookCategoryPills() {
    if (!DOM.hookCategoryPills) return;
    const types = ['all', 'Bóc Phốt / Cảnh Báo', 'Chuyên Gia Da Liễu', 'Visual Glass Skin', 'Hài Hước Gen Z', 'POV Trải Nghiệm', 'Khuyến Mãi / Săn Deal'];

    DOM.hookCategoryPills.innerHTML = types.map(t => `
      <button class="folder-pill ${state.activeHookType === t ? 'active' : ''}" data-type="${t}">
        ${t === 'all' ? '🔥 Tất Cả Hook' : '⚡ ' + t}
      </button>
    `).join('');'''

new_render_hook_pills = '''  function renderHookCategoryPills() {
    if (!DOM.hookCategoryPills) return;
    const types = ['all', 'Bóc Phốt / Cảnh Báo', 'Chuyên Gia Da Liễu', 'Visual Glass Skin', 'Hài Hước Gen Z', 'POV Trải Nghiệm', 'Khuyến Mãi / Săn Deal'];

    DOM.hookCategoryPills.innerHTML = types.map(t => `
      <button class="folder-pill-btn ${state.activeHookType === t ? 'active' : ''}" data-type="${t}">
        <span>${t === 'all' ? 'Tất Cả Hook' : t}</span>
      </button>
    `).join('');'''

code = code.replace(old_render_hook_pills, new_render_hook_pills, 1)

# 5. Overhaul setupImageToVideoPipeline for realistic render sequence (Item 5)
old_img2vid_generate = '''    // Generate Button Action
    if (DOM.btnRunImg2vid) {
      DOM.btnRunImg2vid.addEventListener('click', () => {
        const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : '';
        const folder = state.productFolders.find(f => f.id === folderId);
        const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
        const model = state.modelFolders.find(m => m.id === modelId);

        DOM.btnRunImg2vid.disabled = true;
        DOM.btnRunImg2vid.innerHTML = 'AI ĐANG DỰNG VIDEO CHUYỂN ĐỘNG 3D & FACE SWAP...';
        showToast(`Khởi động AI Engine: Kết hợp sản phẩm "${folder?.name || 'SKU'}" và model "${model?.name || 'Model'}" với bộ ảnh đa góc cạnh...`, 'info');

        setTimeout(() => {
          DOM.btnRunImg2vid.disabled = false;
          DOM.btnRunImg2vid.innerHTML = '<span>BẮT ĐẦU THỰC HIỆN DỰNG VIDEO</span> <span class="btn-arrow-icon">➔</span>';
          if (DOM.cstageEngineVideo) {
            DOM.cstageEngineVideo.src = 'media/video/final_final.mp4';
            DOM.cstageEngineVideo.play().catch(() => {});
          }
          showToast(`Video 3D hoàn chỉnh cùng người mẫu ${model?.name || 'đã chọn'} đã được tạo! Xem preview trực tiếp bên cạnh.`, 'success');
        }, 850);
      });
    }'''

new_img2vid_generate = '''    // Generate Button Action: Multi-step Realistic Rendering Simulation (Item 5)
    if (DOM.btnRunImg2vid) {
      DOM.btnRunImg2vid.addEventListener('click', () => {
        const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : '';
        const folder = state.productFolders.find(f => f.id === folderId);
        const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
        const model = state.modelFolders.find(m => m.id === modelId);

        DOM.btnRunImg2vid.disabled = true;

        // Hide video output initially if visible
        if (DOM.cstageEngineVideo) DOM.cstageEngineVideo.style.display = 'none';
        if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'none';
        if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'none';

        // Show render simulation overlay
        if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.add('active');

        const steps = [
          { percent: '22%', title: '1/4: Đang nạp ảnh sản phẩm & tách nền 3D...', sub: `Phân tích cấu trúc bao bì "${folder?.name || 'SKU'}" & tem phụ...` },
          { percent: '52%', title: '2/4: Đang kết nối kịch bản & câu hook viral 0-3s...', sub: 'Đồng bộ góc quay camera & timeline TikTok...' },
          { percent: '80%', title: '3/4: Đang sinh chuyển động 3D & biểu cảm model...', sub: `Khớp biểu cảm gương mặt model ${model?.name || ''} theo lời thoại...` },
          { percent: '96%', title: '4/4: Đang chèn tem phụ chính ngạch & lồng âm thanh...', sub: 'Render định dạng MP4 1080x1920 60FPS chuẩn Safe Zone...' },
          { percent: '100%', title: 'Hoàn tất render video AI!', sub: 'Đang tải video vào khung xem trước preview...' }
        ];

        let currentStep = 0;

        function advanceRenderStep() {
          if (currentStep < steps.length) {
            const s = steps[currentStep];
            if (DOM.renderProgressFill) DOM.renderProgressFill.style.width = s.percent;
            if (DOM.renderPercentTxt) DOM.renderPercentTxt.textContent = s.percent;
            if (DOM.renderStepTitle) DOM.renderStepTitle.textContent = s.title;
            if (DOM.renderStepSub) DOM.renderStepSub.textContent = s.sub;
            currentStep++;

            const delay = currentStep === 1 ? 500 : currentStep === 2 ? 600 : currentStep === 3 ? 700 : currentStep === 4 ? 500 : 350;
            setTimeout(advanceRenderStep, delay);
          } else {
            // Completed
            if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.remove('active');
            if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'none';

            if (DOM.cstageEngineVideo) {
              DOM.cstageEngineVideo.style.display = 'block';
              DOM.cstageEngineVideo.src = 'media/video/final_final.mp4';
              DOM.cstageEngineVideo.play().catch(() => {});
            }
            if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'block';
            if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'block';

            DOM.btnRunImg2vid.disabled = false;
            if (DOM.btnSaveImg2vidFinished) DOM.btnSaveImg2vidFinished.disabled = false;

            showToast(`Render hoàn tất! Video 3D của "${folder?.name || 'Sản phẩm'}" đã sẵn sàng xem trước.`, 'success');
          }
        }

        advanceRenderStep();
      });
    }'''

code = code.replace(old_img2vid_generate, new_img2vid_generate, 1)

# 6. Overhaul renderLivestreamStage for high contrast text (Item 6)
old_render_livestream = '''  function renderLivestreamStage() {
    if (!DOM.cstageLsClipsList || !data.livestreamSession) return;
    const clips = data.livestreamSession.goldenMoments || [];

    DOM.cstageLsClipsList.innerHTML = clips.map((clip, idx) => `
      <div class="livestream-clip-card ${idx === state.activeLsClipIndex ? 'selected' : ''}" data-index="${idx}" style="padding: 0.85rem; background: ${idx === state.activeLsClipIndex ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14,20,32,0.7)'}; border: 1px solid ${idx === state.activeLsClipIndex ? 'var(--cyan-ai)' : 'var(--border-subtle)'}; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <strong style="font-size: 0.88rem; color: #fff;">${clip.title}</strong>
          <span style="font-size: 0.72rem; color: var(--cyan-ai); font-family: var(--font-mono);">${clip.timestamp} (${clip.duration})</span>
        </div>
        <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 0.5rem; line-height: 1.35;">${clip.summary}</div>
        <div style="display: flex; justify-content: flex-end; align-items: center;">
          <button class="btn btn-outline btn-xs btn-preview-clip" data-index="${idx}">▶ Xem Preview Clip Này</button>
        </div>
      </div>
    `).join('');'''

new_render_livestream = '''  function renderLivestreamStage() {
    if (!DOM.cstageLsClipsList || !data.livestreamSession) return;
    const clips = data.livestreamSession.goldenMoments || [];

    DOM.cstageLsClipsList.innerHTML = clips.map((clip, idx) => {
      const isSelected = idx === state.activeLsClipIndex;
      return `
        <div class="livestream-clip-card ${isSelected ? 'selected' : ''}" data-index="${idx}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
            <strong class="livestream-clip-title" style="font-size: 0.95rem; font-weight: 700; color: var(--text-main);">${clip.title}</strong>
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--xcorp-blue-600); font-family: var(--font-mono);">${clip.timestamp} (${clip.duration})</span>
          </div>
          <div style="font-size: 0.84rem; color: var(--text-body); margin-bottom: 0.65rem; line-height: 1.45;">${clip.summary}</div>
          <div style="display: flex; justify-content: flex-end; align-items: center;">
            <button class="btn btn-secondary btn-sm btn-preview-clip" data-index="${idx}">
              ${ICONS.play} Xem Preview Clip Này
            </button>
          </div>
        </div>
      `;
    }).join('');'''

code = code.replace(old_render_livestream, new_render_livestream, 1)

# 7. Overhaul renderContentKitsStage for high contrast card, generous padding, and clean buttons (Item 9 - Screenshot 5)
old_render_content_kits = '''    DOM.cstageKitsGrid.innerHTML = kits.map((kit) => `
      <div class="content-kit-card" id="kit-card-${kit.id}">
        <div class="kit-card-thumb-wrap">
          <img src="${kit.thumb}" alt="${kit.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="badge-tag" style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.75); color: var(--cyan-ai); font-size: 0.68rem;">
            ${kit.sourceLabel || 'Video TikTok'}
          </span>
          <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono);">
            ${kit.duration || '24s'}
          </span>
        </div>

        <div style="padding: 0.6rem 0.2rem 0.2rem;">
          <h4 style="font-size: 0.88rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem; line-height: 1.35;">${kit.title}</h4>
          <div style="font-size: 0.72rem; color: var(--text-dim); margin-bottom: 0.35rem;">Sản phẩm: <strong style="color: #cbd5e1;">${kit.sku}</strong></div>
          <div style="font-size: 0.74rem; color: var(--text-muted); font-style: italic; margin-bottom: 0.7rem; border-left: 2px solid var(--rose-primary); padding-left: 6px;">
            "${kit.hook}"
          </div>

          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button class="btn btn-primary btn-xs btn-preview-kit" data-id="${kit.id}" style="flex: 1;">
              ▶ Xem Preview
            </button>
            <button class="btn btn-outline btn-xs btn-download-kit" data-id="${kit.id}">⬇ Tải MP4</button>
            <button class="btn btn-outline btn-xs btn-copy-caption-kit" data-id="${kit.id}">📋 Copy</button>
          </div>
        </div>
      </div>
    `).join('');'''

new_render_content_kits = '''    DOM.cstageKitsGrid.innerHTML = kits.map((kit) => `
      <div class="content-kit-card" id="kit-card-${kit.id}">
        <div class="kit-card-thumb-wrap">
          <img src="${kit.thumb}" alt="${kit.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="kit-source-badge">
            ${kit.sourceLabel || 'Video TikTok'}
          </span>
          <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-family: var(--font-mono);">
            ${kit.duration || '24s'}
          </span>
        </div>

        <div class="kit-card-body">
          <div class="kit-product-label">
            Sản phẩm: <strong class="kit-product-name">${kit.sku || 'Mỹ Nguyên TSC'}</strong>
          </div>
          <div class="kit-hook-quote">
            "${kit.hook || kit.title}"
          </div>

          <div class="kit-card-actions">
            <button class="btn btn-primary btn-sm btn-preview-kit" data-id="${kit.id}" style="flex: 1.2;">
              ${ICONS.play} Xem Preview
            </button>
            <button class="btn btn-secondary btn-sm btn-download-kit" data-id="${kit.id}">
              ${ICONS.download} Tải MP4
            </button>
            <button class="btn btn-secondary btn-sm btn-copy-caption-kit" data-id="${kit.id}">
              ${ICONS.copy} Copy
            </button>
          </div>
        </div>
      </div>
    `).join('');'''

code = code.replace(old_render_content_kits, new_render_content_kits, 1)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated app.js part 3 successfully!")
