import React, { useState, useEffect } from 'react';
import { api } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Visualizer from './components/Visualizer';
import Catalog from './components/Catalog';
import Calculator from './components/Calculator';
import ShowroomConsultation from './components/ShowroomConsultation';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CartDrawer from './components/CartDrawer';
import StaffDashboard from './components/StaffDashboard';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'staff', 'admin'
  const [user, setUser] = useState({
    role: 'guest',
    name: 'Guest Explorer',
    email: '',
    isLoggedIn: false
  });

  const [tiles, setTiles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Modals & Drawers
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTileId, setBookingTileId] = useState('tile-01');
  const [bookingMode, setBookingMode] = useState('pallet');
  const [bookingPrefill, setBookingPrefill] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Initial Data Fetch
  useEffect(() => {
    async function initData() {
      const fetchedTiles = await api.getTiles();
      setTiles(fetchedTiles);
      const fetchedBookings = await api.getBookings();
      setBookings(fetchedBookings);
      const fetchedStaff = await api.getStaff();
      setStaff(fetchedStaff);
    }
    initData();
  }, []);

  // Cart operations
  const handleAddToCart = (tile, type = 'sample') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === tile.id && item.type === type);
      if (existing) {
        return prev.map(item => item.id === tile.id && item.type === type ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, {
        id: tile.id,
        name: tile.name,
        type: type,
        price: type === 'sample' ? 15.00 : tile.pricePerSqFt * tile.coveragePerBox,
        qty: 1,
        image: tile.image
      }];
    });
    showToast(`Added ${tile.name} to Cart`, 'success');
  };

  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  // Booking triggers
  const handleOpenBooking = (tileId = null, mode = 'pallet', prefill = null) => {
    if (tileId) setBookingTileId(tileId);
    setBookingMode(mode);
    setBookingPrefill(prefill);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = async (newBooking) => {
    await api.createBooking(newBooking);
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking ${newBooking.id} confirmed and saved to system!`, 'success');
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    await api.updateBookingStatus(bookingId, status);
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Booking ${bookingId} status changed to ${status.toUpperCase()}`, 'success');
  };

  const handleUpdateTileStock = async (tileId, newStock) => {
    await api.updateTile(tileId, { stockBoxes: newStock });
    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, stockBoxes: newStock } : t));
    showToast(`Stock updated successfully.`, 'success');
  };

  const handleAddTile = async (tileData) => {
    const res = await api.addTile(tileData);
    const created = res.data || tileData;
    setTiles(prev => [created, ...prev]);
    showToast(`Added ${created.name} to catalog!`, 'success');
  };

  const handleUpdateTilePrice = async (tileId, newPrice) => {
    await api.updateTile(tileId, { pricePerSqFt: newPrice });
    setTiles(prev => prev.map(t => t.id === tileId ? { ...t, pricePerSqFt: newPrice } : t));
    showToast(`Price updated to $${newPrice.toFixed(2)}/sq.ft`, 'success');
  };

  const handleDeleteTile = async (tileId) => {
    await api.deleteTile(tileId);
    setTiles(prev => prev.filter(t => t.id !== tileId));
    showToast(`Tile removed from catalog.`, 'info');
  };

  const handleResetData = async () => {
    if (confirm("Reset all tiles, bookings and staff data to factory demo?")) {
      await fetch("http://localhost:5000/api/reset", { method: "POST" }).catch(() => {});
      window.location.reload();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Layer */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <div>{t.message}</div>
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        setUser={setUser}
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)}
        openCart={() => setIsCartOpen(true)}
        openAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <>
            <Hero
              onOpenBooking={(tileId, mode) => handleOpenBooking(tileId, mode)}
              onExploreCatalog={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              onOpenVisualizer={() => document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <Visualizer
              tiles={tiles}
              onBookTile={(tileId, mode) => handleOpenBooking(tileId, mode)}
            />
            <Catalog
              tiles={tiles}
              onBookTile={(tileId, mode) => handleOpenBooking(tileId, mode)}
              onAddToCart={(tile, type) => handleAddToCart(tile, type)}
              onPreviewInVisualizer={(tileId) => {
                setBookingTileId(tileId);
                document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <Calculator
              tiles={tiles}
              onBookCalculated={(calcData) => handleOpenBooking(calcData.tileId, 'pallet', calcData)}
            />
            <ShowroomConsultation
              onOpenConsultation={() => handleOpenBooking(null, 'consultation')}
            />
          </>
        )}

        {currentView === 'staff' && (
          <StaffDashboard
            user={user}
            bookings={bookings}
            tiles={tiles}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onUpdateTileStock={handleUpdateTileStock}
            onReturnToSite={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            user={user}
            tiles={tiles}
            bookings={bookings}
            staff={staff}
            onAddTile={handleAddTile}
            onUpdateTilePrice={handleUpdateTilePrice}
            onDeleteTile={handleDeleteTile}
            onResetData={handleResetData}
            onReturnToSite={() => setCurrentView('landing')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSwitchToStaff={() => {
          setUser({ role: 'staff', name: 'Elena Rostova (Staff)', email: 'staff@lumina.com' });
          setCurrentView('staff');
        }}
        onSwitchToAdmin={() => {
          setUser({ role: 'admin', name: 'Bala Sivaharish (Admin)', email: 'admin@lumina.com' });
          setCurrentView('admin');
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTileId={bookingTileId}
        initialMode={bookingMode}
        prefillData={bookingPrefill}
        tiles={tiles}
        onBookingCreated={handleBookingCreated}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          handleOpenBooking(cart[0]?.id || 'tile-01', cart[0]?.type || 'pallet');
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`Welcome, ${loggedUser.name}!`, 'success');
          if (loggedUser.role === 'admin') setCurrentView('admin');
          else if (loggedUser.role === 'staff') setCurrentView('staff');
          else setCurrentView('landing');
        }}
      />
    </div>
  );
}
