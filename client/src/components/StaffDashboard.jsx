import React, { useState } from 'react';
import { Briefcase, Package, Truck, Calendar, CheckCircle, AlertTriangle, Save, Eye } from 'lucide-react';

export default function StaffDashboard({
  user,
  bookings,
  tiles,
  onUpdateBookingStatus,
  onUpdateTileStock,
  onReturnToSite
}) {
  const [filter, setFilter] = useState('all');
  const [stockEdits, setStockEdits] = useState({});

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const pendingCount = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
  const sampleCount = bookings.filter(b => b.type === 'sample').length;
  const consultCount = bookings.filter(b => b.type === 'consultation').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const handleStockChange = (tileId, val) => {
    setStockEdits(prev => ({ ...prev, [tileId]: val }));
  };

  const handleSaveStock = (tileId) => {
    const val = stockEdits[tileId];
    if (val !== undefined) {
      onUpdateTileStock(tileId, parseInt(val, 10));
    }
  };

  return (
    <div style={{ padding: '40px 0 80px', minHeight: 'calc(100vh - var(--nav-height))', background: '#080b11' }}>
      <div className="container">
        {/* Top Info Banner */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '10px',
          padding: '12px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.88rem',
          color: '#93c5fd'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={18} />
            <span>Logged in as <strong>{user.name}</strong> • Operations & Dispatch Desk</span>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onReturnToSite}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            ← View Customer Site
          </button>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>
              Company Staff Portal
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Real-time dispatch pipeline, jobsite appointments, and warehouse inventory adjustment.
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--accent-amber)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Dispatches</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>{pendingCount}</div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--gold-primary)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sample Box Requests</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-light)', marginTop: '6px' }}>{sampleCount}</div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--accent-blue)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Site Consultations</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#93c5fd', marginTop: '6px' }}>{consultCount}</div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--accent-emerald)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Active Pipeline</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '6px' }}>
              ${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* Section 1: Bookings Management */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              Live Customer Bookings ({filteredBookings.length})
            </h3>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: filter === st ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)',
                    color: filter === st ? '#0b0f17' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(11, 15, 23, 0.7)', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 20px' }}>Booking ID</th>
                  <th style={{ padding: '14px 20px' }}>Customer & Site</th>
                  <th style={{ padding: '14px 20px' }}>Tile Model / Service</th>
                  <th style={{ padding: '14px 20px' }}>Scheduled Date</th>
                  <th style={{ padding: '14px 20px' }}>Amount</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <strong style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>{b.id}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{b.bookingDate}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{b.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.email} • {b.phone}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '2px' }}>📍 {b.siteAddress}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ color: '#fff' }}>{b.tileName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>
                        {b.typeLabel} {b.boxesCount ? `(${b.boxesCount} boxes)` : ''}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)' }}>
                      {b.deliveryDate}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <strong>${(b.totalPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className={`status-pill status-${b.status}`}>{b.status}</span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <select
                        value={b.status}
                        onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                        style={{
                          background: 'rgba(11, 15, 23, 0.8)',
                          border: '1px solid var(--border-light)',
                          borderRadius: '6px',
                          color: '#fff',
                          padding: '6px 10px',
                          fontSize: '0.8rem',
                          outline: 'none'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Warehouse Stock Quick-Adjustment */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              Warehouse Inventory Quick-Adjustment
            </h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(11, 15, 23, 0.7)', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 20px' }}>Tile Model</th>
                  <th style={{ padding: '14px 20px' }}>Finish & Code</th>
                  <th style={{ padding: '14px 20px' }}>Price / Sq.Ft</th>
                  <th style={{ padding: '14px 20px' }}>Stock Boxes</th>
                  <th style={{ padding: '14px 20px' }}>Inventory Status</th>
                </tr>
              </thead>
              <tbody>
                {tiles.map(t => {
                  const currentStock = stockEdits[t.id] !== undefined ? stockEdits[t.id] : t.stockBoxes;
                  const isLow = currentStock < 100;
                  return (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={t.image} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div>
                            <strong style={{ color: '#fff' }}>{t.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.dimensions}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div>{t.finish}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--gold-primary)' }}>{t.code}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        ${t.pricePerSqFt?.toFixed(2)}/sq.ft
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="number"
                            min="0"
                            value={currentStock}
                            onChange={(e) => handleStockChange(t.id, e.target.value)}
                            style={{
                              width: '85px',
                              background: 'rgba(0,0,0,0.5)',
                              border: '1px solid var(--border-light)',
                              borderRadius: '6px',
                              color: '#fff',
                              padding: '6px 10px',
                              fontWeight: 700
                            }}
                          />
                          <button
                            onClick={() => handleSaveStock(t.id)}
                            style={{
                              background: 'var(--gold-primary)',
                              color: '#0b0f17',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              padding: '6px 12px',
                              borderRadius: '6px'
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {isLow ? (
                          <span className="status-pill status-pending">LOW STOCK ({currentStock})</span>
                        ) : (
                          <span className="status-pill status-delivered">IN STOCK ({currentStock})</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
