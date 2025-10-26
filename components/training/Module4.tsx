/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import { useMobileDetection, getMobileOptimizedClasses, getOptimizedLayoutClasses } from '../../hooks/useMobileDetection';
import QuizComponent from '../common/QuizComponent';
import DownloadableResources from '../common/DownloadableResources';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module4: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz' | 'resources'>('content');
    const detection = useMobileDetection();
    
    const mobileClasses = getMobileOptimizedClasses(detection);
    const layoutClasses = getOptimizedLayoutClasses(detection);

    const sampleResources = [
        {
            id: 'data-classification-matrix',
            title: 'Data Classification Matrix',
            description: 'Comprehensive framework for classifying data based on sensitivity, value, and regulatory requirements with specific handling procedures.',
            type: 'template' as const,
            size: '4 pages',
            previewContent: `DATA CLASSIFICATION MATRIX

CLASSIFICATION LEVELS AND CRITERIA

LEVEL 1: PUBLIC DATA
Definition: Information intended for public disclosure
Examples:
- Published reports and documents
- Public meeting agendas and minutes
- Press releases
- Marketing materials
- Public website content
- General organizational information

Sensitivity: None
Legal/Regulatory Impact: None
Business Impact if Disclosed: None

Security Controls:
□ No special access controls required
□ Standard backup procedures
□ Basic integrity controls

Handling Requirements:
- Can be freely shared
- No encryption required
- Standard disposal (recycling acceptable)

LEVEL 2: INTERNAL USE
Definition: Information for internal use within organization
Examples:
- Internal policies and procedures
- Department budgets and planning documents
- Internal communications
- Project documentation
- Employee directories
- Meeting notes and presentations

Sensitivity: Low
Legal/Regulatory Impact: Low
Business Impact if Disclosed: Minor inconvenience, limited damage

Security Controls:
□ Access limited to employees/authorized persons
□ Password protection for digital documents
□ Standard backup and retention
□ Basic physical security

Handling Requirements:
- Share only within organization
- Secure transmission (encrypted email, secure file share)
- Lock screens when unattended
- Secure disposal (shredding for paper)

LEVEL 3: CONFIDENTIAL DATA
Definition: Sensitive information requiring protection
Examples:
- Employee personal information (addresses, SINs, salaries)
- Citizen personal information
- Financial records
- Proprietary business information
- Contract negotiations
- Strategic plans
- Performance reviews
- Investigative files

Sensitivity: High
Legal/Regulatory Impact: Significant (PIPEDA, MFIPPA violations)
Business Impact if Disclosed: Significant harm to individuals or organization

Security Controls:
□ Role-based access controls
□ Multi-factor authentication
□ Encryption at rest and in transit
□ Comprehensive audit logging
□ Regular access reviews
□ Enhanced backup security
□ DLP (Data Loss Prevention) monitoring

Handling Requirements:
- Need-to-know basis access only
- Encryption required for transmission
- Encrypted storage required
- Secure disposal (certified shredding/data wiping)
- No email of unencrypted files
- Watermarking recommended
- Clean desk policy

LEVEL 4: RESTRICTED DATA
Definition: Highly sensitive requiring maximum protection
Examples:
- Social Insurance Numbers (SIN)
- Banking information
- Health information
- Criminal records
- Trade secrets
- M&A information
- Passwords and encryption keys
- Security incident details
- Legal proceedings (confidential)

Sensitivity: Critical
Legal/Regulatory Impact: Severe (privacy breaches, legal violations)
Business Impact if Disclosed: Severe harm to individuals, major business damage

Security Controls:
□ Strict role-based access controls
□ Multi-factor authentication (required)
□ Strong encryption (AES-256) at rest and in transit
□ Dedicated secure systems
□ Enhanced audit logging and monitoring
□ Isolated network segments
□ Privileged access management (PAM)
□ Regular security assessments
□ Incident response procedures

Handling Requirements:
- Extremely limited access (documented justification required)
- Access approval process
- Dedicated secure systems only
- No removable media
- Encrypted transmission only (point-to-point)
- Certified secure disposal (witnessed destruction certificates)
- Access logged and monitored in real-time
- Background checks for access
- Clean desk policy (mandatory)

---

DATA CLASSIFICATION DECISION TREE

Start: What type of information is this?

Is it publicly available or intended for public disclosure?
→ YES: PUBLIC DATA (Level 1)
→ NO: Continue

Does it contain personal information about individuals?
→ YES: At least CONFIDENTIAL (Level 3) - possibly RESTRICTED (Level 4)
→ NO: Continue

Would unauthorized disclosure harm the organization?
→ SEVERE HARM: RESTRICTED (Level 4)
→ SIGNIFICANT HARM: CONFIDENTIAL (Level 3)
→ MINOR HARM: INTERNAL USE (Level 2)
→ NO HARM: PUBLIC (Level 1)

Are there legal/regulatory requirements for this data?
→ STRICT REQUIREMENTS: RESTRICTED (Level 4)
→ MODERATE REQUIREMENTS: CONFIDENTIAL (Level 3)
→ BASIC REQUIREMENTS: INTERNAL USE (Level 2)

---

DATA HANDLING QUICK REFERENCE

Storage:
Public: Any approved storage
Internal: Password-protected files/folders
Confidential: Encrypted storage
Restricted: Encrypted, isolated secure systems

Transmission:
Public: Any method
Internal: Secure email, file sharing
Confidential: Encrypted email, secure file transfer
Restricted: Encrypted, dedicated secure channels

Access:
Public: Anyone
Internal: Employees
Confidential: Need-to-know with access controls
Restricted: Extremely limited, approved access only

Disposal:
Public: Recycle/trash
Internal: Shred or secure deletion
Confidential: Cross-cut shred or certified data wipe
Restricted: Witnessed destruction with certificate

Labeling:
Public: Optional
Internal: "Internal Use Only"
Confidential: "CONFIDENTIAL"
Restricted: "RESTRICTED - Handle with Extreme Care"

---

CLASSIFICATION RESPONSIBILITIES

Data Owners (Business Units):
- Classify data created or managed
- Review and update classifications
- Approve access requests
- Ensure compliance with handling requirements

IT Department:
- Implement technical security controls
- Provide secure storage and transmission
- Monitor for compliance
- Support access management

Privacy Office:
- Review classifications involving personal info
- Ensure privacy law compliance
- Provide guidance on requirements
- Audit compliance

Legal:
- Advise on regulatory requirements
- Review classifications for legal risk
- Support incident response

All Employees:
- Handle data according to classification
- Report suspected mishandling
- Complete classification training
- Protect credentials and access

---

RECLASSIFICATION

Review classifications when:
□ Regulatory requirements change
□ Business context changes
□ Data ages or becomes historical
□ Public disclosure occurs
□ Risk assessment identifies issues

Downgrade Example:
Confidential employee salary → Internal (10 years after termination)

Upgrade Example:
Internal project plan → Confidential (becomes strategic/competitive)

---

INCIDENT REPORTING

Report immediately if:
□ Classified data sent to wrong recipient
□ Unencrypted confidential data transmitted
□ Access by unauthorized person
□ Lost or stolen device with classified data
□ Suspected data breach

Contact: [Privacy Officer / Security Team]

---

TRAINING REQUIREMENTS

All employees: Annual data classification training
Data owners: Specialized classification training
Administrators: Advanced security controls training
Contractors: Classification awareness before access`
        },
        {
            id: 'retention-schedule-template',
            title: 'Records Retention Schedule Template',
            description: 'Template for developing and managing records retention schedules compliant with Ontario requirements.',
            type: 'template' as const,
            size: '10 pages',
            previewContent: `RECORDS RETENTION SCHEDULE TEMPLATE

ORGANIZATION: ___________________________
APPROVED BY: ____________________________
EFFECTIVE DATE: _________________________
REVIEW DATE: ____________________________

INTRODUCTION

Purpose:
This retention schedule establishes minimum and maximum retention periods for records based on legal, operational, and historical requirements.

Scope:
Applies to all records in any format (paper, electronic, audio, video) created or received by the organization.

Legal Authority:
- Municipal Freedom of Information and Protection of Privacy Act (MFIPPA)
- Municipal Act
- Employment Standards Act
- Accessibility for Ontarians with Disabilities Act
- Industry-specific regulations

---

RETENTION SCHEDULE FORMAT

For each record type:
Record Series: Name of record type
Description: What it includes
Office of Primary Responsibility: Department that owns the record
Retention: Active + Inactive periods
Disposition: What happens after retention period
Legal Authority: Why this retention period

---

ADMINISTRATIVE RECORDS

1. BOARD/COUNCIL RECORDS

Record Series: Council Meeting Minutes
Description: Official minutes of council/board meetings
Office: Clerk's Office
Retention: Permanent
Disposition: Transfer to archives
Legal Authority: Municipal Act s.239
Notes: Historical significance

Record Series: Council Agendas and Packages
Description: Meeting agendas, reports, supporting documents
Office: Clerk's Office
Retention: Permanent
Disposition: Transfer to archives
Legal Authority: Municipal Act
Notes: Historical and legal reference

Record Series: Bylaws and Resolutions
Description: All passed bylaws and resolutions
Office: Clerk's Office
Retention: Permanent
Disposition: Transfer to archives
Legal Authority: Municipal Act
Notes: Legal documents

Record Series: Committee Meeting Records
Description: Minutes, agendas, reports for committees
Office: Committee Clerk
Retention: 7 years after last action
Disposition: Review for archives, then destroy
Legal Authority: Administrative requirements
Notes: Some may have historical value

2. FINANCIAL RECORDS

Record Series: General Ledgers
Description: Summary of all financial transactions
Office: Finance
Retention: Permanent
Disposition: Transfer to archives after 7 years in office
Legal Authority: Municipal Act
Notes: Historical and audit reference

Record Series: Accounts Payable/Receivable
Description: Invoices, receipts, payment records
Office: Finance
Retention: 7 years after transaction
Disposition: Secure destruction
Legal Authority: Income Tax Act, CRA requirements
Notes: Subject to audit

Record Series: Payroll Records
Description: Employee pay information, deductions, benefits
Office: Finance/HR
Retention: 7 years after last payment
Disposition: Secure destruction
Legal Authority: Income Tax Act, Employment Standards Act
Notes: Contains personal information - confidential

Record Series: Budget Documents
Description: Annual budgets, forecasts, variance reports
Office: Finance
Retention: Permanent
Disposition: Transfer to archives
Legal Authority: Municipal Act
Notes: Historical significance

Record Series: Audit Reports
Description: External and internal audit reports
Office: Finance
Retention: Permanent
Disposition: Transfer to archives after 7 years
Legal Authority: Municipal Act
Notes: Significant accountability documents

Record Series: Tax Bills and Assessment Rolls
Description: Property tax billings and assessments
Office: Finance/Assessment
Retention: 7 years after tax year
Disposition: Review for archives, then destroy
Legal Authority: Municipal Act, Assessment Act
Notes: Legal and reference value

3. HUMAN RESOURCES RECORDS

Record Series: Employee Personnel Files
Description: Employment records, performance reviews, discipline
Office: Human Resources
Retention: 7 years after termination
Disposition: Secure destruction
Legal Authority: Employment Standards Act
Notes: Confidential - contains personal information

Record Series: Job Applications (Not Hired)
Description: Applications, resumes, interview notes
Office: Human Resources
Retention: 1 year after hiring decision
Disposition: Secure destruction
Legal Authority: Human Rights Code (for complaints)
Notes: May contain personal information

Record Series: Training Records
Description: Employee training attendance, certifications
Office: Human Resources
Retention: 2 years after training or until employment ends
Disposition: Destroy
Legal Authority: AODA, WHMIS, other training requirements
Notes: Occupational health and safety requirements

Record Series: Collective Agreements
Description: Union contracts and agreements
Office: Human Resources
Retention: 10 years after expiry
Disposition: Review for archives
Legal Authority: Labour Relations Act
Notes: Legal documents

Record Series: Workplace Accident Reports
Description: WSIB forms, incident reports, investigations
Office: Human Resources / Health & Safety
Retention: 7 years after incident
Disposition: Secure destruction
Legal Authority: Workplace Safety and Insurance Act
Notes: May be needed for claims

4. LEGAL RECORDS

Record Series: Contracts and Agreements
Description: Legal contracts with vendors, partners
Office: Legal / Originating Department
Retention: 7 years after expiration or completion
Disposition: Destroy (unless archival value)
Legal Authority: Limitations Act
Notes: Major contracts may have archival value

Record Series: Legal Opinions and Advice
Description: Legal advice, opinions, correspondence
Office: Legal
Retention: 7 years or duration of issue + 2 years
Disposition: Review for specific retention needs
Legal Authority: Solicitor-client privilege
Notes: Privileged - confidential

Record Series: Litigation Files
Description: Court documents, proceedings, settlements
Office: Legal
Retention: 7 years after case closed
Disposition: Review for permanent retention
Legal Authority: Limitations Act
Notes: May have significant legal/historical value

Record Series: Insurance Policies and Claims
Description: Insurance policies, claims, correspondence
Office: Risk Management
Retention: 7 years after expiry or claim settlement
Disposition: Destroy
Legal Authority: Insurance Act
Notes: Related to liability management

5. INFORMATION TECHNOLOGY RECORDS

Record Series: System Audit Logs
Description: Security logs, access logs, system events
Office: IT
Retention: 1 year (unless incident, then 7 years)
Disposition: Secure deletion
Legal Authority: MFIPPA s.10, security requirements
Notes: Privacy and security compliance

Record Series: Backup Tapes/Data
Description: System and data backups
Office: IT
Retention: Rotate per backup schedule (30 days typical)
Disposition: Secure overwriting/destruction
Legal Authority: Business continuity requirements
Notes: Maintain retention of backed-up data

Record Series: Software Licenses
Description: Software licenses and agreements
Office: IT
Retention: Duration of license + 2 years
Disposition: Destroy
Legal Authority: Contract law
Notes: Needed for audits and renewals

Record Series: IT Policies and Procedures
Description: IT policies, standards, procedures
Office: IT
Retention: Until superseded + 2 years
Disposition: Review for archives
Legal Authority: Administrative
Notes: May have historical value

6. RECORDS MANAGEMENT RECORDS

Record Series: Records Retention Schedule
Description: This document
Office: Records Manager / Clerk
Retention: Until superseded + 7 years
Disposition: Transfer to archives
Legal Authority: Administrative
Notes: Historical documentation

Record Series: Disposal Certificates
Description: Records of destroyed records
Office: Records Manager
Retention: Permanent
Disposition: Transfer to archives
Legal Authority: Accountability
Notes: Proof of proper disposal

Record Series: Access to Information Requests
Description: FOI/access requests and responses
Office: FOI Coordinator / Clerk
Retention: 7 years after request completed
Disposition: Destroy
Legal Authority: MFIPPA
Notes: May contain personal information

Record Series: Privacy Breach Reports
Description: Privacy breach investigations and responses
Office: Privacy Officer
Retention: 7 years after incident resolved
Disposition: Secure destruction
Legal Authority: MFIPPA, PIPEDA
Notes: Confidential - contains personal information

---

RETENTION CALCULATION EXAMPLES

"7 years after termination"
Employee terminated June 30, 2023
Retain until: June 30, 2030
Destroy: July 2030 or later

"Permanent"
Never destroy without archival appraisal
Transfer to archives when no longer active

"Until superseded + 2 years"
Policy dated January 2020
Superseded January 2023
Retain until: January 2025
Destroy: February 2025 or later

---

DISPOSITION METHODS

Secure Destruction:
- Paper: Cross-cut shredding (DIN P-4 minimum)
- Digital: DOD-standard data wiping or physical destruction
- Certification: Obtain destruction certificate

Transfer to Archives:
- Appraisal by archivist
- Proper packaging and labeling
- Transfer documentation
- Ongoing preservation

Review:
- Archival appraisal needed
- Determine historical value
- May extend retention or transfer to archives

---

RESPONSIBILITIES

Department Heads:
- Ensure compliance with retention schedule
- Approve retention of records
- Coordinate disposition activities

Records Manager / Clerk:
- Maintain retention schedule
- Provide guidance and training
- Coordinate archival transfers
- Document disposals

Employees:
- Follow retention requirements
- Don't destroy records prematurely
- Consult before disposing uncertain records

Legal Hold:
STOP - Do not destroy records subject to:
- Ongoing litigation
- Access requests
- Investigations
- Audit
Consult Legal before any disposition

---

SCHEDULE MAINTENANCE

Annual Review:
- Update for legal changes
- Incorporate new record types
- Remove obsolete entries

Approval Process:
- Department consultation
- Legal review
- Privacy review
- Senior management approval
- Board/Council adoption

Version Control:
- Track all changes
- Maintain previous versions
- Communicate updates`
        },
        {
            id: 'records-disposal-checklist',
            title: 'Records Disposal Checklist',
            description: 'Checklist for ensuring compliant and secure disposal of records at end of retention period.',
            type: 'checklist' as const,
            size: '3 pages',
            previewContent: `RECORDS DISPOSAL CHECKLIST

PRE-DISPOSAL ASSESSMENT

□ Step 1: Verify Retention Period Expired
  □ Check retention schedule for record type
  □ Calculate retention period accurately
  □ Confirm retention period has elapsed
  □ Document retention calculation

□ Step 2: Legal Hold Check
  □ Verify no active litigation involving records
  □ Confirm no ongoing investigations
  □ Check for pending access/FOI requests
  □ Verify no audit holds
  □ Obtain legal clearance if uncertain

□ Step 3: Records Identification
  □ Create inventory of records for disposal
  □ Include: Record type, dates, volume, location
  □ Identify format (paper, electronic, other)
  □ Note data classification level
  □ Document business unit/department

□ Step 4: Archival Appraisal (if required)
  □ Determine if records have historical value
  □ Consult with archivist if permanent retention possible
  □ Document appraisal decision
  □ If historical value: Transfer to archives instead of disposal
  □ If no historical value: Proceed with disposal

□ Step 5: Obtain Approvals
  □ Department head approval
  □ Records manager approval
  □ Privacy officer approval (for personal information)
  □ Legal approval (for sensitive records)
  □ Document all approvals with dates and signatures

DISPOSAL METHOD SELECTION

□ Step 6: Determine Appropriate Disposal Method
  
  For PUBLIC classified records:
  □ Recycling acceptable
  □ Regular trash acceptable
  □ No special security required
  
  For INTERNAL classified records:
  □ Paper: Standard shredding
  □ Electronic: Standard deletion or reformatting
  □ Physical media: Disposal as e-waste
  
  For CONFIDENTIAL classified records:
  □ Paper: Cross-cut shredding (DIN P-4 minimum)
  □ Electronic: Secure data wiping (DOD 5220.22-M or equivalent)
  □ Physical media: Physical destruction or degaussing
  □ Obtain destruction certificate
  
  For RESTRICTED classified records:
  □ Paper: Cross-cut shredding with witness
  □ Electronic: Certified secure data wiping (multi-pass)
  □ Physical media: Physical destruction (drilling, crushing)
  □ Witnessed destruction with certificate
  □ Chain of custody maintained until destruction

DISPOSAL EXECUTION

□ Step 7: Prepare Records for Disposal
  □ Remove from active filing
  □ Box and label for disposal
  □ Maintain chain of custody
  □ Keep records secure until destroyed
  □ Do not mix classification levels

□ Step 8: Select Disposal Vendor (if outsourcing)
  □ Vendor certified for secure destruction
  □ Vendor provides destruction certificates
  □ Vendor has adequate insurance
  □ Vendor agrees to confidentiality terms
  □ Review vendor security practices
  □ Verify vendor compliance with standards

□ Step 9: Execute Disposal
  
  On-Site Disposal:
  □ Use approved shredding equipment
  □ Witness destruction (for restricted data)
  □ Ensure complete destruction
  □ Document date, time, witnesses
  
  Off-Site Disposal:
  □ Use locked bins/containers
  □ Maintain chain of custody to vendor
  □ Vendor provides pickup receipt
  □ Obtain destruction certificate
  □ Verify certificate details match inventory

□ Step 10: Electronic Records Disposal
  □ Identify all copies and backups
  □ Remove from production systems
  □ Remove from backup systems
  □ Remove from archived systems
  □ Use certified data wiping software or physical destruction
  □ Verify deletion/destruction
  □ Document removal from all systems

DOCUMENTATION AND REPORTING

□ Step 11: Complete Disposal Documentation
  □ Disposal certificate/log completed
  □ Include: Record type, volume, destruction date
  □ Include: Destruction method used
  □ Include: Approvals obtained
  □ Include: Vendor information (if used)
  □ Attach destruction certificates from vendor

□ Step 12: Update Records Inventory
  □ Remove disposed records from inventory
  □ Update records management database
  □ Note disposal in file tracking system
  □ Retain disposal documentation permanently

□ Step 13: Maintain Disposal Records
  □ File disposal certificate
  □ Maintain as permanent record
  □ Store securely
  □ Make available for audits
  □ Required for accountability and compliance

PRIVACY AND SECURITY VERIFICATION

□ Step 14: Privacy Compliance Check
  □ Personal information properly destroyed
  □ No unauthorized disclosure during disposal
  □ Privacy officer notified of completion
  □ Disposal logged for privacy compliance

□ Step 15: Security Compliance Check
  □ Confidential data properly destroyed
  □ Chain of custody maintained
  □ Destruction certificates obtained
  □ No security incidents during disposal

POST-DISPOSAL REVIEW

□ Step 16: Quality Assurance
  □ Verify destruction certificate accuracy
  □ Confirm all copies destroyed
  □ Check for any missed records
  □ Review process for improvements

□ Step 17: Incident Review
  □ Any incidents during disposal?
  □ Any records found that should not be disposed?
  □ Any security or privacy concerns?
  □ Document and address issues

ANNUAL DISPOSAL PROGRAM REVIEW

□ Review disposal schedule compliance
□ Assess disposal vendor performance
□ Update disposal procedures as needed
□ Train staff on disposal requirements
□ Report disposal metrics to management

COMMON MISTAKES TO AVOID

□ Don't dispose before retention period expires
□ Don't dispose records on legal hold
□ Don't mix classification levels in disposal
□ Don't use inadequate destruction methods
□ Don't fail to obtain required approvals
□ Don't forget backup copies
□ Don't lose chain of custody
□ Don't fail to document disposal
□ Don't dispose potential archival records without appraisal

EMERGENCY CONTACT

If you discover records disposed in error or have questions:
Contact: [Records Manager]
Phone: _______________
Email: _______________

If you discover a privacy/security incident during disposal:
Contact: [Privacy Officer / Security Team]
Phone: _______________
Email: _______________`
        }
    ];

    const allQuestions: QuizQuestions = {
        q1: { 
            question: "Your municipal IT department is evaluating cloud storage providers for a new citizen service portal that will collect names, addresses, email addresses, and service request details. The procurement team has identified two finalists: Provider A offers servers in Toronto and Montreal (Canada), while Provider B offers servers in Buffalo, NY and Chicago, IL (USA) at 30% lower cost. Under MFIPPA Section 30.1, what is your compliance requirement?", 
            answer: 'b', 
            options: { 
                a: "Either provider is acceptable as long as they sign data protection agreements", 
                b: "Must use Provider A - personal information must be stored and accessed only in Canada", 
                c: "Can use Provider B if citizens are notified via terms of service acceptance" 
            },
            explanation: "MFIPPA Section 30.1 explicitly requires that personal information collected by Ontario municipalities must be stored and accessed only in Canada, unless specific exemptions apply (individual consent or Commissioner authorization). This requirement exists to protect personal information from foreign legal frameworks such as the USA PATRIOT Act and CLOUD Act that could compel disclosure. The cost savings do not override this legal requirement. Provider A (with Canadian data centers) must be selected. If Canadian options weren't available, the municipality would need to: (1) Obtain explicit informed consent from each individual (impractical for municipal services), or (2) Seek specific authorization from the Information and Privacy Commissioner of Ontario, or (3) Not proceed with the project."
        },
        q2: { 
            question: "Your HR department is cleaning up storage and asks about disposing of employee personnel files. An employee named Sarah left the organization on December 15, 2018. It's now January 2025. According to Ontario employment standards and records retention best practices, what should you do with Sarah's personnel file?", 
            answer: 'c', 
            options: { 
                a: "Dispose immediately - she left over 3 years ago", 
                b: "Retain until December 2023 (5 years) then dispose", 
                c: "Retain until December 2025 (7 years after termination) before secure disposal" 
            },
            explanation: "Ontario employment standards and best practices generally require employee records to be retained for 7 years after termination. This retention period ensures: (1) Legal compliance: Supports potential legal claims, Employment Standards Act compliance, tax audits, (2) Reference verification: Enables employment verification for former employees, (3) Pension/benefits administration: Maintains records needed for pension calculations and benefits questions, (4) Historical documentation: Preserves institutional knowledge about employment relationships. Since Sarah left in December 2018, her records must be retained until December 2025 (7 full years after termination). After that date, the records should be securely destroyed using appropriate methods (e.g., shredding for paper, secure erasure for digital files) to prevent unauthorized access to personal information."
        },
        q3: { 
            question: "Your organization receives various types of information daily: public meeting agendas, internal budget spreadsheets, employee social insurance numbers, citizen complaint details, and marketing materials. The team is confused about how to handle each type. What is the primary purpose of implementing a data classification framework in records management?", 
            answer: 'b', 
            options: { 
                a: "To organize all files in alphabetical order for easier retrieval", 
                b: "To apply appropriate security controls, access restrictions, and retention schedules based on data sensitivity and value", 
                c: "To reduce storage costs by deleting files that don't seem immediately important" 
            },
            explanation: "Data classification ensures that appropriate security controls, access restrictions, and retention schedules are applied based on the sensitivity and value of information. A proper classification framework: (1) Identifies sensitivity levels: Public, Internal, Confidential, Restricted (or similar categories), (2) Prescribes security controls: Confidential data requires encryption, access controls, audit logging; Public data needs minimal controls, (3) Defines handling requirements: How to store, transmit, share, and dispose of each classification, (4) Sets retention schedules: How long each type must be kept before secure disposal, (5) Assigns access rights: Who can view, edit, or share each classification level. In the scenario: Public meeting agendas = Public (minimal controls), Internal budgets = Internal (moderate controls), SINs = Confidential/Restricted (strong controls, limited access), Citizen complaints = Confidential (strong controls), Marketing = Public/Internal (varies)."
        },
        q4: { 
            question: "Your municipality is implementing Microsoft 365 cloud storage for email and file collaboration. The IT vendor recommends using Microsoft's North American multi-region storage for 'better redundancy and performance.' Under Ontario's records management requirements and MFIPPA compliance, what critical factors must you consider and require before proceeding?", 
            answer: 'a', 
            options: { 
                a: "Data residency (Canada-only storage), security controls (encryption, access logs), vendor MFIPPA compliance, and contractual safeguards", 
                b: "Only the monthly subscription cost and whether it fits the department budget", 
                c: "Only the technical features like storage capacity and collaboration tools offered" 
            },
            explanation: "Cloud storage implementations by Ontario municipalities must consider multiple critical compliance factors: (1) Data residency: MFIPPA Section 30.1 requires Canadian data storage - configure Microsoft 365 to use only Canadian data centers (Toronto/Quebec regions), not 'North American' multi-region which includes USA, (2) Security controls: Encryption at rest and in transit, multi-factor authentication, access logging and monitoring, regular security assessments, (3) Vendor compliance: Vendor must acknowledge and comply with MFIPPA requirements, provide evidence of security certifications (SOC 2, ISO 27001), (4) Contractual safeguards: Data processing agreements specifying Canadian residency, breach notification requirements, right to audit, data portability and deletion rights, (5) Access controls: Role-based access, principle of least privilege. Simply accepting vendor default settings (like North American multi-region) without these considerations creates MFIPPA compliance violations and security risks."
        },
        q5: {
            question: "Your municipal archives department is developing retention schedules for various record types: routine correspondence (2 years), building permits (75 years), financial ledgers (permanent), historic council meeting minutes (permanent), and temporary construction signs permits (1 year). A councillor asks why some records are kept permanently while others are destroyed. What is the maximum retention period under Ontario's guidelines, and what determines this?",
            answer: 'c',
            options: {
                a: "Maximum 10 years for all records to reduce storage costs and administrative burden",
                b: "Maximum 25 years for all records as required by the Municipal Act", 
                c: "Permanent retention for records of historical, legal, or evidential significance to the community",
                d: "Maximum 50 years for any municipal record regardless of significance"
            },
            explanation: "Ontario's municipal records management guidelines recognize that certain records must be retained permanently due to their historical, legal, or evidential significance. Permanent retention is appropriate for: (1) Historical significance: Records documenting important community decisions, development, and events (e.g., council meeting minutes, historic building permits, bylaws), (2) Legal evidence: Records that may be needed indefinitely for legal proceedings or establishing property rights (e.g., land transactions, easements), (3) Accountability: Records demonstrating how government decisions were made and resources managed (e.g., financial ledgers, policy development). The retention period is determined by: value to the community, legal requirements, operational needs, and archival/historical importance. Records without ongoing value are disposed of according to approved retention schedules after their minimum retention period expires, using secure destruction methods to protect any personal information they may contain."
        },
        q6: {
            question: "Your organization has classified various data sets and needs to implement security controls. You have: publicly available service schedules (Public), internal process documentation (Internal), employee salary information (Confidential), and ongoing police investigation files (Restricted). Which classification level requires the highest and most stringent security controls?",
            answer: 'a',
            options: {
                a: "Confidential/Restricted - requires encryption, strict access controls, audit logging, and need-to-know basis access",
                b: "Internal Use - requires basic password protection and standard network access controls only",
                c: "Public - requires no security controls since information is publicly available",
                d: "All classification levels should have identical security controls for consistency"
            },
            explanation: "Confidential and Restricted data classifications require the highest level of security controls to protect sensitive information from unauthorized access, use, or disclosure. Required controls include: (1) Encryption: Data encrypted at rest (in storage) and in transit (during transmission), (2) Access controls: Role-based access, multi-factor authentication, principle of least privilege, need-to-know basis access only, (3) Audit logging: Comprehensive logging of all access and modifications for accountability and forensics, (4) Physical security: Secure storage, locked cabinets, restricted facility access, (5) Secure transmission: Encrypted channels, secure file transfer protocols, no email of unencrypted confidential data, (6) Secure disposal: Cross-cut shredding, certified destruction, secure data wiping. By contrast: Public data needs minimal controls (basic integrity protection), Internal data needs moderate controls (password protection, standard network access), while Confidential/Restricted requires maximum security throughout the data lifecycle."
        },
        q7: {
            question: "Your records department is disposing of 50 boxes of confidential employee health records that have reached the end of their 7-year retention period. A staff member suggests putting them in the regular recycling bins to save the cost of a shredding service. The records contain names, health conditions, and social insurance numbers. What is the primary consideration that must guide your disposal decision?",
            answer: 'b',
            options: {
                a: "Cost efficiency - use the most economical disposal method available",
                b: "Secure destruction to prevent unauthorized recovery of personal and health information",
                c: "Speed of disposal process - dispose as quickly as possible to clear storage space",
                d: "Environmental impact only - prioritize recycling over all other considerations"
            },
            explanation: "Confidential records containing personal information must be securely destroyed using methods that prevent unauthorized recovery. This is not optional - it's required by privacy law. For these health records, appropriate disposal methods include: (1) Physical destruction: Cross-cut shredding (minimum DIN P-4 level), pulping, incineration with certified destruction certificate, (2) Digital destruction: DOD-compliant data wiping, physical destruction of storage media, cryptographic erasure for encrypted data, (3) Documentation: Maintain destruction certificates, log disposal dates and methods, track chain of custody until destruction. Simply recycling confidential records creates serious risks: Privacy breach if records are recovered from recycling bins, MFIPPA/PIPEDA violations with potential fines and Commissioner orders, Reputational damage and loss of public trust, Legal liability if individuals are harmed by information exposure. While cost and environmental impact matter, they cannot override the legal requirement for secure destruction of confidential personal information."
        },
        q8: {
            question: "Your organization is implementing a new data governance framework. Various stakeholders have different ideas about who should classify data: IT says they should do it because they manage the systems, legal says they understand compliance requirements, and senior management wants centralized control. Under proper data governance frameworks, who should have primary responsibility for classifying data, and why?",
            answer: 'c',
            options: {
                a: "IT department only - they manage the systems and understand technical security requirements",
                b: "External consultants - they provide objective, unbiased classification decisions",
                c: "Data owners (business units) in collaboration with IT, legal, and compliance teams",
                d: "Only senior executive management to ensure consistent enterprise-wide decisions"
            },
            explanation: "Data owners, who understand the business context and sensitivity of information, should classify data in collaboration with IT and compliance teams. This collaborative approach works because: (1) Data owners know the content: Business units that create and use the data best understand its sensitivity, value, and appropriate use, (2) IT provides technical expertise: IT teams understand technical security controls and feasibility of implementing protections, (3) Legal/compliance ensures requirements: Legal and compliance teams ensure classification meets regulatory requirements (PIPEDA, MFIPPA, industry standards), (4) Collaboration ensures balance: No single group has complete perspective - business value, security feasibility, and legal compliance must all be considered. The classification process typically works as follows: Data owners propose classifications based on business context, IT reviews for technical feasibility and security controls, Legal/compliance reviews for regulatory compliance, All groups agree on final classification and handling requirements. This prevents common problems like: IT over-classifying everything as 'confidential' (too restrictive for business operations), Business under-classifying sensitive data (compliance violations), Centralized decisions lacking context about actual data sensitivity."
        }
    };

    const quiz = useQuiz(allQuestions, 5);

    const contentSections = [
        {
            title: "Data Classification Framework",
            content: [
                "Effective data management begins with a comprehensive classification system that categorizes information based on sensitivity, value, and regulatory requirements.",
                "",
                "**Classification Levels:**",
                "• **Public**: Information that can be freely shared without restriction",
                "• **Internal**: Information for internal use that could cause minor harm if disclosed",
                "• **Confidential**: Sensitive information that could cause significant harm if disclosed",
                "• **Restricted**: Highly sensitive information requiring the strictest controls",
                "",
                "**Classification Criteria:**",
                "• **Regulatory Requirements**: PIPEDA, MFIPPA, sector-specific regulations",
                "• **Business Value**: Strategic importance and competitive advantage",
                "• **Privacy Sensitivity**: Personal information and individual privacy rights",
                "• **Security Impact**: Potential harm from unauthorized disclosure or loss",
                "",
                "**Implementation Process:**",
                "• **Data Discovery**: Comprehensive inventory of all data assets",
                "• **Classification Assignment**: Apply classification labels based on criteria",
                "• **Control Implementation**: Deploy appropriate security and access controls",
                "• **Training and Awareness**: Educate staff on classification requirements",
                "• **Regular Review**: Periodic reassessment and updates to classifications",
                "",
                "**Automated Classification Tools:**",
                "• Content scanning and pattern recognition systems",
                "• Machine learning-based classification algorithms",
                "• Integration with document management systems",
                "• Real-time classification during data creation and modification"
            ]
        },
        {
            title: "Records Retention and Lifecycle Management",
            content: [
                "Proper records management ensures compliance with legal requirements while optimizing storage costs and reducing organizational risk.",
                "",
                "**Legal and Regulatory Framework:**",
                "• **Ontario Records Retention Guidelines**: Municipal records retention requirements",
                "• **Employment Standards Act**: 7-year retention for employee records",
                "• **Corporate Records**: Various retention periods based on record type",
                "• **Financial Records**: CRA requirements and audit considerations",
                "",
                "**Records Lifecycle Stages:**",
                "• **Creation/Receipt**: Initial record creation or receipt from external sources",
                "• **Active Use**: Frequent access and modification during business processes",
                "• **Semi-Active**: Occasional access for reference or legal requirements",
                "• **Inactive**: Retained for compliance but rarely accessed",
                "• **Disposition**: Secure destruction or permanent archival",
                "",
                "**Retention Schedule Development:**",
                "• **Legal Research**: Identify all applicable retention requirements",
                "• **Business Analysis**: Assess operational value and access patterns",
                "• **Risk Assessment**: Evaluate risks of early destruction vs. over-retention",
                "• **Cost Analysis**: Balance storage costs with legal and business needs",
                "• **Stakeholder Consultation**: Input from legal, IT, and business units",
                "",
                "**Implementation Best Practices:**",
                "• Automated retention enforcement through technology systems",
                "• Regular auditing and compliance monitoring",
                "• Clear documentation of disposition decisions and actions",
                "• Staff training on retention requirements and procedures",
                "• Legal hold procedures for litigation and investigations"
            ]
        },
        {
            title: "Cross-Border Data Management and Compliance",
            content: [
                "Organizations must navigate complex requirements when data crosses provincial or national boundaries.",
                "",
                "**MFIPPA Cross-Border Provisions:**",
                "• **Default Rule**: Personal information must be stored and accessed within Canada",
                "• **Limited Exceptions**: Specific circumstances allowing cross-border transfers",
                "• **Due Diligence Requirements**: Vendor assessment and contractual safeguards",
                "• **Ongoing Monitoring**: Regular compliance verification and auditing",
                "",
                "**Cloud Computing Considerations:**",
                "• **Data Residency**: Contractual guarantees for Canadian data storage",
                "• **Access Controls**: Restrictions on foreign government access to data",
                "• **Encryption Requirements**: Protection of data in transit and at rest",
                "• **Vendor Transparency**: Clear documentation of data handling practices",
                "",
                "**International Transfer Safeguards:**",
                "• **Adequacy Decisions**: Countries with equivalent privacy protection",
                "• **Standard Contractual Clauses**: EU-style data protection agreements",
                "• **Binding Corporate Rules**: Multinational organization data sharing frameworks",
                "• **Certification Schemes**: Industry-standard privacy and security certifications",
                "",
                "**Compliance Monitoring:**",
                "• **Regular Audits**: Assessment of vendor compliance and data handling",
                "• **Incident Reporting**: Procedures for cross-border data breaches",
                "• **Documentation Requirements**: Comprehensive records of transfer decisions",
                "• **Risk Assessments**: Ongoing evaluation of cross-border transfer risks"
            ]
        },
        {
            title: "Data Security and Access Controls",
            content: [
                "Robust security measures protect sensitive information throughout its lifecycle and ensure appropriate access based on business needs and regulatory requirements.",
                "",
                "**Access Control Framework:**",
                "• **Role-Based Access Control (RBAC)**: Permissions based on job functions",
                "• **Attribute-Based Access Control (ABAC)**: Dynamic permissions based on context",
                "• **Principle of Least Privilege**: Minimum necessary access for job functions",
                "• **Need-to-Know Basis**: Access limited to specific business requirements",
                "",
                "**Technical Security Controls:**",
                "• **Encryption**: AES-256 for data at rest, TLS 1.3 for data in transit",
                "• **Key Management**: Secure generation, storage, and rotation of encryption keys",
                "• **Multi-Factor Authentication**: Strong authentication for sensitive data access",
                "• **Database Security**: Database encryption, access logging, and monitoring",
                "",
                "**Physical Security Measures:**",
                "• **Secure Facilities**: Controlled access to data centers and server rooms",
                "• **Environmental Controls**: Temperature, humidity, and fire suppression systems",
                "• **Equipment Security**: Secure disposal and decommissioning procedures",
                "• **Visitor Management**: Escort requirements and access logging",
                "",
                "**Monitoring and Auditing:**",
                "• **Access Logging**: Comprehensive logs of all data access and modifications",
                "• **Real-Time Monitoring**: Automated detection of suspicious activities",
                "• **Regular Audits**: Periodic review of access permissions and usage patterns",
                "• **Compliance Reporting**: Regular reports on security control effectiveness"
            ]
        },
        {
            title: "Data Governance and Quality Management",
            content: [
                "Effective data governance ensures data quality, consistency, and appropriate use across the organization.",
                "",
                "**Governance Structure:**",
                "• **Data Governance Committee**: Senior leadership oversight and policy direction",
                "• **Data Stewards**: Business unit representatives responsible for data quality",
                "• **Data Custodians**: Technical teams responsible for data management systems",
                "• **Data Users**: End users with specific roles and responsibilities",
                "",
                "**Data Quality Framework:**",
                "• **Accuracy**: Data correctly represents the real-world entities and events",
                "• **Completeness**: All required data elements are present and populated",
                "• **Consistency**: Data values are uniform across systems and processes",
                "• **Timeliness**: Data is current and available when needed",
                "• **Validity**: Data conforms to defined formats and business rules",
                "",
                "**Data Standards and Policies:**",
                "• **Data Definitions**: Clear, consistent definitions for all data elements",
                "• **Naming Conventions**: Standardized naming for data fields and entities",
                "• **Format Standards**: Consistent formats for dates, addresses, and identifiers",
                "• **Quality Metrics**: Measurable standards for data quality assessment",
                "",
                "**Continuous Improvement:**",
                "• **Data Quality Monitoring**: Ongoing assessment of data quality metrics",
                "• **Issue Resolution**: Processes for identifying and correcting data problems",
                "• **Training Programs**: Regular education on data governance requirements",
                "• **Technology Solutions**: Automated tools for data quality management"
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
                    <span className="text-primary font-semibold">Module 4: Data Management</span>
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
                        <h1 className="text-3xl font-bold font-mono mb-2 uppercase">Module 4: Data Management</h1>
                        <p className="mb-6">Ensuring data is classified, retained, and handled securely</p>
                        
                        <div className="learning-objectives">
                            <h3 className="font-semibold mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                            <ul>
                                <li>Implement comprehensive data classification and handling procedures</li>
                                <li>Establish effective records management and retention policies</li>
                                <li>Ensure compliance with cross-border data storage requirements</li>
                                <li>Deploy robust data security and access control systems</li>
                                <li>Create data governance frameworks for quality management</li>
                                <li>Navigate complex regulatory requirements for data management</li>
                                <li>Optimize data lifecycle management and disposition processes</li>
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
                                    <p className="mb-4 text-text-secondary">Access practical tools and templates for implementing secure data management practices.</p>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Data Classification Templates</h5>
                                                <p className="text-sm text-text-secondary mb-3">Comprehensive frameworks for classifying and protecting data</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Records Retention Schedules</h5>
                                                <p className="text-sm text-text-secondary mb-3">Ontario-specific retention requirements and guidelines</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Cross-Border Compliance Checklist</h5>
                                                <p className="text-sm text-text-secondary mb-3">Guidelines for managing data across jurisdictions</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                            <div className="bg-surface p-4 border border-border rounded">
                                                <h5 className="font-semibold text-text-primary mb-2">Data Governance Framework</h5>
                                                <p className="text-sm text-text-secondary mb-3">Organizational structures and quality management processes</p>
                                                <div className="flex gap-2">
                                                    <button className="btn-secondary text-xs px-3 py-1">.MD</button>
                                                    <button className="btn-secondary text-xs px-3 py-1">.PDF</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-4 text-sm text-text-secondary">
                                        <strong>Note:</strong> These resources are designed for compliance with Ontario regulations and should be 
                                        reviewed with legal counsel for organization-specific requirements.
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
                        ) : currentSection === 'quiz' ? (
                            /* Quiz Section */
                            <div className="quiz-container">
                                <h3 className="text-2xl font-semibold mb-4 text-text-primary font-mono">Knowledge Check</h3>
                                <p className="mb-6 text-text-secondary">Test your understanding of data management principles and compliance requirements.</p>
                                
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
                                    moduleTitle="Module 4 Resources"
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
                                onClick={() => onNavigate('module3')} 
                                className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border"
                            >
                                Previous Module
                            </button>
                            <div className="text-sm text-text-secondary text-center">
                                Module 4 of 4 • Data Management
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

export default Module4;