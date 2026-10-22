import React, { useState } from 'react';
import { Search, Eye, Plus, Check, ShieldCheck, Box } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'living', label: 'Living & Grand Hall' },
  { id: 'bathroom', label: 'Bathroom & Spa' },
  { id: 'kitchen', label: 'Kitchen & Dining' },
  { id: 'outdoor', label: 'Outdoor & Terraces' },
  { id: 'feature-wall', label: 'Feature Wall Slabs' }
];

export default function Catalog({ tiles, onBookTile, onAddToCart, onPreviewInVisualizer }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTiles = tiles.filter(tile => {
    const matchesCat = activeCategory === 'all' || tile.category === activeCategory;
    const matchesQuery = !searchQuery || 
      tile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tile.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tile.finish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="catalog" className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-tagline">Architectural Portfolio</div>
          <h2 className="section-title">Master Tiles & Slabs Collection</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Precision-manufactured vitrified porcelain, honed marble surfaces, and slip-resistant outdoor pavers. Calibrated to perfection.
          </p>
        </div>

        {/* Controls Bar: Category Tabs & Search */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: 'var(--bg-card)',
          padding: '16px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '36px',
          backdropFilter: 'blur(12px)'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: activeCategory === cat.id ? '#0b0f17' : 'var(--text-muted)',
                  background: activeCategory === cat.id ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
                  boxShadow: activeCategory === cat.id ? '0 2px 10px var(--gold-glow)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by marble, finish, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(11, 15, 23, 0.7)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '9px 14px 9px 36px',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none',
                width: '260px'
              }}
            />
          </div>
        </div>

        {/* Tiles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {filteredTiles.map(tile => {
            const isLow = tile.stockBoxes < 100;
            return (
              <div
                key={tile.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}
              >
                {/* Image Wrap */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#121824' }}>
                  <img
                    src={tile.image}
                    alt={tile.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    className="tile-card-img"
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge badge-gold">{tile.finish}</span>
                  </div>

                  {/* Hover Quick Actions */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => onAddToCart(tile, 'sample')}
                      title="Add Sample to Cart"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(11, 15, 23, 0.85)',
                        border: '1px solid var(--border-light)',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center'
                      }}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() => onPreviewInVisualizer(tile.id)}
                      title="Preview in 3D Visualizer"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(11, 15, 23, 0.85)',
                        border: '1px solid var(--border-light)',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center'
                      }}
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '6px' }}>
                    {tile.categoryLabel || tile.category}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    {tile.name}
                  </h3>
                  
                  {/* Specs */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span>📐 {tile.dimensions}</span>
                    <span>📦 {tile.coveragePerBox} sq.ft/box</span>
                  </div>

                  {/* Price and Stock */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                      ${tile.pricePerSqFt?.toFixed(2)} <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>/ sq.ft</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', color: isLow ? '#fbbf24' : '#34d399' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: isLow ? '#fbbf24' : '#34d399' }}></span>
                      <span>{tile.stockBoxes} Boxes Available</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onBookTile(tile.id, 'sample')}
                    >
                      Free Sample
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onBookTile(tile.id, 'pallet')}
                    >
                      Book Pallet
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
