/**
 * LUMINA CERAMICA - Executive Admin Dashboard
 * Analytics, Tile Catalog Management (CRUD), Staff Accounts, & CSV Reporting.
 */

const LuminaAdmin = {
  currentTab: "analytics", // "analytics", "catalog", "staff"

  init: function() {
    this.render();
    this.attachEvents();
  },

  render: function() {
    this.renderKPIs();
    this.renderAnalyticsCharts();
    this.renderCatalogTable();
    this.renderStaffList();
  },

  renderKPIs: function() {
    const bookings = LuminaStore.getBookings();
    const tiles = LuminaStore.getTiles();

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const totalSqFt = bookings.reduce((sum, b) => sum + (b.areaSqFt || 0), 0);
    const totalOrders = bookings.length;
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const kpiRev = document.getElementById("adminKpiRevenue");
    const kpiSqFt = document.getElementById("adminKpiSqFt");
    const kpiOrders = document.getElementById("adminKpiOrders");
    const kpiAOV = document.getElementById("adminKpiAOV");

    if (kpiRev) kpiRev.textContent = `$${totalRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    if (kpiSqFt) kpiSqFt.textContent = `${totalSqFt.toLocaleString('en-US')} sq.ft`;
    if (kpiOrders) kpiOrders.textContent = `${totalOrders} Orders`;
    if (kpiAOV) kpiAOV.textContent = `$${aov.toLocaleString('en-US', {minimumFractionDigits: 0})}`;
  },

  renderAnalyticsCharts: function() {
    const container = document.getElementById("adminTopSellingTiles");
    if (!container) return;

    const tiles = LuminaStore.getTiles();
    // compute simulated sales distribution
    const items = [
      { name: "Calacatta Oro Imperial Slab", percent: 84, revenue: "$18,400" },
      { name: "Nero Marquina Gold Onyx", percent: 68, revenue: "$14,250" },
      { name: "Tuscan Travertine Paver", percent: 52, revenue: "$12,460" },
      { name: "Venetian Micro-Terrazzo", percent: 45, revenue: "$8,900" },
      { name: "Emerald Onyx Grand Slab", percent: 38, revenue: "$6,900" }
    ];

    container.innerHTML = items.map(item => `
      <div class="chart-bar-group">
        <div class="chart-bar-header">
          <strong style="color: #fff;">${item.name}</strong>
          <span style="color: var(--gold-light); font-weight: 700;">${item.revenue} (${item.percent}%)</span>
        </div>
        <div class="chart-bar-track">
          <div class="chart-bar-fill" style="width: ${item.percent}%;"></div>
        </div>
      </div>
    `).join("");
  },

  renderCatalogTable: function() {
    const tbody = document.getElementById("adminCatalogTableBody");
    if (!tbody) return;

    const tiles = LuminaStore.getTiles();
    tbody.innerHTML = tiles.map(t => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${t.image}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-gold);" alt="">
            <div>
              <strong style="color: #fff;">${t.name}</strong>
              <div style="font-size: 0.72rem; color: var(--gold-primary);">${t.code}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-gold">${t.category}</span></td>
        <td>${t.dimensions}</td>
        <td><strong>$${t.pricePerSqFt.toFixed(2)}</strong></td>
        <td>${t.coveragePerBox} sq.ft</td>
        <td>${t.stockBoxes} Boxes</td>
        <td>
          <div class="table-action-btn-group">
            <button class="action-chip-btn" onclick="LuminaAdmin.quickEditPrice('${t.id}')">Edit $</button>
            <button class="action-chip-btn" onclick="LuminaAdmin.deleteTile('${t.id}')" style="color: var(--accent-rose);">Delete</button>
          </div>
        </td>
      </tr>
    `).join("");
  },

  renderStaffList: function() {
    const tbody = document.getElementById("adminStaffTableBody");
    if (!tbody) return;

    const staff = LuminaStore.getStaff();
    tbody.innerHTML = staff.map(s => `
      <tr>
        <td><strong style="color: #fff;">${s.name}</strong></td>
        <td>${s.email}</td>
        <td><span class="badge ${s.role.includes('Admin') ? 'badge-rose' : 'badge-blue'}">${s.role}</span></td>
        <td><span class="stock-indicator"><span class="stock-dot"></span> Active</span></td>
      </tr>
    `).join("");
  },

  quickEditPrice: function(tileId) {
    const tile = LuminaStore.getTileById(tileId);
    const newPrice = prompt(`Enter new price per sq.ft for "${tile.name}":`, tile.pricePerSqFt);
    if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
      tile.pricePerSqFt = parseFloat(newPrice);
      const tiles = LuminaStore.getTiles();
      const target = tiles.find(t => t.id === tileId);
      if (target) target.pricePerSqFt = tile.pricePerSqFt;
      LuminaStore.saveTiles(tiles);
      showToast(`Updated price for ${tile.name} to $${tile.pricePerSqFt.toFixed(2)}/sq.ft`, "success");
      this.renderCatalogTable();
      if (window.LuminaApp) LuminaApp.renderCatalog();
    }
  },

  deleteTile: function(tileId) {
    if (confirm("Are you sure you want to remove this tile model from the catalog?")) {
      LuminaStore.deleteTile(tileId);
      showToast("Tile model deleted.", "info");
      this.render();
      if (window.LuminaApp) LuminaApp.renderCatalog();
      if (window.LuminaVisualizer) LuminaVisualizer.renderSwatches();
    }
  },

  openAddTileModal: function() {
    const backdrop = document.getElementById("addTileModalBackdrop");
    if (backdrop) backdrop.classList.add("active");
  },

  closeAddTileModal: function() {
    const backdrop = document.getElementById("addTileModalBackdrop");
    if (backdrop) backdrop.classList.remove("active");
  },

  saveNewTile: function() {
    const name = document.getElementById("newTileName").value.trim();
    const code = document.getElementById("newTileCode").value.trim();
    const category = document.getElementById("newTileCategory").value;
    const finish = document.getElementById("newTileFinish").value.trim();
    const dimensions = document.getElementById("newTileDimensions").value.trim();
    const price = parseFloat(document.getElementById("newTilePrice").value) || 5.50;
    const coverage = parseFloat(document.getElementById("newTileCoverage").value) || 25;
    const stock = parseInt(document.getElementById("newTileStock").value, 10) || 100;

    if (!name || !code) {
      alert("Please provide tile name and code.");
      return;
    }

    const newTile = {
      id: `tile-${Date.now().toString().slice(-4)}`,
      name: name,
      code: code,
      category: category,
      categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
      finish: finish || "Polished",
      dimensions: dimensions || "800 x 1600 mm",
      thickness: "9.5 mm",
      coveragePerBox: coverage,
      tilesPerBox: 2,
      pricePerSqFt: price,
      boxWeightKg: 45,
      stockBoxes: stock,
      image: "assets/images/emerald_onyx.jpg", // high quality default
      accentColor: "#d4af37",
      features: ["Grade 1 Vitrified", "Stain Guard", "Rectified"],
      description: "Architectural porcelain tile manufactured with highest European standards."
    };

    LuminaStore.addTile(newTile);
    this.closeAddTileModal();
    showToast(`Added ${newTile.name} to Catalog!`, "success");

    this.render();
    if (window.LuminaApp) LuminaApp.renderCatalog();
    if (window.LuminaVisualizer) LuminaVisualizer.renderSwatches();
  },

  exportBookingsCSV: function() {
    const bookings = LuminaStore.getBookings();
    let csv = "BookingID,Date,CustomerName,Email,Phone,TileName,Type,Boxes,AreaSqFt,TotalPrice,Status,AssignedStaff\n";

    bookings.forEach(b => {
      csv += `"${b.id}","${b.bookingDate}","${b.customerName}","${b.email}","${b.phone}","${b.tileName}","${b.type}","${b.boxesCount}","${b.areaSqFt}","${b.totalPrice}","${b.status}","${b.assignedStaff || ''}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `lumina_tiles_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Bookings export CSV generated and downloaded!", "success");
  },

  resetDemoData: function() {
    if (confirm("Reset all catalog, bookings and staff data to factory defaults?")) {
      LuminaStore.resetAll();
      location.reload();
    }
  },

  attachEvents: function() {
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentTab = btn.dataset.tab;

        const analyticsSec = document.getElementById("adminAnalyticsSection");
        const catalogSec = document.getElementById("adminCatalogSection");
        const staffSec = document.getElementById("adminStaffSection");

        if (analyticsSec) analyticsSec.style.display = this.currentTab === "analytics" ? "block" : "none";
        if (catalogSec) catalogSec.style.display = this.currentTab === "catalog" ? "block" : "none";
        if (staffSec) staffSec.style.display = this.currentTab === "staff" ? "block" : "none";
      });
    });

    const addTileBtn = document.getElementById("adminAddTileBtn");
    if (addTileBtn) addTileBtn.addEventListener("click", () => this.openAddTileModal());

    const saveTileBtn = document.getElementById("saveNewTileBtn");
    if (saveTileBtn) saveTileBtn.addEventListener("click", () => this.saveNewTile());

    const exportBtn = document.getElementById("adminExportCsvBtn");
    if (exportBtn) exportBtn.addEventListener("click", () => this.exportBookingsCSV());

    const resetBtn = document.getElementById("adminResetDataBtn");
    if (resetBtn) resetBtn.addEventListener("click", () => this.resetDemoData());
  }
};
