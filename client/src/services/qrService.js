/**
 * QRify API Client Service
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function generateQRCode({
  type = 'url',
  data,
  url,
  size = 'medium',
  margin = 'medium',
  format = 'png'
}) {
  const content = data || url;
  
  const response = await fetch(`${API_BASE}/api/qr/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      data: content,
      size,
      margin,
      format,
    }),
  });

  const resJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(resJson.error || 'Failed to generate QR code. Please try again.');
  }

  return resJson;
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
