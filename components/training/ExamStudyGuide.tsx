/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';

interface ExamStudyGuideProps {
    onNavigate: (section: string) => void;
}

const ExamStudyGuide: React.FC<ExamStudyGuideProps> = ({ onNavigate }) => {
    const [expandedSection, setExpandedSection] = useState<number | null>(null);
    const detection = useMobileDetection();
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const toggleSection = (index: number) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const studyGuideContent = [
        {
            module: 'Module 1: Privacy Laws & Legal Framework',
            icon: '📚',
            sections: [
                {
                    title: 'PIPEDA - Personal Information Protection and Electronic Documents Act',
                    keyPoints: [
                        'Federal privacy law for private sector commercial activities',
                        '10 Fair Information Principles: Accountability, Identifying Purposes, Consent, Limiting Collection, Limiting Use/Disclosure/Retention, Accuracy, Safeguards, Openness, Individual Access, Challenging Compliance',
                        'Organizations must obtain meaningful consent before collecting personal information',
                        'Individuals have right to access their personal information within 30 days (extendable to 60 days)',
                        'No geographic restrictions on data storage with appropriate safeguards',
                        'Enforced by Privacy Commissioner of Canada',
                    ],
                    practiceQuestions: [
                        'When must organizations identify purposes for collecting personal information?',
                        'What type of consent is required for marketing purposes?',
                        'What is the timeline for responding to access requests?',
                    ]
                },
                {
                    title: 'MFIPPA - Municipal Freedom of Information and Protection of Privacy Act',
                    keyPoints: [
                        'Applies to Ontario municipalities, local boards, and police services',
                        'Dual purpose: Access to government records + Privacy protection',
                        'Section 30.1: Personal information must be stored and accessed in Canada only',
                        'Direct collection requirement - collect from individual unless exceptions apply',
                        '30-day response timeline for FOI requests (extendable by 30 days)',
                        'Enforced by Information and Privacy Commissioner of Ontario',
                    ],
                    practiceQuestions: [
                        'Can municipalities use US-based cloud services for personal information?',
                        'What is the response timeline for freedom of information requests?',
                        'What are the exceptions to direct collection requirements?',
                    ]
                },
                {
                    title: 'Bill 194 - Data Breach Notification (2024)',
                    keyPoints: [
                        'Mandatory breach notification to IPC immediately upon discovery',
                        'Notify affected individuals when real risk of significant harm exists',
                        'Detailed breach report to IPC within 30 days',
                        'Must maintain breach registry even for breaches not requiring notification',
                        'Factors: sensitivity of information, circumstances, risk of misuse, volume affected',
                        'Response steps: Contain → Notify IPC → Assess risk → Notify individuals (if required) → Full report',
                    ],
                    practiceQuestions: [
                        'When must you notify the IPC about a data breach?',
                        'What factors determine if individual notification is required?',
                        'What must be included in the 30-day breach report?',
                    ]
                },
                {
                    title: 'FIPPA, PHIPA, and Privacy Impact Assessments',
                    keyPoints: [
                        'FIPPA: Ontario provincial institutions, ministries, agencies',
                        'PHIPA: Health information custodians, circle of care concept',
                        'PIAs required for new programs collecting personal information',
                        'PIA components: Threshold assessment, data mapping, risk assessment, mitigation, monitoring',
                        'Three safeguard types: Administrative (policies, training), Technical (encryption, access controls), Physical (secure storage, disposal)',
                    ],
                    practiceQuestions: [
                        'What is the difference between FIPPA and MFIPPA?',
                        'When is a Privacy Impact Assessment required?',
                        'Name the three types of privacy safeguards',
                    ]
                },
                {
                    title: 'Consumer Privacy Protection Act (CPPA) - Proposed Federal Modernization',
                    keyPoints: [
                        'Part of Bill C-27, will replace PIPEDA when enacted',
                        'New rights: data portability, right to deletion, withdraw consent',
                        'Mandatory breach reporting with enhanced requirements',
                        'Algorithmic transparency for automated decisions',
                        'Administrative penalties up to 5% of global revenue or $25M',
                        'Privacy by design and mandatory privacy management programs',
                    ],
                    practiceQuestions: [
                        'What new individual rights will CPPA provide?',
                        'What are the proposed penalties under CPPA?',
                        'How does CPPA differ from current PIPEDA requirements?',
                    ]
                }
            ]
        },
        {
            module: 'Module 2: Cybersecurity & Incident Response',
            icon: '🔒',
            sections: [
                {
                    title: 'Risk Assessment and Management',
                    keyPoints: [
                        'Risk = Likelihood × Impact',
                        'Risk assessment identifies threats, vulnerabilities, and potential impacts',
                        'Controls: Preventive, Detective, Corrective, Administrative, Technical, Physical',
                        'Continuous monitoring and regular reassessment required',
                        'Document risk decisions and mitigation strategies',
                    ],
                    practiceQuestions: [
                        'How is risk calculated in cybersecurity?',
                        'What is the difference between preventive and detective controls?',
                        'When should risk assessments be updated?',
                    ]
                },
                {
                    title: 'Incident Response Process',
                    keyPoints: [
                        'Phases: Preparation → Detection & Analysis → Containment → Eradication → Recovery → Lessons Learned',
                        'Detection & Analysis: Identify security incidents and assess scope',
                        'Containment priority: Stop ongoing damage, isolate affected systems',
                        'Chain of custody essential for digital evidence in legal proceedings',
                        'Post-incident review identifies improvements',
                    ],
                    practiceQuestions: [
                        'What are the phases of incident response?',
                        'What is the first priority during containment phase?',
                        'Why is chain of custody important for digital evidence?',
                    ]
                },
                {
                    title: 'Security Controls and Best Practices',
                    keyPoints: [
                        'Defense in Depth: Multiple layers of security controls',
                        'Principle of Least Privilege: Grant minimum access required',
                        'Need-to-Know: Access only to information necessary for duties',
                        'System Hardening: Remove unnecessary services, apply security configurations',
                        'Multi-Factor Authentication: Additional verification beyond passwords',
                        'Input Validation: Prevent SQL injection and code injection attacks',
                    ],
                    practiceQuestions: [
                        'What is defense in depth?',
                        'What is the principle of least privilege?',
                        'What security control prevents SQL injection attacks?',
                    ]
                },
                {
                    title: 'Encryption and Access Controls',
                    keyPoints: [
                        'Symmetric encryption: One key for encryption and decryption',
                        'Asymmetric encryption: Public/private key pair',
                        'Encryption at rest protects stored data; in transit protects transmitted data',
                        'Role-Based Access Control (RBAC): Access based on job roles',
                        'Zero Trust Architecture: Verify every access request',
                    ],
                    practiceQuestions: [
                        'What is the difference between symmetric and asymmetric encryption?',
                        'When should data encryption be used?',
                        'What is zero trust architecture?',
                    ]
                },
                {
                    title: 'Vulnerability Management and Backups',
                    keyPoints: [
                        'Zero-day vulnerability: Unknown to vendor, no patch exists',
                        'Vulnerability scanning identifies security weaknesses proactively',
                        'Prioritize by severity, exploitability, and business impact',
                        '3-2-1 backup rule: 3 copies, 2 different media types, 1 offsite',
                        'Test backup restoration regularly',
                        'Ransomware protection: Immutable backups, offline copies',
                    ],
                    practiceQuestions: [
                        'What is a zero-day vulnerability?',
                        'What is the 3-2-1 backup rule?',
                        'How should backups be stored for ransomware protection?',
                    ]
                }
            ]
        },
        {
            module: 'Module 3: AI Governance & Responsible Use',
            icon: '🤖',
            sections: [
                {
                    title: "Ontario's Responsible Use of AI Directive (December 2024)",
                    keyPoints: [
                        'Applies to all Ontario ministries and provincial agencies',
                        'Effective December 2024, phased implementation through 2026',
                        'Six principles: Benefit Ontarians, Justified/Proportionate, Transparent, Safe/Effective, Respect Privacy, Human Oversight',
                        'Mandatory risk assessments for all AI implementations',
                        'Public transparency reporting required',
                        'Human oversight maintained over AI systems',
                    ],
                    practiceQuestions: [
                        'What are the six principles of Ontario\'s AI Directive?',
                        'When did the directive become effective?',
                        'What organizations must follow the directive?',
                    ]
                },
                {
                    title: 'Federal AI Regulation - Artificial Intelligence and Data Act (AIDA)',
                    keyPoints: [
                        'Part of Bill C-27, federal AI governance framework',
                        'Applies to high-impact AI systems affecting individuals',
                        'Requirements: Risk assessment, mitigation measures, monitoring, record-keeping, transparency, incident reporting',
                        'New AI and Data Commissioner with enforcement powers',
                        'Penalties up to $10M or 3% of global revenue',
                        'Ontario organizations must comply with both AIDA and provincial directive',
                    ],
                    practiceQuestions: [
                        'What is AIDA and when does it apply?',
                        'What are the penalties for non-compliance with AIDA?',
                        'How does AIDA coordinate with Ontario requirements?',
                    ]
                },
                {
                    title: 'Algorithmic Impact Assessment (AIA)',
                    keyPoints: [
                        'Mandatory for AI systems making decisions about individuals',
                        'Components: Data assessment, algorithm review, impact analysis, fairness evaluation, transparency planning',
                        'Must be completed before AI deployment',
                        'Updated when significant changes occur to system, data, or use case',
                        'Assesses risks of bias, discrimination, privacy violations',
                    ],
                    practiceQuestions: [
                        'When is an AIA required?',
                        'What are the key components of an AIA?',
                        'When should an AIA be updated?',
                    ]
                },
                {
                    title: 'AI Bias, Fairness, and Transparency',
                    keyPoints: [
                        'Algorithmic bias: Training data underrepresents demographic groups or contains historical biases',
                        'Fairness: AI systems avoid discriminatory outcomes and treat individuals equitably',
                        'Transparency: Disclosing when AI is used',
                        'Explainability: Understanding how AI makes decisions',
                        'Protected characteristics: Race, gender, age, disability, socioeconomic status',
                        'Human-in-the-loop: Humans maintain oversight and can intervene',
                    ],
                    practiceQuestions: [
                        'What is algorithmic bias?',
                        'What is the difference between transparency and explainability?',
                        'What does human-in-the-loop mean?',
                    ]
                },
                {
                    title: 'AI Risk Management Framework',
                    keyPoints: [
                        '5-step process: State Objectives → Identify Risks → Assess Risks → Plan & Act → Report & Monitor',
                        'Risk categories: Technical (bias, accuracy), Operational (failures), Societal (discrimination, privacy)',
                        'Mitigation strategies: Technical, procedural, and policy measures',
                        'Continuous monitoring of AI performance and fairness',
                        'Accountability and responsibility for AI decisions',
                    ],
                    practiceQuestions: [
                        'What are the 5 steps in AI risk management?',
                        'What types of risks should be assessed?',
                        'What mitigation strategies can address AI risks?',
                    ]
                }
            ]
        },
        {
            module: 'Module 4: Secure Data & Records Management',
            icon: '📁',
            sections: [
                {
                    title: 'Ontario Data Classification Framework',
                    keyPoints: [
                        'Three levels: Low (Public), Medium (Internal), High (Confidential)',
                        'High classification: Unauthorized disclosure causes serious harm',
                        'Classification determines security controls and handling procedures',
                        'Review classification regularly as sensitivity may change',
                    ],
                    practiceQuestions: [
                        'What are the three data classification levels in Ontario?',
                        'What determines which classification level applies?',
                        'How does classification affect security controls?',
                    ]
                },
                {
                    title: 'Data Lifecycle Management',
                    keyPoints: [
                        'Phases: Creation → Storage → Use → Sharing → Archiving → Destruction',
                        'Data minimization: Collect only what is necessary',
                        'Records retention schedules define how long records must be kept',
                        'Secure destruction required after retention period expires',
                        'Pseudonymization: Replace identifying information with artificial identifiers',
                    ],
                    practiceQuestions: [
                        'What are the phases of the data lifecycle?',
                        'What is the principle of data minimization?',
                        'What is pseudonymization?',
                    ]
                },
                {
                    title: 'Cross-Border Data Storage and Transfer',
                    keyPoints: [
                        'MFIPPA Section 30.1: Personal information must be stored in Canada',
                        'PIPEDA: No geographic restrictions with appropriate safeguards',
                        'FIPPA: Similar Canadian storage requirements as MFIPPA',
                        'Exceptions require consent or Commissioner authorization',
                        'Contractual safeguards for international vendors',
                    ],
                    practiceQuestions: [
                        'Can Ontario municipalities store personal information in the US?',
                        'What does PIPEDA require for international data transfers?',
                        'What are the exceptions to MFIPPA\'s Canadian storage requirement?',
                    ]
                },
                {
                    title: 'Data Governance and Protection',
                    keyPoints: [
                        'Data governance: Roles, responsibilities, decision-making authority',
                        'Data Loss Prevention (DLP): Detect and prevent unauthorized transmission',
                        'Encryption at rest and in transit essential for sensitive data',
                        'Secure disposal: Certified wiping tools or physical destruction',
                        'Data inventory: Document types, locations, owners, classifications, retention',
                    ],
                    practiceQuestions: [
                        'What is the purpose of data governance?',
                        'What is Data Loss Prevention (DLP)?',
                        'How should electronic devices with sensitive data be disposed of?',
                    ]
                },
                {
                    title: 'Records Retention and Destruction',
                    keyPoints: [
                        'Records retention schedules define minimum and maximum retention periods',
                        'Legal holds may require retention beyond normal schedule',
                        'Destruction methods: Shredding (paper), secure wiping (electronic)',
                        'Document destruction activities for audit trail',
                        'Compliance with both operational needs and legal requirements',
                    ],
                    practiceQuestions: [
                        'What is a records retention schedule?',
                        'What should be done before destroying records?',
                        'What destruction methods are appropriate for electronic records?',
                    ]
                }
            ]
        }
    ];

    const downloadStudyGuide = () => {
        try {
            // Create text content for download
            let content = 'OCRP CERTIFICATION - COMPREHENSIVE EXAM STUDY GUIDE\n';
            content += '=' .repeat(60) + '\n\n';
            content += 'Ontario Certified Cyber Resilience Professional\n';
            content += 'Training Program Study Guide\n\n';
        
        studyGuideContent.forEach((module) => {
            content += '\n' + '='.repeat(60) + '\n';
            content += `${module.icon} ${module.module}\n`;
            content += '='.repeat(60) + '\n\n';
            
            module.sections.forEach((section) => {
                content += `\n${section.title}\n`;
                content += '-'.repeat(section.title.length) + '\n\n';
                
                content += 'KEY POINTS:\n';
                section.keyPoints.forEach((point, idx) => {
                    content += `${idx + 1}. ${point}\n`;
                });
                
                content += '\nPRACTICE QUESTIONS:\n';
                section.practiceQuestions.forEach((q, idx) => {
                    content += `${idx + 1}. ${q}\n`;
                });
                content += '\n';
            });
        });
        
        content += '\n' + '='.repeat(60) + '\n';
        content += 'EXAM PREPARATION TIPS\n';
        content += '='.repeat(60) + '\n\n';
        content += '1. Review all key points from each module\n';
        content += '2. Practice answering the sample questions\n';
        content += '3. Understand the differences between privacy laws (PIPEDA, MFIPPA, FIPPA, PHIPA)\n';
        content += '4. Know the timelines (30 days for FOI requests, immediate breach notification, etc.)\n';
        content += '5. Understand risk assessment formulas and incident response phases\n';
        content += '6. Review AI governance principles and requirements\n';
        content += '7. Know data classification levels and appropriate safeguards\n\n';
        content += 'EXAM FORMAT:\n';
        content += '- 60 multiple-choice questions (15 per module)\n';
        content += '- Questions and answers are randomized\n';
        content += '- 80% passing score required\n';
        content += '- Can retake with new randomized questions if needed\n\n';
        content += 'Good luck with your certification!\n';
        
        // Create download with error handling
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'OCRP_Exam_Study_Guide.txt';
        
        // Check if download attribute is supported
        if ('download' in link) {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Fallback for browsers that don't support download attribute
            window.open(url, '_blank');
        }
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Download failed:', error);
            // Graceful fallback - user can still view content on screen
        }
    };

    return (
        <section className={`animate-fade-in ${layoutClasses}`}>
            <div className="max-w-5xl mx-auto">
                <div className="bg-surface border border-border p-6 sm:p-8 mb-6">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-mono text-text-primary mb-2 uppercase">
                            📖 Comprehensive Exam Study Guide
                        </h1>
                        <p className="text-text-secondary text-lg mb-4">
                            Complete review of all four modules with key concepts, summaries, and practice questions
                        </p>
                        <button
                            onClick={downloadStudyGuide}
                            className="btn-primary px-6 py-3 text-base font-semibold"
                        >
                            📥 Download Study Guide
                        </button>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded mb-6">
                        <h3 className="font-bold text-text-primary mb-2">How to Use This Study Guide:</h3>
                        <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Review key points for each section</li>
                            <li>• Test yourself with practice questions</li>
                            <li>• Focus on areas where you feel less confident</li>
                            <li>• Download for offline study</li>
                            <li>• Exam will have 60 questions (15 per module) with 80% passing score</li>
                        </ul>
                    </div>
                </div>

                {studyGuideContent.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="bg-surface border border-border p-6 mb-6">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleSection(moduleIndex)}
                        >
                            <h2 className="text-2xl font-bold text-text-primary font-mono">
                                {module.icon} {module.module}
                            </h2>
                            <span className="text-2xl text-text-secondary">
                                {expandedSection === moduleIndex ? '−' : '+'}
                            </span>
                        </div>

                        {expandedSection === moduleIndex && (
                            <div className="mt-6 space-y-6">
                                {module.sections.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className="bg-background border border-border p-5 rounded">
                                        <h3 className="text-xl font-semibold text-text-primary mb-4">
                                            {section.title}
                                        </h3>

                                        <div className="mb-4">
                                            <h4 className="font-semibold text-primary mb-2">📌 Key Points:</h4>
                                            <ul className="space-y-2 text-text-secondary">
                                                {section.keyPoints.map((point, idx) => (
                                                    <li key={idx} className="flex">
                                                        <span className="mr-2">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-primary mb-2">❓ Practice Questions:</h4>
                                            <ul className="space-y-2 text-text-secondary">
                                                {section.practiceQuestions.map((question, idx) => (
                                                    <li key={idx} className="flex">
                                                        <span className="mr-2">{idx + 1}.</span>
                                                        <span>{question}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded mb-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4">✅ Final Exam Preparation Checklist</h3>
                    <ul className="space-y-2 text-text-secondary">
                        <li>☐ Reviewed all key concepts from each module</li>
                        <li>☐ Can explain differences between privacy laws (PIPEDA, MFIPPA, FIPPA, PHIPA)</li>
                        <li>☐ Understand timelines (30 days FOI, immediate breach notification)</li>
                        <li>☐ Know incident response phases and risk assessment formulas</li>
                        <li>☐ Familiar with Ontario AI Directive and federal AIDA requirements</li>
                        <li>☐ Understand data classification and lifecycle management</li>
                        <li>☐ Downloaded study guide for final review</li>
                        <li>☐ Ready to take the 60-question certification exam!</li>
                    </ul>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2.5 px-6 border border-border mr-4"
                    >
                        Back to Dashboard
                    </button>
                    <button
                        onClick={() => onNavigate('assessment')}
                        className="btn-primary px-8 py-3 text-base font-semibold"
                    >
                        Take Final Exam →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExamStudyGuide;
