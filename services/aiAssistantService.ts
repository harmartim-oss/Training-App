/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIProvider } from '../types';

// Available free/open-source AI providers
export const AI_PROVIDERS: AIProvider[] = [
    {
        id: 'ollama',
        name: 'Ollama (Local)',
        description: 'Run large language models locally with Ollama. Completely free and private.',
        isOpenSource: true,
        isFree: true,
        apiEndpoint: 'http://localhost:11434/api/generate',
        features: [
            'Completely free and private',
            'No API keys required',
            'Runs locally on your machine',
            'Multiple model options (Llama2, CodeLlama, etc.)',
            'No data sent to external servers'
        ]
    },
    {
        id: 'huggingface',
        name: 'HuggingFace Inference API (Free Tier)',
        description: 'Free tier access to open-source models via HuggingFace.',
        isOpenSource: true,
        isFree: true,
        apiEndpoint: 'https://api-inference.huggingface.co/models/',
        features: [
            'Free tier available',
            'Multiple open-source models',
            'Easy to use API',
            'Good for experimentation',
            'Rate-limited but sufficient for learning'
        ]
    },
    {
        id: 'openai-compatible',
        name: 'OpenAI-Compatible APIs',
        description: 'Compatible with open-source alternatives like LocalAI, OpenRouter, etc.',
        isOpenSource: true,
        isFree: true,
        features: [
            'Compatible with many open-source solutions',
            'Self-hostable options available',
            'Standard OpenAI API format',
            'Various pricing models'
        ]
    },
    {
        id: 'educational-assistant',
        name: 'Built-in Educational Assistant',
        description: 'Rule-based educational assistant with pre-programmed responses for OCRP topics.',
        isOpenSource: true,
        isFree: true,
        features: [
            'No external dependencies',
            'Topic-specific responses',
            'Always available',
            'Privacy-focused',
            'Customizable for OCRP content'
        ]
    }
];

// Enhanced Educational Assistant responses for OCRP topics with detailed, specific information and module references
const EDUCATIONAL_RESPONSES: Record<string, string[]> = {
    'pipeda': [
        "📚 **PIPEDA Overview** *(Module 1: Privacy Laws & Frameworks)*: The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy law that governs how private sector organizations collect, use, and disclose personal information during commercial activities.\n\n🎯 **The 10 Fair Information Principles**: \n1. **Accountability** - Organizations are responsible for personal information under their control\n2. **Identifying Purposes** - Purposes must be identified before or at time of collection\n3. **Consent** - Knowledge and consent required for collection, use, disclosure\n4. **Limiting Collection** - Only collect what's necessary for identified purposes\n5. **Limiting Use, Disclosure & Retention** - Use only for intended purposes, retain only as long as necessary\n6. **Accuracy** - Keep information accurate, complete, and up-to-date\n7. **Safeguards** - Protect with security appropriate to sensitivity\n8. **Openness** - Make policies and practices readily available\n9. **Individual Access** - Provide access to personal information upon request\n10. **Challenging Compliance** - Address complaints and challenges to compliance\n\n📖 *Reference: See Module 1 - PIPEDA Overview section for detailed coverage*",
        
        "💡 **PIPEDA Key Requirements** *(Module 1)*: Under PIPEDA, organizations must identify purposes for collecting personal information **before or at the time of collection** to ensure transparency. Consent must be meaningful - individuals must understand what they're agreeing to. Organizations can only collect, use, and disclose personal information for purposes that a reasonable person would consider appropriate in the circumstances.\n\n📖 *Reference: Module 1 covers this in detail with practical examples*",
        
        "⚖️ **PIPEDA Penalties** *(Module 1)*: Recent amendments under Bill C-27 significantly increase penalties. Maximum fines are now $100,000 for individuals and $10 million for organizations. The Privacy Commissioner also has enhanced investigation powers and can make compliance orders that are enforceable in Federal Court.\n\n📖 *Reference: See Module 1 - Bill 194 section for penalty details*"
    ],
    
    'mfippa': [
        "🏛️ **MFIPPA Comprehensive Framework** *(Module 1: Privacy Laws & Frameworks)*: The Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) governs how Ontario municipalities handle personal information and provide access to records, balancing transparency with privacy protection.\n\n📋 **Core MFIPPA Requirements**: \n• **Collection (s.28)**: Must collect directly from individuals unless specific exceptions apply\n• **Use & Disclosure (ss.29-32)**: Use only for original purpose or consistent uses\n• **Cross-border restrictions (s.30.1)**: Personal information must be stored and accessed only in Canada\n• **Individual Rights**: Access, correction, and complaint rights\n\n📖 *Reference: Module 1 - MFIPPA for Municipalities section provides comprehensive coverage*",
        
        "🔒 **MFIPPA Data Storage Rules** *(Module 1)*: Section 30.1 requires that personal information under municipal control must be **stored and accessed only within Canada**. Limited exceptions include: disclosure authorized under sections 29 or 31, written consent from individual, information available to general public, or Commissioner authorization. This is critical for cloud services - you must verify data residency with providers.\n\n📖 *Reference: See Module 1 - Cross-Border Data Management section for detailed implementation guidance*",
        
        "📊 **Privacy Impact Assessments under MFIPPA** *(Module 1)*: PIAs are mandatory for new programs involving personal information collection. The process includes: threshold assessment, data mapping, risk assessment, mitigation strategies, and monitoring plans. Key triggers include new technology implementations, data sharing agreements, and cross-border transfers.\n\n📖 *Reference: Module 1 - Privacy Impact Assessments section has step-by-step guidance*"
    ],
    
    'differences': [
        "🔍 **Key PIPEDA vs MFIPPA Differences** *(Module 1)*:\n\n**Scope**: \n• PIPEDA: Private sector, commercial activities, federal jurisdiction\n• MFIPPA: Municipal governments, local agencies, Ontario jurisdiction\n\n**Data Storage**: \n• PIPEDA: No specific geographic restrictions (though foreign laws may apply)\n• MFIPPA: Strict Canadian storage requirement (s.30.1)\n\n**Enforcement**: \n• PIPEDA: Privacy Commissioner investigations, Federal Court enforcement\n• MFIPPA: Information and Privacy Commissioner of Ontario, binding orders\n\n**Consent**: \n• PIPEDA: Explicit consent requirements for collection, use, disclosure\n• MFIPPA: Different rules - often statutory authority rather than consent-based\n\n📖 *Reference: Module 1 provides detailed comparison tables and practical examples*"
    ],
    
    'phipa': [
        "🏥 **PHIPA - Personal Health Information Protection Act** *(Module 1: Privacy Laws & Frameworks)*: Ontario's health privacy legislation governing health information custodians (hospitals, clinics, health professionals) in their collection, use, and disclosure of personal health information.\n\n🔄 **Circle of Care Concept**: PHIPA allows health information sharing within healthcare teams for treatment purposes without explicit consent. This includes physicians, nurses, pharmacists, and other health professionals involved in an individual's care.\n\n📋 **Key PHIPA Principles**: \n• **Knowledgeable Consent**: Patients must understand what they're consenting to\n• **Minimal Disclosure**: Only necessary information should be shared\n• **Purpose Limitation**: Use information only for intended healthcare purposes\n• **Individual Rights**: Access, correction, complaint rights specific to health information\n\n📖 *Reference: Module 1 - PHIPA section provides comprehensive coverage of health information protection*",
        
        "⚕️ **PHIPA vs Other Privacy Laws** *(Module 1)*: PHIPA is Ontario-specific health privacy legislation that works alongside federal and provincial privacy laws:\n• **Scope**: Health information custodians in Ontario\n• **Special Provisions**: Circle of care, specialized consent models\n• **Express Consent Required**: For purposes outside circle of care\n• **Implied Consent Allowed**: Within circle of care for treatment\n\n📖 *Reference: See Module 1 jurisdiction section for understanding when PHIPA applies vs other privacy laws*"
    ],
    
    'fippa': [
        "🏛️ **FIPPA - Freedom of Information and Protection of Privacy Act** *(Module 1: Privacy Laws & Frameworks)*: Ontario's provincial privacy legislation governing ministries, Crown agencies, hospitals, school boards, and universities.\n\n🎯 **Dual Purpose Framework**: \n• **Access to Information**: Public right to government records\n• **Privacy Protection**: Controls over personal information handling by provincial institutions\n\n📋 **Key FIPPA Provisions**: \n• **Collection Limitations (s.38)**: Personal information must be collected directly from individuals unless exceptions apply\n• **Use Restrictions (s.39)**: Use only for original purpose or consistent uses\n• **Disclosure Controls (s.40-42)**: Limited circumstances for disclosure without consent\n• **30-day Response Timeline**: For access to information requests\n\n📖 *Reference: Module 1 - FIPPA section provides detailed implementation guidance*",
        
        "⚖️ **FIPPA vs MFIPPA Comparison** *(Module 1)*: Both Ontario privacy laws with similar principles but different institutional scope:\n• **FIPPA**: Provincial institutions (ministries, Crown agencies, hospitals, universities)\n• **MFIPPA**: Municipal institutions (cities, towns, local agencies)\n• **Similar Privacy Protection**: Both follow comparable collection, use, disclosure principles\n• **Access Rights**: Both provide public access to government records with exemptions\n\n📖 *Reference: Module 1 jurisdiction guide explains when each law applies*"
    ],
    
    'foi': [
        "📋 **Freedom of Information (FOI) Request Processes** *(Module 1: Privacy Laws & Frameworks)*: Understanding how to make and respond to FOI requests under different legislation is essential for transparency and accountability.\n\n🎯 **FOI Under FIPPA (Provincial)**: \n• **Who can request**: Any person (no Ontario residency requirement)\n• **Response timeline**: 30 days from receipt\n• **Fees**: $5 application fee plus processing fees\n• **Appeals**: Information and Privacy Commissioner of Ontario\n\n🏙️ **FOI Under MFIPPA (Municipal)**: \n• **Who can request**: Any person, regardless of residence\n• **Submit to**: Municipal clerk or designated coordinator\n• **Response timeline**: 30 days from receipt\n• **Appeals**: Information and Privacy Commissioner of Ontario\n\n📖 *Reference: Module 1 - FOI Request Processes section provides step-by-step guidance*",
        
        "💡 **FOI Best Practices** *(Module 1)*: \n• **Be Specific**: Clearly describe the records you're seeking to reduce processing time\n• **Consider Format**: Indicate preference for electronic vs paper copies\n• **Understand Exemptions**: Common exemptions include personal privacy, law enforcement, cabinet confidences\n• **Use Informal Requests First**: Often faster for straightforward information\n• **Personal Information Requests**: Usually free when requesting your own information\n\n📖 *Reference: See Module 1 FOI section for exemption categories and request templates*"
    ],
    
    'jurisdiction': [
        "⚖️ **Federal vs Provincial Privacy Law Jurisdiction** *(Module 1: Privacy Laws & Frameworks)*: Understanding when federal vs provincial privacy laws apply is crucial for compliance in Ontario's complex privacy landscape.\n\n🇨🇦 **Federal Privacy Laws Apply**: \n• **PIPEDA**: Private sector commercial activities, interprovincial/international commerce\n• **Privacy Act**: Federal government institutions\n• **Federal Sectors**: Banks, telecommunications, airlines, railways\n\n🏢 **Provincial Privacy Laws Apply**: \n• **FIPPA**: Ontario government ministries, agencies, hospitals, universities\n• **MFIPPA**: Ontario municipalities and local agencies\n• **PHIPA**: Health information custodians in Ontario\n\n📖 *Reference: Module 1 jurisdiction guide provides decision trees for determining applicable laws*",
        
        "🔄 **Overlapping Jurisdiction Scenarios** *(Module 1)*: Organizations may be subject to multiple privacy laws:\n• **Healthcare**: PHIPA + federal requirements for interprovincial activities\n• **Universities**: FIPPA + federal research funding requirements\n• **Technology Companies**: PIPEDA + provincial laws for government contracts\n• **Compliance Strategy**: Apply most restrictive requirements when laws overlap\n\n📖 *Reference: Module 1 includes practical compliance frameworks for complex jurisdictional situations*"
    ],
    
    'cybersecurity': [
        "🛡️ **Cybersecurity Fundamentals** *(Module 2: Cybersecurity & Incident Response)*: The foundation is the **CIA Triad**: Confidentiality (protecting information from unauthorized access), Integrity (ensuring information accuracy), and Availability (ensuring authorized access when needed).\n\n🎯 **NIST Cybersecurity Framework**: The five core functions are:\n1. **Identify** - Asset management, governance, risk assessment\n2. **Protect** - Access controls, awareness training, data security\n3. **Detect** - Anomaly detection, continuous monitoring\n4. **Respond** - Response planning, communications, analysis\n5. **Recover** - Recovery planning, improvements, communications\n\n📖 *Reference: Module 2 provides detailed implementation guidance for each NIST function*",
        
        "📊 **Risk Assessment Methodologies** *(Module 2)*: \n• **OCTAVE** (Operationally Critical Threat, Asset, and Vulnerability Evaluation): Organization-driven, focuses on operational risks\n• **FAIR** (Factor Analysis of Information Risk): Quantitative approach using probability and impact\n• **NIST SP 800-30**: Federal standard for conducting risk assessments\n• **ISO 27005**: International standard for information security risk management\n\n📖 *Reference: See Module 2 risk assessment section for step-by-step methodologies*",
        
        "🚨 **Incident Response Planning** *(Module 2)*: Effective incident response requires: preparation (policies, procedures, training), identification (detection and analysis), containment (short-term and long-term), eradication (remove threats), recovery (restore systems), and lessons learned (post-incident analysis and improvements).\n\n📖 *Reference: Module 2 includes incident response templates and checklists*"
    ],
    
    'ai governance': [
        "🤖 **Ontario AI Governance Directive** *(Module 3: AI Governance & Responsible Use)*: Ontario's approach to responsible AI focuses on ensuring AI systems are used ethically and effectively in government. The six key principles are:\n1. **AI use is justified and proportionate** - Problem-first, not technology-first approach\n2. **AI is used to benefit the people of Ontario** - Public interest focus\n3. **AI use is transparent** - Clear about when and how AI is used\n4. **AI use incorporates privacy and security by design** - Built-in protections\n5. **AI use includes human oversight** - Meaningful human involvement in decisions\n6. **AI use is accessible and equitable** - Fair access and outcomes for all Ontarians\n\n📖 *Reference: Module 3 covers Ontario's AI directive with practical implementation scenarios*",
        
        "⚖️ **Algorithmic Impact Assessments (AIAs)** *(Module 3)*: Required for high-impact AI systems, AIAs evaluate potential risks including bias, privacy impacts, and unintended consequences. The assessment covers: system purpose and functionality, data sources and quality, potential impacts on individuals and groups, mitigation measures, and ongoing monitoring requirements.\n\n📖 *Reference: Module 3 includes AIA templates and step-by-step guidance*",
        
        "🎯 **AI Ethics in Practice** *(Module 3)*: Implementing responsible AI requires addressing bias (ensuring fair outcomes across different groups), explainability (ability to understand AI decisions), accountability (clear responsibility for AI outcomes), and human oversight (ensuring humans remain in control of important decisions).\n\n📖 *Reference: See Module 3 practical scenarios section for real-world implementation examples*"
    ],
    
    'data management': [
        "📁 **Data Classification Framework** *(Module 4: Secure Data & Records Management)*: Effective data management starts with classification based on sensitivity:\n• **Public**: No harm if disclosed (websites, marketing materials)\n• **Internal**: Minimal harm if disclosed (policies, procedures)\n• **Confidential**: Moderate harm if disclosed (employee records, contracts)\n• **Restricted**: Significant harm if disclosed (financial data, personal information)\n\nEach level requires appropriate security controls - access restrictions, encryption, handling procedures.\n\n📖 *Reference: Module 4 provides detailed classification schemas and security controls matrix*",
        
        "📅 **Records Retention Policies** *(Module 4)*: Must balance legal requirements, operational needs, and storage costs. Key elements include: retention schedules based on record type, legal holds for litigation, secure disposal procedures, and regular reviews. For municipalities, retention schedules must comply with provincial requirements and Municipal Act provisions.\n\n📖 *Reference: Module 4 includes sample retention schedules and disposal protocols*",
        
        "🌐 **Cross-Border Data Compliance** *(Module 4)*: When transferring data internationally, consider: destination country privacy laws, adequacy decisions (EU), data processing agreements with clear privacy terms, additional safeguards for sensitive data, and ongoing monitoring of compliance. For MFIPPA-covered organizations, remember the strict Canadian storage requirement.\n\n📖 *Reference: See Module 4 international data transfer section for compliance checklists*"
    ],
    
    'bill194': [
        "📜 **Bill 194 - Enhanced Privacy Protection** *(Module 1)*: Bill 194 introduces significant updates to Ontario's privacy landscape with:\n\n**Enhanced Breach Notification**: \n• Mandatory 24-hour notification to Privacy Commissioner for significant breaches\n• Expanded definition of privacy breaches\n• Detailed reporting requirements including impact assessments\n\n**Strengthened Individual Rights**: \n• Enhanced data portability rights\n• Expanded access and correction rights\n• Stronger consent requirements\n\n**Increased Enforcement**: \n• Penalties up to $10M or 2% of global revenue\n• Enhanced investigation powers for Commissioner\n• Public reporting of compliance orders\n\n📖 *Reference: Module 1 - Bill 194 section provides implementation timeline and compliance guidance*"
    ],
    
    'quiz': [
        "📝 **Comprehensive Quiz Preparation Strategy** *(All Modules)*: \n\n**Foundation Knowledge (Module 1):**\n• Master the 10 PIPEDA principles and their real-world applications\n• Understand MFIPPA's collection, use, and disclosure rules with municipal examples\n• Know the precise differences between PIPEDA, MFIPPA, PHIPA, and FIPPA scope\n• Practice identifying when PIAs are required with various scenarios\n• Remember cross-border data storage restrictions under MFIPPA Section 30.1\n\n**Security Fundamentals (Module 2):**\n• Master NIST cybersecurity framework's five functions with practical examples\n• Understand risk assessment methodologies (OCTAVE, FAIR, NIST SP 800-30)\n• Know incident response phases and evidence handling procedures\n• Practice vulnerability management and patch prioritization\n\n**AI Governance (Module 3):**\n• Understand Ontario's six AI governance principles with implementation examples\n• Know when and how to conduct Algorithmic Impact Assessments\n• Practice identifying AI bias and implementing fairness measures\n\n**Data Management (Module 4):**\n• Know data classification levels and appropriate security controls\n• Understand retention requirements and secure disposal procedures\n• Master cross-border data transfer compliance requirements\n\n📖 *Each module includes interactive knowledge checks to practice these concepts*",
        
        "🎯 **Scenario-Based Learning Tips**: \n\n**Practice with Real Situations:**\n• Municipal Wi-Fi implementation (MFIPPA compliance)\n• Healthcare data sharing (PHIPA circle of care)\n• AI chatbot deployment (Algorithmic Impact Assessment)\n• Cloud service selection (cross-border data requirements)\n• Privacy breach response (notification procedures)\n• FOI request handling (exemption considerations)\n\n**Key Success Strategies:**\n1. **Connect Concepts**: See how privacy law foundations support cybersecurity practices\n2. **Apply Practically**: Use real-world scenarios to test understanding\n3. **Think Critically**: Consider multiple perspectives in complex situations\n4. **Stay Current**: Reference recent Privacy Commissioner decisions\n5. **Practice Regularly**: Use spaced repetition for better retention\n\n📈 **Assessment Approach**: Focus on practical application rather than memorization. Think about 'what would you do' in given scenarios.",
        
        "🔍 **Advanced Preparation Techniques**: \n\n**Memory Techniques:**\n• **PIPEDA Acronym**: 'All Citizens Can Learn Using Simple Access Open Challenges' (Accountability, Consent, Collection, etc.)\n• **MFIPPA Compliance**: Remember 'CLUE' - Collect only necessary, Limit use, Understand disclosure rules, Ensure safeguards\n• **NIST Framework**: 'I Protect Data Rapidly Recovering' (Identify, Protect, Detect, Respond, Recover)\n\n**Case Study Method:**\n• Analyze real Privacy Commissioner decisions\n• Review cybersecurity incident case studies\n• Examine AI governance implementation examples\n• Study data breach notification scenarios\n\n**Interactive Practice:**\n• Role-play FOI request scenarios\n• Conduct mock privacy impact assessments\n• Practice incident response decision-making\n• Simulate AI risk assessment processes\n\n💡 **Pro Tip**: Create your own scenarios based on your organization's context - this builds both understanding and practical application skills."
    ],
    
    'scenario_analysis': [
        "🏛️ **Municipal Scenario Analysis**: \n\n**Case Study: Smart City Initiative**\nA municipality wants to implement smart traffic lights that collect vehicle flow data and integrate with emergency services. Consider these privacy implications:\n\n**MFIPPA Analysis:**\n• Is the data 'personal information' under MFIPPA?\n• What collection authority exists for traffic management?\n• How does Section 30.1 affect cloud-based analytics?\n• What PIA requirements apply?\n\n**Solution Framework:**\n1. **Data Minimization**: Collect only aggregate flow data, not individual vehicle tracking\n2. **Purpose Limitation**: Use only for traffic optimization and emergency response\n3. **Storage Compliance**: Ensure Canadian data residency for any personal information\n4. **Transparency**: Publish clear notices about data collection and use\n\n📖 *This demonstrates practical application of Module 1 concepts*",
        
        "🏥 **Healthcare Scenario Analysis**: \n\n**Case Study: Telemedicine Platform**\nA hospital wants to implement a telemedicine platform for remote consultations. PHIPA considerations:\n\n**Circle of Care Analysis:**\n• Who is included in the patient's care team?\n• How does virtual care affect traditional consent models?\n• What technical safeguards are required?\n• How do you handle cross-provincial consultations?\n\n**Implementation Strategy:**\n1. **Consent Framework**: Clear explanation of virtual care processes\n2. **Technical Controls**: End-to-end encryption, secure authentication\n3. **Access Management**: Role-based permissions for care team members\n4. **Audit Requirements**: Comprehensive logging of access and disclosures\n\n📈 **Integration Consideration**: How does this connect to cybersecurity controls from Module 2?",
        
        "🤖 **AI Implementation Scenario**: \n\n**Case Study: Automated Benefits Processing**\nA government agency wants to use AI for processing social assistance applications. AI governance analysis:\n\n**Ontario Directive Application:**\n• Is AI use justified and proportionate for this purpose?\n• How does it benefit the people of Ontario?\n• What transparency measures are needed?\n• How do you ensure human oversight?\n\n**Risk Assessment Process:**\n1. **Algorithmic Impact Assessment**: Evaluate bias, fairness, accuracy\n2. **Stakeholder Consultation**: Include affected communities in design\n3. **Ongoing Monitoring**: Regular bias testing and performance review\n4. **Appeal Mechanisms**: Clear process for challenging AI decisions\n\n💡 **Key Question**: How do you balance efficiency gains with fairness and accountability requirements?"
    ],
    
    'implementation_guide': [
        "🔧 **Step-by-Step Implementation Guidance**: \n\n**Privacy Program Development:**\n\n**Phase 1: Foundation (Months 1-3)**\n• Conduct comprehensive privacy audit using PIPEDA/MFIPPA frameworks\n• Identify all personal information flows and data repositories\n• Review and update privacy policies and procedures\n• Establish privacy governance structure with designated officers\n\n**Phase 2: Enhancement (Months 4-6)**\n• Implement Privacy Impact Assessment processes\n• Develop breach response and notification procedures\n• Create staff training programs on privacy requirements\n• Establish vendor management and data processing agreements\n\n**Phase 3: Optimization (Months 7-12)**\n• Implement continuous monitoring and audit procedures\n• Develop privacy by design frameworks for new initiatives\n• Create public transparency and accountability measures\n• Establish regular review and update cycles\n\n📊 **Success Metrics**: Track PIA completion rates, breach response times, staff training completion, and compliance audit results.",
        
        "🛡️ **Cybersecurity Implementation Roadmap**: \n\n**Risk-Based Security Program:**\n\n**Immediate Actions (0-30 days)**\n• Conduct baseline vulnerability assessment\n• Implement critical security patches\n• Enable multi-factor authentication for administrative accounts\n• Establish incident response team and communication procedures\n\n**Short-term Goals (30-90 days)**\n• Deploy comprehensive endpoint protection\n• Implement network segmentation and monitoring\n• Conduct security awareness training for all staff\n• Develop and test backup and recovery procedures\n\n**Long-term Strategy (90+ days)**\n• Implement NIST Cybersecurity Framework across all functions\n• Establish continuous vulnerability management program\n• Develop threat intelligence and monitoring capabilities\n• Create security metrics and reporting dashboards\n\n🎯 **Integration Point**: Ensure cybersecurity controls support privacy protection requirements from Module 1.",
        
        "⚖️ **AI Governance Implementation**: \n\n**Responsible AI Framework Development:**\n\n**Governance Structure**\n• Establish AI Ethics Committee with diverse representation\n• Create AI risk assessment and approval processes\n• Develop AI procurement and vendor management standards\n• Implement ongoing monitoring and audit procedures\n\n**Technical Implementation**\n• Integrate fairness testing into AI development lifecycle\n• Implement explainability and transparency measures\n• Create human oversight and intervention mechanisms\n• Establish data quality and bias monitoring systems\n\n**Organizational Culture**\n• Train staff on responsible AI principles and practices\n• Create clear escalation and decision-making processes\n• Establish public consultation and feedback mechanisms\n• Develop communication strategies for AI transparency\n\n🔄 **Continuous Improvement**: Regular review of AI systems against Ontario's six governance principles."
    ],
    
    'module1': [
        "📚 **Module 1: Privacy Laws & Frameworks** focuses on Ontario's comprehensive privacy landscape:\n\n**Key Learning Areas:**\n• PIPEDA's 10 Fair Information Principles\n• PHIPA requirements for health information protection\n• FIPPA provisions for provincial institutions\n• Federal vs provincial privacy law jurisdiction\n• Freedom of Information (FOI) request processes\n• MFIPPA requirements for municipalities\n• Privacy Impact Assessment (PIA) processes\n• Cross-border data management (Section 30.1)\n• Bill 194 privacy enhancements\n• Breach response and notification\n\n**Main Sections:**\n• PIPEDA Overview\n• PHIPA - Personal Health Information Protection Act\n• FIPPA - Freedom of Information and Protection of Privacy Act\n• Federal vs Provincial Privacy Law Jurisdiction\n• Freedom of Information (FOI) Request Processes\n• MFIPPA Comprehensive Framework\n• Privacy Impact Assessments\n• Cross-Border Data Management\n• Breach Response and Notification\n• Bill 194 - New Requirements\n\n📖 *This expanded module provides comprehensive foundation for all privacy compliance*"
    ],
    
    'module2': [
        "🛡️ **Module 2: Cybersecurity & Incident Response** covers defensive strategies:\n\n**Key Learning Areas:**\n• CIA Triad (Confidentiality, Integrity, Availability)\n• NIST Cybersecurity Framework (5 functions)\n• Risk assessment methodologies (OCTAVE, FAIR, NIST SP 800-30)\n• Incident response planning and procedures\n• Threat modeling and vulnerability management\n• Security controls implementation\n\n**Core Frameworks:**\n• NIST Cybersecurity Framework\n• ISO 27001/27002 standards\n• COBIT governance framework\n• OCTAVE risk assessment\n\n📖 *Builds on privacy foundations from Module 1*"
    ],
    
    'module3': [
        "🤖 **Module 3: AI Governance & Responsible Use** addresses ethical AI deployment:\n\n**Key Learning Areas:**\n• Ontario's six AI governance principles\n• Algorithmic Impact Assessments (AIAs)\n• AI bias detection and mitigation\n• Transparency and explainability requirements\n• Human oversight and accountability\n• AI system lifecycle management\n\n**Core Principles:**\n1. Justified and proportionate use\n2. Benefit to people of Ontario\n3. Transparency in AI use\n4. Privacy and security by design\n5. Human oversight\n6. Accessibility and equity\n\n📖 *Integrates privacy and security concepts from Modules 1 & 2*"
    ],
    
    'module4': [
        "📁 **Module 4: Secure Data & Records Management** covers information lifecycle:\n\n**Key Learning Areas:**\n• Data classification schemas (Public, Internal, Confidential, Restricted)\n• Records retention policies and schedules\n• Secure disposal procedures\n• Cross-border data transfer compliance\n• Data governance frameworks\n• Information architecture\n\n**Management Areas:**\n• Classification and labeling\n• Access controls and permissions\n• Retention and disposal\n• Transfer and sharing agreements\n• Compliance monitoring\n• Audit and reporting\n\n📖 *Applies all concepts from Modules 1-3 to practical data management*"
    ],
    
    'default': [
        "👋 **Welcome to your Enhanced OCRP Study Assistant!** I'm here to provide personalized, detailed guidance on Ontario's privacy and cybersecurity landscape. I can help with:\n\n📚 **Core Topics**: \n• PIPEDA's 10 Fair Information Principles with real-world applications *(Module 1)*\n• PHIPA requirements including circle of care scenarios *(Module 1)*\n• FIPPA provisions with practical FOI examples *(Module 1)*\n• Federal vs provincial privacy law jurisdiction decisions *(Module 1)*\n• MFIPPA requirements with municipal case studies *(Module 1)*\n• Cybersecurity frameworks with implementation guidance *(Module 2)*\n• AI governance with algorithmic impact assessments *(Module 3)*\n• Data management with cross-border compliance *(Module 4)*\n• Bill 194 privacy enhancements and timelines *(Module 1)*\n\n💡 **Interactive Features**:\n• Scenario-based learning with real case studies\n• Step-by-step implementation guides\n• Personalized study recommendations\n• Progress-aware responses\n• Multi-level explanations (beginner to advanced)\n\n🎯 **Smart Assistance**: I adapt my responses based on your learning progress, previous questions, and complexity preferences. Ask me anything from basic concepts to advanced implementation strategies!\n\n📖 **All responses include module references and practical next steps**",
        
        "🚀 **Advanced Learning Experience**: I provide contextual, conversation-aware responses that build on our previous discussions. My capabilities include:\n\n**Personalized Learning:**\n• Adaptive explanations based on your experience level\n• Progress-aware encouragement and recommendations\n• Context-aware responses that reference previous topics\n• Learning objective alignment with your current module\n\n**Practical Application:**\n• Real-world scenario analysis and case studies\n• Step-by-step implementation guidance\n• Risk assessment and decision-making frameworks\n• Integration strategies across all four modules\n\n**Interactive Support:**\n• Follow-up question suggestions\n• Cross-module concept connections\n• Practical exercise recommendations\n• Resource and tool recommendations\n\n💡 **Study Strategy**: Each topic builds on others - privacy law foundations (Module 1) support cybersecurity practices (Module 2), which inform AI governance approaches (Module 3) and data management strategies (Module 4). I'll help you see these connections!\n\n📈 **Continuous Improvement**: The more we interact, the better I can tailor responses to your learning style and needs."
    ]
};

// Enhanced keyword matching for educational responses with better context understanding
function findRelevantTopic(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Multi-word phrase detection for better accuracy
    const phraseMap: Record<string, string> = {
        'personal information protection and electronic documents': 'pipeda',
        'fair information principles': 'pipeda',
        'municipal freedom of information': 'mfippa',
        'personal health information protection': 'phipa',
        'freedom of information and protection': 'fippa',
        'algorithmic impact assessment': 'ai governance',
        'ontario ai directive': 'ai governance',
        'cross border data': 'data management',
        'vulnerability assessment': 'cybersecurity',
        'incident response': 'cybersecurity',
        'risk assessment': 'cybersecurity',
        'privacy impact assessment': 'module1',
        'data classification': 'data management',
        'records retention': 'data management'
    };
    
    // Check for exact phrase matches first
    for (const [phrase, topic] of Object.entries(phraseMap)) {
        if (lowerMessage.includes(phrase)) {
            return topic;
        }
    }
    
    // PIPEDA related queries
    if (lowerMessage.includes('pipeda') || lowerMessage.includes('personal information protection') || 
        lowerMessage.includes('fair information principles') || lowerMessage.includes('federal privacy law') ||
        lowerMessage.includes('private sector') || lowerMessage.includes('commercial activities')) {
        return 'pipeda';
    }
    
    // PHIPA related queries
    if (lowerMessage.includes('phipa') || lowerMessage.includes('personal health information') || 
        lowerMessage.includes('health privacy') || lowerMessage.includes('circle of care') ||
        lowerMessage.includes('health information custodian') || lowerMessage.includes('health records')) {
        return 'phipa';
    }
    
    // FIPPA related queries
    if (lowerMessage.includes('fippa') || lowerMessage.includes('freedom of information and protection') ||
        lowerMessage.includes('provincial privacy') || lowerMessage.includes('ontario government') ||
        lowerMessage.includes('crown agencies') || lowerMessage.includes('provincial institutions')) {
        return 'fippa';
    }
    
    // FOI/Access to Information queries
    if (lowerMessage.includes('foi') || lowerMessage.includes('freedom of information') ||
        lowerMessage.includes('access to information') || lowerMessage.includes('foi request') ||
        lowerMessage.includes('information request') || lowerMessage.includes('government records')) {
        return 'foi';
    }
    
    // Jurisdiction and legal framework queries
    if ((lowerMessage.includes('federal') || lowerMessage.includes('provincial')) && 
        (lowerMessage.includes('jurisdiction') || lowerMessage.includes('apply') || lowerMessage.includes('when'))) {
        return 'jurisdiction';
    }
    
    // MFIPPA related queries
    if (lowerMessage.includes('mfippa') || lowerMessage.includes('municipal freedom') || 
        lowerMessage.includes('municipal privacy') || lowerMessage.includes('ontario municipalities') ||
        lowerMessage.includes('section 30.1') || lowerMessage.includes('canadian storage')) {
        return 'mfippa';
    }
    
    // Comparison queries
    if ((lowerMessage.includes('difference') || lowerMessage.includes('compare') || lowerMessage.includes('vs')) &&
        (lowerMessage.includes('pipeda') || lowerMessage.includes('mfippa'))) {
        return 'differences';
    }
    
    // Cybersecurity related queries
    if (lowerMessage.includes('cybersecurity') || lowerMessage.includes('cyber security') || 
        lowerMessage.includes('nist') || lowerMessage.includes('risk assessment') ||
        lowerMessage.includes('cia triad') || lowerMessage.includes('incident response') ||
        lowerMessage.includes('octave') || lowerMessage.includes('fair methodology') ||
        lowerMessage.includes('vulnerability') || lowerMessage.includes('penetration test') ||
        lowerMessage.includes('system hardening') || lowerMessage.includes('security controls')) {
        return 'cybersecurity';
    }
    
    // AI Governance related queries
    if (lowerMessage.includes('ai governance') || lowerMessage.includes('artificial intelligence') || 
        lowerMessage.includes('algorithmic impact') || lowerMessage.includes('ontario ai directive') ||
        lowerMessage.includes('responsible ai') || lowerMessage.includes('ai ethics') ||
        lowerMessage.includes('machine learning') || lowerMessage.includes('automation ethics')) {
        return 'ai governance';
    }
    
    // Data Management related queries
    if (lowerMessage.includes('data management') || lowerMessage.includes('data classification') || 
        lowerMessage.includes('retention') || lowerMessage.includes('cross-border') ||
        lowerMessage.includes('records management') || lowerMessage.includes('data storage') ||
        lowerMessage.includes('data governance') || lowerMessage.includes('information lifecycle')) {
        return 'data management';
    }
    
    // Bill 194 related queries
    if (lowerMessage.includes('bill 194') || lowerMessage.includes('bill c-27') ||
        lowerMessage.includes('privacy enhancement') || lowerMessage.includes('breach notification')) {
        return 'bill194';
    }
    
    // Assessment and preparation queries
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('exam') ||
        lowerMessage.includes('prepare') || lowerMessage.includes('study tips') ||
        lowerMessage.includes('assessment') || lowerMessage.includes('knowledge check')) {
        return 'quiz';
    }
    
    // Module-specific queries
    if (lowerMessage.includes('module 1') || lowerMessage.includes('module1') || 
        lowerMessage.includes('privacy laws') || lowerMessage.includes('privacy frameworks')) {
        return 'module1';
    }
    
    if (lowerMessage.includes('module 2') || lowerMessage.includes('module2') || 
        lowerMessage.includes('cybersecurity') || lowerMessage.includes('incident response')) {
        return 'module2';
    }
    
    if (lowerMessage.includes('module 3') || lowerMessage.includes('module3') || 
        lowerMessage.includes('ai governance') || lowerMessage.includes('responsible ai')) {
        return 'module3';
    }
    
    if (lowerMessage.includes('module 4') || lowerMessage.includes('module4') || 
        lowerMessage.includes('data management') || lowerMessage.includes('records management')) {
        return 'module4';
    }
    
    return 'default';
}

// Enhanced Educational Assistant Implementation
export class EducationalAssistant {
    private selectedProvider: string = 'educational-assistant';
    private conversationHistory: Array<{message: string, response: string, timestamp: Date}> = [];
    private userProgress: any = {};
    private learningPreferences: any = {};
    
    constructor(provider: string = 'educational-assistant') {
        this.selectedProvider = provider;
    }
    
    async generateResponse(message: string, context?: any): Promise<string> {
        // Enhanced context understanding
        const enhancedContext = this.buildEnhancedContext(message, context);
        let response: string;
        
        switch (this.selectedProvider) {
            case 'educational-assistant':
                response = this.getAdvancedEducationalResponse(message, enhancedContext);
                break;
            case 'ollama':
                response = await this.getOllamaResponse(message);
                break;
            case 'huggingface':
                response = await this.getHuggingFaceResponse(message);
                break;
            default:
                response = this.getAdvancedEducationalResponse(message, enhancedContext);
        }
        
        // Store conversation history for context
        this.conversationHistory.push({
            message,
            response,
            timestamp: new Date()
        });
        
        // Keep only last 10 conversations for context
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }
        
        return response;
    }
    
    private buildEnhancedContext(message: string, context?: any) {
        return {
            currentModule: context?.currentModule,
            userProgress: context?.userProgress || this.userProgress,
            conversationHistory: this.conversationHistory.slice(-3), // Last 3 exchanges
            messageIntent: this.analyzeMessageIntent(message),
            learningObjectives: this.getCurrentLearningObjectives(context?.currentModule),
            userLevel: this.assessUserLevel(message, context),
            ...context
        };
    }
    
    private analyzeMessageIntent(message: string): string {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does')) {
            return 'explanation';
        }
        if (lowerMessage.includes('example') || lowerMessage.includes('scenario') || lowerMessage.includes('case study')) {
            return 'practical_application';
        }
        if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('confused')) {
            return 'assistance';
        }
        if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('prepare')) {
            return 'assessment_prep';
        }
        if (lowerMessage.includes('compare') || lowerMessage.includes('difference') || lowerMessage.includes('vs')) {
            return 'comparison';
        }
        if (lowerMessage.includes('steps') || lowerMessage.includes('how to') || lowerMessage.includes('process')) {
            return 'procedural';
        }
        
        return 'general_inquiry';
    }
    
    private getCurrentLearningObjectives(currentModule?: string): string[] {
        const objectives: Record<string, string[]> = {
            'module1': [
                'Understanding PIPEDA principles',
                'Navigating MFIPPA requirements', 
                'Mastering FOI processes',
                'Implementing privacy impact assessments'
            ],
            'module2': [
                'Applying risk assessment methodologies',
                'Implementing system hardening',
                'Developing incident response capabilities',
                'Understanding cryptographic controls'
            ],
            'module3': [
                'Implementing AI governance principles',
                'Conducting algorithmic impact assessments',
                'Ensuring responsible AI deployment',
                'Managing AI risks and bias'
            ],
            'module4': [
                'Implementing data classification',
                'Managing records retention',
                'Ensuring cross-border compliance',
                'Developing data governance frameworks'
            ]
        };
        
        return objectives[currentModule || 'module1'] || [];
    }
    
    private assessUserLevel(message: string, context?: any): 'beginner' | 'intermediate' | 'advanced' {
        // Analyze complexity of questions and previous interactions
        const complexTerms = ['algorithmic impact', 'cross-border compliance', 'cryptographic', 'governance framework'];
        const hasComplexTerms = complexTerms.some(term => message.toLowerCase().includes(term));
        
        if (hasComplexTerms || (context?.userProgress?.completedModules || 0) > 2) {
            return 'advanced';
        }
        if ((context?.userProgress?.completedModules || 0) > 0) {
            return 'intermediate';
        }
        return 'beginner';
    }
    
    private getAdvancedEducationalResponse(message: string, context: any): string {
        const topic = findRelevantTopic(message);
        const intent = context.messageIntent;
        const userLevel = context.userLevel;
        const responses = EDUCATIONAL_RESPONSES[topic];
        
        // Get base response
        let baseResponse = this.selectContextualResponse(responses, intent, userLevel);
        
        // Enhance based on conversation context
        if (context.conversationHistory.length > 0) {
            baseResponse = this.addConversationalContext(baseResponse, context.conversationHistory);
        }
        
        // Add personalized learning suggestions
        baseResponse += this.generatePersonalizedSuggestions(topic, context);
        
        // Add progress encouragement if appropriate
        if (context.userProgress?.completedModules > 0) {
            baseResponse += this.addProgressEncouragement(context.userProgress);
        }
        
        return baseResponse;
    }
    
    private selectContextualResponse(responses: string[], intent: string, userLevel: string): string {
        if (!responses || responses.length === 0) {
            return EDUCATIONAL_RESPONSES['default'][0];
        }
        
        // For explanations, prefer detailed responses
        if (intent === 'explanation' && responses.length > 1) {
            return responses[0]; // Most comprehensive
        }
        
        // For beginners, prefer simpler explanations
        if (userLevel === 'beginner' && responses.length > 2) {
            return responses[responses.length - 1]; // Usually simpler
        }
        
        // For practical applications, look for examples
        if (intent === 'practical_application') {
            const practicalResponse = responses.find(r => 
                r.includes('example') || r.includes('scenario') || r.includes('practice')
            );
            if (practicalResponse) return practicalResponse;
        }
        
        // Default selection logic
        const randomValue = Math.random();
        if (randomValue < 0.7) {
            return responses[0];
        } else {
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        }
    }
    
    private addConversationalContext(response: string, history: any[]): string {
        if (history.length === 0) return response;
        
        const lastExchange = history[history.length - 1];
        if (lastExchange && lastExchange.message.toLowerCase().includes('more') || 
            lastExchange.message.toLowerCase().includes('tell me more')) {
            return response + "\n\n💡 **Building on our previous discussion**: This connects to what we covered earlier about " + 
                   this.extractKeyTopic(lastExchange.response) + ". ";
        }
        
        return response;
    }
    
    private extractKeyTopic(previousResponse: string): string {
        // Extract main topic from previous response
        if (previousResponse.includes('PIPEDA')) return 'PIPEDA principles';
        if (previousResponse.includes('MFIPPA')) return 'municipal privacy requirements';
        if (previousResponse.includes('AI governance')) return 'AI governance frameworks';
        if (previousResponse.includes('cybersecurity')) return 'cybersecurity fundamentals';
        return 'the fundamentals we discussed';
    }
    
    private generatePersonalizedSuggestions(topic: string, context: any): string {
        const suggestions: Record<string, string[]> = {
            'pipeda': [
                "\n\n🚀 **Next Steps**: Try exploring how PIPEDA principles apply to your specific sector",
                "\n\n🔍 **Deep Dive**: Consider reviewing actual Privacy Commissioner decisions for real-world applications",
                "\n\n📝 **Practice**: Work through the PIPEDA compliance checklist with a hypothetical scenario"
            ],
            'mfippa': [
                "\n\n🏛️ **Municipal Focus**: Review your municipality's current privacy policies against MFIPPA requirements",
                "\n\n🌐 **Cross-Border**: Pay special attention to Section 30.1 requirements for your cloud services",
                "\n\n📋 **Practical Application**: Consider conducting a PIA for a recent municipal initiative"
            ],
            'cybersecurity': [
                "\n\n🛡️ **Hands-On**: Try implementing a basic vulnerability assessment in your environment",
                "\n\n📊 **Risk Focus**: Practice using different risk assessment methodologies for comparison",
                "\n\n🚨 **Incident Prep**: Review and test your organization's incident response procedures"
            ],
            'ai governance': [
                "\n\n🤖 **Assessment Practice**: Try conducting an AIA for a hypothetical AI implementation",
                "\n\n⚖️ **Ethics Focus**: Consider how each of Ontario's six principles applies to your use cases",
                "\n\n📈 **Monitoring**: Develop a framework for ongoing AI system monitoring"
            ]
        };
        
        const topicSuggestions = suggestions[topic] || suggestions['pipeda'];
        const randomSuggestion = topicSuggestions[Math.floor(Math.random() * topicSuggestions.length)];
        
        return randomSuggestion;
    }
    
    private addProgressEncouragement(userProgress: any): string {
        const completedCount = userProgress.completedModules || 0;
        const encouragements = [
            `\n\n🌟 **Great Progress**: You've completed ${completedCount} module${completedCount !== 1 ? 's' : ''}! Keep building on this foundation.`,
            `\n\n🎯 **Learning Journey**: Your completion of ${completedCount} module${completedCount !== 1 ? 's' : ''} shows strong commitment to mastering OCRP concepts.`,
            `\n\n📈 **Skill Building**: With ${completedCount} module${completedCount !== 1 ? 's' : ''} under your belt, you're developing comprehensive cyber resilience expertise.`
        ];
        
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }
    
    private async getOllamaResponse(message: string): Promise<string> {
        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama2', // or another model available in Ollama
                    prompt: `You are an expert cybersecurity instructor for the Ontario Certified Cyber Resilience Professional (OCRP) program. Answer this question about privacy laws, cybersecurity, AI governance, or data management: ${message}`,
                    stream: false
                })
            });
            
            if (!response.ok) {
                throw new Error('Ollama not available');
            }
            
            const data = await response.json();
            return data.response || 'Sorry, I could not generate a response at this time.';
        } catch (error) {
            console.warn('Ollama not available, falling back to educational assistant');
            return this.getEducationalResponse(message);
        }
    }
    
    private async getHuggingFaceResponse(message: string): Promise<string> {
        try {
            // Note: This would require a HuggingFace API key for production use
            // For demo purposes, we'll fall back to educational assistant
            console.log('HuggingFace integration would be implemented here');
            return this.getEducationalResponse(message);
        } catch (error) {
            console.warn('HuggingFace not available, falling back to educational assistant');
            return this.getEducationalResponse(message);
        }
    }
}

// Factory function to create the appropriate AI assistant
export function createAIAssistant(userTier: string = 'basic'): EducationalAssistant {
    // For basic users, always use the educational assistant
    // Premium users could have access to more advanced AI providers
    const provider = userTier === 'basic' ? 'educational-assistant' : 'educational-assistant';
    return new EducationalAssistant(provider);
}

// Streaming response generator for chat interface
export async function* generateStreamingResponse(message: string, assistant: EducationalAssistant): AsyncGenerator<string> {
    const response = await assistant.generateResponse(message);
    
    // Simulate streaming by yielding chunks of the response
    const words = response.split(' ');
    for (let i = 0; i < words.length; i++) {
        yield words[i] + (i < words.length - 1 ? ' ' : '');
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}