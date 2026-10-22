/**
 * LUMINA CERAMICA - Authentication & Role Manager
 * Supports Customer, Company Staff, and Admin access levels.
 */

const LuminaAuth = {
  CURRENT_USER_KEY: "lumina_session_user",

  getUser: function() {
    const raw = sessionStorage.getItem(this.CURRENT_USER_KEY);
    if (!raw) {
      return {
        role: "guest",
        name: "Guest Explorer",
        email: "",
        isLoggedIn: false
      };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return { role: "guest", name: "Guest Explorer", email: "", isLoggedIn: false };
    }
  },

  setUser: function(userObj) {
    sessionStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userObj));
    this.updateUI();
  },

  login: function(email, password, forcedRole = null) {
    let role = forcedRole;
    let name = "Verified Customer";

    if (!role) {
      if (email.includes("admin")) {
        role = "admin";
        name = "Bala Sivaharish (Admin)";
      } else if (email.includes("staff")) {
        role = "staff";
        name = "Elena Rostova (Staff)";
      } else {
        role = "customer";
        name = email.split("@")[0].replace(".", " ");
      }
    }

    const user = {
      role: role,
      name: name,
      email: email || `${role}@lumina.com`,
      isLoggedIn: true
    };

    this.setUser(user);
    showToast(`Welcome back, ${user.name}! (${role.toUpperCase()} View Activated)`, "success");

    // Route to appropriate view
    if (role === "admin") {
      LuminaApp.switchView("admin");
    } else if (role === "staff") {
      LuminaApp.switchView("staff");
    } else {
      LuminaApp.switchView("landing");
    }

    this.closeAuthModal();
    return user;
  },

  logout: function() {
    sessionStorage.removeItem(this.CURRENT_USER_KEY);
    this.updateUI();
    LuminaApp.switchView("landing");
    showToast("Logged out successfully.", "info");
  },

  quickSwitchRole: function(role) {
    if (role === "admin") {
      this.login("admin@lumina.com", "admin123", "admin");
    } else if (role === "staff") {
      this.login("staff@lumina.com", "staff123", "staff");
    } else {
      this.setUser({
        role: "customer",
        name: "Client Account",
        email: "client@luxuryvilla.com",
        isLoggedIn: true
      });
      LuminaApp.switchView("landing");
      showToast("Switched to Customer View.", "info");
    }
  },

  openAuthModal: function(preferredTab = "customer") {
    const backdrop = document.getElementById("authModalBackdrop");
    if (!backdrop) return;
    
    this.switchAuthTab(preferredTab);
    backdrop.classList.add("active");
  },

  closeAuthModal: function() {
    const backdrop = document.getElementById("authModalBackdrop");
    if (backdrop) backdrop.classList.remove("active");
  },

  switchAuthTab: function(tabName) {
    document.querySelectorAll(".auth-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    const emailInput = document.getElementById("authEmailInput");
    const pwdInput = document.getElementById("authPasswordInput");
    const tabInput = document.getElementById("authActiveRole");
    if (tabInput) tabInput.value = tabName;

    if (tabName === "admin") {
      if (emailInput) emailInput.value = "admin@lumina.com";
      if (pwdInput) pwdInput.value = "admin123";
    } else if (tabName === "staff") {
      if (emailInput) emailInput.value = "staff@lumina.com";
      if (pwdInput) pwdInput.value = "staff123";
    } else {
      if (emailInput) emailInput.value = "client@luxuryvilla.com";
      if (pwdInput) pwdInput.value = "client123";
    }
  },

  updateUI: function() {
    const user = this.getUser();
    const btn = document.getElementById("authNavBtn");
    const rolePills = document.querySelectorAll(".role-quick-switcher span");

    // Update switcher pills
    rolePills.forEach(pill => {
      pill.classList.toggle("active", pill.dataset.role === user.role);
    });

    if (btn) {
      if (user.isLoggedIn) {
        btn.innerHTML = `
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <span>${user.name}</span>
          <span class="badge ${user.role === 'admin' ? 'badge-rose' : (user.role === 'staff' ? 'badge-blue' : 'badge-gold')}">${user.role.toUpperCase()}</span>
        `;
      } else {
        btn.innerHTML = `
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <span>Login / Register</span>
        `;
      }
    }
  }
};
