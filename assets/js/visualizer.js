/**
 * LUMINA CERAMICA - Interactive Room & Tile Visualizer
 * Allows clients to switch room environments, preview luxury tiles,
 * test finish sheens, and book the exact tile combination.
 */

const ROOMS = {
  living: {
    id: "living",
    name: "Imperial Living Salon",
    defaultTileId: "tile-01",
    image: "assets/images/hero_calacatta.jpg",
    description: "Double-height architectural living salon with panoramic daylighting."
  },
  bathroom: {
    id: "bathroom",
    name: "Master Spa Wellness Suite",
    defaultTileId: "tile-02",
    image: "assets/images/bathroom_nero.jpg",
    description: "Sensory bathroom suite with mood backlights and standalone stone tub."
  },
  kitchen: {
    id: "kitchen",
    name: "Gourmet Chef Kitchen",
    defaultTileId: "tile-03",
    image: "assets/images/kitchen_terrazzo.jpg",
    description: "Fluted oak cabinetry paired with Venetian floor terrazzo surfaces."
  },
  outdoor: {
    id: "outdoor",
    name: "Mediterranean Poolside Terrace",
    defaultTileId: "tile-04",
    image: "assets/images/outdoor_patio.jpg",
    description: "Exterior sun deck with structural 20mm anti-slip travertine pavers."
  }
};

const LuminaVisualizer = {
  activeRoomId: "living",
  activeTileId: "tile-01",
  activeFinish: "gloss",
  activeGrout: "gold",

  init: function() {
    this.renderSwatches();
    this.attachEvents();
    this.updateView();
  },

  renderSwatches: function() {
    const container = document.getElementById("visualizerSwatches");
    if (!container) return;

    const tiles = LuminaStore.getTiles();
    container.innerHTML = tiles.map(tile => `
      <div class="swatch-item ${tile.id === this.activeTileId ? 'active' : ''}" data-tile-id="${tile.id}">
        <div class="swatch-preview-box" style="background-image: url('${tile.image}');"></div>
        <div class="swatch-name" title="${tile.name}">${tile.name.split(' ')[0]}</div>
      </div>
    `).join("");

    container.querySelectorAll(".swatch-item").forEach(item => {
      item.addEventListener("click", () => {
        this.selectTile(item.dataset.tileId);
      });
    });
  },

  selectTile: function(tileId) {
    this.activeTileId = tileId;
    document.querySelectorAll(".swatch-item").forEach(sw => {
      sw.classList.toggle("active", sw.dataset.tileId === tileId);
    });
    this.updateView();
  },

  selectRoom: function(roomId) {
    if (!ROOMS[roomId]) return;
    this.activeRoomId = roomId;

    document.querySelectorAll(".room-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.room === roomId);
    });

    // Auto-pair default tile for room
    this.selectTile(ROOMS[roomId].defaultTileId);
  },

  updateView: function() {
    const room = ROOMS[this.activeRoomId];
    const tile = LuminaStore.getTileById(this.activeTileId);
    const mainImg = document.getElementById("visualizerMainImg");
    const roomBadge = document.getElementById("visualizerRoomBadge");
    const tileNameElem = document.getElementById("visualizerTileName");
    const tileSpecsElem = document.getElementById("visualizerTileSpecs");
    const tilePriceElem = document.getElementById("visualizerTilePrice");

    if (mainImg) {
      mainImg.style.opacity = "0.4";
      setTimeout(() => {
        // In this interactive demo, if the tile has a dedicated photo, we display it, otherwise room photo
        mainImg.src = tile.image || room.image;
        mainImg.style.opacity = "1";
      }, 200);
    }

    if (roomBadge) {
      roomBadge.innerHTML = `
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3z"/></svg>
        <span>${room.name}</span>
      `;
    }

    if (tileNameElem) tileNameElem.textContent = tile.name;
    if (tileSpecsElem) tileSpecsElem.textContent = `${tile.dimensions} • ${tile.finish} • ${tile.thickness}`;
    if (tilePriceElem) tilePriceElem.textContent = `$${tile.pricePerSqFt.toFixed(2)} / sq.ft`;
  },

  bookCurrentLook: function() {
    const tile = LuminaStore.getTileById(this.activeTileId);
    LuminaBooking.openBookingModal(tile.id, "pallet");
  },

  attachEvents: function() {
    document.querySelectorAll(".room-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectRoom(btn.dataset.room);
      });
    });

    const bookBtn = document.getElementById("visualizerBookBtn");
    if (bookBtn) {
      bookBtn.addEventListener("click", () => this.bookCurrentLook());
    }
  }
};
