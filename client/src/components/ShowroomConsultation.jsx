import React from 'react';
import { Compass, Calendar, Award, CheckCircle } from 'lucide-react';

export default function ShowroomConsultation({ onOpenConsultation }) {
  return (
    <section id="consultation" className="section">
      <div className="container">
        {/* Banner */}
        <div style={{
          background: 'radial-gradient(circle at 10% 50%, rgba(212, 175, 55, 0.16) 0%, transparent 50%), linear-gradient(135deg, #161e2d 0%, #0d121c 100%)',
          border: '1px solid var(--border-gold)',
          borderRadius: '24px',
          padding: '60px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '30px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <div className="section-tagline">Complimentary Architectural Service</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
              Schedule a Site Survey or Showroom Briefing
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Our senior surface consultants arrive equipped with precision laser measurement tools and curated luxury tile suitcases directly to your residential or commercial site.
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="var(--accent-emerald)" />
                <span>Laser Subfloor Assessment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="var(--accent-emerald)" />
                <span>Physical Swatch Briefcase</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="var(--accent-emerald)" />
                <span>Zero Obligation Estimate</span>
              </div>
            </div>
          </div>

          <div>
            <button
              className="btn btn-primary"
              onClick={onOpenConsultation}
              style={{ padding: '16px 32px', fontSize: '1.05rem' }}
            >
              <Calendar size={18} />
              <span>Book Site Consultation</span>
            </button>
          </div>
        </div>

        {/* Architectural Showcase Gallery */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-tagline">Architectural Portfolio</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', fontWeight: 700 }}>
              Recent Landmark Installations
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            <div style={{ position: 'relative', height: '360px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img src="/images/hero_calacatta.jpg" alt="Villa Horizon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,23,0.92) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>Villa Horizon Grand Hall</h4>
                <span style={{ fontSize: '0.82rem', color: 'var(--gold-light)' }}>Calacatta Oro Imperial Slabs (1,400 sq.ft)</span>
              </div>
            </div>

            <div style={{ position: 'relative', height: '360px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img src="/images/bathroom_nero.jpg" alt="Aura Spa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,23,0.92) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>Aura Wellness Penthouse</h4>
                <span style={{ fontSize: '0.82rem', color: 'var(--gold-light)' }}>Nero Marquina Gold Onyx (850 sq.ft)</span>
              </div>
            </div>

            <div style={{ position: 'relative', height: '360px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <img src="/images/outdoor_patio.jpg" alt="Azure Coastline" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,23,0.92) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>Azure Cliffside Pool Terrace</h4>
                <span style={{ fontSize: '0.82rem', color: 'var(--gold-light)' }}>Tuscan Travertine R11 Pavers (2,200 sq.ft)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
