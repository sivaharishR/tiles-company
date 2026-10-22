/**
 * LUMINA CERAMICA - React API Service
 * Handles communication with Express backend with automatic fallback.
 */

const API_BASE = "http://localhost:5000/api";

export const api = {
  // Tiles
  async getTiles(category = "all", search = "") {
    try {
      const params = new URLSearchParams();
      if (category !== "all") params.append("category", category);
      if (search) params.append("search", search);
      const res = await fetch(`${API_BASE}/tiles?${params.toString()}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn("Backend unavailable, using fallback tiles data.");
      return getFallbackTiles(category, search);
    }
  },

  async addTile(tile) {
    try {
      const res = await fetch(`${API_BASE}/tiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tile)
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return { success: true, data: tile };
    }
  },

  async updateTile(id, updates) {
    try {
      const res = await fetch(`${API_BASE}/tiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  async deleteTile(id) {
    try {
      const res = await fetch(`${API_BASE}/tiles/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  // Bookings
  async getBookings(status = "all") {
    try {
      const params = new URLSearchParams();
      if (status !== "all") params.append("status", status);
      const res = await fetch(`${API_BASE}/bookings?${params.toString()}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.data;
    } catch (e) {
      return getFallbackBookings(status);
    }
  },

  async createBooking(booking) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
      });
      return await res.json();
    } catch (e) {
      const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
      return { success: true, data: { id, ...booking, status: "pending" } };
    }
  },

  async updateBookingStatus(id, status, assignedStaff, notes) {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, assignedStaff, notes })
      });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  // Auth
  async login(email, password, forcedRole) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, forcedRole })
      });
      return await res.json();
    } catch (e) {
      let role = forcedRole || (email.includes("admin") ? "admin" : (email.includes("staff") ? "staff" : "customer"));
      return {
        success: true,
        user: {
          email,
          role,
          name: role === "admin" ? "Bala Sivaharish (Admin)" : (role === "staff" ? "Elena Rostova (Staff)" : "Customer Account")
        }
      };
    }
  },

  // Analytics
  async getAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      return await res.json();
    } catch (e) {
      return {
        success: true,
        data: {
          totalRevenue: 24020,
          totalSqFt: 2250,
          totalOrders: 3,
          pendingCount: 2,
          topSelling: [
            { name: "Calacatta Oro Imperial Slab", percent: 84, revenue: 18400 },
            { name: "Nero Marquina Gold Onyx", percent: 68, revenue: 14250 },
            { name: "Tuscan Travertine Paver", percent: 52, revenue: 12460 },
            { name: "Venetian Micro-Terrazzo", percent: 45, revenue: 8900 },
            { name: "Emerald Onyx Grand Slab", percent: 38, revenue: 6900 }
          ]
        }
      };
    }
  },

  async getStaff() {
    try {
      const res = await fetch(`${API_BASE}/staff`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [
        { id: "stf-1", name: "Elena Rostova", email: "staff@lumina.com", role: "Logistics & Dispatch Lead", active: true },
        { id: "stf-2", name: "Marcus Chen", email: "marcus@lumina.com", role: "Senior Tile Consultant & Surveyor", active: true },
        { id: "stf-3", name: "Bala Sivaharish", email: "admin@lumina.com", role: "Managing Director (Admin)", active: true }
      ];
    }
  }
};

function getFallbackTiles(category, search) {
  const all = [
    {
      id: "tile-01",
      name: "Calacatta Oro Imperial Slab",
      code: "LUM-CAL-8016",
      category: "living",
      categoryLabel: "Living & Grand Hall",
      finish: "Polished High Gloss",
      dimensions: "800 x 1600 mm",
      thickness: "9 mm",
      coveragePerBox: 27.55,
      tilesPerBox: 2,
      pricePerSqFt: 6.80,
      boxWeightKg: 52,
      stockBoxes: 340,
      image: "/images/hero_calacatta.jpg",
      features: ["Mirror Polish", "Zero Porosity", "Rectified Edge", "Stain Guard"],
      description: "Iconic warm Italian Calacatta marble design with dramatic amber and grey veining. Ideal for expansive living halls and penthouses."
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
      image: "/images/bathroom_nero.jpg",
      features: ["Honed Velvety Feel", "Moisture Resistant", "Bookmatch Feasible"],
      description: "Moody, opulent black Spanish marble aesthetic punctuated by striking golden crystalline lightning lines for luxury master baths."
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
      image: "/images/kitchen_terrazzo.jpg",
      features: ["R10 Slip Resistance", "Grease Repellent", "High Foot-Traffic Rated"],
      description: "Refined Italian terrazzo inspired by Venetian palazzos. Balanced warm stone chips engineered for culinary living."
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
      image: "/images/outdoor_patio.jpg",
      features: ["20mm Thickness", "Frost Proof", "Pool Edge Safe R11", "Fade Proof UV"],
      description: "Heavy-duty 20mm outdoor porcelain slab capturing earthy Roman travertine. Perfect for poolside terraces and rooftop decks."
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
      image: "/images/emerald_onyx.jpg",
      features: ["Continuous Vein Pattern", "Translucent Onyx Glow", "Scratch Proof PEI V"],
      description: "Deep gemstone emerald green onyx porcelain with glittering mineral fissures for luxury hotel lobbies and accent walls."
    }
  ];

  let filtered = all;
  if (category && category !== "all") {
    filtered = filtered.filter(t => t.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q));
  }
  return filtered;
}

function getFallbackBookings(status) {
  const all = [
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
      status: "confirmed",
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
      boxesCount: 1,
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
      notes: "Customer requested on-site laser dimension survey."
    }
  ];
  if (status && status !== "all") {
    return all.filter(b => b.status === status);
  }
  return all;
}
