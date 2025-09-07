/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import QuizComponent from '../common/QuizComponent';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module3: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');

    const allQuestions: QuizQuestions = {
        q1: { 
            question: "Which principle requires that AI use follows a 'problem-first' rather than 'technology-first' approach?", 
            answer: 'b', 
            options: { 
                a: "AI is used to benefit the people of Ontario", 
                b: "AI use is justified and proportionate", 
                c: "AI use is transparent" 
            },
            explanation: "The 'justified and proportionate' principle ensures AI is used only when necessary and appropriate for the specific problem at hand."
        },
        q2: { 
            question: "What is the first step in AI risk management according to Ontario's directive?", 
            answer: 'b', 
            options: { 
                a: "Identify risks", 
                b: "State objectives and establish context", 
                c: "Assess risks" 
            },
            explanation: "Establishing clear objectives and context is essential before any risk identification or assessment can be meaningful."
        },
        q3: { 
            question: "According to Ontario's AI directive, when must organizations conduct AI risk assessments?", 
            answer: 'a', 
            options: { 
                a: "Before implementing any AI system that significantly affects individuals", 
                b: "Only after AI systems are fully deployed", 
                c: "Only when requested by the public" 
            },
            explanation: "Risk assessments must be conducted proactively before implementation to identify and mitigate potential harms."
        },
        q4: { 
            question: "What does the 'human oversight' principle require in AI governance?", 
            answer: 'c', 
            options: { 
                a: "Humans must approve every AI decision", 
                b: "AI systems can operate fully autonomously", 
                c: "Meaningful human control over high-risk AI decisions" 
            },
            explanation: "Human oversight requires meaningful human control, especially for high-risk decisions, while allowing appropriate automation for low-risk scenarios."
        },
        q5: {
            question: "Which of the following is a key component of an Algorithmic Impact Assessment (AIA)?",
            answer: 'a',
            options: {
                a: "Evaluation of potential bias and fairness issues",
                b: "Performance benchmarking against competitors",
                c: "Cost-benefit analysis only",
                d: "User satisfaction surveys"
            },
            explanation: "AIAs must thoroughly evaluate potential bias and fairness issues to ensure equitable outcomes for all affected individuals."
        },
        q6: {
            question: "Under Ontario's AI directive, what level of transparency is required for high-risk AI systems?",
            answer: 'c',
            options: {
                a: "No transparency required",
                b: "Basic disclosure of AI use",
                c: "Detailed explanations of AI decision-making processes",
                d: "Only technical documentation"
            },
            explanation: "High-risk AI systems require detailed transparency, including clear explanations of how decisions are made to ensure accountability."
        },
        q7: {
            question: "What is the primary purpose of ongoing monitoring in AI governance?",
            answer: 'b',
            options: {
                a: "To improve system performance only",
                b: "To detect and mitigate emerging risks and biases",
                c: "To reduce operational costs",
                d: "To collect user feedback"
            },
            explanation: "Ongoing monitoring is essential for detecting emerging risks, biases, and unintended consequences that may develop over time."
        },
        q8: {
            question: "Which principle emphasizes that AI systems should be designed to minimize harm and maximize benefits?",
            answer: 'a',
            options: {
                a: "AI is used to benefit the people of Ontario",
                b: "AI use is transparent",
                c: "AI use is justified and proportionate",
                d: "AI is used to support people"
            },
            explanation: "This principle specifically focuses on ensuring AI systems are designed and deployed to maximize benefits while minimizing potential harms to citizens."
        }
    };

    const quiz = useQuiz(allQuestions, 5);

    const contentSections = [
        {
            title: "Ontario's Responsible Use of AI Directive",
            content: [
                "Ontario's Responsible Use of AI Directive, effective December 2024, establishes comprehensive guidelines for the ethical and responsible deployment of artificial intelligence systems across all government ministries and provincial agencies.",
                "",
                "**Scope and Application:**",
                "• Applies to all Ontario ministries and provincial agencies",
                "• Covers AI systems used in policy development, program delivery, and service provision",
                "• Includes both internally developed and third-party AI systems",
                "• Encompasses automated decision-making systems that affect individuals",
                "",
                "**Key Requirements:**",
                "• Mandatory risk assessments for all AI implementations",
                "• Public transparency reporting on AI system use",
                "• Regular auditing and monitoring of AI system performance",
                "• Clear governance structures and accountability mechanisms",
                "• Staff training and competency development programs",
                "",
                "**Implementation Timeline:**",
                "• Phase 1 (2024): Policy framework and governance structures",
                "• Phase 2 (2025): Risk assessment processes and transparency measures",
                "• Phase 3 (2026): Full compliance monitoring and public reporting"
            ]
        },
        {
            title: "Six Principles of Responsible AI Use",
            content: [
                "The directive establishes six fundamental principles that must guide all AI implementations in the Ontario government:",
                "",
                "**1. AI is used to benefit the people of Ontario**",
                "• Prioritize public interest and citizen welfare in all AI applications",
                "• Ensure AI systems enhance rather than replace human-centered services",
                "• Focus on improving accessibility, efficiency, and quality of public services",
                "• Consider diverse community needs and perspectives in AI design",
                "",
                "**2. AI use is justified and proportionate**",
                "• Adopt a 'problem-first' rather than 'technology-first' approach",
                "• Ensure AI deployment is necessary and appropriate for the specific use case",
                "• Consider less intrusive alternatives before implementing AI solutions",
                "• Match the level of AI sophistication to the complexity of the problem",
                "",
                "**3. AI use is transparent**",
                "• Provide clear information about when and how AI systems are used",
                "• Maintain public registries of high-impact AI systems",
                "• Ensure decisions made by AI systems are explainable to affected individuals",
                "• Publish regular reports on AI system performance and outcomes",
                "",
                "**4. AI systems operate safely and effectively**",
                "• Implement rigorous testing and validation before deployment",
                "• Establish continuous monitoring and performance evaluation",
                "• Maintain robust error detection and correction mechanisms",
                "• Ensure AI systems perform reliably across diverse populations and scenarios",
                "",
                "**5. AI systems respect privacy and civil liberties**",
                "• Minimize data collection to what is necessary for the AI system's purpose",
                "• Implement strong data protection and security measures",
                "• Respect individual rights to privacy, dignity, and autonomy",
                "• Ensure compliance with all applicable privacy legislation",
                "",
                "**6. Human oversight is maintained over AI systems**",
                "• Ensure meaningful human control over high-risk AI decisions",
                "• Maintain the ability to intervene, override, or shut down AI systems",
                "• Provide training for staff responsible for AI system oversight",
                "• Establish clear escalation procedures for AI system issues"
            ]
        },
        {
            title: "AI Risk Management Framework",
            content: [
                "Ontario requires a structured 5-step risk management process for all AI implementations:",
                "",
                "**Step 1: State Objectives and Establish Context**",
                "• Define clear business objectives and success criteria",
                "• Identify stakeholders and their interests",
                "• Establish the scope and boundaries of the AI system",
                "• Consider regulatory and legal requirements",
                "• Document organizational risk tolerance and appetite",
                "",
                "**Step 2: Identify Risks**",
                "• Systematic identification of potential AI-related risks",
                "• Consider technical risks (bias, accuracy, security vulnerabilities)",
                "• Evaluate operational risks (system failures, data quality issues)",
                "• Assess societal risks (discrimination, privacy violations, job displacement)",
                "• Document emerging risks and uncertainties",
                "",
                "**Step 3: Assess Risks**",
                "• Evaluate the likelihood and potential impact of identified risks",
                "• Use quantitative and qualitative risk assessment methods",
                "• Consider cumulative and cascading effects",
                "• Assess risks across different demographic groups",
                "• Prioritize risks based on severity and organizational impact",
                "",
                "**Step 4: Plan and Act**",
                "• Develop comprehensive risk mitigation strategies",
                "• Implement technical safeguards and controls",
                "• Establish governance and oversight mechanisms",
                "• Create incident response and contingency plans",
                "• Allocate resources for risk management activities",
                "",
                "**Step 5: Report and Monitor**",
                "• Establish continuous monitoring and evaluation processes",
                "• Regular reporting to senior management and stakeholders",
                "• Track key performance indicators and risk metrics",
                "• Conduct periodic reviews and updates of risk assessments",
                "• Document lessons learned and best practices"
            ]
        },
        {
            title: "Algorithmic Impact Assessment (AIA)",
            content: [
                "The Algorithmic Impact Assessment is a mandatory process for evaluating the potential impacts of AI systems on individuals and communities.",
                "",
                "**When AIA is Required:**",
                "• All AI systems that make or assist in making decisions about individuals",
                "• Systems that process personal information in automated ways",
                "• AI applications that could significantly impact access to services",
                "• High-risk AI systems regardless of their decision-making role",
                "",
                "**AIA Process Components:**",
                "• **Data Assessment**: Evaluate data quality, representativeness, and bias",
                "• **Algorithm Review**: Analyze model logic, assumptions, and limitations",
                "• **Impact Analysis**: Assess potential effects on different groups and individuals",
                "• **Fairness Evaluation**: Test for discriminatory outcomes and bias",
                "• **Transparency Planning**: Develop communication and explanation strategies",
                "",
                "**Key Deliverables:**",
                "• Comprehensive impact assessment report",
                "• Risk mitigation and monitoring plan",
                "• Public-facing transparency documentation",
                "• Staff training and competency requirements",
                "• Ongoing evaluation and review schedule",
                "",
                "**Quality Assurance:**",
                "• Independent review by qualified experts",
                "• Stakeholder consultation and feedback",
                "• Validation of assessment findings",
                "• Regular updates and reassessments"
            ]
        },
        {
            title: "Governance and Accountability Structures",
            content: [
                "Effective AI governance requires clear organizational structures and accountability mechanisms:",
                "",
                "**AI Governance Committee:**",
                "• Senior leadership oversight and strategic direction",
                "• Cross-functional representation including IT, legal, privacy, and operations",
                "• Regular review of AI policies, standards, and practices",
                "• Approval authority for high-risk AI implementations",
                "",
                "**AI Ethics Board:**",
                "• Independent advisory body with external expertise",
                "• Review of ethical implications and societal impacts",
                "• Guidance on complex ethical dilemmas and edge cases",
                "• Public engagement and stakeholder consultation facilitation",
                "",
                "**Operational Roles and Responsibilities:**",
                "• **AI Product Owners**: Responsible for specific AI system outcomes and performance",
                "• **Data Stewards**: Ensure data quality, privacy, and ethical use",
                "• **Technical Teams**: Implement safeguards and monitoring systems",
                "• **Compliance Officers**: Monitor adherence to policies and regulations",
                "",
                "**Accountability Mechanisms:**",
                "• Clear assignment of responsibility for AI system decisions",
                "• Regular auditing and compliance assessments",
                "• Incident reporting and investigation procedures",
                "• Performance metrics and public reporting requirements",
                "",
                "**Continuous Improvement:**",
                "• Regular policy and procedure reviews",
                "• Staff training and professional development",
                "• Knowledge sharing and best practice documentation",
                "• External benchmarking and peer learning"
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
                    <span className="text-primary font-semibold">Module 3: AI Usage and Governance</span>
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
                        <h1 className="text-3xl font-bold font-mono mb-2 uppercase">Module 3: AI Usage and Governance</h1>
                        <p className="mb-6">Navigating Ontario's Responsible Use of AI Directive</p>
                        
                        {/* Content Outline and Reading Time */}
                        {currentSection === 'content' && (
                            <div className="content-outline">
                                <h3>📚 Module Content Overview</h3>
                                <div className="reading-time">
                                    <span className="reading-time-icon">⏱️</span>
                                    <span>Estimated reading time: 12-18 minutes</span>
                                </div>
                                <ul>
                                    <li><a href="#ai-directive">Ontario's Responsible Use of AI Directive</a></li>
                                    <li><a href="#six-principles">Six Principles of Responsible AI Use</a></li>
                                    <li><a href="#governance-framework">AI Governance and Accountability Framework</a></li>
                                    <li><a href="#impact-assessment">Algorithmic Impact Assessment (AIA) Process</a></li>
                                    <li><a href="#risk-management">AI Risk Management and Mitigation</a></li>
                                    <li><a href="#transparency">Transparency and Explainability Requirements</a></li>
                                </ul>
                            </div>
                        )}
                        
                        <div className="learning-objectives-enhanced">
                            <h3>
                                <span>🎯</span>
                                Learning Objectives
                            </h3>
                            <ul>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Understand Ontario's Responsible Use of AI Directive and its scope</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Apply the six principles of responsible AI use in practice</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Implement comprehensive AI risk management frameworks</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Conduct effective Algorithmic Impact Assessments (AIA)</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Establish robust AI governance and accountability structures</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Ensure compliance with ethical AI deployment standards</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Create transparent and explainable AI systems</span>
                                </li>
                            </ul>
                        </div>

                        {currentSection === 'content' ? (
                            /* Content Section */
                            <div className="space-y-6">
                                {contentSections.map((section, index) => (
                                    <div key={index} className="content-section" id={
                                        section.title === "Ontario's Responsible Use of AI Directive" ? "ai-directive" :
                                        section.title === "Six Principles of Responsible AI Use" ? "six-principles" :
                                        section.title === "AI Governance and Accountability Framework" ? "governance-framework" :
                                        section.title === "Algorithmic Impact Assessment (AIA) Process" ? "impact-assessment" :
                                        section.title === "AI Risk Management and Mitigation" ? "risk-management" :
                                        section.title === "Transparency and Explainability Requirements" ? "transparency" : ""
                                    }>
                                        <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4 text-text-secondary leading-relaxed">
                                            {section.content.map((paragraph, pIndex) => {
                                                // Enhanced content formatting
                                                if (paragraph === "") return <br key={pIndex} />;
                                                
                                                // Special formatting for important callouts
                                                if (paragraph.includes("**Scope and Application") || paragraph.includes("**Key Requirements") || paragraph.includes("**Implementation Timeline")) {
                                                    return (
                                                        <div key={pIndex} className="learning-callout info">
                                                            <div className="learning-callout-title">
                                                                <span className="learning-callout-icon">💡</span>
                                                                {paragraph.replace(/\*\*/g, '')}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                
                                                // Format bullet points as enhanced lists
                                                if (paragraph.startsWith("• ")) {
                                                    return (
                                                        <div key={pIndex} className="ml-6 flex items-start gap-3 py-1">
                                                            <span className="text-primary font-bold mt-1">▸</span>
                                                            <span>{paragraph.substring(2)}</span>
                                                        </div>
                                                    );
                                                }
                                                
                                                return <p key={pIndex} className="text-base leading-relaxed">{paragraph}</p>;
                                            })}
                                        </div>
                                        
                                        {/* Add scenario boxes for specific sections */}
                                        {section.title === "Six Principles of Responsible AI Use" && (
                                            <div className="scenario-box">
                                                <div className="scenario-title">📋 Practical Scenario: AI-Powered Service Delivery</div>
                                                <div className="scenario-content">
                                                    Your ministry is considering implementing an AI chatbot to handle citizen inquiries about government services. The system would use natural language processing to understand questions and provide automated responses, with escalation to human agents for complex issues.
                                                </div>
                                                <div className="scenario-question">
                                                    💭 Reflection: How would you apply the six principles to ensure this AI system is implemented responsibly? Consider transparency, accountability, and citizen benefit.
                                                </div>
                                            </div>
                                        )}
                                        
                                        {section.title === "Ontario's Responsible Use of AI Directive" && (
                                            <div className="learning-callout tip">
                                                <div className="learning-callout-title">
                                                    <span className="learning-callout-icon">💡</span>
                                                    Key Compliance Tip
                                                </div>
                                                <p>Remember the "Three Ts" for AI directive compliance: <strong>T</strong>ransparency in operations, <strong>T</strong>esting for bias and accuracy, and <strong>T</strong>raining for staff competency.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {/* Key Takeaways Section */}
                                <div className="key-takeaways">
                                    <h3>Key Takeaways</h3>
                                    <ul>
                                        <li>Ontario's AI directive requires comprehensive governance across all government uses of AI</li>
                                        <li>Six principles provide a framework for ethical AI implementation</li>
                                        <li>Algorithmic Impact Assessments are mandatory for high-risk AI systems</li>
                                        <li>Transparency and explainability are essential for public trust</li>
                                        <li>Risk management must be ongoing throughout the AI lifecycle</li>
                                        <li>Human oversight and accountability mechanisms are required</li>
                                    </ul>
                                </div>
                                
                                {/* Interactive Checklist */}
                                <div className="interactive-checklist">
                                    <h4>🗃️ AI Governance Implementation Checklist</h4>
                                    <p className="text-sm text-text-muted mb-4">Check off items as you implement them in your AI governance framework:</p>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="ai-checklist-1" />
                                        <label htmlFor="ai-checklist-1" className="checklist-text">Establish AI governance committee and decision-making processes</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="ai-checklist-2" />
                                        <label htmlFor="ai-checklist-2" className="checklist-text">Conduct Algorithmic Impact Assessment for new AI systems</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="ai-checklist-3" />
                                        <label htmlFor="ai-checklist-3" className="checklist-text">Implement bias testing and monitoring procedures</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="ai-checklist-4" />
                                        <label htmlFor="ai-checklist-4" className="checklist-text">Create public transparency reporting mechanisms</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="ai-checklist-5" />
                                        <label htmlFor="ai-checklist-5" className="checklist-text">Develop staff training programs on responsible AI use</label>
                                    </div>
                                </div>
                                
                                {/* Resources Panel */}
                                <div className="mt-8">
                                    <ResourcesPanel />
                                </div>
                                
                                <div className="text-center py-8">
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-primary py-3 px-8 text-lg font-semibold"
                                    >
                                        Proceed to Knowledge Check →
                                    </button>
                                </div>
                            </div>
                                    </div>
                                ))}
                                
                                <div className="bg-surface-elevated border border-border-light p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4 text-text-primary font-mono">Resources & Downloads</h4>
                                    <p className="mb-4 text-text-secondary">Access practical tools and templates for implementing responsible AI governance.</p>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">AI Risk Assessment Templates</h5>
                                                <p className="text-sm text-text-secondary mb-3">Comprehensive frameworks for evaluating AI system risks</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Algorithmic Impact Assessment Guide</h5>
                                                <p className="text-sm text-text-secondary mb-3">Step-by-step guide for conducting AIA evaluations</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">AI Governance Checklist</h5>
                                                <p className="text-sm text-text-secondary mb-3">Essential governance structures and accountability measures</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Transparency and Communication Templates</h5>
                                                <p className="text-sm text-text-secondary mb-3">Public-facing documentation and communication guides</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-4 text-sm text-text-secondary">
                                        <strong>Note:</strong> These resources are aligned with Ontario's AI directive and should be customized 
                                        to your organization's specific context and risk tolerance.
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
                                <p className="mb-6 text-text-secondary">Test your understanding of AI governance principles and Ontario's responsible AI directive.</p>
                                
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
                                onClick={() => onNavigate('module2')} 
                                className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border"
                            >
                                Previous Module
                            </button>
                            <div className="text-sm text-text-secondary text-center">
                                Module 3 of 4 • AI Usage and Governance
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

export default Module3;