import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("Updating index.html...")
with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ------------------------------------------------------------------------------
# 1. Update #panel-vault-hooks
# ------------------------------------------------------------------------------
old_hooks_panel_pattern = re.compile(
    r'<div id="panel-vault-hooks" class="stage-view-panel">.*?</div>\s*<!-- =====+\s*6\. KHO ẢNH',
    re.DOTALL
)

new_hooks_panel = '''<div id="panel-vault-hooks" class="stage-view-panel">
        <!-- Header matching Screenshot 1 -->
        <div class="hook-vault-header">
          <div>
            <h2 class="hook-page-title">Kho Câu Hook TikTok</h2>
            <p class="hook-page-desc">Thư viện các câu mở đầu 0–3 giây giữ chân người xem theo từng sản phẩm.</p>
          </div>
          <div class="hook-vault-top-actions">
            <button class="btn btn-hook-outline" id="btn-hook-ai-generate">AI Tạo Hook Theo SKU</button>
            <button class="btn btn-hook-dark" id="btn-create-hook">+ Thêm Hook Mới</button>
          </div>
        </div>

        <!-- Filter Card matching Screenshot 1 -->
        <div class="hook-filter-card">
          <div class="hook-search-sku-row">
            <div class="hook-search-input-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" id="hook-search-input" placeholder="Tìm theo câu thoại, từ khóa sản phẩm..." class="hook-search-input">
            </div>
            <select id="hook-sku-select" class="hook-sku-select">
              <option value="all">Tất cả SKU Sản Phẩm</option>
              <option value="Farmstay Retinol Revive Cream">Farmstay Retinol Revive Cream (SKU-05)</option>
              <option value="Farmstay Toner Rau Má">Farmstay Toner Rau Má (SKU-01)</option>
              <option value="Collagen Ampoule">Collagen Ampoule (SKU-02)</option>
              <option value="Sehwa Sunscreen">Sehwa Sunscreen (SKU-03)</option>
              <option value="Farmstay Clear">Farmstay Clear (SKU-04)</option>
            </select>
          </div>

          <!-- Category Tabs without Emojis matching Screenshot 1 -->
          <div class="hook-category-tabs-bar" id="hook-category-tabs-bar">
            <button class="hook-cat-tab active" data-cat="all">Tất Cả Thể Loại</button>
            <button class="hook-cat-tab" data-cat="Bóc Phốt / Cảnh Báo">Bóc Phốt / Cảnh Báo</button>
            <button class="hook-cat-tab" data-cat="Chuyên Gia Da Liễu">Chuyên Gia Da Liễu</button>
            <button class="hook-cat-tab" data-cat="Visual Glass Skin">Visual Glass Skin</button>
            <button class="hook-cat-tab" data-cat="Hài Hước Gen Z">Hài Hước Gen Z</button>
            <button class="hook-cat-tab" data-cat="POV Trải Nghiệm">POV Trải Nghiệm</button>
            <button class="hook-cat-tab" data-cat="Night Routine">Night Routine</button>
          </div>
        </div>

        <!-- Hooks Cards Stack matching Screenshot 1 -->
        <div class="hook-cards-stack" id="cstage-hooks-grid"></div>
      </div>

      <!-- ===============================================================
           6. KHO ẢNH'''

html = old_hooks_panel_pattern.sub(new_hooks_panel, html)

# ------------------------------------------------------------------------------
# 2. Update #modal-hook-editor matching Screenshot 3
# ------------------------------------------------------------------------------
old_modal_hook_pattern = re.compile(
    r'<div class="modal-backdrop" id="modal-hook-editor".*?</div>\s*</div>\s*</div>\s*<!-- MODAL: TẢI LÊN FILE KỊCH BẢN -->',
    re.DOTALL
)

new_modal_hook = '''<div class="modal-backdrop" id="modal-hook-editor" style="display: none;">
    <div class="modal-dialog" style="max-width: 580px;">
      <div class="modal-header" style="align-items: flex-start;">
        <div>
          <div class="modal-title" id="hook-modal-title" style="font-size: 1.18rem; font-weight: 800; color: var(--text-main);">Chỉnh Sửa Câu Hook</div>
          <div style="font-size: 0.83rem; color: var(--text-muted); margin-top: 3px;">Cập nhật lời thoại, góc quay và sản phẩm liên kết của câu mở đầu 0–3s.</div>
        </div>
        <button class="modal-close-btn" data-close="modal-hook-editor" style="font-size: 1.4rem; line-height: 1;">&times;</button>
      </div>
      <div class="modal-body" style="display: flex; flex-direction: column; gap: 1rem; padding: 1.25rem 1.5rem;">
        <input type="hidden" id="hook-edit-id" value="">
        
        <!-- Field 1: Lời thoại câu Hook -->
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; display: block; color: var(--text-main);">
            Lời thoại câu Hook (0 – 3 Giây Mở Đầu) <span style="color: #ef4444;">*</span>
          </label>
          <textarea class="form-textarea" id="hook-text-input" rows="3" style="font-size: 0.88rem; line-height: 1.45; resize: vertical;" placeholder="Dừng lại ngay nếu bạn đang thoa kem phục hồi mà da càng ngày càng khô sạm và nổi mụn!"></textarea>
        </div>

        <!-- Field 2: Góc Tiếp Cận & SKU liên kết -->
        <div class="grid-2" style="gap: 1rem; grid-template-columns: 1fr 1fr;">
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; display: block; color: var(--text-main);">
              Góc Tiếp Cận (Thể Loại)
            </label>
            <select class="form-select" id="hook-type-select" style="height: 40px; font-size: 0.86rem;">
              <option value="Bóc Phốt / Cảnh Báo">Bóc Phốt / Cảnh Báo</option>
              <option value="Chuyên Gia Da Liễu">Chuyên Gia Da Liễu</option>
              <option value="Visual Glass Skin">Visual Glass Skin</option>
              <option value="Hài Hước Gen Z">Hài Hước Gen Z</option>
              <option value="POV Trải Nghiệm">POV Trải Nghiệm</option>
              <option value="Night Routine">Night Routine</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; display: block; color: var(--text-main);">
              Sản Phẩm Liên Kết (SKU)
            </label>
            <select class="form-select" id="hook-sku-select-modal" style="height: 40px; font-size: 0.86rem;">
              <option value="Farmstay Retinol Revive Cream (SKU-05)">Farmstay Retinol Revive Cream (SKU-05)</option>
              <option value="Farmstay Toner Rau Má (SKU-01)">Farmstay Toner Rau Má (SKU-01)</option>
              <option value="Collagen Ampoule (SKU-02)">Collagen Ampoule (SKU-02)</option>
              <option value="Sehwa Sunscreen (SKU-03)">Sehwa Sunscreen (SKU-03)</option>
              <option value="Farmstay Clear (SKU-04)">Farmstay Clear (SKU-04)</option>
            </select>
          </div>
        </div>

        <!-- Field 3: Gợi ý cảnh quay visual -->
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; display: block; color: var(--text-main);">
            Gợi ý Cảnh Quay Visual 0–3s Đầu
          </label>
          <textarea class="form-textarea" id="hook-visual-input" rows="2" style="font-size: 0.88rem; line-height: 1.45; resize: vertical;" placeholder="Cận cảnh soi gương biểu cảm giật mình, zoom nhanh vào hũ kem Retinol."></textarea>
        </div>

        <!-- Field 4: Target & SFX -->
        <div class="grid-2" style="gap: 1rem; grid-template-columns: 1fr 1fr;">
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; display: block; color: var(--text-main);">
              Chân Dung Khách Hàng (Target)
            </label>
            <input type="text" class="form-input" id="hook-persona-input" style="height: 40px; font-size: 0.86rem;" placeholder="Nữ 25–40 tuổi">
          </div>
          <div>
            <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.4rem; display: block; color: var(--text-main);">
              Âm Thanh / SFX Đề Xuất
            </label>
            <input type="text" class="form-input" id="hook-sound-input" style="height: 40px; font-size: 0.86rem;" placeholder="Dramatic Whoosh">
          </div>
        </div>
      </div>
      <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1rem 1.5rem; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-ghost" data-close="modal-hook-editor" style="font-weight: 600; color: var(--text-muted); padding: 0.5rem 1rem;">Hủy</button>
        <button class="btn btn-dark-modal-save" id="btn-save-hook-modal">Lưu Thay Đổi</button>
      </div>
    </div>
  </div>

  <!-- MODAL: TẢI LÊN FILE KỊCH BẢN -->'''

html = old_modal_hook_pattern.sub(new_modal_hook, html)

# ------------------------------------------------------------------------------
# 3. Update Module 1 Right Column: Standby State & Post-Render Flow
# ------------------------------------------------------------------------------
# Update status badge in preview header
html = html.replace(
    '<span class="badge-tag" style="background: var(--color-success-bg); color: var(--color-success); border: 1px solid var(--color-success-border);">PREVIEW SẴN SÀNG</span>',
    '<span class="badge-tag" id="engine-status-badge" style="background: var(--bg-surface-subtle); color: var(--text-dim); border: 1px solid var(--border-default); font-weight: 700;">CHỜ KHỞI TẠO (STANDBY)</span>'
)

# Replace mockup-standby-screen with enhanced dynamic composition standby
old_standby_screen = '''              <!-- 1. Standby Screen Before Gen (Item 5) -->
              <div class="mockup-standby-screen" id="engine-standby-screen">
                <div class="standby-radar-pulse">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <div class="standby-title">Sẵn sàng khởi tạo video</div>
                <div class="standby-desc">Chọn cấu hình 5 bước bên trái và nhấn nút "Bắt Đầu Dựng Video" để kích hoạt AI Render Pipeline.</div>
                <div style="margin-top: 1.25rem; display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: center;">
                  <span class="badge-tag" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); font-size: 0.7rem;">9:16 TikTok</span>
                  <span class="badge-tag" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); font-size: 0.7rem;">1080 x 1920</span>
                  <span class="badge-tag" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15); font-size: 0.7rem;">60 FPS</span>
                </div>
              </div>'''

new_standby_screen = '''              <!-- 1. Standby Screen Before Gen: Dynamic Pre-Render Composition Canvas -->
              <div class="mockup-standby-screen" id="engine-standby-screen">
                <!-- 3D Studio Background with Product Packshot Preview -->
                <div class="standby-comp-backdrop">
                  <div class="standby-glow-spot"></div>
                  <div class="standby-sku-preview-box">
                    <img id="standby-sku-img" src="media/image/farmstay_retinol_box.jpg" alt="SKU Preview">
                    <div class="standby-pack-badge" id="standby-pack-badge">TEM PHỤ TIẾNG VIỆT</div>
                  </div>
                </div>

                <!-- Floating Model Tag Overlay -->
                <div class="standby-model-pill" id="standby-model-tag">
                  <span>Model: Dược Sĩ Mai Lan (Chính Diện)</span>
                </div>

                <!-- Floating Hook Overlay Preview -->
                <div class="standby-hook-banner" id="standby-hook-preview">
                  <span class="standby-hook-label">HOOK 0–3S DỰ KIẾN:</span>
                  <span class="standby-hook-text" id="standby-hook-txt">"Dừng lại ngay nếu bạn đang thoa kem phục hồi mà da càng khô sạm..."</span>
                </div>

                <!-- Center Standby Hint Overlay -->
                <div class="standby-action-center">
                  <div class="standby-radar-pulse">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <div class="standby-title">Khung Phối Cảnh Sẵn Sàng</div>
                  <div class="standby-desc">Nhấn "BẮT ĐẦU THỰC HIỆN DỰNG VIDEO" bên trái để AI render chuyển động 3D & lồng tiếng.</div>
                </div>

                <div class="standby-bottom-tech-tags">
                  <span class="badge-tag">9:16 TikTok</span>
                  <span class="badge-tag">1080 x 1920</span>
                  <span class="badge-tag">60 FPS</span>
                  <span class="badge-tag" style="color: #38bdf8; border-color: rgba(56,189,248,0.3);">GPU 3D Engine</span>
                </div>
              </div>'''

if old_standby_screen in html:
    html = html.replace(old_standby_screen, new_standby_screen)
else:
    print("Warning: old_standby_screen exact match not found, checking regex")
    html = re.sub(
        r'<div class="mockup-standby-screen" id="engine-standby-screen">.*?</div>\s*<!-- 2\. Multi-step',
        new_standby_screen + '\n\n              <!-- 2. Multi-step',
        html,
        flags=re.DOTALL
    )

# Replace the post-mockup buttons container
old_post_mockup_btns = '''            <div style="margin-top: 1.25rem; text-align: center;">
              <button class="btn btn-primary btn-save-finished-video" id="btn-save-img2vid-finished"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Lưu Vào Kho Video Thành Phẩm</button>
            </div>'''

new_post_mockup_btns = '''            <!-- Pre-render hint (Visible in Standby State) -->
            <div id="engine-pre-render-info" style="margin-top: 1.15rem; text-align: center;">
              <div style="font-size: 0.82rem; color: var(--text-muted); background: var(--bg-surface-subtle); padding: 0.65rem 1rem; border-radius: var(--radius-md); border: 1px dashed var(--border-default);">
                ⚙️ Cấu hình render đã sẵn sàng • Bấm nút <strong>"BẮT ĐẦU THỰC HIỆN DỰNG VIDEO"</strong> bên trái để kích hoạt AI Render Pipeline.
              </div>
            </div>

            <!-- Post-render Action Group (Visible only AFTER generation completed) -->
            <div id="engine-post-render-actions" style="display: none; margin-top: 1.25rem;">
              <button class="btn btn-primary btn-save-finished-video" id="btn-save-img2vid-finished" style="width: 100%; justify-content: center; height: 46px; font-size: 0.92rem;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Lưu Vào Kho Video Thành Phẩm
              </button>
              <button class="btn btn-outline" id="btn-reset-img2vid-render" style="width: 100%; margin-top: 0.5rem; justify-content: center; font-size: 0.84rem; font-weight: 600;">
                🔄 Tạo Video Mới / Đổi Cấu Hình Khác
              </button>
            </div>'''

if old_post_mockup_btns in html:
    html = html.replace(old_post_mockup_btns, new_post_mockup_btns)
else:
    print("Warning: old_post_mockup_btns exact match not found, using regex")
    html = re.sub(
        r'<div style="margin-top: 1\.25rem; text-align: center;">\s*<button class="btn btn-primary btn-save-finished-video" id="btn-save-img2vid-finished".*?</button>\s*</div>',
        new_post_mockup_btns,
        html,
        flags=re.DOTALL
    )

with open('prototype/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html updated successfully.")
