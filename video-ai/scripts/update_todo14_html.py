import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("Updating index.html...")
with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ------------------------------------------------------------------------------
# 1. Update #panel-vault-angles (Kho Kịch Bản - Matching Image 1)
# ------------------------------------------------------------------------------
old_script_panel_pattern = re.compile(
    r'<div id="panel-vault-angles" class="stage-view-panel">.*?</div>\s*<!-- ===============================================================\s*5\. KHO CÂU HOOK',
    re.DOTALL
)

new_script_panel = '''<div id="panel-vault-angles" class="stage-view-panel">

        <!-- ===========================================================
             VIEW 1: DANH SÁCH BẢNG KỊCH BẢN (MATCHING ẢNH 1)
             =========================================================== -->
        <div id="script-list-main-view">
          <div class="script-vault-header">
            <div>
              <div class="script-brand-sub">MỸ NGUYÊN TSC / CONTENT FACTORY</div>
              <h2 class="script-page-title">Kho Kịch Bản Video <span class="script-count-tag" id="script-count-badge">(4 kịch bản)</span></h2>
            </div>
            <div class="script-vault-top-actions">
              <button class="btn btn-script-outline" id="btn-script-import-file">Nhập Từ Tệp</button>
              <button class="btn btn-script-primary-dark" id="btn-script-write-manual">+ Viết Kịch Bản Mới</button>
            </div>
          </div>

          <!-- Search & Filter Bar (Matching Ảnh 1: 1 Sleek Card) -->
          <div class="script-filter-card-single-row">
            <div class="script-search-input-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" id="script-table-search-input" placeholder="Tìm kiếm theo tên kịch bản,..." class="script-search-input">
            </div>
            <select id="script-table-sku-select" class="script-sku-filter-select">
              <option value="all">Tất cả sản phẩm</option>
              <option value="Farmstay Toner">Farmstay Toner Rau Má (SKU-01)</option>
              <option value="Collagen Ampoule">Farmstay Collagen Ampoule (SKU-02)</option>
              <option value="Sehwa">Sehwa Kem Chống Nắng (SKU-03)</option>
              <option value="Sữa Rửa Mặt">Farmstay Sữa Rửa Mặt (SKU-04)</option>
            </select>

            <!-- Filter Tabs matching Ảnh 1 -->
            <div class="script-category-tabs-bar" id="script-category-tabs-bar">
              <button class="script-cat-tab active" data-tab="all">Tất Cả</button>
              <button class="script-cat-tab" data-tab="Giáo Dục">Giáo Dục</button>
              <button class="script-cat-tab" data-tab="Giới Thiệu">Giới Thiệu</button>
              <button class="script-cat-tab" data-tab="POV & Trend">POV & Trend</button>
              <button class="script-cat-tab" data-tab="Trải Nghiệm & ASMR">Trải Nghiệm & ASMR</button>
            </div>
          </div>

          <!-- Data Table matching Ảnh 1 (7 Columns: Checkbox, Tên, Nhóm, SKU, Số Cảnh, Thời Lượng, Trạng Thái) -->
          <div class="script-table-card">
            <table class="script-datatable">
              <thead>
                <tr>
                  <th style="width: 44px; text-align: center;"><input type="checkbox" id="script-check-all-box" class="form-checkbox"></th>
                  <th style="min-width: 280px;">TÊN KỊCH BẢN</th>
                  <th style="min-width: 140px;">NHÓM NỘI DUNG</th>
                  <th style="min-width: 180px;">SẢN PHẨM (SKU)</th>
                  <th style="min-width: 90px;">SỐ CẢNH</th>
                  <th style="min-width: 90px;">THỜI LƯỢNG</th>
                  <th style="min-width: 120px;">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody id="script-table-tbody">
                <!-- Populated dynamically by JS -->
              </tbody>
            </table>
          </div>

          <!-- Floating Batch Action Bar for Scripts (Todo14 Item 1) -->
          <div class="floating-batch-bar" id="script-batch-bar" style="display: none;">
            <div class="batch-bar-count"><span class="batch-dot">●</span> Đã chọn: <span id="script-batch-count">0</span> kịch bản</div>
            <button class="btn-batch-publish" id="btn-batch-publish-script">Xuất bản</button>
            <button class="btn-batch-delete" id="btn-batch-delete-script">Xóa</button>
            <button class="btn-batch-deselect" id="btn-batch-deselect-script">Bỏ chọn</button>
          </div>
        </div>

        <!-- ===========================================================
             VIEW 2: CHI TIẾT & BIÊN TẬP PHÂN CẢNH (MATCHING ẢNH 2)
             =========================================================== -->
        <div id="script-detail-editor-view" style="display: none;">
          <div class="editor-header-nav">
            <button class="btn-back-breadcrumb" id="btn-back-to-script-list">
              ← Quay lại danh sách kịch bản
            </button>
          </div>

          <div class="editor-title-row">
            <div>
              <h2 class="editor-main-title" id="editor-script-title">3 Sai Lầm Trị Mụn Khiến Hàng Rào Bảo Vệ Da Sụp Đổ</h2>
              <div class="editor-meta-bar">
                <span class="editor-sku-tag" id="editor-script-sku">Farmstay Toner Rau Má (SKU-01)</span>
                <span class="editor-divider">|</span>
                <span class="editor-duration-tag" id="editor-script-duration">45s</span>
                <span class="editor-divider">|</span>
                <span class="editor-status-badge" id="editor-script-status">Sẵn sàng dựng</span>
              </div>
            </div>

            <div class="editor-top-actions">
              <button class="btn btn-script-outline" id="btn-editor-add-scene">+ Thêm Phân Cảnh</button>
              <button class="btn btn-script-outline" id="btn-editor-save-script">Lưu Bản Nháp</button>
              <button class="btn btn-script-publish" id="btn-editor-publish-script">Xuất Bản Kịch Bản</button>
              <button class="btn btn-script-create-video" id="btn-editor-create-video">Tạo Video Ngay</button>
            </div>
          </div>

          <!-- Scenes Cards List matching Ảnh 2 -->
          <div class="editor-scenes-wrapper" id="editor-scenes-container">
            <!-- Populated dynamically by JS -->
          </div>
        </div>

      </div>

      <!-- ===============================================================
           5. KHO CÂU HOOK'''

html = old_script_panel_pattern.sub(lambda m: new_script_panel, html)

# ------------------------------------------------------------------------------
# 2. Update #panel-vault-hooks (Kho Câu Hook - Table View Matching Image 2)
# ------------------------------------------------------------------------------
old_hook_panel_pattern = re.compile(
    r'<div id="panel-vault-hooks" class="stage-view-panel">.*?</div>\s*<!-- ===============================================================\s*6\. KHO ẢNH',
    re.DOTALL
)

new_hook_panel = '''<div id="panel-vault-hooks" class="stage-view-panel">
        <!-- Header matching Screenshot 2 -->
        <div class="hook-vault-header">
          <div>
            <h2 class="hook-page-title">Kho Câu Hook</h2>
            <p class="hook-page-desc">Quản lý các câu mở đầu 0–3s video TikTok. Nhấp vào dòng để chỉnh sửa.</p>
          </div>
          <div class="hook-vault-top-actions">
            <button class="btn btn-hook-dark" id="btn-create-hook">+ Thêm Hook Mới</button>
          </div>
        </div>

        <!-- Filter Row matching Screenshot 2 -->
        <div class="hook-filter-card-single-row">
          <div class="hook-search-input-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="hook-search-input" placeholder="Tìm kiếm câu hook, sản phẩm..." class="hook-search-input">
          </div>

          <!-- Category Tabs matching Screenshot 2 -->
          <div class="hook-category-tabs-bar" id="hook-category-tabs-bar">
            <button class="hook-cat-tab active" data-cat="all">Tất Cả</button>
            <button class="hook-cat-tab" data-cat="Cảnh Báo">Cảnh Báo</button>
            <button class="hook-cat-tab" data-cat="Chuyên Gia">Chuyên Gia</button>
            <button class="hook-cat-tab" data-cat="Glass Skin">Glass Skin</button>
            <button class="hook-cat-tab" data-cat="Hài Hước">Hài Hước</button>
            <button class="hook-cat-tab" data-cat="POV">POV</button>
          </div>
        </div>

        <!-- Hook Datatable matching Screenshot 2 (Checkbox, Câu Hook 0-3s, Thể Loại, Sản Phẩm) -->
        <div class="hook-table-card">
          <table class="hook-datatable">
            <thead>
              <tr>
                <th style="width: 44px; text-align: center;"><input type="checkbox" id="hook-check-all-box" class="form-checkbox"></th>
                <th style="min-width: 440px;">CÂU HOOK (LỜI THOẠI 0–3S)</th>
                <th style="min-width: 140px;">THỂ LOẠI</th>
                <th style="min-width: 220px;">SẢN PHẨM</th>
              </tr>
            </thead>
            <tbody id="hook-table-tbody">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>

        <!-- Floating Batch Action Bar matching Screenshot 2 (Bottom bar) -->
        <div class="floating-batch-bar" id="hook-batch-bar" style="display: none;">
          <div class="batch-bar-count"><span class="batch-dot">●</span> Đã chọn: <span id="hook-batch-count">0</span> câu hook</div>
          <button class="btn-batch-delete" id="btn-batch-delete-hook">Xóa</button>
          <button class="btn-batch-deselect" id="btn-batch-deselect-hook">Bỏ chọn</button>
        </div>
      </div>

      <!-- ===============================================================
           6. KHO ẢNH'''

html = old_hook_panel_pattern.sub(lambda m: new_hook_panel, html)

# ------------------------------------------------------------------------------
# 3. Update Modal Script Editor footer to have "Lưu Bản Nháp" and "Xuất Bản (Sẵn Sàng)"
# ------------------------------------------------------------------------------
old_script_modal_footer = '''      <div class="modal-footer">
        <button class="btn btn-secondary btn-sm" data-close="modal-script-editor">Hủy</button>
        <button class="btn btn-primary btn-sm" id="btn-save-script">Lưu Kịch Bản</button>
      </div>'''

new_script_modal_footer = '''      <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-ghost" data-close="modal-script-editor" style="color: var(--text-muted);">Hủy</button>
        <button class="btn btn-script-outline" id="btn-save-script-draft" style="font-weight: 600;">Lưu Bản Nháp</button>
        <button class="btn btn-dark-modal-save" id="btn-save-script-publish" style="font-weight: 700;">Xuất Bản (Sẵn Sàng)</button>
      </div>'''

if old_script_modal_footer in html:
    html = html.replace(old_script_modal_footer, new_script_modal_footer)
else:
    html = re.sub(
        r'<div class="modal-footer">\s*<button class="btn btn-secondary btn-sm" data-close="modal-script-editor">Hủy</button>\s*<button class="btn btn-primary btn-sm" id="btn-save-script">Lưu Kịch Bản</button>\s*</div>',
        new_script_modal_footer,
        html
    )

with open('prototype/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html updated successfully.")
