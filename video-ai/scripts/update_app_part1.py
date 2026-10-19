import sys
import os

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's inspect where to insert ROLES and helpers.
# In app.js, line 22 is "const data = window.PROTOTYPE_DATA || {};"
# We can define ROLES and SVG icons right after data.

insertion_marker = "const data = window.PROTOTYPE_DATA || {};"

roles_and_icons_code = '''const data = window.PROTOTYPE_DATA || {};

  /* ==========================================================================
     ROLE-BASED ACCESS CONTROL & USER PROFILES (MATCHING ANH 1 & ANH 2)
     ========================================================================== */
  const ROLES = [
    {
      id: 'hung_nv',
      name: 'Nguyễn Văn Hùng',
      title: 'Chỉ huy trưởng Công trường',
      fullTitle: 'Quản trị viên / Chỉ huy trưởng Studio',
      badge: 'Chỉ huy trưởng Công trường',
      unit: 'Ban Chỉ huy Kênh Mỹ Nguyên TSC',
      avatarClass: 'avatar-orange',
      initials: 'VH',
      credits: '1,250 Credits'
    },
    {
      id: 'bao_pq',
      name: 'Phạm Quốc Bảo',
      title: 'Trưởng ban An toàn HSE',
      fullTitle: 'Trưởng ban Kịch bản & Content Marketing',
      badge: 'Trưởng ban An toàn HSE',
      unit: 'Ban Kịch bản & Viral Hooks TikTok',
      avatarClass: 'avatar-red',
      initials: 'PB',
      credits: '820 Credits'
    },
    {
      id: 'duc_tm',
      name: 'Trần Minh Đức',
      title: 'Cán bộ HSE Hiện trường',
      fullTitle: 'Chuyên viên Biên tập Video AI',
      badge: 'Cán bộ HSE Hiện trường',
      unit: 'Tổ Vận hành AI Engine & Livestream Cuts',
      avatarClass: 'avatar-blue',
      initials: 'MĐ',
      credits: '650 Credits'
    },
    {
      id: 'long_lh',
      name: 'Lê Hoàng Long',
      title: 'Chỉ huy Đội Coffa & Cốt thép',
      fullTitle: 'Quản lý Kênh TikTok Shop & Ads',
      badge: 'Chỉ huy Đội Kênh',
      unit: 'Bộ phận Tăng trưởng GTM TikTok Shop',
      avatarClass: 'avatar-purple',
      initials: 'HL',
      credits: '1,500 Credits'
    },
    {
      id: 'bgd_incons',
      name: 'Ban Giám Đốc INCONS',
      title: 'Lãnh đạo Ban Điều Hành',
      fullTitle: 'Ban Giám Đốc Xcorp (Lãnh đạo Điều Hành)',
      badge: 'Lãnh đạo Ban Điều Hành',
      unit: 'Hội đồng Quản trị & Điều hành Hệ sinh thái',
      avatarClass: 'avatar-green',
      initials: 'BĐH',
      credits: 'Không giới hạn'
    }
  ];

  /* ==========================================================================
     CLEAN PROFESSIONAL SVG ICONS (REPLACING UNPROFESSIONAL RAW EMOJIS)
     ========================================================================== */
  const ICONS = {
    folder: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    folderOpen: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>',
    users: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    user: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    edit: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    external: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    play: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    download: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    copy: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    camera: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    sparkle: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>'
  };'''

code = code.replace(insertion_marker, roles_and_icons_code, 1)

# In state, add activeRoleId: 'hung_nv'
code = code.replace(
    "activePanel: 'panel-multi-engine', // Default active panel",
    "activePanel: 'panel-multi-engine', // Default active panel\n    activeRoleId: 'hung_nv', // Default selected role"
)

# In DOM element cache, add the new elements
dom_marker = "const DOM = {"
dom_additions = '''const DOM = {
    // Authentication & Command Center Portal (Anh 1 & Anh 2)
    loginPortalScreen: document.getElementById('login-portal-screen'),
    loginRolesContainer: document.getElementById('login-roles-container'),
    btnLoginSubmitPortal: document.getElementById('btn-login-submit-portal'),
    btnLoginPortalLabel: document.getElementById('btn-login-portal-label'),

    // Topbar Profile & Account Management Popover (Anh 2)
    topbarUserProfile: document.getElementById('topbar-user-profile'),
    topbarAvatarBadge: document.getElementById('topbar-avatar-badge'),
    topbarUserName: document.getElementById('topbar-user-name'),
    topbarUserRole: document.getElementById('topbar-user-role'),
    accountDropdownPopover: document.getElementById('account-dropdown-popover'),
    popoverUserName: document.getElementById('popover-user-name'),
    popoverUserUnit: document.getElementById('popover-user-unit'),
    popoverUserBadge: document.getElementById('popover-user-badge'),
    btnPopoverThemeToggle: document.getElementById('btn-popover-theme-toggle'),
    popoverThemeLabel: document.getElementById('popover-theme-label'),
    accountRolesList: document.getElementById('account-roles-list'),
    btnAccountLogout: document.getElementById('btn-account-logout'),

    // Video Generation Realistic Flow (Item 5)
    engineStandbyScreen: document.getElementById('engine-standby-screen'),
    engineRenderOverlay: document.getElementById('engine-render-overlay'),
    renderStepTitle: document.getElementById('render-step-title'),
    renderStepSub: document.getElementById('render-step-sub'),
    renderProgressFill: document.getElementById('render-progress-fill'),
    renderPercentTxt: document.getElementById('render-percent-txt'),
    engineBrandBadge: document.getElementById('engine-brand-badge'),
    engineBrollPackshot: document.getElementById('engine-broll-packshot'),
'''

code = code.replace(dom_marker, dom_additions, 1)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Added ROLES, ICONS, state.activeRoleId and DOM cache elements to app.js")
