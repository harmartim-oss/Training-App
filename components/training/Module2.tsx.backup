/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';
import QuizComponent from '../common/QuizComponent';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module2: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const allQuestions: QuizQuestions = {
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
        q5: {
            question: "Which cryptographic principle states that the security of a system should not depend on the secrecy of the algorithm?",
            answer: 'b',
            options: { 
                a: "Perfect forward secrecy", 
                b: "Kerckhoffs's principle", 
                c: "Diffusion principle",
                d: "Non-repudiation"
            },
            explanation: "Kerckhoffs's principle states that cryptographic security should rely on the secrecy of the key, not the algorithm itself."
        },
        q6: {
            question: "What is the primary purpose of vulnerability scanning in a cybersecurity program?",
            answer: 'c',
            options: {
                a: "To exploit discovered weaknesses",
                b: "To replace penetration testing entirely",
                c: "To identify and prioritize security weaknesses",
                d: "To monitor network traffic"
            },
            explanation: "Vulnerability scanning systematically identifies and prioritizes security weaknesses across systems and applications."
        },
        q7: {
            question: "Which type of security awareness training is most effective for reducing phishing susceptibility?",
            answer: 'a',
            options: {
                a: "Regular simulated phishing exercises with immediate feedback",
                b: "Annual mandatory training videos",
                c: "Email reminders about phishing threats",
                d: "Poster campaigns about cybersecurity"
            },
            explanation: "Simulated phishing exercises with immediate feedback provide hands-on learning and measurable improvement in user behavior."
        },
        q8: {
            question: "In the NIST Cybersecurity Framework, which function focuses on maintaining resilience and restoring services?",
            answer: 'd',
            options: {
                a: "Identify",
                b: "Protect", 
                c: "Detect",
                d: "Recover"
            },
            explanation: "The Recover function focuses on maintaining resilience and restoring any capabilities or services that were impaired due to a cybersecurity event."
        }
    };

    const quiz = useQuiz(allQuestions, 5);

    const contentSections = [
        {
            title: "Risk Assessment Methodologies",
            content: [
                "Effective cybersecurity requires systematic risk assessment to identify, analyze, and prioritize threats to organizational assets. Modern risk assessment combines quantitative and qualitative approaches to provide comprehensive threat visibility.",
                "",
                "**NIST Risk Management Framework (RMF) - Comprehensive Approach:**",
                "The NIST RMF provides a structured, repeatable process for managing cybersecurity risk across the organization:",
                "• **Step 1 - Categorize**: Classify information systems and data based on impact levels (low, moderate, high)",
                "• **Step 2 - Select**: Choose appropriate security controls from NIST SP 800-53 based on system categorization",
                "• **Step 3 - Implement**: Deploy security controls within enterprise architecture and document implementation",
                "• **Step 4 - Assess**: Evaluate security controls using NIST SP 800-53A assessment procedures",
                "• **Step 5 - Authorize**: Make risk-based decision to authorize system operation based on residual risk",
                "• **Step 6 - Monitor**: Continuously monitor security controls and update risk assessments",
                "",
                "**OCTAVE Methodology - Organizational Risk Focus:**",
                "Operationally Critical Threat, Asset, and Vulnerability Evaluation (OCTAVE) emphasizes operational risk:",
                "• **Phase 1**: Build Asset-Based Threat Profiles - Identify critical assets and threats",
                "• **Phase 2**: Identify Infrastructure Vulnerabilities - Technical vulnerability assessment",
                "• **Phase 3**: Develop Security Strategy and Plans - Risk mitigation strategy development",
                "• **Unique Features**: Self-directed approach, focuses on organizational risk vs. technical vulnerabilities",
                "• **Risk Analysis**: Uses probability and impact matrices for qualitative risk scoring",
                "",
                "**FAIR (Factor Analysis of Information Risk) - Quantitative Assessment:**",
                "FAIR provides a quantitative framework for understanding and measuring information risk:",
                "• **Loss Event Frequency**: Threat Event Frequency × Vulnerability",
                "• **Loss Magnitude**: Primary Loss + Secondary Loss",
                "• **Risk Equation**: Loss Event Frequency × Loss Magnitude = Risk",
                "• **Business Value**: Enables cost-benefit analysis of security investments",
                "• **Monte Carlo Simulation**: Statistical modeling for risk probability distributions",
                "",
                "**ISO 27005 Risk Management:**",
                "International standard providing systematic approach to information security risk management:",
                "• **Context Establishment**: Define scope, criteria, and risk management framework",
                "• **Risk Assessment**: Identification, analysis, and evaluation of information security risks",
                "• **Risk Treatment**: Selection and implementation of appropriate risk treatment options",
                "• **Risk Acceptance**: Formal acceptance of residual risks by management",
                "• **Risk Communication**: Ongoing stakeholder communication throughout the process",
                "",
                "**Threat Modeling Approaches:**",
                "• **STRIDE**: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
                "• **PASTA**: Process for Attack Simulation and Threat Analysis - seven-stage threat modeling methodology",
                "• **LINDDUN**: Privacy threat modeling focused on Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance",
                "• **Attack Trees**: Hierarchical diagrams showing ways systems can be attacked"
            ]
        },
        {
            title: "System Hardening and Security Controls",
            content: [
                "System hardening involves implementing comprehensive security measures to reduce vulnerabilities and minimize attack surfaces across all system components. This defense-in-depth approach addresses multiple layers of potential compromise.",
                "",
                "**Operating System Hardening - Foundation Security:**",
                "**Service Management:**",
                "• Remove or disable unnecessary software packages, services, and protocols",
                "• Implement service dependency mapping to understand potential impacts",
                "• Configure services to run with minimal privileges (non-root when possible)",
                "• Use systemd security features (PrivateTmp, NoNewPrivileges, CapabilityBoundingSet)",
                "",
                "**Patch Management:**",
                "• Establish automated patch management systems with testing phases",
                "• Prioritize security patches based on CVSS scores and exploitability",
                "• Implement staged deployment (development → testing → production)",
                "• Maintain emergency patching procedures for critical vulnerabilities",
                "• Document and track all applied patches and configuration changes",
                "",
                "**File System Security:**",
                "• Configure secure boot processes with signed kernels and boot loaders",
                "• Implement proper file system permissions following principle of least privilege",
                "• Use mandatory access controls (SELinux, AppArmor, or Grsecurity)",
                "• Enable file integrity monitoring (AIDE, Tripwire, or OSSEC)",
                "• Encrypt sensitive data at rest using strong encryption algorithms",
                "",
                "**Network Service Hardening:**",
                "**Web Services Security:**",
                "• Disable unnecessary HTTP methods (TRACE, OPTIONS, DELETE)",
                "• Implement HTTP Strict Transport Security (HSTS) headers",
                "• Configure Content Security Policy (CSP) headers to prevent XSS",
                "• Use strong TLS configurations (TLS 1.3, perfect forward secrecy)",
                "• Implement rate limiting and request size restrictions",
                "• Hide server version information and error details",
                "",
                "**Database Security Configuration:**",
                "• Remove default accounts and change default passwords",
                "• Implement database-level encryption (TDE - Transparent Data Encryption)",
                "• Configure database firewalls and connection encryption",
                "• Enable database audit logging for sensitive operations",
                "• Use prepared statements to prevent SQL injection attacks",
                "• Implement database activity monitoring (DAM) solutions",
                "",
                "**SSH and Remote Access Security:**",
                "• Disable password authentication in favor of key-based authentication",
                "• Change default SSH port and implement port knocking where appropriate",
                "• Configure SSH with strong ciphers and disable weak protocols",
                "• Implement fail2ban or similar intrusion prevention for SSH",
                "• Use bastion hosts for administrative access to internal systems",
                "• Enable SSH logging and monitoring for suspicious activities",
                "",
                "**Application Security Hardening:**",
                "**Web Application Security:**",
                "• Input validation and sanitization for all user inputs",
                "• Output encoding to prevent cross-site scripting (XSS)",
                "• Session management with secure cookies and proper timeout",
                "• Cross-Site Request Forgery (CSRF) protection mechanisms",
                "• Implement Web Application Firewalls (WAF) with custom rules",
                "• Regular security code reviews and penetration testing",
                "",
                "**Container Security:**",
                "• Use minimal base images and regularly update container images",
                "• Implement container image scanning for vulnerabilities",
                "• Configure container runtime security (user namespaces, cgroups)",
                "• Use secrets management systems for sensitive data in containers",
                "• Implement container network policies and segmentation",
                "• Monitor container behavior for anomalous activities"
            ]
        },
        {
            title: "Network Security and Defense in Depth",
            content: [
                "Network security forms the foundation of organizational cybersecurity, implementing multiple layers of preventive and detective controls to protect against sophisticated threats and advanced persistent threats (APTs).",
                "",
                "**Network Architecture and Segmentation:**",
                "**Logical Network Segmentation:**",
                "• Implement VLANs to create isolated broadcast domains for different user groups",
                "• Create separate network zones: DMZ, internal LAN, guest networks, management networks",
                "• Isolate critical systems and databases from general user networks",
                "• Implement network access control (NAC) for device authentication and authorization",
                "• Use software-defined networking (SDN) for dynamic security policy enforcement",
                "",
                "**Micro-segmentation Strategies:**",
                "• Implement zero-trust network architecture principles",
                "• Create granular security policies at the application and workload level",
                "• Use container network policies for Kubernetes environments",
                "• Implement east-west traffic inspection and filtering",
                "• Deploy application-aware firewalls for deep packet inspection",
                "",
                "**Perimeter Security Controls:**",
                "**Next-Generation Firewall (NGFW) Configuration:**",
                "• Default-deny policy with explicit allow rules for required traffic",
                "• Implement stateful inspection with connection tracking and session management",
                "• Configure application-layer filtering and deep packet inspection (DPI)",
                "• Use threat intelligence feeds for dynamic IP and domain blocking",
                "• Enable SSL/TLS inspection for encrypted traffic analysis",
                "• Implement geolocation blocking for traffic from high-risk countries",
                "",
                "**Network Address Translation (NAT) and Proxy Services:**",
                "• Configure NAT to hide internal network topology",
                "• Implement reverse proxies for web application protection",
                "• Use forward proxies for outbound traffic filtering and monitoring",
                "• Deploy load balancers with SSL termination and security features",
                "• Configure connection rate limiting and DDoS protection",
                "",
                "**Intrusion Detection and Prevention Systems:**",
                "**Network-Based IDS/IPS (NIDS/NIPS):**",
                "• Deploy sensors at critical network chokepoints and DMZ interfaces",
                "• Configure signature-based detection for known attack patterns",
                "• Implement behavioral analysis for zero-day threat detection",
                "• Use machine learning algorithms for anomaly detection",
                "• Establish baseline network behavior patterns and traffic flows",
                "",
                "**Host-Based IDS/IPS (HIDS/HIPS):**",
                "• Monitor file integrity and system call activity",
                "• Detect privilege escalation and lateral movement attempts",
                "• Implement process whitelisting and behavioral monitoring",
                "• Configure log monitoring for security-relevant events",
                "• Use endpoint detection and response (EDR) capabilities",
                "",
                "**Network Monitoring and Analysis:**",
                "**Security Information and Event Management (SIEM):**",
                "• Centralized log collection from all network devices and systems",
                "• Real-time correlation of security events across multiple sources",
                "• Configure automated alerting for critical security incidents",
                "• Implement threat hunting capabilities with advanced analytics",
                "• Maintain compliance reporting and audit trail capabilities",
                "",
                "**Network Traffic Analysis:**",
                "• Deploy network flow monitoring (NetFlow, sFlow, IPFIX)",
                "• Implement full packet capture (PCAP) for forensic analysis",
                "• Use network behavior analysis (NBA) for anomaly detection",
                "• Monitor DNS queries for command and control communications",
                "• Analyze network metadata for threat intelligence",
                "",
                "**Wireless Network Security:**",
                "• Implement WPA3 encryption with strong pre-shared keys or enterprise authentication",
                "• Use certificate-based authentication (EAP-TLS) for enterprise wireless",
                "• Deploy wireless intrusion detection systems (WIDS)",
                "• Implement guest network isolation and captive portals",
                "• Configure rogue access point detection and mitigation",
                "",
                "**VPN and Remote Access Security:**",
                "• Deploy IPSec VPNs with strong encryption (AES-256, Perfect Forward Secrecy)",
                "• Implement SSL/TLS VPNs with multi-factor authentication",
                "• Use split tunneling policies to protect corporate resources",
                "• Configure certificate-based authentication for VPN clients",
                "• Monitor VPN usage and detect anomalous connection patterns"
            ]
        },
        {
            title: "Incident Response and Digital Forensics",
            content: [
                "A comprehensive incident response capability enables organizations to effectively detect, contain, investigate, and recover from cybersecurity incidents while preserving digital evidence and minimizing business impact.",
                "",
                "**NIST Incident Response Lifecycle - Detailed Implementation:**",
                "**Phase 1: Preparation**",
                "• **Policy Development**: Create comprehensive incident response policies, procedures, and playbooks",
                "• **Team Structure**: Establish Computer Security Incident Response Team (CSIRT) with defined roles",
                "• **Tools and Resources**: Deploy incident response tools, forensic software, and communication systems",
                "• **Training Programs**: Conduct regular training exercises, tabletop simulations, and skill development",
                "• **Documentation**: Maintain current network diagrams, asset inventories, and contact lists",
                "",
                "**Phase 2: Detection and Analysis**",
                "• **Event Monitoring**: 24/7 security operations center (SOC) monitoring and threat hunting",
                "• **Incident Identification**: Correlate events across multiple sources to identify true security incidents",
                "• **Initial Assessment**: Determine incident scope, impact, and criticality using standardized criteria",
                "• **Documentation**: Create incident tickets with timeline, affected systems, and initial findings",
                "• **Notification**: Alert appropriate stakeholders based on incident classification and escalation procedures",
                "",
                "**Phase 3: Containment, Eradication, and Recovery**",
                "**Short-term Containment:**",
                "• Isolate affected systems from the network to prevent lateral movement",
                "• Preserve system state for forensic analysis before making changes",
                "• Implement temporary workarounds to maintain business operations",
                "• Block malicious IP addresses, domains, and file hashes at security controls",
                "",
                "**Long-term Containment:**",
                "• Rebuild compromised systems from known-good backups or images",
                "• Apply security patches and configuration changes to prevent reinfection",
                "• Implement additional monitoring and logging on affected systems",
                "• Update security controls based on lessons learned from the incident",
                "",
                "**Eradication:**",
                "• Remove malware, unauthorized accounts, and backdoors from all affected systems",
                "• Conduct vulnerability assessments to identify and remediate attack vectors",
                "• Reset passwords and revoke compromised certificates and tokens",
                "• Update antivirus signatures and intrusion detection rules",
                "",
                "**Recovery:**",
                "• Gradually restore systems to production with enhanced monitoring",
                "• Verify system integrity and functionality before declaring recovery complete",
                "• Implement additional safeguards and monitoring to detect recurrence",
                "• Conduct user acceptance testing for critical business functions",
                "",
                "**Phase 4: Post-Incident Activity**",
                "• **Lessons Learned**: Conduct formal post-incident review meetings with all stakeholders",
                "• **Process Improvement**: Update policies, procedures, and technical controls based on findings",
                "• **Documentation**: Create comprehensive incident reports with timeline, impact, and recommendations",
                "• **Training Updates**: Incorporate incident lessons into ongoing security awareness and training programs",
                "",
                "**Digital Forensics and Evidence Handling:**",
                "**Forensic Readiness:**",
                "• Implement logging and monitoring systems capable of providing forensic evidence",
                "• Establish evidence retention policies and secure storage procedures",
                "• Train incident response team members in basic forensic techniques",
                "• Maintain relationships with external forensic specialists and legal counsel",
                "",
                "**Evidence Collection and Preservation:**",
                "• **Order of Volatility**: Collect evidence starting with most volatile (memory, network connections, running processes)",
                "• **Chain of Custody**: Document all evidence handling with signatures, timestamps, and transfer logs",
                "• **Forensic Imaging**: Create bit-for-bit copies of storage devices using write-blocking hardware",
                "• **Memory Acquisition**: Capture RAM contents before shutting down systems for analysis",
                "• **Network Evidence**: Preserve firewall logs, IDS alerts, and network flow records",
                "",
                "**Legal and Regulatory Considerations:**",
                "• **Breach Notification**: Comply with applicable breach notification laws and regulations",
                "• **Law Enforcement**: Coordinate with law enforcement agencies when criminal activity is suspected",
                "• **Legal Hold**: Preserve relevant documents and data for potential litigation",
                "• **Privacy Protection**: Ensure incident response activities comply with privacy laws and regulations",
                "",
                "**Business Continuity and Crisis Management:**",
                "• **Communication Plans**: Establish clear communication channels for internal and external stakeholders",
                "• **Media Relations**: Coordinate with public relations and legal teams for external communications",
                "• **Customer Notification**: Develop customer communication strategies for service disruptions",
                "• **Regulatory Reporting**: Meet regulatory reporting requirements for security incidents",
                "• **Insurance Claims**: Work with cyber insurance providers to document losses and coordinate claims"
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
        <section className={`animate-fade-in ${layoutClasses}`}>
            <div className={`max-w-6xl mx-auto ${mobileClasses}`}>
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
                                    questions={quiz.selectedQuestions}
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