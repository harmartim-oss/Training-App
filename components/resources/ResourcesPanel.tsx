/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';

interface Resource {
    title: string;
    description: string;
    filename: string;
    type: 'markdown' | 'pdf';
    category: 'privacy' | 'security' | 'ai' | 'data';
    icon: string;
}

const resources: Resource[] = [
    // Privacy Resources
    {
        title: "Privacy Impact Assessment (PIA) Checklist",
        description: "Comprehensive checklist for conducting privacy impact assessments in municipal settings, aligned with MFIPPA requirements",
        filename: "PIA_Checklist",
        type: "markdown",
        category: "privacy",
        icon: "🔍"
    },
    {
        title: "Breach Notification Templates",
        description: "Ready-to-use templates for privacy breach notifications under Ontario's Bill 194 and MFIPPA requirements",
        filename: "Breach_Notification_Templates", 
        type: "markdown",
        category: "privacy",
        icon: "🚨"
    },
    {
        title: "PIPEDA vs MFIPPA Comparison Guide",
        description: "Quick reference guide comparing federal and provincial privacy requirements for organizations operating in Ontario",
        filename: "PIPEDA_MFIPPA_Comparison",
        type: "markdown",
        category: "privacy",
        icon: "⚖️"
    },
    {
        title: "Consent Management Framework",
        description: "Templates and best practices for obtaining, documenting, and managing consent under PIPEDA and MFIPPA",
        filename: "Consent_Management",
        type: "markdown",
        category: "privacy",
        icon: "✅"
    },
    // Security Resources
    {
        title: "Incident Response Plan Template",
        description: "Complete incident response plan template with procedures for detection, containment, eradication, and recovery",
        filename: "Incident_Response_Plan",
        type: "markdown",
        category: "security",
        icon: "🛡️"
    },
    {
        title: "Risk Assessment Worksheet",
        description: "Structured worksheet for conducting cybersecurity risk assessments with likelihood and impact calculations",
        filename: "Risk_Assessment_Worksheet",
        type: "markdown",
        category: "security",
        icon: "📊"
    },
    {
        title: "Security Controls Checklist",
        description: "Comprehensive checklist of administrative, technical, and physical security controls for data protection",
        filename: "Security_Controls_Checklist",
        type: "markdown",
        category: "security",
        icon: "🔐"
    },
    // AI Resources
    {
        title: "Algorithmic Impact Assessment (AIA) Template",
        description: "Detailed template for conducting AIAs under Ontario's Responsible Use of AI Directive and federal AIDA",
        filename: "AIA_Template",
        type: "markdown",
        category: "ai",
        icon: "🤖"
    },
    {
        title: "AI Bias Testing Checklist",
        description: "Practical checklist for identifying and testing algorithmic bias across demographic groups",
        filename: "AI_Bias_Testing",
        type: "markdown",
        category: "ai",
        icon: "⚡"
    },
    {
        title: "AI Transparency Documentation",
        description: "Templates for documenting AI system purposes, decision-making processes, and limitations for public disclosure",
        filename: "AI_Transparency",
        type: "markdown",
        category: "ai",
        icon: "💡"
    },
    // Data Management Resources
    {
        title: "Data Classification Matrix",
        description: "Ontario data classification framework with security requirements for each classification level",
        filename: "Data_Classification_Matrix",
        type: "markdown",
        category: "data",
        icon: "📋"
    },
    {
        title: "Records Retention Schedule",
        description: "Template retention schedule for common record types with destruction procedures and legal requirements",
        filename: "Records_Retention_Schedule",
        type: "markdown",
        category: "data",
        icon: "📅"
    },
    {
        title: "Microlearning Modules Guide",
        description: "Structured learning modules for ongoing privacy and security training in bite-sized formats",
        filename: "Microlearning_Modules",
        type: "markdown",
        category: "data",
        icon: "📚"
    }
];

const ResourcesPanel: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

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

    const handleDownload = (filename: string, type: string) => {
        const extension = type === 'pdf' ? 'pdf' : 'md';
        const link = document.createElement('a');
        // Use relative path that works with base path configuration
        const basePath = import.meta.env.BASE_URL || '/';
        link.href = `${basePath}resources/${filename}.${extension}`;
        link.download = `${filename}.${extension}`;
        link.target = '_blank';
        
        // Note: Resource files may not be available yet
        // In production, these should be generated or made available
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="resources-panel bg-surface border border-border p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono uppercase">
                📚 Resources & Downloads
            </h3>
            <p className="text-text-secondary mb-6">
                Access practical tools, templates, and checklists to implement compliance requirements in your organization.
            </p>

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
                {filteredResources.map((resource, index) => (
                    <div key={index} className="resource-item border border-border p-4 rounded hover:border-primary hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                            <div className="text-3xl flex-shrink-0">{resource.icon}</div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-text-primary mb-1">{resource.title}</h4>
                                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{resource.description}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDownload(resource.filename, 'markdown')}
                                        className="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-primary/80 transition-colors font-medium"
                                        title="Download Markdown version"
                                    >
                                        📄 Markdown
                                    </button>
                                    <button
                                        onClick={() => handleDownload(resource.filename, 'pdf')}
                                        className="text-xs bg-text-secondary text-white px-3 py-1.5 rounded hover:bg-text-secondary/80 transition-colors font-medium"
                                        title="Download PDF version"
                                    >
                                        📑 PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">💡 Tip:</strong> These resources are designed to be customized for your specific organizational needs. 
                    Review and adapt them according to your municipality's or organization's policies, procedures, and legal requirements.
                </p>
            </div>

            <div className="mt-4 p-4 bg-background border border-border rounded">
                <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <span>🎯</span> How to Use These Resources
                </h4>
                <ul className="text-sm text-text-secondary space-y-1 ml-6">
                    <li>• Download templates and customize for your organization</li>
                    <li>• Use checklists to ensure comprehensive compliance</li>
                    <li>• Share with team members and stakeholders</li>
                    <li>• Integrate into your existing compliance programs</li>
                    <li>• Regular updates available as regulations evolve</li>
                </ul>
            </div>
        </div>
    );
};

export default ResourcesPanel;