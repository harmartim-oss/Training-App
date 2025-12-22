/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BloomsLevel } from './bloomsTaxonomy';

/**
 * Bloom's Taxonomy mapping for assessment questions
 * Each question is tagged with its cognitive level according to Bloom's Taxonomy
 */

export interface AssessmentQuestionWithBlooms {
  module: number;
  bloomsLevel: BloomsLevel;
  question: string;
  answer: string;
  options: string[];
}

// Mapping of question indices to Bloom's levels for existing assessment questions
export const assessmentBloomsMapping: Record<number, BloomsLevel> = {
  // Module 1 questions (indices 0-14)
  0: BloomsLevel.APPLY,      // CRM implementation and purpose identification
  1: BloomsLevel.ANALYZE,    // Breach notification - analyzing requirements
  2: BloomsLevel.UNDERSTAND, // Consent types explanation
  3: BloomsLevel.REMEMBER,   // FOI request timeline recall
  4: BloomsLevel.APPLY,      // PHIPA safeguards application
  5: BloomsLevel.REMEMBER,   // Access request timeframe recall
  6: BloomsLevel.ANALYZE,    // FIPPA exemptions differentiation
  7: BloomsLevel.EVALUATE,   // Vendor breach - assessing obligations
  8: BloomsLevel.UNDERSTAND, // Jurisdictional differences explanation
  9: BloomsLevel.APPLY,      // PIA phases application
  10: BloomsLevel.UNDERSTAND, // Retention principle understanding
  11: BloomsLevel.APPLY,     // Authentication and authorization application
  12: BloomsLevel.REMEMBER,  // Personal information definition
  13: BloomsLevel.EVALUATE,  // Cross-border transfer evaluation
  14: BloomsLevel.REMEMBER,  // Breach notification threshold recall
  
  // Module 2 questions (indices 15-29)
  15: BloomsLevel.APPLY,     // Ransomware containment application
  16: BloomsLevel.UNDERSTAND, // Least privilege principle understanding
  17: BloomsLevel.APPLY,     // Risk calculation application
  18: BloomsLevel.REMEMBER,  // Incident response phase recall
  19: BloomsLevel.UNDERSTAND, // System hardening purpose understanding
  20: BloomsLevel.REMEMBER,  // Zero-day vulnerability definition
  21: BloomsLevel.UNDERSTAND, // Need-to-know principle understanding
  22: BloomsLevel.APPLY,     // DDoS response application
  23: BloomsLevel.APPLY,     // SQL injection prevention application
  24: BloomsLevel.UNDERSTAND, // Encryption types understanding
  25: BloomsLevel.UNDERSTAND, // Chain of custody purpose understanding
  26: BloomsLevel.UNDERSTAND, // MFA benefits understanding
  27: BloomsLevel.ANALYZE,   // Control types differentiation
  28: BloomsLevel.EVALUATE,  // Backup strategy evaluation
  29: BloomsLevel.UNDERSTAND, // Vulnerability assessment purpose understanding
  
  // Module 3 questions (indices 30-44)
  30: BloomsLevel.REMEMBER,  // AI directive effective date and scope
  31: BloomsLevel.APPLY,     // Human oversight application
  32: BloomsLevel.UNDERSTAND, // AIA purpose understanding
  33: BloomsLevel.UNDERSTAND, // Explainable AI definition
  34: BloomsLevel.ANALYZE,   // Algorithmic bias identification
  35: BloomsLevel.REMEMBER,  // AIA documentation requirements
  36: BloomsLevel.ANALYZE,   // Transparency vs explainability differentiation
  37: BloomsLevel.UNDERSTAND, // Fairness in AI understanding
  38: BloomsLevel.EVALUATE,  // Vendor procurement requirements evaluation
  39: BloomsLevel.UNDERSTAND, // Human-in-the-loop understanding
  40: BloomsLevel.REMEMBER,  // Accountability principle recall
  41: BloomsLevel.REMEMBER,  // AIA update triggers
  42: BloomsLevel.EVALUATE,  // AI and privacy compliance evaluation
  43: BloomsLevel.APPLY,     // Bias remediation application
  44: BloomsLevel.UNDERSTAND, // AI documentation purpose understanding
  
  // Module 4 questions (indices 45-59)
  45: BloomsLevel.EVALUATE,  // Cross-border data transfer evaluation
  46: BloomsLevel.APPLY,     // PIPEDA transfer requirements application
  47: BloomsLevel.UNDERSTAND, // Data classification levels understanding
  48: BloomsLevel.UNDERSTAND, // Retention schedule purpose understanding
  49: BloomsLevel.REMEMBER,  // Data lifecycle phases recall
  50: BloomsLevel.APPLY,     // MFIPPA destruction requirements application
  51: BloomsLevel.ANALYZE,   // Encryption types differentiation
  52: BloomsLevel.APPLY,     // Legacy data destruction application
  53: BloomsLevel.UNDERSTAND, // Pseudonymization understanding
  54: BloomsLevel.REMEMBER,  // Data residency requirements recall
  55: BloomsLevel.UNDERSTAND, // DLP purpose understanding
  56: BloomsLevel.APPLY,     // Data governance framework application
  57: BloomsLevel.UNDERSTAND, // Data minimization principle understanding
  58: BloomsLevel.APPLY,     // Data inventory requirements application
  59: BloomsLevel.APPLY,     // Device disposal application
};

// Helper function to get Bloom's level for a question by index
export const getQuestionBloomsLevel = (questionIndex: number): BloomsLevel => {
  const level = assessmentBloomsMapping[questionIndex];
  if (!level) {
    console.warn(`No Bloom's level mapped for question index ${questionIndex}, defaulting to APPLY`);
  }
  return level || BloomsLevel.APPLY;
};

// Helper function to get statistics about Bloom's levels in assessment
export const getAssessmentBloomsStatistics = () => {
  const levels = Object.values(assessmentBloomsMapping);
  const stats = {
    [BloomsLevel.REMEMBER]: 0,
    [BloomsLevel.UNDERSTAND]: 0,
    [BloomsLevel.APPLY]: 0,
    [BloomsLevel.ANALYZE]: 0,
    [BloomsLevel.EVALUATE]: 0,
    [BloomsLevel.CREATE]: 0,
  };
  
  levels.forEach(level => {
    stats[level]++;
  });
  
  return {
    stats,
    total: levels.length,
    lowerOrderCount: stats[BloomsLevel.REMEMBER] + stats[BloomsLevel.UNDERSTAND] + stats[BloomsLevel.APPLY],
    higherOrderCount: stats[BloomsLevel.ANALYZE] + stats[BloomsLevel.EVALUATE] + stats[BloomsLevel.CREATE],
  };
};
