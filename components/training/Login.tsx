/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { ODDILogo } from '../icons';

interface User {
    fullname: string;
    organizationType: string;
    organizationName: string;
    email: string;
    loginDate: string;
}

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [fullname, setFullname] = useState('');
    const [organizationType, setOrganizationType] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = {
            fullname,
            organizationType,
            organizationName,
            email,
            loginDate: new Date().toISOString()
        };
        onLogin(user);
    };
    
    const labelStyles = "block text-sm font-bold font-mono text-text-secondary mb-2 uppercase tracking-wider";

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-surface border border-border p-10 sm:p-12">
                    <div className="flex flex-col items-center mb-8">
                        <ODDILogo className="w-10 h-10 mb-4 text-primary" />
                        <h1 className="text-2xl font-bold font-mono text-text-primary tracking-wider uppercase">ODDI Training Portal</h1>
                        <p className="text-text-secondary mt-1">Authenticate to begin certification.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullname" className={labelStyles}>Full Name</label>
                            <input id="fullname" type="text" value={fullname} onChange={e => setFullname(e.target.value)} required className="form-input" placeholder="e.g., Jane Doe" />
                        </div>
                        <div>
                            <label htmlFor="org-type" className={labelStyles}>Organization Type</label>
                            <select id="org-type" value={organizationType} onChange={e => setOrganizationType(e.target.value)} required className="form-input">
                                <option value="" disabled>Select your sector</option>
                                <option value="small-business">Small Business</option>
                                <option value="municipality">Municipality</option>
                                <option value="non-profit">Non-Profit</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="org-name" className={labelStyles}>Organization Name</label>
                            <input id="org-name" type="text" value={organizationName} onChange={e => setOrganizationName(e.target.value)} required className="form-input" placeholder="e.g., City of Toronto" />
                        </div>
                        <div>
                            <label htmlFor="email" className={labelStyles}>Email Address</label>
                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" placeholder="e.g., jane.doe@example.com" />
                        </div>
                        <button type="submit" className="w-full btn-primary py-3 px-4 text-base mt-8">
                            Start Training
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;