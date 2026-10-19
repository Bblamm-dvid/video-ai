import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update ROLES with realistic Video AI SaaS Studio roles (Item 1)
old_roles = '''  const ROLES = [
    {
      id: 'hung_nv',
      name: 'Nguyễn Văn Hùng',
      title: 'Chỉ huy trưởng Công trường',
      fullTitle: 'Quản trị viên / Chỉ huy trưởng Studio',
      badge: 'Chỉ huy trưởng Công trường',
      unit: 'Ban Chỉ huy Kênh Mỹ Nguyên TSC',
      avatarClass: 'avatar-orange',
      initials: 'VH',
      credits: '1,250 Credits'
    },
    {
      id: 'bao_pq',
      name: 'Phạm Quốc Bảo',
      title: 'Trưởng ban An toàn HSE',
      fullTitle: 'Trưởng ban Kịch bản & Content Marketing',
      badge: 'Trưởng ban An toàn HSE',
      unit: 'Ban Kịch bản & Viral Hooks TikTok',
      avatarClass: 'avatar-red',
      initials: 'PB',
      credits: '820 Credits'
    },
    {
      id: 'duc_tm',
      name: 'Trần Minh Đức',
      title: 'Cán bộ HSE Hiện trường',
      fullTitle: 'Chuyên viên Biên tập Video AI',
      badge: 'Cán bộ HSE Hiện trường',
      unit: 'Tổ Vận hành AI Engine & Livestream Cuts',
      avatarClass: 'avatar-blue',
      initials: 'MĐ',
      credits: '650 Credits'
    },
    {
      id: 'long_lh',
      name: 'Lê Hoàng Long',
      title: 'Chỉ huy Đội Coffa & Cốt thép',
      fullTitle: 'Quản lý Kênh TikTok Shop & Ads',
      badge: 'Chỉ huy Đội Kênh',
      unit: 'Bộ phận Tăng trưởng GTM TikTok Shop',
      avatarClass: 'avatar-purple',
      initials: 'HL',
      credits: '1,500 Credits'
    },
    {
      id: 'bgd_incons',
      name: 'Ban Giám Đốc INCONS',
      title: 'Lãnh đạo Ban Điều Hành',
      fullTitle: 'Ban Giám Đốc Xcorp (Lãnh đạo Điều Hành)',
      badge: 'Lãnh đạo Ban Điều Hành',
      unit: 'Hội đồng Quản trị & Điều hành Hệ sinh thái',
      avatarClass: 'avatar-green',
      initials: 'BĐH',
      credits: 'Không giới hạn'
    }
  ];'''

new_roles = '''  const ROLES = [
    {
      id: 'hung_nv',
      name: 'Nguyễn Văn Hùng',
      title: 'Quản lý Kênh & Vận Hành Studio',
      fullTitle: 'Trưởng Nhóm Sản Xuất & Điều Hành Studio',
      badge: 'Quản lý Studio',
      unit: 'Ban Quản Lý & Điều Hành Studio Mỹ Nguyên',
      avatarClass: 'avatar-orange',
      initials: 'VH'
    },
    {
      id: 'bao_pq',
      name: 'Phạm Quốc Bảo',
      title: 'Trưởng Nhóm Content & Kịch Bản AI',
      fullTitle: 'Trưởng Nhóm Nội Dung & Viral Hooks TikTok',
      badge: 'Trưởng Nhóm Content',
      unit: 'Team Marketing & Kịch Bản Sáng Tạo',
      avatarClass: 'avatar-red',
      initials: 'PB'
    },
    {
      id: 'duc_tm',
      name: 'Trần Minh Đức',
      title: 'Chuyên Viên Dựng & Biên Tập Video',
      fullTitle: 'Chuyên Viên AI Render & Livestream Cuts',
      badge: 'Chuyên Viên Media',
      unit: 'Team Media & Kỹ Thuật Dựng Video',
      avatarClass: 'avatar-blue',
      initials: 'MĐ'
    },
    {
      id: 'long_lh',
      name: 'Lê Hoàng Long',
      title: 'Quản Trị Kênh TikTok Shop & Ads',
      fullTitle: 'Quản Lý Doanh Số TikTok Shop & Chiến Dịch Ads',
      badge: 'Quản Trị Kênh',
      unit: 'Team Tăng Trưởng E-commerce & GTM',
      avatarClass: 'avatar-purple',
      initials: 'HL'
    },
    {
      id: 'bgd_incons',
      name: 'Ban Giám Đốc Xcorp',
      title: 'Lãnh Đạo & Quản Trị Chiến Lược',
      fullTitle: 'Ban Lãnh Đạo Điều Hành Hệ Sinh Thái',
      badge: 'Ban Giám Đốc',
      unit: 'Hội Đồng Quản Trị & Ban Điều Hành',
      avatarClass: 'avatar-green',
      initials: 'BĐH'
    }
  ];'''

code = code.replace(old_roles, new_roles, 1)

# 2. Update updateLoginSubmitLabel (Item 1)
code = code.replace(
    'DOM.btnLoginPortalLabel.textContent = `Vào Command Center với vai trò ${role.title}`;',
    'DOM.btnLoginPortalLabel.textContent = `Vào Studio với vai trò ${role.title}`;'
)

# 3. In updateUserProfileDisplays, remove credits update since quota pill is removed (Item 4)
old_profile_display = '''    // Update quota badge
    const quotaBadge = document.getElementById('topbar-quota-badge');
    if (quotaBadge && role.credits) {
      quotaBadge.innerHTML = `<span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/></svg></span> <span>${role.credits}</span>`;
    }'''

code = code.replace(old_profile_display, '// Quota credits badge removed as per todo12')

# 4. Item 2: Fix renderPackshotsForSelectedFolder image loading and add fallback
old_packshot_render = '''    DOM.enginePackshotSelector.innerHTML = displayFiles.map((file, idx) => `
      <div class="packshot-select-thumb ${idx === 0 ? 'selected' : ''}" data-img="${file.thumb}" data-title="${file.name}">
        <img src="${file.thumb}" alt="${file.name}">
      </div>
    `).join('');'''

new_packshot_render = '''    DOM.enginePackshotSelector.innerHTML = displayFiles.map((file, idx) => `
      <div class="packshot-select-thumb ${idx === 0 ? 'selected' : ''}" data-img="${file.thumb}" data-title="${file.name}" title="${file.name}">
        <img src="${file.thumb}" alt="${file.name}" onerror="this.onerror=null; this.src='media/image/farmstay_retinol_box.jpg';">
      </div>
    `).join('');'''

code = code.replace(old_packshot_render, new_packshot_render, 1)

# 5. Item 7: Shorten button text from "Sửa Thông Tin" to just "Sửa" in renderProductFolderCards
code = code.replace(
    '${ICONS.edit} Sửa Thông Tin',
    '${ICONS.edit} Sửa'
)

# 6. Item 6: Redesign renderLivestreamStage clips list for clean row layout, single-line timestamp
old_render_livestream = '''  function renderLivestreamStage() {
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
    }).join('');

    DOM.cstageLsClipsList.querySelectorAll('.btn-preview-clip, .livestream-clip-card').forEach(el => {
      el.addEventListener('click', (e) => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        state.activeLsClipIndex = index;
        const clip = clips[index];
        if (clip && DOM.cstageLsVideo) {
          DOM.cstageLsVideo.src = clip.videoSrc || 'media/video/final_final.mp4';
          DOM.cstageLsVideo.play().catch(() => {});
          if (DOM.cstageCaptionSnip) DOM.cstageCaptionSnip.textContent = clip.caption || clip.recommendedHook;
          renderLivestreamStage();
          showToast(`Đang phát preview đoạn: ${clip.title}`, 'info');
        }
      });
    });
  }'''

new_render_livestream = '''  function renderLivestreamStage() {
    if (!DOM.cstageLsClipsList || !data.livestreamSession) return;
    const clips = data.livestreamSession.goldenMoments || [];

    DOM.cstageLsClipsList.innerHTML = clips.map((clip, idx) => {
      const isSelected = idx === state.activeLsClipIndex;
      return `
        <div class="livestream-clip-card ${isSelected ? 'selected' : ''}" data-index="${idx}">
          <div class="clip-card-header">
            <div class="clip-title-group">
              <span class="clip-idx-badge">0${idx + 1}</span>
              <strong class="livestream-clip-title">${clip.title}</strong>
            </div>
            <span class="clip-time-badge">${clip.timestamp} • ${clip.duration}</span>
          </div>
          <div class="clip-summary-text">${clip.summary}</div>
          <div class="clip-actions-row">
            <span class="clip-hook-tag">Gợi ý Hook: "${clip.recommendedHook || clip.title}"</span>
            <button class="btn btn-secondary btn-sm btn-preview-clip" data-index="${idx}">
              ${ICONS.play} Xem Preview
            </button>
          </div>
        </div>
      `;
    }).join('');

    DOM.cstageLsClipsList.querySelectorAll('.btn-preview-clip, .livestream-clip-card').forEach(el => {
      el.addEventListener('click', (e) => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        state.activeLsClipIndex = index;
        const clip = clips[index];
        if (clip && DOM.cstageLsVideo) {
          DOM.cstageLsVideo.src = clip.videoSrc || 'media/video/final_final.mp4';
          DOM.cstageLsVideo.play().catch(() => {});
          if (DOM.cstageCaptionSnip) DOM.cstageCaptionSnip.textContent = clip.caption || clip.recommendedHook;
          renderLivestreamStage();
          showToast(`Đang phát preview: ${clip.title}`, 'info');
        }
      });
    });
  }'''

code = code.replace(old_render_livestream, new_render_livestream, 1)

# 7. Item 8: Complete Script Vault UI in renderScriptsVault
old_render_scripts_vault = '''  function renderScriptsVault() {
    if (!DOM.cstageScriptsContainer) return;
    const grp = state.activeScriptFolder;
    let scripts = state.scripts || [];

    if (grp && grp !== 'all') {
      scripts = scripts.filter(s => s.group === grp);
    }

    if (scripts.length === 0) {
      DOM.cstageScriptsContainer.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 8px;">
          Không có kịch bản nào trong nhóm này.
        </div>
      `;
      return;
    }

    DOM.cstageScriptsContainer.innerHTML = scripts.map(script => `
      <div class="script-compact-row" id="script-row-${script.id}" data-id="${script.id}">
        <div class="script-row-main">
          <div class="script-row-title-line">
            <span class="script-row-title">${script.title}</span>
            <span class="script-row-group-badge">${script.group || 'Kịch Bản'}</span>
          </div>
          <div class="script-row-hook">
            🎯 Hook: "${script.scenes && script.scenes[0] ? script.scenes[0].hook : (script.hook || '')}"
          </div>
          <div class="script-row-meta">
            <span>👤 ${script.targetAudience || 'Khách hàng mục tiêu'}</span>
            <span>⏱️ ${script.totalDurationSeconds || 24}s</span>
            <span>🎬 ${(script.scenes || []).length} Phân cảnh</span>
          </div>
        </div>
        <div class="script-row-actions">
          <button class="btn btn-primary btn-xs btn-view-script" data-id="${script.id}">Xem Chi Tiết</button>
          <button class="btn btn-secondary btn-sm btn-edit-script" data-id="${script.id}">${ICONS.edit} Sửa</button>
        </div>
      </div>
    `).join('');'''

new_render_scripts_vault = '''  function renderScriptsVault() {
    if (!DOM.cstageScriptsContainer) return;
    const grp = state.activeScriptFolder;
    let scripts = state.scripts || [];

    if (grp && grp !== 'all') {
      scripts = scripts.filter(s => s.group === grp);
    }

    if (scripts.length === 0) {
      DOM.cstageScriptsContainer.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 10px;">
          Không có kịch bản nào trong nhóm này. Hãy bấm "+ Viết Kịch Bản" hoặc "AI Tạo Kịch Bản".
        </div>
      `;
      return;
    }

    DOM.cstageScriptsContainer.innerHTML = scripts.map(script => {
      const hookText = (script.scenes && script.scenes[0] ? script.scenes[0].hook : (script.hook || ''));
      const sceneCount = (script.scenes || []).length;
      return `
        <div class="script-card-item" id="script-row-${script.id}" data-id="${script.id}">
          <div class="script-card-top">
            <div class="script-card-title-col">
              <span class="script-badge-group">${script.group || 'Kịch Bản TikTok'}</span>
              <h3 class="script-card-title">${script.title}</h3>
            </div>
            <div class="script-card-specs">
              <span class="spec-pill">${script.totalDurationSeconds || 24}s</span>
              <span class="spec-pill">${sceneCount} phân cảnh</span>
            </div>
          </div>

          <div class="script-card-hook-box">
            <span class="hook-label">Hook Mở Đầu (0-3s):</span>
            <div class="hook-content">"${hookText}"</div>
          </div>

          <div class="script-card-footer">
            <div class="script-audience-tag">
              ${ICONS.user}
              <span>${script.targetAudience || 'Khách hàng mục tiêu TikTok'}</span>
            </div>
            <div class="script-card-actions">
              <button class="btn btn-primary btn-sm btn-view-script" data-id="${script.id}">
                ${ICONS.external} Chi Tiết
              </button>
              <button class="btn btn-secondary btn-sm btn-edit-script" data-id="${script.id}">
                ${ICONS.edit} Sửa
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');'''

code = code.replace(old_render_scripts_vault, new_render_scripts_vault, 1)

# 8. Item 9: Declutter icons in Hook Vault
old_render_hooks_vault = '''  function renderHooksVault() {
    if (!DOM.cstageHooksGrid) return;
    const type = state.activeHookType;
    let hooks = state.hooks || [];

    if (type && type !== 'all') {
      hooks = hooks.filter(h => h.type === type);
    }

    if (hooks.length === 0) {
      DOM.cstageHooksGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 2.5rem; text-align: center; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 8px;">
          Chưa có câu hook nào thuộc nhóm này.
        </div>
      `;
      return;
    }

    DOM.cstageHooksGrid.innerHTML = hooks.map(hook => `
      <div class="hook-vault-card" id="hook-card-${hook.id}" data-id="${hook.id}">
        <div class="hook-card-header">
          <span class="hook-type-badge">${hook.type}</span>
          <span class="hook-duration-badge">⏱️ 0-3s</span>
        </div>
        <div class="hook-card-text">
          "${hook.hookText}"
        </div>
        <div class="hook-card-footer">
          <span class="hook-persona-tag">🎯 ${hook.targetPersona || 'Đại chúng'}</span>
          <div class="hook-card-actions">
            <button class="btn btn-secondary btn-sm btn-copy-hook" data-id="${hook.id}">${ICONS.copy} Sao Chép</button>
            <button class="btn btn-secondary btn-sm btn-edit-hook" data-id="${hook.id}">${ICONS.edit} Sửa</button>
          </div>
        </div>
      </div>
    `).join('');'''

new_render_hooks_vault = '''  function renderHooksVault() {
    if (!DOM.cstageHooksGrid) return;
    const type = state.activeHookType;
    let hooks = state.hooks || [];

    if (type && type !== 'all') {
      hooks = hooks.filter(h => h.type === type);
    }

    if (hooks.length === 0) {
      DOM.cstageHooksGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 2.5rem; text-align: center; color: var(--text-muted); background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 10px;">
          Chưa có câu hook nào thuộc nhóm này.
        </div>
      `;
      return;
    }

    DOM.cstageHooksGrid.innerHTML = hooks.map(hook => `
      <div class="hook-vault-card" id="hook-card-${hook.id}" data-id="${hook.id}">
        <div class="hook-card-header">
          <span class="hook-type-badge">${hook.type}</span>
          <span class="hook-duration-badge">0-3s</span>
        </div>
        <div class="hook-card-text">
          "${hook.hookText}"
        </div>
        <div class="hook-card-footer">
          <span class="hook-persona-tag">${hook.targetPersona || 'Đại chúng'}</span>
          <div class="hook-card-actions">
            <button class="btn btn-secondary btn-sm btn-copy-hook" data-id="${hook.id}">Sao Chép</button>
            <button class="btn btn-secondary btn-sm btn-edit-hook" data-id="${hook.id}">${ICONS.edit} Sửa</button>
          </div>
        </div>
      </div>
    `).join('');'''

code = code.replace(old_render_hooks_vault, new_render_hooks_vault, 1)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated app.js for todo12 successfully!")
