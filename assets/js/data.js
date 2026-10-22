/**
 * LUMINA CERAMICA - Master Data Store & LocalStorage Persistence
 * Contains product catalog, mock bookings, staff directory, and store operations.
 */

const DEFAULT_TILES = [
  {
    id: "tile-01",
    name: "Calacatta Oro Imperial Slab",
    code: "LUM-CAL-8016",
    category: "living",
    categoryLabel: "Living & Grand Hall",
    finish: "Polished High Gloss",
    dimensions: "800 x 1600 mm",
    thickness: "9 mm",
    coveragePerBox: 27.55, // sq.ft
    tilesPerBox: 2,
    pricePerSqFt: 6.80,
    boxWeightKg: 52,
    stockBoxes: 340,
    image: "assets/images/hero_calacatta.jpg",
    accentColor: "#e5caa0",
    features: ["Mirror Polish", "Zero Porosity", "Rectified Edge", "Stain Guard"],
    description: "Iconic warm Italian Calacatta marble design with dramatic amber and grey veining. Ideal for expansive living halls and executive penthouses."
  },
  {
    id: "tile-02",
    name: "Nero Marquina Gold Onyx",
    code: "LUM-NERO-6012",
    category: "bathroom",
    categoryLabel: "Bathroom & Spa",
    finish: "Satin Honed",
    dimensions: "600 x 1200 mm",
    thickness: "10 mm",
    coveragePerBox: 15.50,
    tilesPerBox: 2,
    pricePerSqFt: 7.45,
    boxWeightKg: 34,
    stockBoxes: 185,
    image: "assets/images/bathroom_nero.jpg",
    accentColor: "#22252a",
    features: ["Honed Velvety Feel", "Moisture Resistant", "Bookmatch Feasible"],
    description: "Moody, opulent black Spanish marble aesthetic punctuated by striking golden crystalline lightning lines. A signature statement for luxury master baths."
  },
  {
    id: "tile-03",
    name: "Venetian Micro-Terrazzo Beige",
    code: "LUM-TRZ-8080",
    category: "kitchen",
    categoryLabel: "Kitchen & Dining",
    finish: "Matte Silk R10",
    dimensions: "800 x 800 mm",
    thickness: "9.5 mm",
    coveragePerBox: 20.66,
    tilesPerBox: 3,
    pricePerSqFt: 5.20,
    boxWeightKg: 42,
    stockBoxes: 520,
    image: "assets/images/kitchen_terrazzo.jpg",
    accentColor: "#d2c5b0",
    features: ["R10 Slip Resistance", "Grease Repellent", "High Foot-Traffic Rated"],
    description: "Refined Italian terrazzo inspired by Venetian palazzos. Balanced warm stone chips in an oyster base, engineered for high culinary traffic."
  },
  {
    id: "tile-04",
    name: "Tuscan Travertine Anti-Slip Paver",
    code: "LUM-TRV-6090",
    category: "outdoor",
    categoryLabel: "Outdoor & Terraces",
    finish: "Textured Grip R11",
    dimensions: "600 x 900 mm",
    thickness: "20 mm Structural",
    coveragePerBox: 11.62,
    tilesPerBox: 2,
    pricePerSqFt: 8.90,
    boxWeightKg: 48,
    stockBoxes: 95,
    image: "assets/images/outdoor_patio.jpg",
    accentColor: "#e0d3be",
    features: ["20mm Thickness", "Frost Proof", "Pool Edge Safe R11", "Fade Proof UV"],
    description: "Heavy-duty 20mm outdoor porcelain slab capturing earthy Roman travertine. Perfect for poolside terraces, rooftop decks, and driveways."
  },
  {
    id: "tile-05",
    name: "Emerald Onyx Crystallized Slab",
    code: "LUM-EMR-1224",
    category: "feature-wall",
    categoryLabel: "Feature Wall & Lobby",
    finish: "Crystal Glaze Polish",
    dimensions: "1200 x 2400 mm Grand Slab",
    thickness: "9 mm",
    coveragePerBox: 31.00,
    tilesPerBox: 1,
    pricePerSqFt: 11.50,
    boxWeightKg: 64,
    stockBoxes: 45,
    image: "assets/images/emerald_onyx.jpg",
    accentColor: "#1d5843",
    features: ["Continuous Vein Pattern", "Translucent Onyx Glow", "Scratch Proof PEI V"],
    description: "Deep gemstone emerald green onyx porcelain with glittering mineral fissures. Created for luxury hotel lobbies and accent television walls."
  },
  {
    id: "tile-06",
    name: "Nordic Smoked Oak Vitrified Plank",
    code: "LUM-OAK-2012",
    category: "living",
    categoryLabel: "Living & Bedroom",
    finish: "Natural Wood Grain Relief",
    dimensions: "200 x 1200 mm",
    thickness: "9 mm",
    coveragePerBox: 15.50,
    tilesPerBox: 6,
    pricePerSqFt: 4.95,
    boxWeightKg: 30,
    stockBoxes: 410,
    image: "assets/images/kitchen_terrazzo.jpg", // complimentary photo
    accentColor: "#8b6c4f",
    features: ["Zero Maintenance Wood", "Herringbone Compatible", "Waterproof"],
    description: "Warm organic Scandinavian oak look with authentic tactile wood grain textures, without the warping or moisture vulnerability of natural timber."
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: "BK-9842",
    type: "pallet",
    typeLabel: "Pallet Bulk Booking",
    tileId: "tile-01",
    tileName: "Calacatta Oro Imperial Slab",
    customerName: "Julian Vance Architects",
    email: "julian@vance-arch.com",
    phone: "+1 (555) 234-8900",
    siteAddress: "740 Ocean View Drive, Malibu, CA",
    areaSqFt: 850,
    boxesCount: 31,
    unitPrice: 6.80,
    totalPrice: 5780.00,
    bookingDate: "2026-10-20",
    deliveryDate: "2026-10-28",
    status: "confirmed", // pending, confirmed, dispatched, delivered, cancelled
    assignedStaff: "Elena Rostova",
    notes: "Requires crane offloading at residential driveway."
  },
  {
    id: "BK-9843",
    type: "sample",
    typeLabel: "Sample Kit Delivery",
    tileId: "tile-02",
    tileName: "Nero Marquina Gold + Terrazzo + Emerald",
    customerName: "Sophia Kensington",
    email: "sophia.k@kensington-interiors.co",
    phone: "+1 (555) 891-2311",
    siteAddress: "128 East 64th St, Apt 9B, Manhattan, NY",
    areaSqFt: 0,
    boxesCount: 1, // Kit
    unitPrice: 0,
    totalPrice: 15.00,
    bookingDate: "2026-10-21",
    deliveryDate: "2026-10-24",
    status: "dispatched",
    assignedStaff: "Marcus Chen",
    notes: "Express swatch box with courier tracking #TRK-88219"
  },
  {
    id: "BK-9844",
    type: "consultation",
    typeLabel: "Architectural Site Survey",
    tileId: "tile-04",
    tileName: "Tuscan Travertine Anti-Slip Paver",
    customerName: "Robert Sterling",
    email: "r.sterling@sterlingresidences.com",
    phone: "+1 (555) 674-1290",
    siteAddress: "Villa Bellezza, Lake Tahoe, NV",
    areaSqFt: 1400,
    boxesCount: 120,
    unitPrice: 8.90,
    totalPrice: 12460.00,
    bookingDate: "2026-10-22",
    deliveryDate: "2026-11-05",
    status: "pending",
    assignedStaff: "Marcus Chen",
    notes: "Customer requested on-site laser dimension survey & sample swatches."
  }
];

const DEFAULT_STAFF = [
  { id: "stf-1", name: "Elena Rostova", email: "staff@lumina.com", role: "Logistics & Dispatch Lead", active: true },
  { id: "stf-2", name: "Marcus Chen", email: "marcus@lumina.com", role: "Senior Tile Consultant & Surveyor", active: true },
  { id: "stf-3", name: "Bala Sivaharish", email: "admin@lumina.com", role: "Managing Director (Admin)", active: true }
];

// --- LocalStorage Store API ---
const LuminaStore = {
  // Tiles
  getTiles: function() {
    const data = localStorage.getItem("lumina_tiles");
    if (!data) {
      localStorage.setItem("lumina_tiles", JSON.stringify(DEFAULT_TILES));
      return DEFAULT_TILES;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_TILES;
    }
  },

  saveTiles: function(tiles) {
    localStorage.setItem("lumina_tiles", JSON.stringify(tiles));
  },

  getTileById: function(id) {
    const tiles = this.getTiles();
    return tiles.find(t => t.id === id) || tiles[0];
  },

  addTile: function(tile) {
    const tiles = this.getTiles();
    tiles.unshift(tile);
    this.saveTiles(tiles);
    return tile;
  },

  updateTileStock: function(tileId, newStock) {
    const tiles = this.getTiles();
    const target = tiles.find(t => t.id === tileId);
    if (target) {
      target.stockBoxes = parseInt(newStock, 10);
      this.saveTiles(tiles);
    }
  },

  deleteTile: function(tileId) {
    let tiles = this.getTiles();
    tiles = tiles.filter(t => t.id !== tileId);
    this.saveTiles(tiles);
  },

  // Bookings
  getBookings: function() {
    const data = localStorage.getItem("lumina_bookings");
    if (!data) {
      localStorage.setItem("lumina_bookings", JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_BOOKINGS;
    }
  },

  saveBookings: function(bookings) {
    localStorage.setItem("lumina_bookings", JSON.stringify(bookings));
  },

  addBooking: function(booking) {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    this.saveBookings(bookings);
    return booking;
  },

  updateBookingStatus: function(bookingId, newStatus, assignedStaff = null, notes = null) {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = newStatus;
      if (assignedStaff) booking.assignedStaff = assignedStaff;
      if (notes) booking.notes = notes;
      this.saveBookings(bookings);
      return booking;
    }
    return null;
  },

  // Staff
  getStaff: function() {
    const data = localStorage.getItem("lumina_staff");
    if (!data) {
      localStorage.setItem("lumina_staff", JSON.stringify(DEFAULT_STAFF));
      return DEFAULT_STAFF;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_STAFF;
    }
  },

  addStaff: function(member) {
    const staff = this.getStaff();
    staff.push(member);
    localStorage.setItem("lumina_staff", JSON.stringify(staff));
    return member;
  },

  // Reset helper
  resetAll: function() {
    localStorage.setItem("lumina_tiles", JSON.stringify(DEFAULT_TILES));
    localStorage.setItem("lumina_bookings", JSON.stringify(DEFAULT_BOOKINGS));
    localStorage.setItem("lumina_staff", JSON.stringify(DEFAULT_STAFF));
  }
};
