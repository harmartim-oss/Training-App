/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { UserIcon, EditIcon } from '../icons';
import { User } from '../../types';

interface AccountDetailsProps {
    user: User;
    onNavigate: (section: string) => void;
    onUpdateUser?: (user: User) => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ user, onNavigate, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleSave = () => {
        if (onUpdateUser) {
            onUpdateUser(editedUser);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="module-card-enhanced p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <UserIcon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold font-mono text-text-primary uppercase">
                                Account Details
                            </h1>
                            <p className="text-text-secondary">Manage your profile and certification information</p>
                        </div>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <EditIcon className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-surface border border-border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <UserIcon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Personal Information
                            </h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.fullname}
                                        onChange={(e) => setEditedUser({ ...editedUser, fullname: e.target.value })}
                                        className="form-input w-full"
                                    />
                                ) : (
                                    <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                        <p className="text-text-primary font-medium">{user.fullname}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        className="form-input w-full"
                                    />
                                ) : (
                                    <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                        <p className="text-text-primary font-medium">{user.email}</p>
                                    </div>
                                )}
                            </div>

                            {user.phone && (
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Phone Number</label>
                                    <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                        <p className="text-text-primary font-medium">{user.phone}</p>
                                    </div>
                                </div>
                            )}

                            {user.position && (
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Position</label>
                                    <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                        <p className="text-text-primary font-medium">{user.position}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Organization Information */}
                    <div className="bg-surface border border-border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                <span className="text-accent text-lg">🏢</span>
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Organization Information
                            </h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Organization Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.organizationName}
                                        onChange={(e) => setEditedUser({ ...editedUser, organizationName: e.target.value })}
                                        className="form-input w-full"
                                    />
                                ) : (
                                    <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                        <p className="text-text-primary font-medium">{user.organizationName}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Organization Type</label>
                                {isEditing ? (
                                    <select
                                        value={editedUser.organizationType}
                                        onChange={(e) => setEditedUser({ ...editedUser, organizationType: e.target.value })}
                                        className="form-input w-full"
                                    >
                                        <option value="small-business">Small Business</option>
                                        <option value="municipality">Municipality</option>
                                        <option value="non-profit">Non-Profit</option>
                                        <option value="government">Government Agency</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="education">Educational Institution</option>
                                        <option value="other">Other</option>
                                    </select>
                                ) : (
                                    <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                                {user.organizationType.replace('-', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Registration Date</label>
                                <div className="bg-surface-elevated border border-border rounded-lg p-3">
                                    <p className="text-text-primary font-medium">
                                        {new Date(user.registrationDate).toLocaleDateString('en-CA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Information */}
                <div className="mt-8">
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-lg">💳</span>
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary">
                                Subscription Information
                            </h3>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-surface border border-border rounded-lg p-4">
                                <label className="block text-sm font-medium text-text-secondary mb-2">Current Plan</label>
                                <div className="flex items-center gap-2">
                                    <p className="text-text-primary font-semibold capitalize">
                                        {user.subscriptionTier === 'basic' ? 'Basic Access' :
                                         user.subscriptionTier === 'individual' ? 'Individual Professional' :
                                         user.subscriptionTier === 'enterprise' ? 'Enterprise & Municipal' : 
                                         user.subscriptionTier}
                                    </p>
                                    {user.subscriptionTier === 'basic' && (
                                        <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full font-semibold">
                                            FREE
                                        </span>
                                    )}
                                    {user.subscriptionTier === 'individual' && (
                                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">
                                            POPULAR
                                        </span>
                                    )}
                                    {user.subscriptionTier === 'enterprise' && (
                                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-semibold">
                                            PREMIUM
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-surface border border-border rounded-lg p-4">
                                <label className="block text-sm font-medium text-text-secondary mb-2">Member Since</label>
                                <p className="text-text-primary font-semibold">
                                    {new Date(user.registrationDate).toLocaleDateString('en-CA', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            
                            <div className="bg-surface border border-border rounded-lg p-4">
                                <label className="block text-sm font-medium text-text-secondary mb-2">Last Login</label>
                                <p className="text-text-primary font-semibold">
                                    {new Date(user.loginDate).toLocaleDateString('en-CA', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        
                        {/* Plan benefits preview */}
                        <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
                            <div className="text-sm text-text-secondary mb-2">Plan Benefits:</div>
                            <div className="flex flex-wrap gap-2">
                                {user.subscriptionTier === 'basic' && (
                                    <>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ 4 Training Modules</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Basic AI Assistant</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Digital Certificate</span>
                                        <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded">❌ Study Guides</span>
                                        <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded">❌ Practice Exams</span>
                                    </>
                                )}
                                {user.subscriptionTier === 'individual' && (
                                    <>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ All Basic Features</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Study Guides</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Practice Exams</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Unlimited AI</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Email Support</span>
                                    </>
                                )}
                                {user.subscriptionTier === 'enterprise' && (
                                    <>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ All Pro Features</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Multi-User Access</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Custom Branding</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Priority Support</span>
                                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">✓ Analytics</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing ? (
                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border">
                        <button
                            onClick={handleCancel}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="btn-primary flex items-center gap-2"
                        >
                            <span>💾</span>
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-border">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <span>📊</span>
                            View Dashboard
                        </button>
                        <div className="flex gap-4">
                            <button
                                onClick={() => onNavigate('subscription')}
                                className="btn-primary flex items-center gap-2"
                            >
                                <span>⚡</span>
                                Manage Subscription
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountDetails;