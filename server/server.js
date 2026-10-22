const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Initial Seed Data
const INITIAL_DATA = {
  tiles: [
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
  ],
  bookings: [
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
  ],
  staff: [
    { id: "stf-1", name: "Elena Rostova", email: "staff@lumina.com", role: "Logistics & Dispatch Lead", active: true },
    { id: "stf-2", name: "Marcus Chen", email: "marcus@lumina.com", role: "Senior Tile Consultant & Surveyor", active: true },
    { id: "stf-3", name: "Bala Sivaharish", email: "admin@lumina.com", role: "Managing Director (Admin)", active: true }
  ]
};

// Data Helper Functions
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    saveData(INITIAL_DATA);
    return INITIAL_DATA;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_DATA;
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ---------------- REST API ROUTES ----------------

// 1. Tiles Endpoints
app.get('/api/tiles', (req, res) => {
  const data = loadData();
  const { category, search } = req.query;
  let result = data.tiles;

  if (category && category !== 'all') {
    result = result.filter(t => t.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.code.toLowerCase().includes(q) || 
      t.finish.toLowerCase().includes(q)
    );
  }
  res.json({ success: true, count: result.length, data: result });
});

app.post('/api/tiles', (req, res) => {
  const data = loadData();
  const newTile = {
    id: `tile-${Date.now().toString().slice(-4)}`,
    ...req.body
  };
  data.tiles.unshift(newTile);
  saveData(data);
  res.status(201).json({ success: true, data: newTile });
});

app.put('/api/tiles/:id', (req, res) => {
  const data = loadData();
  const tileIndex = data.tiles.findIndex(t => t.id === req.params.id);
  if (tileIndex === -1) {
    return res.status(404).json({ success: false, message: 'Tile not found' });
  }
  data.tiles[tileIndex] = { ...data.tiles[tileIndex], ...req.body };
  saveData(data);
  res.json({ success: true, data: data.tiles[tileIndex] });
});

app.delete('/api/tiles/:id', (req, res) => {
  const data = loadData();
  data.tiles = data.tiles.filter(t => t.id !== req.params.id);
  saveData(data);
  res.json({ success: true, message: 'Tile deleted successfully' });
});

// 2. Bookings Endpoints
app.get('/api/bookings', (req, res) => {
  const data = loadData();
  const { status, type } = req.query;
  let result = data.bookings;

  if (status && status !== 'all') {
    result = result.filter(b => b.status === status);
  }
  if (type && type !== 'all') {
    result = result.filter(b => b.type === type);
  }
  res.json({ success: true, count: result.length, data: result });
});

app.post('/api/bookings', (req, res) => {
  const data = loadData();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newBooking = {
    id: `BK-${randomNum}`,
    bookingDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    assignedStaff: 'Elena Rostova',
    ...req.body
  };
  data.bookings.unshift(newBooking);
  saveData(data);
  res.status(201).json({ success: true, data: newBooking });
});

app.put('/api/bookings/:id/status', (req, res) => {
  const data = loadData();
  const booking = data.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  booking.status = req.body.status || booking.status;
  if (req.body.assignedStaff) booking.assignedStaff = req.body.assignedStaff;
  if (req.body.notes) booking.notes = req.body.notes;
  saveData(data);
  res.json({ success: true, data: booking });
});

// 3. Auth Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password, forcedRole } = req.body;
  let role = forcedRole;
  let name = "Verified Customer";

  if (!role) {
    if (email && email.includes('admin')) {
      role = 'admin';
      name = 'Bala Sivaharish (Admin)';
    } else if (email && email.includes('staff')) {
      role = 'staff';
      name = 'Elena Rostova (Staff)';
    } else {
      role = 'customer';
      name = (email && email.split('@')[0].replace('.', ' ')) || 'Verified Customer';
    }
  }

  res.json({
    success: true,
    user: {
      email: email || `${role}@lumina.com`,
      role: role || 'customer',
      name: name,
      token: `mock-token-${Date.now()}`
    }
  });
});

// 4. Analytics & Staff Endpoints
app.get('/api/analytics', (req, res) => {
  const data = loadData();
  const totalRevenue = data.bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalSqFt = data.bookings.reduce((sum, b) => sum + (b.areaSqFt || 0), 0);
  const totalOrders = data.bookings.length;
  const pendingCount = data.bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalSqFt,
      totalOrders,
      pendingCount,
      topSelling: [
        { name: "Calacatta Oro Imperial Slab", percent: 84, revenue: 18400 },
        { name: "Nero Marquina Gold Onyx", percent: 68, revenue: 14250 },
        { name: "Tuscan Travertine Paver", percent: 52, revenue: 12460 },
        { name: "Venetian Micro-Terrazzo", percent: 45, revenue: 8900 },
        { name: "Emerald Onyx Grand Slab", percent: 38, revenue: 6900 }
      ]
    }
  });
});

app.get('/api/staff', (req, res) => {
  const data = loadData();
  res.json({ success: true, data: data.staff });
});

app.post('/api/staff', (req, res) => {
  const data = loadData();
  const member = {
    id: `stf-${Date.now().toString().slice(-4)}`,
    active: true,
    ...req.body
  };
  data.staff.push(member);
  saveData(data);
  res.status(201).json({ success: true, data: member });
});

app.post('/api/reset', (req, res) => {
  saveData(INITIAL_DATA);
  res.json({ success: true, message: 'Database reset to default seeds' });
});

app.listen(PORT, () => {
  console.log(`LUMINA Tiles Backend Server running on port ${PORT}`);
});
