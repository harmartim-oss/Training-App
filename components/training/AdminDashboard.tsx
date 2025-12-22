/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserIcon, TrophyIcon, CheckCircleIcon, ClockIcon, LogoutIcon } from '../icons';

interface User {
    fullname: string;
    email: string;
    organizationType: string;
    organizationName: string;
    subscriptionTier: string;
    registrationDate: string;
    loginDate: string;
}

interface Progress {
    module1: { completed: boolean; score: number; progress: number };
    module2: { completed: boolean; score: number; progress: number };
    module3: { completed: boolean; score: number; progress: number };
    module4: { completed: boolean; score: number; progress: number };
    assessment: { completed: boolean; score: number; passed: boolean };
}

interface AdminDashboardProps {
    onLogout: () => void;
    adminEmail: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, adminEmail }) => {
    const [users, setUsers] = useState<Array<{ user: User; progress: Progress }>>([]);
    const [selectedView, setSelectedView] = useState<'overview' | 'users' | 'analytics'>('overview');
    const [selectedUser, setSelectedUser] = useState<{ user: User; progress: Progress } | null>(null);

    useEffect(() => {
        // Load all users from localStorage
        const loadedUsers: Array<{ user: User; progress: Progress }> = [];
        
        // In a real app, this would query a database
        // For demo purposes, we'll load from localStorage
        try {
            const savedUser = localStorage.getItem('cyberTrainingUser');
            const savedProgress = localStorage.getItem('cyberTrainingProgress');
            
            if (savedUser && savedProgress) {
                loadedUsers.push({
                    user: JSON.parse(savedUser),
                    progress: JSON.parse(savedProgress)
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
        
        setUsers(loadedUsers);
    }, []);

    // Calculate statistics
    const totalUsers = users.length;
    const completedAssessments = users.filter(u => u.progress.assessment.completed).length;
    const passedAssessments = users.filter(u => u.progress.assessment.passed).length;
    const averageScore = users
        .filter(u => u.progress.assessment.completed)
        .reduce((acc, u) => acc + u.progress.assessment.score, 0) / (completedAssessments || 1);

    const completionByModule = {
        module1: users.filter(u => u.progress.module1.completed).length,
        module2: users.filter(u => u.progress.module2.completed).length,
        module3: users.filter(u => u.progress.module3.completed).length,
        module4: users.filter(u => u.progress.module4.completed).length,
    };

    const subscriptionBreakdown = users.reduce((acc, u) => {
        const tier = u.user.subscriptionTier;
        acc[tier] = (acc[tier] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const organizationTypeBreakdown = users.reduce((acc, u) => {
        const type = u.user.organizationType;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Total Users</h3>
                        <UserIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary">{totalUsers}</div>
                    <p className="text-xs text-text-muted mt-1">Registered users</p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Completed</h3>
                        <CheckCircleIcon className="w-6 h-6 text-success" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary">{completedAssessments}</div>
                    <p className="text-xs text-text-muted mt-1">Finished assessments</p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Pass Rate</h3>
                        <TrophyIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary">
                        {completedAssessments > 0 ? Math.round((passedAssessments / completedAssessments) * 100) : 0}%
                    </div>
                    <p className="text-xs text-text-muted mt-1">{passedAssessments} of {completedAssessments} passed</p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Avg. Score</h3>
                        <ClockIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary">{Math.round(averageScore)}%</div>
                    <p className="text-xs text-text-muted mt-1">Assessment average</p>
                </div>
            </div>

            {/* Module Completion Stats */}
            <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Module Completion</h3>
                <div className="space-y-4">
                    {Object.entries(completionByModule).map(([module, count]) => {
                        const percentage = totalUsers > 0 ? (count / totalUsers) * 100 : 0;
                        return (
                            <div key={module}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-text-primary capitalize">
                                        {module.replace('module', 'Module ')}
                                    </span>
                                    <span className="text-sm text-text-secondary">{count} / {totalUsers}</span>
                                </div>
                                <div className="w-full bg-border rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Subscription & Organization Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Subscription Tiers</h3>
                    <div className="space-y-3">
                        {Object.entries(subscriptionBreakdown).map(([tier, count]) => (
                            <div key={tier} className="flex justify-between items-center">
                                <span className="text-sm text-text-secondary capitalize">{tier}</span>
                                <span className="text-sm font-semibold text-text-primary">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Organization Types</h3>
                    <div className="space-y-3">
                        {Object.entries(organizationTypeBreakdown).map(([type, count]) => (
                            <div key={type} className="flex justify-between items-center">
                                <span className="text-sm text-text-secondary capitalize">{type.replace('-', ' ')}</span>
                                <span className="text-sm font-semibold text-text-primary">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="bg-surface border border-border rounded-lg">
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">All Users</h3>
                <p className="text-sm text-text-secondary mt-1">View and manage user accounts and progress</p>
            </div>
            
            {users.length === 0 ? (
                <div className="p-8 text-center">
                    <p className="text-text-secondary">No users registered yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-surface-elevated">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Organization</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Tier</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Progress</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((userData, index) => {
                                const { user, progress } = userData;
                                const completedModules = Object.values(progress).filter((m: any) => m.completed).length - (progress.assessment.completed ? 1 : 0);
                                return (
                                    <tr key={index} className="hover:bg-surface-elevated">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-text-primary">{user.fullname}</div>
                                                <div className="text-xs text-text-secondary">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm text-text-primary">{user.organizationName}</div>
                                                <div className="text-xs text-text-secondary capitalize">{user.organizationType.replace('-', ' ')}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary capitalize">
                                                {user.subscriptionTier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm text-text-primary">{completedModules} / 4 modules</div>
                                                {progress.assessment.completed && (
                                                    <div className={`text-xs ${progress.assessment.passed ? 'text-success' : 'text-red-600'}`}>
                                                        {progress.assessment.passed ? '✓ Passed' : '✗ Failed'} ({progress.assessment.score}%)
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedUser(userData)}
                                                className="text-sm text-primary hover:underline"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderUserDetails = () => {
        if (!selectedUser) return null;

        const { user, progress } = selectedUser;

        const handleChangeTier = (newTier: string) => {
            // In a real app, this would update the database
            const updatedUser = { ...selectedUser.user, subscriptionTier: newTier };
            setSelectedUser({ ...selectedUser, user: updatedUser });
            alert(`User subscription tier updated to ${newTier}`);
        };

        const handleToggleAccess = () => {
            // In a real app, this would update the database
            alert('User access toggled (feature not implemented in demo)');
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-surface border border-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-text-primary">User Details & Management</h3>
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="text-text-secondary hover:text-text-primary"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        {/* User Info */}
                        <div>
                            <h4 className="text-sm font-semibold text-text-secondary uppercase mb-3">User Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-text-muted">Name</p>
                                    <p className="text-sm text-text-primary">{user.fullname}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Email</p>
                                    <p className="text-sm text-text-primary">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Organization</p>
                                    <p className="text-sm text-text-primary">{user.organizationName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Type</p>
                                    <p className="text-sm text-text-primary capitalize">{user.organizationType.replace('-', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Subscription</p>
                                    <p className="text-sm text-text-primary capitalize">{user.subscriptionTier}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted">Registered</p>
                                    <p className="text-sm text-text-primary">{new Date(user.registrationDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-text-primary mb-3">Admin Actions</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-text-muted mb-2">Change Subscription Tier</label>
                                    <select
                                        value={user.subscriptionTier}
                                        onChange={(e) => handleChangeTier(e.target.value)}
                                        className="form-input w-full"
                                    >
                                        <option value="basic">Basic</option>
                                        <option value="premium">Premium</option>
                                        <option value="enterprise">Enterprise</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleToggleAccess}
                                        className="btn-secondary text-sm flex-1"
                                    >
                                        Suspend Access
                                    </button>
                                    <button
                                        onClick={() => alert('Reset progress feature not implemented in demo')}
                                        className="btn-secondary text-sm flex-1"
                                    >
                                        Reset Progress
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Module Progress */}
                        <div>
                            <h4 className="text-sm font-semibold text-text-secondary uppercase mb-3">Module Progress</h4>
                            <div className="space-y-3">
                                {(['module1', 'module2', 'module3', 'module4'] as const).map((module, index) => {
                                    const moduleProgress = progress[module];
                                    return (
                                        <div key={module} className="flex items-center justify-between p-3 bg-surface-elevated rounded">
                                            <span className="text-sm text-text-primary">Module {index + 1}</span>
                                            <div className="flex items-center gap-3">
                                                {moduleProgress.completed ? (
                                                    <>
                                                        <span className="text-xs text-success">✓ Completed</span>
                                                        <span className="text-sm font-semibold text-text-primary">{moduleProgress.score}%</span>
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-text-muted">{moduleProgress.progress}% progress</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Assessment */}
                        <div>
                            <h4 className="text-sm font-semibold text-text-secondary uppercase mb-3">Final Assessment</h4>
                            <div className="p-4 bg-surface-elevated rounded">
                                {progress.assessment.completed ? (
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-semibold ${progress.assessment.passed ? 'text-success' : 'text-red-600'}`}>
                                            {progress.assessment.passed ? '✓ Passed' : '✗ Failed'}
                                        </span>
                                        <span className="text-lg font-bold text-text-primary">{progress.assessment.score}%</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-text-muted">Not yet attempted</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-surface border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-mono text-primary uppercase tracking-wider">Admin Dashboard</h1>
                        <p className="text-sm text-text-secondary mt-1">Logged in as: {adminEmail}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                        <LogoutIcon className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-surface-elevated border-b border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setSelectedView('overview')}
                            className={`py-3 px-1 text-sm font-semibold border-b-2 transition-colors ${
                                selectedView === 'overview'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-primary'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setSelectedView('users')}
                            className={`py-3 px-1 text-sm font-semibold border-b-2 transition-colors ${
                                selectedView === 'users'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-primary'
                            }`}
                        >
                            Users
                        </button>
                        <button
                            onClick={() => setSelectedView('analytics')}
                            className={`py-3 px-1 text-sm font-semibold border-b-2 transition-colors ${
                                selectedView === 'analytics'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-secondary hover:text-primary'
                            }`}
                        >
                            Analytics
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {selectedView === 'overview' && renderOverview()}
                {selectedView === 'users' && renderUsers()}
                {selectedView === 'analytics' && (
                    <div className="space-y-6">
                        {/* Analytics Overview */}
                        <div className="bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-text-primary mb-4">Business Analytics & Patterns</h3>
                            
                            {/* Completion Trends */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-text-secondary mb-3">Completion Trends</h4>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Avg. Time to Complete</p>
                                        <p className="text-xl font-bold text-primary">12-15 hrs</p>
                                        <p className="text-xs text-text-muted mt-1">Estimated per user</p>
                                    </div>
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Module Drop-off Rate</p>
                                        <p className="text-xl font-bold text-warning">15%</p>
                                        <p className="text-xs text-text-muted mt-1">After Module 2</p>
                                    </div>
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Assessment Pass Rate</p>
                                        <p className="text-xl font-bold text-success">
                                            {passedAssessments > 0 ? Math.round((passedAssessments / completedAssessments) * 100) : 0}%
                                        </p>
                                        <p className="text-xs text-text-muted mt-1">First attempt</p>
                                    </div>
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Avg. Quiz Score</p>
                                        <p className="text-xl font-bold text-primary">{Math.round(averageScore)}%</p>
                                        <p className="text-xs text-text-muted mt-1">Across all modules</p>
                                    </div>
                                </div>
                            </div>

                            {/* User Engagement Patterns */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-text-secondary mb-3">User Engagement Patterns</h4>
                                <div className="bg-surface-elevated rounded p-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-text-secondary">Most Active Time</span>
                                            <span className="text-sm font-semibold text-text-primary">9 AM - 12 PM EST</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-text-secondary">Peak Training Days</span>
                                            <span className="text-sm font-semibold text-text-primary">Tuesday & Thursday</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-text-secondary">Avg. Session Duration</span>
                                            <span className="text-sm font-semibold text-text-primary">45 minutes</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-text-secondary">Mobile vs Desktop</span>
                                            <span className="text-sm font-semibold text-text-primary">35% / 65%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue & Subscription Insights */}
                            <div>
                                <h4 className="text-sm font-semibold text-text-secondary mb-3">Revenue & Subscription Insights</h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Monthly Recurring Revenue</p>
                                        <p className="text-xl font-bold text-success">
                                            ${Object.entries(subscriptionBreakdown).reduce((acc, [tier, count]) => {
                                                const prices: Record<string, number> = { basic: 49, premium: 149/12, enterprise: 899/12 };
                                                return acc + (prices[tier] || 0) * count;
                                            }, 0).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-text-muted mt-1">Estimated MRR</p>
                                    </div>
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Premium Conversion Rate</p>
                                        <p className="text-xl font-bold text-primary">
                                            {totalUsers > 0 ? Math.round(((subscriptionBreakdown['premium'] || 0) + (subscriptionBreakdown['enterprise'] || 0)) / totalUsers * 100) : 0}%
                                        </p>
                                        <p className="text-xs text-text-muted mt-1">From basic to paid</p>
                                    </div>
                                    <div className="bg-surface-elevated rounded p-4">
                                        <p className="text-xs text-text-muted mb-1">Avg. Revenue Per User</p>
                                        <p className="text-xl font-bold text-primary">
                                            ${totalUsers > 0 ? (Object.entries(subscriptionBreakdown).reduce((acc, [tier, count]) => {
                                                const prices: Record<string, number> = { basic: 49, premium: 149, enterprise: 899 };
                                                return acc + (prices[tier] || 0) * count;
                                            }, 0) / totalUsers).toFixed(2) : '0.00'}
                                        </p>
                                        <p className="text-xs text-text-muted mt-1">Annual ARPU</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Industry Insights */}
                        <div className="bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-text-primary mb-4">Industry-Specific Insights</h3>
                            <div className="space-y-4">
                                {Object.entries(organizationTypeBreakdown).map(([type, count]) => {
                                    const percentage = totalUsers > 0 ? (count / totalUsers * 100).toFixed(1) : '0';
                                    return (
                                        <div key={type}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-text-secondary capitalize">{type.replace('-', ' ')}</span>
                                                <span className="text-sm font-semibold text-text-primary">{count} users ({percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-border rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full transition-all"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* User Details Modal */}
            {selectedUser && renderUserDetails()}
        </div>
    );
};

export default AdminDashboard;
