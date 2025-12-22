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
            'Community support forum',
            'Basic Platform tool access'
        ],
        studyGuideAccess: false,
        practiceExamAccess: false,
        certificateAccess: true,
        aiAssistantAccess: true,
        supportLevel: 'community',
        isPopular: false,
        toolsAccess: ['tool-basic-platform'],
        resourcesAccess: [],
        cpdTrackingEnabled: false
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
            'LinkedIn certification badge',
            'Interactive Study Guide tool',
            'Practice Exam System tool',
            'CPD tracking (20 hours/year required)'
        ],
        studyGuideAccess: true,
        practiceExamAccess: true,
        certificateAccess: true,
        aiAssistantAccess: true,
        supportLevel: 'email',
        maxUsers: 1,
        isPopular: true,
        toolsAccess: ['tool-basic-platform', 'tool-practice-exam', 'tool-study-guide'],
        resourcesAccess: [],
        cpdTrackingEnabled: true
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
            'All tools: Enhanced Platform, Practice Exam, Study Guide',
            'Complete resource library (all templates & checklists)',
            'Custom organization branding',
            'Advanced analytics and reporting',
            'Priority support with dedicated account manager',
            'Custom training modules for organization',
            'Bulk certificate generation',
            'SCORM compliance for LMS integration',
            'Quarterly compliance updates',
            'CPD tracking (25 hours/year required)'
        ],
        studyGuideAccess: true,
        practiceExamAccess: true,
        certificateAccess: true,
        aiAssistantAccess: true,
        supportLevel: 'priority',
        maxUsers: 25,
        isPopular: false,
        toolsAccess: ['tool-basic-platform', 'tool-practice-exam', 'tool-study-guide', 'tool-enhanced-platform'],
        resourcesAccess: [
            'PIA_Checklist',
            'Breach_Notification_Templates',
            'Consent_Management',
            'PIPEDA_MFIPPA_Comparison',
            'Incident_Response_Plan',
            'Risk_Assessment_Worksheet',
            'Security_Controls_Checklist',
            'Advanced_Incident_Response_Playbook',
            'AIA_Template',
            'AI_Bias_Testing',
            'AI_Transparency',
            'AI_Governance_Framework',
            'Data_Classification_Matrix',
            'Records_Retention_Schedule',
            'Microlearning_Modules'
        ],
        cpdTrackingEnabled: true
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