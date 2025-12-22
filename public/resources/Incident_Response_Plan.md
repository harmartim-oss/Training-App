# Incident Response Plan Template

## Complete Framework for Detection, Containment, Eradication, and Recovery

A comprehensive template for organizations to prepare for and respond to cybersecurity incidents.

---

## Executive Summary

This Incident Response Plan (IRP) provides a structured approach for detecting, responding to, and recovering from cybersecurity incidents. It defines roles, responsibilities, procedures, and communication protocols to minimize impact and ensure business continuity.

**Plan Owner**: [Name, Title]  
**Last Updated**: [Date]  
**Next Review Date**: [Date]  
**Plan Version**: 1.0

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Incident Response Team](#incident-response-team)
3. [Incident Classification](#incident-classification)
4. [Response Phases](#response-phases)
5. [Communication Protocols](#communication-protocols)
6. [Documentation Requirements](#documentation-requirements)
7. [Post-Incident Review](#post-incident-review)

---

## Purpose and Scope

### Purpose
This plan establishes procedures to:
- ✅ Quickly detect and assess security incidents
- ✅ Contain and minimize damage
- ✅ Eradicate threats from the environment
- ✅ Recover systems and operations
- ✅ Learn from incidents to improve security posture

### Scope
**Applies to**: All information systems, networks, applications, and data assets owned or operated by [Organization Name]

**Covers**: 
- Data breaches and privacy incidents
- Malware and ransomware attacks
- Unauthorized access or insider threats
- Denial of service attacks
- Physical security incidents affecting IT
- Third-party/supply chain incidents

---

## Incident Response Team

### Core Team Members

| Role | Name | Contact | Primary Responsibilities |
|------|------|---------|------------------------|
| **Incident Response Manager** | [Name] | [Phone/Email] | Overall incident coordination, executive communication |
| **Security Lead** | [Name] | [Phone/Email] | Technical investigation, threat analysis, remediation |
| **IT Operations Lead** | [Name] | [Phone/Email] | System recovery, infrastructure restoration |
| **Legal Counsel** | [Name] | [Phone/Email] | Legal obligations, regulatory compliance |
| **Communications Lead** | [Name] | [Phone/Email] | Internal/external communications, media relations |
| **Privacy Officer** | [Name] | [Phone/Email] | Privacy impact assessment, breach notification |
| **HR Representative** | [Name] | [Phone/Email] | Employee-related incidents, internal investigations |

### Extended Team (On-Call)
- Business Unit Leaders
- Third-party Security Consultants
- Forensic Specialists
- Insurance Provider Representative

### External Contacts
- **Law Enforcement**: [Contact Info]
- **Cyber Insurance**: [Contact Info]
- **Privacy Commissioner**: [Contact Info]
- **Industry Regulators**: [Contact Info]
- **Forensic Firm**: [Contact Info]

---

## Incident Classification

### Severity Levels

#### **Level 1: CRITICAL**
- **Description**: Severe impact on operations, data, or reputation
- **Examples**: 
  - Ransomware encryption of critical systems
  - Large-scale data breach with sensitive information
  - Successful attack on critical infrastructure
  - Active exploitation with significant data exfiltration
- **Response Time**: Immediate (within 15 minutes)
- **Escalation**: Executive team, legal, external advisors
- **After-Hours**: All hands on deck

#### **Level 2: HIGH**
- **Description**: Significant impact on business operations or security
- **Examples**:
  - Malware infection on multiple systems
  - Unauthorized access to sensitive systems
  - Confirmed data exfiltration (limited scope)
  - Targeted phishing campaign
- **Response Time**: Within 1 hour
- **Escalation**: Incident Response Manager, relevant department heads
- **After-Hours**: Core team activation

#### **Level 3: MEDIUM**
- **Description**: Moderate impact, contained to specific systems
- **Examples**:
  - Isolated malware detection
  - Suspicious network activity
  - Minor unauthorized access attempt (blocked)
  - Policy violations with security implications
- **Response Time**: Within 4 hours
- **Escalation**: Security Lead, IT Operations
- **After-Hours**: On-call security team

#### **Level 4: LOW**
- **Description**: Minimal impact, no immediate threat
- **Examples**:
  - Failed login attempts (within threshold)
  - Suspicious email (not clicked)
  - Minor policy violations
  - Potential vulnerabilities identified
- **Response Time**: Next business day
- **Escalation**: Standard security team
- **After-Hours**: Log for review

---

## Response Phases

### Phase 1: PREPARATION

**Objective**: Establish readiness before incidents occur

#### Key Activities:
- ☐ Maintain and update this incident response plan
- ☐ Conduct regular training and tabletop exercises
- ☐ Deploy and maintain security monitoring tools
- ☐ Establish and test backup systems
- ☐ Create incident response playbooks for common scenarios
- ☐ Maintain current contact lists
- ☐ Pre-position forensic tools and documentation templates
- ☐ Establish relationships with external resources

#### Tools and Resources:
- Security Information and Event Management (SIEM) system
- Endpoint Detection and Response (EDR) tools
- Network traffic analysis tools
- Forensic imaging software
- Incident tracking system
- Communication platforms (secured)

---

### Phase 2: DETECTION AND ANALYSIS

**Objective**: Identify and assess potential security incidents

#### Initial Detection Sources:
- ✅ Automated security alerts (SIEM, IDS/IPS, EDR)
- ✅ User reports (Help Desk, email, phone)
- ✅ Threat intelligence feeds
- ✅ External notifications (law enforcement, partners)
- ✅ System administrators observations
- ✅ Audit log reviews

#### Initial Assessment Checklist:

```
DATE/TIME DETECTED: _______________
DETECTED BY: _______________
DETECTION METHOD: _______________

INITIAL OBSERVATIONS:
☐ What systems/assets are affected?
  _________________________________________

☐ What is the suspected type of incident?
  ☐ Malware  ☐ Unauthorized Access  ☐ Data Breach
  ☐ DDoS  ☐ Phishing  ☐ Other: __________

☐ What is the estimated scope?
  ☐ Single workstation  ☐ Multiple workstations
  ☐ Servers  ☐ Network infrastructure
  ☐ Cloud services  ☐ Unknown

☐ Is sensitive data potentially involved?
  ☐ Yes - Type: _______  ☐ No  ☐ Unknown

☐ Are systems currently operational?
  ☐ Yes  ☐ Partially  ☐ No

☐ Preliminary severity assessment:
  ☐ Level 1 (Critical)  ☐ Level 2 (High)
  ☐ Level 3 (Medium)  ☐ Level 4 (Low)

IMMEDIATE ACTIONS TAKEN:
_________________________________________
_________________________________________

INCIDENT RESPONSE MANAGER NOTIFIED: ☐ Yes  ☐ No
TIME NOTIFIED: _______________
```

#### Analysis Activities:
1. **Validate the incident** - Is this a real security incident?
2. **Determine scope** - What systems and data are affected?
3. **Assess impact** - What is the business impact?
4. **Identify indicators of compromise (IOCs)** - What artifacts can be found?
5. **Determine persistence mechanisms** - How is the threat maintaining access?
6. **Assess data exfiltration** - Was data stolen?

---

### Phase 3: CONTAINMENT

**Objective**: Limit the spread and impact of the incident

#### Short-Term Containment (Immediate)

**Priority**: Stop the bleeding, preserve evidence

Actions:
- ☐ **Isolate affected systems** (disconnect network, not power off)
- ☐ **Block malicious IPs/domains** at firewall/proxy
- ☐ **Disable compromised user accounts**
- ☐ **Revoke access tokens/credentials**
- ☐ **Implement emergency patches** if vulnerability exploited
- ☐ **Increase monitoring** on adjacent systems
- ☐ **Preserve evidence** (memory dumps, logs, disk images)

**Decision Matrix:**

| Scenario | Recommended Action | Considerations |
|----------|-------------------|----------------|
| Single infected workstation | Network isolation | Low impact on operations |
| Critical server compromise | Traffic filtering, monitoring | Balance security vs. availability |
| Ransomware outbreak | Immediate network segmentation | Prevent spread to backups |
| Active data exfiltration | Block egress traffic, preserve logs | Legal evidence preservation |

#### Long-Term Containment

**Priority**: Maintain business operations while preparing for eradication

Actions:
- ☐ **Deploy temporary workarounds** for affected services
- ☐ **Implement additional monitoring** on recovered systems
- ☐ **Harden defenses** in unaffected areas
- ☐ **Create clean system images** for recovery
- ☐ **Validate backup integrity**
- ☐ **Prepare communication materials**

---

### Phase 4: ERADICATION

**Objective**: Remove the threat from the environment

#### Eradication Activities:

- ☐ **Remove malware** from all affected systems
- ☐ **Delete unauthorized accounts and tools**
- ☐ **Close exploited vulnerabilities** (patch, configure)
- ☐ **Revoke compromised certificates/keys**
- ☐ **Remove backdoors and persistence mechanisms**
- ☐ **Reset all potentially compromised credentials**
- ☐ **Review and update security controls**

#### Validation Steps:

- ☐ **Scan all systems** with updated anti-malware tools
- ☐ **Verify no IOCs remain** in the environment
- ☐ **Confirm vulnerabilities are patched**
- ☐ **Review logs** for suspicious activity
- ☐ **Conduct threat hunting** for related activity
- ☐ **Obtain third-party validation** if required

---

### Phase 5: RECOVERY

**Objective**: Restore systems and resume normal operations

#### Recovery Checklist:

- ☐ **Restore from clean backups** or rebuild systems
- ☐ **Apply all security patches** before reconnection
- ☐ **Change all credentials** on restored systems
- ☐ **Implement enhanced monitoring** initially
- ☐ **Gradually restore services** (test each one)
- ☐ **Verify system functionality** and security
- ☐ **Monitor for signs of re-infection**
- ☐ **Resume normal operations** with vigilance

#### Validation Before Full Recovery:

```
SYSTEM RECOVERY VALIDATION CHECKLIST

System Name: _______________
Recovery Date: _______________
Validated By: _______________

☐ System rebuilt from clean image or verified backup
☐ All patches and updates applied
☐ All credentials changed
☐ Security tools installed and functioning
☐ Monitoring confirmed operational
☐ No IOCs detected in scans
☐ Functional testing completed successfully
☐ Security testing passed
☐ Documentation updated
☐ Business unit notified of restoration

APPROVED FOR PRODUCTION: ☐ Yes  ☐ No
APPROVER: _______________  DATE: _______________
```

---

### Phase 6: POST-INCIDENT ACTIVITY

**Objective**: Learn from the incident and improve defenses

#### Lessons Learned Meeting

**Timing**: Within 2 weeks of incident closure  
**Attendees**: Incident response team, affected stakeholders, management

**Agenda:**
1. Incident timeline and chronology
2. What was done well?
3. What could be improved?
4. What actions prevented greater damage?
5. What actions should be taken going forward?

#### Key Questions:

- ☐ How was the incident detected? Can detection be improved?
- ☐ Was the response timely and effective?
- ☐ Were communication protocols followed?
- ☐ What was the root cause?
- ☐ What technical controls failed or worked?
- ☐ What process improvements are needed?
- ☐ What policy changes should be considered?
- ☐ What training gaps were identified?

#### Action Items:

Document specific improvement actions with:
- Description of action
- Owner responsible
- Target completion date
- Success criteria

---

## Communication Protocols

### Internal Communications

#### Executive Notification
**Timing**: Immediate for Level 1, within 2 hours for Level 2  
**Method**: Phone call followed by written brief  
**Content**: 
- Nature of incident
- Systems/data affected
- Business impact
- Actions taken
- Estimated resolution time

#### Employee Communications
**Timing**: As soon as feasible, balance transparency with investigation needs  
**Method**: Email, intranet, all-hands meeting  
**Content**:
- What happened (high-level)
- What employees should do
- What organization is doing
- Where to get updates

### External Communications

#### Regulatory Notifications

**Privacy Breach Notification:**
- **PIPEDA**: Office of the Privacy Commissioner of Canada
  - Timing: As soon as feasible
  - Method: Online form submission
  
- **MFIPPA**: Information and Privacy Commissioner of Ontario
  - Timing: As soon as reasonably possible
  - Method: Email or written notice

#### Affected Individuals
**Timing**: As required by law or as soon as feasible  
**Method**: Direct communication (email, letter)  
**Content**:
- Description of breach
- Type of information involved
- Actions taken
- Steps individuals should take
- Contact information for questions

#### Media Relations
**Approval**: All media communications approved by Communications Lead and Legal  
**Spokesperson**: Designated by executive team  
**Talking Points**: Prepared in advance, reviewed by legal

---

## Documentation Requirements

### Incident Log Template

```
INCIDENT RESPONSE LOG

Incident ID: _______________
Start Date/Time: _______________
End Date/Time: _______________
Incident Response Manager: _______________

CHRONOLOGICAL LOG OF ACTIONS:

[Date/Time] | [Person] | [Action Taken] | [Result]
___________|__________|_______________|__________


EVIDENCE COLLECTED:

Item | Type | Location | Custodian | Date/Time
-----|------|----------|-----------|----------


KEY DECISIONS MADE:

Decision | Decision Maker | Rationale | Date/Time
---------|---------------|-----------|----------
```

### Required Documentation:

For each incident, maintain:
- Initial detection and assessment reports
- Chronological log of all actions taken
- Communications sent (internal and external)
- Evidence collected (with chain of custody)
- Analysis findings and reports
- Recovery validation records
- Post-incident review report
- Lessons learned and action items

---

## Appendix: Quick Reference

### Emergency Contact Card

```
INCIDENT RESPONSE QUICK REFERENCE

REPORT SECURITY INCIDENT:
Phone: [Number] (24/7)
Email: security@[organization].com

INCIDENT RESPONSE MANAGER:
Name: [Name]
Phone: [Number]
After-hours: [Number]

KEY FIRST STEPS:
1. Don't power off affected systems
2. Disconnect from network if spreading
3. Note time and observations
4. Contact security team immediately
5. Preserve all evidence
```

---

**Document Version**: 1.0  
**Classification**: INTERNAL USE ONLY  
**Next Review**: [Date + 1 year]

*This template should be customized to your organization's specific needs, systems, and regulatory requirements.*
