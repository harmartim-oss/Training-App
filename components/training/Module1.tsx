/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses, getResponsiveFontSize } from '../../hooks/useMobileDetection';
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
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);
    
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
            title: "PIPEDA - Personal Information Protection and Electronic Documents Act",
            content: [
                "The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy legislation governing how private sector organizations collect, use, and disclose personal information in commercial activities. Enacted in 2000, PIPEDA establishes the ground rules for privacy protection in the digital economy.",
                "",
                "**Legislative Foundation and Purpose:**",
                "• Balances privacy rights with commercial need for personal information",
                "• Applies to private sector organizations in federally regulated industries",
                "• Covers provinces without substantially similar privacy legislation",
                "• Regulates commercial activities involving personal information collection, use, and disclosure",
                "",
                "**The 10 Fair Information Principles (Schedule 1):**",
                "**1. Accountability** - Organizations are responsible for personal information under their control and must designate an individual accountable for compliance.",
                "**2. Identifying Purposes** - Purposes for collecting personal information must be identified before or at the time of collection.",
                "**3. Consent** - Knowledge and consent of the individual are required for collection, use, or disclosure except where inappropriate.",
                "**4. Limiting Collection** - Collection must be limited to purposes identified and must be fair and lawful.",
                "**5. Limiting Use, Disclosure, and Retention** - Use or disclosure limited to purposes identified, with retention only as long as necessary.",
                "**6. Accuracy** - Personal information must be accurate, complete, and up-to-date as necessary for identified purposes.",
                "**7. Safeguards** - Appropriate security safeguards must protect personal information against loss, theft, unauthorized access, disclosure, copying, use, or modification.",
                "**8. Openness** - Organizations must make readily available specific information about policies and practices relating to personal information management.",
                "**9. Individual Access** - Upon request, individuals must be informed of the existence, use, and disclosure of their personal information and given access to it.",
                "**10. Challenging Compliance** - Individuals must be able to address compliance concerns to the designated accountable person.",
                "",
                "**Modern Applications and Digital Considerations:**",
                "• **E-commerce and Online Services**: PIPEDA governs data collection through websites, mobile apps, and digital platforms",
                "• **Artificial Intelligence and Machine Learning**: Algorithmic decision-making must comply with transparency and consent requirements",
                "• **Internet of Things (IoT)**: Connected devices must implement privacy by design principles",
                "• **Cross-Border Data Transfers**: International data flows require appropriate safeguards and may need consent",
                "• **Social Media and Digital Marketing**: Online behavioral tracking and profiling subject to PIPEDA requirements",
                "",
                "**Enforcement and Penalties:**",
                "• Privacy Commissioner of Canada has investigation and recommendation powers",
                "• Federal Court can order compliance and award damages up to $100,000",
                "• New penalties under Bill C-27 (proposed) include administrative monetary penalties up to $25 million",
                "• Organizations must report privacy breaches to affected individuals and the Commissioner when real risk of significant harm",
                "",
                "**Recent Developments and Reform:**",
                "• Bill C-27 proposes to replace PIPEDA with the Consumer Privacy Protection Act (CPPA)",
                "• Enhanced individual rights including data portability and erasure",
                "• Stronger enforcement powers and significant financial penalties",
                "• Mandatory privacy impact assessments for high-risk processing",
                "• Algorithmic impact assessments for automated decision-making systems"
            ]
        },
        {
            title: "PHIPA - Personal Health Information Protection Act (Ontario)",
            content: [
                "The Personal Health Information Protection Act (PHIPA) is Ontario's comprehensive health privacy legislation, enacted in 2004, governing the collection, use, and disclosure of personal health information by health information custodians throughout the province.",
                "",
                "**Scope and Legislative Framework:**",
                "• Applies to all health information custodians in Ontario including hospitals, clinics, pharmacies, physicians, nurses, and other regulated health professionals",
                "• Covers personal health information in any form: electronic, paper, oral, or visual",
                "• Regulates both public and private healthcare providers within Ontario's jurisdiction",
                "• Includes health service providers, researchers, support organizations, and health information network providers",
                "",
                "**Fundamental PHIPA Principles:**",
                "**Circle of Care Concept**: Revolutionary approach allowing health information sharing within healthcare teams for treatment purposes without express consent, based on the understanding that coordinated care requires information flow among treating professionals.",
                "",
                "**Knowledgeable Consent Standard**: Patients must understand what information is being collected, how it will be used, who will have access, and the consequences of providing or withholding consent. This goes beyond simple consent to require meaningful understanding.",
                "",
                "**Minimal Disclosure Principle**: Health information custodians must limit access to and disclosure of personal health information to the minimum necessary to accomplish the purpose.",
                "",
                "**Collection, Use, and Disclosure Framework:**",
                "**Permitted Collections:**",
                "• Providing healthcare to the individual",
                "• Payment and reimbursement for healthcare services",
                "• Healthcare operations including quality improvement and risk management",
                "• Plan administration by health insurers and service plans",
                "• Research approved by research ethics board",
                "• Public health and safety purposes as prescribed by regulation",
                "",
                "**Consent Requirements:**",
                "• **Implied Consent**: Sufficient within circle of care for treatment purposes",
                "• **Express Consent**: Required for purposes outside circle of care, research, fundraising, and marketing",
                "• **Opt-out Consent**: Permitted for some secondary purposes like quality improvement",
                "• **Deemed Consent**: In emergency situations where express consent cannot be obtained",
                "",
                "**Individual Rights Under PHIPA:**",
                "• **Access Rights**: Right to examine and receive copies of personal health information",
                "• **Correction Rights**: Right to request correction of inaccurate or incomplete information",
                "• **Restriction Rights**: Right to request restrictions on use and disclosure (subject to healthcare necessity)",
                "• **Complaint Rights**: Right to file complaints with the Information and Privacy Commissioner of Ontario",
                "• **Withdrawal Rights**: Right to withdraw consent (with limitations for ongoing treatment)",
                "",
                "**Health Information Custodian Obligations:**",
                "• **Privacy Policies**: Develop and maintain comprehensive privacy policies and procedures",
                "• **Staff Training**: Ensure all staff understand PHIPA requirements and organizational policies",
                "• **Access Controls**: Implement role-based access controls limiting access to minimum necessary",
                "• **Audit Logs**: Maintain comprehensive audit trails of access to and disclosure of personal health information",
                "• **Breach Notification**: Report privacy breaches to the Commissioner and affected individuals as required",
                "• **Agreements**: Ensure written agreements with agents, information managers, and other custodians",
                "",
                "**Technology and Digital Health Considerations:**",
                "• **Electronic Health Records (EHRs)**: PHIPA governs implementation and use of digital health record systems",
                "• **Telemedicine and Virtual Care**: Privacy requirements for remote healthcare delivery platforms",
                "• **Mobile Health Apps**: Health apps and wearable devices must comply when processing Ontario health information",
                "• **Artificial Intelligence**: AI applications in healthcare must meet transparency and accountability requirements",
                "• **Cloud Computing**: Health information stored in cloud services must meet PHIPA security and location requirements"
            ]
        },
        {
            title: "MFIPPA - Municipal Freedom of Information and Protection of Privacy Act",
            content: [
                "The Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) is Ontario's comprehensive privacy and access legislation for municipal governments, enacted in 1990 and substantially updated to address modern digital governance challenges.",
                "",
                "**Scope and Municipal Application:**",
                "• Applies to all 444 municipalities in Ontario (cities, towns, villages, townships, counties, regions)",
                "• Covers local boards, commissions, conservation authorities, police services boards, and municipal service corporations",
                "• Includes municipal agencies, committees, and bodies controlled by municipalities",
                "• Governs both access to information requests and privacy protection for personal information",
                "",
                "**Dual Legislative Framework:**",
                "**Access to Information Component:**",
                "• Public right to access municipal records and information",
                "• Promotes transparency and accountability in local government",
                "• Subject to specific exemptions protecting sensitive information",
                "• 30-day response timeline with possible 30-day extension",
                "",
                "**Privacy Protection Component:**",
                "• Strict controls over collection, use, and disclosure of personal information",
                "• Applies to all personal information held by municipal institutions",
                "• Individual rights to access and correct personal information",
                "• Mandatory privacy impact assessments for information systems",
                "",
                "**Personal Information Collection Rules:**",
                "**Direct Collection Requirement (Section 28)**: Personal information must be collected directly from the individual unless specific exceptions apply, including:",
                "• Clear legislative authority for indirect collection",
                "• Compelling circumstances affecting health or safety",
                "• Law enforcement investigations",
                "• Information available to the public",
                "",
                "**Collection Limitation Principles:**",
                "• Information must relate directly to and be necessary for an operating program or activity",
                "• Collection must be authorized by statute or necessary for proper administration",
                "• Individuals must be informed of legal authority and principal purposes",
                "• Collection methods must be fair and not unreasonably intrusive",
                "",
                "**Use and Disclosure Restrictions:**",
                "**Primary Use Rule**: Personal information may only be used for the purpose for which it was collected or a consistent purpose.",
                "",
                "**Permitted Disclosures Without Consent:**",
                "• For the purpose for which it was collected or compiled or a consistent purpose",
                "• If disclosure is made to an officer or employee of the institution who needs the record in the performance of duties",
                "• For compliance with an Act or treaty or arrangement with a government",
                "• For law enforcement purposes under specific circumstances",
                "• Where compelling circumstances exist affecting anyone's health or safety",
                "",
                "**Data Residency Requirements (Section 30.1):**",
                "Critical provision requiring personal information to be stored and accessed only in Canada, with limited exceptions:",
                "• Written consent from affected individuals",
                "• Authorization from the Information and Privacy Commissioner",
                "• Specific legislative authority",
                "This provision has significant implications for cloud computing and digital service delivery.",
                "",
                "**Access Request Process:**",
                "**Formal Request Requirements:**",
                "• Written request to municipal clerk or designated coordinator",
                "• Sufficient detail to identify requested records",
                "• Payment of prescribed fees ($5 application fee plus processing costs)",
                "• No requirement to explain reasons for request",
                "",
                "**Response Obligations:**",
                "• Acknowledge receipt within 5 days",
                "• Provide response within 30 days (extendable in specific circumstances)",
                "• Apply exemptions narrowly and disclose non-exempt portions",
                "• Provide reasons for any refusal or exemption claims",
                "",
                "**Modern Digital Governance Challenges:**",
                "• **Smart City Initiatives**: IoT sensors and data analytics must comply with MFIPPA collection and use limitations",
                "• **Digital Service Delivery**: Online municipal services must meet privacy and security requirements",
                "• **Open Data Programs**: Balance transparency goals with privacy protection obligations",
                "• **Social Media and Public Engagement**: Municipal social media use subject to MFIPPA requirements",
                "• **Cloud Computing**: Section 30.1 creates challenges for municipal adoption of cloud services"
            ]
        },
        {
            title: "FIPPA - Freedom of Information and Protection of Privacy Act (Ontario)",
            content: [
                "The Freedom of Information and Protection of Privacy Act (FIPPA) governs Ontario's provincial government institutions, providing both public access to government information and privacy protection for personal information held by provincial bodies.",
                "",
                "**Provincial Government Coverage:**",
                "• All Ontario government ministries and departments",
                "• Crown agencies, boards, commissions, and corporations",
                "• Hospitals, school boards, colleges, and universities",
                "• Provincial agencies and public bodies",
                "• Does not apply to municipalities (covered under MFIPPA) or private sector organizations",
                "",
                "**Privacy Protection Framework:**",
                "**Collection Standards (Section 38):**",
                "• Personal information collection must be authorized by statute",
                "• Must relate directly to and be necessary for program or activity",
                "• Direct collection from individual required unless specific exceptions apply",
                "• Individual must be informed of legal authority and principal purposes",
                "",
                "**Use Limitations (Section 39):**",
                "• Use only for original purpose or consistent purposes",
                "• Staff access limited to those requiring information for duties",
                "• Detailed audit trails required for access to personal information",
                "• Regular review and purging of unnecessary personal information",
                "",
                "**Disclosure Controls (Sections 40-42):**",
                "• Consent required for disclosure outside original purpose",
                "• Limited exceptions for law enforcement, health and safety, and program administration",
                "• Disclosure to other governments requires formal agreements",
                "• Notice to affected individuals required in many circumstances",
                "",
                "**Access to Information Provisions:**",
                "**General Right of Access:**",
                "• Any person may request access to records held by provincial institutions",
                "• No requirement to explain reasons for request",
                "• Broad definition of 'record' includes electronic and digital formats",
                "• Right applies regardless of citizenship or residency",
                "",
                "**Exemption Categories:**",
                "• **Cabinet confidences**: Protect deliberations and advice to Cabinet",
                "• **Law enforcement**: Protect ongoing investigations and law enforcement methods",
                "• **Economic interests**: Protect competitive position and commercial information",
                "• **Personal privacy**: Protect personal information of third parties",
                "• **Solicitor-client privilege**: Protect legal advice and litigation strategies",
                "• **Safety**: Protect information that could endanger health or safety",
                "",
                "**Digital Government and Modern Applications:**",
                "• **E-government Services**: Digital service delivery must comply with FIPPA privacy requirements",
                "• **Data Analytics**: Government use of big data and analytics subject to collection and use limitations",
                "• **Artificial Intelligence**: AI applications in government operations must meet transparency and accountability standards",
                "• **Open Government**: Balance between open data initiatives and privacy protection",
                "• **Inter-governmental Information Sharing**: Digital platforms for sharing information between governments"
            ]
        },
        {
            title: "Comparative Analysis and Jurisdictional Considerations",
            content: [
                "Understanding the interplay between federal and provincial privacy laws is essential for compliance in Ontario's complex privacy landscape, particularly as organizations often fall under multiple jurisdictions.",
                "",
                "**Federal Privacy Law Application:**",
                "**PIPEDA Coverage:**",
                "• Private sector organizations in commercial activities",
                "• Federally regulated industries (banking, telecommunications, airlines, railways)",
                "• Interprovincial and international commerce",
                "• Organizations in provinces without substantially similar legislation",
                "• Cross-border data transfers and processing",
                "",
                "**Provincial Privacy Law Application:**",
                "**Ontario Sector-Specific Coverage:**",
                "• **PHIPA**: Health information custodians and health service providers",
                "• **FIPPA**: Provincial government institutions, hospitals, universities, school boards",
                "• **MFIPPA**: Municipal governments, local agencies, police services, conservation authorities",
                "• **Sectoral Application**: Different laws apply based on organizational sector rather than information type",
                "",
                "**Complex Jurisdictional Scenarios:**",
                "**Healthcare Organizations:**",
                "• Provincial hospitals subject to FIPPA for general operations, PHIPA for health information",
                "• Research activities may involve federal funding triggering additional requirements",
                "• Interprovincial patient transfers subject to multiple jurisdictions",
                "• Telemedicine across provincial boundaries creates jurisdictional complexity",
                "",
                "**Universities and Research Institutions:**",
                "• Subject to FIPPA as provincial institutions",
                "• Research partnerships with federal agencies may trigger federal requirements",
                "• International research collaborations subject to foreign privacy laws",
                "• Student information vs. research data may have different legal frameworks",
                "",
                "**Municipal Technology Services:**",
                "• MFIPPA governs municipal operations and citizen information",
                "• Technology vendors may be subject to PIPEDA if providing commercial services",
                "• Regional services spanning multiple municipalities create coordination challenges",
                "• Smart city initiatives may involve federal telecommunications regulations",
                "",
                "**Practical Compliance Strategies:**",
                "**Multi-Jurisdictional Approach:**",
                "• Identify all applicable privacy laws based on organizational activities",
                "• Map data flows and processing activities to relevant jurisdictions",
                "• Apply most restrictive requirements when laws overlap",
                "• Maintain separate compliance documentation for each applicable framework",
                "",
                "**Risk Management Framework:**",
                "• Regular legal review for organizations with complex jurisdictional issues",
                "• Privacy impact assessments considering all applicable laws",
                "• Incident response procedures accounting for multiple reporting requirements",
                "• Staff training programs covering relevant legal frameworks",
                "",
                "**Emerging Challenges:**",
                "**Cross-Border Data Flows:**",
                "• MFIPPA Section 30.1 restrictions on foreign data storage",
                "• PIPEDA adequacy requirements for international transfers",
                "• Cloud computing and global technology platforms",
                "• International agreements and data sharing treaties",
                "",
                "**Technology Integration:**",
                "• AI and machine learning systems spanning multiple jurisdictions",
                "• Blockchain and distributed ledger technologies",
                "• Internet of Things (IoT) devices and smart city infrastructure",
                "• Digital identity and authentication systems",
                "",
                "**Future Developments:**",
                "• Bill C-27 federal privacy law reform",
                "• Provincial privacy law modernization initiatives",
                "• International privacy law harmonization efforts",
                "• Emerging technologies and regulatory responses"
            ]
        }
    ];
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
                                        section.title === "PIPEDA - Personal Information Protection and Electronic Documents Act" ? "pipeda-overview" :
                                        section.title === "PHIPA - Personal Health Information Protection Act (Ontario)" ? "phipa-framework" :
                                        section.title === "MFIPPA - Municipal Freedom of Information and Protection of Privacy Act" ? "mfippa-framework" :
                                        section.title === "FIPPA - Freedom of Information and Protection of Privacy Act (Ontario)" ? "fippa-framework" :
                                        section.title === "Comparative Analysis and Jurisdictional Considerations" ? "jurisdiction-guide" : ""
                                    }>
                                        <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4 text-text-secondary leading-relaxed">
                                            {section.content.map((paragraph, pIndex) => {
                                                // Enhanced content formatting
                                                if (paragraph === "") return <br key={pIndex} />;
                                                
                                                // Special formatting for important callouts
                                                if (paragraph.includes("**Legislative Foundation") || paragraph.includes("**Fundamental PHIPA") || paragraph.includes("**Scope and Municipal") || paragraph.includes("**Provincial Government")) {
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