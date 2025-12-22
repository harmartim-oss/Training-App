/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { CPDActivity, CPDHours, User } from '../../types';
import { getCPDRequirementForTier, CPD_CATEGORIES, CPD_VALIDATION_RULES, calculateCPDProgress } from '../../config/cpd';

interface CPDTrackingProps {
    user: User;
    onNavigate: (section: string) => void;
}

const CPDTracking: React.FC<CPDTrackingProps> = ({ user, onNavigate }) => {
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof CPD_CATEGORIES>('training');

    // Initialize CPD hours if not present
    const cpdHours: CPDHours = user.cpdHours || {
        total: 0,
        required: getCPDRequirementForTier(user.subscriptionTier).annualHoursRequired,
        byCategory: {
            training: 0,
            thirdParty: 0,
            formalStudy: 0,
            conferences: 0,
            other: 0
        },
        periodStart: new Date().toISOString().split('T')[0],
        periodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    const requirement = getCPDRequirementForTier(user.subscriptionTier);
    const progress = calculateCPDProgress(cpdHours, requirement);

    // Mock activities for demonstration
    const [activities, setActivities] = useState<CPDActivity[]>([
        {
            id: '1',
            userId: user.email,
            title: 'Advanced Incident Response Workshop',
            description: 'Completed advanced training on incident response procedures',
            category: 'training',
            hours: 8,
            date: '2024-11-15',
            provider: 'Canadian Cybersecurity Institute',
            status: 'approved',
            submittedDate: '2024-11-16',
            reviewedDate: '2024-11-17',
            reviewedBy: 'admin@oddi.ca'
        }
    ]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'training' as keyof typeof CPD_CATEGORIES,
        hours: 0,
        date: new Date().toISOString().split('T')[0],
        provider: '',
        certificateUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newActivity: CPDActivity = {
            id: Date.now().toString(),
            userId: user.email,
            ...formData,
            status: 'pending',
            submittedDate: new Date().toISOString().split('T')[0]
        };

        setActivities([newActivity, ...activities]);
        setShowSubmitForm(false);
        
        // Reset form
        setFormData({
            title: '',
            description: '',
            category: 'training',
            hours: 0,
            date: new Date().toISOString().split('T')[0],
            provider: '',
            certificateUrl: ''
        });

        alert('CPD activity submitted successfully! It will be reviewed by the certification team.');
    };

    if (requirement.annualHoursRequired === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => onNavigate('account-details')}
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        ← Back to Account
                    </button>
                </div>

                <div className="module-card-enhanced p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎓</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">CPD Tracking Not Available</h2>
                    <p className="text-text-secondary mb-6">
                        Continuing Professional Development (CPD) tracking is available for Individual Professional and Enterprise tiers.
                    </p>
                    <button
                        onClick={() => onNavigate('subscription')}
                        className="btn-primary"
                    >
                        Upgrade to Enable CPD Tracking
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate('account-details')}
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        ← Back to Account
                    </button>
                </div>
            </div>

            <div className="module-card-enhanced p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-mono text-text-primary uppercase">
                            CPD Tracking
                        </h1>
                        <p className="text-text-secondary">Continuing Professional Development Hours</p>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-surface-elevated rounded-lg p-6 mb-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <p className="text-sm text-text-muted mb-1">Total Hours</p>
                            <p className="text-3xl font-bold text-primary">{cpdHours.total}</p>
                            <p className="text-xs text-text-muted">of {requirement.annualHoursRequired} required</p>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted mb-1">Progress</p>
                            <p className="text-3xl font-bold text-text-primary">{Math.round(progress)}%</p>
                            <p className="text-xs text-text-muted">
                                {progress >= 100 ? 'Requirement met! 🎉' : `${requirement.annualHoursRequired - cpdHours.total} hours remaining`}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted mb-1">Period</p>
                            <p className="text-sm font-semibold text-text-primary">
                                {new Date(cpdHours.periodStart).toLocaleDateString()} - {new Date(cpdHours.periodEnd).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-text-muted">Annual renewal cycle</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-border rounded-full h-4 overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                                progress >= 100 ? 'bg-success' : progress >= 50 ? 'bg-primary' : 'bg-warning'
                            }`}
                            style={{ width: `${Math.min(100, progress)}%` }}
                        />
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Hours by Category</h3>
                    <div className="grid md:grid-cols-5 gap-4">
                        {Object.entries(cpdHours.byCategory).map(([category, hours]) => {
                            const categoryInfo = CPD_CATEGORIES[category as keyof typeof CPD_CATEGORIES];
                            return (
                                <div key={category} className="bg-background rounded-lg p-4 border border-border">
                                    <p className="text-xs text-text-muted mb-1">{categoryInfo.name}</p>
                                    <p className="text-2xl font-bold text-primary">{hours}h</p>
                                    {categoryInfo.maxAnnualHours && (
                                        <p className="text-xs text-text-muted">Max: {categoryInfo.maxAnnualHours}h</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowSubmitForm(!showSubmitForm)}
                        className="btn-primary"
                    >
                        {showSubmitForm ? '✕ Cancel' : '+ Submit CPD Activity'}
                    </button>
                    <button
                        onClick={() => alert('CPD Guidelines PDF will be downloaded')}
                        className="btn-secondary"
                    >
                        📄 View CPD Guidelines
                    </button>
                </div>
            </div>

            {/* Submit Form */}
            {showSubmitForm && (
                <div className="module-card-enhanced p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Submit CPD Activity</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Activity Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="e.g., Cybersecurity Conference 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Category *
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {Object.entries(CPD_CATEGORIES).map(([key, cat]) => (
                                    <option key={key} value={key}>{cat.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-text-muted mt-1">
                                {CPD_CATEGORIES[formData.category].description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Hours *
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0.5"
                                    step="0.5"
                                    value={formData.hours}
                                    onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Description *
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Describe the activity and what you learned..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Provider/Organization
                            </label>
                            <input
                                type="text"
                                value={formData.provider}
                                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="e.g., Canadian Cybersecurity Institute"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Certificate/Evidence URL
                            </label>
                            <input
                                type="url"
                                value={formData.certificateUrl}
                                onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="https://..."
                            />
                            <p className="text-xs text-text-muted mt-1">
                                Optional: Link to certificate or supporting evidence
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="btn-primary">
                                Submit for Review
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowSubmitForm(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Activity History */}
            <div className="module-card-enhanced p-6">
                <h2 className="text-xl font-semibold mb-4">Activity History</h2>
                
                {activities.length === 0 ? (
                    <div className="text-center py-8 text-text-muted">
                        <p className="text-4xl mb-4">📚</p>
                        <p>No CPD activities submitted yet.</p>
                        <p className="text-sm">Click "Submit CPD Activity" to add your first activity.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="bg-background border border-border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-text-primary">{activity.title}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                activity.status === 'approved' 
                                                    ? 'bg-success/20 text-success' 
                                                    : activity.status === 'pending'
                                                    ? 'bg-warning/20 text-warning'
                                                    : 'bg-error/20 text-error'
                                            }`}>
                                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-text-muted">
                                            <span>📅 {new Date(activity.date).toLocaleDateString()}</span>
                                            <span>⏱️ {activity.hours} hours</span>
                                            <span>📂 {CPD_CATEGORIES[activity.category].name}</span>
                                            {activity.provider && <span>🏢 {activity.provider}</span>}
                                        </div>
                                    </div>
                                </div>
                                {activity.notes && (
                                    <div className="mt-2 p-2 bg-surface-elevated rounded text-sm">
                                        <strong>Reviewer Note:</strong> {activity.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Information Panel */}
            <div className="module-card-enhanced p-6 mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span>ℹ️</span> CPD Requirements for {requirement.tier.charAt(0).toUpperCase() + requirement.tier.slice(1)} Tier
                </h3>
                <p className="text-sm text-text-secondary mb-3">{requirement.description}</p>
                <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Submit activities within {CPD_VALIDATION_RULES.submissionDeadline.days} days of completion</li>
                    <li>• Keep evidence for at least {CPD_VALIDATION_RULES.evidenceRetention.years} years</li>
                    <li>• {CPD_VALIDATION_RULES.gracePeriod.days}-day grace period after annual deadline</li>
                    {CPD_VALIDATION_RULES.carryOver.enabled && (
                        <li>• Up to {CPD_VALIDATION_RULES.carryOver.maxHours} excess hours can be carried over</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CPDTracking;
