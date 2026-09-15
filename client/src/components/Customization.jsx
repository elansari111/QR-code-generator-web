import React from 'react';
import { Sliders, Palette } from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Default Dark', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Indigo Dream', fg: '#4338ca', bg: '#ffffff' },
  { name: 'Emerald', fg: '#065f46', bg: '#f0fdf4' },
  { name: 'Midnight', fg: '#38bdf8', bg: '#0b0f19' },
  { name: 'Crimson', fg: '#991b1b', bg: '#fef2f2' },
];

export default function Customization({
  size,
  setSize,
  margin,
  setMargin,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor
}) {
  return (
    <div style={{
      marginTop: '1.5rem',
      paddingTop: '1.25rem',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        fontWeight: 600,
        fontSize: '0.92rem',
        color: 'var(--text-main)'
      }}>
        <Sliders size={16} color="var(--primary)" />
        <span>Customize Appearance</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        {/* Size Selection */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginBottom: '0.35rem'
          }}>
            Size
          </label>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['small', 'medium', 'large'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`btn btn-secondary ${size === s ? 'active-size' : ''}`}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.2rem',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  backgroundColor: size === s ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                  borderColor: size === s ? 'var(--primary)' : 'var(--border-subtle)',
                  color: size === s ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: size === s ? 700 : 500
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Margin Selection */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginBottom: '0.35rem'
          }}>
            Margin
          </label>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['small', 'medium', 'large'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMargin(m)}
                className={`btn btn-secondary`}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.2rem',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  backgroundColor: margin === m ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                  borderColor: margin === m ? 'var(--primary)' : 'var(--border-subtle)',
                  color: margin === m ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: margin === m ? 700 : 500
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Colors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {/* QR Color */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginBottom: '0.35rem'
          }}>
            Foreground Color
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.6rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              style={{
                width: '26px',
                height: '26px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: 'transparent'
              }}
              title="Pick QR code foreground color"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{fgColor}</span>
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginBottom: '0.35rem'
          }}>
            Background Color
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.6rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{
                width: '26px',
                height: '26px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: 'transparent'
              }}
              title="Pick QR code background color"
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginBottom: '0.45rem'
        }}>
          <Palette size={13} />
          <span>Quick Themes:</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                setFgColor(preset.fg);
                setBgColor(preset.bg);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.55rem',
                fontSize: '0.74rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: preset.fg,
                border: '1px solid rgba(0,0,0,0.2)'
              }} />
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
