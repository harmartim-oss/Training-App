/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';
import QuizComponent from '../common/QuizComponent';
import DownloadableResources from '../common/DownloadableResources';
import SlideNavigation, { Slide } from '../common/SlideNavigation';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module2: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz' | 'resources'>('content');
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const sampleResources = [
        {
            id: 'incident-response-checklist',
            title: 'Incident Response Checklist',
            description: 'A comprehensive step-by-step checklist for responding to cybersecurity incidents following the NIST framework.',
            type: 'checklist' as const,
            size: '3 pages',
            previewContent: `CYBERSECURITY INCIDENT RESPONSE CHECKLIST

PHASE 1: PREPARATION (Ongoing)
□ Incident response plan documented and approved
□ Response team roles and contacts identified
□ Communication channels established
□ Tools and resources prepared (forensics, backup)
□ Regular training and drills conducted
□ Detection systems deployed and monitored

PHASE 2: DETECTION AND ANALYSIS
□ Incident detected and reported
□ Initial triage performed
□ Severity assessed (Critical/High/Medium/Low)
□ Incident response team notified
□ Evidence preservation initiated
□ Chain of custody documentation started
□ Indicators of compromise (IOCs) identified
□ Scope assessment: systems affected, data compromised
□ Timeline of events documented
□ Attack vector determined

PHASE 3: CONTAINMENT
Short-term Containment:
□ Isolate affected systems from network
□ Disable compromised accounts
□ Block malicious IP addresses/domains
□ Prevent further data exfiltration
□ Preserve evidence for investigation

Long-term Containment:
□ Apply temporary fixes to allow business continuity
□ Patch vulnerabilities exploited
□ Implement additional monitoring
□ Clean systems while preserving evidence

PHASE 4: ERADICATION
□ Remove malware and malicious artifacts
□ Close attack vectors and vulnerabilities
□ Strengthen security controls
□ Password resets for affected accounts
□ Review and update firewall rules
□ Verify all threats removed before restoration

PHASE 5: RECOVERY
□ Restore systems from clean backups
□ Rebuild compromised systems from trusted images
□ Verify system integrity and functionality
□ Gradually return systems to production
□ Enhanced monitoring during recovery period
□ Communicate restoration progress to stakeholders

PHASE 6: POST-INCIDENT ACTIVITY
□ Conduct post-incident review meeting
□ Document lessons learned
□ Update incident response procedures
□ Improve security controls based on findings
□ Staff training on identified gaps
□ Metrics and reporting
□ Final incident report completed

NOTIFICATION REQUIREMENTS
□ Internal: Management, Legal, PR
□ External: Regulators (if required), Law Enforcement
□ Affected Individuals (privacy breach notification)
□ Insurance provider
□ Third-party vendors (if affected)`
        },
        {
            id: 'system-hardening-guide',
            title: 'System Hardening Security Guide',
            description: 'Practical guide for hardening servers and workstations to reduce attack surface and improve security posture.',
            type: 'guide' as const,
            size: '10 pages',
            previewContent: `SYSTEM HARDENING SECURITY GUIDE

1. OPERATING SYSTEM HARDENING

Windows Servers/Workstations:
□ Apply latest security patches and updates
□ Disable unnecessary services (Telnet, FTP, SMBv1)
□ Configure Windows Firewall with restrictive rules
□ Enable Windows Defender / endpoint protection
□ Disable autorun for removable media
□ Configure User Account Control (UAC)
□ Implement AppLocker / Software Restriction Policies
□ Enable audit logging and log forwarding
□ Disable guest and unnecessary accounts
□ Set screen lock timeout (15 minutes max)

Linux/Unix Servers:
□ Apply security patches via package manager
□ Disable unused services (xinetd, cups, avahi)
□ Configure iptables/firewalld restrictive rules
□ Install and configure SELinux/AppArmor
□ Disable root SSH login (use sudo)
□ Configure SSH key-based authentication
□ Set password complexity requirements
□ Enable system audit logging (auditd)
□ Remove unnecessary packages
□ Implement file integrity monitoring (AIDE/Tripwire)

2. NETWORK HARDENING

□ Implement network segmentation (VLANs)
□ Configure firewalls at network boundaries
□ Disable unused network services and ports
□ Enable network intrusion detection (IDS/IPS)
□ Implement 802.1X network access control
□ Use VPN for remote access
□ Disable legacy protocols (Telnet, FTP, HTTP)
□ Configure switch port security
□ Implement network monitoring and logging
□ Use private IP addressing with NAT

3. ACCESS CONTROL HARDENING

□ Implement principle of least privilege
□ Use role-based access control (RBAC)
□ Enable multi-factor authentication (MFA)
□ Set password policies (length, complexity, expiry)
□ Implement account lockout policies
□ Regular access reviews and recertification
□ Remove/disable inactive accounts
□ Separate administrative and user accounts
□ Log all access attempts and changes
□ Implement privileged access management (PAM)

4. APPLICATION HARDENING

□ Keep applications updated with security patches
□ Remove unnecessary features and plugins
□ Configure secure defaults
□ Disable verbose error messages in production
□ Implement input validation
□ Use secure communication protocols (HTTPS, TLS)
□ Configure strong cipher suites
□ Implement Content Security Policy (CSP)
□ Enable application firewalls (WAF)
□ Regular vulnerability scanning

5. DATA PROTECTION

□ Encrypt data at rest (BitLocker, LUKS, FileVault)
□ Encrypt data in transit (TLS 1.2+, IPSec)
□ Implement database encryption (TDE)
□ Configure secure backup procedures
□ Test backup restoration regularly
□ Secure backup storage (offsite, encrypted)
□ Implement data loss prevention (DLP)
□ Configure file integrity monitoring
□ Secure disposal procedures for old media

6. PHYSICAL SECURITY

□ Secure server rooms with access controls
□ Install environmental monitoring
□ Implement cable locks for portable devices
□ Enable BIOS/UEFI passwords
□ Configure secure boot
□ Disable unused ports (USB, Thunderbolt)
□ Clear screen policies for unattended systems
□ Visitor access controls and logging
□ Security camera coverage
□ Secure disposal of old hardware

7. MONITORING AND LOGGING

□ Enable comprehensive audit logging
□ Forward logs to centralized SIEM
□ Configure log retention policies
□ Monitor for suspicious activities
□ Set up alerting for security events
□ Regular log review and analysis
□ Implement file integrity monitoring
□ Network traffic analysis
□ Endpoint detection and response (EDR)

8. HARDENING VALIDATION

□ Regular vulnerability scans
□ Penetration testing (annual minimum)
□ Configuration compliance scanning
□ Security baseline comparisons
□ Patch compliance reporting
□ Access review audits
□ Document hardening procedures
□ Maintain system inventories`
        },
        {
            id: 'vulnerability-assessment-template',
            title: 'Vulnerability Assessment Report Template',
            description: 'Template for documenting vulnerability assessment findings and remediation tracking.',
            type: 'template' as const,
            size: '6 pages',
            previewContent: `VULNERABILITY ASSESSMENT REPORT TEMPLATE

EXECUTIVE SUMMARY
Report Date: _______________
Assessment Period: _______________
Prepared by: _______________
Review Status: _______________

Key Findings:
- Total Vulnerabilities Identified: ____
- Critical: ____
- High: ____
- Medium: ____
- Low: ____

Overall Risk Rating: [Critical / High / Medium / Low]

Top 3 Critical Issues:
1. ________________________________
2. ________________________________
3. ________________________________

ASSESSMENT SCOPE

Systems Assessed:
□ Web Applications
□ Network Infrastructure
□ Servers (Windows/Linux)
□ Workstations
□ Cloud Infrastructure
□ Mobile Devices

IP Ranges Scanned: _______________
Number of Assets: _______________
Scan Tools Used: _______________

METHODOLOGY

□ Automated Vulnerability Scanning
□ Manual Testing
□ Configuration Review
□ Penetration Testing
□ Social Engineering Assessment

DETAILED FINDINGS

CRITICAL VULNERABILITIES

Vulnerability #1:
Title: ________________________________
Affected Systems: _____________________
CVE ID: _______________________________
CVSS Score: ___________________________

Description:
_____________________________________
_____________________________________

Impact:
_____________________________________

Proof of Concept:
_____________________________________

Remediation:
_____________________________________

Estimated Effort: [Hours/Days/Weeks]
Target Date: __________________________

---

HIGH SEVERITY VULNERABILITIES

Vulnerability #2:
Title: ________________________________
Affected Systems: _____________________
CVE ID: _______________________________
CVSS Score: ___________________________

Description:
_____________________________________

Impact:
_____________________________________

Remediation:
_____________________________________

Estimated Effort: ______________
Target Date: ______________

---

MEDIUM SEVERITY VULNERABILITIES

Vulnerability #3:
Title: ________________________________
Affected Systems: _____________________

[Continue for each vulnerability...]

REMEDIATION PRIORITY MATRIX

Priority 1 (Immediate - within 7 days):
- Critical vulnerabilities in internet-facing systems
- Vulnerabilities with active exploits
- Missing critical security patches

Priority 2 (Short-term - within 30 days):
- High severity vulnerabilities
- Weak authentication mechanisms
- Unencrypted sensitive data transmission

Priority 3 (Medium-term - within 90 days):
- Medium severity vulnerabilities
- Configuration weaknesses
- Missing security controls

Priority 4 (Long-term - within 180 days):
- Low severity vulnerabilities
- Security best practice improvements
- Defense-in-depth enhancements

REMEDIATION TRACKING

Vulnerability ID | Severity | Owner | Status | Due Date | Completed
VUL-001 | Critical | _____ | ______ | _______ | ________
VUL-002 | High | _____ | ______ | _______ | ________
VUL-003 | High | _____ | ______ | _______ | ________

RECOMMENDATIONS

Short-term Actions:
1. ________________________________
2. ________________________________
3. ________________________________

Long-term Strategic Improvements:
1. ________________________________
2. ________________________________
3. ________________________________

COMPLIANCE GAPS IDENTIFIED

□ Patch Management: ________________
□ Access Controls: __________________
□ Encryption: _______________________
□ Monitoring: _______________________
□ Incident Response: ________________

NEXT STEPS

□ Prioritize remediation by severity and exploitability
□ Assign ownership for each vulnerability
□ Schedule follow-up scans to verify fixes
□ Update security policies and procedures
□ Plan for next assessment cycle

APPENDIX

A. Detailed Scan Results
B. CVE References
C. Remediation Procedures
D. Risk Assessment Methodology`
        }
    ];

    const allQuestions: QuizQuestions = {
        q1: { 
            question: "Your organization is conducting a cybersecurity risk assessment for a new online payment system. Management wants to prioritize risks for mitigation planning. Which risk assessment methodology would be most appropriate for quickly categorizing risks using likelihood and impact ratings (e.g., High/Medium/Low)?", 
            answer: 'b', 
            options: { a: "NIST 800-30 quantitative analysis with precise monetary loss calculations", b: "OCTAVE qualitative assessment using probability and impact matrices", c: "FAIR quantitative risk modeling requiring extensive data collection" },
            explanation: "OCTAVE (Operationally Critical Threat, Asset, and Vulnerability Evaluation) is specifically designed for qualitative risk assessment using probability and impact matrices, making it ideal for rapid risk categorization and prioritization. NIST 800-30 supports both qualitative and quantitative approaches but is more comprehensive, while FAIR focuses on quantitative financial risk modeling requiring extensive data."
        },
        q2: { 
            question: "You're hardening a new Linux web server before production deployment. The server currently runs SSH (port 22), HTTP (port 80), HTTPS (port 443), FTP (port 21), Telnet (port 23), and MySQL (port 3306). Which services should you disable to reduce the attack surface while maintaining essential web server functionality?", 
            answer: 'c', 
            options: { a: "Only disable Telnet as it's the oldest protocol", b: "Keep all services enabled for maximum flexibility", c: "Disable FTP, Telnet, and MySQL (if not needed for web app); restrict SSH to specific IPs" },
            explanation: "System hardening requires disabling all unnecessary services to reduce the attack surface. FTP and Telnet are unencrypted and should be replaced with secure alternatives (SFTP/SCP and SSH). MySQL should only be accessible if the web application requires database connectivity and should be bound to localhost if possible. SSH should remain enabled for secure remote administration but restricted by IP address and using key-based authentication. HTTP and HTTPS are essential for web server functionality."
        },
        q3: { 
            question: "Your organization's finance department reports that several employees received suspicious emails appearing to be from the CFO requesting urgent wire transfers. You suspect this is a phishing attack. During which incident response phase must you ensure forensic evidence is properly preserved, including email headers, server logs, and affected workstations, while maintaining a documented chain of custody?", 
            answer: 'b', 
            options: { a: "Preparation - before incidents occur", b: "Detection and Analysis - while investigating the incident", c: "Post-Incident Activity - after resolution for lessons learned" },
            explanation: "Evidence preservation and chain of custody procedures are critical during the Detection and Analysis phase. This is when you're actively investigating the incident, collecting forensic data, and documenting findings. Proper evidence handling during this phase ensures: (1) Legal admissibility if prosecution is pursued, (2) Accurate incident analysis and root cause determination, (3) Ability to track attacker tactics and techniques, (4) Regulatory compliance for breach notification requirements. The chain of custody documents who collected evidence, when, how it was secured, and who accessed it."
        },
        q4: { 
            question: "Your organization recently experienced a ransomware attack that bypassed the perimeter firewall by exploiting unpatched endpoint vulnerabilities. Management asks how to prevent similar incidents. Which defense-in-depth strategy should you recommend?", 
            answer: 'a', 
            options: { a: "Implement multiple layers: network segmentation, endpoint protection, regular patching, email filtering, user training, and backup systems", b: "Invest in the strongest possible perimeter firewall and focus all resources there", c: "Deploy endpoint detection and response (EDR) only, as that's where the breach occurred" },
            explanation: "Defense in depth is a cybersecurity strategy that uses multiple layers of security controls to protect assets. If one layer fails (like the perimeter firewall in this scenario), other layers provide continued protection. A comprehensive defense-in-depth approach for ransomware prevention includes: (1) Network layer: segmentation, firewalls, IDS/IPS, (2) Endpoint layer: antivirus, EDR, application whitelisting, (3) Application layer: patch management, secure configurations, (4) Data layer: encryption, backups, access controls, (5) Human layer: security awareness training, phishing simulations. This multi-layered approach ensures no single point of failure."
        },
        q5: {
            question: "Your organization is evaluating encryption algorithms for a new secure messaging system. The vendor proposes a proprietary encryption algorithm they developed, claiming it's 'more secure than industry standards.' Why should you reject this proposal, and what principle does this relate to?",
            answer: 'b',
            options: { 
                a: "Perfect forward secrecy - keys should be regenerated frequently for each session", 
                b: "Kerckhoffs's principle - cryptographic security should rely on key secrecy, not algorithm secrecy", 
                c: "Diffusion principle - ciphertext should depend on all parts of the plaintext",
                d: "Non-repudiation - users should not be able to deny sending messages"
            },
            explanation: "Kerckhoffs's principle (established in 1883 and still fundamental today) states that a cryptographic system should be secure even if everything about the system, except the key, is public knowledge. This means: (1) The algorithm can be published and subjected to public scrutiny, (2) Security relies solely on keeping the secret key confidential, (3) Proprietary 'secret' algorithms are dangerous because they haven't been tested by the security community and may contain undiscovered vulnerabilities. Modern secure encryption uses publicly vetted algorithms like AES-256, RSA, or elliptic curve cryptography that have withstood years of expert analysis."
        },
        q6: {
            question: "Your IT security team has deployed a vulnerability scanner that runs weekly scans across all network systems. This week's scan report shows 847 vulnerabilities: 45 critical, 203 high, 412 medium, and 187 low severity. What is the primary purpose of this vulnerability scanning program, and how should you prioritize remediation?",
            answer: 'c',
            options: {
                a: "To exploit discovered weaknesses to test system resilience in production",
                b: "To replace all penetration testing and security assessments entirely",
                c: "To systematically identify, prioritize, and track security weaknesses for remediation",
                d: "To monitor real-time network traffic and block attacks as they occur"
            },
            explanation: "Vulnerability scanning serves to systematically identify and prioritize security weaknesses across systems and applications so they can be remediated before attackers exploit them. Key aspects: (1) Identification: Automated scanning discovers known vulnerabilities (CVEs) in software, configurations, and systems, (2) Prioritization: Vulnerabilities are ranked by severity, exploitability, and business impact to guide remediation efforts, (3) Tracking: Scanning provides metrics and trends over time to measure security improvement. For the scenario above, prioritize critical and high severity vulnerabilities first, especially those in internet-facing systems or protecting sensitive data. Vulnerability scanning complements (not replaces) penetration testing and is different from real-time monitoring like IDS/IPS."
        },
        q7: {
            question: "Despite sending monthly email reminders about phishing threats and requiring annual security awareness training, your organization continues to experience successful phishing attacks with 15% of employees clicking malicious links. What type of security awareness program has been proven most effective for reducing phishing susceptibility?",
            answer: 'a',
            options: {
                a: "Monthly simulated phishing exercises with immediate feedback and targeted training for clickers",
                b: "Longer annual mandatory training videos covering all security topics in depth",
                c: "More frequent email reminders and posters about phishing threats throughout the office",
                d: "Quarterly poster campaigns featuring cybersecurity tips and threat examples"
            },
            explanation: "Research consistently shows that regular simulated phishing exercises with immediate feedback are the most effective approach for reducing phishing susceptibility. Here's why: (1) Hands-on Learning: Employees experience realistic phishing attempts in a safe environment, (2) Immediate Feedback: When employees click a simulated phishing link, they immediately see educational content explaining what they missed, (3) Behavioral Change: Repeated exposure with consequences (even just educational ones) changes behavior more effectively than passive learning, (4) Measurable Results: Track click rates over time to measure improvement and identify users needing additional training, (5) Targeted Training: Focus intensive training on users who consistently fail simulations. Passive methods like posters and annual videos lack the engagement and immediate reinforcement needed for lasting behavioral change."
        },
        q8: {
            question: "Your organization experienced a ransomware attack that encrypted critical databases and disrupted operations for 72 hours. The incident response team successfully contained the attack, eradicated the malware, and is now restoring systems from backups. Which NIST Cybersecurity Framework function covers this restoration phase and the activities needed to return to normal operations?",
            answer: 'd',
            options: {
                a: "Identify - understanding the organization's assets and risks",
                b: "Protect - implementing safeguards to prevent future attacks", 
                c: "Detect - discovering and analyzing cybersecurity events",
                d: "Recover - maintaining resilience and restoring capabilities and services"
            },
            explanation: "The NIST Cybersecurity Framework's Recover function focuses on maintaining resilience and restoring any capabilities or services that were impaired due to a cybersecurity incident. Recovery activities include: (1) Recovery Planning: Documented processes for restoring systems and data, (2) Improvements: Incorporating lessons learned from the incident, (3) Communications: Internal and external stakeholder notification during recovery, (4) System Restoration: Rebuilding systems from known good backups or images. The other NIST CSF functions serve different purposes: Identify (asset management, risk assessment), Protect (access control, training, data security), Detect (continuous monitoring, anomaly detection), and Respond (incident response planning, analysis, mitigation)."
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

    // Convert content sections into slides for click-through navigation
    const contentSlides: Slide[] = contentSections.map((section, index) => ({
        id: `slide-${index}`,
        title: section.title,
        content: (
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
                    {section.title}
                </h2>
                <div className="space-y-3 text-text-secondary leading-relaxed">
                    {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                    ))}
                </div>
            </div>
        )
    }));

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
                    <div className={`progress-connector ${(currentSection === 'quiz' || currentSection === 'resources') ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'quiz' ? 'current' : (currentSection === 'resources' ? 'completed' : 'pending')}`}>
                        2
                    </div>
                    <div className={`progress-connector ${currentSection === 'resources' ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'resources' ? 'current' : 'pending'}`}>
                        3
                    </div>
                    <div className="ml-4 text-sm text-text-secondary">
                        {currentSection === 'content' ? 'Learning Content' : 
                         currentSection === 'quiz' ? 'Knowledge Check' : 'Resources & Downloads'}
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
                            /* Content Section - Now with Slide Navigation */
                            <div className="mt-8">
                                <SlideNavigation 
                                    slides={contentSlides}
                                    moduleTitle="Module 2: Cybersecurity Fundamentals"
                                    onComplete={() => setCurrentSection('quiz')}
                                />
                            </div>
                        ) : currentSection === 'quiz' ? (
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
                                
                                <div className="mt-6 flex gap-4">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary"
                                    >
                                        ← Back to Content
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSection('resources')}
                                        className="btn-secondary"
                                    >
                                        📚 View Resources
                                    </button>
                                </div>
                            </div>
                        ) : currentSection === 'resources' ? (
                            /* Resources Section */
                            <div className="resources-section mt-8">
                                <DownloadableResources 
                                    resources={sampleResources}
                                    moduleTitle="Module 2 Resources"
                                />

                                <div className="text-center mt-6 flex gap-4 justify-center">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary py-2 px-6"
                                    >
                                        ← Back to Content
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-secondary py-2 px-6"
                                    >
                                        🎓 Take Assessment
                                    </button>
                                </div>
                            </div>
                        ) : null}
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