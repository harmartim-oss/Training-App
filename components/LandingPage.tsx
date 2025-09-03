/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import Header from './Header';
import { ODDILogo, CertificateIcon, CurriculumIcon, OntarioIcon, MunicipalityIcon, BusinessIcon, NonProfitIcon, CybersecurityIcon, NetworkIcon, ThreatIntelIcon, QRCodeIcon } from './icons';

const features = [
  {
    icon: <CertificateIcon className="w-8 h-8 text-primary" />,
    title: 'Official OCRP Designation',
    description: 'Earn the exclusive Ontario Certified Cyber Resilience Professional (OCRP) designation, a mark of excellence recognized across the province.',
  },
  {
    icon: <CurriculumIcon className="w-8 h-8 text-primary" />,
    title: 'Expert-Led Curriculum',
    description: 'Gain practical, hands-on knowledge from a curriculum designed by industry veterans, covering the most critical and current threats.',
  },
  {
    icon: <OntarioIcon className="w-8 h-8 text-primary" />,
    title: 'Built for Ontario',
    description: 'Master the specific legal and regulatory landscape of Ontario, including PIPEDA, FIPPA, and the new provincial AI directives.',
  },
];

const modules = [
    { 
        icon: <OntarioIcon className="w-8 h-8 text-primary" />,
        title: "Ontario's Privacy & Legal Framework", 
        description: "Master PIPEDA, FIPPA, and emerging data breach notification laws. Navigate complex cross-border data requirements and understand your legal obligations when handling sensitive information.",
        duration: "4-5 hours",
        level: "Fundamental"
    },
    { 
        icon: <CybersecurityIcon className="w-8 h-8 text-primary" />,
        title: 'Cybersecurity Defence & Incident Response', 
        description: "Build comprehensive risk assessment frameworks and develop rapid response protocols for active security threats. Learn to implement multi-layered defense strategies and recovery procedures.",
        duration: "5-6 hours", 
        level: "Intermediate"
    },
    { 
        icon: <NetworkIcon className="w-8 h-8 text-primary" />,
        title: 'AI Governance & Responsible Use', 
        description: "Apply Ontario's groundbreaking AI directive to create ethical AI deployment frameworks. Understand algorithmic accountability and bias mitigation in public and private sectors.",
        duration: "3-4 hours",
        level: "Advanced"
    },
    { 
        icon: <QRCodeIcon className="w-8 h-8 text-primary" />,
        title: 'Secure Data & Records Management', 
        description: "Implement enterprise-grade data classification systems, retention policies, and cross-border compliance strategies. Master secure data lifecycle management and regulatory reporting.",
        duration: "4-5 hours",
        level: "Intermediate"
    },
];

const audience = [
    { icon: <MunicipalityIcon className="w-8 h-8 text-primary" />, title: 'Municipalities', description: "Equip your public sector teams with the knowledge to protect citizen data and comply with FIPPA." },
    { icon: <BusinessIcon className="w-8 h-8 text-primary" />, title: 'Small Businesses', description: "Safeguard your customer information and business operations from costly cyber threats under PIPEDA." },
    { icon: <NonProfitIcon className="w-8 h-8 text-primary" />, title: 'Non-Profits', description: "Protect your donor and member data, maintain trust, and secure your mission-critical operations." },
];





interface LandingPageProps {
    onNavigateToTraining: () => void;
}

const Section: React.FC<{id: string, children: React.ReactNode, className?: string}> = ({id, children, className}) => (
    <section id={id} className={`section container ${className || ''}`}>
        {children}
    </section>
);

const SectionTitle: React.FC<{title: string, subtitle: string}> = ({title, subtitle}) => (
    <div className="text-center my-xl">
        <h2 className="font-extrabold text-primary mb-base">{title}</h2>
        <p className="text-large text-secondary mx-auto" style={{maxWidth: '768px'}}>{subtitle}</p>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToTraining }) => {
  // Mobile browser detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return (
    <div className={`min-h-screen flex flex-col bg-background ${isMobile ? 'mobile-layout' : 'desktop-layout'}`}>
      <Header onNavigateToTraining={onNavigateToTraining} />
      <main className="flex-grow animate-fade-in">
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-background"></div>
          <div className="container text-center py-2xl relative z-10">
            <div className="flex flex-col items-center gap-xl animate-scale-in">
              <h1 className="hero-title">
                Become an <span className="text-primary">Ontario Certified</span><br /> 
                <span className="hero-subtitle">Cyber Resilience Professional</span>
              </h1>
              <p className="hero-description">
                Master the essential skills in privacy law, cybersecurity, AI governance, and data management to protect Ontario's digital landscape.
              </p>
              <div className="hero-cta">
                <button
                  onClick={onNavigateToTraining}
                  className="btn btn-primary btn-large btn-hero animate-delay-200"
                >
                  Start Your OCRP Certification
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Section id="why-ocrp">
            <SectionTitle title="Why Earn Your OCRP Designation?" subtitle="Gain a competitive edge with a certification that signifies expertise and trustworthiness in digital defence."/>
            <div className="grid grid-cols-3 gap-lg">
                {features.map((feature, index) => (
                    <div key={feature.title} className={`card card-feature card-interactive animate-fade-in animate-delay-${(index + 1) * 100}`}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-inverse mb-lg mx-auto">
                           {feature.icon}
                        </div>
                        <h3 className="font-semibold text-primary mb-base">{feature.title}</h3>
                        <p className="text-secondary">{feature.description}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* Audience Section */}
        <Section id="audience" className="section-alternate">
            <SectionTitle title="Designed for Ontario's Core Sectors" subtitle="This program is tailored to address the unique challenges faced by key organizations across the province."/>
            <div className="grid grid-cols-3 gap-lg">
                {audience.map((aud, index) => (
                    <div key={aud.title} className={`card card-feature card-interactive animate-slide-in-left animate-delay-${(index + 1) * 100}`}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-inverse mb-lg mx-auto">{aud.icon}</div>
                        <h3 className="font-semibold text-primary mb-base">{aud.title}</h3>
                        <p className="text-secondary">{aud.description}</p>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Modules Section */}
        <Section id="curriculum">
            <SectionTitle title="A Curriculum Built for Ontario's Needs" subtitle="Four comprehensive modules designed by industry experts to provide complete cyber resilience skillset."/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
                {modules.map((module, index) => (
                    <div key={module.title} className={`module-card animate-slide-in-right animate-delay-${(index + 1) * 100}`}>
                        <div className="module-card-header">
                            <div className="module-number">0{index+1}</div>
                            <div className="module-icon">{module.icon}</div>
                            <div className="module-meta">
                                <span className="module-duration">{module.duration}</span>
                                <span className={`module-level module-level-${module.level.toLowerCase()}`}>{module.level}</span>
                            </div>
                        </div>
                        <div className="module-card-body">
                            <h3 className="module-title">{module.title}</h3>
                            <p className="module-description">{module.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Final CTA */}
        <Section id="start" className="section-hero">
            <div className="text-center py-xl">
                <h2 className="font-extrabold text-primary mb-base">Ready to Become a Leader in Digital Defence?</h2>
                <p className="text-large text-secondary mx-auto mb-xl" style={{maxWidth: '640px'}}>Start your journey today and earn the OCRP designation that will set you apart.</p>
                <button
                  onClick={onNavigateToTraining}
                  className="btn btn-primary btn-large animate-scale-in"
                >
                  Enroll in the OCRP Program
                </button>
            </div>
        </Section>

      </main>

      <footer className="bg-background-secondary border-t">
        <div className="container py-xl flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-lg">
           <div>
            <div className="flex items-center gap-base justify-center sm:justify-start mb-sm">
              <ODDILogo className="w-8 h-8 text-primary" />
              <p className="font-semibold text-primary">Ontario Digital Defence Institute</p>
            </div>
            <p className="text-small text-tertiary">&copy; {new Date().getFullYear()} ODDI. All Rights Reserved.</p>
           </div>
            <div className="flex items-center gap-lg">
              <a href="#why-ocrp" className="nav-link">Why OCRP?</a>
              <a href="#curriculum" className="nav-link">Curriculum</a>
              <a href="#audience" className="nav-link">Who It's For</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;