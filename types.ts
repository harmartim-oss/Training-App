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