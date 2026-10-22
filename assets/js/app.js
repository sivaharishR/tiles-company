/**
 * LUMINA CERAMICA - Main Application Controller
 * Coordinates page views, product catalog rendering, search, filters & toasts.
 */

// Global toast helper
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="flex: 1;">${message}</div>
    <button style="color: var(--text-dim); cursor: pointer;" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

const LuminaApp = {
  currentView: "landing", // "landing", "staff", "admin"
  catalogCategory: "all",
  catalogSearch: "",

  init: function() {
    // 1. Initialize Subsystems
    LuminaAuth.updateUI();
    this.renderCatalog();
    LuminaVisualizer.init();
    LuminaCalculator.init();
    LuminaBooking.init();
    LuminaStaff.init();
    LuminaAdmin.init();

    // 2. Attach global events
    this.attachEvents();

    // 3. Check url hash or session view
    const hash = window.location.hash.replace("#", "");
    if (hash === "staff" || hash === "admin") {
      this.switchView(hash);
    }
  },

  switchView: function(viewName) {
    this.currentView = viewName;

    const landingView = document.getElementById("customerLandingView");
    const staffPortal = document.getElementById("staffPortalView");
    const adminPortal = document.getElementById("adminPortalView");

    // Toggle view elements
    if (landingView) landingView.style.display = viewName === "landing" ? "block" : "none";
    if (staffPortal) {
      staffPortal.style.display = viewName === "staff" ? "block" : "none";
      if (viewName === "staff") LuminaStaff.render();
    }
    if (adminPortal) {
      adminPortal.style.display = viewName === "admin" ? "block" : "none";
      if (viewName === "admin") LuminaAdmin.render();
    }

    // Update URL hash without reload
    window.history.replaceState(null, null, `#${viewName}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  renderCatalog: function() {
    const grid = document.getElementById("tilesCatalogGrid");
    if (!grid) return;

    let tiles = LuminaStore.getTiles();

    // Filter by Category
    if (this.catalogCategory !== "all") {
      tiles = tiles.filter(t => t.category === this.catalogCategory);
    }

    // Filter by Search Query
    if (this.catalogSearch) {
      const q = this.catalogSearch.toLowerCase();
      tiles = tiles.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q) || 
        t.finish.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q)
      );
    }

    if (tiles.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-dim);">
          <div style="font-size: 2rem; margin-bottom: 12px;">🔍</div>
          <h3>No matching tiles found</h3>
          <p>Try searching for marble, terrazzo, travertine, or reset category filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = tiles.map(t => {
      const isLowStock = t.stockBoxes < 100;
      return `
        <div class="tile-card" data-category="${t.category}">
          <div class="tile-card-img-wrap">
            <img src="${t.image}" alt="${t.name}" class="tile-card-img" loading="lazy">
            <div class="tile-card-badges">
              <span class="badge badge-gold">${t.finish}</span>
            </div>
            <div class="tile-card-quick-actions">
              <button class="quick-action-btn" title="Add Sample to Cart" onclick="LuminaBooking.addToCart('${t.id}', 'sample')">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
              </button>
              <button class="quick-action-btn" title="Preview in Room Visualizer" onclick="LuminaApp.previewInVisualizer('${t.id}')">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              </button>
            </div>
          </div>
          <div class="tile-card-body">
            <div class="tile-card-category">${t.categoryLabel || t.category}</div>
            <h3 class="tile-card-title">${t.name}</h3>
            <div class="tile-card-specs">
              <span class="spec-pill">📐 ${t.dimensions}</span>
              <span class="spec-pill">📦 ${t.coveragePerBox} sq.ft/box</span>
            </div>
            <div class="tile-card-pricing">
              <div class="tile-price">$${t.pricePerSqFt.toFixed(2)} <span>/ sq.ft</span></div>
              <div class="stock-indicator">
                <span class="stock-dot ${isLowStock ? 'low' : ''}"></span>
                <span>${t.stockBoxes} Boxes Available</span>
              </div>
            </div>
            <div class="tile-card-footer">
              <button class="btn btn-secondary btn-sm" onclick="LuminaBooking.openBookingModal('${t.id}', 'sample')">
                Free Sample
              </button>
              <button class="btn btn-primary btn-sm" onclick="LuminaBooking.openBookingModal('${t.id}', 'pallet')">
                Book Pallet
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  previewInVisualizer: function(tileId) {
    LuminaVisualizer.selectTile(tileId);
    const vizSection = document.getElementById("visualizer");
    if (vizSection) {
      vizSection.scrollIntoView({ behavior: "smooth" });
    }
  },

  attachEvents: function() {
    // Category tabs filter
    document.querySelectorAll(".filter-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.catalogCategory = btn.dataset.category;
        this.renderCatalog();
      });
    });

    // Search bar
    const searchInput = document.getElementById("catalogSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.catalogSearch = e.target.value.trim();
        this.renderCatalog();
      });
    }

    // Role switcher pills on top-bar
    document.querySelectorAll(".role-quick-switcher span").forEach(pill => {
      pill.addEventListener("click", () => {
        LuminaAuth.quickSwitchRole(pill.dataset.role);
      });
    });

    // Auth nav button
    const authBtn = document.getElementById("authNavBtn");
    if (authBtn) {
      authBtn.addEventListener("click", () => {
        const user = LuminaAuth.getUser();
        if (user.isLoggedIn) {
          if (confirm(`Currently signed in as ${user.name} (${user.role}). Log out?`)) {
            LuminaAuth.logout();
          }
        } else {
          LuminaAuth.openAuthModal("customer");
        }
      });
    }

    // Auth modal tabs
    document.querySelectorAll(".auth-tab-btn").forEach(tab => {
      tab.addEventListener("click", () => {
        LuminaAuth.switchAuthTab(tab.dataset.tab);
      });
    });

    // Demo chip autofill
    document.querySelectorAll(".demo-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const role = chip.dataset.demoRole;
        LuminaAuth.switchAuthTab(role);
      });
    });

    // Auth Form Submit
    const authForm = document.getElementById("authLoginForm");
    if (authForm) {
      authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("authEmailInput").value;
        const pwd = document.getElementById("authPasswordInput").value;
        const role = document.getElementById("authActiveRole").value;
        LuminaAuth.login(email, pwd, role);
      });
    }

    // Mobile Hamburger
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenuDrawer");
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
    }
  }
};

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  LuminaApp.init();
});
