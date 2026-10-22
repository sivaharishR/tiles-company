import React, { useState } from 'react';
import { Eye, Check, Sparkles, ArrowRight } from 'lucide-react';

const ROOMS = [
  { id: 'living', name: 'Imperial Living Salon', defaultTile: 'tile-01', image: '/images/hero_calacatta.jpg' },
  { id: 'bathroom', name: 'Master Spa Suite', defaultTile: 'tile-02', image: '/images/bathroom_nero.jpg' },
  { id: 'kitchen', name: 'Gourmet Chef Kitchen', defaultTile: 'tile-03', image: '/images/kitchen_terrazzo.jpg' },
  { id: 'outdoor', name: 'Poolside Travertine Patio', defaultTile: 'tile-04', image: '/images/outdoor_patio.jpg' }
];

export default function Visualizer({ tiles, onBookTile }) {
  const [activeRoom, setActiveRoom] = useState(ROOMS[0]);
  const [activeTileId, setActiveTileId] = useState('tile-01');
  const [grout, setGrout] = useState('gold');

  const selectedTile = tiles.find(t => t.id === activeTileId) || tiles[0];

  const handleRoomChange = (room) => {
    setActiveRoom(room);
    setActiveTileId(room.defaultTile);
  };

  return (
    <section id="visualizer" className="section" style={{ background: '#090d14' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-tagline">3D Architectural Preview</div>
          <h2 className="section-title">Interactive Room Visualizer</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Experiment with large-format porcelain slabs across various living environments. Inspect surface reflections, light diffusion, and grout pairing in real-time.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.35fr 0.85fr',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Visualizer Viewport */}
          <div style={{ position: 'relative', minHeight: '520px', background: '#000', overflow: 'hidden' }}>
            <img 
              src={selectedTile?.image || activeRoom.image} 
              alt={selectedTile?.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
            />
            {/* Ambient vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(0,0,0,0.65) 100%)'
            }} />

            {/* Room Indicator Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(11, 15, 23, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: '#fff',
              zIndex: 10
            }}>
              <Eye size={16} color="var(--gold-primary)" />
              <span>{activeRoom.name}</span>
            </div>
          </div>

          {/* Controls Panel */}
          <div style={{
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(18, 24, 36, 0.95)',
            borderLeft: '1px solid var(--border-subtle)'
          }}>
            {/* Room selection */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: '12px' }}>
                1. Select Environment
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {ROOMS.map(room => (
                  <button
                    key={room.id}
                    onClick={() => handleRoomChange(room)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: activeRoom.id === room.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${activeRoom.id === room.id ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                      color: activeRoom.id === room.id ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {room.name.split(' ')[0]} {room.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tile Swatch Selection */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: '12px' }}>
                2. Select Tile Surface
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {tiles.slice(0, 6).map(tile => {
                  const isActive = tile.id === activeTileId;
                  return (
                    <div
                      key={tile.id}
                      onClick={() => setActiveTileId(tile.id)}
                      style={{
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                        border: `1px solid ${isActive ? 'var(--gold-primary)' : 'transparent'}`,
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '54px',
                        borderRadius: '6px',
                        backgroundImage: `url(${tile.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: '6px',
                        border: `2px solid ${isActive ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.15)'}`,
                        boxShadow: isActive ? '0 0 12px var(--gold-glow)' : 'none'
                      }} />
                      <div style={{ fontSize: '0.72rem', color: isActive ? '#fff' : 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tile.name.split(' ')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary & Book Look */}
            {selectedTile && (
              <div style={{
                marginTop: 'auto',
                padding: '20px',
                background: 'rgba(11, 15, 23, 0.7)',
                borderRadius: '12px',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>
                    {selectedTile.name}
                  </h4>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '1.1rem' }}>
                    ${selectedTile.pricePerSqFt?.toFixed(2)}/sq.ft
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {selectedTile.dimensions} • {selectedTile.finish} • Zero Porosity
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => onBookTile(selectedTile.id, 'pallet')}
                >
                  <span>Book This Tile Look</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
