/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningObjective, ModuleLearningDesign } from '../types';

/**
 * Module 1: Privacy Laws & Legal Framework
 * Learning Objectives aligned to Bloom's Taxonomy
 */
export const module1Objectives: ModuleLearningDesign = {
    moduleId: 'module1',
    moduleName: 'Privacy Laws & Legal Framework',
    overarchingGoal: 'Master Ontario and Canadian privacy legislation to ensure organizational compliance and protect personal information',
    cognitiveLevel: 'introductory',
    targetLevels: ['remember', 'understand', 'apply', 'analyze'],
    courseLevelObjectives: [
        {
            id: 'mod1-course-1',
            moduleId: 'module1',
            objectiveType: 'course-level',
            bloomsLevel: 'apply',
            action: 'apply appropriate privacy legislation (PIPEDA, MFIPPA, PHIPA, FIPPA)',
            condition: 'Given a real-world organizational scenario',
            criteria: 'correctly identifying jurisdiction, applicable law, and key compliance requirements',
            fullStatement: 'Given a real-world organizational scenario, apply appropriate privacy legislation (PIPEDA, MFIPPA, PHIPA, FIPPA), correctly identifying jurisdiction, applicable law, and key compliance requirements',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-course-2',
            moduleId: 'module1',
            objectiveType: 'course-level',
            bloomsLevel: 'evaluate',
            action: 'assess organizational privacy practices and recommend improvements',
            condition: 'When reviewing privacy policies, data handling procedures, and breach response plans',
            criteria: 'demonstrating alignment with Fair Information Principles and legal obligations',
            fullStatement: 'When reviewing privacy policies, data handling procedures, and breach response plans, assess organizational privacy practices and recommend improvements, demonstrating alignment with Fair Information Principles and legal obligations',
            relatedAssessmentIds: []
        }
    ],
    lessonLevelObjectives: [
        {
            id: 'mod1-lesson-1',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'remember',
            action: 'identify and list all 10 Fair Information Principles under PIPEDA',
            condition: 'Without reference materials',
            criteria: 'with 100% accuracy',
            fullStatement: 'Without reference materials, identify and list all 10 Fair Information Principles under PIPEDA with 100% accuracy',
            relatedAssessmentIds: [],
            isPrerequisiteFor: ['mod1-lesson-2', 'mod1-lesson-3']
        },
        {
            id: 'mod1-lesson-2',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'explain the purpose and application of each Fair Information Principle',
            condition: 'Given practical examples from private sector organizations',
            criteria: 'accurately describing how each principle guides data handling practices',
            fullStatement: 'Given practical examples from private sector organizations, explain the purpose and application of each Fair Information Principle, accurately describing how each principle guides data handling practices',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-lesson-3',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'distinguish between PIPEDA and MFIPPA jurisdictional requirements',
            condition: 'When presented with various organizational contexts (private sector, municipal, provincial)',
            criteria: 'correctly determining which legislation applies and identifying key differences in obligations',
            fullStatement: 'When presented with various organizational contexts (private sector, municipal, provincial), distinguish between PIPEDA and MFIPPA jurisdictional requirements, correctly determining which legislation applies and identifying key differences in obligations',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-lesson-4',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'determine appropriate consent mechanisms for personal information collection',
            condition: 'Given specific data collection scenarios across different contexts',
            criteria: 'selecting between express consent, implied consent, or exception to consent based on PIPEDA principles',
            fullStatement: 'Given specific data collection scenarios across different contexts, determine appropriate consent mechanisms for personal information collection, selecting between express consent, implied consent, or exception to consent based on PIPEDA principles',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-lesson-5',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'describe the mandatory breach notification requirements under Bill 194',
            condition: 'In the context of Ontario public sector institutions',
            criteria: 'accurately outlining notification timelines, recipients, and reporting content',
            fullStatement: 'In the context of Ontario public sector institutions, describe the mandatory breach notification requirements under Bill 194, accurately outlining notification timelines, recipients, and reporting content',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-lesson-6',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'evaluate',
            action: 'assess whether a privacy breach meets the "real risk of significant harm" threshold',
            condition: 'Given breach scenarios with varying sensitivity, scope, and circumstances',
            criteria: 'justifying notification decisions based on IPC guidance and legal requirements',
            fullStatement: 'Given breach scenarios with varying sensitivity, scope, and circumstances, assess whether a privacy breach meets the "real risk of significant harm" threshold, justifying notification decisions based on IPC guidance and legal requirements',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-lesson-7',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'implement the MFIPPA cross-border data storage restrictions',
            condition: 'When evaluating cloud service providers and data hosting options for public sector organizations',
            criteria: 'ensuring compliance with Section 30.1 Canadian data residency requirements',
            fullStatement: 'When evaluating cloud service providers and data hosting options for public sector organizations, implement the MFIPPA cross-border data storage restrictions, ensuring compliance with Section 30.1 Canadian data residency requirements',
            relatedAssessmentIds: []
        },
        {
            id: 'mod1-lesson-8',
            moduleId: 'module1',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'compare PHIPA requirements for health information custodians with general PIPEDA obligations',
            condition: 'In healthcare contexts involving personal health information',
            criteria: 'identifying unique requirements for consent, circle of care, and disclosure limitations',
            fullStatement: 'In healthcare contexts involving personal health information, compare PHIPA requirements for health information custodians with general PIPEDA obligations, identifying unique requirements for consent, circle of care, and disclosure limitations',
            relatedAssessmentIds: []
        }
    ],
    instructionalStrategies: [
        {
            level: 'remember',
            strategies: [
                'Comprehensive text content with definitions of key privacy legislation terms',
                'Structured lists of Fair Information Principles and legal requirements',
                'Short quiz questions to verify recall of fundamental concepts'
            ]
        },
        {
            level: 'understand',
            strategies: [
                'Comparison tables (PIPEDA vs MFIPPA vs PHIPA vs FIPPA)',
                'Infographics showing relationships between privacy laws',
                'Explanation of breach notification process with visual timelines'
            ]
        },
        {
            level: 'apply',
            strategies: [
                'Scenario-based questions requiring application of privacy principles',
                'Case studies of privacy impact assessments',
                'Practice exercises on consent determination and jurisdiction'
            ]
        },
        {
            level: 'analyze',
            strategies: [
                'Interactive scenarios analyzing jurisdictional questions',
                'Process flows showing privacy breach response procedures',
                'Concept maps connecting different privacy legislation frameworks'
            ]
        }
    ],
    assessmentAlignment: []
};

/**
 * Module 2: Cybersecurity & Incident Response
 * Learning Objectives aligned to Bloom's Taxonomy
 */
export const module2Objectives: ModuleLearningDesign = {
    moduleId: 'module2',
    moduleName: 'Cybersecurity & Incident Response',
    overarchingGoal: 'Develop comprehensive cybersecurity capabilities to protect organizational assets and respond effectively to security incidents',
    cognitiveLevel: 'application',
    targetLevels: ['understand', 'apply', 'analyze', 'evaluate'],
    courseLevelObjectives: [
        {
            id: 'mod2-course-1',
            moduleId: 'module2',
            objectiveType: 'course-level',
            bloomsLevel: 'evaluate',
            action: 'conduct comprehensive risk assessments and justify security control selections',
            condition: 'Given an organizational environment with identified assets, threats, and vulnerabilities',
            criteria: 'using established frameworks (NIST, OCTAVE) and demonstrating risk-based decision making',
            fullStatement: 'Given an organizational environment with identified assets, threats, and vulnerabilities, conduct comprehensive risk assessments and justify security control selections, using established frameworks (NIST, OCTAVE) and demonstrating risk-based decision making',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-course-2',
            moduleId: 'module2',
            objectiveType: 'course-level',
            bloomsLevel: 'create',
            action: 'design and implement a structured incident response plan',
            condition: 'For a specific organizational context',
            criteria: 'incorporating all NIST incident response lifecycle phases with appropriate procedures, roles, and communication protocols',
            fullStatement: 'For a specific organizational context, design and implement a structured incident response plan, incorporating all NIST incident response lifecycle phases with appropriate procedures, roles, and communication protocols',
            relatedAssessmentIds: []
        }
    ],
    lessonLevelObjectives: [
        {
            id: 'mod2-lesson-1',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'explain the risk calculation formula (Risk = Likelihood × Impact)',
            condition: 'In the context of cybersecurity risk management',
            criteria: 'accurately describing how likelihood and impact factors determine overall risk level',
            fullStatement: 'In the context of cybersecurity risk management, explain the risk calculation formula (Risk = Likelihood × Impact), accurately describing how likelihood and impact factors determine overall risk level',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-2',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'implement the principle of least privilege in access control systems',
            condition: 'Given various organizational roles and data classification levels',
            criteria: 'granting minimum necessary access rights while maintaining operational effectiveness',
            fullStatement: 'Given various organizational roles and data classification levels, implement the principle of least privilege in access control systems, granting minimum necessary access rights while maintaining operational effectiveness',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-3',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'execute system hardening procedures to reduce attack surface',
            condition: 'On servers, workstations, and network devices',
            criteria: 'removing unnecessary services, applying security configurations, and documenting changes',
            fullStatement: 'On servers, workstations, and network devices, execute system hardening procedures to reduce attack surface, removing unnecessary services, applying security configurations, and documenting changes',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-4',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'identify and categorize security incidents during the detection and analysis phase',
            condition: 'When reviewing security alerts, logs, and anomalous system behavior',
            criteria: 'determining incident type, severity, and scope to inform response actions',
            fullStatement: 'When reviewing security alerts, logs, and anomalous system behavior, identify and categorize security incidents during the detection and analysis phase, determining incident type, severity, and scope to inform response actions',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-5',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'contain active security threats to prevent further damage',
            condition: 'During a ransomware incident or network intrusion',
            criteria: 'isolating affected systems, disabling compromised accounts, and securing network boundaries',
            fullStatement: 'During a ransomware incident or network intrusion, contain active security threats to prevent further damage, isolating affected systems, disabling compromised accounts, and securing network boundaries',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-6',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'evaluate',
            action: 'determine appropriate security controls based on risk assessment results',
            condition: 'Given identified vulnerabilities and organizational risk tolerance',
            criteria: 'selecting preventive, detective, or corrective controls with cost-benefit justification',
            fullStatement: 'Given identified vulnerabilities and organizational risk tolerance, determine appropriate security controls based on risk assessment results, selecting preventive, detective, or corrective controls with cost-benefit justification',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-7',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'distinguish between symmetric and asymmetric encryption',
            condition: 'In the context of data protection throughout its lifecycle',
            criteria: 'explaining key differences in key management, performance, and appropriate use cases',
            fullStatement: 'In the context of data protection throughout its lifecycle, distinguish between symmetric and asymmetric encryption, explaining key differences in key management, performance, and appropriate use cases',
            relatedAssessmentIds: []
        },
        {
            id: 'mod2-lesson-8',
            moduleId: 'module2',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'investigate security incidents to determine root cause and impact',
            condition: 'Using log analysis, forensic techniques, and incident evidence',
            criteria: 'documenting the attack chain, affected assets, and timeline of events',
            fullStatement: 'Using log analysis, forensic techniques, and incident evidence, investigate security incidents to determine root cause and impact, documenting the attack chain, affected assets, and timeline of events',
            relatedAssessmentIds: []
        }
    ],
    instructionalStrategies: [
        {
            level: 'understand',
            strategies: [
                'Visual frameworks showing risk assessment methodologies',
                'Comparison tables of security controls (preventive vs detective vs corrective)',
                'Diagrams of incident response lifecycle phases'
            ]
        },
        {
            level: 'apply',
            strategies: [
                'Scenario-based incident response exercises',
                'Step-by-step system hardening procedures',
                'Practice exercises on access control implementation'
            ]
        },
        {
            level: 'analyze',
            strategies: [
                'Case studies of real-world security breaches',
                'Process flows for threat analysis and containment',
                'Interactive scenarios requiring incident categorization'
            ]
        },
        {
            level: 'evaluate',
            strategies: [
                'Risk assessment decision-making scenarios',
                'Security control selection exercises with justification requirements',
                'Evaluation rubrics for incident response effectiveness'
            ]
        }
    ],
    assessmentAlignment: []
};

/**
 * Module 3: AI Governance & Responsible Use
 * Learning Objectives aligned to Bloom's Taxonomy
 */
export const module3Objectives: ModuleLearningDesign = {
    moduleId: 'module3',
    moduleName: 'AI Governance & Responsible Use',
    overarchingGoal: 'Establish responsible AI governance frameworks aligned with Ontario\'s directive and ethical principles',
    cognitiveLevel: 'synthesis',
    targetLevels: ['understand', 'apply', 'analyze', 'evaluate', 'create'],
    courseLevelObjectives: [
        {
            id: 'mod3-course-1',
            moduleId: 'module3',
            objectiveType: 'course-level',
            bloomsLevel: 'evaluate',
            action: 'assess AI systems for compliance with Ontario\'s Responsible Use of AI Directive',
            condition: 'Given proposed or existing AI implementations in public sector contexts',
            criteria: 'evaluating against all six principles and recommending governance improvements',
            fullStatement: 'Given proposed or existing AI implementations in public sector contexts, assess AI systems for compliance with Ontario\'s Responsible Use of AI Directive, evaluating against all six principles and recommending governance improvements',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-course-2',
            moduleId: 'module3',
            objectiveType: 'course-level',
            bloomsLevel: 'create',
            action: 'develop comprehensive Algorithmic Impact Assessments (AIA)',
            condition: 'For AI systems that will make decisions affecting individuals',
            criteria: 'incorporating risk analysis, bias testing, transparency measures, and accountability mechanisms',
            fullStatement: 'For AI systems that will make decisions affecting individuals, develop comprehensive Algorithmic Impact Assessments (AIA), incorporating risk analysis, bias testing, transparency measures, and accountability mechanisms',
            relatedAssessmentIds: []
        }
    ],
    lessonLevelObjectives: [
        {
            id: 'mod3-lesson-1',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'remember',
            action: 'list the six principles of Ontario\'s Responsible Use of AI Directive',
            condition: 'Without reference materials',
            criteria: 'with 100% accuracy',
            fullStatement: 'Without reference materials, list the six principles of Ontario\'s Responsible Use of AI Directive with 100% accuracy',
            relatedAssessmentIds: [],
            isPrerequisiteFor: ['mod3-lesson-2']
        },
        {
            id: 'mod3-lesson-2',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'explain each of the six AI directive principles with practical examples',
            condition: 'In the context of public sector AI applications',
            criteria: 'demonstrating how each principle guides responsible AI implementation',
            fullStatement: 'In the context of public sector AI applications, explain each of the six AI directive principles with practical examples, demonstrating how each principle guides responsible AI implementation',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-lesson-3',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'distinguish between AI transparency and AI explainability',
            condition: 'When evaluating AI system documentation and decision-making processes',
            criteria: 'identifying specific requirements for disclosure versus interpretability',
            fullStatement: 'When evaluating AI system documentation and decision-making processes, distinguish between AI transparency and AI explainability, identifying specific requirements for disclosure versus interpretability',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-lesson-4',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'implement human-in-the-loop oversight mechanisms',
            condition: 'For AI systems making decisions with significant impacts on individuals',
            criteria: 'ensuring meaningful human review and intervention capabilities',
            fullStatement: 'For AI systems making decisions with significant impacts on individuals, implement human-in-the-loop oversight mechanisms, ensuring meaningful human review and intervention capabilities',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-lesson-5',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'identify sources of algorithmic bias in AI training data and models',
            condition: 'When reviewing AI system development processes',
            criteria: 'examining data representativeness, labeling practices, and model outputs for discriminatory patterns',
            fullStatement: 'When reviewing AI system development processes, identify sources of algorithmic bias in AI training data and models, examining data representativeness, labeling practices, and model outputs for discriminatory patterns',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-lesson-6',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'evaluate',
            action: 'assess vendor AI systems for compliance with governance requirements',
            condition: 'During procurement processes',
            criteria: 'evaluating documentation on data sources, training methods, limitations, and accountability measures',
            fullStatement: 'During procurement processes, assess vendor AI systems for compliance with governance requirements, evaluating documentation on data sources, training methods, limitations, and accountability measures',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-lesson-7',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'conduct an Algorithmic Impact Assessment (AIA)',
            condition: 'Before deploying an AI system in a public sector context',
            criteria: 'documenting impacts, risks, mitigation strategies, and governance measures',
            fullStatement: 'Before deploying an AI system in a public sector context, conduct an Algorithmic Impact Assessment (AIA), documenting impacts, risks, mitigation strategies, and governance measures',
            relatedAssessmentIds: []
        },
        {
            id: 'mod3-lesson-8',
            moduleId: 'module3',
            objectiveType: 'lesson-level',
            bloomsLevel: 'create',
            action: 'develop an AI governance framework with accountability structures',
            condition: 'For an organization implementing multiple AI systems',
            criteria: 'establishing roles, responsibilities, review processes, and recourse mechanisms',
            fullStatement: 'For an organization implementing multiple AI systems, develop an AI governance framework with accountability structures, establishing roles, responsibilities, review processes, and recourse mechanisms',
            relatedAssessmentIds: []
        }
    ],
    instructionalStrategies: [
        {
            level: 'understand',
            strategies: [
                'Detailed explanations of each AI directive principle',
                'Comparison tables showing transparency vs explainability',
                'Visual frameworks for AI governance structures'
            ]
        },
        {
            level: 'apply',
            strategies: [
                'Step-by-step AIA templates and guides',
                'Practice exercises on bias identification',
                'Scenario-based questions on human oversight implementation'
            ]
        },
        {
            level: 'analyze',
            strategies: [
                'Case studies of AI bias incidents',
                'Interactive scenarios analyzing AI risks',
                'Concept maps connecting AI principles to privacy and security'
            ]
        },
        {
            level: 'evaluate',
            strategies: [
                'Vendor evaluation checklists',
                'Risk assessment decision frameworks',
                'Evaluation rubrics for AI system compliance'
            ]
        },
        {
            level: 'create',
            strategies: [
                'Project-based AIA development exercises',
                'Collaborative governance framework design',
                'Policy template development activities'
            ]
        }
    ],
    assessmentAlignment: []
};

/**
 * Module 4: Data Management & Compliance
 * Learning Objectives aligned to Bloom's Taxonomy
 */
export const module4Objectives: ModuleLearningDesign = {
    moduleId: 'module4',
    moduleName: 'Data Management & Compliance',
    overarchingGoal: 'Implement comprehensive data governance frameworks ensuring security, compliance, and lifecycle management',
    cognitiveLevel: 'application',
    targetLevels: ['understand', 'apply', 'analyze', 'evaluate'],
    courseLevelObjectives: [
        {
            id: 'mod4-course-1',
            moduleId: 'module4',
            objectiveType: 'course-level',
            bloomsLevel: 'create',
            action: 'design and implement a comprehensive data governance program',
            condition: 'For a public or private sector organization',
            criteria: 'incorporating data classification, lifecycle management, security controls, and compliance requirements',
            fullStatement: 'For a public or private sector organization, design and implement a comprehensive data governance program, incorporating data classification, lifecycle management, security controls, and compliance requirements',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-course-2',
            moduleId: 'module4',
            objectiveType: 'course-level',
            bloomsLevel: 'evaluate',
            action: 'assess cross-border data transfer practices for legal compliance',
            condition: 'Given organizational data flows and processing locations',
            criteria: 'determining adherence to PIPEDA, MFIPPA, and data residency requirements',
            fullStatement: 'Given organizational data flows and processing locations, assess cross-border data transfer practices for legal compliance, determining adherence to PIPEDA, MFIPPA, and data residency requirements',
            relatedAssessmentIds: []
        }
    ],
    lessonLevelObjectives: [
        {
            id: 'mod4-lesson-1',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'describe Ontario\'s Data Classification Framework levels',
            condition: 'Including Low (Public), Medium (Internal), and High (Confidential)',
            criteria: 'explaining the security requirements and handling procedures for each level',
            fullStatement: 'Including Low (Public), Medium (Internal), and High (Confidential), describe Ontario\'s Data Classification Framework levels, explaining the security requirements and handling procedures for each level',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-2',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'classify data assets according to sensitivity and business impact',
            condition: 'Given various types of organizational information',
            criteria: 'assigning appropriate classification levels and security controls',
            fullStatement: 'Given various types of organizational information, classify data assets according to sensitivity and business impact, assigning appropriate classification levels and security controls',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-3',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'understand',
            action: 'explain the six phases of the data lifecycle',
            condition: 'From creation through destruction',
            criteria: 'identifying security and compliance requirements at each phase',
            fullStatement: 'From creation through destruction, explain the six phases of the data lifecycle, identifying security and compliance requirements at each phase',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-4',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'implement appropriate retention schedules for different record types',
            condition: 'Based on legal requirements and business needs',
            criteria: 'documenting retention periods, destruction methods, and compliance justification',
            fullStatement: 'Based on legal requirements and business needs, implement appropriate retention schedules for different record types, documenting retention periods, destruction methods, and compliance justification',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-5',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'evaluate',
            action: 'determine compliance with MFIPPA Section 30.1 data residency requirements',
            condition: 'When evaluating cloud service providers for public sector organizations',
            criteria: 'ensuring Canadian data storage and access, or identifying valid exemptions',
            fullStatement: 'When evaluating cloud service providers for public sector organizations, determine compliance with MFIPPA Section 30.1 data residency requirements, ensuring Canadian data storage and access, or identifying valid exemptions',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-6',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'apply',
            action: 'implement data minimization principles in collection and retention practices',
            condition: 'Across all organizational data processing activities',
            criteria: 'limiting data to minimum necessary for identified purposes',
            fullStatement: 'Across all organizational data processing activities, implement data minimization principles in collection and retention practices, limiting data to minimum necessary for identified purposes',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-7',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'analyze',
            action: 'distinguish between encryption at rest and encryption in transit',
            condition: 'When designing data protection strategies',
            criteria: 'identifying appropriate use cases and implementation requirements for each',
            fullStatement: 'When designing data protection strategies, distinguish between encryption at rest and encryption in transit, identifying appropriate use cases and implementation requirements for each',
            relatedAssessmentIds: []
        },
        {
            id: 'mod4-lesson-8',
            moduleId: 'module4',
            objectiveType: 'lesson-level',
            bloomsLevel: 'create',
            action: 'develop a data governance framework with roles and responsibilities',
            condition: 'For an organization managing diverse data types',
            criteria: 'establishing data ownership, stewardship, quality standards, and decision-making authority',
            fullStatement: 'For an organization managing diverse data types, develop a data governance framework with roles and responsibilities, establishing data ownership, stewardship, quality standards, and decision-making authority',
            relatedAssessmentIds: []
        }
    ],
    instructionalStrategies: [
        {
            level: 'understand',
            strategies: [
                'Visual frameworks showing data classification levels',
                'Data lifecycle phase diagrams',
                'Comparison tables of encryption methods'
            ]
        },
        {
            level: 'apply',
            strategies: [
                'Data classification exercises with sample data',
                'Retention schedule development templates',
                'Step-by-step data minimization procedures'
            ]
        },
        {
            level: 'analyze',
            strategies: [
                'Case studies of data residency compliance',
                'Interactive scenarios on data flow analysis',
                'Concept maps connecting data governance elements'
            ]
        },
        {
            level: 'evaluate',
            strategies: [
                'Cloud provider evaluation checklists',
                'Cross-border transfer assessment frameworks',
                'Compliance gap analysis exercises'
            ]
        },
        {
            level: 'create',
            strategies: [
                'Data governance framework development projects',
                'Policy and procedure creation exercises',
                'Data inventory and mapping activities'
            ]
        }
    ],
    assessmentAlignment: []
};

/**
 * Export all module learning objectives
 */
export const allModuleLearningObjectives = {
    module1: module1Objectives,
    module2: module2Objectives,
    module3: module3Objectives,
    module4: module4Objectives
};
