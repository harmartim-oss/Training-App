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
    <header className="bg-surface/95 backdrop-blur-lg sticky top-0 z-50 no-print border-b shadow-sm">
      <div className="container py-base">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-base" aria-label="ODDI Home">
            <ODDILogo className="w-8 h-8 text-primary" />
            <span className="text-large font-bold text-primary hidden sm:block">
              Ontario Digital Defence Institute
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-lg">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
          </nav>

          <div className="flex items-center">
              <button
                  onClick={onNavigateToTraining}
                  className="btn btn-primary"
                >
                  Begin Certification
              </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;