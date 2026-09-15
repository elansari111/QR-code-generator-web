import express from 'express';
import qr from 'qr-image';

const router = express.Router();

/**
 * Validates whether the given string is a valid URL or can be coerced into one.
 */
function normalizeUrl(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // If already starts with http:// or https://, validate standard URL
  try {
    const urlObj = new URL(trimmed);
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return urlObj.href;
    }
  } catch {
    // If user forgot protocol (e.g. github.com or www.google.com), try adding https://
    try {
      const withProtocol = `https://${trimmed}`;
      const testObj = new URL(withProtocol);
      if (testObj.hostname.includes('.')) {
        return testObj.href;
      }
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Map size presets or custom sizes to qr-image pixel matrix sizing
 */
function resolveSize(size) {
  if (typeof size === 'number' && size > 0 && size <= 25) {
    return size;
  }
  switch (size) {
    case 'small':
      return 4;
    case 'large':
      return 10;
    case 'medium':
    default:
      return 7;
  }
}

/**
 * Map margin presets
 */
function resolveMargin(margin) {
  if (typeof margin === 'number' && margin >= 0 && margin <= 10) {
    return margin;
  }
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

/**
 * POST /api/qr/generate
 * Payload: { 
 *   type: 'url' | 'text' | 'email' | 'wifi', 
 *   data: string, 
 *   url?: string, // legacy/convenience
 *   size?: 'small' | 'medium' | 'large' | number,
 *   margin?: 'small' | 'medium' | 'large' | number,
 *   format?: 'png' | 'svg'
 * }
 */
router.post('/generate', async (req, res, next) => {
  try {
    const {
      type = 'url',
      url,
      data,
      size = 'medium',
      margin = 'medium',
      format = 'png'
    } = req.body;

    let textToEncode = (data || url || '').trim();

    if (!textToEncode) {
      return res.status(400).json({
        error: 'Input content cannot be empty. Please provide a valid URL or text.'
      });
    }

    if (textToEncode.length > 2000) {
      return res.status(400).json({
        error: 'Content too long. QR codes should be under 2,000 characters.'
      });
    }

    let finalData = textToEncode;

    // Type-specific normalization and validation
    if (type === 'url') {
      const validatedUrl = normalizeUrl(textToEncode);
      if (!validatedUrl) {
        return res.status(422).json({
          error: 'Please enter a valid website URL (e.g., https://example.com or github.com).'
        });
      }
      finalData = validatedUrl;
    } else if (type === 'email') {
      if (!textToEncode.includes('@')) {
        return res.status(422).json({
          error: 'Please enter a valid email address.'
        });
      }
      finalData = textToEncode.startsWith('mailto:') ? textToEncode : `mailto:${textToEncode}`;
    } else if (type === 'wifi') {
      // Basic WIFI string support if passed
      finalData = textToEncode;
    } else {
      // General text
      finalData = textToEncode;
    }

    const qrSize = resolveSize(size);
    const qrMargin = resolveMargin(margin);

    if (format === 'svg') {
      const svgString = qr.imageSync(finalData, {
        type: 'svg',
        size: qrSize,
        margin: qrMargin,
        ec_level: 'M'
      });

      return res.status(200).json({
        success: true,
        type,
        data: finalData,
        format: 'svg',
        svg: svgString.toString(),
        size,
        margin
      });
    }

    // Default PNG buffer
    const pngBuffer = qr.imageSync(finalData, {
      type: 'png',
      size: qrSize,
      margin: qrMargin,
      ec_level: 'M'
    });

    const base64Image = `data:image/png;base64,${pngBuffer.toString('base64')}`;

    return res.status(200).json({
      success: true,
      type,
      data: finalData,
      format: 'png',
      image: base64Image,
      size,
      margin
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/qr/download
 * Directly streams the file as an attachment download
 */
router.get('/download', (req, res, next) => {
  try {
    const { url, data, type = 'url', size = 'large', margin = 'medium' } = req.query;
    let content = (data || url || '').trim();

    if (!content) {
      return res.status(400).send('Missing content parameter.');
    }

    if (type === 'url') {
      const validated = normalizeUrl(content);
      if (validated) content = validated;
    }

    const qrStream = qr.image(content, {
      type: 'png',
      size: resolveSize(size),
      margin: resolveMargin(margin),
      ec_level: 'M'
    });

    res.setHeader('Content-Disposition', 'attachment; filename="qrify-qr-code.png"');
    res.setHeader('Content-Type', 'image/png');
    qrStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

export default router;
