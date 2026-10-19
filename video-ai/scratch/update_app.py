import re

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update DOM caching
old_dom_script = '''    // Todo 13: Kho Kịch Bản Video Elements (Matching Anh 1 & 2)
    scriptListMainView: document.getElementById('script-list-main-view'),
    scriptDetailEditorView: document.getElementById('script-detail-editor-view'),
    scriptTableSearchInput: document.getElementById('script-table-search-input'),
    scriptTableSkuSelect: document.getElementById('script-table-sku-select'),
    scriptCategoryTabsBar: document.getElementById('script-category-tabs-bar'),
    scriptTableTbody: document.getElementById('script-table-tbody'),
    scriptCheckAllBox: document.getElementById('script-check-all-box'),
    btnScriptImportFile: document.getElementById('btn-script-import-file'),
    btnScriptWriteManual: document.getElementById('btn-script-write-manual'),
    btnScriptAiGenerate: document.getElementById('btn-script-ai-generate'),
    btnBackToScriptList: document.getElementById('btn-back-to-script-list'),
    editorScriptTitle: document.getElementById('editor-script-title'),
    editorScriptSku: document.getElementById('editor-script-sku'),
    editorScriptDuration: document.getElementById('editor-script-duration'),
    editorScriptStatus: document.getElementById('editor-script-status'),
    btnEditorAddScene: document.getElementById('btn-editor-add-scene'),
    btnEditorSaveScript: document.getElementById('btn-editor-save-script'),
    btnEditorCreateVideo: document.getElementById('btn-editor-create-video'),
    editorScenesContainer: document.getElementById('editor-scenes-container'),'''

new_dom_script = '''    // Todo 13 & 14: Kho Kịch Bản Video Elements (Matching Anh 1 & 2)
    scriptCountBadge: document.getElementById('script-count-badge'),
    scriptListMainView: document.getElementById('script-list-main-view'),
    scriptDetailEditorView: document.getElementById('script-detail-editor-view'),
    scriptTableSearchInput: document.getElementById('script-table-search-input'),
    scriptTableSkuSelect: document.getElementById('script-table-sku-select'),
    scriptCategoryTabsBar: document.getElementById('script-category-tabs-bar'),
    scriptTableTbody: document.getElementById('script-table-tbody'),
    scriptCheckAllBox: document.getElementById('script-check-all-box'),
    scriptBatchBar: document.getElementById('script-batch-bar'),
    scriptBatchCount: document.getElementById('script-batch-count'),
    btnBatchPublishScript: document.getElementById('btn-batch-publish-script'),
    btnBatchDeleteScript: document.getElementById('btn-batch-delete-script'),
    btnBatchDeselectScript: document.getElementById('btn-batch-deselect-script'),
    btnScriptImportFile: document.getElementById('btn-script-import-file'),
    btnScriptWriteManual: document.getElementById('btn-script-write-manual'),
    btnScriptAiGenerate: document.getElementById('btn-script-ai-generate'),
    btnBackToScriptList: document.getElementById('btn-back-to-script-list'),
    editorScriptTitle: document.getElementById('editor-script-title'),
    editorScriptSku: document.getElementById('editor-script-sku'),
    editorScriptDuration: document.getElementById('editor-script-duration'),
    editorScriptStatus: document.getElementById('editor-script-status'),
    btnEditorAddScene: document.getElementById('btn-editor-add-scene'),
    btnEditorSaveScript: document.getElementById('btn-editor-save-script'),
    btnEditorPublishScript: document.getElementById('btn-editor-publish-script'),
    btnEditorCreateVideo: document.getElementById('btn-editor-create-video'),
    editorScenesContainer: document.getElementById('editor-scenes-container'),'''

assert old_dom_script in content, "Could not find old_dom_script in app.js"
content = content.replace(old_dom_script, new_dom_script)

# 2. Update Hook Vault DOM elements
old_dom_hooks = '''    // Vaults: Hooks
    cstageHooksGrid: document.getElementById('cstage-hooks-grid'),
    hookCategoryPills: document.getElementById('hook-category-pills'),
    btnCreateHook: document.getElementById('btn-create-hook'),'''

new_dom_hooks = '''    // Vaults: Hooks (Matching Screenshot 2 Datatable & Batch Actions)
    hookTableTbody: document.getElementById('hook-table-tbody'),
    hookCheckAllBox: document.getElementById('hook-check-all-box'),
    hookBatchBar: document.getElementById('hook-batch-bar'),
    hookBatchCount: document.getElementById('hook-batch-count'),
    btnBatchDeleteHook: document.getElementById('btn-batch-delete-hook'),
    btnBatchDeselectHook: document.getElementById('btn-batch-deselect-hook'),
    cstageHooksGrid: document.getElementById('cstage-hooks-grid'),
    hookCategoryPills: document.getElementById('hook-category-pills'),
    btnCreateHook: document.getElementById('btn-create-hook'),'''

assert old_dom_hooks in content, "Could not find old_dom_hooks in app.js"
content = content.replace(old_dom_hooks, new_dom_hooks)

# 3. Update Step 4 DOM elements
old_dom_step4 = '''    img2vidFolderSelect: document.getElementById('img2vid-folder-select'),
    engineSkuTitle: document.getElementById('engine-sku-title'),
    engineSkuPrice: document.getElementById('engine-sku-price'),
    engineSkuDesc: document.getElementById('engine-sku-desc'),
    engineSkuUspTags: document.getElementById('engine-sku-usp-tags'),
    enginePackshotSelector: document.getElementById('engine-packshot-selector'),'''

new_dom_step4 = '''    img2vidFolderSelect: document.getElementById('img2vid-folder-select'),
    engineSkuCode: document.getElementById('engine-sku-code'),
    engineSkuTitle: document.getElementById('engine-sku-title'),
    engineSkuOrigin: document.getElementById('engine-sku-origin'),
    engineSkuPrice: document.getElementById('engine-sku-price'),
    engineSkuDesc: document.getElementById('engine-sku-desc'),
    engineSkuUspTags: document.getElementById('engine-sku-usp-tags'),
    enginePackshotSelector: document.getElementById('engine-packshot-selector'),
    packshotSelectedLabel: document.getElementById('packshot-selected-label'),
    btnGotoProductDrive: document.getElementById('btn-goto-product-drive'),
    btnUploadMorePackshot: document.getElementById('btn-upload-more-packshot'),'''

assert old_dom_step4 in content, "Could not find old_dom_step4 in app.js"
content = content.replace(old_dom_step4, new_dom_step4)

# 4. Update Modal Script Editor Buttons
old_dom_modals = '''    // Modals: Script Editor
    modalScriptEditor: document.getElementById('modal-script-editor'),
    scriptModalTitle: document.getElementById('script-modal-title'),
    scriptEditId: document.getElementById('script-edit-id'),
    scriptTitleInput: document.getElementById('script-title-input'),
    scriptGroupSelect: document.getElementById('script-group-select'),
    scriptSkuSelectModal: document.getElementById('script-sku-select-modal'),
    scriptDurationSelect: document.getElementById('script-duration-select'),
    scriptHookInput: document.getElementById('script-hook-input'),
    scriptAudienceInput: document.getElementById('script-audience-input'),
    scriptBodyInput: document.getElementById('script-body-input'),
    btnSaveScriptModal: document.getElementById('btn-save-script-modal'),'''

new_dom_modals = '''    // Modals: Script Editor
    modalScriptEditor: document.getElementById('modal-script-editor'),
    scriptModalTitle: document.getElementById('script-modal-title'),
    scriptEditId: document.getElementById('script-edit-id'),
    scriptTitleInput: document.getElementById('script-title-input'),
    scriptGroupSelect: document.getElementById('script-group-select'),
    scriptSkuSelectModal: document.getElementById('script-sku-select-modal'),
    scriptDurationSelect: document.getElementById('script-duration-select'),
    scriptHookInput: document.getElementById('script-hook-input'),
    scriptAudienceInput: document.getElementById('script-audience-input'),
    scriptBodyInput: document.getElementById('script-body-input'),
    btnSaveScriptModal: document.getElementById('btn-save-script-modal'),
    btnSaveScriptDraft: document.getElementById('btn-save-script-draft'),
    btnSaveScriptPublish: document.getElementById('btn-save-script-publish'),'''

assert old_dom_modals in content, "Could not find old_dom_modals in app.js"
content = content.replace(old_dom_modals, new_dom_modals)

# 5. Update State
old_state = '''    activeHookTab: 'all',
    activeHookSearch: '',
    activeHookSku: 'all','''

new_state = '''    activeHookTab: 'all',
    activeHookSearch: '',
    activeHookSku: 'all',
    selectedScriptIds: new Set(),
    selectedHookIds: new Set(),'''

assert old_state in content, "Could not find old_state in app.js"
content = content.replace(old_state, new_state)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Step 1 of app.js updated successfully!")
