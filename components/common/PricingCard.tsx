/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PricingTier } from '../../types';
import { useMobileDetection } from '../../hooks/useMobileDetection';

interface PricingCardProps {
    tier: PricingTier;
    selected: boolean;
    onSelect: (tierId: string) => void;
    className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, selected, onSelect, className = '' }) => {
    const { isMobile, isTablet } = useMobileDetection();
    
    const cardPadding = isMobile ? 'p-4' : 'p-6';
    const titleSize = isMobile ? 'text-lg' : 'text-xl';
    const priceSize = isMobile ? 'text-2xl' : 'text-3xl';
    
    return (
        <div 
            className={`relative bg-surface border-2 ${cardPadding} rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border hover:border-primary/50'
            } ${tier.isPopular ? 'ring-2 ring-primary ring-opacity-50' : ''} ${className}`}
            onClick={() => onSelect(tier.id)}
        >
            {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
                        Most Popular
                    </span>
                </div>
            )}
            
            <div className="text-center mb-6">
                <h3 className={`${titleSize} font-bold font-mono text-text-primary mb-2 uppercase tracking-wider`}>
                    {tier.name}
                </h3>
                <div className="mb-4">
                    {tier.price === 0 ? (
                        <div className={`${priceSize} font-bold text-primary`}>FREE</div>
                    ) : (
                        <div className="flex items-baseline justify-center">
                            <span className={`${priceSize} font-bold text-primary`}>${tier.price}</span>
                            <span className="text-text-secondary ml-2">/{tier.billing}</span>
                        </div>
                    )}
                </div>
            </div>

            <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                ))}
            </ul>

            {tier.maxUsers && (
                <div className="text-center border-t border-border pt-4 mb-4">
                    <span className="text-sm font-semibold text-text-secondary">
                        Up to {tier.maxUsers} users
                    </span>
                </div>
            )}

            <div className="text-center">
                <button
                    className={`w-full py-3 px-4 font-semibold rounded transition-colors ${
                        selected 
                            ? 'bg-primary text-white' 
                            : 'bg-surface-elevated border border-border text-text-primary hover:border-primary hover:text-primary'
                    }`}
                >
                    {selected ? 'Selected' : 'Select Plan'}
                </button>
            </div>
        </div>
    );
};

export default PricingCard;