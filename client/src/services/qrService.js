import QRCode from 'qrcode';

/**
 * QRify Client Service with dual mode (Client-side instant generation + optional backend fallback)
 */
const API_BASE = import.meta.env.VITE_API_URL || '';

function resolveWidth(size) {
  switch (size) {
    case 'small':
      return 180;
    case 'large':
      return 360;
    case 'medium':
    default:
      return 260;
  }
}

function resolveMargin(margin) {
  switch (margin) {
    case 'none':
      return 0;
    case 'small':
      return 1;
    case 'large':
      return 4;
    case 'medium':
    default:
      return 2;
  }
}

export async function generateQRCode({
  type = 'url',
  data,
  url,
  size = 'medium',
  margin = 'medium',
  fgColor = '#0f172a',
  bgColor = '#ffffff',
  format = 'png'
}) {
  const content = (data || url || '').trim();
  if (!content) {
    throw new Error('Please enter a valid URL or text content.');
  }

  // Generate directly in-browser using 'qrcode'
  try {
    const dataUrl = await QRCode.toDataURL(content, {
      width: resolveWidth(size),
      margin: resolveMargin(margin),
      color: {
        dark: fgColor || '#000000',
        light: bgColor || '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });

    return {
      success: true,
      type,
      data: content,
      format: 'png',
      image: dataUrl,
      size,
      margin
    };
  } catch (clientErr) {
    // If client-side fails for any reason, attempt server endpoint
    try {
      const response = await fetch(`${API_BASE}/api/qr/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data: content, size, margin, format })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // ignore
    }
    throw new Error(clientErr.message || 'Failed to generate QR code. Please try again.');
  }
}

export function getDownloadUrl({ data, type = 'url', size = 'large', margin = 'medium' }) {
  const params = new URLSearchParams({
    data,
    type,
    size,
    margin,
  });
  return `${API_BASE}/api/qr/download?${params.toString()}`;
}

