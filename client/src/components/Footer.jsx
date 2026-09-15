import React from 'react';
import { QrCode, Heart } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-surface)',
      padding: '3rem 1.5rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <div className="brand-icon-box" style={{ width: '28px', height: '28px' }}>
              <QrCode size={16} strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>QRify</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Create beautiful QR codes in seconds.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
          <a href="#generator" className="nav-link">Generator</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.82rem',
        color: 'var(--text-dim)'
      }}>
        <div>
          Built with React &amp; Node.js
        </div>
        <div>
          &copy; 2026 QRify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
