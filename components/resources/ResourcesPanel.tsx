/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { SubscriptionTier } from '../../types';
import { getFeaturesByTier } from '../../config/pricing';
import { LockIcon } from '../icons';

interface Resource {
    title: string;
    description: string;
    filename: string;
    type: 'markdown' | 'pdf';
    category: 'privacy' | 'security' | 'ai' | 'data';
    icon: string;
    tierRequired: SubscriptionTier; // Minimum tier required to access
}

const resources: Resource[] = [
    // Privacy Resources - Premium and above
    {
        title: "Privacy Impact Assessment (PIA) Checklist",
        description: "Comprehensive checklist for conducting privacy impact assessments in municipal settings, aligned with MFIPPA requirements",
        filename: "PIA_Checklist",
        type: "pdf",
        category: "privacy",
        icon: "🔍",
        tierRequired: 'premium'
    },
    {
        title: "Breach Notification Templates",
        description: "Ready-to-use templates for privacy breach notifications under Ontario's Bill 194 and MFIPPA requirements",
        filename: "Breach_Notification_Templates", 
        type: "pdf",
        category: "privacy",
        icon: "🚨",
        tierRequired: 'premium'
    },
    {
        title: "PIPEDA vs MFIPPA Comparison Guide",
        description: "Quick reference guide comparing federal and provincial privacy requirements for organizations operating in Ontario",
        filename: "PIPEDA_MFIPPA_Comparison",
        type: "pdf",
        category: "privacy",
        icon: "⚖️",
        tierRequired: 'premium'
    },
    {
        title: "Consent Management Framework",
        description: "Templates and best practices for obtaining, documenting, and managing consent under PIPEDA and MFIPPA",
        filename: "Consent_Management",
        type: "pdf",
        category: "privacy",
        icon: "✅",
        tierRequired: 'premium'
    },
    // Security Resources - Premium and above
    {
        title: "Incident Response Plan Template",
        description: "Complete incident response plan template with procedures for detection, containment, eradication, and recovery",
        filename: "Incident_Response_Plan",
        type: "pdf",
        category: "security",
        icon: "🛡️",
        tierRequired: 'premium'
    },
    {
        title: "Risk Assessment Worksheet",
        description: "Structured worksheet for conducting cybersecurity risk assessments with likelihood and impact calculations",
        filename: "Risk_Assessment_Worksheet",
        type: "pdf",
        category: "security",
        icon: "📊",
        tierRequired: 'premium'
    },
    {
        title: "Security Controls Checklist",
        description: "Comprehensive checklist of administrative, technical, and physical security controls for data protection",
        filename: "Security_Controls_Checklist",
        type: "pdf",
        category: "security",
        icon: "🔐",
        tierRequired: 'premium'
    },
    {
        title: "Advanced Incident Response Playbook",
        description: "Advanced playbook with detailed procedures for complex security incidents and crisis management",
        filename: "Advanced_Incident_Response_Playbook",
        type: "pdf",
        category: "security",
        icon: "🚨",
        tierRequired: 'premium'
    },
    // AI Resources - Premium and above
    {
        title: "Algorithmic Impact Assessment (AIA) Template",
        description: "Detailed template for conducting AIAs under Ontario's Responsible Use of AI Directive and federal AIDA",
        filename: "AIA_Template",
        type: "pdf",
        category: "ai",
        icon: "🤖",
        tierRequired: 'premium'
    },
    {
        title: "AI Bias Testing Checklist",
        description: "Practical checklist for identifying and testing algorithmic bias across demographic groups",
        filename: "AI_Bias_Testing",
        type: "pdf",
        category: "ai",
        icon: "⚡",
        tierRequired: 'premium'
    },
    {
        title: "AI Transparency Documentation",
        description: "Templates for documenting AI system purposes, decision-making processes, and limitations for public disclosure",
        filename: "AI_Transparency",
        type: "pdf",
        category: "ai",
        icon: "💡",
        tierRequired: 'premium'
    },
    {
        title: "AI Governance Framework",
        description: "Complete framework for implementing responsible AI governance in your organization",
        filename: "AI_Governance_Framework",
        type: "pdf",
        category: "ai",
        icon: "🏛️",
        tierRequired: 'premium'
    },
    // Data Management Resources - Premium and above
    {
        title: "Data Classification Matrix",
        description: "Ontario data classification framework with security requirements for each classification level",
        filename: "Data_Classification_Matrix",
        type: "pdf",
        category: "data",
        icon: "📋",
        tierRequired: 'premium'
    },
    {
        title: "Records Retention Schedule",
        description: "Template retention schedule for common record types with destruction procedures and legal requirements",
        filename: "Records_Retention_Schedule",
        type: "pdf",
        category: "data",
        icon: "📅",
        tierRequired: 'premium'
    },
    {
        title: "Microlearning Modules Guide",
        description: "Structured learning modules for ongoing privacy and security training in bite-sized formats",
        filename: "Microlearning_Modules",
        type: "pdf",
        category: "data",
        icon: "📚",
        tierRequired: 'premium'
    }
];

interface ResourcesPanelProps {
    userTier?: SubscriptionTier;
    onUpgrade?: () => void;
}

const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ userTier = 'basic', onUpgrade }) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

    const tierHierarchy = { 'basic': 0, 'premium': 1, 'enterprise': 2 };
    const hasAccess = (resourceTier: SubscriptionTier) => {
        return tierHierarchy[userTier] >= tierHierarchy[resourceTier];
    };

    const categories = [
        { id: 'all', label: 'All Resources', icon: '📦' },
        { id: 'privacy', label: 'Privacy', icon: '🔒' },
        { id: 'security', label: 'Security', icon: '🛡️' },
        { id: 'ai', label: 'AI Governance', icon: '🤖' },
        { id: 'data', label: 'Data Management', icon: '📁' }
    ];

    const filteredResources = selectedCategory === 'all' 
        ? resources 
        : resources.filter(r => r.category === selectedCategory);

    const handleDownload = (resource: Resource) => {
        if (!hasAccess(resource.tierRequired)) {
            if (onUpgrade) {
                onUpgrade();
            } else {
                alert('This resource requires a Premium or Enterprise subscription. Please upgrade to access this resource.');
            }
            return;
        }

        const link = document.createElement('a');
        const basePath = import.meta.env.BASE_URL || '/';
        link.href = `${basePath}resources/${resource.filename}.pdf`;
        link.download = `${resource.filename}.pdf`;
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="resources-panel bg-surface border border-border p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono uppercase">
                📚 Resources & Downloads
            </h3>
            <p className="text-text-secondary mb-4">
                Access practical tools, templates, and checklists to implement compliance requirements in your organization.
            </p>

            {/* Tier Notice */}
            {userTier === 'basic' && (
                <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                    <p className="text-sm text-text-primary font-medium mb-2 flex items-center gap-2">
                        <LockIcon className="w-4 h-4" />
                        Upgrade to Premium for Full Resource Access
                    </p>
                    <p className="text-sm text-text-secondary mb-3">
                        All professional PDF resources require a Premium or Enterprise subscription. 
                        Upgrade now to download templates, checklists, and comprehensive guides.
                    </p>
                    {onUpgrade && (
                        <button
                            onClick={onUpgrade}
                            className="btn-primary text-sm py-2 px-4"
                        >
                            Upgrade to Premium
                        </button>
                    )}
                </div>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCategory === cat.id
                                ? 'bg-primary text-white'
                                : 'bg-background text-text-secondary hover:bg-border'
                        }`}
                    >
                        {cat.icon} {cat.label}
                    </button>
                ))}
            </div>
            
            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {filteredResources.map((resource, index) => {
                    const resourceHasAccess = hasAccess(resource.tierRequired);
                    return (
                        <div 
                            key={index} 
                            className={`resource-item border border-border p-4 rounded transition-all ${
                                resourceHasAccess 
                                    ? 'hover:border-primary hover:shadow-lg' 
                                    : 'opacity-70 bg-border/20'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-3xl flex-shrink-0">{resource.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className="font-semibold text-text-primary">{resource.title}</h4>
                                        {!resourceHasAccess && (
                                            <LockIcon className="w-4 h-4 text-warning flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">{resource.description}</p>
                                    {resourceHasAccess ? (
                                        <button
                                            onClick={() => handleDownload(resource)}
                                            className="text-xs bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-colors font-medium"
                                            title="Download PDF"
                                        >
                                            📑 Download PDF
                                        </button>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleDownload(resource)}
                                                className="text-xs bg-border text-text-muted px-4 py-2 rounded cursor-not-allowed flex items-center gap-2 justify-center"
                                                title="Requires Premium subscription"
                                            >
                                                <LockIcon className="w-3 h-3" />
                                                Premium Only
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded">
                <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">💡 Tip:</strong> All resources are professionally formatted PDF documents designed to be customized for your specific organizational needs. 
                    Review and adapt them according to your municipality's or organization's policies, procedures, and legal requirements.
                </p>
            </div>

            <div className="mt-4 p-4 bg-background border border-border rounded">
                <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <span>🎯</span> How to Use These Resources
                </h4>
                <ul className="text-sm text-text-secondary space-y-1 ml-6">
                    <li>• Download professional PDF templates and customize for your organization</li>
                    <li>• Use checklists to ensure comprehensive compliance</li>
                    <li>• Share with team members and stakeholders</li>
                    <li>• Integrate into your existing compliance programs</li>
                    <li>• Regular updates available as regulations evolve</li>
                    <li>• All resources are printer-friendly and professionally formatted</li>
                </ul>
            </div>
        </div>
    );
};

export default ResourcesPanel;