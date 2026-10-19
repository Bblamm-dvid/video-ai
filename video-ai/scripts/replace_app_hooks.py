import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

target_old = '''  /* ==========================================================================
     KHO CÂU HOOK VIRAL (HOOKS VAULT CRUD)
     ========================================================================== */
  /* ==========================================================================
     KHO CÂU HOOK VIRAL (HOOKS VAULT CRUD - REDESIGN TODO9)
     ========================================================================== */
  function getHookTypeClass(type) {
    if (!type) return 'type-expert';
    if (type.includes('Bóc Phốt') || type.includes('Cảnh Báo')) return 'type-warning';
    if (type.includes('Chuyên Gia') || type.includes('Khoa Học')) return 'type-expert';
    if (type.includes('Visual') || type.includes('Glass Skin') || type.includes('Beauty')) return 'type-beauty';
    if (type.includes('Hài Hước') || type.includes('Comedy') || type.includes('Gen Z')) return 'type-comedy';
    if (type.includes('POV')) return 'type-pov';
    if (type.includes('Routine') || type.includes('Lifestyle')) return 'type-lifestyle';
    return 'type-expert';
  }

  function renderHooksVault() {
    if (!DOM.cstageHooksGrid) return;
    const hooks = state.hooks || [];

    // Render Category Pills
    if (DOM.hookCategoryPills) {
      const categories = [
        { id: 'all', label: '🔥 Tất Cả Thể Loại' },
        { id: 'warning', label: '⚡ Bóc Phốt / Cảnh Báo' },
        { id: 'expert', label: '🔬 Chuyên Gia Da Liễu' },
        { id: 'beauty', label: '✨ Visual Glass Skin' },
        { id: 'comedy', label: '😂 Hài Hước Gen Z' },
        { id: 'pov', label: '🎬 POV Trải Nghiệm' },
        { id: 'lifestyle', label: '🌙 Night Routine' }
      ];

      DOM.hookCategoryPills.innerHTML = categories.map(cat => `
        <button class="folder-pill ${state.activeHookType === cat.id ? 'active' : ''}" data-cat="${cat.id}">
          ${cat.label}
        </button>
      `).join('');

      DOM.hookCategoryPills.querySelectorAll('.folder-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          state.activeHookType = pill.getAttribute('data-cat');
          renderHooksVault();
        });
      });
    }

    // Filter hooks based on active category
    const filteredHooks = hooks.filter(hook => {
      if (!state.activeHookType || state.activeHookType === 'all') return true;
      const cls = getHookTypeClass(hook.type);
      return cls === `type-${state.activeHookType}`;
    });

    if (filteredHooks.length === 0) {
      DOM.cstageHooksGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 3rem 1.5rem; text-align: center; color: var(--text-dim); background: rgba(15,23,42,0.6); border: 1px dashed var(--border-subtle); border-radius: 12px;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🎣</div>
          <div style="font-weight: 700; color: #fff; margin-bottom: 0.35rem; font-size: 1.05rem;">Chưa có câu hook nào thuộc thể loại này</div>
          <div style="font-size: 0.8rem;">Bấm <strong>"+ Thêm Câu Hook Mới"</strong> ở góc phải để tạo thêm câu giật tít viral.</div>
        </div>
      `;
      return;
    }

    DOM.cstageHooksGrid.innerHTML = filteredHooks.map((hook) => {
      const typeClass = getHookTypeClass(hook.type);
      const cleanQuote = (hook.hookText || '').replace(/"/g, '&quot;');

      return `
        <div class="hook-viral-card" id="hook-item-${hook.id}">
          <div class="hook-viral-header">
            <span class="hook-type-pill ${typeClass}">
              ${hook.type || 'Câu Hook'}
            </span>
            <span class="hook-viral-metric">
              ${hook.tag || '🔥 Trending'}
            </span>
          </div>

          <div class="hook-quote-body">
            <div class="hook-quote-text">"${hook.hookText}"</div>
          </div>

          ${hook.visualCue ? `
            <div class="hook-visual-cue-box">
              <div class="hook-visual-cue-label">🎬 Gợi ý cảnh quay 0–3s đầu:</div>
              <div>${hook.visualCue}</div>
            </div>
          ` : ''}

          <div class="hook-meta-row">
            <span>🎯 ${hook.targetPersona || 'Mọi đối tượng khách hàng'}</span>
            <span>•</span>
            <span>🎵 ${hook.soundTrend || 'TikTok Trending Beat'}</span>
          </div>

          <div class="hook-card-footer">
            <button class="btn btn-outline btn-xs btn-copy-hook" data-text="${cleanQuote}" style="color: var(--cyan-ai); border-color: rgba(56,189,248,0.35); font-weight: 600;">
              📋 Sao Chép Hook
            </button>
            <div class="hook-card-actions">
              <button class="btn btn-secondary btn-sm btn-edit-hook" data-id="${hook.id}">${ICONS.edit} Sửa</button>
              <button class="btn btn-outline btn-xs btn-delete-hook" data-id="${hook.id}" style="color: #f87171; border-color: rgba(239,68,68,0.3);">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Copy Handlers
    DOM.cstageHooksGrid.querySelectorAll('.btn-copy-hook').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(() => {});
        }
        showToast('✓ Đã sao chép câu hook vào clipboard!', 'success');
      });
    });

    // Attach Edit Handlers
    DOM.cstageHooksGrid.querySelectorAll('.btn-edit-hook').forEach(btn => {
      btn.addEventListener('click', () => {
        const hookId = btn.getAttribute('data-id');
        openEditHookModal(hookId);
      });
    });

    // Attach Delete Handlers
    DOM.cstageHooksGrid.querySelectorAll('.btn-delete-hook').forEach(btn => {
      btn.addEventListener('click', () => {
        const hookId = btn.getAttribute('data-id');
        if (confirm('Bạn có chắc muốn xóa câu hook này khỏi kho?')) {
          state.hooks = state.hooks.filter(h => h.id !== hookId);
          renderHooksVault();
          updatePipelineHookSelects();
          showToast('Đã xóa câu hook thành công', 'info');
        }
      });
    });
  }

  function setupHookModalHandlers() {
    if (DOM.btnCreateHook) {
      DOM.btnCreateHook.addEventListener('click', () => {
        if (!DOM.modalHookEditor) return;
        DOM.hookModalTitle.textContent = 'Thêm Câu Hook Viral TikTok Mới';
        DOM.hookEditId.value = '';
        DOM.hookTextInput.value = '';
        DOM.hookTypeSelect.value = 'Bóc Phốt / Cảnh Báo';
        DOM.hookPersonaInput.value = '';
        openModal(DOM.modalHookEditor);
      });
    }

    if (DOM.btnSaveHookModal) {
      DOM.btnSaveHookModal.onclick = () => {
        const text = DOM.hookTextInput ? DOM.hookTextInput.value.trim() : '';
        if (!text) {
          showToast('Vui lòng nhập nội dung câu hook', 'error');
          return;
        }

        const editId = DOM.hookEditId ? DOM.hookEditId.value : '';
        const type = DOM.hookTypeSelect ? DOM.hookTypeSelect.value : 'Hook Viral';
        const persona = DOM.hookPersonaInput ? DOM.hookPersonaInput.value.trim() : 'Khách hàng mục tiêu';

        if (editId) {
          const hook = state.hooks.find(h => h.id === editId);
          if (hook) {
            hook.hookText = text;
            hook.type = type;
            hook.targetPersona = persona;
            showToast('Đã cập nhật câu hook thành công', 'success');
          }
        } else {
          state.hooks.unshift({
            id: 'HOOK_' + Date.now(),
            type,
            hookText: text,
            targetPersona: persona,
            soundTrend: 'Trending TikTok Audio'
          });
          showToast('Đã thêm câu hook mới vào kho', 'success');
        }

        renderHooksVault();
        updatePipelineHookSelects();
        closeModal(DOM.modalHookEditor);
      };
    }
  }

  function openEditHookModal(hookId) {
    const hook = state.hooks.find(h => h.id === hookId);
    if (!hook || !DOM.modalHookEditor) return;

    DOM.hookModalTitle.textContent = 'Chỉnh Sửa Câu Hook';
    DOM.hookEditId.value = hook.id;
    DOM.hookTextInput.value = hook.hookText;
    DOM.hookTypeSelect.value = hook.type || 'Bóc Phốt / Cảnh Báo';
    DOM.hookPersonaInput.value = hook.targetPersona || '';
    openModal(DOM.modalHookEditor);
  }'''

replacement_new = '''  /* ==========================================================================
     KHO CÂU HOOK TIKTOK (THEO PHONG CÁCH XCORP & ẢNH 1, ẢNH 3)
     ========================================================================== */
  function renderHooksVault() {
    renderHooksList();
    setupHookEvents();
  }

  function renderHooksList() {
    if (!DOM.cstageHooksGrid) return;
    let hooks = state.hooks || [];

    const activeTab = state.activeHookTab || 'all';
    const searchKw = (state.activeHookSearch || '').toLowerCase().trim();
    const skuFilter = state.activeHookSku || 'all';

    // 1. Filter by Tab
    if (activeTab !== 'all') {
      hooks = hooks.filter(h => (h.type || '') === activeTab);
    }

    // 2. Filter by Search Keyword
    if (searchKw) {
      hooks = hooks.filter(h => 
        (h.hookText || '').toLowerCase().includes(searchKw) ||
        (h.sku || '').toLowerCase().includes(searchKw) ||
        (h.skuCode || '').toLowerCase().includes(searchKw) ||
        (h.visualCue || '').toLowerCase().includes(searchKw) ||
        (h.targetPersona || '').toLowerCase().includes(searchKw) ||
        (h.type || '').toLowerCase().includes(searchKw)
      );
    }

    // 3. Filter by SKU
    if (skuFilter !== 'all') {
      hooks = hooks.filter(h => (h.sku || '').includes(skuFilter));
    }

    if (hooks.length === 0) {
      DOM.cstageHooksGrid.innerHTML = `
        <div style="padding: 3rem 1.5rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border: 1px dashed var(--border-default); border-radius: var(--radius-xl);">
          <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem; font-size: 1.05rem;">Không tìm thấy câu hook nào phù hợp</div>
          <div style="font-size: 0.85rem;">Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</div>
        </div>
      `;
      return;
    }

    DOM.cstageHooksGrid.innerHTML = hooks.map((hook) => {
      // Category tag class matching Screenshot 1
      let tagClass = 'tag-hook-warning';
      if ((hook.type || '').includes('Chuyên Gia')) tagClass = 'tag-hook-expert';
      else if ((hook.type || '').includes('Visual Glass Skin')) tagClass = 'tag-hook-glass';
      else if ((hook.type || '').includes('Hài Hước')) tagClass = 'tag-hook-comedy';
      else if ((hook.type || '').includes('POV')) tagClass = 'tag-hook-pov';
      else if ((hook.type || '').includes('Night Routine')) tagClass = 'tag-hook-routine';

      const cleanQuote = (hook.hookText || '').replace(/"/g, '&quot;');

      return `
        <div class="hook-card-item" id="hook-item-${hook.id}">
          <div class="hook-card-top-row">
            <span class="${tagClass}">${hook.type || 'Bóc Phốt / Cảnh Báo'}</span>
            <span class="hook-sku-code-tag">${hook.skuCode || 'SKU-01'}</span>
          </div>

          <div class="hook-sku-row">
            <span class="hook-sku-name-txt">${hook.sku || 'Farmstay Retinol Revive Cream'}</span>
          </div>

          <div class="hook-quote-headline">
            "${hook.hookText}"
          </div>

          <div class="hook-details-box">
            <div class="hook-visual-line">
              <strong>Visual 0–3s:</strong> ${hook.visualCue || 'Cận cảnh soi gương biểu cảm giật mình, zoom nhanh vào hũ kem Retinol.'}
            </div>
            <div class="hook-target-audio-line">
              Target: ${hook.targetPersona || 'Nữ 25–40 tuổi'} • Audio: ${hook.soundTrend || 'Dramatic Whoosh'}
            </div>
          </div>

          <div class="hook-card-footer-row">
            <button class="btn-hook-make-script" data-hook-id="${hook.id}">Tạo Kịch Bản Từ Hook Này</button>
            <div class="hook-action-links">
              <button class="link-hook-action btn-copy-hook" data-text="${cleanQuote}">Sao chép</button>
              <button class="link-hook-action btn-edit-hook" data-id="${hook.id}">Sửa</button>
              <button class="link-hook-action link-hook-delete btn-delete-hook" data-id="${hook.id}">Xóa</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Action Handlers
    DOM.cstageHooksGrid.querySelectorAll('.btn-hook-make-script').forEach(btn => {
      btn.addEventListener('click', () => {
        const hookId = btn.getAttribute('data-hook-id');
        const hook = (state.hooks || []).find(h => h.id === hookId);
        if (!hook) return;

        // Switch to Script Vault
        switchPanel('panel-vault-angles');
        showToast(`Đã nạp câu hook "${hook.hookText.slice(0, 35)}..." vào Kho Kịch Bản!`, 'info');

        setTimeout(() => {
          if (DOM.modalScriptEditor) {
            DOM.modalScriptEditor.style.display = 'flex';
            if (DOM.scriptModalTitle) DOM.scriptModalTitle.textContent = `Tạo Kịch Bản Cho ${hook.sku || 'Sản Phẩm'}`;
            if (DOM.scriptTitleInput) DOM.scriptTitleInput.value = `Video TikTok: ${hook.hookText.slice(0, 45)}...`;
            if (DOM.scriptHookInput) DOM.scriptHookInput.value = hook.hookText;
            if (DOM.scriptAudienceInput) DOM.scriptAudienceInput.value = hook.targetPersona || '';
          }
        }, 300);
      });
    });

    DOM.cstageHooksGrid.querySelectorAll('.btn-copy-hook').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(() => {});
        }
        showToast('✓ Đã sao chép câu hook vào clipboard!', 'success');
      });
    });

    DOM.cstageHooksGrid.querySelectorAll('.btn-edit-hook').forEach(btn => {
      btn.addEventListener('click', () => {
        const hookId = btn.getAttribute('data-id');
        openEditHookModal(hookId);
      });
    });

    DOM.cstageHooksGrid.querySelectorAll('.btn-delete-hook').forEach(btn => {
      btn.addEventListener('click', () => {
        const hookId = btn.getAttribute('data-id');
        if (confirm('Bạn có chắc muốn xóa câu hook này khỏi kho?')) {
          state.hooks = state.hooks.filter(h => h.id !== hookId);
          renderHooksList();
          updatePipelineHookSelects();
          showToast('Đã xóa câu hook thành công!', 'info');
        }
      });
    });
  }

  function setupHookEvents() {
    // 1. Category Tabs
    if (DOM.hookCategoryTabsBar) {
      DOM.hookCategoryTabsBar.querySelectorAll('.hook-cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.hookCategoryTabsBar.querySelectorAll('.hook-cat-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          state.activeHookTab = tab.getAttribute('data-cat');
          renderHooksList();
        });
      });
    }

    // 2. Search Input
    if (DOM.hookSearchInput) {
      DOM.hookSearchInput.addEventListener('input', (e) => {
        state.activeHookSearch = e.target.value;
        renderHooksList();
      });
    }

    // 3. SKU Filter Select
    if (DOM.hookSkuSelect) {
      DOM.hookSkuSelect.addEventListener('change', (e) => {
        state.activeHookSku = e.target.value;
        renderHooksList();
      });
    }

    // 4. AI Generate Button
    if (DOM.btnHookAiGenerate) {
      DOM.btnHookAiGenerate.addEventListener('click', () => {
        showToast('AI đang phân tích xu hướng TikTok & doanh số SKU để tạo câu hook mới...', 'info');
        setTimeout(() => {
          state.hooks.unshift({
            id: 'HOOK_' + Date.now(),
            type: 'Bóc Phốt / Cảnh Báo',
            sku: 'Farmstay Retinol Revive Cream',
            skuCode: 'SKU-05',
            hookText: '99% Chị em thoa Retinol mà bị sạm da là do bỏ qua bước đệm sống còn này!',
            visualCue: 'Cận cảnh gương mặt model chỉ vào lọ serum đệm, camera zoom in 1.2x điện ảnh.',
            targetPersona: 'Nữ 25–45 tuổi da lão hóa',
            soundTrend: 'TikTok Viral Alert Sound'
          });
          renderHooksList();
          showToast('✓ AI đã sinh 1 câu Hook viral mới và thêm vào đầu kho!', 'success');
        }, 1200);
      });
    }
  }

  function setupHookModalHandlers() {
    if (DOM.btnCreateHook) {
      DOM.btnCreateHook.addEventListener('click', () => {
        if (!DOM.modalHookEditor) return;
        DOM.hookModalTitle.textContent = 'Thêm Câu Hook Mới';
        DOM.hookEditId.value = '';
        if (DOM.hookTextInput) DOM.hookTextInput.value = '';
        if (DOM.hookTypeSelect) DOM.hookTypeSelect.value = 'Bóc Phốt / Cảnh Báo';
        if (DOM.hookSkuSelectModal) DOM.hookSkuSelectModal.value = 'Farmstay Retinol Revive Cream (SKU-05)';
        if (DOM.hookVisualInput) DOM.hookVisualInput.value = '';
        if (DOM.hookPersonaInput) DOM.hookPersonaInput.value = '';
        if (DOM.hookSoundInput) DOM.hookSoundInput.value = '';
        openModal(DOM.modalHookEditor);
      });
    }

    if (DOM.btnSaveHookModal) {
      DOM.btnSaveHookModal.onclick = () => {
        const text = DOM.hookTextInput ? DOM.hookTextInput.value.trim() : '';
        if (!text) {
          showToast('Vui lòng nhập lời thoại câu hook', 'error');
          return;
        }

        const editId = DOM.hookEditId ? DOM.hookEditId.value : '';
        const type = DOM.hookTypeSelect ? DOM.hookTypeSelect.value : 'Bóc Phốt / Cảnh Báo';
        const skuFull = DOM.hookSkuSelectModal ? DOM.hookSkuSelectModal.value : 'Farmstay Retinol Revive Cream (SKU-05)';
        const sku = skuFull.replace(/\\s*\\(SKU-.*\\)/, '');
        const skuMatch = skuFull.match(/\\((SKU-\\d+)\\)/);
        const skuCode = skuMatch ? skuMatch[1] : 'SKU-01';
        const visual = DOM.hookVisualInput ? DOM.hookVisualInput.value.trim() : '';
        const persona = DOM.hookPersonaInput ? DOM.hookPersonaInput.value.trim() : 'Mọi đối tượng khách hàng';
        const sound = DOM.hookSoundInput ? DOM.hookSoundInput.value.trim() : 'Dramatic Whoosh';

        if (editId) {
          const hook = state.hooks.find(h => h.id === editId);
          if (hook) {
            hook.hookText = text;
            hook.type = type;
            hook.sku = sku;
            hook.skuCode = skuCode;
            hook.visualCue = visual;
            hook.targetPersona = persona;
            hook.soundTrend = sound;
            showToast('Đã cập nhật câu hook thành công!', 'success');
          }
        } else {
          state.hooks.unshift({
            id: 'HOOK_' + Date.now(),
            type,
            sku,
            skuCode,
            hookText: text,
            visualCue: visual,
            targetPersona: persona,
            soundTrend: sound
          });
          showToast('Đã thêm câu hook mới vào kho!', 'success');
        }

        renderHooksList();
        updatePipelineHookSelects();
        closeModal(DOM.modalHookEditor);
      };
    }
  }

  function openEditHookModal(hookId) {
    const hook = state.hooks.find(h => h.id === hookId);
    if (!hook || !DOM.modalHookEditor) return;

    DOM.hookModalTitle.textContent = 'Chỉnh Sửa Câu Hook';
    DOM.hookEditId.value = hook.id;
    if (DOM.hookTextInput) DOM.hookTextInput.value = hook.hookText || '';
    if (DOM.hookTypeSelect) DOM.hookTypeSelect.value = hook.type || 'Bóc Phốt / Cảnh Báo';
    if (DOM.hookSkuSelectModal) {
      const targetOption = Array.from(DOM.hookSkuSelectModal.options).find(opt => opt.value.includes(hook.sku || ''));
      if (targetOption) DOM.hookSkuSelectModal.value = targetOption.value;
    }
    if (DOM.hookVisualInput) DOM.hookVisualInput.value = hook.visualCue || '';
    if (DOM.hookPersonaInput) DOM.hookPersonaInput.value = hook.targetPersona || '';
    if (DOM.hookSoundInput) DOM.hookSoundInput.value = hook.soundTrend || '';

    openModal(DOM.modalHookEditor);
  }'''

if target_old in content:
    content = content.replace(target_old, replacement_new)
    print("Exact target found and replaced.")
else:
    print("Exact target not found, doing normalized search...")
    # Find start and end indices
    idx1 = content.find("/* ==========================================================================\n     KHO CÂU HOOK VIRAL (HOOKS VAULT CRUD)")
    idx2 = content.find("function updatePipelineHookSelects()")
    if idx1 != -1 and idx2 != -1:
        content = content[:idx1] + replacement_new + '\n\n  ' + content[idx2:]
        print("Slice replaced successfully.")
    else:
        print("Error: Could not find markers.")

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating app.js.")
