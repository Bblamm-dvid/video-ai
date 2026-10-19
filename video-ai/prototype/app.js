/**
 * MỸ NGUYÊN TSC - AI CONTENT FACTORY STUDIO (CONTROLLER V9.0)
 * Hoàn thiện toàn diện theo yêu cầu todo6.md & todo7.md:
 * 1. Bỏ dock bên phải và timeline bên dưới.
 * 2. Bỏ module Tạo từ prompt và kịch bản AI.
 * 3. Video Đã Hoàn Thiện: khung video nhỏ gọn, bỏ dòng mô tả phụ bên dưới tiêu đề (Todo7).
 * 4. Kho Ảnh & Video Sản Phẩm: danh sách Folder Sản Phẩm (Tên, Mô tả, USP, Giá, Xuất xứ),
 *    ảnh thumbnail sản phẩm cân đối, bỏ nút "+ Tải lên tệp" khỏi module này (Todo7).
 * 5. Kho Ảnh & Persona Model mới (Todo7): Quản lý người mẫu theo thư mục với đầy đủ ảnh đa góc cạnh
 *    (chính diện, nghiêng 45°, cận cảnh, cầm sản phẩm) cùng role & style.
 * 6. Module "Dựng video từ ảnh": Bổ sung Bước 5 "Chọn Folder Ảnh model" với ảnh đa góc cạnh
 *    để đưa vào AI dựng video chân thật nhất (Todo7).
 * 7. 3 Module sản xuất chính:
 *    - Dựng video từ ảnh (5 bước hoàn chỉnh)
 *    - Cắt highlight livestream
 *    - Chỉnh sửa video gốc
 */

(function () {
  'use strict';

  const data = window.PROTOTYPE_DATA || {};

  /* ==========================================================================
     ROLE-BASED ACCESS CONTROL & USER PROFILES (MATCHING ANH 1 & ANH 2)
     ========================================================================== */
  const ROLES = [
    {
      id: 'hung_nv',
      name: 'Nguyễn Văn Hùng',
      title: 'Quản lý Kênh & Vận Hành Studio',
      fullTitle: 'Trưởng Nhóm Sản Xuất & Điều Hành Studio',
      badge: 'Quản lý Studio',
      unit: 'Ban Quản Lý & Vận Hành Studio Xcorp',
      avatarClass: 'avatar-orange',
      initials: 'VH'
    },
    {
      id: 'bao_pq',
      name: 'Phạm Quốc Bảo',
      title: 'Trưởng Nhóm Content & Kịch Bản AI',
      fullTitle: 'Trưởng Nhóm Nội Dung & Viral Hooks TikTok',
      badge: 'Trưởng Nhóm Content',
      unit: 'Team Marketing & Kịch Bản Sáng Tạo',
      avatarClass: 'avatar-red',
      initials: 'PB'
    },
    {
      id: 'duc_tm',
      name: 'Trần Minh Đức',
      title: 'Chuyên Viên Dựng & Biên Tập Video',
      fullTitle: 'Chuyên Viên AI Render & Livestream Cuts',
      badge: 'Chuyên Viên Media',
      unit: 'Team Media & Kỹ Thuật Dựng Video',
      avatarClass: 'avatar-blue',
      initials: 'MĐ'
    },
    {
      id: 'long_lh',
      name: 'Lê Hoàng Long',
      title: 'Quản Trị Kênh TikTok Shop & Ads',
      fullTitle: 'Quản Lý Doanh Số TikTok Shop & Chiến Dịch Ads',
      badge: 'Quản Trị Kênh',
      unit: 'Team Tăng Trưởng E-commerce & GTM',
      avatarClass: 'avatar-purple',
      initials: 'HL'
    },
    {
      id: 'bgd_incons',
      name: 'Ban Giám Đốc Xcorp',
      title: 'Lãnh Đạo & Quản Trị Chiến Lược',
      fullTitle: 'Ban Lãnh Đạo Điều Hành Hệ Sinh Thái',
      badge: 'Ban Giám Đốc',
      unit: 'Hội Đồng Quản Trị & Ban Điều Hành',
      avatarClass: 'avatar-green',
      initials: 'BĐH'
    }
  ];

  /* ==========================================================================
     CLEAN PROFESSIONAL ICONS (NO-ICON POLICY AS PER TODO18)
     ========================================================================== */
  const ICONS = {
    folder: '',
    folderOpen: '',
    users: '',
    user: '',
    edit: '',
    external: '',
    play: '',
    download: '',
    copy: '',
    check: '✓',
    camera: '',
    sparkle: ''
  };

  // Global State
  const state = {
    activePanel: 'panel-livestream', // Default active panel
    activeRoleId: 'hung_nv', // Default selected role
    selectedSkuId: 'FARMSTAY_RETINOL_CREAM',
    selectedFaceId: 'FACE_01',
    selectedAngleId: 'ANGLE_01',
    selectedHookId: 'HOOK_01',
    isSafeZoneVisible: false,
    activeDriveFolderId: 'folder_all',
    activeScriptFolder: 'all',
    activeScriptTab: 'all',
    activeScriptSearch: '',
    activeScriptSku: 'all',
    activeEditingScriptId: 'ANGLE_01',
    activeLsClipIndex: 0,
    selectedLsClipIndices: new Set([0, 1, 2]),
    lsAudioOption: 'opt1',
    lsCaptionBurnIn: true,
    activeContentFilter: 'all',
    activeHookTab: 'all',
    activeHookSearch: '',
    activeHookSku: 'all',
    selectedScriptIds: new Set(),
    selectedHookIds: new Set(),
    kits: data.contentKits ? [...data.contentKits] : [],
    livestreamsVault: data.livestreamsVault ? [...data.livestreamsVault] : [],
    rawClipsVault: data.rawClipsVault ? [...data.rawClipsVault] : [],
    lsVaultSearch: '',
    lsVaultFilterFormat: 'all',
    lsVaultFilterAsr: 'all',
    rawVaultFilterSearch: '',
    rawVaultFilterLive: 'all',
    rawVaultFilterTopic: 'all',
    rawVaultFilterStatus: 'all',
    activeAsrSessionId: null,
    driveFiles: data.assetVault && data.assetVault.driveFiles ? [...data.assetVault.driveFiles] : [],
    productFolders: data.assetVault && data.assetVault.productFolders ? [...data.assetVault.productFolders] : [],
    scripts: data.angleVault && data.angleVault.scripts ? [...data.angleVault.scripts] : [],
    hooks: data.trendingHookVault ? [...data.trendingHookVault] : [],
    activeHookType: 'all',
    livestreamCutDone: false, // Start at Uploaded Video state (Ảnh 2)
    lsVoiceActive: true,
    lsBgmActive: true,
    lsHookVoiceover: true,
    // Todo26 State: Review & Edit Transcript Manual & Subtitle Extraction
    isTranscriptConfirmed: false,
    currentLivestreamTranscript: [],
    originalLivestreamTranscript: [],
    transcriptSearchQuery: '',
    activeLsClipSubtitles: {},
    // Multi-Project & Sessions State
    activeProjectId: window.PROTOTYPE_ACTIVE_PROJECT_ID || 'proj_cosmetics',
    activeSessionId: 'sess_cos_1',
    sessions: data.sessions ? [...data.sessions] : [],
    // Model Vault State (Todo7)
    modelFolders: data.modelVault && data.modelVault.modelFolders ? [...data.modelVault.modelFolders] : [],
    activeModelFolderId: 'model_all',
    selectedModelAngleId: null
  };

  // Cache DOM Elements
  const DOM = {
    // Todo 13 & 14: Kho Kịch Bản Video Elements (Matching Anh 1 & 2)
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
    btnBatchDraftScript: document.getElementById('btn-batch-draft-script'),
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
    editorScenesContainer: document.getElementById('editor-scenes-container'),

    // Authentication & Command Center Portal (Anh 1 & Anh 2)
    loginPortalScreen: document.getElementById('login-portal-screen'),
    loginStepAccount: document.getElementById('login-step-account'),
    loginStepProject: document.getElementById('login-step-project'),
    loginRolesContainer: document.getElementById('login-roles-container'),
    loginProjectsContainer: document.getElementById('login-projects-container'),
    loginUserNameDisplay: document.getElementById('login-user-name-display'),
    btnLoginSubmitPortal: document.getElementById('btn-login-submit-portal'),
    btnLoginPortalLabel: document.getElementById('btn-login-portal-label'),
    btnBackToAccount: document.getElementById('btn-back-to-account'),
    btnEnterWorkspace: document.getElementById('btn-enter-workspace'),
    topbarRootBrand: document.getElementById('topbar-root-brand'),

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

    sidebarNavItems: document.querySelectorAll('.sidebar-nav-item'),
    stagePanels: document.querySelectorAll('.stage-view-panel'),

    // Vaults: Scripts
    cstageScriptsContainer: document.getElementById('cstage-scripts-container'),
    scriptFolderPills: document.getElementById('script-folder-pills'),
    btnCreateScriptManual: document.getElementById('btn-create-script-manual'),
    btnCreateScriptAi: document.getElementById('btn-create-script-ai'),
    btnUploadScriptFile: document.getElementById('btn-upload-script-file'),

    // Vaults: Hooks (Matching Screenshot 2 Datatable & Batch Actions)
    hookTableTbody: document.getElementById('hook-table-tbody'),
    hookCheckAllBox: document.getElementById('hook-check-all-box'),
    hookBatchBar: document.getElementById('hook-batch-bar'),
    hookBatchCount: document.getElementById('hook-batch-count'),
    btnBatchDeleteHook: document.getElementById('btn-batch-delete-hook'),
    btnBatchDeselectHook: document.getElementById('btn-batch-deselect-hook'),
    cstageHooksGrid: document.getElementById('cstage-hooks-grid'),
    hookCategoryPills: document.getElementById('hook-category-pills'),
    btnCreateHook: document.getElementById('btn-create-hook'),

    // Vaults: Kho Livestream Nguồn (Lưu file live thô 1-3h & Dữ liệu bóc băng ASR)
    panelVaultLivestreams: document.getElementById('panel-vault-livestreams'),
    livestreamsVaultGrid: document.getElementById('livestreams-vault-grid'),
    lsVaultSearchInput: document.getElementById('ls-vault-search-input'),
    lsVaultFilterFormat: document.getElementById('ls-vault-filter-format'),
    lsVaultFilterAsr: document.getElementById('ls-vault-filter-asr'),
    btnUploadNewLiveSource: document.getElementById('btn-upload-new-live-source'),
    modalAsrTranscript: document.getElementById('modal-asr-transcript'),
    modalAsrTitle: document.getElementById('modal-asr-title'),
    modalAsrMeta: document.getElementById('modal-asr-meta'),
    modalAsrSearchInput: document.getElementById('modal-asr-search-input'),
    modalAsrList: document.getElementById('modal-asr-list'),
    modalAsrResultCount: document.getElementById('modal-asr-result-count'),

    // Vaults: Kho Clip Thô (Todo25 & Wireframe)
    panelVaultRawClips: document.getElementById('panel-vault-raw-clips'),
    rawVaultTableTbody: document.getElementById('raw-vault-table-tbody'),
    rawFilterSearch: document.getElementById('raw-filter-search'),
    rawFilterLive: document.getElementById('raw-filter-live'),
    rawFilterTopic: document.getElementById('raw-filter-topic'),
    rawFilterStatus: document.getElementById('raw-filter-status'),
    btnRawVaultToLivestream: document.getElementById('btn-raw-vault-to-livestream'),

    // Vaults: Drive Assets & Product Folders (Todo6 & Todo7)
    driveFolderPills: document.getElementById('drive-folder-pills'),
    driveFolderCardsGrid: document.getElementById('drive-folder-cards-grid'),
    driveFolderSkuBanner: document.getElementById('drive-folder-sku-banner'),
    driveAssetsGrid: document.getElementById('drive-assets-grid'),
    btnCreateProductFolder: document.getElementById('btn-create-product-folder'),

    // Vaults: Models & Personas (Todo7)
    modelFolderPills: document.getElementById('model-folder-pills'),
    modelFolderCardsGrid: document.getElementById('model-folder-cards-grid'),
    modelFolderDetailView: document.getElementById('model-folder-detail-view'),
    btnCreateModelFolder: document.getElementById('btn-create-model-folder'),

    // Image-to-Video Stage (Module 1: Dựng Video Từ Ảnh - 5 Bước Hoàn Chỉnh)
    img2vidPromptInput: document.getElementById('img2vid-prompt-input'),
    img2vidHookSelect: document.getElementById('img2vid-hook-select'),
    img2vidScriptSelect: document.getElementById('img2vid-script-select'),
    img2vidFolderSelect: document.getElementById('img2vid-folder-select'),
    engineSkuCode: document.getElementById('engine-sku-code'),
    engineSkuTitle: document.getElementById('engine-sku-title'),
    engineSkuOrigin: document.getElementById('engine-sku-origin'),
    engineSkuPrice: document.getElementById('engine-sku-price'),
    engineSkuDesc: document.getElementById('engine-sku-desc'),
    engineSkuUspTags: document.getElementById('engine-sku-usp-tags'),
    enginePackshotSelector: document.getElementById('engine-packshot-selector'),
    packshotSelectedLabel: document.getElementById('packshot-selected-label'),
    btnGotoProductDrive: document.getElementById('btn-goto-product-drive'),
    btnUploadMorePackshot: document.getElementById('btn-upload-more-packshot'),
    // Step 5 Model Elements (Todo7)
    img2vidModelFolderSelect: document.getElementById('img2vid-model-folder-select'),
    engineModelInfoBox: document.getElementById('engine-model-info-box'),
    engineModelName: document.getElementById('engine-model-name'),
    engineModelRole: document.getElementById('engine-model-role'),
    engineModelDesc: document.getElementById('engine-model-desc'),
    engineModelPhotosGrid: document.getElementById('engine-model-photos-grid'),

    // Multi-Project Switcher
    topbarProjectContainer: document.getElementById('topbar-project-container'),
    btnTopbarProject: document.getElementById('btn-topbar-project'),
    topbarProjectIcon: document.getElementById('topbar-project-icon'),
    topbarProjectName: document.getElementById('topbar-project-name'),
    projectDropdownMenu: document.getElementById('project-dropdown-menu'),
    modalProjectHub: document.getElementById('modal-project-hub'),
    projectHubCardsContainer: document.getElementById('project-hub-cards-container'),
    btnSubmitCreateProject: document.getElementById('btn-submit-create-project'),
    newProjectName: document.getElementById('new-project-name'),
    newProjectCategory: document.getElementById('new-project-category'),
    newProjectDesc: document.getElementById('new-project-desc'),

    // Session Management Bar & Prompt Iterations
    activeSessionSelect: document.getElementById('active-session-select'),
    btnCreateNewSession: document.getElementById('btn-create-new-session'),
    btnTogglePromptHistory: document.getElementById('btn-toggle-prompt-history'),
    sessionRunCount: document.getElementById('session-run-count'),
    sessionStatusBadge: document.getElementById('session-status-badge'),
    sessionPromptHistoryDrawer: document.getElementById('session-prompt-history-drawer'),
    drawerSessionName: document.getElementById('drawer-session-name'),
    btnClosePromptHistory: document.getElementById('btn-close-prompt-history'),
    sessionRunsContainer: document.getElementById('session-runs-container'),
    modalCreateSession: document.getElementById('modal-create-session'),
    newSessionTitle: document.getElementById('new-session-title'),
    newSessionType: document.getElementById('new-session-type'),
    btnSubmitCreateSession: document.getElementById('btn-submit-create-session'),

    btnRunImg2vid: document.getElementById('btn-run-img2vid'),
    cstageEngineVideo: document.getElementById('cstage-engine-video'),
    engineSafeZone: document.getElementById('engine-safe-zone'),
    btnToggleSafezoneEngine: document.getElementById('btn-toggle-safezone-engine'),
    btnSaveImg2vidFinished: document.getElementById('btn-save-img2vid-finished'),

    // Livestream Stage (Module 2: Cắt Highlight Livestream - Scope Phase 1)
    lsUploadStateView: document.getElementById('ls-upload-state-view'),
    lsResultsStateView: document.getElementById('ls-results-state-view'),
    lsPostprodStateView: document.getElementById('ls-postprod-state-view'),
    lsProjectSessionSelect: document.getElementById('ls-project-session-select'),
    uploadedLsVideoPlayer: document.getElementById('uploaded-ls-video-player'),
    uploadedLsTitle: document.getElementById('uploaded-ls-title'),
    uploadedLsDuration: document.getElementById('uploaded-ls-duration'),
    uploadedLsFilename: document.getElementById('uploaded-ls-filename'),
    btnToggleLiveVideo: document.getElementById('btn-toggle-live-video'),
    btnAddCustomTopicFolder: document.getElementById('btn-add-custom-topic-folder'),
    lsCustomPromptDirective: document.getElementById('ls-custom-prompt-directive'),
    btnTriggerAiCut: document.getElementById('btn-trigger-ai-cut'),
    btnTriggerAiCutTxt: document.getElementById('btn-trigger-ai-cut-txt'),
    btnBackToLsUpload: document.getElementById('btn-back-to-ls-upload'),
    btnRecutHighlight: document.getElementById('btn-recut-highlight'),
    aiCutProgressBox: document.getElementById('ai-cut-progress-box'),
    aiCutProgressBarFill: document.getElementById('ai-cut-progress-bar-fill'),
    aiCutPercentText: document.getElementById('ai-cut-percent-text'),
    aiCutStatusText: document.getElementById('ai-cut-status-text'),
    cutResultsSection: document.getElementById('cut-results-section'),
    cutClipsCountBadge: document.getElementById('cut-clips-count-badge'),
    lsBatchCheckAll: document.getElementById('ls-batch-check-all'),
    lsSelectedCountLabel: document.getElementById('ls-selected-count-label'),
    cstageLsClipsList: document.getElementById('cstage-ls-clips-list'),
    cstageLsVideo: document.getElementById('cstage-ls-video'),
    cstageSafeZone: document.getElementById('cstage-safe-zone'),
    cstageCaptionSnip: document.getElementById('cstage-caption-snip'),
    lsTrimDurationBadge: document.getElementById('ls-trim-duration-badge'),
    btnToggleVideoAdjust: document.getElementById('btn-toggle-video-adjust'),
    btnToggleVideoAdjustTxt: document.getElementById('btn-toggle-video-adjust-txt'),
    btnOpenFineTrimStudio: document.getElementById('btn-open-fine-trim-studio'),
    btnInlineCutCommit: document.getElementById('btn-inline-cut-commit'),
    btnViewRawVault: document.getElementById('btn-view-raw-vault'),
    rawVaultCountBadge: document.getElementById('raw-vault-count-badge'),
    btnProceedToPostprod: document.getElementById('btn-proceed-to-postprod'),
    btnBackToRawReview: document.getElementById('btn-back-to-raw-review'),
    lsPostprodSelectedClipsList: document.getElementById('ls-postprod-selected-clips-list'),
    lsPostprodPreviewVideo: document.getElementById('ls-postprod-preview-video'),
    lsPostprodBrollImg: document.getElementById('ls-postprod-broll-img'),
    lsPostprodHookOverlay: document.getElementById('ls-postprod-hook-overlay'),
    lsPostprodHookPreviewTxt: document.getElementById('ls-postprod-hook-preview-txt'),
    btnPickHookFromVault: document.getElementById('btn-pick-hook-from-vault'),
    lsPostprodHookInput: document.getElementById('ls-postprod-hook-input'),
    lsToggleHookVoiceover: document.getElementById('ls-toggle-hook-voiceover'),
    lsSelectBgmTrack: document.getElementById('ls-select-bgm-track'),

    // Todo26 Stepper Elements
    lsPipelineStepperBar: document.getElementById('ls-pipeline-stepper-bar'),
    lsPipeStep1: document.getElementById('ls-pipe-step-1'),
    lsPipeStep2: document.getElementById('ls-pipe-step-2'),
    lsPipeStep3: document.getElementById('ls-pipe-step-3'),
    lsPipeStep4: document.getElementById('ls-pipe-step-4'),

    // Todo26 Review & Edit Transcript Manual Elements
    lsTranscriptReviewBox: document.getElementById('ls-transcript-review-box'),
    lsTranscriptStatusBadge: document.getElementById('ls-transcript-status-badge'),
    btnAddManualTranscriptRow: document.getElementById('btn-add-manual-transcript-row'),
    btnResetOriginalTranscript: document.getElementById('btn-reset-original-transcript'),
    lsTranscriptEditSearch: document.getElementById('ls-transcript-edit-search'),
    lsTranscriptRowCounter: document.getElementById('ls-transcript-row-counter'),
    lsTranscriptEditableList: document.getElementById('ls-transcript-editable-list'),
    btnConfirmTranscript: document.getElementById('btn-confirm-transcript'),
    btnReEditTranscript: document.getElementById('btn-re-edit-transcript'),
    lsCutCriteriaBox: document.getElementById('ls-cut-criteria-box'),
    lsCriteriaLockNotice: document.getElementById('ls-criteria-lock-notice'),

    // Todo26 Post-Production Subtitle Elements
    lsPostprodCaptionOverlay: document.getElementById('ls-postprod-caption-overlay'),
    lsPostprodCaptionOverlayText: document.getElementById('ls-postprod-caption-overlay-text'),
    lsPostprodSubtitleBox: document.getElementById('ls-postprod-subtitle-box'),
    lsSubClipTimerange: document.getElementById('ls-sub-clip-timerange'),
    btnResyncClipSubtitle: document.getElementById('btn-resync-clip-subtitle'),
    lsPostprodCaptionEditor: document.getElementById('ls-postprod-caption-editor'),
    lsCaptionCharCount: document.getElementById('ls-caption-char-count'),
    btnStartPostprodRender: document.getElementById('btn-start-postprod-render'),
    btnPostprodCountTxt: document.getElementById('btn-postprod-count-txt'),
    modalFineTrimStudio: document.getElementById('modal-fine-trim-studio'),
    ftsModalVideo: document.getElementById('fts-modal-video'),
    btnFtsRewind1s: document.getElementById('btn-fts-rewind-1s'),
    btnFtsTogglePlay: document.getElementById('btn-fts-toggle-play'),
    btnFtsForward1s: document.getElementById('btn-fts-forward-1s'),
    ftsClipTitle: document.getElementById('fts-clip-title'),
    ftsClipGroupBadge: document.getElementById('fts-clip-group-badge'),
    ftsValStart: document.getElementById('fts-val-start'),
    ftsValEnd: document.getElementById('fts-val-end'),
    ftsValDuration: document.getElementById('fts-val-duration'),
    ftsBufferFullRange: document.getElementById('fts-buffer-full-range'),
    btnFtsResetAiBounds: document.getElementById('btn-fts-reset-ai-bounds'),
    ftsTrackContainer: document.getElementById('fts-track-container'),
    ftsMaskLeft: document.getElementById('fts-mask-left'),
    ftsTrimBox: document.getElementById('fts-trim-box'),
    ftsMaskRight: document.getElementById('fts-mask-right'),
    ftsHandleLeft: document.getElementById('fts-handle-left'),
    ftsHandleRight: document.getElementById('fts-handle-right'),
    ftsBadgeStart: document.getElementById('fts-badge-start'),
    ftsBadgeEnd: document.getElementById('fts-badge-end'),
    ftsPlayhead: document.getElementById('fts-playhead'),
    ftsLivePlaybackTime: document.getElementById('fts-live-playback-time'),
    btnFtsCommitCut: document.getElementById('btn-fts-commit-cut'),
    modalRawVault: document.getElementById('modal-raw-vault'),
    rawVaultModalList: document.getElementById('raw-vault-modal-list'),
    modalHookPicker: document.getElementById('modal-hook-picker'),
    hookPickerModalList: document.getElementById('hook-picker-modal-list'),
    modalPostprodRenderProgress: document.getElementById('modal-postprod-render-progress'),
    postprodRenderStepTitle: document.getElementById('postprod-render-step-title'),
    postprodRenderStepSub: document.getElementById('postprod-render-step-sub'),
    postprodRenderProgressFill: document.getElementById('postprod-render-progress-fill'),
    lsVideoFilmstripEditor: document.getElementById('ls-video-filmstrip-editor'),
    filmstripRangeLabel: document.getElementById('filmstrip-range-label'),
    filmstripTrackContainer: document.getElementById('filmstrip-track-container'),
    filmstripMaskLeft: document.getElementById('filmstrip-mask-left'),
    filmstripTrimBox: document.getElementById('filmstrip-trim-box'),
    filmstripMaskRight: document.getElementById('filmstrip-mask-right'),
    filmstripHandleLeft: document.getElementById('filmstrip-handle-left'),
    filmstripHandleRight: document.getElementById('filmstrip-handle-right'),
    filmstripBadgeStart: document.getElementById('filmstrip-badge-start'),
    filmstripBadgeEnd: document.getElementById('filmstrip-badge-end'),
    filmstripPlayhead: document.getElementById('filmstrip-playhead'),
    lsTrimStartInput: document.getElementById('ls-trim-start-input'),
    lsTrimRange: document.getElementById('ls-trim-range'),
    lsTrimEndInput: document.getElementById('ls-trim-end-input'),
    lsToggleVoice: document.getElementById('ls-toggle-voice'),
    lsVoiceStatusLabel: document.getElementById('ls-voice-status-label'),
    lsVoiceDesc: document.getElementById('ls-voice-desc'),
    lsToggleBgm: document.getElementById('ls-toggle-bgm'),
    lsBgmStatusLabel: document.getElementById('ls-bgm-status-label'),
    lsBgmDesc: document.getElementById('ls-bgm-desc'),
    lsCaptionSwitch: document.getElementById('ls-caption-switch'),
    lsCaptionStatusLabel: document.getElementById('ls-caption-status-label'),
    lsCoverPreviewImg: document.getElementById('ls-cover-preview-img'),
    lsCoverTimestampText: document.getElementById('ls-cover-timestamp-text'),
    btnPickLsCoverFrame: document.getElementById('btn-pick-ls-cover-frame'),
    btnApproveCurrentLs: document.getElementById('btn-approve-current-ls'),
    btnLsApproveCountTxt: document.getElementById('btn-ls-approve-count-txt'),
    btnLoadNewLivestream: document.getElementById('btn-load-new-livestream'),

    // Vaults: Kho Nhạc Nền BGM (Todo 19)
    bgmFilterBar: document.getElementById('bgm-filter-bar'),
    bgmTableTbody: document.getElementById('bgm-table-tbody'),
    btnUploadBgm: document.getElementById('btn-upload-bgm'),

    // Raw Video Editor Stage (Module 3: Chỉnh Sửa Từ Video Gốc)
    rawEditorPromptInput: document.getElementById('raw-editor-prompt-input'),
    rawVideoFolderSelect: document.getElementById('raw-video-folder-select'),
    rawVideoSelect: document.getElementById('raw-video-select'),
    rawVideoCardsGrid: document.getElementById('raw-video-cards-grid'),
    rawVideoCountBadge: document.getElementById('raw-video-count-badge'),
    rawHookSelect: document.getElementById('raw-hook-select'),
    rawVideoSelectedPreview: document.getElementById('raw-video-selected-preview'),
    btnRunRawEdit: document.getElementById('btn-run-raw-edit'),
    rawResultVideo: document.getElementById('raw-result-video'),
    rawSafeZone: document.getElementById('raw-safe-zone'),
    btnToggleSafezoneRaw: document.getElementById('btn-toggle-safezone-raw'),
    btnSaveRawFinished: document.getElementById('btn-save-raw-finished'),

    // Content Kits (Thành Phẩm)
    cstageKitsGrid: document.getElementById('cstage-kits-grid'),
    contentFilterBtns: document.querySelectorAll('.content-filter-btn'),

    // Modals: Product Info & USP Editor (Todo6)
    modalEditProductInfo: document.getElementById('modal-edit-product-info'),
    editFolderId: document.getElementById('edit-folder-id'),
    editFolderName: document.getElementById('edit-folder-name'),
    editFolderPrice: document.getElementById('edit-folder-price'),
    editFolderFullname: document.getElementById('edit-folder-fullname'),
    editFolderOrigin: document.getElementById('edit-folder-origin'),
    editFolderDesc: document.getElementById('edit-folder-desc'),
    editFolderUsp: document.getElementById('edit-folder-usp'),
    btnSaveProductInfo: document.getElementById('btn-save-product-info'),

    // Modals: Model Info & Persona Editor (Todo7)
    modalEditModelInfo: document.getElementById('modal-edit-model-info'),
    editModelId: document.getElementById('edit-model-id'),
    editModelName: document.getElementById('edit-model-name'),
    editModelAge: document.getElementById('edit-model-age'),
    editModelRole: document.getElementById('edit-model-role'),
    editModelStyle: document.getElementById('edit-model-style'),
    editModelDesc: document.getElementById('edit-model-desc'),
    btnSaveModelInfo: document.getElementById('btn-save-model-info'),

    // Modals: Script Detail
    modalScriptDetail: document.getElementById('modal-script-detail'),
    detailScriptGroup: document.getElementById('detail-script-group'),
    detailScriptTitle: document.getElementById('detail-script-title'),
    detailScriptAudience: document.getElementById('detail-script-audience'),
    detailScriptMusic: document.getElementById('detail-script-music'),
    detailScriptHook: document.getElementById('detail-script-hook'),
    detailScriptScenes: document.getElementById('detail-script-scenes'),
    btnDetailDownloadMd: document.getElementById('btn-detail-download-md'),
    btnDetailEditScript: document.getElementById('btn-detail-edit-script'),

    // Modals: Hook Editor
    // Hook Vault (Screenshot 1 & 3)
    btnHookAiGenerate: document.getElementById('btn-hook-ai-generate'),
    hookSearchInput: document.getElementById('hook-search-input'),
    hookSkuSelect: document.getElementById('hook-sku-select'),
    hookCategoryTabsBar: document.getElementById('hook-category-tabs-bar'),
    hookSkuSelectModal: document.getElementById('hook-sku-select-modal'),
    hookVisualInput: document.getElementById('hook-visual-input'),
    hookSoundInput: document.getElementById('hook-sound-input'),

    // Module 1 Standby & Post-Render (Requirement 3)
    engineStatusBadge: document.getElementById('engine-status-badge'),
    enginePreRenderInfo: document.getElementById('engine-pre-render-info'),
    enginePostRenderActions: document.getElementById('engine-post-render-actions'),
    btnResetImg2vidRender: document.getElementById('btn-reset-img2vid-render'),
    standbySkuImg: document.getElementById('standby-sku-img'),
    standbyModelTag: document.getElementById('standby-model-tag'),
    standbyHookTxt: document.getElementById('standby-hook-txt'),

    modalHookEditor: document.getElementById('modal-hook-editor'),
    hookModalTitle: document.getElementById('hook-modal-title'),
    hookEditId: document.getElementById('hook-edit-id'),
    hookTextInput: document.getElementById('hook-text-input'),
    hookTypeSelect: document.getElementById('hook-type-select'),
    hookPersonaInput: document.getElementById('hook-persona-input'),
    btnSaveHookModal: document.getElementById('btn-save-hook-modal'),

    // Modals: Script Editor & Upload
    modalScriptEditor: document.getElementById('modal-script-editor'),
    scriptModalTitle: document.getElementById('script-modal-title'),
    scriptEditId: document.getElementById('script-edit-id'),
    scriptTitleInput: document.getElementById('script-title-input'),
    scriptGroupSelect: document.getElementById('script-group-select'),
    scriptAudienceInput: document.getElementById('script-audience-input'),
    scriptHookInput: document.getElementById('script-hook-input'),
    scriptBodyInput: document.getElementById('script-body-input'),
    btnSaveScript: document.getElementById('btn-save-script'),
    btnSaveScriptDraft: document.getElementById('btn-save-script-draft'),
    btnSaveScriptPublish: document.getElementById('btn-save-script-publish'),

    modalUploadScript: document.getElementById('modal-upload-script'),
    scriptFileInput: document.getElementById('script-file-input'),
    scriptDropzoneClick: document.getElementById('script-dropzone-click'),
    scriptFileChosenName: document.getElementById('script-file-chosen-name'),
    btnConfirmUploadScript: document.getElementById('btn-confirm-upload-script'),

    modalProductFolder: document.getElementById('modal-product-folder'),
    folderNameInput: document.getElementById('folder-name-input'),
    folderSkuInput: document.getElementById('folder-sku-input'),
    folderPriceInput: document.getElementById('folder-price-input'),
    folderUspInput: document.getElementById('folder-usp-input'),
    btnConfirmCreateFolder: document.getElementById('btn-confirm-create-folder'),

    modalVideoPreview: document.getElementById('modal-video-preview'),
    previewModalTitle: document.getElementById('preview-modal-title'),
    popupPreviewVideo: document.getElementById('popup-preview-video'),
    popupSafeZone: document.getElementById('popup-safe-zone'),
    popupCaptionSnip: document.getElementById('popup-caption-snip'),
    popupCaptionText: document.getElementById('popup-caption-text'),
    btnPopupToggleSafezone: document.getElementById('btn-popup-toggle-safezone'),
    btnPopupCopyCaption: document.getElementById('btn-popup-copy-caption'),
    btnPopupDownloadMp4: document.getElementById('btn-popup-download-mp4'),

    modalImagePreview: document.getElementById('modal-image-preview'),
    previewImageTitle: document.getElementById('preview-image-title'),
    popupPreviewImage: document.getElementById('popup-preview-image'),
    popupImageInfo: document.getElementById('popup-image-info'),
    btnPopupDownloadImage: document.getElementById('btn-popup-download-image'),

    modalRenameFile: document.getElementById('modal-rename-file'),
    renameFileId: document.getElementById('rename-file-id'),
    renameFileInput: document.getElementById('rename-file-input'),
    btnConfirmRename: document.getElementById('btn-confirm-rename'),

    toastContainer: document.getElementById('toast-container')
  };

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  function init() {
    try {
      setupSidebarNavigation();
      setupHeyGenUI();
      setupCompletedGalleryEventHandlers();

      // Setup Vaults
      renderScriptFolderPills();
      renderScriptsVault();
      setupScriptModalHandlers();
      renderHooksVault();
      setupHookModalHandlers();

      // Setup Drive & Product Folders (Todo6 & Todo7)
      renderDriveFolders();
      renderDriveFiles();
      setupDriveHandlers();
      setupProductInfoModalHandlers();

      // Setup Model Persona Vault (Todo7)
      renderModelFolderPills();
      renderModelFolderView();
      setupModelInfoModalHandlers();
      setupModelVaultHandlers();

      // Setup 3 Creation Pipelines
      setupImageToVideoPipeline();
      renderLivestreamStage();
      setupLivestreamHandlers();
      setupRawVideoEditorPipeline();

      // Setup Content Kits
      renderContentKitsStage(state.activeContentFilter);
      setupContentKitFilters();

      // Setup BGM Library (Todo 19)
      renderBgmVault('all');
      setupBgmHandlers();

      // Setup Kho Livestream Nguồn & ASR Vault (File video thô 1-3h & Dữ liệu bóc băng)
      renderLivestreamsVault();
      setupLivestreamsVaultHandlers();

      // Setup Kho Clip Thô (Todo 25 & Wireframe)
      renderRawClipsVault();
      setupRawClipsVaultHandlers();

      // Setup Global Modals
      setupModalCloseTriggers();

      // Setup SaaS Features (Xcorp UI Kit)
      setupThemeToggle();
      setupMultiProjectManagement();
      setupSpotlightSearch();
      setupLoginPortal();
      setupAccountPopover();

      // Setup Studio Hub & Projects Hub (To-Be Architecture)
      setupHomeHubHandlers();
      renderHomeRecentProjects();
      setupProjectsHubHandlers();
      renderProjectsHub();

      // Switch to default panel: Studio Hub (Home Page)
      switchPanel('panel-home-hub');

      showToast('Nền tảng Xcorp Video AI SaaS Studio sẵn sàng phục vụ', 'info');
    } catch (err) {
      console.error('Error during init:', err);
    }
  }

  /* ==========================================================================
     GLOBAL NAVIGATION (SAAS XCORP INTEGRATION)
     ========================================================================== */
  function setupSidebarNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetPanelId = item.getAttribute('data-panel');
        switchPanel(targetPanelId);
      });
    });

    // Accordion Headers Toggling
    const accordionHeaders = [
      { id: 'header-hub-projects', group: 'accordion-hub-projects' },
      { id: 'header-video-ai', group: 'accordion-video-ai' },
      { id: 'header-resource-vaults', group: 'accordion-resource-vaults' }
    ];

    accordionHeaders.forEach(acc => {
      const headerEl = document.getElementById(acc.id);
      const groupEl = document.getElementById(acc.group);
      if (headerEl && groupEl) {
        headerEl.addEventListener('click', () => {
          groupEl.classList.toggle('expanded');
        });
      }
    });

    // Floating Sidebar Collapse Toggle Button
    const btnCollapse = document.getElementById('btn-sidebar-collapse');
    const sidebar = document.getElementById('studio-sidebar');
    if (btnCollapse && sidebar) {
      btnCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Topbar Search Icon Click Trigger
    const btnSearch = document.getElementById('btn-topbar-search');
    if (btnSearch) {
      btnSearch.addEventListener('click', () => {
        const query = prompt('Tìm kiếm nhanh kịch bản, sản phẩm, model, câu hook (hoặc bấm Ctrl + K):');
        if (query && query.trim()) {
          const q = query.toLowerCase().trim();
          if (q.includes('hook') || q.includes('giật tít')) {
            switchPanel('panel-vault-hooks');
          } else if (q.includes('kịch bản') || q.includes('script')) {
            switchPanel('panel-vault-angles');
          } else if (q.includes('sản phẩm') || q.includes('serum') || q.includes('kem')) {
            switchPanel('panel-vault-assets');
          } else if (q.includes('model') || q.includes('mẫu')) {
            switchPanel('panel-vault-models');
          } else if (q.includes('video') || q.includes('hoàn thiện')) {
            switchPanel('panel-projects-hub');
          } else {
            showToast(`Kết quả tìm kiếm cho "${query}": đã lọc theo dữ liệu hệ thống`, 'info');
          }
        }
      });
    }

    // Topbar Language Switcher [ EN ]
    const btnLang = document.getElementById('btn-topbar-lang');
    if (btnLang) {
      btnLang.addEventListener('click', () => {
        const span = btnLang.querySelector('span');
        if (span) {
          const curr = span.textContent.trim();
          const next = curr === 'EN' ? 'VI' : 'EN';
          span.textContent = next;
          showToast(`Đã chuyển ngôn ngữ hệ thống sang [${next}]`, 'success');
        }
      });
    }

    // Topbar Notification Bell
    const btnNotif = document.getElementById('btn-notifications');
    if (btnNotif) {
      btnNotif.addEventListener('click', () => {
        showToast('Hệ thống Video AI Studio hoạt động bình thường • 3 video đã hoàn thiện', 'info');
      });
    }

    // Breadcrumbs Navigation Click Handlers (Click Project Root quay về trang đổi Dự Án - Todo22 Item 6)
    const topbarRootBrand = document.getElementById('topbar-root-brand');
    if (topbarRootBrand) {
      topbarRootBrand.addEventListener('click', (e) => {
        e.stopPropagation();
        backToProjectSelection();
      });
    }

    const topbarSuite = document.getElementById('topbar-current-suite');
    if (topbarSuite) {
      topbarSuite.addEventListener('click', () => {
        const text = (topbarSuite.textContent || '').toUpperCase();
        if (text.includes('TÀI NGUYÊN')) {
          switchPanel('panel-vault-angles');
        } else {
          switchPanel('panel-multi-engine');
        }
      });
    }

    const topbarModule = document.getElementById('topbar-current-module');
    if (topbarModule) {
      topbarModule.addEventListener('click', () => {
        if (DOM.scriptDetailEditorView && DOM.scriptDetailEditorView.style.display !== 'none') {
          if (DOM.btnBackToScriptList) DOM.btnBackToScriptList.click();
        }
      });
    }
  }

  function switchPanel(panelId) {
    // Backwards compatibility for vault IDs -> map to Brand & Assets Hub sub-tabs
    const vaultToTabMap = {
      'panel-vault-assets': 'products',
      'panel-vault-models': 'models',
      'panel-vault-angles': 'scripts',
      'panel-vault-hooks': 'hooks',
      'panel-vault-bgm': 'bgm'
    };
    if (vaultToTabMap[panelId]) {
      switchPanel('panel-assets-hub');
      switchAssetSubTab(vaultToTabMap[panelId]);
      return;
    }

    state.activePanel = panelId;

    // Toggle active state on HeyGen Navigation buttons
    document.querySelectorAll('.heygen-nav-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-panel') === panelId;
      btn.classList.toggle('active', isActive);
    });

    const navItems = document.querySelectorAll('.sidebar-nav-item');
    let matchedItem = null;
    navItems.forEach(item => {
      const isActive = item.getAttribute('data-panel') === panelId ||
        ((panelId === 'panel-project-clips' || panelId === 'panel-clip-detail') && item.getAttribute('data-panel') === 'panel-projects-hub');
      item.classList.toggle('active', isActive);
      if (isActive) {
        matchedItem = item;
      }
    });

    // Update topbar suite dynamically
    const topbarSuiteEl = document.getElementById('topbar-current-suite');
    if (topbarSuiteEl) {
      if (panelId === 'panel-home-hub') topbarSuiteEl.textContent = 'STUDIO HUB';
      else if (panelId === 'panel-assets-hub') topbarSuiteEl.textContent = 'BRAND & ASSETS';
      else if (panelId === 'panel-projects-hub' || panelId === 'panel-project-clips' || panelId === 'panel-clip-detail') topbarSuiteEl.textContent = 'PROJECTS';
      else topbarSuiteEl.textContent = 'VIDEO AI STUDIO';
    }

    // Toggle all stage-view-panel containers
    document.querySelectorAll('.stage-view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === panelId);
    });

    // Trigger dynamic renders depending on active panel
    if (panelId === 'panel-projects-hub') {
      if (typeof renderProjectsHub === 'function') renderProjectsHub();
    } else if (panelId === 'panel-home-hub') {
      if (typeof renderHomeRecentProjects === 'function') renderHomeRecentProjects();
    } else if (panelId === 'panel-assets-hub') {
      const activeTabBtn = document.querySelector('.assets-tab-btn.active');
      const activeTab = activeTabBtn ? activeTabBtn.getAttribute('data-asset-tab') : 'products';
      switchAssetSubTab(activeTab);
    }

    if (typeof updateFloatingSelectionBar === 'function') {
      updateFloatingSelectionBar();
    }
  }

  function switchAssetSubTab(tabName) {
    const tabs = document.querySelectorAll('#assets-sub-nav-list .sub-sidebar-nav-item, .assets-tab-btn');
    tabs.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-asset-tab') === tabName);
    });

    const subviews = {
      products: 'panel-vault-assets',
      models: 'panel-vault-models',
      scripts: 'panel-vault-angles',
      hooks: 'panel-vault-hooks',
      bgm: 'panel-vault-bgm'
    };

    Object.entries(subviews).forEach(([key, elementId]) => {
      const el = document.getElementById(elementId);
      if (el) {
        if (key === tabName) {
          el.classList.add('active');
          el.style.display = 'block';
        } else {
          el.classList.remove('active');
          el.style.display = 'none';
        }
      }
    });

    // Trigger tab specific render
    if (tabName === 'products') {
      if (typeof renderDriveFolders === 'function') renderDriveFolders();
      if (typeof renderFolderAssetsGrid === 'function') renderFolderAssetsGrid();
    } else if (tabName === 'models') {
      if (typeof renderModelFolderPills === 'function') renderModelFolderPills();
      if (typeof renderModelFolderView === 'function') renderModelFolderView();
    } else if (tabName === 'scripts') {
      if (typeof renderScriptFolderPills === 'function') renderScriptFolderPills();
      if (typeof renderScriptsVault === 'function') renderScriptsVault();
    } else if (tabName === 'hooks') {
      if (typeof renderHooksVault === 'function') renderHooksVault();
    } else if (tabName === 'bgm') {
      if (typeof renderBgmVault === 'function') renderBgmVault('all');
    }
  }

  function setupHeyGenUI() {
    // 1. HeyGen Navigation Buttons (3 Core Studios + Projects + Assets)
    document.querySelectorAll('.heygen-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-panel');
        if (target) switchPanel(target);
      });
    });

    // 2. Assets Hub Vertical Sub-Sidebar Items
    document.querySelectorAll('#assets-sub-nav-list .sub-sidebar-nav-item, .assets-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-asset-tab');
        if (tabName) switchAssetSubTab(tabName);
      });
    });

    // 3. Theme Toggle in HeyGen Sidebar
    const heygenThemeBtn = document.getElementById('btn-heygen-theme-toggle');
    if (heygenThemeBtn) {
      heygenThemeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('xcorp_theme', next);
        if (typeof showToast === 'function') {
          showToast(`Đã chuyển sang giao diện ${next === 'dark' ? 'Tối (Dark)' : 'Sáng (Light)'}`, 'info');
        }
      });
    }

    // 4. User Profile Trigger in HeyGen Sidebar
    const heygenUserTrigger = document.getElementById('heygen-user-profile-trigger');
    const popover = document.getElementById('account-dropdown-popover');
    if (heygenUserTrigger && popover) {
      heygenUserTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.classList.toggle('show');
      });
    }

    // 5. Notifications
    const heygenNotifBtn = document.getElementById('btn-heygen-notifications');
    if (heygenNotifBtn) {
      heygenNotifBtn.addEventListener('click', () => {
        if (typeof showToast === 'function') {
          showToast('Không có thông báo mới nào từ hệ thống render.', 'info');
        }
      });
    }

    // 6. Projects Image 1 Header: Search, Filter, View Mode, Sort
    const btnPrjSearch = document.getElementById('btn-prj-toggle-search');
    const prjSearchBox = document.getElementById('projects-search-expandable');
    const prjSearchInput = document.getElementById('projects-search-input');
    if (btnPrjSearch && prjSearchBox) {
      btnPrjSearch.addEventListener('click', () => {
        const isHidden = prjSearchBox.style.display === 'none';
        prjSearchBox.style.display = isHidden ? 'block' : 'none';
        btnPrjSearch.classList.toggle('active', isHidden);
        if (isHidden && prjSearchInput) {
          prjSearchInput.focus();
        }
      });
    }

    if (prjSearchInput) {
      prjSearchInput.addEventListener('input', (e) => {
        state.projectSearchQuery = e.target.value.toLowerCase().trim();
        if (typeof renderProjectsCards === 'function') {
          renderProjectsCards();
        }
      });
    }

    const btnPrjFilter = document.getElementById('btn-prj-filter-toggle');
    const prjFilterPopover = document.getElementById('prj-filter-popover');
    const prjStatusFilter = document.getElementById('projects-status-filter');
    if (btnPrjFilter && prjFilterPopover) {
      btnPrjFilter.addEventListener('click', (e) => {
        e.stopPropagation();
        prjFilterPopover.classList.toggle('show');
        btnPrjFilter.classList.toggle('active', prjFilterPopover.classList.contains('show'));
      });
      document.addEventListener('click', (e) => {
        if (!prjFilterPopover.contains(e.target) && e.target !== btnPrjFilter) {
          prjFilterPopover.classList.remove('show');
          btnPrjFilter.classList.remove('active');
        }
      });
    }

    if (prjStatusFilter) {
      prjStatusFilter.addEventListener('change', (e) => {
        state.projectStatusFilter = e.target.value;
        if (typeof renderProjectsCards === 'function') {
          renderProjectsCards();
        }
      });
    }

    const btnPrjView = document.getElementById('btn-prj-view-toggle');
    const prjGrid = document.getElementById('projects-list-grid');
    let isListView = false;
    if (btnPrjView && prjGrid) {
      btnPrjView.addEventListener('click', () => {
        isListView = !isListView;
        prjGrid.classList.toggle('projects-list-view-mode', isListView);
        btnPrjView.classList.toggle('active', isListView);
        if (typeof showToast === 'function') {
          showToast(isListView ? 'Chế độ xem: Danh sách chi tiết' : 'Chế độ xem: Lưới thẻ video', 'info');
        }
      });
    }

    const btnPrjSort = document.getElementById('btn-prj-sort-toggle');
    let sortAsc = false;
    if (btnPrjSort) {
      btnPrjSort.addEventListener('click', () => {
        sortAsc = !sortAsc;
        btnPrjSort.classList.toggle('active', sortAsc);
        if (typeof showToast === 'function') {
          showToast(sortAsc ? 'Sắp xếp: Cũ nhất trước' : 'Sắp xếp: Mới nhất trước', 'info');
        }
        if (typeof renderProjectsCards === 'function') {
          renderProjectsCards();
        }
      });
    }

    // Projects Category Tabs (Image 1 tabs: My Projects, Cắt Highlight Live, Dựng Từ Ảnh SKU, Kho Input...)
    document.querySelectorAll('#projects-core-category-tabs .projects-cat-tab-underline').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#projects-core-category-tabs .projects-cat-tab-underline').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-core-cat') || 'all';
        state.activeProjectCoreCat = cat;
        currentProjectCoreCategory = cat;
        if (cat === 'inputs_vault') {
          currentProjectFolder = 'inputs_vault';
          document.querySelectorAll('.sub-sidebar-nav-item').forEach(el => el.classList.remove('active'));
          const btn = document.getElementById('btn-folder-inputs-vault');
          if (btn) btn.classList.add('active');
        } else if (currentProjectFolder === 'inputs_vault') {
          currentProjectFolder = 'all';
          document.querySelectorAll('.sub-sidebar-nav-item').forEach(el => el.classList.remove('active'));
          const btn = document.getElementById('btn-folder-all');
          if (btn) btn.classList.add('active');
        }
        if (typeof renderProjectsCards === 'function') {
          renderProjectsCards();
        }
      });
    });
  }

  function renderDriveFolders() {
    if (!DOM.driveFolderPills) return;
    const folders = state.productFolders || [];

    DOM.driveFolderPills.innerHTML = folders.map(folder => `
      <button class="folder-pill-btn ${folder.id === state.activeDriveFolderId ? 'active' : ''}" data-folder-id="${folder.id}">
        ${ICONS.folder}
        <span>${folder.name}</span>
      </button>
    `).join('');

    DOM.driveFolderPills.querySelectorAll('.folder-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const folderId = pill.getAttribute('data-folder-id');
        state.activeDriveFolderId = folderId;
        renderDriveFolders();
        renderDriveFiles();
      });
    });
  }

  function renderDriveFiles() {
    const isAll = state.activeDriveFolderId === 'folder_all';

    if (isAll) {
      // Show Folder Cards Grid, Hide Single Folder View
      if (DOM.driveFolderCardsGrid) {
        DOM.driveFolderCardsGrid.style.display = 'grid';
        renderProductFolderCards();
      }
      if (DOM.driveFolderSkuBanner) DOM.driveFolderSkuBanner.style.display = 'none';
      if (DOM.driveAssetsGrid) DOM.driveAssetsGrid.style.display = 'none';
    } else {
      // Hide Folder Cards Grid, Show Single Folder View (Banner + Assets Grid)
      if (DOM.driveFolderCardsGrid) DOM.driveFolderCardsGrid.style.display = 'none';
      if (DOM.driveFolderSkuBanner) {
        DOM.driveFolderSkuBanner.style.display = 'flex';
        renderFolderSkuRichBanner(state.activeDriveFolderId);
      }
      if (DOM.driveAssetsGrid) {
        DOM.driveAssetsGrid.style.display = 'grid';
        renderFolderAssetsGrid(state.activeDriveFolderId);
      }
    }
  }

  /**
   * Render danh sách Thư Mục Sản Phẩm (khi ở Tất Cả Thư Mục)
   */
  function renderProductFolderCards() {
    if (!DOM.driveFolderCardsGrid) return;
    const productFolders = (state.productFolders || []).filter(f => f.id !== 'folder_all');

    if (productFolders.length === 0) {
      DOM.driveFolderCardsGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 2.5rem; text-align: center; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 8px;">
          Chưa có thư mục sản phẩm nào. Nhấn <strong>"+ Tạo Thư Mục Sản Phẩm Mới"</strong> để thêm.
        </div>
      `;
      return;
    }

    DOM.driveFolderCardsGrid.innerHTML = productFolders.map(folder => {
      const sku = folder.skuInfo || {};
      const files = (state.driveFiles || []).filter(f => f.folderId === folder.id);
      const imgCount = files.filter(f => f.type === 'image').length;
      const vidCount = files.filter(f => f.type === 'video').length;

      const uspList = sku.uspList && sku.uspList.length > 0
        ? sku.uspList
        : (sku.usp ? sku.usp.split(/[,;\n]/).map(s => s.trim()).filter(Boolean) : ['Sản phẩm chính ngạch']);

      const coverImg = folder.coverThumb || (files.length > 0 ? files[0].thumb : 'media/image/farmstay_cica_front.jpg');

      return `
        <div class="product-folder-card" id="folder-card-${folder.id}">
          <div class="product-folder-thumb-wrap">
            <img src="${coverImg}" alt="${folder.name}" class="product-folder-thumb" loading="lazy">
            <span class="product-folder-badge">THƯ MỤC SẢN PHẨM</span>
          </div>

          <div class="product-folder-content">
            <div class="product-folder-header">
              <h3 class="product-folder-title">${folder.name}</h3>
              <div class="product-folder-price">${sku.price || '-'}</div>
            </div>

            <div class="product-folder-sku-name">${sku.name || folder.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-bottom: 0.5rem;">
              Xuất xứ: <span style="color: #34d399;">${sku.origin || 'Hàn Quốc chính ngạch'}</span>
            </div>

            <p class="product-folder-desc">${sku.description || folder.description || 'Chưa có mô tả chi tiết cho sản phẩm.'}</p>

            <div class="product-folder-usp-box">
              <div class="product-folder-usp-label">Đặc Điểm Nổi Bật (USP):</div>
              <div class="product-folder-usp-list">
                ${uspList.map(usp => `<span class="product-folder-usp-pill">${ICONS.sparkle} ${usp}</span>`).join('')}
              </div>
            </div>

            <div class="product-folder-footer">
              <span class="product-folder-meta">
                ${ICONS.folder} ${files.length} tệp (${imgCount} ảnh, ${vidCount} video)
              </span>

              <div class="product-folder-actions">
                <button class="btn btn-primary btn-sm btn-open-folder" data-id="${folder.id}">
                  ${ICONS.external} Mở Thư Mục
                </button>
                <button class="btn btn-secondary btn-sm btn-edit-folder-info" data-id="${folder.id}" title="Chỉnh sửa thông tin sản phẩm và USP">
                  ${ICONS.edit} Sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Action Events on Folder Cards
    DOM.driveFolderCardsGrid.querySelectorAll('.btn-open-folder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const folderId = btn.getAttribute('data-id');
        state.activeDriveFolderId = folderId;
        renderDriveFolders();
        renderDriveFiles();
      });
    });

    DOM.driveFolderCardsGrid.querySelectorAll('.btn-edit-folder-info').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const folderId = btn.getAttribute('data-id');
        openEditProductModal(folderId);
      });
    });
  }

  /**
   * Render Rich Banner khi mở một Folder cụ thể
   */
  function renderFolderSkuRichBanner(folderId) {
    if (!DOM.driveFolderSkuBanner) return;
    const folder = state.productFolders.find(f => f.id === folderId);
    if (!folder) return;

    const sku = folder.skuInfo || {};
    const files = (state.driveFiles || []).filter(f => f.folderId === folder.id);
    const uspList = sku.uspList && sku.uspList.length > 0
      ? sku.uspList
      : (sku.usp ? sku.usp.split(/[,;\n]/).map(s => s.trim()).filter(Boolean) : ['Sản phẩm chính ngạch']);

    DOM.driveFolderSkuBanner.innerHTML = `
      <div class="folder-sku-banner-top">
        <div class="folder-sku-info-col">
          <button class="btn btn-outline btn-xs" id="btn-back-to-all-folders" style="align-self: flex-start; margin-bottom: 0.25rem;">
            ← Quay lại Tất Cả Thư Mục
          </button>
          <div class="folder-sku-title-row">
            <h3 class="folder-sku-title">${folder.name}</h3>
            <span class="badge-tag" style="background: rgba(225, 29, 72, 0.15); color: var(--rose-light); font-weight: 700;">${sku.price || '-'}</span>
            <span class="badge-tag" style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 0.72rem; font-weight: 600;">${sku.origin || 'Hàn Quốc chính ngạch'}</span>
            <span class="badge-tag" style="background: rgba(22, 119, 255, 0.12); color: var(--xcorp-blue-500); font-size: 0.72rem; font-weight: 600;">${files.length} tệp tư liệu</span>
          </div>
          <div class="folder-sku-subtitle">SKU Đầy Đủ: <strong>${sku.name || folder.name}</strong></div>
        </div>

        <div class="folder-sku-actions">
          <button class="btn btn-secondary btn-sm" id="btn-banner-edit-sku">
            ${ICONS.edit} Sửa & USP
          </button>
          <button class="btn btn-primary btn-sm" id="btn-banner-upload-to-folder">
            + Tải Lên Tệp Vào Thư Mục
          </button>
        </div>
      </div>

      <div class="folder-sku-usp-box">
        <div class="folder-sku-desc">
          ${sku.description || folder.description || 'Chưa có mô tả chi tiết cho sản phẩm.'}
        </div>
        <div class="folder-sku-usp-chips">
          <span class="folder-sku-usp-label">USP KỊCH BẢN AI:</span>
          ${uspList.map(usp => `<span class="product-folder-usp-pill">✨ ${usp}</span>`).join('')}
        </div>
      </div>
    `;

    // Banner Buttons Handlers
    const btnBack = DOM.driveFolderSkuBanner.querySelector('#btn-back-to-all-folders');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        state.activeDriveFolderId = 'folder_all';
        renderDriveFolders();
        renderDriveFiles();
      });
    }

    const btnBannerEdit = DOM.driveFolderSkuBanner.querySelector('#btn-banner-edit-sku');
    if (btnBannerEdit) {
      btnBannerEdit.addEventListener('click', () => {
        openEditProductModal(folderId);
      });
    }

    const btnBannerUpload = DOM.driveFolderSkuBanner.querySelector('#btn-banner-upload-to-folder');
    if (btnBannerUpload) {
      btnBannerUpload.addEventListener('click', () => {
        triggerFileUpload(folderId);
      });
    }
  }

  /**
   * Render grid danh sách tư liệu ảnh/video trong 1 folder theo phong cách Google Drive (Ảnh 2, 3)
   */
  function renderFolderAssetsGrid(folderId) {
    if (!DOM.driveAssetsGrid) return;
    const files = (state.driveFiles || []).filter(f => f.folderId === folderId);

    if (files.length === 0) {
      DOM.driveAssetsGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 3rem 1rem; text-align: center; color: var(--text-muted); background: var(--bg-surface-subtle); border: 1px dashed var(--border-default); border-radius: 8px;">
          <div style="margin-bottom: 0.5rem; color: var(--xcorp-blue-500); font-weight: 700; font-size: 1rem;">[THƯ MỤC TRỐNG]</div>
          <div style="font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem;">Thư mục này chưa có tệp ảnh hay video nào</div>
          <div style="font-size: 0.78rem;">Nhấn <strong>"+ Tải Lên Tệp Vào Thư Mục"</strong> ở phía trên để thêm tư liệu.</div>
        </div>
      `;
      return;
    }

    DOM.driveAssetsGrid.innerHTML = files.map((file, idx) => {
      const isVid = file.type === 'video';
      const fileBadge = isVid
        ? `<span class="badge-tag" style="font-size: 0.65rem; padding: 1px 4px; font-weight: 700;">VIDEO</span>`
        : `<span class="badge-tag" style="font-size: 0.65rem; padding: 1px 4px; font-weight: 700;">ẢNH</span>`;

      // Card đầu tiên mặc định active để mô phỏng viền xanh Drive như ảnh 2 & 3
      const isSelected = idx === 0;

      return `
        <div class="drive-card ${isSelected ? 'selected' : ''}" id="drive-card-${file.id}" data-id="${file.id}">
          <div class="drive-card-header">
            ${fileBadge}
            <span class="drive-file-name" title="${file.name}">${file.name}</span>
            <button class="drive-card-more-btn" data-id="${file.id}" title="Tùy chọn">⋮</button>
            <div class="drive-card-menu" id="drive-menu-${file.id}">
              <button class="drive-menu-item btn-preview-file" data-id="${file.id}">
                Xem trước
              </button>
              <button class="drive-menu-item btn-download-file" data-id="${file.id}">
                Tải xuống
              </button>
              <button class="drive-menu-item btn-rename-file" data-id="${file.id}">
                Đổi tên
              </button>
              <button class="drive-menu-item danger btn-delete-file" data-id="${file.id}">
                Xóa tệp
              </button>
            </div>
          </div>

          <div class="drive-card-thumb-wrap" data-id="${file.id}">
            <img src="${file.thumb}" alt="${file.name}" class="drive-card-thumb" loading="lazy">
            ${isVid ? `<div class="drive-thumb-play-overlay"><span>[XEM]</span></div>` : ''}
            <span class="drive-file-meta-badge">${isVid ? (file.duration || '00:30') : (file.size || '2.5 MB')}</span>
          </div>
        </div>
      `;
    }).join('');

    // Click chọn thẻ (Viền xanh dương đặc trưng Google Drive)
    DOM.driveAssetsGrid.querySelectorAll('.drive-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.drive-card-more-btn') || e.target.closest('.drive-card-menu')) return;
        DOM.driveAssetsGrid.querySelectorAll('.drive-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Mở menu 3 chấm
    DOM.driveAssetsGrid.querySelectorAll('.drive-card-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const fileId = btn.getAttribute('data-id');
        const menu = document.getElementById(`drive-menu-${fileId}`);

        // Đóng các menu khác
        document.querySelectorAll('.drive-card-menu').forEach(m => {
          if (m !== menu) m.classList.remove('open');
        });

        if (menu) menu.classList.toggle('open');
      });
    });

    // Xem trước khi click vào thumbnail
    DOM.driveAssetsGrid.querySelectorAll('.drive-card-thumb-wrap').forEach(wrap => {
      wrap.addEventListener('click', (e) => {
        e.stopPropagation();
        const fileId = wrap.getAttribute('data-id');
        previewDriveFile(fileId);
      });
    });

    // Tác vụ bên trong Menu 3 chấm
    DOM.driveAssetsGrid.querySelectorAll('.btn-preview-file').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDriveMenus();
        const fileId = btn.getAttribute('data-id');
        previewDriveFile(fileId);
      });
    });

    DOM.driveAssetsGrid.querySelectorAll('.btn-download-file').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDriveMenus();
        const fileId = btn.getAttribute('data-id');
        const file = state.driveFiles.find(f => f.id === fileId);
        if (file) {
          showToast(`Bắt đầu tải xuống: ${file.name}`, 'success');
        }
      });
    });

    DOM.driveAssetsGrid.querySelectorAll('.btn-rename-file').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDriveMenus();
        const fileId = btn.getAttribute('data-id');
        openRenameModal(fileId);
      });
    });

    DOM.driveAssetsGrid.querySelectorAll('.btn-delete-file').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDriveMenus();
        const fileId = btn.getAttribute('data-id');
        if (confirm('Bạn có chắc chắn muốn xóa tệp này khỏi thư mục?')) {
          state.driveFiles = state.driveFiles.filter(f => f.id !== fileId);
          renderFolderAssetsGrid(state.activeDriveFolderId);
          renderProductFolderCards();
          setupRawVideoEditorPipeline();
          showToast('Đã xóa tệp thành công!', 'info');
        }
      });
    });
  }

  function closeAllDriveMenus() {
    document.querySelectorAll('.drive-card-menu').forEach(m => m.classList.remove('open'));
  }

  function previewDriveFile(fileId) {
    const file = state.driveFiles.find(f => f.id === fileId);
    if (!file) return;

    if (file.type === 'video') {
      openVideoPreviewModal({
        title: file.name,
        videoSrc: file.videoSrc || 'media/video/final_final.mp4',
        caption: `Video tư liệu sản phẩm: ${file.name} • Thời lượng: ${file.duration || '00:30'} • Dung lượng: ${file.size || '14.2 MB'}`
      });
    } else {
      openImagePreviewModal({
        title: file.name,
        imageSrc: file.thumb,
        caption: `Ảnh tư liệu sản phẩm chính hãng: ${file.name} • Dung lượng: ${file.size || '2.4 MB'}`
      });
    }
  }

  function openImagePreviewModal({ title, imageSrc, caption }) {
    if (!DOM.modalImagePreview) return;
    if (DOM.previewImageTitle) DOM.previewImageTitle.textContent = title || 'Xem Chi Tiết Ảnh Tư Liệu';
    if (DOM.popupPreviewImage) DOM.popupPreviewImage.src = imageSrc || '';
    if (DOM.popupImageInfo) DOM.popupImageInfo.textContent = caption || 'Định dạng chuẩn sắc nét cho AI Video';
    openModal(DOM.modalImagePreview);
  }

  function setupDriveHandlers() {
    // Nút tạo thư mục mới
    if (DOM.btnCreateProductFolder) {
      DOM.btnCreateProductFolder.addEventListener('click', () => {
        if (!DOM.modalProductFolder) return;
        DOM.folderNameInput.value = '';
        DOM.folderSkuInput.value = '';
        DOM.folderPriceInput.value = '';
        DOM.folderUspInput.value = '';
        openModal(DOM.modalProductFolder);
      });
    }

    if (DOM.btnConfirmCreateFolder) {
      DOM.btnConfirmCreateFolder.addEventListener('click', () => {
        const name = DOM.folderNameInput ? DOM.folderNameInput.value.trim() : '';
        const sku = DOM.folderSkuInput ? DOM.folderSkuInput.value.trim() : '';
        const price = DOM.folderPriceInput ? DOM.folderPriceInput.value.trim() : '';
        const usp = DOM.folderUspInput ? DOM.folderUspInput.value.trim() : '';

        if (!name) {
          showToast('Vui lòng nhập tên thư mục sản phẩm', 'error');
          return;
        }

        const newId = 'folder_' + Date.now();
        const uspList = usp.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);

        state.productFolders.push({
          id: newId,
          name: name,
          skuInfo: {
            name: sku || name,
            price: price || 'Liên hệ',
            origin: 'Hàn Quốc chính ngạch',
            description: `Dòng sản phẩm ${name} nhập khẩu chính ngạch Mỹ Nguyên TSC.`,
            usp: usp,
            uspList: uspList.length > 0 ? uspList : ['Chính ngạch Mỹ Nguyên TSC']
          },
          coverThumb: 'media/image/farmstay_cica_front.jpg'
        });

        state.activeDriveFolderId = newId;
        renderDriveFolders();
        renderDriveFiles();
        updatePipelineFolderSelect();
        populateRawVideoFolders();

        closeModal(DOM.modalProductFolder);
        showToast(`Đã tạo thư mục sản phẩm "${name}" thành công!`, 'success');
      });
    }

    // Modal Đổi tên tệp
    if (DOM.btnConfirmRename) {
      DOM.btnConfirmRename.addEventListener('click', () => {
        const fileId = DOM.renameFileId.value;
        const newName = DOM.renameFileInput.value.trim();
        if (newName) {
          const file = state.driveFiles.find(f => f.id === fileId);
          if (file) {
            file.name = newName;
            renderFolderAssetsGrid(state.activeDriveFolderId);
            showToast('Đã đổi tên tệp thành công!', 'success');
          }
        }
        closeModal(DOM.modalRenameFile);
      });
    }

    // Tải ảnh từ Image Preview Modal
    if (DOM.btnPopupDownloadImage) {
      DOM.btnPopupDownloadImage.addEventListener('click', () => {
        showToast('Đang tải hình ảnh gốc chất lượng cao về thiết bị...', 'success');
      });
    }

    // Đóng dropdown menu khi click ra ngoài
    document.addEventListener('click', () => {
      closeAllDriveMenus();
    });
  }

  function triggerFileUpload(folderId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach((f, idx) => {
          const isVid = f.type.startsWith('video');
          state.driveFiles.unshift({
            id: 'UPLOAD_' + Date.now() + '_' + idx,
            name: f.name,
            type: isVid ? 'video' : 'image',
            folderId: folderId,
            thumb: isVid ? 'media/image/farmstay_retinol_table.jpg' : 'media/image/farmstay_retinol_box.jpg',
            videoSrc: 'media/video/final_final.mp4',
            size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
            createdAt: 'Hôm nay'
          });
        });
        renderDriveFiles();
        setupRawVideoEditorPipeline();
        showToast(`Đã tải lên ${files.length} tệp thành công vào thư mục!`, 'success');
      }
    };
    input.click();
  }

  function openRenameModal(fileId) {
    const file = state.driveFiles.find(f => f.id === fileId);
    if (!file || !DOM.modalRenameFile) return;
    DOM.renameFileId.value = file.id;
    DOM.renameFileInput.value = file.name;
    openModal(DOM.modalRenameFile);
  }

  /* ==========================================================================
     MODAL EDIT THÔNG TIN SẢN PHẨM & USP (TODO6)
     ========================================================================== */
  function setupProductInfoModalHandlers() {
    if (DOM.btnSaveProductInfo) {
      DOM.btnSaveProductInfo.addEventListener('click', () => {
        const folderId = DOM.editFolderId.value;
        const folder = state.productFolders.find(f => f.id === folderId);
        if (!folder) return;

        const name = DOM.editFolderName.value.trim() || folder.name;
        const price = DOM.editFolderPrice.value.trim() || '-';
        const fullName = DOM.editFolderFullname.value.trim() || name;
        const origin = DOM.editFolderOrigin.value.trim() || 'Hàn Quốc chính ngạch';
        const desc = DOM.editFolderDesc.value.trim() || '';
        const usp = DOM.editFolderUsp.value.trim() || '';
        const uspList = usp.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);

        folder.name = name;
        folder.fullName = fullName;
        folder.price = price;
        folder.origin = origin;
        folder.description = desc;
        folder.usp = usp;

        if (!folder.skuInfo) folder.skuInfo = {};
        folder.skuInfo.name = fullName;
        folder.skuInfo.price = price;
        folder.skuInfo.origin = origin;
        folder.skuInfo.description = desc;
        folder.skuInfo.usp = usp;
        folder.skuInfo.uspList = uspList.length > 0 ? uspList : [usp || 'Hàng chính ngạch'];

        // Re-render UI
        renderDriveFolders();
        renderDriveFiles();
        updatePipelineFolderSelect();

        // If this folder is currently active in image-to-video pipeline, update it
        if (DOM.img2vidFolderSelect && DOM.img2vidFolderSelect.value === folder.id) {
          updateEngineSkuInfoBox(folder.id);
        }

        closeModal(DOM.modalEditProductInfo);
        showToast(`Đã cập nhật thông tin & USP cho sản phẩm ${name} thành công!`, 'success');
      });
    }
  }

  function openEditProductModal(folderId) {
    const folder = state.productFolders.find(f => f.id === folderId);
    if (!folder || !DOM.modalEditProductInfo) return;

    const sku = folder.skuInfo || {};

    DOM.editFolderId.value = folder.id;
    DOM.editFolderName.value = folder.name || '';
    DOM.editFolderPrice.value = sku.price || folder.price || '249.000đ';
    DOM.editFolderFullname.value = sku.name || folder.fullName || folder.name || '';
    DOM.editFolderOrigin.value = sku.origin || folder.origin || 'Hàn Quốc chính ngạch Mỹ Nguyên TSC';
    DOM.editFolderDesc.value = sku.description || folder.description || '';

    const uspVal = sku.uspList && sku.uspList.length > 0
      ? sku.uspList.join(', ')
      : (sku.usp || folder.usp || '');
    DOM.editFolderUsp.value = uspVal;

    openModal(DOM.modalEditProductInfo);
  }

  function selectFolderForVideoCreation(folderId) {
    switchPanel('panel-multi-engine');
    if (DOM.img2vidFolderSelect) {
      DOM.img2vidFolderSelect.value = folderId;
      updateEngineSkuInfoBox(folderId);
      renderPackshotsForSelectedFolder(folderId);
    }
    showToast('Đã nạp dữ liệu SKU & ảnh sản phẩm vào Module Dựng Video!', 'info');
  }

  function updatePipelineFolderSelect() {
    if (!DOM.img2vidFolderSelect) return;
    const productFoldersOnly = (state.productFolders || []).filter(f => f.id !== 'folder_all');
    const currentVal = DOM.img2vidFolderSelect.value;

    DOM.img2vidFolderSelect.innerHTML = productFoldersOnly.map(f => `
      <option value="${f.id}" ${f.id === currentVal ? 'selected' : ''}>${f.name}</option>
    `).join('');
  }

  /* ==========================================================================
     KHO ẢNH & PERSONA MODEL (MODULE VAULT MỚI - TODO7)
     ========================================================================== */
  function renderModelFolderPills() {
    if (!DOM.modelFolderPills) return;
    const folders = state.modelFolders || [];

    DOM.modelFolderPills.innerHTML = folders.map(folder => `
      <button class="folder-pill-btn ${folder.id === state.activeModelFolderId ? 'active' : ''}" data-model-id="${folder.id}">
        ${folder.id === 'model_all' ? ICONS.users : ICONS.user}
        <span>${folder.name}</span>
      </button>
    `).join('');

    DOM.modelFolderPills.querySelectorAll('.folder-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const modelId = pill.getAttribute('data-model-id');
        state.activeModelFolderId = modelId;
        renderModelFolderPills();
        renderModelFolderView();
      });
    });
  }

  function renderModelFolderView() {
    const isAll = state.activeModelFolderId === 'model_all';

    if (isAll) {
      if (DOM.modelFolderCardsGrid) {
        DOM.modelFolderCardsGrid.style.display = 'grid';
        renderModelFolderCards();
      }
      if (DOM.modelFolderDetailView) DOM.modelFolderDetailView.style.display = 'none';
    } else {
      if (DOM.modelFolderCardsGrid) DOM.modelFolderCardsGrid.style.display = 'none';
      if (DOM.modelFolderDetailView) {
        DOM.modelFolderDetailView.style.display = 'block';
        renderModelFolderDetail(state.activeModelFolderId);
      }
    }
  }

  function renderModelFolderCards() {
    if (!DOM.modelFolderCardsGrid) return;
    const models = (state.modelFolders || []).filter(m => m.id !== 'model_all');

    if (models.length === 0) {
      DOM.modelFolderCardsGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 2.5rem; text-align: center; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 8px;">
          Chưa có thư mục Model nào. Nhấn <strong>"+ Tạo Thư Mục Model Mới"</strong> để thêm.
        </div>
      `;
      return;
    }

    DOM.modelFolderCardsGrid.innerHTML = models.map(m => {
      const angles = m.angles || [];
      return `
        <div class="model-folder-card" id="model-card-${m.id}" data-id="${m.id}">
          <div class="model-folder-thumb-wrap">
            <img src="${m.coverThumb}" alt="${m.name}" class="model-folder-thumb" loading="lazy">
            <span class="model-folder-badge">THƯ MỤC MODEL</span>
          </div>

          <div class="model-folder-content">
            <h3 class="model-folder-title">${m.name}</h3>
            <div class="model-folder-meta">
              ${ICONS.camera} ${angles.length} ảnh góc chụp gương mặt
            </div>

            <div class="model-folder-footer">
              <div class="model-folder-actions">
                <button class="btn btn-primary btn-sm btn-open-model-folder" data-id="${m.id}">
                  ${ICONS.external} Mở Thư Mục
                </button>
                <button class="btn btn-secondary btn-sm btn-rename-model-folder" data-id="${m.id}" title="Đổi tên thư mục model">
                  ${ICONS.edit} Đổi Tên
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach actions
    DOM.modelFolderCardsGrid.querySelectorAll('.model-folder-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-rename-model-folder')) return;
        const folderId = card.getAttribute('data-id');
        state.activeModelFolderId = folderId;
        renderModelFolderPills();
        renderModelFolderView();
      });
    });

    DOM.modelFolderCardsGrid.querySelectorAll('.btn-rename-model-folder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModelModal(btn.getAttribute('data-id'));
      });
    });
  }

  function renderModelFolderDetail(folderId) {
    if (!DOM.modelFolderDetailView) return;
    const model = (state.modelFolders || []).find(m => m.id === folderId);
    if (!model) return;

    const angles = model.angles || [];

    DOM.modelFolderDetailView.innerHTML = `
      <div class="model-detail-banner">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <button class="btn btn-outline btn-xs" id="btn-back-to-all-models">
            ← Quay lại Tất Cả Thư Mục Model
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline btn-xs" id="btn-banner-edit-model">
              ${ICONS.edit} Đổi Tên Thư Mục
            </button>
            <button class="btn btn-outline btn-xs" id="btn-banner-add-angle">
              + Thêm Ảnh Góc Chụp Mới
            </button>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem;">
          <img src="${model.coverThumb}" alt="${model.name}" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; border: 2px solid rgba(168,85,247,0.4);">
          <div>
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin: 0 0 0.25rem 0;">Thư Mục: ${model.name}</h3>
            <div style="font-size: 0.8rem; color: var(--text-dim);">
              Tập ảnh đa góc cạnh (Multi-Angle Face Dataset): <strong style="color: #34d399;">${angles.length} ảnh</strong>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <h4 class="model-angles-section-title">
            Danh Sách Ảnh Các Góc Mặt (${angles.length} ảnh)
          </h4>
          <span style="font-size: 0.74rem; color: var(--text-dim);">Cung cấp đầy đủ các góc mặt cho AI để tạo video giống thật nhất</span>
        </div>

        <div class="model-angles-detail-grid">
          ${angles.map(ang => `
            <div class="model-angle-detail-card" id="ang-card-${ang.id}">
              <div class="model-angle-thumb-wrap" data-img="${ang.thumb}" data-label="${ang.label}">
                <img src="${ang.thumb}" alt="${ang.label}" loading="lazy">
                <span class="model-angle-badge-tag">${ang.label.split('(')[0].trim()}</span>
              </div>
              <div class="model-angle-detail-info">
                <div class="model-angle-detail-label">${ang.label}</div>
                <div class="model-angle-detail-desc">${ang.angleDesc || 'Ảnh góc khuôn mặt'}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Event handlers in detail view
    const btnBack = DOM.modelFolderDetailView.querySelector('#btn-back-to-all-models');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        state.activeModelFolderId = 'model_all';
        renderModelFolderPills();
        renderModelFolderView();
      });
    }

    const btnBannerEdit = DOM.modelFolderDetailView.querySelector('#btn-banner-edit-model');
    if (btnBannerEdit) {
      btnBannerEdit.addEventListener('click', () => {
        openEditModelModal(model.id);
      });
    }

    const btnBannerAddAngle = DOM.modelFolderDetailView.querySelector('#btn-banner-add-angle');
    if (btnBannerAddAngle) {
      btnBannerAddAngle.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const newAngle = {
              id: 'ang_' + Date.now(),
              label: 'Góc Chụp Mới (' + file.name.slice(0, 15) + ')',
              thumb: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
              angleDesc: 'Ảnh góc bổ sung được tải lên từ thiết bị'
            };
            model.angles.push(newAngle);
            renderModelFolderDetail(model.id);
            showToast(`Đã thêm ảnh góc chụp mới vào thư mục ${model.name}!`, 'success');
          }
        };
        input.click();
      });
    }

    // Click photo preview
    DOM.modelFolderDetailView.querySelectorAll('.model-angle-thumb-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const img = wrap.getAttribute('data-img');
        const label = wrap.getAttribute('data-label');
        openImagePreviewModal({
          title: label,
          imageSrc: img,
          caption: `Tư liệu góc chụp gương mặt người mẫu: ${label} • Sẵn sàng huấn luyện model AI`
        });
      });
    });
  }

  function openEditModelModal(modelId) {
    const model = (state.modelFolders || []).find(m => m.id === modelId);
    if (!model || !DOM.modalEditModelInfo) return;

    if (DOM.editModelId) DOM.editModelId.value = model.id;
    if (DOM.editModelName) DOM.editModelName.value = model.name || '';

    openModal(DOM.modalEditModelInfo);
  }

  function setupModelInfoModalHandlers() {
    if (DOM.btnSaveModelInfo) {
      DOM.btnSaveModelInfo.addEventListener('click', () => {
        const modelId = DOM.editModelId ? DOM.editModelId.value : '';
        const model = (state.modelFolders || []).find(m => m.id === modelId);
        if (!model) return;

        const name = DOM.editModelName ? DOM.editModelName.value.trim() : '';
        if (name) {
          model.name = name;
        }

        // Re-render UI
        renderModelFolderPills();
        renderModelFolderView();
        updatePipelineModelFolderSelect();

        closeModal(DOM.modalEditModelInfo);
        showToast(`Đã cập nhật tên thư mục Model "${model.name}" thành công!`, 'success');
      });
    }
  }

  function setupModelVaultHandlers() {
    if (DOM.btnCreateModelFolder) {
      DOM.btnCreateModelFolder.addEventListener('click', () => {
        const name = prompt('Nhập tên Model / Người Mẫu mới:');
        if (name && name.trim()) {
          const newId = 'model_' + Date.now();
          const newModel = {
            id: newId,
            name: name.trim(),
            role: 'KOC / Người Mẫu Sản Phẩm',
            age: '26 tuổi',
            style: 'Năng động, tươi tắn, biểu cảm linh hoạt',
            description: `Người mẫu ${name.trim()} với phong cách tự nhiên, phù hợp video TikTok triệu view.`,
            coverThumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
            angles: [
              { id: `ang_${newId}_1`, label: 'Chính Diện', thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', angleDesc: 'Nhìn thẳng tươi cười rạng rỡ' },
              { id: `ang_${newId}_2`, label: 'Góc Nghiêng 45°', thumb: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80', angleDesc: 'Góc nghiêng thanh thoát' },
              { id: `ang_${newId}_3`, label: 'Cầm Sản Phẩm', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', angleDesc: 'Tương tác giới thiệu sản phẩm' }
            ]
          };
          state.modelFolders.push(newModel);
          state.activeModelFolderId = newId;
          renderModelFolderPills();
          renderModelFolderView();
          updatePipelineModelFolderSelect();
          showToast(`Đã tạo thư mục Model "${name.trim()}" thành công!`, 'success');
        }
      });
    }
  }

  function selectModelForVideoCreation(modelId) {
    switchPanel('panel-multi-engine');
    if (DOM.img2vidModelFolderSelect) {
      DOM.img2vidModelFolderSelect.value = modelId;
    }
    showToast('Đã chọn Thư mục Model cho Bước 5 Module Dựng Video!', 'info');
  }

  function updatePipelineModelFolderSelect() {
    if (!DOM.img2vidModelFolderSelect) return;
    const modelFoldersOnly = (state.modelFolders || []).filter(m => m.id !== 'model_all');
    const currentVal = DOM.img2vidModelFolderSelect.value;

    DOM.img2vidModelFolderSelect.innerHTML = modelFoldersOnly.map(m => `
      <option value="${m.id}" ${m.id === currentVal ? 'selected' : ''}>👤 ${m.name} (${(m.angles || []).length} ảnh góc mặt)</option>
    `).join('');
  }

  /* ==========================================================================
     MODULE 1: DỰNG VIDEO TỪ ẢNH (IMAGE-TO-VIDEO 5 STEPS HOÀN THIỆN - TODO8)
     ========================================================================== */
  function setupImageToVideoPipeline() {
    // Populate Hooks
    if (DOM.img2vidHookSelect) {
      DOM.img2vidHookSelect.innerHTML = (state.hooks || []).map((h, i) => `
        <option value="${h.id}">${i + 1}. "${h.hookText}" (${h.type})</option>
      `).join('');
    }

    // Populate Scripts
    if (DOM.img2vidScriptSelect) {
      DOM.img2vidScriptSelect.innerHTML = (state.scripts || []).map((s, i) => `
        <option value="${s.id}">${i + 1}. ${s.title} (${s.group})</option>
      `).join('');
    }

    // Populate Folders (Step 4)
    if (DOM.img2vidFolderSelect) {
      updatePipelineFolderSelect();

      DOM.img2vidFolderSelect.addEventListener('change', () => {
        const folderId = DOM.img2vidFolderSelect.value;
        updateEngineSkuInfoBox(folderId);
        renderPackshotsForSelectedFolder(folderId);
      });

      const productFoldersOnly = (state.productFolders || []).filter(f => f.id !== 'folder_all');
      if (productFoldersOnly.length > 0) {
        updateEngineSkuInfoBox(productFoldersOnly[0].id);
        renderPackshotsForSelectedFolder(productFoldersOnly[0].id);
      }
    }

    // Step 4 Helper buttons (Todo14 Item 3)
    if (DOM.btnGotoProductDrive) {
      DOM.btnGotoProductDrive.addEventListener('click', () => {
        switchPanel('panel-vault-assets');
        const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : 'folder_all';
        state.activeDriveFolderId = folderId;
        renderDriveFolderPills();
        renderDriveFolderView();
        showToast('Đã chuyển đến Thư mục Sản phẩm trong Kho Drive!', 'info');
      });
    }

    if (DOM.btnUploadMorePackshot) {
      DOM.btnUploadMorePackshot.addEventListener('click', () => {
        showToast('Mở hộp thoại tải lên ảnh bao bì mới cho sản phẩm...', 'info');
      });
    }

    // Populate Model Folders (Step 5 - Todo8: Đơn giản 1 dropdown duy nhất)
    if (DOM.img2vidModelFolderSelect) {
      updatePipelineModelFolderSelect();

      DOM.img2vidModelFolderSelect.addEventListener('change', () => {
        const modelId = DOM.img2vidModelFolderSelect.value;
        const model = (state.modelFolders || []).find(m => m.id === modelId);
        if (model) {
          showToast(`Đã chọn model: ${model.name}`, 'info');
        }
      });
    }

    // Generate Button Action: Multi-step Realistic Rendering Simulation (Item 5)
    if (DOM.btnRunImg2vid) {
      DOM.btnRunImg2vid.addEventListener('click', () => {
        const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : '';
        const folder = state.productFolders.find(f => f.id === folderId);
        const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
        const model = state.modelFolders.find(m => m.id === modelId);

        DOM.btnRunImg2vid.disabled = true;

        // Hide video output initially if visible
        if (DOM.cstageEngineVideo) DOM.cstageEngineVideo.style.display = 'none';
        if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'none';
        if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'none';

        // Update status badge to rendering
        if (DOM.engineStatusBadge) {
          DOM.engineStatusBadge.textContent = '⚡ ĐANG RENDER AI (GPU 60FPS)...';
          DOM.engineStatusBadge.style.cssText = 'background: rgba(14, 165, 233, 0.15); color: #0284c7; border: 1px solid rgba(14, 165, 233, 0.4); font-weight: 700;';
        }

        // Show render simulation overlay
        if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.add('active');

        const steps = [
          { percent: '22%', title: '1/4: Đang nạp ảnh sản phẩm & tách nền 3D...', sub: `Phân tích cấu trúc bao bì "${folder?.name || 'SKU'}" & tem phụ...` },
          { percent: '52%', title: '2/4: Đang kết nối kịch bản & câu hook viral 0-3s...', sub: 'Đồng bộ góc quay camera & timeline TikTok...' },
          { percent: '80%', title: '3/4: Đang sinh chuyển động 3D & biểu cảm model...', sub: `Khớp biểu cảm gương mặt model ${model?.name || ''} theo lời thoại...` },
          { percent: '96%', title: '4/4: Đang chèn tem phụ chính ngạch & lồng âm thanh...', sub: 'Render định dạng MP4 1080x1920 60FPS chuẩn Safe Zone...' },
          { percent: '100%', title: 'Hoàn tất render video AI!', sub: 'Đang tải video vào khung xem trước preview...' }
        ];

        let currentStep = 0;

        function advanceRenderStep() {
          if (currentStep < steps.length) {
            const s = steps[currentStep];
            if (DOM.renderProgressFill) DOM.renderProgressFill.style.width = s.percent;
            if (DOM.renderPercentTxt) DOM.renderPercentTxt.textContent = s.percent;
            if (DOM.renderStepTitle) DOM.renderStepTitle.textContent = s.title;
            if (DOM.renderStepSub) DOM.renderStepSub.textContent = s.sub;
            currentStep++;

            const delay = currentStep === 1 ? 500 : currentStep === 2 ? 600 : currentStep === 3 ? 700 : currentStep === 4 ? 500 : 350;
            setTimeout(advanceRenderStep, delay);
          } else {
            // Completed: Transition from Rendering -> Completed State
            if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.classList.remove('active');
            if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'none';

            if (DOM.engineStatusBadge) {
              DOM.engineStatusBadge.textContent = '✓ PREVIEW SẴN SÀNG (ĐÃ RENDER)';
              DOM.engineStatusBadge.style.cssText = 'background: var(--color-success-bg); color: var(--color-success); border: 1px solid var(--color-success-border); font-weight: 700;';
            }

            if (DOM.cstageEngineVideo) {
              DOM.cstageEngineVideo.style.display = 'block';
              DOM.cstageEngineVideo.src = 'media/video/final_final.mp4';
              DOM.cstageEngineVideo.play().catch(() => {});
            }
            if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'block';
            if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'block';

            if (DOM.enginePreRenderInfo) DOM.enginePreRenderInfo.style.display = 'none';
            if (DOM.enginePostRenderActions) DOM.enginePostRenderActions.style.display = 'block';

            DOM.btnRunImg2vid.disabled = false;
            if (DOM.btnSaveImg2vidFinished) DOM.btnSaveImg2vidFinished.disabled = false;

            // Record Prompt Run into Active Session (Prompt Iteration)
            const promptVal = DOM.img2vidPromptInput ? DOM.img2vidPromptInput.value.trim() : '';
            recordPromptRunToActiveSession(promptVal, 'media/video/final_final.mp4');

            showToast(`✓ Render hoàn tất! Video 3D của "${folder?.name || 'Sản phẩm'}" đã sẵn sàng xem trước.`, 'success');
          }
        }

        advanceRenderStep();
      });
    }

    if (DOM.btnSaveImg2vidFinished) {
      DOM.btnSaveImg2vidFinished.addEventListener('click', () => {
        const folderId = DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : '';
        const folder = state.productFolders.find(f => f.id === folderId);
        const folderTitle = folder ? folder.name : 'Sản Phẩm';

        const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
        const model = state.modelFolders.find(m => m.id === modelId);
        const modelName = model ? model.name : 'Model';

        state.kits.unshift({
          id: 'KIT_IMG_' + Date.now(),
          title: `Video 3D - ${folderTitle} (${modelName})`,
          sku: folder ? (folder.skuInfo?.name || folder.name) : (window.PROTOTYPE_DATA.brand?.name || 'Sản phẩm chính hãng'),
          sourceType: 'image_to_video',
          sourceLabel: 'Dựng Từ Ảnh Sản Phẩm & Model',
          hook: 'Chất kem tan chảy mềm mịn chuẩn Glass skin!',
          duration: '18s',
          caption: `Video tạo tự động từ ảnh sản phẩm thật và Model ${modelName}! #${folderTitle.replace(/\s+/g, '')} #${modelName.replace(/\s+/g, '')} #${(window.PROTOTYPE_DATA.shortName || 'xcorp').replace(/\s+/g, '')}`,
          thumb: folder?.coverThumb || 'media/image/farmstay_retinol_water.jpg',
          videoUrl: 'media/video/final_final.mp4'
        });

        renderContentKitsStage(state.activeContentFilter);
        showToast('✓ Đã lưu video vào Kho Thành Phẩm!', 'success');
      });
    }
  }

  function updateEngineSkuInfoBox(folderId) {
    const folder = state.productFolders.find(f => f.id === folderId);
    if (!folder) return;

    const sku = folder.skuInfo || {};
    if (DOM.engineSkuCode) DOM.engineSkuCode.textContent = sku.code || 'SKU-01';
    if (DOM.engineSkuTitle) DOM.engineSkuTitle.textContent = sku.name || folder.name;
    if (DOM.engineSkuOrigin) DOM.engineSkuOrigin.textContent = sku.origin || (window.PROTOTYPE_DATA.brand ? window.PROTOTYPE_DATA.brand.name : 'Chính Hãng Phân Phối');
    if (DOM.engineSkuPrice) DOM.engineSkuPrice.textContent = sku.price || folder.price || '249.000đ';
    if (DOM.engineSkuDesc) DOM.engineSkuDesc.textContent = sku.description || folder.description || '';

    const uspList = sku.uspList && sku.uspList.length > 0
      ? sku.uspList
      : (sku.usp ? sku.usp.split(/[,;\n]/).map(s => s.trim()).filter(Boolean) : (folder.usp ? folder.usp.split('•').map(s => s.trim()).filter(Boolean) : ['Sản phẩm chính ngạch', 'Chuẩn an toàn chất lượng', 'Bảo quản cao cấp']));

    if (DOM.engineSkuUspTags) {
      DOM.engineSkuUspTags.innerHTML = uspList.map(u => `
        <span class="badge-tag" style="background: var(--color-success-bg); color: var(--color-success); font-size: 0.68rem; border: 1px solid var(--color-success-border); font-weight: 600;">✨ ${u}</span>
      `).join('');
    }

    // Enrich prompt
    if (DOM.img2vidPromptInput && uspList.length > 0) {
      const modelId = DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '';
      const model = state.modelFolders.find(m => m.id === modelId);
      const modelMention = model ? ` cùng model ${model.name}` : '';

      DOM.img2vidPromptInput.value = `Làm video TikTok 15–25 giây cho sản phẩm ${folder.name}${modelMention}. Nổi bật công dụng: ${uspList.join(', ')}. Giữ nguyên 100% tem phụ chính ngạch Mỹ Nguyên TSC, phong cách sang trọng.`;
    }
  }

  function renderPackshotsForSelectedFolder(folderId) {
    if (!DOM.enginePackshotSelector) return;
    const folderFiles = (state.driveFiles || []).filter(f => f.folderId === folderId && f.type === 'image');
    const displayFiles = folderFiles.length > 0 ? folderFiles : (state.driveFiles || []).filter(f => f.type === 'image').slice(0, 4);

    const packshotLabels = [
      'Góc chính diện 90°',
      'Tem phụ tiếng Việt',
      'Góc nghiêng 45°',
      'Texture chất kem'
    ];

    DOM.enginePackshotSelector.innerHTML = displayFiles.map((file, idx) => {
      const badgeText = packshotLabels[idx % packshotLabels.length];
      return `
        <div class="packshot-select-thumb ${idx === 0 ? 'selected' : ''}" data-img="${file.thumb}" data-title="${file.name}" data-badge="${badgeText}" title="${file.name} - ${badgeText}">
          <img src="${file.thumb}" alt="${file.name}" onerror="this.onerror=null; this.src='media/image/farmstay_retinol_box.jpg';">
          <span class="packshot-badge-tag">${badgeText}</span>
        </div>
      `;
    }).join('');

    DOM.enginePackshotSelector.querySelectorAll('.packshot-select-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        DOM.enginePackshotSelector.querySelectorAll('.packshot-select-thumb').forEach(t => t.classList.remove('selected'));
        thumb.classList.add('selected');
        const badge = thumb.getAttribute('data-badge');
        if (DOM.packshotSelectedLabel) {
          DOM.packshotSelectedLabel.textContent = `Đã chọn: ${badge}`;
        }
        showToast(`Đã chọn ảnh packshot: ${thumb.getAttribute('data-title')} (${badge})`, 'info');
      });
    });
  }

  function renderEngineModelPhotos(modelId) {
    // No-op for Todo8: Step 5 model photos grid is removed
  }

  /* ==========================================================================
     MODULE 2: CẮT HIGHLIGHT LIVESTREAM (LIVESTREAM PIPELINE - SCOPE PHASE 1)
     ========================================================================== */
  function updateLsBatchCounter(totalClips) {
    if (DOM.lsSelectedCountLabel) {
      DOM.lsSelectedCountLabel.textContent = `Đã chọn: ${state.selectedLsClipIndices.size} / ${totalClips}`;
    }
    if (DOM.btnLsApproveCountTxt) {
      DOM.btnLsApproveCountTxt.textContent = state.selectedLsClipIndices.size;
    }
    if (DOM.lsBatchCheckAll) {
      DOM.lsBatchCheckAll.checked = totalClips > 0 && state.selectedLsClipIndices.size === totalClips;
    }
  }

  function parseTimecodeToSeconds(tc) {
    if (!tc) return 0;
    const parts = tc.trim().split(':').map(Number);
    if (parts.length === 3) {
      return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
    }
    if (parts.length === 2) {
      return (parts[0] || 0) * 60 + (parts[1] || 0);
    }
    return parseFloat(tc) || 0;
  }

  function formatSecondsToTimecode(sec) {
    const s = Math.max(0, Math.round(sec));
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initLivestreamTranscript(sessionId, customFileName) {
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const sessions = curProject?.livestreamsVault || state.livestreamsVault || data.livestreamsVault || [];

    let session = sessions.find(s => s.id === sessionId);
    if (!session && sessionId === 'NEW_UPLOAD') {
      session = {
        id: `LIVE_UPLOAD_${Date.now()}`,
        title: customFileName ? `Livestream: ${customFileName}` : 'Livestream Mới Nạp Thô',
        duration: '01:45:10',
        streamer: 'Dược sĩ Lan Anh',
        asrTranscript: [
          { time: "00:00:10", text: "Chào mừng các bạn đến với phiên livestream độc quyền hôm nay của Mỹ Nguyên!" },
          { time: "00:12:30", text: "Duy nhất trong live hôm nay, hũ kem Retinol Farmstay 100ml trợ giá còn 299k, nhanh tay đặt nhé." },
          { time: "00:18:45", text: "Chất serum Cica thẩm thấu cực nhanh, làm dịu da ửng đỏ và kiểm soát dầu mụn tức thì." },
          { time: "00:35:20", text: "Mua 1 combo tặng kèm voucher 20k độc quyền giảm giá trực tiếp trên giỏ hàng góc trái." },
          { time: "01:05:15", text: "Dược sĩ khuyên dùng ngày 2 lần sáng tối để phục hồi hàng rào bảo vệ da tốt nhất." }
        ]
      };
    } else if (!session) {
      session = sessions[0] || {
        asrTranscript: [
          { time: "00:00:15", text: "Chào cả nhà đã đến với phiên livestream tối 15/09 của Mỹ Nguyên TSC!" },
          { time: "00:05:40", text: "Hôm nay tụi mình mang đến dòng Retinol Farmstay chính ngạch Hàn Quốc có tem phụ Bộ Y Tế." },
          { time: "00:14:20", text: "Duy nhất phiên live hôm nay, Retinol Farmstay trợ giá 299k! Mua ngay trên giỏ hàng góc trái." },
          { time: "00:14:45", text: "Vô kênh của mình mà theo dõi follow up mình sẽ được giảm giá thêm 20k voucher độc quyền nha." },
          { time: "00:42:10", text: "Bây giờ em thoa serum Cica lên mu bàn tay cho cả nhà xem chất kem nhé, thẩm thấu cực nhanh." },
          { time: "01:15:05", text: "Nhiều bạn hỏi da dầu mụn có dùng được Retinol không, câu trả lời từ Dược sĩ là cực kỳ cần thiết." }
        ]
      };
    }

    state.originalLivestreamTranscript = JSON.parse(JSON.stringify(session.asrTranscript || []));
    state.currentLivestreamTranscript = JSON.parse(JSON.stringify(session.asrTranscript || []));
    state.isTranscriptConfirmed = false;
    state.activeAsrSessionId = session.id;

    renderEditableTranscriptList();
    updateTranscriptGateUI();
  }

  function renderEditableTranscriptList() {
    if (!DOM.lsTranscriptEditableList) return;
    const query = (state.transcriptSearchQuery || '').toLowerCase().trim();
    let transcript = state.currentLivestreamTranscript || [];

    if (DOM.lsTranscriptRowCounter) {
      DOM.lsTranscriptRowCounter.textContent = `${transcript.length} đoạn thoại bóc băng`;
    }

    if (transcript.length === 0) {
      DOM.lsTranscriptEditableList.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem; border: 1px dashed var(--border-default); border-radius: 8px;">
          Chưa có câu thoại nào. Bấm "+ Thêm Câu Thoại" ở trên để bổ sung.
        </div>
      `;
      return;
    }

    DOM.lsTranscriptEditableList.innerHTML = transcript.map((t, index) => {
      const isMatch = !query || (t.text || '').toLowerCase().includes(query) || (t.time || '').includes(query);
      if (!isMatch) return '';

      return `
        <div class="ls-transcript-row" data-index="${index}">
          <button class="btn-transcript-row-action btn-transcript-row-play" data-time="${t.time}" title="Phát video từ mốc ${t.time}" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <span class="ls-transcript-time-badge" data-time="${t.time}" title="Nhấp để tua video tới ${t.time}">
            ${t.time}
          </span>
          <input type="text" class="ls-transcript-input-text" data-index="${index}" value="${escapeHtml(t.text || '')}" placeholder="Nhập nội dung thoại..." />
          <button class="btn-transcript-row-action btn-transcript-row-delete" data-index="${index}" title="Xóa câu thoại này" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;
    }).join('');

    // Attach row events
    DOM.lsTranscriptEditableList.querySelectorAll('.ls-transcript-input-text').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        if (state.currentLivestreamTranscript[idx]) {
          state.currentLivestreamTranscript[idx].text = e.target.value;
          if (state.isTranscriptConfirmed) {
            state.isTranscriptConfirmed = false;
            updateTranscriptGateUI();
          }
        }
      });
    });

    DOM.lsTranscriptEditableList.querySelectorAll('.btn-transcript-row-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.currentLivestreamTranscript.splice(idx, 1);
        if (state.isTranscriptConfirmed) {
          state.isTranscriptConfirmed = false;
          updateTranscriptGateUI();
        }
        renderEditableTranscriptList();
        showToast('Đã xóa câu thoại', 'info');
      });
    });

    DOM.lsTranscriptEditableList.querySelectorAll('.ls-transcript-time-badge, .btn-transcript-row-play').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const time = el.getAttribute('data-time');
        seekLiveVideo(time);
      });
    });
  }

  function seekLiveVideo(timecode) {
    if (!timecode || !DOM.uploadedLsVideoPlayer) return;
    const parts = timecode.split(':').map(Number);
    let seconds = 0;
    if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    else if (parts.length === 2) seconds = parts[0] * 60 + parts[1];

    DOM.uploadedLsVideoPlayer.currentTime = seconds;
    DOM.uploadedLsVideoPlayer.play().catch(() => {});
    const wrap = DOM.uploadedLsVideoPlayer.closest('.live-hero-player-wrap');
    if (wrap) wrap.classList.add('is-playing');
    const timelineTxt = document.getElementById('live-player-timeline-text');
    if (timelineTxt) {
      timelineTxt.textContent = `Timeline: ${timecode} / ${DOM.uploadedLsDuration?.textContent || '02:15:30'}`;
    }
    showToast(`Đang phát video tại mốc ${timecode}`, 'info');
  }

  function updateTranscriptGateUI() {
    const isConfirmed = state.isTranscriptConfirmed;

    if (DOM.lsCutCriteriaBox) {
      if (isConfirmed) {
        DOM.lsCutCriteriaBox.classList.remove('is-locked');
        DOM.lsCutCriteriaBox.classList.add('is-unlocked');
      } else {
        DOM.lsCutCriteriaBox.classList.add('is-locked');
        DOM.lsCutCriteriaBox.classList.remove('is-unlocked');
      }
    }

    if (DOM.lsCriteriaLockNotice) {
      DOM.lsCriteriaLockNotice.style.display = isConfirmed ? 'none' : 'flex';
    }

    if (DOM.lsTranscriptStatusBadge) {
      if (isConfirmed) {
        DOM.lsTranscriptStatusBadge.textContent = '✓ Đã Kiểm Duyệt & Khóa Transcript';
        DOM.lsTranscriptStatusBadge.style.background = 'rgba(16, 185, 129, 0.1)';
        DOM.lsTranscriptStatusBadge.style.color = '#10b981';
        DOM.lsTranscriptStatusBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      } else {
        DOM.lsTranscriptStatusBadge.textContent = '⏳ Cần Kiểm Duyệt Trước Khi Cắt';
        DOM.lsTranscriptStatusBadge.style.background = 'rgba(245, 158, 11, 0.1)';
        DOM.lsTranscriptStatusBadge.style.color = '#d97706';
        DOM.lsTranscriptStatusBadge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
      }
    }

    if (DOM.btnConfirmTranscript) {
      DOM.btnConfirmTranscript.style.display = isConfirmed ? 'none' : 'inline-flex';
    }
    if (DOM.btnReEditTranscript) {
      DOM.btnReEditTranscript.style.display = isConfirmed ? 'inline-flex' : 'none';
    }

    if (DOM.btnTriggerAiCut) {
      DOM.btnTriggerAiCut.disabled = !isConfirmed;
      DOM.btnTriggerAiCut.style.opacity = isConfirmed ? '1' : '0.6';
      DOM.btnTriggerAiCut.style.cursor = isConfirmed ? 'pointer' : 'not-allowed';
    }
    if (DOM.btnTriggerAiCutTxt) {
      DOM.btnTriggerAiCutTxt.textContent = isConfirmed
        ? 'Bắt Đầu Quét Mốc & Cắt Highlight'
        : '🔒 Cần Xác Nhận Transcript Trước Khi Cắt';
    }

    if (!state.livestreamCutDone) {
      updateLsStepper(isConfirmed ? 2 : 1);
    }
  }

  function updateLsStepper(stepNum) {
    const steps = [DOM.lsPipeStep1, DOM.lsPipeStep2, DOM.lsPipeStep3, DOM.lsPipeStep4];
    steps.forEach((step, idx) => {
      if (!step) return;
      const curNum = idx + 1;
      step.classList.remove('active', 'done');
      if (curNum < stepNum) {
        step.classList.add('done');
      } else if (curNum === stepNum) {
        step.classList.add('active');
      }
    });
  }

  function extractSubtitleForClip(clip) {
    if (!clip) return '';
    if (state.activeLsClipSubtitles[clip.id || clip.title]) {
      return state.activeLsClipSubtitles[clip.id || clip.title];
    }

    const parseTime = (tStr) => {
      if (!tStr) return 0;
      const parts = tStr.split(':').map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      return 0;
    };

    const startSec = parseTime(clip.trimStart || (clip.timestamp && clip.timestamp.split(' - ')[0]));
    const endSec = parseTime(clip.trimEnd || (clip.timestamp && clip.timestamp.split(' - ')[1])) || (startSec + 35);

    const transcript = state.currentLivestreamTranscript || [];
    const matched = transcript.filter(item => {
      const itemSec = parseTime(item.time);
      return itemSec >= (startSec - 5) && itemSec <= (endSec + 5);
    });

    if (matched.length > 0) {
      return matched.map(m => m.text.trim()).join(' ');
    }

    return clip.caption || clip.recommendedHook || clip.summary || '';
  }

  let openFineTrimStudioModal = function (clipIndex) {};

  function renderLivestreamStage() {
    // 1. Chuyển đổi linh hoạt giữa Trạng Thái Video Gốc và Kết Quả Đã Cắt
    if (DOM.lsUploadStateView) {
      DOM.lsUploadStateView.style.display = state.livestreamCutDone ? 'none' : 'block';
    }
    if (state.livestreamCutDone) {
      if (state.lsSubStep === 'post_prod') {
        if (DOM.lsResultsStateView) DOM.lsResultsStateView.style.display = 'none';
        if (DOM.lsPostprodStateView) DOM.lsPostprodStateView.style.display = 'block';
        updateLsStepper(4);
        renderPostprodStage();
      } else {
        if (DOM.lsResultsStateView) DOM.lsResultsStateView.style.display = 'block';
        if (DOM.lsPostprodStateView) DOM.lsPostprodStateView.style.display = 'none';
        updateLsStepper(3);
      }
    } else {
      if (DOM.lsResultsStateView) DOM.lsResultsStateView.style.display = 'none';
      if (DOM.lsPostprodStateView) DOM.lsPostprodStateView.style.display = 'none';
      updateLsStepper(state.isTranscriptConfirmed ? 2 : 1);
    }

    // Đảm bảo transcript được nạp ban đầu
    if (!state.currentLivestreamTranscript || state.currentLivestreamTranscript.length === 0) {
      initLivestreamTranscript(DOM.lsProjectSessionSelect ? DOM.lsProjectSessionSelect.value : 'LIVE_2026_09_15');
    } else if (!state.livestreamCutDone) {
      updateTranscriptGateUI();
    }

    // 2. Lấy dữ liệu livestream từ project hiện tại
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const liveSession = curProject?.livestreamSession || data.livestreamSession;
    const clips = liveSession?.goldenMoments || [];

    // Cập nhật số lượng kho video thô
    if (DOM.rawVaultCountBadge) {
      DOM.rawVaultCountBadge.textContent = (state.rawClipsVault || []).length || clips.length;
    }

    if (!DOM.cstageLsClipsList) return;

    // Render danh sách clip thô (Item 4: Xóa tag Gợi ý Hook tĩnh theo Todo23 Item 4)
    DOM.cstageLsClipsList.innerHTML = clips.map((clip, idx) => {
      const isSelected = idx === state.activeLsClipIndex;
      const isChecked = state.selectedLsClipIndices.has(idx);
      return `
        <div class="livestream-clip-card ${isSelected ? 'selected' : ''}" data-index="${idx}">
          <div class="clip-card-header">
            <div class="clip-title-group" style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" class="form-checkbox ls-clip-check" data-index="${idx}" ${isChecked ? 'checked' : ''} style="cursor: pointer;">
              <span class="clip-idx-badge">0${idx + 1}</span>
              <strong class="livestream-clip-title">${clip.title}</strong>
            </div>
            <span class="clip-time-badge">${clip.timestamp} • ${clip.duration}</span>
          </div>
          <div style="margin: 0.25rem 0; display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
            <span class="badge-tag" style="background: var(--xcorp-blue-50); color: var(--xcorp-blue-600); border: 1px solid var(--xcorp-blue-200); font-size: 0.68rem; font-weight: 700;">
              ${clip.group || 'Nhóm Kịch Bản'}
            </span>
          </div>
          <div class="clip-summary-text">${clip.summary}</div>
          <div class="clip-actions-row">
            <button class="btn btn-secondary btn-sm btn-preview-clip" data-index="${idx}">
              <span>Xem Preview</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    DOM.cstageLsClipsList.querySelectorAll('.btn-fine-trim-clip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        state.activeLsClipIndex = index;
        openFineTrimStudioModal(index);
      });
    });

    DOM.cstageLsClipsList.querySelectorAll('.btn-preview-clip, .livestream-clip-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('ls-clip-check') || e.target.closest('.ls-clip-check') || e.target.closest('.btn-fine-trim-clip')) return;
        const index = parseInt(el.getAttribute('data-index'), 10);
        state.activeLsClipIndex = index;
        const clip = clips[index];
        if (clip && DOM.cstageLsVideo) {
          DOM.cstageLsVideo.src = clip.videoSrc || 'media/video/final_final.mp4';
          DOM.cstageLsVideo.play().catch(() => {});
          if (DOM.cstageCaptionSnip) {
            DOM.cstageCaptionSnip.textContent = clip.caption || clip.recommendedHook;
            DOM.cstageCaptionSnip.style.display = state.lsCaptionBurnIn ? 'block' : 'none';
          }
          renderLivestreamStage();
          showToast(`Đang phát preview: ${clip.title}`, 'info');
        }
      });
    });

    DOM.cstageLsClipsList.querySelectorAll('.ls-clip-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        const idx = parseInt(chk.getAttribute('data-index'), 10);
        if (chk.checked) {
          state.selectedLsClipIndices.add(idx);
        } else {
          state.selectedLsClipIndices.delete(idx);
        }
        updateLsBatchCounter(clips.length);
      });
    });

    updateLsBatchCounter(clips.length);

    // Sync fine-tune trim slider
    const activeClip = clips[state.activeLsClipIndex] || clips[0];
    if (activeClip) {
      if (DOM.lsTrimStartInput) DOM.lsTrimStartInput.value = activeClip.trimStart || '00:14:20';
      if (DOM.lsTrimEndInput) DOM.lsTrimEndInput.value = activeClip.trimEnd || '00:14:55';
      if (DOM.lsTrimRange) DOM.lsTrimRange.value = activeClip.trimSec || 35;
      if (DOM.lsTrimDurationBadge) DOM.lsTrimDurationBadge.textContent = `${activeClip.trimSec || 35} Giây`;
    }
  }

  function renderPostprodStage() {
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const liveSession = curProject?.livestreamSession || data.livestreamSession;
    const clips = liveSession?.goldenMoments || [];
    const selectedIndices = Array.from(state.selectedLsClipIndices);

    if (DOM.btnPostprodCountTxt) {
      DOM.btnPostprodCountTxt.textContent = selectedIndices.length;
    }

    if (DOM.lsPostprodSelectedClipsList) {
      if (selectedIndices.length === 0) {
        DOM.lsPostprodSelectedClipsList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem; font-size: 0.8rem;">Chưa có clip thô nào được chọn. Hãy quay lại duyệt clip!</div>`;
      } else {
        DOM.lsPostprodSelectedClipsList.innerHTML = selectedIndices.map((clipIdx, i) => {
          const clip = clips[clipIdx];
          if (!clip) return '';
          const isSelected = clipIdx === state.activeLsClipIndex;
          return `
            <div class="livestream-clip-card ${isSelected ? 'selected' : ''}" data-index="${clipIdx}" style="cursor: pointer;">
              <div class="clip-card-header">
                <div class="clip-title-group" style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="clip-idx-badge" style="background: var(--xcorp-blue-600); color: #ffffff;">0${i + 1}</span>
                  <strong class="livestream-clip-title">${clip.title}</strong>
                </div>
                <span class="clip-time-badge">${clip.duration || '35s'}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin: 0.35rem 0;">
                Mốc: <strong>${clip.timestamp}</strong> • ${clip.group}
              </div>
              <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 0.35rem;">
                <span style="font-size: 0.7rem; color: var(--xcorp-blue-600); font-weight: 700;">
                  ${isSelected ? '▶ Đang cấu hình' : 'Nhấp để cấu hình'}
                </span>
              </div>
            </div>
          `;
        }).join('');

        DOM.lsPostprodSelectedClipsList.querySelectorAll('.livestream-clip-card').forEach(el => {
          el.addEventListener('click', () => {
            const index = parseInt(el.getAttribute('data-index'), 10);
            state.activeLsClipIndex = index;
            const clip = clips[index];
            if (clip) {
              if (DOM.lsPostprodPreviewVideo) {
                DOM.lsPostprodPreviewVideo.src = clip.videoSrc || 'media/video/final_final.mp4';
                DOM.lsPostprodPreviewVideo.play().catch(() => {});
              }
              if (DOM.lsPostprodHookInput) {
                DOM.lsPostprodHookInput.value = clip.recommendedHook || clip.title;
              }
              if (DOM.lsPostprodHookPreviewTxt) {
                DOM.lsPostprodHookPreviewTxt.textContent = `"${clip.recommendedHook || clip.title}"`;
              }
              renderPostprodStage();
            }
          });
        });
      }
    }

    const curActiveClip = clips[state.activeLsClipIndex] || clips[selectedIndices[0]] || clips[0];
    if (curActiveClip) {
      if (DOM.lsPostprodPreviewVideo && !DOM.lsPostprodPreviewVideo.src.includes(curActiveClip.videoSrc || 'final_final.mp4')) {
        DOM.lsPostprodPreviewVideo.src = curActiveClip.videoSrc || 'media/video/final_final.mp4';
      }
      if (DOM.lsPostprodHookInput && !DOM.lsPostprodHookInput.value.trim()) {
        DOM.lsPostprodHookInput.value = curActiveClip.recommendedHook || curActiveClip.title;
      }
      if (DOM.lsPostprodHookPreviewTxt) {
        DOM.lsPostprodHookPreviewTxt.textContent = `"${DOM.lsPostprodHookInput?.value || curActiveClip.recommendedHook || curActiveClip.title}"`;
      }

      // Todo26 Item 3: Extract and sync Subtitle from confirmed transcript
      const currentSub = state.activeLsClipSubtitles[curActiveClip.id || curActiveClip.title] || curActiveClip.caption || extractSubtitleForClip(curActiveClip);
      curActiveClip.caption = currentSub;
      state.activeLsClipSubtitles[curActiveClip.id || curActiveClip.title] = currentSub;

      if (DOM.lsPostprodCaptionEditor && DOM.lsPostprodCaptionEditor.value !== currentSub) {
        DOM.lsPostprodCaptionEditor.value = currentSub;
      }
      if (DOM.lsPostprodCaptionOverlayText) {
        DOM.lsPostprodCaptionOverlayText.textContent = `"${currentSub}"`;
      }
      if (DOM.lsPostprodCaptionOverlay) {
        DOM.lsPostprodCaptionOverlay.style.display = state.lsCaptionBurnIn ? 'block' : 'none';
      }
      if (DOM.lsSubClipTimerange) {
        DOM.lsSubClipTimerange.textContent = `${curActiveClip.trimStart || '00:14:20'} – ${curActiveClip.trimEnd || '00:14:55'}`;
      }
      if (DOM.lsCaptionCharCount) {
        const words = currentSub.trim().split(/\s+/).filter(Boolean).length;
        DOM.lsCaptionCharCount.textContent = `${currentSub.length} ký tự • ${words} từ`;
      }
    }
  }

  function setupLivestreamHandlers() {
    // 1. Play / Pause video gốc (YouTube Style Controls)
    if (DOM.btnToggleLiveVideo && DOM.uploadedLsVideoPlayer) {
      const liveWrap = DOM.uploadedLsVideoPlayer.closest('.live-hero-player-wrap');

      const togglePlayPause = () => {
        if (DOM.uploadedLsVideoPlayer.paused) {
          DOM.uploadedLsVideoPlayer.play().catch(() => {});
        } else {
          DOM.uploadedLsVideoPlayer.pause();
        }
      };

      DOM.btnToggleLiveVideo.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
      });

      DOM.uploadedLsVideoPlayer.addEventListener('click', () => {
        togglePlayPause();
      });

      DOM.uploadedLsVideoPlayer.addEventListener('play', () => {
        if (liveWrap) liveWrap.classList.add('is-playing');
      });

      DOM.uploadedLsVideoPlayer.addEventListener('pause', () => {
        if (liveWrap) liveWrap.classList.remove('is-playing');
      });

      DOM.uploadedLsVideoPlayer.addEventListener('ended', () => {
        if (liveWrap) liveWrap.classList.remove('is-playing');
      });
    }

    // 2. Tái sử dụng phiên live trong project
    if (DOM.lsProjectSessionSelect) {
      DOM.lsProjectSessionSelect.addEventListener('change', () => {
        const val = DOM.lsProjectSessionSelect.value;
        if (val === 'LIVE_2026_09_10') {
          if (DOM.uploadedLsTitle) DOM.uploadedLsTitle.textContent = 'Flash Deal Retinol & Cica Serum 10/09 – Mỹ Nguyên TSC';
          if (DOM.uploadedLsDuration) DOM.uploadedLsDuration.textContent = '01:45:00';
          if (DOM.uploadedLsFilename) DOM.uploadedLsFilename.textContent = 'session_recording_1009.mp4';
        } else {
          if (DOM.uploadedLsTitle) DOM.uploadedLsTitle.textContent = 'Livestream Mega Sale 15/09 – Mỹ Nguyên TSC';
          if (DOM.uploadedLsDuration) DOM.uploadedLsDuration.textContent = '02:15:30';
          if (DOM.uploadedLsFilename) DOM.uploadedLsFilename.textContent = 'session_recording_1509.mp4';
        }
        initLivestreamTranscript(val);
        showToast('Đã nạp dữ liệu phiên Livestream tương ứng & đồng bộ Transcript', 'info');
      });
    }

    // 3. Todo26: Pipeline Stepper Click Handlers
    if (DOM.lsPipeStep1) {
      DOM.lsPipeStep1.addEventListener('click', () => {
        state.livestreamCutDone = false;
        renderLivestreamStage();
        if (DOM.lsTranscriptReviewBox) {
          DOM.lsTranscriptReviewBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
    if (DOM.lsPipeStep2) {
      DOM.lsPipeStep2.addEventListener('click', () => {
        if (!state.isTranscriptConfirmed) {
          showToast('Vui lòng kiểm tra & bấm "Xác Nhận & Tiếp Tục Bước Cắt" ở Bước 1 trước!', 'warning');
          return;
        }
        state.livestreamCutDone = false;
        renderLivestreamStage();
        if (DOM.lsCutCriteriaBox) {
          DOM.lsCutCriteriaBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
    if (DOM.lsPipeStep3) {
      DOM.lsPipeStep3.addEventListener('click', () => {
        if (!state.livestreamCutDone) {
          showToast('Chưa quét & cắt highlight. Hãy hoàn tất Bước 1 & 2 trước!', 'info');
          return;
        }
        state.lsSubStep = 'raw_review';
        renderLivestreamStage();
      });
    }
    if (DOM.lsPipeStep4) {
      DOM.lsPipeStep4.addEventListener('click', () => {
        if (!state.livestreamCutDone) {
          showToast('Chưa quét & cắt highlight. Hãy hoàn tất Bước 1 & 2 trước!', 'info');
          return;
        }
        state.lsSubStep = 'post_prod';
        renderLivestreamStage();
      });
    }

    // 3.1 Todo26: Review & Edit Transcript Manual Controls
    if (DOM.btnConfirmTranscript) {
      DOM.btnConfirmTranscript.addEventListener('click', () => {
        state.isTranscriptConfirmed = true;
        // Save back to project/session
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        if (curProject && curProject.livestreamSession) {
          curProject.livestreamSession.asrTranscript = JSON.parse(JSON.stringify(state.currentLivestreamTranscript));
        }
        if (data.livestreamSession) {
          data.livestreamSession.asrTranscript = JSON.parse(JSON.stringify(state.currentLivestreamTranscript));
        }
        updateTranscriptGateUI();
        showToast('✓ Đã xác nhận Transcript! Mở khóa Bước 2: Cấu hình tiêu chí & Cắt highlight', 'success');
        if (DOM.lsCutCriteriaBox) {
          DOM.lsCutCriteriaBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (DOM.btnReEditTranscript) {
      DOM.btnReEditTranscript.addEventListener('click', () => {
        state.isTranscriptConfirmed = false;
        updateTranscriptGateUI();
        showToast('Đã mở khóa để chỉnh sửa lại transcript. Sau khi sửa hãy xác nhận lại.', 'info');
      });
    }

    if (DOM.btnAddManualTranscriptRow) {
      DOM.btnAddManualTranscriptRow.addEventListener('click', () => {
        const newTime = prompt('Nhập mốc thời gian câu thoại (định dạng HH:MM:SS, ví dụ 01:20:00):', '01:20:00');
        if (!newTime) return;
        const newText = prompt('Nhập nội dung câu thoại:', 'Duy nhất hôm nay trợ giá deal hot, bấm mua ngay trên giỏ hàng.');
        if (!newText) return;
        state.currentLivestreamTranscript.push({
          time: newTime.trim(),
          text: newText.trim()
        });
        state.isTranscriptConfirmed = false;
        renderEditableTranscriptList();
        updateTranscriptGateUI();
        showToast('+ Đã thêm 1 câu thoại mới vào transcript!', 'success');
      });
    }

    if (DOM.btnResetOriginalTranscript) {
      DOM.btnResetOriginalTranscript.addEventListener('click', () => {
        if (confirm('Khôi phục lại transcript bóc băng ASR ban đầu của buổi live này?')) {
          state.currentLivestreamTranscript = JSON.parse(JSON.stringify(state.originalLivestreamTranscript));
          state.isTranscriptConfirmed = false;
          renderEditableTranscriptList();
          updateTranscriptGateUI();
          showToast('Đã khôi phục transcript bóc băng gốc', 'info');
        }
      });
    }

    if (DOM.lsTranscriptEditSearch) {
      DOM.lsTranscriptEditSearch.addEventListener('input', () => {
        state.transcriptSearchQuery = DOM.lsTranscriptEditSearch.value;
        renderEditableTranscriptList();
      });
    }

    // 4. Thêm thư mục chủ đề tùy biến
    if (DOM.btnAddCustomTopicFolder) {
      DOM.btnAddCustomTopicFolder.addEventListener('click', () => {
        const folderName = prompt('Nhập tên Thư mục Chủ đề mới để phân loại clip (ví dụ: Nhóm 5 - Phản Hồi Khách Hàng):');
        if (folderName && folderName.trim()) {
          const topicGrid = document.querySelector('.grid-2[style*="gap: 0.75rem"]');
          if (topicGrid) {
            const newCard = document.createElement('label');
            newCard.className = 'topic-folder-choice-card';
            newCard.innerHTML = `
              <input type="checkbox" class="form-checkbox" name="cut_criteria_group" value="custom_${Date.now()}" checked>
              <div class="choice-card-content">
                <strong class="choice-title">${folderName.trim()}</strong>
                <span class="choice-desc">Thư mục chủ đề tùy biến do người dùng cấu hình</span>
              </div>
            `;
            topicGrid.appendChild(newCard);
            showToast(`Đã thêm thư mục chủ đề mới: ${folderName.trim()}`, 'success');
          }
        }
      });
    }

    // 5. Kích hoạt AI Cắt Highlight (Có kiểm tra Sign-off Gate Transcript)
    const triggerCutFlow = () => {
      if (!state.isTranscriptConfirmed) {
        showToast('Vui lòng kiểm tra & bấm "Xác Nhận & Tiếp Tục Bước Cắt" ở Bước 1 trước!', 'warning');
        if (DOM.lsTranscriptReviewBox) {
          DOM.lsTranscriptReviewBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      if (state.isCuttingLivestream) return;
      state.isCuttingLivestream = true;

      // Giữ view video gốc để hiển thị progress box
      state.livestreamCutDone = false;
      renderLivestreamStage();

      if (DOM.btnTriggerAiCut) {
        DOM.btnTriggerAiCut.disabled = true;
        DOM.btnTriggerAiCut.innerHTML = `<span>Đang Quét AI Theo Tiêu Chí...</span>`;
      }
      if (DOM.aiCutProgressBox) DOM.aiCutProgressBox.style.display = 'block';

      if (DOM.uploadedLsVideoPlayer) DOM.uploadedLsVideoPlayer.pause();

      let percent = 0;
      const scanSteps = [
        "Đang quét timeline Syrix ASR & đối chiếu 4 nhóm kịch bản tiêu chí...",
        "Tự động crop khung hình dọc 9:16 & nhận diện biểu cảm streamer...",
        "Tạo phụ đề tiếng Việt Safe-zone từ transcript đã duyệt...",
        "Hoàn tất! Đã trích xuất 3 clip highlight sẵn sàng cho Review Gate."
      ];

      const interval = setInterval(() => {
        percent += 25;
        if (percent > 100) percent = 100;

        const stepIdx = Math.min(Math.floor((percent / 100) * scanSteps.length), scanSteps.length - 1);
        if (DOM.aiCutStatusText) DOM.aiCutStatusText.textContent = scanSteps[stepIdx];
        if (DOM.aiCutPercentText) DOM.aiCutPercentText.textContent = `${percent}%`;
        if (DOM.aiCutProgressBarFill) DOM.aiCutProgressBarFill.style.width = `${percent}%`;

        if (percent >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            state.isCuttingLivestream = false;
            state.livestreamCutDone = true;
            state.lsSubStep = 'raw_review';

            if (DOM.btnTriggerAiCut) {
              DOM.btnTriggerAiCut.disabled = false;
              DOM.btnTriggerAiCut.innerHTML = `<span>Bắt Đầu Quét Mốc & Cắt Highlight</span>`;
            }
            if (DOM.aiCutProgressBox) DOM.aiCutProgressBox.style.display = 'none';

            state.activeLsClipIndex = 0;
            state.selectedLsClipIndices = new Set([0, 1, 2]);

            const projects = window.PROTOTYPE_PROJECTS || [];
            const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
            const liveSession = curProject?.livestreamSession || data.livestreamSession;
            const clips = liveSession?.goldenMoments || [];

            // Auto-extract subtitles from confirmed transcript for all generated clips
            clips.forEach(c => {
              const sub = extractSubtitleForClip(c);
              c.caption = sub;
              state.activeLsClipSubtitles[c.id || c.title] = sub;
            });

            renderLivestreamStage();

            const firstClip = clips[0];
            if (firstClip && DOM.cstageLsVideo) {
              DOM.cstageLsVideo.src = firstClip.videoSrc || 'media/video/final_final.mp4';
              DOM.cstageLsVideo.play().catch(() => {});
            }

            showToast('✓ Đã quét xong mốc và phân loại 3 clip theo thư mục chủ đề!', 'success');
          }, 350);
        }
      }, 160);
    };

    if (DOM.btnTriggerAiCut) {
      DOM.btnTriggerAiCut.addEventListener('click', triggerCutFlow);
    }
    if (DOM.btnRecutHighlight) {
      DOM.btnRecutHighlight.addEventListener('click', () => {
        state.livestreamCutDone = false;
        renderLivestreamStage();
        setTimeout(triggerCutFlow, 100);
      });
    }

    // 5.1 Todo26: Post-Production Subtitle Editor Listeners
    if (DOM.lsPostprodCaptionEditor) {
      DOM.lsPostprodCaptionEditor.addEventListener('input', () => {
        const val = DOM.lsPostprodCaptionEditor.value;
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const curActiveClip = clips[state.activeLsClipIndex];
        if (curActiveClip) {
          curActiveClip.caption = val;
          state.activeLsClipSubtitles[curActiveClip.id || curActiveClip.title] = val;
        }
        if (DOM.lsPostprodCaptionOverlayText) {
          DOM.lsPostprodCaptionOverlayText.textContent = `"${val}"`;
        }
        if (DOM.lsCaptionCharCount) {
          const words = val.trim().split(/\s+/).filter(Boolean).length;
          DOM.lsCaptionCharCount.textContent = `${val.length} ký tự • ${words} từ`;
        }
      });
    }

    if (DOM.btnResyncClipSubtitle) {
      DOM.btnResyncClipSubtitle.addEventListener('click', () => {
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const curActiveClip = clips[state.activeLsClipIndex];
        if (!curActiveClip) return;
        delete state.activeLsClipSubtitles[curActiveClip.id || curActiveClip.title];
        const resynced = extractSubtitleForClip(curActiveClip);
        curActiveClip.caption = resynced;
        state.activeLsClipSubtitles[curActiveClip.id || curActiveClip.title] = resynced;
        if (DOM.lsPostprodCaptionEditor) DOM.lsPostprodCaptionEditor.value = resynced;
        if (DOM.lsPostprodCaptionOverlayText) DOM.lsPostprodCaptionOverlayText.textContent = `"${resynced}"`;
        if (DOM.lsCaptionCharCount) {
          const words = resynced.trim().split(/\s+/).filter(Boolean).length;
          DOM.lsCaptionCharCount.textContent = `${resynced.length} ký tự • ${words} từ`;
        }
        showToast('✓ Đã trích xuất lại câu thoại từ Transcript ASR đã duyệt!', 'success');
      });
    }

    // 6. Nút quay lại màn hình Video Gốc
    if (DOM.btnBackToLsUpload) {
      DOM.btnBackToLsUpload.addEventListener('click', () => {
        state.livestreamCutDone = false;
        renderLivestreamStage();
        if (DOM.cstageLsVideo) DOM.cstageLsVideo.pause();
      });
    }

    // 7. Batch Check All
    if (DOM.lsBatchCheckAll) {
      DOM.lsBatchCheckAll.addEventListener('change', () => {
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        if (DOM.lsBatchCheckAll.checked) {
          state.selectedLsClipIndices = new Set(clips.map((_, i) => i));
        } else {
          state.selectedLsClipIndices.clear();
        }
        renderLivestreamStage();
      });
    }

    // 8. Fine-tune Trim Slider & Filmstrip Video Adjust Timeline (Todo22 Item 1)
    let isDraggingLeft = false;
    let isDraggingRight = false;
    let filmstripStartPct = 0;
    let filmstripEndPct = 100;

    function formatTimeCode(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    function formatTimeCodeWithDecimals(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = (seconds % 60).toFixed(1);
      return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    function updateFilmstripUI() {
      if (DOM.filmstripMaskLeft) DOM.filmstripMaskLeft.style.width = `${filmstripStartPct}%`;
      if (DOM.filmstripMaskRight) DOM.filmstripMaskRight.style.width = `${100 - filmstripEndPct}%`;
      if (DOM.filmstripTrimBox) {
        DOM.filmstripTrimBox.style.left = `${filmstripStartPct}%`;
        DOM.filmstripTrimBox.style.width = `${filmstripEndPct - filmstripStartPct}%`;
      }
      if (DOM.filmstripHandleLeft) DOM.filmstripHandleLeft.style.left = `${filmstripStartPct}%`;
      if (DOM.filmstripHandleRight) DOM.filmstripHandleRight.style.left = `${filmstripEndPct}%`;

      const videoDuration = (DOM.cstageLsVideo && DOM.cstageLsVideo.duration) ? DOM.cstageLsVideo.duration : 35;
      const startSec = (filmstripStartPct / 100) * videoDuration;
      const endSec = (filmstripEndPct / 100) * videoDuration;
      const durSec = Math.max(1, endSec - startSec);

      if (DOM.filmstripBadgeStart) DOM.filmstripBadgeStart.textContent = formatTimeCodeWithDecimals(startSec);
      if (DOM.filmstripBadgeEnd) DOM.filmstripBadgeEnd.textContent = formatTimeCodeWithDecimals(endSec);

      const baseStart = 14 * 60 + 20; // 00:14:20 base
      const formattedStart = formatTimeCode(baseStart + startSec);
      const formattedEnd = formatTimeCode(baseStart + endSec);

      if (DOM.lsTrimStartInput) DOM.lsTrimStartInput.value = formattedStart;
      if (DOM.lsTrimEndInput) DOM.lsTrimEndInput.value = formattedEnd;
      if (DOM.lsTrimDurationBadge) DOM.lsTrimDurationBadge.textContent = `${Math.round(durSec)} Giây`;
      if (DOM.filmstripRangeLabel) {
        DOM.filmstripRangeLabel.textContent = ` ${formattedStart} – ${formattedEnd} (${durSec.toFixed(1)}s)`;
      }

      if (DOM.lsTrimRange) DOM.lsTrimRange.value = Math.round(durSec);

      const projects = window.PROTOTYPE_PROJECTS || [];
      const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
      const liveSession = curProject?.livestreamSession || data.livestreamSession;
      const clips = liveSession?.goldenMoments || [];
      const clip = clips[state.activeLsClipIndex];
      if (clip) {
        clip.trimSec = Math.round(durSec);
        clip.duration = `${Math.round(durSec)}s`;
        clip.trimStart = formattedStart;
        clip.trimEnd = formattedEnd;
      }
    }

    function syncFilmstripFromInputs() {
      const projects = window.PROTOTYPE_PROJECTS || [];
      const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
      const liveSession = curProject?.livestreamSession || data.livestreamSession;
      const clips = liveSession?.goldenMoments || [];
      const clip = clips[state.activeLsClipIndex] || clips[0];
      const dur = clip ? (clip.trimSec || 35) : 35;
      filmstripStartPct = 0;
      filmstripEndPct = Math.min(100, Math.max(20, (dur / 35) * 100));
      updateFilmstripUI();
    }

    // Toggle button "Điều Chỉnh Video"
    if (DOM.btnToggleVideoAdjust && DOM.lsVideoFilmstripEditor) {
      DOM.btnToggleVideoAdjust.addEventListener('click', () => {
        const isHidden = DOM.lsVideoFilmstripEditor.style.display === 'none';
        DOM.lsVideoFilmstripEditor.style.display = isHidden ? 'block' : 'none';
        if (DOM.btnToggleVideoAdjustTxt) {
          DOM.btnToggleVideoAdjustTxt.textContent = isHidden ? 'Đóng Điều Chỉnh' : 'Điều Chỉnh Video';
        }
        if (isHidden) {
          syncFilmstripFromInputs();
          showToast('Đã mở thanh timeline điều chỉnh video dạng filmstrip', 'info');
        }
      });
    }

    if (DOM.filmstripHandleLeft) {
      DOM.filmstripHandleLeft.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDraggingLeft = true;
        document.body.style.cursor = 'ew-resize';
      });
    }

    if (DOM.filmstripHandleRight) {
      DOM.filmstripHandleRight.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDraggingRight = true;
        document.body.style.cursor = 'ew-resize';
      });
    }

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingLeft && !isDraggingRight) return;
      if (!DOM.filmstripTrackContainer) return;
      const rect = DOM.filmstripTrackContainer.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const pct = (x / rect.width) * 100;

      if (isDraggingLeft) {
        filmstripStartPct = Math.max(0, Math.min(pct, filmstripEndPct - 5));
        updateFilmstripUI();
        if (DOM.cstageLsVideo && DOM.cstageLsVideo.duration) {
          DOM.cstageLsVideo.currentTime = (filmstripStartPct / 100) * DOM.cstageLsVideo.duration;
        }
      } else if (isDraggingRight) {
        filmstripEndPct = Math.min(100, Math.max(pct, filmstripStartPct + 5));
        updateFilmstripUI();
        if (DOM.cstageLsVideo && DOM.cstageLsVideo.duration) {
          DOM.cstageLsVideo.currentTime = (filmstripEndPct / 100) * DOM.cstageLsVideo.duration;
        }
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingLeft || isDraggingRight) {
        isDraggingLeft = false;
        isDraggingRight = false;
        document.body.style.cursor = '';
      }
    });

    if (DOM.filmstripTrackContainer) {
      DOM.filmstripTrackContainer.addEventListener('click', (e) => {
        if (e.target.closest('.filmstrip-handle')) return;
        const rect = DOM.filmstripTrackContainer.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const pct = (x / rect.width) * 100;
        if (DOM.filmstripPlayhead) DOM.filmstripPlayhead.style.left = `${pct}%`;
        if (DOM.cstageLsVideo && DOM.cstageLsVideo.duration) {
          DOM.cstageLsVideo.currentTime = (pct / 100) * DOM.cstageLsVideo.duration;
        }
      });
    }

    if (DOM.lsTrimRange) {
      DOM.lsTrimRange.addEventListener('input', () => {
        const sec = parseFloat(DOM.lsTrimRange.value);
        if (DOM.lsTrimDurationBadge) DOM.lsTrimDurationBadge.textContent = `${Math.round(sec)} Giây`;
        
        if (DOM.cstageLsVideo) {
          const videoDuration = DOM.cstageLsVideo.duration || 35;
          const maxVal = parseFloat(DOM.lsTrimRange.max) || 60;
          const targetTime = (sec / maxVal) * videoDuration;
          if (!isNaN(targetTime) && isFinite(targetTime)) {
            DOM.cstageLsVideo.currentTime = targetTime;
          }
        }

        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const clip = clips[state.activeLsClipIndex];
        if (clip) {
          clip.trimSec = Math.round(sec);
          clip.duration = `${Math.round(sec)}s`;
        }
      });
    }

    if (DOM.cstageLsVideo) {
      DOM.cstageLsVideo.addEventListener('timeupdate', () => {
        if (DOM.cstageLsVideo.duration) {
          const pct = (DOM.cstageLsVideo.currentTime / DOM.cstageLsVideo.duration) * 100;
          if (DOM.filmstripPlayhead) {
            DOM.filmstripPlayhead.style.left = `${pct}%`;
          }
          if (DOM.lsTrimRange && document.activeElement !== DOM.lsTrimRange && !isDraggingLeft && !isDraggingRight) {
            const maxVal = parseFloat(DOM.lsTrimRange.max) || 60;
            const curVal = (DOM.cstageLsVideo.currentTime / DOM.cstageLsVideo.duration) * maxVal;
            DOM.lsTrimRange.value = curVal;
            if (DOM.lsTrimDurationBadge) {
              DOM.lsTrimDurationBadge.textContent = `${Math.round(curVal)} Giây`;
            }
          }
        }
      });
    }

    if (DOM.lsTrimStartInput) {
      DOM.lsTrimStartInput.addEventListener('change', () => {
        showToast(`Đã chỉnh mốc bắt đầu: ${DOM.lsTrimStartInput.value}`, 'info');
      });
    }
    if (DOM.lsTrimEndInput) {
      DOM.lsTrimEndInput.addEventListener('change', () => {
        showToast(`Đã chỉnh mốc kết thúc: ${DOM.lsTrimEndInput.value}`, 'info');
      });
    }

    // 9. Cấu hình Âm Thanh & Phụ Đề: Tinh gọn Toggle không chữ (Todo23 Item 1, 2, 7)
    if (DOM.lsToggleVoice) {
      DOM.lsToggleVoice.addEventListener('change', () => {
        state.lsVoiceActive = DOM.lsToggleVoice.checked;
        showToast(state.lsVoiceActive ? 'Đã BẬT: Giữ giọng host streamer' : 'Đã TẮT: Tắt tiếng streamer (chỉ lấy hình)', 'info');
      });
    }

    if (DOM.lsToggleBgm) {
      DOM.lsToggleBgm.addEventListener('change', () => {
        state.lsBgmActive = DOM.lsToggleBgm.checked;
        if (DOM.lsSelectBgmTrack) {
          DOM.lsSelectBgmTrack.disabled = !state.lsBgmActive;
        }
        showToast(state.lsBgmActive ? 'Đã BẬT: Lồng nhạc nền từ kho BGM' : 'Đã TẮT: Không lồng nhạc nền', 'info');
      });
    }

    if (DOM.lsCaptionSwitch) {
      DOM.lsCaptionSwitch.addEventListener('change', () => {
        state.lsCaptionBurnIn = DOM.lsCaptionSwitch.checked;
        if (DOM.cstageCaptionSnip) {
          DOM.cstageCaptionSnip.style.display = state.lsCaptionBurnIn ? 'block' : 'none';
        }
        showToast(state.lsCaptionBurnIn ? 'Đã BẬT: Phụ đề TikTok Safe Zone' : 'Đã TẮT: Phụ đề tự động', 'info');
      });
    }

    if (DOM.lsToggleHookVoiceover) {
      DOM.lsToggleHookVoiceover.addEventListener('change', () => {
        state.lsHookVoiceover = DOM.lsToggleHookVoiceover.checked;
        showToast(state.lsHookVoiceover ? 'Đã BẬT: Giọng đọc AI mồi Hook 2-3s đầu' : 'Đã TẮT: Giọng đọc AI mồi Hook', 'info');
      });
    }

    // 10. Chụp Khung Hình Làm Ảnh Bìa (Todo22 Item 3)
    if (DOM.btnPickLsCoverFrame) {
      DOM.btnPickLsCoverFrame.addEventListener('click', () => {
        const curSec = (DOM.lsPostprodPreviewVideo && DOM.lsPostprodPreviewVideo.offsetParent !== null)
          ? DOM.lsPostprodPreviewVideo.currentTime
          : (DOM.cstageLsVideo ? DOM.cstageLsVideo.currentTime : 0);
        const baseSec = 14 * 60 + 20; // 00:14:20 base
        const totalSec = Math.round(baseSec + curSec);
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        const timecode = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;

        if (DOM.lsCoverTimestampText) {
          DOM.lsCoverTimestampText.textContent = timecode;
        }

        if (DOM.lsCoverPreviewImg) {
          DOM.lsCoverPreviewImg.style.transform = 'scale(0.88)';
          DOM.lsCoverPreviewImg.style.opacity = '0.5';
          setTimeout(() => {
            DOM.lsCoverPreviewImg.style.transform = 'scale(1)';
            DOM.lsCoverPreviewImg.style.opacity = '1';
          }, 150);
        }

        showToast(`✓ Đã chọn khung hình tại [${timecode}] làm ảnh bìa video (.jpg)!`, 'success');
      });
    }

    // 11. BUTTON CẮT ĐỂ CẮT THẬT (INLINE) - TODO23 ITEM 9
    if (DOM.btnInlineCutCommit) {
      DOM.btnInlineCutCommit.addEventListener('click', () => {
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const clip = clips[state.activeLsClipIndex];
        if (clip) {
          const startVal = DOM.lsTrimStartInput ? DOM.lsTrimStartInput.value : clip.trimStart;
          const endVal = DOM.lsTrimEndInput ? DOM.lsTrimEndInput.value : clip.trimEnd;
          const sSec = parseTimecodeToSeconds(startVal);
          const eSec = parseTimecodeToSeconds(endVal);
          const durSec = Math.max(1, Math.round(eSec - sSec));

          clip.trimStart = startVal;
          clip.trimEnd = endVal;
          clip.trimSec = durSec;
          clip.duration = `${durSec}s`;
          clip.timestamp = `${startVal} - ${endVal}`;

          // Cập nhật vào Kho Video Thô
          const rawClip = (state.rawClipsVault || []).find(r => r.id === clip.id);
          if (rawClip) {
            rawClip.trimSec = durSec;
            rawClip.duration = `${durSec}s`;
            rawClip.timestamp = clip.timestamp;
          }

          renderLivestreamStage();
          showToast(`✓ Đã cắt video thành công: [${startVal} – ${endVal}] (${durSec}s)!`, 'success');
        }
      });
    }

    // 12. STUDIO CẮT VIDEO TINH CHỈNH VỚI ĐỆM 5S TRƯỚC VÀ 5S SAU (TODO23 ITEM 9 & 10)
    let ftsBufferMin = 0;
    let ftsBufferMax = 45;
    let ftsSelStart = 5;
    let ftsSelEnd = 40;
    let ftsActiveClipIndex = 0;
    let isDraggingFtsLeft = false;
    let isDraggingFtsRight = false;

    openFineTrimStudioModal = function (clipIndex) {
      ftsActiveClipIndex = clipIndex;
      const projects = window.PROTOTYPE_PROJECTS || [];
      const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
      const liveSession = curProject?.livestreamSession || data.livestreamSession;
      const clips = liveSession?.goldenMoments || [];
      const clip = clips[clipIndex] || clips[0];
      if (!clip) return;

      const startSec = parseTimecodeToSeconds(clip.trimStart || '00:14:20');
      const endSec = parseTimecodeToSeconds(clip.trimEnd || '00:14:55');
      
      // Mở rộng 5 giây trước và 5 giây sau mốc thời gian AI đề xuất (Todo23 Item 10)
      ftsBufferMin = Math.max(0, startSec - 5);
      ftsBufferMax = endSec + 5;
      ftsSelStart = startSec;
      ftsSelEnd = endSec;

      if (DOM.ftsClipTitle) DOM.ftsClipTitle.textContent = clip.title;
      if (DOM.ftsClipGroupBadge) DOM.ftsClipGroupBadge.textContent = clip.group;
      if (DOM.ftsModalVideo) {
        DOM.ftsModalVideo.src = clip.videoSrc || 'media/video/final_final.mp4';
        DOM.ftsModalVideo.play().catch(() => {});
      }

      if (DOM.ftsBufferFullRange) {
        DOM.ftsBufferFullRange.textContent = `${formatSecondsToTimecode(ftsBufferMin)} – ${formatSecondsToTimecode(ftsBufferMax)} (${(ftsBufferMax - ftsBufferMin).toFixed(1)}s)`;
      }

      const t0 = document.getElementById('fts-ruler-t0');
      const t1 = document.getElementById('fts-ruler-t1');
      const t2 = document.getElementById('fts-ruler-t2');
      const t3 = document.getElementById('fts-ruler-t3');
      if (t0) t0.textContent = `${formatSecondsToTimecode(ftsBufferMin)} (Đệm -5s)`;
      if (t1) t1.textContent = `${formatSecondsToTimecode(startSec)} [Start AI]`;
      if (t2) t2.textContent = `${formatSecondsToTimecode(endSec)} [End AI]`;
      if (t3) t3.textContent = `${formatSecondsToTimecode(endSec + 5)} (Đệm +5s)`;

      updateFineTrimStudioUI();
      openModal('modal-fine-trim-studio');
    }

    function updateFineTrimStudioUI() {
      const totalSpan = Math.max(1, ftsBufferMax - ftsBufferMin);
      const leftPct = Math.max(0, Math.min(100, ((ftsSelStart - ftsBufferMin) / totalSpan) * 100));
      const rightPct = Math.max(0, Math.min(100, ((ftsBufferMax - ftsSelEnd) / totalSpan) * 100));
      const widthPct = Math.max(0, Math.min(100, ((ftsSelEnd - ftsSelStart) / totalSpan) * 100));

      if (DOM.ftsMaskLeft) DOM.ftsMaskLeft.style.width = `${leftPct}%`;
      if (DOM.ftsTrimBox) {
        DOM.ftsTrimBox.style.left = `${leftPct}%`;
        DOM.ftsTrimBox.style.width = `${widthPct}%`;
      }
      if (DOM.ftsMaskRight) DOM.ftsMaskRight.style.width = `${rightPct}%`;
      if (DOM.ftsHandleLeft) {
        DOM.ftsHandleLeft.style.left = `${leftPct}%`;
        if (DOM.ftsBadgeStart) DOM.ftsBadgeStart.textContent = formatSecondsToTimecode(ftsSelStart);
      }
      if (DOM.ftsHandleRight) {
        DOM.ftsHandleRight.style.left = `${100 - rightPct}%`;
        if (DOM.ftsBadgeEnd) DOM.ftsBadgeEnd.textContent = formatSecondsToTimecode(ftsSelEnd);
      }

      if (DOM.ftsValStart) DOM.ftsValStart.textContent = formatSecondsToTimecode(ftsSelStart);
      if (DOM.ftsValEnd) DOM.ftsValEnd.textContent = formatSecondsToTimecode(ftsSelEnd);
      if (DOM.ftsValDuration) DOM.ftsValDuration.textContent = `${(ftsSelEnd - ftsSelStart).toFixed(1)}s`;

      if (DOM.ftsLivePlaybackTime) {
        DOM.ftsLivePlaybackTime.textContent = `Tua: ${formatSecondsToTimecode(ftsSelStart)}.0`;
      }
    }

    if (DOM.btnOpenFineTrimStudio) {
      DOM.btnOpenFineTrimStudio.addEventListener('click', () => {
        openFineTrimStudioModal(state.activeLsClipIndex);
      });
    }

    if (DOM.btnFtsResetAiBounds) {
      DOM.btnFtsResetAiBounds.addEventListener('click', () => {
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const clip = clips[ftsActiveClipIndex] || clips[0];
        if (clip) {
          ftsSelStart = parseTimecodeToSeconds(clip.trimStart || '00:14:20');
          ftsSelEnd = parseTimecodeToSeconds(clip.trimEnd || '00:14:55');
          updateFineTrimStudioUI();
          showToast('Đã đặt lại mốc chọn về đề xuất ban đầu của AI', 'info');
        }
      });
    }

    // Drag handle left (In point) trong Studio
    if (DOM.ftsHandleLeft) {
      DOM.ftsHandleLeft.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDraggingFtsLeft = true;
        document.body.style.cursor = 'ew-resize';
      });
    }

    // Drag handle right (Out point) trong Studio
    if (DOM.ftsHandleRight) {
      DOM.ftsHandleRight.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDraggingFtsRight = true;
        document.body.style.cursor = 'ew-resize';
      });
    }

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingFtsLeft && !isDraggingFtsRight) return;
      if (!DOM.ftsTrackContainer) return;
      const rect = DOM.ftsTrackContainer.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const pct = x / rect.width;
      const totalSpan = ftsBufferMax - ftsBufferMin;
      const targetSec = ftsBufferMin + pct * totalSpan;

      if (isDraggingFtsLeft) {
        ftsSelStart = Math.max(ftsBufferMin, Math.min(targetSec, ftsSelEnd - 2));
        updateFineTrimStudioUI();
        if (DOM.ftsModalVideo && DOM.ftsModalVideo.duration) {
          DOM.ftsModalVideo.currentTime = Math.max(0, (ftsSelStart - ftsBufferMin));
        }
      } else if (isDraggingFtsRight) {
        ftsSelEnd = Math.min(ftsBufferMax, Math.max(targetSec, ftsSelStart + 2));
        updateFineTrimStudioUI();
        if (DOM.ftsModalVideo && DOM.ftsModalVideo.duration) {
          DOM.ftsModalVideo.currentTime = Math.max(0, (ftsSelEnd - ftsBufferMin));
        }
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingFtsLeft || isDraggingFtsRight) {
        isDraggingFtsLeft = false;
        isDraggingFtsRight = false;
        document.body.style.cursor = '';
      }
    });

    if (DOM.ftsTrackContainer) {
      DOM.ftsTrackContainer.addEventListener('click', (e) => {
        if (e.target.closest('.filmstrip-handle')) return;
        const rect = DOM.ftsTrackContainer.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const pct = x / rect.width;
        if (DOM.ftsPlayhead) DOM.ftsPlayhead.style.left = `${pct * 100}%`;
        const totalSpan = ftsBufferMax - ftsBufferMin;
        const timeAtClick = ftsBufferMin + pct * totalSpan;
        if (DOM.ftsLivePlaybackTime) {
          DOM.ftsLivePlaybackTime.textContent = `Tua: ${formatSecondsToTimecode(timeAtClick)}.0`;
        }
        if (DOM.ftsModalVideo && DOM.ftsModalVideo.duration) {
          DOM.ftsModalVideo.currentTime = Math.max(0, timeAtClick - ftsBufferMin);
        }
      });
    }

    if (DOM.btnFtsTogglePlay && DOM.ftsModalVideo) {
      DOM.btnFtsTogglePlay.addEventListener('click', () => {
        if (DOM.ftsModalVideo.paused) {
          DOM.ftsModalVideo.play().catch(() => {});
          DOM.btnFtsTogglePlay.textContent = 'Pause';
        } else {
          DOM.ftsModalVideo.pause();
          DOM.btnFtsTogglePlay.textContent = 'Play';
        }
      });
    }

    if (DOM.btnFtsRewind1s && DOM.ftsModalVideo) {
      DOM.btnFtsRewind1s.addEventListener('click', () => {
        DOM.ftsModalVideo.currentTime = Math.max(0, DOM.ftsModalVideo.currentTime - 1);
      });
    }
    if (DOM.btnFtsForward1s && DOM.ftsModalVideo) {
      DOM.btnFtsForward1s.addEventListener('click', () => {
        DOM.ftsModalVideo.currentTime = Math.min(DOM.ftsModalVideo.duration || 60, DOM.ftsModalVideo.currentTime + 1);
      });
    }

    // Nút "Cắt Thật" trong Studio Modal (Todo23 Item 9)
    if (DOM.btnFtsCommitCut) {
      DOM.btnFtsCommitCut.addEventListener('click', () => {
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const clip = clips[ftsActiveClipIndex];
        if (clip) {
          const sFormatted = formatSecondsToTimecode(ftsSelStart);
          const eFormatted = formatSecondsToTimecode(ftsSelEnd);
          const durSec = Math.max(1, Math.round(ftsSelEnd - ftsSelStart));

          clip.trimStart = sFormatted;
          clip.trimEnd = eFormatted;
          clip.trimSec = durSec;
          clip.duration = `${durSec}s`;
          clip.timestamp = `${sFormatted} - ${eFormatted}`;

          // Cập nhật Kho Video Thô
          const rawClip = (state.rawClipsVault || []).find(r => r.id === clip.id);
          if (rawClip) {
            rawClip.trimSec = durSec;
            rawClip.duration = `${durSec}s`;
            rawClip.timestamp = clip.timestamp;
          }

          if (DOM.lsTrimStartInput) DOM.lsTrimStartInput.value = sFormatted;
          if (DOM.lsTrimEndInput) DOM.lsTrimEndInput.value = eFormatted;
          if (DOM.lsTrimDurationBadge) DOM.lsTrimDurationBadge.textContent = `${durSec} Giây`;
          if (DOM.lsTrimRange) DOM.lsTrimRange.value = durSec;

          closeModal('modal-fine-trim-studio');
          renderLivestreamStage();
          showToast(`✓ Đã cắt video thật thành công: [${sFormatted} – ${eFormatted}] (${durSec}s)!`, 'success');
        }
      });
    }

    // 13. CHUYỂN BƯỚC FLOW: DUYỆT THÔ -> HẬU KỲ CHUYÊN SÂU (TODO23 ITEM 8)
    if (DOM.btnProceedToPostprod) {
      DOM.btnProceedToPostprod.addEventListener('click', () => {
        const selectedCount = state.selectedLsClipIndices.size;
        if (selectedCount === 0) {
          showToast('Vui lòng chọn ít nhất 1 clip thô để tiến hành hậu kỳ!', 'warning');
          return;
        }
        state.lsSubStep = 'post_prod';
        renderLivestreamStage();
        showToast(`Đã chuyển sang Trạm Hậu Kỳ Chuyên Sâu cho ${selectedCount} clip!`, 'info');
      });
    }

    if (DOM.btnBackToRawReview) {
      DOM.btnBackToRawReview.addEventListener('click', () => {
        state.lsSubStep = 'raw_review';
        renderLivestreamStage();
      });
    }

    // 14. HOOK PICKER & HOOK TEXT INPUT (TODO23 ITEM 3)
    if (DOM.btnPickHookFromVault) {
      DOM.btnPickHookFromVault.addEventListener('click', () => {
        if (!DOM.hookPickerModalList) return;
        const allHooks = (state.hooks && state.hooks.length > 0) ? state.hooks : (data.trendingHookVault || []);
        if (allHooks.length === 0) {
          DOM.hookPickerModalList.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              Chưa có câu hook nào trong kho của dự án hiện tại.
            </div>
          `;
        } else {
          DOM.hookPickerModalList.innerHTML = allHooks.map((h, i) => {
            const txt = h.hookText || h.text || '';
            const category = h.type || h.category || 'Mẫu Hook Thịnh Hành';
            const persona = h.targetPersona ? `Đối tượng: ${h.targetPersona}` : '';
            return `
              <div class="glass-card hook-picker-choice-item" data-idx="${i}" style="padding: 0.85rem 1rem; cursor: pointer; border: 1px solid var(--border-default); display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
                <div style="flex: 1; min-width: 0;">
                  <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px; line-height: 1.4;">
                    "${escapeHtml(txt)}"
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                    <span class="tag tag-sm" style="background: rgba(14, 165, 233, 0.1); color: #0284c7; font-weight: 600; padding: 1px 6px; border-radius: 4px;">${escapeHtml(category)}</span>
                    ${persona ? `<span>• ${escapeHtml(persona)}</span>` : ''}
                  </div>
                </div>
                <button class="btn btn-outline btn-xs" style="pointer-events: none; flex-shrink: 0;">Chọn</button>
              </div>
            `;
          }).join('');

          DOM.hookPickerModalList.querySelectorAll('.hook-picker-choice-item').forEach(el => {
            el.addEventListener('click', () => {
              const idx = parseInt(el.getAttribute('data-idx'), 10);
              const hookObj = allHooks[idx];
              const hookTxt = hookObj ? (hookObj.hookText || hookObj.text || '') : '';
              if (!hookTxt) return;

              if (DOM.lsPostprodHookInput) DOM.lsPostprodHookInput.value = hookTxt;
              if (DOM.lsPostprodHookPreviewTxt) DOM.lsPostprodHookPreviewTxt.textContent = `"${hookTxt}"`;

              // Lưu vào clip hiện tại
              const projects = window.PROTOTYPE_PROJECTS || [];
              const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
              const liveSession = curProject?.livestreamSession || data.livestreamSession;
              const clips = liveSession?.goldenMoments || [];
              const clip = clips[state.activeLsClipIndex];
              if (clip) clip.recommendedHook = hookTxt;

              closeModal('modal-hook-picker');
              showToast(`✓ Đã áp dụng câu Hook từ kho: "${hookTxt.slice(0, 35)}..."`, 'success');
            });
          });
        }

        openModal('modal-hook-picker');
      });
    }

    if (DOM.lsPostprodHookInput) {
      DOM.lsPostprodHookInput.addEventListener('input', () => {
        const val = DOM.lsPostprodHookInput.value.trim();
        if (DOM.lsPostprodHookPreviewTxt) {
          DOM.lsPostprodHookPreviewTxt.textContent = val ? `"${val}"` : '""';
        }
        if (DOM.lsPostprodHookOverlay) {
          DOM.lsPostprodHookOverlay.style.display = 'block';
        }
      });
    }

    // 15. KHO VIDEO THÔ MODAL (TODO23 ITEM 8)
    if (DOM.btnViewRawVault) {
      DOM.btnViewRawVault.addEventListener('click', () => {
        if (!DOM.rawVaultModalList) return;
        const rawClips = state.rawClipsVault && state.rawClipsVault.length > 0 
          ? state.rawClipsVault 
          : (data.rawClipsVault || []);

        DOM.rawVaultModalList.innerHTML = rawClips.map((clip, i) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--bg-surface-subtle); border: 1px solid var(--border-default); border-radius: 8px; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <img src="${clip.thumb || 'media/image/farmstay_retinol_box.jpg'}" alt="thumb" style="width: 44px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-default);">
              <div>
                <strong style="font-size: 0.82rem; color: var(--text-main); display: block;">${clip.title}</strong>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
                  Mốc: <strong>${clip.timestamp}</strong> • ${clip.duration} • ${clip.group}
                </div>
                <span class="badge-tag" style="background: rgba(16, 185, 129, 0.1); color: #10b981; font-size: 0.65rem; border: 1px solid rgba(16, 185, 129, 0.25); margin-top: 4px;">
                  ${clip.status || 'Đã Cắt Thô (Chờ Hậu Kỳ)'}
                </span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="showToast('Đang phát clip thô trong Project', 'info')">
              Xem Clip
            </button>
          </div>
        `).join('');

        openModal('modal-raw-vault');
      });
    }

    // 16. TIẾN TRÌNH HẬU KỲ & TẠO DỰ ÁN (BỎ BƯỚC 5 -> CHUYỂN NGAY VỀ PROJECTS HUB VỚI CARD LOADING %)
    if (DOM.btnStartPostprodRender) {
      DOM.btnStartPostprodRender.addEventListener('click', () => {
        const projects = window.PROTOTYPE_PROJECTS || [];
        const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        const clips = liveSession?.goldenMoments || [];
        const toRenderIndices = state.selectedLsClipIndices.size > 0 
          ? Array.from(state.selectedLsClipIndices) 
          : [state.activeLsClipIndex];

        if (toRenderIndices.length === 0) {
          showToast('Vui lòng chọn ít nhất 1 clip để render hậu kỳ!', 'warning');
          return;
        }

        // Tạo dự án mới ngay lập tức trong Projects Hub
        const newProjId = 'PRJ_' + Math.random().toString(36).substring(2, 9).toUpperCase();
        const sessionName = DOM.uploadedLsTitle ? DOM.uploadedLsTitle.textContent.replace('Livestream: ', '').trim() : 'P8SZaeu1Ng';
        const projName = sessionName || 'P8SZaeu1Ng';
        const hookText = DOM.lsPostprodHookInput?.value || 'Hook Thịnh Hành Mới';

        const generatedClips = toRenderIndices.map((idx, i) => {
          const c = clips[idx] || {};
          return {
            id: `${newProjId}_CLIP_${i + 1}`,
            title: c.title || `Clip Highlight #${i + 1}`,
            score: 86 - i * 3,
            grade: i === 0 ? 'A+' : 'A',
            potentialLabel: 'High potential',
            duration: c.duration || '45s',
            durationSec: 45,
            hookQuote: hookText,
            timeAgo: 'Vừa xong',
            videoUrl: c.videoSrc || 'media/video/final_final.mp4',
            thumbnail: c.thumb || 'media/image/farmstay_retinol_table.jpg'
          };
        });

        const newProj = {
          id: newProjId,
          name: projName,
          creator: 'LÂM',
          category: 'ai_clipping',
          categoryLabel: 'Instant Highlights',
          tagLabel: 'Highlight',
          folderId: 'all',
          folderName: 'Mặc định',
          status: 'Đang xử lý',
          statusCode: 'processing',
          isProcessing: true,
          progress: 15,
          progressLabel: '15% Rendering',
          currentStep: 4,
          stepLabel: 'Đang hậu kỳ 15%',
          isCompleted: false,
          clipsCount: generatedClips.length,
          timeAgo: 'Vừa xong',
          updatedAt: 'Vừa xong',
          updatedDate: 'Hôm nay',
          thumbnail: null, // Sẽ hiển thị 3D hourglass animation
          clips: generatedClips,
          finalVideos: []
        };

        if (!window.PROTOTYPE_VIDEO_PROJECTS) window.PROTOTYPE_VIDEO_PROJECTS = [];
        window.PROTOTYPE_VIDEO_PROJECTS.unshift(newProj);

        // Chuyển thẳng về Quản Lý Dự Án (Projects Hub) theo đúng yêu cầu
        if (typeof renderProjectsCards === 'function') renderProjectsCards();
        if (window.renderProjectsHub) window.renderProjectsHub();
        switchPanel('panel-projects-hub');

        // Kích hoạt notification pill toast "✔ Đã tạo dự án ✕" chuẩn ảnh mẫu
        if (window.showProjectCreatedPillToast) {
          window.showProjectCreatedPillToast('Đã tạo dự án');
        }

        // Bắt đầu mô phỏng tiến trình Cloud Render tăng % trực tiếp trên card
        let curProg = 15;
        const pInterval = setInterval(() => {
          curProg += Math.floor(Math.random() * 12) + 14; // Tăng từ 14 - 26%
          if (curProg >= 100) {
            curProg = 100;
            clearInterval(pInterval);
            newProj.isProcessing = false;
            newProj.statusCode = 'completed';
            newProj.isCompleted = true;
            newProj.progress = 100;
            newProj.progressLabel = 'Hoàn thành';
            newProj.stepLabel = `${newProj.clipsCount} clips hoàn thiện`;
            newProj.thumbnail = 'media/image/farmstay_retinol_table.jpg';
            if (typeof renderProjectsCards === 'function') renderProjectsCards();
            showToast(`✓ Dự án "${newProj.name}" đã hoàn tất hậu kỳ (${newProj.clipsCount} clips)!`, 'success');
          } else {
            newProj.progress = curProg;
            newProj.progressLabel = `${curProg}% Rendering`;
            newProj.stepLabel = `Đang hậu kỳ ${curProg}%`;
            if (typeof renderProjectsCards === 'function') renderProjectsCards();
          }
        }, 1600);
      });
    }

    // 5. Nạp Video Live Mới
    if (DOM.btnLoadNewLivestream) {
      DOM.btnLoadNewLivestream.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
          const file = e.target.files[0];
          const fileName = file ? file.name : 'livestream_session_recording.mp4';
          showToast(`Đã nạp video: ${fileName}. Vui lòng kiểm tra & chỉnh sửa transcript tại Bước 1 trước khi cắt!`, 'info');
          if (DOM.uploadedLsTitle) DOM.uploadedLsTitle.textContent = `Livestream: ${fileName.replace(/\.[^/.]+$/, "")}`;
          if (DOM.uploadedLsFilename) DOM.uploadedLsFilename.textContent = fileName;
          if (DOM.uploadedLsDuration) DOM.uploadedLsDuration.textContent = '01:45:10';
          state.livestreamCutDone = false;
          initLivestreamTranscript('NEW_UPLOAD', fileName);
          renderLivestreamStage();
        };
        input.click();
      });
    }
  }

  /* ==========================================================================
     MODULE 3: CHỈNH SỬA TỪ VIDEO GỐC (RAW VIDEO EDITOR PIPELINE)
     ========================================================================== */
  function setupRawVideoEditorPipeline() {
    // Populate folders from Media Sản Phẩm (state.productFolders)
    populateRawVideoFolders();

    // Hook select setup
    if (DOM.rawHookSelect && (!DOM.rawHookSelect.options || DOM.rawHookSelect.options.length === 0)) {
      DOM.rawHookSelect.innerHTML = (state.hooks || []).map((h, i) => `
        <option value="${h.id}">${i + 1}. "${h.hookText}" (${h.type})</option>
      `).join('');
    }

    if (DOM.btnRunRawEdit && !DOM.btnRunRawEdit._hasListener) {
      DOM.btnRunRawEdit._hasListener = true;
      DOM.btnRunRawEdit.addEventListener('click', () => {
        if (!DOM.rawVideoFolderSelect || !DOM.rawVideoFolderSelect.value) {
          showToast('Vui lòng chọn Thư mục Sản phẩm trước!', 'warning');
          return;
        }
        const selectedVideoId = DOM.rawVideoSelect ? DOM.rawVideoSelect.value : null;
        if (!selectedVideoId) {
          showToast('Vui lòng chọn 1 video gốc để AI chỉnh sửa!', 'warning');
          return;
        }

        DOM.btnRunRawEdit.disabled = true;
        DOM.btnRunRawEdit.innerHTML = 'AI ĐANG TINH CHỈNH VIDEO...';
        showToast('Bắt đầu xử lý: Làm mịn da model ➔ Chỉnh sáng studio ➔ Lồng nhạc trend TikTok...', 'info');

        setTimeout(() => {
          DOM.btnRunRawEdit.disabled = false;
          DOM.btnRunRawEdit.innerHTML = '<span>BẮT ĐẦU CHỈNH SỬA BẰNG AI</span> <span class="btn-arrow-icon">➔</span>';
          if (DOM.rawResultVideo) {
            DOM.rawResultVideo.src = 'media/video/loi_giong_doc.mp4';
            DOM.rawResultVideo.play().catch(() => {});
          }
          showToast('Đã nâng cấp video gốc thành công! Xem preview bên cạnh.', 'success');
        }, 800);
      });
    }

    if (DOM.btnSaveRawFinished && !DOM.btnSaveRawFinished._hasListener) {
      DOM.btnSaveRawFinished._hasListener = true;
      DOM.btnSaveRawFinished.addEventListener('click', () => {
        state.kits.unshift({
          id: 'KIT_RAW_' + Date.now(),
          title: 'Video Tinh Chỉnh AI - Làm Mịn Da & Lồng Nhạc',
          sku: 'Mỹ Nguyên TSC Chính Ngạch',
          sourceType: 'raw_edit',
          sourceLabel: 'Chỉnh Sửa Từ Video Gốc',
          hook: 'Bí quyết da căng bóng sau ngày dài làm việc!',
          duration: '15s',
          caption: 'Video gốc đã được AI làm mịn da tự nhiên, tăng sáng và lồng nhạc trend TikTok! #mynguyentsc',
          thumb: 'media/image/farmstay_retinol_texture.jpg',
          videoUrl: 'media/video/loi_giong_doc.mp4'
        });
        renderContentKitsStage(state.activeContentFilter);
        showToast('✓ Đã lưu video vào Kho Thành Phẩm!', 'success');
      });
    }
  }

  function populateRawVideoFolders(selectedFolderId) {
    if (!DOM.rawVideoFolderSelect) return;

    const folders = (state.productFolders || []).filter(f => f.id !== 'folder_all');
    const allVideos = (state.driveFiles || []).filter(f => f.type === 'video');

    const currentVal = selectedFolderId !== undefined ? selectedFolderId : (DOM.rawVideoFolderSelect.value || '');

    DOM.rawVideoFolderSelect.innerHTML = `
      <option value="" disabled ${!currentVal ? 'selected' : ''}>-- Chọn Thư mục Sản phẩm --</option>
      ${folders.map(f => {
        const folderVids = allVideos.filter(v => v.folderId === f.id);
        return `<option value="${f.id}" ${currentVal === f.id ? 'selected' : ''}>${f.name} (${folderVids.length} video)</option>`;
      }).join('')}
    `;

    if (!DOM.rawVideoFolderSelect._hasListener) {
      DOM.rawVideoFolderSelect._hasListener = true;
      DOM.rawVideoFolderSelect.addEventListener('change', () => {
        renderRawVideosForFolder(DOM.rawVideoFolderSelect.value);
      });
    }

    renderRawVideosForFolder(currentVal);
  }

  function renderRawVideosForFolder(folderId) {
    if (!DOM.rawVideoSelect) return;

    // Khi chưa chọn thư mục sản phẩm: vô hiệu hoá dropdown và hiển thị chỉ dẫn
    if (!folderId) {
      DOM.rawVideoSelect.disabled = true;
      DOM.rawVideoSelect.innerHTML = '<option value="" disabled selected>-- Vui lòng chọn thư mục sản phẩm trước --</option>';
      if (DOM.rawVideoCountBadge) {
        DOM.rawVideoCountBadge.textContent = 'Chưa chọn thư mục';
      }
      if (DOM.rawVideoCardsGrid) {
        DOM.rawVideoCardsGrid.innerHTML = `
          <div class="raw-video-empty-notice" style="grid-column: 1 / -1; border: 1.5px dashed var(--border-default); background: var(--bg-surface-subtle); padding: 1.5rem 1rem; text-align: center; border-radius: 8px; color: var(--text-muted); font-size: 0.82rem;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--xcorp-blue-50); color: var(--xcorp-blue-600); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.45rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">Chưa chọn thư mục sản phẩm</div>
            <div style="font-size: 0.78rem;">Vui lòng chọn một Thư mục sản phẩm ở trên để duyệt danh sách video gốc.</div>
          </div>
        `;
      }
      if (DOM.rawVideoSelectedPreview) {
        DOM.rawVideoSelectedPreview.innerHTML = '<span style="color: var(--text-dim);">Chưa có video gốc nào được chọn (vui lòng chọn thư mục sản phẩm trước)</span>';
      }
      return;
    }

    const allVideos = (state.driveFiles || []).filter(f => f.type === 'video');
    const filteredVideos = allVideos.filter(f => f.folderId === folderId);

    if (DOM.rawVideoCountBadge) {
      DOM.rawVideoCountBadge.textContent = `${filteredVideos.length} video gốc`;
    }

    if (filteredVideos.length === 0) {
      DOM.rawVideoSelect.disabled = true;
      DOM.rawVideoSelect.innerHTML = '<option value="" disabled selected>Thư mục này chưa có tệp video gốc nào</option>';
      if (DOM.rawVideoCardsGrid) {
        DOM.rawVideoCardsGrid.innerHTML = `
          <div class="raw-video-empty-notice" style="grid-column: 1 / -1; border: 1.5px dashed var(--border-default); background: var(--bg-surface-subtle); padding: 1.5rem 1rem; text-align: center; border-radius: 8px; color: var(--text-muted); font-size: 0.8rem;">
            [Lưu ý] Thư mục này hiện tại chỉ chứa tệp ảnh, chưa có tệp video gốc nào.<br>
            Vui lòng chọn thư mục khác hoặc tải video lên trong mục <strong>Media sản phẩm</strong>.
          </div>
        `;
      }
      if (DOM.rawVideoSelectedPreview) {
        DOM.rawVideoSelectedPreview.innerHTML = '<span style="color: var(--text-dim);">Thư mục không có video gốc nào</span>';
      }
      return;
    }

    // Đã chọn thư mục có video: kích hoạt dropdown
    DOM.rawVideoSelect.disabled = false;
    DOM.rawVideoSelect.innerHTML = `
      <option value="" disabled selected>-- Chọn video gốc (${filteredVideos.length} video) --</option>
      ${filteredVideos.map((v, i) => `
        <option value="${v.id}" data-src="${v.videoSrc || 'media/video/final_final.mp4'}">
          ${i + 1}. ${v.name} (${v.size || '3 MB'}${v.duration ? ' • ' + v.duration : ''})
        </option>
      `).join('')}
    `;

    // Render Cards Grid (ban đầu chưa chọn video cụ thể)
    renderRawVideoCardsGrid(filteredVideos, null);

    if (DOM.rawVideoSelectedPreview) {
      DOM.rawVideoSelectedPreview.innerHTML = '<span style="color: var(--text-dim);">Vui lòng chọn 1 video từ danh sách trên hoặc nhấp vào thẻ video</span>';
    }

    if (!DOM.rawVideoSelect._hasListener) {
      DOM.rawVideoSelect._hasListener = true;
      DOM.rawVideoSelect.addEventListener('change', () => {
        const vidId = DOM.rawVideoSelect.value;
        const currentFolderId = DOM.rawVideoFolderSelect ? DOM.rawVideoFolderSelect.value : '';
        const currentFiltered = (state.driveFiles || []).filter(f => f.type === 'video' && f.folderId === currentFolderId);
        const vid = currentFiltered.find(v => v.id === vidId);
        if (vid) {
          updateRawVideoSelection(vid);
          renderRawVideoCardsGrid(currentFiltered, vid.id);
        }
      });
    }
  }

  function renderRawVideoCardsGrid(videos, activeVideoId) {
    if (!DOM.rawVideoCardsGrid) return;

    DOM.rawVideoCardsGrid.innerHTML = videos.map(v => {
      const isSelected = v.id === activeVideoId;
      const folder = (state.productFolders || []).find(f => f.id === v.folderId);
      const folderShort = folder ? (folder.name.length > 20 ? folder.name.substring(0, 18) + '...' : folder.name) : '';

      return `
        <div class="raw-video-card-item ${isSelected ? 'selected' : ''}" data-video-id="${v.id}">
          <div class="raw-video-card-thumb-wrap">
            <img src="${v.thumb || 'media/image/farmstay_retinol_water.jpg'}" alt="${v.name}" class="raw-video-card-thumb" loading="lazy">
            <div class="raw-video-card-play-icon">
              <span>[XEM]</span>
            </div>
            <span class="raw-video-card-badge">RAW VIDEO</span>
            ${v.duration ? `<span class="raw-video-card-duration">${v.duration}</span>` : ''}
            ${isSelected ? `
              <span class="raw-video-card-selected-tag">
                ✓ Đang chọn
              </span>
            ` : ''}
          </div>
          <div class="raw-video-card-body">
            <div class="raw-video-card-title" title="${v.name}">${v.name}</div>
            <div class="raw-video-card-meta">
              <span class="raw-video-card-folder-tag" title="${folder ? folder.name : ''}">[${folderShort || 'Media'}]</span>
              <span>${v.size || '15 MB'}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events on video cards
    DOM.rawVideoCardsGrid.querySelectorAll('.raw-video-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const vidId = card.getAttribute('data-video-id');
        const vid = videos.find(v => v.id === vidId);
        if (vid) {
          if (DOM.rawVideoSelect) DOM.rawVideoSelect.value = vid.id;
          updateRawVideoSelection(vid);
          renderRawVideoCardsGrid(videos, vid.id);
        }
      });
    });
  }

  function updateRawVideoSelection(video) {
    if (!video) return;

    const folder = (state.productFolders || []).find(f => f.id === video.folderId);
    const folderName = folder ? folder.name : 'Media Sản Phẩm';

    if (DOM.rawVideoSelectedPreview) {
      DOM.rawVideoSelectedPreview.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span>✓ Tệp đang chọn: <strong>${video.name}</strong> (${video.size || ''}${video.duration ? ' • ' + video.duration : ''})</span>
          <span style="font-size: 0.7rem; color: var(--text-muted); background: var(--bg-card); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-subtle);">📁 ${folderName}</span>
        </div>
      `;
    }

    // Update preview video player on the right
    if (DOM.rawResultVideo && video.videoSrc) {
      DOM.rawResultVideo.src = video.videoSrc;
      if (video.thumb) DOM.rawResultVideo.poster = video.thumb;
    }
  }

  /* ==========================================================================
     KHO VIDEO ĐÃ HOÀN THIỆN (PHÂN LOẠI & PREVIEW TRỰC TIẾP)
     ========================================================================== */
  function renderContentKitsStage(filter = 'all') {
    if (!DOM.cstageKitsGrid) return;
    let kits = state.kits || [];

    if (filter && filter !== 'all') {
      kits = kits.filter(k => k.sourceType === filter);
    }

    if (kits.length === 0) {
      DOM.cstageKitsGrid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 2.5rem; text-align: center; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 8px;">
          Chưa có video nào thuộc danh mục này. Hãy tạo video mới bằng một trong các chế độ AI.
        </div>
      `;
      return;
    }

    DOM.cstageKitsGrid.innerHTML = kits.map((kit) => `
      <div class="content-kit-card" id="kit-card-${kit.id}">
        <div class="kit-card-thumb-wrap">
          <img src="${kit.thumb}" alt="${kit.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="kit-source-badge">
            ${kit.sourceLabel || 'Video TikTok'}
          </span>
          <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-family: var(--font-mono);">
            ${kit.duration || '24s'}
          </span>
        </div>

        <div class="kit-card-body">
          <div class="kit-product-label">
            Sản phẩm: <strong class="kit-product-name">${kit.sku || 'Mỹ Nguyên TSC'}</strong>
          </div>
          <div class="kit-hook-quote">
            "${kit.hook || kit.title}"
          </div>

          <div class="kit-card-actions">
            <button class="btn btn-primary btn-sm btn-preview-kit" data-id="${kit.id}" style="flex: 1.2;">
              ${ICONS.play} Xem Preview
            </button>
            <button class="btn btn-secondary btn-sm btn-download-kit" data-id="${kit.id}">
              ${ICONS.download} Tải MP4
            </button>
            <button class="btn btn-secondary btn-sm btn-copy-caption-kit" data-id="${kit.id}">
              ${ICONS.copy} Copy
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Event Handlers
    DOM.cstageKitsGrid.querySelectorAll('.btn-preview-kit').forEach(btn => {
      btn.addEventListener('click', () => {
        const kitId = btn.getAttribute('data-id');
        const kit = state.kits.find(k => k.id === kitId);
        if (kit) {
          openVideoPreviewModal({
            title: kit.title,
            videoSrc: kit.videoUrl || 'media/video/final_final.mp4',
            caption: kit.caption
          });
        }
      });
    });

    DOM.cstageKitsGrid.querySelectorAll('.btn-download-kit').forEach(btn => {
      btn.addEventListener('click', () => {
        const kitId = btn.getAttribute('data-id');
        const kit = state.kits.find(k => k.id === kitId);
        if (kit) {
          showToast(`Đang tải file video ${kit.title} (1080x1920 MP4)...`, 'success');
        }
      });
    });

    DOM.cstageKitsGrid.querySelectorAll('.btn-copy-caption-kit').forEach(btn => {
      btn.addEventListener('click', () => {
        const kitId = btn.getAttribute('data-id');
        const kit = state.kits.find(k => k.id === kitId);
        if (kit && kit.caption) {
          navigator.clipboard?.writeText(kit.caption).catch(() => {});
          showToast('Đã copy caption TikTok vào clipboard!', 'success');
        }
      });
    });
  }

  function setupContentKitFilters() {
    DOM.contentFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.contentFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeContentFilter = btn.getAttribute('data-filter');
        renderContentKitsStage(state.activeContentFilter);
      });
    });
  }

  /* ==========================================================================
     KHO NHẠC NỀN BGM (TODO 19 ITEM 15)
     ========================================================================== */
  function renderBgmVault(categoryFilter = 'all') {
    if (!DOM.bgmTableTbody) return;
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const tracks = (curProject && curProject.bgmLibrary) || window.PROTOTYPE_PROJECTS[0]?.bgmLibrary || [];

    let filtered = tracks;
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = tracks.filter(t => t.category === categoryFilter);
    }

    if (filtered.length === 0) {
      DOM.bgmTableTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            Chưa có bản nhạc nào trong thể loại này. Hãy tải lên bản nhạc mới!
          </td>
        </tr>
      `;
      return;
    }

    DOM.bgmTableTbody.innerHTML = filtered.map(t => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: var(--xcorp-blue-50); color: var(--xcorp-blue-600); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
            <div>
              <strong style="color: var(--text-main); font-size: 0.86rem; display: block;">${t.title}</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">${t.id}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="badge-tag" style="background: var(--bg-surface-subtle); color: var(--text-body); border: 1px solid var(--border-default); font-size: 0.73rem; font-weight: 600;">
            ${t.category}
          </span>
        </td>
        <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-body); font-weight: 600;">${t.duration}</td>
        <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${t.bpm}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 0.35rem; justify-content: center;">
            <button class="btn btn-outline btn-sm btn-play-bgm" data-id="${t.id}" title="Nghe thử bản nhạc" style="padding: 4px 10px; font-size: 0.75rem;">
              Nghe Thử
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Attach Handlers
    DOM.bgmTableTbody.querySelectorAll('.btn-play-bgm').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const track = tracks.find(x => x.id === id);
        if (track) {
          showToast(`🎵 Đang phát thử nhạc nền: "${track.title}" (${track.duration} • ${track.bpm})`, 'info');
        }
      });
    });
  }

  function setupBgmHandlers() {
    if (DOM.bgmFilterBar) {
      DOM.bgmFilterBar.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.bgmFilterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.getAttribute('data-bgm-cat') || 'all';
          renderBgmVault(cat);
        });
      });
    }

    if (DOM.btnUploadBgm) {
      DOM.btnUploadBgm.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';
        fileInput.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const projects = window.PROTOTYPE_PROJECTS || [];
            const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
            const tracks = (curProject && curProject.bgmLibrary) || [];
            const newTrack = {
              id: 'BGM_' + (tracks.length + 1).toString().padStart(2, '0'),
              title: file.name.replace(/\.[^/.]+$/, ""),
              category: "Trending TikTok",
              duration: "00:45",
              bpm: "115 BPM",
              usedCount: "1 video",
              safetyBadge: "100% An Toàn Bản Quyền",
              audioSrc: "media/video/final_final.mp4"
            };
            tracks.unshift(newTrack);
            renderBgmVault('all');
            showToast(`✓ Đã nạp thành công bản nhạc "${newTrack.title}" vào kho BGM!`, 'success');
          }
        };
        fileInput.click();
      });
    }
  }

  /* ==========================================================================
     KHO LIVESTREAM NGUỒN (LƯU TRỮ VIDEO LIVE THÔ 1-3H & DỮ LIỆU ASR)
     ========================================================================== */
  function renderLivestreamsVault() {
    if (!DOM.livestreamsVaultGrid) return;
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const sessions = curProject?.livestreamsVault || state.livestreamsVault || data.livestreamsVault || [];

    const search = (state.lsVaultSearch || '').toLowerCase().trim();
    const fFormat = state.lsVaultFilterFormat || 'all';
    const fAsr = state.lsVaultFilterAsr || 'all';

    let filtered = sessions.filter(s => {
      if (fFormat !== 'all' && (s.format || '').toLowerCase() !== fFormat.toLowerCase()) return false;
      if (fAsr !== 'all' && s.asrStatus !== fAsr) return false;
      if (search) {
        const inTitle = (s.title || '').toLowerCase().includes(search);
        const inStreamer = (s.streamer || '').toLowerCase().includes(search);
        const inSummary = (s.summary || '').toLowerCase().includes(search);
        const inAsr = (s.asrTranscript || []).some(t => (t.text || '').toLowerCase().includes(search));
        if (!inTitle && !inStreamer && !inSummary && !inAsr) return false;
      }
      return true;
    });

    // Update stats counters
    const statCount = document.getElementById('stat-ls-source-count');
    const statWords = document.getElementById('stat-ls-asr-words');
    const statClips = document.getElementById('stat-ls-raw-clips');
    if (statCount) statCount.textContent = `${sessions.length} Buổi Live`;
    if (statWords) {
      const totalWords = sessions.reduce((acc, cur) => acc + (cur.asrWordCount || 0), 0);
      statWords.textContent = `${totalWords.toLocaleString()} từ`;
    }
    if (statClips) {
      const totalClips = sessions.reduce((acc, cur) => acc + (cur.rawClipCount || 0), 0);
      statClips.textContent = `${totalClips || 26} Clip Đắt Giá`;
    }

    if (filtered.length === 0) {
      DOM.livestreamsVaultGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted); background: var(--bg-surface); border: 1px dashed var(--border-default); border-radius: 8px;">
          Không tìm thấy video livestream nguồn nào phù hợp với bộ lọc hiện tại.
        </div>
      `;
      return;
    }

    DOM.livestreamsVaultGrid.innerHTML = filtered.map(s => {
      const asrCount = (s.asrWordCount || 0).toLocaleString();
      const firstLines = (s.asrTranscript || []).slice(0, 2).map(t => `"${t.text}"`).join(' ');

      return `
        <div class="ls-source-card" data-session-id="${s.id}">
          <div class="ls-card-media-banner">
            <img src="${s.thumb || 'media/image/farmstay_retinol_box.jpg'}" alt="${escapeHtml(s.title)}" />
            <div class="ls-format-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              <span>${s.format ? s.format.toUpperCase() : '.MP4'}</span>
            </div>
            <div class="ls-dur-badge">${s.duration || '02:00:00'}</div>
          </div>
          <div class="ls-card-body">
            <div class="ls-card-title">${escapeHtml(s.title)}</div>
            <div class="ls-card-meta-row">
              <span class="ls-card-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${s.date} • ${s.time || '19:30'}
              </span>
              <span class="ls-card-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ${escapeHtml(s.streamer || 'Host')}
              </span>
              <span class="ls-card-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                ${s.fileSize || '2.5 GB'} • ${s.resolution || '1080p'}
              </span>
            </div>
            <div class="ls-card-summary">${escapeHtml(s.summary || '')}</div>
            
            <!-- ASR Transcription Box -->
            <div class="ls-asr-box">
              <div class="ls-asr-header">
                <div class="ls-asr-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Bóc băng ASR 100% (${asrCount} từ)</span>
                </div>
                <span style="font-size: 0.70rem; color: var(--text-muted);">Whisper Large v3</span>
              </div>
              <div class="ls-asr-quote-preview">${escapeHtml(firstLines || 'Đã sẵn sàng trích xuất nội dung...')}</div>
              <button class="btn-view-asr-modal" data-session-id="${s.id}" type="button">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <span>Xem Dữ Liệu ASR Chi Tiết (Timestamp)</span>
              </button>
            </div>

            <!-- Footer Actions -->
            <div class="ls-card-footer">
              <button class="btn btn-primary btn-sm btn-ls-cut-highlight" data-session-id="${s.id}" type="button" style="flex: 1;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/></svg>
                <span>Cắt Highlight Ngay</span>
              </button>
              <button class="btn btn-secondary btn-sm btn-ls-view-raw-clips" data-session-id="${s.id}" type="button">
                <span>Kho Clip Thô (${s.rawClipCount || 8})</span>
              </button>
              <button class="btn btn-secondary btn-sm btn-ls-download-raw" data-session-id="${s.id}" type="button" title="Tải file video gốc (${s.format || '.mp4'})">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events on session card actions
    DOM.livestreamsVaultGrid.querySelectorAll('.btn-view-asr-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sId = btn.getAttribute('data-session-id');
        openAsrTranscriptModal(sId);
      });
    });

    DOM.livestreamsVaultGrid.querySelectorAll('.btn-ls-cut-highlight').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sId = btn.getAttribute('data-session-id');
        const session = sessions.find(s => s.id === sId);
        state.livestreamCutDone = true;
        state.lsSubStep = 'raw_review';
        switchPanel('panel-livestream');
        renderLivestreamStage();
        showToast(`✓ Đã nạp buổi live "${session ? session.title : sId}" vào Studio Cắt Highlight`, 'success');
      });
    });

    DOM.livestreamsVaultGrid.querySelectorAll('.btn-ls-view-raw-clips').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sId = btn.getAttribute('data-session-id');
        state.rawVaultFilterLive = sId;
        if (DOM.rawFilterLive) DOM.rawFilterLive.value = sId;
        switchPanel('panel-vault-raw-clips');
        renderRawClipsVault();
      });
    });

    DOM.livestreamsVaultGrid.querySelectorAll('.btn-ls-download-raw').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sId = btn.getAttribute('data-session-id');
        const session = sessions.find(s => s.id === sId);
        showToast(`📥 Đang tải file gốc ${session?.format || '.mp4'} (${session?.fileSize || '2.85 GB'})...`, 'info');
      });
    });
  }

  function setupLivestreamsVaultHandlers() {
    if (DOM.lsVaultSearchInput) {
      DOM.lsVaultSearchInput.addEventListener('input', (e) => {
        state.lsVaultSearch = e.target.value;
        renderLivestreamsVault();
      });
    }
    if (DOM.lsVaultFilterFormat) {
      DOM.lsVaultFilterFormat.addEventListener('change', (e) => {
        state.lsVaultFilterFormat = e.target.value;
        renderLivestreamsVault();
      });
    }
    if (DOM.lsVaultFilterAsr) {
      DOM.lsVaultFilterAsr.addEventListener('change', (e) => {
        state.lsVaultFilterAsr = e.target.value;
        renderLivestreamsVault();
      });
    }
    if (DOM.btnUploadNewLiveSource) {
      DOM.btnUploadNewLiveSource.addEventListener('click', () => {
        showToast('Nạp file video live thô (1–3h, .mp4, .mov, .mkv) & khởi chạy Whisper Large v3 ASR', 'info');
      });
    }
  }

  function openAsrTranscriptModal(sessionId) {
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const sessions = curProject?.livestreamsVault || state.livestreamsVault || data.livestreamsVault || [];
    const session = sessions.find(s => s.id === sessionId) || sessions[0];
    if (!session) return;

    state.activeAsrSessionId = session.id;
    if (DOM.modalAsrTitle) {
      DOM.modalAsrTitle.textContent = `Bóc Băng ASR: ${session.title}`;
    }
    if (DOM.modalAsrMeta) {
      DOM.modalAsrMeta.textContent = `${session.date} • Host: ${session.streamer} • ${session.duration} • ${session.asrWordCount?.toLocaleString()} từ (Whisper Large v3)`;
    }
    if (DOM.modalAsrSearchInput) {
      DOM.modalAsrSearchInput.value = '';
    }

    renderAsrTranscriptList();
    openModal('modal-asr-transcript');
  }

  function renderAsrTranscriptList() {
    if (!DOM.modalAsrList) return;
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const sessions = curProject?.livestreamsVault || state.livestreamsVault || data.livestreamsVault || [];
    const session = sessions.find(s => s.id === state.activeAsrSessionId) || sessions[0];
    if (!session) return;

    const query = (DOM.modalAsrSearchInput?.value || '').toLowerCase().trim();
    let transcript = session.asrTranscript || [];

    if (query) {
      transcript = transcript.filter(t => (t.text || '').toLowerCase().includes(query));
    }

    if (DOM.modalAsrResultCount) {
      DOM.modalAsrResultCount.textContent = `${transcript.length} đoạn thoại`;
    }

    if (transcript.length === 0) {
      DOM.modalAsrList.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          Không tìm thấy câu thoại nào chứa từ khóa "${escapeHtml(query)}".
        </div>
      `;
      return;
    }

    DOM.modalAsrList.innerHTML = transcript.map(t => {
      let textHtml = escapeHtml(t.text);
      if (query) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        textHtml = textHtml.replace(regex, '<mark style="background: #fef08a; padding: 1px 3px; border-radius: 3px;">$1</mark>');
      }

      return `
        <div class="modal-asr-item">
          <span class="asr-time-tag">${t.time}</span>
          <div class="asr-text-content">${textHtml}</div>
          <button class="btn-asr-cut-segment" data-time="${t.time}" data-text="${escapeHtml(t.text)}" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/></svg>
            <span>Cắt Đoạn Này</span>
          </button>
        </div>
      `;
    }).join('');

    DOM.modalAsrList.querySelectorAll('.btn-asr-cut-segment').forEach(btn => {
      btn.addEventListener('click', () => {
        const time = btn.getAttribute('data-time');
        const text = btn.getAttribute('data-text');
        closeModal('modal-asr-transcript');
        state.livestreamCutDone = true;
        state.lsSubStep = 'raw_review';
        switchPanel('panel-livestream');
        renderLivestreamStage();
        showToast(`✓ Đã nạp mốc ${time} ("${text.slice(0, 30)}...") vào Studio Cắt`, 'success');
      });
    });
  }

  /* ==========================================================================
     KHO CLIP THÔ (THEO 5 CỘT CHUẨN ĐƯỢC YÊU CẦU)
     ========================================================================== */
  function renderRawClipsVault() {
    if (!DOM.rawVaultTableTbody) return;
    const projects = window.PROTOTYPE_PROJECTS || [];
    const curProject = projects.find(p => p.id === state.activeProjectId) || projects[0];
    const rawClips = curProject?.rawClipsVault || state.rawClipsVault || data.rawClipsVault || [];

    const fSearch = (state.rawVaultFilterSearch || '').toLowerCase().trim();
    const fLive = state.rawVaultFilterLive || 'all';
    const fTopic = state.rawVaultFilterTopic || 'all';
    const fStatus = state.rawVaultFilterStatus || 'all';

    let filtered = rawClips.filter(c => {
      if (fLive !== 'all' && c.liveId !== fLive && c.liveTitle !== fLive && c.liveName !== fLive) return false;
      if (fTopic !== 'all' && !(c.topic || c.group || '').includes(fTopic)) return false;
      if (fStatus !== 'all' && !(c.usageStatus || c.status || '').includes(fStatus)) return false;
      if (fSearch) {
        const inQuote = (c.quote || '').toLowerCase().includes(fSearch);
        const inTitle = (c.title || '').toLowerCase().includes(fSearch);
        const inSummary = (c.summary || '').toLowerCase().includes(fSearch);
        const inTopic = (c.topic || '').toLowerCase().includes(fSearch);
        if (!inQuote && !inTitle && !inSummary && !inTopic) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      DOM.rawVaultTableTbody.innerHTML = `
        <tr>
          <td colspan="6" style="padding: 2.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
            Không tìm thấy clip thô nào phù hợp với bộ lọc hiện tại.
          </td>
        </tr>
      `;
      return;
    }

    DOM.rawVaultTableTbody.innerHTML = filtered.map((clip) => {
      // 1. Quote / Câu nói mở đầu
      const quoteText = clip.quote || clip.recommendedHook || clip.title;
      const summaryText = clip.summary || clip.caption || '';
      const thumbSrc = clip.thumb || 'media/image/farmstay_retinol_box.jpg';

      // 2. Chủ đề / Thể loại
      const topicName = clip.topic || clip.group || 'Tâm sự đời thường';
      let topicClass = 'topic-tamsu';
      if (topicName.includes('Deal') || topicName.includes('Báo giá')) topicClass = 'topic-deal';
      else if (topicName.includes('Tư vấn') || topicName.includes('chuyên sâu')) topicClass = 'topic-tuvan';
      else if (topicName.includes('Giải đáp') || topicName.includes('thắc mắc')) topicClass = 'topic-hoidap';
      else if (topicName.includes('Hài hước') || topicName.includes('Tương tác')) topicClass = 'topic-haihuoc';
      else if (topicName.includes('Kinh nghiệm') || topicName.includes('Chia sẻ')) topicClass = 'topic-kinhnghiem';
      else if (topicName.includes('Trải nghiệm') || topicName.includes('Test')) topicClass = 'topic-trainghiem';

      // 3. Nguồn Buổi Live & Ngày Live
      const liveName = clip.liveName || clip.liveTitle || 'Live 15/09 - Mega Sale';
      const liveDate = clip.liveDate || '15/09/2026';
      const contextNote = clip.contextNote || '';

      // 4. Thời lượng
      const durText = clip.duration || '00:30';

      // 5. Trạng thái sử dụng
      const usageStatus = clip.usageStatus || clip.status || 'Chưa duyệt';
      let usageClass = 'usage-fresh';
      let usageLabel = 'Chưa duyệt / Chưa dùng';
      if (usageStatus.includes('Đang dựng') || usageStatus.includes('Đã chọn')) {
        usageClass = 'usage-editing';
        usageLabel = clip.assignedTo && clip.assignedTo !== '—' ? `Đang dựng: ${clip.assignedTo}` : 'Đang dựng';
      } else if (usageStatus.includes('Đã hoàn thiện')) {
        usageClass = 'usage-completed';
        usageLabel = 'Đã hoàn thiện';
      } else if (usageStatus.includes('Đã bỏ')) {
        usageClass = 'usage-dropped';
        usageLabel = 'Đã bỏ';
      }

      return `
        <tr data-clip-id="${clip.id}">
          <!-- Cột 1: Clip / Câu nói mở đầu (Đọc lướt là biết nội dung) -->
          <td>
            <div class="raw-clip-col-first">
              <img src="${thumbSrc}" class="raw-clip-thumb-preview btn-preview-clip" data-clip-id="${clip.id}" alt="Thumbnail 9:16" title="Bấm xem thử clip" />
              <div class="raw-clip-quote-box">
                <div class="raw-clip-quote-text btn-open-cut-session" data-clip-id="${clip.id}" style="cursor: pointer;" title="Bấm để mở đợt cắt">
                  “${escapeHtml(quoteText)}”
                </div>
                ${summaryText ? `<div class="raw-clip-summary-text">${escapeHtml(summaryText)}</div>` : ''}
              </div>
            </div>
          </td>

          <!-- Cột 2: Chủ đề / Thể loại nội dung -->
          <td>
            <span class="raw-topic-badge ${topicClass}">${escapeHtml(topicName)}</span>
          </td>

          <!-- Cột 3: Nguồn Buổi Live & Ngày Live -->
          <td>
            <div class="raw-live-source-box">
              <div class="raw-live-source-name">${escapeHtml(liveName)}</div>
              <div class="raw-live-source-date">${escapeHtml(liveDate)}</div>
              ${contextNote ? `<div class="raw-live-source-note">${escapeHtml(contextNote)}</div>` : ''}
            </div>
          </td>

          <!-- Cột 4: Thời lượng (Duration) -->
          <td>
            <span class="raw-duration-pill">${escapeHtml(durText)}</span>
          </td>

          <!-- Cột 5: Trạng thái sử dụng (Tránh dựng trùng) -->
          <td>
            <span class="raw-usage-status-pill ${usageClass}">${escapeHtml(usageLabel)}</span>
          </td>

          <!-- Cột Thao tác -->
          <td style="text-align: right;">
            <button class="raw-clip-action-link btn-open-cut-session" data-clip-id="${clip.id}" type="button">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/></svg>
              <span>Mở đợt cắt</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach click events on "Mở đợt cắt"
    DOM.rawVaultTableTbody.querySelectorAll('.btn-open-cut-session').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const clipId = btn.getAttribute('data-clip-id');
        const clip = rawClips.find(c => c.id === clipId);
        if (!clip) return;

        // Switch to Livestream module
        state.livestreamCutDone = true;
        state.lsSubStep = 'raw_review';

        const liveSession = curProject?.livestreamSession || data.livestreamSession;
        if (liveSession && liveSession.goldenMoments) {
          let gIdx = liveSession.goldenMoments.findIndex(g => g.id === clip.id || g.title === clip.title || g.title === clip.quote);
          if (gIdx === -1) {
            liveSession.goldenMoments.unshift({
              id: clip.id,
              title: clip.quote || clip.title,
              group: clip.topic || clip.group,
              timestamp: clip.timestamp || '00:14:20 - 00:14:50',
              duration: clip.duration || '30s',
              trimStart: clip.trimStart || '00:14:20',
              trimEnd: clip.trimEnd || '00:14:50',
              trimSec: clip.trimSec || 30,
              summary: clip.summary || clip.title,
              recommendedHook: clip.quote || clip.title,
              videoSrc: clip.videoSrc || 'media/video/final_final.mp4',
              thumb: clip.thumb || 'media/image/farmstay_retinol_box.jpg',
              status: clip.usageStatus || clip.status
            });
            gIdx = 0;
          }
          state.activeLsClipIndex = gIdx;
        }

        switchPanel('panel-livestream');
        renderLivestreamStage();

        if (typeof openFineTrimStudioModal === 'function') {
          openFineTrimStudioModal(state.activeLsClipIndex);
        }
        showToast(`✓ Đang mở đợt cắt cho clip: "${(clip.quote || clip.title).slice(0, 35)}..."`, 'info');
      });
    });

    // Attach click events on thumb preview
    DOM.rawVaultTableTbody.querySelectorAll('.btn-preview-clip').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        const clipId = thumb.getAttribute('data-clip-id');
        const clip = rawClips.find(c => c.id === clipId);
        if (clip) {
          showToast(`👁 Đang xem trước clip: "${(clip.quote || clip.title).slice(0, 30)}..."`, 'info');
        }
      });
    });
  }

  function setupRawClipsVaultHandlers() {
    if (DOM.rawFilterSearch) {
      DOM.rawFilterSearch.addEventListener('input', (e) => {
        state.rawVaultFilterSearch = e.target.value;
        renderRawClipsVault();
      });
    }
    if (DOM.rawFilterLive) {
      DOM.rawFilterLive.addEventListener('change', (e) => {
        state.rawVaultFilterLive = e.target.value;
        renderRawClipsVault();
      });
    }
    if (DOM.rawFilterTopic) {
      DOM.rawFilterTopic.addEventListener('change', (e) => {
        state.rawVaultFilterTopic = e.target.value;
        renderRawClipsVault();
      });
    }
    if (DOM.rawFilterStatus) {
      DOM.rawFilterStatus.addEventListener('change', (e) => {
        state.rawVaultFilterStatus = e.target.value;
        renderRawClipsVault();
      });
    }
    if (DOM.btnRawVaultToLivestream) {
      DOM.btnRawVaultToLivestream.addEventListener('click', () => {
        state.livestreamCutDone = true;
        state.lsSubStep = 'raw_review';
        switchPanel('panel-livestream');
        renderLivestreamStage();
      });
    }
    if (DOM.modalAsrSearchInput) {
      DOM.modalAsrSearchInput.addEventListener('input', () => {
        renderAsrTranscriptList();
      });
    }
  }

  /* ==========================================================================
     KHO KỊCH BẢN VIDEO (SCRIPTS VAULT CRUD)
     ========================================================================== */
  const SCRIPT_GROUPS = [
    { id: 'all', name: 'Tất Cả Kịch Bản', icon: '' },
    { id: 'Nhóm Giáo Dục', name: 'Nhóm Giáo Dục', icon: '' },
    { id: 'Nhóm Giới Thiệu', name: 'Nhóm Giới Thiệu', icon: '' },
    { id: 'Nhóm POV & Trending', name: 'Nhóm POV & Trending', icon: '' },
    { id: 'Nhóm Trải Nghiệm & ASMR', name: 'Nhóm Trải Nghiệm & ASMR', icon: '' },
    { id: 'Tải Lên Từ File', name: 'Tệp Tải Lên', icon: '' }
  ];

  function renderScriptFolderPills() {
    if (!DOM.scriptFolderPills) return;
    const scripts = state.scripts || [];

    DOM.scriptFolderPills.innerHTML = SCRIPT_GROUPS.map(group => {
      const count = group.id === 'all'
        ? scripts.length
        : scripts.filter(s => s.group === group.id).length;

      return `
        <button class="folder-pill ${state.activeScriptFolder === group.id ? 'active' : ''}" data-group-id="${group.id}">
          <span>${group.icon}</span>
          <span>${group.name}</span>
          <span style="font-size: 0.7rem; opacity: 0.75; font-family: var(--font-mono);">(${count})</span>
        </button>
      `;
    }).join('');

    DOM.scriptFolderPills.querySelectorAll('.folder-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.activeScriptFolder = pill.getAttribute('data-group-id');
        renderScriptFolderPills();
        renderScriptsVault();
      });
    });
  }

  /* ==========================================================================
     KHO KỊCH BẢN VIDEO - TABLE & DETAILED SCENE EDITOR (MATCHING ANH 1 & 2)
     ========================================================================== */
  function renderScriptsVault() {
    renderScriptsTable();
    setupScriptTableEvents();
  }

  function updateScriptBatchBar() {
    if (!DOM.scriptBatchBar) return;
    const totalSelected = state.selectedScriptIds.size;
    if (totalSelected === 0) {
      DOM.scriptBatchBar.style.display = 'none';
      return;
    }

    let draftCount = 0;
    let publishedCount = 0;

    (state.scripts || []).forEach(s => {
      if (state.selectedScriptIds.has(s.id)) {
        const isReady = s.status === 'Sẵn sàng' || s.statusCode === 'ready';
        if (isReady) {
          publishedCount++;
        } else {
          draftCount++;
        }
      }
    });

    DOM.scriptBatchBar.style.display = 'flex';
    if (DOM.scriptBatchCount) {
      DOM.scriptBatchCount.textContent = totalSelected;
    }

    // Nút "Xuất bản" chỉ hiện khi có bản nháp được chọn (Todo15 Item 1)
    if (DOM.btnBatchPublishScript) {
      if (draftCount > 0) {
        DOM.btnBatchPublishScript.style.display = 'inline-flex';
        DOM.btnBatchPublishScript.textContent = `Xuất bản (${draftCount})`;
      } else {
        DOM.btnBatchPublishScript.style.display = 'none';
      }
    }

    // Nút "Về nháp" chỉ hiện khi có kịch bản đã xuất bản được chọn (Todo15 Item 1)
    if (DOM.btnBatchDraftScript) {
      if (publishedCount > 0) {
        DOM.btnBatchDraftScript.style.display = 'inline-flex';
        DOM.btnBatchDraftScript.textContent = `Về nháp (${publishedCount})`;
      } else {
        DOM.btnBatchDraftScript.style.display = 'none';
      }
    }
  }

  function renderScriptsTable() {
    if (!DOM.scriptTableTbody) return;

    let scripts = state.scripts || [];
    const tab = state.activeScriptTab || 'all';
    const kw = (state.activeScriptSearch || '').toLowerCase().trim();
    const skuFilter = state.activeScriptSku || 'all';

    // 1. Filter by Tab
    if (tab !== 'all') {
      scripts = scripts.filter(s => {
        if (tab === 'Giáo Dục') return (s.group || '').includes('Giáo Dục');
        if (tab === 'Giới Thiệu') return (s.group || '').includes('Giới Thiệu');
        if (tab === 'POV & Trend') return (s.group || '').includes('POV') || (s.group || '').includes('Trend');
        if (tab === 'Trải Nghiệm & ASMR') return (s.group || '').includes('ASMR') || (s.group || '').includes('Trải Nghiệm');
        return true;
      });
    }

    // 2. Filter by Search Keyword
    if (kw) {
      scripts = scripts.filter(s => 
        (s.title || '').toLowerCase().includes(kw) ||
        (s.sku || '').toLowerCase().includes(kw) ||
        (s.hook || '').toLowerCase().includes(kw) ||
        (s.group || '').toLowerCase().includes(kw)
      );
    }

    // 3. Filter by SKU
    if (skuFilter !== 'all') {
      scripts = scripts.filter(s => (s.sku || '').includes(skuFilter));
    }

    // Update count badge (Todo14)
    if (DOM.scriptCountBadge) {
      DOM.scriptCountBadge.textContent = `(${scripts.length} kịch bản)`;
    }

    if (scripts.length === 0) {
      DOM.scriptTableTbody.innerHTML = `
        <tr>
          <td colspan="8" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            Không tìm thấy kịch bản nào phù hợp với bộ lọc.
          </td>
        </tr>
      `;
      updateScriptBatchBar();
      return;
    }

    DOM.scriptTableTbody.innerHTML = scripts.map((script) => {
      // Group tag class matching Ảnh 1
      let groupClass = 'tag-group-edu';
      if ((script.group || '').includes('ASMR') || (script.group || '').includes('Trải Nghiệm')) groupClass = 'tag-group-asmr';
      else if ((script.group || '').includes('POV') || (script.group || '').includes('Trend')) groupClass = 'tag-group-trend';
      else if ((script.group || '').includes('Giới Thiệu')) groupClass = 'tag-group-intro';

      // Status pill: Strictly 2 statuses (Sẵn sàng & Bản nháp) - Todo14 Item 2
      const isReady = script.status === 'Sẵn sàng' || script.statusCode === 'ready';
      const statusClass = isReady ? 'status-pill-ready' : 'status-pill-draft';
      const statusText = isReady ? 'Sẵn sàng' : 'Bản nháp';
      const isChecked = state.selectedScriptIds.has(script.id);

      return `
        <tr data-script-id="${script.id}" class="${isChecked ? 'row-selected' : ''}">
          <td style="text-align: center;">
            <input type="checkbox" class="form-checkbox script-row-checkbox" value="${script.id}" ${isChecked ? 'checked' : ''}>
          </td>
          <td>
            <div class="script-row-title-bold">${script.title}</div>
          </td>
          <td>
            <span class="${groupClass}">${script.group || 'Giáo Dục'}</span>
          </td>
          <td>
            <span style="font-weight: 600; color: var(--text-main); font-size: 0.86rem;">${script.sku || 'Farmstay SKU'}</span>
          </td>
          <td>
            <span style="font-size: 0.88rem; font-weight: 500; color: var(--text-main);">${script.scenesCount || (script.scenes || []).length || 4} Cảnh</span>
          </td>
          <td>
            <span style="font-size: 0.88rem; font-weight: 500; color: var(--text-main); font-family: var(--font-mono);">${script.duration || '45s'}</span>
          </td>
          <td>
            <span class="${statusClass}">${statusText}</span>
          </td>
          <td style="text-align: center;">
            <button class="btn-table-create-video btn-script-make-video" data-id="${script.id}">Tạo Video</button>
          </td>
        </tr>
      `;
    }).join('');

    // Check all box status
    if (DOM.scriptCheckAllBox) {
      const allSelected = scripts.length > 0 && scripts.every(s => state.selectedScriptIds.has(s.id));
      DOM.scriptCheckAllBox.checked = allSelected;
    }

    updateScriptBatchBar();

    // Attach row events
    DOM.scriptTableTbody.querySelectorAll('tr[data-script-id]').forEach(row => {
      const scriptId = row.getAttribute('data-script-id');

      // Clicking row opens Detailed Scene Editor (Item 2)
      row.addEventListener('click', (e) => {
        if (e.target.closest('.script-row-checkbox') || e.target.closest('.btn-script-make-video')) return;
        openScriptDetailedEditor(scriptId);
      });

      // Checkbox toggle
      const cb = row.querySelector('.script-row-checkbox');
      if (cb) {
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          if (cb.checked) {
            state.selectedScriptIds.add(scriptId);
          } else {
            state.selectedScriptIds.delete(scriptId);
          }
          if (DOM.scriptCheckAllBox) {
            DOM.scriptCheckAllBox.checked = scripts.every(s => state.selectedScriptIds.has(s.id));
          }
          updateScriptBatchBar();
        });
      }

      // Action button "Tạo Video"
      const makeVidBtn = row.querySelector('.btn-script-make-video');
      if (makeVidBtn) {
        makeVidBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          useScriptToGenerateVideo(scriptId);
        });
      }
    });
  }

  function setupScriptTableEvents() {
    // 1. Tab switching
    if (DOM.scriptCategoryTabsBar) {
      DOM.scriptCategoryTabsBar.querySelectorAll('.script-cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.scriptCategoryTabsBar.querySelectorAll('.script-cat-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          state.activeScriptTab = tab.getAttribute('data-tab');
          renderScriptsTable();
        });
      });
    }

    // 2. Search input
    if (DOM.scriptTableSearchInput) {
      DOM.scriptTableSearchInput.addEventListener('input', (e) => {
        state.activeScriptSearch = e.target.value;
        renderScriptsTable();
      });
    }

    // 3. SKU Select Filter
    if (DOM.scriptTableSkuSelect) {
      DOM.scriptTableSkuSelect.addEventListener('change', (e) => {
        state.activeScriptSku = e.target.value;
        renderScriptsTable();
      });
    }

    // 4. Check all box
    if (DOM.scriptCheckAllBox) {
      DOM.scriptCheckAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        if (DOM.scriptTableTbody) {
          DOM.scriptTableTbody.querySelectorAll('.script-row-checkbox').forEach(cb => {
            cb.checked = isChecked;
            if (isChecked) state.selectedScriptIds.add(cb.value);
            else state.selectedScriptIds.delete(cb.value);
          });
        }
        updateScriptBatchBar();
      });
    }

    // 4.1 Script Batch Actions (Todo14 & Todo15 Item 1)
    if (DOM.btnBatchPublishScript) {
      DOM.btnBatchPublishScript.addEventListener('click', () => {
        let count = 0;
        state.scripts.forEach(s => {
          if (state.selectedScriptIds.has(s.id)) {
            const isReady = s.status === 'Sẵn sàng' || s.statusCode === 'ready';
            if (!isReady) {
              s.status = 'Sẵn sàng';
              s.statusCode = 'ready';
              count++;
            }
          }
        });
        renderScriptsTable();
        showToast(`Đã xuất bản thành công ${count} kịch bản sang trạng thái "Sẵn sàng"!`, 'success');
      });
    }

    if (DOM.btnBatchDraftScript) {
      DOM.btnBatchDraftScript.addEventListener('click', () => {
        let count = 0;
        state.scripts.forEach(s => {
          if (state.selectedScriptIds.has(s.id)) {
            const isReady = s.status === 'Sẵn sàng' || s.statusCode === 'ready';
            if (isReady) {
              s.status = 'Bản nháp';
              s.statusCode = 'draft';
              count++;
            }
          }
        });
        renderScriptsTable();
        showToast(`Đã chuyển ${count} kịch bản về trạng thái "Bản nháp"!`, 'info');
      });
    }

    if (DOM.btnBatchDeleteScript) {
      DOM.btnBatchDeleteScript.addEventListener('click', () => {
        const count = state.selectedScriptIds.size;
        if (count === 0) return;
        if (confirm(`Bạn có chắc chắn muốn xóa ${count} kịch bản đã chọn khỏi kho?`)) {
          state.scripts = state.scripts.filter(s => !state.selectedScriptIds.has(s.id));
          state.selectedScriptIds.clear();
          renderScriptsTable();
          showToast(`Đã xóa ${count} kịch bản khỏi kho!`, 'info');
        }
      });
    }

    if (DOM.btnBatchDeselectScript) {
      DOM.btnBatchDeselectScript.addEventListener('click', () => {
        state.selectedScriptIds.clear();
        renderScriptsTable();
      });
    }

    // 5. Action buttons on header
    if (DOM.btnScriptImportFile) {
      DOM.btnScriptImportFile.addEventListener('click', () => {
        if (DOM.modalUploadScript) DOM.modalUploadScript.style.display = 'flex';
      });
    }

    if (DOM.btnScriptWriteManual) {
      DOM.btnScriptWriteManual.addEventListener('click', () => {
        if (DOM.modalScriptEditor) {
          DOM.modalScriptEditor.style.display = 'flex';
          if (DOM.scriptModalTitle) DOM.scriptModalTitle.textContent = 'Viết Kịch Bản Video Mới';
          if (DOM.scriptEditId) DOM.scriptEditId.value = '';
          if (DOM.scriptTitleInput) DOM.scriptTitleInput.value = '';
          if (DOM.scriptHookInput) DOM.scriptHookInput.value = '';
          if (DOM.scriptBodyInput) DOM.scriptBodyInput.value = '';
        }
      });
    }

    if (DOM.btnScriptAiGenerate) {
      DOM.btnScriptAiGenerate.addEventListener('click', () => {
        showToast('AI đang phân tích sản phẩm và xu hướng TikTok để tạo 3 kịch bản mới...', 'info');
        setTimeout(() => {
          showToast('AI đã tạo thành công 1 kịch bản viral mới! Đã thêm vào danh sách.', 'success');
        }, 1200);
      });
    }

    // 6. Detail Editor Back Button
    if (DOM.btnBackToScriptList) {
      DOM.btnBackToScriptList.addEventListener('click', () => {
        if (DOM.scriptDetailEditorView) DOM.scriptDetailEditorView.style.display = 'none';
        if (DOM.scriptListMainView) DOM.scriptListMainView.style.display = 'block';
        const topbarSuiteEl = document.getElementById('topbar-current-suite');
        if (topbarSuiteEl) topbarSuiteEl.textContent = 'KHO TÀI NGUYÊN';
        const topbarModuleEl = document.getElementById('topbar-current-module');
        if (topbarModuleEl) topbarModuleEl.textContent = 'KHO KỊCH BẢN';
      });
    }

    // 7. Save Script in Detail Editor (Draft vs Publish - Todo14 Item 2)
    if (DOM.btnEditorSaveScript) {
      DOM.btnEditorSaveScript.addEventListener('click', () => {
        const script = state.scripts.find(s => s.id === state.activeEditingScriptId);
        if (script) {
          showToast('Đã lưu kịch bản (Bản nháp) thành công!', 'success');
        }
      });
    }

    if (DOM.btnEditorPublishScript) {
      DOM.btnEditorPublishScript.addEventListener('click', () => {
        const script = state.scripts.find(s => s.id === state.activeEditingScriptId);
        if (script) {
          script.status = 'Sẵn sàng';
          script.statusCode = 'ready';
          if (DOM.editorScriptStatus) {
            DOM.editorScriptStatus.textContent = 'Sẵn sàng';
          }
          renderScriptsTable();
          showToast('Đã xuất bản kịch bản thành công! Trạng thái hiện tại: Sẵn sàng', 'success');
        }
      });
    }

    // 8. Create Video from Detail Editor
    if (DOM.btnEditorCreateVideo) {
      DOM.btnEditorCreateVideo.addEventListener('click', () => {
        useScriptToGenerateVideo(state.activeEditingScriptId);
      });
    }

    // 9. Add scene button
    if (DOM.btnEditorAddScene) {
      DOM.btnEditorAddScene.addEventListener('click', () => {
        addNewSceneToEditor();
      });
    }
  }

  function openScriptDetailedEditor(scriptId) {
    const script = (state.scripts || []).find(s => s.id === scriptId) || state.scripts[0];
    if (!script) return;

    state.activeEditingScriptId = script.id;

    if (DOM.scriptListMainView) DOM.scriptListMainView.style.display = 'none';
    if (DOM.scriptDetailEditorView) DOM.scriptDetailEditorView.style.display = 'block';

    const topbarSuiteEl = document.getElementById('topbar-current-suite');
    if (topbarSuiteEl) topbarSuiteEl.textContent = 'KHO TÀI NGUYÊN';
    const topbarModuleEl = document.getElementById('topbar-current-module');
    if (topbarModuleEl) topbarModuleEl.textContent = 'CHI TIẾT KỊCH BẢN';

    if (DOM.editorScriptTitle) DOM.editorScriptTitle.textContent = script.title;
    if (DOM.editorScriptSku) DOM.editorScriptSku.textContent = script.sku || 'Farmstay SKU';
    if (DOM.editorScriptDuration) DOM.editorScriptDuration.textContent = script.duration || '45s';
    if (DOM.editorScriptStatus) {
      const isReady = script.status === 'Sẵn sàng' || script.statusCode === 'ready';
      DOM.editorScriptStatus.textContent = isReady ? 'Sẵn sàng' : 'Bản nháp';
    }

    // Render Scenes
    renderDetailedScenes(script);
  }

  function renderDetailedScenes(script) {
    if (!DOM.editorScenesContainer) return;

    let scenes = script.scenes || [];
    if (scenes.length === 0) {
      scenes = [
        {
          sceneNum: 1,
          title: "Cảnh Mở Đầu (The Hook)",
          timeRange: "0 – 3s",
          duration: "3 giây",
          visual: "Cận cảnh khuôn mặt nữ hoảng hốt nhìn nốt mụn sưng đỏ trước gương, camera zoom nhanh 1.2x.",
          voice: script.hook || "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!",
          effects: 'Text to: "CÀNG TRỊ CÀNG MỤN?". Âm thanh: Tiếng cảnh báo giật mình.'
        },
        {
          sceneNum: 2,
          title: "Phân Tích Cơ Chế Khoa Học",
          timeRange: "3 – 15s",
          duration: "12 giây",
          visual: "Mô hình 3D biểu bì da bị mất nước và vi khuẩn xâm nhập khi hàng rào lipid bị bào mòn.",
          voice: "Khi hàng rào lipid tự nhiên bị phá vỡ do dùng chất tẩy mạnh, vi khuẩn xâm nhập gây viêm dai dẳng.",
          effects: 'Đồ họa 3D zoom xuyên lớp biểu bì. Text nhấp nháy: "MÀNG LIPID TỔN THƯƠNG".'
        },
        {
          sceneNum: 3,
          title: "Giải Pháp & Trải Nghiệm Thực Tế",
          timeRange: "15 – 35s",
          duration: "20 giây",
          visual: "Model lấy một lượng toner Farmstay vỗ nhẹ lên da, giọt dưỡng chất ngậm nước thẩm thấu tức thì.",
          voice: "Chỉ cần cấp ẩm cân bằng dịu nhẹ với chiết xuất rau má Cica hữu cơ, da sẽ tự làm dịu và phục hồi sau 20 phút.",
          effects: 'Hiệu ứng nước bắn 3D điện ảnh. Nhạc nền nhẹ nhàng thư thái.'
        },
        {
          sceneNum: 4,
          title: "Kêu Gọi Mua Hàng (CTA)",
          timeRange: "35 – 45s",
          duration: "10 giây",
          visual: "Cận cảnh chai sản phẩm có tem phụ tiếng Việt Mỹ Nguyên TSC, trỏ tay xuống góc dưới màn hình.",
          voice: "Bấm ngay vào giỏ hàng góc trái để nhận ưu đãi độc quyền trợ giá 40% chỉ có trên phiên livestream này!",
          effects: 'Hiệu ứng mũi tên nhấp nháy trỏ vào giỏ hàng TikTok Shop.'
        }
      ];
    }

    const hookVariants = script.hookVariants || [
      { id: "hook_a", name: "Hook A (Nỗi sợ)", text: script.hook || "Dừng lại ngay nếu da bạn càng trị mụn lại càng bùng phát chi chít!" },
      { id: "hook_b", name: "Hook B (Tò mò)", text: "Có bao giờ bạn thắc mắc tại sao thoa đủ loại kem mà mụn vẫn thi nhau biểu tình?" },
      { id: "hook_c", name: "Hook C (Trực diện)", text: "Cảnh báo: 90% chị em đang trị mụn sai cách khiến hàng rào bảo vệ da sụp đổ!" }
    ];

    DOM.editorScenesContainer.innerHTML = scenes.map((scene, sIdx) => {
      const isHookScene = sIdx === 0;

      return `
        <div class="scene-editor-card" data-scene-index="${sIdx}">
          <div class="scene-card-header">
            <div class="scene-badge-title">
              <span class="scene-pill-badge">SCENE 0${scene.sceneNum || (sIdx + 1)}</span>
              <span class="scene-name-title">${scene.title || 'Phân Cảnh Kịch Bản'}</span>
              <span class="scene-timerange-tag">${scene.timeRange || '0 – 3s'}</span>
            </div>
            <div class="scene-duration-label">Thời lượng: ${scene.duration || '3 giây'}</div>
          </div>

          ${isHookScene ? `
            <div class="scene-hook-variants-row">
              <span class="variants-label">Biến thể Hook mở đầu:</span>
              <div class="variants-pills" id="scene-hook-variants-pills">
                ${hookVariants.map((v, vIdx) => `
                  <button class="variant-pill-btn ${vIdx === 0 ? 'active' : ''}" data-hook-text="${v.text}">
                    ${v.name}
                  </button>
                `).join('')}
                <button class="variant-pill-btn add-new" id="btn-add-hook-variant">+ Thêm Hook</button>
              </div>
            </div>
          ` : ''}

          <div class="scene-field-group">
            <label class="scene-field-label">Visual / Bối cảnh</label>
            <textarea class="scene-textarea" rows="2">${scene.visual || ''}</textarea>
          </div>

          <div class="scene-field-group">
            <label class="scene-field-label">Lời thoại (Voice Script)</label>
            <textarea class="scene-textarea scene-voice-textarea" rows="2">${scene.voice || ''}</textarea>
          </div>

          <div class="scene-field-group">
            <label class="scene-field-label">Chữ hiển thị & Hiệu ứng</label>
            <textarea class="scene-textarea" rows="2">${scene.effects || ''}</textarea>
          </div>
        </div>
      `;
    }).join('');

    // Attach hook variant button switching
    const hookVariantBtns = DOM.editorScenesContainer.querySelectorAll('#scene-hook-variants-pills .variant-pill-btn:not(.add-new)');
    const voiceTextarea = DOM.editorScenesContainer.querySelector('.scene-voice-textarea');

    hookVariantBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        hookVariantBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const text = btn.getAttribute('data-hook-text');
        if (voiceTextarea && text) {
          voiceTextarea.value = text;
          showToast(`Đã áp dụng ${btn.textContent.trim()} vào lời thoại!`, 'info');
        }
      });
    });

    const addHookBtn = DOM.editorScenesContainer.querySelector('#btn-add-hook-variant');
    if (addHookBtn) {
      addHookBtn.addEventListener('click', () => {
        const customHook = prompt('Nhập nội dung biến thể Hook mới:');
        if (customHook && customHook.trim()) {
          const newBtn = document.createElement('button');
          newBtn.className = 'variant-pill-btn';
          newBtn.textContent = `Hook ${String.fromCharCode(65 + hookVariantBtns.length)} (Mới)`;
          newBtn.setAttribute('data-hook-text', customHook.trim());
          newBtn.addEventListener('click', () => {
            DOM.editorScenesContainer.querySelectorAll('.variant-pill-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');
            if (voiceTextarea) voiceTextarea.value = customHook.trim();
          });
          addHookBtn.parentNode.insertBefore(newBtn, addHookBtn);
          showToast('Đã thêm biến thể hook mới!', 'success');
        }
      });
    }
  }

  function addNewSceneToEditor() {
    if (!DOM.editorScenesContainer) return;
    const currentCount = DOM.editorScenesContainer.querySelectorAll('.scene-editor-card').length + 1;
    const card = document.createElement('div');
    card.className = 'scene-editor-card';
    card.setAttribute('data-scene-index', currentCount - 1);
    card.innerHTML = `
      <div class="scene-card-header">
        <div class="scene-badge-title">
          <span class="scene-pill-badge">SCENE 0${currentCount}</span>
          <span class="scene-name-title">Phân Cảnh Mới #${currentCount}</span>
          <span class="scene-timerange-tag">Thời lượng tùy chỉnh</span>
        </div>
        <div class="scene-duration-label">Thời lượng: 10 giây</div>
      </div>
      <div class="scene-field-group">
        <label class="scene-field-label">Visual / Bối cảnh</label>
        <textarea class="scene-textarea" rows="2" placeholder="Mô tả chuyển động góc quay camera, sản phẩm hoặc người mẫu..."></textarea>
      </div>
      <div class="scene-field-group">
        <label class="scene-field-label">Lời thoại (Voice Script)</label>
        <textarea class="scene-textarea" rows="2" placeholder="Nhập lời thoại AI lồng tiếng..."></textarea>
      </div>
      <div class="scene-field-group">
        <label class="scene-field-label">Chữ hiển thị & Hiệu ứng</label>
        <textarea class="scene-textarea" rows="2" placeholder="Text phụ đề, hiệu ứng âm thanh và chuyển cảnh..."></textarea>
      </div>
    `;
    DOM.editorScenesContainer.appendChild(card);
    showToast(`Đã thêm phân cảnh SCENE 0${currentCount}!`, 'success');
    card.scrollIntoView({ behavior: 'smooth' });
  }

  function useScriptToGenerateVideo(scriptId) {
    const script = (state.scripts || []).find(s => s.id === scriptId) || state.scripts[0];
    if (!script) return;

    // Switch panel to panel-multi-engine
    switchPanel('panel-multi-engine');

    // Pre-select script in dropdown
    if (DOM.img2vidScriptSelect) {
      DOM.img2vidScriptSelect.value = script.id;
    }

    // Set prompt
    if (DOM.img2vidPromptInput) {
      DOM.img2vidPromptInput.value = `Làm video TikTok ${script.duration || '25-35 giây'} cho sản phẩm ${script.sku || 'Farmstay'}. Kịch bản: "${script.title}". Hook mở đầu: "${script.hook || ''}". Hiệu ứng điện ảnh 3D chuyển động mượt mà.`;
    }

    showToast(`Đã nạp kịch bản "${script.title}" vào Xưởng Dựng Video!`, 'success');
  }

    function setupScriptModalHandlers() {
    if (DOM.btnCreateScriptManual) {
      DOM.btnCreateScriptManual.addEventListener('click', () => {
        openCreateScriptModal();
      });
    }

    if (DOM.btnCreateScriptAi) {
      DOM.btnCreateScriptAi.addEventListener('click', () => {
        showToast('AI đang tạo kịch bản dựa trên phân tích sản phẩm và xu hướng...', 'info');
        setTimeout(() => {
          openCreateScriptModal({
            title: 'Góc Trải Nghiệm Giác Quan Căng Mướt Sau 20 Phút',
            group: 'Nhóm Trải Nghiệm & ASMR',
            audience: 'Nữ 25-35 tuổi da khô mẩn đỏ, làm văn phòng',
            hook: 'Bôi serum này xong mẹ tưởng mình vừa đi spa về!',
            body: 'Scene 1 (4s): Cận cảnh giọt serum rau má Jeju sánh trong suốt nhỏ lên mu bàn tay.\nScene 2 (6s): 3D thẩm thấu qua lớp sừng da, phục hồi hàng rào ẩm.\nScene 3 (6s): Model cười tươi chạm tay lên má căng bóng Glass skin.\nScene 4 (8s): Hộp Farmstay Cica Serum xuất hiện kèm tem phụ chính ngạch và lời kêu gọi chốt đơn.'
          });
          showToast('AI đã tạo xong khung kịch bản, bạn có thể chỉnh sửa và lưu', 'success');
        }, 500);
      });
    }

    if (DOM.btnUploadScriptFile) {
      DOM.btnUploadScriptFile.addEventListener('click', () => {
        openModal(DOM.modalUploadScript);
      });
    }

    if (DOM.scriptDropzoneClick && DOM.scriptFileInput) {
      DOM.scriptDropzoneClick.addEventListener('click', () => {
        DOM.scriptFileInput.click();
      });

      DOM.scriptFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && DOM.scriptFileChosenName) {
          DOM.scriptFileChosenName.style.display = 'block';
          DOM.scriptFileChosenName.textContent = `Đã chọn: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        }
      });
    }

    if (DOM.btnConfirmUploadScript) {
      DOM.btnConfirmUploadScript.addEventListener('click', () => {
        const file = DOM.scriptFileInput && DOM.scriptFileInput.files[0];
        const fileName = file ? file.name : 'kich_ban_upload.docx';
        const newScript = {
          id: 'SCRIPT_' + Date.now(),
          group: 'Tải Lên Từ File',
          title: fileName.replace(/\.[^/.]+$/, ''),
          targetAudience: 'Theo tệp tải lên',
          hook: 'Hook tự động trích xuất từ file văn bản',
          fullScript: `Scene 1: Giới thiệu nội dung trích xuất từ file ${fileName}.\nScene 2: Điểm nhấn công dụng và USP sản phẩm.\nScene 3: Đánh giá trải nghiệm thực tế.\nScene 4: Lời kêu gọi hành động đặt hàng.`
        };
        state.scripts.unshift(newScript);
        renderScriptFolderPills();
        renderScriptsVault();
        updatePipelineScriptSelects();
        closeModal(DOM.modalUploadScript);
        showToast(`Đã nhập file ${fileName} vào kho kịch bản`, 'success');
      });
    }

    function handleSaveScriptModal(desiredStatus = 'Bản nháp') {
      const editId = DOM.scriptEditId ? DOM.scriptEditId.value : '';
      const title = (DOM.scriptTitleInput ? DOM.scriptTitleInput.value.trim() : '') || 'Kịch bản mới';
      const group = DOM.scriptGroupSelect ? DOM.scriptGroupSelect.value : 'Giáo Dục';
      const audience = (DOM.scriptAudienceInput ? DOM.scriptAudienceInput.value.trim() : '') || 'Khách hàng mục tiêu';
      const hook = (DOM.scriptHookInput ? DOM.scriptHookInput.value.trim() : '') || 'Câu hook mở đầu';
      const body = (DOM.scriptBodyInput ? DOM.scriptBodyInput.value.trim() : '') || 'Chi tiết kịch bản';

      const isPublish = desiredStatus === 'Sẵn sàng';

      if (editId) {
        const script = state.scripts.find(s => s.id === editId);
        if (script) {
          script.title = title;
          script.group = group;
          script.targetAudience = audience;
          script.hook = hook;
          script.fullScript = body;
          script.status = isPublish ? 'Sẵn sàng' : 'Bản nháp';
          script.statusCode = isPublish ? 'ready' : 'draft';
          showToast(isPublish ? 'Đã xuất bản kịch bản (Sẵn sàng)!' : 'Đã lưu kịch bản dạng Bản nháp!', 'success');
        }
      } else {
        const newScript = {
          id: 'SCRIPT_' + Date.now(),
          title,
          group,
          sku: 'Farmstay SKU',
          scenesCount: 4,
          duration: '45s',
          totalDurationSeconds: 45,
          targetAudience: audience,
          hook,
          fullScript: body,
          status: isPublish ? 'Sẵn sàng' : 'Bản nháp',
          statusCode: isPublish ? 'ready' : 'draft',
          updatedAt: 'Vừa xong'
        };
        state.scripts.unshift(newScript);
        showToast(isPublish ? 'Đã xuất bản kịch bản mới thành công!' : 'Đã lưu kịch bản mới dạng Bản nháp!', 'success');
      }

      renderScriptsTable();
      updatePipelineScriptSelects();
      closeModal(DOM.modalScriptEditor);
    }

    if (DOM.btnSaveScriptDraft) {
      DOM.btnSaveScriptDraft.addEventListener('click', () => handleSaveScriptModal('Bản nháp'));
    }
    if (DOM.btnSaveScriptPublish) {
      DOM.btnSaveScriptPublish.addEventListener('click', () => handleSaveScriptModal('Sẵn sàng'));
    }
    if (DOM.btnSaveScript) {
      DOM.btnSaveScript.addEventListener('click', () => handleSaveScriptModal('Sẵn sàng'));
    }
  }

  function openCreateScriptModal(defaults = null) {
    if (!DOM.modalScriptEditor) return;
    DOM.scriptModalTitle.textContent = 'Viết Kịch Bản Video Mới';
    DOM.scriptEditId.value = '';
    DOM.scriptTitleInput.value = defaults?.title || '';
    DOM.scriptGroupSelect.value = defaults?.group || 'Nhóm Giáo Dục';
    DOM.scriptAudienceInput.value = defaults?.audience || '';
    DOM.scriptHookInput.value = defaults?.hook || '';
    DOM.scriptBodyInput.value = defaults?.body || '';
    openModal(DOM.modalScriptEditor);
  }

  function openEditScriptModal(scriptId) {
    const script = state.scripts.find(s => s.id === scriptId);
    if (!script || !DOM.modalScriptEditor) return;

    DOM.scriptModalTitle.textContent = 'Chỉnh Sửa Kịch Bản';
    DOM.scriptEditId.value = script.id;
    DOM.scriptTitleInput.value = script.title || '';
    DOM.scriptGroupSelect.value = script.group || 'Nhóm Giáo Dục';
    DOM.scriptAudienceInput.value = script.targetAudience || '';
    DOM.scriptHookInput.value = script.hook || '';
    DOM.scriptBodyInput.value = script.fullScript || '';
    openModal(DOM.modalScriptEditor);
  }

  /* ==========================================================================
     KHO CÂU HOOK TIKTOK (THEO PHONG CÁCH XCORP & ẢNH 1, ẢNH 3)
     ========================================================================== */
  function renderHooksVault() {
    renderHooksList();
    setupHookEvents();
  }

  function updateHookBatchBar() {
    if (!DOM.hookBatchBar) return;
    const count = state.selectedHookIds.size;
    if (count > 0) {
      DOM.hookBatchBar.style.display = 'flex';
      if (DOM.hookBatchCount) DOM.hookBatchCount.textContent = count;
    } else {
      DOM.hookBatchBar.style.display = 'none';
    }
  }

  function renderHooksList() {
    if (!DOM.hookTableTbody) return;
    let hooks = state.hooks || [];

    const activeTab = state.activeHookTab || 'all';
    const searchKw = (state.activeHookSearch || '').toLowerCase().trim();

    // 1. Filter by Tab (matching Screenshot 2: Tất Cả, Cảnh Báo, Chuyên Gia, Glass Skin, Hài Hước, POV)
    if (activeTab !== 'all') {
      hooks = hooks.filter(h => (h.type || '') === activeTab);
    }

    // 2. Filter by Search Keyword
    if (searchKw) {
      hooks = hooks.filter(h => 
        (h.hookText || '').toLowerCase().includes(searchKw) ||
        (h.sku || '').toLowerCase().includes(searchKw) ||
        (h.skuCode || '').toLowerCase().includes(searchKw) ||
        (h.type || '').toLowerCase().includes(searchKw)
      );
    }

    if (hooks.length === 0) {
      DOM.hookTableTbody.innerHTML = `
        <tr>
          <td colspan="3" style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            Không tìm thấy câu hook nào phù hợp với bộ lọc.
          </td>
        </tr>
      `;
      updateHookBatchBar();
      return;
    }

    DOM.hookTableTbody.innerHTML = hooks.map((hook) => {
      // Category tag matching Screenshot 2
      let tagClass = 'tag-hook-warning';
      if ((hook.type || '').includes('Chuyên Gia')) tagClass = 'tag-hook-expert';
      else if ((hook.type || '').includes('Glass Skin')) tagClass = 'tag-hook-glass';
      else if ((hook.type || '').includes('Hài Hước')) tagClass = 'tag-hook-comedy';
      else if ((hook.type || '').includes('POV')) tagClass = 'tag-hook-pov';

      const isChecked = state.selectedHookIds.has(hook.id);

      return `
        <tr data-hook-id="${hook.id}" class="${isChecked ? 'row-selected' : ''}">
          <td style="text-align: center;">
            <input type="checkbox" class="form-checkbox hook-row-checkbox" value="${hook.id}" ${isChecked ? 'checked' : ''}>
          </td>
          <td>
            <div class="hook-quote-text">"${hook.hookText}"</div>
          </td>
          <td>
            <span class="${tagClass}">${hook.type || 'Cảnh Báo'}</span>
          </td>
        </tr>
      `;
    }).join('');

    // Check all box state
    if (DOM.hookCheckAllBox) {
      const allSelected = hooks.length > 0 && hooks.every(h => state.selectedHookIds.has(h.id));
      DOM.hookCheckAllBox.checked = allSelected;
    }

    updateHookBatchBar();

    // Row events: Click row opens edit modal (Screenshot 2: "Nhấp vào dòng để chỉnh sửa")
    DOM.hookTableTbody.querySelectorAll('tr[data-hook-id]').forEach(row => {
      const hookId = row.getAttribute('data-hook-id');

      row.addEventListener('click', (e) => {
        if (e.target.closest('.hook-row-checkbox')) return;
        openEditHookModal(hookId);
      });

      const cb = row.querySelector('.hook-row-checkbox');
      if (cb) {
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          if (cb.checked) {
            state.selectedHookIds.add(hookId);
          } else {
            state.selectedHookIds.delete(hookId);
          }
          if (DOM.hookCheckAllBox) {
            DOM.hookCheckAllBox.checked = hooks.every(h => state.selectedHookIds.has(h.id));
          }
          updateHookBatchBar();
        });
      }
    });
  }

  function setupHookEvents() {
    // 1. Category Tabs
    if (DOM.hookCategoryTabsBar) {
      DOM.hookCategoryTabsBar.querySelectorAll('.hook-cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.hookCategoryTabsBar.querySelectorAll('.hook-cat-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          state.activeHookTab = tab.getAttribute('data-cat');
          renderHooksList();
        });
      });
    }

    // 2. Search Input
    if (DOM.hookSearchInput) {
      DOM.hookSearchInput.addEventListener('input', (e) => {
        state.activeHookSearch = e.target.value;
        renderHooksList();
      });
    }

    // 3. Hook Check All Box
    if (DOM.hookCheckAllBox) {
      DOM.hookCheckAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        if (DOM.hookTableTbody) {
          DOM.hookTableTbody.querySelectorAll('.hook-row-checkbox').forEach(cb => {
            cb.checked = isChecked;
            if (isChecked) state.selectedHookIds.add(cb.value);
            else state.selectedHookIds.delete(cb.value);
          });
        }
        updateHookBatchBar();
      });
    }

    // 3.1 Hook Batch Delete (matching Screenshot 2: [Xóa])
    if (DOM.btnBatchDeleteHook) {
      DOM.btnBatchDeleteHook.addEventListener('click', () => {
        const count = state.selectedHookIds.size;
        if (count === 0) return;
        if (confirm(`Bạn có chắc muốn xóa ${count} câu hook đã chọn khỏi kho?`)) {
          state.hooks = state.hooks.filter(h => !state.selectedHookIds.has(h.id));
          state.selectedHookIds.clear();
          renderHooksList();
          updatePipelineHookSelects();
          showToast(`Đã xóa ${count} câu hook thành công!`, 'info');
        }
      });
    }

    // 3.2 Hook Batch Deselect (matching Screenshot 2: [Bỏ chọn])
    if (DOM.btnBatchDeselectHook) {
      DOM.btnBatchDeselectHook.addEventListener('click', () => {
        state.selectedHookIds.clear();
        renderHooksList();
      });
    }

    // 4. AI Generate Button
    if (DOM.btnHookAiGenerate) {
      DOM.btnHookAiGenerate.addEventListener('click', () => {
        showToast('AI đang phân tích xu hướng TikTok & doanh số SKU để tạo câu hook mới...', 'info');
        setTimeout(() => {
          state.hooks.unshift({
            id: 'HOOK_' + Date.now(),
            type: 'Bóc Phốt / Cảnh Báo',
            sku: 'Farmstay Retinol Revive Cream',
            skuCode: 'SKU-05',
            hookText: '99% Chị em thoa Retinol mà bị sạm da là do bỏ qua bước đệm sống còn này!',
            visualCue: 'Cận cảnh gương mặt model chỉ vào lọ serum đệm, camera zoom in 1.2x điện ảnh.',
            targetPersona: 'Nữ 25–45 tuổi da lão hóa',
            soundTrend: 'TikTok Viral Alert Sound'
          });
          renderHooksList();
          showToast('✓ AI đã sinh 1 câu Hook viral mới và thêm vào đầu kho!', 'success');
        }, 1200);
      });
    }
  }

  function setupHookModalHandlers() {
    if (DOM.btnCreateHook) {
      DOM.btnCreateHook.addEventListener('click', () => {
        if (!DOM.modalHookEditor) return;
        DOM.hookModalTitle.textContent = 'Thêm Câu Hook Mới';
        DOM.hookEditId.value = '';
        if (DOM.hookTextInput) DOM.hookTextInput.value = '';
        if (DOM.hookTypeSelect) DOM.hookTypeSelect.value = 'Bóc Phốt / Cảnh Báo';
        if (DOM.hookSkuSelectModal) DOM.hookSkuSelectModal.value = 'Farmstay Retinol Revive Cream (SKU-05)';
        if (DOM.hookVisualInput) DOM.hookVisualInput.value = '';
        if (DOM.hookPersonaInput) DOM.hookPersonaInput.value = '';
        if (DOM.hookSoundInput) DOM.hookSoundInput.value = '';
        openModal(DOM.modalHookEditor);
      });
    }

    if (DOM.btnSaveHookModal) {
      DOM.btnSaveHookModal.onclick = () => {
        const text = DOM.hookTextInput ? DOM.hookTextInput.value.trim() : '';
        if (!text) {
          showToast('Vui lòng nhập lời thoại câu hook', 'error');
          return;
        }

        const editId = DOM.hookEditId ? DOM.hookEditId.value : '';
        const type = DOM.hookTypeSelect ? DOM.hookTypeSelect.value : 'Bóc Phốt / Cảnh Báo';
        const skuFull = DOM.hookSkuSelectModal ? DOM.hookSkuSelectModal.value : 'Farmstay Retinol Revive Cream (SKU-05)';
        const sku = skuFull.replace(/\s*\(SKU-.*\)/, '');
        const skuMatch = skuFull.match(/\((SKU-\d+)\)/);
        const skuCode = skuMatch ? skuMatch[1] : 'SKU-01';
        const visual = DOM.hookVisualInput ? DOM.hookVisualInput.value.trim() : '';
        const persona = DOM.hookPersonaInput ? DOM.hookPersonaInput.value.trim() : 'Mọi đối tượng khách hàng';
        const sound = DOM.hookSoundInput ? DOM.hookSoundInput.value.trim() : 'Dramatic Whoosh';

        if (editId) {
          const hook = state.hooks.find(h => h.id === editId);
          if (hook) {
            hook.hookText = text;
            hook.type = type;
            hook.sku = sku;
            hook.skuCode = skuCode;
            hook.visualCue = visual;
            hook.targetPersona = persona;
            hook.soundTrend = sound;
            showToast('Đã cập nhật câu hook thành công!', 'success');
          }
        } else {
          state.hooks.unshift({
            id: 'HOOK_' + Date.now(),
            type,
            sku,
            skuCode,
            hookText: text,
            visualCue: visual,
            targetPersona: persona,
            soundTrend: sound
          });
          showToast('Đã thêm câu hook mới vào kho!', 'success');
        }

        renderHooksList();
        updatePipelineHookSelects();
        closeModal(DOM.modalHookEditor);
      };
    }
  }

  function openEditHookModal(hookId) {
    const hook = state.hooks.find(h => h.id === hookId);
    if (!hook || !DOM.modalHookEditor) return;

    DOM.hookModalTitle.textContent = 'Chỉnh Sửa Câu Hook';
    DOM.hookEditId.value = hook.id;
    if (DOM.hookTextInput) DOM.hookTextInput.value = hook.hookText || '';
    if (DOM.hookTypeSelect) DOM.hookTypeSelect.value = hook.type || 'Bóc Phốt / Cảnh Báo';
    if (DOM.hookSkuSelectModal) {
      const targetOption = Array.from(DOM.hookSkuSelectModal.options).find(opt => opt.value.includes(hook.sku || ''));
      if (targetOption) DOM.hookSkuSelectModal.value = targetOption.value;
    }
    if (DOM.hookVisualInput) DOM.hookVisualInput.value = hook.visualCue || '';
    if (DOM.hookPersonaInput) DOM.hookPersonaInput.value = hook.targetPersona || '';
    if (DOM.hookSoundInput) DOM.hookSoundInput.value = hook.soundTrend || '';

    openModal(DOM.modalHookEditor);
  }

  function updatePipelineHookSelects() {
    const hookOptions = (state.hooks || []).map((h, i) => `
      <option value="${h.id}">${i + 1}. "${h.hookText.slice(0, 55)}..." (${h.type})</option>
    `).join('');

    if (DOM.img2vidHookSelect) DOM.img2vidHookSelect.innerHTML = hookOptions;
    if (DOM.rawHookSelect) DOM.rawHookSelect.innerHTML = hookOptions;
  }

  /* ==========================================================================
     GLOBAL MODAL HELPERS & VIDEO PREVIEW MODAL
     ========================================================================== */
  function openModal(modalEl) {
    const el = typeof modalEl === 'string' ? document.getElementById(modalEl) : modalEl;
    if (!el) return;
    el.style.display = 'flex';
    el.classList.add('active');
  }

  function closeModal(modalEl) {
    const el = typeof modalEl === 'string' ? document.getElementById(modalEl) : modalEl;
    if (!el) return;
    el.classList.remove('active');
    el.style.display = 'none';
    const vid = el.querySelector('video');
    if (vid) vid.pause();
  }

  function setupModalCloseTriggers() {
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const modalEl = document.getElementById(modalId);
        if (modalEl) closeModal(modalEl);
      });
    });

    document.querySelectorAll('.modal-overlay, .modal-backdrop').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeModal(overlay);
        }
      });
    });

    // Preview Modal Controls
    if (DOM.btnPopupToggleSafezone && DOM.popupSafeZone) {
      DOM.btnPopupToggleSafezone.addEventListener('click', () => {
        const isShown = DOM.popupSafeZone.style.display !== 'none';
        DOM.popupSafeZone.style.display = isShown ? 'none' : 'block';
      });
    }

    if (DOM.btnPopupCopyCaption && DOM.popupCaptionText) {
      DOM.btnPopupCopyCaption.addEventListener('click', () => {
        navigator.clipboard?.writeText(DOM.popupCaptionText.textContent).catch(() => {});
        showToast('Đã sao chép caption thành công!', 'success');
      });
    }

    if (DOM.btnPopupDownloadMp4) {
      DOM.btnPopupDownloadMp4.addEventListener('click', () => {
        showToast('Đang tải file video MP4 chất lượng cao 1080x1920...', 'success');
      });
    }
  }

  function openVideoPreviewModal({ title, videoSrc, caption }) {
    if (!DOM.modalVideoPreview) return;
    if (DOM.previewModalTitle) DOM.previewModalTitle.textContent = title || 'Preview Video TikTok';
    if (DOM.popupCaptionText) DOM.popupCaptionText.textContent = caption || 'Video TikTok sản xuất tự động bởi Xcorp Video AI Studio';
    if (DOM.popupCaptionSnip) DOM.popupCaptionSnip.textContent = (caption || title || '').slice(0, 40) + '...';
    if (DOM.popupPreviewVideo) {
      DOM.popupPreviewVideo.src = videoSrc || 'media/video/final_final.mp4';
      DOM.popupPreviewVideo.play().catch(() => {});
    }
    openModal(DOM.modalVideoPreview);
  }

  function downloadTextFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : (type === 'warning' ? '⚠️' : 'ℹ️'));
    toast.innerHTML = `<span style="font-size: 1rem;">${icon}</span> <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  /* ==========================================================================
     SAAS EXTENSIONS (XCORP UI KIT 26)
     ========================================================================== */
  /* ==========================================================================
     AUTHENTICATION & LOGIN PORTAL (MATCHING ANH 1)
     ========================================================================== */
  function renderLoginRoles() {
    if (!DOM.loginRolesContainer) return;
    DOM.loginRolesContainer.innerHTML = ROLES.map(role => {
      const isActive = role.id === state.activeRoleId;
      return `
        <div class="login-role-card ${isActive ? 'active' : ''}" data-role-id="${role.id}">
          <div class="login-role-avatar ${role.avatarClass}">${role.initials}</div>
          <div class="login-role-info">
            <div class="login-role-name">${role.name}</div>
            <div class="login-role-desc">${role.title}</div>
          </div>
          <div class="login-role-check">${isActive ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}</div>
        </div>
      `;
    }).join('');

    DOM.loginRolesContainer.querySelectorAll('.login-role-card').forEach(card => {
      card.addEventListener('click', () => {
        const roleId = card.getAttribute('data-role-id');
        state.activeRoleId = roleId;
        renderLoginRoles();
        updateLoginSubmitLabel();
      });
    });
  }

  function updateLoginSubmitLabel() {
    const role = ROLES.find(r => r.id === state.activeRoleId) || ROLES[0];
    if (DOM.btnLoginPortalLabel) {
      DOM.btnLoginPortalLabel.textContent = `Tiếp Tục Chọn Dự Án (${role.name})`;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderLoginProjects() {
    if (!DOM.loginProjectsContainer) return;
    const projects = window.PROTOTYPE_PROJECTS || [];

    DOM.loginProjectsContainer.innerHTML = projects.map(p => {
      const isActive = p.id === state.activeProjectId;
      const skuCount = (p.assetVault?.productFolders || []).filter(f => f.id !== 'folder_all').length;
      return `
        <div class="login-project-card ${isActive ? 'active' : ''}" data-project-id="${p.id}">
          <div class="login-project-card-header">
            <div style="display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0;">
              <span class="login-project-card-name" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(p.name)}</span>
            </div>
            <button class="login-project-btn-edit" data-edit-project-id="${p.id}" type="button" title="Chỉnh sửa tên và mô tả dự án">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Sửa</span>
            </button>
          </div>
          <div class="login-project-card-desc">${escapeHtml(p.description || 'Chưa có mô tả')}</div>
          <div class="login-project-card-footer">
            <span>${p.stats?.completedVideos || 0} video hoàn thiện</span>
            <span>•</span>
            <span>${skuCount || p.stats?.skusCount || 0} SKU</span>
            <span>•</span>
            <span>${p.stats?.sessionsCount || 1} phiên prompt</span>
          </div>
        </div>
      `;
    }).join('');

    DOM.loginProjectsContainer.querySelectorAll('.login-project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.login-project-btn-edit')) return;
        const pId = card.getAttribute('data-project-id');
        if (pId) {
          state.activeProjectId = pId;
          renderLoginProjects();
        }
      });

      card.addEventListener('dblclick', (e) => {
        if (e.target.closest('.login-project-btn-edit')) return;
        const pId = card.getAttribute('data-project-id');
        if (pId) {
          state.activeProjectId = pId;
          enterWorkspace();
        }
      });
    });

    DOM.loginProjectsContainer.querySelectorAll('.login-project-btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-edit-project-id');
        if (pId) {
          openEditProjectModal(pId);
        }
      });
    });
  }

  function openEditProjectModal(projectId) {
    const projects = window.PROTOTYPE_PROJECTS || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('modal-edit-project-info');
    const inputId = document.getElementById('edit-project-target-id');
    const inputName = document.getElementById('edit-project-name');
    const inputDesc = document.getElementById('edit-project-desc');

    if (inputId) inputId.value = project.id;
    if (inputName) inputName.value = project.name || '';
    if (inputDesc) inputDesc.value = project.description || '';

    if (modal) {
      openModal(modal);
      setTimeout(() => { if (inputName) inputName.focus(); }, 100);
    }
  }

  function setupProjectModals() {
    // 1. Tạo dự án mới ở trang đăng nhập (Todo21 Item 5)
    const btnOpenCreate = document.getElementById('btn-login-open-create-project');
    const modalCreate = document.getElementById('modal-create-project-portal');
    const btnSubmitCreate = document.getElementById('btn-portal-submit-create-project');
    const inputCreateName = document.getElementById('portal-new-project-name');
    const inputCreateDesc = document.getElementById('portal-new-project-desc');

    if (btnOpenCreate && modalCreate) {
      btnOpenCreate.addEventListener('click', () => {
        if (inputCreateName) inputCreateName.value = '';
        if (inputCreateDesc) inputCreateDesc.value = '';
        openModal(modalCreate);
        setTimeout(() => { if (inputCreateName) inputCreateName.focus(); }, 100);
      });
    }

    const handleCreateProject = () => {
      const name = inputCreateName ? inputCreateName.value.trim() : '';
      const desc = inputCreateDesc ? inputCreateDesc.value.trim() : '';

      if (!name) {
        showToast('Vui lòng nhập tên dự án mới!', 'warning');
        if (inputCreateName) inputCreateName.focus();
        return;
      }

      const newProjId = 'proj_' + Date.now();
      const newProj = {
        id: newProjId,
        name: name,
        shortName: name,
        category: 'Dự Án Doanh Nghiệp',
        categoryBadge: 'Dự Án Mới',
        icon: '💼',
        description: desc || `Không gian làm việc cho ${name}`,
        stats: { completedVideos: 0, sessionsCount: 1, skusCount: 0 },
        brand: {
          name: name.toUpperCase(),
          tagline: `Kênh TikTok chuyên nghiệp về ${name}`,
          policy: 'Brand Safety: Bảo vệ hình ảnh và thông điệp thương hiệu',
          skus: []
        },
        faceLibrary: [],
        modelVault: { modelFolders: [{ id: 'model_all', name: 'Tất Cả Model', isPublic: true }] },
        assetVault: { productFolders: [{ id: 'folder_all', name: 'Tất Cả Thư Mục', isPublic: true }], driveFiles: [] },
        angleVault: { scripts: [] },
        trendingHookVault: [],
        contentKits: [],
        livestreamSession: { id: 'LIVE_NEW', title: `Livestream ${name}`, duration: '00:00:00', goldenMoments: [] },
        sessions: [
          {
            id: 'sess_' + Date.now(),
            title: 'Session 1: Phiên Prompt Khởi Đầu',
            type: 'img2vid',
            typeLabel: 'Dựng từ ảnh',
            createdAt: 'Hôm nay ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            status: 'in_progress',
            promptText: '',
            iterations: []
          }
        ]
      };

      if (!window.PROTOTYPE_PROJECTS) window.PROTOTYPE_PROJECTS = [];
      window.PROTOTYPE_PROJECTS.push(newProj);
      state.activeProjectId = newProjId;

      if (modalCreate) closeModal(modalCreate);
      renderLoginProjects();
      renderProjectHubCards();
      showToast(`✓ Đã tạo thành công Dự Án mới: ${name}!`, 'success');
    };

    if (btnSubmitCreate) {
      btnSubmitCreate.addEventListener('click', handleCreateProject);
    }

    if (inputCreateName) {
      inputCreateName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCreateProject();
        }
      });
    }

    // 2. Chỉnh sửa thông tin dự án (chỉ Tên & Mô tả theo Todo21 Item 6)
    const modalEdit = document.getElementById('modal-edit-project-info');
    const btnSaveEdit = document.getElementById('btn-save-project-edit');
    const inputEditId = document.getElementById('edit-project-target-id');
    const inputEditName = document.getElementById('edit-project-name');
    const inputEditDesc = document.getElementById('edit-project-desc');

    const handleSaveEdit = () => {
      const pId = inputEditId ? inputEditId.value : null;
      const newName = inputEditName ? inputEditName.value.trim() : '';
      const newDesc = inputEditDesc ? inputEditDesc.value.trim() : '';

      if (!newName) {
        showToast('Vui lòng nhập tên dự án!', 'warning');
        if (inputEditName) inputEditName.focus();
        return;
      }

      const projects = window.PROTOTYPE_PROJECTS || [];
      const project = projects.find(p => p.id === pId);
      if (project) {
        project.name = newName;
        project.shortName = newName;
        project.description = newDesc;
        if (project.brand) {
          project.brand.name = newName.toUpperCase();
        }

        if (state.activeProjectId === project.id) {
          updateTopbarProjectDisplay();
        }

        renderLoginProjects();
        renderProjectHubCards();
        showToast(`✓ Đã cập nhật thông tin dự án: ${newName}`, 'success');
      }

      if (modalEdit) closeModal(modalEdit);
    };

    if (btnSaveEdit) {
      btnSaveEdit.addEventListener('click', handleSaveEdit);
    }

    if (inputEditName) {
      inputEditName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSaveEdit();
        }
      });
    }
  }

  function goToProjectStep() {
    const role = ROLES.find(r => r.id === state.activeRoleId) || ROLES[0];
    if (DOM.loginUserNameDisplay) {
      DOM.loginUserNameDisplay.textContent = role.name;
    }
    if (DOM.loginStepAccount) DOM.loginStepAccount.style.display = 'none';
    if (DOM.loginStepProject) DOM.loginStepProject.style.display = 'block';
    renderLoginProjects();
  }

  function goToAccountStep() {
    if (DOM.loginStepProject) DOM.loginStepProject.style.display = 'none';
    if (DOM.loginStepAccount) DOM.loginStepAccount.style.display = 'block';
  }

  function backToProjectSelection() {
    closeProjectDropdown();
    goToProjectStep();
    if (DOM.loginPortalScreen) {
      DOM.loginPortalScreen.style.display = 'flex';
      DOM.loginPortalScreen.style.opacity = '1';
      DOM.loginPortalScreen.style.transition = 'opacity 0.25s ease-in';
    }
    showToast('Chọn Dự Án để chuyển không gian làm việc', 'info');
  }

  function enterWorkspace() {
    const role = ROLES.find(r => r.id === state.activeRoleId) || ROLES[0];
    const projects = window.PROTOTYPE_PROJECTS || [];
    const project = projects.find(p => p.id === state.activeProjectId) || projects[0];

    // Load selected project data into studio workspace
    switchProject(project.id);
    updateUserProfileDisplays();

    // Fade out portal
    if (DOM.loginPortalScreen) {
      DOM.loginPortalScreen.style.opacity = '0';
      DOM.loginPortalScreen.style.transition = 'opacity 0.25s ease-out';
      setTimeout(() => {
        DOM.loginPortalScreen.style.display = 'none';
      }, 250);
    }

    showToast(`Chào mừng ${role.name} vào Không Gian Dự Án: ${project.name}`, 'success');
  }

  function setupLoginPortal() {
    renderLoginRoles();
    updateLoginSubmitLabel();
    setupProjectModals();

    // Step 1: Submit button -> goes to Step 2
    if (DOM.btnLoginSubmitPortal) {
      DOM.btnLoginSubmitPortal.addEventListener('click', goToProjectStep);
    }

    // Step 1: Password input Enter -> goes to Step 2
    const pwInput = document.querySelector('.login-password-input');
    if (pwInput) {
      pwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          goToProjectStep();
        }
      });
    }

    // Step 1: Double-click role card -> goes to Step 2
    if (DOM.loginRolesContainer) {
      DOM.loginRolesContainer.addEventListener('dblclick', (e) => {
        const card = e.target.closest('.login-role-card');
        if (card) {
          const roleId = card.getAttribute('data-role-id');
          if (roleId) state.activeRoleId = roleId;
          renderLoginRoles();
          updateLoginSubmitLabel();
          goToProjectStep();
        }
      });
    }

    // Step 2: Back to Account selection
    if (DOM.btnBackToAccount) {
      DOM.btnBackToAccount.addEventListener('click', goToAccountStep);
    }

    // Step 2: Enter Workspace
    if (DOM.btnEnterWorkspace) {
      DOM.btnEnterWorkspace.addEventListener('click', enterWorkspace);
    }
  }

  /* ==========================================================================
     ACCOUNT MANAGEMENT POPOVER & ROLE SWITCHER (MATCHING ANH 2)
     ========================================================================== */
  function updateUserProfileDisplays() {
    const role = ROLES.find(r => r.id === state.activeRoleId) || ROLES[0];

    // Update Topbar
    if (DOM.topbarAvatarBadge) {
      DOM.topbarAvatarBadge.textContent = role.initials;
      DOM.topbarAvatarBadge.className = `topbar-user-avatar ${role.avatarClass}`;
    }
    if (DOM.topbarUserName) DOM.topbarUserName.textContent = role.name;
    if (DOM.topbarUserRole) DOM.topbarUserRole.textContent = role.title;

    // Update Popover
    if (DOM.popoverUserName) DOM.popoverUserName.textContent = role.name;
    if (DOM.popoverUserUnit) DOM.popoverUserUnit.textContent = role.unit;
    if (DOM.popoverUserBadge) DOM.popoverUserBadge.textContent = role.badge;

// Quota credits badge removed as per todo12

    renderAccountPopoverRoles();
  }

  function renderAccountPopoverRoles() {
    if (!DOM.accountRolesList) return;
    DOM.accountRolesList.innerHTML = ROLES.map(role => {
      const isActive = role.id === state.activeRoleId;
      return `
        <div class="account-role-item ${isActive ? 'active' : ''}" data-role-id="${role.id}">
          <div>
            <div class="account-role-item-name">${role.name}</div>
            <div class="account-role-item-sub">${role.title}</div>
          </div>
          ${isActive ? `<span style="color: #f59e0b; display: flex; align-items: center;">${ICONS.check}</span>` : ''}
        </div>
      `;
    }).join('');

    DOM.accountRolesList.querySelectorAll('.account-role-item').forEach(item => {
      item.addEventListener('click', () => {
        const roleId = item.getAttribute('data-role-id');
        state.activeRoleId = roleId;
        updateUserProfileDisplays();
        if (DOM.accountDropdownPopover) DOM.accountDropdownPopover.classList.remove('active');
        const role = ROLES.find(r => r.id === roleId);
        showToast(`Đã chuyển nhanh quyền sang: ${role?.name} (${role?.title})`, 'info');
      });
    });
  }

  function setupAccountPopover() {
    updateUserProfileDisplays();

    // Toggle popover on topbar user profile click
    if (DOM.topbarUserProfile) {
      DOM.topbarUserProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        if (DOM.accountDropdownPopover) {
          DOM.accountDropdownPopover.classList.toggle('active');
        }
      });
    }

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
      if (DOM.accountDropdownPopover && DOM.accountDropdownPopover.classList.contains('active')) {
        if (!DOM.accountDropdownPopover.contains(e.target) && !DOM.topbarUserProfile.contains(e.target)) {
          DOM.accountDropdownPopover.classList.remove('active');
        }
      }
    });

    // Theme toggle button inside Popover
    if (DOM.btnPopoverThemeToggle) {
      DOM.btnPopoverThemeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('xcorp_theme', next);
        syncThemeToggleButtons(next);
        showToast(`Đã chuyển sang giao diện ${next === 'dark' ? 'Tối (Dark Mode)' : 'Sáng (Light Mode)'}`, 'info');
      });
    }

    // Logout button inside Popover
    if (DOM.btnAccountLogout) {
      DOM.btnAccountLogout.addEventListener('click', () => {
        if (DOM.accountDropdownPopover) DOM.accountDropdownPopover.classList.remove('active');
        goToAccountStep();
        if (DOM.loginPortalScreen) {
          DOM.loginPortalScreen.style.display = 'flex';
          DOM.loginPortalScreen.style.opacity = '1';
        }
        renderLoginRoles();
        updateLoginSubmitLabel();
        showToast('Đã đăng xuất tài khoản an toàn', 'info');
      });
    }
  }

  function syncThemeToggleButtons(theme) {
    if (DOM.popoverThemeLabel) {
      DOM.popoverThemeLabel.textContent = theme === 'dark' ? 'Chế độ: Tối' : 'Chế độ: Sáng';
    }
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      if (theme === 'dark') {
        // Biểu tượng Mặt trời
        themeIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      } else {
        // Biểu tượng Mặt trăng
        themeIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      }
    }
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'dark' ? 'Logo_Xcorp_R night.svg' : 'Logo_Xcorp_R.svg';
    }
  }

  function setupThemeToggle() {
    const btn = document.getElementById('btn-theme-toggle');
    const icon = document.getElementById('theme-toggle-icon');
    const saved = localStorage.getItem('xcorp_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    syncThemeToggleButtons(saved);

    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('xcorp_theme', next);
        syncThemeToggleButtons(next);
        showToast(`Đã chuyển sang chế độ ${next === 'dark' ? 'Dark Mode (Tối)' : 'Light Mode (Sáng)'}`, 'info');
      });
    }
  }

  /* ==========================================================================
     MULTI-PROJECT & SESSION PROMPT MANAGEMENT (ENTERPRISE SAAS ARCHITECTURE)
     ========================================================================== */

  function setupMultiProjectManagement() {
    updateTopbarProjectDisplay();

    // Toggle Dropdown Menu
    if (DOM.btnTopbarProject && DOM.topbarProjectContainer) {
      DOM.btnTopbarProject.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = DOM.topbarProjectContainer.classList.contains('open');
        if (isOpen) {
          closeProjectDropdown();
        } else {
          openProjectDropdown();
        }
      });
    }

    // Close Dropdown on Click Outside
    document.addEventListener('click', (e) => {
      if (DOM.topbarProjectContainer && !DOM.topbarProjectContainer.contains(e.target)) {
        closeProjectDropdown();
      }
    });

    // Setup Project Hub Modal Handlers
    setupProjectHubModal();

    // Setup Session Management
    setupSessionManagement();
  }

  function updateTopbarProjectDisplay() {
    const projects = window.PROTOTYPE_PROJECTS || [];
    const current = projects.find(p => p.id === state.activeProjectId) || projects[0];
    if (!current) return;

    if (DOM.topbarProjectName) DOM.topbarProjectName.textContent = current.name || 'Dự Án';
    if (DOM.topbarRootBrand) {
      DOM.topbarRootBrand.textContent = current.name || 'Dự Án';
      DOM.topbarRootBrand.title = `Dự án: ${current.name} • Bấm để chuyển đổi dự án`;
    }
  }

  function openProjectDropdown() {
    if (!DOM.projectDropdownMenu || !DOM.topbarProjectContainer) return;
    DOM.topbarProjectContainer.classList.add('open');
    DOM.projectDropdownMenu.style.display = 'flex';

    const projects = window.PROTOTYPE_PROJECTS || [];

    DOM.projectDropdownMenu.innerHTML = `
      <div class="project-dropdown-header">
        <span class="project-dropdown-title">CHUYỂN ĐỔI LĨNH VỰC / DỰ ÁN</span>
        <span style="font-size: 0.65rem; color: var(--text-dim);">${projects.length} Lĩnh vực</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 3px;">
        ${projects.map(p => `
          <button class="project-dropdown-item ${p.id === state.activeProjectId ? 'active' : ''}" data-project-id="${p.id}">
            <div class="project-item-meta">
              <div class="project-item-name">${p.name}</div>
              <div class="project-item-category">
                <span>${(p.assetVault?.productFolders || []).filter(f => f.id !== 'folder_all').length} SKU</span>
              </div>
            </div>
            ${p.id === state.activeProjectId ? `<span class="project-item-active-badge">Đang chọn</span>` : ''}
          </button>
        `).join('')}
      </div>
      <div class="project-dropdown-footer">
        <button class="btn btn-ghost btn-sm" id="btn-open-project-hub-modal" style="width: 100%; justify-content: center; font-size: 0.75rem; color: var(--xcorp-blue-600); font-weight: 600;">
          Trung Tâm Quản Lý Dự Án & Thêm Lĩnh Vực...
        </button>
      </div>
    `;

    DOM.projectDropdownMenu.querySelectorAll('[data-project-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-project-id');
        if (pId && pId !== state.activeProjectId) {
          switchProject(pId);
        } else {
          closeProjectDropdown();
        }
      });
    });

    const openHubBtn = DOM.projectDropdownMenu.querySelector('#btn-open-project-hub-modal');
    if (openHubBtn) {
      openHubBtn.addEventListener('click', () => {
        closeProjectDropdown();
        openProjectHubModal();
      });
    }
  }

  function closeProjectDropdown() {
    if (DOM.topbarProjectContainer) DOM.topbarProjectContainer.classList.remove('open');
    if (DOM.projectDropdownMenu) DOM.projectDropdownMenu.style.display = 'none';
  }

  function switchProject(projectId) {
    const projects = window.PROTOTYPE_PROJECTS || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    state.activeProjectId = projectId;
    window.PROTOTYPE_DATA = project;

    // Synchronize State Arrays from the switched project
    state.productFolders = project.assetVault && project.assetVault.productFolders ? [...project.assetVault.productFolders] : [];
    state.driveFiles = project.assetVault && project.assetVault.driveFiles ? [...project.assetVault.driveFiles] : [];
    state.scripts = project.angleVault && project.angleVault.scripts ? [...project.angleVault.scripts] : [];
    state.hooks = project.trendingHookVault ? [...project.trendingHookVault] : [];
    state.modelFolders = project.modelVault && project.modelVault.modelFolders ? [...project.modelVault.modelFolders] : [];
    state.kits = project.contentKits ? [...project.contentKits] : [];
    state.livestreamsVault = project.livestreamsVault ? [...project.livestreamsVault] : (data.livestreamsVault ? [...data.livestreamsVault] : []);
    state.rawClipsVault = project.rawClipsVault ? [...project.rawClipsVault] : (data.rawClipsVault ? [...data.rawClipsVault] : []);
    state.sessions = project.sessions ? [...project.sessions] : [];

    // Reset active folder pointers
    state.activeDriveFolderId = 'folder_all';
    state.activeModelFolderId = 'model_all';
    state.activeSessionId = state.sessions.length > 0 ? state.sessions[0].id : null;

    updateTopbarProjectDisplay();
    closeProjectDropdown();

    // Re-render Vaults
    renderDriveFolders();
    renderDriveFiles();
    renderModelFolderPills();
    renderModelFolderView();
    renderScriptFolderPills();
    renderScriptsVault();
    renderHooksVault();
    renderContentKitsStage('all');
    renderBgmVault('all');
    renderLivestreamsVault();
    renderRawClipsVault();
    renderLivestreamStage();

    // Re-populate Module 1 Selectors (Dựng Video Từ Ảnh)
    updatePipelineFolderSelect();
    const productFoldersOnly = (state.productFolders || []).filter(f => f.id !== 'folder_all');
    if (productFoldersOnly.length > 0) {
      updateEngineSkuInfoBox(productFoldersOnly[0].id);
      renderPackshotsForSelectedFolder(productFoldersOnly[0].id);
    }

    // Repopulate Hooks
    if (DOM.img2vidHookSelect) {
      DOM.img2vidHookSelect.innerHTML = (state.hooks || []).map((h, i) => `
        <option value="${h.id}">${i + 1}. "${h.hookText}" (${h.type})</option>
      `).join('');
    }

    // Repopulate Scripts
    if (DOM.img2vidScriptSelect) {
      DOM.img2vidScriptSelect.innerHTML = (state.scripts || []).map((s, i) => `
        <option value="${s.id}">${i + 1}. ${s.title} (${s.group})</option>
      `).join('');
    }

    // Repopulate Models
    if (DOM.img2vidModelFolderSelect) {
      updatePipelineModelFolderSelect();
    }

    // Refresh Sessions UI
    renderSessionsDropdown();
    loadActiveSessionData();

    showToast(`✓ Đã chuyển sang Dự Án: ${project.name} (${project.category})`, 'success');
  }

  function setupSessionManagement() {
    renderSessionsDropdown();
    loadActiveSessionData();

    // Change Session
    if (DOM.activeSessionSelect) {
      DOM.activeSessionSelect.addEventListener('change', () => {
        state.activeSessionId = DOM.activeSessionSelect.value;
        loadActiveSessionData();
        const curSession = state.sessions.find(s => s.id === state.activeSessionId);
        showToast(`Đã chuyển sang phiên prompt: ${curSession?.title || 'Session'}`, 'info');
      });
    }

    // Toggle Prompt History Drawer
    if (DOM.btnTogglePromptHistory && DOM.sessionPromptHistoryDrawer) {
      DOM.btnTogglePromptHistory.addEventListener('click', () => {
        const isHidden = DOM.sessionPromptHistoryDrawer.style.display === 'none';
        DOM.sessionPromptHistoryDrawer.style.display = isHidden ? 'block' : 'none';
        if (isHidden) renderSessionRunsList();
      });
    }

    if (DOM.btnClosePromptHistory && DOM.sessionPromptHistoryDrawer) {
      DOM.btnClosePromptHistory.addEventListener('click', () => {
        DOM.sessionPromptHistoryDrawer.style.display = 'none';
      });
    }

    // Create New Session (Todo 20 Item 11: Bấm vào xóa sạch prompt cũ, bắt đầu session mới ngay)
    function startNewPromptSession(customTitle) {
      const title = customTitle || `Session ${state.sessions.length + 1}: Phiên Mới`;
      const projects = window.PROTOTYPE_PROJECTS || [];
      const currentProject = projects.find(p => p.id === state.activeProjectId);

      const newSess = {
        id: 'sess_' + Date.now(),
        title: title,
        type: 'img2vid',
        typeLabel: 'Dựng từ ảnh',
        createdAt: 'Hôm nay ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        status: 'in_progress',
        folderId: DOM.img2vidFolderSelect ? DOM.img2vidFolderSelect.value : '',
        modelFolderId: DOM.img2vidModelFolderSelect ? DOM.img2vidModelFolderSelect.value : '',
        promptText: '',
        iterations: []
      };

      if (currentProject) {
        if (!currentProject.sessions) currentProject.sessions = [];
        currentProject.sessions.unshift(newSess);
      }
      state.sessions.unshift(newSess);
      state.activeSessionId = newSess.id;

      // 1. Xóa sạch prompt cũ khỏi ô nhập liệu
      if (DOM.img2vidPromptInput) {
        DOM.img2vidPromptInput.value = '';
        DOM.img2vidPromptInput.placeholder = 'Nhập câu lệnh prompt mới cho phiên này...';
        DOM.img2vidPromptInput.focus();
      }

      // 2. Reset màn hình render về Standby
      if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'block';
      if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.style.display = 'none';
      if (DOM.cstageEngineVideo) {
        DOM.cstageEngineVideo.pause();
        DOM.cstageEngineVideo.removeAttribute('src');
      }
      if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'none';
      if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'none';
      const postActions = document.getElementById('engine-post-render-actions');
      if (postActions) postActions.style.display = 'none';

      // 3. Cập nhật dropdown & lịch sử
      renderSessionsDropdown();
      renderSessionRunsList();

      if (DOM.modalCreateSession) DOM.modalCreateSession.style.display = 'none';
      showToast(`✓ Đã bắt đầu ${newSess.title}. Prompt cũ đã được xóa sạch để tạo mới!`, 'success');
    }

    if (DOM.btnCreateNewSession) {
      DOM.btnCreateNewSession.addEventListener('click', () => {
        startNewPromptSession();
      });
    }

    // Submit Create New Session from Modal (nếu người dùng dùng modal)
    if (DOM.btnSubmitCreateSession) {
      DOM.btnSubmitCreateSession.addEventListener('click', () => {
        const title = DOM.newSessionTitle ? DOM.newSessionTitle.value.trim() : '';
        startNewPromptSession(title);
      });
    }
  }

  function renderSessionsDropdown() {
    if (!DOM.activeSessionSelect) return;
    const sessions = state.sessions || [];

    DOM.activeSessionSelect.innerHTML = sessions.map(s => `
      <option value="${s.id}" ${s.id === state.activeSessionId ? 'selected' : ''}>
        ${escapeHtml(s.title)}
      </option>
    `).join('');

    const activeSession = sessions.find(s => s.id === state.activeSessionId) || sessions[0];
    const runsCount = activeSession && activeSession.iterations ? activeSession.iterations.length : 0;
    if (DOM.sessionRunCount) DOM.sessionRunCount.textContent = runsCount;

    if (DOM.sessionStatusBadge) {
      if (activeSession?.status === 'completed') {
        DOM.sessionStatusBadge.textContent = '✓ Hoàn thành';
        DOM.sessionStatusBadge.style.cssText = 'background: var(--color-success-bg); color: var(--color-success); border: 1px solid var(--color-success-border); font-size: 0.68rem; font-weight: 700;';
      } else {
        DOM.sessionStatusBadge.textContent = 'Đang mở';
        DOM.sessionStatusBadge.style.cssText = 'background: var(--xcorp-blue-50); color: var(--xcorp-blue-600); border: 1px solid var(--xcorp-blue-200); font-size: 0.68rem; font-weight: 700;';
      }
    }
  }

  function loadActiveSessionData() {
    const sessions = state.sessions || [];
    const activeSession = sessions.find(s => s.id === state.activeSessionId) || sessions[0];
    if (!activeSession) return;

    // Nạp câu prompt của session này (hoặc xóa sạch nếu session mới)
    if (DOM.img2vidPromptInput) {
      DOM.img2vidPromptInput.value = activeSession.promptText || '';
    }
    if (activeSession.folderId && DOM.img2vidFolderSelect) {
      DOM.img2vidFolderSelect.value = activeSession.folderId;
      updateEngineSkuInfoBox(activeSession.folderId);
      renderPackshotsForSelectedFolder(activeSession.folderId);
    }
    if (activeSession.modelFolderId && DOM.img2vidModelFolderSelect) {
      DOM.img2vidModelFolderSelect.value = activeSession.modelFolderId;
    }
    if (activeSession.hookId && DOM.img2vidHookSelect) {
      DOM.img2vidHookSelect.value = activeSession.hookId;
    }
    if (activeSession.scriptId && DOM.img2vidScriptSelect) {
      DOM.img2vidScriptSelect.value = activeSession.scriptId;
    }

    // Reset hoặc nạp preview video tương ứng theo session
    if (!activeSession.iterations || activeSession.iterations.length === 0) {
      if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'block';
      if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.style.display = 'none';
      if (DOM.cstageEngineVideo) {
        DOM.cstageEngineVideo.pause();
        DOM.cstageEngineVideo.removeAttribute('src');
      }
      if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'none';
      if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'none';
      const postActions = document.getElementById('engine-post-render-actions');
      if (postActions) postActions.style.display = 'none';
    } else {
      const lastIter = activeSession.iterations[0];
      if (lastIter && DOM.cstageEngineVideo) {
        DOM.cstageEngineVideo.src = lastIter.previewUrl || 'media/video/final_final.mp4';
        if (DOM.engineStandbyScreen) DOM.engineStandbyScreen.style.display = 'none';
        if (DOM.engineRenderOverlay) DOM.engineRenderOverlay.style.display = 'none';
        if (DOM.engineBrollPackshot) DOM.engineBrollPackshot.style.display = 'block';
        if (DOM.engineBrandBadge) DOM.engineBrandBadge.style.display = 'flex';
        const postActions = document.getElementById('engine-post-render-actions');
        if (postActions) postActions.style.display = 'block';
      }
    }

    if (DOM.drawerSessionName) DOM.drawerSessionName.textContent = activeSession.title;
    renderSessionRunsList();
  }

  function renderSessionRunsList() {
    if (!DOM.sessionRunsContainer) return;
    const sessions = state.sessions || [];
    const activeSession = sessions.find(s => s.id === state.activeSessionId) || sessions[0];

    if (!activeSession || !activeSession.iterations || activeSession.iterations.length === 0) {
      DOM.sessionRunsContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); font-size: 0.76rem; padding: 1rem; background: var(--bg-surface); border-radius: 6px; border: 1px dashed var(--border-default);">
          Chưa có lần chạy prompt nào trong phiên này. Hãy nhập Prompt ở Bước 1 và bấm <strong>"TẠO VIDEO"</strong> để lưu lần chạy đầu tiên.
        </div>
      `;
      return;
    }

    DOM.sessionRunsContainer.innerHTML = activeSession.iterations.map((iter, idx) => `
      <div class="history-run-card ${iter.status === 'approved' ? 'approved' : ''}">
        <div class="history-run-meta">
          <div class="history-run-version-row">
            <span class="history-run-version">${iter.version || `Run #${idx + 1}`}</span>
            <span class="history-run-time">${iter.time || '10:00'}</span>
            ${iter.status === 'approved' ? `<span class="badge-tag" style="background: var(--color-success); color: #fff; font-size: 0.62rem; font-weight: 700; padding: 1px 5px;">Thành Phẩm ⭐</span>` : ''}
          </div>
          <div class="history-run-prompt-snippet" title="${iter.prompt || ''}">
            "${iter.prompt || 'Prompt mô tả...'}"
          </div>
          ${iter.notes ? `<div class="history-run-notes">${iter.notes}</div>` : ''}
        </div>
        <div class="history-run-actions">
          <button class="btn btn-secondary btn-sm btn-preview-run" data-video-url="${iter.previewUrl || 'media/video/final_final.mp4'}" data-prompt="${encodeURIComponent(iter.prompt || '')}" style="padding: 3px 8px; font-size: 0.72rem;">
            ${ICONS.play} Xem Lại
          </button>
          <button class="btn btn-ghost btn-sm btn-reuse-prompt" data-prompt="${encodeURIComponent(iter.prompt || '')}" style="padding: 3px 8px; font-size: 0.72rem;" title="Nạp lại câu prompt này vào ô nhập">
            ${ICONS.copy} Nạp Lại
          </button>
        </div>
      </div>
    `).join('');

    // Attach Preview buttons
    DOM.sessionRunsContainer.querySelectorAll('.btn-preview-run').forEach(btn => {
      btn.addEventListener('click', () => {
        const vUrl = btn.getAttribute('data-video-url');
        const pText = decodeURIComponent(btn.getAttribute('data-prompt') || '');
        openVideoPreviewModal({
          title: `${activeSession.title} - Lịch Sử Run`,
          videoSrc: vUrl,
          caption: pText
        });
      });
    });

    // Attach Reuse prompt buttons
    DOM.sessionRunsContainer.querySelectorAll('.btn-reuse-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptText = decodeURIComponent(btn.getAttribute('data-prompt') || '');
        if (DOM.img2vidPromptInput && promptText) {
          DOM.img2vidPromptInput.value = promptText;
          DOM.img2vidPromptInput.focus();
          showToast('Đã nạp lại câu prompt vào ô nhập liệu!', 'info');
        }
      });
    });
  }

  function recordPromptRunToActiveSession(promptText, previewUrl) {
    const sessions = state.sessions || [];
    const activeSession = sessions.find(s => s.id === state.activeSessionId) || sessions[0];
    if (!activeSession) return;

    if (!activeSession.iterations) activeSession.iterations = [];
    const runNum = activeSession.iterations.length + 1;
    const nowTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    activeSession.iterations.unshift({
      version: `Run #${runNum}`,
      time: nowTime,
      prompt: promptText || 'Làm video sản phẩm AI TikTok',
      previewUrl: previewUrl || 'media/video/final_final.mp4',
      status: 'approved',
      notes: 'Đạt chuẩn 9:16 - Đã render hoàn tất ⭐'
    });

    activeSession.promptText = promptText;
    activeSession.status = 'completed';

    renderSessionsDropdown();
    renderSessionRunsList();
  }

  function setupProjectHubModal() {
    // Open project hub modal
    window.openProjectHubModal = function () {
      if (!DOM.modalProjectHub) return;
      DOM.modalProjectHub.style.display = 'flex';
      renderProjectHubCards();
    };

    // Submit Create Project
    if (DOM.btnSubmitCreateProject) {
      DOM.btnSubmitCreateProject.addEventListener('click', () => {
        const name = DOM.newProjectName ? DOM.newProjectName.value.trim() : '';
        const cat = DOM.newProjectCategory ? DOM.newProjectCategory.value : 'F&B & Đồ Ăn Vặt';
        const desc = DOM.newProjectDesc ? DOM.newProjectDesc.value.trim() : '';

        if (!name) {
          showToast('Vui lòng nhập tên Dự Án / Nhãn Hàng mới!', 'warning');
          return;
        }

        const iconsMap = {
          'F&B & Đồ Ăn Vặt': '🍔',
          'Mỹ Phẩm & Skincare': '💄',
          'Thời Trang & Phụ Kiện': '👗',
          'Gia Dụng & Đời Sống': '🏠',
          'Mẹ & Bé': '🍼',
          'Khác': '✨'
        };

        const newProjId = 'proj_' + Date.now();
        const newProj = {
          id: newProjId,
          name: name,
          shortName: name,
          category: cat,
          categoryBadge: cat,
          icon: iconsMap[cat] || '✨',
          description: desc || `Dự án lĩnh vực ${cat}`,
          stats: { completedVideos: 0, sessionsCount: 1, skusCount: 0 },
          brand: {
            name: name.toUpperCase(),
            tagline: `Kênh TikTok chuyên nghiệp về ${cat}`,
            policy: 'Brand Safety: Bảo vệ hình ảnh và thông điệp thương hiệu',
            skus: []
          },
          faceLibrary: [],
          modelVault: { modelFolders: [{ id: 'model_all', name: 'Tất Cả Model', isPublic: true }] },
          assetVault: { productFolders: [{ id: 'folder_all', name: 'Tất Cả Thư Mục', isPublic: true }], driveFiles: [] },
          angleVault: { scripts: [] },
          trendingHookVault: [],
          contentKits: [],
          livestreamSession: { id: 'LIVE_NEW', title: `Livestream ${name}`, duration: '00:00:00', goldenMoments: [] },
          sessions: [
            {
              id: 'sess_' + Date.now(),
              title: 'Session 1: Phiên Prompt Khởi Đầu',
              type: 'img2vid',
              typeLabel: 'Dựng từ ảnh',
              createdAt: 'Hôm nay ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              status: 'in_progress',
              promptText: '',
              iterations: []
            }
          ]
        };

        if (!window.PROTOTYPE_PROJECTS) window.PROTOTYPE_PROJECTS = [];
        window.PROTOTYPE_PROJECTS.push(newProj);

        if (DOM.newProjectName) DOM.newProjectName.value = '';
        if (DOM.newProjectDesc) DOM.newProjectDesc.value = '';

        if (DOM.modalProjectHub) DOM.modalProjectHub.style.display = 'none';
        switchProject(newProjId);
        showToast(`✓ Đã tạo thành công Dự Án mới: ${name}!`, 'success');
      });
    }
  }

  function renderProjectHubCards() {
    if (!DOM.projectHubCardsContainer) return;
    const projects = window.PROTOTYPE_PROJECTS || [];

    DOM.projectHubCardsContainer.innerHTML = projects.map(p => `
      <div class="project-hub-card ${p.id === state.activeProjectId ? 'active' : ''}" data-hub-project-id="${p.id}">
        <div class="project-hub-card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="project-hub-icon">${p.icon}</span>
            ${p.id === state.activeProjectId ? `<span class="badge-tag" style="background: var(--xcorp-blue-500); color: #fff; font-weight: 700; font-size: 0.65rem;">ĐANG HOẠT ĐỘNG</span>` : ''}
          </div>
          <button class="btn-hub-edit-project" data-hub-edit-id="${p.id}" title="Sửa tên và mô tả dự án" type="button"
            style="border: 1px solid var(--border-default); background: var(--bg-surface); padding: 2px 7px; border-radius: 4px; font-size: 0.72rem; color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; gap: 3px;">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Sửa</span>
          </button>
        </div>
        <div class="project-hub-name">${escapeHtml(p.name)}</div>
        <div class="project-hub-desc">${escapeHtml(p.description)}</div>
        <div class="project-hub-stats-row">
          <div class="project-hub-stat-item">
            <span>SKU:</span>
            <span class="project-hub-stat-num">${(p.assetVault?.productFolders || []).filter(f => f.id !== 'folder_all').length}</span>
          </div>
          <div class="project-hub-stat-item">
            <span>Sessions:</span>
            <span class="project-hub-stat-num">${p.sessions ? p.sessions.length : 0}</span>
          </div>
          <div class="project-hub-stat-item">
            <span>Video Hoàn Thiện:</span>
            <span class="project-hub-stat-num" style="color: var(--color-success);">${p.contentKits ? p.contentKits.length : 0}</span>
          </div>
        </div>
        <div style="margin-top: 0.75rem;">
          <button class="btn ${p.id === state.activeProjectId ? 'btn-primary' : 'btn-secondary'} btn-sm" style="width: 100%; justify-content: center;">
            ${p.id === state.activeProjectId ? '✓ Đang Trong Dự Án Này' : 'Chuyển Vùng Làm Việc ➔'}
          </button>
        </div>
      </div>
    `).join('');

    DOM.projectHubCardsContainer.querySelectorAll('.btn-hub-edit-project').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-hub-edit-id');
        if (pId) openEditProjectModal(pId);
      });
    });

    DOM.projectHubCardsContainer.querySelectorAll('[data-hub-project-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-hub-edit-project')) return;
        const pId = card.getAttribute('data-hub-project-id');
        if (pId) {
          if (DOM.modalProjectHub) DOM.modalProjectHub.style.display = 'none';
          switchProject(pId);
        }
      });
    });
  }

  function setupSpotlightSearch() {
    const searchInput = document.getElementById('topbar-quick-search');
    if (!searchInput) return;

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return;

      if (q.includes('hook') || q.includes('giật tít')) {
        switchPanel('panel-vault-hooks');
      } else if (q.includes('kịch bản') || q.includes('script')) {
        switchPanel('panel-vault-angles');
      } else if (q.includes('sản phẩm') || q.includes('serum') || q.includes('kem')) {
        switchPanel('panel-vault-assets');
      } else if (q.includes('model') || q.includes('mẫu')) {
        switchPanel('panel-vault-models');
      } else if (q.includes('video') || q.includes('hoàn thiện')) {
        switchPanel('panel-projects-hub');
      }
    });
  }

/* ==========================================================================
     MODULE: STUDIO HUB & PROJECT-CENTRIC HUB (TO-BE ARCHITECTURE)
     Matching User Uploaded Image 1 (HeyGen Projects Layout) & Image 2 (Card)
     ========================================================================== */
  let currentProjectFolder = 'all';
  let currentProjectCoreCategory = 'all';
  let currentProjectSearch = '';
  let currentProjectStatus = 'all';
  let activeModalProject = null;

  function setupHomeHubHandlers() {
    // Launch Core 1: Livestream to Shorts
    const btnLaunchLive = document.getElementById('home-btn-launch-live');
    if (btnLaunchLive) {
      btnLaunchLive.addEventListener('click', () => {
        switchPanel('panel-livestream');
      });
    }

    // Launch Core 2: Image to Video
    const btnLaunchImg2Vid = document.getElementById('home-btn-launch-img2vid');
    if (btnLaunchImg2Vid) {
      btnLaunchImg2Vid.addEventListener('click', () => {
        switchPanel('panel-multi-engine');
      });
    }

    // Launch Core 3: Raw Video Editor
    const btnLaunchRaw = document.getElementById('home-btn-launch-raw');
    if (btnLaunchRaw) {
      btnLaunchRaw.addEventListener('click', () => {
        switchPanel('panel-raw-editor');
      });
    }

    // View All Projects button
    const btnViewAll = document.getElementById('home-btn-view-all-projects');
    if (btnViewAll) {
      btnViewAll.addEventListener('click', () => {
        switchPanel('panel-projects-hub');
      });
    }
  }

  function renderHomeRecentProjects() {
    const container = document.getElementById('home-recent-projects-grid');
    if (!container || !window.PROTOTYPE_VIDEO_PROJECTS) return;

    const recentProjects = window.PROTOTYPE_VIDEO_PROJECTS.slice(0, 3);
    container.innerHTML = recentProjects.map(p => createProjectCardHTML(p)).join('');
  }

  function setupProjectsHubHandlers() {
    // 1. Core Category Tabs (Matching Image 1: My Projects, Avatar Video, Agent...)
    const catTabs = document.querySelectorAll('#projects-core-category-tabs .projects-cat-tab-underline, #projects-core-category-tabs button');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentProjectCoreCategory = tab.getAttribute('data-core-cat') || 'all';
        renderProjectsCards();
      });
    });

    // 2. Folder Navigation (Left Sub-sidebar)
    const folderAllBtn = document.getElementById('btn-folder-all');
    if (folderAllBtn) {
      folderAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.sub-sidebar-nav-item').forEach(el => el.classList.remove('active'));
        folderAllBtn.classList.add('active');
        currentProjectFolder = 'all';
        if (currentProjectCoreCategory === 'inputs_vault') {
          currentProjectCoreCategory = 'all';
          state.activeProjectCoreCat = 'all';
          document.querySelectorAll('#projects-core-category-tabs .projects-cat-tab-underline').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-core-cat') === 'all');
          });
        }
        renderProjectsCards();
      });
    }

    // 3. Search & Filter
    const searchInput = document.getElementById('projects-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentProjectSearch = e.target.value.toLowerCase().trim();
        renderProjectsCards();
      });
    }

    const statusFilter = document.getElementById('projects-status-filter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        currentProjectStatus = e.target.value;
        renderProjectsCards();
      });
    }

    // 4. Create New Folder Trigger
    const btnNewFolder = document.getElementById('btn-trigger-new-folder-modal');
    const btnFolderShortcut = document.getElementById('btn-create-folder-shortcut');
    const handleNewFolder = () => {
      const folderName = prompt('Nhập tên thư mục dự án mới (ví dụ: FLASH SALE 11/11, CHIẾN DỊCH TẾT...):');
      if (folderName && folderName.trim()) {
        const newId = 'folder_' + Date.now();
        window.PROTOTYPE_PROJECT_FOLDERS.push({
          id: newId,
          name: folderName.trim(),
          count: 0
        });
        renderProjectFoldersTree();
        showToast(`Đã tạo thư mục [${folderName.trim()}]`, 'success');
      }
    };
    if (btnNewFolder) btnNewFolder.addEventListener('click', handleNewFolder);
    if (btnFolderShortcut) btnFolderShortcut.addEventListener('click', handleNewFolder);

    // 5. Create New Project button
    const btnCreateProj = document.getElementById('btn-projects-create-new');
    if (btnCreateProj) {
      btnCreateProj.addEventListener('click', () => {
        const choice = prompt('Chọn loại quy trình muốn tạo dự án:\n1. Cắt Highlight Live (Ưu tiên)\n2. Dựng Video Từ Ảnh Sản Phẩm\n3. Chỉnh Sửa Video Gốc\n(Nhập 1, 2 hoặc 3):', '1');
        if (choice === '1') {
          switchPanel('panel-livestream');
          showToast('Đã mở Studio Cắt Highlight Live để tạo dự án mới', 'info');
        } else if (choice === '2') {
          switchPanel('panel-multi-engine');
          showToast('Đã mở Studio Dựng Video Từ Ảnh', 'info');
        } else if (choice === '3') {
          switchPanel('panel-raw-editor');
          showToast('Đã mở Studio Chỉnh Sửa Video Gốc', 'info');
        }
      });
    }

    // 6. Modal Tab Switching in Project Detail
    const modalTabs = document.querySelectorAll('.project-modal-tab-btn');
    modalTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        modalTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-ptab');
        switchProjectModalTab(tabKey);
      });
    });

    // 7. Modal Open in Studio Button
    const btnModalOpen = document.getElementById('btn-modal-open-in-studio');
    if (btnModalOpen) {
      btnModalOpen.addEventListener('click', () => {
        closeModal('modal-project-detail');
        if (activeModalProject) {
          window.openProjectInStudio(activeModalProject.id);
        }
      });
    }
  }

  function renderProjectsHub() {
    renderProjectFoldersTree();
    renderProjectsCards();
    renderHomeRecentProjects();
  }
  window.renderProjectsHub = renderProjectsHub;

  function renderProjectFoldersTree() {
    const listEl = document.getElementById('project-folders-tree-list');
    if (!listEl || !window.PROTOTYPE_PROJECT_FOLDERS) return;

    // Skip the first "all" folder
    const customFolders = window.PROTOTYPE_PROJECT_FOLDERS.filter(f => f.id !== 'all');
    listEl.innerHTML = customFolders.map(folder => `
      <button class="sub-sidebar-nav-item ${currentProjectFolder === folder.id ? 'active' : ''}" data-folder-id="${folder.id}">
        <span class="sub-sidebar-nav-lead">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          </svg>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px;">${folder.name}</span>
        </span>
        <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">${folder.count}</span>
      </button>
    `).join('');

    // Attach click events
    listEl.querySelectorAll('.sub-sidebar-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.sub-sidebar-nav-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        currentProjectFolder = item.getAttribute('data-folder-id');
        if (currentProjectCoreCategory === 'inputs_vault') {
          currentProjectCoreCategory = 'all';
          state.activeProjectCoreCat = 'all';
          document.querySelectorAll('#projects-core-category-tabs .projects-cat-tab-underline').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-core-cat') === 'all');
          });
        }
        renderProjectsCards();
      });
    });
  }

  let selectedProjectIds = new Set();
  let selectedClipIds = new Set();

  function escapeProjectHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getCoreProductTag(category) {
    if (category === 'image_to_video' || category === 'sku') {
      return 'Ảnh sang video';
    } else if (category === 'raw_edit' || category === 'edit_video') {
      return 'Edit video';
    } else {
      return 'Highlight';
    }
  }

  function createProjectCardHTML(p) {
    const isSelected = selectedProjectIds.has(p.id);
    const creatorName = p.creator || 'LÂM';
    const tag = getCoreProductTag(p.category);
    const timeAgo = p.timeAgo || p.updatedAt || '4 minutes ago';
    const category = p.categoryLabel || 'Instant Highlights';
    const isProcessing = p.isProcessing || (p.statusCode === 'processing' && !p.isCompleted);
    const isRendering = p.isRendering || (isProcessing && !p.thumbnail);
    const progressPercent = typeof p.progress === 'number' ? p.progress : (isProcessing ? 15 : 100);
    const progressText = p.progressLabel || (p.progress ? `${p.progress}% Rendering` : '15% Rendering');

    // Rule: Không hiện thời gian ở ngoài parent card đối với nhãn Highlight!
    const showDurationBadge = (tag !== 'Highlight') && p.duration;

    // Group 2: Tệp cha = Highlight đã hoàn thành
    const isParentFolder = tag === 'Highlight' && (p.isCompleted || p.statusCode === 'completed');
    const parentClipCount = isParentFolder ? (p.clips ? p.clips.length : (p.clipsCount || 0)) : 0;

    // Group 1 & 3: Status pill — bỏ processing pill và bỏ clip count pill trên Highlight
    let statusPillHTML = '';
    if (isProcessing) {
      // Group 1: Bỏ pill khi đang xử lý — chỉ giữ gem+bar bên trong poster
      statusPillHTML = '';
    } else if (isParentFolder) {
      // Group 3: Bỏ hoàn toàn clip count pill trên Highlight completed
      statusPillHTML = '';
    } else if (p.stepLabel) {
      statusPillHTML = `<span class="project-card-status-pill ${p.statusCode === 'completed' ? 'completed' : ''}">${escapeProjectHtml(p.stepLabel)}</span>`;
    }

    return `
      <div class="project-card-item ${isSelected ? 'selected' : ''} ${isProcessing ? 'processing' : ''} ${isParentFolder ? 'is-parent-folder' : ''} ${p.isDriveSaved ? 'is-drive-saved' : ''}" data-project-id="${p.id}">
        <!-- Poster / Preview Container -->
        <div class="project-card-poster-wrap" onclick="window.openProjectWorkflow('${p.id}')">
          ${p.thumbnail ? `
            <img src="${p.thumbnail}" alt="${escapeProjectHtml(p.name)}" class="project-card-poster-img" />
            <div class="project-card-poster-overlay"></div>
          ` : `
            <div class="project-card-gem-backdrop"></div>
          `}

          <!-- Checkbox Top-Left -->
          <div class="project-card-checkbox ${isSelected ? 'checked' : ''}" 
               onclick="event.stopPropagation(); window.toggleProjectSelect('${p.id}', this)" 
               title="Chọn dự án">
            ${isSelected ? `
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ` : ''}
          </div>

          <!-- Drive Saved Status Badge (Lưu Kho Cloud) -->
          ${p.isDriveSaved ? `
            <div class="project-card-drive-badge" title="Đã lưu trên Google Drive (Kho Cloud)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              <span>Đã lưu Drive</span>
            </div>
          ` : ''}

          <!-- Small Workflow Status Pill Top-Right -->
          ${statusPillHTML}

          <!-- 3-Dots More Options Button Top-Right -->
          <button type="button" class="project-card-more-btn" 
                  onclick="event.stopPropagation(); window.toggleProjectMenu('${p.id}', this)" 
                  title="Tùy chọn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2.2"></circle>
              <circle cx="12" cy="12" r="2.2"></circle>
              <circle cx="19" cy="12" r="2.2"></circle>
            </svg>
          </button>

          <!-- Dropdown Context Menu (Chuẩn theo ảnh tham khảo) -->
          <div class="project-card-dropdown" id="project-dropdown-${p.id}" onclick="event.stopPropagation()">
            <div class="project-dropdown-header">Created by ${escapeProjectHtml(creatorName)}</div>
            
            <button type="button" class="project-dropdown-item" onclick="event.stopPropagation(); window.copyProjectId('${p.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy ID</span>
            </button>

            ${p.isDriveSaved ? `
            <button type="button" class="project-dropdown-item" onclick="event.stopPropagation(); window.pullFromDrive('${p.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
              <span>Mở lại phiên làm việc</span>
            </button>
            ` : `
            <button type="button" class="project-dropdown-item" onclick="event.stopPropagation(); window.toggleProjectDriveSave('${p.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              <span>Lưu tất cả vào Drive (Hoàn tất)</span>
            </button>
            `}

            <button type="button" class="project-dropdown-item" onclick="event.stopPropagation(); window.renameProject('${p.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Rename</span>
            </button>

            <button type="button" class="project-dropdown-item" onclick="event.stopPropagation(); window.moveProject('${p.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Move</span>
            </button>

            <button type="button" class="project-dropdown-item trash" onclick="event.stopPropagation(); window.trashProject('${p.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              <span>Trash</span>
            </button>
          </div>

          <!-- Center Content: 3D Iridescent Gem & Progress -->
          ${isRendering || !p.thumbnail ? `
            <div class="project-card-center-preview">
              <svg class="project-card-3d-gem" width="76" height="76" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="gem-top-${p.id}" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#00f5ff"/>
                    <stop offset="100%" stop-color="#00b4d8"/>
                  </linearGradient>
                  <linearGradient id="gem-front-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#d4b4fe"/>
                    <stop offset="45%" stop-color="#f472b6"/>
                    <stop offset="100%" stop-color="#ec4899"/>
                  </linearGradient>
                  <linearGradient id="gem-left-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#a78bfa"/>
                    <stop offset="100%" stop-color="#6366f1"/>
                  </linearGradient>
                  <linearGradient id="gem-edge-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8"/>
                    <stop offset="100%" stop-color="#818cf8"/>
                  </linearGradient>
                  <filter id="gem-glow-${p.id}" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#a855f7" flood-opacity="0.45"/>
                  </filter>
                </defs>
                <g filter="url(#gem-glow-${p.id})">
                  <polygon points="50,14 78,34 50,56 22,34" fill="url(#gem-top-${p.id})" opacity="0.95"/>
                  <polygon points="22,34 50,56 50,86 16,60" fill="url(#gem-left-${p.id})"/>
                  <polygon points="50,56 78,34 84,60 50,86" fill="url(#gem-front-${p.id})"/>
                  <polygon points="78,34 84,60 72,50" fill="url(#gem-edge-${p.id})" opacity="0.75"/>
                  <polygon points="22,34 16,60 28,52" fill="#c084fc" opacity="0.4"/>
                </g>
              </svg>
              <div class="project-card-progress-bar-wrap">
                <div class="project-card-progress-bar-fill" style="width: ${progressPercent}%;"></div>
              </div>
              <div class="project-card-progress-text">${escapeProjectHtml(progressText)}</div>
            </div>
          ` : `
            <div class="project-card-play-hover-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            ${isParentFolder ? `
              <div class="project-card-folder-hover-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div class="project-card-folder-count-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
                ${parentClipCount} clips
              </div>
            ` : ''}
            ${showDurationBadge ? `<span class="project-card-duration-badge">${p.duration}</span>` : ''}
          `}

          <!-- Pill Tag Bottom-Left (3 Core Products) -->
          <span class="project-card-tag-pill">${escapeProjectHtml(tag)}</span>
        </div>

        <!-- Card Body Info -->
        <div class="project-card-body">
          <div class="project-card-title" onclick="window.openProjectWorkflow('${p.id}')" title="${escapeProjectHtml(p.name)}">
            ${escapeProjectHtml(p.name)}
          </div>
          <div class="project-card-meta">
            ${isProcessing ? `
              <span style="color: #f59e0b; font-weight: 600;">${p.progress ? `Đang xử lý ${p.progress}%` : 'Chưa xong'}</span>
            ` : `
              <span>${escapeProjectHtml(timeAgo)}</span>
            `}
            <span class="project-card-meta-dot">•</span>
            <span>${escapeProjectHtml(category)}</span>
            ${p.isDriveSaved ? `
              <span class="project-card-meta-dot">•</span>
              <span style="color: #10b981; font-weight: 600; display: inline-flex; align-items: center; gap: 3px;" title="Dự án đã được lưu trên Google Drive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                Đã lưu Drive
              </span>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // FLOATING SELECTION ACTION BAR STATE SYNC
  function getSelectionContext() {
    if (state.activePanel === 'panel-project-clips') return 'clips';
    if (state.activePanel === 'panel-projects-hub') return 'projects';
    return 'none';
  }

  function updateFloatingSelectionBar() {
    const fsb = document.getElementById('floating-selection-bar');
    const countEl = document.getElementById('fsb-selected-count');
    const selectAllBtn = document.getElementById('fsb-btn-select-all');
    const moveBtn = document.getElementById('fsb-btn-move');
    const driveBtn = document.getElementById('fsb-btn-drive');
    if (!fsb) return;

    const ctx = getSelectionContext();

    if (ctx === 'projects') {
      const count = selectedProjectIds.size;
      if (count > 0) {
        if (countEl) countEl.textContent = `${count} item${count > 1 ? 's' : ''} selected`;
        const totalProjects = (window.PROTOTYPE_VIDEO_PROJECTS || []).length;
        if (selectAllBtn) {
          selectAllBtn.textContent = (count === totalProjects && totalProjects > 0) ? 'Deselect All' : 'Select All';
        }
        if (moveBtn) moveBtn.style.display = 'inline-flex';
        if (driveBtn) driveBtn.style.display = 'inline-flex';
        fsb.style.display = 'flex';
      } else {
        fsb.style.display = 'none';
      }
    } else if (ctx === 'clips') {
      const count = selectedClipIds.size;
      if (count > 0) {
        if (countEl) countEl.textContent = `${count} clip${count > 1 ? 's' : ''} selected`;
        const clips = activeProjectClips ? (getProjectClipsData(activeProjectClips) || []) : [];
        if (selectAllBtn) {
          selectAllBtn.textContent = (count === clips.length && clips.length > 0) ? 'Deselect All' : 'Select All';
        }
        if (moveBtn) moveBtn.style.display = 'none';
        if (driveBtn) driveBtn.style.display = 'inline-flex';
        fsb.style.display = 'flex';
      } else {
        fsb.style.display = 'none';
      }
    } else {
      fsb.style.display = 'none';
    }
  }

  // UNIFIED FLOATING SELECTION ACTION HANDLERS
  window.fsbHandleSelectAll = function() {
    const ctx = getSelectionContext();
    if (ctx === 'clips') {
      const clips = activeProjectClips ? (getProjectClipsData(activeProjectClips) || []) : [];
      if (selectedClipIds.size === clips.length && clips.length > 0) {
        selectedClipIds.clear();
      } else {
        clips.forEach(c => selectedClipIds.add(c.id));
      }
      if (activeProjectClips) renderProjectClipsGrid(activeProjectClips);
      updateFloatingSelectionBar();
      if (typeof showToast === 'function') {
        showToast(selectedClipIds.size > 0 ? `Đã chọn tất cả ${selectedClipIds.size} clip.` : 'Đã bỏ chọn tất cả clip.', 'info');
      }
    } else {
      window.selectAllProjects();
    }
  };

  window.fsbHandleMove = function() {
    const ctx = getSelectionContext();
    if (ctx === 'clips') {
      // Not applicable for clips
    } else {
      window.batchMoveSelectedProjects();
    }
  };

  window.fsbHandleDrive = function() {
    const ctx = getSelectionContext();
    if (ctx === 'clips') {
      if (selectedClipIds.size === 0) return;
      const count = selectedClipIds.size;
      if (activeProjectClips) {
        const clips = getProjectClipsData(activeProjectClips);
        clips.forEach(c => {
          if (selectedClipIds.has(c.id)) {
            c.isDriveSaved = true;
          }
        });
        renderProjectClipsGrid(activeProjectClips);
        setTimeout(() => {
          selectedClipIds.forEach(cId => {
            const card = document.querySelector(`.clip-card-item[onclick*="${cId}"]`);
            if (card) {
              card.classList.add('drive-sync-highlight');
              setTimeout(() => card.classList.remove('drive-sync-highlight'), 1500);
            }
          });
        }, 50);
      }
      if (typeof showToast === 'function') {
        showToast(`Đã lưu ${count} clip đã chọn vào Google Drive thành công!`, 'success');
      }
    } else {
      window.batchDriveSaveSelectedProjects();
    }
  };

  window.fsbHandleDownload = function() {
    const ctx = getSelectionContext();
    if (ctx === 'clips') {
      if (selectedClipIds.size === 0) return;
      if (typeof showToast === 'function') {
        showToast(`Đang đóng gói và tải xuống ${selectedClipIds.size} clip nổi bật đã chọn...`, 'success');
      }
    } else {
      window.batchDownloadSelectedProjects();
    }
  };

  window.fsbHandleDelete = function() {
    const ctx = getSelectionContext();
    if (ctx === 'clips') {
      if (selectedClipIds.size === 0) return;
      if (confirm(`Bạn có chắc chắn muốn xoá ${selectedClipIds.size} clip đã chọn không?`)) {
        const count = selectedClipIds.size;
        if (activeProjectClips) {
          const clips = getProjectClipsData(activeProjectClips);
          activeProjectClips.clips = clips.filter(c => !selectedClipIds.has(c.id));
        }
        selectedClipIds.clear();
        if (activeProjectClips) renderProjectClipsGrid(activeProjectClips);
        updateFloatingSelectionBar();
        if (typeof showToast === 'function') {
          showToast(`Đã xoá ${count} clip thành công.`, 'success');
        }
      }
    } else {
      window.batchDeleteSelectedProjects();
    }
  };

  window.fsbHandleClose = function() {
    const ctx = getSelectionContext();
    if (ctx === 'clips') {
      selectedClipIds.clear();
      if (activeProjectClips) renderProjectClipsGrid(activeProjectClips);
      updateFloatingSelectionBar();
    } else {
      window.clearAllSelectedProjects();
    }
  };

  // GLOBAL PROJECT CARD ACTIONS
  window.toggleProjectSelect = function(projectId, el) {
    if (selectedProjectIds.has(projectId)) {
      selectedProjectIds.delete(projectId);
    } else {
      selectedProjectIds.add(projectId);
    }
    renderProjectsCards();
    updateFloatingSelectionBar();
  };

  window.selectAllProjects = function() {
    const currentList = window.PROTOTYPE_VIDEO_PROJECTS || [];
    if (selectedProjectIds.size === currentList.length && currentList.length > 0) {
      selectedProjectIds.clear();
    } else {
      currentList.forEach(p => selectedProjectIds.add(p.id));
    }
    renderProjectsCards();
    updateFloatingSelectionBar();
    if (typeof showToast === 'function') {
      showToast(selectedProjectIds.size > 0 ? `Đã chọn tất cả ${selectedProjectIds.size} dự án` : 'Đã bỏ chọn tất cả dự án', 'info');
    }
  };

  window.clearAllSelectedProjects = function() {
    selectedProjectIds.clear();
    renderProjectsCards();
    updateFloatingSelectionBar();
  };

  window.batchMoveSelectedProjects = function() {
    if (selectedProjectIds.size === 0) return;
    const folders = (window.PROTOTYPE_PROJECT_FOLDERS || []).filter(f => f.id !== 'all');
    const folderNames = folders.map((f, i) => `${i + 1}. ${f.name}`).join('\n');
    const choice = prompt(`Chọn thư mục để chuyển ${selectedProjectIds.size} dự án đã chọn:\n${folderNames}\n\nNhập số thứ tự thư mục:`);
    const idx = parseInt(choice, 10) - 1;
    if (!isNaN(idx) && folders[idx]) {
      selectedProjectIds.forEach(pId => {
        const prj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === pId);
        if (prj) {
          prj.folderId = folders[idx].id;
          prj.folderName = folders[idx].name;
        }
      });
      const count = selectedProjectIds.size;
      selectedProjectIds.clear();
      renderProjectsCards();
      updateFloatingSelectionBar();
      if (typeof showToast === 'function') {
        showToast(`Đã chuyển ${count} dự án vào thư mục: "${folders[idx].name}"`, 'success');
      }
    }
  };

  window.batchDownloadSelectedProjects = function() {
    if (selectedProjectIds.size === 0) return;
    if (typeof showToast === 'function') {
      showToast(`Đang đóng gói và tải xuống ${selectedProjectIds.size} dự án...`, 'info');
    }
  };

  window.batchDeleteSelectedProjects = function() {
    if (selectedProjectIds.size === 0) return;
    if (confirm(`Bạn có chắc chắn muốn xoá ${selectedProjectIds.size} dự án đã chọn không?`)) {
      const count = selectedProjectIds.size;
      window.PROTOTYPE_VIDEO_PROJECTS = (window.PROTOTYPE_VIDEO_PROJECTS || []).filter(p => !selectedProjectIds.has(p.id));
      selectedProjectIds.clear();
      renderProjectsCards();
      updateFloatingSelectionBar();
      if (typeof showToast === 'function') {
        showToast(`Đã xoá ${count} dự án thành công.`, 'success');
      }
    }
  };

  window.toggleProjectMenu = function(projectId, btn) {
    const dropdown = document.getElementById(`project-dropdown-${projectId}`);
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains('open');
    // Close any other open dropdowns
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));

    if (!isOpen) {
      dropdown.classList.add('open');
    }
  };

  window.copyProjectId = function(projectId) {
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(projectId);
    }
    if (typeof showToast === 'function') {
      showToast(`Đã sao chép ID: ${projectId}`, 'success');
    }
  };

  window.renameProject = function(projectId) {
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    const newName = prompt('Nhập tên mới cho dự án:', proj.name);
    if (newName && newName.trim() && newName.trim() !== proj.name) {
      proj.name = newName.trim();
      renderProjectsCards();
      if (typeof showToast === 'function') {
        showToast(`Đã đổi tên dự án thành: "${proj.name}"`, 'success');
      }
    }
  };

  window.moveProject = function(projectId) {
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    const folders = (window.PROTOTYPE_PROJECT_FOLDERS || []).filter(f => f.id !== 'all');
    const folderNames = folders.map((f, i) => `${i + 1}. ${f.name}`).join('\n');
    const choice = prompt(`Chọn thư mục để di chuyển dự án "${proj.name}":\n${folderNames}\n\nNhập số thứ tự thư mục:`);
    const idx = parseInt(choice, 10) - 1;
    if (!isNaN(idx) && folders[idx]) {
      proj.folderId = folders[idx].id;
      proj.folderName = folders[idx].name;
      renderProjectsCards();
      if (typeof showToast === 'function') {
        showToast(`Đã chuyển dự án vào thư mục: "${folders[idx].name}"`, 'success');
      }
    }
  };

  window.trashProject = function(projectId) {
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    const index = (window.PROTOTYPE_VIDEO_PROJECTS || []).findIndex(p => p.id === projectId);
    if (index !== -1) {
      const removed = window.PROTOTYPE_VIDEO_PROJECTS.splice(index, 1)[0];
      selectedProjectIds.delete(projectId);
      renderProjectsCards();
      if (typeof showToast === 'function') {
        showToast(`Đã chuyển dự án "${removed.name}" vào Thùng rác (Trash)`, 'info');
      }
    }
  };

  // Close menus on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.project-card-dropdown') && !e.target.closest('.project-card-more-btn')) {
      document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    }
  });

  function renderProjectsCards() {
    const grid = document.getElementById('projects-list-grid');
    if (!grid || !window.PROTOTYPE_VIDEO_PROJECTS) return;

    // Check if user is viewing Kho Input (Input Vault)
    if (currentProjectCoreCategory === 'inputs_vault') {
      renderInputVaultCards(grid);
      return;
    }

    let filtered = [...window.PROTOTYPE_VIDEO_PROJECTS];

    // Filter by Folder
    if (currentProjectFolder !== 'all') {
      filtered = filtered.filter(p => p.folderId === currentProjectFolder);
    }

    // Filter by Core Category (3 features)
    if (currentProjectCoreCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentProjectCoreCategory);
    }

    // Filter by Status (including Drive status)
    if (currentProjectStatus === 'drive_saved') {
      filtered = filtered.filter(p => p.isDriveSaved);
    } else if (currentProjectStatus === 'not_drive_saved') {
      filtered = filtered.filter(p => !p.isDriveSaved);
    } else if (currentProjectStatus !== 'all') {
      filtered = filtered.filter(p => p.statusCode === currentProjectStatus);
    }

    // Filter by Search Query
    if (currentProjectSearch) {
      filtered = filtered.filter(p => {
        const fullStr = `${p.name} ${p.categoryLabel} ${p.streamer || ''} ${p.folderName || ''}`.toLowerCase();
        return fullStr.includes(currentProjectSearch);
      });
    }

    // Update timeline heading
    const timelineHeading = document.getElementById('projects-timeline-heading');
    if (timelineHeading) {
      if (currentProjectStatus === 'drive_saved') {
        timelineHeading.textContent = `DỰ ÁN ĐÃ LƯU TRÊN GOOGLE DRIVE (KHO CLOUD) • ${filtered.length} DỰ ÁN`;
      } else if (currentProjectStatus === 'not_drive_saved') {
        timelineHeading.textContent = `DỰ ÁN CHƯA LƯU DRIVE • ${filtered.length} DỰ ÁN`;
      } else {
        timelineHeading.textContent = 'GẦN ĐÂY / TODAY';
      }
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3.5rem 1rem; text-align: center; color: var(--text-muted);">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; opacity: 0.5;">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Không tìm thấy dự án phù hợp</div>
          <div style="font-size: 0.8rem;">Thử thay đổi bộ lọc hoặc bấm "+ Tạo Dự Án Mới" để bắt đầu quy trình làm video.</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => createProjectCardHTML(p)).join('');
  }

  // RENDER KHO INPUT (INPUT VAULT: NƠI LƯU NHỮNG INPUT ĐẦU MÀ USER ĐÃ TẢI LÊN)
  function renderInputVaultCards(grid) {
    let items = [...(window.PROTOTYPE_INPUT_VAULT || [])];

    // Status filter
    if (currentProjectStatus === 'drive_saved') {
      items = items.filter(i => i.isDriveSaved);
    } else if (currentProjectStatus === 'not_drive_saved') {
      items = items.filter(i => !i.isDriveSaved);
    }

    // Search query filter
    if (currentProjectSearch) {
      items = items.filter(i => {
        const fullStr = `${i.name || ''} ${i.title || ''} ${i.typeLabel || ''} ${i.uploadedBy || ''} ${i.associatedProjectName || ''} ${i.relatedProjectName || ''} ${i.format || ''} ${i.resolution || ''}`.toLowerCase();
        return fullStr.includes(currentProjectSearch);
      });
    }

    // Update timeline heading
    const timelineHeading = document.getElementById('projects-timeline-heading');
    if (timelineHeading) {
      timelineHeading.textContent = `KHO TƯ LIỆU ĐẦU VÀO (INPUT VAULT) • ${items.length} FILE NGUỒN`;
    }

    const bannerHTML = `
      <div class="input-vault-header-banner" style="grid-column: 1 / -1;">
        <div>
          <div class="input-vault-banner-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: #0284c7;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span>Kho Tư Liệu (Input Vault)</span>
          </div>
          <div class="input-vault-banner-desc">
            Video gốc, footage & ảnh SKU sẵn sàng đưa vào studio dựng video.
          </div>
        </div>
        <div class="input-vault-banner-actions">
          <button class="btn btn-primary btn-sm" onclick="window.uploadNewInputSource()" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; padding: 7px 14px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
            <span>+ Tải Lên Tư Liệu</span>
          </button>
        </div>
      </div>
    `;

    if (items.length === 0) {
      grid.innerHTML = bannerHTML + `
        <div style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.5rem; opacity: 0.5;">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Chưa có file tư liệu đầu vào</div>
          <div style="font-size: 0.78rem;">Bấm "+ Tải Lên Tư Liệu" để thêm footage hoặc bộ ảnh sản phẩm.</div>
        </div>
      `;
      return;
    }

    const cardsHTML = items.map(item => {
      const fileSize = item.size || item.fileSize || '1.2 GB';
      const fileFormat = item.resolution || item.format || '1080p';

      return `
      <div class="input-vault-card" data-input-id="${item.id}">
        <!-- Poster Thumbnail -->
        <div class="input-vault-poster-wrap">
          <img src="${item.thumbnail}" alt="${escapeProjectHtml(item.name)}" class="input-vault-poster-img" />
          <div class="input-vault-poster-overlay"></div>

          <!-- Type Badge Bottom-Left -->
          <span class="input-vault-type-badge">${escapeProjectHtml(item.typeLabel || 'Tư Liệu')}</span>

          <!-- Duration / Quantity Badge Top-Right -->
          <span class="input-vault-meta-badge">${item.duration || fileFormat}</span>

          <!-- Drive Status Badge Top-Left -->
          ${item.isDriveSaved ? `
            <div class="project-card-drive-badge" title="Đã lưu an toàn trên Google Drive (Kho Cloud)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              <span>Đã lưu Drive</span>
            </div>
          ` : ''}
        </div>

        <!-- Body Info -->
        <div class="input-vault-body">
          <div class="input-vault-title" title="${escapeProjectHtml(item.name)}">
            ${escapeProjectHtml(item.name)}
          </div>

          <div class="input-vault-subtitle">
            <span style="font-weight: 600; color: var(--text-main);">${fileSize}</span>
            <span>•</span>
            <span>${escapeProjectHtml(fileFormat)}</span>
            <span>•</span>
            <span>${escapeProjectHtml(item.uploadedAt)}</span>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="input-vault-actions-row">
            <button type="button" class="btn btn-sm ${item.isDriveSaved ? 'btn-outline-secondary' : 'btn-outline-primary'}"
                    onclick="window.toggleInputDriveSave('${item.id}')"
                    title="${item.isDriveSaved ? 'Gỡ file khỏi Google Drive' : 'Lưu trữ sao lưu file lên Google Drive'}"
                    style="font-size: 0.78rem; display: inline-flex; align-items: center; gap: 5px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
              <span>${item.isDriveSaved ? 'Bỏ lưu Drive' : 'Lưu Drive'}</span>
            </button>
            <button type="button" class="btn btn-primary btn-sm"
                    onclick="window.useInputInStudio('${item.id}')"
                    style="font-size: 0.78rem; margin-left: auto; display: inline-flex; align-items: center; gap: 5px;">
              <span>Dựng Video</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
    }).join('');

    grid.innerHTML = bannerHTML + cardsHTML;
  }

  // GLOBAL PROJECT DRIVE TOGGLE ACTION (LƯU DRIVE / HOÀN TẤT PHIÊN)
  window.toggleProjectDriveSave = function(projectId) {
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    proj.isDriveSaved = !proj.isDriveSaved;
    if (proj.clips) {
      proj.clips.forEach(c => { c.isDriveSaved = proj.isDriveSaved; });
    }
    renderProjectsCards();

    // Re-render clips session button & grid if active
    if (activeProjectClips && activeProjectClips.id === projectId) {
      if (typeof renderClipsSessionButton === 'function') {
        renderClipsSessionButton(proj);
      }
      if (typeof renderProjectClipsGrid === 'function') {
        renderProjectClipsGrid(proj);
      }
      if (proj.isDriveSaved) {
        // Trigger highlight animation on all child clip cards!
        setTimeout(() => {
          document.querySelectorAll('.clip-card-item').forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('drive-sync-highlight');
              setTimeout(() => card.classList.remove('drive-sync-highlight'), 1500);
            }, idx * 50);
          });
        }, 60);
      }
    }

    if (typeof showToast === 'function') {
      if (proj.isDriveSaved) {
        showToast(`Đã lưu toàn bộ ${proj.clips ? proj.clips.length : 8} clip của "${proj.name}" vào Google Drive (Hoàn tất phiên)`, 'success');
      } else {
        showToast(`Đã mở lại phiên làm việc cho "${proj.name}"`, 'info');
      }
    }
  };

  // Group 4c: Mở lại phiên làm việc từ Drive → unlock edit clip
  window.pullFromDrive = function(projectId) {
    document.querySelectorAll('.project-card-dropdown.open').forEach(dd => dd.classList.remove('open'));
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    if (!proj.isDriveSaved) {
      if (typeof showToast === 'function') {
        showToast('Phiên làm việc này đang hoạt động bình thường.', 'info');
      }
      return;
    }

    // Reopen session: remove drive lock
    proj.isDriveSaved = false;
    if (proj.clips) {
      proj.clips.forEach(c => { c.isDriveSaved = false; });
    }
    renderProjectsCards();

    // Update clips panel session button & grid
    if (typeof renderClipsSessionButton === 'function') {
      renderClipsSessionButton(proj);
    }
    if (typeof renderProjectClipsGrid === 'function' && activeProjectClips && activeProjectClips.id === projectId) {
      renderProjectClipsGrid(proj);
    }

    // Update mini editor locked overlay in clip detail if open
    const lockedOverlay = document.getElementById('clip-mini-editor-locked-overlay');
    if (lockedOverlay) lockedOverlay.style.display = 'none';
    const miniEditorBody = document.getElementById('clip-mini-editor-body-inner');
    if (miniEditorBody) {
      miniEditorBody.style.pointerEvents = 'auto';
      miniEditorBody.style.opacity = '1';
    }

    if (typeof showToast === 'function') {
      showToast(`Đã mở lại phiên làm việc cho "${proj.name}" — sẵn sàng chỉnh sửa clip!`, 'success');
    }
  };

  // GLOBAL BATCH DRIVE SAVE FOR SELECTED PROJECTS
  window.batchDriveSaveSelectedProjects = function() {
    if (selectedProjectIds.size === 0) return;
    let count = 0;
    selectedProjectIds.forEach(pId => {
      const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === pId);
      if (proj && !proj.isDriveSaved) {
        proj.isDriveSaved = true;
        count++;
      }
    });
    renderProjectsCards();
    updateFloatingSelectionBar();
    if (typeof showToast === 'function') {
      showToast(`Đã lưu thành công ${selectedProjectIds.size} dự án vào Google Drive (Kho Cloud)`, 'success');
    }
  };

  // GLOBAL INPUT VAULT DRIVE TOGGLE ACTION
  window.toggleInputDriveSave = function(inputId) {
    const item = (window.PROTOTYPE_INPUT_VAULT || []).find(i => i.id === inputId);
    if (!item) return;

    item.isDriveSaved = !item.isDriveSaved;
    renderProjectsCards();
    if (typeof showToast === 'function') {
      if (item.isDriveSaved) {
        showToast(`Đã đồng bộ file nguồn "${item.name}" lên Google Drive (Kho Cloud)`, 'success');
      } else {
        showToast(`Đã gỡ file nguồn "${item.name}" khỏi Google Drive`, 'info');
      }
    }
  };

  // GLOBAL UPLOAD NEW INPUT SOURCE
  window.uploadNewInputSource = function() {
    const fileName = prompt('Nhập tên file tư liệu nguồn muốn tải lên vào Kho Input:\n(Ví dụ: livestream_session_2010.mp4, broll_serum_cica.mov, packshot_sku_box.zip):', `raw_recording_${Date.now().toString().slice(-4)}.mp4`);
    if (!fileName || !fileName.trim()) return;

    const trimmed = fileName.trim();
    const isZip = trimmed.endsWith('.zip') || trimmed.endsWith('.png');
    const isAudio = trimmed.endsWith('.mp3') || trimmed.endsWith('.wav');

    const newItem = {
      id: 'INPUT_' + Date.now(),
      name: trimmed,
      type: isZip ? 'image_packshot' : (isAudio ? 'audio' : 'video_stream'),
      typeLabel: isZip ? 'Packshot SKU' : (isAudio ? 'Audio/Voiceover' : 'Livestream Video'),
      categoryBadge: 'Mới Tải Lên',
      duration: isZip ? '6 Ảnh HD' : '01:15:00',
      fileSize: isAudio ? '35 MB' : (isZip ? '55 MB' : '1.8 GB'),
      uploadedAt: 'Vừa xong',
      uploadedBy: 'Lâm Admin',
      thumbnail: isAudio ? 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      relatedProjectName: '',
      relatedProjectId: '',
      format: isAudio ? 'MP3 • 320kbps' : (isZip ? 'ZIP • PNG' : 'MP4 • 1080p60'),
      isDriveSaved: true,
      driveUrl: 'https://drive.google.com/drive/folders/xcorp_vault_input',
      sourceChannel: 'Tải lên trực tiếp'
    };

    if (!window.PROTOTYPE_INPUT_VAULT) window.PROTOTYPE_INPUT_VAULT = [];
    window.PROTOTYPE_INPUT_VAULT.unshift(newItem);

    // Update count badge
    const badgeEl = document.getElementById('folder-count-inputs');
    if (badgeEl) badgeEl.textContent = window.PROTOTYPE_INPUT_VAULT.length;

    renderProjectsCards();
    if (typeof showToast === 'function') {
      showToast(`Đã tải lên file nguồn "${newItem.name}" và tự động lưu vào Google Drive`, 'success');
    }
  };

  // GLOBAL USE INPUT IN STUDIO ROUTER
  window.useInputInStudio = function(inputId) {
    const item = (window.PROTOTYPE_INPUT_VAULT || []).find(i => i.id === inputId);
    if (!item) return;

    if (item.type === 'video_stream') {
      switchPanel('panel-livestream');
      if (typeof showToast === 'function') {
        showToast(`Đã đưa file [${item.name}] vào Studio Cắt Highlight Live`, 'success');
      }
    } else if (item.type === 'image_packshot') {
      switchPanel('panel-multi-engine');
      if (typeof showToast === 'function') {
        showToast(`Đã đưa file [${item.name}] vào Studio Dựng Video Từ Ảnh`, 'success');
      }
    } else {
      switchPanel('panel-raw-editor');
      if (typeof showToast === 'function') {
        showToast(`Đã đưa file [${item.name}] vào Studio Chỉnh Sửa Video Gốc`, 'success');
      }
    }
  };

  // GLOBAL HELPER: OPEN PROJECT DIRECTLY IN STUDIO
  window.openProjectInStudio = function(projectId) {
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    if (proj.category === 'livestream') {
      switchPanel('panel-livestream');
      showToast(`Đã mở dự án [${proj.name}] trong Studio Cắt Highlight Live`, 'success');
    } else if (proj.category === 'image_to_video') {
      switchPanel('panel-multi-engine');
      showToast(`Đã mở dự án [${proj.name}] trong Studio Dựng Video Từ Ảnh`, 'success');
    } else if (proj.category === 'raw_edit') {
      switchPanel('panel-raw-editor');
      showToast(`Đã mở dự án [${proj.name}] trong Studio Chỉnh Sửa Video Gốc`, 'success');
    }
  };

  // GLOBAL HELPER: VIEW PROJECT DETAILS MODAL
  window.viewProjectDetails = function(projectId, defaultTab = 'finished') {
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    activeModalProject = proj;

    // Header info
    const titleEl = document.getElementById('modal-prj-title');
    const badgeEl = document.getElementById('modal-prj-type-badge');
    const statusLineEl = document.getElementById('modal-prj-status-line');
    const finishedCountEl = document.getElementById('modal-prj-finished-count');
    const rawCountEl = document.getElementById('modal-prj-raw-count');

    if (titleEl) titleEl.textContent = proj.name;
    if (badgeEl) {
      badgeEl.textContent = proj.categoryLabel;
      badgeEl.style.color = proj.categoryBadgeColor || 'var(--xcorp-blue-600)';
    }
    if (statusLineEl) {
      statusLineEl.textContent = `Thư mục: ${proj.folderName || 'Chung'} • Trạng thái: ${proj.status} • Cập nhật gần nhất: ${proj.updatedAt}`;
    }
    if (finishedCountEl) finishedCountEl.textContent = proj.finalVideos ? proj.finalVideos.length : 0;
    if (rawCountEl) rawCountEl.textContent = proj.rawClips ? proj.rawClips.length : 0;

    // Render Tab 1: Finished Videos
    renderModalFinishedVideos(proj.finalVideos || []);

    // Render Tab 2: Raw Clips
    renderModalRawClips(proj.rawClips || []);

    // Render Tab 3: Source Media
    renderModalSourceMedia(proj.sourceMedia);

    // Switch tab
    switchProjectModalTab(defaultTab);

    // Open Modal
    openModal('modal-project-detail');
  };

  function switchProjectModalTab(tabKey) {
    const btnFinished = document.getElementById('btn-ptab-finished');
    const btnRaw = document.getElementById('btn-ptab-raw');
    const btnSource = document.getElementById('btn-ptab-source');

    const contentFinished = document.getElementById('modal-ptab-content-finished');
    const contentRaw = document.getElementById('modal-ptab-content-raw');
    const contentSource = document.getElementById('modal-ptab-content-source');

    [btnFinished, btnRaw, btnSource].forEach(b => b && b.classList.remove('active'));
    [contentFinished, contentRaw, contentSource].forEach(c => c && (c.style.display = 'none'));

    if (tabKey === 'finished') {
      if (btnFinished) btnFinished.classList.add('active');
      if (contentFinished) contentFinished.style.display = 'block';
    } else if (tabKey === 'raw') {
      if (btnRaw) btnRaw.classList.add('active');
      if (contentRaw) contentRaw.style.display = 'block';
    } else if (tabKey === 'source') {
      if (btnSource) btnSource.classList.add('active');
      if (contentSource) contentSource.style.display = 'block';
    }
  }

  function renderModalFinishedVideos(videos) {
    const grid = document.getElementById('modal-prj-finished-grid');
    if (!grid) return;

    if (!videos || videos.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-muted);">
          Chưa có video thành phẩm nào được render cho dự án này.
        </div>
      `;
      return;
    }

    grid.innerHTML = videos.map(v => `
      <div class="project-modal-clip-card">
        <div class="project-modal-clip-thumb-wrap">
          <img src="${v.thumbnail}" alt="${v.title}" class="project-modal-clip-thumb-img" />
          <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.75); color: #fff; font-size: 0.68rem; font-family: var(--font-mono); padding: 2px 6px; border-radius: 4px; font-weight: 700;">
            ${v.duration}
          </span>
          ${v.qualityScore ? `
            <span style="position: absolute; top: 6px; left: 6px; background: rgba(16, 185, 129, 0.85); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
              AI Score: ${v.qualityScore}
            </span>
          ` : ''}
        </div>
        <div class="project-modal-clip-body">
          <div class="project-modal-clip-title">${v.title}</div>
          <div class="project-modal-clip-hook"><strong>Hook:</strong> ${v.hook}</div>
          <div class="project-modal-clip-actions">
            <button class="btn btn-outline btn-xs" style="flex: 1;" onclick="window.previewVideoModal('${v.videoUrl}', '${v.title}')">
              ▶ Phát Video
            </button>
            <button class="btn btn-secondary btn-xs" onclick="navigator.clipboard.writeText('${v.caption.replace(/'/g, "\\'")}'); showToast('Đã copy caption TikTok!', 'success');">
              📋 Copy Caption
            </button>
            <a href="${v.videoUrl}" download="${v.title}.mp4" class="btn btn-primary btn-xs" style="text-decoration: none;">
              ⬇ Tải MP4
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderModalRawClips(clips) {
    const grid = document.getElementById('modal-prj-raw-grid');
    if (!grid) return;

    if (!clips || clips.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-muted);">
          Dự án này không có clip thô trung gian (sản xuất trực tiếp từ kịch bản/ảnh).
        </div>
      `;
      return;
    }

    grid.innerHTML = clips.map(c => `
      <div class="project-modal-clip-card">
        <div style="padding: 0.85rem; background: var(--bg-surface-subtle); border-bottom: 1px solid var(--border-default); display: flex; justify-content: space-between; align-items: center;">
          <span class="badge-tag" style="font-size: 0.68rem; font-weight: 700;">${c.topic}</span>
          <span style="font-size: 0.72rem; color: var(--xcorp-blue-600); font-family: var(--font-mono); font-weight: 700;">${c.timeRange}</span>
        </div>
        <div class="project-modal-clip-body">
          <div class="project-modal-clip-title">${c.title}</div>
          <div class="project-modal-clip-hook" style="font-style: italic;">"${c.hookQuote}"</div>
          <div class="project-modal-clip-actions">
            <button class="btn btn-primary btn-xs" style="width: 100%;" onclick="closeModal('modal-project-detail'); switchPanel('panel-livestream'); showToast('Đã nạp clip thô vào Studio để tiếp tục hậu kỳ', 'info');">
              Tiếp Tục Hậu Kỳ Clip Này →
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderModalSourceMedia(source) {
    const box = document.getElementById('modal-prj-source-box');
    if (!box) return;

    if (!source) {
      box.innerHTML = '<div style="color: var(--text-muted);">Không có thông tin file nguồn.</div>';
      return;
    }

    box.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
        <div>
          <strong style="font-size: 0.95rem; color: var(--text-main); display: block;">${source.title}</strong>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">${source.filename}</span>
        </div>
        <span class="badge-tag" style="background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 700;">${source.asrStatus || 'Sẵn sàng'}</span>
      </div>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-body);">
        <div>Thời lượng: <strong>${source.duration}</strong></div>
        <div>Độ phân giải: <strong>${source.resolution}</strong></div>
        <div>Dung lượng: <strong>${source.size}</strong></div>
      </div>
    `;
  }

  window.previewVideoModal = function(videoUrl, title) {
    const player = document.getElementById('quick-video-player');
    const modal = document.getElementById('modal-quick-preview');
    const titleEl = document.getElementById('quick-preview-title');
    if (player && modal) {
      player.src = videoUrl;
      if (titleEl) titleEl.textContent = title;
      openModal('modal-quick-preview');
      player.play().catch(() => {});
    } else {
      window.open(videoUrl, '_blank');
    }
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ==========================================================================
     PROJECT-CENTRIC WORKFLOW: AUTO-RESUME TO CURRENT STEP & COMPLETED GALLERY
     ========================================================================== */
  let activeCompletedProject = null;
  const completedSelectedVideoIds = new Set();

  let currentClipsSort = 'score_desc';
  let activeProjectClips = null;
  let activeDetailClip = null;

  function getProjectClipsData(proj) {
    if (!proj) return [];
    if (proj.clips && proj.clips.length > 0) {
      return proj.clips;
    }
    // Fallback nếu dự án có finalVideos hoặc rawClips
    if (proj.finalVideos && proj.finalVideos.length > 0) {
      return proj.finalVideos.map((fv, idx) => ({
        id: fv.id || `CLIP_${idx + 1}`,
        title: fv.title || `Highlight Clip 0${idx + 1}`,
        score: Math.max(70, 92 - idx * 4),
        grade: idx === 0 ? 'A' : (idx === 1 ? 'A-' : 'B+'),
        potentialLabel: 'High potential',
        duration: fv.duration || '45s',
        durationSec: 45,
        hookQuote: fv.hook || 'Đoạn hook viral nổi bật',
        timeAgo: proj.timeAgo || '15 minutes ago',
        videoUrl: fv.videoUrl || 'media/video/final_final.mp4',
        thumbnail: fv.thumbnail || proj.thumbnail || 'media/image/farmstay_retinol_table.jpg',
        breakdown: {
          hook: { score: 90 - idx * 2, note: 'Hook mở đầu gây tò mò cao cho người xem' },
          flow: { score: 82 - idx * 2, note: 'Nhịp điệu dồn dập, chuyển cảnh mượt mà' },
          value: { score: 85 - idx * 2, note: 'Cung cấp thông tin giá trị và giải quyết vấn đề' },
          trend: { score: 78 - idx * 2, note: 'Phù hợp xu hướng thảo luận hiện tại trên TikTok' }
        },
        transcript: [
          { time: '00:00', text: fv.hook || 'Xin chào các bạn đã đến với video hôm nay.' },
          { time: '00:15', text: 'Đây là điểm mấu chốt bạn không nên bỏ lỡ khi chọn sản phẩm.' },
          { time: '00:30', text: 'Bấm vào link bên dưới để nhận ưu đãi độc quyền ngay nhé!' }
        ]
      }));
    }
    return [];
  }

  let projectCreatedToastTimer = null;
  window.showProjectCreatedPillToast = function(msg) {
    const toast = document.getElementById('project-created-pill-toast');
    if (!toast) return;
    const txtEl = document.getElementById('pcpt-text');
    if (txtEl) txtEl.textContent = msg || 'Đã tạo dự án';
    toast.classList.remove('hide');
    toast.style.display = 'block';
    if (projectCreatedToastTimer) clearTimeout(projectCreatedToastTimer);
    projectCreatedToastTimer = setTimeout(() => {
      window.dismissProjectCreatedToast();
    }, 4500);
  };

  window.dismissProjectCreatedToast = function() {
    const toast = document.getElementById('project-created-pill-toast');
    if (!toast) return;
    toast.classList.add('hide');
    setTimeout(() => {
      toast.style.display = 'none';
      toast.classList.remove('hide');
    }, 280);
  };

  window.openProjectWorkflow = function(projectId) {
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    state.activeProjectId = projectId;

    if (proj.isProcessing || (proj.statusCode === 'processing' && !proj.isCompleted)) {
      if (typeof showToast === 'function') {
        showToast(`Dự án "${proj.name}" đang được AI render hậu kỳ (${proj.progress || 15}%)... Vui lòng đợi hoàn tất.`, 'info');
      }
      return;
    }

    if (proj.category === 'image_to_video') {
      switchPanel('panel-multi-engine');
      if (typeof showToast === 'function') {
        showToast(`Đang mở studio Dựng Video Từ Ảnh cho dự án "${proj.name}".`, 'info');
      }
    } else if (proj.category === 'raw_edit') {
      switchPanel('panel-raw-editor');
      if (typeof showToast === 'function') {
        showToast(`Đang mở studio Chỉnh Sửa Video Gốc cho dự án "${proj.name}".`, 'info');
      }
    } else {
      // Highlight / AI Clipping / Livestream
      // Kiểm tra: Nếu đã hoàn thành (isCompleted) thì mở Thư mục Clip, nếu chưa thì tự động khôi phục đúng Step
      const isCompleted = proj.isCompleted || (proj.clips && proj.clips.length > 0 && proj.statusCode === 'completed');
      if (isCompleted) {
        window.openProjectClipsView(projectId);
      } else {
        // Tự động khôi phục đúng bước đang làm dở (ví dụ Step 3: Duyệt Clip Thô)
        switchPanel('panel-livestream');
        const targetStep = proj.currentStep || 3;
        if (typeof updateLsStepper === 'function') {
          updateLsStepper(targetStep);
        }
        if (targetStep === 3 && DOM.lsPipeStep3) {
          DOM.lsPipeStep3.click();
        } else if (targetStep === 2 && DOM.lsPipeStep2) {
          DOM.lsPipeStep2.click();
        } else if (targetStep === 4 && DOM.lsPipeStep4) {
          DOM.lsPipeStep4.click();
        } else if (targetStep === 1 && DOM.lsPipeStep1) {
          DOM.lsPipeStep1.click();
        }
        if (typeof showToast === 'function') {
          showToast(`Đã khôi phục phiên làm việc dự án "${proj.name}" tại ${proj.stepLabel || ('Bước ' + targetStep)}.`, 'success');
        }
      }
    }
  };

  window.openProjectClipsView = function(projectId) {
    const proj = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => p.id === projectId);
    if (!proj) return;

    activeProjectClips = proj;
    state.activeProjectId = projectId;
    selectedClipIds.clear();

    switchPanel('panel-project-clips');

    const titleEl = document.getElementById('clips-view-project-name');
    const metaEl = document.getElementById('clips-view-project-meta');

    if (titleEl) titleEl.textContent = proj.name;
    if (metaEl) metaEl.textContent = `Created by you, ${proj.timeAgo || '13 minutes ago'}`;

    // Render Session Drive Action Button (Lưu Drive vs Mở lại phiên làm việc)
    renderClipsSessionButton(proj);

    renderProjectClipsGrid(proj);
    updateFloatingSelectionBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof showToast === 'function') {
      showToast(`Đã mở tệp dự án Highlight "${proj.name}"${proj.isDriveSaved ? ' — Đã lưu Drive (chỉ xem)' : ''}`, 'info');
    }
  };

  function renderClipsSessionButton(proj) {
    const wrap = document.getElementById('clips-view-session-action-wrap');
    if (!wrap || !proj) return;

    if (proj.isDriveSaved) {
      wrap.innerHTML = `
        <button type="button" class="btn-reopen-session" onclick="window.pullFromDrive('${proj.id}')" title="Mở lại phiên làm việc để chỉnh sửa clip">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
          </svg>
          <span>Mở lại phiên làm việc</span>
        </button>
      `;
    } else {
      wrap.innerHTML = `
        <button type="button" class="btn-save-session-drive" onclick="window.toggleProjectDriveSave('${proj.id}')" title="Lưu toàn bộ dự án và tất cả các clip vào Google Drive (Hoàn tất phiên)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
          <span>Lưu tất cả vào Drive (Hoàn tất)</span>
        </button>
      `;
    }
  }

  function createClipCardHTML(clip, isPlaying) {
    const isSelected = selectedClipIds.has(clip.id);
    const isDriveSaved = Boolean(clip.isDriveSaved || (activeProjectClips && activeProjectClips.isDriveSaved));
    return `
      <div class="clip-card-item ${isPlaying ? 'active-playing-clip' : ''} ${isSelected ? 'selected' : ''} ${isDriveSaved ? 'drive-saved' : ''}" onclick="window.openClipDetail('${clip.id}')" style="${isPlaying ? 'border-color: #00f5ff; box-shadow: 0 0 15px rgba(0, 245, 255, 0.25);' : ''}">
        <div class="clip-card-poster-wrap">
          <img src="${clip.thumbnail || 'media/image/farmstay_retinol_table.jpg'}" alt="${escapeProjectHtml(clip.title)}" class="clip-card-poster-img" />
          ${clip.hookQuote ? `<div class="clip-card-hook-text">${escapeProjectHtml(clip.hookQuote)}</div>` : ''}

          <!-- Checkbox Top-Left on hover -->
          <div class="clip-card-checkbox ${isSelected ? 'checked' : ''}" onclick="event.stopPropagation(); window.toggleClipSelect('${clip.id}', this)" title="Chọn clip">
            ${isSelected ? `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ` : ''}
          </div>

          <!-- Top-Right Actions on hover: Open & 3-dots -->
          <div class="clip-card-top-actions" id="clip-top-actions-${clip.id}">
            <button type="button" class="clip-card-top-btn" onclick="event.stopPropagation(); window.openClipDetail('${clip.id}')" title="Mở chi tiết clip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
            <button type="button" class="clip-card-top-btn" onclick="event.stopPropagation(); window.toggleClipMenu('${clip.id}', this)" title="Tùy chọn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2.2"></circle>
                <circle cx="12" cy="12" r="2.2"></circle>
                <circle cx="19" cy="12" r="2.2"></circle>
              </svg>
            </button>
          </div>

          <!-- Dropdown Menu on 3-dots click -->
          <div class="clip-card-dropdown" id="clip-dropdown-${clip.id}" onclick="event.stopPropagation()">
            <button type="button" class="clip-card-dropdown-item" onclick="event.stopPropagation(); window.downloadClipDirect('${clip.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Tải clip nổi bật</span>
            </button>
            <button type="button" class="clip-card-dropdown-item" onclick="event.stopPropagation(); window.renameClipDirect('${clip.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              <span>Đổi tên clip</span>
            </button>
            <button type="button" class="clip-card-dropdown-item danger" onclick="event.stopPropagation(); window.deleteClipDirect('${clip.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Xóa</span>
            </button>
          </div>

          <!-- Drive Saved Floating Badge on Poster -->
          ${isDriveSaved ? `
            <div class="clip-card-drive-pill" title="Tệp con đã được lưu vào Google Drive">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
              <span>Đã lưu Drive</span>
            </div>
          ` : ''}

          <div class="clip-card-score-pill">
            <span style="color: #ffdf00;">⚡</span>
            <span>${clip.score}%</span>
          </div>
          <div class="clip-card-duration-pill">${escapeProjectHtml(clip.duration || '00:30')}</div>
        </div>
        <div class="clip-card-body">
          <div class="clip-card-title" title="${escapeProjectHtml(clip.title)}">${escapeProjectHtml(clip.title)}</div>
          <div class="clip-card-meta">
            <span>${escapeProjectHtml(clip.timeAgo || '11 minutes ago')}</span>
            <span>•</span>
            <span>AI Clipping</span>
            ${isDriveSaved ? `
              <span>•</span>
              <span class="clip-meta-drive-status" title="Đã đồng bộ lên Google Drive">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                Đã lưu Drive
              </span>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  window.toggleClipSelect = function(clipId, el) {
    if (selectedClipIds.has(clipId)) {
      selectedClipIds.delete(clipId);
      if (el) {
        el.classList.remove('checked');
        el.innerHTML = '';
        const card = el.closest('.clip-card-item');
        if (card) card.classList.remove('selected');
      }
    } else {
      selectedClipIds.add(clipId);
      if (el) {
        el.classList.add('checked');
        el.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        const card = el.closest('.clip-card-item');
        if (card) card.classList.add('selected');
      }
    }
    updateFloatingSelectionBar();
    if (typeof showToast === 'function') {
      showToast(`Đã ${selectedClipIds.has(clipId) ? 'chọn' : 'bỏ chọn'} clip. (Đang chọn ${selectedClipIds.size} clip)`, 'info');
    }
  };

  window.toggleClipMenu = function(clipId, btn) {
    const dd = document.getElementById(`clip-dropdown-${clipId}`);
    if (!dd) return;
    const isOpen = dd.classList.contains('open');
    document.querySelectorAll('.clip-card-dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.clip-card-top-actions.has-open-dropdown').forEach(a => a.classList.remove('has-open-dropdown'));
    if (!isOpen) {
      dd.classList.add('open');
      const actionsWrap = document.getElementById(`clip-top-actions-${clipId}`);
      if (actionsWrap) actionsWrap.classList.add('has-open-dropdown');
    }
  };

  window.downloadClipDirect = function(clipId) {
    document.querySelectorAll('.clip-card-dropdown.open').forEach(d => d.classList.remove('open'));
    if (typeof showToast === 'function') {
      showToast(`Đang tải clip nổi bật (${clipId})...`, 'success');
    }
  };

  window.renameClipDirect = function(clipId) {
    document.querySelectorAll('.clip-card-dropdown.open').forEach(d => d.classList.remove('open'));
    const clips = activeProjectClips ? getProjectClipsData(activeProjectClips) : [];
    const clip = clips.find(c => c.id === clipId);
    const newName = prompt('Nhập tên mới cho clip:', clip ? clip.title : '');
    if (newName && newName.trim()) {
      if (clip) clip.title = newName.trim();
      if (activeProjectClips) renderProjectClipsGrid(activeProjectClips);
      if (typeof showToast === 'function') {
        showToast('Đã đổi tên clip thành công!', 'success');
      }
    }
  };

  window.deleteClipDirect = function(clipId) {
    document.querySelectorAll('.clip-card-dropdown.open').forEach(d => d.classList.remove('open'));
    if (confirm('Bạn có chắc chắn muốn xóa clip nổi bật này?')) {
      if (activeProjectClips) {
        const clips = getProjectClipsData(activeProjectClips);
        activeProjectClips.clips = clips.filter(c => c.id !== clipId);
      }
      selectedClipIds.delete(clipId);
      if (activeProjectClips) renderProjectClipsGrid(activeProjectClips);
      updateFloatingSelectionBar();
      if (typeof showToast === 'function') {
        showToast('Đã xóa clip thành công!', 'info');
      }
    }
  };

  // Close clip dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.clip-card-dropdown') && !e.target.closest('.clip-card-top-btn')) {
      document.querySelectorAll('.clip-card-dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.clip-card-top-actions.has-open-dropdown').forEach(a => a.classList.remove('has-open-dropdown'));
    }
  });

  function renderProjectClipsGrid(proj) {
    const gridEl = document.getElementById('clips-items-grid');
    if (!gridEl) return;

    let clips = [...getProjectClipsData(proj)];

    // Sort clips
    if (currentClipsSort === 'score_desc') {
      clips.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (currentClipsSort === 'newest') {
      // Giữ thứ tự gốc
    } else if (currentClipsSort === 'oldest') {
      clips.reverse();
    } else if (currentClipsSort === 'longest') {
      clips.sort((a, b) => (b.durationSec || 0) - (a.durationSec || 0));
    } else if (currentClipsSort === 'shortest') {
      clips.sort((a, b) => (a.durationSec || 0) - (b.durationSec || 0));
    }

    if (clips.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📂</div>
          <div style="font-size: 1rem; font-weight: 700; color: #fff;">Chưa có clips nào trong dự án này</div>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = clips.map(clip => createClipCardHTML(clip, false)).join('');
  }

  window.openClipDetail = function(clipId) {
    if (!activeProjectClips) {
      activeProjectClips = (window.PROTOTYPE_VIDEO_PROJECTS || []).find(p => (p.clips || []).some(c => c.id === clipId)) || (window.PROTOTYPE_VIDEO_PROJECTS || [])[0];
    }
    const clips = getProjectClipsData(activeProjectClips);
    const clip = clips.find(c => c.id === clipId) || clips[0];
    if (!clip) return;

    activeDetailClip = clip;
    switchPanel('panel-clip-detail');

    // Header info
    const titleEl = document.getElementById('clip-detail-title');
    const metaEl = document.getElementById('clip-detail-meta');
    if (titleEl) titleEl.textContent = clip.title;
    if (metaEl) metaEl.textContent = `Created by you, ${clip.timeAgo || '12m ago'}`;

    // Drive status indicator in header
    const isDriveSaved = Boolean(clip.isDriveSaved || (activeProjectClips && activeProjectClips.isDriveSaved));
    const driveStatusEl = document.getElementById('clip-detail-drive-status');
    if (driveStatusEl) {
      driveStatusEl.style.display = isDriveSaved ? 'inline-flex' : 'none';
    }

    // Video Player
    const videoEl = document.getElementById('clip-detail-video');
    const hookEl = document.getElementById('clip-detail-hook-overlay');
    if (videoEl) {
      videoEl.src = clip.videoUrl || 'media/video/final_final.mp4';
      videoEl.poster = clip.thumbnail || 'media/image/farmstay_retinol_table.jpg';
      videoEl.pause();
    }
    const playBtn = document.getElementById('clip-detail-play-btn');
    if (playBtn) playBtn.style.opacity = '1';
    if (hookEl) hookEl.textContent = clip.hookQuote || 'Hook Video';

    // Score Inspector Gauge
    const scoreNumEl = document.getElementById('inspector-score-number');
    const gradeTextEl = document.getElementById('inspector-grade-text');
    const potentialLabelEl = document.getElementById('inspector-potential-label');
    const circleFillEl = document.getElementById('score-circle-fill');

    if (scoreNumEl) scoreNumEl.textContent = clip.score;
    if (gradeTextEl) gradeTextEl.textContent = clip.grade || 'A';
    if (potentialLabelEl) potentialLabelEl.textContent = clip.potentialLabel || 'High potential';

    if (circleFillEl) {
      const circumference = 264;
      const offset = circumference - (circumference * (clip.score || 80) / 100);
      circleFillEl.style.strokeDashoffset = offset;
    }

    // Score Breakdown Items (Hook, Flow, Value, Trend)
    const breakdownListEl = document.getElementById('inspector-breakdown-list');
    if (breakdownListEl && clip.breakdown) {
      const items = [
        { key: 'Hook', data: clip.breakdown.hook },
        { key: 'Flow', data: clip.breakdown.flow },
        { key: 'Value', data: clip.breakdown.value },
        { key: 'Trend', data: clip.breakdown.trend }
      ];

      breakdownListEl.innerHTML = items.map(item => `
        <div class="score-breakdown-item">
          <div class="score-breakdown-head">
            <span class="score-breakdown-name">${item.key}</span>
            <span class="score-breakdown-score">${item.data ? item.data.score : 80}/100</span>
          </div>
          <div class="score-breakdown-bar-track">
            <div class="score-breakdown-bar-fill" style="width: ${item.data ? item.data.score : 80}%;"></div>
          </div>
          <p class="score-breakdown-desc">${escapeProjectHtml(item.data ? item.data.note : '')}</p>
        </div>
      `).join('');
    }

    // Transcript List
    const transcriptListEl = document.getElementById('clip-transcript-list');
    if (transcriptListEl) {
      const sentences = clip.transcript || [
        { time: '00:00', text: clip.hookQuote || 'Đoạn mở đầu video thu hút sự chú ý.' },
        { time: '00:15', text: 'Nội dung cốt lõi giải thích rõ tính năng nổi bật.' },
        { time: '00:30', text: 'Kêu gọi hành động và kết luận video.' }
      ];
      transcriptListEl.innerHTML = sentences.map(s => `
        <div class="transcript-row-item">
          <span class="transcript-timecode">${s.time}</span>
          <span class="transcript-text">${escapeProjectHtml(s.text)}</span>
        </div>
      `).join('');
    }

    // Scroll Down Section: All clips from this project (rendered with hover select & 3-dots)
    const scrollHeading = document.getElementById('clips-scroll-heading');
    if (scrollHeading && activeProjectClips) {
      scrollHeading.textContent = `All clips from ${activeProjectClips.name}`;
    }

    const scrollGrid = document.getElementById('clips-scroll-grid');
    if (scrollGrid && activeProjectClips) {
      const otherClips = getProjectClipsData(activeProjectClips);
      scrollGrid.innerHTML = otherClips.map(c => createClipCardHTML(c, c.id === clip.id)).join('');
    }

    // Group 5: Mini Editor in Actions tab
    renderClipMiniEditor(clip);

    // Reset tab to Score
    window.switchInspectorTab('score');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function renderClipMiniEditor(clip) {
    const mountEl = document.getElementById('clip-mini-editor-mount');
    if (!mountEl) return;

    const isDriveSaved = activeProjectClips ? !!activeProjectClips.isDriveSaved : false;
    const durSec = clip.durationSec || 30;
    const durFormatted = clip.duration || '00:30';

    mountEl.innerHTML = `
      <div class="clip-mini-editor-section open" id="clip-mini-editor-section">
        <div class="clip-mini-editor-header" onclick="window.toggleMiniEditor()">
          <div class="clip-mini-editor-header-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
              <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
              <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>
            <span>Chỉnh sửa clip nhanh (Trim / Sub / BGM)</span>
          </div>
          <svg class="clip-mini-editor-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="clip-mini-editor-body" style="position: relative;">
          ${isDriveSaved ? `
            <div class="clip-mini-editor-locked-overlay" id="clip-mini-editor-locked-overlay">
              <div class="clip-mini-editor-locked-msg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <strong>Phiên làm việc đã lưu trên Google Drive</strong>
                <p>Clip đang ở chế độ xem an toàn (Cloud Archive). Mở lại phiên làm việc để chỉnh sửa clip.</p>
                <button type="button" class="btn-reopen-session" style="margin-top: 6px;" onclick="window.pullFromDrive('${activeProjectClips ? activeProjectClips.id : ''}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
                  <span>Mở lại phiên làm việc</span>
                </button>
              </div>
            </div>
          ` : ''}
          <div id="clip-mini-editor-body-inner" style="${isDriveSaved ? 'pointer-events: none; opacity: 0.35;' : ''}">
            <!-- A. Trim -->
            <div class="mini-editor-sub-section">
              <div class="mini-editor-sub-label">✂️ Trim mốc thời gian</div>
              <div class="mini-editor-range-wrap">
                <input type="range" class="mini-editor-range" id="mini-editor-trim-range" min="5" max="${durSec}" value="${durSec}" oninput="window.updateTrimInput(this.value)" />
                <div class="mini-editor-range-labels">
                  <span>00:00</span>
                  <span id="mini-editor-trim-label">${durFormatted}</span>
                </div>
              </div>
              <div class="mini-editor-time-inputs">
                <span style="font-size: 0.75rem; color: var(--text-muted);">In:</span>
                <input type="text" class="mini-editor-time-input" id="mini-editor-in-time" value="00:00" />
                <span class="mini-editor-time-sep">➔</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Out:</span>
                <input type="text" class="mini-editor-time-input" id="mini-editor-out-time" value="${durFormatted}" />
                <button type="button" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem; margin-left: auto; border-radius: 6px;" onclick="window.previewTrimClip()">Xem thử</button>
              </div>
            </div>

            <!-- B. Caption / Sub -->
            <div class="mini-editor-sub-section">
              <div class="mini-editor-sub-label">📝 Phụ đề / Hook nổi bật</div>
              <textarea class="mini-editor-caption-textarea" id="mini-editor-caption-text" placeholder="Nhập câu hook hoặc caption hiển thị trên video...">${escapeProjectHtml(clip.hookQuote || '')}</textarea>
              <div class="mini-editor-style-chips">
                <span class="mini-editor-style-chip active" onclick="window.setMiniEditorCaptionStyle(this, 'bold')">Chữ đậm Highlight</span>
                <span class="mini-editor-style-chip" onclick="window.setMiniEditorCaptionStyle(this, 'subtle')">Chữ nền mờ</span>
                <span class="mini-editor-style-chip" onclick="window.setMiniEditorCaptionStyle(this, 'glow')">Hiệu ứng Neon</span>
              </div>
            </div>

            <!-- C. BGM Nhạc nền -->
            <div class="mini-editor-sub-section">
              <div class="mini-editor-sub-label">🎵 Nhạc nền BGM</div>
              <select class="mini-editor-bgm-select" id="mini-editor-bgm-select">
                <option value="none">-- Giữ âm thanh gốc (Không thêm BGM) --</option>
                <option value="upbeat" selected>Upbeat Trendy Pop (TikTok Viral Beat)</option>
                <option value="lofi">Chill Lo-fi Beat (Tâm sự / Kể chuyện)</option>
                <option value="dramatic">Cinematic Dramatic (Kịch tính / Bất ngờ)</option>
                <option value="electronic">Cyberpunk Electronic (Hiện đại / Công nghệ)</option>
              </select>
              <div class="mini-editor-volume-row">
                <span class="mini-editor-volume-label">Âm lượng BGM:</span>
                <input type="range" class="mini-editor-range" id="mini-editor-bgm-vol" min="0" max="100" value="35" oninput="const vl = document.getElementById('mini-editor-vol-val'); if(vl) vl.textContent = this.value + '%'" />
                <span id="mini-editor-vol-val" style="font-size: 0.74rem; font-family: var(--font-mono, monospace); color: var(--text-muted); min-width: 32px;">35%</span>
              </div>
            </div>

            <!-- Apply Button -->
            <button type="button" class="mini-editor-apply-btn" onclick="window.applyMiniEditorChanges()">
              <span>Lưu & Cập Nhật Clip</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  window.toggleMiniEditor = function() {
    const sec = document.getElementById('clip-mini-editor-section');
    if (sec) sec.classList.toggle('open');
  };

  window.updateTrimInput = function(val) {
    const sec = parseInt(val, 10) || 0;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    const lbl = document.getElementById('mini-editor-trim-label');
    const outInp = document.getElementById('mini-editor-out-time');
    if (lbl) lbl.textContent = formatted;
    if (outInp) outInp.value = formatted;
  };

  window.previewTrimClip = function() {
    const video = document.getElementById('clip-detail-video');
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    if (typeof showToast === 'function') {
      showToast('Đang phát thử đoạn cắt từ In point...', 'info');
    }
  };

  window.setMiniEditorCaptionStyle = function(el, style) {
    const chips = el.parentNode ? el.parentNode.querySelectorAll('.mini-editor-style-chip') : [];
    chips.forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    if (typeof showToast === 'function') {
      showToast(`Đã chọn kiểu hiển thị chữ: ${el.textContent}`, 'info');
    }
  };

  window.applyMiniEditorChanges = function() {
    if (!activeDetailClip) return;
    const captionInp = document.getElementById('mini-editor-caption-text');
    const outInp = document.getElementById('mini-editor-out-time');

    if (captionInp && captionInp.value.trim()) {
      activeDetailClip.hookQuote = captionInp.value.trim();
      const hookEl = document.getElementById('clip-detail-hook-overlay');
      if (hookEl) hookEl.textContent = activeDetailClip.hookQuote;
    }

    if (outInp && outInp.value.trim()) {
      activeDetailClip.duration = outInp.value.trim();
    }

    if (typeof showToast === 'function') {
      showToast('Đã lưu các tùy chỉnh Trim, Caption & BGM cho clip!', 'success');
    }
  };

  window.backToProjectsList = function() {
    selectedClipIds.clear();
    switchPanel('panel-projects-hub');
    updateFloatingSelectionBar();
  };

  window.backToProjectClips = function() {
    if (activeProjectClips) {
      window.openProjectClipsView(activeProjectClips.id);
    } else {
      switchPanel('panel-projects-hub');
    }
  };

  window.toggleClipsSortMenu = function() {
    const popover = document.getElementById('clips-sort-popover');
    if (popover) popover.classList.toggle('open');
  };

  window.changeClipsSort = function(sortKey, label) {
    currentClipsSort = sortKey;
    const labelEl = document.getElementById('clips-current-sort-label');
    if (labelEl) labelEl.textContent = label;

    document.querySelectorAll('.clips-sort-item').forEach(item => {
      item.classList.toggle('active', item.textContent.trim() === label.trim());
    });

    const popover = document.getElementById('clips-sort-popover');
    if (popover) popover.classList.remove('open');

    if (activeProjectClips) {
      renderProjectClipsGrid(activeProjectClips);
    }
  };

  window.switchInspectorTab = function(tabKey) {
    const tabs = ['actions', 'transcript', 'score'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const content = document.getElementById(`inspector-tab-${t}`);
      if (btn) btn.classList.toggle('active', t === tabKey);
      if (content) content.style.display = (t === tabKey) ? 'block' : 'none';
    });
  };

  window.toggleClipVideoPlayback = function() {
    const video = document.getElementById('clip-detail-video');
    const playBtn = document.getElementById('clip-detail-play-btn');
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        if (playBtn) playBtn.style.opacity = '0';
      }).catch(() => {
        if (playBtn) playBtn.style.opacity = '1';
      });
    } else {
      video.pause();
      if (playBtn) playBtn.style.opacity = '1';
    }
  };

  window.renameActiveProjectClips = function() {
    if (!activeProjectClips) return;
    const newName = prompt('Nhập tên mới cho dự án:', activeProjectClips.name);
    if (newName && newName.trim()) {
      activeProjectClips.name = newName.trim();
      const titleEl = document.getElementById('clips-view-project-name');
      if (titleEl) titleEl.textContent = activeProjectClips.name;
      renderProjectsCards();
      if (typeof showToast === 'function') {
        showToast(`Đã đổi tên dự án thành "${activeProjectClips.name}"`, 'success');
      }
    }
  };

  window.downloadAllClips = function() {
    if (typeof showToast === 'function') {
      showToast('Đang đóng gói và tải xuống tất cả clip của dự án...', 'success');
    }
  };

  window.downloadActiveClip = function() {
    if (activeDetailClip && typeof showToast === 'function') {
      showToast(`Đang tải video clip: "${activeDetailClip.title}"...`, 'success');
    }
  };

  window.deleteActiveClip = function() {
    if (!activeDetailClip || !activeProjectClips) return;
    const confirmDel = confirm(`Bạn có chắc muốn xóa clip "${activeDetailClip.title}"?`);
    if (confirmDel) {
      const clips = activeProjectClips.clips || [];
      const idx = clips.findIndex(c => c.id === activeDetailClip.id);
      if (idx !== -1) {
        clips.splice(idx, 1);
        if (typeof showToast === 'function') {
          showToast('Đã xóa clip thành công!', 'info');
        }
        window.backToProjectClips();
      }
    }
  };

  window.shareActiveClip = function() {
    if (activeDetailClip) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.origin + '#' + activeDetailClip.id);
      }
      if (typeof showToast === 'function') {
        showToast('Đã sao chép liên kết chia sẻ video!', 'success');
      }
    }
  };

  window.openOrbyAiAssistant = function() {
    if (typeof showToast === 'function') {
      showToast('Orby AI: "Tôi có thể giúp bạn viết lại Hook, tối ưu điểm viral hoặc cắt lại các mốc hay nhất!"', 'info');
    }
  };

  window.searchClipTranscript = function(query) {
    const listEl = document.getElementById('clip-transcript-list');
    if (!listEl) return;
    const q = (query || '').toLowerCase().trim();
    listEl.querySelectorAll('.transcript-row-item').forEach(row => {
      const text = row.querySelector('.transcript-text')?.textContent.toLowerCase() || '';
      row.style.display = text.includes(q) ? 'flex' : 'none';
    });
  };

  window.exportClipQuick = function(type) {
    if (typeof showToast === 'function') {
      showToast(`Bắt đầu xuất video chuẩn ${type.toUpperCase()} độ phân giải 1080x1920...`, 'success');
    }
  };

  function renderCompletedProjectGallery(proj) {
    activeCompletedProject = proj;
    completedSelectedVideoIds.clear();

    const titleEl = document.getElementById('completed-project-title');
    const countTxtEl = document.getElementById('completed-videos-count-txt');
    const listEl = document.getElementById('completed-videos-list');

    if (titleEl) titleEl.textContent = proj.name;
    const videos = proj.finalVideos || [];
    if (countTxtEl) countTxtEl.textContent = videos.length;

    // Default select all
    videos.forEach(v => completedSelectedVideoIds.add(v.id));
    updateCompletedSelectedCountUI();

    if (!listEl) return;

    if (videos.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-default);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📭</div>
          <strong style="color: var(--text-main); font-size: 1rem; display: block; margin-bottom: 0.35rem;">Chưa có video thành phẩm nào trong dự án</strong>
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 1rem;">Tất cả video đã bị xóa hoặc chưa được render.</p>
          <button class="btn btn-primary btn-sm" onclick="switchPanel('panel-projects-hub')">Quay lại danh sách Projects</button>
        </div>
      `;
      return;
    }

    // Set first video in player
    setCompletedPlayerVideo(videos[0]);

    listEl.innerHTML = videos.map((v, i) => {
      const isChecked = completedSelectedVideoIds.has(v.id);
      return `
        <div class="completed-video-card-item ${isChecked ? 'selected' : ''}" id="completed-card-${v.id}" data-id="${v.id}">
          <div style="display: flex; align-items: flex-start; padding-top: 4px;">
            <input type="checkbox" class="form-checkbox completed-video-check" data-id="${v.id}" ${isChecked ? 'checked' : ''} style="cursor: pointer; width: 18px; height: 18px;" />
          </div>

          <div class="completed-card-thumb-wrap" onclick="window.previewCompletedVideo('${v.id}')" title="Bấm để phát video">
            <img src="${v.thumbnail || 'media/image/farmstay_retinol_water.jpg'}" alt="${v.title}" />
            <div class="completed-card-play-overlay">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="completed-card-duration">${v.duration || '35s'}</span>
          </div>

          <div class="completed-card-body">
            <div>
              <div class="completed-card-title-row">
                <span class="completed-card-title">${i + 1}. ${v.title}</span>
                <span class="badge-tag" style="background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25); font-size: 0.68rem; font-weight: 700; white-space: nowrap;">
                  ★ ${v.qualityScore || '9.5/10'}
                </span>
              </div>
              <div class="completed-card-hook">
                ⚡ Hook: "${v.hook || 'Xem ngay bí quyết làm đẹp'}"
              </div>
              <div class="completed-card-caption-snippet">
                ${v.caption || 'Video TikTok Shop chính ngạch'}
              </div>
            </div>

            <div class="completed-card-actions-row">
              <button class="btn btn-outline btn-sm" onclick="window.previewCompletedVideo('${v.id}')" style="font-size: 0.75rem; padding: 4px 10px; font-weight: 700;">
                ▶ Xem Preview
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.copySingleCaption('${v.id}')" style="font-size: 0.75rem; padding: 4px 10px; font-weight: 600;">
                📋 Copy Caption
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.downloadSingleVideo('${v.id}')" style="font-size: 0.75rem; padding: 4px 10px; font-weight: 600;">
                ⬇ Tải MP4
              </button>
              <button class="btn btn-sm" onclick="window.deleteSingleCompletedVideo('${v.id}')" style="font-size: 0.75rem; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.25); font-weight: 700; margin-left: auto;" title="Xóa video không đạt yêu cầu">
                🗑️ Xóa
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Checkbox click handlers
    listEl.querySelectorAll('.completed-video-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const vidId = chk.getAttribute('data-id');
        const card = document.getElementById(`completed-card-${vidId}`);
        if (chk.checked) {
          completedSelectedVideoIds.add(vidId);
          if (card) card.classList.add('selected');
        } else {
          completedSelectedVideoIds.delete(vidId);
          if (card) card.classList.remove('selected');
        }
        updateCompletedSelectedCountUI();
      });
    });
  }

  function setCompletedPlayerVideo(v) {
    if (!v) return;
    const player = document.getElementById('completed-video-player');
    const titleEl = document.getElementById('completed-active-video-title');
    const captionEl = document.getElementById('completed-active-video-caption');

    if (player && v.videoUrl) {
      player.src = v.videoUrl;
      player.play().catch(() => {});
    }
    if (titleEl) titleEl.textContent = v.title;
    if (captionEl) captionEl.textContent = v.caption || (v.title + ' ' + (v.hashtags ? v.hashtags.join(' ') : ''));
  }

  window.previewCompletedVideo = function(videoId) {
    if (!activeCompletedProject) return;
    const v = (activeCompletedProject.finalVideos || []).find(item => item.id === videoId);
    if (v) {
      setCompletedPlayerVideo(v);
      if (typeof showToast === 'function') {
        showToast(`Đang phát: "${v.title}"`, 'info');
      }
    }
  };

  window.copySingleCaption = function(videoId) {
    if (!activeCompletedProject) return;
    const v = (activeCompletedProject.finalVideos || []).find(item => item.id === videoId);
    if (v && v.caption) {
      navigator.clipboard?.writeText(v.caption).catch(() => {});
      if (typeof showToast === 'function') {
        showToast(`Đã sao chép caption của "${v.title}" vào clipboard!`, 'success');
      }
    }
  };

  window.downloadSingleVideo = function(videoId) {
    if (!activeCompletedProject) return;
    const v = (activeCompletedProject.finalVideos || []).find(item => item.id === videoId);
    if (v) {
      const a = document.createElement('a');
      a.href = v.videoUrl || 'media/video/final_final.mp4';
      a.download = (v.title || 'video_tiktok') + '.mp4';
      a.click();
      if (typeof showToast === 'function') {
        showToast(`Bắt đầu tải video Full HD: "${v.title}"`, 'success');
      }
    }
  };

  window.deleteSingleCompletedVideo = function(videoId) {
    if (!activeCompletedProject) return;
    const vIndex = (activeCompletedProject.finalVideos || []).findIndex(item => item.id === videoId);
    if (vIndex !== -1) {
      const v = activeCompletedProject.finalVideos[vIndex];
      if (confirm(`Bạn có chắc chắn muốn xóa video "${v.title}" khỏi dự án không?`)) {
        activeCompletedProject.finalVideos.splice(vIndex, 1);
        completedSelectedVideoIds.delete(videoId);
        renderCompletedProjectGallery(activeCompletedProject);
        if (typeof showToast === 'function') {
          showToast(`Đã xóa 1 video khỏi dự án thành công.`, 'info');
        }
      }
    }
  };

  function updateCompletedSelectedCountUI() {
    const count = completedSelectedVideoIds.size;
    document.querySelectorAll('.completed-selected-num').forEach(el => el.textContent = count);

    const btnSelectAllTxt = document.getElementById('btn-completed-select-all-txt');
    const total = activeCompletedProject?.finalVideos?.length || 0;
    if (btnSelectAllTxt) {
      btnSelectAllTxt.textContent = (count === total && total > 0) ? 'Bỏ Chọn Tất Cả' : '☑️ Chọn Tất Cả';
    }
  }

  function setupCompletedGalleryEventHandlers() {
    // 1. Back to projects
    const btnBack = document.getElementById('btn-completed-back-to-projects');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        switchPanel('panel-projects-hub');
      });
    }

    // 2. Toggle Select All
    const btnToggleSelectAll = document.getElementById('btn-completed-toggle-select-all');
    if (btnToggleSelectAll) {
      btnToggleSelectAll.addEventListener('click', () => {
        const videos = activeCompletedProject?.finalVideos || [];
        const isAllSelected = (completedSelectedVideoIds.size === videos.length && videos.length > 0);
        if (isAllSelected) {
          completedSelectedVideoIds.clear();
        } else {
          videos.forEach(v => completedSelectedVideoIds.add(v.id));
        }
        renderCompletedProjectGallery(activeCompletedProject);
      });
    }

    // 3. Batch Save to Brand Assets
    const btnSaveAssets = document.getElementById('btn-completed-save-to-assets');
    if (btnSaveAssets) {
      btnSaveAssets.addEventListener('click', () => {
        const count = completedSelectedVideoIds.size;
        if (count === 0) {
          if (typeof showToast === 'function') showToast('Vui lòng tích chọn ít nhất 1 video để lưu kho!', 'warning');
          return;
        }
        if (typeof showToast === 'function') {
          showToast(`Đã lưu ${count} video thành phẩm vào Kho Brand Assets (Media Sản Phẩm)!`, 'success');
        }
      });
    }

    // 4. Batch Sync to Drive
    const btnSyncDrive = document.getElementById('btn-completed-sync-drive');
    if (btnSyncDrive) {
      btnSyncDrive.addEventListener('click', () => {
        const count = completedSelectedVideoIds.size;
        if (typeof showToast === 'function') {
          showToast(`Đang đồng bộ ${count > 0 ? count : (activeCompletedProject?.finalVideos?.length || 0)} video lên Google Drive công ty... Đã hoàn tất!`, 'success');
        }
      });
    }

    // 5. Batch Delete Selected Videos
    const btnBatchDelete = document.getElementById('btn-completed-delete-selected');
    if (btnBatchDelete) {
      btnBatchDelete.addEventListener('click', () => {
        const count = completedSelectedVideoIds.size;
        if (count === 0) {
          if (typeof showToast === 'function') showToast('Vui lòng tích chọn video cần xóa!', 'warning');
          return;
        }
        if (confirm(`Bạn có chắc chắn muốn xóa ${count} video đã chọn khỏi dự án không?`)) {
          if (activeCompletedProject && activeCompletedProject.finalVideos) {
            activeCompletedProject.finalVideos = activeCompletedProject.finalVideos.filter(v => !completedSelectedVideoIds.has(v.id));
            renderCompletedProjectGallery(activeCompletedProject);
            if (typeof showToast === 'function') {
              showToast(`Đã xóa ${count} video đã chọn khỏi dự án.`, 'info');
            }
          }
        }
      });
    }

    // 6. Copy Active Caption
    const btnCopyActiveCaption = document.getElementById('btn-completed-copy-caption');
    if (btnCopyActiveCaption) {
      btnCopyActiveCaption.addEventListener('click', () => {
        const captionEl = document.getElementById('completed-active-video-caption');
        if (captionEl) {
          navigator.clipboard?.writeText(captionEl.textContent.trim()).catch(() => {});
          if (typeof showToast === 'function') {
            showToast('Đã sao chép caption & hashtag vào clipboard!', 'success');
          }
        }
      });
    }

    // 7. Download Single Video from Player
    const btnDownloadActive = document.getElementById('btn-completed-download-single');
    if (btnDownloadActive) {
      btnDownloadActive.addEventListener('click', () => {
        const player = document.getElementById('completed-video-player');
        const titleEl = document.getElementById('completed-active-video-title');
        const a = document.createElement('a');
        a.href = player?.src || 'media/video/final_final.mp4';
        a.download = (titleEl?.textContent?.trim() || 'video_tiktok') + '.mp4';
        a.click();
        if (typeof showToast === 'function') {
          showToast('Bắt đầu tải video Full HD về máy tính!', 'success');
        }
      });
    }
  }


  // Init completed gallery handlers inside init()
  // setupCompletedGalleryEventHandlers();
})();
