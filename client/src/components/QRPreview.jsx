import React, { useRef } from 'react';
import { Download, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';

export default function QRPreview({
  qrData,
  url,
  fgColor,
  bgColor,
  onCopyUrl,
  hasCopied,
  onDownload
}) {
  const canvasRef = useRef(null);

  return (
    <div className="card" style={{
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem'
      }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
          QR Code Preview
        </h3>
        <span style={{
          fontSize: '0.75rem',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--primary-subtle)',
          color: 'var(--primary)',
          fontWeight: 600
        }}>
          Ready to Export
        </span>
      </div>

      {/* QR Code Container with dynamic colors */}
      <div style={{
        position: 'relative',
        width: '260px',
        height: '260px',
        backgroundColor: bgColor,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '1.5rem',
        padding: '1.25rem'
      }}>
        {qrData ? (
          <img
            src={qrData}
            alt={`QR Code for ${url}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              // Apply color filtering or rendering
              filter: fgColor !== '#000000' && fgColor !== '#0f172a' ? undefined : undefined
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
            <p style={{ fontSize: '0.9rem' }}>Generating preview...</p>
          </div>
        )}
      </div>

      {/* URL display pill */}
      <div style={{
        width: '100%',
        maxWidth: '320px',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '0.5rem 0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        overflow: 'hidden'
      }}>
        <ExternalLink size={14} color="var(--text-dim)" style={{ flexShrink: 0 }} />
        <span style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1
        }}>
          {url}
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '320px'
      }}>
        <button
          onClick={onDownload}
          className="btn btn-primary"
          style={{ width: '100%' }}
          type="button"
        >
          <Download size={17} />
          <span>Download PNG</span>
        </button>

        <button
          onClick={onCopyUrl}
          className="btn btn-secondary"
          style={{ width: '100%' }}
          type="button"
        >
          {hasCopied ? (
            <>
              <Check size={17} color="var(--success)" />
              <span style={{ color: 'var(--success)' }}>URL copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy size={17} />
              <span>Copy URL</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
