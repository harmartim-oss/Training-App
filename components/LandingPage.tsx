/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import Header from './Header';
import { ODDILogo, CertificateIcon, ChevronDownIcon, MunicipalityIcon, BusinessIcon, NonProfitIcon, ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4 } from './icons';
import { useMobileDetection } from '../hooks/useMobileDetection';

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
  const { isMobile, isTablet, preferredLayout, touchCapable } = useMobileDetection();
  
  return (
    <div className={`min-h-screen text-text-primary flex flex-col bg-background ${touchCapable ? 'touch-enabled' : ''}`}>
      <Header onNavigateToTraining={onNavigateToTraining} />
      <main className="flex-grow animate-fade-in">
        
        {/* Enhanced Hero Section with Improved Visual Design */}
        <Section id="home" className="text-center !pt-28 !pb-40 relative overflow-hidden">
          {/* Enhanced Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/6 to-transparent"></div>
            <div className="absolute top-20 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-32 right-20 w-32 h-32 bg-accent/12 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 left-16 w-36 h-36 bg-success/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2.5s'}}></div>
          </div>
          
          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Enhanced Institute Branding with Improved Animation */}
            <div className="flex flex-col items-center mb-8 animate-scale-in">
              <div className="relative">
                <ODDILogo className={`${isMobile ? 'w-20 h-20' : isTablet ? 'w-24 h-24' : 'w-28 h-28'} text-primary mb-6 drop-shadow-xl transition-all duration-500 hover:scale-105`} />
                <div className="absolute inset-0 bg-primary/25 rounded-full blur-xl animate-pulse"></div>
                {/* Orbital rings for enhanced visual appeal */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                <div className="absolute inset-2 border border-accent/20 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
              </div>
              <div className="text-center">
                <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold font-mono text-primary tracking-wider uppercase mb-3 animate-slide-in`}>
                  Ontario Digital Defence Institute
                </h2>
                <div className={`${isMobile ? 'w-24' : 'w-40'} h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full animate-pulse`}></div>
              </div>
            </div>
            
            {/* Enhanced Main Title with Better Typography */}
            <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl sm:text-6xl md:text-7xl'} font-mono font-bold tracking-tighter text-text-primary animate-fade-in leading-tight`}>
              ONTARIO CERTIFIED <br /> 
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                CYBER RESILIENCE
              </span> 
              <br />
              <span className="text-primary">PROFESSIONAL</span>
            </h1>
            
            {/* Enhanced Description with Better Visual Hierarchy */}
            <div className="max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-text-secondary leading-relaxed mb-4`}>
                Master essential skills in privacy law, cybersecurity, AI governance, and data management to defend Ontario's digital landscape.
              </p>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-text-muted max-w-2xl mx-auto`}>
                Join the next generation of cyber resilience professionals protecting Ontario's digital infrastructure.
              </p>
            </div>
            
            {/* Enhanced CTA Section with Better Visual Design */}
            <div className="mt-10 flex flex-col items-center gap-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <button
                onClick={onNavigateToTraining}
                className={`group relative overflow-hidden ${isMobile ? 'py-5 px-10 text-lg' : 'py-6 px-12 text-xl'} font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  🚀 Start Your Journey
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/* Enhanced Value Propositions */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-muted mt-4">
                <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  ✅ Self-Paced Learning
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                  🎯 Ontario-Focused Content
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
                  🏆 Professional Certification
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Enhanced Features Section with Improved Layout */}
        <Section id="why-ocrp" className="relative">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent"></div>
              <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            </div>
            
            <SectionTitle title="Why Earn Your OCRP Designation?" subtitle="Gain a competitive edge with a certification that signifies expertise and trustworthiness in digital defence."/>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'md:grid-cols-3 gap-10'} relative z-10`}>
                {features.map((feature, index) => (
                    <div key={feature.title} className="group relative bg-surface border border-border rounded-3xl p-8 text-left animate-fade-in transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-primary/30" style={{animationDelay: `${index * 0.2}s`}}>
                        {/* Enhanced gradient background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <div className="flex-shrink-0 mb-6 relative">
                             <div className="p-4 bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                               {feature.icon}
                             </div>
                             {/* Enhanced floating badge */}
                             <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
                               <span className="text-white text-sm font-bold">{index + 1}</span>
                             </div>
                          </div>
                          <h3 className="text-xl font-bold font-mono text-text-primary uppercase mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                          <p className="text-text-secondary leading-relaxed mb-6">{feature.description}</p>
                          
                          {/* Enhanced visual element with animation */}
                          <div className="flex items-center text-primary font-semibold text-sm group-hover:text-accent transition-colors">
                            <span>Discover Benefits</span>
                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        {/* Enhanced Audience Section with Improved Visual Design */}
        <Section id="audience" className="bg-gradient-to-r from-surface/70 to-surface-elevated/70 relative overflow-hidden">
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-primary/8 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-success/5 rounded-full blur-2xl"></div>
            
            <SectionTitle title="Designed for Ontario's Core Sectors" subtitle="This program is tailored to address the unique challenges faced by key organizations across the province."/>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'md:grid-cols-3 gap-10'} relative z-10`}>
                {audience.map((aud, index) => (
                    <div key={aud.title} className="group relative bg-surface border border-border rounded-3xl p-8 flex flex-col items-start text-left animate-fade-in transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-primary/30" style={{animationDelay: `${index * 0.15}s`}}>
                        {/* Enhanced hover background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10 w-full">
                          <div className="flex-shrink-0 mb-6 relative">
                            <div className="p-5 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 inline-block">
                              {aud.icon}
                            </div>
                            {/* Enhanced sector indicator */}
                            <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-lg">
                              TARGET
                            </div>
                          </div>
                          <h3 className="text-xl font-bold font-mono text-text-primary uppercase mb-4 group-hover:text-primary transition-colors">{aud.title}</h3>
                          <p className="text-text-secondary leading-relaxed flex-grow mb-6">{aud.description}</p>
                          
                          {/* Enhanced engagement indicator */}
                          <div className="w-full">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-primary font-semibold">Tailored for You</span>
                              <span className="text-accent text-lg">✨</span>
                            </div>
                            <div className="w-full bg-border-light rounded-full h-3 overflow-hidden">
                              <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-700 group-hover:animate-pulse" style={{width: '100%'}}></div>
                            </div>
                          </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Enhanced Modules Section with Improved Design */}
        <Section id="curriculum" className="relative">
            {/* Enhanced background gradient */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-accent/4"></div>
              <div className="absolute top-20 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-60 h-60 bg-accent/8 rounded-full blur-3xl"></div>
            </div>
            
            <SectionTitle title="A Curriculum Built For The Future" subtitle="Our four-module program provides the complete skillset for cyber resilience."/>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'md:grid-cols-2 gap-10'} relative z-10`}>
                {modules.map((module, index) => (
                    <div key={module.title} className="group relative bg-surface border border-border rounded-3xl p-8 flex items-start gap-6 animate-fade-in transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-primary/30" style={{animationDelay: `${index * 0.1}s`}}>
                        {/* Enhanced hover background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Enhanced module number with better design */}
                        <div className="relative flex-shrink-0">
                          <div className="relative">
                            <div className="text-6xl font-bold font-mono bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                              0{index+1}
                            </div>
                            {/* Enhanced progress indicator */}
                            <div className="absolute -bottom-3 left-0 right-0 h-2 bg-border-light rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse transition-all duration-500 group-hover:animate-none" style={{width: '40%'}}></div>
                            </div>
                            {/* Decorative ring */}
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDuration: '10s'}}></div>
                          </div>
                        </div>
                        
                        <div className="flex-1 relative z-10">
                            <h3 className="text-xl font-bold font-mono text-text-primary mb-4 group-hover:text-primary transition-colors">{module.title}</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">{module.description}</p>
                            
                            {/* Enhanced module features with better design */}
                            <div className="flex flex-wrap gap-3 mb-6">
                              <span className="px-4 py-2 bg-primary/15 text-primary text-sm font-semibold rounded-full border border-primary/20 transition-all duration-300 hover:scale-105">Interactive</span>
                              <span className="px-4 py-2 bg-accent/15 text-accent text-sm font-semibold rounded-full border border-accent/20 transition-all duration-300 hover:scale-105">Hands-on</span>
                              <span className="px-4 py-2 bg-success/15 text-success text-sm font-semibold rounded-full border border-success/20 transition-all duration-300 hover:scale-105">Practical</span>
                            </div>
                            
                            {/* Enhanced duration and difficulty with icons */}
                            <div className="flex items-center gap-6 text-sm text-text-muted">
                              <span className="flex items-center gap-2 px-3 py-1 bg-border-light rounded-full">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                3-4 hours
                              </span>
                              <span className="flex items-center gap-2 px-3 py-1 bg-border-light rounded-full">
                                <span className="w-2 h-2 bg-accent rounded-full"></span>
                                Intermediate
                              </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Enhanced completion visual element */}
            <div className="mt-16 text-center relative">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/15 to-accent/15 rounded-2xl border border-primary/20 shadow-lg">
                <span className="text-2xl">🎯</span>
                <span className="text-primary font-semibold text-lg">Complete all modules to unlock your certification</span>
                <span className="text-2xl">🏆</span>
              </div>
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

        {/* Enhanced Final CTA with Improved Design */}
        <Section id="start" className="bg-gradient-to-r from-surface/70 to-surface-elevated/70 relative overflow-hidden">
            {/* Enhanced animated background elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-primary/12 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-20 left-20 w-36 h-36 bg-primary/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className="text-center relative z-10">
                <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-bold font-mono text-text-primary mb-8 leading-tight`}>
                  Ready to Become a Leader in 
                  <br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital Defence?</span>
                </h2>
                <p className={`${isMobile ? 'max-w-lg' : 'max-w-3xl'} mx-auto text-xl text-text-secondary leading-relaxed mb-12`}>
                  Start your journey today and earn the OCRP designation that will set you apart in the cybersecurity landscape.
                </p>
                
                {/* Enhanced CTA with multiple options */}
                <div className="flex flex-col items-center gap-8">
                  <button
                    onClick={onNavigateToTraining}
                    className={`group relative overflow-hidden ${isMobile ? 'py-5 px-10 text-lg' : 'py-6 px-14 text-xl'} font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      🎓 Begin Your Certification Journey
                      <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  {/* Enhanced Key Features */}
                  <div className="flex flex-wrap justify-center gap-8 text-sm text-text-muted">
                    <span className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
                      ✅ No Credit Card Required
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 bg-info/10 rounded-full border border-info/20">
                      ⚡ Instant Access
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                      🏆 Professional Recognition
                    </span>
                  </div>
                  
                  {/* Enhanced Features Showcase */}
                  <div className="p-8 bg-gradient-to-r from-primary/8 to-accent/8 rounded-3xl border border-primary/20 shadow-xl">
                    <div className="flex flex-wrap justify-center items-center gap-12 text-sm">
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl font-bold text-primary mb-2 transition-all duration-300 group-hover:scale-110">4</div>
                        <div className="text-text-muted font-medium">Core Modules</div>
                        <div className="text-xs text-text-muted/70 mt-1">Interactive Learning</div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl font-bold text-accent mb-2 transition-all duration-300 group-hover:scale-110">15-20h</div>
                        <div className="text-text-muted font-medium">Study Time</div>
                        <div className="text-xs text-text-muted/70 mt-1">Self-Paced</div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl font-bold text-success mb-2 transition-all duration-300 group-hover:scale-110">OCRP</div>
                        <div className="text-text-muted font-medium">Certification</div>
                        <div className="text-xs text-text-muted/70 mt-1">Ontario Recognized</div>
                      </div>
                    </div>
                  </div>
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