/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudyGuide as StudyGuideType } from '../../types';
import { hasFeatureAccess } from '../../config/pricing';

interface StudyGuideProps {
    userTier: string;
    onUpgrade?: () => void;
}

const studyGuides: StudyGuideType[] = [
    {
        id: 'comprehensive-guide',
        title: 'OCRP Comprehensive Study Guide',
        description: 'Complete study guide covering all four modules with summaries, key concepts, legal frameworks, and practical implementations.',
        moduleIds: ['module1', 'module2', 'module3', 'module4'],
        format: 'pdf',
        size: '2.8 MB',
        lastUpdated: '2025-01-15',
        isPremium: true
    },
    {
        id: 'quick-reference',
        title: 'Quick Reference Cards',
        description: 'Condensed reference cards for each module - perfect for last-minute review.',
        moduleIds: ['module1', 'module2', 'module3', 'module4'],
        format: 'pdf',
        size: '1.2 MB',
        lastUpdated: '2025-01-15',
        isPremium: true
    },
    {
        id: 'legal-framework-guide',
        title: 'Ontario Legal Framework Summary',
        description: 'Detailed breakdown of PIPEDA, MFIPPA, and AI governance regulations with practical examples.',
        moduleIds: ['module1', 'module3'],
        format: 'interactive',
        size: 'Online',
        lastUpdated: '2025-01-10',
        isPremium: true
    },
    {
        id: 'basic-overview',
        title: 'Basic Course Overview',
        description: 'Free overview of course structure and learning objectives.',
        moduleIds: ['module1', 'module2', 'module3', 'module4'],
        format: 'pdf',
        size: '0.5 MB',
        lastUpdated: '2025-01-01',
        isPremium: false
    }
];

const StudyGuide: React.FC<StudyGuideProps> = ({ userTier, onUpgrade }) => {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const hasStudyGuideAccess = hasFeatureAccess(userTier, 'studyGuideAccess');

    const handleDownload = async (guide: StudyGuideType) => {
        if (guide.isPremium && !hasStudyGuideAccess) {
            onUpgrade?.();
            return;
        }

        setDownloadingId(guide.id);
        
        try {
            // Simulate download process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (guide.format === 'pdf') {
                // Create a download link for PDF
                const link = document.createElement('a');
                link.href = `/study-guides/${guide.id}.pdf`;
                link.download = `${guide.title}.pdf`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Open interactive guide in new tab
                window.open(`/study-guides/${guide.id}`, '_blank');
            }
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again or contact support.');
        } finally {
            setDownloadingId(null);
        }
    };

    const handleView = (guide: StudyGuideType) => {
        if (guide.isPremium && !hasStudyGuideAccess) {
            onUpgrade?.();
            return;
        }

        // Open in new tab for viewing
        window.open(`/study-guides/${guide.id}/view`, '_blank');
    };

    return (
        <div className="study-guide-container bg-surface border border-border rounded-lg">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold font-mono text-text-primary uppercase tracking-wider">
                            Study Guides
                        </h3>
                        <p className="text-text-secondary mt-2">
                            Download or view comprehensive study materials to enhance your learning.
                        </p>
                    </div>
                    {!hasStudyGuideAccess && (
                        <div className="text-center">
                            <div className="text-sm text-text-muted mb-2">Premium Feature</div>
                            <button
                                onClick={onUpgrade}
                                className="btn-primary text-sm px-4 py-2"
                            >
                                Upgrade Plan
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6">
                <div className="grid gap-6">
                    {studyGuides.map((guide) => {
                        const isLocked = guide.isPremium && !hasStudyGuideAccess;
                        const isDownloading = downloadingId === guide.id;

                        return (
                            <div
                                key={guide.id}
                                className={`border border-border rounded-lg p-6 transition-all duration-300 ${
                                    isLocked ? 'opacity-75 bg-surface-elevated' : 'hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-lg font-semibold text-text-primary">
                                                {guide.title}
                                            </h4>
                                            {guide.isPremium && (
                                                <span className="bg-primary/20 text-primary px-2 py-1 text-xs font-bold rounded uppercase">
                                                    Premium
                                                </span>
                                            )}
                                            {isLocked && (
                                                <span className="text-text-muted">🔒</span>
                                            )}
                                        </div>
                                        <p className="text-text-secondary mb-4">
                                            {guide.description}
                                        </p>
                                        
                                        <div className="flex items-center gap-6 text-sm text-text-muted">
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">Format:</span>
                                                <span className="capitalize">{guide.format}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">Size:</span>
                                                <span>{guide.size}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">Updated:</span>
                                                <span>{new Date(guide.lastUpdated).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {/* Module Tags */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {guide.moduleIds.map((moduleId) => (
                                                <span
                                                    key={moduleId}
                                                    className="bg-border text-text-secondary px-2 py-1 text-xs rounded"
                                                >
                                                    {moduleId.replace('module', 'Module ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 ml-6">
                                        <button
                                            onClick={() => handleView(guide)}
                                            disabled={isDownloading}
                                            className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                                                isLocked
                                                    ? 'bg-border text-text-muted cursor-not-allowed'
                                                    : 'bg-surface-elevated border border-border text-text-primary hover:border-primary hover:text-primary'
                                            }`}
                                        >
                                            {isLocked ? '🔒 View' : 'View'}
                                        </button>
                                        
                                        {guide.format === 'pdf' && (
                                            <button
                                                onClick={() => handleDownload(guide)}
                                                disabled={isDownloading}
                                                className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                                                    isLocked
                                                        ? 'bg-border text-text-muted cursor-not-allowed'
                                                        : 'btn-primary'
                                                }`}
                                            >
                                                {isDownloading ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Downloading...</span>
                                                    </div>
                                                ) : isLocked ? (
                                                    '🔒 Download PDF'
                                                ) : (
                                                    'Download PDF'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {!hasStudyGuideAccess && (
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded text-center">
                        <h4 className="font-semibold text-primary mb-2">Unlock Premium Study Materials</h4>
                        <p className="text-sm text-text-secondary mb-3">
                            Get access to comprehensive study guides, quick reference cards, and interactive materials with our Individual Professional or Enterprise plans.
                        </p>
                        <button
                            onClick={onUpgrade}
                            className="btn-primary px-6 py-2"
                        >
                            Upgrade to Premium
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudyGuide;