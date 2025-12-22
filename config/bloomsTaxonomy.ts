/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Bloom's Taxonomy Integration for Online Training
 * 
 * This file defines the framework for integrating Bloom's Taxonomy principles
 * into the training application, providing structured cognitive progression
 * and measurable learning objectives.
 */

// Bloom's Taxonomy Levels (hierarchical from lower to higher-order thinking)
export enum BloomsLevel {
  REMEMBER = 'Remember',
  UNDERSTAND = 'Understand',
  APPLY = 'Apply',
  ANALYZE = 'Analyze',
  EVALUATE = 'Evaluate',
  CREATE = 'Create'
}

// Action verbs for each Bloom's level (for creating measurable objectives)
export const BloomsActionVerbs: Record<BloomsLevel, string[]> = {
  [BloomsLevel.REMEMBER]: [
    'define', 'list', 'recall', 'identify', 'name', 'state', 'describe',
    'recognize', 'select', 'match', 'label', 'reproduce'
  ],
  [BloomsLevel.UNDERSTAND]: [
    'explain', 'summarize', 'paraphrase', 'classify', 'compare', 'contrast',
    'interpret', 'discuss', 'distinguish', 'predict', 'estimate'
  ],
  [BloomsLevel.APPLY]: [
    'apply', 'demonstrate', 'calculate', 'solve', 'use', 'implement',
    'execute', 'operate', 'construct', 'practice', 'prepare'
  ],
  [BloomsLevel.ANALYZE]: [
    'analyze', 'differentiate', 'organize', 'deconstruct', 'compare',
    'examine', 'investigate', 'categorize', 'relate', 'distinguish'
  ],
  [BloomsLevel.EVALUATE]: [
    'evaluate', 'judge', 'critique', 'justify', 'assess', 'prioritize',
    'recommend', 'rate', 'validate', 'defend', 'support'
  ],
  [BloomsLevel.CREATE]: [
    'create', 'design', 'develop', 'formulate', 'construct', 'plan',
    'produce', 'compose', 'generate', 'devise', 'assemble'
  ]
};

// Cognitive complexity levels
export enum CognitiveLevel {
  LOWER_ORDER = 'Lower-Order Thinking',  // Remember, Understand, Apply
  HIGHER_ORDER = 'Higher-Order Thinking' // Analyze, Evaluate, Create
}

export const getCognitiveLevel = (level: BloomsLevel): CognitiveLevel => {
  return [BloomsLevel.REMEMBER, BloomsLevel.UNDERSTAND, BloomsLevel.APPLY].includes(level)
    ? CognitiveLevel.LOWER_ORDER
    : CognitiveLevel.HIGHER_ORDER;
};

// SMART Learning Objective structure
export interface LearningObjective {
  id: string;
  statement: string;        // The complete objective statement
  action: string;           // What the learner will do (verb from Bloom's)
  condition: string;        // Under what circumstances
  criteria: string;         // How well it must be performed
  bloomsLevel: BloomsLevel;
  cognitiveLevel: CognitiveLevel;
  assessmentMethod: string; // How this objective is assessed
  moduleId: number;         // Which module this belongs to
}

// Module-level learning objectives (broad, difficult to measure directly)
export interface ModuleLearningObjectives {
  moduleId: number;
  moduleTitle: string;
  courseLevel: LearningObjective[];  // 3-5 broad objectives for the module
  lessonLevel: LearningObjective[];  // Specific, measurable objectives that build toward course-level
}

// Performance gap types aligned with Bloom's levels
export enum PerformanceGapType {
  KNOWLEDGE_DEFICIT = 'Knowledge Deficit',           // Lower levels: Remember, Understand
  SKILL_APPLICATION = 'Skill Application Gap',       // Middle levels: Apply, Analyze
  DECISION_MAKING = 'Decision-Making & Competency'   // Higher levels: Evaluate, Create
}

export const getRecommendedBloomsLevels = (gapType: PerformanceGapType): BloomsLevel[] => {
  switch (gapType) {
    case PerformanceGapType.KNOWLEDGE_DEFICIT:
      return [BloomsLevel.REMEMBER, BloomsLevel.UNDERSTAND];
    case PerformanceGapType.SKILL_APPLICATION:
      return [BloomsLevel.APPLY, BloomsLevel.ANALYZE];
    case PerformanceGapType.DECISION_MAKING:
      return [BloomsLevel.EVALUATE, BloomsLevel.CREATE];
  }
};

// Visual indicators for Bloom's levels
export interface BloomsLevelIndicator {
  level: BloomsLevel;
  color: string;
  icon: string;
  description: string;
  examples: string[];
}

export const BloomsLevelIndicators: BloomsLevelIndicator[] = [
  {
    level: BloomsLevel.REMEMBER,
    color: '#8B5CF6', // purple
    icon: '📚',
    description: 'Recall facts and basic concepts',
    examples: ['Define PIPEDA', 'List the 10 fair information principles', 'Identify privacy laws']
  },
  {
    level: BloomsLevel.UNDERSTAND,
    color: '#3B82F6', // blue
    icon: '💡',
    description: 'Explain ideas or concepts',
    examples: ['Explain consent requirements', 'Summarize breach notification rules', 'Compare PIPEDA and MFIPPA']
  },
  {
    level: BloomsLevel.APPLY,
    color: '#10B981', // green
    icon: '🔧',
    description: 'Use information in new situations',
    examples: ['Apply privacy principles to a scenario', 'Implement security controls', 'Execute incident response']
  },
  {
    level: BloomsLevel.ANALYZE,
    color: '#F59E0B', // amber
    icon: '🔍',
    description: 'Draw connections among ideas',
    examples: ['Analyze privacy risks', 'Examine security vulnerabilities', 'Differentiate between breach types']
  },
  {
    level: BloomsLevel.EVALUATE,
    color: '#EF4444', // red
    icon: '⚖️',
    description: 'Justify a decision or course of action',
    examples: ['Evaluate AI bias testing results', 'Assess data classification levels', 'Judge incident response effectiveness']
  },
  {
    level: BloomsLevel.CREATE,
    color: '#8B5CF6', // purple (darker)
    icon: '✨',
    description: 'Produce new or original work',
    examples: ['Design incident response plan', 'Develop privacy policy', 'Create AI governance framework']
  }
];

// Get color for a Bloom's level
export const getBloomsLevelColor = (level: BloomsLevel): string => {
  const indicator = BloomsLevelIndicators.find(i => i.level === level);
  return indicator?.color || '#6B7280';
};

// Get icon for a Bloom's level
export const getBloomsLevelIcon = (level: BloomsLevel): string => {
  const indicator = BloomsLevelIndicators.find(i => i.level === level);
  return indicator?.icon || '📄';
};

// Module objectives configuration
export const ModuleLearningObjectivesConfig: ModuleLearningObjectives[] = [
  {
    moduleId: 1,
    moduleTitle: 'Privacy Laws & Legal Framework',
    courseLevel: [
      {
        id: 'm1-course-1',
        statement: 'Apply privacy legislation principles to organizational data handling practices',
        action: 'apply',
        condition: 'Given privacy legislation requirements and organizational scenarios',
        criteria: 'Correctly identify applicable laws and implement compliant practices',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Scenario-based questions and case studies',
        moduleId: 1
      },
      {
        id: 'm1-course-2',
        statement: 'Evaluate privacy impact and breach notification requirements across different jurisdictions',
        action: 'evaluate',
        condition: 'When presented with data breach scenarios and cross-jurisdictional contexts',
        criteria: 'Accurately assess notification obligations and prioritize required actions',
        bloomsLevel: BloomsLevel.EVALUATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Multi-step problem solving and decision justification',
        moduleId: 1
      },
      {
        id: 'm1-course-3',
        statement: 'Create comprehensive privacy compliance frameworks for organizations',
        action: 'create',
        condition: 'Based on organizational needs and regulatory requirements',
        criteria: 'Develop complete privacy policies that address all fair information principles',
        bloomsLevel: BloomsLevel.CREATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Practical templates and frameworks provided as resources',
        moduleId: 1
      }
    ],
    lessonLevel: [
      {
        id: 'm1-lesson-1',
        statement: 'Define PIPEDA and its 10 fair information principles',
        action: 'define',
        condition: 'Without reference materials',
        criteria: 'List all 10 principles accurately',
        bloomsLevel: BloomsLevel.REMEMBER,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Multiple choice and recall questions',
        moduleId: 1
      },
      {
        id: 'm1-lesson-2',
        statement: 'Explain the differences between PIPEDA, MFIPPA, PHIPA, and FIPPA',
        action: 'explain',
        condition: 'When comparing private and public sector applications',
        criteria: 'Accurately describe jurisdictional boundaries and key distinctions',
        bloomsLevel: BloomsLevel.UNDERSTAND,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Comparison questions and short answer',
        moduleId: 1
      },
      {
        id: 'm1-lesson-3',
        statement: 'Apply consent requirements to customer data collection scenarios',
        action: 'apply',
        condition: 'Given specific business use cases',
        criteria: 'Correctly identify when express or implied consent is required',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Scenario-based questions',
        moduleId: 1
      },
      {
        id: 'm1-lesson-4',
        statement: 'Analyze privacy breach scenarios to determine notification requirements',
        action: 'analyze',
        condition: 'Under Ontario Bill 194 and PIPEDA requirements',
        criteria: 'Identify all required notifications and timelines accurately',
        bloomsLevel: BloomsLevel.ANALYZE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Case study analysis',
        moduleId: 1
      }
    ]
  },
  {
    moduleId: 2,
    moduleTitle: 'Cybersecurity & Incident Response',
    courseLevel: [
      {
        id: 'm2-course-1',
        statement: 'Implement comprehensive incident response procedures for security events',
        action: 'implement',
        condition: 'During active security incidents affecting organizational systems',
        criteria: 'Execute all phases of incident response effectively',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Scenario-based incident response questions',
        moduleId: 2
      },
      {
        id: 'm2-course-2',
        statement: 'Evaluate security controls and risk assessment methodologies',
        action: 'evaluate',
        condition: 'When assessing organizational security posture',
        criteria: 'Accurately calculate risk and prioritize security controls',
        bloomsLevel: BloomsLevel.EVALUATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Risk calculation and control selection questions',
        moduleId: 2
      },
      {
        id: 'm2-course-3',
        statement: 'Design layered security architectures using defense-in-depth principles',
        action: 'design',
        condition: 'Based on organizational risk profiles and threats',
        criteria: 'Create comprehensive security strategies addressing multiple control types',
        bloomsLevel: BloomsLevel.CREATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Practical security plan templates',
        moduleId: 2
      }
    ],
    lessonLevel: [
      {
        id: 'm2-lesson-1',
        statement: 'Identify the phases of incident response',
        action: 'identify',
        condition: 'From the NIST framework',
        criteria: 'List all phases in correct order',
        bloomsLevel: BloomsLevel.REMEMBER,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Multiple choice questions',
        moduleId: 2
      },
      {
        id: 'm2-lesson-2',
        statement: 'Explain the principle of least privilege and its security benefits',
        action: 'explain',
        condition: 'In the context of access control',
        criteria: 'Describe the principle and provide relevant examples',
        bloomsLevel: BloomsLevel.UNDERSTAND,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Short answer questions',
        moduleId: 2
      },
      {
        id: 'm2-lesson-3',
        statement: 'Calculate risk using the likelihood and impact formula',
        action: 'calculate',
        condition: 'Given threat scenarios with likelihood and impact values',
        criteria: 'Correctly apply Risk = Likelihood × Impact',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Calculation-based questions',
        moduleId: 2
      },
      {
        id: 'm2-lesson-4',
        statement: 'Differentiate between preventive, detective, and corrective controls',
        action: 'differentiate',
        condition: 'When evaluating security control implementations',
        criteria: 'Accurately categorize controls and explain their purposes',
        bloomsLevel: BloomsLevel.ANALYZE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Classification and analysis questions',
        moduleId: 2
      }
    ]
  },
  {
    moduleId: 3,
    moduleTitle: 'AI Governance & Responsible Use',
    courseLevel: [
      {
        id: 'm3-course-1',
        statement: 'Apply Ontario\'s Responsible AI Directive principles to AI system deployments',
        action: 'apply',
        condition: 'When planning or implementing AI systems in public sector contexts',
        criteria: 'Ensure all directive principles are addressed in implementation',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'AI implementation scenario questions',
        moduleId: 3
      },
      {
        id: 'm3-course-2',
        statement: 'Evaluate AI systems for bias, fairness, and transparency requirements',
        action: 'evaluate',
        condition: 'During AI system review and approval processes',
        criteria: 'Identify potential biases and assess compliance with responsible AI principles',
        bloomsLevel: BloomsLevel.EVALUATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'AI assessment and bias detection questions',
        moduleId: 3
      },
      {
        id: 'm3-course-3',
        statement: 'Create Algorithmic Impact Assessments for AI system deployments',
        action: 'create',
        condition: 'Before deploying AI systems affecting individuals',
        criteria: 'Complete comprehensive AIA addressing all impact dimensions',
        bloomsLevel: BloomsLevel.CREATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'AIA template and practical framework',
        moduleId: 3
      }
    ],
    lessonLevel: [
      {
        id: 'm3-lesson-1',
        statement: 'Define the six principles of Ontario\'s Responsible AI Directive',
        action: 'define',
        condition: 'Without reference materials',
        criteria: 'State all six principles accurately',
        bloomsLevel: BloomsLevel.REMEMBER,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Recall and identification questions',
        moduleId: 3
      },
      {
        id: 'm3-lesson-2',
        statement: 'Explain the difference between AI transparency and explainability',
        action: 'explain',
        condition: 'In the context of responsible AI governance',
        criteria: 'Clearly distinguish between the two concepts with examples',
        bloomsLevel: BloomsLevel.UNDERSTAND,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Conceptual understanding questions',
        moduleId: 3
      },
      {
        id: 'm3-lesson-3',
        statement: 'Apply human-in-the-loop principles to AI decision-making scenarios',
        action: 'apply',
        condition: 'When AI systems make decisions affecting individuals',
        criteria: 'Correctly identify where human oversight is required',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Scenario-based application questions',
        moduleId: 3
      },
      {
        id: 'm3-lesson-4',
        statement: 'Analyze training data for potential algorithmic bias',
        action: 'analyze',
        condition: 'Given dataset characteristics and demographic information',
        criteria: 'Identify underrepresented groups and potential bias sources',
        bloomsLevel: BloomsLevel.ANALYZE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Data analysis and bias detection questions',
        moduleId: 3
      }
    ]
  },
  {
    moduleId: 4,
    moduleTitle: 'Secure Data & Records Management',
    courseLevel: [
      {
        id: 'm4-course-1',
        statement: 'Implement data classification and lifecycle management frameworks',
        action: 'implement',
        condition: 'Across organizational data holdings',
        criteria: 'Establish complete data governance with classification and retention policies',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Data governance scenario questions',
        moduleId: 4
      },
      {
        id: 'm4-course-2',
        statement: 'Evaluate cross-border data transfer compliance requirements',
        action: 'evaluate',
        condition: 'When transferring data internationally',
        criteria: 'Assess residency requirements and approve only compliant transfers',
        bloomsLevel: BloomsLevel.EVALUATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Compliance assessment questions',
        moduleId: 4
      },
      {
        id: 'm4-course-3',
        statement: 'Design comprehensive records retention and destruction schedules',
        action: 'design',
        condition: 'Based on legal requirements and organizational needs',
        criteria: 'Create complete retention framework addressing all record types',
        bloomsLevel: BloomsLevel.CREATE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Retention schedule templates',
        moduleId: 4
      }
    ],
    lessonLevel: [
      {
        id: 'm4-lesson-1',
        statement: 'List the phases of the data lifecycle',
        action: 'list',
        condition: 'From creation to destruction',
        criteria: 'Identify all phases in correct sequential order',
        bloomsLevel: BloomsLevel.REMEMBER,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Sequential ordering questions',
        moduleId: 4
      },
      {
        id: 'm4-lesson-2',
        statement: 'Explain Ontario\'s data classification framework levels',
        action: 'explain',
        condition: 'Including security control requirements for each level',
        criteria: 'Describe Low, Medium, and High classifications with examples',
        bloomsLevel: BloomsLevel.UNDERSTAND,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Classification concept questions',
        moduleId: 4
      },
      {
        id: 'm4-lesson-3',
        statement: 'Apply data residency requirements to storage decisions',
        action: 'apply',
        condition: 'Under MFIPPA Section 30.1',
        criteria: 'Correctly determine when data can or cannot be stored outside Canada',
        bloomsLevel: BloomsLevel.APPLY,
        cognitiveLevel: CognitiveLevel.LOWER_ORDER,
        assessmentMethod: 'Data storage scenario questions',
        moduleId: 4
      },
      {
        id: 'm4-lesson-4',
        statement: 'Differentiate between encryption at rest and encryption in transit',
        action: 'differentiate',
        condition: 'In data protection contexts',
        criteria: 'Explain both types and when each is required',
        bloomsLevel: BloomsLevel.ANALYZE,
        cognitiveLevel: CognitiveLevel.HIGHER_ORDER,
        assessmentMethod: 'Technical comparison questions',
        moduleId: 4
      }
    ]
  }
];

// Helper function to get all objectives for a module
export const getModuleLearningObjectives = (moduleId: number): ModuleLearningObjectives | undefined => {
  return ModuleLearningObjectivesConfig.find(m => m.moduleId === moduleId);
};

// Helper function to get objectives by Bloom's level
export const getObjectivesByBloomsLevel = (moduleId: number, level: BloomsLevel): LearningObjective[] => {
  const moduleObjectives = getModuleLearningObjectives(moduleId);
  if (!moduleObjectives) return [];
  
  const allObjectives = [...moduleObjectives.courseLevel, ...moduleObjectives.lessonLevel];
  return allObjectives.filter(obj => obj.bloomsLevel === level);
};

// Helper function to calculate cognitive progression
export const calculateCognitiveProgress = (completedObjectives: string[]): {
  lowerOrder: number;
  higherOrder: number;
  overallLevel: string;
} => {
  const allObjectives = ModuleLearningObjectivesConfig.flatMap(m => 
    [...m.courseLevel, ...m.lessonLevel]
  );
  
  const completed = allObjectives.filter(obj => completedObjectives.includes(obj.id));
  const lowerOrderCompleted = completed.filter(obj => obj.cognitiveLevel === CognitiveLevel.LOWER_ORDER).length;
  const higherOrderCompleted = completed.filter(obj => obj.cognitiveLevel === CognitiveLevel.HIGHER_ORDER).length;
  
  const totalLowerOrder = allObjectives.filter(obj => obj.cognitiveLevel === CognitiveLevel.LOWER_ORDER).length;
  const totalHigherOrder = allObjectives.filter(obj => obj.cognitiveLevel === CognitiveLevel.HIGHER_ORDER).length;
  
  const lowerOrderPercent = totalLowerOrder > 0 ? (lowerOrderCompleted / totalLowerOrder) * 100 : 0;
  const higherOrderPercent = totalHigherOrder > 0 ? (higherOrderCompleted / totalHigherOrder) * 100 : 0;
  
  let overallLevel = 'Foundation Building';
  if (lowerOrderPercent >= 80 && higherOrderPercent < 30) {
    overallLevel = 'Ready for Advanced Thinking';
  } else if (higherOrderPercent >= 50) {
    overallLevel = 'Higher-Order Thinking Mastery';
  } else if (lowerOrderPercent >= 50) {
    overallLevel = 'Core Knowledge Established';
  }
  
  return {
    lowerOrder: lowerOrderPercent,
    higherOrder: higherOrderPercent,
    overallLevel
  };
};
