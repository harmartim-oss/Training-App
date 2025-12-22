/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CPDRequirement, PurchasableItem } from '../types';

/**
 * CPD (Continuing Professional Development) Requirements
 * 
 * Based on research of similar professional certification programs:
 * - ISC2 CISSP: 120 CPE hours over 3 years (40/year)
 * - ISACA CISA: 120 CPE hours over 3 years (20 minimum annually)
 * - CompTIA: 50 CEU over 3 years for Security+
 * - CIPP/C (IAPP): 20 CPE credits over 2 years
 * 
 * For OCRP certification, we've established a balanced approach:
 * - Basic tier: No CPD required (entry-level access)
 * - Individual/Professional: 20 hours annually (industry standard for professionals)
 * - Enterprise: 25 hours annually (higher standard for organizational leadership)
 */

export const CPD_REQUIREMENTS: CPDRequirement[] = [
    {
        tier: 'basic',
        annualHoursRequired: 0,
        renewalPeriodMonths: 0,
        description: 'No CPD requirements for basic tier. Certification does not expire.'
    },
    {
        tier: 'individual',
        annualHoursRequired: 20,
        renewalPeriodMonths: 12,
        categoryMinimums: {
            training: 10, // At least 10 hours from formal training
        },
        description: 'Maintain certification with 20 CPD hours annually. At least 10 hours must be from formal training activities.'
    },
    {
        tier: 'enterprise',
        annualHoursRequired: 25,
        renewalPeriodMonths: 12,
        categoryMinimums: {
            training: 12, // At least 12 hours from formal training
        },
        description: 'Maintain certification with 25 CPD hours annually. At least 12 hours must be from formal training activities.'
    }
];

/**
 * CPD Activity Categories and Guidelines
 * 
 * Based on competitor analysis:
 * - ISC2: Group A (education), Group B (contribution)
 * - ISACA: Category A (professional education), Category B (contributions)
 * - IAPP: Variety of categories including training, teaching, publications
 */

export const CPD_CATEGORIES = {
    training: {
        name: 'Formal Training & Courses',
        description: 'Structured learning programs, workshops, webinars, and online courses',
        examples: [
            'OCRP continuing education modules',
            'Industry certifications and courses',
            'University/college credit courses',
            'Vendor-specific training programs',
            'Professional development workshops'
        ],
        hoursCalculation: 'Direct hours attended',
        maxAnnualHours: null, // No limit
        requiresEvidence: true,
        acceptedEvidence: ['Certificate of completion', 'Course transcript', 'Training record']
    },
    thirdParty: {
        name: 'Third-Party Activities',
        description: 'Professional activities conducted through other organizations',
        examples: [
            'Industry conference attendance',
            'Professional association meetings',
            'Committee participation',
            'Speaking engagements',
            'Teaching or training others'
        ],
        hoursCalculation: 'Actual hours participated (conference: 1 day = 6 hours)',
        maxAnnualHours: 10, // Maximum 10 hours from this category
        requiresEvidence: true,
        acceptedEvidence: ['Conference badge', 'Agenda', 'Participation certificate', 'Letter from organizer']
    },
    formalStudy: {
        name: 'Formal Academic Study',
        description: 'Degree programs and academic courses in relevant fields',
        examples: [
            'Undergraduate courses',
            'Graduate-level courses',
            'Diploma programs',
            'Certificate programs at accredited institutions'
        ],
        hoursCalculation: 'Credit hours × 10 (e.g., 3 credit course = 30 CPD hours)',
        maxAnnualHours: null, // No limit
        requiresEvidence: true,
        acceptedEvidence: ['Official transcript', 'Grade report', 'Enrollment verification']
    },
    conferences: {
        name: 'Conferences & Symposiums',
        description: 'Industry conferences, symposiums, and professional gatherings',
        examples: [
            'Cybersecurity conferences',
            'Privacy and data protection symposiums',
            'Technology industry events',
            'Government sector conferences'
        ],
        hoursCalculation: 'Actual attendance time (1 day = 6 hours)',
        maxAnnualHours: 10, // Maximum 10 hours from conferences alone
        requiresEvidence: true,
        acceptedEvidence: ['Registration confirmation', 'Certificate of attendance', 'Ticket/badge']
    },
    other: {
        name: 'Other Professional Activities',
        description: 'Additional qualifying activities not covered above',
        examples: [
            'Publishing articles or research papers',
            'Peer review activities',
            'Mentoring certified professionals',
            'Creating training content',
            'Volunteer work in the field'
        ],
        hoursCalculation: 'Varies by activity (requires pre-approval)',
        maxAnnualHours: 5, // Maximum 5 hours from this category
        requiresEvidence: true,
        acceptedEvidence: ['Publication proof', 'Letter of confirmation', 'Activity description']
    }
};

/**
 * CPD Submission and Validation Process
 * 
 * Based on industry best practices from ISC2, ISACA, and IAPP
 */

export const CPD_VALIDATION_RULES = {
    submissionDeadline: {
        description: 'CPD activities must be submitted within 60 days of completion',
        days: 60
    },
    auditRate: {
        description: 'Random audit of 10% of submissions annually',
        percentage: 10
    },
    evidenceRetention: {
        description: 'Keep evidence for at least 2 years after reporting period',
        years: 2
    },
    gracePeriod: {
        description: 'Grace period for CPD completion after annual deadline',
        days: 30
    },
    carryOver: {
        description: 'Excess CPD hours can be carried over to next period',
        maxHours: 10,
        enabled: true
    }
};

/**
 * Purchasable Tools and Resources
 * 
 * Items that can be purchased individually by lower-tier members
 * or are included in higher-tier subscriptions
 */

export const PURCHASABLE_ITEMS: PurchasableItem[] = [
    // Tools
    {
        id: 'tool-enhanced-platform',
        type: 'tool',
        name: 'Enhanced Platform',
        description: 'Advanced training platform with microlearning timers, spaced repetition, and gamification',
        price: 29.99,
        currency: 'CAD',
        includedInTiers: ['enterprise'],
        availableForPurchase: ['basic', 'individual'],
        url: '/enhanced_platform.html'
    },
    {
        id: 'tool-practice-exam',
        type: 'tool',
        name: 'Practice Exam System',
        description: 'Comprehensive practice exam with detailed analytics and performance tracking',
        price: 19.99,
        currency: 'CAD',
        includedInTiers: ['individual', 'enterprise'],
        availableForPurchase: ['basic'],
        url: '/practice_exam.html'
    },
    {
        id: 'tool-study-guide',
        type: 'tool',
        name: 'Interactive Study Guide',
        description: 'Complete eBook with interactive quizzes, templates, and case studies',
        price: 24.99,
        currency: 'CAD',
        includedInTiers: ['individual', 'enterprise'],
        availableForPurchase: ['basic'],
        url: '/study_guide.html'
    },
    {
        id: 'tool-basic-platform',
        type: 'tool',
        name: 'Basic Platform',
        description: 'Lightweight training platform for offline use',
        price: 0,
        currency: 'CAD',
        includedInTiers: ['basic', 'individual', 'enterprise'],
        availableForPurchase: [],
        url: '/platform.html'
    },
    // Resource Bundles
    {
        id: 'resource-bundle-privacy',
        type: 'bundle',
        name: 'Privacy Compliance Bundle',
        description: 'Complete set of privacy templates and checklists (PIA, Breach Notification, Consent Management, PIPEDA vs MFIPPA)',
        price: 49.99,
        currency: 'CAD',
        includedInTiers: ['enterprise'],
        availableForPurchase: ['basic', 'individual'],
        files: [
            'PIA_Checklist',
            'Breach_Notification_Templates',
            'Consent_Management',
            'PIPEDA_MFIPPA_Comparison'
        ]
    },
    {
        id: 'resource-bundle-security',
        type: 'bundle',
        name: 'Cybersecurity Tools Bundle',
        description: 'Essential security templates (Incident Response Plan, Risk Assessment, Security Controls, Advanced Playbook)',
        price: 49.99,
        currency: 'CAD',
        includedInTiers: ['enterprise'],
        availableForPurchase: ['basic', 'individual'],
        files: [
            'Incident_Response_Plan',
            'Risk_Assessment_Worksheet',
            'Security_Controls_Checklist',
            'Advanced_Incident_Response_Playbook'
        ]
    },
    {
        id: 'resource-bundle-ai',
        type: 'bundle',
        name: 'AI Governance Bundle',
        description: 'Comprehensive AI governance resources (AIA Template, Bias Testing, Transparency, Framework)',
        price: 59.99,
        currency: 'CAD',
        includedInTiers: ['enterprise'],
        availableForPurchase: ['basic', 'individual'],
        files: [
            'AIA_Template',
            'AI_Bias_Testing',
            'AI_Transparency',
            'AI_Governance_Framework'
        ]
    },
    {
        id: 'resource-bundle-data',
        type: 'bundle',
        name: 'Data Management Bundle',
        description: 'Data governance templates (Classification Matrix, Retention Schedule, Microlearning)',
        price: 39.99,
        currency: 'CAD',
        includedInTiers: ['enterprise'],
        availableForPurchase: ['basic', 'individual'],
        files: [
            'Data_Classification_Matrix',
            'Records_Retention_Schedule',
            'Microlearning_Modules'
        ]
    },
    {
        id: 'resource-bundle-complete',
        type: 'bundle',
        name: 'Complete Resource Library',
        description: 'All resources and templates from all bundles',
        price: 149.99,
        currency: 'CAD',
        includedInTiers: ['enterprise'],
        availableForPurchase: ['basic', 'individual'],
        files: [
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
        ]
    }
];

/**
 * Helper Functions
 */

export const getCPDRequirementForTier = (tier: string): CPDRequirement => {
    return CPD_REQUIREMENTS.find(req => req.tier === tier) || CPD_REQUIREMENTS[0];
};

export const getPurchasableItemsForTier = (tier: string): PurchasableItem[] => {
    return PURCHASABLE_ITEMS.filter(item => 
        item.availableForPurchase.includes(tier as any)
    );
};

export const isItemIncludedInTier = (itemId: string, tier: string): boolean => {
    const item = PURCHASABLE_ITEMS.find(i => i.id === itemId);
    return item ? item.includedInTiers.includes(tier as any) : false;
};

export const calculateCPDProgress = (cpdHours: any, requirement: CPDRequirement): number => {
    if (requirement.annualHoursRequired === 0) return 100;
    return Math.min(100, (cpdHours.total / requirement.annualHoursRequired) * 100);
};
