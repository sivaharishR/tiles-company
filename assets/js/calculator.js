/**
 * LUMINA CERAMICA - Smart Tile Area & Wastage Calculator
 * Computes exact sq.ft, boxes needed, tile counts, and total cost with professional wastage allowances.
 */

const LuminaCalculator = {
  unit: "feet", // "feet" or "meters"
  wastagePercent: 10, // 5%, 10%, 15%

  init: function() {
    this.populateTileDropdown();
    this.attachEvents();
    this.recalculate();
  },

  populateTileDropdown: function() {
    const select = document.getElementById("calcTileSelect");
    if (!select) return;

    const tiles = LuminaStore.getTiles();
    select.innerHTML = tiles.map(t => `
      <option value="${t.id}" data-coverage="${t.coveragePerBox}" data-price="${t.pricePerSqFt}">
        ${t.name} (${t.dimensions}) — $${t.pricePerSqFt.toFixed(2)}/sq.ft
      </option>
    `).join("");
  },

  attachEvents: function() {
    const lengthInput = document.getElementById("calcLength");
    const widthInput = document.getElementById("calcWidth");
    const tileSelect = document.getElementById("calcTileSelect");

    if (lengthInput) lengthInput.addEventListener("input", () => this.recalculate());
    if (widthInput) widthInput.addEventListener("input", () => this.recalculate());
    if (tileSelect) tileSelect.addEventListener("change", () => this.recalculate());

    document.querySelectorAll(".wastage-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".wastage-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.wastagePercent = parseInt(btn.dataset.wastage, 10);
        this.recalculate();
      });
    });

    const addBtn = document.getElementById("calcBookNowBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        const tileSelect = document.getElementById("calcTileSelect");
        const tileId = tileSelect ? tileSelect.value : "tile-01";
        const calcData = this.getCalculationData();
        LuminaBooking.openBookingModal(tileId, "pallet", calcData);
      });
    }
  },

  getCalculationData: function() {
    const lengthInput = document.getElementById("calcLength");
    const widthInput = document.getElementById("calcWidth");
    const tileSelect = document.getElementById("calcTileSelect");

    const length = parseFloat(lengthInput ? lengthInput.value : 20) || 0;
    const width = parseFloat(widthInput ? widthInput.value : 15) || 0;
    const tileId = tileSelect ? tileSelect.value : "tile-01";
    const tile = LuminaStore.getTileById(tileId);

    const baseArea = length * width;
    const wastageArea = baseArea * (this.wastagePercent / 100);
    const totalArea = Math.round((baseArea + wastageArea) * 100) / 100;

    const coveragePerBox = tile.coveragePerBox || 25;
    const boxesCount = Math.ceil(totalArea / coveragePerBox);
    const actualAreaProvided = Math.round(boxesCount * coveragePerBox * 100) / 100;
    const totalTiles = boxesCount * (tile.tilesPerBox || 2);
    const estWeight = Math.round(boxesCount * (tile.boxWeightKg || 40));
    const totalPrice = Math.round(actualAreaProvided * tile.pricePerSqFt * 100) / 100;

    return {
      length,
      width,
      baseArea,
      wastagePercent: this.wastagePercent,
      totalArea,
      actualAreaProvided,
      boxesCount,
      totalTiles,
      estWeight,
      totalPrice,
      tile
    };
  },

  recalculate: function() {
    const data = this.getCalculationData();

    const baseAreaElem = document.getElementById("calcBaseArea");
    const wastageAreaElem = document.getElementById("calcWastageArea");
    const boxesCountElem = document.getElementById("calcBoxesCount");
    const totalTilesElem = document.getElementById("calcTotalTiles");
    const estWeightElem = document.getElementById("calcEstWeight");
    const totalPriceElem = document.getElementById("calcTotalPrice");

    if (baseAreaElem) baseAreaElem.textContent = `${data.baseArea.toFixed(1)} sq.ft`;
    if (wastageAreaElem) wastageAreaElem.textContent = `+${(data.totalArea - data.baseArea).toFixed(1)} sq.ft (${data.wastagePercent}%)`;
    if (boxesCountElem) boxesCountElem.textContent = `${data.boxesCount} Boxes`;
    if (totalTilesElem) totalTilesElem.textContent = `${data.totalTiles} pcs`;
    if (estWeightElem) estWeightElem.textContent = `~${data.estWeight} kg`;
    if (totalPriceElem) totalPriceElem.textContent = `$${data.totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  }
};
