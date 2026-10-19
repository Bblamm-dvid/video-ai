css_to_add = """
/* ==========================================================================
   TODO14: KHO KỊCH BẢN & KHO CÂU HOOK UI REDESIGN (ẢNH 1 & ẢNH 2)
   ========================================================================== */
.script-count-badge {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-left: 6px;
}

/* Single Row Filter Cards matching Screenshot 1 & 2 */
.script-filter-card-single-row,
.hook-filter-card-single-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 10px 16px;
  margin-bottom: 16px;
  box-shadow: var(--shadow-xs);
  flex-wrap: wrap;
}

.script-search-input-wrap,
.hook-search-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-surface-subtle);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  padding: 7px 12px;
  min-width: 260px;
  flex: 1;
}

.script-search-input-wrap svg,
.hook-search-input-wrap svg {
  color: var(--text-dim);
  flex-shrink: 0;
}

.script-search-input,
.hook-search-input {
  border: none;
  background: transparent;
  font-size: 0.86rem;
  color: var(--text-main);
  outline: none;
  width: 100%;
}

.script-sku-filter-select {
  padding: 7px 12px;
  border: 1px solid var(--border-default);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-main);
  background: var(--bg-surface-subtle);
  outline: none;
  cursor: pointer;
  min-width: 180px;
}

/* Category Tabs Bar */
.script-category-tabs-bar,
.hook-category-tabs-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.script-cat-tab,
.hook-cat-tab {
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 6px 13px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--trans-fast);
}

.script-cat-tab:hover,
.hook-cat-tab:hover {
  background: var(--bg-surface-hover);
  color: var(--text-main);
}

.script-cat-tab.active,
.hook-cat-tab.active {
  background: #0f172a !important;
  color: #ffffff !important;
}
[data-theme="dark"] .script-cat-tab.active,
[data-theme="dark"] .hook-cat-tab.active {
  background: #f8fafc !important;
  color: #0f172a !important;
}

/* Datatable Row Interactive Hover */
.script-datatable tbody tr,
.hook-datatable tbody tr {
  cursor: pointer;
  transition: background 0.15s ease;
}

.script-datatable tbody tr:hover td,
.hook-datatable tbody tr:hover td {
  background: var(--bg-surface-hover) !important;
}

/* Hook Datatable matching Screenshot 2 */
.hook-table-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}

.hook-datatable {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.hook-datatable th {
  background: var(--bg-surface-subtle);
  padding: 0.95rem 1.15rem;
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-default);
}

.hook-datatable td {
  padding: 1.15rem 1.15rem;
  font-size: 0.88rem;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}

.hook-datatable tr:last-child td {
  border-bottom: none;
}

.hook-quote-text {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.45;
}

/* Hook Category Tags matching Screenshot 2 */
.tag-hook-warning {
  display: inline-block;
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
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
  color: #2563eb;
  border: 1px solid #bfdbfe;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
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
  font-size: 0.78rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-glass {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.3);
}

.tag-hook-comedy {
  display: inline-block;
  background: #fff1f2;
  color: #e11d48;
  border: 1px solid #fecdd3;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
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
  color: #16a34a;
  border: 1px solid #bbf7d0;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
}
[data-theme="dark"] .tag-hook-pov {
  background: rgba(22, 163, 74, 0.15);
  color: #4ade80;
  border-color: rgba(22, 163, 74, 0.3);
}

/* Floating Batch Bar matching Screenshot 2 */
.floating-batch-bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #ffffff;
  border-radius: 9999px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  z-index: 1000;
  animation: slideUpBar 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUpBar {
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.batch-bar-count {
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.batch-dot {
  color: #3b82f6;
  font-size: 0.95rem;
}

.btn-batch-publish {
  background: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-batch-publish:hover {
  background: #059669;
}

.btn-batch-delete {
  background: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 5px 14px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-batch-delete:hover {
  background: #b91c1c;
}

.btn-batch-deselect {
  background: transparent;
  color: #cbd5e1;
  border: none;
  padding: 5px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.15s ease;
}
.btn-batch-deselect:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* Button Publish Script in Detail Editor */
.btn-script-publish {
  background: #10b981;
  color: #ffffff;
  border: 1px solid #059669;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--trans-fast);
}
.btn-script-publish:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-script-dark,
.btn-hook-dark {
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--trans-fast);
}
.btn-script-dark:hover,
.btn-hook-dark:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
[data-theme="dark"] .btn-script-dark,
[data-theme="dark"] .btn-hook-dark {
  background: #f8fafc;
  color: #0f172a;
}
[data-theme="dark"] .btn-script-dark:hover,
[data-theme="dark"] .btn-hook-dark:hover {
  background: #e2e8f0;
}
"""

with open('prototype/styles.css', 'a', encoding='utf-8') as f:
    f.write('\n' + css_to_add)
print('Successfully appended CSS rules to prototype/styles.css')
