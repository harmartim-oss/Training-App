/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo } from './icons';

interface HeaderProps {
    onNavigateToTraining: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToTraining }) => {
  const navLinks = [
    { href: '#why-ocrp', label: 'Why OCRP?' },
    { href: '#curriculum', label: 'Curriculum' },
    { href: '#faq', label: 'FAQ' },
  ];
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-lg sticky top-0 z-50 no-print border-b border-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a href="#" className="flex items-center gap-3" aria-label="ODDI Home">
          <ODDILogo className="w-4 h-4" />
          <span className="text-lg font-bold tracking-tight text-text-primary hidden sm:block">
            Ontario Digital Defence Institute
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6">
            <button
                onClick={onNavigateToTraining}
                className="btn-primary py-2.5 px-6 text-sm"
              >
                Begin Certification
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;