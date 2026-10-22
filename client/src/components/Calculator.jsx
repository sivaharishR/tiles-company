import React, { useState } from 'react';
import { Calculator as CalcIcon, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Calculator({ tiles, onBookCalculated }) {
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(15);
  const [selectedTileId, setSelectedTileId] = useState('tile-01');
  const [wastagePercent, setWastagePercent] = useState(10);

  const selectedTile = tiles.find(t => t.id === selectedTileId) || tiles[0];

  const baseArea = (parseFloat(length) || 0) * (parseFloat(width) || 0);
  const wastageArea = baseArea * (wastagePercent / 100);
  const totalArea = Math.round((baseArea + wastageArea) * 100) / 100;

  const coveragePerBox = selectedTile?.coveragePerBox || 25;
  const boxesCount = Math.ceil(totalArea / coveragePerBox);
  const actualCoverage = Math.round(boxesCount * coveragePerBox * 100) / 100;
  const totalTilesCount = boxesCount * (selectedTile?.tilesPerBox || 2);
  const estWeight = Math.round(boxesCount * (selectedTile?.boxWeightKg || 45));
  const totalPrice = Math.round(actualCoverage * (selectedTile?.pricePerSqFt || 6.5) * 100) / 100;

  const handleBookNow = () => {
    onBookCalculated({
      tileId: selectedTile.id,
      length,
      width,
      totalArea,
      boxesCount,
      totalPrice
    });
  };

  return (
    <section id="calculator" className="section" style={{ background: '#0e131d' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-tagline">Precision Estimation</div>
          <h2 className="section-title">Smart Tile Area & Box Calculator</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Avoid jobsite shortages. Calculate exact square footage, recommended wastage margins, box counts, and logistical weights before ordering.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)'
        }}>
          {/* Inputs Column */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CalcIcon size={20} color="var(--gold-primary)" />
              <span>Project Dimensions & Specification</span>
            </h3>

            {/* Tile Select */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Select Desired Tile Model
              </label>
              <select
                value={selectedTileId}
                onChange={(e) => setSelectedTileId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(11, 15, 23, 0.8)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                {tiles.map(t => (
                  <option key={t.id} value={t.id} style={{ background: '#121824', color: '#fff' }}>
                    {t.name} ({t.dimensions}) — ${t.pricePerSqFt?.toFixed(2)}/sq.ft
                  </option>
                ))}
              </select>
            </div>

            {/* Room Dimensions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Room Length (Feet)
                </label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(11, 15, 23, 0.8)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Room Width (Feet)
                </label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(11, 15, 23, 0.8)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Wastage Margin */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Wastage Allowance (Cutting & Edge Trim)
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { val: 5, label: '5% (Simple Rectilinear)' },
                  { val: 10, label: '10% (Recommended Standard)' },
                  { val: 15, label: '15% (Diagonal/Herringbone)' }
                ].map(item => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setWastagePercent(item.val)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: wastagePercent === item.val ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.04)',
                      color: wastagePercent === item.val ? '#0b0f17' : 'var(--text-muted)',
                      border: `1px solid ${wastagePercent === item.val ? 'var(--gold-primary)' : 'var(--border-light)'}`,
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(18, 24, 36, 0.95) 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
                Calculation Breakdown
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed var(--border-subtle)', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Net Room Area:</span>
                <strong style={{ color: '#fff' }}>{baseArea.toFixed(1)} sq.ft</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed var(--border-subtle)', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Wastage Included:</span>
                <strong style={{ color: 'var(--gold-light)' }}>+{wastageArea.toFixed(1)} sq.ft ({wastagePercent}%)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed var(--border-subtle)', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Required Boxes:</span>
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{boxesCount} Boxes</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed var(--border-subtle)', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Individual Tiles:</span>
                <strong style={{ color: '#fff' }}>{totalTilesCount} pcs</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed var(--border-subtle)', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Est. Freight Weight:</span>
                <strong style={{ color: '#fff' }}>~{estWeight} kg</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '16px', marginTop: '12px', borderTop: '1px solid var(--border-gold)' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>Total Material Cost:</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                  ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleBookNow}
              style={{ width: '100%', marginTop: '24px', padding: '14px' }}
            >
              <span>Add to Booking Request</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
