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
export type SubscriptionTier = 'basic' | 'premium' | 'enterprise';

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

// Bloom's Taxonomy Types for Learning Design
export type BloomsTaxonomyLevel = 
    | 'remember'      // Level 1: Recall facts and basic concepts
    | 'understand'    // Level 2: Explain ideas or concepts
    | 'apply'         // Level 3: Use information in new situations
    | 'analyze'       // Level 4: Draw connections among ideas
    | 'evaluate'      // Level 5: Justify a decision or course of action
    | 'create';       // Level 6: Produce new or original work

export interface BloomsLevelDescriptor {
    level: BloomsTaxonomyLevel;
    order: number; // 1-6, representing the hierarchical order
    description: string;
    actionVerbs: string[]; // Measurable verbs for this level
    color: string; // For visual representation
}

export interface LearningObjective {
    id: string;
    moduleId: string;
    objectiveType: 'course-level' | 'lesson-level'; // Distinction per best practices
    bloomsLevel: BloomsTaxonomyLevel;
    action: string; // What the learner will do (using Bloom's action verbs)
    condition: string; // Under what circumstances (context/scenario)
    criteria: string; // How well the performance must be executed (standard)
    fullStatement: string; // Complete SMART objective
    relatedAssessmentIds?: string[]; // Links to questions that assess this objective
    isPrerequisiteFor?: string[]; // IDs of objectives that build on this one
}

export interface ModuleLearningDesign {
    moduleId: string;
    moduleName: string;
    overarchingGoal: string; // Broad course-level goal
    cognitiveLevel: 'introductory' | 'reinforcement' | 'application' | 'synthesis';
    targetLevels: BloomsTaxonomyLevel[]; // Primary Bloom's levels targeted
    courseLevelObjectives: LearningObjective[];
    lessonLevelObjectives: LearningObjective[];
    instructionalStrategies: {
        level: BloomsTaxonomyLevel;
        strategies: string[]; // Teaching methods aligned to this level
    }[];
    assessmentAlignment: {
        objectiveId: string;
        questionIds: string[];
        bloomsLevel: BloomsTaxonomyLevel;
    }[];
}

export interface AssessmentQuestion {
    id: string;
    moduleId: number;
    bloomsLevel: BloomsTaxonomyLevel;
    learningObjectiveId: string;
    question: string;
    answer: string;
    options: string[] | { [key: string]: string };
    explanation?: string;
    scenario?: string; // For higher-order questions
    cognitiveComplexity: 'low' | 'medium' | 'high';
}