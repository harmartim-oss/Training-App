/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  browser: {
    name: string;
    version: string;
    isChrome: boolean;
    isFirefox: boolean;
    isSafari: boolean;
    isEdge: boolean;
  };
}

export const useMobileDetection = (): MobileDetectionResult => {
  const [detection, setDetection] = useState<MobileDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    userAgent: '',
    screenSize: 'desktop',
    browser: {
      name: 'Unknown',
      version: '',
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isEdge: false
    }
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      
      // Browser detection
      const detectBrowser = () => {
        const ua = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = '';
        let isChrome = false;
        let isFirefox = false;
        let isSafari = false;
        let isEdge = false;

        if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
          browserName = 'Chrome';
          isChrome = true;
          const match = ua.match(/Chrome\/([0-9.]+)/);
          browserVersion = match ? match[1] : '';
        } else if (ua.indexOf('Firefox') > -1) {
          browserName = 'Firefox';
          isFirefox = true;
          const match = ua.match(/Firefox\/([0-9.]+)/);
          browserVersion = match ? match[1] : '';
        } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
          browserName = 'Safari';
          isSafari = true;
          const match = ua.match(/Version\/([0-9.]+)/);
          browserVersion = match ? match[1] : '';
        } else if (ua.indexOf('Edg') > -1) {
          browserName = 'Edge';
          isEdge = true;
          const match = ua.match(/Edg\/([0-9.]+)/);
          browserVersion = match ? match[1] : '';
        }

        return {
          name: browserName,
          version: browserVersion,
          isChrome,
          isFirefox,
          isSafari,
          isEdge
        };
      };
      
      // Mobile device detection
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isMobileScreen = width <= 768;
      const isMobile = isMobileUA || isMobileScreen;
      
      // Tablet detection
      const isTabletUA = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
      const isTabletScreen = width > 768 && width <= 1024;
      const isTablet = isTabletUA || (isTabletScreen && !isMobile);
      
      // Desktop detection
      const isDesktop = !isMobile && !isTablet;
      
      // Screen size classification
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (isMobile) screenSize = 'mobile';
      else if (isTablet) screenSize = 'tablet';
      
      const browser = detectBrowser();
      
      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        screenSize,
        browser
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize events
    window.addEventListener('resize', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  return detection;
};

// CSS classes for mobile optimization
export const getMobileOptimizedClasses = (isMobile: boolean, isTablet: boolean) => {
  const baseClasses = 'transition-all duration-300';
  
  if (isMobile) {
    return `${baseClasses} mobile-optimized text-sm px-2 py-1`;
  }
  
  if (isTablet) {
    return `${baseClasses} tablet-optimized text-base px-4 py-2`;
  }
  
  return `${baseClasses} desktop-optimized text-base px-6 py-3`;
};