/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useMobileDetection, getContentDensity } from '../../hooks/useMobileDetection';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'card' | 'form' | 'content' | 'quiz';
  maxWidth?: boolean;
  padding?: boolean;
  spacing?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  variant = 'default',
  maxWidth = true,
  padding = true,
  spacing = true
}) => {
  const detection = useMobileDetection();
  const density = getContentDensity(detection);
  
  // Base classes
  let containerClasses = 'w-full';
  
  // Add max width if requested
  if (maxWidth) {
    containerClasses += ` mx-auto ${density.maxWidth}`;
  }
  
  // Add padding based on device and variant
  if (padding) {
    switch (variant) {
      case 'card':
        containerClasses += ` ${density.cardPadding}`;
        break;
      case 'form':
        containerClasses += detection.screenSize === 'mobile' ? ' p-4' : ' p-6';
        break;
      case 'content':
        containerClasses += detection.screenSize === 'mobile' ? ' p-4' : ' p-8';
        break;
      case 'quiz':
        containerClasses += detection.screenSize === 'mobile' ? ' p-4' : ' p-6';
        break;
      default:
        containerClasses += ` ${density.cardPadding}`;
    }
  }
  
  // Add spacing between child elements
  if (spacing) {
    containerClasses += ` ${density.spacing}`;
  }
  
  // Add device-specific optimizations
  if (detection.screenSize === 'mobile') {
    containerClasses += ' mobile-optimized';
    
    // Add safe area padding for devices with notches
    if (detection.hasNotch) {
      containerClasses += ' safe-area-inset-x';
    }
    
    // Touch optimization
    if (detection.touchDevice) {
      containerClasses += ' touch-manipulation tap-highlight-transparent';
    }
  } else if (detection.screenSize === 'tablet') {
    containerClasses += ' tablet-optimized';
  } else {
    containerClasses += ' desktop-optimized';
  }
  
  // Add variant-specific classes
  switch (variant) {
    case 'card':
      containerClasses += ' bg-surface border border-border rounded-xl shadow-light';
      break;
    case 'form':
      containerClasses += ' bg-surface border border-border rounded-lg';
      break;
    case 'content':
      containerClasses += ' bg-surface rounded-lg';
      break;
    case 'quiz':
      containerClasses += ' bg-surface border border-border rounded-xl shadow-medium';
      break;
  }
  
  // Responsive grid classes for multi-column layouts
  const getGridClasses = () => {
    if (React.Children.count(children) > 1 && variant === 'default') {
      return density.columns;
    }
    return '';
  };
  
  return (
    <div 
      className={`${containerClasses} ${getGridClasses()} ${className}`}
      style={{
        // Ensure minimum touch targets on mobile
        ...(detection.touchDevice && variant === 'form' && {
          minHeight: '44px'
        }),
        // Optimize for safe areas
        ...(detection.hasNotch && {
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))'
        })
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;