/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import QuizComponent from '../common/QuizComponent';
import DownloadableResources from '../common/DownloadableResources';
import ResourcesPanel from '../resources/ResourcesPanel';
import { 
    ProcessFlow, 
    ComparisonTable, 
    InfoGraphic, 
    InteractiveScenario, 
    ProgressVisualizer,
    ConceptMap 
} from '../common/VisualLearningElements';
import { ConceptIcon, ScenarioIcon, ImplementationIcon, InteractiveIcon } from '../icons';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module1: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz' | 'resources'>('content');
    
    const sampleResources = [
        {
            id: 'pipeda-checklist',
            title: 'PIPEDA Compliance Checklist',
            description: 'A comprehensive checklist to ensure your organization meets all PIPEDA requirements for personal information handling.',
            type: 'checklist' as const,
            size: '2 pages',
            previewContent: `PIPEDA COMPLIANCE CHECKLIST

□ PURPOSE IDENTIFICATION
  □ Purposes identified before or at time of collection
  □ Purposes documented in privacy policy
  □ Staff trained on collection purposes
  □ Purposes limited to those identified

□ CONSENT MANAGEMENT
  □ Appropriate consent obtained (express/implied)
  □ Consent withdrawal process established
  □ Consent records maintained
  □ Consent refreshed when purposes change

□ LIMITING COLLECTION
  □ Only necessary information collected
  □ Collection methods documented
  □ Fair and lawful collection practices
  □ Source of information identified

□ LIMITING USE AND DISCLOSURE
  □ Use limited to identified purposes
  □ Disclosure limited to identified purposes
  □ Third-party agreements in place
  □ Staff access controls implemented

□ ACCURACY
  □ Information accuracy procedures
  □ Correction process established
  □ Regular data quality reviews
  □ Individual correction rights communicated

□ SAFEGUARDS
  □ Security safeguards implemented
  □ Staff training on safeguards
  □ Regular security assessments
  □ Incident response procedures

□ OPENNESS
  □ Privacy policy published
  □ Contact information provided
  □ Information practices explained
  □ Policy regularly updated

□ INDIVIDUAL ACCESS
  □ Access request process established
  □ Response timeframes defined
  □ Fee structure documented
  □ Appeal process communicated

□ CHALLENGING COMPLIANCE
  □ Complaint process established
  □ Investigation procedures defined
  □ Resolution tracking system
  □ Privacy officer designated`
        },
        {
            id: 'mfippa-template',
            title: 'MFIPPA Privacy Impact Assessment Template',
            description: 'Ready-to-use template for conducting Privacy Impact Assessments under MFIPPA requirements.',
            type: 'template' as const,
            size: '8 pages',
            previewContent: `PRIVACY IMPACT ASSESSMENT TEMPLATE (MFIPPA)

SECTION 1: PROJECT OVERVIEW
Project Name: ________________________
Department: ___________________________
Project Manager: ______________________
Date: _________________________________

1.1 Project Description
Describe the project, system, or initiative requiring this PIA:
________________________________________________

1.2 Project Objectives
What are the main goals of this project?
________________________________________________

SECTION 2: PERSONAL INFORMATION ANALYSIS
2.1 Type of Personal Information
□ Names and contact information
□ Financial information
□ Health information
□ Employment information
□ Other: ______________________________

2.2 Collection Details
How will personal information be collected?
□ Online forms  □ Paper forms  □ Phone  □ Email
□ Third parties  □ Other: _______________

2.3 Use and Disclosure
How will the information be used?
________________________________________________

Will information be shared? If yes, with whom?
________________________________________________

SECTION 3: PRIVACY RISKS
3.1 Risk Assessment
Identify potential privacy risks:
High Risk: ____________________________
Medium Risk: __________________________
Low Risk: _____________________________

3.2 Risk Mitigation
For each identified risk, describe mitigation measures:
________________________________________________

SECTION 4: SAFEGUARDS
4.1 Technical Safeguards
□ Encryption  □ Access controls  □ Audit logs
□ Secure transmission  □ Other: ___________

4.2 Administrative Safeguards
□ Staff training  □ Privacy policies
□ Regular audits  □ Other: ______________

SECTION 5: COMPLIANCE REQUIREMENTS
5.1 Legal Authority
What legal authority permits this collection?
________________________________________________

5.2 Retention Schedule
How long will information be retained?
________________________________________________

5.3 Disposal Method
How will information be securely disposed of?
________________________________________________

SECTION 6: SIGN-OFF
Privacy Officer: _______________________
Date: ________________________________
Department Head: ______________________
Date: ________________________________`
        },
        {
            id: 'breach-response-guide',
            title: 'Privacy Breach Response Guide',
            description: 'Step-by-step guide for responding to privacy breaches under Ontario privacy legislation.',
            type: 'guide' as const,
            size: '12 pages',
            previewContent: `PRIVACY BREACH RESPONSE GUIDE

IMMEDIATE RESPONSE (0-24 hours)

Step 1: CONTAIN THE BREACH
□ Stop the unauthorized access/disclosure
□ Secure the affected systems/data
□ Preserve evidence
□ Document initial findings

Step 2: ASSESS THE SCOPE
□ What information was involved?
□ How many individuals affected?
□ Who had unauthorized access?
□ When did the breach occur?

Step 3: INITIAL NOTIFICATIONS
□ Notify supervisor/management
□ Contact Privacy Officer
□ Consider law enforcement (if criminal)
□ Initial report to Commissioner (Bill 194)

SHORT-TERM RESPONSE (1-7 days)

Step 4: DETAILED INVESTIGATION
□ Interview relevant staff
□ Review system logs
□ Determine root cause
□ Document timeline of events

Step 5: RISK ASSESSMENT
□ Assess risk of harm to individuals
□ Consider identity theft potential
□ Evaluate reputational impact
□ Document risk factors

Step 6: NOTIFICATION DECISIONS
□ Notify affected individuals (if required)
□ Media notification (if warranted)
□ Update Commissioner report
□ Stakeholder communications

LONG-TERM RESPONSE (1-4 weeks)

Step 7: REMEDIATION
□ Implement corrective measures
□ Provide credit monitoring (if needed)
□ Update policies/procedures
□ Additional staff training

Step 8: MONITORING
□ Monitor for further incidents
□ Track effectiveness of measures
□ Follow up with affected individuals
□ Regular status updates

Step 9: DOCUMENTATION
□ Complete incident report
□ Lessons learned document
□ Policy updates required
□ Final Commissioner report

PREVENTION MEASURES
□ Regular security assessments
□ Staff privacy training
□ Incident response drills
□ Policy review and updates
□ Technology safeguards audit`
        }
    ];
    
    const allQuestions: QuizQuestions = {
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
            type: 'scenario',
            question: "Your municipal office is implementing a new citizen portal that will collect names, addresses, phone numbers, and email addresses for service requests. The IT vendor suggests using a US-based cloud service that offers better performance and lower costs. What should be your approach to this situation?",
            answer: 'scenario',
            options: {},
            scenarioAnswer: `Given MFIPPA Section 30.1 requirements, here's the recommended approach:

1. **Default Position**: Decline the US-based cloud service as MFIPPA requires personal information to be stored and accessed only in Canada.

2. **Alternative Solutions**:
   - Request Canadian-based hosting options from the vendor
   - Explore Canadian cloud providers (AWS Canada, Microsoft Azure Canada, etc.)
   - Consider hybrid solutions with Canadian data residency

3. **If US Service is Essential**:
   - Obtain written consent from individuals (difficult for municipal services)
   - Seek Commissioner authorization (lengthy process)
   - Ensure robust contractual safeguards and data processing agreements
   - Implement additional security measures

4. **Documentation**: Maintain detailed records of the decision-making process and any risk assessments conducted.

The safest approach is to insist on Canadian data residency to ensure full MFIPPA compliance.`,
            explanation: "This scenario highlights the practical challenges of balancing operational efficiency with privacy law compliance under MFIPPA."
        },
        q3: {
            type: 'text-input',
            question: "Explain the key differences between PIPEDA and MFIPPA in terms of scope and application. Provide at least three specific differences.",
            answer: 'text-input',
            options: {},
            sampleAnswer: `Key differences between PIPEDA and MFIPPA:

1. **Scope of Application**:
   - PIPEDA: Applies to private sector organizations in federal jurisdiction and provinces without substantially similar legislation
   - MFIPPA: Applies specifically to Ontario municipalities and local government bodies

2. **Type of Information Covered**:
   - PIPEDA: Focuses on personal information collected during commercial activities
   - MFIPPA: Covers both personal information and general government records/information

3. **Access Rights**:
   - PIPEDA: Provides access rights to personal information held by organizations
   - MFIPPA: Provides broader access to information rights including general government records, not just personal information

4. **Cross-Border Restrictions**:
   - PIPEDA: No specific geographic restrictions on data storage
   - MFIPPA: Section 30.1 explicitly restricts storage and access of personal information outside Canada

5. **Enforcement**:
   - PIPEDA: Enforced by the Privacy Commissioner of Canada
   - MFIPPA: Enforced by the Information and Privacy Commissioner of Ontario`,
            explanation: "Understanding these differences is crucial for organizations that may be subject to both acts or municipal employees working with personal information."
        },
        q4: {
            type: 'image-based',
            question: "Based on the privacy breach notification flowchart shown, what is the first step an organization should take when a potential breach is discovered?",
            answer: 'a',
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center", // Placeholder - would be actual flowchart
            options: {
                a: "Contain the breach and assess the scope",
                b: "Notify the Privacy Commissioner immediately",
                c: "Inform all affected individuals",
                d: "Document the incident in detail"
            },
            explanation: "The immediate priority is containment to prevent further unauthorized access, followed by scope assessment to understand the extent of the breach."
        },
        q5: {
            type: 'drag-drop',
            question: "Drag each privacy protection measure to the appropriate category under MFIPPA compliance:",
            answer: 'drag-drop',
            options: {},
            dragItems: [
                { id: 'item1', content: 'Regular staff training', correctZone: 'Zone A' },
                { id: 'item2', content: 'Data encryption', correctZone: 'Zone B' },
                { id: 'item3', content: 'Access controls', correctZone: 'Zone B' },
                { id: 'item4', content: 'Privacy policies', correctZone: 'Zone A' },
                { id: 'item5', content: 'Secure disposal', correctZone: 'Zone C' },
                { id: 'item6', content: 'Retention schedules', correctZone: 'Zone C' }
            ],
            explanation: "Zone A: Administrative Safeguards, Zone B: Technical Safeguards, Zone C: Physical Safeguards. All three categories are essential for comprehensive privacy protection."
        },
        q6: { 
            question: "When is a Privacy Impact Assessment (PIA) required under MFIPPA?", 
            answer: 'c', 
            options: { 
                a: "Only for large technology implementations", 
                b: "Only when specifically requested by citizens", 
                c: "For any new or changed collection, use, or disclosure of personal information" 
            },
            explanation: "PIAs are required whenever there are new or changed practices involving personal information to assess and mitigate privacy risks."
        }
    };

    const quiz = useQuiz(allQuestions, 8);

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
            title: "PHIPA - Personal Health Information Protection Act",
            content: [
                "The Personal Health Information Protection Act (PHIPA) is Ontario's health privacy legislation that governs the collection, use, and disclosure of personal health information by health information custodians.",
                "",
                "**Scope and Application:**",
                "• Applies to health information custodians (hospitals, clinics, pharmacies, health professionals)",
                "• Covers personal health information in any form (electronic, paper, oral)",
                "• Regulates both public and private healthcare providers in Ontario",
                "• Includes health service providers, researchers, and support organizations",
                "",
                "**Key PHIPA Principles:**",
                "• **Circle of Care**: Health information sharing within healthcare teams for treatment",
                "• **Knowledgeable Consent**: Patients must understand what they're consenting to",
                "• **Minimal Disclosure**: Only necessary information should be shared",
                "• **Purpose Limitation**: Use information only for intended healthcare purposes",
                "",
                "**Collection, Use, and Disclosure Rules:**",
                "• Health information custodians may collect, use, and disclose personal health information for:",
                "  - Providing healthcare to the individual",
                "  - Payment for healthcare services",
                "  - Healthcare operations and quality improvement",
                "  - Plan administration by health insurers",
                "• Express consent required for purposes outside the circle of care",
                "• Implied consent allowed within circle of care for treatment purposes",
                "",
                "**Individual Rights under PHIPA:**",
                "• Right to access personal health information",
                "• Right to request correction of inaccurate information", 
                "• Right to request restrictions on use and disclosure",
                "• Right to file complaints with the Information and Privacy Commissioner",
                "• Right to withdraw consent (with some limitations)",
                "",
                "**PHIPA vs PIPEDA - Key Differences:**",
                "• PHIPA applies specifically to health information in Ontario",
                "• PIPEDA applies to private sector generally across Canada",
                "• PHIPA has specialized provisions for healthcare settings",
                "• Different consent models (circle of care vs general consent requirements)"
            ]
        },
        {
            title: "FIPPA - Freedom of Information and Protection of Privacy Act",
            content: [
                "The Freedom of Information and Protection of Privacy Act (FIPPA) is Ontario's provincial privacy legislation governing ministries, Crown agencies, and other provincial institutions.",
                "",
                "**Scope and Application:**",
                "• Applies to provincial government ministries and departments",
                "• Covers Crown agencies, boards, commissions, and corporations",
                "• Includes hospitals, school boards, and universities",
                "• Excludes municipalities (covered under MFIPPA) and private sector",
                "",
                "**Dual Purpose Framework:**",
                "FIPPA serves two main functions:",
                "• **Access to Information**: Public right to government records",
                "• **Privacy Protection**: Controls over personal information handling",
                "",
                "**Privacy Protection Provisions:**",
                "• **Collection Limitations (s.38)**: Personal information must be collected directly from individuals unless exceptions apply",
                "• **Use Restrictions (s.39)**: Use only for original purpose or consistent uses",
                "• **Disclosure Controls (s.40-42)**: Limited circumstances for disclosure without consent",
                "• **Accuracy Requirements (s.45)**: Maintain accurate, complete, and up-to-date records",
                "",
                "**Access to Information Provisions:**",
                "• General right of access to government records",
                "• Subject to specific exemptions (cabinet confidences, law enforcement, etc.)",
                "• 30-day response timeline for access requests",
                "• Independent review by Information and Privacy Commissioner",
                "",
                "**Key Differences from MFIPPA:**",
                "• FIPPA covers provincial institutions, MFIPPA covers municipal",
                "• Similar privacy protection principles but different institutional scope",
                "• Both include access to information and privacy protection components",
                "• Different exemption categories reflecting provincial vs municipal contexts"
            ]
        },
        {
            title: "Federal vs Provincial Privacy Law Jurisdiction",
            content: [
                "Understanding when federal vs provincial privacy laws apply is crucial for compliance in Ontario's complex privacy landscape.",
                "",
                "**Federal Privacy Laws Apply When:**",
                "• **PIPEDA**: Private sector organizations engaged in commercial activities",
                "• **Privacy Act**: Federal government institutions and departments",
                "• **Interprovincial/international activities**: Cross-border data flows and commerce",
                "• **Federal sector organizations**: Banks, telecommunications, airlines, railways",
                "• **Federal employees**: Personal information of federal government workers",
                "",
                "**Provincial Privacy Laws Apply When:**",
                "• **FIPPA**: Ontario government ministries, agencies, hospitals, universities",
                "• **MFIPPA**: Ontario municipalities, local agencies, and boards",
                "• **PHIPA**: Health information custodians in Ontario healthcare system",
                "• **Intra-provincial activities**: Within Ontario boundaries and jurisdiction",
                "",
                "**Overlapping Jurisdiction Scenarios:**",
                "• Healthcare organizations may be subject to both PHIPA and federal laws",
                "• Universities subject to FIPPA but research may involve federal funding requirements",
                "• Municipal utilities with interprovincial operations",
                "• Technology companies with government contracts",
                "",
                "**Practical Compliance Tips:**",
                "• Identify all applicable legislation based on organizational scope",
                "• Apply the most restrictive requirements when laws overlap",
                "• Document legal basis for privacy practices under each applicable law",
                "• Regular legal review for organizations with complex jurisdictional issues",
                "• Maintain separate compliance frameworks when necessary"
            ]
        },
        {
            title: "Freedom of Information (FOI) Request Processes",
            content: [
                "Understanding how to make and respond to FOI requests under different legislation is essential for both requesters and organizations.",
                "",
                "**FOI Requests under FIPPA (Provincial):**",
                "• **Who can request**: Any person (no requirement to be Ontario resident)",
                "• **How to request**: Written request to institution's Freedom of Information Coordinator",
                "• **Response timeline**: 30 days from receipt of request",
                "• **Fees**: Application fee ($5) plus processing fees may apply",
                "• **Appeals**: Information and Privacy Commissioner of Ontario",
                "",
                "**FOI Requests under MFIPPA (Municipal):**",
                "• **Who can request**: Any person, regardless of residence",
                "• **How to request**: Submit to municipal clerk or designated coordinator",
                "• **Response timeline**: 30 days from receipt",
                "• **Fees**: Similar fee structure to FIPPA",
                "• **Appeals**: Information and Privacy Commissioner of Ontario",
                "",
                "**FOI Requests under Federal Access to Information Act:**",
                "• **Who can request**: Canadian citizens, permanent residents, or anyone present in Canada",
                "• **How to request**: Written request to institution's ATIP office",
                "• **Response timeline**: 30 days from receipt",
                "• **Fees**: $5 application fee plus processing fees",
                "• **Appeals**: Information Commissioner of Canada",
                "",
                "**Personal Information Requests (Different Process):**",
                "• Requests for own personal information are usually free",
                "• Faster processing timelines",
                "• Different exemption categories apply",
                "• Privacy protection rather than access to information focus",
                "",
                "**Best Practices for Making FOI Requests:**",
                "• Be specific about records sought to reduce processing time",
                "• Indicate preferred format (electronic, paper)",
                "• Consider privacy implications if requesting others' information",
                "• Understand exemption categories that may apply",
                "• Use informal requests first when appropriate",
                "",
                "**Common Exemptions Across All Legislation:**",
                "• Personal privacy of third parties",
                "• Cabinet confidences or council deliberations",
                "• Law enforcement investigations",
                "• Economic interests of government",
                "• Solicitor-client privilege",
                "• Safety and security of individuals or facilities"
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
                         currentSection === 'quiz' ? 'Interactive Assessment' : 'Resources & Downloads'}
                    </div>
                </div>

                <div className="module-container">
                    {/* Module Header */}
                    <div className="module-header">
                        <h1 className="text-4xl font-bold font-mono mb-2 uppercase relative z-10">
                            Module 1: Privacy Laws & Frameworks
                        </h1>
                        <p className="text-lg opacity-90 relative z-10">
                            Understanding PIPEDA, MFIPPA, PHIPA, FIPPA, and privacy law jurisdiction
                        </p>
                    </div>

                    {/* Learning Objectives */}
                    <div className="p-6 sm:p-8">
                        {/* Content Outline and Reading Time */}
                        {currentSection === 'content' && (
                            <div className="content-outline">
                                <h3>📚 Module Content Overview</h3>
                                <div className="reading-time">
                                    <span className="reading-time-icon">⏱️</span>
                                    <span>Estimated reading time: 25-30 minutes</span>
                                </div>
                                <ul>
                                    <li><a href="#pipeda-overview">PIPEDA Overview & 10 Fair Information Principles</a></li>
                                    <li><a href="#phipa-framework">PHIPA - Personal Health Information Protection Act</a></li>
                                    <li><a href="#fippa-framework">FIPPA - Freedom of Information and Protection of Privacy Act</a></li>
                                    <li><a href="#jurisdiction-guide">Federal vs Provincial Privacy Law Jurisdiction</a></li>
                                    <li><a href="#foi-processes">Freedom of Information (FOI) Request Processes</a></li>
                                    <li><a href="#mfippa-framework">MFIPPA Comprehensive Framework</a></li>
                                    <li><a href="#privacy-impact">Privacy Impact Assessments (PIAs)</a></li>
                                    <li><a href="#data-governance">Data Governance and Safeguards</a></li>
                                    <li><a href="#cross-border">Cross-Border Data Management</a></li>
                                    <li><a href="#breach-response">Breach Response and Notification</a></li>
                                    <li><a href="#bill-194">Bill 194 New Requirements</a></li>
                                </ul>
                            </div>
                        )}

                        {/* Learning Objectives */}
                        <div className="learning-objectives-enhanced">
                            <h3>
                                <span>🎯</span>
                                Learning Objectives
                            </h3>
                            
                            {/* Progress Visualizer */}
                            <ProgressVisualizer
                                title="Module 1 Learning Path"
                                currentStep={currentSection === 'content' ? 1 : currentSection === 'quiz' ? 2 : 3}
                                totalSteps={3}
                                stepLabels={['Master Content', 'Practice Assessment', 'Access Resources']}
                                description="Follow this structured path to master Ontario's privacy law framework"
                            />
                            
                            <ul>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Understand PIPEDA's 10 Fair Information Principles and their application</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Master PHIPA requirements for health information protection and circle of care</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Navigate FIPPA provisions for provincial institutions and access rights</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Determine jurisdictional application of federal vs provincial privacy laws</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Execute FOI requests under FIPPA, MFIPPA, and federal legislation</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Apply MFIPPA requirements for municipal organizations including collection, use, and disclosure rules</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Learn to conduct comprehensive Privacy Impact Assessments (PIAs)</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Implement data governance frameworks and safeguards</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Navigate cross-border data management requirements</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Develop breach response and notification procedures</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Apply new Bill 194 privacy impact assessment requirements</span>
                                </li>
                                <li>
                                    <span className="objective-icon">🎯</span>
                                    <span className="objective-text">Create practical compliance frameworks for organizational operations</span>
                                </li>
                            </ul>
                        </div>

                        {currentSection === 'content' ? (
                            /* Content Section */
                            <div className="space-y-6">
                                {contentSections.map((section, index) => (
                                    <div key={index} className="content-section" id={
                                        section.title === "PIPEDA Overview" ? "pipeda-overview" :
                                        section.title === "PHIPA - Personal Health Information Protection Act" ? "phipa-framework" :
                                        section.title === "FIPPA - Freedom of Information and Protection of Privacy Act" ? "fippa-framework" :
                                        section.title === "Federal vs Provincial Privacy Law Jurisdiction" ? "jurisdiction-guide" :
                                        section.title === "Freedom of Information (FOI) Request Processes" ? "foi-processes" :
                                        section.title === "MFIPPA for Municipalities - Comprehensive Framework" ? "mfippa-framework" :
                                        section.title === "Privacy Impact Assessments (PIAs) - Essential Practice" ? "privacy-impact" :
                                        section.title === "Data Governance and Safeguards" ? "data-governance" :
                                        section.title === "Cross-Border Data Management" ? "cross-border" :
                                        section.title === "Breach Response and Notification" ? "breach-response" :
                                        section.title === "Bill 194 - New Requirements" ? "bill-194" : ""
                                    }>
                                        <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4 text-text-secondary leading-relaxed">
                                            {section.content.map((paragraph, pIndex) => {
                                                // Enhanced content formatting
                                                if (paragraph === "") return <br key={pIndex} />;
                                                
                                                // Special formatting for important callouts
                                                if (paragraph.includes("**Core Principles") || paragraph.includes("**When PIAs") || paragraph.includes("**Enhanced Breach")) {
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
                                        
                                        {section.title === "PIPEDA Overview" && (
                                            <>
                                                <InfoGraphic
                                                    title="PIPEDA's 10 Fair Information Principles"
                                                    layout="grid"
                                                    sections={[
                                                        {
                                                            icon: <ConceptIcon className="w-8 h-8" />,
                                                            title: "Accountability",
                                                            content: ["Organizations are responsible for personal information under their control"],
                                                            color: "primary"
                                                        },
                                                        {
                                                            icon: <ConceptIcon className="w-8 h-8" />,
                                                            title: "Identifying Purposes",
                                                            content: ["Purposes must be identified before or at time of collection"],
                                                            color: "success"
                                                        },
                                                        {
                                                            icon: <ConceptIcon className="w-8 h-8" />,
                                                            title: "Consent",
                                                            content: ["Knowledge and consent required for collection, use, disclosure"],
                                                            color: "warning"
                                                        },
                                                        {
                                                            icon: <ConceptIcon className="w-8 h-8" />,
                                                            title: "Limiting Collection",
                                                            content: ["Only collect what's necessary for identified purposes"],
                                                            color: "primary"
                                                        }
                                                    ]}
                                                />
                                                
                                                <ComparisonTable
                                                    title="Privacy Law Jurisdiction Comparison"
                                                    columns={["PIPEDA", "MFIPPA", "PHIPA", "FIPPA"]}
                                                    rows={[
                                                        {
                                                            label: "Scope",
                                                            values: ["Private sector", "Municipal sector", "Health sector", "Provincial government"]
                                                        },
                                                        {
                                                            label: "Geographic Storage",
                                                            values: ["No specific restriction", "Canada only (s.30.1)", "Generally within Ontario", "Generally within Canada"],
                                                            highlight: true
                                                        },
                                                        {
                                                            label: "Consent Model",
                                                            values: ["Express/Implied", "Statutory authority", "Circle of care", "Statutory authority"]
                                                        },
                                                        {
                                                            label: "Enforcement",
                                                            values: ["Privacy Commissioner of Canada", "IPC Ontario", "IPC Ontario", "IPC Ontario"]
                                                        }
                                                    ]}
                                                />
                                            </>
                                        )}
                                        
                                        {section.title === "Cross-Border Data Management" && (
                                            <ConceptMap
                                                title="Cross-Border Data Compliance Framework"
                                                centralConcept="Cross-Border Data Management"
                                                connections={[
                                                    {
                                                        concept: "Legal Requirements",
                                                        relationship: "mandates",
                                                        description: "MFIPPA s.30.1, PIPEDA, sector-specific laws"
                                                    },
                                                    {
                                                        concept: "Vendor Management",
                                                        relationship: "implements",
                                                        description: "Due diligence, contracts, monitoring"
                                                    },
                                                    {
                                                        concept: "Technical Safeguards",
                                                        relationship: "protects",
                                                        description: "Encryption, access controls, audit logs"
                                                    },
                                                    {
                                                        concept: "Risk Assessment",
                                                        relationship: "evaluates",
                                                        description: "Privacy impact, security risks, compliance gaps"
                                                    },
                                                    {
                                                        concept: "Ongoing Monitoring",
                                                        relationship: "ensures",
                                                        description: "Compliance verification, incident response"
                                                    }
                                                ]}
                                            />
                                        )}
                                        
                                        {/* Add progress indicator for complex sections */}
                                        {section.title === "Privacy Impact Assessments (PIAs) - Essential Practice" && (
                                            <>
                                                <div className="scenario-box">
                                                    <div className="scenario-title">📋 Practical Scenario: Municipal Wi-Fi Implementation</div>
                                                    <div className="scenario-content">
                                                        Your municipality wants to provide free public Wi-Fi in downtown areas. Citizens will need to register with their email addresses and accept terms of service. The system will log connection times and locations for network management.
                                                    </div>
                                                    <div className="scenario-question">
                                                        💭 Reflection: What PIA considerations would be required for this initiative? Think about data collection, retention, and citizen privacy rights.
                                                    </div>
                                                </div>
                                                
                                                <ProcessFlow
                                                    title="PIA Implementation Process"
                                                    steps={[
                                                        {
                                                            title: "Threshold Assessment",
                                                            description: "Determine if full PIA is needed based on privacy risk factors",
                                                            icon: <ImplementationIcon className="w-6 h-6 text-white" />,
                                                            status: "completed"
                                                        },
                                                        {
                                                            title: "Data Mapping",
                                                            description: "Identify all personal information flows and data repositories",
                                                            icon: <ImplementationIcon className="w-6 h-6 text-white" />,
                                                            status: "completed"
                                                        },
                                                        {
                                                            title: "Risk Assessment",
                                                            description: "Evaluate privacy risks and potential impacts on individuals",
                                                            icon: <ImplementationIcon className="w-6 h-6 text-white" />,
                                                            status: "current"
                                                        },
                                                        {
                                                            title: "Mitigation Strategies",
                                                            description: "Develop controls and safeguards to reduce identified risks",
                                                            icon: <ImplementationIcon className="w-6 h-6 text-white" />,
                                                            status: "pending"
                                                        },
                                                        {
                                                            title: "Monitoring Plan",
                                                            description: "Establish ongoing compliance verification and review procedures",
                                                            icon: <ImplementationIcon className="w-6 h-6 text-white" />,
                                                            status: "pending"
                                                        }
                                                    ]}
                                                />
                                            </>
                                        )}
                                        
                                        {section.title === "MFIPPA for Municipalities - Comprehensive Framework" && (
                                            <>
                                                <div className="learning-callout tip">
                                                    <div className="learning-callout-title">
                                                        <span className="learning-callout-icon">💡</span>
                                                        Quick Reference Tip
                                                    </div>
                                                    <p>Remember the acronym "CLUE" for MFIPPA compliance: <strong>C</strong>ollect only what's necessary, <strong>L</strong>imit use to stated purposes, <strong>U</strong>nderstand disclosure rules, <strong>E</strong>nsure proper safeguards.</p>
                                                </div>
                                                
                                                <InteractiveScenario
                                                    title="Municipal Cloud Services Scenario"
                                                    scenario="Your municipality wants to implement a cloud-based citizen portal for online service requests. Citizens will submit personal information including names, addresses, and service details. The preferred vendor offers cost-effective hosting through US-based servers."
                                                    considerations={[
                                                        "Does MFIPPA Section 30.1 apply to this collection?",
                                                        "What are the cross-border data storage implications?",
                                                        "What consent requirements exist for citizen portal use?",
                                                        "How can you ensure adequate privacy protection?"
                                                    ]}
                                                    solution="1. Require Canadian data residency from vendors; 2. Implement robust data processing agreements; 3. Conduct thorough PIA before implementation; 4. Establish clear privacy notices for portal users; 5. Implement technical safeguards including encryption and access controls."
                                                    learningPoints={[
                                                        "MFIPPA Section 30.1 requires Canadian storage for municipal personal information",
                                                        "Vendor selection must prioritize privacy compliance over cost savings",
                                                        "PIAs are mandatory for new personal information collection initiatives",
                                                        "Clear privacy notices enhance transparency and citizen trust"
                                                    ]}
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                                
                                {/* Key Takeaways Section */}
                                <div className="key-takeaways">
                                    <h3>Key Takeaways</h3>
                                    <ul>
                                        <li>PIPEDA's 10 principles form the foundation of Canadian privacy law</li>
                                        <li>MFIPPA requires municipalities to balance transparency with privacy protection</li>
                                        <li>Privacy Impact Assessments are mandatory for new data collection initiatives</li>
                                        <li>Cross-border data restrictions require careful vendor management</li>
                                        <li>Bill 194 introduces stronger enforcement and penalty provisions</li>
                                        <li>Effective data governance requires both technical and administrative safeguards</li>
                                    </ul>
                                </div>
                                
                                {/* Interactive Checklist */}
                                <div className="interactive-checklist">
                                    <h4>🗃️ Implementation Checklist</h4>
                                    <p className="text-sm text-text-muted mb-4">Check off items as you implement them in your organization:</p>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="checklist-1" />
                                        <label htmlFor="checklist-1" className="checklist-text">Review and update privacy policies to reflect PIPEDA principles</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="checklist-2" />
                                        <label htmlFor="checklist-2" className="checklist-text">Conduct PIA for any new technology implementations</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="checklist-3" />
                                        <label htmlFor="checklist-3" className="checklist-text">Establish data breach response procedures</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="checklist-4" />
                                        <label htmlFor="checklist-4" className="checklist-text">Review all vendor agreements for cross-border data compliance</label>
                                    </div>
                                    <div className="checklist-item">
                                        <input type="checkbox" className="checklist-checkbox" id="checklist-5" />
                                        <label htmlFor="checklist-5" className="checklist-text">Prepare for Bill 194 implementation timeline</label>
                                    </div>
                                </div>
                                
                                {/* Resources Panel */}
                                <div className="mt-8">
                                    <ResourcesPanel />
                                </div>
                                
                                <div className="text-center py-8 flex gap-4 justify-center">
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-primary py-3 px-6 text-lg font-semibold"
                                    >
                                        Interactive Assessment →
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSection('resources')}
                                        className="btn-secondary py-3 px-6 text-lg font-semibold"
                                    >
                                        📚 Resources & Downloads
                                    </button>
                                </div>
                            </div>
                        ) : currentSection === 'quiz' ? (
                            /* Quiz Section */
                            <div className="quiz-container">
                                <h3 className="text-2xl font-semibold mb-6 text-text-primary font-mono uppercase">
                                    🎓 Interactive Assessment
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Test your understanding with various types of interactive exercises including scenarios, multiple choice, and hands-on activities.
                                </p>
                                
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

                                <div className="text-center mt-6 flex gap-4 justify-center">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary py-2 px-6"
                                    >
                                        ← Back to Content
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSection('resources')}
                                        className="btn-secondary py-2 px-6"
                                    >
                                        📚 View Resources
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Resources Section */
                            <div className="resources-container">
                                <h3 className="text-2xl font-semibold mb-6 text-text-primary font-mono uppercase">
                                    📚 Resources & Downloads
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Download practical templates, checklists, and guides to help implement privacy law compliance in your organization.
                                </p>
                                
                                <DownloadableResources 
                                    resources={sampleResources}
                                    moduleTitle="Module 1 Resources"
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