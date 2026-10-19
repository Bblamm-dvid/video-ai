import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("Updating app.js...")
with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# ------------------------------------------------------------------------------
# 1. Update DOM cache in app.js
# ------------------------------------------------------------------------------
old_hook_dom_marker = "modalHookEditor: document.getElementById('modal-hook-editor'),"

new_hook_dom = '''// Hook Vault (Screenshot 1 & 3)
    btnHookAiGenerate: document.getElementById('btn-hook-ai-generate'),
    hookSearchInput: document.getElementById('hook-search-input'),
    hookSkuSelect: document.getElementById('hook-sku-select'),
    hookCategoryTabsBar: document.getElementById('hook-category-tabs-bar'),
    hookSkuSelectModal: document.getElementById('hook-sku-select-modal'),
    hookVisualInput: document.getElementById('hook-visual-input'),
    hookSoundInput: document.getElementById('hook-sound-input'),

    // Module 1 Standby & Post-Render (Requirement 3)
    engineStatusBadge: document.getElementById('engine-status-badge'),
    enginePreRenderInfo: document.getElementById('engine-pre-render-info'),
    enginePostRenderActions: document.getElementById('engine-post-render-actions'),
    btnResetImg2vidRender: document.getElementById('btn-reset-img2vid-render'),
    standbySkuImg: document.getElementById('standby-sku-img'),
    standbyModelTag: document.getElementById('standby-model-tag'),
    standbyHookTxt: document.getElementById('standby-hook-txt'),

    modalHookEditor: document.getElementById('modal-hook-editor'),'''

code = code.replace(old_hook_dom_marker, new_hook_dom)

# ------------------------------------------------------------------------------
# 2. Update state in app.js
# ------------------------------------------------------------------------------
old_state_marker = "activeContentFilter: 'all',"
new_state = '''activeContentFilter: 'all',
    activeHookTab: 'all',
    activeHookSearch: '',
    activeHookSku: 'all','''

code = code.replace(old_state_marker, new_state)

# ------------------------------------------------------------------------------
# 3. Replace renderHooksVault and setupHookModalHandlers in app.js
# ------------------------------------------------------------------------------
old_hooks_section_pattern = re.compile(
    r'/\* ==========================================================================\s*KHO CÂU HOOK VIRAL.*?'
    r'/\* ==========================================================================\s*KHO THƯ MỤC SẢN PHẨM',
    re.DOTALL
)

new_hooks_section = '''/* ==========================================================================
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
              <strong>Visual 0–3s:</strong> ${hook.visualCue || 'Cận cảnh soi gương biểu cảm giật mình, zoom nhanh vào sản phẩm.'}
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
        showToast(`Đã chọn câu hook: "${hook.hookText.slice(0, 40)}..."`, 'info');
        
        // If script editor view exists, fill it
        setTimeout(() => {
          if (DOM.modalScriptEditor) {
            DOM.modalScriptEditor.style.display = 'flex';
            if (DOM.scriptModalTitle) DOM.scriptModalTitle.textContent = `Tạo Kịch Bản Cho ${hook.sku || 'Sản Phẩm'}`;
            if (DOM.scriptTitleInput) DOM.scriptTitleInput.value = `Video TikTok: ${hook.hookText.slice(0, 50)}...`;
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
        showToast('AI đang phân tích xu hướng TikTok & doanh số SKU để tạo 3 câu hook mới...', 'info');
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
        const sku = skuFull.replace(/\s*\(SKU-.*\)/, '');
        const skuMatch = skuFull.match(/\((SKU-\d+)\)/);
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
  }

  /* ==========================================================================
     KHO THƯ MỤC SẢN PHẨM'''

code = old_hooks_section_pattern.sub(lambda m: new_hooks_section, code)

# ------------------------------------------------------------------------------
# 4. Update setupImageToVideoPipeline for complete Standby -> Rendering -> Completed Flow
# ------------------------------------------------------------------------------
old_pipeline_init_pattern = re.compile(
    r'function setupImageToVideoPipeline\(\) \{.*?'
    r'// 6\. Run Generate Engine Simulation',
    re.DOTALL
)

new_pipeline_init = '''function setupImageToVideoPipeline() {
    // Helper to update dynamic standby composition preview
    function updateStandbyComposition() {
      const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : '';
      const folder = state.productFolders.find(f => f.id === folderId);
      const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
      const model = state.modelFolders.find(m => m.id === modelId);
      const hookId = DOM.img2vidHookSelect ? DOM.img2vidHookSelect.value : '';
      const hook = (state.hooks || []).find(h => h.id === hookId);

      // Update product image in standby
      if (DOM.standbySkuImg && folder) {
        if (folder.coverImage) DOM.standbySkuImg.src = folder.coverImage;
        else if (folder.files && folder.files.length > 0) DOM.standbySkuImg.src = folder.files[0].url;
      }

      // Update model tag
      if (DOM.standbyModelTag && model) {
        DOM.standbyModelTag.textContent = `Model: ${model.name || 'Model'} (AI 3D)`;
      }

      // Update hook text
      if (DOM.standbyHookTxt && hook) {
        DOM.standbyHookTxt.textContent = `"${hook.hookText}"`;
      }
    }

    // Helper to reset back to Standby State
    function resetImg2vidToStandby() {
      if (DOM.cstageEngineVideo) {
        DOM.cstageEngineVideo.pause();
        DOM.cstageEngineVideo.style.display = 'none';
      }
      if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'none';
      if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'none';
      if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.remove('active');

      if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'flex';
      if (DOM.engineStatusBadge) {
        DOM.engineStatusBadge.textContent = 'CHỜ KHỞI TẠO (STANDBY)';
        DOM.engineStatusBadge.style.cssText = 'background: var(--bg-surface-subtle); color: var(--text-dim); border: 1px solid var(--border-default); font-weight: 700;';
      }
      if (DOM.enginePreRenderInfo) DOM.enginePreRenderInfo.style.display = 'block';
      if (DOM.enginePostRenderActions) DOM.enginePostRenderActions.style.display = 'none';
      if (DOM.btnRunImg2vid) DOM.btnRunImg2vid.disabled = false;

      updateStandbyComposition();
    }

    // Wire reset button
    if (DOM.btnResetImg2vidRender) {
      DOM.btnResetImg2vidRender.addEventListener('click', () => {
        resetImg2vidToStandby();
        showToast('Đã trở về trạng thái chờ khởi tạo video!', 'info');
      });
    }

    // Listen to changes on folder, model, hook to refresh standby screen
    if (DOM.img2vidFolderSelect) DOM.img2vidFolderSelect.addEventListener('change', updateStandbyComposition);
    if (DOM.img2vidModelFolderSelect) DOM.img2vidModelFolderSelect.addEventListener('change', updateStandbyComposition);
    if (DOM.img2vidHookSelect) DOM.img2vidHookSelect.addEventListener('change', updateStandbyComposition);

    // Initial standby state on boot
    resetImg2vidToStandby();

    // 6. Run Generate Engine Simulation'''

code = old_pipeline_init_pattern.sub(lambda m: new_pipeline_init, code)

# Update the render completion block
old_completion_code = '''            // Completed
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

            showToast(`Render hoàn tất! Video 3D của "${folder?.name || 'Sản phẩm'}" đã sẵn sàng xem trước.`, 'success');'''

new_completion_code = '''            // Completed: Transition from Rendering -> Completed State
            if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.remove('active');
            if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'none';

            if (DOM.engineStatusBadge) {
              DOM.engineStatusBadge.textContent = '✓ PREVIEW SẴN SÀNG (ĐÃ RENDER)';
              DOM.engineStatusBadge.style.cssText = 'background: var(--color-success-bg); color: var(--color-success); border: 1px solid var(--color-success-border); font-weight: 700;';
            }

            if (DOM.cstageEngineVideo) {
              DOM.cstageEngineVideo.style.display = 'block';
              DOM.cstageEngineVideo.src = 'media/video/final_final.mp4';
              DOM.cstageEngineVideo.play().catch(() => {});
            }
            if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'block';
            if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'block';

            if (DOM.enginePreRenderInfo) DOM.enginePreRenderInfo.style.display = 'none';
            if (DOM.enginePostRenderActions) DOM.enginePostRenderActions.style.display = 'block';

            DOM.btnRunImg2vid.disabled = false;
            if (DOM.btnSaveImg2vidFinished) DOM.btnSaveImg2vidFinished.disabled = false;

            showToast(`✓ Render hoàn tất! Video 3D của "${folder?.name || 'Sản phẩm'}" đã sẵn sàng xem trước.`, 'success');'''

code = code.replace(old_completion_code, new_completion_code)

# In advanceRenderStep, update status badge to rendering
old_start_render = '''        // Show render simulation overlay
        if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.add('active');'''

new_start_render = '''        // Update status badge to rendering
        if (DOM.engineStatusBadge) {
          DOM.engineStatusBadge.textContent = '⚡ ĐANG RENDER AI (GPU 60FPS)...';
          DOM.engineStatusBadge.style.cssText = 'background: rgba(14, 165, 233, 0.15); color: #0284c7; border: 1px solid rgba(14, 165, 233, 0.4); font-weight: 700;';
        }

        // Show render simulation overlay
        if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.add('active');'''

code = code.replace(old_start_render, new_start_render)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("app.js updated successfully.")
