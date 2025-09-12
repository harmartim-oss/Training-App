/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';
import QuizComponent from '../common/QuizComponent';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module4: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const allQuestions: QuizQuestions = {
        q1: { 
            question: "Under MFIPPA, where must Ontario municipalities generally store personal information?", 
            answer: 'b', 
            options: { 
                a: "Anywhere in North America", 
                b: "Within Canada, unless adequate safeguards are in place", 
                c: "Within Ontario only" 
            },
            explanation: "MFIPPA requires personal information collected by Ontario municipalities to be stored and accessed only in Canada, with limited exceptions where adequate safeguards exist."
        },
        q2: { 
            question: "What is the typical retention period for employee files after termination in Ontario?", 
            answer: 'c', 
            options: { 
                a: "3 years", 
                b: "5 years", 
                c: "7 years" 
            },
            explanation: "Ontario employment standards generally require employee records to be retained for 7 years after termination."
        },
        q3: { 
            question: "What is the primary purpose of data classification in records management?", 
            answer: 'b', 
            options: { 
                a: "To organize files alphabetically", 
                b: "To apply appropriate security controls and retention schedules", 
                c: "To reduce storage costs" 
            },
            explanation: "Data classification ensures that appropriate security controls, access restrictions, and retention schedules are applied based on the sensitivity and value of the information."
        },
        q4: { 
            question: "Under Ontario's records management requirements, what must be considered when implementing cloud storage?", 
            answer: 'a', 
            options: { 
                a: "Data residency, security controls, and vendor compliance", 
                b: "Only the cost of the service", 
                c: "Only the technical features offered" 
            },
            explanation: "Cloud storage implementations must consider data residency requirements, appropriate security controls, and vendor compliance with applicable privacy and security standards."
        },
        q5: {
            question: "What is the maximum retention period for most municipal records under Ontario's guidelines?",
            answer: 'c',
            options: {
                a: "10 years",
                b: "25 years", 
                c: "Permanent retention for records of historical significance",
                d: "50 years maximum"
            },
            explanation: "Some municipal records, particularly those of historical significance, may require permanent retention under Ontario's records management guidelines."
        },
        q6: {
            question: "Which data classification level typically requires the highest security controls?",
            answer: 'a',
            options: {
                a: "Confidential/Sensitive",
                b: "Internal Use",
                c: "Public",
                d: "Restricted"
            },
            explanation: "Confidential or sensitive data classification requires the highest level of security controls including encryption, access controls, and audit logging."
        },
        q7: {
            question: "What is the primary consideration when disposing of confidential records?",
            answer: 'b',
            options: {
                a: "Cost efficiency",
                b: "Secure destruction to prevent unauthorized recovery",
                c: "Speed of disposal process",
                d: "Environmental impact only"
            },
            explanation: "Confidential records must be securely destroyed using methods that prevent unauthorized recovery of the information."
        },
        q8: {
            question: "Under data governance frameworks, who is typically responsible for classifying data?",
            answer: 'c',
            options: {
                a: "IT department only",
                b: "External consultants",
                c: "Data owners in collaboration with IT and compliance teams",
                d: "Only senior management"
            },
            explanation: "Data owners, who understand the business context and sensitivity, should classify data in collaboration with IT and compliance teams."
        }
    };

    const quiz = useQuiz(allQuestions, 5);

    const contentSections = [
        {
            title: "Data Classification Framework",
            content: [
                "Effective data management begins with a comprehensive classification system that categorizes information based on sensitivity, value, and regulatory requirements.",
                "",
                "**Classification Levels:**",
                "• **Public**: Information that can be freely shared without restriction",
                "• **Internal**: Information for internal use that could cause minor harm if disclosed",
                "• **Confidential**: Sensitive information that could cause significant harm if disclosed",
                "• **Restricted**: Highly sensitive information requiring the strictest controls",
                "",
                "**Classification Criteria:**",
                "• **Regulatory Requirements**: PIPEDA, MFIPPA, sector-specific regulations",
                "• **Business Value**: Strategic importance and competitive advantage",
                "• **Privacy Sensitivity**: Personal information and individual privacy rights",
                "• **Security Impact**: Potential harm from unauthorized disclosure or loss",
                "",
                "**Implementation Process:**",
                "• **Data Discovery**: Comprehensive inventory of all data assets",
                "• **Classification Assignment**: Apply classification labels based on criteria",
                "• **Control Implementation**: Deploy appropriate security and access controls",
                "• **Training and Awareness**: Educate staff on classification requirements",
                "• **Regular Review**: Periodic reassessment and updates to classifications",
                "",
                "**Automated Classification Tools:**",
                "• Content scanning and pattern recognition systems",
                "• Machine learning-based classification algorithms",
                "• Integration with document management systems",
                "• Real-time classification during data creation and modification"
            ]
        },
        {
            title: "Records Retention and Lifecycle Management",
            content: [
                "Proper records management ensures compliance with legal requirements while optimizing storage costs and reducing organizational risk.",
                "",
                "**Legal and Regulatory Framework:**",
                "• **Ontario Records Retention Guidelines**: Municipal records retention requirements",
                "• **Employment Standards Act**: 7-year retention for employee records",
                "• **Corporate Records**: Various retention periods based on record type",
                "• **Financial Records**: CRA requirements and audit considerations",
                "",
                "**Records Lifecycle Stages:**",
                "• **Creation/Receipt**: Initial record creation or receipt from external sources",
                "• **Active Use**: Frequent access and modification during business processes",
                "• **Semi-Active**: Occasional access for reference or legal requirements",
                "• **Inactive**: Retained for compliance but rarely accessed",
                "• **Disposition**: Secure destruction or permanent archival",
                "",
                "**Retention Schedule Development:**",
                "• **Legal Research**: Identify all applicable retention requirements",
                "• **Business Analysis**: Assess operational value and access patterns",
                "• **Risk Assessment**: Evaluate risks of early destruction vs. over-retention",
                "• **Cost Analysis**: Balance storage costs with legal and business needs",
                "• **Stakeholder Consultation**: Input from legal, IT, and business units",
                "",
                "**Implementation Best Practices:**",
                "• Automated retention enforcement through technology systems",
                "• Regular auditing and compliance monitoring",
                "• Clear documentation of disposition decisions and actions",
                "• Staff training on retention requirements and procedures",
                "• Legal hold procedures for litigation and investigations"
            ]
        },
        {
            title: "Cross-Border Data Management and Compliance",
            content: [
                "Organizations must navigate complex requirements when data crosses provincial or national boundaries.",
                "",
                "**MFIPPA Cross-Border Provisions:**",
                "• **Default Rule**: Personal information must be stored and accessed within Canada",
                "• **Limited Exceptions**: Specific circumstances allowing cross-border transfers",
                "• **Due Diligence Requirements**: Vendor assessment and contractual safeguards",
                "• **Ongoing Monitoring**: Regular compliance verification and auditing",
                "",
                "**Cloud Computing Considerations:**",
                "• **Data Residency**: Contractual guarantees for Canadian data storage",
                "• **Access Controls**: Restrictions on foreign government access to data",
                "• **Encryption Requirements**: Protection of data in transit and at rest",
                "• **Vendor Transparency**: Clear documentation of data handling practices",
                "",
                "**International Transfer Safeguards:**",
                "• **Adequacy Decisions**: Countries with equivalent privacy protection",
                "• **Standard Contractual Clauses**: EU-style data protection agreements",
                "• **Binding Corporate Rules**: Multinational organization data sharing frameworks",
                "• **Certification Schemes**: Industry-standard privacy and security certifications",
                "",
                "**Compliance Monitoring:**",
                "• **Regular Audits**: Assessment of vendor compliance and data handling",
                "• **Incident Reporting**: Procedures for cross-border data breaches",
                "• **Documentation Requirements**: Comprehensive records of transfer decisions",
                "• **Risk Assessments**: Ongoing evaluation of cross-border transfer risks"
            ]
        },
        {
            title: "Data Security and Access Controls",
            content: [
                "Robust security measures protect sensitive information throughout its lifecycle and ensure appropriate access based on business needs and regulatory requirements.",
                "",
                "**Access Control Framework:**",
                "• **Role-Based Access Control (RBAC)**: Permissions based on job functions",
                "• **Attribute-Based Access Control (ABAC)**: Dynamic permissions based on context",
                "• **Principle of Least Privilege**: Minimum necessary access for job functions",
                "• **Need-to-Know Basis**: Access limited to specific business requirements",
                "",
                "**Technical Security Controls:**",
                "• **Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit",
                "• **Key Management**: Secure generation, storage, and rotation of encryption keys",
                "• **Multi-Factor Authentication**: Strong authentication for sensitive data access",
                "• **Database Security**: Database encryption, access logging, and monitoring",
                "",
                "**Physical Security Measures:**",
                "• **Secure Facilities**: Controlled access to data centers and server rooms",
                "• **Environmental Controls**: Temperature, humidity, and fire suppression systems",
                "• **Equipment Security**: Secure disposal and decommissioning procedures",
                "• **Visitor Management**: Escort requirements and access logging",
                "",
                "**Monitoring and Auditing:**",
                "• **Access Logging**: Comprehensive logs of all data access and modifications",
                "• **Real-Time Monitoring**: Automated detection of suspicious activities",
                "• **Regular Audits**: Periodic review of access permissions and usage patterns",
                "• **Compliance Reporting**: Regular reports on security control effectiveness"
            ]
        },
        {
            title: "Data Governance and Quality Management",
            content: [
                "Effective data governance ensures data quality, consistency, and appropriate use across the organization.",
                "",
                "**Governance Structure:**",
                "• **Data Governance Committee**: Senior leadership oversight and policy direction",
                "• **Data Stewards**: Business unit representatives responsible for data quality",
                "• **Data Custodians**: Technical teams responsible for data management systems",
                "• **Data Users**: End users with specific roles and responsibilities",
                "",
                "**Data Quality Framework:**",
                "• **Accuracy**: Data correctly represents the real-world entities and events",
                "• **Completeness**: All required data elements are present and populated",
                "• **Consistency**: Data values are uniform across systems and processes",
                "• **Timeliness**: Data is current and available when needed",
                "• **Validity**: Data conforms to defined formats and business rules",
                "",
                "**Data Standards and Policies:**",
                "• **Data Definitions**: Clear, consistent definitions for all data elements",
                "• **Naming Conventions**: Standardized naming for data fields and entities",
                "• **Format Standards**: Consistent formats for dates, addresses, and identifiers",
                "• **Quality Metrics**: Measurable standards for data quality assessment",
                "",
                "**Continuous Improvement:**",
                "• **Data Quality Monitoring**: Ongoing assessment of data quality metrics",
                "• **Issue Resolution**: Processes for identifying and correcting data problems",
                "• **Training Programs**: Regular education on data governance requirements",
                "• **Technology Solutions**: Automated tools for data quality management"
            ]
        }
    ];

    return (
        <section className={`animate-fade-in ${layoutClasses}`}>
            <div className={`max-w-6xl mx-auto ${mobileClasses}`}>
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb mb-6">
                    <button onClick={() => onNavigate('dashboard')} className="hover:text-primary transition-colors">
                        Dashboard
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="text-primary font-semibold">Module 4: Data Management</span>
                </div>

                {/* Progress Indicator */}
                <div className="progress-indicator mb-8">
                    <div className={`progress-step ${currentSection === 'content' ? 'current' : 'completed'}`}>
                        1
                    </div>
                    <div className={`progress-connector ${currentSection === 'quiz' ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'quiz' ? 'current' : 'pending'}`}>
                        2
                    </div>
                    <div className="ml-4 text-sm text-text-secondary">
                        {currentSection === 'content' ? 'Learning Content' : 'Knowledge Check'}
                    </div>
                </div>

                <div className="module-container">
                    <div className="module-header">
                        <h1 className="text-3xl font-bold font-mono mb-2 uppercase">Module 4: Data Management</h1>
                        <p className="mb-6">Ensuring data is classified, retained, and handled securely</p>
                        
                        <div className="learning-objectives">
                            <h3 className="font-semibold mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                            <ul>
                                <li>Implement comprehensive data classification and handling procedures</li>
                                <li>Establish effective records management and retention policies</li>
                                <li>Ensure compliance with cross-border data storage requirements</li>
                                <li>Deploy robust data security and access control systems</li>
                                <li>Create data governance frameworks for quality management</li>
                                <li>Navigate complex regulatory requirements for data management</li>
                                <li>Optimize data lifecycle management and disposition processes</li>
                            </ul>
                        </div>

                        {currentSection === 'content' ? (
                            /* Content Section */
                            <div className="space-y-6">
                                {contentSections.map((section, index) => (
                                    <div key={index} className="content-section">
                                        <h3 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                                            {section.title}
                                        </h3>
                                        <div className="space-y-3 text-text-secondary leading-relaxed">
                                            {section.content.map((paragraph, pIndex) => (
                                                <p key={pIndex}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="bg-surface-elevated border border-border-light p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4 text-text-primary font-mono">Resources & Downloads</h4>
                                    <p className="mb-4 text-text-secondary">Access practical tools and templates for implementing secure data management practices.</p>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Data Classification Templates</h5>
                                                <p className="text-sm text-text-secondary mb-3">Comprehensive frameworks for classifying and protecting data</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Records Retention Schedules</h5>
                                                <p className="text-sm text-text-secondary mb-3">Ontario-specific retention requirements and guidelines</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Cross-Border Compliance Checklist</h5>
                                                <p className="text-sm text-text-secondary mb-3">Guidelines for managing data across jurisdictions</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Data Governance Framework</h5>
                                                <p className="text-sm text-text-secondary mb-3">Organizational structures and quality management processes</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-4 text-sm text-text-secondary">
                                        <strong>Note:</strong> These resources are designed for compliance with Ontario regulations and should be 
                                        reviewed with legal counsel for organization-specific requirements.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-primary font-semibold py-3 px-8"
                                    >
                                        Proceed to Knowledge Check
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Quiz Section */
                            <div className="quiz-container">
                                <h3 className="text-2xl font-semibold mb-4 text-text-primary font-mono">Knowledge Check</h3>
                                <p className="mb-6 text-text-secondary">Test your understanding of data management principles and compliance requirements.</p>
                                
                                <QuizComponent
                                    questions={quiz.selectedQuestions}
                                    answers={quiz.answers}
                                    result={quiz.result}
                                    onAnswerChange={quiz.handleAnswerChange}
                                    onCheckAnswers={quiz.checkAnswers}
                                    onRetake={quiz.resetQuiz}
                                    getOptionClass={quiz.getOptionClass}
                                    canSubmit={quiz.canSubmit}
                                    showExplanations={true}
                                />
                                
                                <div className="mt-6">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary mr-4"
                                    >
                                        ← Back to Content
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-6 bg-surface border-t border-border">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button 
                                onClick={() => onNavigate('module3')} 
                                className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border"
                            >
                                Previous Module
                            </button>
                            <div className="text-sm text-text-secondary text-center">
                                Module 4 of 4 • Data Management
                            </div>
                            <button 
                                onClick={() => onComplete(quiz.result?.score ?? 0)} 
                                disabled={!quiz.result || (quiz.result.score < 80)} 
                                className="w-full sm:w-auto btn-primary font-semibold py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Complete Module →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Module4;