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

// Educational Assistant responses for OCRP topics
const EDUCATIONAL_RESPONSES: Record<string, string[]> = {
    'pipeda': [
        "PIPEDA (Personal Information Protection and Electronic Documents Act) is Canada's federal privacy law. It establishes 10 Fair Information Principles that organizations must follow when collecting, using, and disclosing personal information.",
        "The key principles include: obtaining consent, limiting collection, ensuring accuracy, safeguarding information, and providing access to individuals.",
        "PIPEDA applies to private sector organizations and covers commercial activities across Canada."
    ],
    'mfippa': [
        "MFIPPA (Municipal Freedom of Information and Protection of Privacy Act) is Ontario's law governing municipalities and local agencies.",
        "It provides individuals with rights to access information and protects personal privacy in municipal government.",
        "Key requirements include privacy impact assessments, breach notification, and data minimization principles."
    ],
    'cybersecurity': [
        "Cybersecurity fundamentals include the CIA triad: Confidentiality, Integrity, and Availability.",
        "Key frameworks include NIST Cybersecurity Framework, which provides guidelines for identifying, protecting, detecting, responding to, and recovering from cyber threats.",
        "Risk assessment methodologies like OCTAVE and FAIR help organizations quantify and manage cyber risks."
    ],
    'ai governance': [
        "Ontario's AI governance directive focuses on responsible AI implementation in government.",
        "Key principles include transparency, accountability, fairness, and human oversight.",
        "Algorithmic Impact Assessments help evaluate potential risks and biases in AI systems."
    ],
    'data management': [
        "Secure data management involves proper classification, retention policies, and cross-border compliance.",
        "Data classification helps determine appropriate security controls based on sensitivity levels.",
        "Records retention ensures compliance with legal requirements while minimizing data storage risks."
    ],
    'default': [
        "I'm here to help with your OCRP certification studies! I can assist with topics like PIPEDA, MFIPPA, cybersecurity fundamentals, AI governance, and data management.",
        "Try asking me about specific topics like 'What is PIPEDA?' or 'Explain NIST framework'.",
        "For detailed technical questions, please refer to your module materials and resources."
    ]
};

// Simple keyword matching for educational responses
function findRelevantTopic(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('pipeda') || lowerMessage.includes('personal information protection')) {
        return 'pipeda';
    }
    if (lowerMessage.includes('mfippa') || lowerMessage.includes('municipal freedom')) {
        return 'mfippa';
    }
    if (lowerMessage.includes('cybersecurity') || lowerMessage.includes('cyber security') || lowerMessage.includes('nist') || lowerMessage.includes('risk assessment')) {
        return 'cybersecurity';
    }
    if (lowerMessage.includes('ai governance') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('algorithmic impact')) {
        return 'ai governance';
    }
    if (lowerMessage.includes('data management') || lowerMessage.includes('data classification') || lowerMessage.includes('retention')) {
        return 'data management';
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