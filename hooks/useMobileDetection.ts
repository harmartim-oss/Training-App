/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  userAgent: string;
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'large-desktop';
  deviceType: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'tv';
  orientation: 'portrait' | 'landscape';
  touchDevice: boolean;
  pixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  hasNotch: boolean;
  prefersReducedMotion: boolean;
  prefersDarkMode: boolean;
  platform: 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'unknown';
}

export const useMobileDetection = (): MobileDetectionResult => {
  const [detection, setDetection] = useState<MobileDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    userAgent: '',
    screenSize: 'desktop',
    deviceType: 'desktop',
    orientation: 'landscape',
    touchDevice: false,
    pixelRatio: 1,
    viewportWidth: 1920,
    viewportHeight: 1080,
    hasNotch: false,
    prefersReducedMotion: false,
    prefersDarkMode: false,
    platform: 'unknown'
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      
      // Enhanced User Agent Detection
      const isMobileUA = /android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
      const isTabletUA = /ipad|android(?!.*mobile)|tablet|kindle|silk/i.test(userAgent);
      const isIOSUA = /iphone|ipad|ipod/i.test(userAgent);
      const isAndroidUA = /android/i.test(userAgent);
      const isWindowsUA = /windows/i.test(userAgent);
      const isMacUA = /mac/i.test(userAgent) && !isIOSUA;
      const isLinuxUA = /linux/i.test(userAgent) && !isAndroidUA;
      
      // Platform Detection
      let platform: 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'unknown' = 'unknown';
      if (isIOSUA) platform = 'ios';
      else if (isAndroidUA) platform = 'android';
      else if (isWindowsUA) platform = 'windows';
      else if (isMacUA) platform = 'macos';
      else if (isLinuxUA) platform = 'linux';
      
      // Enhanced Breakpoint Detection with modern responsive standards
      const isMobileScreen = width <= 640; // sm breakpoint
      const isTabletScreen = width > 640 && width <= 1024; // md to lg breakpoint
      const isDesktopScreen = width > 1024 && width <= 1440; // lg to xl breakpoint
      const isLargeDesktopScreen = width > 1440; // xl+ breakpoint
      
      // Device Type Classification
      const isMobile = isMobileUA || isMobileScreen;
      const isTablet = (isTabletUA || isTabletScreen) && !isMobile;
      const isDesktop = isDesktopScreen && !isMobile && !isTablet;
      const isLargeDesktop = isLargeDesktopScreen && !isMobile && !isTablet;
      
      // Screen size classification
      let screenSize: 'mobile' | 'tablet' | 'desktop' | 'large-desktop' = 'desktop';
      if (isMobile) screenSize = 'mobile';
      else if (isTablet) screenSize = 'tablet';
      else if (isLargeDesktop) screenSize = 'large-desktop';
      else screenSize = 'desktop';
      
      // Device type classification
      let deviceType: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'tv' = 'desktop';
      if (isMobile && height > width) deviceType = 'phone';
      else if (isTablet) deviceType = 'tablet';
      else if (width < 1440) deviceType = 'laptop';
      else if (width >= 1920 && pixelRatio <= 1.5) deviceType = 'tv';
      else deviceType = 'desktop';
      
      // Orientation Detection
      const orientation = height > width ? 'portrait' : 'landscape';
      
      // Touch Device Detection
      const touchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          (navigator as any).msMaxTouchPoints > 0;
      
      // iPhone X/notch detection (basic heuristic)
      const hasNotch = isIOSUA && 
                       ((width === 375 && height === 812) || // iPhone X/XS
                        (width === 414 && height === 896) || // iPhone XR/XS Max
                        (width === 390 && height === 844) || // iPhone 12/13 mini
                        (width === 393 && height === 852) || // iPhone 14 Pro
                        (width === 430 && height === 932));  // iPhone 14 Pro Max
      
      // Accessibility preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        userAgent,
        screenSize,
        deviceType,
        orientation,
        touchDevice,
        pixelRatio,
        viewportWidth: width,
        viewportHeight: height,
        hasNotch,
        prefersReducedMotion,
        prefersDarkMode,
        platform
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize events with debouncing
    let timeoutId: NodeJS.Timeout;
    const debouncedDetection = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(detectDevice, 100);
    };

    window.addEventListener('resize', debouncedDetection);
    window.addEventListener('orientationchange', debouncedDetection);
    
    return () => {
      window.removeEventListener('resize', debouncedDetection);
      window.removeEventListener('orientationchange', debouncedDetection);
      clearTimeout(timeoutId);
    };
  }, []);

  return detection;
};

// Enhanced CSS classes for device optimization
export const getDeviceOptimizedClasses = (detection: MobileDetectionResult) => {
  const baseClasses = 'transition-all duration-300 ease-in-out';
  const { screenSize, deviceType, touchDevice, orientation, hasNotch } = detection;
  
  let responsiveClasses = baseClasses;
  
  // Screen size specific classes
  switch (screenSize) {
    case 'mobile':
      responsiveClasses += ' mobile-optimized text-sm px-2 py-2 min-h-[44px]';
      break;
    case 'tablet':
      responsiveClasses += ' tablet-optimized text-base px-4 py-3 min-h-[40px]';
      break;
    case 'desktop':
      responsiveClasses += ' desktop-optimized text-base px-6 py-3 min-h-[36px]';
      break;
    case 'large-desktop':
      responsiveClasses += ' large-desktop-optimized text-lg px-8 py-4 min-h-[40px]';
      break;
  }
  
  // Touch device optimizations
  if (touchDevice) {
    responsiveClasses += ' touch-target cursor-pointer select-none';
  }
  
  // Orientation specific classes
  if (orientation === 'portrait' && screenSize === 'mobile') {
    responsiveClasses += ' portrait-mobile';
  } else if (orientation === 'landscape' && screenSize === 'mobile') {
    responsiveClasses += ' landscape-mobile';
  }
  
  // Notch handling for iPhone X and newer
  if (hasNotch) {
    responsiveClasses += ' safe-area-padding';
  }
  
  return responsiveClasses;
};

// Content density based on device type
export const getContentDensity = (detection: MobileDetectionResult) => {
  const { screenSize, deviceType } = detection;
  
  switch (screenSize) {
    case 'mobile':
      return {
        cardPadding: 'p-4',
        spacing: 'space-y-4',
        textSize: 'text-sm',
        headingSize: 'text-lg',
        buttonSize: 'px-4 py-3 text-base',
        maxWidth: 'max-w-full',
        columns: 'grid-cols-1'
      };
    case 'tablet':
      return {
        cardPadding: 'p-6',
        spacing: 'space-y-6',
        textSize: 'text-base',
        headingSize: 'text-xl',
        buttonSize: 'px-6 py-3 text-base',
        maxWidth: 'max-w-2xl',
        columns: 'grid-cols-1 md:grid-cols-2'
      };
    case 'desktop':
      return {
        cardPadding: 'p-8',
        spacing: 'space-y-8',
        textSize: 'text-base',
        headingSize: 'text-2xl',
        buttonSize: 'px-6 py-3 text-base',
        maxWidth: 'max-w-4xl',
        columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      };
    case 'large-desktop':
      return {
        cardPadding: 'p-10',
        spacing: 'space-y-10',
        textSize: 'text-lg',
        headingSize: 'text-3xl',
        buttonSize: 'px-8 py-4 text-lg',
        maxWidth: 'max-w-6xl',
        columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      };
    default:
      return {
        cardPadding: 'p-6',
        spacing: 'space-y-6',
        textSize: 'text-base',
        headingSize: 'text-xl',
        buttonSize: 'px-6 py-3 text-base',
        maxWidth: 'max-w-4xl',
        columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      };
  }
};

// Navigation optimization based on device
export const getNavigationClasses = (detection: MobileDetectionResult) => {
  const { screenSize, touchDevice } = detection;
  
  if (screenSize === 'mobile') {
    return {
      container: 'fixed bottom-0 left-0 right-0 bg-surface border-t border-border safe-area-bottom z-50',
      items: 'flex justify-around items-center py-2',
      item: 'flex flex-col items-center px-2 py-1 min-w-[44px] min-h-[44px] justify-center',
      text: 'text-xs mt-1 text-center',
      icon: 'w-6 h-6'
    };
  }
  
  return {
    container: 'bg-surface border-r border-border h-full',
    items: 'space-y-2 p-4',
    item: 'w-full flex items-center px-4 py-3 rounded-lg hover:bg-surface-elevated',
    text: 'ml-3 text-sm font-medium',
    icon: 'w-5 h-5'
  };
};

// Form optimization for different devices
export const getFormClasses = (detection: MobileDetectionResult) => {
  const { screenSize, touchDevice, platform } = detection;
  
  const baseInput = 'w-full border-2 rounded-lg transition-all duration-200 focus:outline-none focus:border-primary';
  
  if (screenSize === 'mobile') {
    return {
      container: 'space-y-4 p-4',
      input: `${baseInput} px-4 py-3 text-base`, // 16px prevents zoom on iOS
      button: 'w-full px-4 py-3 text-base font-semibold rounded-lg min-h-[44px]',
      label: 'block text-sm font-medium mb-2'
    };
  }
  
  return {
    container: 'space-y-6 p-6',
    input: `${baseInput} px-4 py-3 text-base`,
    button: 'px-6 py-3 text-base font-semibold rounded-lg',
    label: 'block text-sm font-medium mb-2'
  };
};

// Quiz optimization for different devices
export const getQuizClasses = (detection: MobileDetectionResult) => {
  const { screenSize, touchDevice } = detection;
  
  if (screenSize === 'mobile') {
    return {
      container: 'p-4 space-y-4',
      question: 'p-4 bg-surface border border-border rounded-lg',
      options: 'space-y-3 mt-4',
      option: 'p-3 border-2 border-border rounded-lg cursor-pointer transition-all min-h-[44px] flex items-center',
      optionText: 'text-sm leading-relaxed',
      button: 'w-full px-4 py-3 text-base font-semibold rounded-lg min-h-[44px] mt-6'
    };
  }
  
  return {
    container: 'p-6 space-y-6',
    question: 'p-6 bg-surface border border-border rounded-lg',
    options: 'space-y-4 mt-6',
    option: 'p-4 border-2 border-border rounded-lg cursor-pointer transition-all',
    optionText: 'text-base leading-relaxed',
    button: 'px-6 py-3 text-base font-semibold rounded-lg mt-8'
  };
};