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
    }
];

const ResourcesPanel: React.FC = () => {
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
                Resources & Downloads
            </h3>
            <p className="text-text-secondary mb-6">
                Access practical tools and templates to implement MFIPPA compliance in your organization.
            </p>
            
            <div className="space-y-4">
                {resources.map((resource, index) => (
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
                                    title="Download Markdown version"
                                >
                                    .MD
                                </button>
                                <button
                                    onClick={() => handleDownload(resource.filename, 'pdf')}
                                    className="text-xs bg-text-secondary text-white px-3 py-1 rounded hover:bg-text-secondary/80 transition-colors"
                                    title="Download PDF version"
                                >
                                    .PDF
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 p-4 bg-background border border-border rounded">
                <p className="text-sm text-text-secondary">
                    <strong>Note:</strong> These resources are designed to be customized for your specific organizational needs. 
                    Please review and adapt them according to your municipality's policies and procedures.
                </p>
            </div>
        </div>
    );
};

export default ResourcesPanel;