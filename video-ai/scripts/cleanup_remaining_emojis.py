import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Line 572: Sửa Thông Tin & USP button in banner
code = code.replace(
    '✏️ Sửa Thông Tin & USP',
    '${ICONS.edit} Sửa Thông Tin & USP'
)

# 2. Line 626: Empty folder icon
code = code.replace(
    '<div style="font-size: 2rem; margin-bottom: 0.5rem;">📂</div>',
    '<div style="margin-bottom: 0.5rem; color: var(--xcorp-blue-500);"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div>'
)

# 3. Line 650 & 652: Drive assets cards actions
code = code.replace(
    "${file.type === 'video' ? '▶ Xem Video' : '👁️ Xem Ảnh'}",
    "${file.type === 'video' ? ICONS.play + ' Xem Video' : '<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg> Xem Ảnh'}"
)
code = code.replace(
    '<button class="btn btn-outline btn-xs btn-drive-rename" data-id="${file.id}">✏️ Đổi Tên</button>',
    '<button class="btn btn-secondary btn-sm btn-drive-rename" data-id="${file.id}">${ICONS.edit} Đổi Tên</button>'
)

# 4. Dropdown options in Step 4 and Step 5: Clean text without raw emojis
code = code.replace(
    "<option value=\"${f.id}\" ${f.id === currentVal ? 'selected' : ''}>📁 ${f.name}</option>",
    "<option value=\"${f.id}\" ${f.id === currentVal ? 'selected' : ''}>${f.name}</option>"
)
code = code.replace(
    "<option value=\"${m.id}\" ${m.id === currentVal ? 'selected' : ''}>👤 ${m.name} (${(m.angles || []).length} góc)</option>",
    "<option value=\"${m.id}\" ${m.id === currentVal ? 'selected' : ''}>${m.name} (${(m.angles || []).length} góc)</option>"
)

# 5. Model details header:
code = code.replace(
    '✏️ Đổi Tên Thư Mục',
    '${ICONS.edit} Đổi Tên Thư Mục'
)
code = code.replace(
    '<h3 style="font-size: 1.2rem; font-weight: 800; color: #fff; margin: 0 0 0.25rem 0;">📁 Thư Mục: ${model.name}</h3>',
    '<h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin: 0 0 0.25rem 0;">Thư Mục: ${model.name}</h3>'
)

# 6. Script groups definition and cards
code = code.replace(
    "{ id: 'all', name: 'Tất Cả Kịch Bản', icon: '📂' },",
    "{ id: 'all', name: 'Tất Cả Kịch Bản', icon: '' },"
)
code = code.replace(
    "{ id: 'Nhóm Giáo Dục', name: 'Nhóm Giáo Dục', icon: '📁' },",
    "{ id: 'Nhóm Giáo Dục', name: 'Nhóm Giáo Dục', icon: '' },"
)
code = code.replace(
    "{ id: 'Nhóm Giới Thiệu', name: 'Nhóm Giới Thiệu', icon: '📁' },",
    "{ id: 'Nhóm Giới Thiệu', name: 'Nhóm Giới Thiệu', icon: '' },"
)
code = code.replace(
    "{ id: 'Nhóm POV & Trending', name: 'Nhóm POV & Trending', icon: '📁' },",
    "{ id: 'Nhóm POV & Trending', name: 'Nhóm POV & Trending', icon: '' },"
)
code = code.replace(
    "{ id: 'Nhóm Trải Nghiệm & ASMR', name: 'Nhóm Trải Nghiệm & ASMR', icon: '📁' },",
    "{ id: 'Nhóm Trải Nghiệm & ASMR', name: 'Nhóm Trải Nghiệm & ASMR', icon: '' },"
)
code = code.replace(
    "{ id: 'Tải Lên Từ File', name: 'Tệp Tải Lên', icon: '📁' }",
    "{ id: 'Tải Lên Từ File', name: 'Tệp Tải Lên', icon: '' }"
)
code = code.replace(
    "📁 ${script.group || 'Kịch Bản'}",
    "${script.group || 'Kịch Bản'}"
)
code = code.replace(
    '<button class="btn btn-outline btn-xs btn-edit-script" data-id="${script.id}">✏️ Sửa</button>',
    '<button class="btn btn-secondary btn-sm btn-edit-script" data-id="${script.id}">${ICONS.edit} Sửa</button>'
)

# 7. Hook cards buttons
code = code.replace(
    '<button class="btn btn-outline btn-xs btn-copy-hook" data-id="${hook.id}">📋 Sao Chép Hook</button>',
    '<button class="btn btn-secondary btn-sm btn-copy-hook" data-id="${hook.id}">${ICONS.copy} Sao Chép</button>'
)
code = code.replace(
    '<button class="btn btn-outline btn-xs btn-edit-hook" data-id="${hook.id}">✏️ Sửa</button>',
    '<button class="btn btn-secondary btn-sm btn-edit-hook" data-id="${hook.id}">${ICONS.edit} Sửa</button>'
)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Remaining emojis cleaned up from app.js!")
