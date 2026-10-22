import React, { useState } from 'react';
import { Shield, Plus, Download, RefreshCw, Trash2, Edit, Users, DollarSign, Layers } from 'lucide-react';

export default function AdminDashboard({
  user,
  tiles,
  bookings,
  staff,
  onAddTile,
  onUpdateTilePrice,
  onDeleteTile,
  onResetData,
  onReturnToSite
}) {
  const [tab, setTab] = useState('catalog'); // 'catalog', 'analytics', 'staff'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New tile form
  const [newTileName, setNewTileName] = useState('');
  const [newTileCode, setNewTileCode] = useState('');
  const [newTileCategory, setNewTileCategory] = useState('living');
  const [newTileFinish, setNewTileFinish] = useState('Polished High Gloss');
  const [newTileDimensions, setNewTileDimensions] = useState('800 x 1600 mm');
  const [newTilePrice, setNewTilePrice] = useState(7.50);
  const [newTileCoverage, setNewTileCoverage] = useState(27.55);
  const [newTileStock, setNewTileStock] = useState(250);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalSqFt = bookings.reduce((sum, b) => sum + (b.areaSqFt || 0), 0);
  const totalOrders = bookings.length;

  const handleCreateTile = (e) => {
    e.preventDefault();
    if (!newTileName || !newTileCode) {
      alert("Please provide tile name and code.");
      return;
    }

    const created = {
      name: newTileName,
      code: newTileCode,
      category: newTileCategory,
      categoryLabel: newTileCategory.toUpperCase(),
      finish: newTileFinish,
      dimensions: newTileDimensions,
      thickness: '9.5 mm',
      pricePerSqFt: parseFloat(newTilePrice) || 6.5,
      coveragePerBox: parseFloat(newTileCoverage) || 25,
      tilesPerBox: 2,
      boxWeightKg: 46,
      stockBoxes: parseInt(newTileStock, 10) || 100,
      image: '/images/emerald_onyx.jpg',
      features: ['Rectified Edge', 'Zero Porosity', 'Grade 1 Architectural'],
      description: 'Luxury architectural porcelain slab.'
    };

    onAddTile(created);
    setIsAddModalOpen(false);
    setNewTileName('');
    setNewTileCode('');
  };

  const exportCSV = () => {
    let csv = "BookingID,Date,CustomerName,Email,Phone,TileName,Type,Boxes,AreaSqFt,TotalPrice,Status\n";
    bookings.forEach(b => {
      csv += `"${b.id}","${b.bookingDate}","${b.customerName}","${b.email}","${b.phone}","${b.tileName}","${b.type}","${b.boxesCount}","${b.areaSqFt}","${b.totalPrice}","${b.status}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lumina_tiles_bookings_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div style={{ padding: '40px 0 80px', minHeight: 'calc(100vh - var(--nav-height))', background: '#080b11' }}>
      <div className="container">
        {/* Top Info Banner */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '10px',
          padding: '12px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.88rem',
          color: '#fca5a5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} />
            <span>Executive Admin Portal • Authenticated as <strong>{user.name}</strong></span>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onReturnToSite}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            ← View Customer Site
          </button>
        </div>

        {/* Header with Global Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#fff', fontWeight: 800 }}>
              Executive Administration
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Catalog pricing authority, commercial revenue metrics, and company staff controls.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={16} />
              <span>Add New Tile</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={exportCSV}>
              <Download size={16} />
              <span>Export Bookings CSV</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onResetData} title="Reset to Factory Seeds">
              <RefreshCw size={16} />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--gold-primary)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Booked Revenue</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-light)', marginTop: '6px' }}>
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--accent-emerald)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Sq.Ft Scheduled</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '6px' }}>
              {totalSqFt.toLocaleString('en-US')} sq.ft
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--accent-blue)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Project Orders</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#93c5fd', marginTop: '6px' }}>
              {totalOrders} Orders
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderLeft: '4px solid var(--accent-rose)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Catalog Active Slabs</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fca5a5', marginTop: '6px' }}>
              {tiles.length} Models
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '28px' }}>
          <button
            onClick={() => setTab('catalog')}
            style={{
              padding: '12px 24px',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: tab === 'catalog' ? 'var(--gold-primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${tab === 'catalog' ? 'var(--gold-primary)' : 'transparent'}`
            }}
          >
            Catalog Inventory CRUD
          </button>
          <button
            onClick={() => setTab('analytics')}
            style={{
              padding: '12px 24px',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: tab === 'analytics' ? 'var(--gold-primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${tab === 'analytics' ? 'var(--gold-primary)' : 'transparent'}`
            }}
          >
            Revenue & Model Distribution
          </button>
          <button
            onClick={() => setTab('staff')}
            style={{
              padding: '12px 24px',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: tab === 'staff' ? 'var(--gold-primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${tab === 'staff' ? 'var(--gold-primary)' : 'transparent'}`
            }}
          >
            Company Staff Directory
          </button>
        </div>

        {/* Tab 1: Catalog CRUD */}
        {tab === 'catalog' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(11, 15, 23, 0.7)', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 20px' }}>Tile Model</th>
                    <th style={{ padding: '14px 20px' }}>Category</th>
                    <th style={{ padding: '14px 20px' }}>Dimensions</th>
                    <th style={{ padding: '14px 20px' }}>Price / Sq.Ft</th>
                    <th style={{ padding: '14px 20px' }}>Box Coverage</th>
                    <th style={{ padding: '14px 20px' }}>Stock</th>
                    <th style={{ padding: '14px 20px' }}>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tiles.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={t.image} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border-gold)' }} />
                          <div>
                            <strong style={{ color: '#fff' }}>{t.name}</strong>
                            <div style={{ fontSize: '0.72rem', color: 'var(--gold-primary)' }}>{t.code}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span className="badge badge-gold">{t.category}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>{t.dimensions}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <strong style={{ color: 'var(--gold-light)' }}>${t.pricePerSqFt?.toFixed(2)}</strong>
                      </td>
                      <td style={{ padding: '16px 20px' }}>{t.coveragePerBox} sq.ft</td>
                      <td style={{ padding: '16px 20px' }}>{t.stockBoxes} Boxes</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              const newPrice = prompt(`Set new price per sq.ft for "${t.name}":`, t.pricePerSqFt);
                              if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                                onUpdateTilePrice(t.id, parseFloat(newPrice));
                              }
                            }}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid var(--border-light)',
                              color: '#fff',
                              fontSize: '0.76rem',
                              fontWeight: 600
                            }}
                          >
                            Edit $
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${t.name}" from catalog?`)) {
                                onDeleteTile(t.id);
                              }
                            }}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '4px',
                              background: 'rgba(244, 63, 94, 0.1)',
                              border: '1px solid var(--accent-rose)',
                              color: '#fb7185',
                              fontSize: '0.76rem',
                              fontWeight: 600
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Analytics Distribution */}
        {tab === 'analytics' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff', marginBottom: '24px' }}>
              Top Selling Tile Models by Revenue Volume
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { name: 'Calacatta Oro Imperial Slab', percent: 84, revenue: '$18,400' },
                { name: 'Nero Marquina Gold Onyx', percent: 68, revenue: '$14,250' },
                { name: 'Tuscan Travertine Anti-Slip Paver', percent: 52, revenue: '$12,460' },
                { name: 'Venetian Micro-Terrazzo Beige', percent: 45, revenue: '$8,900' },
                { name: 'Emerald Onyx Grand Slab', percent: 38, revenue: '$6,900' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                    <strong style={{ color: '#fff' }}>{item.name}</strong>
                    <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>{item.revenue} ({item.percent}%)</span>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.percent}%`, background: 'var(--gold-gradient)', borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Staff Accounts */}
        {tab === 'staff' && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(11, 15, 23, 0.7)', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 20px' }}>Staff Name</th>
                    <th style={{ padding: '14px 20px' }}>Email Address</th>
                    <th style={{ padding: '14px 20px' }}>Assigned Role</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '16px 20px' }}><strong style={{ color: '#fff' }}>{s.name}</strong></td>
                      <td style={{ padding: '16px 20px' }}>{s.email}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span className={`badge ${s.role.includes('Admin') ? 'badge-rose' : 'badge-blue'}`}>{s.role}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span className="status-pill status-delivered">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Tile */}
        {isAddModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <div className="modal-header">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>
                  Add Architectural Tile Model
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} style={{ color: 'var(--text-muted)' }}>✕</button>
              </div>
              <form onSubmit={handleCreateTile} style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Tile Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arabescato Vagli Slabs"
                      value={newTileName}
                      onChange={(e) => setNewTileName(e.target.value)}
                      style={{ width: '100%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Model Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LUM-ARA-8016"
                      value={newTileCode}
                      onChange={(e) => setNewTileCode(e.target.value)}
                      style={{ width: '100%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Category</label>
                    <select
                      value={newTileCategory}
                      onChange={(e) => setNewTileCategory(e.target.value)}
                      style={{ width: '100%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px', color: '#fff' }}
                    >
                      <option value="living">Living & Grand Hall</option>
                      <option value="bathroom">Bathroom & Spa</option>
                      <option value="kitchen">Kitchen & Dining</option>
                      <option value="outdoor">Outdoor & Terraces</option>
                      <option value="feature-wall">Feature Wall Slabs</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Price / Sq.Ft ($)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={newTilePrice}
                      onChange={(e) => setNewTilePrice(e.target.value)}
                      style={{ width: '100%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Dimensions</label>
                    <input
                      type="text"
                      value={newTileDimensions}
                      onChange={(e) => setNewTileDimensions(e.target.value)}
                      style={{ width: '100%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Initial Stock (Boxes)</label>
                    <input
                      type="number"
                      value={newTileStock}
                      onChange={(e) => setNewTileStock(e.target.value)}
                      style={{ width: '100%', background: 'rgba(11,15,23,0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save to Catalog</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
