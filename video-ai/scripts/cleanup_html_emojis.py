import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace save buttons with clean SVG or text
html = html.replace(
    '💾 Lưu Vào Kho Video Thành Phẩm',
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Lưu Vào Kho Video Thành Phẩm'
)

# Replace livestream button
html = html.replace(
    '<span>⚡</span>\n              <span>+ Nạp Video Live Mới</span>',
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg><span>+ Nạp Video Live Mới</span>'
)

# Replace approve clip button
html = html.replace(
    '✓ Chốt Duyệt & Xuất Bản Clip Này',
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;"><polyline points="20 6 9 17 4 12"/></svg>Chốt Duyệt & Xuất Bản Clip Này'
)

# Replace Script Hero Cards icons
html = html.replace(
    '<div class="script-hero-icon">✍️</div>',
    '<div class="script-hero-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></div>'
)
html = html.replace(
    '<div class="script-hero-icon">✨</div>',
    '<div class="script-hero-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg></div>'
)
html = html.replace(
    '<div class="script-hero-title">✨ AI Tạo Kịch Bản</div>',
    '<div class="script-hero-title">AI Tạo Kịch Bản</div>'
)
html = html.replace(
    '<div class="script-hero-icon">📄</div>',
    '<div class="script-hero-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>'
)

# Replace modals buttons and icons
html = html.replace(
    '📥 Tải File (.md)',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Tải File (.md)'
)
html = html.replace(
    '✏️ Chỉnh Sửa Kịch Bản',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Chỉnh Sửa Kịch Bản'
)
html = html.replace(
    '<div style="font-size: 2rem; color: var(--xcorp-blue-500); margin-bottom: 0.5rem;">📄</div>',
    '<div style="margin-bottom: 0.5rem; color: var(--xcorp-blue-500);"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>'
)
html = html.replace(
    '<div class="modal-title" id="edit-product-modal-title">✏️ Chỉnh Sửa Thông Tin Sản Phẩm & USP</div>',
    '<div class="modal-title" id="edit-product-modal-title">Chỉnh Sửa Thông Tin Sản Phẩm & USP</div>'
)
html = html.replace(
    '<div class="modal-title" id="edit-model-modal-title">✏️ Chỉnh Sửa Tên Thư Mục Model</div>',
    '<div class="modal-title" id="edit-model-modal-title">Chỉnh Sửa Tên Thư Mục Model</div>'
)
html = html.replace(
    '📋 Sao Chép',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>Sao Chép'
)
html = html.replace(
    '⬇ Tải MP4',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Tải MP4'
)

with open('prototype/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Cleaned up remaining emojis in index.html!")
