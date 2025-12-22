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
            price: 49,
            billing: 'per month',
            description: 'Essential module access for learning cybersecurity fundamentals',
            features: [
                '✅ Access to all 4 core training modules',
                '✅ Module quizzes and assessments',
                '✅ Sequential progression tracking',
                '✅ Basic AI study assistant (limited)',
                '✅ Digital certificate upon completion',
                '✅ Community forum access'
            ],
            limitations: [
                '❌ No tools or resources access',
                '❌ No downloadable study guides',
                '❌ No practice exams',
                '❌ No professional PDF templates',
                '❌ Community support only'
            ],
            buttonText: 'Current Plan',
            buttonStyle: 'btn-secondary'
        },
        {
            id: 'premium' as SubscriptionTier,
            name: 'Premium',
            price: 149,
            billing: 'per year',
            description: 'Complete access to ALL tools and resources for professionals',
            features: [
                '🎯 Everything in Basic PLUS:',
                '🔧 Access to ALL tools',
                '📚 Complete professional resource library',
                '📄 Downloadable PDF study guides',
                '🧪 Unlimited practice exam attempts',
                '🤖 Advanced AI assistant (unlimited queries)',
                '📊 Advanced progress tracking & analytics',
                '📞 Email support (48-hour response)',
                '🏆 Professional certificate with verification',
                '💼 All incident response playbooks',
                '📋 All assessment and compliance templates',
                '✅ CPD tracking (20 hours/year)'
            ],
            popular: true,
            savings: 'Best value - All tools & resources included!',
            buttonText: 'Upgrade to Premium',
            buttonStyle: 'btn-primary'
        },
        {
            id: 'enterprise' as SubscriptionTier,
            name: 'Enterprise',
            price: 899,
            billing: 'per year (up to 25 users)',
            description: 'Everything in Premium plus team management and analytics',
            features: [
                '🚀 Everything in Premium PLUS:',
                '👥 Multi-user access (up to 25 users)',
                '📊 Admin dashboard with analytics',
                '🔍 User management capabilities',
                '📈 Business intelligence and patterns',
                '🎨 Custom organization branding',
                '⚡ Priority support (24-hour response)',
                '🤝 Dedicated customer success manager',
                '📞 Live expert consultation sessions',
                '🔧 Custom policy template creation',
                '🏛️ AI Governance Framework customization',
                '📱 Bulk certificate generation',
                '🌐 SCORM/LMS integration',
                '✅ CPD tracking (25 hours/year)'
            ],
            enterprise: true,
            savings: 'Best for teams - Save up to 75% per user!',
            buttonText: 'Contact Sales',
            buttonStyle: 'btn-primary'
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

            {/* Enhanced Available Plans */}
            <div className="mb-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold font-mono text-text-primary mb-4 uppercase">
                        Choose Your OCRP Learning Path
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Unlock your potential with our comprehensive cybersecurity training programs. 
                        Each plan is designed to provide maximum value for your professional development.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => {
                        const isCurrent = plan.id === user.subscriptionTier;
                        const canUpgrade = plan.id !== user.subscriptionTier && plan.price > (currentPlan?.price || 0);
                        
                        return (
                            <div
                                key={plan.id}
                                className={`relative rounded-2xl border-2 transition-all duration-300 ${
                                    isCurrent 
                                        ? 'border-success bg-success/5 transform scale-105' 
                                        : plan.popular 
                                            ? 'border-primary bg-gradient-to-b from-primary/5 to-accent/5 transform hover:scale-105' 
                                            : 'border-border bg-surface hover:border-primary/50 hover:transform hover:scale-102'
                                } p-8 relative overflow-hidden`}
                            >
                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                                
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <span className="bg-gradient-to-r from-primary to-accent text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                            ⭐ Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                {isCurrent && (
                                    <div className="absolute -top-4 right-6 z-10">
                                        <span className="bg-success text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Active Plan
                                        </span>
                                    </div>
                                )}

                                {plan.enterprise && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-gradient-to-r from-accent to-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                            ENTERPRISE
                                        </span>
                                    </div>
                                )}

                                <div className="relative z-10">
                                    {/* Plan Header */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                                        <p className="text-text-secondary text-sm mb-4 leading-relaxed">{plan.description}</p>
                                        <div className="mb-2">
                                            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                                {plan.price === 0 ? 'Free' : `$${plan.price}`}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-muted font-medium">{plan.billing}</p>
                                        {plan.savings && (
                                            <p className="text-sm text-success font-semibold mt-2">💰 {plan.savings}</p>
                                        )}
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3 text-sm">
                                                <span className="text-success flex-shrink-0 mt-0.5">✓</span>
                                                <span className="text-text-secondary leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                        {plan.limitations && plan.limitations.map((limitation, index) => (
                                            <div key={`limit-${index}`} className="flex items-start gap-3 text-sm opacity-60">
                                                <span className="text-text-muted flex-shrink-0 mt-0.5">✗</span>
                                                <span className="text-text-muted">{limitation}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-auto">
                                        {isCurrent ? (
                                            <button 
                                                disabled
                                                className="w-full py-4 px-6 bg-gradient-to-r from-success to-success/80 text-white rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                <CheckCircleIcon className="w-5 h-5" />
                                                Current Plan
                                            </button>
                                        ) : canUpgrade ? (
                                            <button
                                                onClick={() => handleUpgrade(plan.id)}
                                                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                                                    plan.popular 
                                                        ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:transform hover:scale-105' 
                                                        : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                                                }`}
                                            >
                                                {plan.buttonText}
                                            </button>
                                        ) : (
                                            <button 
                                                disabled
                                                className="w-full py-4 px-6 bg-border/20 text-text-muted rounded-xl font-semibold cursor-not-allowed"
                                            >
                                                {plan.price < (currentPlan?.price || 0) ? 'Contact Support' : 'Not Available'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Value Proposition */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
                        <h3 className="text-xl font-bold text-text-primary mb-4">🚀 Why Upgrade to Professional or Enterprise?</h3>
                        <div className="grid md:grid-cols-3 gap-6 text-sm">
                            <div className="text-center">
                                <div className="text-2xl mb-2">📚</div>
                                <h4 className="font-semibold text-text-primary mb-2">Professional Resources</h4>
                                <p className="text-text-secondary">Access to exclusive study guides, incident response playbooks, and assessment templates used by industry professionals.</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🤖</div>
                                <h4 className="font-semibold text-text-primary mb-2">AI-Powered Learning</h4>
                                <p className="text-text-secondary">Unlimited access to our advanced AI study assistant for personalized learning paths and instant expert guidance.</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🏆</div>
                                <h4 className="font-semibold text-text-primary mb-2">Career Advancement</h4>
                                <p className="text-text-secondary">Stand out with verified professional certificates and advanced skills that employers value most.</p>
                            </div>
                        </div>
                    </div>
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