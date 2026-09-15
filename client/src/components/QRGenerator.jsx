import React, { useState } from 'react';
import { Globe, Type, Mail, Wifi, ArrowRight, Loader2 } from 'lucide-react';
import Customization from './Customization';

const QR_TYPES = [
  { id: 'url', label: 'URL', icon: Globe, available: true },
  { id: 'text', label: 'Text', icon: Type, available: true },
  { id: 'email', label: 'Email', icon: Mail, available: true },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi, available: false },
];

export default function QRGenerator({
  activeType,
  setActiveType,
  inputVal,
  setInputVal,
  loading,
  error,
  onGenerate,
  size,
  setSize,
  margin,
  setMargin,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor
}) {
  const isInputEmpty = !inputVal || inputVal.trim().length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isInputEmpty && !loading) {
      onGenerate();
    }
  };

  const getPlaceholder = () => {
    switch (activeType) {
      case 'url':
        return 'https://example.com or github.com';
      case 'text':
        return 'Enter any plain text or message...';
      case 'email':
        return 'hello@example.com';
      default:
        return 'Enter content...';
    }
  };

  const getLabel = () => {
    switch (activeType) {
      case 'url':
        return 'Enter your URL';
      case 'text':
        return 'Enter your text';
      case 'email':
        return 'Enter email address';
      default:
        return 'Content';
    }
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          QR Code Generator
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Choose your content type and customize your QR style.
        </p>
      </div>

      {/* Type Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.35rem',
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '1.5rem',
        overflowX: 'auto'
      }}>
        {QR_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                if (type.available) {
                  setActiveType(type.id);
                }
              }}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive ? 'var(--bg-surface)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.88rem',
                cursor: type.available ? 'pointer' : 'not-allowed',
                opacity: type.available ? 1 : 0.55,
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
              title={!type.available ? 'Coming soon' : ''}
            >
              <Icon size={16} />
              <span>{type.label}</span>
              {!type.available && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px',
                  background: 'var(--border-subtle)',
                  color: 'var(--text-dim)',
                  fontWeight: 600
                }}>
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label
            htmlFor="qr-content-input"
            style={{
              display: 'block',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              marginBottom: '0.5rem'
            }}
          >
            {getLabel()}
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="qr-content-input"
              type={activeType === 'email' ? 'email' : 'text'}
              className="input-control"
              placeholder={getPlaceholder()}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ paddingRight: '2.5rem' }}
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '0.2rem'
                }}
                aria-label="Clear input"
              >
                ×
              </button>
            )}
          </div>

          {error && (
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--danger)',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <span>•</span> {error}
            </p>
          )}
        </div>

        {/* Customization Drawer */}
        <Customization
          size={size}
          setSize={setSize}
          margin={margin}
          setMargin={setMargin}
          fgColor={fgColor}
          setFgColor={setFgColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />

        {/* Generate Button */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            disabled={isInputEmpty || loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.9rem 1.5rem', fontSize: '1rem' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating QR Code...</span>
              </>
            ) : (
              <>
                <span>Generate QR Code</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
