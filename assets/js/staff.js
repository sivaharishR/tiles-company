/**
 * LUMINA CERAMICA - Company Staff Dashboard
 * Real-time booking management, order dispatch, status updates & stock control.
 */

const LuminaStaff = {
  currentFilter: "all",

  init: function() {
    this.render();
    this.attachEvents();
  },

  render: function() {
    this.renderKPIs();
    this.renderBookingsTable();
    this.renderInventoryTable();
  },

  renderKPIs: function() {
    const bookings = LuminaStore.getBookings();
    const pendingCount = bookings.filter(b => b.status === "pending" || b.status === "confirmed").length;
    const sampleCount = bookings.filter(b => b.type === "sample").length;
    const consultCount = bookings.filter(b => b.type === "consultation").length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const kpiPending = document.getElementById("staffKpiPending");
    const kpiSamples = document.getElementById("staffKpiSamples");
    const kpiConsult = document.getElementById("staffKpiConsult");
    const kpiTotal = document.getElementById("staffKpiTotal");

    if (kpiPending) kpiPending.textContent = pendingCount;
    if (kpiSamples) kpiSamples.textContent = sampleCount;
    if (kpiConsult) kpiConsult.textContent = consultCount;
    if (kpiTotal) kpiTotal.textContent = `$${totalRevenue.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
  },

  renderBookingsTable: function() {
    const tbody = document.getElementById("staffBookingsTableBody");
    if (!tbody) return;

    let bookings = LuminaStore.getBookings();
    if (this.currentFilter !== "all") {
      bookings = bookings.filter(b => b.status === this.currentFilter);
    }

    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px; color: var(--text-dim);">No bookings match this filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td>
          <strong style="color: var(--gold-light); font-family: var(--font-mono);">${b.id}</strong>
          <div style="font-size: 0.72rem; color: var(--text-dim);">${b.bookingDate}</div>
        </td>
        <td>
          <div style="font-weight: 600; color: #fff;">${b.customerName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${b.email} • ${b.phone}</div>
        </td>
        <td>
          <div>${b.tileName}</div>
          <div style="font-size: 0.75rem; color: var(--gold-primary);">${b.typeLabel} ${b.boxesCount ? `(${b.boxesCount} boxes)` : ''}</div>
        </td>
        <td>
          <span style="font-family: var(--font-mono);">${b.deliveryDate}</span>
        </td>
        <td>
          <strong>$${(b.totalPrice || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</strong>
        </td>
        <td>
          <span class="status-pill status-${b.status}">${b.status}</span>
        </td>
        <td>
          <div class="table-action-btn-group">
            <select class="action-chip-btn" onchange="LuminaStaff.updateStatus('${b.id}', this.value)" style="background: rgba(11,15,23,0.9); border: 1px solid var(--border-light); color: #fff; padding: 4px 8px;">
              <option value="pending" ${b.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="confirmed" ${b.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="dispatched" ${b.status === 'dispatched' ? 'selected' : ''}>Dispatched</option>
              <option value="delivered" ${b.status === 'delivered' ? 'selected' : ''}>Delivered</option>
              <option value="cancelled" ${b.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
            <button class="action-chip-btn" onclick="LuminaStaff.viewBookingNotes('${b.id}')" title="View Details">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  },

  renderInventoryTable: function() {
    const tbody = document.getElementById("staffInventoryTableBody");
    if (!tbody) return;

    const tiles = LuminaStore.getTiles();
    tbody.innerHTML = tiles.map(t => {
      const isLow = t.stockBoxes < 100;
      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${t.image}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover;" alt="">
              <div>
                <strong style="color: #fff;">${t.name}</strong>
                <div style="font-size: 0.72rem; color: var(--text-dim);">${t.code} • ${t.dimensions}</div>
              </div>
            </div>
          </td>
          <td>${t.finish}</td>
          <td>$${t.pricePerSqFt.toFixed(2)}/sq.ft</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="number" min="0" value="${t.stockBoxes}" id="stockInput-${t.id}" style="width: 80px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-light); border-radius: 4px; color: #fff; padding: 4px 8px; font-weight: 600;">
              <button class="action-chip-btn" onclick="LuminaStaff.saveStock('${t.id}')">Save</button>
            </div>
          </td>
          <td>
            ${isLow ? '<span class="status-pill status-pending">LOW STOCK</span>' : '<span class="status-pill status-delivered">IN STOCK</span>'}
          </td>
        </tr>
      `;
    }).join("");
  },

  updateStatus: function(bookingId, newStatus) {
    LuminaStore.updateBookingStatus(bookingId, newStatus);
    showToast(`Booking ${bookingId} updated to ${newStatus.toUpperCase()}`, "success");
    this.render();
    if (window.LuminaAdmin) LuminaAdmin.render();
  },

  saveStock: function(tileId) {
    const input = document.getElementById(`stockInput-${tileId}`);
    if (!input) return;
    const newStock = parseInt(input.value, 10);
    LuminaStore.updateTileStock(tileId, newStock);
    showToast(`Inventory updated for tile model.`, "success");
    this.renderInventoryTable();
    if (window.LuminaAdmin) LuminaAdmin.render();
    if (window.LuminaApp) LuminaApp.renderCatalog();
  },

  viewBookingNotes: function(bookingId) {
    const b = LuminaStore.getBookings().find(x => x.id === bookingId);
    if (!b) return;
    alert(`[Booking ${b.id}]\nCustomer: ${b.customerName}\nAddress: ${b.siteAddress}\nNotes: ${b.notes || 'None'}\nAssigned Staff: ${b.assignedStaff || 'Unassigned'}`);
  },

  attachEvents: function() {
    document.querySelectorAll(".staff-status-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".staff-status-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFilter = btn.dataset.status;
        this.renderBookingsTable();
      });
    });
  }
};
