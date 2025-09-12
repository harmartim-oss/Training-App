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




const testimonials = [
    {
        name: "Sarah Chen",
        position: "IT Director",
        organization: "City of Burlington",
        avatar: "👩‍💼",
        quote: "The OCRP certification gave our team the confidence to handle complex privacy and cybersecurity challenges. The Ontario-specific legal training was invaluable.",
        rating: 5
    },
    {
        name: "Marcus Thompson", 
        position: "Cybersecurity Manager",
        organization: "Durham Region Health",
        avatar: "👨‍💻",
        quote: "Excellent practical training that directly applies to our daily operations. The AI governance module was particularly relevant for our organization.",
        rating: 5
    },
    {
        name: "Lisa Rodriguez",
        position: "Data Protection Officer", 
        organization: "Toronto Community Foundation",
        avatar: "👩‍🔬",
        quote: "As a non-profit, we needed cost-effective cybersecurity training. The OCRP program delivered comprehensive knowledge at an affordable price.",
        rating: 5
    }
];

const faqs = [
    { q: "Who is this certification for?", a: "This certification is designed for professionals in Ontario's municipalities, small businesses, and non-profit sectors who handle sensitive data and are responsible for digital security and compliance." },
    { q: "Is there a prerequisite for this course?", a: "No, there are no formal prerequisites. The program is designed to be accessible to individuals with a range of technical backgrounds, focusing on practical application and legal understanding." },
    { q: "How long does the certification take to complete?", a: "The training is self-paced. On average, participants complete all modules and the final assessment within 15-20 hours of study." },
    { q: "Is the OCRP designation recognized across Canada?", a: "While the curriculum has a specific focus on Ontario's legal landscape (like MFIPPA), the cybersecurity and data management principles are based on national and international standards, making the skills highly transferable." },
    { q: "What kind of support is available during the course?", a: "All plans include community forum support. Professional and Enterprise plans include email support and priority assistance. Our AI study assistant is available 24/7 to help with course content." },
    { q: "Can I upgrade my plan after starting?", a: "Yes, you can upgrade your subscription plan at any time from your account dashboard. All your progress will be preserved and you'll immediately gain access to premium features." }
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
        
        {/* Enhanced Hero Section with Gradient Background */}
        <Section id="home" className="text-center !pt-28 !pb-36 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Enhanced Institute Branding with Animation */}
            <div className="flex flex-col items-center mb-8 animate-scale-in">
              <div className="relative">
                <ODDILogo className={`${isMobile ? 'w-16 h-16' : isTablet ? 'w-20 h-20' : 'w-24 h-24'} text-primary mb-4 drop-shadow-lg`} />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <div className="text-center">
                <h2 className={`${isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold font-mono text-primary tracking-wider uppercase mb-2 animate-slide-in`}>
                  Ontario Digital Defence Institute
                </h2>
                <div className={`${isMobile ? 'w-20' : 'w-32'} h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full`}></div>
              </div>
            </div>
            
            {/* Enhanced Main Title with Gradient Text */}
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl sm:text-5xl md:text-6xl'} font-mono font-bold tracking-tighter text-text-primary animate-fade-in`}>
              ONTARIO CERTIFIED <br /> 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CYBER RESILIENCE
              </span> 
              <br />PROFESSIONAL
            </h1>
            
            {/* Enhanced Description */}
            <p className={`${isMobile ? 'max-w-sm text-base' : 'max-w-3xl text-lg md:text-xl'} mx-auto text-text-secondary leading-relaxed animate-fade-in`} style={{animationDelay: '0.2s'}}>
              Master essential skills in privacy law, cybersecurity, AI governance, and data management to defend Ontario's digital landscape.
            </p>
            
            {/* Enhanced CTA with Visual Elements */}
            <div className="mt-8 flex flex-col items-center gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <button
                onClick={onNavigateToTraining}
                className={`btn-primary ${isMobile ? 'py-4 px-8 text-base' : 'py-4 px-10 text-lg'} font-semibold shadow-2xl`}
              >
                🚀 Start Certification
              </button>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-4 text-sm text-text-muted mt-2">
                <span className="flex items-center gap-1">
                  ⭐ 4.9/5 Rating
                </span>
                <span className="flex items-center gap-1">
                  👥 500+ Certified
                </span>
                <span className="flex items-center gap-1">
                  🏆 Industry Recognized
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Enhanced Features Section */}
        <Section id="why-ocrp" className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent"></div>
            
            <SectionTitle title="Why Earn Your OCRP Designation?" subtitle="Gain a competitive edge with a certification that signifies expertise and trustworthiness in digital defence."/>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} relative z-10`}>
                {features.map((feature, index) => (
                    <div key={feature.title} className="card-interactive bg-surface border border-border p-8 text-left animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                        <div className="flex-shrink-0 mb-6 relative">
                           <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl inline-block">
                             {feature.icon}
                           </div>
                           {/* Floating badge for enhanced visual appeal */}
                           <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                             <span className="text-white text-xs font-bold">{index + 1}</span>
                           </div>
                        </div>
                        <h3 className="text-xl font-bold font-mono text-text-primary uppercase mb-3">{feature.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                        
                        {/* Enhanced visual element */}
                        <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                          <span>Learn More</span>
                          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        {/* Enhanced Audience Section */}
        <Section id="audience" className="bg-gradient-to-r from-surface/50 to-surface-elevated/50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
            
            <SectionTitle title="Designed for Ontario's Core Sectors" subtitle="This program is tailored to address the unique challenges faced by key organizations across the province."/>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} relative z-10`}>
                {audience.map((aud, index) => (
                    <div key={aud.title} className="card-interactive bg-surface border border-border p-8 flex flex-col items-start text-left group animate-fade-in" style={{animationDelay: `${index * 0.15}s`}}>
                        <div className="flex-shrink-0 mb-6 relative">
                          <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transition-all duration-300 group-hover:scale-110">
                            {aud.icon}
                          </div>
                          {/* Sector indicator */}
                          <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full">
                            SECTOR
                          </div>
                        </div>
                        <h3 className="text-xl font-bold font-mono text-text-primary uppercase mb-3 group-hover:text-primary transition-colors">{aud.title}</h3>
                        <p className="text-text-secondary leading-relaxed flex-grow">{aud.description}</p>
                        
                        {/* Enhanced engagement indicator */}
                        <div className="mt-6 w-full">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-primary font-semibold">Perfect Match</span>
                            <span className="text-accent">95%</span>
                          </div>
                          <div className="w-full bg-border-light rounded-full h-2 mt-2">
                            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '95%'}}></div>
                          </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Enhanced Modules Section */}
        <Section id="curriculum" className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3"></div>
            
            <SectionTitle title="A Curriculum Built For The Future" subtitle="Our four-module program provides the complete skillset for cyber resilience."/>
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 gap-8'} relative z-10`}>
                {modules.map((module, index) => (
                    <div key={module.title} className="card-interactive bg-surface border border-border p-8 flex items-start gap-6 group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        {/* Enhanced module number with gradient */}
                        <div className="relative">
                          <div className="text-5xl font-bold font-mono bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mt-1 transition-all duration-300 group-hover:scale-110">
                            0{index+1}
                          </div>
                          {/* Progress indicator */}
                          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-border-light rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" style={{width: '30%'}}></div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="text-xl font-bold font-mono text-text-primary mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
                            <p className="text-text-secondary leading-relaxed mb-4">{module.description}</p>
                            
                            {/* Enhanced module features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Interactive</span>
                              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">Hands-on</span>
                              <span className="px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">Practical</span>
                            </div>
                            
                            {/* Duration and difficulty */}
                            <div className="flex items-center gap-4 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                ⏱️ 3-4 hours
                              </span>
                              <span className="flex items-center gap-1">
                                📊 Intermediate
                              </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Additional visual element */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full">
                <span className="text-primary font-semibold">🎯 Complete all modules to unlock your certification</span>
              </div>
            </div>
        </Section>
        
        {/* Testimonials Section */}
        <Section id="testimonials" className="bg-gradient-to-b from-surface/30 to-surface-elevated/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3"></div>
            <div className="absolute top-20 left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent/5 rounded-full blur-3xl"></div>
            
            <SectionTitle title="Success Stories" subtitle="Hear from professionals who have earned their OCRP designation and are making a difference in Ontario's digital security landscape."/>
            
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} relative z-10`}>
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.name} className="bg-surface border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                        {/* Rating stars */}
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="text-warning text-lg">⭐</span>
                            ))}
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="text-text-secondary leading-relaxed mb-6 italic">
                            "{testimonial.quote}"
                        </blockquote>
                        
                        {/* Profile */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-2xl">
                                {testimonial.avatar}
                            </div>
                            <div>
                                <div className="font-semibold text-text-primary">{testimonial.name}</div>
                                <div className="text-sm text-text-secondary">{testimonial.position}</div>
                                <div className="text-xs text-primary font-medium">{testimonial.organization}</div>
                            </div>
                        </div>
                        
                        {/* Verification badge */}
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                            ✓ Verified OCRP Graduate
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-8 px-8 py-4 bg-surface border border-border rounded-2xl shadow-sm">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">4.9/5</div>
                        <div className="text-sm text-text-secondary">Average Rating</div>
                    </div>
                    <div className="w-px h-12 bg-border"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-sm text-text-secondary">Certified Professionals</div>
                    </div>
                    <div className="w-px h-12 bg-border"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">95%</div>
                        <div className="text-sm text-text-secondary">Completion Rate</div>
                    </div>
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

        {/* Enhanced Final CTA */}
        <Section id="start" className="bg-gradient-to-r from-surface/50 to-surface-elevated/50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            <div className="text-center relative z-10">
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-bold font-mono text-text-primary mb-6`}>
                  Ready to Become a Leader in Digital Defence?
                </h2>
                <p className={`${isMobile ? 'max-w-lg' : 'max-w-2xl'} mx-auto text-lg text-text-secondary leading-relaxed mb-8`}>
                  Start your journey today and earn the OCRP designation that will set you apart in the cybersecurity landscape.
                </p>
                
                {/* Enhanced CTA with multiple options */}
                <div className="flex flex-col items-center gap-6">
                  <button
                    onClick={onNavigateToTraining}
                    className={`btn-primary ${isMobile ? 'py-4 px-8 text-base' : 'py-4 px-10 text-lg'} font-semibold shadow-2xl`}
                  >
                    🎓 Enroll Now - Start Free
                  </button>
                  
                  {/* Value proposition */}
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                    <span className="flex items-center gap-2">
                      ✅ No Credit Card Required
                    </span>
                    <span className="flex items-center gap-2">
                      ⚡ Instant Access
                    </span>
                    <span className="flex items-center gap-2">
                      🏆 Industry Recognized
                    </span>
                  </div>
                  
                  {/* Social proof */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/20">
                    <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-text-muted">Professionals Certified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">95%</div>
                        <div className="text-text-muted">Pass Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">4.9★</div>
                        <div className="text-text-muted">Average Rating</div>
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