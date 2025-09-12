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
  deviceType: 'phone' | 'tablet' | 'laptop' | 'desktop';
  orientation: 'portrait' | 'landscape';
  touchCapable: boolean;
  pixelRatio: number;
  viewportSize: { width: number; height: number };
  preferredLayout: 'compact' | 'comfortable' | 'spacious';
}

export const useMobileDetection = (): MobileDetectionResult => {
  const [detection, setDetection] = useState<MobileDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    userAgent: '',
    screenSize: 'desktop',
    deviceType: 'desktop',
    orientation: 'landscape',
    touchCapable: false,
    pixelRatio: 1,
    viewportSize: { width: 1920, height: 1080 },
    preferredLayout: 'spacious'
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Enhanced mobile device detection
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isMobileScreen = width <= 768;
      const isMobile = isMobileUA || isMobileScreen;
      
      // Enhanced tablet detection
      const isTabletUA = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
      const isTabletScreen = width > 768 && width <= 1024;
      const isTablet = isTabletUA || (isTabletScreen && !isMobile);
      
      // Desktop detection
      const isDesktop = !isMobile && !isTablet;
      
      // Device type classification
      let deviceType: 'phone' | 'tablet' | 'laptop' | 'desktop' = 'desktop';
      if (isMobile && width <= 480) deviceType = 'phone';
      else if (isMobile || isTablet) deviceType = 'tablet';
      else if (width <= 1366) deviceType = 'laptop';
      else deviceType = 'desktop';
      
      // Screen size classification
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (isMobile) screenSize = 'mobile';
      else if (isTablet) screenSize = 'tablet';
      
      // Orientation detection
      const orientation: 'portrait' | 'landscape' = width < height ? 'portrait' : 'landscape';
      
      // Touch capability detection
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Pixel ratio for high DPI displays
      const pixelRatio = window.devicePixelRatio || 1;
      
      // Viewport size
      const viewportSize = { width, height };
      
      // Preferred layout based on screen space and device capabilities
      let preferredLayout: 'compact' | 'comfortable' | 'spacious' = 'spacious';
      if (isMobile || width <= 640) preferredLayout = 'compact';
      else if (isTablet || width <= 1024) preferredLayout = 'comfortable';
      
      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        screenSize,
        deviceType,
        orientation,
        touchCapable,
        pixelRatio,
        viewportSize,
        preferredLayout
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize and orientation change events
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return detection;
};

// CSS classes for mobile optimization
export const getMobileOptimizedClasses = (detection: MobileDetectionResult) => {
  const baseClasses = 'transition-all duration-300';
  
  if (detection.isMobile) {
    return `${baseClasses} mobile-optimized text-sm px-2 py-1`;
  }
  
  if (detection.isTablet) {
    return `${baseClasses} tablet-optimized text-base px-4 py-2`;
  }
  
  return `${baseClasses} desktop-optimized text-base px-6 py-3`;
};

// Layout optimization utilities
export const getOptimizedLayoutClasses = (detection: MobileDetectionResult) => {
  const { preferredLayout, orientation, touchCapable } = detection;
  
  let classes = 'responsive-container';
  
  switch (preferredLayout) {
    case 'compact':
      classes += ' layout-compact space-y-2 p-2';
      break;
    case 'comfortable':
      classes += ' layout-comfortable space-y-4 p-4';
      break;
    case 'spacious':
      classes += ' layout-spacious space-y-6 p-6';
      break;
  }
  
  if (orientation === 'portrait') {
    classes += ' orientation-portrait';
  } else {
    classes += ' orientation-landscape';
  }
  
  if (touchCapable) {
    classes += ' touch-enabled';
  }
  
  return classes;
};

// Responsive font sizes
export const getResponsiveFontSize = (detection: MobileDetectionResult, element: 'h1' | 'h2' | 'h3' | 'p' | 'button') => {
  const { screenSize, preferredLayout } = detection;
  
  const sizes = {
    mobile: {
      h1: 'text-2xl',
      h2: 'text-xl', 
      h3: 'text-lg',
      p: 'text-sm',
      button: 'text-sm'
    },
    tablet: {
      h1: 'text-3xl',
      h2: 'text-2xl',
      h3: 'text-xl', 
      p: 'text-base',
      button: 'text-base'
    },
    desktop: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      p: 'text-lg',
      button: 'text-base'
    }
  };
  
  return sizes[screenSize][element];
};