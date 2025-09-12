/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { useMobileDetection, getNavigationClasses, getDeviceOptimizedClasses } from '../../hooks/useMobileDetection';

interface ResponsiveNavigationProps {
  items: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    active?: boolean;
    completed?: boolean;
    locked?: boolean;
  }>;
  className?: string;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({ 
  items, 
  className = '' 
}) => {
  const detection = useMobileDetection();
  const navClasses = getNavigationClasses(detection);
  
  // Mobile bottom navigation for mobile devices
  if (detection.screenSize === 'mobile') {
    return (
      <nav className={`${navClasses.container} ${className}`}>
        <div className={navClasses.items}>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              disabled={item.locked}
              className={`
                ${navClasses.item}
                ${item.active ? 'text-primary' : 'text-text-secondary'}
                ${item.completed ? 'text-success' : ''}
                ${item.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${getDeviceOptimizedClasses(detection)}
                tap-highlight-transparent
                touch-manipulation
                transition-colors duration-200
              `}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              <div className={navClasses.icon}>
                {item.icon}
              </div>
              <span className={navClasses.text}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    );
  }
  
  // Desktop/tablet sidebar navigation
  return (
    <nav className={`${navClasses.container} ${className}`}>
      <div className={navClasses.items}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={item.locked}
            className={`
              ${navClasses.item}
              ${item.active ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'}
              ${item.completed ? 'border-l-4 border-success' : ''}
              ${item.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${detection.touchDevice ? 'touch-manipulation min-h-touch' : ''}
              transition-all duration-200
            `}
            aria-label={item.label}
            aria-current={item.active ? 'page' : undefined}
          >
            <div className={navClasses.icon}>
              {item.icon}
            </div>
            <span className={navClasses.text}>
              {item.label}
            </span>
            {item.completed && (
              <div className="ml-auto text-success">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ResponsiveNavigation;