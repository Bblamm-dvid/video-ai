const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'prototype', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update left sidebar
const sidebarTarget = `      <!-- Section 1: 3 Chế Độ Tạo Video AI -->
      <div class="sidebar-section-title">Chế Độ Tạo Video AI</div>
      <ul class="sidebar-menu-list">
        <li>
          <button class="sidebar-nav-item active" data-panel="panel-multi-engine">
            <span class="nav-icon-title">Dựng Video Từ Ảnh</span>
          </button>
        </li>
        <li>
          <button class="sidebar-nav-item" data-panel="panel-livestream">
            <span class="nav-icon-title">Cắt Highlight Livestream</span>
          </button>
        </li>
        <li>
          <button class="sidebar-nav-item" data-panel="panel-raw-editor">
            <span class="nav-icon-title">Chỉnh Sửa Từ Video Gốc</span>
          </button>
        </li>
      </ul>`;

// 2. Center stage panels replacement
const centerStageIndex = html.indexOf('<section class="studio-center-stage">');
const anglesPanelIndex = html.indexOf('<!-- 2. KHO GÓC KỊCH BẢN (CÓ CRUD HOÀN THIỆN) -->');

if (centerStageIndex === -1 || anglesPanelIndex === -1) {
  console.error('Failed to locate landmarks');
  process.exit(1);
}

const beforeStage = html.slice(0, centerStageIndex + '<section class="studio-center-stage">\n'.length);

const threeCreationPanels = `      <!-- 1. DỰNG VIDEO TỰ ĐỘNG TỪ ẢNH SẢN PHẨM (MODULE 1 THEO TODO6) -->
      <div id="panel-multi-engine" class="stage-view-panel active">
        <div class="card-header" style="margin-bottom: 1.25rem;">
          <div>
            <h2 class="card-title">Dựng Video Từ Ảnh</h2>
            <p class="card-desc">Tự động kết hợp ảnh sản phẩm thật, câu hook viral, kịch bản mẫu và thông tin USP để tạo video TikTok 9:16 có chuyển động 3D.</p>
          </div>
        </div>

        <div class="grid-2" style="grid-template-columns: 1.15fr 0.85fr; gap: 1.5rem; align-items: start;">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Step 1: Nhập Prompt -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem;">
                1. Nhập Câu Lệnh (Prompt):
              </div>
              <textarea class="form-textarea" id="img2vid-prompt-input" rows="3" style="width: 100%; font-size: 0.82rem;">Làm video TikTok 15–25 giây cho sản phẩm Farmstay Cica Serum. Đối tượng nữ 25–40 tuổi da mẩn đỏ, nhấn mạnh chiết xuất rau má Cica hữu cơ Jeju làm dịu da mẩn đỏ cấp tốc sau 20 phút, hiệu ứng nước bắn 3D điện ảnh.</textarea>
            </div>

            <!-- Step 2: Chọn Hook trong kho -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem;">
                2. Chọn Câu Hook Trong Kho:
              </div>
              <select class="form-select" id="img2vid-hook-select" style="width: 100%;"></select>
            </div>

            <!-- Step 3: Chọn Kịch Bản trong kho -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem;">
                3. Chọn Kịch Bản Trong Kho:
              </div>
              <select class="form-select" id="img2vid-script-select" style="width: 100%;"></select>
            </div>

            <!-- Step 4: Chọn Folder Sản Phẩm trong kho -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center;">
                <span>4. Chọn Folder Sản Phẩm & Ảnh Bao Bì:</span>
                <span style="font-size: 0.72rem; color: var(--cyan-ai);">Input Tự Động Từ Kho SKU</span>
              </div>
              <select class="form-select" id="img2vid-folder-select" style="width: 100%; margin-bottom: 0.65rem;"></select>

              <!-- Product SKU Info & USP Context Box -->
              <div id="engine-sku-info-box" style="margin-bottom: 0.75rem; padding: 0.75rem 0.9rem; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.15); border-radius: 6px; font-size: 0.78rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                  <strong id="engine-sku-title" style="color: #fff; font-size: 0.84rem;">Farmstay Cica Farm Blemi Clear Ampoule 50ml</strong>
                  <span id="engine-sku-price" class="badge-tag" style="background: rgba(225,29,72,0.15); color: var(--rose-light);">249.000đ</span>
                </div>
                <div id="engine-sku-desc" style="color: var(--text-muted); font-size: 0.74rem; margin-bottom: 0.45rem;">Chiết xuất rau má Cica hữu cơ Jeju, làm dịu da mẩn đỏ cấp tốc sau 20 phút</div>
                <div id="engine-sku-usp-tags" style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                  <span class="badge-tag" style="background: rgba(16,185,129,0.12); color: #34d399; font-size: 0.68rem;">Rau má Cica hữu cơ Jeju</span>
                  <span class="badge-tag" style="background: rgba(16,185,129,0.12); color: #34d399; font-size: 0.68rem;">Dịu da sau 20 phút</span>
                </div>
              </div>

              <div class="product-image-selector-grid" id="engine-packshot-selector"></div>
            </div>

            <button class="btn btn-hero-generate" id="btn-run-img2vid">
              <span>BẮT ĐẦU THỰC HIỆN DỰNG VIDEO</span>
              <span class="btn-arrow-icon">➔</span>
            </button>
          </div>

          <!-- Video Output Preview -->
          <div>
            <div style="font-family: var(--font-heading); font-size: 0.88rem; font-weight: 700; color: #fff; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
              <span>Video Thành Phẩm (Xem Preview Trực Tiếp)</span>
              <span class="badge-tag" style="background: rgba(16,185,129,0.15); color: #34d399; font-size: 0.7rem;">PREVIEW SẴN SÀNG</span>
            </div>
            <div class="mockup-9-16-container" style="max-height: 480px;">
              <video id="cstage-engine-video" class="mockup-9-16-video" autoplay muted loop playsinline controls src="media/video/final_final.mp4" poster="media/image/farmstay_retinol_water.jpg"></video>
              <div class="tiktok-safe-zone" id="engine-safe-zone">
                <div class="safe-zone-right-actions">
                  <div class="action-icon-pill">24.5K</div>
                  <div class="action-icon-pill">621</div>
                  <div class="action-icon-pill">3.1K</div>
                </div>
                <div class="safe-zone-bottom-bar">
                  <div class="username">@mynguyen.tsc.official</div>
                  <div class="caption-snip" id="engine-caption-snip">Farmstay Retinol Revive Cream chính ngạch Hàn Quốc! #retinol #mynguyen</div>
                </div>
              </div>
              <div class="overlay-brand-badge">
                <span>MỸ NGUYÊN TSC CHÍNH NGẠCH</span>
              </div>
              <div class="overlay-broll-packshot">
                <img id="engine-broll-img" src="media/image/farmstay_retinol_box.jpg" alt="SKU">
                <div class="pack-label">TEM PHỤ VIỆT</div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button class="btn btn-primary btn-sm" style="flex: 1;" id="btn-save-img2vid-finished">Lưu Vào Kho Thành Phẩm</button>
              <button class="btn btn-outline btn-sm" id="btn-toggle-safezone-engine">Safe-Zone</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. CẮT HIGHLIGHT LIVESTREAM (MODULE 2 THEO TODO6) -->
      <div id="panel-livestream" class="stage-view-panel">
        <div class="livestream-session-info" style="align-items: center;">
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; margin: 0;">
              Cắt Highlight Livestream Sang Video Ngắn
            </h2>
          </div>
          <div>
            <button class="btn-livestream-hero" id="btn-load-new-livestream">
              <span>⚡</span>
              <span>+ Nạp Video Live Mới</span>
            </button>
          </div>
        </div>

        <div class="grid-2" style="grid-template-columns: 1.1fr 0.9fr; gap: 1.25rem;">
          <div>
            <div class="timeline-visualizer">
              <div style="display: flex; justify-content: flex-end; margin-bottom: 0.4rem; font-size: 0.78rem;">
                <span style="color: var(--text-dim); font-family: var(--font-mono);">00:00 - 02:15:30</span>
              </div>
              <div class="waveform-canvas-mock" id="cstage-waveform"></div>
            </div>
            <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.6rem;">
              Danh Sách Clip Đã Tự Động Cắt (Bấm để xem Preview trực tiếp):
            </h4>
            <div id="cstage-ls-clips-list" style="display: flex; flex-direction: column; gap: 0.65rem;"></div>
          </div>

          <div>
            <div style="font-family: var(--font-heading); font-size: 0.88rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
              <span>Màn Hình Xem Preview Clip Trực Tiếp</span>
              <span class="badge-tag" style="background: rgba(56, 189, 248, 0.15); color: var(--cyan-ai); font-size: 0.7rem;">9:16 TIKTOK</span>
            </div>
            <div class="mockup-9-16-container">
              <video id="cstage-ls-video" class="mockup-9-16-video" autoplay muted loop playsinline controls src="media/video/final_final.mp4" poster="media/image/farmstay_retinol_table.jpg"></video>
              <div class="tiktok-safe-zone" id="cstage-safe-zone">
                <div class="safe-zone-right-actions">
                  <div class="action-icon-pill">Like</div>
                  <div class="action-icon-pill">Cmt</div>
                  <div class="action-icon-pill">Lưu</div>
                </div>
                <div class="safe-zone-bottom-bar">
                  <div class="username">@mynguyen.tsc.official</div>
                  <div class="caption-snip" id="cstage-caption-snip">Serum Farmstay Cica trợ giá sốc!</div>
                </div>
              </div>
              <div class="overlay-brand-badge">
                <span>MỸ NGUYÊN TSC CHÍNH NGẠCH</span>
              </div>
              <div class="overlay-broll-packshot">
                <img id="cstage-broll-img" src="media/image/farmstay_retinol_box.jpg" alt="SKU">
                <div class="pack-label">TEM PHỤ VIỆT</div>
              </div>
              <div class="overlay-kinetic-sub">
                <div class="kinetic-text-box" id="cstage-kinetic-sub">GIẢM SỐC 249K!</div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button class="btn btn-primary btn-sm" id="btn-approve-current-ls" style="flex: 1;">✓ Chốt Duyệt & Xuất Bản Clip Này</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. CHỈNH SỬA TỰ ĐỘNG TỪ VIDEO GỐC (MODULE 3 THEO TODO6) -->
      <div id="panel-raw-editor" class="stage-view-panel">
        <div class="card-header" style="margin-bottom: 1.25rem;">
          <div>
            <h2 class="card-title">Chỉnh Sửa Từ Video Gốc</h2>
            <p class="card-desc">Nâng cấp video thô: làm mịn da mẫu tự nhiên, tăng sáng studio, lồng nhạc viral và phụ đề tự động.</p>
          </div>
        </div>

        <div class="grid-2" style="grid-template-columns: 1.1fr 0.9fr; gap: 1.5rem; align-items: start;">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Step 1: Prompt chỉnh sửa -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem;">
                1. Nhập Prompt Yêu Cầu Chỉnh Sửa:
              </div>
              <textarea class="form-textarea" id="raw-editor-prompt-input" rows="3" style="width: 100%; font-size: 0.82rem;">Chỉnh sửa lại video này: hiệu ứng tươi tắn, lồng nhạc trending TikTok nhẹ nhàng, tăng ánh sáng studio ấm áp, làm da người mẫu mịn màng tự nhiên, chèn phụ đề tự động.</textarea>
            </div>

            <!-- Step 2: Chọn Video Gốc trong kho -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem;">
                2. Chọn Video Gốc Trong Kho (Raw Video):
              </div>
              <select class="form-select" id="raw-video-select" style="width: 100%; margin-bottom: 0.75rem;"></select>
              <div id="raw-video-selected-preview" style="font-size: 0.75rem; color: var(--text-dim);"></div>
            </div>

            <!-- Step 3: Chọn Hook trong kho -->
            <div class="glass-card" style="padding: 1.1rem;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 0.4rem;">
                3. Chọn Câu Hook Trong Kho (Chèn 3 Giây Đầu):
              </div>
              <select class="form-select" id="raw-hook-select" style="width: 100%;"></select>
            </div>

            <button class="btn btn-hero-generate" id="btn-run-raw-edit">
              <span>BẮT ĐẦU CHỈNH SỬA BẰNG AI</span>
              <span class="btn-arrow-icon">➔</span>
            </button>
          </div>

          <!-- Video Preview Result -->
          <div>
            <div style="font-family: var(--font-heading); font-size: 0.88rem; font-weight: 700; color: #fff; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
              <span>Video Sau Khi Tinh Chỉnh (Preview Trực Tiếp)</span>
              <span class="badge-tag" style="background: rgba(16,185,129,0.15); color: #34d399; font-size: 0.7rem;">ĐÃ NÂNG CẤP</span>
            </div>
            <div class="mockup-9-16-container" style="max-height: 480px;">
              <video id="raw-result-video" class="mockup-9-16-video" autoplay muted loop playsinline controls src="media/video/loi_text.mp4" poster="media/image/farmstay_retinol_texture.jpg"></video>
              <div class="tiktok-safe-zone" id="raw-safe-zone">
                <div class="safe-zone-right-actions">
                  <div class="action-icon-pill">Like</div>
                  <div class="action-icon-pill">Cmt</div>
                  <div class="action-icon-pill">Lưu</div>
                </div>
                <div class="safe-zone-bottom-bar">
                  <div class="username">@mynguyen.tsc.official</div>
                  <div class="caption-snip" id="raw-caption-snip">Video đã làm nét mặt & phối nhạc! #mynguyen</div>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button class="btn btn-primary btn-sm" style="flex: 1;" id="btn-save-raw-finished">Lưu Vào Kho Thành Phẩm</button>
              <button class="btn btn-outline btn-sm" id="btn-toggle-safezone-raw">Safe-Zone</button>
            </div>
          </div>
        </div>
      </div>\n\n`;

// 3. Middle part (panel-vault-angles, panel-vault-hooks)
const vaultAnglesStart = anglesPanelIndex;
const vaultAssetsStart = html.indexOf('<!-- 4. KHO ẢNH & VIDEO SẢN PHẨM (GOOGLE DRIVE STYLE) -->');
const anglesAndHooks = html.slice(vaultAnglesStart, vaultAssetsStart);

// 4. Panel Vault Assets updated
const vaultAssetsUpdated = `      <!-- 4. KHO ẢNH & VIDEO SẢN PHẨM (GOOGLE DRIVE THEO FOLDER SẢN PHẨM - TODO6) -->
      <div id="panel-vault-assets" class="stage-view-panel">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <h2 class="card-title">Kho Ảnh & Video Sản Phẩm</h2>
            <p class="card-desc">Quản lý theo từng thư mục sản phẩm. Mỗi thư mục lưu trữ thông tin SKU, USP, ảnh và video tư liệu.</p>
          </div>
          <div style="display: flex; gap: 0.5rem;" id="vault-assets-actions">
            <button class="btn btn-outline btn-sm" id="btn-create-product-folder">+ Tạo Thư Mục Sản Phẩm Mới</button>
            <button class="btn btn-primary btn-sm" id="btn-drive-upload-file">+ Tải Lên Tệp</button>
          </div>
        </div>

        <!-- Folder Pills Selector -->
        <div class="folder-pills-bar" id="drive-folder-pills">
          <!-- Populated via JS -->
        </div>

        <!-- Rich Product Folder Cards Grid (Hiển thị khi ở chế độ "Tất Cả Thư Mục") -->
        <div class="product-folder-grid" id="drive-folder-cards-grid">
          <!-- Populated via JS: Cover, Title, SKU, Price, Origin, Desc, USP pills, Actions -->
        </div>

        <!-- Folder SKU Rich Info Banner (Hiển thị khi click vào 1 folder cụ thể) -->
        <div class="folder-sku-rich-banner" id="drive-folder-sku-banner" style="display: none;">
          <!-- Populated via JS with Edit button, USP tags, Description -->
        </div>

        <!-- Google Drive Cards Grid (Hiển thị ảnh / video khi ở trong 1 folder cụ thể) -->
        <div class="drive-grid" id="drive-assets-grid" style="display: none;">
          <!-- Populated via JS -->
        </div>
      </div>\n\n`;

// 5. Panel Content Kits
const contentKitsStart = html.indexOf('<!-- 8. KHO VIDEO ĐÃ HOÀN THIỆN (PHÂN LOẠI & PREVIEW TRỰC TIẾP) -->');
const contentKitsEnd = html.indexOf('</section>');
const contentKits = html.slice(contentKitsStart, contentKitsEnd);

// 6. Section close and container close (NO right sidebar, NO dock)
const endOfMainBody = `    </section>
  </div>\n\n`;

// 7. Modals
const modalsStart = html.indexOf('<!-- Toast Notification Container -->');
const modalsRaw = html.slice(modalsStart);

// Let's add modal-edit-product-info before </body
const modalEditProductInfo = `  <!-- MODAL: CHỈNH SỬA THÔNG TIN SẢN PHẨM & USP (THEO TODO6) -->
  <div class="modal-overlay" id="modal-edit-product-info">
    <div class="modal-box" style="max-width: 600px;">
      <div class="modal-header">
        <div class="modal-title" id="edit-product-modal-title">✏️ Chỉnh Sửa Thông Tin Sản Phẩm & USP</div>
        <button class="modal-close-btn" data-close="modal-edit-product-info">&times;</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="edit-folder-id" value="">
        <div class="grid-2" style="gap: 0.75rem;">
          <div class="form-group">
            <label>Tên Thư Mục (Gọn):</label>
            <input type="text" class="form-input" id="edit-folder-name" placeholder="Ví dụ: Farmstay Cica Serum">
          </div>
          <div class="form-group">
            <label>Giá Bán / Deal TikTok:</label>
            <input type="text" class="form-input" id="edit-folder-price" placeholder="Ví dụ: 249.000đ">
          </div>
        </div>
        <div class="grid-2" style="gap: 0.75rem;">
          <div class="form-group">
            <label>Tên Đầy Đủ (SKU):</label>
            <input type="text" class="form-input" id="edit-folder-fullname" placeholder="Ví dụ: Farmstay Cica Farm Blemi Clear Ampoule 50ml">
          </div>
          <div class="form-group">
            <label>Xuất Xứ & Chứng Nhận:</label>
            <input type="text" class="form-input" id="edit-folder-origin" placeholder="Ví dụ: Hàn Quốc chính ngạch Mỹ Nguyên TSC">
          </div>
        </div>
        <div class="form-group">
          <label>Mô Tả Sản Phẩm (Dùng làm ngữ cảnh kịch bản AI):</label>
          <textarea class="form-textarea" id="edit-folder-desc" rows="3" placeholder="Mô tả công dụng, thành phần chính, đối tượng phù hợp..."></textarea>
        </div>
        <div class="form-group">
          <label>Đặc Điểm Nổi Bật (USP) - Nhập phân tách bằng dấu phẩy hoặc xuống dòng:</label>
          <textarea class="form-textarea" id="edit-folder-usp" rows="3" placeholder="Ví dụ: Chiết xuất rau má Cica hữu cơ Jeju, Dịu da mẩn đỏ sau 20 phút, Cấp ẩm sâu không nhờn rít"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline btn-sm" data-close="modal-edit-product-info">Hủy</button>
        <button class="btn btn-primary btn-sm" id="btn-save-product-info">Lưu Thông Tin Sản Phẩm</button>
      </div>
    </div>
  </div>\n\n`;

let finalModals = modalsRaw;
// Insert modalEditProductInfo before <!-- Scripts -->
finalModals = finalModals.replace('<!-- Scripts -->', modalEditProductInfo + '  <!-- Scripts -->');

const finalHtml = beforeStage + threeCreationPanels + anglesAndHooks + vaultAssetsUpdated + contentKits + endOfMainBody + finalModals;

fs.writeFileSync(indexPath, finalHtml, 'utf8');
console.log('Successfully rebuilt prototype/index.html');
