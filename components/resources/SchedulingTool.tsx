/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface ScheduledActivity {
    id: string;
    title: string;
    description: string;
    type: 'training' | 'assessment' | 'compliance' | 'review';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    completed: boolean;
    estimatedTime: number; // in hours
    dependencies: string[];
}

interface SchedulingToolProps {
    currentModule?: string;
    userProgress?: any;
}

const defaultActivities: ScheduledActivity[] = [
    {
        id: 'module1-review',
        title: 'Complete Module 1: Privacy Laws & Frameworks',
        description: 'Study PIPEDA, MFIPPA, PHIPA, and FIPPA requirements',
        type: 'training',
        priority: 'high',
        dueDate: '2025-02-01',
        completed: false,
        estimatedTime: 4,
        dependencies: []
    },
    {
        id: 'pia-template-review',
        title: 'Review Privacy Impact Assessment Templates',
        description: 'Download and customize PIA templates for your organization',
        type: 'compliance',
        priority: 'medium',
        dueDate: '2025-02-03',
        completed: false,
        estimatedTime: 2,
        dependencies: ['module1-review']
    },
    {
        id: 'module2-cybersecurity',
        title: 'Complete Module 2: Cybersecurity & Incident Response',
        description: 'Learn NIST framework and incident response procedures',
        type: 'training',
        priority: 'high',
        dueDate: '2025-02-08',
        completed: false,
        estimatedTime: 5,
        dependencies: ['module1-review']
    },
    {
        id: 'staff-training-plan',
        title: 'Develop Staff Training Plan',
        description: 'Create plan for organization-wide privacy and security training',
        type: 'compliance',
        priority: 'medium',
        dueDate: '2025-02-10',
        completed: false,
        estimatedTime: 3,
        dependencies: ['module1-review', 'module2-cybersecurity']
    },
    {
        id: 'module3-ai-governance',
        title: 'Complete Module 3: AI Governance & Responsible Use',
        description: 'Study Ontario AI directive and algorithmic impact assessments',
        type: 'training',
        priority: 'high',
        dueDate: '2025-02-15',
        completed: false,
        estimatedTime: 4,
        dependencies: ['module2-cybersecurity']
    },
    {
        id: 'quarterly-compliance-review',
        title: 'Quarterly Compliance Review',
        description: 'Review and update privacy policies and procedures',
        type: 'review',
        priority: 'medium',
        dueDate: '2025-03-31',
        completed: false,
        estimatedTime: 6,
        dependencies: ['module1-review', 'module2-cybersecurity', 'module3-ai-governance']
    }
];

const SchedulingTool: React.FC<SchedulingToolProps> = ({ currentModule, userProgress }) => {
    const [activities, setActivities] = useState<ScheduledActivity[]>(defaultActivities);
    const [view, setView] = useState<'calendar' | 'list' | 'timeline'>('list');
    const [filter, setFilter] = useState<'all' | 'training' | 'compliance' | 'review'>('all');
    const [showCompleted, setShowCompleted] = useState(false);
    const [newActivity, setNewActivity] = useState<Partial<ScheduledActivity>>({});
    const [showAddForm, setShowAddForm] = useState(false);

    // Update activities based on user progress
    useEffect(() => {
        if (userProgress) {
            setActivities(prev => 
                prev.map(activity => {
                    // Mark module activities as completed based on user progress
                    if (activity.id === 'module1-review' && userProgress.module1?.completed) {
                        return { ...activity, completed: true };
                    }
                    if (activity.id === 'module2-cybersecurity' && userProgress.module2?.completed) {
                        return { ...activity, completed: true };
                    }
                    if (activity.id === 'module3-ai-governance' && userProgress.module3?.completed) {
                        return { ...activity, completed: true };
                    }
                    return activity;
                })
            );
        }
    }, [userProgress]);

    const toggleActivity = (id: string) => {
        setActivities(prev =>
            prev.map(activity =>
                activity.id === id
                    ? { ...activity, completed: !activity.completed }
                    : activity
            )
        );
    };

    const addActivity = () => {
        if (!newActivity.title || !newActivity.dueDate) return;

        const activity: ScheduledActivity = {
            id: `custom-${Date.now()}`,
            title: newActivity.title,
            description: newActivity.description || '',
            type: newActivity.type || 'compliance',
            priority: newActivity.priority || 'medium',
            dueDate: newActivity.dueDate,
            completed: false,
            estimatedTime: newActivity.estimatedTime || 1,
            dependencies: newActivity.dependencies || []
        };

        setActivities(prev => [...prev, activity]);
        setNewActivity({});
        setShowAddForm(false);
    };

    const deleteActivity = (id: string) => {
        setActivities(prev => prev.filter(activity => activity.id !== id));
    };

    const filteredActivities = activities.filter(activity => {
        if (!showCompleted && activity.completed) return false;
        if (filter !== 'all' && activity.type !== filter) return false;
        return true;
    });

    const sortedActivities = filteredActivities.sort((a, b) => {
        // Sort by due date, then by priority
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime();
        }
        
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const getActivityStats = () => {
        const total = activities.length;
        const completed = activities.filter(a => a.completed).length;
        const overdue = activities.filter(a => !a.completed && new Date(a.dueDate) < new Date()).length;
        const upcoming = activities.filter(a => !a.completed && new Date(a.dueDate) >= new Date()).length;

        return { total, completed, overdue, upcoming };
    };

    const stats = getActivityStats();

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'training': return '📚';
            case 'assessment': return '🎯';
            case 'compliance': return '⚖️';
            case 'review': return '🔍';
            default: return '📋';
        }
    };

    return (
        <div className="scheduling-tool bg-surface border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-text-primary font-mono uppercase">
                📅 Compliance Scheduling Tool
            </h3>
            <p className="text-text-secondary mb-6">
                Plan and track your compliance activities, training schedules, and review cycles.
            </p>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-background p-3 rounded border border-border text-center">
                    <div className="text-lg font-bold text-primary">{stats.total}</div>
                    <div className="text-xs text-text-secondary">Total Activities</div>
                </div>
                <div className="bg-background p-3 rounded border border-border text-center">
                    <div className="text-lg font-bold text-green-600">{stats.completed}</div>
                    <div className="text-xs text-text-secondary">Completed</div>
                </div>
                <div className="bg-background p-3 rounded border border-border text-center">
                    <div className="text-lg font-bold text-red-600">{stats.overdue}</div>
                    <div className="text-xs text-text-secondary">Overdue</div>
                </div>
                <div className="bg-background p-3 rounded border border-border text-center">
                    <div className="text-lg font-bold text-blue-600">{stats.upcoming}</div>
                    <div className="text-xs text-text-secondary">Upcoming</div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-3 py-1 border border-border rounded bg-background text-text-primary text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="training">Training</option>
                        <option value="compliance">Compliance</option>
                        <option value="review">Reviews</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={showCompleted}
                            onChange={(e) => setShowCompleted(e.target.checked)}
                        />
                        Show Completed
                    </label>
                </div>
                
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary px-4 py-2 text-sm"
                >
                    ➕ Add Activity
                </button>
            </div>

            {/* Add Activity Form */}
            {showAddForm && (
                <div className="mb-6 p-4 bg-background border border-border rounded">
                    <h4 className="font-semibold text-text-primary mb-3">Add New Activity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Activity title"
                            value={newActivity.title || ''}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                            className="px-3 py-2 border border-border rounded bg-surface text-text-primary"
                        />
                        <input
                            type="date"
                            value={newActivity.dueDate || ''}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, dueDate: e.target.value }))}
                            className="px-3 py-2 border border-border rounded bg-surface text-text-primary"
                        />
                        <select
                            value={newActivity.type || 'compliance'}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value as any }))}
                            className="px-3 py-2 border border-border rounded bg-surface text-text-primary"
                        >
                            <option value="training">Training</option>
                            <option value="compliance">Compliance</option>
                            <option value="review">Review</option>
                            <option value="assessment">Assessment</option>
                        </select>
                        <select
                            value={newActivity.priority || 'medium'}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, priority: e.target.value as any }))}
                            className="px-3 py-2 border border-border rounded bg-surface text-text-primary"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={newActivity.description || ''}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                            className="md:col-span-2 px-3 py-2 border border-border rounded bg-surface text-text-primary resize-none"
                            rows={2}
                        />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={addActivity}
                            className="btn-primary px-4 py-2 text-sm"
                        >
                            Add Activity
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="btn-secondary px-4 py-2 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Activities List */}
            <div className="space-y-3">
                {sortedActivities.map(activity => {
                    const isOverdue = !activity.completed && new Date(activity.dueDate) < new Date();
                    
                    return (
                        <div key={activity.id} className={`activity-item p-4 border rounded ${activity.completed ? 'bg-green-50 border-green-200' : isOverdue ? 'bg-red-50 border-red-200' : 'bg-background border-border'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={activity.completed}
                                        onChange={() => toggleActivity(activity.id)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg">{getTypeIcon(activity.type)}</span>
                                            <h4 className={`font-semibold ${activity.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                                                {activity.title}
                                            </h4>
                                            <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(activity.priority)}`}>
                                                {activity.priority}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-secondary mb-2">{activity.description}</p>
                                        <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                                            <span>📅 Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
                                            <span>⏱️ Est. Time: {activity.estimatedTime}h</span>
                                            {isOverdue && <span className="text-red-600 font-medium">⚠️ Overdue</span>}
                                        </div>
                                    </div>
                                </div>
                                {activity.id.startsWith('custom-') && (
                                    <button
                                        onClick={() => deleteActivity(activity.id)}
                                        className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
                                        title="Delete activity"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                
                {sortedActivities.length === 0 && (
                    <div className="text-center py-8 text-text-secondary">
                        <p>No activities match your current filters.</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="btn-primary px-4 py-2 text-sm mt-2"
                        >
                            Add Your First Activity
                        </button>
                    </div>
                )}
            </div>

            {/* Export Options */}
            <div className="mt-6 pt-4 border-t border-border">
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            const csvContent = [
                                'Title,Type,Priority,Due Date,Status,Description',
                                ...activities.map(a => `"${a.title}","${a.type}","${a.priority}","${a.dueDate}","${a.completed ? 'Completed' : 'Pending'}","${a.description}"`)
                            ].join('\n');
                            
                            const blob = new Blob([csvContent], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `compliance-schedule-${new Date().toISOString().split('T')[0]}.csv`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                        }}
                        className="btn-secondary px-4 py-2 text-sm"
                    >
                        📊 Export CSV
                    </button>
                    <button
                        onClick={() => {
                            const printContent = activities.map(a => 
                                `${a.completed ? '✅' : '⏳'} ${a.title} (Due: ${a.dueDate})`
                            ).join('\n');
                            
                            const printWindow = window.open('', '_blank');
                            printWindow?.document.write(`
                                <html>
                                    <head><title>Compliance Schedule</title></head>
                                    <body>
                                        <h1>Compliance Activity Schedule</h1>
                                        <pre>${printContent}</pre>
                                    </body>
                                </html>
                            `);
                            printWindow?.document.close();
                            printWindow?.print();
                        }}
                        className="btn-secondary px-4 py-2 text-sm"
                    >
                        🖨️ Print Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SchedulingTool;