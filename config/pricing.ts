/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingTier } from '../types';

// Pricing based on comparable cybersecurity training programs in Ontario/Canada
export const PRICING_TIERS: PricingTier[] = [
    {
        id: 'basic',
        name: 'Basic Access',
        price: 0,
        currency: 'CAD',
        billing: 'monthly',
        features: [
            'Access to all 4 training modules',
            'Basic AI study assistant',
            'Module quizzes and assessments',
            'Digital certificate upon completion',
            'Community support forum'
        ],
        studyGuideAccess: false,
        practiceExamAccess: false,
        certificateAccess: true,
        aiAssistantAccess: true,
        supportLevel: 'community',
        isPopular: false
    },
    {
        id: 'individual',
        name: 'Individual Professional',
        price: 149,
        currency: 'CAD',
        billing: 'annual',
        features: [
            'Everything in Basic Access',
            'Downloadable comprehensive study guide',
            'Practice final examination (3 attempts)',
            'Advanced AI study assistant with unlimited queries',
            'Email support',
            'Module completion certificates',
            'LinkedIn certification badge'
        ],
        studyGuideAccess: true,
        practiceExamAccess: true,
        certificateAccess: true,
        aiAssistantAccess: true,
        supportLevel: 'email',
        maxUsers: 1,
        isPopular: true
    },
    {
        id: 'enterprise',
        name: 'Enterprise & Municipal',
        price: 899,
        currency: 'CAD',
        billing: 'annual',
        features: [
            'Everything in Individual Professional',
            'Multi-user access (up to 25 users)',
            'Custom organization branding',
            'Advanced analytics and reporting',
            'Priority support with dedicated account manager',
            'Custom training modules for organization',
            'Bulk certificate generation',
            'SCORM compliance for LMS integration',
            'Quarterly compliance updates'
        ],
        studyGuideAccess: true,
        practiceExamAccess: true,
        certificateAccess: true,
        aiAssistantAccess: true,
        supportLevel: 'priority',
        maxUsers: 25,
        isPopular: false
    }
];

export const getFeaturesByTier = (tier: string) => {
    const tierConfig = PRICING_TIERS.find(t => t.id === tier);
    return tierConfig || PRICING_TIERS[0];
};

export const hasFeatureAccess = (userTier: string, feature: keyof PricingTier): boolean => {
    const tier = getFeaturesByTier(userTier);
    return tier[feature] as boolean;
};