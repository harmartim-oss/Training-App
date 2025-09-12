/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface BudgetCategory {
    id: string;
    name: string;
    description: string;
    baseAmount: number;
    multiplier: number;
    isRequired: boolean;
}

interface OrganizationProfile {
    type: 'municipal' | 'healthcare' | 'business' | 'nonprofit';
    size: 'small' | 'medium' | 'large' | 'enterprise';
    dataComplexity: 'low' | 'medium' | 'high';
    riskLevel: 'low' | 'medium' | 'high';
}

const budgetCategories: BudgetCategory[] = [
    {
        id: 'privacy_officer',
        name: 'Privacy Officer/Consultant',
        description: 'Dedicated privacy professional or external consultant',
        baseAmount: 15000,
        multiplier: 1.0,
        isRequired: true
    },
    {
        id: 'legal_review',
        name: 'Legal Review & Compliance',
        description: 'Legal counsel for policy review and compliance assessment',
        baseAmount: 8000,
        multiplier: 1.0,
        isRequired: true
    },
    {
        id: 'staff_training',
        name: 'Staff Training & Education',
        description: 'Privacy and cybersecurity training for all staff',
        baseAmount: 5000,
        multiplier: 1.0,
        isRequired: true
    },
    {
        id: 'policy_development',
        name: 'Policy Development',
        description: 'Development and updating of privacy policies and procedures',
        baseAmount: 6000,
        multiplier: 1.0,
        isRequired: true
    },
    {
        id: 'technical_safeguards',
        name: 'Technical Safeguards',
        description: 'Cybersecurity infrastructure and privacy protection tools',
        baseAmount: 12000,
        multiplier: 1.0,
        isRequired: true
    },
    {
        id: 'pia_assessments',
        name: 'Privacy Impact Assessments',
        description: 'Conducting PIAs for new programs and initiatives',
        baseAmount: 4000,
        multiplier: 1.0,
        isRequired: false
    },
    {
        id: 'incident_response',
        name: 'Incident Response Preparedness',
        description: 'Tools and procedures for privacy breach response',
        baseAmount: 3000,
        multiplier: 1.0,
        isRequired: false
    },
    {
        id: 'compliance_monitoring',
        name: 'Ongoing Compliance Monitoring',
        description: 'Regular audits and compliance assessments',
        baseAmount: 7000,
        multiplier: 1.0,
        isRequired: false
    },
    {
        id: 'vendor_management',
        name: 'Vendor Management & Contracts',
        description: 'Privacy assessment of vendors and data processing agreements',
        baseAmount: 3500,
        multiplier: 1.0,
        isRequired: false
    },
    {
        id: 'ai_governance',
        name: 'AI Governance Implementation',
        description: 'Implementing responsible AI frameworks and assessments',
        baseAmount: 8000,
        multiplier: 1.0,
        isRequired: false
    }
];

const LegalBudgetCalculator: React.FC = () => {
    const [profile, setProfile] = useState<OrganizationProfile>({
        type: 'municipal',
        size: 'medium',
        dataComplexity: 'medium',
        riskLevel: 'medium'
    });
    
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
        new Set(budgetCategories.filter(cat => cat.isRequired).map(cat => cat.id))
    );
    
    const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});
    const [totalBudget, setTotalBudget] = useState<number>(0);
    const [breakdown, setBreakdown] = useState<Record<string, number>>({});

    // Calculate multipliers based on organization profile
    const getMultipliers = (profile: OrganizationProfile) => {
        let sizeMultiplier = 1.0;
        let complexityMultiplier = 1.0;
        let riskMultiplier = 1.0;

        // Size multipliers
        switch (profile.size) {
            case 'small': sizeMultiplier = 0.7; break;
            case 'medium': sizeMultiplier = 1.0; break;
            case 'large': sizeMultiplier = 1.5; break;
            case 'enterprise': sizeMultiplier = 2.0; break;
        }

        // Complexity multipliers
        switch (profile.dataComplexity) {
            case 'low': complexityMultiplier = 0.8; break;
            case 'medium': complexityMultiplier = 1.0; break;
            case 'high': complexityMultiplier = 1.4; break;
        }

        // Risk multipliers
        switch (profile.riskLevel) {
            case 'low': riskMultiplier = 0.9; break;
            case 'medium': riskMultiplier = 1.0; break;
            case 'high': riskMultiplier = 1.3; break;
        }

        // Organization type adjustments
        let typeMultiplier = 1.0;
        switch (profile.type) {
            case 'municipal': typeMultiplier = 1.2; break; // Higher due to MFIPPA requirements
            case 'healthcare': typeMultiplier = 1.4; break; // Higher due to PHIPA requirements
            case 'business': typeMultiplier = 1.0; break;
            case 'nonprofit': typeMultiplier = 0.8; break;
        }

        return sizeMultiplier * complexityMultiplier * riskMultiplier * typeMultiplier;
    };

    // Calculate budget whenever profile or selections change
    useEffect(() => {
        const multiplier = getMultipliers(profile);
        const newBreakdown: Record<string, number> = {};
        let total = 0;

        budgetCategories.forEach(category => {
            if (selectedCategories.has(category.id)) {
                const customAmount = customAmounts[category.id];
                const amount = customAmount !== undefined 
                    ? customAmount 
                    : Math.round(category.baseAmount * multiplier);
                newBreakdown[category.id] = amount;
                total += amount;
            }
        });

        setBreakdown(newBreakdown);
        setTotalBudget(total);
    }, [profile, selectedCategories, customAmounts]);

    const handleCategoryToggle = (categoryId: string) => {
        const category = budgetCategories.find(cat => cat.id === categoryId);
        if (category?.isRequired) return; // Can't toggle required categories

        const newSelected = new Set(selectedCategories);
        if (newSelected.has(categoryId)) {
            newSelected.delete(categoryId);
        } else {
            newSelected.add(categoryId);
        }
        setSelectedCategories(newSelected);
    };

    const handleCustomAmount = (categoryId: string, amount: string) => {
        const numAmount = parseFloat(amount) || 0;
        setCustomAmounts(prev => ({
            ...prev,
            [categoryId]: numAmount
        }));
    };

    const exportToPDF = () => {
        // Create a detailed budget report
        const reportContent = `
        Legal & Compliance Budget Report
        Generated: ${new Date().toLocaleDateString()}
        
        Organization Profile:
        - Type: ${profile.type}
        - Size: ${profile.size}
        - Data Complexity: ${profile.dataComplexity}
        - Risk Level: ${profile.riskLevel}
        
        Budget Breakdown:
        ${Object.entries(breakdown).map(([categoryId, amount]) => {
            const category = budgetCategories.find(cat => cat.id === categoryId);
            return `- ${category?.name}: $${amount.toLocaleString()}`;
        }).join('\n')}
        
        Total Annual Budget: $${totalBudget.toLocaleString()}
        `;

        // Create downloadable text file (since PDF generation has issues)
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `legal-compliance-budget-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="legal-budget-calculator bg-surface border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-text-primary font-mono uppercase">
                📊 Legal & Compliance Budget Calculator
            </h3>
            <p className="text-text-secondary mb-6">
                Calculate your annual legal and compliance budget based on organization profile and regulatory requirements.
            </p>

            {/* Organization Profile */}
            <div className="mb-6 p-4 bg-background border border-border rounded">
                <h4 className="font-semibold text-text-primary mb-3">Organization Profile</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Organization Type</label>
                        <select 
                            value={profile.type}
                            onChange={(e) => setProfile(prev => ({ ...prev, type: e.target.value as any }))}
                            className="w-full p-2 border border-border rounded bg-background text-text-primary"
                        >
                            <option value="municipal">Municipal Government</option>
                            <option value="healthcare">Healthcare Organization</option>
                            <option value="business">Private Business</option>
                            <option value="nonprofit">Non-Profit Organization</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Organization Size</label>
                        <select 
                            value={profile.size}
                            onChange={(e) => setProfile(prev => ({ ...prev, size: e.target.value as any }))}
                            className="w-full p-2 border border-border rounded bg-background text-text-primary"
                        >
                            <option value="small">Small (&lt;50 employees)</option>
                            <option value="medium">Medium (50-200 employees)</option>
                            <option value="large">Large (200-1000 employees)</option>
                            <option value="enterprise">Enterprise (&gt;1000 employees)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Data Complexity</label>
                        <select 
                            value={profile.dataComplexity}
                            onChange={(e) => setProfile(prev => ({ ...prev, dataComplexity: e.target.value as any }))}
                            className="w-full p-2 border border-border rounded bg-background text-text-primary"
                        >
                            <option value="low">Low Complexity</option>
                            <option value="medium">Medium Complexity</option>
                            <option value="high">High Complexity</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Risk Level</label>
                        <select 
                            value={profile.riskLevel}
                            onChange={(e) => setProfile(prev => ({ ...prev, riskLevel: e.target.value as any }))}
                            className="w-full p-2 border border-border rounded bg-background text-text-primary"
                        >
                            <option value="low">Low Risk</option>
                            <option value="medium">Medium Risk</option>
                            <option value="high">High Risk</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Budget Categories */}
            <div className="mb-6">
                <h4 className="font-semibold text-text-primary mb-3">Budget Categories</h4>
                <div className="space-y-3">
                    {budgetCategories.map(category => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-background border border-border rounded">
                            <div className="flex items-center gap-3 flex-1">
                                <input 
                                    type="checkbox"
                                    checked={selectedCategories.has(category.id)}
                                    onChange={() => handleCategoryToggle(category.id)}
                                    disabled={category.isRequired}
                                    className="w-4 h-4"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-text-primary">
                                        {category.name} {category.isRequired && <span className="text-accent text-xs">(Required)</span>}
                                    </div>
                                    <div className="text-sm text-text-secondary">{category.description}</div>
                                </div>
                            </div>
                            {selectedCategories.has(category.id) && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-text-secondary">$</span>
                                    <input 
                                        type="number"
                                        placeholder={Math.round(category.baseAmount * getMultipliers(profile)).toString()}
                                        value={customAmounts[category.id] || ''}
                                        onChange={(e) => handleCustomAmount(category.id, e.target.value)}
                                        className="w-24 p-1 border border-border rounded bg-background text-text-primary text-sm"
                                    />
                                    <span className="text-sm font-medium text-text-primary">
                                        ${(breakdown[category.id] || 0).toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Budget Summary */}
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-semibold text-text-primary mb-1">Total Annual Budget</h4>
                        <p className="text-sm text-text-secondary">Estimated compliance and legal costs</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${totalBudget.toLocaleString()}</div>
                        <div className="text-sm text-text-secondary">CAD per year</div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button 
                    onClick={exportToPDF}
                    className="btn-primary px-4 py-2 text-sm"
                >
                    📄 Export Report
                </button>
                <button 
                    onClick={() => {
                        setProfile({
                            type: 'municipal',
                            size: 'medium',
                            dataComplexity: 'medium',
                            riskLevel: 'medium'
                        });
                        setSelectedCategories(new Set(budgetCategories.filter(cat => cat.isRequired).map(cat => cat.id)));
                        setCustomAmounts({});
                    }}
                    className="btn-secondary px-4 py-2 text-sm"
                >
                    🔄 Reset Calculator
                </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-3 bg-warning/10 border border-warning/20 rounded text-sm text-text-secondary">
                <strong>Disclaimer:</strong> This calculator provides estimates based on industry standards and regulatory requirements. 
                Actual costs may vary based on specific organizational needs, market rates, and jurisdictional requirements. 
                Consult with legal and compliance professionals for detailed budgeting and implementation planning.
            </div>
        </div>
    );
};

export default LegalBudgetCalculator;