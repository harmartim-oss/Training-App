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

// Enhanced Educational Assistant responses for OCRP topics with detailed, specific information
const EDUCATIONAL_RESPONSES: Record<string, string[]> = {
    'pipeda': [
        "📚 **PIPEDA Overview**: The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy law that governs how private sector organizations collect, use, and disclose personal information during commercial activities.\n\n🎯 **The 10 Fair Information Principles**: \n1. **Accountability** - Organizations are responsible for personal information under their control\n2. **Identifying Purposes** - Purposes must be identified before or at time of collection\n3. **Consent** - Knowledge and consent required for collection, use, disclosure\n4. **Limiting Collection** - Only collect what's necessary for identified purposes\n5. **Limiting Use, Disclosure & Retention** - Use only for intended purposes, retain only as long as necessary\n6. **Accuracy** - Keep information accurate, complete, and up-to-date\n7. **Safeguards** - Protect with security appropriate to sensitivity\n8. **Openness** - Make policies and practices readily available\n9. **Individual Access** - Provide access to personal information upon request\n10. **Challenging Compliance** - Address complaints and challenges to compliance",
        
        "💡 **PIPEDA Key Requirements**: Under PIPEDA, organizations must identify purposes for collecting personal information **before or at the time of collection** to ensure transparency. Consent must be meaningful - individuals must understand what they're agreeing to. Organizations can only collect, use, and disclose personal information for purposes that a reasonable person would consider appropriate in the circumstances.",
        
        "⚖️ **PIPEDA Penalties**: Recent amendments under Bill C-27 significantly increase penalties. Maximum fines are now $100,000 for individuals and $10 million for organizations. The Privacy Commissioner also has enhanced investigation powers and can make compliance orders that are enforceable in Federal Court."
    ],
    
    'mfippa': [
        "🏛️ **MFIPPA Comprehensive Framework**: The Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) governs how Ontario municipalities handle personal information and provide access to records, balancing transparency with privacy protection.\n\n📋 **Core MFIPPA Requirements**: \n• **Collection (s.28)**: Must collect directly from individuals unless specific exceptions apply\n• **Use & Disclosure (ss.29-32)**: Use only for original purpose or consistent uses\n• **Cross-border restrictions (s.30.1)**: Personal information must be stored and accessed only in Canada\n• **Individual Rights**: Access, correction, and complaint rights",
        
        "🔒 **MFIPPA Data Storage Rules**: Section 30.1 requires that personal information under municipal control must be **stored and accessed only within Canada**. Limited exceptions include: disclosure authorized under sections 29 or 31, written consent from individual, information available to general public, or Commissioner authorization. This is critical for cloud services - you must verify data residency with providers.",
        
        "📊 **Privacy Impact Assessments under MFIPPA**: PIAs are mandatory for new programs involving personal information collection. The process includes: threshold assessment, data mapping, risk assessment, mitigation strategies, and monitoring plans. Key triggers include new technology implementations, data sharing agreements, and cross-border transfers."
    ],
    
    'differences': [
        "🔍 **Key PIPEDA vs MFIPPA Differences**:\n\n**Scope**: \n• PIPEDA: Private sector, commercial activities, federal jurisdiction\n• MFIPPA: Municipal governments, local agencies, Ontario jurisdiction\n\n**Data Storage**: \n• PIPEDA: No specific geographic restrictions (though foreign laws may apply)\n• MFIPPA: Strict Canadian storage requirement (s.30.1)\n\n**Enforcement**: \n• PIPEDA: Privacy Commissioner investigations, Federal Court enforcement\n• MFIPPA: Information and Privacy Commissioner of Ontario, binding orders\n\n**Consent**: \n• PIPEDA: Explicit consent requirements for collection, use, disclosure\n• MFIPPA: Different rules - often statutory authority rather than consent-based"
    ],
    
    'cybersecurity': [
        "🛡️ **Cybersecurity Fundamentals**: The foundation is the **CIA Triad**: Confidentiality (protecting information from unauthorized access), Integrity (ensuring information accuracy), and Availability (ensuring authorized access when needed).\n\n🎯 **NIST Cybersecurity Framework**: The five core functions are:\n1. **Identify** - Asset management, governance, risk assessment\n2. **Protect** - Access controls, awareness training, data security\n3. **Detect** - Anomaly detection, continuous monitoring\n4. **Respond** - Response planning, communications, analysis\n5. **Recover** - Recovery planning, improvements, communications",
        
        "📊 **Risk Assessment Methodologies**: \n• **OCTAVE** (Operationally Critical Threat, Asset, and Vulnerability Evaluation): Organization-driven, focuses on operational risks\n• **FAIR** (Factor Analysis of Information Risk): Quantitative approach using probability and impact\n• **NIST SP 800-30**: Federal standard for conducting risk assessments\n• **ISO 27005**: International standard for information security risk management",
        
        "🚨 **Incident Response Planning**: Effective incident response requires: preparation (policies, procedures, training), identification (detection and analysis), containment (short-term and long-term), eradication (remove threats), recovery (restore systems), and lessons learned (post-incident analysis and improvements)."
    ],
    
    'ai governance': [
        "🤖 **Ontario AI Governance Directive**: Ontario's approach to responsible AI focuses on ensuring AI systems are used ethically and effectively in government. The five key principles are:\n1. **AI use is justified and proportionate** - Problem-first, not technology-first approach\n2. **AI is used to benefit the people of Ontario** - Public interest focus\n3. **AI use is transparent** - Clear about when and how AI is used\n4. **AI use incorporates privacy and security by design** - Built-in protections\n5. **AI use includes human oversight** - Meaningful human involvement in decisions",
        
        "⚖️ **Algorithmic Impact Assessments (AIAs)**: Required for high-impact AI systems, AIAs evaluate potential risks including bias, privacy impacts, and unintended consequences. The assessment covers: system purpose and functionality, data sources and quality, potential impacts on individuals and groups, mitigation measures, and ongoing monitoring requirements.",
        
        "🎯 **AI Ethics in Practice**: Implementing responsible AI requires addressing bias (ensuring fair outcomes across different groups), explainability (ability to understand AI decisions), accountability (clear responsibility for AI outcomes), and human oversight (ensuring humans remain in control of important decisions)."
    ],
    
    'data management': [
        "📁 **Data Classification Framework**: Effective data management starts with classification based on sensitivity:\n• **Public**: No harm if disclosed (websites, marketing materials)\n• **Internal**: Minimal harm if disclosed (policies, procedures)\n• **Confidential**: Moderate harm if disclosed (employee records, contracts)\n• **Restricted**: Significant harm if disclosed (financial data, personal information)\n\nEach level requires appropriate security controls - access restrictions, encryption, handling procedures.",
        
        "📅 **Records Retention Policies**: Must balance legal requirements, operational needs, and storage costs. Key elements include: retention schedules based on record type, legal holds for litigation, secure disposal procedures, and regular reviews. For municipalities, retention schedules must comply with provincial requirements and Municipal Act provisions.",
        
        "🌐 **Cross-Border Data Compliance**: When transferring data internationally, consider: destination country privacy laws, adequacy decisions (EU), data processing agreements with clear privacy terms, additional safeguards for sensitive data, and ongoing monitoring of compliance. For MFIPPA-covered organizations, remember the strict Canadian storage requirement."
    ],
    
    'bill194': [
        "📜 **Bill 194 - Enhanced Privacy Protection**: Bill 194 introduces significant updates to Ontario's privacy landscape with:\n\n**Enhanced Breach Notification**: \n• Mandatory 24-hour notification to Privacy Commissioner for significant breaches\n• Expanded definition of privacy breaches\n• Detailed reporting requirements including impact assessments\n\n**Strengthened Individual Rights**: \n• Enhanced data portability rights\n• Expanded access and correction rights\n• Stronger consent requirements\n\n**Increased Enforcement**: \n• Penalties up to $10M or 2% of global revenue\n• Enhanced investigation powers for Commissioner\n• Public reporting of compliance orders"
    ],
    
    'quiz': [
        "📝 **Quiz Preparation Tips**: \n• Review the 10 PIPEDA principles and their practical applications\n• Understand MFIPPA's collection, use, and disclosure rules\n• Know the difference between PIPEDA and MFIPPA scope and requirements\n• Practice identifying when PIAs are required\n• Remember cross-border data storage restrictions under MFIPPA\n• Focus on practical scenarios - how would you apply these laws in real situations?",
        
        "🎯 **Key Concepts to Master**: \n1. When organizations must identify purposes for collection (before/at time of collection)\n2. MFIPPA's Canadian storage requirement (Section 30.1)\n3. The relationship between consent and statutory authority\n4. Privacy breach notification requirements\n5. Individual rights under both PIPEDA and MFIPPA\n6. When Privacy Impact Assessments are mandatory"
    ],
    
    'default': [
        "👋 **Welcome to your OCRP Study Assistant!** I'm here to provide detailed, specific guidance on Ontario's privacy and cybersecurity landscape. I can help with:\n\n📚 **Core Topics**: \n• PIPEDA's 10 Fair Information Principles\n• MFIPPA requirements for municipalities\n• Cybersecurity frameworks (NIST, ISO 27001)\n• AI governance and algorithmic impact assessments\n• Data management and cross-border compliance\n• Bill 194 privacy enhancements\n\n💡 **Ask me specific questions** like:\n• 'Explain the differences between PIPEDA and MFIPPA'\n• 'When are Privacy Impact Assessments required?'\n• 'What are the NIST cybersecurity framework functions?'\n• 'How does Ontario's AI governance directive work?'",
        
        "🎯 **Study Tips**: For the best learning experience, try asking follow-up questions! I can explain concepts in different ways, provide practical examples, and help you understand how these laws apply in real-world scenarios. Each topic builds on others - privacy law foundations support cybersecurity practices, which inform AI governance approaches."
    ]
};

// Enhanced keyword matching for educational responses
function findRelevantTopic(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // PIPEDA related queries
    if (lowerMessage.includes('pipeda') || lowerMessage.includes('personal information protection') || 
        lowerMessage.includes('fair information principles') || lowerMessage.includes('federal privacy law') ||
        lowerMessage.includes('private sector') || lowerMessage.includes('commercial activities')) {
        return 'pipeda';
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
        lowerMessage.includes('octave') || lowerMessage.includes('fair methodology')) {
        return 'cybersecurity';
    }
    
    // AI Governance related queries
    if (lowerMessage.includes('ai governance') || lowerMessage.includes('artificial intelligence') || 
        lowerMessage.includes('algorithmic impact') || lowerMessage.includes('ontario ai directive') ||
        lowerMessage.includes('responsible ai') || lowerMessage.includes('ai ethics')) {
        return 'ai governance';
    }
    
    // Data Management related queries
    if (lowerMessage.includes('data management') || lowerMessage.includes('data classification') || 
        lowerMessage.includes('retention') || lowerMessage.includes('cross-border') ||
        lowerMessage.includes('records management') || lowerMessage.includes('data storage')) {
        return 'data management';
    }
    
    // Bill 194 related queries
    if (lowerMessage.includes('bill 194') || lowerMessage.includes('bill c-27') ||
        lowerMessage.includes('privacy enhancement') || lowerMessage.includes('breach notification')) {
        return 'bill194';
    }
    
    // Quiz preparation queries
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('exam') ||
        lowerMessage.includes('prepare') || lowerMessage.includes('study tips') ||
        lowerMessage.includes('assessment') || lowerMessage.includes('knowledge check')) {
        return 'quiz';
    }
    
    return 'default';
}

// Educational Assistant Implementation
export class EducationalAssistant {
    private selectedProvider: string = 'educational-assistant';
    
    constructor(provider: string = 'educational-assistant') {
        this.selectedProvider = provider;
    }
    
    async generateResponse(message: string, context?: any): Promise<string> {
        switch (this.selectedProvider) {
            case 'educational-assistant':
                return this.getEducationalResponse(message);
            case 'ollama':
                return this.getOllamaResponse(message);
            case 'huggingface':
                return this.getHuggingFaceResponse(message);
            default:
                return this.getEducationalResponse(message);
        }
    }
    
    private getEducationalResponse(message: string): string {
        const topic = findRelevantTopic(message);
        const responses = EDUCATIONAL_RESPONSES[topic];
        
        // Return a random response from the topic
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
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