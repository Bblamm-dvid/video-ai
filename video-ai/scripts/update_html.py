import os
import re

with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add Login Portal right after <body>
login_portal_html = '''<body>

  <!-- ===================================================================
       0. LOGIN PORTAL SCREEN (COMMAND CENTER - ANH 1)
       =================================================================== -->
  <div id="login-portal-screen">
    <!-- Left Tech Banner -->
    <div class="login-left-banner">
      <div>
        <div class="login-brand-header">
          <div class="login-brand-logo-badge">XC</div>
          <div>
            <div class="login-brand-title">XCORP VIDEO AI</div>
            <span class="login-platform-badge">COMMAND CENTER AN TOÀN & VẬN HÀNH</span>
          </div>
        </div>

        <h2 class="login-hero-title">
          Trung tâm Điều hành Sản xuất Video AI<br>
          <span class="highlight-gold">Thời gian thực trên mọi kênh TikTok</span>
        </h2>

        <p class="login-hero-desc">
          Tổ hợp sản xuất video ngắn tự động từ ảnh sản phẩm, cắt highlight livestream và tinh chỉnh video thô bằng AI đa tác tử. Đồng bộ kịch bản, quản lý quota theo thời gian thực cho Ban Chỉ huy và đội ngũ Creator.
        </p>

        <div class="login-features-list">
          <div class="login-feature-item">
            <div class="login-feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
            <div>
              <strong>Edge AI Render Cluster:</strong> suy luận tại chỗ & render video 9:16 dưới 45 giây
            </div>
          </div>
          <div class="login-feature-item">
            <div class="login-feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
            </div>
            <div>
              <strong>CDN phân phối TikTok Shop:</strong> đồng bộ kho tư liệu SKU & model ngoại tuyến tự động
            </div>
          </div>
          <div class="login-feature-item">
            <div class="login-feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
            </div>
            <div>
              <strong>App di động & Webhook Creator:</strong> tiếp nhận kịch bản 1 chạm, SLA duyệt clip 3 phút
            </div>
          </div>
        </div>
      </div>

      <div class="login-footer-copy">
        © 2026 XCORP - Thành viên Xcorp Ecosystem • Bản demo nội bộ, dữ liệu mô phỏng
      </div>
    </div>

    <!-- Right Login Form Wrap -->
    <div class="login-right-form-wrap">
      <div style="max-width: 520px; width: 100%; margin: 0 auto;">
        <h3 class="login-form-title">Đăng nhập Command Center</h3>
        <p class="login-form-subtitle">
          Chọn tài khoản vai trò để vào hệ thống điều hành. Phân quyền và workspace được chuyển đổi linh hoạt trên thanh điều hướng bên trong.
        </p>

        <div class="login-roles-header">CHỌN TÀI KHOẢN VAI TRÒ</div>
        <div class="login-roles-grid" id="login-roles-container">
          <!-- Rendered dynamically -->
        </div>

        <label class="login-input-label">MẬT KHẨU XÁC THỰC</label>
        <div style="position: relative; margin-bottom: 1.5rem;">
          <input type="password" class="login-password-input" value="••••••••" placeholder="Nhập mật khẩu bất kỳ (bản demo)" style="margin-bottom: 0;">
          <span style="position: absolute; right: 14px; top: 14px; color: #64748b;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>

        <button class="btn-login-submit" id="btn-login-submit-portal">
          <span id="btn-login-portal-label">Vào Command Center với vai trò Chỉ huy trưởng Công trường</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </div>'''

html = html.replace('<body>', login_portal_html, 1)

# 2. Update Header: Replace Workspace icon, search icon, quota icon, theme icon, help icon, notif icon, and replace user-profile-badge with Account Popover
old_header_user_badge = '''      <!-- User Avatar / Organization -->
      <div class="topbar-user-avatar" id="user-profile-badge" title="Tài khoản Quản trị: Mỹ Nguyên Admin">
        MN
      </div>
    </div>
  </header>'''

new_header_user_badge = '''      <!-- User Profile Trigger & Account Management Popover (Anh 2) -->
      <div style="position: relative;">
        <button class="topbar-user-profile-trigger" id="topbar-user-profile" title="Quản lý tài khoản & Phân quyền">
          <div class="topbar-user-avatar" id="topbar-avatar-badge">VH</div>
          <div class="topbar-user-name-col">
            <div class="topbar-user-name-txt" id="topbar-user-name">Nguyễn Văn Hùng</div>
            <div class="topbar-user-role-txt" id="topbar-user-role">Chỉ huy trưởng Công trường</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-dim); margin-left: 2px;"><path d="m6 9 6 6 6-6"/></svg>
        </button>

        <!-- Account Popover Modal/Dropdown -->
        <div class="account-popover" id="account-dropdown-popover">
          <div class="account-popover-user-row">
            <div class="account-popover-name" id="popover-user-name">Nguyễn Văn Hùng</div>
            <div class="account-popover-unit" id="popover-user-unit">Ban Chỉ huy Kênh Mỹ Nguyên TSC</div>
            <span class="account-popover-badge" id="popover-user-badge">Chỉ huy trưởng Công trường</span>
          </div>

          <!-- Theme Toggle inside Popover -->
          <div class="account-theme-row">
            <span class="account-theme-label">Chế độ giao diện</span>
            <button class="folder-pill-btn" id="btn-popover-theme-toggle" style="padding: 4px 12px; font-size: 0.8rem;">
              <span id="popover-theme-label">🌙 Tối</span>
            </button>
          </div>

          <div class="account-roles-section-title">CHUYỂN NHANH VAI TRÒ (KIỂM THỬ PHÂN QUYỀN)</div>
          <div class="account-roles-list" id="account-roles-list">
            <!-- 5 roles dynamically rendered -->
          </div>

          <button class="account-logout-btn" id="btn-account-logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Đăng xuất tài khoản</span>
          </button>
        </div>
      </div>
    </div>
  </header>'''

html = html.replace(old_header_user_badge, new_header_user_badge, 1)

# Replace Header icons (🏢, 🔍, 💎, 🌓, ❓, 🔔) with SVGs
html = html.replace(
    '<span class="topbar-workspace-icon">🏢</span>',
    '<span class="topbar-workspace-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg></span>'
)
html = html.replace(
    '<span class="topbar-search-icon">🔍</span>',
    '<span class="topbar-search-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>'
)
html = html.replace(
    '<span>💎</span>',
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/></svg>'
)
html = html.replace(
    '<span id="theme-toggle-icon">🌓</span>',
    '<span id="theme-toggle-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>'
)
html = html.replace(
    '<span>❓</span>',
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>'
)
html = html.replace(
    '<span>🔔</span>',
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
)

# 3. Replace Sidebar menu emojis with sleek SVGs
html = html.replace(
    '<span class="nav-menu-icon">🪄</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 4-2 4-4 2 4 2 2 4 2-4 4-2-4-2z"/><path d="M9 15 2 22"/><path d="M2 9l3-3"/><path d="m18 15 3 3"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">✂️</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/><path d="m8.12 15.88 6.68-6.68"/><path d="M17.6 6.4 20 4"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">🎞️</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/><line x1="17" x2="22" y1="17" y2="17"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">📦</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">👥</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">📝</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">🔥</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></span>'
)
html = html.replace(
    '<span class="nav-menu-icon">✅</span>',
    '<span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></span>'
)

# 4. Update Mockup Container in Module 1: Add Standby and Multi-Step Render Overlay
old_mockup_1 = '''            <div class="mockup-9-16-container">
              <video id="cstage-engine-video" class="mockup-9-16-video" autoplay muted loop playsinline controls src="media/video/final_final.mp4" poster="media/image/farmstay_retinol_water.jpg"></video>
              <div class="overlay-brand-badge">
                <span>MỸ NGUYÊN TSC CHÍNH NGẠCH</span>
              </div>
              <div class="overlay-broll-packshot">
                <img id="engine-broll-img" src="media/image/farmstay_retinol_box.jpg" alt="SKU">
                <div class="pack-label">TEM PHỤ VIỆT</div>
              </div>
            </div>'''

new_mockup_1 = '''            <div class="mockup-9-16-container">
              <!-- 1. Standby Screen Before Gen (Item 5) -->
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
              </div>

              <!-- 2. Multi-step Render Simulation Overlay (Item 5) -->
              <div class="mockup-render-overlay" id="engine-render-overlay">
                <div class="render-spinner-ring"></div>
                <div class="render-step-title" id="render-step-title">Đang khởi tạo Engine AI...</div>
                <div class="render-step-sub" id="render-step-sub">Kết nối cụm GPU Edge AI Jetson Orin...</div>
                <div class="render-progress-bar">
                  <div class="render-progress-fill" id="render-progress-fill"></div>
                </div>
                <div class="render-percent-txt" id="render-percent-txt">0%</div>
              </div>

              <!-- 3. Video Output (Shown upon completion) -->
              <video id="cstage-engine-video" class="mockup-9-16-video" muted loop playsinline controls src="media/video/final_final.mp4" poster="media/image/farmstay_retinol_water.jpg" style="display: none;"></video>
              <div class="overlay-brand-badge" id="engine-brand-badge" style="display: none;">
                <span>MỸ NGUYÊN TSC CHÍNH NGẠCH</span>
              </div>
              <div class="overlay-broll-packshot" id="engine-broll-packshot" style="display: none;">
                <img id="engine-broll-img" src="media/image/farmstay_retinol_box.jpg" alt="SKU">
                <div class="pack-label">TEM PHỤ VIỆT</div>
              </div>
            </div>'''

html = html.replace(old_mockup_1, new_mockup_1, 1)

# Replace CTA button in module 1:
html = html.replace(
    '<span>🚀 BẮT ĐẦU THỰC HIỆN DỰNG VIDEO</span>\n              <span class="btn-arrow-icon">➔</span>',
    '<span>BẮT ĐẦU THỰC HIỆN DỰNG VIDEO</span>\n              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>'
)

# Replace CTA button in module 3:
html = html.replace(
    '<span>🚀 BẮT ĐẦU CHỈNH SỬA BẰNG AI</span>\n              <span class="btn-arrow-icon">➔</span>',
    '<span>BẮT ĐẦU CHỈNH SỬA BẰNG AI</span>\n              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>'
)

with open('prototype/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html successfully!")
