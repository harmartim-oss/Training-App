/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BloomsTaxonomyLevel, BloomsLevelDescriptor } from '../types';

/**
 * Bloom's Taxonomy Level Descriptors with Action Verbs
 * Based on instructional design best practices for online training
 */
export const BLOOMS_LEVELS: Record<BloomsTaxonomyLevel, BloomsLevelDescriptor> = {
    remember: {
        level: 'remember',
        order: 1,
        description: 'Recall facts and basic concepts',
        actionVerbs: [
            'define', 'identify', 'list', 'name', 'recall', 'recognize', 
            'state', 'describe', 'label', 'match', 'select', 'cite'
        ],
        color: '#E8F5E9' // Light green
    },
    understand: {
        level: 'understand',
        order: 2,
        description: 'Explain ideas or concepts',
        actionVerbs: [
            'classify', 'compare', 'contrast', 'demonstrate', 'explain', 
            'interpret', 'paraphrase', 'summarize', 'illustrate', 'infer', 
            'outline', 'discuss', 'distinguish', 'predict'
        ],
        color: '#BBDEFB' // Light blue
    },
    apply: {
        level: 'apply',
        order: 3,
        description: 'Use information in new situations',
        actionVerbs: [
            'apply', 'execute', 'implement', 'solve', 'use', 'demonstrate',
            'calculate', 'complete', 'examine', 'modify', 'operate', 
            'prepare', 'produce', 'show', 'sketch'
        ],
        color: '#FFF9C4' // Light yellow
    },
    analyze: {
        level: 'analyze',
        order: 4,
        description: 'Draw connections among ideas',
        actionVerbs: [
            'analyze', 'compare', 'contrast', 'differentiate', 'distinguish',
            'examine', 'experiment', 'investigate', 'organize', 'question',
            'test', 'categorize', 'deconstruct', 'integrate', 'relate'
        ],
        color: '#FFE0B2' // Light orange
    },
    evaluate: {
        level: 'evaluate',
        order: 5,
        description: 'Justify a decision or course of action',
        actionVerbs: [
            'appraise', 'argue', 'assess', 'critique', 'defend', 'evaluate',
            'judge', 'justify', 'prioritize', 'rank', 'rate', 'recommend',
            'support', 'validate', 'determine', 'conclude'
        ],
        color: '#F8BBD0' // Light pink
    },
    create: {
        level: 'create',
        order: 6,
        description: 'Produce new or original work',
        actionVerbs: [
            'create', 'design', 'develop', 'formulate', 'construct', 'plan',
            'produce', 'invent', 'compose', 'devise', 'generate', 'integrate',
            'build', 'synthesize', 'propose', 'assemble'
        ],
        color: '#E1BEE7' // Light purple
    }
};

/**
 * Get Bloom's level descriptor by level
 */
export const getBloomsLevel = (level: BloomsTaxonomyLevel): BloomsLevelDescriptor => {
    return BLOOMS_LEVELS[level];
};

/**
 * Check if a level is lower-order thinking (Remember, Understand, Apply)
 */
export const isLowerOrderThinking = (level: BloomsTaxonomyLevel): boolean => {
    const order = BLOOMS_LEVELS[level].order;
    return order <= 3;
};

/**
 * Check if a level is higher-order thinking (Analyze, Evaluate, Create)
 */
export const isHigherOrderThinking = (level: BloomsTaxonomyLevel): boolean => {
    return !isLowerOrderThinking(level);
};

/**
 * Get the cognitive complexity category for a Bloom's level
 */
export const getCognitiveComplexity = (level: BloomsTaxonomyLevel): 'low' | 'medium' | 'high' => {
    const order = BLOOMS_LEVELS[level].order;
    if (order <= 2) return 'low';
    if (order <= 4) return 'medium';
    return 'high';
};

/**
 * Format a SMART learning objective
 * @param action - What the learner will do (using Bloom's action verb)
 * @param condition - Under what circumstances
 * @param criteria - How well the performance must be executed
 */
export const formatLearningObjective = (
    action: string,
    condition: string,
    criteria: string
): string => {
    return `${condition}, ${action}, ${criteria}`;
};

/**
 * Instructional strategies aligned to Bloom's levels
 */
export const INSTRUCTIONAL_STRATEGIES: Record<BloomsTaxonomyLevel, string[]> = {
    remember: [
        'Deliver content through videos, animations, and textual materials',
        'Use flashcards and memorization techniques',
        'Provide short assessment questions to verify comprehension',
        'Include definitions, lists, and factual content'
    ],
    understand: [
        'Provide explanations with examples and non-examples',
        'Use analogies and metaphors to clarify concepts',
        'Include comparison tables and infographics',
        'Ask learners to explain concepts in their own words'
    ],
    apply: [
        'Present realistic scenarios and case studies',
        'Provide practice exercises with guided support',
        'Use simulations and interactive activities',
        'Demonstrate step-by-step application procedures'
    ],
    analyze: [
        'Encourage breakdown of complex information into components',
        'Use concept maps and relationship diagrams',
        'Provide structured analysis frameworks',
        'Ask learners to identify patterns and relationships'
    ],
    evaluate: [
        'Present decision-making scenarios requiring justification',
        'Use peer review and critique activities',
        'Provide evaluation rubrics and criteria',
        'Ask learners to defend positions with evidence'
    ],
    create: [
        'Assign project-based learning activities',
        'Facilitate collaborative group work',
        'Encourage development of original solutions',
        'Provide opportunities for synthesis and innovation'
    ]
};

/**
 * Get appropriate instructional strategies for a Bloom's level
 */
export const getInstructionalStrategies = (level: BloomsTaxonomyLevel): string[] => {
    return INSTRUCTIONAL_STRATEGIES[level];
};

/**
 * Map practice gaps to appropriate Bloom's levels
 */
export const mapGapToBloomsLevel = (gapType: string): BloomsTaxonomyLevel[] => {
    switch (gapType) {
        case 'knowledge-deficit':
            return ['remember', 'understand'];
        case 'skill-application':
            return ['apply', 'analyze'];
        case 'decision-making':
        case 'competency':
            return ['evaluate', 'create'];
        default:
            return ['understand', 'apply'];
    }
};

/**
 * Validate if an action verb is appropriate for a Bloom's level
 */
export const isValidActionVerb = (verb: string, level: BloomsTaxonomyLevel): boolean => {
    const descriptor = BLOOMS_LEVELS[level];
    return descriptor.actionVerbs.some(v => 
        v.toLowerCase() === verb.toLowerCase()
    );
};

/**
 * Get a random action verb for a Bloom's level (useful for generating objectives)
 */
export const getRandomActionVerb = (level: BloomsTaxonomyLevel): string => {
    const verbs = BLOOMS_LEVELS[level].actionVerbs;
    return verbs[Math.floor(Math.random() * verbs.length)];
};

/**
 * Get icon emoji for Bloom's level
 */
export const getBloomsLevelIcon = (level: BloomsTaxonomyLevel): string => {
    const icons: Record<BloomsTaxonomyLevel, string> = {
        remember: '📝',
        understand: '💡',
        apply: '🔧',
        analyze: '🔍',
        evaluate: '⚖️',
        create: '🎨'
    };
    return icons[level];
};

/**
 * Sort learning objectives by Bloom's taxonomy order
 */
export const sortByBloomsOrder = <T extends { bloomsLevel: BloomsTaxonomyLevel }>(
    objectives: T[]
): T[] => {
    return [...objectives].sort((a, b) => {
        return BLOOMS_LEVELS[a.bloomsLevel].order - BLOOMS_LEVELS[b.bloomsLevel].order;
    });
};
