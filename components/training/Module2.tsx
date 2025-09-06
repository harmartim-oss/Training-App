/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import QuizComponent from '../common/QuizComponent';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module2: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');

    const questions: QuizQuestions = {
        q1: { 
            question: "Which risk assessment methodology focuses on qualitative analysis using probability and impact matrices?", 
            answer: 'b', 
            options: { a: "NIST 800-30", b: "OCTAVE", c: "FAIR" },
            explanation: "OCTAVE (Operationally Critical Threat, Asset, and Vulnerability Evaluation) uses qualitative risk assessment with probability and impact matrices."
        },
        q2: { 
            question: "In the context of system hardening, what is the primary purpose of disabling unnecessary services?", 
            answer: 'c', 
            options: { a: "To improve system performance", b: "To save disk space", c: "To reduce the attack surface" },
            explanation: "Disabling unnecessary services reduces the attack surface by eliminating potential entry points for attackers."
        },
        q3: { 
            question: "Which phase of incident response should include evidence preservation and chain of custody procedures?", 
            answer: 'b', 
            options: { a: "Preparation", b: "Detection and Analysis", c: "Post-Incident Activity" },
            explanation: "Evidence preservation and chain of custody are critical during the Detection and Analysis phase to ensure legal admissibility."
        },
        q4: { 
            question: "What is the recommended approach for implementing defense in depth?", 
            answer: 'a', 
            options: { a: "Multiple layers of security controls", b: "Single strong perimeter defense", c: "Focus only on endpoint protection" },
            explanation: "Defense in depth uses multiple layers of security controls to provide redundant protection against threats."
        },
    };

    const quiz = useQuiz(questions);

    const contentSections = [
        {
            title: "Risk Assessment Methodologies",
            content: [
                "Effective cybersecurity requires systematic risk assessment to identify, analyze, and prioritize threats to organizational assets. Understanding various methodologies ensures comprehensive coverage.",
                "",
                "**NIST Risk Management Framework (RMF):**",
                "• Categorize information systems and information processed",
                "• Select appropriate security controls from NIST SP 800-53",
                "• Implement security controls in enterprise architecture",
                "• Assess security controls using appropriate assessment procedures",
                "• Authorize information system operation based on risk determination",
                "• Monitor security controls on an ongoing basis",
                "",
                "**OCTAVE Methodology:**",
                "• Operationally Critical Threat, Asset, and Vulnerability Evaluation",
                "• Qualitative risk assessment approach",
                "• Uses probability and impact matrices for risk scoring",
                "• Focuses on organizational risk rather than technical vulnerabilities",
                "• Three phases: Build Asset-Based Threat Profiles, Identify Infrastructure Vulnerabilities, Develop Security Strategy",
                "",
                "**FAIR (Factor Analysis of Information Risk):**",
                "• Quantitative risk assessment framework",
                "• Focuses on financial impact of risk",
                "• Breaks risk down into loss event frequency and loss magnitude",
                "• Enables cost-benefit analysis of security investments",
                "• Particularly useful for business case development"
            ]
        },
        {
            title: "System Hardening and Security Controls",
            content: [
                "System hardening involves implementing security measures to reduce vulnerabilities and minimize attack surfaces. This comprehensive approach addresses multiple layers of defense.",
                "",
                "**Operating System Hardening:**",
                "• Remove or disable unnecessary software packages and services",
                "• Apply security patches and updates regularly",
                "• Configure secure boot processes and file system permissions",
                "• Implement secure password policies and account management",
                "• Enable security features like SELinux or AppArmor",
                "• Configure secure network services and protocols",
                "",
                "**Service Security Configuration:**",
                "• **Web Services**: Disable unnecessary HTTP methods, implement HTTPS with strong ciphers",
                "• **Database Services**: Use least privilege access, encrypt data at rest and in transit",
                "• **Network Services**: Disable unused protocols (Telnet, FTP), use secure alternatives (SSH, SFTP)",
                "• **File Services**: Implement access controls, encrypt sensitive file shares",
                "• **Email Services**: Configure spam filtering, implement DKIM/SPF/DMARC",
                "",
                "**Access Control Implementation:**",
                "• Role-Based Access Control (RBAC) for users and applications",
                "• Principle of least privilege for all accounts",
                "• Multi-factor authentication for administrative access",
                "• Regular access reviews and privilege audits",
                "• Segregation of duties for critical operations"
            ]
        },
        {
            title: "Network Security and Monitoring",
            content: [
                "Network security forms the foundation of organizational cybersecurity, requiring both preventive and detective controls to protect against evolving threats.",
                "",
                "**Network Segmentation:**",
                "• Implement VLANs to separate different network zones",
                "• Create DMZ for public-facing services",
                "• Isolate critical systems from general user networks",
                "• Use jump hosts for administrative access to sensitive systems",
                "• Implement micro-segmentation for cloud environments",
                "",
                "**Firewall Configuration:**",
                "• Default-deny policy for all traffic",
                "• Implement stateful inspection for connection tracking",
                "• Use application-layer filtering for deep packet inspection",
                "• Regular rule review and cleanup of unused rules",
                "• Log all denied and allowed traffic for analysis",
                "",
                "**Intrusion Detection and Prevention:**",
                "• Deploy Network Intrusion Detection Systems (NIDS)",
                "• Implement Host-based Intrusion Detection Systems (HIDS)",
                "• Configure signature-based and anomaly-based detection",
                "• Establish baseline network behavior patterns",
                "• Integrate with Security Information and Event Management (SIEM)",
                "",
                "**Security Monitoring:**",
                "• Centralized log collection and analysis",
                "• Real-time alerting for critical security events",
                "• Regular vulnerability scanning and assessment",
                "• Network traffic analysis and flow monitoring",
                "• Threat intelligence integration for proactive defense"
            ]
        },
        {
            title: "Incident Response and Recovery",
            content: [
                "A structured incident response capability enables organizations to detect, contain, and recover from security incidents while preserving evidence and minimizing business impact.",
                "",
                "**Incident Response Lifecycle:**",
                "• **Preparation**: Develop policies, procedures, and response team capabilities",
                "• **Detection and Analysis**: Identify and validate security incidents",
                "• **Containment, Eradication, and Recovery**: Limit damage and restore operations",
                "• **Post-Incident Activity**: Document lessons learned and improve processes",
                "",
                "**Incident Classification and Prioritization:**",
                "• **Critical**: System compromise with data exfiltration or service disruption",
                "• **High**: Successful unauthorized access or malware infection",
                "• **Medium**: Attempted intrusion or suspicious activity",
                "• **Low**: Policy violations or minor security events",
                "",
                "**Evidence Handling:**",
                "• Implement proper chain of custody procedures",
                "• Use forensically sound imaging techniques",
                "• Preserve volatile memory before shutting down systems",
                "• Document all investigative actions and findings",
                "• Coordinate with legal and law enforcement as appropriate",
                "",
                "**Recovery and Continuity:**",
                "• Develop and test backup and recovery procedures",
                "• Implement redundant systems for critical services",
                "• Create alternate processing sites for disaster recovery",
                "• Establish communication plans for stakeholders",
                "• Conduct regular business continuity exercises"
            ]
        },
        {
            title: "Cryptography and Data Protection",
            content: [
                "Strong cryptographic controls protect data confidentiality, integrity, and authenticity throughout its lifecycle, from creation to disposal.",
                "",
                "**Encryption Standards and Implementation:**",
                "• **Symmetric Encryption**: AES-256 for bulk data encryption",
                "• **Asymmetric Encryption**: RSA-2048 or higher, ECDSA for key exchange",
                "• **Hash Functions**: SHA-256 or higher for data integrity",
                "• **Digital Signatures**: For non-repudiation and authentication",
                "",
                "**Key Management:**",
                "• Implement centralized key management systems",
                "• Use hardware security modules (HSMs) for key protection",
                "• Establish key rotation and lifecycle policies",
                "• Separate key management from data management",
                "• Implement secure key backup and recovery procedures",
                "",
                "**Data Classification and Handling:**",
                "• **Public**: Information intended for public release",
                "• **Internal**: Information for internal organizational use",
                "• **Confidential**: Sensitive information requiring protection",
                "• **Restricted**: Highly sensitive information with strict access controls",
                "",
                "**Transport and Storage Security:**",
                "• Use TLS 1.3 for data in transit",
                "• Implement certificate-based authentication",
                "• Encrypt databases and file systems",
                "• Secure key storage and access controls",
                "• Regular encryption strength assessment and updates"
            ]
        },
        {
            title: "Vulnerability Management",
            content: [
                "Systematic vulnerability management identifies, assesses, and remediates security weaknesses before they can be exploited by attackers.",
                "",
                "**Vulnerability Assessment Process:**",
                "• **Discovery**: Asset inventory and network mapping",
                "• **Detection**: Automated scanning and manual testing",
                "• **Verification**: Validation of identified vulnerabilities",
                "• **Risk Assessment**: Evaluate potential impact and exploitability",
                "• **Remediation**: Patch management and compensating controls",
                "",
                "**Scanning and Testing Methods:**",
                "• Network vulnerability scanning using automated tools",
                "• Web application security testing (DAST and SAST)",
                "• Database security assessments",
                "• Configuration compliance checking",
                "• Penetration testing by qualified professionals",
                "",
                "**Patch Management:**",
                "• Establish regular patching schedules",
                "• Test patches in development environments",
                "• Prioritize critical security updates",
                "• Implement emergency patching procedures",
                "• Track patch deployment and verification",
                "",
                "**Compensating Controls:**",
                "• Network segmentation to limit exposure",
                "• Additional monitoring for unpatched systems",
                "• Access restrictions and enhanced authentication",
                "• Application-layer firewalls and filtering",
                "• Regular security reviews and assessments"
            ]
        },
        {
            title: "Security Awareness and Training",
            content: [
                "Human factors remain a critical element in cybersecurity. Comprehensive security awareness programs reduce risks from social engineering and user errors.",
                "",
                "**Training Program Components:**",
                "• **New Employee Orientation**: Basic security policies and procedures",
                "• **Role-Based Training**: Specific security requirements for job functions",
                "• **Annual Refresher Training**: Updates on emerging threats and policies",
                "• **Specialized Training**: Advanced security skills for IT staff",
                "",
                "**Phishing and Social Engineering:**",
                "• Regular simulated phishing exercises",
                "• Training on recognition of social engineering tactics",
                "• Reporting procedures for suspicious communications",
                "• Verification processes for sensitive requests",
                "• Incident response for compromised accounts",
                "",
                "**Secure Computing Practices:**",
                "• Password security and multi-factor authentication",
                "• Safe web browsing and email practices",
                "• Physical security and clean desk policies",
                "• Mobile device and remote work security",
                "• Data handling and classification procedures",
                "",
                "**Metrics and Effectiveness:**",
                "• Track training completion rates and assessment scores",
                "• Monitor security incident trends and user behavior",
                "• Measure phishing simulation click rates and reporting",
                "• Collect feedback for program improvement",
                "• Regular program evaluation and updates"
            ]
        }
    ];

    return (
        <section className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb mb-6">
                    <button onClick={() => onNavigate('dashboard')} className="hover:text-primary transition-colors">
                        Dashboard
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="text-primary font-semibold">Module 2: Cybersecurity Fundamentals</span>
                </div>

                {/* Progress Indicator */}
                <div className="progress-indicator mb-8">
                    <div className={`progress-step ${currentSection === 'content' ? 'current' : 'completed'}`}>
                        1
                    </div>
                    <div className={`progress-connector ${currentSection === 'quiz' ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'quiz' ? 'current' : 'pending'}`}>
                        2
                    </div>
                    <div className="ml-4 text-sm text-text-secondary">
                        {currentSection === 'content' ? 'Learning Content' : 'Knowledge Check'}
                    </div>
                </div>

                <div className="module-container">
                    <div className="module-header">
                        <h1 className="text-3xl font-bold font-mono mb-2 uppercase">Module 2: Cybersecurity Fundamentals</h1>
                        <p className="mb-6">Comprehensive risk assessment, system hardening, and incident response</p>
                        
                        <div className="learning-objectives">
                            <h3 className="font-semibold mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                            <ul>
                                <li>Master comprehensive risk assessment methodologies including NIST, OCTAVE, and FAIR</li>
                                <li>Implement system hardening and security controls across multiple layers</li>
                                <li>Design and deploy network security architecture with defense in depth</li>
                                <li>Develop structured incident response and recovery capabilities</li>
                                <li>Apply cryptographic controls for data protection throughout its lifecycle</li>
                                <li>Establish effective vulnerability management and remediation processes</li>
                                <li>Create security awareness programs to address human factor risks</li>
                            </ul>
                        </div>

                        {currentSection === 'content' ? (
                            /* Content Section */
                            <div className="space-y-6">
                                {contentSections.map((section, index) => (
                                    <div key={index} className="content-section">
                                        <h3 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                                            {section.title}
                                        </h3>
                                        <div className="space-y-3 text-text-secondary leading-relaxed">
                                            {section.content.map((paragraph, pIndex) => (
                                                <p key={pIndex}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="bg-surface-elevated border border-border-light p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold mb-4 text-text-primary font-mono">Resources & Downloads</h4>
                                    <p className="mb-4 text-text-secondary">Access practical tools and templates for implementing cybersecurity controls.</p>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Risk Assessment Templates</h5>
                                                <p className="text-sm text-text-secondary mb-3">NIST and OCTAVE-based assessment worksheets</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">System Hardening Checklists</h5>
                                                <p className="text-sm text-text-secondary mb-3">Comprehensive hardening guides for common systems</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Incident Response Playbooks</h5>
                                                <p className="text-sm text-text-secondary mb-3">Step-by-step incident handling procedures</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Security Awareness Materials</h5>
                                                <p className="text-sm text-text-secondary mb-3">Training modules and assessment tools</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-4 text-sm text-text-secondary">
                                        <strong>Note:</strong> These resources are designed for enterprise and municipal environments. 
                                        Customize them according to your organization's specific risk profile and compliance requirements.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-primary font-semibold py-3 px-8"
                                    >
                                        Proceed to Knowledge Check
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Quiz Section */
                            <div className="quiz-container">
                                <h3 className="text-2xl font-semibold mb-4 text-text-primary font-mono">Knowledge Check</h3>
                                <p className="mb-6 text-text-secondary">Test your understanding of cybersecurity fundamentals and risk management principles.</p>
                                
                                <QuizComponent
                                    questions={questions}
                                    answers={quiz.answers}
                                    result={quiz.result}
                                    onAnswerChange={quiz.handleAnswerChange}
                                    onCheckAnswers={quiz.checkAnswers}
                                    onRetake={quiz.resetQuiz}
                                    getOptionClass={quiz.getOptionClass}
                                    canSubmit={quiz.canSubmit}
                                    showExplanations={true}
                                />
                                
                                <div className="mt-6">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary mr-4"
                                    >
                                        ← Back to Content
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-6 bg-surface border-t border-border">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button 
                                onClick={() => onNavigate('module1')} 
                                className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border"
                            >
                                Previous Module
                            </button>
                            <div className="text-sm text-text-secondary text-center">
                                Module 2 of 4 • Cybersecurity Fundamentals
                            </div>
                            <button 
                                onClick={() => onComplete(quiz.result?.score ?? 0)} 
                                disabled={!quiz.result || (quiz.result.score < 80)} 
                                className="w-full sm:w-auto btn-primary font-semibold py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Complete Module →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Module2;