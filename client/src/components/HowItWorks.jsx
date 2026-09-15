import React from 'react';
import { Edit3, Cpu, DownloadCloud } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Edit3,
    title: 'Enter your content',
    desc: 'Paste any website URL, email address, or text you want to encode.'
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Generate your QR',
    desc: 'Our real-time engine compiles your data into a pixel-perfect QR matrix.'
  },
  {
    step: '03',
    icon: DownloadCloud,
    title: 'Download and share',
    desc: 'Export high-definition PNG format ready for print, screens, or flyers.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '3rem 0 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          marginBottom: '0.75rem'
        }}>
          How it works
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginInline: 'auto' }}>
          Three simple steps to create professional, ready-to-scan QR codes.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="card"
              style={{
                padding: '2rem 1.75rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.5rem',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                userSelect: 'none'
              }}>
                {step.step}
              </div>

              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-subtle)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Icon size={20} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
