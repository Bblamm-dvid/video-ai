import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Favicon: use logo.png
html = html.replace(
    '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2224%22 fill=%22%231677ff%22/><text x=%2250%22 y=%2265%22 font-size=%2250%22 font-family=%22sans-serif%22 font-weight=%22bold%22 fill=%22white%22 text-anchor=%22middle%22>XC</text></svg>">',
    '<link rel="icon" type="image/png" href="logo.png">'
)

# 2. Login Portal Brand Header & Logo
old_login_brand = '''        <div class="login-brand-header">
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
      </div>'''

new_login_brand = '''        <div class="login-brand-header">
          <div class="login-brand-logo-badge" style="padding: 3px; background: #fff; border: 1px solid rgba(255,255,255,0.2);">
            <img src="logo.png" alt="Shop Logo" style="width: 38px; height: 38px; object-fit: contain; display: block; border-radius: 6px;">
          </div>
          <div>
            <div class="login-brand-title">XCORP VIDEO AI STUDIO</div>
            <span class="login-platform-badge">NỀN TẢNG SẢN XUẤT VIDEO TIKTOK CHUYÊN NGHIỆP</span>
          </div>
        </div>

        <h2 class="login-hero-title">
          Hệ Thống Sản Xuất Video AI Tự Động<br>
          <span class="highlight-gold">Sáng Tạo Nội Dung Bùng Nổ Doanh Số TikTok Shop</span>
        </h2>

        <p class="login-hero-desc">
          Tổ hợp tự động hoá sản xuất video ngắn TikTok từ ảnh sản phẩm, livestream highlight và video thô bằng AI đa tác tử. Tối ưu kịch bản chuyển đổi cao cho toàn bộ đội ngũ Media, Marketing và Vận hành kênh.
        </p>

        <div class="login-features-list">
          <div class="login-feature-item">
            <div class="login-feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <div>
              <strong>AI Render Engine 3D:</strong> Tự động tạo chuyển động sản phẩm 3D & biểu cảm Model dưới 45 giây
            </div>
          </div>
          <div class="login-feature-item">
            <div class="login-feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            </div>
            <div>
              <strong>Kho Tư Liệu SKU & Model:</strong> Đồng bộ ảnh bao bì, tem phụ tiếng Việt và gương mặt model đa góc
            </div>
          </div>
          <div class="login-feature-item">
            <div class="login-feature-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
            </div>
            <div>
              <strong>Quy Trình Duyệt 1 Chạm:</strong> Phân quyền linh hoạt cho Creator, Marketing & Quản trị kênh
            </div>
          </div>
        </div>
      </div>

      <div class="login-footer-copy">
        © 2026 Mỹ Nguyên TSC x Xcorp • Hệ thống Sản xuất Video AI Nội Bộ
      </div>'''

html = html.replace(old_login_brand, new_login_brand, 1)

# 3. Login Right Form texts
html = html.replace(
    '<h3 class="login-form-title">Đăng nhập Command Center</h3>\n        <p class="login-form-subtitle">\n          Chọn tài khoản vai trò để vào hệ thống điều hành. Phân quyền và workspace được chuyển đổi linh hoạt trên thanh điều hướng bên trong.\n        </p>\n\n        <div class="login-roles-header">CHỌN TÀI KHOẢN VAI TRÒ</div>',
    '<h3 class="login-form-title">Đăng Nhập Studio Video AI</h3>\n        <p class="login-form-subtitle">\n          Chọn tài khoản vai trò để vào hệ thống sản xuất. Phân quyền và workspace được chuyển đổi linh hoạt bên trong.\n        </p>\n\n        <div class="login-roles-header">CHỌN TÀI KHOẢN VAI TRÒ (MEDIA / MARKETING / QUẢN LÝ)</div>'
)

html = html.replace(
    'Vào Command Center với vai trò Chỉ huy trưởng Công trường',
    'Vào Studio với vai trò Quản lý Kênh & Vận Hành Studio'
)

# 4. Topbar Header: Replace XC badge with logo.png, and remove credits badge & theme toggle button
old_topbar_brand = '<div class="brand-badge-logo" title="Xcorp Video AI">XC</div>'
new_topbar_brand = '<div class="brand-badge-logo" title="Mỹ Nguyên TSC - Xcorp Video AI" style="padding: 2px; background: #fff;"><img src="logo.png" alt="Shop Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;"></div>'

html = html.replace(old_topbar_brand, new_topbar_brand, 1)

# Remove credits badge (#topbar-quota-badge) and theme toggle (#btn-theme-toggle)
old_right_actions_start = '''    <!-- Right Actions & Quota Telemetry -->
    <div class="topbar-right-actions">
      <!-- Quota Credits Badge -->
      <div class="topbar-quota-pill" id="topbar-quota-badge" title="Số credit AI còn lại trong gói SaaS">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/></svg>
        <span>1,250 Credits</span>
      </div>

      <!-- Dark / Light Theme Toggle -->
      <button class="topbar-action-icon-btn" id="btn-theme-toggle" title="Chuyển chế độ Sáng / Tối">
        <span id="theme-toggle-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>
      </button>'''

new_right_actions_start = '''    <!-- Right Actions & User Profile -->
    <div class="topbar-right-actions">'''

html = html.replace(old_right_actions_start, new_right_actions_start, 1)

# 5. Topbar user profile initial texts
html = html.replace(
    '<div class="topbar-user-name-txt" id="topbar-user-name">Nguyễn Văn Hùng</div>\n            <div class="topbar-user-role-txt" id="topbar-user-role">Chỉ huy trưởng Công trường</div>',
    '<div class="topbar-user-name-txt" id="topbar-user-name">Nguyễn Văn Hùng</div>\n            <div class="topbar-user-role-txt" id="topbar-user-role">Quản lý Kênh & Vận Hành Studio</div>'
)

html = html.replace(
    '<div class="account-popover-name" id="popover-user-name">Nguyễn Văn Hùng</div>\n            <div class="account-popover-unit" id="popover-user-unit">Ban Chỉ huy Kênh Mỹ Nguyên TSC</div>\n            <span class="account-popover-badge" id="popover-user-badge">Chỉ huy trưởng Công trường</span>',
    '<div class="account-popover-name" id="popover-user-name">Nguyễn Văn Hùng</div>\n            <div class="account-popover-unit" id="popover-user-unit">Ban Quản Lý & Vận Hành Studio Mỹ Nguyên</div>\n            <span class="account-popover-badge" id="popover-user-badge">Quản lý Kênh & Studio</span>'
)

# 6. Item 3: Add margin and proper class for "Lưu Vào Kho Video Thành Phẩm" button
old_btn_save_wrap = '''            <div style="margin-top: 0.75rem; text-align: center;">
              <button class="btn btn-primary" style="width: 100%;" id="btn-save-img2vid-finished">'''

new_btn_save_wrap = '''            <div style="margin-top: 1.25rem; text-align: center;">
              <button class="btn btn-primary btn-save-finished-video" id="btn-save-img2vid-finished">'''

html = html.replace(old_btn_save_wrap, new_btn_save_wrap, 1)

with open('prototype/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html for todo12 successfully!")
