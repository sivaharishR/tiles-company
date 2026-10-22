/**
 * LUMINA CERAMICA - Booking & Order System
 * Manages Pallet Bookings, Physical Swatch Kits, and Site Consultations.
 */

const LuminaBooking = {
  currentMode: "pallet", // "pallet", "sample", "consultation"
  selectedTileId: "tile-01",
  cart: [],

  init: function() {
    this.loadCart();
    this.attachEvents();
  },

  loadCart: function() {
    const raw = localStorage.getItem("lumina_cart");
    if (raw) {
      try {
        this.cart = JSON.parse(raw);
      } catch (e) {
        this.cart = [];
      }
    }
    this.updateCartBadge();
  },

  saveCart: function() {
    localStorage.setItem("lumina_cart", JSON.stringify(this.cart));
    this.updateCartBadge();
    this.renderCartDrawer();
  },

  updateCartBadge: function() {
    const badges = document.querySelectorAll(".cart-count-badge");
    const count = this.cart.reduce((sum, item) => sum + item.qty, 0);
    badges.forEach(b => b.textContent = count);
  },

  openBookingModal: function(tileId = null, mode = "pallet", prefillData = null) {
    if (tileId) this.selectedTileId = tileId;
    this.currentMode = mode;

    const backdrop = document.getElementById("bookingModalBackdrop");
    if (!backdrop) return;

    this.switchBookingMode(mode);
    this.updateSelectedTileHeader();

    if (prefillData) {
      const areaInput = document.getElementById("bookAreaSqFt");
      const boxesInput = document.getElementById("bookBoxesCount");
      if (areaInput) areaInput.value = prefillData.totalArea;
      if (boxesInput) boxesInput.value = prefillData.boxesCount;
    }

    this.recalculateBookingForm();
    this.showWizardStep(1);

    backdrop.classList.add("active");
  },

  closeBookingModal: function() {
    const backdrop = document.getElementById("bookingModalBackdrop");
    if (backdrop) backdrop.classList.remove("active");
  },

  switchBookingMode: function(mode) {
    this.currentMode = mode;
    document.querySelectorAll(".booking-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.mode === mode);
    });

    const palletSection = document.getElementById("bookingPalletFields");
    const sampleSection = document.getElementById("bookingSampleFields");
    const consultSection = document.getElementById("bookingConsultFields");

    if (palletSection) palletSection.style.display = mode === "pallet" ? "grid" : "none";
    if (sampleSection) sampleSection.style.display = mode === "sample" ? "block" : "none";
    if (consultSection) consultSection.style.display = mode === "consultation" ? "block" : "none";

    this.recalculateBookingForm();
  },

  updateSelectedTileHeader: function() {
    const tile = LuminaStore.getTileById(this.selectedTileId);
    const thumb = document.getElementById("bookTileThumb");
    const title = document.getElementById("bookTileTitle");
    const meta = document.getElementById("bookTileMeta");

    if (thumb) thumb.src = tile.image;
    if (title) title.textContent = tile.name;
    if (meta) meta.innerHTML = `<span>${tile.dimensions}</span> • <span>${tile.finish}</span> • <span>$${tile.pricePerSqFt.toFixed(2)}/sq.ft</span>`;
  },

  recalculateBookingForm: function() {
    const tile = LuminaStore.getTileById(this.selectedTileId);
    const areaInput = document.getElementById("bookAreaSqFt");
    const boxesInput = document.getElementById("bookBoxesCount");
    const calcSummary = document.getElementById("bookingCalcSummary");

    let sqft = parseFloat(areaInput ? areaInput.value : 500) || 0;
    let boxes = Math.ceil(sqft / (tile.coveragePerBox || 25));
    if (boxesInput) boxesInput.value = boxes;

    let subtotal = 0;
    let logisticsFee = 0;
    let total = 0;

    if (this.currentMode === "pallet") {
      subtotal = boxes * tile.coveragePerBox * tile.pricePerSqFt;
      logisticsFee = subtotal > 3000 ? 0 : 150; // free freight over $3000
      total = subtotal + logisticsFee;
    } else if (this.currentMode === "sample") {
      subtotal = 15.00; // Flat swatch box
      logisticsFee = 0;
      total = 15.00;
    } else {
      // Consultation
      subtotal = 0; // Free consultation
      logisticsFee = 0;
      total = 0;
    }

    if (calcSummary) {
      calcSummary.innerHTML = `
        <div class="booking-calc-row">
          <span>Booking Type:</span>
          <strong style="color: #fff; text-transform: uppercase;">${this.currentMode}</strong>
        </div>
        ${this.currentMode === "pallet" ? `
          <div class="booking-calc-row">
            <span>Tile Coverage:</span>
            <span>${(boxes * tile.coveragePerBox).toFixed(1)} sq.ft (${boxes} boxes)</span>
          </div>
          <div class="booking-calc-row">
            <span>Material Subtotal:</span>
            <span>$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
          </div>
          <div class="booking-calc-row">
            <span>Freight & Crane Offload:</span>
            <span>${logisticsFee === 0 ? '<strong style="color: var(--accent-emerald);">FREE</strong>' : '$' + logisticsFee.toFixed(2)}</span>
          </div>
        ` : ''}
        ${this.currentMode === "sample" ? `
          <div class="booking-calc-row">
            <span>Sample Swatch Kit (Up to 3 tiles):</span>
            <span>$15.00 (Refunded upon project order)</span>
          </div>
        ` : ''}
        ${this.currentMode === "consultation" ? `
          <div class="booking-calc-row">
            <span>Architectural Survey & Laser Measurement:</span>
            <span style="color: var(--accent-emerald); font-weight: 700;">COMPLIMENTARY</span>
          </div>
        ` : ''}
        <div class="booking-calc-row total-amount-row">
          <span>Estimated Total:</span>
          <span style="color: var(--gold-light);">$${total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
        </div>
      `;
    }
  },

  showWizardStep: function(stepNumber) {
    const step1 = document.getElementById("bookingStep1");
    const step2 = document.getElementById("bookingStep2");
    const successView = document.getElementById("bookingSuccessView");

    if (stepNumber === 1) {
      if (step1) step1.style.display = "block";
      if (step2) step2.style.display = "none";
      if (successView) successView.style.display = "none";
    } else if (stepNumber === 2) {
      if (step1) step1.style.display = "none";
      if (step2) step2.style.display = "block";
      if (successView) successView.style.display = "none";
    } else if (stepNumber === 3) {
      if (step1) step1.style.display = "none";
      if (step2) step2.style.display = "none";
      if (successView) successView.style.display = "block";
    }

    // Update node status
    document.querySelectorAll(".wizard-step-node").forEach(node => {
      const nodeStep = parseInt(node.dataset.step, 10);
      node.classList.toggle("active", nodeStep === stepNumber);
      node.classList.toggle("completed", nodeStep < stepNumber);
    });
  },

  submitBooking: function() {
    const tile = LuminaStore.getTileById(this.selectedTileId);
    const nameInput = document.getElementById("bookCustName");
    const emailInput = document.getElementById("bookCustEmail");
    const phoneInput = document.getElementById("bookCustPhone");
    const addressInput = document.getElementById("bookCustAddress");
    const dateInput = document.getElementById("bookDeliveryDate");
    const notesInput = document.getElementById("bookCustNotes");
    const areaInput = document.getElementById("bookAreaSqFt");

    const name = nameInput ? nameInput.value.trim() : "Valued Customer";
    const email = emailInput ? emailInput.value.trim() : "customer@example.com";
    const phone = phoneInput ? phoneInput.value.trim() : "+1 555-0199";
    const address = addressInput ? addressInput.value.trim() : "Showroom Pickup / Standard Jobsite";
    const deliveryDate = dateInput && dateInput.value ? dateInput.value : new Date(Date.now() + 7*86400000).toISOString().split('T')[0];
    const notes = notesInput ? notesInput.value.trim() : "Standard handling";
    const areaSqFt = parseFloat(areaInput ? areaInput.value : 500) || 500;
    const boxes = Math.ceil(areaSqFt / (tile.coveragePerBox || 25));

    let totalPrice = 0;
    if (this.currentMode === "pallet") {
      totalPrice = boxes * tile.coveragePerBox * tile.pricePerSqFt;
      if (totalPrice < 3000) totalPrice += 150;
    } else if (this.currentMode === "sample") {
      totalPrice = 15.00;
    } else {
      totalPrice = 0;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `BK-${randomNum}`;

    const newBooking = {
      id: bookingId,
      type: this.currentMode,
      typeLabel: this.currentMode === "pallet" ? "Pallet Bulk Booking" : (this.currentMode === "sample" ? "Sample Swatch Delivery" : "Architectural Consultation"),
      tileId: tile.id,
      tileName: tile.name,
      customerName: name,
      email: email,
      phone: phone,
      siteAddress: address,
      areaSqFt: this.currentMode === "pallet" ? areaSqFt : 0,
      boxesCount: this.currentMode === "pallet" ? boxes : 1,
      unitPrice: tile.pricePerSqFt,
      totalPrice: totalPrice,
      bookingDate: new Date().toISOString().split('T')[0],
      deliveryDate: deliveryDate,
      status: "confirmed",
      assignedStaff: "Elena Rostova",
      notes: notes
    };

    LuminaStore.addBooking(newBooking);

    // Populate confirmation screen
    const refBadge = document.getElementById("confirmBookingRef");
    const receiptBox = document.getElementById("confirmReceiptBox");

    if (refBadge) refBadge.textContent = bookingId;
    if (receiptBox) {
      receiptBox.innerHTML = `
        <div class="receipt-row"><span>Customer:</span><strong>${name}</strong></div>
        <div class="receipt-row"><span>Tile Model:</span><strong>${tile.name}</strong></div>
        <div class="receipt-row"><span>Booking Type:</span><strong style="text-transform: capitalize;">${newBooking.typeLabel}</strong></div>
        <div class="receipt-row"><span>Scheduled Date:</span><strong>${deliveryDate}</strong></div>
        <div class="receipt-row"><span>Site Address:</span><span>${address}</span></div>
        <div class="receipt-row" style="font-size: 1.05rem; color: var(--gold-light);"><span>Total Amount:</span><strong>$${totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong></div>
      `;
    }

    this.showWizardStep(3);
    showToast(`Booking ${bookingId} confirmed and logged into Staff Portal!`, "success");

    // Refresh dashboards if active
    if (window.LuminaStaff) LuminaStaff.render();
    if (window.LuminaAdmin) LuminaAdmin.render();
  },

  // Cart methods
  addToCart: function(tileId, type = "sample") {
    const tile = LuminaStore.getTileById(tileId);
    const existing = this.cart.find(c => c.tileId === tileId && c.type === type);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({
        tileId: tile.id,
        tileName: tile.name,
        type: type,
        price: type === "sample" ? 5.00 : tile.pricePerSqFt * tile.coveragePerBox,
        qty: 1,
        image: tile.image
      });
    }
    this.saveCart();
    showToast(`Added ${tile.name} to Cart`, "success");
  },

  openCartDrawer: function() {
    this.renderCartDrawer();
    const backdrop = document.getElementById("cartDrawerBackdrop");
    if (backdrop) backdrop.classList.add("active");
  },

  closeCartDrawer: function() {
    const backdrop = document.getElementById("cartDrawerBackdrop");
    if (backdrop) backdrop.classList.remove("active");
  },

  renderCartDrawer: function() {
    const list = document.getElementById("cartItemsList");
    const subtotalElem = document.getElementById("cartSubtotalVal");
    if (!list) return;

    if (this.cart.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 40px 10px; color: var(--text-dim);">Your booking cart is empty.</div>`;
      if (subtotalElem) subtotalElem.textContent = "$0.00";
      return;
    }

    let subtotal = 0;
    list.innerHTML = this.cart.map((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="cart-item-card">
          <img src="${item.image}" class="cart-item-thumb" alt="${item.tileName}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.tileName}</div>
            <div class="cart-item-sub">${item.type === 'sample' ? 'Physical Swatch Sample' : '1 Box Quantity'} • Qty: ${item.qty}</div>
            <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
          </div>
          <button class="cart-item-remove" onclick="LuminaBooking.removeFromCart(${index})">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
        </div>
      `;
    }).join("");

    if (subtotalElem) subtotalElem.textContent = `$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  },

  removeFromCart: function(index) {
    this.cart.splice(index, 1);
    this.saveCart();
  },

  attachEvents: function() {
    const areaInput = document.getElementById("bookAreaSqFt");
    if (areaInput) areaInput.addEventListener("input", () => this.recalculateBookingForm());

    document.querySelectorAll(".booking-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => this.switchBookingMode(btn.dataset.mode));
    });

    const step1NextBtn = document.getElementById("bookStep1Next");
    const step2BackBtn = document.getElementById("bookStep2Back");
    const step2SubmitBtn = document.getElementById("bookStep2Submit");

    if (step1NextBtn) step1NextBtn.addEventListener("click", () => this.showWizardStep(2));
    if (step2BackBtn) step2BackBtn.addEventListener("click", () => this.showWizardStep(1));
    if (step2SubmitBtn) step2SubmitBtn.addEventListener("click", () => this.submitBooking());

    const cartNavBtn = document.getElementById("cartNavBtn");
    if (cartNavBtn) cartNavBtn.addEventListener("click", () => this.openCartDrawer());
  }
};
