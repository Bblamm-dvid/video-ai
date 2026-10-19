import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update DOM caching to include the new script table and detail editor elements
dom_marker = "const DOM = {"
dom_additions = '''const DOM = {
    // Todo 13: Kho Kịch Bản Video Elements (Matching Anh 1 & 2)
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
    editorScenesContainer: document.getElementById('editor-scenes-container'),
'''

code = code.replace(dom_marker, dom_additions, 1)

# 2. In state, track activeScriptTab, activeScriptSearch, activeScriptSku
code = code.replace(
    "activeScriptFolder: 'all',",
    "activeScriptFolder: 'all',\n    activeScriptTab: 'all',\n    activeScriptSearch: '',\n    activeScriptSku: 'all',\n    activeEditingScriptId: 'ANGLE_01',"
)

# 3. Overhaul renderScriptsVault and add openScriptDetailedEditor & table handlers
old_scripts_section_start = "  function renderScriptsVault() {"

new_scripts_section = '''  /* ==========================================================================
     KHO KỊCH BẢN VIDEO - TABLE & DETAILED SCENE EDITOR (MATCHING ANH 1 & 2)
     ========================================================================== */
  function renderScriptsVault() {
    renderScriptsTable();
    setupScriptTableEvents();
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
        if (tab === 'ASMR') return (s.group || '').includes('ASMR') || (s.group || '').includes('Trải Nghiệm');
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

    if (scripts.length === 0) {
      DOM.scriptTableTbody.innerHTML = `
        <tr>
          <td colspan="7" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            Không tìm thấy kịch bản nào phù hợp với bộ lọc.
          </td>
        </tr>
      `;
      return;
    }

    DOM.scriptTableTbody.innerHTML = scripts.map((script, idx) => {
      // Group tag class
      let groupClass = 'tag-group-edu';
      if ((script.group || '').includes('ASMR') || (script.group || '').includes('Trải Nghiệm')) groupClass = 'tag-group-asmr';
      else if ((script.group || '').includes('POV') || (script.group || '').includes('Trend')) groupClass = 'tag-group-trend';
      else if ((script.group || '').includes('Giới Thiệu')) groupClass = 'tag-group-intro';

      // Status pill
      let statusClass = 'status-pill-ready';
      if (script.statusCode === 'testing' || script.status === 'Đang thử nghiệm') statusClass = 'status-pill-testing';
      else if (script.statusCode === 'draft' || script.status === 'Bản nháp') statusClass = 'status-pill-draft';

      return `
        <tr data-script-id="${script.id}">
          <td style="text-align: center;">
            <input type="checkbox" class="form-checkbox script-row-checkbox" value="${script.id}">
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
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">${script.scenesCount || (script.scenes || []).length || 4} Cảnh</div>
            <div style="font-size: 0.76rem; color: var(--text-dim); font-family: var(--font-mono);">• ${script.duration || '45s'}</div>
          </td>
          <td>
            <span class="${statusClass}">${script.status || 'Sẵn sàng'}</span>
          </td>
          <td>
            <div class="script-table-actions">
              <button class="btn-table-detail btn-open-script-detail" data-id="${script.id}">Chi Tiết</button>
              <button class="btn-table-create-video btn-script-make-video" data-id="${script.id}">Tạo Video</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach actions to table rows
    DOM.scriptTableTbody.querySelectorAll('.btn-open-script-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const scriptId = btn.getAttribute('data-id');
        openScriptDetailedEditor(scriptId);
      });
    });

    DOM.scriptTableTbody.querySelectorAll('.btn-script-make-video').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const scriptId = btn.getAttribute('data-id');
        useScriptToGenerateVideo(scriptId);
      });
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
          });
        }
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

    // 6. Detail Editor Back Button
    if (DOM.btnBackToScriptList) {
      DOM.btnBackToScriptList.addEventListener('click', () => {
        if (DOM.scriptDetailEditorView) DOM.scriptDetailEditorView.style.display = 'none';
        if (DOM.scriptListMainView) DOM.scriptListMainView.style.display = 'block';
      });
    }

    // 7. Save Script in Detail Editor
    if (DOM.btnEditorSaveScript) {
      DOM.btnEditorSaveScript.addEventListener('click', () => {
        showToast('Đã lưu kịch bản và phân cảnh thành công!', 'success');
      });
    }

    // 8. Create Video from Detail Editor
    if (DOM.btnEditorCreateVideo) {
      DOM.btnEditorCreateVideo.addEventListener('click', () => {
        useScriptToGenerateVideo(state.activeEditingScriptId);
      });
    }

    // 9. Add scene button
    if (DOM.btnEditorAddScene) {
      DOM.btnEditorAddScene.addEventListener('click', () => {
        addNewSceneToEditor();
      });
    }
  }

  function openScriptDetailedEditor(scriptId) {
    const script = (state.scripts || []).find(s => s.id === scriptId) || state.scripts[0];
    if (!script) return;

    state.activeEditingScriptId = script.id;

    if (DOM.scriptListMainView) DOM.scriptListMainView.style.display = 'none';
    if (DOM.scriptDetailEditorView) DOM.scriptDetailEditorView.style.display = 'block';

    if (DOM.editorScriptTitle) DOM.editorScriptTitle.textContent = script.title;
    if (DOM.editorScriptSku) DOM.editorScriptSku.textContent = script.sku || 'Farmstay SKU';
    if (DOM.editorScriptDuration) DOM.editorScriptDuration.textContent = script.duration || '45s';
    if (DOM.editorScriptStatus) {
      DOM.editorScriptStatus.textContent = script.status === 'Sẵn sàng' ? 'Sẵn sàng dựng' : (script.status || 'Sẵn sàng');
    }

    // Render Scenes
    renderDetailedScenes(script);
  }

  function renderDetailedScenes(script) {
    if (!DOM.editorScenesContainer) return;

    let scenes = script.scenes || [];
    if (scenes.length === 0) {
      scenes = [
        {
          sceneNum: 1,
          title: "Cảnh Mở Đầu (The Hook)",
          timeRange: "0 – 3s",
          duration: "3 giây",
          visual: "Cận cảnh khuôn mặt nữ hoảng hốt nhìn nốt mụn sưng đỏ trước gương, camera zoom nhanh 1.2x.",
          voice: script.hook || "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!",
          effects: 'Text to: "CÀNG TRỊ CÀNG MỤN?". Âm thanh: Tiếng cảnh báo giật mình.'
        },
        {
          sceneNum: 2,
          title: "Phân Tích Cơ Chế Khoa Học",
          timeRange: "3 – 15s",
          duration: "12 giây",
          visual: "Mô hình 3D biểu bì da bị mất nước và vi khuẩn xâm nhập khi hàng rào lipid bị bào mòn.",
          voice: "Khi hàng rào lipid tự nhiên bị phá vỡ do dùng chất tẩy mạnh, vi khuẩn xâm nhập gây viêm dai dẳng.",
          effects: 'Đồ họa 3D zoom xuyên lớp biểu bì. Text nhấp nháy: "MÀNG LIPID TỔN THƯƠNG".'
        },
        {
          sceneNum: 3,
          title: "Giải Pháp & Trải Nghiệm Thực Tế",
          timeRange: "15 – 35s",
          duration: "20 giây",
          visual: "Model lấy một lượng toner Farmstay vỗ nhẹ lên da, giọt dưỡng chất ngậm nước thẩm thấu tức thì.",
          voice: "Chỉ cần cấp ẩm cân bằng dịu nhẹ với chiết xuất rau má Cica hữu cơ, da sẽ tự làm dịu và phục hồi sau 20 phút.",
          effects: 'Hiệu ứng nước bắn 3D điện ảnh. Nhạc nền nhẹ nhàng thư thái.'
        },
        {
          sceneNum: 4,
          title: "Kêu Gọi Mua Hàng (CTA)",
          timeRange: "35 – 45s",
          duration: "10 giây",
          visual: "Cận cảnh chai sản phẩm có tem phụ tiếng Việt Mỹ Nguyên TSC, trỏ tay xuống góc dưới màn hình.",
          voice: "Bấm ngay vào giỏ hàng góc trái để nhận ưu đãi độc quyền trợ giá 40% chỉ có trên phiên livestream này!",
          effects: 'Hiệu ứng mũi tên nhấp nháy trỏ vào giỏ hàng TikTok Shop.'
        }
      ];
    }

    const hookVariants = script.hookVariants || [
      { id: "hook_a", name: "Hook A (Nỗi sợ)", text: script.hook || "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!" },
      { id: "hook_b", name: "Hook B (Tò mò)", text: "Có bao giờ bạn thắc mắc tại sao thoa đủ loại kem mà mụn vẫn thi nhau biểu tình?" },
      { id: "hook_c", name: "Hook C (Trực diện)", text: "Cảnh báo: 90% chị em đang trị mụn sai cách khiến hàng rào bảo vệ da sụp đổ!" }
    ];

    DOM.editorScenesContainer.innerHTML = scenes.map((scene, sIdx) => {
      const isHookScene = sIdx === 0;

      return `
        <div class="scene-editor-card" data-scene-index="${sIdx}">
          <div class="scene-card-header">
            <div class="scene-badge-title">
              <span class="scene-pill-badge">SCENE 0${scene.sceneNum || (sIdx + 1)}</span>
              <span class="scene-name-title">${scene.title || 'Phân Cảnh Kịch Bản'}</span>
              <span class="scene-timerange-tag">${scene.timeRange || '0 – 3s'}</span>
            </div>
            <div class="scene-duration-label">Thời lượng: ${scene.duration || '3 giây'}</div>
          </div>

          ${isHookScene ? `
            <div class="scene-hook-variants-row">
              <span class="variants-label">Biến thể Hook mở đầu:</span>
              <div class="variants-pills" id="scene-hook-variants-pills">
                ${hookVariants.map((v, vIdx) => `
                  <button class="variant-pill-btn ${vIdx === 0 ? 'active' : ''}" data-hook-text="${v.text}">
                    ${v.name}
                  </button>
                `).join('')}
                <button class="variant-pill-btn add-new" id="btn-add-hook-variant">+ Thêm Hook</button>
              </div>
            </div>
          ` : ''}

          <div class="scene-field-group">
            <label class="scene-field-label">Visual / Bối cảnh</label>
            <textarea class="scene-textarea" rows="2">${scene.visual || ''}</textarea>
          </div>

          <div class="scene-field-group">
            <label class="scene-field-label">Lời thoại (Voice Script)</label>
            <textarea class="scene-textarea scene-voice-textarea" rows="2">${scene.voice || ''}</textarea>
          </div>

          <div class="scene-field-group">
            <label class="scene-field-label">Chữ hiển thị & Hiệu ứng</label>
            <textarea class="scene-textarea" rows="2">${scene.effects || ''}</textarea>
          </div>
        </div>
      `;
    }).join('');

    // Attach hook variant button switching
    const hookVariantBtns = DOM.editorScenesContainer.querySelectorAll('#scene-hook-variants-pills .variant-pill-btn:not(.add-new)');
    const voiceTextarea = DOM.editorScenesContainer.querySelector('.scene-voice-textarea');

    hookVariantBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        hookVariantBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const text = btn.getAttribute('data-hook-text');
        if (voiceTextarea && text) {
          voiceTextarea.value = text;
          showToast(`Đã áp dụng ${btn.textContent.trim()} vào lời thoại!`, 'info');
        }
      });
    });

    const addHookBtn = DOM.editorScenesContainer.querySelector('#btn-add-hook-variant');
    if (addHookBtn) {
      addHookBtn.addEventListener('click', () => {
        const customHook = prompt('Nhập nội dung biến thể Hook mới:');
        if (customHook && customHook.trim()) {
          const newBtn = document.createElement('button');
          newBtn.className = 'variant-pill-btn';
          newBtn.textContent = `Hook ${String.fromCharCode(65 + hookVariantBtns.length)} (Mới)`;
          newBtn.setAttribute('data-hook-text', customHook.trim());
          newBtn.addEventListener('click', () => {
            DOM.editorScenesContainer.querySelectorAll('.variant-pill-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');
            if (voiceTextarea) voiceTextarea.value = customHook.trim();
          });
          addHookBtn.parentNode.insertBefore(newBtn, addHookBtn);
          showToast('Đã thêm biến thể hook mới!', 'success');
        }
      });
    }
  }

  function addNewSceneToEditor() {
    if (!DOM.editorScenesContainer) return;
    const currentCount = DOM.editorScenesContainer.querySelectorAll('.scene-editor-card').length + 1;
    const card = document.createElement('div');
    card.className = 'scene-editor-card';
    card.setAttribute('data-scene-index', currentCount - 1);
    card.innerHTML = `
      <div class="scene-card-header">
        <div class="scene-badge-title">
          <span class="scene-pill-badge">SCENE 0${currentCount}</span>
          <span class="scene-name-title">Phân Cảnh Mới #${currentCount}</span>
          <span class="scene-timerange-tag">Thời lượng tùy chỉnh</span>
        </div>
        <div class="scene-duration-label">Thời lượng: 10 giây</div>
      </div>
      <div class="scene-field-group">
        <label class="scene-field-label">Visual / Bối cảnh</label>
        <textarea class="scene-textarea" rows="2" placeholder="Mô tả chuyển động góc quay camera, sản phẩm hoặc người mẫu..."></textarea>
      </div>
      <div class="scene-field-group">
        <label class="scene-field-label">Lời thoại (Voice Script)</label>
        <textarea class="scene-textarea" rows="2" placeholder="Nhập lời thoại AI lồng tiếng..."></textarea>
      </div>
      <div class="scene-field-group">
        <label class="scene-field-label">Chữ hiển thị & Hiệu ứng</label>
        <textarea class="scene-textarea" rows="2" placeholder="Text phụ đề, hiệu ứng âm thanh và chuyển cảnh..."></textarea>
      </div>
    `;
    DOM.editorScenesContainer.appendChild(card);
    showToast(`Đã thêm phân cảnh SCENE 0${currentCount}!`, 'success');
    card.scrollIntoView({ behavior: 'smooth' });
  }

  function useScriptToGenerateVideo(scriptId) {
    const script = (state.scripts || []).find(s => s.id === scriptId) || state.scripts[0];
    if (!script) return;

    // Switch panel to panel-multi-engine
    switchPanel('panel-multi-engine');

    // Pre-select script in dropdown
    if (DOM.img2vidScriptSelect) {
      DOM.img2vidScriptSelect.value = script.id;
    }

    // Set prompt
    if (DOM.img2vidPromptInput) {
      DOM.img2vidPromptInput.value = `Làm video TikTok ${script.duration || '25-35 giây'} cho sản phẩm ${script.sku || 'Farmstay'}. Kịch bản: "${script.title}". Hook mở đầu: "${script.hook || ''}". Hiệu ứng điện ảnh 3D chuyển động mượt mà.`;
    }

    showToast(`Đã nạp kịch bản "${script.title}" vào Xưởng Dựng Video!`, 'success');
  }
'''

# Find where renderScriptsVault was defined and replace it
s_idx = code.find(old_scripts_section_start)
if s_idx != -1:
    # find next section start or end of renderScriptsVault
    # It ends before function setupScriptModalHandlers()
    e_idx = code.find('  function setupScriptModalHandlers()', s_idx)
    code = code[:s_idx] + new_scripts_section + '\n  ' + code[e_idx:]

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated app.js for todo13 successfully!")
