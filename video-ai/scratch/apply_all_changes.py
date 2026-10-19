import re
import sys

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# ----------------------------------------------------
# 1. Update DOM Elements
# ----------------------------------------------------
dom_target = """    // Todo 13: Kho Kịch Bản Video Elements (Matching Anh 1 & 2)
    scriptListMainView: document.getElementById('script-list-main-view'),
    scriptDetailEditorView: document.getElementById('script-detail-editor-view'),
    scriptTableSearchInput: document.getElementById('script-table-search-input'),
    scriptTableSkuSelect: document.getElementById('script-table-sku-select'),
    scriptCategoryTabsBar: document.getElementById('script-category-tabs-bar'),
    scriptTableTbody: document.getElementById('script-table-tbody'),
    scriptCheckAllBox: document.getElementById('script-check-all-box'),
    btnScriptImportFile: document.getElementById('btn-script-import-file'),
    btnScriptWriteManual: document.getElementById('btn-script-write-manual'),
    btnScriptAiGenerate: document.getElementById('btn-script-ai-generate'),
    btnBackToScriptList: document.getElementById('btn-back-to-script-list'),
    editorScriptTitle: document.getElementById('editor-script-title'),
    editorScriptSku: document.getElementById('editor-script-sku'),
    editorScriptDuration: document.getElementById('editor-script-duration'),
    editorScriptStatus: document.getElementById('editor-script-status'),
    btnEditorAddScene: document.getElementById('btn-editor-add-scene'),
    btnEditorSaveScript: document.getElementById('btn-editor-save-script'),
    btnEditorCreateVideo: document.getElementById('btn-editor-create-video'),
    editorScenesContainer: document.getElementById('editor-scenes-container'),"""

dom_replacement = """    // Todo 13 & 14: Kho Kịch Bản Video Elements (Matching Anh 1 & 2)
    scriptCountBadge: document.getElementById('script-count-badge'),
    scriptListMainView: document.getElementById('script-list-main-view'),
    scriptDetailEditorView: document.getElementById('script-detail-editor-view'),
    scriptTableSearchInput: document.getElementById('script-table-search-input'),
    scriptTableSkuSelect: document.getElementById('script-table-sku-select'),
    scriptCategoryTabsBar: document.getElementById('script-category-tabs-bar'),
    scriptTableTbody: document.getElementById('script-table-tbody'),
    scriptCheckAllBox: document.getElementById('script-check-all-box'),
    scriptBatchBar: document.getElementById('script-batch-bar'),
    scriptBatchCount: document.getElementById('script-batch-count'),
    btnBatchPublishScript: document.getElementById('btn-batch-publish-script'),
    btnBatchDeleteScript: document.getElementById('btn-batch-delete-script'),
    btnBatchDeselectScript: document.getElementById('btn-batch-deselect-script'),
    btnScriptImportFile: document.getElementById('btn-script-import-file'),
    btnScriptWriteManual: document.getElementById('btn-script-write-manual'),
    btnScriptAiGenerate: document.getElementById('btn-script-ai-generate'),
    btnBackToScriptList: document.getElementById('btn-back-to-script-list'),
    editorScriptTitle: document.getElementById('editor-script-title'),
    editorScriptSku: document.getElementById('editor-script-sku'),
    editorScriptDuration: document.getElementById('editor-script-duration'),
    editorScriptStatus: document.getElementById('editor-script-status'),
    btnEditorAddScene: document.getElementById('btn-editor-add-scene'),
    btnEditorSaveScript: document.getElementById('btn-editor-save-script'),
    btnEditorPublishScript: document.getElementById('btn-editor-publish-script'),
    btnEditorCreateVideo: document.getElementById('btn-editor-create-video'),
    editorScenesContainer: document.getElementById('editor-scenes-container'),"""

assert dom_target in code, "Failed to find dom_target"
code = code.replace(dom_target, dom_replacement)

# Hook DOM
hook_dom_target = """    // Vaults: Hooks
    cstageHooksGrid: document.getElementById('cstage-hooks-grid'),
    hookCategoryPills: document.getElementById('hook-category-pills'),
    btnCreateHook: document.getElementById('btn-create-hook'),"""

hook_dom_replacement = """    // Vaults: Hooks (Matching Screenshot 2 Datatable & Batch Actions)
    hookTableTbody: document.getElementById('hook-table-tbody'),
    hookCheckAllBox: document.getElementById('hook-check-all-box'),
    hookBatchBar: document.getElementById('hook-batch-bar'),
    hookBatchCount: document.getElementById('hook-batch-count'),
    btnBatchDeleteHook: document.getElementById('btn-batch-delete-hook'),
    btnBatchDeselectHook: document.getElementById('btn-batch-deselect-hook'),
    cstageHooksGrid: document.getElementById('cstage-hooks-grid'),
    hookCategoryPills: document.getElementById('hook-category-pills'),
    btnCreateHook: document.getElementById('btn-create-hook'),"""

assert hook_dom_target in code, "Failed to find hook_dom_target"
code = code.replace(hook_dom_target, hook_dom_replacement)

# Step 4 DOM
step4_dom_target = """    img2vidFolderSelect: document.getElementById('img2vid-folder-select'),
    engineSkuTitle: document.getElementById('engine-sku-title'),
    engineSkuPrice: document.getElementById('engine-sku-price'),
    engineSkuDesc: document.getElementById('engine-sku-desc'),
    engineSkuUspTags: document.getElementById('engine-sku-usp-tags'),
    enginePackshotSelector: document.getElementById('engine-packshot-selector'),"""

step4_dom_replacement = """    img2vidFolderSelect: document.getElementById('img2vid-folder-select'),
    engineSkuCode: document.getElementById('engine-sku-code'),
    engineSkuTitle: document.getElementById('engine-sku-title'),
    engineSkuOrigin: document.getElementById('engine-sku-origin'),
    engineSkuPrice: document.getElementById('engine-sku-price'),
    engineSkuDesc: document.getElementById('engine-sku-desc'),
    engineSkuUspTags: document.getElementById('engine-sku-usp-tags'),
    enginePackshotSelector: document.getElementById('engine-packshot-selector'),
    packshotSelectedLabel: document.getElementById('packshot-selected-label'),
    btnGotoProductDrive: document.getElementById('btn-goto-product-drive'),
    btnUploadMorePackshot: document.getElementById('btn-upload-more-packshot'),"""

assert step4_dom_target in code, "Failed to find step4_dom_target"
code = code.replace(step4_dom_target, step4_dom_replacement)

# Modal DOM
modal_dom_target = """    btnSaveScript: document.getElementById('btn-save-script'),"""

modal_dom_replacement = """    btnSaveScript: document.getElementById('btn-save-script'),
    btnSaveScriptDraft: document.getElementById('btn-save-script-draft'),
    btnSaveScriptPublish: document.getElementById('btn-save-script-publish'),"""

assert modal_dom_target in code, "Failed to find modal_dom_target"
code = code.replace(modal_dom_target, modal_dom_replacement)

# ----------------------------------------------------
# 2. Update State
# ----------------------------------------------------
state_target = """    activeHookTab: 'all',
    activeHookSearch: '',
    activeHookSku: 'all',"""

state_replacement = """    activeHookTab: 'all',
    activeHookSearch: '',
    activeHookSku: 'all',
    selectedScriptIds: new Set(),
    selectedHookIds: new Set(),"""

assert state_target in code, "Failed to find state_target"
code = code.replace(state_target, state_replacement)

# ----------------------------------------------------
# 3. Update renderScriptsTable and setupScriptTableEvents
# ----------------------------------------------------
old_scripts_code_pattern = r'function renderScriptsTable\(\) \{[\s\S]*?function setupScriptTableEvents\(\) \{[\s\S]*?// 6\. Detail Editor Back Button'

new_scripts_code = """function updateScriptBatchBar() {
    if (!DOM.scriptBatchBar) return;
    const count = state.selectedScriptIds.size;
    if (count > 0) {
      DOM.scriptBatchBar.style.display = 'flex';
      if (DOM.scriptBatchCount) DOM.scriptBatchCount.textContent = count;
    } else {
      DOM.scriptBatchBar.style.display = 'none';
    }
  }

  function renderScriptsTable() {
    if (!DOM.scriptTableTbody) return;

    let scripts = state.scripts || [];
    const tab = state.activeScriptTab || 'all';
    const kw = (state.activeScriptSearch || '').toLowerCase().trim();
    const skuFilter = state.activeScriptSku || 'all';

    // 1. Filter by Tab
    if (tab !== 'all') {
      scripts = scripts.filter(s => {
        if (tab === 'Giáo Dục') return (s.group || '').includes('Giáo Dục');
        if (tab === 'Giới Thiệu') return (s.group || '').includes('Giới Thiệu');
        if (tab === 'POV & Trend') return (s.group || '').includes('POV') || (s.group || '').includes('Trend');
        if (tab === 'Trải Nghiệm & ASMR') return (s.group || '').includes('ASMR') || (s.group || '').includes('Trải Nghiệm');
        return true;
      });
    }

    // 2. Filter by Search Keyword
    if (kw) {
      scripts = scripts.filter(s => 
        (s.title || '').toLowerCase().includes(kw) ||
        (s.sku || '').toLowerCase().includes(kw) ||
        (s.hook || '').toLowerCase().includes(kw) ||
        (s.group || '').toLowerCase().includes(kw)
      );
    }

    // 3. Filter by SKU
    if (skuFilter !== 'all') {
      scripts = scripts.filter(s => (s.sku || '').includes(skuFilter));
    }

    // Update count badge (Todo14)
    if (DOM.scriptCountBadge) {
      DOM.scriptCountBadge.textContent = `(${scripts.length} kịch bản)`;
    }

    if (scripts.length === 0) {
      DOM.scriptTableTbody.innerHTML = `
        <tr>
          <td colspan="8" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            Không tìm thấy kịch bản nào phù hợp với bộ lọc.
          </td>
        </tr>
      `;
      updateScriptBatchBar();
      return;
    }

    DOM.scriptTableTbody.innerHTML = scripts.map((script) => {
      // Group tag class matching Ảnh 1
      let groupClass = 'tag-group-edu';
      if ((script.group || '').includes('ASMR') || (script.group || '').includes('Trải Nghiệm')) groupClass = 'tag-group-asmr';
      else if ((script.group || '').includes('POV') || (script.group || '').includes('Trend')) groupClass = 'tag-group-trend';
      else if ((script.group || '').includes('Giới Thiệu')) groupClass = 'tag-group-intro';

      // Status pill: Strictly 2 statuses (Sẵn sàng & Bản nháp) - Todo14 Item 2
      const isReady = script.status === 'Sẵn sàng' || script.statusCode === 'ready';
      const statusClass = isReady ? 'status-pill-ready' : 'status-pill-draft';
      const statusText = isReady ? 'Sẵn sàng' : 'Bản nháp';
      const isChecked = state.selectedScriptIds.has(script.id);

      return `
        <tr data-script-id="${script.id}" class="${isChecked ? 'row-selected' : ''}">
          <td style="text-align: center;">
            <input type="checkbox" class="form-checkbox script-row-checkbox" value="${script.id}" ${isChecked ? 'checked' : ''}>
          </td>
          <td>
            <div class="script-row-title-bold">${script.title}</div>
            <div class="script-row-sub-meta">Cập nhật: ${script.updatedAt || 'Hôm nay'}</div>
          </td>
          <td>
            <span class="${groupClass}">${script.group || 'Giáo Dục'}</span>
          </td>
          <td>
            <span style="font-weight: 600; color: var(--text-main); font-size: 0.86rem;">${script.sku || 'Farmstay SKU'}</span>
          </td>
          <td>
            <span style="font-size: 0.88rem; font-weight: 500; color: var(--text-main);">${script.scenesCount || (script.scenes || []).length || 4} Cảnh</span>
          </td>
          <td>
            <span style="font-size: 0.88rem; font-weight: 500; color: var(--text-main); font-family: var(--font-mono);">${script.duration || '45s'}</span>
          </td>
          <td>
            <span class="${statusClass}">${statusText}</span>
          </td>
          <td style="text-align: center;">
            <button class="btn-table-create-video btn-script-make-video" data-id="${script.id}">Tạo Video</button>
          </td>
        </tr>
      `;
    }).join('');

    // Check all box status
    if (DOM.scriptCheckAllBox) {
      const allSelected = scripts.length > 0 && scripts.every(s => state.selectedScriptIds.has(s.id));
      DOM.scriptCheckAllBox.checked = allSelected;
    }

    updateScriptBatchBar();

    // Attach row events
    DOM.scriptTableTbody.querySelectorAll('tr[data-script-id]').forEach(row => {
      const scriptId = row.getAttribute('data-script-id');

      // Clicking row opens Detailed Scene Editor (Item 2)
      row.addEventListener('click', (e) => {
        if (e.target.closest('.script-row-checkbox') || e.target.closest('.btn-script-make-video')) return;
        openScriptDetailedEditor(scriptId);
      });

      // Checkbox toggle
      const cb = row.querySelector('.script-row-checkbox');
      if (cb) {
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          if (cb.checked) {
            state.selectedScriptIds.add(scriptId);
          } else {
            state.selectedScriptIds.delete(scriptId);
          }
          if (DOM.scriptCheckAllBox) {
            DOM.scriptCheckAllBox.checked = scripts.every(s => state.selectedScriptIds.has(s.id));
          }
          updateScriptBatchBar();
        });
      }

      // Action button "Tạo Video"
      const makeVidBtn = row.querySelector('.btn-script-make-video');
      if (makeVidBtn) {
        makeVidBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          useScriptToGenerateVideo(scriptId);
        });
      }
    });
  }

  function setupScriptTableEvents() {
    // 1. Tab switching
    if (DOM.scriptCategoryTabsBar) {
      DOM.scriptCategoryTabsBar.querySelectorAll('.script-cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.scriptCategoryTabsBar.querySelectorAll('.script-cat-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          state.activeScriptTab = tab.getAttribute('data-tab');
          renderScriptsTable();
        });
      });
    }

    // 2. Search input
    if (DOM.scriptTableSearchInput) {
      DOM.scriptTableSearchInput.addEventListener('input', (e) => {
        state.activeScriptSearch = e.target.value;
        renderScriptsTable();
      });
    }

    // 3. SKU Select Filter
    if (DOM.scriptTableSkuSelect) {
      DOM.scriptTableSkuSelect.addEventListener('change', (e) => {
        state.activeScriptSku = e.target.value;
        renderScriptsTable();
      });
    }

    // 4. Check all box
    if (DOM.scriptCheckAllBox) {
      DOM.scriptCheckAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        if (DOM.scriptTableTbody) {
          DOM.scriptTableTbody.querySelectorAll('.script-row-checkbox').forEach(cb => {
            cb.checked = isChecked;
            if (isChecked) state.selectedScriptIds.add(cb.value);
            else state.selectedScriptIds.delete(cb.value);
          });
        }
        updateScriptBatchBar();
      });
    }

    // 4.1 Script Batch Actions (Todo14 Item 1)
    if (DOM.btnBatchPublishScript) {
      DOM.btnBatchPublishScript.addEventListener('click', () => {
        let count = 0;
        state.scripts.forEach(s => {
          if (state.selectedScriptIds.has(s.id)) {
            s.status = 'Sẵn sàng';
            s.statusCode = 'ready';
            count++;
          }
        });
        renderScriptsTable();
        showToast(`Đã xuất bản thành công ${count} kịch bản sang trạng thái "Sẵn sàng"!`, 'success');
      });
    }

    if (DOM.btnBatchDeleteScript) {
      DOM.btnBatchDeleteScript.addEventListener('click', () => {
        const count = state.selectedScriptIds.size;
        if (count === 0) return;
        if (confirm(`Bạn có chắc chắn muốn xóa ${count} kịch bản đã chọn khỏi kho?`)) {
          state.scripts = state.scripts.filter(s => !state.selectedScriptIds.has(s.id));
          state.selectedScriptIds.clear();
          renderScriptsTable();
          showToast(`Đã xóa ${count} kịch bản khỏi kho!`, 'info');
        }
      });
    }

    if (DOM.btnBatchDeselectScript) {
      DOM.btnBatchDeselectScript.addEventListener('click', () => {
        state.selectedScriptIds.clear();
        renderScriptsTable();
      });
    }

    // 5. Action buttons on header
    if (DOM.btnScriptImportFile) {
      DOM.btnScriptImportFile.addEventListener('click', () => {
        if (DOM.modalUploadScript) DOM.modalUploadScript.style.display = 'flex';
      });
    }

    if (DOM.btnScriptWriteManual) {
      DOM.btnScriptWriteManual.addEventListener('click', () => {
        if (DOM.modalScriptEditor) {
          DOM.modalScriptEditor.style.display = 'flex';
          if (DOM.scriptModalTitle) DOM.scriptModalTitle.textContent = 'Viết Kịch Bản Video Mới';
          if (DOM.scriptEditId) DOM.scriptEditId.value = '';
          if (DOM.scriptTitleInput) DOM.scriptTitleInput.value = '';
          if (DOM.scriptHookInput) DOM.scriptHookInput.value = '';
          if (DOM.scriptBodyInput) DOM.scriptBodyInput.value = '';
        }
      });
    }

    if (DOM.btnScriptAiGenerate) {
      DOM.btnScriptAiGenerate.addEventListener('click', () => {
        showToast('AI đang phân tích sản phẩm và xu hướng TikTok để tạo 3 kịch bản mới...', 'info');
        setTimeout(() => {
          showToast('AI đã tạo thành công 1 kịch bản viral mới! Đã thêm vào danh sách.', 'success');
        }, 1200);
      });
    }

    // 6. Detail Editor Back Button"""

code = re.sub(old_scripts_code_pattern, lambda m: new_scripts_code, code)

# ----------------------------------------------------
# 4. Update Detail Editor Save & Publish Handlers
# ----------------------------------------------------
editor_save_target = """    // 7. Save Script in Detail Editor
    if (DOM.btnEditorSaveScript) {
      DOM.btnEditorSaveScript.addEventListener('click', () => {
        showToast('Đã lưu kịch bản và phân cảnh thành công!', 'success');
      });
    }"""

editor_save_replacement = """    // 7. Save Script in Detail Editor (Draft vs Publish - Todo14 Item 2)
    if (DOM.btnEditorSaveScript) {
      DOM.btnEditorSaveScript.addEventListener('click', () => {
        const script = state.scripts.find(s => s.id === state.activeEditingScriptId);
        if (script) {
          showToast('Đã lưu kịch bản (Bản nháp) thành công!', 'success');
        }
      });
    }

    if (DOM.btnEditorPublishScript) {
      DOM.btnEditorPublishScript.addEventListener('click', () => {
        const script = state.scripts.find(s => s.id === state.activeEditingScriptId);
        if (script) {
          script.status = 'Sẵn sàng';
          script.statusCode = 'ready';
          if (DOM.editorScriptStatus) {
            DOM.editorScriptStatus.textContent = 'Sẵn sàng';
          }
          renderScriptsTable();
          showToast('Đã xuất bản kịch bản thành công! Trạng thái hiện tại: Sẵn sàng', 'success');
        }
      });
    }"""

assert editor_save_target in code, "Failed to find editor_save_target"
code = code.replace(editor_save_target, editor_save_replacement)

# ----------------------------------------------------
# 5. Update openScriptDetailedEditor status text
# ----------------------------------------------------
editor_status_target = """    if (DOM.editorScriptStatus) {
      DOM.editorScriptStatus.textContent = script.status === 'Sẵn sàng' ? 'Sẵn sàng dựng' : (script.status || 'Sẵn sàng');
    }"""

editor_status_replacement = """    if (DOM.editorScriptStatus) {
      const isReady = script.status === 'Sẵn sàng' || script.statusCode === 'ready';
      DOM.editorScriptStatus.textContent = isReady ? 'Sẵn sàng' : 'Bản nháp';
    }"""

assert editor_status_target in code, "Failed to find editor_status_target"
code = code.replace(editor_status_target, editor_status_replacement)

# ----------------------------------------------------
# 6. Update Script Modal Save handlers (Draft vs Publish)
# ----------------------------------------------------
script_modal_save_target = """    if (DOM.btnSaveScript) {
      DOM.btnSaveScript.addEventListener('click', () => {
        const editId = DOM.scriptEditId.value;
        const title = DOM.scriptTitleInput.value.trim() || 'Kịch bản mới';
        const group = DOM.scriptGroupSelect.value;
        const audience = DOM.scriptAudienceInput.value.trim() || 'Khách hàng mục tiêu';
        const hook = DOM.scriptHookInput.value.trim() || 'Câu hook mở đầu';
        const body = DOM.scriptBodyInput.value.trim() || 'Chi tiết kịch bản';

        if (editId) {
          const script = state.scripts.find(s => s.id === editId);
          if (script) {
            script.title = title;
            script.group = group;
            script.targetAudience = audience;
            script.hook = hook;
            script.fullScript = body;
            showToast('Đã cập nhật kịch bản thành công', 'success');
          }
        } else {
          state.scripts.unshift({
            id: 'SCRIPT_' + Date.now(),
            title,
            group,
            targetAudience: audience,
            hook,
            fullScript: body
          });
          showToast('Đã thêm kịch bản mới vào kho', 'success');
        }

        renderScriptFolderPills();
        renderScriptsVault();
        updatePipelineScriptSelects();
        closeModal(DOM.modalScriptEditor);
      });
    }"""

script_modal_save_replacement = """    function handleSaveScriptModal(desiredStatus = 'Bản nháp') {
      const editId = DOM.scriptEditId ? DOM.scriptEditId.value : '';
      const title = (DOM.scriptTitleInput ? DOM.scriptTitleInput.value.trim() : '') || 'Kịch bản mới';
      const group = DOM.scriptGroupSelect ? DOM.scriptGroupSelect.value : 'Giáo Dục';
      const audience = (DOM.scriptAudienceInput ? DOM.scriptAudienceInput.value.trim() : '') || 'Khách hàng mục tiêu';
      const hook = (DOM.scriptHookInput ? DOM.scriptHookInput.value.trim() : '') || 'Câu hook mở đầu';
      const body = (DOM.scriptBodyInput ? DOM.scriptBodyInput.value.trim() : '') || 'Chi tiết kịch bản';

      const isPublish = desiredStatus === 'Sẵn sàng';

      if (editId) {
        const script = state.scripts.find(s => s.id === editId);
        if (script) {
          script.title = title;
          script.group = group;
          script.targetAudience = audience;
          script.hook = hook;
          script.fullScript = body;
          script.status = isPublish ? 'Sẵn sàng' : 'Bản nháp';
          script.statusCode = isPublish ? 'ready' : 'draft';
          showToast(isPublish ? 'Đã xuất bản kịch bản (Sẵn sàng)!' : 'Đã lưu kịch bản dạng Bản nháp!', 'success');
        }
      } else {
        const newScript = {
          id: 'SCRIPT_' + Date.now(),
          title,
          group,
          sku: 'Farmstay SKU',
          scenesCount: 4,
          duration: '45s',
          totalDurationSeconds: 45,
          targetAudience: audience,
          hook,
          fullScript: body,
          status: isPublish ? 'Sẵn sàng' : 'Bản nháp',
          statusCode: isPublish ? 'ready' : 'draft',
          updatedAt: 'Vừa xong'
        };
        state.scripts.unshift(newScript);
        showToast(isPublish ? 'Đã xuất bản kịch bản mới thành công!' : 'Đã lưu kịch bản mới dạng Bản nháp!', 'success');
      }

      renderScriptsTable();
      updatePipelineScriptSelects();
      closeModal(DOM.modalScriptEditor);
    }

    if (DOM.btnSaveScriptDraft) {
      DOM.btnSaveScriptDraft.addEventListener('click', () => handleSaveScriptModal('Bản nháp'));
    }
    if (DOM.btnSaveScriptPublish) {
      DOM.btnSaveScriptPublish.addEventListener('click', () => handleSaveScriptModal('Sẵn sàng'));
    }
    if (DOM.btnSaveScript) {
      DOM.btnSaveScript.addEventListener('click', () => handleSaveScriptModal('Sẵn sàng'));
    }"""

assert script_modal_save_target in code, "Failed to find script_modal_save_target"
code = code.replace(script_modal_save_target, script_modal_save_replacement)

# ----------------------------------------------------
# 7. Update renderHooksList and setupHookEvents (Screenshot 2 Datatable)
# ----------------------------------------------------
old_hooks_code_pattern = r'function renderHooksList\(\) \{[\s\S]*?function setupHookEvents\(\) \{[\s\S]*?// 4\. AI Generate Button'

new_hooks_code = """function updateHookBatchBar() {
    if (!DOM.hookBatchBar) return;
    const count = state.selectedHookIds.size;
    if (count > 0) {
      DOM.hookBatchBar.style.display = 'flex';
      if (DOM.hookBatchCount) DOM.hookBatchCount.textContent = count;
    } else {
      DOM.hookBatchBar.style.display = 'none';
    }
  }

  function renderHooksList() {
    if (!DOM.hookTableTbody) return;
    let hooks = state.hooks || [];

    const activeTab = state.activeHookTab || 'all';
    const searchKw = (state.activeHookSearch || '').toLowerCase().trim();

    // 1. Filter by Tab (matching Screenshot 2: Tất Cả, Cảnh Báo, Chuyên Gia, Glass Skin, Hài Hước, POV)
    if (activeTab !== 'all') {
      hooks = hooks.filter(h => (h.type || '') === activeTab);
    }

    // 2. Filter by Search Keyword
    if (searchKw) {
      hooks = hooks.filter(h => 
        (h.hookText || '').toLowerCase().includes(searchKw) ||
        (h.sku || '').toLowerCase().includes(searchKw) ||
        (h.skuCode || '').toLowerCase().includes(searchKw) ||
        (h.type || '').toLowerCase().includes(searchKw)
      );
    }

    if (hooks.length === 0) {
      DOM.hookTableTbody.innerHTML = `
        <tr>
          <td colspan="4" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            Không tìm thấy câu hook nào phù hợp với bộ lọc.
          </td>
        </tr>
      `;
      updateHookBatchBar();
      return;
    }

    DOM.hookTableTbody.innerHTML = hooks.map((hook) => {
      // Category tag matching Screenshot 2
      let tagClass = 'tag-hook-warning';
      if ((hook.type || '').includes('Chuyên Gia')) tagClass = 'tag-hook-expert';
      else if ((hook.type || '').includes('Glass Skin')) tagClass = 'tag-hook-glass';
      else if ((hook.type || '').includes('Hài Hước')) tagClass = 'tag-hook-comedy';
      else if ((hook.type || '').includes('POV')) tagClass = 'tag-hook-pov';

      const isChecked = state.selectedHookIds.has(hook.id);

      return `
        <tr data-hook-id="${hook.id}" class="${isChecked ? 'row-selected' : ''}">
          <td style="text-align: center;">
            <input type="checkbox" class="form-checkbox hook-row-checkbox" value="${hook.id}" ${isChecked ? 'checked' : ''}>
          </td>
          <td>
            <div class="hook-quote-text">"${hook.hookText}"</div>
          </td>
          <td>
            <span class="${tagClass}">${hook.type || 'Cảnh Báo'}</span>
          </td>
          <td>
            <span style="font-weight: 500; color: var(--text-main); font-size: 0.88rem;">${hook.sku || 'Farmstay Retinol Cream'}</span>
          </td>
        </tr>
      `;
    }).join('');

    // Check all box state
    if (DOM.hookCheckAllBox) {
      const allSelected = hooks.length > 0 && hooks.every(h => state.selectedHookIds.has(h.id));
      DOM.hookCheckAllBox.checked = allSelected;
    }

    updateHookBatchBar();

    // Row events: Click row opens edit modal (Screenshot 2: "Nhấp vào dòng để chỉnh sửa")
    DOM.hookTableTbody.querySelectorAll('tr[data-hook-id]').forEach(row => {
      const hookId = row.getAttribute('data-hook-id');

      row.addEventListener('click', (e) => {
        if (e.target.closest('.hook-row-checkbox')) return;
        openEditHookModal(hookId);
      });

      const cb = row.querySelector('.hook-row-checkbox');
      if (cb) {
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          if (cb.checked) {
            state.selectedHookIds.add(hookId);
          } else {
            state.selectedHookIds.delete(hookId);
          }
          if (DOM.hookCheckAllBox) {
            DOM.hookCheckAllBox.checked = hooks.every(h => state.selectedHookIds.has(h.id));
          }
          updateHookBatchBar();
        });
      }
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

    // 3. Hook Check All Box
    if (DOM.hookCheckAllBox) {
      DOM.hookCheckAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        if (DOM.hookTableTbody) {
          DOM.hookTableTbody.querySelectorAll('.hook-row-checkbox').forEach(cb => {
            cb.checked = isChecked;
            if (isChecked) state.selectedHookIds.add(cb.value);
            else state.selectedHookIds.delete(cb.value);
          });
        }
        updateHookBatchBar();
      });
    }

    // 3.1 Hook Batch Delete (matching Screenshot 2: [Xóa])
    if (DOM.btnBatchDeleteHook) {
      DOM.btnBatchDeleteHook.addEventListener('click', () => {
        const count = state.selectedHookIds.size;
        if (count === 0) return;
        if (confirm(`Bạn có chắc muốn xóa ${count} câu hook đã chọn khỏi kho?`)) {
          state.hooks = state.hooks.filter(h => !state.selectedHookIds.has(h.id));
          state.selectedHookIds.clear();
          renderHooksList();
          updatePipelineHookSelects();
          showToast(`Đã xóa ${count} câu hook thành công!`, 'info');
        }
      });
    }

    // 3.2 Hook Batch Deselect (matching Screenshot 2: [Bỏ chọn])
    if (DOM.btnBatchDeselectHook) {
      DOM.btnBatchDeselectHook.addEventListener('click', () => {
        state.selectedHookIds.clear();
        renderHooksList();
      });
    }

    // 4. AI Generate Button"""

code = re.sub(old_hooks_code_pattern, lambda m: new_hooks_code, code)

# ----------------------------------------------------
# 8. Update Step 4 functions (updateEngineSkuInfoBox & renderPackshotsForSelectedFolder)
# ----------------------------------------------------
old_step4_pattern = r'function updateEngineSkuInfoBox\(folderId\) \{[\s\S]*?function renderPackshotsForSelectedFolder\(folderId\) \{[\s\S]*?function renderEngineModelPhotos'

new_step4_code = """function updateEngineSkuInfoBox(folderId) {
    const folder = state.productFolders.find(f => f.id === folderId);
    if (!folder) return;

    const sku = folder.skuInfo || {};
    if (DOM.engineSkuCode) DOM.engineSkuCode.textContent = sku.code || 'SKU-01';
    if (DOM.engineSkuTitle) DOM.engineSkuTitle.textContent = sku.name || folder.name;
    if (DOM.engineSkuOrigin) DOM.engineSkuOrigin.textContent = sku.origin || 'Phân phối chính ngạch bởi Mỹ Nguyên TSC • Xuất xứ: Hàn Quốc';
    if (DOM.engineSkuPrice) DOM.engineSkuPrice.textContent = sku.price || folder.price || '249.000đ';
    if (DOM.engineSkuDesc) DOM.engineSkuDesc.textContent = sku.description || folder.description || '';

    const uspList = sku.uspList && sku.uspList.length > 0
      ? sku.uspList
      : (sku.usp ? sku.usp.split(/[,;\\n]/).map(s => s.trim()).filter(Boolean) : ['Rau má Cica hữu cơ Jeju', 'Dịu da sau 20 phút', 'Tem phụ chính ngạch Mỹ Nguyên TSC']);

    if (DOM.engineSkuUspTags) {
      DOM.engineSkuUspTags.innerHTML = uspList.map(u => `
        <span class="badge-tag" style="background: var(--color-success-bg); color: var(--color-success); font-size: 0.68rem; border: 1px solid var(--color-success-border); font-weight: 600;">✨ ${u}</span>
      `).join('');
    }

    // Enrich prompt
    if (DOM.img2vidPromptInput && uspList.length > 0) {
      const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
      const model = state.modelFolders.find(m => m.id === modelId);
      const modelMention = model ? ` cùng model ${model.name}` : '';

      DOM.img2vidPromptInput.value = `Làm video TikTok 15–25 giây cho sản phẩm ${folder.name}${modelMention}. Nổi bật công dụng: ${uspList.join(', ')}. Giữ nguyên 100% tem phụ chính ngạch Mỹ Nguyên TSC, phong cách sang trọng.`;
    }
  }

  function renderPackshotsForSelectedFolder(folderId) {
    if (!DOM.enginePackshotSelector) return;
    const folderFiles = (state.driveFiles || []).filter(f => f.folderId === folderId && f.type === 'image');
    const displayFiles = folderFiles.length > 0 ? folderFiles : (state.driveFiles || []).filter(f => f.type === 'image').slice(0, 4);

    const packshotLabels = [
      'Góc chính diện 90°',
      'Tem phụ tiếng Việt',
      'Góc nghiêng 45°',
      'Texture chất kem'
    ];

    DOM.enginePackshotSelector.innerHTML = displayFiles.map((file, idx) => {
      const badgeText = packshotLabels[idx % packshotLabels.length];
      return `
        <div class="packshot-select-thumb ${idx === 0 ? 'selected' : ''}" data-img="${file.thumb}" data-title="${file.name}" data-badge="${badgeText}" title="${file.name} - ${badgeText}">
          <img src="${file.thumb}" alt="${file.name}" onerror="this.onerror=null; this.src='media/image/farmstay_retinol_box.jpg';">
          <span class="packshot-badge-tag">${badgeText}</span>
        </div>
      `;
    }).join('');

    DOM.enginePackshotSelector.querySelectorAll('.packshot-select-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        DOM.enginePackshotSelector.querySelectorAll('.packshot-select-thumb').forEach(t => t.classList.remove('selected'));
        thumb.classList.add('selected');
        const badge = thumb.getAttribute('data-badge');
        if (DOM.packshotSelectedLabel) {
          DOM.packshotSelectedLabel.textContent = `Đã chọn: ${badge}`;
        }
        showToast(`Đã chọn ảnh packshot: ${thumb.getAttribute('data-title')} (${badge})`, 'info');
      });
    });
  }

  function renderEngineModelPhotos"""

code = re.sub(old_step4_pattern, lambda m: new_step4_code, code)

# ----------------------------------------------------
# 9. Update Step 4 helper buttons in setupImageToVideoPipeline
# ----------------------------------------------------
step4_btns_target = """    // Populate Model Folders (Step 5 - Todo8: Đơn giản 1 dropdown duy nhất)"""

step4_btns_replacement = """    // Step 4 Helper buttons (Todo14 Item 3)
    if (DOM.btnGotoProductDrive) {
      DOM.btnGotoProductDrive.addEventListener('click', () => {
        switchPanel('panel-vault-drive');
        const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : 'folder_all';
        state.activeDriveFolderId = folderId;
        renderDriveFolderPills();
        renderDriveFolderView();
        showToast('Đã chuyển đến Thư mục Sản phẩm trong Kho Drive!', 'info');
      });
    }

    if (DOM.btnUploadMorePackshot) {
      DOM.btnUploadMorePackshot.addEventListener('click', () => {
        showToast('Mở hộp thoại tải lên ảnh bao bì mới cho sản phẩm...', 'info');
      });
    }

    // Populate Model Folders (Step 5 - Todo8: Đơn giản 1 dropdown duy nhất)"""

assert step4_btns_target in code, "Failed to find step4_btns_target"
code = code.replace(step4_btns_target, step4_btns_replacement)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("All modifications to prototype/app.js applied successfully!")
