import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('prototype/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update init() to include setupLoginPortal and setupAccountPopover
init_search = '''      // Setup SaaS Features (Xcorp UI Kit)
      setupThemeToggle();
      setupWorkspaceSelector();
      setupSpotlightSearch();'''

init_replace = '''      // Setup SaaS Features (Xcorp UI Kit)
      setupThemeToggle();
      setupWorkspaceSelector();
      setupSpotlightSearch();
      setupLoginPortal();
      setupAccountPopover();'''

code = code.replace(init_search, init_replace, 1)

# 2. Add Login Portal & Account Popover Functions right before setupThemeToggle()
auth_functions = '''  /* ==========================================================================
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
          <div class="login-role-check">${ICONS.check}</div>
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
      DOM.btnLoginPortalLabel.textContent = `Vào Command Center với vai trò ${role.title}`;
    }
  }

  function setupLoginPortal() {
    renderLoginRoles();
    updateLoginSubmitLabel();

    if (DOM.btnLoginSubmitPortal) {
      DOM.btnLoginSubmitPortal.addEventListener('click', () => {
        const role = ROLES.find(r => r.id === state.activeRoleId) || ROLES[0];
        if (DOM.loginPortalScreen) {
          DOM.loginPortalScreen.style.opacity = '0';
          DOM.loginPortalScreen.style.transition = 'opacity 0.25s ease-out';
          setTimeout(() => {
            DOM.loginPortalScreen.style.display = 'none';
          }, 250);
        }
        updateUserProfileDisplays();
        showToast(`Chào mừng ${role.name} vào hệ thống Command Center`, 'success');
      });
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

    // Update quota badge
    const quotaBadge = document.getElementById('topbar-quota-badge');
    if (quotaBadge && role.credits) {
      quotaBadge.innerHTML = `<span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/></svg></span> <span>${role.credits}</span>`;
    }

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
      DOM.popoverThemeLabel.textContent = theme === 'dark' ? '☀️ Sáng' : '🌙 Tối';
    }
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    }
  }

'''

code = code.replace("  function setupThemeToggle() {", auth_functions + "  function setupThemeToggle() {", 1)

with open('prototype/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Added Auth & Popover functions successfully!")
