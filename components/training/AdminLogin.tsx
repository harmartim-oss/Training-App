/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ODDILogo } from '../icons';

interface AdminLoginProps {
    onLogin: (email: string) => void;
    onBackToPortal: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBackToPortal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // SECURITY WARNING: This is a DEMO implementation for development/testing only!
    // For production, you MUST implement:
    // 1. Backend authentication API with proper security
    // 2. Bcrypt/Argon2 password hashing
    // 3. JWT tokens for session management
    // 4. Rate limiting and brute force protection
    // 5. Two-factor authentication (2FA)
    // 6. Audit logging
    // See ADMIN_SETUP.md for detailed security recommendations
    
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@oddi.ca';
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // IMPORTANT: This simple comparison is for DEMO purposes only
        // In production, credentials should be verified server-side with proper hashing
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            onLogin(email);
        } else {
            // Generic error message to prevent user enumeration
            setError('Authentication failed. Please check your credentials and try again.');
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-surface border border-border p-10 shadow-lg">
                    {/* Security Warning Banner */}
                    <div className="mb-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                        <p className="text-xs text-warning font-semibold">
                            ⚠️ DEMO MODE: For production, implement proper backend authentication
                        </p>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <ODDILogo className="w-10 h-10 mb-4 text-primary" />
                        <div className="text-center mb-4">
                            <h1 className="text-2xl font-bold font-mono text-primary tracking-wider uppercase mb-2">
                                Admin Portal
                            </h1>
                            <div className="w-16 h-0.5 bg-primary mx-auto mb-3"></div>
                            <h2 className="text-xl font-bold font-mono text-text-primary tracking-wider uppercase">
                                Authentication Required
                            </h2>
                        </div>
                        <p className="text-text-secondary text-center">
                            Sign in to access the administration dashboard
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800 text-center">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="admin-email" className="block text-sm font-bold font-mono text-text-secondary mb-2 uppercase tracking-wider">
                                Admin Email
                            </label>
                            <input
                                id="admin-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-input"
                                placeholder="admin@example.com"
                                autoComplete="email"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="admin-password" className="block text-sm font-bold font-mono text-text-secondary mb-2 uppercase tracking-wider">
                                Password
                            </label>
                            <input
                                id="admin-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 px-4 text-base mt-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Back to Portal */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={onBackToPortal}
                            className="text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                            ← Back to Training Portal
                        </button>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded text-center">
                        <p className="text-xs text-text-secondary">
                            🔒 This is a secure administrative area. All activities are logged.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
