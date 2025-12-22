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

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
                            Personal Information
                        </h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser.fullname}
                                    onChange={(e) => setEditedUser({ ...editedUser, fullname: e.target.value })}
                                    className="form-input w-full"
                                />
                            ) : (
                                <p className="text-text-primary font-medium">{user.fullname}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedUser.email}
                                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    className="form-input w-full"
                                />
                            ) : (
                                <p className="text-text-primary font-medium">{user.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Organization Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
                            Organization Information
                        </h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Organization Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser.organizationName}
                                    onChange={(e) => setEditedUser({ ...editedUser, organizationName: e.target.value })}
                                    className="form-input w-full"
                                />
                            ) : (
                                <p className="text-text-primary font-medium">{user.organizationName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Organization Type</label>
                            {isEditing ? (
                                <select
                                    value={editedUser.organizationType}
                                    onChange={(e) => setEditedUser({ ...editedUser, organizationType: e.target.value })}
                                    className="form-input w-full"
                                >
                                    <option value="small-business">Small Business</option>
                                    <option value="municipality">Municipality</option>
                                    <option value="non-profit">Non-Profit</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <p className="text-text-primary font-medium capitalize">
                                    {user.organizationType.replace('-', ' ')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Subscription Information */}
                <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                        Subscription Information
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Current Plan</label>
                            <p className="text-text-primary font-medium capitalize">
                                {user.subscriptionTier}
                                {user.subscriptionTier === 'basic' && (
                                    <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                                        Limited Access
                                    </span>
                                )}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Member Since</label>
                            <p className="text-text-primary font-medium">
                                {new Date(user.registrationDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Last Login</label>
                            <p className="text-text-primary font-medium">
                                {new Date(user.loginDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CPD Information */}
                {(() => {
                    const cpdRequirement = getCPDRequirementForTier(user.subscriptionTier);
                    if (cpdRequirement.annualHoursRequired > 0) {
                        const cpdHours = user.cpdHours || {
                            total: 0,
                            required: cpdRequirement.annualHoursRequired,
                            byCategory: { training: 0, thirdParty: 0, formalStudy: 0, conferences: 0, other: 0 },
                            periodStart: new Date().toISOString().split('T')[0],
                            periodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                        };
                        const progress = calculateCPDProgress(cpdHours, cpdRequirement);

                        return (
                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-text-primary">
                                        CPD Status
                                    </h3>
                                    <button
                                        onClick={() => onNavigate('cpd-tracking')}
                                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        View Details →
                                    </button>
                                </div>
                                <div className="bg-surface-elevated rounded-lg p-4">
                                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                                        <div>
                                            <p className="text-xs text-text-muted mb-1">Annual Requirement</p>
                                            <p className="text-xl font-bold text-text-primary">
                                                {cpdRequirement.annualHoursRequired} hours
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-muted mb-1">Completed</p>
                                            <p className="text-xl font-bold text-primary">
                                                {cpdHours.total} hours
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-muted mb-1">Progress</p>
                                            <p className={`text-xl font-bold ${progress >= 100 ? 'text-success' : 'text-warning'}`}>
                                                {Math.round(progress)}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all ${
                                                progress >= 100 ? 'bg-success' : 'bg-primary'
                                            }`}
                                            style={{ width: `${Math.min(100, progress)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-text-muted mt-2">
                                        Period: {new Date(cpdHours.periodStart).toLocaleDateString()} - {new Date(cpdHours.periodEnd).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })()}

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
                            className="btn-primary"
                        >
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border">
                        {getCPDRequirementForTier(user.subscriptionTier).annualHoursRequired > 0 && (
                            <button
                                onClick={() => onNavigate('cpd-tracking')}
                                className="btn-secondary"
                            >
                                📊 Manage CPD Hours
                            </button>
                        )}
                        <button
                            onClick={() => onNavigate('subscription')}
                            className="btn-primary"
                        >
                            Manage Subscription
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountDetails;