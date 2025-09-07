/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ODDILogo, GoogleIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../icons';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { User, SubscriptionTier } from '../../types';
import { PRICING_TIERS } from '../../config/pricing';
import PricingCard from '../common/PricingCard';

interface SignUpProps {
    onSignUp: (user: User) => void;
    onBackToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onBackToLogin }) => {
    const [currentStep, setCurrentStep] = useState<'pricing' | 'details' | 'confirmation'>('pricing');
    const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('basic');
    
    // Form state
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        position: '',
        organizationType: '',
        organizationName: '',
        organizationSize: '',
        agreeToTerms: false,
        agreeToMarketing: false
    });
    
    const { isMobile, isTablet } = useMobileDetection();

    const handleTierSelect = (tierId: string) => {
        setSelectedTier(tierId as SubscriptionTier);
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNextStep = () => {
        if (currentStep === 'pricing') {
            setCurrentStep('details');
        } else if (currentStep === 'details') {
            setCurrentStep('confirmation');
        }
    };

    const handlePrevStep = () => {
        if (currentStep === 'details') {
            setCurrentStep('pricing');
        } else if (currentStep === 'confirmation') {
            setCurrentStep('details');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = {
            fullname: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            organizationType: formData.organizationType,
            organizationName: formData.organizationName,
            subscriptionTier: selectedTier,
            loginDate: new Date().toISOString(),
            registrationDate: new Date().toISOString(),
            isEnterprise: selectedTier === 'enterprise'
        };
        onSignUp(user);
    };

    const handleSocialSignUp = (provider: string) => {
        console.log(`Social sign up with ${provider}`);
        // Implementation would integrate with OAuth providers
    };

    const selectedTierData = PRICING_TIERS.find(tier => tier.id === selectedTier);
    const labelStyles = "block text-sm font-bold font-mono text-text-secondary mb-2 uppercase tracking-wider";
    const containerPadding = isMobile ? "p-6" : isTablet ? "p-8" : "p-10 sm:p-12";
    const logoSize = isMobile ? "w-8 h-8" : "w-10 h-10";

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
            <div className={`w-full ${currentStep === 'pricing' ? 'max-w-6xl' : isMobile ? 'max-w-sm' : 'max-w-md'}`}>
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
                                {currentStep === 'pricing' ? 'Choose Your Plan' : 
                                 currentStep === 'details' ? 'Account Details' : 'Confirm Registration'}
                            </h2>
                        </div>
                        <p className="text-text-secondary text-center">
                            {currentStep === 'pricing' ? 'Select the plan that best fits your needs.' :
                             currentStep === 'details' ? 'Complete your professional profile.' :
                             'Review and confirm your registration.'}
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-4">
                            {['pricing', 'details', 'confirmation'].map((step, index) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        currentStep === step ? 'bg-primary text-white' :
                                        ['pricing', 'details', 'confirmation'].indexOf(currentStep) > index ? 'bg-primary/20 text-primary' :
                                        'bg-border text-text-muted'
                                    }`}>
                                        {index + 1}
                                    </div>
                                    {index < 2 && (
                                        <div className={`w-8 h-0.5 ml-2 ${
                                            ['pricing', 'details', 'confirmation'].indexOf(currentStep) > index ? 'bg-primary' : 'bg-border'
                                        }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Step */}
                    {currentStep === 'pricing' && (
                        <div>
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                {PRICING_TIERS.map((tier) => (
                                    <PricingCard
                                        key={tier.id}
                                        tier={tier}
                                        selected={selectedTier === tier.id}
                                        onSelect={handleTierSelect}
                                    />
                                ))}
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={onBackToLogin}
                                    className="text-text-secondary hover:text-primary transition-colors"
                                >
                                    ← Back to Login
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="btn-primary px-8 py-3 font-semibold"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Details Step */}
                    {currentStep === 'details' && (
                        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-6">
                            {/* Social Sign Up Options */}
                            <div className="mb-6">
                                <p className="text-center text-sm font-mono text-text-secondary mb-4 uppercase tracking-wider">Quick Sign Up</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button type="button" onClick={() => handleSocialSignUp('google')} className="flex items-center justify-center gap-2 py-2 px-4 border border-border hover:border-primary transition-colors">
                                        <GoogleIcon className="w-4 h-4" />
                                        <span className="text-sm">Google</span>
                                    </button>
                                    <button type="button" onClick={() => handleSocialSignUp('linkedin')} className="flex items-center justify-center gap-2 py-2 px-4 border border-border hover:border-primary transition-colors">
                                        <LinkedInIcon className="w-4 h-4" />
                                        <span className="text-sm">LinkedIn</span>
                                    </button>
                                </div>
                                <div className="text-center my-4 text-text-muted">Or continue with email</div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullname" className={labelStyles}>Full Name *</label>
                                    <input
                                        id="fullname"
                                        type="text"
                                        value={formData.fullname}
                                        onChange={e => handleInputChange('fullname', e.target.value)}
                                        required
                                        className="form-input"
                                        placeholder="e.g., Jane Doe"
                                        autoComplete="name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelStyles}>Email Address *</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={e => handleInputChange('email', e.target.value)}
                                        required
                                        className="form-input"
                                        placeholder="e.g., jane.doe@example.com"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className={labelStyles}>Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => handleInputChange('phone', e.target.value)}
                                        className="form-input"
                                        placeholder="e.g., (416) 555-0123"
                                        autoComplete="tel"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="position" className={labelStyles}>Job Title/Position</label>
                                    <input
                                        id="position"
                                        type="text"
                                        value={formData.position}
                                        onChange={e => handleInputChange('position', e.target.value)}
                                        className="form-input"
                                        placeholder="e.g., IT Director"
                                        autoComplete="organization-title"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="org-type" className={labelStyles}>Organization Type *</label>
                                <select
                                    id="org-type"
                                    value={formData.organizationType}
                                    onChange={e => handleInputChange('organizationType', e.target.value)}
                                    required
                                    className="form-input"
                                >
                                    <option value="" disabled>Select your sector</option>
                                    <option value="municipality">Municipality</option>
                                    <option value="small-business">Small Business</option>
                                    <option value="medium-business">Medium Business</option>
                                    <option value="large-enterprise">Large Enterprise</option>
                                    <option value="non-profit">Non-Profit</option>
                                    <option value="government">Government Agency</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="education">Educational Institution</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="org-name" className={labelStyles}>Organization Name *</label>
                                <input
                                    id="org-name"
                                    type="text"
                                    value={formData.organizationName}
                                    onChange={e => handleInputChange('organizationName', e.target.value)}
                                    required
                                    className="form-input"
                                    placeholder="e.g., City of Toronto"
                                    autoComplete="organization"
                                />
                            </div>

                            {selectedTier === 'enterprise' && (
                                <div>
                                    <label htmlFor="org-size" className={labelStyles}>Organization Size</label>
                                    <select
                                        id="org-size"
                                        value={formData.organizationSize}
                                        onChange={e => handleInputChange('organizationSize', e.target.value)}
                                        className="form-input"
                                    >
                                        <option value="">Select size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-1000">201-1000 employees</option>
                                        <option value="1000+">1000+ employees</option>
                                    </select>
                                </div>
                            )}

                            {/* Agreements */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={formData.agreeToTerms}
                                        onChange={e => handleInputChange('agreeToTerms', e.target.checked)}
                                        required
                                        className="mt-1"
                                    />
                                    <label htmlFor="terms" className="text-sm text-text-secondary">
                                        I agree to the <span className="text-primary underline cursor-pointer">Terms of Service</span> and <span className="text-primary underline cursor-pointer">Privacy Policy</span> *
                                    </label>
                                </div>
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        checked={formData.agreeToMarketing}
                                        onChange={e => handleInputChange('agreeToMarketing', e.target.checked)}
                                    />
                                    <label htmlFor="marketing" className="text-sm text-text-secondary">
                                        I would like to receive updates about new courses and cybersecurity insights
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="text-text-secondary hover:text-primary transition-colors"
                                >
                                    ← Back to Pricing
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.agreeToTerms}
                                    className="btn-primary px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Review Registration →
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Confirmation Step */}
                    {currentStep === 'confirmation' && selectedTierData && (
                        <div className="space-y-6">
                            <div className="bg-surface-elevated border border-border p-6 rounded-lg">
                                <h3 className="text-lg font-semibold font-mono text-text-primary mb-4 uppercase">Registration Summary</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-text-secondary mb-2">Personal Information</h4>
                                        <div className="space-y-1 text-sm">
                                            <p><strong>Name:</strong> {formData.fullname}</p>
                                            <p><strong>Email:</strong> {formData.email}</p>
                                            {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
                                            {formData.position && <p><strong>Position:</strong> {formData.position}</p>}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold text-text-secondary mb-2">Organization</h4>
                                        <div className="space-y-1 text-sm">
                                            <p><strong>Name:</strong> {formData.organizationName}</p>
                                            <p><strong>Type:</strong> {formData.organizationType}</p>
                                            {formData.organizationSize && <p><strong>Size:</strong> {formData.organizationSize}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                    Selected Plan: {selectedTierData.name}
                                    {selectedTierData.isPopular && <span className="text-xs bg-primary text-white px-2 py-1 rounded">POPULAR</span>}
                                </h4>
                                <div className="text-sm text-text-secondary mb-4">
                                    {selectedTierData.price === 0 ? 'FREE' : `$${selectedTierData.price} CAD/${selectedTierData.billing}`}
                                </div>
                                <div className="text-xs text-text-muted">
                                    ✓ Study Guide Access: {selectedTierData.studyGuideAccess ? 'Included' : 'Not included'}
                                    <br />
                                    ✓ Practice Exam Access: {selectedTierData.practiceExamAccess ? 'Included' : 'Not included'}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="text-text-secondary hover:text-primary transition-colors"
                                    >
                                        ← Back to Details
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary px-8 py-3 font-semibold"
                                    >
                                        Complete Registration →
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded text-center">
                        <p className="text-xs text-text-secondary">
                            🔒 Your information is secure and will only be used for certification purposes and the services you've selected.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;