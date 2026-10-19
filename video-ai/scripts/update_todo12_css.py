import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

todo12_styles = '''
/* ==========================================================================
   TODO 12 REFINEMENTS & CRITICAL UX OVERHAUL
   ========================================================================== */

/* Logo styling */
.brand-badge-logo {
  overflow: hidden;
  background: #ffffff !important;
  border: 1px solid var(--border-default);
}
.brand-badge-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.login-brand-logo-badge {
  overflow: hidden;
  background: #ffffff !important;
  border: 1px solid rgba(255,255,255,0.2);
}
.login-brand-logo-badge img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Item 3: Button Lưu Vào Kho Video Thành Phẩm Padding & Separation */
.btn-save-finished-video {
  width: 100%;
  height: 48px;
  padding: 0.85rem 1.5rem !important;
  font-size: 0.94rem !important;
  font-weight: 700 !important;
  border-radius: var(--radius-md) !important;
  box-shadow: 0 4px 14px rgba(22, 119, 255, 0.28) !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all var(--trans-fast);
}
.btn-save-finished-video:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(22, 119, 255, 0.4) !important;
}

/* Item 6: Livestream Module Padding & Professional Row Card Layout */
#panel-livestream {
  padding: 1.5rem 1.75rem;
}

.livestream-session-info {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.35rem 1.65rem !important;
  margin-bottom: 1.5rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-xs);
}

.timeline-visualizer {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.35rem 1.65rem !important;
  margin-bottom: 1.5rem !important;
  box-shadow: var(--shadow-xs);
}

/* Clip Row Card: Modern SaaS Layout Without Ragged Line Breaks */
.livestream-clip-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.15rem 1.35rem !important;
  cursor: pointer;
  transition: all var(--trans-fast);
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.livestream-clip-card:hover {
  border-color: var(--xcorp-blue-400);
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
}

.livestream-clip-card.selected {
  background: var(--xcorp-blue-50) !important;
  border-color: var(--xcorp-blue-500) !important;
  box-shadow: 0 0 0 1px var(--xcorp-blue-500), var(--shadow-md) !important;
}
[data-theme="dark"] .livestream-clip-card.selected {
  background: rgba(22, 119, 255, 0.12) !important;
  border-color: var(--xcorp-blue-400) !important;
}

.clip-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.clip-title-group {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.clip-idx-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: #fff;
  background: var(--xcorp-blue-500);
  border-radius: 6px;
  padding: 2px 7px;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.livestream-clip-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Strictly prevent timestamp wrapping onto 3 lines */
.clip-time-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--xcorp-blue-600);
  background: var(--xcorp-blue-100);
  border: 1px solid var(--xcorp-blue-200);
  border-radius: var(--radius-pill);
  padding: 3px 10px;
  font-family: var(--font-mono);
  white-space: nowrap !important;
  flex-shrink: 0;
}
[data-theme="dark"] .clip-time-badge {
  background: rgba(22, 119, 255, 0.2);
  color: var(--xcorp-blue-300);
  border-color: rgba(22, 119, 255, 0.4);
}

.clip-summary-text {
  font-size: 0.86rem;
  color: var(--text-body);
  line-height: 1.45;
}

.clip-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
  padding-top: 0.65rem;
  border-top: 1px dashed var(--border-subtle);
}

.clip-hook-tag {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

/* Item 8: Complete Script Vault UI Styles */
.script-card-item {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.35rem 1.5rem;
  box-shadow: var(--shadow-xs);
  transition: all var(--trans-normal);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.script-card-item:hover {
  border-color: var(--xcorp-blue-400);
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.script-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.script-card-title-col {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.script-badge-group {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--xcorp-blue-600);
  background: var(--xcorp-blue-50);
  border: 1px solid var(--xcorp-blue-200);
  padding: 2px 8px;
  border-radius: var(--radius-xs);
  align-self: flex-start;
}
[data-theme="dark"] .script-badge-group {
  background: rgba(22, 119, 255, 0.15);
  color: var(--xcorp-blue-300);
  border-color: rgba(22, 119, 255, 0.3);
}

.script-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
}

.script-card-specs {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
}

.spec-pill {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-default);
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
}

.script-card-hook-box {
  background: var(--bg-surface-subtle);
  border-left: 3px solid var(--xcorp-blue-500);
  border-radius: var(--radius-xs);
  padding: 0.75rem 1rem;
}

.script-card-hook-box .hook-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--xcorp-blue-600);
  display: block;
  margin-bottom: 2px;
}
[data-theme="dark"] .script-card-hook-box .hook-label {
  color: var(--xcorp-blue-400);
}

.script-card-hook-box .hook-content {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.45;
  font-style: italic;
}

.script-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

.script-audience-tag {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.script-card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Item 9: Decluttered Minimalist Hook Cards */
.hook-vault-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.85rem;
  box-shadow: var(--shadow-xs);
  transition: all var(--trans-fast);
}

.hook-vault-card:hover {
  border-color: var(--xcorp-blue-400);
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.hook-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hook-type-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--xcorp-blue-600);
  background: var(--xcorp-blue-50);
  border: 1px solid var(--xcorp-blue-200);
  padding: 2px 8px;
  border-radius: 6px;
}
[data-theme="dark"] .hook-type-badge {
  background: rgba(22, 119, 255, 0.15);
  color: var(--xcorp-blue-300);
  border-color: rgba(22, 119, 255, 0.3);
}

.hook-duration-badge {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-dim);
  font-family: var(--font-mono);
}

.hook-card-text {
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.45;
  margin: 0.25rem 0;
}

.hook-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--border-subtle);
}

.hook-persona-tag {
  font-size: 0.76rem;
  color: var(--text-muted);
}

.hook-card-actions {
  display: flex;
  gap: 0.45rem;
}
'''

with open('prototype/styles.css', 'w', encoding='utf-8') as f:
    f.write(css + '\n' + todo12_styles)

print("Appended todo12 styles to styles.css successfully!")
