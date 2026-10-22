import React, { useState } from 'react';
import { X, Shield, Briefcase, User, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer', 'staff', 'admin'
  const [email, setEmail] = useState('julian@vance-arch.com');
  const [password, setPassword] = useState('client123');

  if (!isOpen) return null;

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'admin') {
      setEmail('admin@lumina.com');
      setPassword('admin123');
    } else if (tab === 'staff') {
      setEmail('staff@lumina.com');
      setPassword('staff123');
    } else {
      setEmail('julian@vance-arch.com');
      setPassword('client123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = 'Customer Account';
    if (activeTab === 'admin') name = 'Bala Sivaharish (Admin)';
    if (activeTab === 'staff') name = 'Elena Rostova (Staff)';

    const userObj = {
      role: activeTab,
      name,
      email
    };

    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} color="var(--gold-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#fff', fontWeight: 700 }}>
              Portal Sign-In
            </h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Role Tabs */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(11, 15, 23, 0.7)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => handleSwitchTab('customer')}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                background: activeTab === 'customer' ? 'var(--gold-gradient)' : 'transparent',
                color: activeTab === 'customer' ? '#0b0f17' : 'var(--text-muted)'
              }}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('staff')}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                background: activeTab === 'staff' ? '#3b82f6' : 'transparent',
                color: activeTab === 'staff' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Staff
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('admin')}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                background: activeTab === 'admin' ? '#ef4444' : 'transparent',
                color: activeTab === 'admin' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Admin
            </button>
          </div>

          {/* 1-Click Demo Fill Chips */}
          <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px dashed var(--gold-primary)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.82rem' }}>
            <div style={{ color: 'var(--gold-light)', fontWeight: 600, marginBottom: '6px' }}>
              ⚡ 1-Click Instant Demo Credentials:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span 
                onClick={() => handleSwitchTab('customer')}
                style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-light)', color: '#fff' }}
              >
                Client: julian@vance.com
              </span>
              <span 
                onClick={() => handleSwitchTab('staff')}
                style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-light)', color: '#93c5fd' }}
              >
                Staff: staff@lumina.com
              </span>
              <span 
                onClick={() => handleSwitchTab('admin')}
                style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-light)', color: '#fca5a5' }}
              >
                Admin: admin@lumina.com
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Account Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '11px 14px', color: '#fff' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Secure Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '11px 14px', color: '#fff' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '13px' }}>
              <span>Enter {activeTab.toUpperCase()} Portal</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
