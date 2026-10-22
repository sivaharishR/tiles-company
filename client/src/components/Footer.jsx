import React from 'react';

export default function Footer({ onSwitchToStaff, onSwitchToAdmin }) {
  return (
    <footer style={{ background: '#06080d', borderTop: '1px solid var(--border-subtle)', padding: '80px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '40px', marginBottom: '60px' }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--gold-gradient)', borderRadius: '8px', display: 'grid', placeItems: 'center', color: '#0b0f17', fontWeight: 900 }}>L</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>LUMINA CERAMICA</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '320px' }}>
              Manufactured with high-pressure hydraulic compaction and high-temperature calcination. Zero porosity surfaces designed for lifetime longevity.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: '18px' }}>Surfaces</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li><a href="#catalog">Calacatta Oro Marble</a></li>
              <li><a href="#catalog">Nero Marquina Gold Onyx</a></li>
              <li><a href="#catalog">Venetian Terrazzo Micro</a></li>
              <li><a href="#catalog">Tuscan Travertine R11</a></li>
              <li><a href="#catalog">Grand Wall Bookmatch Slabs</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: '18px' }}>Portals & Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li><span onClick={onSwitchToStaff} style={{ cursor: 'pointer', color: '#93c5fd' }}>Company Staff Login</span></li>
              <li><span onClick={onSwitchToAdmin} style={{ cursor: 'pointer', color: '#fca5a5' }}>Executive Admin Portal</span></li>
              <li><a href="#calculator">Area Wastage Calculator</a></li>
              <li><a href="#consultation">Book Laser Site Survey</a></li>
              <li><span>15-Year Factory Warranty</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#fff', marginBottom: '18px' }}>Flagship Showroom</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              450 Design District Blvd, Suite 800<br />
              Beverly Hills, CA 90210<br />
              Mon - Sat: 9:00 AM - 7:00 PM<br />
              Direct: +1 (800) 586-4621
            </p>
          </div>
        </div>

        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.84rem', color: 'var(--text-dim)' }}>
          <div>© {new Date().getFullYear()} LUMINA CERAMICA LLC. All Rights Reserved. Architectural Grade Surfaces.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>ISO 13006 Certified</span>
            <span>Zero VOC Emissions</span>
            <span>LEED Green Building</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
