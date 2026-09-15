import React from 'react';
import { Zap, Shield, Sliders, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Generate production-ready QR codes in milliseconds with zero delay or complex configuration.',
    color: '#f59e0b'
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your links and texts are never stored, tracked, or shared. Everything stays strictly in your hands.',
    color: '#10b981'
  },
  {
    icon: Sliders,
    title: 'Fully Customizable',
    description: 'Fine-tune colors, dimensions, and margins to blend seamlessly into your marketing assets or brand kit.',
    color: '#6366f1'
  },
  {
    icon: Smartphone,
    title: 'Universal Compatibility',
    description: 'Scannable by any camera app or mobile QR scanner on both iOS and Android platforms without errors.',
    color: '#06b6d4'
  }
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '4rem 0 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          marginBottom: '0.75rem'
        }}>
          Why choose <span style={{ color: 'var(--primary)' }}>QRify</span>?
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '540px', marginInline: 'auto' }}>
          Engineered to give developers and creators the fastest, highest-quality QR code generator online.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem'
      }}>
        {FEATURES.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.color
              }}>
                <Icon size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
