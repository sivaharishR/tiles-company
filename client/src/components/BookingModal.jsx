import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Package, Box, Calendar, Truck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BookingModal({
  isOpen,
  onClose,
  initialTileId,
  initialMode = 'pallet',
  prefillData = null,
  tiles,
  onBookingCreated
}) {
  const [mode, setMode] = useState(initialMode);
  const [selectedTileId, setSelectedTileId] = useState(initialTileId || 'tile-01');
  const [step, setStep] = useState(1); // 1: specs, 2: customer details, 3: success receipt

  // Form states
  const [areaSqFt, setAreaSqFt] = useState(500);
  const [custName, setCustName] = useState('Julian Vance Architects');
  const [custEmail, setCustEmail] = useState('julian@vance-arch.com');
  const [custPhone, setCustPhone] = useState('+1 (555) 234-8900');
  const [siteAddress, setSiteAddress] = useState('740 Ocean View Drive, Malibu, CA');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-30');
  const [notes, setNotes] = useState('Standard residential driveway delivery');
  const [createdBooking, setCreatedBooking] = useState(null);

  useEffect(() => {
    if (initialTileId) setSelectedTileId(initialTileId);
    if (initialMode) setMode(initialMode);
    if (prefillData) {
      if (prefillData.totalArea) setAreaSqFt(prefillData.totalArea);
    }
    setStep(1);
    setCreatedBooking(null);
  }, [isOpen, initialTileId, initialMode, prefillData]);

  if (!isOpen) return null;

  const tile = tiles.find(t => t.id === selectedTileId) || tiles[0];
  const coverage = tile?.coveragePerBox || 25;
  const boxes = Math.ceil(areaSqFt / coverage);

  let materialCost = 0;
  let freight = 0;
  let totalCost = 0;

  if (mode === 'pallet') {
    materialCost = boxes * coverage * (tile?.pricePerSqFt || 6.5);
    freight = materialCost > 3000 ? 0 : 150;
    totalCost = materialCost + freight;
  } else if (mode === 'sample') {
    materialCost = 15.00;
    freight = 0;
    totalCost = 15.00;
  } else {
    // consultation
    materialCost = 0;
    freight = 0;
    totalCost = 0;
  }

  const handleSubmit = () => {
    const randomId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: randomId,
      type: mode,
      typeLabel: mode === 'pallet' ? 'Pallet Bulk Booking' : (mode === 'sample' ? 'Sample Swatch Delivery' : 'Site Consultation'),
      tileId: tile.id,
      tileName: tile.name,
      customerName: custName || 'Valued Client',
      email: custEmail || 'client@example.com',
      phone: custPhone || '+1 555-0100',
      siteAddress: siteAddress || 'Standard Jobsite',
      areaSqFt: mode === 'pallet' ? areaSqFt : 0,
      boxesCount: mode === 'pallet' ? boxes : 1,
      unitPrice: tile.pricePerSqFt,
      totalPrice: totalCost,
      bookingDate: new Date().toISOString().split('T')[0],
      deliveryDate: deliveryDate,
      status: 'confirmed',
      assignedStaff: 'Elena Rostova',
      notes: notes
    };

    setCreatedBooking(newBooking);
    onBookingCreated(newBooking);
    setStep(3);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={22} color="var(--gold-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', fontWeight: 700 }}>
              Tiles Booking & Reservation
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', display: 'grid', placeItems: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Booking Type Tabs */}
          {step < 3 && (
            <div style={{ display: 'flex', background: 'rgba(11, 15, 23, 0.7)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '24px', gap: '4px' }}>
              <button
                type="button"
                onClick={() => setMode('pallet')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: mode === 'pallet' ? 'var(--gold-gradient)' : 'transparent',
                  color: mode === 'pallet' ? '#0b0f17' : 'var(--text-muted)'
                }}
              >
                <Truck size={16} />
                <span>Pallet Bulk Order</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('sample')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: mode === 'sample' ? 'var(--gold-gradient)' : 'transparent',
                  color: mode === 'sample' ? '#0b0f17' : 'var(--text-muted)'
                }}
              >
                <Box size={16} />
                <span>Sample Swatch Kit ($15)</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('consultation')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: mode === 'consultation' ? 'var(--gold-gradient)' : 'transparent',
                  color: mode === 'consultation' ? '#0b0f17' : 'var(--text-muted)'
                }}
              >
                <Calendar size={16} />
                <span>Site Consultation (Free)</span>
              </button>
            </div>
          )}

          {/* Selected Tile Header Preview */}
          {tile && step < 3 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'rgba(11, 15, 23, 0.7)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
              padding: '12px 18px',
              marginBottom: '24px'
            }}>
              <img src={tile.image} alt={tile.name} style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border-gold)' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>{tile.name}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                  <span>{tile.dimensions}</span>
                  <span>{tile.finish}</span>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>${tile.pricePerSqFt?.toFixed(2)}/sq.ft</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Specs & Area */}
          {step === 1 && (
            <div>
              {mode === 'pallet' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Required Area (Sq.Ft)
                    </label>
                    <input
                      type="number"
                      min="50"
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(parseFloat(e.target.value) || 0)}
                      style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '11px 14px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Calculated Boxes Required
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`${boxes} Boxes (~${(boxes * coverage).toFixed(1)} sq.ft)`}
                      style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '11px 14px', color: 'var(--gold-light)', fontSize: '0.95rem', fontWeight: 600 }}
                    />
                  </div>
                </div>
              )}

              {mode === 'sample' && (
                <div style={{ padding: '16px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '8px', border: '1px dashed var(--gold-primary)', marginBottom: '20px', fontSize: '0.9rem', color: 'var(--gold-light)' }}>
                  📦 Sample Swatch Box includes physical 15x15cm cut samples of {tile?.name} plus 2 complimentary designer finishes. Delivered in a matte presentation box.
                </div>
              )}

              {mode === 'consultation' && (
                <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '8px', border: '1px dashed var(--accent-blue)', marginBottom: '20px', fontSize: '0.9rem', color: '#93c5fd' }}>
                  📐 Our senior surveyor will visit your jobsite with precision laser measurement tools and full tile portfolios. 100% complimentary.
                </div>
              )}

              {/* Price Calculation Box */}
              <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid var(--border-gold)', borderRadius: '10px', padding: '18px 22px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <span>Service / Order Type:</span>
                  <strong style={{ color: '#fff', textTransform: 'uppercase' }}>{mode}</strong>
                </div>
                {mode === 'pallet' && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <span>Material Subtotal:</span>
                      <strong style={{ color: '#fff' }}>${materialCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <span>Freight & Crane Offloading:</span>
                      <strong style={{ color: freight === 0 ? 'var(--accent-emerald)' : '#fff' }}>
                        {freight === 0 ? 'FREE FREIGHT' : `$${freight.toFixed(2)}`}
                      </strong>
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '10px', borderTop: '1px solid var(--border-gold)' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>Estimated Total:</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => setStep(2)}>
                  <span>Next: Delivery & Site Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Customer Contact & Site Info */}
          {step === 2 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Full Name / Architect Firm
                  </label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Requested Date (Delivery / Survey)
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Project Jobsite Address
                </label>
                <input
                  type="text"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Specific Handling / Offload Notes
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  <span>Confirm & Log Booking</span>
                  <CheckCircle size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmation Receipt */}
          {step === 3 && createdBooking && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--accent-emerald-bg)', border: '2px solid var(--accent-emerald)', color: 'var(--accent-emerald)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={36} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', fontWeight: 700 }}>
                Booking Successfully Logged!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                Your order is officially registered and immediately visible in the Staff & Admin portals.
              </p>

              <div style={{ display: 'inline-block', background: 'rgba(212, 175, 55, 0.15)', border: '1px dashed var(--gold-primary)', borderRadius: '8px', padding: '10px 24px', fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '24px' }}>
                {createdBooking.id}
              </div>

              {/* Receipt Summary Card */}
              <div style={{ background: 'rgba(11, 15, 23, 0.8)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', textAlign: 'left', margin: '0 auto 24px', maxWidth: '500px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Customer:</span>
                  <strong>{createdBooking.customerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tile Model:</span>
                  <strong>{createdBooking.tileName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Scheduled Date:</span>
                  <strong>{createdBooking.deliveryDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Site Destination:</span>
                  <span>{createdBooking.siteAddress}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '1.05rem', color: 'var(--gold-light)', fontWeight: 700 }}>
                  <span>Total Amount:</span>
                  <span>${createdBooking.totalPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={onClose}>
                Done & Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
