/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { CreditCardIcon, CheckCircleIcon } from '../icons';
import { User, SubscriptionTier } from '../../types';

interface SubscriptionManagementProps {
    user: User;
    onNavigate: (section: string) => void;
    onUpgradeSubscription?: (tier: SubscriptionTier) => void;
}

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({ 
    user, 
    onNavigate, 
    onUpgradeSubscription 
}) => {
    const plans = [
        {
            id: 'basic' as SubscriptionTier,
            name: 'Basic',
            price: 0,
            billing: 'Free Forever',
            features: [
                'Access to 4 training modules',
                'Final assessment',
                'Basic certificate',
                'Community support'
            ],
            limitations: [
                'No study guides',
                'No practice exams',
                'Limited AI assistant'
            ]
        },
        {
            id: 'individual' as SubscriptionTier,
            name: 'Individual Pro',
            price: 49,
            billing: 'One-time payment',
            features: [
                'Everything in Basic',
                'Downloadable study guides',
                'Practice exam simulations',
                'Enhanced AI study assistant',
                'Progress tracking & analytics',
                'Email support'
            ],
            popular: true
        },
        {
            id: 'enterprise' as SubscriptionTier,
            name: 'Enterprise',
            price: 199,
            billing: 'Per organization',
            features: [
                'Everything in Individual Pro',
                'Team management dashboard',
                'Bulk user enrollment',
                'Custom branding options',
                'Priority support',
                'Advanced reporting'
            ]
        }
    ];

    const currentPlan = plans.find(plan => plan.id === user.subscriptionTier);

    const handleUpgrade = (tier: SubscriptionTier) => {
        if (onUpgradeSubscription) {
            onUpgradeSubscription(tier);
        }
        // In a real app, this would integrate with a payment processor
        alert(`Upgrade to ${tier} plan initiated. This would normally redirect to payment processing.`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate('account-details')}
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        ← Back to Account
                    </button>
                </div>
            </div>

            {/* Current Plan Status */}
            <div className="module-card-enhanced p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCardIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-mono text-text-primary uppercase">
                            Subscription Management
                        </h1>
                        <p className="text-text-secondary">Manage your OCRP training plan</p>
                    </div>
                </div>

                {currentPlan && (
                    <div className="bg-surface-elevated rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-secondary">Current Plan</p>
                                <h3 className="text-lg font-semibold text-text-primary">
                                    {currentPlan.name}
                                    {currentPlan.id === 'basic' && (
                                        <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                                            Limited Features
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-text-muted">{currentPlan.billing}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                    {currentPlan.price === 0 ? 'Free' : `$${currentPlan.price}`}
                                </p>
                                {currentPlan.price > 0 && (
                                    <p className="text-xs text-text-muted">{currentPlan.billing}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Available Plans */}
            <div className="mb-8">
                <h2 className="text-xl font-bold font-mono text-text-primary mb-6 uppercase">
                    Available Plans
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan) => {
                        const isCurrent = plan.id === user.subscriptionTier;
                        const canUpgrade = plan.id !== user.subscriptionTier && plan.price > (currentPlan?.price || 0);
                        
                        return (
                            <div
                                key={plan.id}
                                className={`relative rounded-lg border ${
                                    isCurrent 
                                        ? 'border-primary bg-primary/5' 
                                        : plan.popular 
                                            ? 'border-primary bg-surface-elevated' 
                                            : 'border-border bg-surface'
                                } p-6`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                {isCurrent && (
                                    <div className="absolute -top-3 right-4">
                                        <span className="bg-success text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircleIcon className="w-3 h-3" />
                                            Current Plan
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-bold text-text-primary mb-2">{plan.name}</h3>
                                    <div className="mb-2">
                                        <span className="text-3xl font-bold text-primary">
                                            {plan.price === 0 ? 'Free' : `$${plan.price}`}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-muted">{plan.billing}</p>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm">
                                            <CheckCircleIcon className="w-4 h-4 text-success flex-shrink-0" />
                                            <span className="text-text-secondary">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.limitations && plan.limitations.map((limitation, index) => (
                                        <li key={`limit-${index}`} className="flex items-center gap-2 text-sm">
                                            <span className="w-4 h-4 text-text-muted flex-shrink-0">—</span>
                                            <span className="text-text-muted line-through">{limitation}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    {isCurrent ? (
                                        <button 
                                            disabled
                                            className="w-full py-2 px-4 bg-success/20 text-success rounded-lg font-medium cursor-not-allowed"
                                        >
                                            Current Plan
                                        </button>
                                    ) : canUpgrade ? (
                                        <button
                                            onClick={() => handleUpgrade(plan.id)}
                                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                                plan.popular 
                                                    ? 'btn-primary' 
                                                    : 'btn-secondary'
                                            }`}
                                        >
                                            Upgrade to {plan.name}
                                        </button>
                                    ) : (
                                        <button 
                                            disabled
                                            className="w-full py-2 px-4 bg-border/20 text-text-muted rounded-lg font-medium cursor-not-allowed"
                                        >
                                            {plan.price < (currentPlan?.price || 0) ? 'Downgrade' : 'Not Available'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Additional Information */}
            <div className="module-card-enhanced p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Subscription Benefits
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-text-secondary">
                    <div>
                        <h4 className="font-medium text-text-primary mb-2">What's Included</h4>
                        <ul className="space-y-1">
                            <li>• Lifetime access to course materials</li>
                            <li>• Official OCRP certification upon completion</li>
                            <li>• Progress tracking and analytics</li>
                            <li>• Mobile-friendly learning platform</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-text-primary mb-2">Money Back Guarantee</h4>
                        <p>
                            Not satisfied? Get a full refund within 30 days of purchase. 
                            We're confident in the quality of our training program.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionManagement;