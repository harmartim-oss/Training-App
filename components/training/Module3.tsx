/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';
import QuizComponent from '../common/QuizComponent';
import DownloadableResources from '../common/DownloadableResources';
import SlideNavigation, { Slide } from '../common/SlideNavigation';
import { 
    ProcessFlow, 
    ComparisonTable, 
    InfoGraphic, 
    InteractiveScenario, 
    ProgressVisualizer,
    ConceptMap 
} from '../common/VisualLearningElements';
import { ConceptIcon, ScenarioIcon, ImplementationIcon, InteractiveIcon, ProgressIcon, VisualFrameworkIcon, AssessmentIcon, LearningPathIcon } from '../icons';
import { getModuleLearningObjectives } from '../../config/bloomsTaxonomy';
import { LearningObjectivesDisplay, BloomsTaxonomyLegend } from '../common/BloomsTaxonomyIndicator';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module3: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz' | 'resources'>('content');
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const sampleResources = [
        {
            id: 'ai-risk-assessment-template',
            title: 'AI Risk Assessment Template',
            description: 'Comprehensive template for conducting AI risk assessments aligned with Ontario\'s Responsible Use of AI Directive.',
            type: 'template' as const,
            size: '12 pages',
            previewContent: `AI RISK ASSESSMENT TEMPLATE
Ontario Responsible Use of AI Directive

SECTION 1: AI SYSTEM OVERVIEW

1.1 System Identification
AI System Name: _________________________
Department/Ministry: ____________________
Project Lead: ___________________________
Assessment Date: ________________________
Review Date: ____________________________

1.2 System Description
Describe the AI system and its purpose:
_________________________________________
_________________________________________

1.3 Business Objectives
What problem does this AI system solve?
_________________________________________
_________________________________________

Why is AI the appropriate solution?
_________________________________________
_________________________________________

SECTION 2: CONTEXT ESTABLISHMENT

2.1 Stakeholder Identification
□ Internal users (specify roles): ____________
□ External users (citizens, businesses, etc.)
□ Data subjects (people affected by decisions)
□ Other stakeholders: ____________________

2.2 Organizational Context
Current process without AI:
_________________________________________

Expected changes with AI:
_________________________________________

Resources available:
□ Technical expertise  □ Budget  □ Timeline
□ Training capacity  □ Support staff

2.3 Regulatory Environment
Applicable laws and regulations:
□ PIPEDA  □ MFIPPA  □ Accessibility for Ontarians with Disabilities Act
□ Human Rights Code  □ Other: ____________

SECTION 3: AI SYSTEM CHARACTERISTICS

3.1 Decision Type
□ Automated decision (no human involvement)
□ Augmented decision (AI assists humans)
□ Advisory (AI provides recommendations)

3.2 Impact Level Assessment
Rate the potential impact on individuals:
□ Low: Minimal effect on rights or interests
□ Medium: Moderate effect on opportunities or access
□ High: Significant effect on fundamental rights, access to services, or opportunities

Justification:
_________________________________________

3.3 Technical Characteristics
AI/ML Techniques Used:
□ Machine Learning  □ Deep Learning  □ Natural Language Processing
□ Computer Vision  □ Predictive Analytics  □ Other: __________

Data Sources:
□ Internal databases  □ External datasets
□ Public data  □ User-provided data
□ Third-party APIs  □ Other: _____________

SECTION 4: RISK IDENTIFICATION

4.1 Bias and Fairness Risks
Potential for algorithmic bias:
□ Training data bias (historical discrimination)
□ Selection bias (unrepresentative datasets)
□ Proxy discrimination (use of correlated features)
□ Emergent bias (develops over time)

Protected characteristics that could be affected:
□ Race  □ Gender  □ Age  □ Disability
□ Religion  □ Sexual orientation  □ Other: ___

4.2 Privacy and Security Risks
Personal information involved:
□ Names  □ Contact info  □ Financial data
□ Health information  □ Biometric data
□ Other sensitive data: __________________

Privacy risks:
□ Unauthorized access  □ Data re-identification
□ Function creep  □ Surveillance concerns
□ Cross-border data transfer

4.3 Transparency and Explainability Risks
Can the AI's decisions be explained?
□ Fully explainable  □ Partially explainable
□ Black box (not explainable)

Communication risks:
□ Stakeholders don't know AI is being used
□ Decision rationale cannot be explained
□ Appeal process not clear

4.4 Accountability Risks
□ Unclear responsibility for AI decisions
□ Inadequate human oversight
□ No mechanism to challenge decisions
□ Insufficient audit trails

4.5 Safety and Reliability Risks
□ System errors or failures
□ Adversarial attacks
□ Data poisoning
□ Model drift over time
□ Unexpected behaviors in edge cases

SECTION 5: RISK ASSESSMENT

For each identified risk, assess:

Risk ID: _____
Description: _____________________________
Likelihood: □ Low  □ Medium  □ High
Impact: □ Low  □ Medium  □ High
Overall Risk Level: □ Low  □ Medium  □ High  □ Critical

SECTION 6: RISK MITIGATION

For each risk, document mitigation measures:

Risk ID: _____
Mitigation Strategy: _____________________
_________________________________________

Responsible Party: _______________________
Implementation Timeline: _________________
Residual Risk: □ Low  □ Medium  □ High

SECTION 7: GOVERNANCE AND OVERSIGHT

7.1 Human Oversight
Type of human oversight:
□ Human-in-the-loop (review all decisions)
□ Human-on-the-loop (monitor and intervene)
□ Human-in-command (strategic oversight)

Oversight responsibilities:
_________________________________________

7.2 Monitoring and Review
Ongoing monitoring plan:
□ Performance metrics tracking
□ Bias audits (frequency: ____________)
□ User feedback collection
□ Incident reporting and response

Review schedule: _________________________

7.3 Documentation
□ Technical documentation maintained
□ Decision logs kept
□ Audit trail accessible
□ Change management process

SECTION 8: COMPLIANCE CHECKLIST

Ontario AI Directive Principles:
□ AI is used to benefit the people of Ontario
□ AI use is justified and proportionate
□ AI is used to support people
□ AI use is transparent
□ AI use is safe, secure, and respects privacy
□ AI use is accountable and responsible
□ Human oversight maintained
□ Procurement and deployment procedures followed

SECTION 9: APPROVAL AND SIGN-OFF

Risk Assessment Conducted by:
Name: ______________  Signature: __________
Date: ______________

Privacy Officer Review:
Name: ______________  Signature: __________
Date: ______________

IT Security Review:
Name: ______________  Signature: __________
Date: ______________

Executive Approval:
Name: ______________  Signature: __________
Date: ______________

SECTION 10: APPENDICES

A. Technical specifications
B. Data processing agreements
C. Bias testing results
D. Consultation records
E. References and citations`
        },
        {
            id: 'aia-guide',
            title: 'Algorithmic Impact Assessment (AIA) Guide',
            description: 'Step-by-step guide for conducting Algorithmic Impact Assessments for high-impact AI systems.',
            type: 'guide' as const,
            size: '15 pages',
            previewContent: `ALGORITHMIC IMPACT ASSESSMENT (AIA) GUIDE

INTRODUCTION

What is an Algorithmic Impact Assessment?
An AIA is a systematic process to evaluate the potential impacts of automated decision systems on individuals and communities. It identifies risks, ensures fairness, and guides responsible AI deployment.

When is an AIA Required?
Conduct an AIA when:
- AI system makes decisions significantly affecting individuals
- High-risk applications (hiring, benefits, law enforcement, healthcare)
- Processing sensitive personal information
- Potential for discrimination or bias
- Public-facing government services

PHASE 1: SCOPING AND PREPARATION

Step 1: Define the AI System
□ Clearly describe what the AI does
□ Identify the problem it solves
□ Document why AI is appropriate
□ Specify alternatives considered

Step 2: Assemble the Assessment Team
Required expertise:
- Domain experts (understand the application area)
- AI/data scientists (understand the technology)
- Privacy and legal experts
- Ethics specialists
- Representatives from affected communities

Step 3: Stakeholder Identification
Who is affected by this AI?
- Direct users of the system
- People subject to AI decisions
- Communities impacted
- System operators and maintainers

PHASE 2: DATA AND ALGORITHM ANALYSIS

Step 4: Data Assessment
Training Data Analysis:
□ What data was used to train the AI?
□ Where did the data come from?
□ Is the data representative of the population?
□ What time period does it cover?
□ Are there known biases in the data?

Data Quality:
□ Completeness - missing values?
□ Accuracy - errors or outdated information?
□ Relevance - appropriate for the task?
□ Balance - proportional representation?

Protected Characteristics in Data:
□ Race/ethnicity
□ Gender identity
□ Age
□ Disability status
□ Socioeconomic status
□ Geographic location
□ Other sensitive attributes

Step 5: Algorithm Examination
□ Type of AI/ML algorithm used
□ How was the model trained?
□ What features does it use for decisions?
□ Are there proxy variables for protected characteristics?
□ How transparent/explainable is the model?

Step 6: Bias Testing
Conduct fairness testing across demographic groups:

Statistical Parity:
- Do different groups receive similar outcomes?
- Example: approval rates should be similar across races

Equal Opportunity:
- Do qualified individuals have equal chances?
- Example: among qualified applicants, approval rates are equal

Predictive Parity:
- Is accuracy similar across groups?
- Example: false positive rates are comparable

Document testing methodology and results:
_________________________________________

PHASE 3: IMPACT ASSESSMENT

Step 7: Individual Impact Analysis
How does the AI affect individuals?

Rights and Freedoms:
□ Privacy - collection, use, disclosure of personal info
□ Fairness - potential discrimination
□ Autonomy - decision-making authority
□ Due process - ability to challenge decisions

Opportunities and Access:
□ Employment opportunities
□ Access to services or benefits
□ Educational opportunities
□ Healthcare access

Step 8: Community Impact Analysis
How does the AI affect communities?

Social Impact:
□ Perpetuates or reduces inequality?
□ Affects marginalized communities differently?
□ Changes social dynamics or relationships?

Economic Impact:
□ Job displacement
□ Economic opportunity distribution
□ Resource allocation effects

Cultural Impact:
□ Respects diverse values and norms?
□ Accessibility for different languages/cultures?

Step 9: Unintended Consequences
Identify potential unintended effects:
□ Feedback loops (AI decisions influence future data)
□ Gaming the system (manipulation of AI)
□ Displacement of accountability
□ Technology dependence
□ Scope creep (expanded use beyond original purpose)

PHASE 4: MITIGATION AND SAFEGUARDS

Step 10: Risk Mitigation Strategies

Technical Mitigations:
□ Bias correction techniques
□ Fairness constraints in algorithms
□ Diverse and representative training data
□ Regular model retraining and updates
□ Explainability methods (LIME, SHAP, etc.)

Procedural Mitigations:
□ Human review of AI decisions (especially edge cases)
□ Clear appeal and complaint processes
□ Regular fairness audits
□ Diverse development teams
□ Community consultation and feedback

Policy Mitigations:
□ Clear usage policies and limitations
□ Transparency requirements
□ Accountability mechanisms
□ Regular impact assessments
□ Sunset clauses and reviews

Step 11: Human Oversight Design
Define appropriate level of human oversight:

High-Risk Decisions:
- Human-in-the-loop: Review every decision
- Clear override authority
- Extensive documentation

Medium-Risk Decisions:
- Human-on-the-loop: Monitor and sample review
- Exception handling by humans
- Regular quality checks

Low-Risk Decisions:
- Human-in-command: Strategic oversight
- Periodic audits
- Incident response capability

Step 12: Transparency Measures
What information will be disclosed?
□ Notification that AI is being used
□ Purpose and benefits of the AI
□ How decisions are made
□ What factors are considered
□ Rights to appeal or challenge
□ Contact information for questions

How will information be communicated?
□ Plain language explanations
□ Multiple formats (written, verbal, visual)
□ Accessible to diverse audiences
□ Proactive (before decisions) and reactive (upon request)

PHASE 5: MONITORING AND REVIEW

Step 13: Ongoing Monitoring Plan
What will be monitored?
□ Decision accuracy and quality
□ Fairness metrics across groups
□ User complaints and appeals
□ System performance and reliability
□ Emerging biases or drift

Monitoring frequency: __________________

Step 14: Review and Update Schedule
Regular reviews:
□ Quarterly performance reviews
□ Annual comprehensive impact assessment
□ Ad-hoc reviews when:
  - Significant changes to system
  - New populations affected
  - Complaints or concerns raised
  - Regulatory changes

PHASE 6: DOCUMENTATION AND REPORTING

Step 15: AIA Documentation
Complete AIA report should include:
□ Executive summary
□ System description and context
□ Data and algorithm analysis
□ Bias testing results
□ Impact assessment findings
□ Mitigation strategies
□ Monitoring and review plan
□ Stakeholder consultation records
□ Approvals and sign-offs

Step 16: Public Reporting
For high-risk public-sector AI:
□ Publish summary of AIA findings
□ Make available to affected communities
□ Regular progress updates
□ Transparency about changes

CONCLUSION

Final Checklist:
□ All risks identified and assessed
□ Mitigation strategies defined and implemented
□ Human oversight in place
□ Monitoring and review scheduled
□ Documentation complete
□ Stakeholders consulted
□ Approvals obtained
□ Public transparency measures implemented

The AIA is not a one-time exercise but an ongoing process of assessment, mitigation, and improvement throughout the AI system's lifecycle.`
        },
        {
            id: 'ai-governance-policy-template',
            title: 'AI Governance Policy Template',
            description: 'Template for developing organizational AI governance policies aligned with Ontario\'s AI directive principles.',
            type: 'template' as const,
            size: '8 pages',
            previewContent: `AI GOVERNANCE POLICY TEMPLATE

ORGANIZATION NAME: _____________________
POLICY EFFECTIVE DATE: __________________
POLICY OWNER: ___________________________
REVIEW FREQUENCY: Annual

1. PURPOSE AND SCOPE

1.1 Purpose
This policy establishes governance framework for responsible development, procurement, and deployment of Artificial Intelligence (AI) systems within [Organization Name].

1.2 Scope
This policy applies to:
□ All AI systems used for decision-making
□ All departments and business units
□ Employees, contractors, and vendors
□ Both procured and internally developed AI

1.3 Definitions
Artificial Intelligence (AI): Systems that perform tasks typically requiring human intelligence, including machine learning, natural language processing, and computer vision.

Automated Decision System: AI that makes or significantly influences decisions affecting individuals without meaningful human intervention.

High-Risk AI: Systems with significant impact on fundamental rights, access to services, or opportunities.

2. GUIDING PRINCIPLES

2.1 Benefit and Purpose
□ AI must be used to benefit stakeholders and the public
□ Clear articulation of benefits required
□ Regular evaluation of whether benefits are realized

2.2 Justified and Proportionate
□ "Problem-first" not "technology-first" approach
□ AI only when it's the most appropriate solution
□ Benefits must outweigh risks and costs
□ Consider simpler alternatives

2.3 Human-Centric Design
□ AI supports and augments human capabilities
□ Preserves human agency and dignity
□ Accessible and inclusive design
□ Respects user preferences and values

2.4 Transparency
□ Clear communication when AI is used
□ Understandable explanations of decisions
□ Documentation accessible to stakeholders
□ Regular reporting on AI systems

2.5 Safety, Security, and Privacy
□ Robust security controls
□ Privacy by design
□ Data minimization
□ Regular security assessments
□ Incident response procedures

2.6 Accountability and Responsibility
□ Clear assignment of responsibilities
□ Meaningful human oversight
□ Effective complaint and appeal processes
□ Regular audits and reviews
□ Documentation and audit trails

3. GOVERNANCE STRUCTURE

3.1 AI Governance Committee
Responsibilities:
- Review and approve high-risk AI deployments
- Oversee compliance with this policy
- Review incident reports and lessons learned
- Update policy as needed

Membership:
- Executive sponsor
- Privacy officer
- IT security lead
- Legal counsel
- Ethics advisor
- Business unit representatives

Meeting frequency: Quarterly (minimum)

3.2 AI Working Group
Responsibilities:
- Day-to-day AI governance activities
- Risk assessments and impact assessments
- Technical guidance and best practices
- Training and awareness programs

Membership:
- AI/Data science leads
- Privacy specialists
- Security specialists
- Domain experts as needed

3.3 Roles and Responsibilities

Executive Leadership:
- Set strategic direction for AI use
- Ensure adequate resources
- Approve high-risk AI systems

AI System Owners:
- Accountable for specific AI systems
- Ensure compliance with policy
- Manage risks and incidents
- Coordinate assessments and reviews

Data Stewards:
- Ensure data quality and integrity
- Manage data access and permissions
- Monitor data usage in AI systems

Privacy Officers:
- Review AI systems for privacy compliance
- Conduct Privacy Impact Assessments
- Advise on privacy requirements

IT Security:
- Assess and manage security risks
- Implement security controls
- Monitor for security incidents

Legal Counsel:
- Advise on legal and regulatory compliance
- Review contracts with AI vendors
- Support incident response

4. AI LIFECYCLE MANAGEMENT

4.1 Pre-Deployment Phase

Requirements and Planning:
□ Problem definition and objectives
□ Alternatives analysis
□ Stakeholder consultation
□ Resource requirements
□ Success criteria

Risk Assessment Required:
□ All AI systems: Basic risk screening
□ Medium-risk AI: Standard risk assessment
□ High-risk AI: Comprehensive Algorithmic Impact Assessment

Approvals Required:
□ Low-risk: Business unit approval
□ Medium-risk: AI Working Group approval
□ High-risk: AI Governance Committee approval

4.2 Development/Procurement Phase

For Procured AI Systems:
□ Vendor assessment (security, privacy, ethics)
□ Contractual requirements for transparency
□ Data processing agreements
□ Performance guarantees
□ Right to audit
□ Termination and data return provisions

For Internally Developed AI:
□ Diverse development teams
□ Representative training data
□ Bias testing during development
□ Security and privacy by design
□ Documentation standards
□ Code review and quality assurance

4.3 Deployment Phase

Pre-Deployment Checklist:
□ Risk assessment completed and approved
□ Technical testing passed
□ Bias and fairness testing completed
□ Security controls implemented
□ Privacy controls implemented
□ Human oversight procedures established
□ Monitoring systems in place
□ Communication materials prepared
□ Training completed for operators
□ Incident response procedures documented

4.4 Operations and Monitoring

Continuous Monitoring:
□ Performance metrics tracking
□ Fairness metrics across demographic groups
□ Accuracy and error rates
□ User feedback and complaints
□ Security and privacy incidents
□ Model drift detection

Regular Reviews:
□ Quarterly: Operational performance review
□ Annually: Comprehensive impact assessment
□ Ad-hoc: When significant changes or concerns

4.5 Decommissioning

When AI system is retired:
□ Data retention and disposal plan
□ Transition to alternative processes
□ Stakeholder communication
□ Lessons learned documentation
□ Final assessment report

5. FAIRNESS AND BIAS MANAGEMENT

5.1 Requirements
All AI systems must:
□ Use representative and diverse training data
□ Test for bias across protected characteristics
□ Document fairness testing methodology
□ Implement bias mitigation techniques
□ Conduct regular bias audits

5.2 Protected Characteristics
Test for disparate impact on:
□ Race and ethnicity
□ Gender identity
□ Age
□ Disability
□ Religion
□ Sexual orientation
□ Socioeconomic status
□ Geographic location

6. TRANSPARENCY AND EXPLAINABILITY

6.1 Transparency Requirements
Provide clear information about:
□ When AI is being used
□ Purpose of the AI system
□ How decisions are made
□ What factors influence decisions
□ Rights to appeal or challenge
□ How to provide feedback

6.2 Explainability Standards
□ Low-risk AI: Basic explanation of process
□ Medium-risk AI: Detailed explanation capability
□ High-risk AI: Comprehensive explainability with specific decision factors

7. HUMAN OVERSIGHT

7.1 Oversight Requirements
High-Risk AI:
- Human-in-the-loop for all significant decisions
- Override authority clearly defined
- Expert review capability

Medium-Risk AI:
- Human-on-the-loop monitoring
- Sample review processes
- Exception handling by humans

7.2 Override Procedures
□ Clear criteria for human override
□ Override authority identified
□ Override decisions documented
□ Analysis of override patterns

8. INCIDENT MANAGEMENT

8.1 Reportable AI Incidents
□ Significant bias or discrimination discovered
□ Privacy or security breaches
□ Substantial errors or failures
□ Unintended consequences
□ Public concerns or complaints

8.2 Incident Response
□ Immediate containment and mitigation
□ Investigation and root cause analysis
□ Notification to affected parties
□ Corrective actions
□ Lessons learned documentation

9. TRAINING AND AWARENESS

Required Training:
□ All employees: AI awareness and ethics
□ AI system operators: System-specific training
□ Decision-makers: AI oversight and governance
□ Developers: Responsible AI development

10. COMPLIANCE AND ENFORCEMENT

10.1 Monitoring Compliance
□ Regular audits of AI systems
□ Compliance reporting to Governance Committee
□ Third-party assessments for high-risk systems

10.2 Non-Compliance
Consequences may include:
- Additional oversight requirements
- Suspension of AI system
- Retraining requirements
- Disciplinary action

11. POLICY REVIEW AND UPDATES

This policy will be reviewed annually or when:
□ Significant regulatory changes
□ Major incidents occur
□ Technology evolves significantly
□ Organizational changes

APPROVAL

Policy Owner: ___________________________
Date: __________________________________

Executive Sponsor: ______________________
Date: __________________________________

Legal Review: ___________________________
Date: __________________________________`
        }
    ];

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
            title: "Federal AI Regulation: Artificial Intelligence and Data Act (AIDA)",
            content: [
                "Canada's Artificial Intelligence and Data Act (AIDA), part of Bill C-27, represents the first comprehensive federal framework for regulating artificial intelligence systems across Canada. This legislation establishes baseline requirements for AI systems operating in federally regulated sectors and international commerce.",
                "",
                "**Legislative Context:**",
                "• Introduced as Part 3 of Bill C-27 (Digital Charter Implementation Act, 2022)",
                "• Complements the proposed Consumer Privacy Protection Act (CPPA) for data governance",
                "• Establishes federal baseline while allowing provinces like Ontario to maintain additional requirements",
                "• Aligns with international AI governance frameworks including EU AI Act principles",
                "",
                "**Scope and Application:**",
                "• Applies to high-impact AI systems that make predictions, recommendations, or decisions about individuals",
                "• Covers systems that could cause significant harm to health, safety, rights, or economic interests",
                "• Regulates both public and private sector AI system operators in federal jurisdiction",
                "• Includes extraterritorial application for systems affecting Canadians",
                "",
                "**Key Requirements for High-Impact AI Systems:**",
                "• **Risk Assessment**: Conduct and document comprehensive impact assessments before deployment",
                "• **Mitigation Measures**: Implement controls to prevent, reduce, or eliminate risks of harm or biased output",
                "• **Monitoring Obligations**: Establish systems to monitor AI performance and detect biased output in real-time",
                "• **Record-Keeping**: Maintain detailed records of AI system development, testing, and operation",
                "• **Transparency**: Provide clear information to affected individuals about AI system use and decision-making",
                "• **Incident Reporting**: Report significant incidents and harmful outcomes to the AI Commissioner",
                "",
                "**Governance Structure:**",
                "• New AI and Data Commissioner position with regulatory and enforcement powers",
                "• Power to conduct audits and investigations of AI systems",
                "• Authority to issue compliance orders and administrative monetary penalties",
                "• Collaboration with provincial regulators including Ontario's IPC",
                "",
                "**Prohibited Practices:**",
                "• Use of AI systems in ways that result in substantial harm",
                "• Deployment of biased AI systems without adequate mitigation measures",
                "• Failure to conduct required impact assessments for high-impact systems",
                "• Making materially false or misleading representations about AI systems",
                "",
                "**Penalties and Enforcement:**",
                "• Administrative monetary penalties up to $10 million or 3% of gross global revenue",
                "• Criminal offenses for reckless deployment causing serious harm",
                "• Potential imprisonment for severe violations",
                "• Private right of action for individuals harmed by AI systems",
                "",
                "**Coordination with Ontario Requirements:**",
                "• Ontario public sector must comply with both AIDA and Ontario's AI Directive",
                "• Ontario standards generally exceed AIDA baseline requirements",
                "• Provincial agencies should ensure compliance with the more stringent standard",
                "• Federal-provincial coordination on enforcement and incident reporting"
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

    // Convert content sections into slides for click-through navigation with visual learning elements
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
                
                {/* Add visual learning elements based on section */}
                {index === 0 && (
                    <div className="mt-8 space-y-6">
                        <InfoGraphic
                            title="Ontario's Responsible Use of AI Directive - Key Requirements"
                            layout="grid"
                            sections={[
                                {
                                    icon: <ConceptIcon className="w-8 h-8 text-blue-600" />,
                                    title: "Transparency",
                                    content: [
                                        "Disclose AI use to affected individuals",
                                        "Explain how decisions are made",
                                        "Provide information about data sources",
                                        "Document AI system capabilities and limitations"
                                    ],
                                    color: "blue"
                                },
                                {
                                    icon: <AssessmentIcon className="w-8 h-8 text-green-600" />,
                                    title: "Risk Assessment",
                                    content: [
                                        "Conduct impact assessments before deployment",
                                        "Identify and document potential harms",
                                        "Implement mitigation strategies",
                                        "Regular reassessment of risks"
                                    ],
                                    color: "green"
                                },
                                {
                                    icon: <ImplementationIcon className="w-8 h-8 text-purple-600" />,
                                    title: "Accountability",
                                    content: [
                                        "Assign clear ownership and governance",
                                        "Establish oversight mechanisms",
                                        "Maintain audit trails and documentation",
                                        "Create appeal and review processes"
                                    ],
                                    color: "purple"
                                },
                                {
                                    icon: <VisualFrameworkIcon className="w-8 h-8 text-orange-600" />,
                                    title: "Human Oversight",
                                    content: [
                                        "Maintain meaningful human involvement",
                                        "Enable human override of AI decisions",
                                        "Ensure human review for high-impact decisions",
                                        "Train staff on AI system operation"
                                    ],
                                    color: "orange"
                                }
                            ]}
                        />
                        
                        <InteractiveScenario
                            title="AI Directive Compliance Scenario"
                            scenario="Your municipal government is considering implementing an AI system to prioritize building permit applications based on complexity, completeness, and workload. The system would recommend which applications to process first, but final decisions remain with human staff."
                            considerations={[
                                "Does this fall under the Responsible Use of AI Directive?",
                                "What transparency requirements apply?",
                                "What risk assessment is needed?",
                                "How should accountability be structured?",
                                "What human oversight is appropriate?"
                            ]}
                            solution="This AI system falls under the Directive as it's an automated decision-support tool in a government context. Required compliance steps: (1) Transparency: Inform applicants that AI assists in prioritization; explain the criteria used; provide contact for questions, (2) Risk Assessment: Conduct Algorithmic Impact Assessment (AIA) before deployment; evaluate fairness across different applicant types; assess potential for bias in training data, (3) Accountability: Designate AI system owner; establish governance committee; document decision-making logic; create appeal process, (4) Human Oversight: Maintain human review of AI recommendations; enable staff to override prioritization; train staff on system operation and limitations; monitor system performance regularly."
                            learningPoints={[
                                "AI systems supporting government decisions require compliance even if humans make final decisions",
                                "Transparency must be proactive, not just responsive to requests",
                                "Risk assessments should be completed before deployment, not after",
                                "Human oversight means more than just having a human present - it requires meaningful involvement"
                            ]}
                        />
                    </div>
                )}
                
                {index === 1 && (
                    <div className="mt-8 space-y-6">
                        <ConceptMap
                            title="Six Principles of Responsible AI"
                            centralConcept="Responsible AI Use"
                            connections={[
                                {
                                    concept: "Fairness",
                                    relationship: "ensures",
                                    description: "Equitable treatment, bias mitigation, discrimination prevention"
                                },
                                {
                                    concept: "Accountability",
                                    relationship: "establishes",
                                    description: "Clear ownership, governance, audit trails, review mechanisms"
                                },
                                {
                                    concept: "Transparency",
                                    relationship: "enables",
                                    description: "Disclosure of AI use, explainability, documentation"
                                },
                                {
                                    concept: "Safety & Security",
                                    relationship: "protects",
                                    description: "Robust systems, adversarial resistance, privacy safeguards"
                                },
                                {
                                    concept: "Inclusiveness",
                                    relationship: "considers",
                                    description: "Accessibility, diverse stakeholder input, universal design"
                                },
                                {
                                    concept: "Privacy",
                                    relationship: "respects",
                                    description: "Data minimization, consent, purpose limitation, security"
                                }
                            ]}
                        />
                        
                        <InteractiveScenario
                            title="Balancing Competing Principles"
                            scenario="A healthcare AI system achieves 95% accuracy in predicting patient readmission risk, but the prediction model is a complex neural network that provides limited explainability. Transparency would be improved by using a simpler model, but accuracy would drop to 88%."
                            considerations={[
                                "How do you balance transparency with performance?",
                                "What does 'explainability' really mean for different stakeholders?",
                                "How much transparency is 'enough'?",
                                "Can you achieve transparency without sacrificing performance?",
                                "What are the consequences of lower accuracy in this context?"
                            ]}
                            solution="Balancing approach: (1) Use the more accurate model for better patient outcomes (safety principle), but implement multiple transparency measures: model cards documenting performance metrics, SHAP values or LIME for individual prediction explanations, regular validation against known health risk factors, (2) Create tiered transparency: detailed technical documentation for clinical staff, simplified explanations for patients, compliance documentation for regulators, (3) Implement strong governance: clinical oversight committee, regular bias audits, patient appeal process, continuous monitoring for fairness and accuracy, (4) Consider hybrid approach: use complex model for prediction but validate predictions against interpretable criteria, (5) Document trade-offs transparently in risk assessment."
                            learningPoints={[
                                "Responsible AI principles can sometimes conflict and require careful balancing",
                                "Transparency doesn't always mean complete explainability - appropriate transparency varies by stakeholder",
                                "Performance and explainability trade-offs should be documented and justified",
                                "Multiple transparency mechanisms can compensate for black-box models"
                            ]}
                        />
                    </div>
                )}
                
                {index === 2 && (
                    <div className="mt-8 space-y-6">
                        <ProcessFlow
                            title="AI Risk Management Lifecycle"
                            steps={[
                                {
                                    title: "Identify",
                                    description: "Catalog AI systems and document their functions, stakeholders, and data sources",
                                    status: 'completed'
                                },
                                {
                                    title: "Assess",
                                    description: "Evaluate risks including bias, privacy, security, and societal impacts",
                                    status: 'completed'
                                },
                                {
                                    title: "Prioritize",
                                    description: "Rank risks by likelihood and impact to guide mitigation efforts",
                                    status: 'current'
                                },
                                {
                                    title: "Mitigate",
                                    description: "Implement controls, safeguards, and governance measures",
                                    status: 'pending'
                                },
                                {
                                    title: "Monitor",
                                    description: "Continuously track system performance and emerging risks",
                                    status: 'pending'
                                },
                                {
                                    title: "Review",
                                    description: "Periodically reassess risks and update controls as systems and context evolve",
                                    status: 'pending'
                                }
                            ]}
                        />
                        
                        <ComparisonTable
                            title="AI Risk Categories"
                            columns={["Risk Type", "Examples", "Mitigation Strategies"]}
                            rows={[
                                {
                                    label: "Technical Risks",
                                    values: ["Model accuracy, robustness, adversarial attacks", "Overfitting, data poisoning, model drift", "Validation testing, monitoring, red teaming"],
                                    highlight: true
                                },
                                {
                                    label: "Fairness Risks",
                                    values: ["Bias, discrimination, disparate impact", "Training data bias, proxy discrimination", "Bias audits, fairness metrics, diverse data"]
                                },
                                {
                                    label: "Privacy Risks",
                                    values: ["Re-identification, data leakage, inference", "Model inversion, membership inference", "Differential privacy, data minimization, access controls"],
                                    highlight: true
                                },
                                {
                                    label: "Societal Risks",
                                    values: ["Automation bias, job displacement, trust erosion", "Over-reliance on AI, accessibility barriers", "Human oversight, transparency, stakeholder engagement"]
                                }
                            ]}
                        />
                    </div>
                )}
                
                {index === 3 && (
                    <div className="mt-8 space-y-6">
                        <ProcessFlow
                            title="Algorithmic Impact Assessment (AIA) Process"
                            steps={[
                                {
                                    title: "Scoping",
                                    description: "Define AI system scope, stakeholders, and assessment objectives",
                                    status: 'completed'
                                },
                                {
                                    title: "Data Assessment",
                                    description: "Evaluate data quality, representativeness, and potential biases",
                                    status: 'completed'
                                },
                                {
                                    title: "Impact Analysis",
                                    description: "Identify potential impacts on individuals, groups, and society",
                                    status: 'current'
                                },
                                {
                                    title: "Risk Rating",
                                    description: "Calculate overall risk level based on impact and likelihood",
                                    status: 'pending'
                                },
                                {
                                    title: "Mitigation Planning",
                                    description: "Develop strategies to address identified risks and impacts",
                                    status: 'pending'
                                },
                                {
                                    title: "Documentation",
                                    description: "Create comprehensive AIA report for governance and accountability",
                                    status: 'pending'
                                }
                            ]}
                        />
                        
                        <InfoGraphic
                            title="AIA Impact Levels"
                            layout="flow"
                            sections={[
                                {
                                    icon: <span className="text-2xl">🟢</span>,
                                    title: "Level 1: Low Impact",
                                    content: [
                                        "Minimal decisions or recommendations",
                                        "Limited personal information involved",
                                        "No significant consequences for individuals",
                                        "Simple documentation requirements"
                                    ],
                                    color: "green"
                                },
                                {
                                    icon: <span className="text-2xl">🟡</span>,
                                    title: "Level 2: Medium Impact",
                                    content: [
                                        "Moderate influence on decisions",
                                        "Some personal information processed",
                                        "Potential for limited consequences",
                                        "Standard AIA process required"
                                    ],
                                    color: "yellow"
                                },
                                {
                                    icon: <span className="text-2xl">🟠</span>,
                                    title: "Level 3: High Impact",
                                    content: [
                                        "Significant automated decisions",
                                        "Sensitive personal information",
                                        "Substantial impact on rights/opportunities",
                                        "Comprehensive assessment needed"
                                    ],
                                    color: "orange"
                                },
                                {
                                    icon: <span className="text-2xl">🔴</span>,
                                    title: "Level 4: Very High Impact",
                                    content: [
                                        "Critical automated decisions",
                                        "Fundamental rights affected",
                                        "Potential for serious harm",
                                        "Extensive governance & oversight"
                                    ],
                                    color: "red"
                                }
                            ]}
                        />
                        
                        <InteractiveScenario
                            title="Conducting an AIA"
                            scenario="Your organization is implementing an AI system to screen job applications and rank candidates for interviews. The system analyzes resumes, cover letters, and online professional profiles to predict candidate success."
                            considerations={[
                                "What impact level should this system be rated?",
                                "What data quality issues might exist?",
                                "What fairness concerns should be examined?",
                                "What transparency measures are needed?",
                                "What human oversight is appropriate?"
                            ]}
                            solution="AIA approach for hiring AI: (1) Impact Level: HIGH - hiring decisions significantly affect individuals' employment opportunities and livelihoods, (2) Data Assessment: Examine historical hiring data for bias (gender, age, ethnicity); Ensure training data represents desired candidate diversity; Check for proxy variables that correlate with protected characteristics, (3) Fairness Analysis: Test for disparate impact across demographic groups; Validate that screening criteria relate to actual job performance; Monitor for systematic bias against certain groups, (4) Transparency: Inform candidates about AI use in screening; Explain key factors in ranking decisions; Provide appeal mechanism for rejected candidates, (5) Human Oversight: Require human review of all AI-ranked candidates before final decisions; Train HR staff on AI system limitations and bias risks; Prohibit automated rejection without human review, (6) Ongoing Monitoring: Regular fairness audits comparing outcomes across demographics; Continuous validation of prediction accuracy; Annual AIA updates."
                            learningPoints={[
                                "Hiring AI is typically high-impact due to significant consequences for individuals",
                                "Historical hiring data often contains bias that AI can perpetuate",
                                "Proxy variables (e.g., school names, hobbies) can introduce indirect discrimination",
                                "Transparency in hiring AI builds trust and enables accountability"
                            ]}
                        />
                    </div>
                )}
                
                {index === 4 && (
                    <div className="mt-8 space-y-6">
                        <ConceptMap
                            title="AI Governance Framework"
                            centralConcept="AI Governance"
                            connections={[
                                {
                                    concept: "Policy & Standards",
                                    relationship: "defines",
                                    description: "Rules, principles, requirements, compliance criteria"
                                },
                                {
                                    concept: "Roles & Responsibilities",
                                    relationship: "assigns",
                                    description: "AI ethics officer, system owners, oversight committees"
                                },
                                {
                                    concept: "Risk Management",
                                    relationship: "implements",
                                    description: "Assessment, mitigation, monitoring, continuous improvement"
                                },
                                {
                                    concept: "Documentation",
                                    relationship: "maintains",
                                    description: "Model cards, AIAs, audit logs, decisions records"
                                },
                                {
                                    concept: "Oversight Mechanisms",
                                    relationship: "ensures",
                                    description: "Ethics review boards, audits, appeals, external review"
                                }
                            ]}
                        />
                        
                        <InfoGraphic
                            title="AI Governance Roles"
                            layout="grid"
                            sections={[
                                {
                                    icon: <LearningPathIcon className="w-8 h-8 text-blue-600" />,
                                    title: "AI Ethics Officer",
                                    content: [
                                        "Develops and maintains AI policies",
                                        "Reviews high-impact AI proposals",
                                        "Chairs AI ethics committee",
                                        "Coordinates training programs"
                                    ],
                                    color: "blue"
                                },
                                {
                                    icon: <ImplementationIcon className="w-8 h-8 text-green-600" />,
                                    title: "System Owners",
                                    content: [
                                        "Accountable for specific AI systems",
                                        "Conducts regular risk assessments",
                                        "Ensures compliance with policies",
                                        "Responds to incidents and appeals"
                                    ],
                                    color: "green"
                                },
                                {
                                    icon: <AssessmentIcon className="w-8 h-8 text-purple-600" />,
                                    title: "Ethics Review Board",
                                    content: [
                                        "Reviews high-risk AI proposals",
                                        "Provides independent oversight",
                                        "Evaluates fairness and ethics",
                                        "Advises on complex cases"
                                    ],
                                    color: "purple"
                                },
                                {
                                    icon: <VisualFrameworkIcon className="w-8 h-8 text-orange-600" />,
                                    title: "Internal Audit",
                                    content: [
                                        "Verifies compliance with policies",
                                        "Audits AI system performance",
                                        "Tests for bias and fairness",
                                        "Reports to senior management"
                                    ],
                                    color: "orange"
                                }
                            ]}
                        />
                    </div>
                )}
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
                    <div className={`progress-connector ${(currentSection === 'quiz' || currentSection === 'resources') ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'quiz' ? 'current' : (currentSection === 'resources' ? 'completed' : 'pending')}`}>
                        2
                    </div>
                    <div className={`progress-connector ${currentSection === 'resources' ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'resources' ? 'current' : 'pending'}`}>
                        3
                    </div>
                    <div className="ml-4 text-sm text-text-secondary">
                        {currentSection === 'content' ? 'Learning Content' : 
                         currentSection === 'quiz' ? 'Knowledge Check' : 'Resources & Downloads'}
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
                            
                            {/* Progress Visualizer */}
                            <ProgressVisualizer
                                title="Module 3 Learning Path"
                                currentStep={currentSection === 'content' ? 1 : currentSection === 'quiz' ? 2 : 3}
                                totalSteps={3}
                                stepLabels={['Master Content', 'Practice Assessment', 'Access Resources']}
                                description="Follow this structured path to master AI governance and responsible AI use"
                            />
                            
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

                        {/* Bloom's Taxonomy Learning Objectives */}
                        {currentSection === 'content' && (() => {
                            const moduleObjectives = getModuleLearningObjectives(3);
                            if (!moduleObjectives) return null;
                            return (
                                <>
                                    <LearningObjectivesDisplay
                                        moduleId={3}
                                        objectives={moduleObjectives.courseLevel}
                                        type="course"
                                        className="mt-8"
                                    />
                                    <LearningObjectivesDisplay
                                        moduleId={3}
                                        objectives={moduleObjectives.lessonLevel}
                                        type="lesson"
                                        className="mt-6"
                                    />
                                    <BloomsTaxonomyLegend className="mt-6" />
                                </>
                            );
                        })()}

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
                        ) : currentSection === 'quiz' ? (
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
                                
                                <div className="mt-6 flex gap-4">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary"
                                    >
                                        ← Back to Content
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSection('resources')}
                                        className="btn-secondary"
                                    >
                                        📚 View Resources
                                    </button>
                                </div>
                            </div>
                        ) : currentSection === 'resources' ? (
                            /* Resources Section */
                            <div className="resources-section mt-8">
                                <DownloadableResources 
                                    resources={sampleResources}
                                    moduleTitle="Module 3 Resources"
                                />

                                <div className="text-center mt-6 flex gap-4 justify-center">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary py-2 px-6"
                                    >
                                        ← Back to Content
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-secondary py-2 px-6"
                                    >
                                        🎓 Take Assessment
                                    </button>
                                </div>
                            </div>
                        ) : null}
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