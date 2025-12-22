/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// User and Authentication Types
export interface User {
    id?: string;
    fullname: string;
    organizationType: string;
    organizationName: string;
    email: string;
    phone?: string;
    position?: string;
    subscriptionTier: SubscriptionTier;
    loginDate: string;
    registrationDate: string;
    isEnterprise: boolean;
    cpdHours?: CPDHours;
    certificationDate?: string;
    certificationExpiry?: string;
    purchasedResources?: string[]; // IDs of individually purchased resources/tools
}

export interface LoginUser {
    fullname: string;
    organizationType: string;
    organizationName: string;
    email: string;
    loginDate: string;
}

// Subscription and Pricing Types
export type SubscriptionTier = 'basic' | 'individual' | 'enterprise';

export interface PricingTier {
    id: SubscriptionTier;
    name: string;
    price: number;
    currency: string;
    billing: 'monthly' | 'annual';
    features: string[];
    studyGuideAccess: boolean;
    practiceExamAccess: boolean;
    certificateAccess: boolean;
    aiAssistantAccess: boolean;
    supportLevel: 'community' | 'email' | 'priority';
    maxUsers?: number;
    isPopular?: boolean;
    toolsAccess?: string[]; // List of tool IDs accessible with this tier
    resourcesAccess?: string[]; // List of resource IDs accessible with this tier
    cpdTrackingEnabled?: boolean;
}

// Study Materials Types
export interface StudyGuide {
    id: string;
    title: string;
    description: string;
    moduleIds: string[];
    format: 'pdf' | 'interactive';
    size: string;
    lastUpdated: string;
    isPremium: boolean;
}

export interface PracticeExam {
    id: string;
    title: string;
    description: string;
    moduleIds: string[];
    questionCount: number;
    timeLimit: number; // in minutes
    passingScore: number;
    attempts: number;
    isPremium: boolean;
}

// AI Assistant Types
export interface AIProvider {
    id: string;
    name: string;
    description: string;
    isOpenSource: boolean;
    isFree: boolean;
    apiEndpoint?: string;
    features: string[];
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// CPD (Continuing Professional Development) Types
export interface CPDHours {
    total: number;
    required: number;
    byCategory: {
        training: number;
        thirdParty: number;
        formalStudy: number;
        conferences: number;
        other: number;
    };
    periodStart: string;
    periodEnd: string;
}

export interface CPDActivity {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: 'training' | 'thirdParty' | 'formalStudy' | 'conferences' | 'other';
    hours: number;
    date: string;
    provider?: string;
    certificateUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedDate: string;
    reviewedDate?: string;
    reviewedBy?: string;
    notes?: string;
}

export interface CPDRequirement {
    tier: SubscriptionTier;
    annualHoursRequired: number;
    renewalPeriodMonths: number;
    categoryMinimums?: {
        [key: string]: number;
    };
    description: string;
}

// Resource and Tool Purchase Types
export interface PurchasableItem {
    id: string;
    type: 'tool' | 'resource' | 'bundle';
    name: string;
    description: string;
    price: number;
    currency: string;
    includedInTiers: SubscriptionTier[];
    availableForPurchase: SubscriptionTier[]; // Which tiers can buy this individually
    url?: string; // For tools, the URL to access
    files?: string[]; // For resources, the file names
}

export interface Purchase {
    id: string;
    userId: string;
    itemId: string;
    purchaseDate: string;
    price: number;
    status: 'completed' | 'pending' | 'refunded';
    expiryDate?: string;
}