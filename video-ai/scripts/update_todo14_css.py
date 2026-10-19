import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Updating styles.css...")
with open('prototype/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_styles = '''
/* ==========================================================================
   TODO14: KHO KỊCH BẢN (ẢNH 1) & KHO CÂU HOOK (ẢNH 2) NÂNG CẤP TOÀN DIỆN
   ========================================================================== */
.script-brand-sub {
  font-size: 0.74rem;
  font-weight: 800;
  color: var(--text-dim);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.script-count-tag {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
}

.btn-script-primary-dark {
  background: #0f172a;
  color: #ffffff;
  border: none;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--trans-fast);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
}
.btn-script-primary-dark:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
[data-theme="dark"] .btn-script-primary-dark {
  background: #f8fafc;
  color: #0f172a;
}

.btn-script-publish {
  background: #10b981;
  color: #ffffff;
  border: none;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--trans-fast);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}
.btn-script-publish:hover {
  background: #059669;
  transform: translateY(-1px);
}

/* Single Row Filter Card matching Image 1 & Image 2 */
.script-filter-card-single-row,
.hook-filter-card-single-row {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 0.75rem 1.15rem;
  margin-bottom: 1.25rem;
  box-shadow: var(--shadow-xs);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.script-filter-card-single-row .script-search-input-wrap,
.hook-filter-card-single-row .hook-search-input-wrap {
  flex: 1;
  min-width: 220px;
}

/* Kho Kịch Bản Table Row Clickable (Todo14 Item 2) */
.script-datatable tbody tr {
  cursor: pointer;
  transition: background var(--trans-fast);
}
.script-datatable tbody tr:hover td {
  background: var(--bg-surface-hover);
}

/* Kho Câu Hook Table View (Matching Image 2) */
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

.hook-datatable tbody tr {
  cursor: pointer;
  transition: background var(--trans-fast);
}

.hook-datatable tbody tr:hover td {
  background: var(--bg-surface-hover);
}

.hook-datatable tbody tr.row-selected td {
  background: #f0f7ff;
}
[data-theme="dark"] .hook-datatable tbody tr.row-selected td {
  background: rgba(22, 119, 255, 0.1);
}

.hook-row-quote {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.45;
}

.hook-row-sku-name {
  font-size: 0.88rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Floating Batch Action Bar (Todo14 & Image 2) */
.floating-batch-bar {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1200;
  background: #0f172a;
  color: #ffffff;
  border-radius: var(--radius-pill);
  padding: 0.55rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.15rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  animation: slideUpBatch 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

@keyframes slideUpBatch {
  from {
    opacity: 0;
    transform: translate(-50%, 15px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.batch-bar-count {
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f8fafc;
  white-space: nowrap;
}

.batch-dot {
  color: #38bdf8;
  font-size: 0.8rem;
}

.btn-batch-publish {
  background: #10b981;
  color: #ffffff;
  border: none;
  padding: 5px 14px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all var(--trans-fast);
  white-space: nowrap;
}
.btn-batch-publish:hover {
  background: #059669;
}

.btn-batch-delete {
  background: #dc2626;
  color: #ffffff;
  border: none;
  padding: 5px 14px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all var(--trans-fast);
  white-space: nowrap;
}
.btn-batch-delete:hover {
  background: #b91c1c;
}

.btn-batch-deselect {
  background: transparent;
  color: #94a3b8;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 4px;
  transition: color var(--trans-fast);
  white-space: nowrap;
}
.btn-batch-deselect:hover {
  color: #ffffff;
}
'''

css += '\n' + new_styles

with open('prototype/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("styles.css updated successfully.")
