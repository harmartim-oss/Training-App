/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo } from './icons';

interface HeaderProps {
    onNavigateToTraining: () => void;
    onNavigateToAdmin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToTraining, onNavigateToAdmin }) => {
  const navLinks = [
    { href: '#why-ocrp', label: 'Why OCRP' },
    { href: '#curriculum', label: 'Curriculum' },
    { href: '#resources', label: 'Resources' },
    { href: '#faq', label: 'FAQ' },
  ];
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md sticky top-0 z-50 no-print border-b border-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a href="#" className="flex items-center gap-3" aria-label="ODDI Home">
          <ODDILogo className="w-8 h-8 text-primary" />
          <span className="text-lg font-bold tracking-widest font-mono text-text-primary hidden sm:block">
            ODDI
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-semibold uppercase tracking-wider text-text-secondary hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6">
            {onNavigateToAdmin && (
              <button
                  onClick={onNavigateToAdmin}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                  title="Admin Portal"
                >
                  Admin
              </button>
            )}
            <button
                onClick={onNavigateToTraining}
                className="btn-primary py-2 px-6 text-sm"
              >
                Begin Training
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;