import React from 'react';
import { QrCode } from 'lucide-react';
import GithubIcon from './GithubIcon';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#" className="brand-logo" aria-label="QRify Home">
          <div className="brand-icon-box">
            <QrCode size={20} strokeWidth={2.5} />
          </div>
          <span>QRify</span>
        </a>

        <nav className="nav-links">
          <a href="#generator" className="nav-link">Generator</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it works</a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="GitHub Repository"
            title="View on GitHub"
          >
            <GithubIcon size={18} />
          </a>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  );
}
