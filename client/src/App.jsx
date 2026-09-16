import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QRGenerator from './components/QRGenerator';
import QRPreview from './components/QRPreview';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { generateQRCode } from './services/qrService';

export default function App() {
  // Theme state: light or dark (with localStorage persistence & system preference fallback)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('qrify_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qrify_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Generator states
  const [activeType, setActiveType] = useState('url');
  const [inputVal, setInputVal] = useState('https://github.com/');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Customization state
  const [size, setSize] = useState('medium');
  const [margin, setMargin] = useState('medium');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');

  // Preview / result state
  const [qrResult, setQrResult] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Perform QR Code generation via backend API
  const handleGenerate = async () => {
    if (!inputVal.trim()) {
      setError('Please enter a valid URL or text content.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await generateQRCode({
        type: activeType,
        data: inputVal.trim(),
        size,
        margin,
        fgColor,
        bgColor,
        format: 'png',
      });

      setQrResult(res);
    } catch (err) {
      setError(err.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate initial QR Code on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  // Regenerate when size, margin, or colors change
  useEffect(() => {
    if (qrResult) {
      handleGenerate();
    }
  }, [size, margin, fgColor, bgColor]);

  // Copy original URL to clipboard
  const handleCopyUrl = async () => {
    const textToCopy = qrResult ? qrResult.data : inputVal;
    if (!textToCopy) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setHasCopied(true);
      showToast('URL copied to clipboard');
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      showToast('Failed to copy to clipboard');
    }
  };

  // Download QR as PNG
  const handleDownload = () => {
    if (!qrResult || !qrResult.image) return;

    // Direct download via blob/link
    const link = document.createElement('a');
    link.href = qrResult.image;
    link.download = 'qrify-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Download started: qrify-qr-code.png');
  };

  return (
    <div className="app-container">
      {/* Background ambient lighting */}
      <div className="ambient-glow" />

      {/* Navbar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-content">
        {/* Hero Section */}
        <Hero />

        {/* Generator Main Card Section */}
        <div
          id="generator"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}
        >
          <QRGenerator
            activeType={activeType}
            setActiveType={setActiveType}
            inputVal={inputVal}
            setInputVal={setInputVal}
            loading={loading}
            error={error}
            onGenerate={handleGenerate}
            size={size}
            setSize={setSize}
            margin={margin}
            setMargin={setMargin}
            fgColor={fgColor}
            setFgColor={setFgColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
          />

          <QRPreview
            qrData={qrResult ? qrResult.image : null}
            url={qrResult ? qrResult.data : inputVal}
            fgColor={fgColor}
            bgColor={bgColor}
            onCopyUrl={handleCopyUrl}
            hasCopied={hasCopied}
            onDownload={handleDownload}
          />
        </div>

        {/* Features Showcase */}
        <Features />

        {/* How It Works Timeline */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
