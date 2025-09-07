/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { ODDILogo, GoogleIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../icons';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { LoginUser } from '../../types';

interface LoginProps {
    onLogin: (user: LoginUser) => void;
    onSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignUp }) => {
    const [fullname, setFullname] = useState('');
    const [organizationType, setOrganizationType] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [email, setEmail] = useState('');
    const { isMobile, isTablet } = useMobileDetection();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user: LoginUser = {
            fullname,
            organizationType,
            organizationName,
            email,
            loginDate: new Date().toISOString()
        };
        onLogin(user);
    };

    const handleSocialLogin = (provider: string) => {
        // Placeholder for social login integration
        console.log(`Social login with ${provider}`);
        // In a real app, this would trigger OAuth flow
    };
    
    const labelStyles = "block text-sm font-bold font-mono text-text-secondary mb-2 uppercase tracking-wider";
    const containerPadding = isMobile ? "p-6" : isTablet ? "p-8" : "p-10 sm:p-12";
    const logoSize = isMobile ? "w-8 h-8" : "w-10 h-10";

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
            <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
                <div className={`bg-surface border border-border ${containerPadding} shadow-lg`}>
                    {/* Enhanced Header with Institute Branding */}
                    <div className="flex flex-col items-center mb-8">
                        <ODDILogo className={`${logoSize} mb-4 text-primary`} />
                        <div className="text-center mb-4">
                            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold font-mono text-primary tracking-wider uppercase mb-2`}>
                                Ontario Digital Defence Institute
                            </h1>
                            <div className="w-16 h-0.5 bg-primary mx-auto mb-3"></div>
                            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold font-mono text-text-primary tracking-wider uppercase`}>
                                Training Portal
                            </h2>
                        </div>
                        <p className="text-text-secondary text-center">Authenticate to begin your OCRP certification journey.</p>
                    </div>

                    {/* Social Login Options */}
                    <div className="mb-6">
                        <p className="text-center text-sm font-mono text-text-secondary mb-4 uppercase tracking-wider">Quick Sign In</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center gap-2 p-3 border border-border hover:border-primary hover:bg-primary/5 transition-colors rounded"
                            >
                                <GoogleIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('linkedin')}
                                className="flex items-center justify-center gap-2 p-3 border border-border hover:border-primary hover:bg-primary/5 transition-colors rounded"
                            >
                                <LinkedInIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">LinkedIn</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex items-center justify-center gap-2 p-3 border border-border hover:border-primary hover:bg-primary/5 transition-colors rounded"
                            >
                                <FacebookIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">Facebook</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('instagram')}
                                className="flex items-center justify-center gap-2 p-3 border border-border hover:border-primary hover:bg-primary/5 transition-colors rounded"
                            >
                                <InstagramIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">Instagram</span>
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-surface text-text-secondary font-mono uppercase tracking-wider">Or continue with email</span>
                        </div>
                    </div>

                    {/* Return User Notice */}
                    <div className="text-center mb-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-sm text-text-primary font-medium mb-2">
                                🎓 Returning User?
                            </p>
                            <p className="text-xs text-text-secondary">
                                If you've already registered and selected a plan, you can access your training dashboard directly.
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Form for Returning Users */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className={labelStyles}>Email Address</label>
                            <input 
                                id="email" 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required 
                                className="form-input" 
                                placeholder="e.g., jane.doe@example.com"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="fullname" className={labelStyles}>Full Name</label>
                            <input 
                                id="fullname" 
                                type="text" 
                                value={fullname} 
                                onChange={e => setFullname(e.target.value)} 
                                required 
                                className="form-input" 
                                placeholder="e.g., Jane Doe"
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="org-type" className={labelStyles}>Organization Type</label>
                            <select 
                                id="org-type" 
                                value={organizationType} 
                                onChange={e => setOrganizationType(e.target.value)} 
                                required 
                                className="form-input"
                                autoComplete="organization-title"
                            >
                                <option value="" disabled>Select your sector</option>
                                <option value="small-business">Small Business</option>
                                <option value="municipality">Municipality</option>
                                <option value="non-profit">Non-Profit</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="org-name" className={labelStyles}>Organization Name</label>
                            <input 
                                id="org-name" 
                                type="text" 
                                value={organizationName} 
                                onChange={e => setOrganizationName(e.target.value)} 
                                required 
                                className="form-input" 
                                placeholder="e.g., City of Toronto"
                                autoComplete="organization"
                            />
                        </div>
                        <button type="submit" className="w-full btn-primary py-3 px-4 text-base mt-8 font-semibold">
                            Access Training Dashboard →
                        </button>
                    </form>
                    
                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded text-center">
                        <p className="text-xs text-text-secondary">
                            🔒 Your information is secure and will only be used for certification purposes.
                        </p>
                    </div>
                    
                    {/* New User Sign Up - Primary Action */}
                    <div className="mt-6 text-center">
                        <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                            <h3 className="text-lg font-bold font-mono text-primary mb-2 uppercase tracking-wider">
                                New to OCRP Training?
                            </h3>
                            <p className="text-sm text-text-secondary mb-4">
                                Start your certification journey by selecting a training plan that fits your needs.
                            </p>
                            <button
                                type="button"
                                onClick={onSignUp}
                                className="w-full btn-primary py-3 px-4 text-base font-semibold"
                            >
                                Get Started - Choose Your Plan →
                            </button>
                        </div>
                        <p className="text-xs text-text-muted mt-3">
                            Free and paid options available • No credit card required to start
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;