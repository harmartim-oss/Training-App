/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import Header from './Header';
import { ODDILogo, CertificateIcon, ChevronDownIcon, MunicipalityIcon, BusinessIcon, NonProfitIcon, QuoteIcon, ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4 } from './icons';

const features = [
  {
    icon: <CertificateIcon className="w-8 h-8 text-primary" />,
    title: 'Official OCRP Designation',
    description: 'Earn the exclusive Ontario Certified Cyber Resilience Professional (OCRP) designation, a mark of excellence recognized across the province.',
  },
  {
    icon: <ModuleIcon1 className="w-8 h-8 text-primary" />,
    title: 'Expert-Led Curriculum',
    description: 'Gain practical, hands-on knowledge from a curriculum designed by industry veterans, covering the most critical and current threats.',
  },
  {
    icon: <ModuleIcon2 className="w-8 h-8 text-primary" />,
    title: 'Built for Ontario',
    description: 'Master the specific legal and regulatory landscape of Ontario, including PIPEDA, MFIPPA, and the new provincial AI directives.',
  },
];

const modules = [
    { title: "Ontario's Privacy & Legal Framework", description: "Navigate PIPEDA, MFIPPA, and new data breach notification laws." },
    { title: 'Cybersecurity Defence & Incident Response', description: "Implement risk assessments and manage active security threats." },
    { title: 'AI Governance & Responsible Use', description: "Apply Ontario's directive for the ethical deployment of AI systems." },
    { title: 'Secure Data & Records Management', description: "Master data classification, retention policies, and cross-border compliance." },
];

const audience = [
    { icon: <MunicipalityIcon className="w-8 h-8 text-primary" />, title: 'Municipalities', description: "Equip your public sector teams with the knowledge to protect citizen data and comply with MFIPPA." },
    { icon: <BusinessIcon className="w-8 h-8 text-primary" />, title: 'Small Businesses', description: "Safeguard your customer information and business operations from costly cyber threats under PIPEDA." },
    { icon: <NonProfitIcon className="w-8 h-8 text-primary" />, title: 'Non-Profits', description: "Protect your donor and member data, maintain trust, and secure your mission-critical operations." },
];

const testimonials = [
    { quote: "This was the most relevant cybersecurity training I've ever taken. The focus on Ontario's laws was exactly what my municipal department needed.", name: "D. Reynolds", title: "IT Manager, City of North Bay" },
    { quote: "As a small business owner, I was overwhelmed by cybersecurity. The OCRP program gave me a clear, actionable plan to protect my company and our customers.", name: "S. Chen", title: "Owner, Chen Accounting" },
    { quote: "The OCRP certification has been a huge asset for our non-profit. It demonstrates our commitment to data security to our donors and partners.", name: "M. El-Masry", title: "Executive Director, Community Action Group" },
];


const faqs = [
    { q: "Who is this certification for?", a: "This certification is designed for professionals in Ontario's municipalities, small businesses, and non-profit sectors who handle sensitive data and are responsible for digital security and compliance." },
    { q: "Is there a prerequisite for this course?", a: "No, there are no formal prerequisites. The program is designed to be accessible to individuals with a range of technical backgrounds, focusing on practical application and legal understanding." },
    { q: "How long does the certification take to complete?", a: "The training is self-paced. On average, participants complete all modules and the final assessment within 15-20 hours of study." },
    { q: "Is the OCRP designation recognized across Canada?", a: "While the curriculum has a specific focus on Ontario's legal landscape (like MFIPPA), the cybersecurity and data management principles are based on national and international standards, making the skills highly transferable." },
];

interface LandingPageProps {
    onNavigateToTraining: () => void;
}

const Section: React.FC<{id: string, children: React.ReactNode, className?: string}> = ({id, children, className}) => (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 ${className}`}>
        {children}
    </section>
);

const SectionTitle: React.FC<{title: string, subtitle: string}> = ({title, subtitle}) => (
    <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-text-primary uppercase">{title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-text-secondary">{subtitle}</p>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToTraining }) => {
  return (
    <div className="min-h-screen text-text-primary flex flex-col bg-background">
      <Header onNavigateToTraining={onNavigateToTraining} />
      <main className="flex-grow animate-fade-in">
        
        {/* Hero Section */}
        <Section id="home" className="text-center !pt-28 !pb-36">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tighter text-text-primary">
              ONTARIO CERTIFIED <br /> <span className="text-primary">CYBER RESILIENCE</span> PROFESSIONAL
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-text-secondary">
              Master essential skills in privacy law, cybersecurity, AI governance, and data management to defend Ontario's digital landscape.
            </p>
            <div className="mt-6">
              <button
                onClick={onNavigateToTraining}
                className="btn-primary py-3.5 px-8 text-base"
              >
                Start Certification
              </button>
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section id="why-ocrp">
            <SectionTitle title="Why Earn Your OCRP Designation?" subtitle="Gain a competitive edge with a certification that signifies expertise and trustworthiness in digital defence."/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="card-interactive bg-surface border border-border p-8 text-left">
                        <div className="flex-shrink-0 mb-6">
                           {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold font-mono text-text-primary uppercase">{feature.title}</h3>
                        <p className="text-text-secondary mt-2 flex-grow">{feature.description}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* Audience Section */}
        <Section id="audience" className="bg-surface/50">
            <SectionTitle title="Designed for Ontario's Core Sectors" subtitle="This program is tailored to address the unique challenges faced by key organizations across the province."/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {audience.map((aud) => (
                    <div key={aud.title} className="card-interactive bg-surface border border-border p-8 flex flex-col items-start text-left">
                        <div className="flex-shrink-0 mb-6">{aud.icon}</div>
                        <h3 className="text-xl font-bold font-mono text-text-primary uppercase">{aud.title}</h3>
                        <p className="text-text-secondary mt-2">{aud.description}</p>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Modules Section */}
        <Section id="curriculum">
            <SectionTitle title="A Curriculum Built For The Future" subtitle="Our four-module program provides the complete skillset for cyber resilience."/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modules.map((module, index) => (
                    <div key={module.title} className="card-interactive bg-surface border border-border p-8 flex items-start gap-6">
                        <div className="text-4xl font-bold font-mono text-primary/30 mt-1">0{index+1}</div>
                        <div>
                            <h3 className="text-xl font-bold font-mono text-text-primary">{module.title}</h3>
                            <p className="text-text-secondary mt-1">{module.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Testimonials Section */}
        <Section id="testimonials" className="bg-surface/50">
            <SectionTitle title="Trusted by Professionals Across Ontario" subtitle="See what certified professionals are saying about the OCRP program." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="bg-surface border border-border p-8 flex flex-col h-full">
                        <QuoteIcon className="w-8 h-8 text-primary/30 mb-5" />
                        <p className="text-text-secondary flex-grow">"{testimonial.quote}"</p>
                        <div className="mt-6 border-t border-border pt-6 font-mono">
                            <p className="font-bold text-text-primary">{testimonial.name}</p>
                            <p className="text-sm text-text-secondary">{testimonial.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq">
          <SectionTitle title="Frequently Asked Questions" subtitle="Have questions? We've got answers. Here are some of the most common inquiries about the OCRP program."/>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item bg-surface border border-border">
                <summary className="faq-question p-5 cursor-pointer flex justify-between items-center">
                  <span className="font-semibold font-mono text-text-primary">{faq.q}</span>
                  <ChevronDownIcon className="chevron-icon w-4 h-4 text-text-secondary transition-transform duration-300" />
                </summary>
                <div className="faq-answer px-5 text-text-secondary">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section id="start" className="bg-surface/50">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold font-mono text-text-primary">Ready to Become a Leader in Digital Defence?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Start your journey today and earn the OCRP designation that will set you apart.</p>
                <div className="mt-8">
                  <button
                    onClick={onNavigateToTraining}
                    className="btn-primary py-3.5 px-8 text-base"
                  >
                    Enroll Now
                  </button>
                </div>
            </div>
        </Section>
      </main>

      <footer className="w-full bg-surface/50 border-t border-border">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-8">
           <div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <ODDILogo className="w-6 h-6 text-primary" />
              <p className="font-semibold font-mono text-text-primary">Ontario Digital Defence Institute</p>
            </div>
            <p className="text-text-secondary/80 mt-2 text-sm">&copy; {new Date().getFullYear()} ODDI. All Rights Reserved.</p>
           </div>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a href="#why-ocrp" className="text-sm font-medium text-text-secondary hover:text-primary">Why OCRP</a>
              <a href="#curriculum" className="text-sm font-medium text-text-secondary hover:text-primary">Curriculum</a>
              <a href="#faq" className="text-sm font-medium text-text-secondary hover:text-primary">FAQ</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;