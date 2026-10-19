import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Updating styles.css...")
with open('prototype/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_styles = '''
/* ==========================================================================
   KHO CÂU HOOK TIKTOK (THEO PHONG CÁCH XCORP & ẢNH 1, ẢNH 3)
   ========================================================================== */
.hook-vault-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.hook-page-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.hook-page-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.hook-vault-top-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.btn-hook-outline {
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
.btn-hook-outline:hover {
  background: var(--bg-surface-hover);
  border-color: var(--border-strong);
}

.btn-hook-dark {
  background: #0f172a;
  color: #ffffff;
  border: none;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
  transition: all var(--trans-fast);
}
.btn-hook-dark:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
[data-theme="dark"] .btn-hook-dark {
  background: #f8fafc;
  color: #0f172a;
}

/* Filter Card */
.hook-filter-card {
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

.hook-search-sku-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.hook-search-input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.hook-search-input-wrap svg {
  position: absolute;
  left: 14px;
  color: var(--text-dim);
  pointer-events: none;
}

.hook-search-input {
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
.hook-search-input:focus {
  background: var(--bg-surface);
  border-color: var(--xcorp-blue-500);
  box-shadow: 0 0 0 2px var(--ring-focus);
}

.hook-sku-select {
  width: 270px;
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
.hook-sku-select:focus {
  border-color: var(--xcorp-blue-500);
}

/* Category Filter Tabs Bar (Anh 1) */
.hook-category-tabs-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.hook-cat-tab {
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
.hook-cat-tab:hover {
  color: var(--text-main);
  background: var(--bg-surface-hover);
}

.hook-cat-tab.active {
  background: #0f172a !important;
  color: #ffffff !important;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
}
[data-theme="dark"] .hook-cat-tab.active {
  background: #f8fafc !important;
  color: #0f172a !important;
}

/* Hook Cards Stack & Items (Anh 1) */
.hook-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.hook-card-item {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 1.35rem 1.65rem;
  box-shadow: var(--shadow-xs);
  transition: all var(--trans-fast);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.hook-card-item:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-sm);
}

.hook-card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Tag categories */
.tag-hook-warning {
  display: inline-block;
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-warning {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}

.tag-hook-expert {
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-expert {
  background: rgba(37, 99, 235, 0.15);
  color: #60a5fa;
  border-color: rgba(37, 99, 235, 0.3);
}

.tag-hook-glass {
  display: inline-block;
  background: #fdf4ff;
  color: #a855f7;
  border: 1px solid #f5d0fe;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-glass {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.3);
}

.tag-hook-comedy {
  display: inline-block;
  background: #fef2f2;
  color: #e11d48;
  border: 1px solid #fecdd3;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-comedy {
  background: rgba(225, 29, 72, 0.15);
  color: #fb7185;
  border-color: rgba(225, 29, 72, 0.3);
}

.tag-hook-pov {
  display: inline-block;
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-pov {
  background: rgba(22, 163, 74, 0.15);
  color: #4ade80;
  border-color: rgba(22, 163, 74, 0.3);
}

.tag-hook-routine {
  display: inline-block;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-routine {
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  border-color: rgba(255, 255, 255, 0.15);
}

.hook-sku-code-tag {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-dim);
}

.hook-sku-name-txt {
  font-size: 0.84rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--bg-surface-subtle);
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
}

.hook-quote-headline {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.45;
  letter-spacing: -0.01em;
}

.hook-details-box {
  background: var(--bg-surface-subtle);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.85rem;
  border: 1px solid var(--border-subtle);
}

.hook-visual-line {
  color: var(--text-body);
  line-height: 1.45;
}
.hook-visual-line strong {
  color: var(--text-main);
}

.hook-target-audio-line {
  color: var(--text-muted);
  font-size: 0.82rem;
}

.hook-card-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
}

.btn-hook-make-script {
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--trans-fast);
}
.btn-hook-make-script:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
[data-theme="dark"] .btn-hook-make-script {
  background: #f8fafc;
  color: #0f172a;
}

.hook-action-links {
  display: flex;
  align-items: center;
  gap: 1.15rem;
}

.link-hook-action {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  transition: color var(--trans-fast);
}
.link-hook-action:hover {
  color: var(--xcorp-blue-600);
}

.link-hook-delete {
  color: #ef4444;
}
.link-hook-delete:hover {
  color: #dc2626;
}

/* Modal dark save button (Anh 3) */
.btn-dark-modal-save {
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1.35rem;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--trans-fast);
}
.btn-dark-modal-save:hover {
  background: #1e293b;
}
[data-theme="dark"] .btn-dark-modal-save {
  background: #f8fafc;
  color: #0f172a;
}

/* ==========================================================================
   CẮT HIGHLIGHT LIVE (ẢNH 2): CĂN THẲNG 1, 2, 3 HOÀN TOÀN
   ========================================================================== */
.livestream-clip-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default) !important;
  border-radius: var(--radius-xl) !important;
  padding: 1.15rem 1.45rem !important;
  cursor: pointer;
  transition: all var(--trans-fast);
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  box-sizing: border-box;
}

.livestream-clip-card:hover {
  border-color: var(--xcorp-blue-400) !important;
  box-shadow: var(--shadow-hover);
}

.livestream-clip-card.selected {
  background: #f0f7ff !important;
  border-color: var(--xcorp-blue-500) !important;
  box-shadow: 0 0 0 1px var(--xcorp-blue-500), var(--shadow-sm) !important;
}
[data-theme="dark"] .livestream-clip-card.selected {
  background: rgba(22, 119, 255, 0.12) !important;
  border-color: var(--xcorp-blue-400) !important;
}

.clip-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.clip-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
}

/* Fixed uniform dimensions for 01, 02, 03 badge */
.clip-idx-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 26px;
  font-size: 0.78rem;
  font-weight: 800;
  color: #ffffff;
  background: var(--xcorp-blue-500);
  border-radius: 6px;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.livestream-clip-title {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

/* Fixed uniform width for timestamp badge so right edges align across all 3 cards */
.clip-time-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 195px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--xcorp-blue-600);
  background: var(--xcorp-blue-100);
  border: 1px solid var(--xcorp-blue-200);
  border-radius: var(--radius-pill);
  padding: 3px 0;
  font-family: var(--font-mono);
  white-space: nowrap !important;
  flex-shrink: 0;
  text-align: center;
}
[data-theme="dark"] .clip-time-badge {
  background: rgba(22, 119, 255, 0.2);
  color: var(--xcorp-blue-300);
  border-color: rgba(22, 119, 255, 0.4);
}

/* Ensure consistent 2-line height so all 3 cards align vertically */
.clip-summary-text {
  font-size: 0.88rem;
  color: var(--text-body);
  line-height: 1.45;
  min-height: 2.65rem;
  display: flex;
  align-items: center;
}

/* Clean dashed divider line visible across all cards */
.clip-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px dashed rgba(100, 116, 139, 0.25) !important;
}

.clip-hook-tag {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.btn-preview-clip {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  color: var(--text-main);
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all var(--trans-fast);
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-preview-clip:hover {
  background: var(--bg-surface-hover);
  border-color: var(--border-strong);
}

/* ==========================================================================
   DYNAMIC STANDBY COMPOSITION CANVAS (TRƯỚC KHI GENERATE VIDEO)
   ========================================================================== */
.mockup-standby-screen {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, #1e293b 0%, #090d16 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  z-index: 10;
  overflow: hidden;
}

.standby-comp-backdrop {
  position: relative;
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.standby-glow-spot {
  position: absolute;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%);
  filter: blur(20px);
}

.standby-sku-preview-box {
  position: relative;
  width: 150px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.standby-sku-preview-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 14px 20px rgba(0, 0, 0, 0.6));
  animation: floatSku 4s ease-in-out infinite;
}

@keyframes floatSku {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-1deg); }
}

.standby-pack-badge {
  position: absolute;
  bottom: 0px;
  background: #0284c7;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.4);
}

.standby-model-pill {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.standby-hook-banner {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.standby-hook-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.05em;
  font-family: var(--font-mono);
}

.standby-hook-text {
  font-size: 0.78rem;
  color: #f1f5f9;
  font-weight: 600;
  line-height: 1.35;
  font-style: italic;
}

.standby-action-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0.5rem;
}

.standby-radar-pulse {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #38bdf8;
  margin-bottom: 0.65rem;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
  animation: pulseRadar 2s infinite;
}

@keyframes pulseRadar {
  0% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.5); }
  70% { transform: scale(1.04); box-shadow: 0 0 0 14px rgba(56, 189, 248, 0); }
  100% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
}

.standby-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.standby-desc {
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.35;
  max-width: 250px;
}

.standby-bottom-tech-tags {
  display: flex;
  gap: 0.35rem;
  justify-content: center;
  flex-wrap: wrap;
}
.standby-bottom-tech-tags .badge-tag {
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.68rem;
}
'''

css += '\n' + new_styles

with open('prototype/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("styles.css updated successfully.")
