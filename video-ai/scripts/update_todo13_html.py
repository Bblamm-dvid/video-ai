import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove STUDIO SAAS badge and workspace selector
old_header_brand = '''      <div class="brand-title-wrap">
        <h1>XCORP VIDEO AI</h1>
        <span class="brand-subtitle-badge">STUDIO SAAS</span>
      </div>

      <!-- SaaS Workspace / Tenant Selector Dropdown -->
      <div class="topbar-workspace-wrap">
        <button class="topbar-workspace-btn" id="btn-workspace-selector" title="Chuyển đổi Workspace khách hàng">
          <span class="topbar-workspace-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg></span>
          <span id="current-workspace-name">Mỹ Nguyên TSC</span>
          <span class="topbar-workspace-caret">▼</span>
        </button>
      </div>'''

new_header_brand = '''      <div class="brand-title-wrap">
        <h1>XCORP VIDEO AI</h1>
      </div>'''

html = html.replace(old_header_brand, new_header_brand, 1)

# 2. Overhaul #panel-vault-angles with the new Table & Detail Scene Editor view
old_panel_vault_angles = '''      <!-- ===============================================================
           4. KHO GÓC KỊCH BẢN
           =============================================================== -->
      <div id="panel-vault-angles" class="stage-view-panel">
        <div class="card-header">
          <div>
            <h2 class="card-title">Kho Kịch Bản Video</h2>
            <p class="card-desc">Quản lý các kịch bản mẫu, phân cảnh và nội dung sáng tạo theo từng nhóm chủ đề.</p>
          </div>
        </div>

        <!-- 3 Option Nổi Bật (Hero Action Cards) -->
        <div class="script-hero-actions-grid">
          <div class="script-hero-card" id="btn-create-script-manual">
            <div class="script-hero-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></div>
            <div class="script-hero-info">
              <div class="script-hero-title">+ Viết Kịch Bản</div>
              <div class="script-hero-sub">Tự nhập tay phân cảnh & câu hook chi tiết</div>
            </div>
          </div>
          <div class="script-hero-card featured" id="btn-create-script-ai">
            <div class="script-hero-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg></div>
            <div class="script-hero-info">
              <div class="script-hero-title">AI Tạo Kịch Bản</div>
              <div class="script-hero-sub">Tự động sinh kịch bản chuẩn viral TikTok</div>
            </div>
          </div>
          <div class="script-hero-card" id="btn-upload-script-file">
            <div class="script-hero-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>
            <div class="script-hero-info">
              <div class="script-hero-title">Tải Lên File</div>
              <div class="script-hero-sub">Nhập kịch bản từ file .txt, .md, .docx</div>
            </div>
          </div>
        </div>

        <!-- Folder Pills Selector -->
        <div class="folder-pills-bar" id="script-folder-pills"></div>

        <!-- Compact Scripts List View -->
        <div class="script-compact-list" id="cstage-scripts-container"></div>
      </div>'''

new_panel_vault_angles = '''      <!-- ===============================================================
           4. KHO GÓC KỊCH BẢN (THEO PHONG CÁCH XCORP & ẢNH MẪU TODO13)
           =============================================================== -->
      <div id="panel-vault-angles" class="stage-view-panel">

        <!-- ===========================================================
             VIEW 1: DANH SÁCH BẢNG KỊCH BẢN (MATCHING ẢNH 1)
             =========================================================== -->
        <div id="script-list-main-view">
          <div class="script-vault-header">
            <div>
              <h2 class="script-page-title">Kho Kịch Bản Video</h2>
            </div>
            <div class="script-vault-top-actions">
              <button class="btn btn-script-outline" id="btn-script-import-file">Nhập Từ Tệp</button>
              <button class="btn btn-script-outline" id="btn-script-write-manual">+ Viết Kịch Bản</button>
              <button class="btn btn-script-ai-auto" id="btn-script-ai-generate">AI Tạo Tự Động</button>
            </div>
          </div>

          <!-- Search & Filter Card -->
          <div class="script-filter-card">
            <div class="script-search-sku-row">
              <div class="script-search-input-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="text" id="script-table-search-input" placeholder="Tìm kiếm kịch bản theo tên, từ khóa..." class="script-search-input">
              </div>
              <select id="script-table-sku-select" class="script-sku-filter-select">
                <option value="all">Tất cả SKU sản phẩm</option>
                <option value="Farmstay Toner">Farmstay Toner (SKU-01)</option>
                <option value="Collagen Ampoule">Collagen Ampoule (SKU-02)</option>
                <option value="Sehwa Sunscreen">Sehwa Sunscreen (SKU-03)</option>
                <option value="Farmstay Clear">Farmstay Clear (SKU-04)</option>
              </select>
            </div>

            <!-- Filter Tabs matching Ảnh 1: Tất Cả (8), Giáo Dục (2), Giới Thiệu (2), POV & Trend (2), ASMR (2) -->
            <div class="script-category-tabs-bar" id="script-category-tabs-bar">
              <button class="script-cat-tab active" data-tab="all">Tất Cả (8)</button>
              <button class="script-cat-tab" data-tab="Giáo Dục">Giáo Dục (2)</button>
              <button class="script-cat-tab" data-tab="Giới Thiệu">Giới Thiệu (2)</button>
              <button class="script-cat-tab" data-tab="POV & Trend">POV & Trend (2)</button>
              <button class="script-cat-tab" data-tab="ASMR">ASMR (2)</button>
            </div>
          </div>

          <!-- Data Table matching Ảnh 1 -->
          <div class="script-table-card">
            <table class="script-datatable">
              <thead>
                <tr>
                  <th style="width: 44px; text-align: center;"><input type="checkbox" id="script-check-all-box" class="form-checkbox"></th>
                  <th style="min-width: 280px;">TÊN KỊCH BẢN</th>
                  <th style="min-width: 140px;">NHÓM NỘI DUNG</th>
                  <th style="min-width: 160px;">SẢN PHẨM (SKU)</th>
                  <th style="min-width: 90px;">QUY MÔ</th>
                  <th style="min-width: 130px;">TRẠNG THÁI</th>
                  <th style="min-width: 120px; text-align: right;">THAO TÁC</th>
                </tr>
              </thead>
              <tbody id="script-table-tbody">
                <!-- Populated dynamically by JS -->
              </tbody>
            </table>
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
              <button class="btn btn-script-outline" id="btn-editor-save-script">Lưu Kịch Bản</button>
              <button class="btn btn-script-create-video" id="btn-editor-create-video">Tạo Video Ngay</button>
            </div>
          </div>

          <!-- Scenes Cards List matching Ảnh 2 -->
          <div class="editor-scenes-wrapper" id="editor-scenes-container">
            <!-- Populated dynamically by JS -->
          </div>
        </div>

      </div>'''

html = html.replace(old_panel_vault_angles, new_panel_vault_angles, 1)

with open('prototype/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html for todo13 successfully!")
