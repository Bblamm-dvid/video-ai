# -*- coding: utf-8 -*-
import sys
import re

html_path = r"video-ai\prototype\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. NEW SIDEBAR CONTENT
new_sidebar_scroll = '''      <div class="sidebar-scroll-content">
        <!-- Module 0: Hub & Dự Án (Hub & Projects) -->
        <div class="xcorp-accordion-group expanded" id="accordion-hub-projects">
          <div class="xcorp-nav-item active-suite" id="header-hub-projects">
            <span class="xcorp-nav-lead">
              <span class="xcorp-menu-icon" style="color: #1677ff;">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span class="xcorp-nav-text">Hub & Dự Án</span>
            </span>
            <span class="xcorp-chevron"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg></span>
          </div>

          <div class="xcorp-sub-menu">
            <!-- 0.1 Home / Studio Hub -->
            <button class="sidebar-nav-item active" data-panel="panel-home-hub" data-title="STUDIO HUB (TRANG CHỦ)">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg></span>
                <span class="sub-nav-label">Studio Hub</span>
              </span>
              <span class="badge-tag"
                style="font-size: 0.65rem; background: rgba(22, 119, 255, 0.12); color: var(--xcorp-blue-600); border: 1px solid rgba(22, 119, 255, 0.25); font-weight: 700; padding: 1px 6px;">Home</span>
            </button>

            <!-- 0.2 Projects Hub (Ảnh 1 & 2) -->
            <button class="sidebar-nav-item" data-panel="panel-projects-hub" data-title="QUẢN LÝ DỰ ÁN (PROJECTS)">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg></span>
                <span class="sub-nav-label">Quản Lý Dự Án</span>
              </span>
              <span class="badge-tag" id="sidebar-projects-count-badge"
                style="font-size: 0.68rem; background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700; padding: 1px 6px;">6</span>
            </button>
          </div>
        </div>

        <!-- Module 1: Video AI Studio (3 Core Features) -->
        <div class="xcorp-accordion-group expanded" id="accordion-video-ai">
          <div class="xcorp-nav-item" id="header-video-ai">
            <span class="xcorp-nav-lead">
              <span class="xcorp-menu-icon" style="color: #1677ff;">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </span>
              <span class="xcorp-nav-text">Video AI Studio</span>
            </span>
            <span class="xcorp-chevron"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg></span>
          </div>

          <div class="xcorp-sub-menu">
            <!-- 1.1 Cắt Highlight Live (Ưu tiên số 1) -->
            <button class="sidebar-nav-item" data-panel="panel-livestream" data-title="CẮT HIGHLIGHT LIVE">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="6" cy="6" r="3" />
                    <path d="M8.12 8.12 12 12" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M14.8 14.8 20 20" />
                    <path d="m8.12 15.88 6.68-6.68" />
                    <path d="M17.6 6.4 20 4" />
                  </svg></span>
                <span class="sub-nav-label">Cắt Highlight Live</span>
              </span>
              <span class="badge-tag"
                style="font-size: 0.62rem; background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.15)); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); font-weight: 700; padding: 1px 5px;">Core 1</span>
            </button>

            <!-- 1.2 Dựng Video Từ Ảnh -->
            <button class="sidebar-nav-item" data-panel="panel-multi-engine" data-title="DỰNG VIDEO TỪ ẢNH">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 4-2 4-4 2 4 2 2 4 2-4 4-2-4-2z" />
                    <path d="M9 15 2 22" />
                    <path d="M2 9l3-3" />
                    <path d="m18 15 3 3" />
                  </svg></span>
                <span class="sub-nav-label">Dựng Video Từ Ảnh</span>
              </span>
              <span class="badge-tag"
                style="font-size: 0.62rem; background: rgba(22, 119, 255, 0.1); color: var(--xcorp-blue-600); border: 1px solid rgba(22, 119, 255, 0.25); font-weight: 700; padding: 1px 5px;">Core 2</span>
            </button>

            <!-- 1.3 Chỉnh Sửa Video Gốc -->
            <button class="sidebar-nav-item" data-panel="panel-raw-editor" data-title="CHỈNH SỬA VIDEO GỐC">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
                    <line x1="7" x2="7" y1="2" y2="22" />
                    <line x1="17" x2="17" y1="2" y2="22" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <line x1="2" x2="7" y1="7" y2="7" />
                    <line x1="2" x2="7" y1="17" y2="17" />
                    <line x1="17" x2="22" y1="7" y2="7" />
                    <line x1="17" x2="22" y1="17" y2="17" />
                  </svg></span>
                <span class="sub-nav-label">Chỉnh Sửa Video Gốc</span>
              </span>
              <span class="badge-tag"
                style="font-size: 0.62rem; background: rgba(147, 51, 234, 0.1); color: #9333ea; border: 1px solid rgba(147, 51, 234, 0.25); font-weight: 700; padding: 1px 5px;">Core 3</span>
            </button>
          </div>
        </div>

        <!-- Module 2: Brand & Assets (Tài nguyên dùng chung) -->
        <div class="xcorp-accordion-group expanded" id="accordion-resource-vaults">
          <div class="xcorp-nav-item active-suite" id="header-resource-vaults">
            <span class="xcorp-nav-lead">
              <span class="xcorp-menu-icon" style="color: #1677ff;">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </span>
              <span class="xcorp-nav-text">Brand & Assets</span>
            </span>
            <span class="xcorp-chevron"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg></span>
          </div>

          <div class="xcorp-sub-menu">
            <!-- 2.1 Media Sản Phẩm -->
            <button class="sidebar-nav-item" data-panel="panel-vault-assets" data-title="MEDIA SẢN PHẨM">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m7.5 4.27 9 5.15" />
                    <path
                      d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg></span>
                <span class="sub-nav-label">Media Sản Phẩm</span>
              </span>
            </button>

            <!-- 2.2 Kho Ảnh Model -->
            <button class="sidebar-nav-item" data-panel="panel-vault-models" data-title="KHO ẢNH MODEL">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg></span>
                <span class="sub-nav-label">Kho Ảnh Model</span>
              </span>
            </button>

            <!-- 2.3 Kho Kịch Bản -->
            <button class="sidebar-nav-item" data-panel="panel-vault-angles" data-title="KHO KỊCH BẢN">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg></span>
                <span class="sub-nav-label">Kho Kịch Bản</span>
              </span>
            </button>

            <!-- 2.4 Kho Câu Hook -->
            <button class="sidebar-nav-item" data-panel="panel-vault-hooks" data-title="KHO CÂU HOOK">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg></span>
                <span class="sub-nav-label">Kho Câu Hook</span>
              </span>
            </button>

            <!-- 2.5 Kho Nhạc Nền BGM -->
            <button class="sidebar-nav-item" data-panel="panel-vault-bgm" data-title="KHO NHẠC NỀN BGM">
              <span class="xcorp-sub-lead">
                <span class="nav-menu-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg></span>
                <span class="sub-nav-label">Kho Nhạc Nền BGM</span>
              </span>
            </button>
          </div>
        </div>
      </div>'''

# Replace sidebar-scroll-content
sidebar_pattern = r'<div class="sidebar-scroll-content">.*?<\/aside>'
sidebar_replacement = new_sidebar_scroll + '\n    </aside>'
content = re.sub(sidebar_pattern, sidebar_replacement, content, flags=re.DOTALL)

# 2. HOME HUB PANEL & PROJECTS HUB PANEL
new_panels = '''      <!-- ===============================================================
           0. STUDIO HUB (TRANG CHỦ - HUB STUDIO VỚI 3 CORE FEATURES)
           =============================================================== -->
      <div id="panel-home-hub" class="stage-view-panel active">
        <div class="home-hub-wrapper">
          <!-- Hero Banner -->
          <div class="home-hub-hero">
            <div class="home-hero-badge">
              <span class="badge-dot" style="background: #10b981; width: 7px; height: 7px; border-radius: 50%; display: inline-block;"></span>
              HỆ THỐNG AI CONTENT FACTORY TIKTOK • MỸ NGUYÊN TSC
            </div>
            <h1 class="home-hero-title">Video AI Studio Hub</h1>
            <p class="home-hero-desc">
              Trung tâm sản xuất video ngắn TikTok tự động hóa số lượng lớn (10–50 video/ngày). Chọn một trong 3 công cụ cốt lõi bên dưới để bắt đầu hoặc mở tiếp dự án đang thực hiện.
            </p>
            <div class="home-hero-stats">
              <div class="home-stat-pill">
                <span>🎯 Tiêu Chuẩn:</span>
                <strong>Product Lock 100%</strong>
              </div>
              <div class="home-stat-pill">
                <span>⚡ Mục Tiêu:</span>
                <strong>20–50 Video/Ngày</strong>
              </div>
              <div class="home-stat-pill">
                <span>📁 Dự Án Đang Chạy:</span>
                <strong id="home-stat-projects-count">6 Dự Án</strong>
              </div>
              <div class="home-stat-pill">
                <span>🎬 Đã Hoàn Thành:</span>
                <strong>12 Video Sẵn Sàng Đăng</strong>
              </div>
            </div>
          </div>

          <!-- Section: 3 Core Features Prominently Displayed -->
          <div class="hub-section-header">
            <div>
              <h2 class="hub-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--xcorp-blue-500);">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                3 Công Cụ Sản Xuất Cốt Lõi (Core Features)
              </h2>
              <p class="hub-section-desc">Chọn quy trình phù hợp với nguyên liệu đầu vào của bạn</p>
            </div>
          </div>

          <div class="hub-core-grid">
            <!-- Core 1: Cắt Highlight Live (Ưu tiên số 1) -->
            <div class="hub-core-card highlight-card">
              <div>
                <div class="hub-core-header">
                  <div class="hub-core-icon red">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="6" cy="6" r="3" />
                      <path d="M8.12 8.12 12 12" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M14.8 14.8 20 20" />
                      <path d="m8.12 15.88 6.68-6.68" />
                      <path d="M17.6 6.4 20 4" />
                    </svg>
                  </div>
                  <span class="hub-core-badge" style="background: rgba(239, 68, 68, 0.12); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.25);">
                    Core 1 • Ưu Tiên Số 1
                  </span>
                </div>
                <h3 class="hub-core-title">Cắt Highlight Từ Livestream Dài</h3>
                <p class="hub-core-desc">
                  Tự động xử lý file live 1–3 giờ: bóc băng ASR Syrix, Gemini AI lọc khoảnh khắc chốt deal / tư vấn da, reframe 9:16, ghép Hook và lồng phụ đề tự động.
                </p>
                <div class="hub-core-features-list">
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>1 buổi live → Xuất 20–50 video ngắn TikTok</span>
                  </div>
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Giữ giọng streamer + BGM TikTok Auto-ducking</span>
                  </div>
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Chốt câu Hook 0–3s tăng giữ chân người xem</span>
                  </div>
                </div>
              </div>
              <button class="hub-core-btn btn-primary" id="home-btn-launch-live" style="background: linear-gradient(135deg, #ef4444, #f97316); box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);">
                <span>Vào Studio Cắt Highlight Live →</span>
              </button>
            </div>

            <!-- Core 2: Dựng Video Từ Ảnh Sản Phẩm -->
            <div class="hub-core-card">
              <div>
                <div class="hub-core-header">
                  <div class="hub-core-icon blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m15 4-2 4-4 2 4 2 2 4 2-4 4-2-4-2z" />
                      <path d="M9 15 2 22" />
                      <path d="M2 9l3-3" />
                      <path d="m18 15 3 3" />
                    </svg>
                  </div>
                  <span class="hub-core-badge" style="background: rgba(22, 119, 255, 0.12); color: var(--xcorp-blue-600); border: 1px solid rgba(22, 119, 255, 0.25);">
                    Core 2 • Multi-Engine
                  </span>
                </div>
                <h3 class="hub-core-title">Dựng Video Từ Ảnh Sản Phẩm</h3>
                <p class="hub-core-desc">
                  Chỉ từ 3–10 ảnh tĩnh bao bì thật: giữ nguyên tem mác (Product Lock), kết hợp avatar Dược sĩ HeyGen và cảnh 3D nước bắn / chuyển động chậm điện ảnh.
                </p>
                <div class="hub-core-features-list">
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Khóa bao bì thật 100% không biến dạng</span>
                  </div>
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Sinh 10–50 biến thể Hook & kịch bản khác nhau</span>
                  </div>
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>HeyGen Avatar tiếng Việt + B-Roll 3D cao cấp</span>
                  </div>
                </div>
              </div>
              <button class="hub-core-btn btn-secondary" id="home-btn-launch-img2vid">
                <span>Vào Studio Dựng Video Từ Ảnh →</span>
              </button>
            </div>

            <!-- Core 3: Chỉnh Sửa Từ Video Gốc -->
            <div class="hub-core-card">
              <div>
                <div class="hub-core-header">
                  <div class="hub-core-icon purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
                      <line x1="7" x2="7" y1="2" y2="22" />
                      <line x1="17" x2="17" y1="2" y2="22" />
                      <line x1="2" x2="22" y1="12" y2="12" />
                      <line x1="2" x2="7" y1="7" y2="7" />
                      <line x1="2" x2="7" y1="17" y2="17" />
                      <line x1="17" x2="22" y1="7" y2="7" />
                      <line x1="17" x2="22" y1="17" y2="17" />
                    </svg>
                  </div>
                  <span class="hub-core-badge" style="background: rgba(147, 51, 234, 0.12); color: #9333ea; border: 1px solid rgba(147, 51, 234, 0.25);">
                    Core 3 • Smart Polish
                  </span>
                </div>
                <h3 class="hub-core-title">Chỉnh Sửa Từ Video Gốc Thô</h3>
                <p class="hub-core-desc">
                  Nâng cấp video unboxing, test serum quay tay từ điện thoại: lọc cảnh nét, làm mịn da mẫu, lồng voiceover AI truyền cảm và phụ đề nhảy chữ Safe Zone.
                </p>
                <div class="hub-core-features-list">
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Làm mịn da mẫu tự nhiên, tăng sáng studio</span>
                  </div>
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Tự động crop chuẩn dọc 9:16 Full HD</span>
                  </div>
                  <div class="hub-core-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>Gắn tem chính ngạch Mỹ Nguyên TSC & CTA giỏ hàng</span>
                  </div>
                </div>
              </div>
              <button class="hub-core-btn btn-secondary" id="home-btn-launch-raw">
                <span>Vào Studio Chỉnh Sửa Video Gốc →</span>
              </button>
            </div>
          </div>

          <!-- Section: Recent Projects Quick Access -->
          <div class="hub-section-header" style="margin-top: 1rem;">
            <div>
              <h2 class="hub-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--xcorp-blue-500);">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                </svg>
                Dự Án Gần Đây (Recent Projects)
              </h2>
              <p class="hub-section-desc">Tiếp tục công việc đang thực hiện hoặc xem lại thành phẩm</p>
            </div>
            <button class="btn btn-outline btn-sm" id="home-btn-view-all-projects" style="font-weight: 700; color: var(--xcorp-blue-600); border-color: var(--xcorp-blue-300);">
              <span>Xem Tất Cả Dự Án →</span>
            </button>
          </div>

          <div class="projects-cards-grid" id="home-recent-projects-grid">
            <!-- Dynamically populated by JS matching Image 1 & 2 -->
          </div>
        </div>
      </div>

      <!-- ===============================================================
           0.1 PROJECTS HUB (QUẢN LÝ DỰ ÁN TẬP TRUNG - MATCHING ẢNH 1 & ẢNH 2)
           =============================================================== -->
      <div id="panel-projects-hub" class="stage-view-panel">
        <div class="projects-hub-container">
          <!-- Cột Trái: Cây Thư Mục Quản Lý (Matching Ảnh 1) -->
          <aside class="projects-sub-sidebar">
            <div class="sub-sidebar-title-row">
              <span class="sub-sidebar-title">Projects</span>
              <button class="btn-icon-sm" id="btn-create-folder-shortcut" title="Tạo Thư Mục Mới" style="background: none; border: none; cursor: pointer; color: var(--text-muted);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            <!-- Nút My Projects gốc -->
            <button class="sub-sidebar-nav-item active" data-folder-filter="all" id="btn-folder-all">
              <span class="sub-sidebar-nav-lead">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <path d="m10 15 5-3-5-3v6Z" />
                </svg>
                <span>My Projects</span>
              </span>
              <span class="badge-tag" id="folder-count-all" style="font-size: 0.68rem; font-weight: 700;">6</span>
            </button>

            <!-- Nút + New Folder -->
            <button class="btn-new-folder-trigger" id="btn-trigger-new-folder-modal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>+ New Folder</span>
            </button>

            <!-- Danh sách Thư mục người dùng tạo (Ảnh 1: SALE 10/10...) -->
            <div class="folder-tree-list" id="project-folders-tree-list">
              <!-- Dynamically populated by JS -->
            </div>

            <!-- Thùng rác -->
            <div class="sub-sidebar-bottom-item">
              <button class="sub-sidebar-nav-item" data-folder-filter="trash" style="color: var(--text-muted);">
                <span class="sub-sidebar-nav-lead">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span>Trash</span>
                </span>
                <span style="font-size: 0.72rem; color: var(--text-muted);">0</span>
              </button>
            </div>
          </aside>

          <!-- Cột Phải: Không Gian Dự Án Chính (Matching Ảnh 1 & Ảnh 2) -->
          <main class="projects-main-view">
            <!-- Topbar Header -->
            <div class="projects-topbar-header">
              <div>
                <h1 class="projects-page-main-title">Projects</h1>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 3px;">
                  Hub quản lý tập trung: mọi dữ liệu live nguồn, clip thô và video thành phẩm đều nằm trọn vẹn trong dự án.
                </p>
              </div>
              <div class="projects-top-actions">
                <button class="btn btn-primary" id="btn-projects-create-new" style="display: flex; align-items: center; gap: 6px; font-weight: 700; padding: 0.55rem 1.25rem;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  <span>+ Tạo Dự Án Mới</span>
                </button>
              </div>
            </div>

            <!-- Top Filter Tabs (Categorize theo 3 Core Features - Matching Ảnh 1: My Projects, Avatar Video, Agent...) -->
            <div class="projects-category-tabs-bar" id="projects-core-category-tabs">
              <button class="project-cat-tab active" data-core-cat="all">Tất Cả Dự Án</button>
              <button class="project-cat-tab" data-core-cat="livestream">Cắt Highlight Live</button>
              <button class="project-cat-tab" data-core-cat="image_to_video">Dựng Video Từ Ảnh</button>
              <button class="project-cat-tab" data-core-cat="raw_edit">Chỉnh Sửa Video Gốc</button>
            </div>

            <!-- Filter & Search Controls -->
            <div class="projects-filter-controls-row">
              <div class="projects-search-box">
                <input type="text" id="projects-search-input" class="form-input" placeholder="Tìm kiếm theo tên dự án, sản phẩm, streamer, hashtag..." />
              </div>
              <div style="display: flex; gap: 8px;">
                <select id="projects-status-filter" class="form-select" style="min-width: 170px;">
                  <option value="all">Tất cả trạng thái</option>
                  <option value="processing">Đang hậu kỳ</option>
                  <option value="pending_review">Chờ duyệt</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              </div>
            </div>

            <!-- Heading Timeline (Ảnh 1: TODAY) -->
            <div class="projects-time-heading" id="projects-timeline-heading">
              GẦN ĐÂY / TODAY
            </div>

            <!-- Projects Grid (Matching Ảnh 2 Info Structure + Video Thumbnail) -->
            <div class="projects-cards-grid" id="projects-list-grid">
              <!-- Dynamically populated by JS renderProjectsHub() -->
            </div>
          </main>
        </div>
      </div>
'''

# Replace active from panel-multi-engine and insert new panels before it
content = content.replace(
    '<div id="panel-multi-engine" class="stage-view-panel active">',
    new_panels + '\n      <div id="panel-multi-engine" class="stage-view-panel">'
)

# 3. MODAL FOR PROJECT DETAIL
new_project_modal = '''  <!-- ===================================================================
       MODAL: CHI TIẾT DỰ ÁN & QUẢN LÝ VIDEO THÀNH PHẨM / CLIP THÔ
       =================================================================== -->
  <div class="modal-backdrop" id="modal-project-detail" style="display: none;">
    <div class="modal-dialog" style="max-width: 960px;">
      <div class="modal-header">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge-tag" id="modal-prj-type-badge" style="background: rgba(22, 119, 255, 0.1); color: var(--xcorp-blue-600); font-weight: 700;">DỰ ÁN</span>
            <span class="modal-title" id="modal-prj-title">Chi Tiết Dự Án</span>
          </div>
          <div id="modal-prj-status-line" style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
            Trạng thái: Đang hậu kỳ • Cập nhật gần nhất: 10:35
          </div>
        </div>
        <button class="modal-close-btn" data-close="modal-project-detail">&times;</button>
      </div>
      <div class="modal-body" style="padding: 1.25rem 1.5rem;">
        <!-- Modal Tabs -->
        <div class="project-modal-tabs">
          <button class="project-modal-tab-btn active" data-ptab="finished" id="btn-ptab-finished">
            🎬 Video Thành Phẩm (<span id="modal-prj-finished-count">4</span>)
          </button>
          <button class="project-modal-tab-btn" data-ptab="raw" id="btn-ptab-raw">
            ✂️ Clip Thô Đang Duyệt (<span id="modal-prj-raw-count">10</span>)
          </button>
          <button class="project-modal-tab-btn" data-ptab="source" id="btn-ptab-source">
            📦 Dữ Liệu Nguồn
          </button>
        </div>

        <!-- Tab 1: Video Thành Phẩm -->
        <div id="modal-ptab-content-finished">
          <div class="project-modal-clips-grid" id="modal-prj-finished-grid">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Tab 2: Clip Thô -->
        <div id="modal-ptab-content-raw" style="display: none;">
          <div class="project-modal-clips-grid" id="modal-prj-raw-grid">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Tab 3: Dữ Liệu Nguồn -->
        <div id="modal-ptab-content-source" style="display: none;">
          <div class="glass-card" style="padding: 1.25rem;" id="modal-prj-source-box">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>
      <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn btn-primary btn-sm" id="btn-modal-open-in-studio">
          <span>Mở Dự Án Trong Studio →</span>
        </button>
        <button class="btn btn-secondary btn-sm" data-close="modal-project-detail">Đóng</button>
      </div>
    </div>
  </div>
'''

content = content.replace('  <!-- Scripts -->', new_project_modal + '\n  <!-- Scripts -->')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully updated index.html!")
