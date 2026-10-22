import React from 'react';
import { Sparkles, ArrowRight, Layers, ShieldCheck, Box } from 'lucide-react';

export default function Hero({ onOpenBooking, onExploreCatalog, onOpenVisualizer }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: 'calc(100vh - var(--nav-height))',
      display: 'flex',
      alignItems: 'center',
      padding: '80px 0',
      background: `linear-gradient(180deg, rgba(11, 15, 23, 0.72) 0%, rgba(11, 15, 23, 0.95) 100%), url('/images/hero_calacatta.jpg') center/cover no-repeat fixed`,
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '820px' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--border-gold)', marginBottom: '24px' }}>
            <Sparkles size={14} color="var(--gold-light)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold-light)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              European Architectural Grade • Slabs & Porcelain
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            color: '#fff'
          }}>
            Sculpted Surfaces. <br />
            <span className="gradient-gold-text">Timeless Architecture.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '38px',
            maxWidth: '680px'
          }}>
            Curated large-format porcelain slabs, bookmatched Italian marbles, Venetian terrazzo, and structural outdoor pavers engineered for luxury residences and prestigious developments.
          </p>

          {/* CTA Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '50px' }}>
            <a 
              href="#catalog"
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '14px 28px' }}
            >
              <span>Explore Tile Catalog</span>
              <ArrowRight size={18} />
            </a>

            <a 
              href="#visualizer" 
              className="btn btn-secondary"
              style={{ fontSize: '1rem', padding: '14px 24px' }}
            >
              <Layers size={18} color="var(--gold-light)" />
              <span>Interactive Visualizer</span>
            </a>

            <button 
              className="btn btn-outline-gold"
              onClick={() => onOpenBooking(null, 'sample')}
              style={{ fontSize: '1rem', padding: '14px 24px' }}
            >
              <Box size={18} />
              <span>Free Swatch Kit</span>
            </button>
          </div>

          {/* Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fff' }}>500+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Designer Slabs</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-light)' }}>12,500+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects Fitted</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fff' }}>15 Yrs</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Factory Warranty</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>0.05%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Porosity (Impervious)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
