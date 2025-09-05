/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import QuizComponent from '../common/QuizComponent';
import ResourcesPanel from '../resources/ResourcesPanel';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module1: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');
    
    const questions: QuizQuestions = {
        q1: { 
            question: "Under PIPEDA, when must an organization identify the purposes for collecting personal information?", 
            answer: 'b', 
            options: { 
                a: "After collection is complete", 
                b: "Before or at the time of collection", 
                c: "Only when requested by individuals" 
            },
            explanation: "PIPEDA requires organizations to identify purposes before or at the time of collection to ensure transparency."
        },
        q2: { 
            question: "Under MFIPPA, what is the primary rule for storing municipal personal information?", 
            answer: 'b', 
            options: { 
                a: "Can be stored anywhere for efficiency", 
                b: "Must be stored and accessed only in Canada", 
                c: "Storage location doesn't matter with encryption" 
            },
            explanation: "MFIPPA Section 30.1 requires that personal information be stored and accessed only within Canada, with very limited exceptions."
        },
        q3: { 
            question: "When is a Privacy Impact Assessment (PIA) required under MFIPPA?", 
            answer: 'c', 
            options: { 
                a: "Only for large technology implementations", 
                b: "Only when specifically requested by citizens", 
                c: "For any new or changed collection, use, or disclosure of personal information" 
            },
            explanation: "PIAs are required whenever there are new or changed practices involving personal information to assess and mitigate privacy risks."
        },
        q4: { 
            question: "What is the timeline for initial breach notification under Bill 194?", 
            answer: 'b', 
            options: { 
                a: "72 hours", 
                b: "24 hours", 
                c: "30 days" 
            },
            explanation: "Bill 194 requires initial breach notification to the Privacy Commissioner within 24 hours for significant breaches."
        },
    };

    const quiz = useQuiz(questions);

    const contentSections = [
        {
            title: "PIPEDA Overview",
            content: [
                "The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy legislation governing how private sector organizations collect, use, and disclose personal information in commercial activities.",
                "PIPEDA is founded on 10 Fair Information Principles that form the ground rules for handling personal data:",
                "• Accountability • Identifying Purposes • Consent • Limiting Collection • Limiting Use, Disclosure, and Retention • Accuracy • Safeguards • Openness • Individual Access • Challenging Compliance"
            ]
        },
        {
            title: "MFIPPA for Municipalities - Comprehensive Framework", 
            content: [
                "The Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) governs how Ontario's municipalities handle personal information and provide access to records. This comprehensive framework ensures transparency while protecting citizen privacy.",
                "**Core Principles and Requirements:**",
                "• **Access Rights**: Citizens have the right to access general records, subject to specific exemptions",
                "• **Privacy Protection**: Strict rules govern collection, use, and disclosure of personal information",
                "• **Transparency**: Municipalities must be open about their information practices",
                "• **Accountability**: Clear responsibility for compliance and oversight",
                "",
                "**Collection of Personal Information (s. 28):**",
                "• Must collect directly from the individual unless specific exceptions apply",
                "• Collection must be necessary for proper administration of a legally authorized activity",
                "• Must inform individuals of the purpose and legal authority for collection",
                "• Only collect what is necessary - principle of data minimization",
                "",
                "**Use and Disclosure Limitations (ss. 29-32):**",
                "• Use only for the purpose collected or consistent uses",
                "• Disclosure restricted to specific circumstances defined in the Act",
                "• No disclosure outside Canada without consent unless specific exceptions apply",
                "• Must maintain accuracy and protect against unauthorized access",
                "",
                "**Individual Rights:**",
                "• Right to access personal information (s. 36)",
                "• Right to request correction of inaccurate information (s. 47)",
                "• Right to know how personal information is being used",
                "• Right to file complaints with the Information and Privacy Commissioner"
            ]
        },
        {
            title: "Privacy Impact Assessments (PIAs) - Essential Practice",
            content: [
                "Privacy Impact Assessments are mandatory for municipal programs that involve new or changed collection, use, or disclosure of personal information.",
                "",
                "**When PIAs are Required:**",
                "• New programs or services collecting personal information",
                "• Technology implementations (databases, software, cloud services)",
                "• Data sharing agreements with other organizations",
                "• Changes to existing privacy practices",
                "• Cross-border data transfers",
                "",
                "**PIA Process Components:**",
                "• **Threshold Assessment**: Determine if full PIA is needed",
                "• **Data Mapping**: Identify all personal information flows",
                "• **Risk Assessment**: Evaluate privacy risks and impacts",
                "• **Mitigation Strategies**: Develop controls to reduce risks",
                "• **Monitoring Plan**: Ongoing compliance verification",
                "",
                "**Key Deliverables:**",
                "• Detailed privacy risk analysis",
                "• Data flow diagrams",
                "• Risk mitigation recommendations",
                "• Compliance monitoring framework",
                "• Staff training requirements"
            ]
        },
        {
            title: "Data Governance and Safeguards",
            content: [
                "MFIPPA requires municipalities to implement comprehensive safeguards to protect personal information throughout its lifecycle.",
                "",
                "**Physical Safeguards:**",
                "• Secure storage facilities with controlled access",
                "• Locked filing cabinets and secure server rooms",
                "• Clean desk policies and document destruction procedures",
                "• Visitor access controls and identification requirements",
                "",
                "**Technical Safeguards:**",
                "• Encryption for data at rest and in transit",
                "• Access controls and user authentication",
                "• Network security and firewall protection",
                "• Regular security updates and patch management",
                "• Backup and disaster recovery procedures",
                "",
                "**Administrative Safeguards:**",
                "• Privacy policies and procedures",
                "• Staff training and awareness programs",
                "• Access authorization and role-based permissions",
                "• Regular audits and compliance monitoring",
                "• Incident response and breach notification procedures",
                "",
                "**Retention and Disposal:**",
                "• Establish clear retention schedules",
                "• Secure disposal methods for all media types",
                "• Certificate of destruction for sensitive materials",
                "• Regular review and purging of outdated information"
            ]
        },
        {
            title: "Cross-Border Data Management",
            content: [
                "MFIPPA Section 30.1 restricts storage and access of personal information outside Canada, with specific requirements for municipalities.",
                "",
                "**Default Rule:**",
                "Personal information under municipal control must be stored and accessed only within Canada.",
                "",
                "**Limited Exceptions:**",
                "• Disclosure authorized under sections 29 or 31",
                "• Individual has given written consent",
                "• Information is available to the general public",
                "• Commissioner has authorized disclosure",
                "",
                "**Cloud Services Considerations:**",
                "• Verify data residency requirements with cloud providers",
                "• Ensure contractual guarantees for Canadian data storage",
                "• Implement additional safeguards for cross-border scenarios",
                "• Regular compliance auditing of third-party services",
                "",
                "**Due Diligence Requirements:**",
                "• Vendor assessment and due diligence processes",
                "• Data processing agreements with clear privacy terms",
                "• Regular monitoring and compliance verification",
                "• Incident notification and response procedures"
            ]
        },
        {
            title: "Breach Response and Notification",
            content: [
                "While MFIPPA doesn't mandate breach notification, municipalities must follow emerging best practices and may be subject to other notification requirements.",
                "",
                "**Breach Response Framework:**",
                "• **Immediate Response**: Contain the breach and assess scope",
                "• **Investigation**: Determine cause, extent, and affected individuals",
                "• **Risk Assessment**: Evaluate potential harm to individuals",
                "• **Notification Decisions**: Determine who needs to be notified and when",
                "• **Remediation**: Implement measures to prevent future breaches",
                "",
                "**Key Stakeholders to Notify:**",
                "• Affected individuals (where risk of significant harm exists)",
                "• Information and Privacy Commissioner of Ontario",
                "• Senior management and council",
                "• Law enforcement (if criminal activity suspected)",
                "• Insurance providers and legal counsel",
                "",
                "**Documentation Requirements:**",
                "• Detailed incident logs and timelines",
                "• Evidence preservation and chain of custody",
                "• Notification records and communications",
                "• Remediation actions and effectiveness measures",
                "• Lessons learned and process improvements"
            ]
        },
        {
            title: "Bill 194 - New Requirements",
            content: [
                "Bill 194 introduces significant updates to Ontario's privacy landscape that complement MFIPPA requirements:",
                "",
                "**Enhanced Breach Notification:**",
                "• Mandatory 24-hour notification to Privacy Commissioner for significant breaches",
                "• Expanded definition of what constitutes a privacy breach",
                "• Detailed reporting requirements including impact assessments",
                "",
                "**Strengthened Individual Rights:**",
                "• Enhanced data portability rights",
                "• Expanded access and correction rights",
                "• Stronger consent requirements for data collection",
                "",
                "**Increased Enforcement:**",
                "• Significant penalties for non-compliance (up to $10M or 2% of global revenue)",
                "• Enhanced investigation powers for the Commissioner",
                "• Public reporting of compliance orders and penalties",
                "",
                "**Implementation Timeline:**",
                "• Phased implementation over 18-24 months",
                "• Priority areas include breach notification and consent mechanisms",
                "• Regular compliance assessments and reporting requirements"
            ]
        }
    ];

    return (
        <section className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb mb-6">
                    <button onClick={() => onNavigate('dashboard')} className="hover:text-primary transition-colors">
                        Dashboard
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="text-primary font-semibold">Module 1: Privacy Laws & Frameworks</span>
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
                    {/* Module Header */}
                    <div className="module-header">
                        <h1 className="text-4xl font-bold font-mono mb-2 uppercase relative z-10">
                            Module 1: Privacy Laws & Frameworks
                        </h1>
                        <p className="text-lg opacity-90 relative z-10">
                            Understanding PIPEDA, MFIPPA, and the new Bill 194
                        </p>
                    </div>

                    {/* Learning Objectives */}
                    <div className="p-6 sm:p-8">
                        <div className="learning-objectives">
                            <h3 className="font-semibold text-primary mb-4 text-xl font-mono uppercase">
                                Learning Objectives
                            </h3>
                            <ul className="text-text-secondary space-y-2">
                                <li>Understand PIPEDA's 10 Fair Information Principles and their application</li>
                                <li>Master MFIPPA requirements for municipal organizations including collection, use, and disclosure rules</li>
                                <li>Learn to conduct comprehensive Privacy Impact Assessments (PIAs)</li>
                                <li>Implement data governance frameworks and safeguards</li>
                                <li>Navigate cross-border data management requirements</li>
                                <li>Develop breach response and notification procedures</li>
                                <li>Apply new Bill 194 privacy impact assessment requirements</li>
                                <li>Create practical compliance frameworks for municipal operations</li>
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
                                
                                {/* Resources Panel */}
                                <div className="mt-8">
                                    <ResourcesPanel />
                                </div>
                                
                                <div className="text-center py-8">
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-primary py-3 px-8 text-lg font-semibold"
                                    >
                                        Proceed to Knowledge Check
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Quiz Section */
                            <div className="quiz-container">
                                <h3 className="text-2xl font-semibold mb-6 text-text-primary font-mono uppercase">
                                    Knowledge Check
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Test your understanding of the privacy laws and frameworks covered in this module.
                                </p>
                                
                                <QuizComponent
                                    questions={questions}
                                    answers={quiz.answers}
                                    result={quiz.result}
                                    onAnswerChange={quiz.handleAnswerChange}
                                    onCheckAnswers={quiz.checkAnswers}
                                    onRetake={quiz.resetQuiz}
                                    getOptionClass={quiz.getOptionClass}
                                    canSubmit={quiz.canSubmit}
                                    showExplanations={true}
                                />

                                <div className="text-center mt-6">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary py-2 px-6 mr-4"
                                    >
                                        ← Back to Content
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Module Navigation */}
                    <div className="module-navigation">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button 
                                onClick={() => onNavigate('dashboard')} 
                                className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-3 px-6 border border-border rounded-lg"
                            >
                                ← Dashboard
                            </button>
                            <div className="text-sm text-text-secondary">
                                Module 1 of 4 • Privacy Laws & Frameworks
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

export default Module1;