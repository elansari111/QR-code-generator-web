import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section" style={{ textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <div className="hero-badge">
          <Sparkles size={13} />
          <span>FREE • NO SIGN UP • STATIC QR</span>
        </div>
      </div>

      <h1 style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
        fontWeight: 800,
        lineHeight: 1.15,
        letterSpacing: '-0.035em',
        marginBottom: '1rem',
        maxWidth: '820px',
        marginInline: 'auto'
      }}>
        Generate QR codes <span style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>instantly</span>
      </h1>

      <p style={{
        fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
        color: 'var(--text-muted)',
        maxWidth: '580px',
        marginInline: 'auto',
        lineHeight: 1.5,
        marginBottom: '1.5rem'
      }}>
        Turn any URL into a clean, downloadable QR code in seconds.
        Customizable colors, sharp resolution, and zero registration.
      </p>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-dim)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={16} color="var(--success)" /> 100% Client & API privacy
        </span>
        <span>•</span>
        <span>High-res PNG & SVG</span>
      </div>
    </section>
  );
}
