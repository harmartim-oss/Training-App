/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ODDILogo, GoogleIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../icons';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import { User, SubscriptionTier } from '../../types';
import { PRICING_TIERS, BUNDLE_OPTIONS } from '../../config/pricing';
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
    
    const { isMobile, isTablet, browser } = useMobileDetection();

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
                            {/* Institute Information Blurb */}
                            <div className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold font-mono text-primary mb-3 uppercase tracking-wider">
                                        About Ontario Digital Defence Institute
                                    </h3>
                                    <div className="w-12 h-0.5 bg-primary mx-auto mb-4"></div>
                                </div>
                                
                                <div className="max-w-4xl mx-auto text-text-primary space-y-4">
                                    <p className="text-center text-lg font-medium text-primary mb-4">
                                        Leading Ontario's digital security and privacy education
                                    </p>
                                    <p>
                                        The Ontario Digital Defence Institute (ODDI) is a premier training organization dedicated to strengthening 
                                        cybersecurity capabilities across Ontario's public and private sectors. We specialize in delivering 
                                        practical, regulation-compliant training that addresses the unique challenges facing Canadian organizations.
                                    </p>
                                    <p>
                                        Our Ontario Certified Cyber Resilience Professional (OCRP) program is specifically designed for Ontario's 
                                        legal and regulatory environment, covering PIPEDA, MFIPPA, provincial AI directives, and emerging 
                                        cybersecurity requirements. With expert-developed curriculum and hands-on learning approaches, we prepare 
                                        professionals to defend their organizations against evolving digital threats.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
                                        <div className="text-center p-3 bg-surface rounded-lg border border-border">
                                            <div className="font-bold text-primary">500+</div>
                                            <div>Professionals Certified</div>
                                        </div>
                                        <div className="text-center p-3 bg-surface rounded-lg border border-border">
                                            <div className="font-bold text-primary">95%</div>
                                            <div>Pass Rate</div>
                                        </div>
                                        <div className="text-center p-3 bg-surface rounded-lg border border-border">
                                            <div className="font-bold text-primary">Ontario</div>
                                            <div>Regulation Focus</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certificate Information */}
                            <div className="mb-8 bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold font-mono text-accent mb-3 uppercase tracking-wider">
                                        🏆 Your OCRP Certification
                                    </h3>
                                    <div className="w-12 h-0.5 bg-accent mx-auto mb-4"></div>
                                </div>
                                
                                <div className="max-w-4xl mx-auto">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-text-primary mb-3">What You'll Earn</h4>
                                            <ul className="space-y-2 text-sm text-text-secondary">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">✓</span>
                                                    <span>Official OCRP designation certificate</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">✓</span>
                                                    <span>Digital badge for LinkedIn and email signatures</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">✓</span>
                                                    <span>Module completion certificates (Premium plans)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">✓</span>
                                                    <span>Continuing education credits</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary mb-3">Certification Requirements</h4>
                                            <ul className="space-y-2 text-sm text-text-secondary">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">📚</span>
                                                    <span>Complete all 4 training modules</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">🎯</span>
                                                    <span>Pass final assessment (80% minimum)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">⏱️</span>
                                                    <span>10-15 hours of self-paced study</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-accent mt-1">🔄</span>
                                                    <span>Valid indefinitely with updates provided</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-surface border border-border rounded-lg">
                                        <p className="text-sm text-text-primary text-center">
                                            <span className="font-semibold">Why Choose OCRP?</span> This certification demonstrates your 
                                            expertise in Ontario-specific cyber resilience practices, making you a valuable asset to employers 
                                            and clients who need compliance with provincial privacy laws and cybersecurity regulations.
                                        </p>
                                    </div>
                                </div>
                            </div>

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

                            {/* Bundle Options */}
                            <div className="mb-8 bg-gradient-to-r from-success/5 to-success/10 border border-success/20 rounded-lg p-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold font-mono text-success mb-3 uppercase tracking-wider">
                                        💰 Bundle Options - Save More
                                    </h3>
                                    <div className="w-12 h-0.5 bg-success mx-auto mb-4"></div>
                                    <p className="text-text-secondary">Choose longer-term plans for additional savings</p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    {BUNDLE_OPTIONS.map((bundle) => (
                                        <div key={bundle.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-all">
                                            <h4 className="font-bold text-text-primary mb-2">{bundle.name}</h4>
                                            <p className="text-sm text-text-secondary mb-3">{bundle.description}</p>
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-2xl font-bold text-success">${bundle.bundlePrice}</span>
                                                <span className="text-text-secondary">{bundle.currency}</span>
                                                <span className="text-sm text-text-muted line-through">${bundle.originalPrice}</span>
                                            </div>
                                            <div className="text-sm text-success font-semibold mb-3">
                                                Save ${bundle.savings} {bundle.currency}!
                                            </div>
                                            <ul className="text-sm text-text-secondary space-y-1">
                                                {bundle.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-success mt-1">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-4">
                                    <p className="text-xs text-text-muted">
                                        Bundle pricing is available for applicable subscription tiers during checkout
                                    </p>
                                </div>
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