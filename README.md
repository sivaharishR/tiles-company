# LUMINA CERAMICA — Luxury Architectural Tiles & Slabs Web Platform

A fullstack web application for an architectural tiles and surface company featuring a **React.js** frontend and an **Express / Node.js** REST API backend.

---

## 🌟 Core Features

### 1. Luxury Customer Landing Page
- **Cinematic Architectural Hero**: High-resolution imagery, gold gradient accents, and real-time trust metrics (500+ Luxury Slabs, 12,500+ Projects Fitted, 15-Year Factory Warranty, 0.05% Impervious Porosity).
- **Interactive 3D Room Visualizer**: Test tile finishes across 4 environments (*Imperial Living Salon*, *Master Spa Wellness Suite*, *Gourmet Chef Kitchen*, *Poolside Travertine Patio*).
- **Master Tile Catalog**: Filter by category (*Living, Bathroom, Kitchen, Outdoor, Feature Wall*), live search, real-time stock levels, dimensions, and price per sq.ft.
- **Smart Area & Wastage Calculator**: Computes exact square footage, recommended wastage margins (5%, 10%, 15%), required box counts, estimated weight in kg, and total cost with 1-click booking sync.
- **Showroom & Laser Survey Booking**: Complimentary site consultation with precision laser measurement.

### 2. Multi-Mode Tiles Booking System
- **Pallet Bulk Orders**: Comprehensive project order calculation, box quantities, freight offloading options.
- **Sample Swatch Kits ($15)**: Curated physical 15x15cm cut samples delivered to doorstep.
- **Complimentary Architectural Consultation**: Schedule on-site survey and laser measurement.
- **Instant Booking Receipt**: Generates unique tracking ID (`BK-XXXX`) with full breakdown and receipt dialog.
- **Slide-Over Booking Cart**: Add samples and boxes to cart with live subtotal.

### 3. Company Staff Portal
- **Operational Dispatch Dashboard**: Live KPI cards for pending dispatches, sample requests, and consultation schedules.
- **Bookings Pipeline Manager**: Filter by status (*Pending, Confirmed, Dispatched, Delivered, Cancelled*).
- **Status Workflow Updates**: Update order lifecycle and record customer jobsite delivery notes.
- **Warehouse Inventory Quick-Editor**: Adjust available stock boxes on the fly with low-stock warnings.

### 4. Executive Admin Portal
- **Executive Analytics**: Gross booked revenue, total sq.ft shipped, conversion metrics, and top-selling collections distribution.
- **Catalog Management (CRUD)**:
  - Add New Tile Model (*Name, Code, Category, Finish, Dimensions, Price/Sq.Ft, Coverage, Initial Stock*).
  - Inline price editing.
  - Delete tile from catalog.
- **Staff Accounts Management**: View active staff members and roles.
- **Reporting**: Export bookings directly to CSV format.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "tiles company"
   ```

2. **Start the Express Backend API**:
   ```bash
   cd server
   npm install
   node server.js
   ```
   *Backend runs on `http://localhost:5000`*

3. **Start the React Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *Frontend opens at `http://localhost:5173`*

---

## 🔑 Demo Access Credentials

The platform features a **1-click role switcher** in the top navigation bar, or you can sign in using these pre-configured accounts:

| Portal | Role | Email | Password |
| :--- | :--- | :--- | :--- |
| **Customer Site** | Customer | `julian@vance-arch.com` | `client123` |
| **Staff Portal** | Staff Lead | `staff@lumina.com` | `staff123` |
| **Admin Portal** | Managing Director | `admin@lumina.com` | `admin123` |

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, Lucide React, Modern CSS3 with Design Tokens & Glassmorphism
- **Backend**: Node.js, Express, CORS, JSON Persistent Store
- **Design Aesthetic**: Deep Obsidian & Slate, Champagne Gold, Tuscan Stone, Emerald Glaze Accents
