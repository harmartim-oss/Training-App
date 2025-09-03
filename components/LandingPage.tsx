/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import Header from './Header';
import { ODDILogo, CertificateIcon, CurriculumIcon, OntarioIcon, ChevronDownIcon, MunicipalityIcon, BusinessIcon, NonProfitIcon } from './icons';

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
    { title: "Ontario's Privacy & Legal Framework", description: "Navigate PIPEDA, FIPPA, and new data breach notification laws." },
    { title: 'Cybersecurity Defence & Incident Response', description: "Implement risk assessments and manage active security threats." },
    { title: 'AI Governance & Responsible Use', description: "Apply Ontario's directive for the ethical deployment of AI systems." },
    { title: 'Secure Data & Records Management', description: "Master data classification, retention policies, and cross-border compliance." },
];

const audience = [
    { icon: <MunicipalityIcon className="w-8 h-8 text-primary" />, title: 'Municipalities', description: "Equip your public sector teams with the knowledge to protect citizen data and comply with FIPPA." },
    { icon: <BusinessIcon className="w-8 h-8 text-primary" />, title: 'Small Businesses', description: "Safeguard your customer information and business operations from costly cyber threats under PIPEDA." },
    { icon: <NonProfitIcon className="w-8 h-8 text-primary" />, title: 'Non-Profits', description: "Protect your donor and member data, maintain trust, and secure your mission-critical operations." },
];




const faqs = [
    { q: "Who is this certification for?", a: "This certification is designed for professionals in Ontario's municipalities, small businesses, and non-profit sectors who handle sensitive data and are responsible for digital security and compliance." },
    { q: "Is there a prerequisite for this course?", a: "No, there are no formal prerequisites. The program is designed to be accessible to individuals with a range of technical backgrounds, focusing on practical application and legal understanding." },
    { q: "How long does the certification take to complete?", a: "The training is self-paced. On average, participants complete all modules and the final assessment within 15-20 hours of study." },
    { q: "Is the OCRP designation recognized across Canada?", a: "While the curriculum has a specific focus on Ontario's legal landscape (like FIPPA), the cybersecurity and data management principles are based on national and international standards, making the skills highly transferable." },
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
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onNavigateToTraining={onNavigateToTraining} />
      <main className="flex-grow animate-fade-in">
        
        {/* Hero Section */}
        <div className="section-hero">
          <div className="container text-center py-2xl">
            <div className="flex flex-col items-center gap-xl animate-scale-in">
              <h1 className="font-extrabold text-primary mb-base">
                Become an <span className="text-primary">Ontario Certified</span><br /> 
                <span className="text-secondary">Cyber Resilience Professional</span>
              </h1>
              <p className="text-large text-secondary mx-auto" style={{maxWidth: '640px'}}>
                Master the essential skills in privacy law, cybersecurity, AI governance, and data management to protect Ontario's digital landscape.
              </p>
              <div className="my-base">
                <button
                  onClick={onNavigateToTraining}
                  className="btn btn-primary btn-large animate-delay-200"
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
            <SectionTitle title="A Curriculum Built for Ontario's Needs" subtitle="Our four-module program provides the complete skillset for cyber resilience."/>
            <div className="grid grid-cols-2 gap-lg">
                {modules.map((module, index) => (
                    <div key={module.title} className={`card card-interactive flex items-start gap-lg p-xl animate-slide-in-right animate-delay-${(index + 1) * 100}`}>
                        <div className="text-caption font-extrabold text-primary bg-primary-lighter rounded-full w-12 h-12 flex items-center justify-center">0{index+1}</div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-primary mb-base">{module.title}</h3>
                            <p className="text-secondary">{module.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* FAQ Section */}
        <Section id="faq">
          <SectionTitle title="Frequently Asked Questions" subtitle="Have questions? We've got answers. Here are some of the most common inquiries about the OCRP program."/>
          <div className="container-narrow">
            {faqs.map((faq, index) => (
              <details key={index} className={`faq-item animate-fade-in animate-delay-${(index + 1) * 100}`}>
                <summary className="faq-question">
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDownIcon className="chevron-icon w-5 h-5" />
                </summary>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </details>
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
              <a href="#faq" className="nav-link">FAQ</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;