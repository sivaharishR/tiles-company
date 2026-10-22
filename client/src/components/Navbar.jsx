import React from 'react';
import { ShoppingBag, User, Shield, Briefcase, Sparkles, LogOut } from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  user, 
  setUser, 
  cartCount, 
  openCart, 
  openAuthModal 
}) {
  const handleQuickSwitch = (role) => {
    if (role === 'admin') {
      setUser({ role: 'admin', name: 'Bala Sivaharish (Admin)', email: 'admin@lumina.com' });
      setCurrentView('admin');
    } else if (role === 'staff') {
      setUser({ role: 'staff', name: 'Elena Rostova (Staff)', email: 'staff@lumina.com' });
      setCurrentView('staff');
    } else {
      setUser({ role: 'customer', name: 'Julian Vance (Client)', email: 'julian@vance-arch.com' });
      setCurrentView('landing');
    }
  };

  const handleLogout = () => {
    setUser({ role: 'guest', name: 'Guest Explorer', email: '' });
    setCurrentView('landing');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(11, 15, 23, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            background: 'var(--gold-gradient)',
            borderRadius: '10px',
            display: 'grid',
            placeItems: 'center',
            color: '#0b0f17',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            boxShadow: '0 4px 16px var(--gold-glow)'
          }}>
            L
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.06em', color: '#fff' }}>
              LUMINA
            </span>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.3em', color: 'var(--gold-primary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Ceramica & Stone
            </span>
          </div>
        </div>

        {/* Navigation Links (when on customer landing) */}
        {currentView === 'landing' && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#catalog" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Catalog</a>
            <a href="#visualizer" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Room Visualizer</a>
            <a href="#calculator" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Area Calculator</a>
            <a href="#consultation" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Site Survey</a>
          </nav>
        )}

        {/* View Switcher / Portals Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* 1-Click Role Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem'
          }}>
            <button 
              onClick={() => handleQuickSwitch('customer')}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                background: user.role === 'customer' || user.role === 'guest' ? 'var(--gold-primary)' : 'transparent',
                color: user.role === 'customer' || user.role === 'guest' ? '#000' : 'var(--text-muted)',
                fontWeight: user.role === 'customer' || user.role === 'guest' ? 700 : 500
              }}
            >
              Customer
            </button>
            <button 
              onClick={() => handleQuickSwitch('staff')}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                background: user.role === 'staff' ? '#3b82f6' : 'transparent',
                color: user.role === 'staff' ? '#fff' : 'var(--text-muted)',
                fontWeight: user.role === 'staff' ? 700 : 500
              }}
            >
              Staff Portal
            </button>
            <button 
              onClick={() => handleQuickSwitch('admin')}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                background: user.role === 'admin' ? '#ef4444' : 'transparent',
                color: user.role === 'admin' ? '#fff' : 'var(--text-muted)',
                fontWeight: user.role === 'admin' ? 700 : 500
              }}
            >
              Admin Portal
            </button>
          </div>

          {/* Cart Button */}
          <button 
            onClick={openCart}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              padding: '9px 14px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem'
            }}
          >
            <ShoppingBag size={17} color="var(--gold-primary)" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: 'var(--gold-primary)',
                color: '#0b0f17',
                fontSize: '0.72rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User / Auth Button */}
          {user.role !== 'guest' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={openAuthModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  color: '#fff'
                }}
              >
                {user.role === 'admin' ? <Shield size={16} color="#f87171" /> : (user.role === 'staff' ? <Briefcase size={16} color="#60a5fa" /> : <User size={16} color="var(--gold-light)" />)}
                <span>{user.name.split(' ')[0]}</span>
                <span className={`badge ${user.role === 'admin' ? 'badge-rose' : (user.role === 'staff' ? 'badge-blue' : 'badge-gold')}`}>
                  {user.role}
                </span>
              </button>
              <button 
                onClick={handleLogout}
                title="Logout"
                style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-muted)'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-outline-gold btn-sm"
              onClick={openAuthModal}
            >
              <User size={15} />
              <span>Login / Staff</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
