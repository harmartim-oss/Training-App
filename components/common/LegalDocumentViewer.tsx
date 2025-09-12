/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface LegalDocumentViewerProps {
    document: 'terms' | 'privacy';
    onClose?: () => void;
}

const LegalDocumentViewer: React.FC<LegalDocumentViewerProps> = ({ document, onClose }) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDocument = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const filename = document === 'terms' ? 'Terms_of_Use.md' : 'Privacy_Policy.md';
                const basePath = import.meta.env.BASE_URL || '/';
                const response = await fetch(`${basePath}resources/${filename}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to load document: ${response.statusText}`);
                }
                
                const text = await response.text();
                setContent(text);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load document');
            } finally {
                setLoading(false);
            }
        };

        loadDocument();
    }, [document]);

    const downloadPdf = () => {
        const filename = document === 'terms' ? 'Terms_of_Use.pdf' : 'Privacy_Policy.pdf';
        const basePath = import.meta.env.BASE_URL || '/';
        
        const link = document.createElement('a');
        link.href = `${basePath}resources/${filename}`;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatMarkdownContent = (markdown: string) => {
        // Simple markdown formatting for display
        return markdown
            .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6 text-text-primary">$1</h1>')
            .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-4 mt-6 text-text-primary">$1</h2>')
            .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-3 mt-4 text-text-primary">$1</h3>')
            .replace(/^\*(.+)$/gm, '<em class="italic">$1</em>')
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/\n/g, '<br>')
            .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>');
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-surface p-8 rounded-lg max-w-md">
                    <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="text-text-primary">Loading document...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-surface p-8 rounded-lg max-w-md">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Error Loading Document</h3>
                    <p className="text-text-secondary mb-4">{error}</p>
                    <div className="flex gap-3">
                        <button onClick={() => window.location.reload()} className="btn-primary px-4 py-2">
                            Retry
                        </button>
                        {onClose && (
                            <button onClick={onClose} className="btn-secondary px-4 py-2">
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-border">
                    <h2 className="text-xl font-semibold text-text-primary">
                        {document === 'terms' ? 'Terms of Use' : 'Privacy Policy'}
                    </h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={downloadPdf}
                            className="btn-secondary px-4 py-2 text-sm"
                            title="Download PDF version"
                        >
                            📄 Download PDF
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="text-text-secondary hover:text-text-primary text-2xl leading-none"
                                title="Close"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div 
                        className="prose prose-sm max-w-none text-text-secondary leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMarkdownContent(content) }}
                    />
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-background">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-text-secondary">
                            Last updated: January 15, 2025
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={downloadPdf}
                                className="btn-primary px-4 py-2 text-sm"
                            >
                                📄 Download PDF
                            </button>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="btn-secondary px-4 py-2 text-sm"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalDocumentViewer;