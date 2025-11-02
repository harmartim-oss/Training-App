/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { getTutorChat } from '../services/geminiService';

// Types for legal services and calculations
interface LegalService {
    id: string;
    name: string;
    description: string;
    baseRate: number;
    complexity: 'low' | 'medium' | 'high';
    category: 'privacy' | 'cybersecurity' | 'compliance' | 'litigation' | 'consulting';
}

interface BudgetCalculation {
    service: LegalService;
    hours: number;
    quantity: number;
    adjustments: {
        complexity: number;
        urgency: number;
        location: number;
        experience: number;
    };
    subtotal: number;
    total: number;
}

interface LegalBudgetFormData {
    organizationType: 'municipality' | 'small-business' | 'medium-business' | 'large-enterprise' | 'non-profit';
    projectDescription: string;
    urgency: 'low' | 'medium' | 'high' | 'urgent';
    location: 'toronto' | 'ottawa' | 'other-ontario' | 'remote';
    lawyerExperience: 'junior' | 'mid-level' | 'senior' | 'partner';
    services: BudgetCalculation[];
    additionalRequirements: string;
}

const LEGAL_SERVICES: LegalService[] = [
    {
        id: 'privacy-audit',
        name: 'Privacy Compliance Audit',
        description: 'Comprehensive review of PIPEDA/MFIPPA compliance',
        baseRate: 350,
        complexity: 'high',
        category: 'privacy'
    },
    {
        id: 'data-breach-response',
        name: 'Data Breach Response',
        description: 'Emergency legal response to data breaches',
        baseRate: 450,
        complexity: 'high',
        category: 'cybersecurity'
    },
    {
        id: 'privacy-policy-drafting',
        name: 'Privacy Policy Drafting',
        description: 'Creation of comprehensive privacy policies',
        baseRate: 275,
        complexity: 'medium',
        category: 'privacy'
    },
    {
        id: 'cybersecurity-consultation',
        name: 'Cybersecurity Legal Consultation',
        description: 'Legal advice on cybersecurity frameworks and compliance',
        baseRate: 325,
        complexity: 'medium',
        category: 'cybersecurity'
    },
    {
        id: 'foi-request-handling',
        name: 'FOI Request Handling',
        description: 'Managing Freedom of Information requests',
        baseRate: 225,
        complexity: 'low',
        category: 'compliance'
    },
    {
        id: 'ai-governance-review',
        name: 'AI Governance Framework Review',
        description: 'Legal review of AI deployment and ethics frameworks',
        baseRate: 375,
        complexity: 'high',
        category: 'compliance'
    },
    {
        id: 'contract-review',
        name: 'Technology Contract Review',
        description: 'Review of SaaS, cloud, and technology contracts',
        baseRate: 250,
        complexity: 'medium',
        category: 'consulting'
    },
    {
        id: 'regulatory-compliance',
        name: 'Regulatory Compliance Assessment',
        description: 'Assessment of regulatory compliance requirements',
        baseRate: 300,
        complexity: 'medium',
        category: 'compliance'
    }
];

const LegalBudgetCalculator: React.FC = () => {
    const { isMobile, isTablet } = useMobileDetection();
    const [formData, setFormData] = useState<LegalBudgetFormData>({
        organizationType: 'small-business',
        projectDescription: '',
        urgency: 'medium',
        location: 'toronto',
        lawyerExperience: 'mid-level',
        services: [],
        additionalRequirements: ''
    });
    const [aiInsights, setAiInsights] = useState<string>('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [totalBudget, setTotalBudget] = useState(0);

    // Adjustment multipliers
    const adjustmentFactors = {
        complexity: { low: 0.8, medium: 1.0, high: 1.3 },
        urgency: { low: 0.9, medium: 1.0, high: 1.2, urgent: 1.5 },
        location: { 
            'toronto': 1.2, 
            'ottawa': 1.1, 
            'other-ontario': 1.0, 
            'remote': 0.9 
        },
        experience: { 
            'junior': 0.7, 
            'mid-level': 1.0, 
            'senior': 1.3, 
            'partner': 1.8 
        },
        organizationType: {
            'municipality': 0.9,
            'small-business': 1.0,
            'medium-business': 1.1,
            'large-enterprise': 1.2,
            'non-profit': 0.8
        }
    };

    const addService = (service: LegalService, hours: number = 1, quantity: number = 1) => {
        const adjustments = {
            complexity: adjustmentFactors.complexity[service.complexity],
            urgency: adjustmentFactors.urgency[formData.urgency],
            location: adjustmentFactors.location[formData.location],
            experience: adjustmentFactors.experience[formData.lawyerExperience]
        };

        const adjustedRate = service.baseRate * 
            adjustments.complexity * 
            adjustments.urgency * 
            adjustments.location * 
            adjustments.experience *
            adjustmentFactors.organizationType[formData.organizationType];

        const subtotal = adjustedRate * hours * quantity;
        const calculation: BudgetCalculation = {
            service,
            hours,
            quantity,
            adjustments,
            subtotal: adjustedRate * hours,
            total: subtotal
        };

        setFormData(prev => ({
            ...prev,
            services: [...prev.services, calculation]
        }));
    };

    const removeService = (index: number) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index)
        }));
    };

    const updateServiceQuantity = (index: number, hours: number, quantity: number) => {
        setFormData(prev => {
            const newServices = [...prev.services];
            const service = newServices[index];
            const adjustedRate = service.service.baseRate * 
                service.adjustments.complexity * 
                service.adjustments.urgency * 
                service.adjustments.location * 
                service.adjustments.experience *
                adjustmentFactors.organizationType[formData.organizationType];
            
            service.hours = hours;
            service.quantity = quantity;
            service.subtotal = adjustedRate * hours;
            service.total = adjustedRate * hours * quantity;
            
            return { ...prev, services: newServices };
        });
    };

    useEffect(() => {
        const total = formData.services.reduce((sum, calc) => sum + calc.total, 0);
        setTotalBudget(total);
    }, [formData.services]);

    const generateAIInsights = async () => {
        if (!formData.projectDescription || formData.services.length === 0) return;
        
        setIsCalculating(true);
        try {
            const chat = getTutorChat();
            const serviceNames = formData.services.map(s => s.service.name).join(', ');
            
            const prompt = `As a legal budget consultant specializing in Ontario cybersecurity and privacy law, provide insights for this legal budget estimation:

Organization Type: ${formData.organizationType}
Project: ${formData.projectDescription}
Services Required: ${serviceNames}
Urgency: ${formData.urgency}
Location: ${formData.location}
Total Estimated Budget: $${totalBudget.toLocaleString('en-CA')}

Please provide:
1. Budget reasonableness assessment
2. Potential cost optimization suggestions
3. Risk factors that might affect final costs
4. Ontario-specific legal considerations
5. Recommended next steps

Keep the response practical and focused on Ontario legal requirements.`;

            const response = await chat.sendMessage(prompt);
            setAiInsights(response.text);
        } catch (error) {
            console.error('AI insights generation failed:', error);
            setAiInsights('AI insights temporarily unavailable. Please try again later.');
        }
        setIsCalculating(false);
    };

    return (
        <div className={`min-h-screen bg-background text-text-primary ${isMobile ? 'p-4' : 'p-8'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-mono font-bold tracking-tight text-text-primary mb-4`}>
                        Legal Budget Calculator
                    </h1>
                    <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-text-secondary max-w-3xl mx-auto`}>
                        AI-powered legal cost estimation for Ontario cybersecurity and privacy matters
                    </p>
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <div className="px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold">
                            🤖 AI-Powered
                        </div>
                        <div className="px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold">
                            🍁 Ontario-Focused
                        </div>
                        <div className="px-4 py-2 bg-success/10 rounded-full text-success font-semibold">
                            💼 Professional
                        </div>
                    </div>
                </div>

                <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
                    {/* Input Form */}
                    <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-2'} bg-surface rounded-3xl border border-border p-8`}>
                        <h2 className="text-2xl font-bold font-mono mb-6">Project Information</h2>
                        
                        {/* Organization Type */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3">Organization Type</label>
                            <select 
                                value={formData.organizationType}
                                onChange={(e) => setFormData(prev => ({...prev, organizationType: e.target.value as any}))}
                                className="w-full p-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                            >
                                <option value="municipality">Municipality</option>
                                <option value="small-business">Small Business</option>
                                <option value="medium-business">Medium Business</option>
                                <option value="large-enterprise">Large Enterprise</option>
                                <option value="non-profit">Non-Profit</option>
                            </select>
                        </div>

                        {/* Project Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3">Project Description</label>
                            <textarea 
                                value={formData.projectDescription}
                                onChange={(e) => setFormData(prev => ({...prev, projectDescription: e.target.value}))}
                                placeholder="Describe your legal needs (e.g., PIPEDA compliance review, data breach response, privacy policy update)"
                                className="w-full p-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none h-24 resize-none"
                            />
                        </div>

                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6 mb-6`}>
                            {/* Urgency */}
                            <div>
                                <label className="block text-sm font-semibold mb-3">Urgency Level</label>
                                <select 
                                    value={formData.urgency}
                                    onChange={(e) => setFormData(prev => ({...prev, urgency: e.target.value as any}))}
                                    className="w-full p-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                                >
                                    <option value="low">Low (Standard timeline)</option>
                                    <option value="medium">Medium (Priority work)</option>
                                    <option value="high">High (Rush delivery)</option>
                                    <option value="urgent">Urgent (Emergency)</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold mb-3">Location</label>
                                <select 
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value as any}))}
                                    className="w-full p-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                                >
                                    <option value="toronto">Toronto (GTA)</option>
                                    <option value="ottawa">Ottawa</option>
                                    <option value="other-ontario">Other Ontario</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </div>
                        </div>

                        {/* Lawyer Experience */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold mb-3">Preferred Lawyer Experience Level</label>
                            <select 
                                value={formData.lawyerExperience}
                                onChange={(e) => setFormData(prev => ({...prev, lawyerExperience: e.target.value as any}))}
                                className="w-full p-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                            >
                                <option value="junior">Junior Lawyer (2-5 years)</option>
                                <option value="mid-level">Mid-Level (5-10 years)</option>
                                <option value="senior">Senior Lawyer (10+ years)</option>
                                <option value="partner">Partner Level</option>
                            </select>
                        </div>

                        {/* Legal Services Selection */}
                        <h3 className="text-xl font-bold font-mono mb-4">Legal Services</h3>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            {LEGAL_SERVICES.map(service => (
                                <div key={service.id} className="bg-background border border-border rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-text-primary">{service.name}</h4>
                                            <p className="text-sm text-text-secondary">{service.description}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-primary font-semibold">
                                                    ${service.baseRate}/hour
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    service.complexity === 'high' ? 'bg-error/10 text-error' :
                                                    service.complexity === 'medium' ? 'bg-warning/10 text-warning' :
                                                    'bg-success/10 text-success'
                                                }`}>
                                                    {service.complexity.toUpperCase()}
                                                </span>
                                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                                    {service.category.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addService(service)}
                                            className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Requirements */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3">Additional Requirements</label>
                            <textarea 
                                value={formData.additionalRequirements}
                                onChange={(e) => setFormData(prev => ({...prev, additionalRequirements: e.target.value}))}
                                placeholder="Any special requirements, deadlines, or specific concerns"
                                className="w-full p-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none h-20 resize-none"
                            />
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="bg-surface rounded-3xl border border-border p-8">
                        <h2 className="text-2xl font-bold font-mono mb-6">Budget Estimate</h2>
                        
                        {/* Selected Services */}
                        {formData.services.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">Selected Services</h3>
                                {formData.services.map((calc, index) => (
                                    <div key={index} className="bg-background border border-border rounded-xl p-4 mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-sm">{calc.service.name}</h4>
                                            <button
                                                onClick={() => removeService(index)}
                                                className="text-error hover:text-error/80 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-2">
                                            <div>
                                                <label className="block text-xs text-text-secondary mb-1">Hours</label>
                                                <input
                                                    type="number"
                                                    min="0.5"
                                                    step="0.5"
                                                    value={calc.hours}
                                                    onChange={(e) => updateServiceQuantity(index, parseFloat(e.target.value) || 1, calc.quantity)}
                                                    className="w-full p-2 bg-surface border border-border rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-text-secondary mb-1">Quantity</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={calc.quantity}
                                                    onChange={(e) => updateServiceQuantity(index, calc.hours, parseInt(e.target.value) || 1)}
                                                    className="w-full p-2 bg-surface border border-border rounded text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-primary font-semibold">
                                                ${calc.total.toLocaleString('en-CA')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Total Budget */}
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-text-secondary mb-2">Estimated Total Budget</h3>
                                <div className="text-3xl font-bold font-mono text-primary">
                                    ${totalBudget.toLocaleString('en-CA')}
                                </div>
                                <p className="text-sm text-text-secondary mt-2">
                                    *Estimate based on Ontario legal market rates
                                </p>
                            </div>
                        </div>

                        {/* AI Insights Button */}
                        <button
                            onClick={generateAIInsights}
                            disabled={isCalculating || !formData.projectDescription || formData.services.length === 0}
                            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCalculating ? '🤖 Generating AI Insights...' : '🤖 Get AI Budget Analysis'}
                        </button>

                        {/* AI Insights */}
                        {aiInsights && (
                            <div className="mt-6 bg-background border border-border rounded-xl p-4">
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    🤖 AI Budget Analysis
                                </h4>
                                <div className="text-sm text-text-secondary whitespace-pre-wrap">
                                    {aiInsights}
                                </div>
                            </div>
                        )}

                        {/* Export Options */}
                        {formData.services.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-border">
                                <h4 className="font-semibold mb-3">Export Options</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-2 px-3 bg-surface-elevated border border-border rounded-lg text-sm hover:bg-background transition-colors">
                                        📄 Export PDF
                                    </button>
                                    <button className="py-2 px-3 bg-surface-elevated border border-border rounded-lg text-sm hover:bg-background transition-colors">
                                        📊 Export CSV
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalBudgetCalculator;