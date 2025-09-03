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

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-lg animate-fade-in">
            <div className="w-full" style={{maxWidth: '448px'}}>
                <div className="card shadow-2xl p-2xl">
                    <div className="text-center mb-2xl">
                        <ODDILogo className="w-12 h-12 mb-lg mx-auto text-primary" />
                        <h1 className="font-bold text-primary mb-sm">ODDI Training Portal</h1>
                        <p className="text-secondary">Enter your details to begin the certification.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
                        <div>
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input 
                                id="fullname" 
                                type="text" 
                                value={fullname} 
                                onChange={e => setFullname(e.target.value)} 
                                required 
                                className="form-input" 
                                placeholder="e.g., Jane Doe" 
                            />
                        </div>
                        <div>
                            <label htmlFor="org-type" className="form-label">Organization Type</label>
                            <select 
                                id="org-type" 
                                value={organizationType} 
                                onChange={e => setOrganizationType(e.target.value)} 
                                required 
                                className="form-input"
                            >
                                <option value="" disabled>Select your sector</option>
                                <option value="small-business">Small Business</option>
                                <option value="municipality">Municipality</option>
                                <option value="non-profit">Non-Profit</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="org-name" className="form-label">Organization Name</label>
                            <input 
                                id="org-name" 
                                type="text" 
                                value={organizationName} 
                                onChange={e => setOrganizationName(e.target.value)} 
                                required 
                                className="form-input" 
                                placeholder="e.g., City of Toronto" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input 
                                id="email" 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required 
                                className="form-input" 
                                placeholder="e.g., jane.doe@example.com" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-large mt-base">
                            Start Training
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;