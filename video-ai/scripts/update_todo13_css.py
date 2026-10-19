import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

todo13_css = '''
/* ==========================================================================
   TODO 13: KHO KỊCH BẢN VIDEO - TABLE & DETAILED SCENE EDITOR (MATCHING ANH 1 & 2)
   ========================================================================== */

/* Main Header */
.script-vault-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.script-page-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.script-vault-top-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.btn-script-outline {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  color: var(--text-main);
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.55rem 1.15rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--trans-fast);
  box-shadow: var(--shadow-xs);
}
.btn-script-outline:hover {
  background: var(--bg-surface-hover);
  border-color: var(--border-strong);
}

.btn-script-ai-auto {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  border: none;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
  transition: all var(--trans-fast);
}
.btn-script-ai-auto:hover {
  background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.45);
  transform: translateY(-1px);
}

/* Filter Card */
.script-filter-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.15rem 1.35rem;
  margin-bottom: 1.25rem;
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.script-search-sku-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.script-search-input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.script-search-input-wrap svg {
  position: absolute;
  left: 14px;
  color: var(--text-dim);
  pointer-events: none;
}

.script-search-input {
  width: 100%;
  height: 42px;
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 0 1rem 0 2.4rem;
  font-size: 0.88rem;
  color: var(--text-main);
  outline: none;
  transition: all var(--trans-fast);
}
.script-search-input:focus {
  background: var(--bg-surface);
  border-color: var(--xcorp-blue-500);
  box-shadow: 0 0 0 2px var(--ring-focus);
}

.script-sku-filter-select {
  width: 260px;
  height: 42px;
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 0 1rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-main);
  outline: none;
  cursor: pointer;
  transition: all var(--trans-fast);
}
.script-sku-filter-select:focus {
  border-color: var(--xcorp-blue-500);
}

/* Category Filter Tabs Bar (Anh 1) */
.script-category-tabs-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.script-cat-tab {
  background: transparent;
  border: 1px solid transparent;
  padding: 0.4rem 0.95rem;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--trans-fast);
}
.script-cat-tab:hover {
  color: var(--text-main);
  background: var(--bg-surface-hover);
}

.script-cat-tab.active {
  background: #0f172a !important;
  color: #ffffff !important;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
}
[data-theme="dark"] .script-cat-tab.active {
  background: #f8fafc !important;
  color: #0f172a !important;
}

/* Table View Container (Anh 1) */
.script-table-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}

.script-datatable {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.script-datatable th {
  background: var(--bg-surface-subtle);
  padding: 0.95rem 1.15rem;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-default);
}

.script-datatable td {
  padding: 1.15rem 1.15rem;
  font-size: 0.88rem;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}

.script-datatable tr:last-child td {
  border-bottom: none;
}

.script-datatable tr:hover td {
  background: var(--bg-surface-hover);
}

/* Table cell elements */
.script-row-title-bold {
  font-size: 0.94rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
  margin-bottom: 0.25rem;
}

.script-row-sub-meta {
  font-size: 0.78rem;
  color: var(--text-dim);
}

/* Group Tags */
.tag-group-edu {
  display: inline-block;
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-group-edu {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}

.tag-group-asmr {
  display: inline-block;
  background: #fdf4ff;
  color: #a855f7;
  border: 1px solid #f5d0fe;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-group-asmr {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.3);
}

.tag-group-trend {
  display: inline-block;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-group-trend {
  background: rgba(22, 163, 74, 0.15);
  color: #4ade80;
  border-color: rgba(22, 163, 74, 0.3);
}

.tag-group-intro {
  display: inline-block;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-group-intro {
  background: rgba(37, 99, 235, 0.15);
  color: #60a5fa;
  border-color: rgba(37, 99, 235, 0.3);
}

/* Status Pills (Anh 1) */
.status-pill-ready {
  display: inline-block;
  background: #ecfdf5;
  color: #10b981;
  border: 1px solid #a7f3d0;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
}
[data-theme="dark"] .status-pill-ready {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.3);
}

.status-pill-testing {
  display: inline-block;
  background: #f0f9ff;
  color: #0284c7;
  border: 1px solid #bae6fd;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
}
[data-theme="dark"] .status-pill-testing {
  background: rgba(2, 132, 199, 0.15);
  color: #38bdf8;
  border-color: rgba(2, 132, 199, 0.3);
}

.status-pill-draft {
  display: inline-block;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
}
[data-theme="dark"] .status-pill-draft {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  border-color: rgba(255, 255, 255, 0.1);
}

/* Actions in Table (Anh 1) */
.script-table-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.65rem;
}

.btn-table-detail {
  background: transparent;
  border: none;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 6px;
  transition: color var(--trans-fast);
}
.btn-table-detail:hover {
  color: var(--xcorp-blue-600);
}

.btn-table-create-video {
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--trans-fast);
  white-space: nowrap;
}
.btn-table-create-video:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
[data-theme="dark"] .btn-table-create-video {
  background: #f8fafc;
  color: #0f172a;
}
[data-theme="dark"] .btn-table-create-video:hover {
  background: #e2e8f0;
}

/* ==========================================================================
   VIEW 2: DETAILED SCENE EDITOR (MATCHING ANH 2)
   ========================================================================== */
.editor-header-nav {
  margin-bottom: 0.75rem;
}

.btn-back-breadcrumb {
  background: transparent;
  border: none;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  transition: color var(--trans-fast);
}
.btn-back-breadcrumb:hover {
  color: var(--xcorp-blue-600);
}

.editor-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.editor-main-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.3;
  margin-bottom: 0.4rem;
}

.editor-meta-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.86rem;
  color: var(--text-muted);
}

.editor-divider {
  color: var(--border-strong);
}

.editor-status-badge {
  background: #ecfdf5;
  color: #10b981;
  border: 1px solid #a7f3d0;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  font-size: 0.78rem;
  font-weight: 700;
}

.editor-top-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.btn-script-create-video {
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.55rem 1.25rem;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
  transition: all var(--trans-fast);
}
.btn-script-create-video:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
[data-theme="dark"] .btn-script-create-video {
  background: #f8fafc;
  color: #0f172a;
}

/* Scene Editor Card (Anh 2) */
.editor-scenes-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.scene-editor-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.35rem 1.65rem;
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scene-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.75rem;
}

.scene-badge-title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.scene-pill-badge {
  background: #0f172a;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 800;
  font-family: var(--font-mono);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.04em;
}
[data-theme="dark"] .scene-pill-badge {
  background: #f8fafc;
  color: #0f172a;
}

.scene-name-title {
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--text-main);
}

.scene-timerange-tag {
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-size: 0.76rem;
  font-weight: 600;
  font-family: var(--font-mono);
  padding: 2px 7px;
  border-radius: 4px;
}

.scene-duration-label {
  font-size: 0.82rem;
  color: var(--text-dim);
}

/* Hook Variant Switcher Row (Anh 2) */
.scene-hook-variants-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}

.variants-label {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-muted);
}

.variants-pills {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.variant-pill-btn {
  background: transparent;
  border: 1px solid var(--border-default);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  transition: all var(--trans-fast);
}
.variant-pill-btn:hover {
  background: var(--bg-surface-hover);
}

.variant-pill-btn.active {
  background: #0f172a !important;
  color: #ffffff !important;
  border-color: #0f172a !important;
}
[data-theme="dark"] .variant-pill-btn.active {
  background: #f8fafc !important;
  color: #0f172a !important;
  border-color: #f8fafc !important;
}

.variant-pill-btn.add-new {
  color: var(--xcorp-blue-600);
  border-color: var(--xcorp-blue-200);
}

/* Scene Form Fields (Anh 2) */
.scene-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.scene-field-label {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-main);
}

.scene-textarea {
  width: 100%;
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: var(--text-main);
  line-height: 1.5;
  outline: none;
  resize: vertical;
  transition: all var(--trans-fast);
  font-family: inherit;
}
.scene-textarea:focus {
  background: var(--bg-surface);
  border-color: var(--xcorp-blue-500);
  box-shadow: 0 0 0 2px var(--ring-focus);
}
'''

with open('prototype/styles.css', 'w', encoding='utf-8') as f:
    f.write(css + '\n' + todo13_css)

print("Appended todo13 styles to styles.css successfully!")
