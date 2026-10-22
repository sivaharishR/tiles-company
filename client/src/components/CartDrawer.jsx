import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onRemoveFromCart, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.7)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--gold-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              Booking Cart
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', display: 'grid', placeItems: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 10px', color: 'var(--text-dim)' }}>
              Your booking cart is currently empty.
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  gap: '14px',
                  background: 'rgba(11, 15, 23, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '65px', height: '65px', borderRadius: '6px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 600 }}>{item.name}</h5>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.type === 'sample' ? 'Physical Swatch Sample' : '1 Box Quantity'} • Qty: {item.qty}
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--gold-light)', fontWeight: 700, marginTop: '4px' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromCart(idx)}
                  style={{ color: 'var(--text-dim)', padding: '4px' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(11, 15, 23, 0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              <span>Subtotal:</span>
              <span style={{ color: 'var(--gold-light)' }}>${subtotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
              onClick={onCheckout}
            >
              <span>Proceed to Booking</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
