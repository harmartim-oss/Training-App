/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import LegalBudgetCalculator from './LegalBudgetCalculator';
import SchedulingTool from './SchedulingTool';

interface Resource {
    title: string;
    description: string;
    filename: string;
    type: 'markdown' | 'pdf';
}

const resources: Resource[] = [
    {
        title: "Privacy Impact Assessment (PIA) Checklist",
        description: "Comprehensive checklist for conducting privacy impact assessments in municipal settings",
        filename: "PIA_Checklist",
        type: "markdown"
    },
    {
        title: "Breach Notification Templates",
        description: "Ready-to-use templates for privacy breach notifications under MFIPPA",
        filename: "Breach_Notification_Templates", 
        type: "markdown"
    },
    {
        title: "Microlearning Modules Guide",
        description: "Structured learning modules for ongoing privacy and security training",
        filename: "Microlearning_Modules",
        type: "markdown"
    },
    {
        title: "Terms of Use",
        description: "Comprehensive terms of use with legal disclaimers about advice and solicitor-client relationships",
        filename: "Terms_of_Use",
        type: "markdown"
    },
    {
        title: "Privacy Policy",
        description: "Detailed privacy policy compliant with PIPEDA, MFIPPA, and other applicable privacy laws",
        filename: "Privacy_Policy",
        type: "markdown"
    }
];

const ResourcesPanel: React.FC = () => {
    const [showFullLibrary, setShowFullLibrary] = useState(false);
    const [showBudgetCalculator, setShowBudgetCalculator] = useState(false);
    const [showSchedulingTool, setShowSchedulingTool] = useState(false);

    const handleDownload = (filename: string, type: string) => {
        const extension = type === 'pdf' ? 'pdf' : 'md';
        const link = document.createElement('a');
        // Use relative path that works with base path configuration
        const basePath = import.meta.env.BASE_URL || '/';
        link.href = `${basePath}resources/${filename}.${extension}`;
        link.download = `${filename}.${extension}`;
        link.target = '_blank';
        
        // Add error handling for missing resources
        link.onerror = () => {
            alert(`Resource ${filename}.${extension} is not available. Please contact support.`);
        };
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="resources-panel bg-surface border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-text-primary font-mono uppercase">
                📚 Resources & Downloads
            </h3>
            <p className="text-text-secondary mb-6">
                Access comprehensive tools, templates, and resources to implement legal compliance in your organization.
            </p>
            
            {/* Tools Section */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-text-primary">🔧 Compliance Tools</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setShowBudgetCalculator(!showBudgetCalculator)}
                        className="p-4 border border-border rounded hover:bg-background transition-colors text-left"
                    >
                        <div className="font-semibold text-text-primary mb-1">📊 Legal Budget Calculator</div>
                        <div className="text-sm text-text-secondary">Calculate annual legal and compliance budget based on your organization profile</div>
                    </button>
                    <button
                        onClick={() => setShowSchedulingTool(!showSchedulingTool)}
                        className="p-4 border border-border rounded hover:bg-background transition-colors text-left"
                    >
                        <div className="font-semibold text-text-primary mb-1">📅 Compliance Scheduling Tool</div>
                        <div className="text-sm text-text-secondary">Plan and track compliance activities, training schedules, and review cycles</div>
                    </button>
                </div>
            </div>

            {/* Budget Calculator */}
            {showBudgetCalculator && (
                <div className="mb-6">
                    <LegalBudgetCalculator />
                </div>
            )}

            {/* Scheduling Tool */}
            {showSchedulingTool && (
                <div className="mb-6">
                    <SchedulingTool />
                </div>
            )}

            {/* Resource Library */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-text-primary">📄 Resource Library</h4>
                    <button
                        onClick={() => setShowFullLibrary(!showFullLibrary)}
                        className="btn-primary px-4 py-2 text-sm"
                    >
                        {showFullLibrary ? '📁 Show Essential Resources' : '📚 Access Full Resource Library'}
                    </button>
                </div>
                
                <div className="space-y-4">
                    {(showFullLibrary ? resources : resources.slice(0, 3)).map((resource, index) => (
                        <div key={index} className="resource-item border border-border p-4 rounded">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-text-primary">{resource.title}</h4>
                                    <p className="text-sm text-text-secondary mt-1">{resource.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDownload(resource.filename, 'markdown')}
                                        className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary/80 transition-colors"
                                        title="View/Download Markdown version"
                                    >
                                        📄 VIEW
                                    </button>
                                    <button
                                        onClick={() => handleDownload(resource.filename, 'pdf')}
                                        className="text-xs bg-text-secondary text-white px-3 py-1 rounded hover:bg-text-secondary/80 transition-colors"
                                        title="Download PDF version"
                                    >
                                        📁 PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {!showFullLibrary && resources.length > 3 && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-text-secondary mb-2">
                            Showing {Math.min(3, resources.length)} of {resources.length} resources
                        </p>
                        <button
                            onClick={() => setShowFullLibrary(true)}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                            ➤ Access Full Resource Library ({resources.length - 3} more resources)
                        </button>
                    </div>
                )}
            </div>
            
            <div className="mt-6 p-4 bg-background border border-border rounded">
                <p className="text-sm text-text-secondary">
                    <strong>Legal Disclaimer:</strong> These resources are designed for educational purposes and to assist with compliance efforts. 
                    They do not constitute legal advice. Please consult with qualified legal counsel for specific legal matters affecting your organization.
                </p>
            </div>
        </div>
    );
};

export default ResourcesPanel;