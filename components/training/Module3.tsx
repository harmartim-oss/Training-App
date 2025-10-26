/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';
import QuizComponent from '../common/QuizComponent';
import SlideNavigation, { Slide } from '../common/SlideNavigation';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module3: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const allQuestions: QuizQuestions = {
        q1: { 
            question: "Your ministry's IT team is excited about implementing a new AI-powered document processing system to improve efficiency. However, the business case shows only marginal time savings, and a manual process could achieve similar results. Which principle of Ontario's Responsible Use of AI Directive should guide your decision, and what does it require?", 
            answer: 'b', 
            options: { 
                a: "AI is used to benefit the people of Ontario - it must improve public services", 
                b: "AI use is justified and proportionate - it requires a 'problem-first' not 'technology-first' approach", 
                c: "AI use is transparent - it must clearly explain decisions to users" 
            },
            explanation: "The 'justified and proportionate' principle requires organizations to adopt a 'problem-first' rather than 'technology-first' approach, meaning AI should only be used when it's the most appropriate solution to a clearly defined problem. In this scenario, if manual processes can achieve similar results and AI offers only marginal benefits, implementing AI may not be justified. Organizations must demonstrate: (1) Clear problem definition, (2) Evidence that AI is the best solution, (3) Benefits proportionate to risks and costs, (4) Consideration of simpler alternatives. This principle prevents 'AI for AI's sake' implementations that waste resources and introduce unnecessary risks."
        },
        q2: { 
            question: "Your team is preparing to implement an AI chatbot for citizen inquiries about government services. Before beginning technical development, what is the first step in AI risk management according to Ontario's directive that will ensure your risk assessment is meaningful and properly scoped?", 
            answer: 'b', 
            options: { 
                a: "Identify all possible AI risks and failure scenarios comprehensively", 
                b: "State clear objectives for the AI system and establish the organizational context", 
                c: "Assess likelihood and impact of identified AI risks using a matrix" 
            },
            explanation: "Ontario's AI risk management framework requires organizations to first 'state objectives and establish context' before any risk identification or assessment activities. This foundational step involves: (1) Defining clear objectives: What specific problem will the AI solve? What outcomes are expected?, (2) Establishing organizational context: Stakeholder needs, regulatory requirements, existing systems, available resources, (3) Determining scope: What's included/excluded from the AI system?, (4) Setting success criteria: How will you measure if the AI achieves its objectives? Without this foundation, risk identification and assessment lack the context needed to be meaningful. You might identify irrelevant risks or miss critical ones because you haven't clearly defined what you're trying to achieve and the environment in which the AI will operate."
        },
        q3: { 
            question: "Your ministry is considering deploying an AI system to automatically prioritize social housing applications based on urgency scores. The system will significantly affect whether families receive housing assistance and how quickly. According to Ontario's AI directive, what is your compliance obligation regarding AI risk assessment?", 
            answer: 'a', 
            options: { 
                a: "Conduct a comprehensive Algorithmic Impact Assessment (AIA) before implementation to identify and mitigate potential harms", 
                b: "Deploy the system first and conduct risk assessment only after identifying problems in production", 
                c: "Only conduct risk assessment if citizens specifically request one or file complaints" 
            },
            explanation: "Ontario's AI directive requires organizations to conduct AI risk assessments (specifically Algorithmic Impact Assessments for high-impact systems) before implementing any AI system that significantly affects individuals. This proactive approach is essential because: (1) High-impact decisions: Housing assistance significantly affects people's lives and wellbeing, (2) Prevention over reaction: Identifying risks before deployment prevents harm rather than responding after people are already affected, (3) Mitigation planning: Pre-implementation assessment allows organizations to design appropriate safeguards, (4) Legal compliance: Many jurisdictions require impact assessments before deploying high-risk AI. The AIA should evaluate potential bias (e.g., discrimination against protected groups), fairness issues, accuracy, transparency needs, and human oversight requirements."
        },
        q4: { 
            question: "Your organization has deployed an AI-powered fraud detection system that flags potentially fraudulent benefit applications for review. The system is highly automated but occasionally makes errors. What does the 'human oversight' principle require for this high-risk AI application?", 
            answer: 'c', 
            options: { 
                a: "Humans must manually review and approve every single AI decision before it takes effect", 
                b: "The AI system can operate completely autonomously without human involvement once deployed", 
                c: "Meaningful human control where trained staff can review AI recommendations, override decisions, and understand the reasoning" 
            },
            explanation: "The human oversight principle in AI governance requires meaningful human control over high-risk AI decisions, which means: (1) Reviewability: Humans can examine AI recommendations and supporting evidence, (2) Override capability: Humans have authority to disagree with and override AI decisions, (3) Understanding: Staff receive training to understand how the AI works and its limitations, (4) Accountability: Clear assignment of responsibility for final decisions, (5) Appropriate automation level: The degree of automation should match the risk level. For high-risk decisions affecting people's access to benefits, human oversight is critical to catch AI errors, ensure fairness, and maintain accountability. However, this doesn't mean humans must review every decision - low-risk cases might be fully automated while high-risk or borderline cases require human review."
        },
        q5: {
            question: "Your ministry completed an Algorithmic Impact Assessment (AIA) for a new AI hiring screening tool that will filter job applications. The AIA must evaluate several key components to ensure responsible AI deployment. Which component is most critical for ensuring equitable treatment of all applicants?",
            answer: 'a',
            options: {
                a: "Comprehensive evaluation of potential bias and fairness issues across protected characteristics (race, gender, age, disability)",
                b: "Performance benchmarking against competing AI vendors' screening accuracy rates",
                c: "Cost-benefit analysis focused solely on hiring efficiency and budget savings",
                d: "User satisfaction surveys from hiring managers about the interface and features"
            },
            explanation: "AIAs must thoroughly evaluate potential bias and fairness issues to ensure equitable outcomes for all affected individuals. For AI hiring tools, this is especially critical because: (1) Protected characteristics: Employment decisions cannot discriminate based on race, gender, age, disability, or other protected categories, (2) Historical bias: Training data may contain historical hiring discrimination that the AI could perpetuate or amplify, (3) Proxy discrimination: AI might use seemingly neutral factors (e.g., zip code, school names) that correlate with protected characteristics, (4) Disparate impact: Even unintentional bias can result in systematically excluding qualified candidates from disadvantaged groups. The AIA should test the AI system with diverse test data sets, analyze outcomes across demographic groups, and implement bias mitigation strategies before deployment."
        },
        q6: {
            question: "Your organization deployed an AI system six months ago to automatically assess environmental permit applications. The system has been working well, but Ontario's AI directive requires specific transparency measures. What level of transparency is required for this high-risk AI system that makes decisions affecting businesses and environmental protection?",
            answer: 'c',
            options: {
                a: "No transparency required since the system is working without complaints",
                b: "Basic disclosure that 'AI is being used' posted somewhere on the government website",
                c: "Detailed, accessible explanations of how the AI makes decisions, what factors it considers, and how to appeal decisions",
                d: "Only technical documentation provided to internal IT staff and developers"
            },
            explanation: "High-risk AI systems require detailed transparency to ensure accountability and maintain public trust. For permit application assessment, this means: (1) Clear notification: Applicants must know AI is being used in their assessment, (2) Meaningful explanation: Not just 'AI was used' but 'The AI considered these 5 factors: X, Y, Z...' with understandable reasoning, (3) Appeal rights: Clear process for challenging AI decisions and requesting human review, (4) Accessibility: Explanations in plain language that non-technical stakeholders can understand, (5) Proactive disclosure: Information available before decisions are made, not just upon request. This level of transparency enables: affected parties to understand decisions, identify potential errors or bias, exercise their rights to challenge decisions, and hold the organization accountable for AI outcomes."
        },
        q7: {
            question: "Your AI-powered student assessment system has been in production for one year, helping teachers evaluate student performance. Recently, parents from certain demographic groups report that their children receive consistently lower AI-generated scores despite strong traditional test performance. What is the primary purpose of ongoing monitoring in AI governance that should have detected this issue earlier?",
            answer: 'b',
            options: {
                a: "To continuously improve the AI's processing speed and system performance metrics",
                b: "To detect and mitigate emerging risks, biases, and unintended consequences that develop over time",
                c: "To reduce operational costs by optimizing computational efficiency and resource usage",
                d: "To collect general user feedback and satisfaction ratings about the AI interface"
            },
            explanation: "Ongoing monitoring is essential for detecting emerging risks, biases, and unintended consequences that may develop over time in AI systems. This is critical because: (1) Data drift: The characteristics of real-world data change over time, potentially causing bias not present during initial development, (2) Edge cases: Rare scenarios not in training data emerge during production use, (3) Feedback loops: AI decisions can create self-reinforcing patterns (e.g., if the AI consistently rates certain students lower, teachers might give them less attention, leading to worse actual performance), (4) Changing context: Social, regulatory, or operational environments evolve, affecting AI appropriateness. Effective monitoring includes: tracking performance metrics across demographic groups, analyzing decision patterns for emerging bias, reviewing appeals and complaints, conducting periodic bias audits, and maintaining incident response procedures for when issues are detected."
        },
        q8: {
            question: "Ontario is considering deploying an AI system to predict which infrastructure projects should receive priority funding based on community need, expected impact, and available budget. The AI will analyze demographic data, economic indicators, and historical project outcomes. Which principle requires the system to be specifically designed to maximize benefits to Ontario communities while minimizing potential harm such as perpetuating regional inequalities?",
            answer: 'a',
            options: {
                a: "AI is used to benefit the people of Ontario - systems must be designed to maximize benefits and minimize harm",
                b: "AI use is transparent - all AI decisions must be explainable to stakeholders",
                c: "AI use is justified and proportionate - only use AI when it's the best solution",
                d: "AI is used to support people - AI should augment not replace human judgment"
            },
            explanation: "The principle 'AI is used to benefit the people of Ontario' specifically focuses on ensuring AI systems are designed and deployed to maximize benefits while minimizing potential harms to citizens. For infrastructure funding AI, this means: (1) Benefit maximization: Ensure the AI helps direct funding where it creates the greatest positive impact for communities, (2) Harm minimization: Prevent perpetuating historical underinvestment in marginalized communities, avoid creating or reinforcing regional inequalities, (3) Inclusive design: Consider diverse community needs and values in the AI design, (4) Stakeholder engagement: Involve affected communities in defining what 'benefit' means and validating the AI's prioritization, (5) Equity considerations: Actively design against discrimination and for equitable distribution of infrastructure investments. This principle requires organizations to go beyond technical functionality and actively ensure their AI serves the public good."
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

    // Convert content sections into slides for click-through navigation
    const contentSlides: Slide[] = contentSections.map((section, index) => ({
        id: `slide-${index}`,
        title: section.title,
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                    {section.title}
                </h2>
                <div className="space-y-3 text-text-secondary leading-relaxed">
                    {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                    ))}
                </div>
            </div>
        )
    }));

    return (
        <section className={`animate-fade-in ${layoutClasses}`}>
            <div className={`max-w-6xl mx-auto ${mobileClasses}`}>
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