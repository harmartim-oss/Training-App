/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon } from '../icons';

const assessmentQuestions = [
    // Module 1 - Privacy & Legal Framework (15 questions)
    { module: 1, question: "Your organization is implementing a new customer relationship management (CRM) system. According to PIPEDA's Fair Information Principles, when must you identify the specific purposes for collecting customer email addresses and phone numbers?", answer: 'Before or at the time of collection, and documented in the privacy policy', options: ['After the CRM system is fully operational', 'Before or at the time of collection, and documented in the privacy policy', 'Only when a customer requests the information', 'Within 30 days of initial collection'] },
    { module: 1, question: "A data breach at your municipal office has exposed the personal information of 500 residents. Under Ontario's Bill 194 amendments to MFIPPA, what are your complete notification obligations?", answer: 'Notify affected individuals and IPC immediately; provide detailed report to IPC within 30 days', options: ['Notify affected individuals and IPC immediately; provide detailed report to IPC within 30 days', 'Only notify the IPC within 7 days if the breach poses real risk of significant harm', 'Notify affected individuals within 72 hours; no IPC notification required', 'Complete internal investigation before any external notification'] },
    { module: 1, question: "Under PIPEDA, what type of consent is generally required when using personal information for marketing purposes that were not part of the original collection purpose?", answer: 'Express opt-in consent from the individual', options: ['Implied consent is sufficient', 'Express opt-in consent from the individual', 'No additional consent is needed if disclosed in privacy policy', 'Consent can be obtained after the first marketing contact'] },
    { module: 1, question: "A citizen submits a Freedom of Information request to your municipality for records related to a development proposal. What is the maximum time allowed under MFIPPA to respond?", answer: '30 days from receipt of request, with possible 30-day extension', options: ['15 business days with no extensions', '30 days from receipt of request, with possible 30-day extension', '60 days from receipt of request', '45 days with mandatory legal review'] },
    { module: 1, question: "Your healthcare organization is implementing a new patient portal. Under PHIPA, which of the following is a mandatory safeguard for protecting personal health information?", answer: 'Administrative, technical, and physical safeguards appropriate to the sensitivity of information', options: ['Only encryption of data in transit', 'Administrative, technical, and physical safeguards appropriate to the sensitivity of information', 'Annual security audits by third parties only', 'Password protection alone is sufficient'] },
    { module: 1, question: "An individual requests access to their personal information held by your organization under PIPEDA. In what timeframe must you respond?", answer: 'Within 30 days, with possible extension to 60 days', options: ['Within 10 business days', 'Within 30 days, with possible extension to 60 days', 'Within 90 days for complex requests', 'Immediately upon request'] },
    { module: 1, question: "Under FIPPA, which of the following is NOT a mandatory exemption that must be applied to protect information?", answer: 'Information that could reasonably be expected to harm employee morale', options: ['Cabinet confidences and advice to government', 'Information that could reasonably be expected to harm employee morale', 'Law enforcement and security intelligence', 'Information protected by solicitor-client privilege'] },
    { module: 1, question: "Your organization discovers that a vendor has been accessing customer data beyond what was authorized in the contract. Under PIPEDA, what is your primary obligation?", answer: 'Treat it as a potential privacy breach and assess the risk of harm', options: ['Notify all customers immediately regardless of risk', 'Treat it as a potential privacy breach and assess the risk of harm', 'Only take action if customers complain', 'Wait for the Privacy Commissioner to investigate'] },
    { module: 1, question: "What is the key distinction between PIPEDA and provincial privacy laws like MFIPPA in terms of jurisdiction?", answer: 'PIPEDA applies to private sector, MFIPPA applies to public sector institutions', options: ['PIPEDA applies to all organizations equally', 'PIPEDA applies to private sector, MFIPPA applies to public sector institutions', 'MFIPPA only applies to federal institutions', 'There is no jurisdictional difference'] },
    { module: 1, question: "When conducting a Privacy Impact Assessment (PIA), which phase should occur first?", answer: 'Identifying and documenting information flows and data elements', options: ['Consulting with the Privacy Commissioner', 'Identifying and documenting information flows and data elements', 'Implementing privacy controls', 'Training staff on privacy requirements'] },
    { module: 1, question: "Under PIPEDA's principle of limiting use, disclosure, and retention, personal information should be retained:", answer: 'Only as long as necessary to fulfill the identified purposes or as required by law', options: ['For a minimum of 7 years regardless of purpose', 'Only as long as necessary to fulfill the identified purposes or as required by law', 'Indefinitely unless individuals request deletion', 'Until the organization determines it has no business value'] },
    { module: 1, question: "A municipal employee receives a phone call from someone claiming to be from another department requesting citizen contact information. What should be the employee's first action under MFIPPA?", answer: 'Verify the caller\'s identity and confirm they have legitimate authority to access the information', options: ['Provide the information immediately to facilitate inter-departmental cooperation', 'Verify the caller\'s identity and confirm they have legitimate authority to access the information', 'Refuse all phone requests and require written requests only', 'Ask the caller to submit a Freedom of Information request'] },
    { module: 1, question: "Which of the following constitutes 'personal information' under PIPEDA that requires protection?", answer: 'All of the above: name, IP address, and purchase history', options: ['Only government-issued identification numbers', 'Only information that can directly identify an individual by name', 'All of the above: name, IP address, and purchase history', 'Only sensitive information like health or financial data'] },
    { module: 1, question: "Your organization wants to transfer customer service operations to a provider in another country. Under PIPEDA, what is the most important consideration?", answer: 'Ensuring the foreign provider offers comparable privacy protection and has appropriate safeguards', options: ['Obtaining consent from every customer before the transfer', 'Ensuring the foreign provider offers comparable privacy protection and has appropriate safeguards', 'Only transferring anonymized data', 'Waiting for explicit approval from the Privacy Commissioner'] },
    { module: 1, question: "Under Ontario's Bill 194, what is the threshold for mandatory data breach notification to affected individuals?", answer: 'Real risk of significant harm to individuals', options: ['Any breach involving more than 100 records', 'Real risk of significant harm to individuals', 'Only breaches involving financial information', 'All breaches must be reported regardless of risk'] },
    
    // Module 2 - Cybersecurity Fundamentals (15 questions)
    { module: 2, question: "During an active ransomware incident affecting your organization's file servers, what is the most critical action to take during the containment phase to prevent further damage?", answer: 'Immediately isolate affected systems from the network and disable network shares', options: ['Begin restoring data from backups immediately', 'Immediately isolate affected systems from the network and disable network shares', 'Document all affected files before taking action', 'Negotiate with the attackers to stop the spread'] },
    { module: 2, question: "As an IT administrator, you're implementing access controls for a new healthcare records system. Which security principle requires that a front-desk clerk should only access patient contact information but not medical histories?", answer: 'Principle of Least Privilege - grant minimum access required for job function', options: ['Role-Based Access Control - assign based on job title only', 'Principle of Least Privilege - grant minimum access required for job function', 'Zero Trust Architecture - verify every access attempt', 'Multi-Factor Authentication - require additional verification'] },
    { module: 2, question: "Your organization is conducting a risk assessment. Which formula correctly represents the calculation of risk?", answer: 'Risk = Likelihood × Impact', options: ['Risk = Threat + Vulnerability', 'Risk = Likelihood × Impact', 'Risk = Asset Value ÷ Controls', 'Risk = Threat × Asset Value'] },
    { module: 2, question: "During an incident response, which phase involves determining the extent of the breach and what systems were affected?", answer: 'Detection and Analysis', options: ['Preparation', 'Detection and Analysis', 'Containment', 'Recovery'] },
    { module: 2, question: "What is the primary purpose of implementing system hardening procedures?", answer: 'Reduce attack surface by removing unnecessary services and applying security configurations', options: ['Improve system performance by optimizing configurations', 'Reduce attack surface by removing unnecessary services and applying security configurations', 'Enable easier administration and maintenance', 'Increase system compatibility with third-party software'] },
    { module: 2, question: "Which of the following best describes a zero-day vulnerability?", answer: 'A security flaw unknown to the vendor and for which no patch exists', options: ['A vulnerability that can be exploited within 24 hours', 'A security flaw unknown to the vendor and for which no patch exists', 'A known vulnerability with no available workaround', 'An exploit that stops working after one day'] },
    { module: 2, question: "In the context of access control, what does the 'need-to-know' principle establish?", answer: 'Access should be granted only to information necessary for job duties', options: ['All employees should be informed about security policies', 'Access should be granted only to information necessary for job duties', 'Managers need to know all access attempts by their team', 'Security teams should monitor all data access'] },
    { module: 2, question: "Your organization experiences a distributed denial-of-service (DDoS) attack. What is the most appropriate immediate response?", answer: 'Implement rate limiting and work with ISP to filter malicious traffic', options: ['Shut down all internet-facing services immediately', 'Implement rate limiting and work with ISP to filter malicious traffic', 'Increase server capacity to handle the traffic load', 'Ignore it as DDoS attacks typically resolve themselves'] },
    { module: 2, question: "Which security control would be most effective at preventing SQL injection attacks?", answer: 'Input validation and parameterized queries', options: ['Firewall rules blocking suspicious IP addresses', 'Input validation and parameterized queries', 'Encryption of database contents', 'Regular database backups'] },
    { module: 2, question: "What is the primary difference between symmetric and asymmetric encryption?", answer: 'Symmetric uses one key for both encryption and decryption; asymmetric uses a key pair', options: ['Symmetric is faster but less secure than asymmetric', 'Symmetric uses one key for both encryption and decryption; asymmetric uses a key pair', 'Asymmetric can only be used for authentication, not encryption', 'Symmetric encryption is only suitable for data at rest'] },
    { module: 2, question: "During a security incident, what is the primary purpose of maintaining a chain of custody for digital evidence?", answer: 'Ensure evidence integrity and admissibility in legal proceedings', options: ['Track who accessed the evidence for billing purposes', 'Ensure evidence integrity and admissibility in legal proceedings', 'Prevent unauthorized deletion of logs', 'Maintain backup copies of all evidence'] },
    { module: 2, question: "What is the main security benefit of implementing multi-factor authentication (MFA)?", answer: 'Protects against credential theft by requiring additional verification factors', options: ['Eliminates the need for strong password policies', 'Protects against credential theft by requiring additional verification factors', 'Speeds up the authentication process for users', 'Reduces the cost of password reset support'] },
    { module: 2, question: "Which of the following is considered a detective control rather than a preventive control?", answer: 'Intrusion detection system (IDS)', options: ['Firewall rules', 'Intrusion detection system (IDS)', 'Access control lists', 'Data encryption'] },
    { module: 2, question: "Your organization is implementing a backup strategy. According to best practices, where should backup copies be stored?", answer: 'At least one copy should be stored offsite or in a different geographic location', options: ['All backups should be stored in the same datacenter for quick access', 'At least one copy should be stored offsite or in a different geographic location', 'Cloud storage is sufficient; no local copies needed', 'On the same server as the original data for redundancy'] },
    { module: 2, question: "What is the purpose of conducting regular vulnerability assessments?", answer: 'Identify and prioritize security weaknesses before they can be exploited', options: ['Demonstrate compliance with security frameworks', 'Identify and prioritize security weaknesses before they can be exploited', 'Test employee awareness of security policies', 'Satisfy cyber insurance requirements'] },
    
    // Module 3 - AI Governance & Ethics (15 questions)
    { module: 3, question: "Ontario's Responsible Use of AI Directive became effective on December 1, 2024. Before this date, which organizations were already required to follow these AI governance principles?", answer: 'Ontario Public Service (OPS) ministries and designated provincial agencies', options: ['All private companies operating in Ontario', 'Ontario Public Service (OPS) ministries and designated provincial agencies', 'Only organizations receiving provincial grants', 'All organizations using AI technology in Ontario'] },
    { module: 3, question: "Your ministry is deploying an AI system to automatically process social assistance applications. Under Ontario's AI directive, which principle mandates that human case workers must review and approve all decisions that significantly impact applicants' benefits?", answer: 'AI use is accountable and responsible - requiring meaningful human oversight', options: ['AI use is transparent - ensuring explainable decisions', 'AI use is safe, secure, and respects privacy', 'AI use is accountable and responsible - requiring meaningful human oversight', 'AI is used to benefit the people of Ontario'] },
    { module: 3, question: "What is the primary purpose of an Algorithmic Impact Assessment (AIA)?", answer: 'Evaluate potential impacts and risks of AI systems before deployment', options: ['Calculate the financial return on investment of AI projects', 'Evaluate potential impacts and risks of AI systems before deployment', 'Measure the technical accuracy of AI algorithms', 'Determine the computational resources required'] },
    { module: 3, question: "Under Ontario's AI directive, what is meant by 'explainable AI'?", answer: 'AI systems whose decisions can be understood and interpreted by humans', options: ['AI systems that can explain their own learning process', 'AI systems whose decisions can be understood and interpreted by humans', 'AI documentation that is written in plain language', 'AI systems that provide error messages when they fail'] },
    { module: 3, question: "Which of the following represents algorithmic bias that should be addressed in AI governance?", answer: 'Training data that underrepresents certain demographic groups', options: ['The AI system runs faster for some users than others', 'Training data that underrepresents certain demographic groups', 'The AI requires significant computational resources', 'The algorithm uses statistical methods'] },
    { module: 3, question: "When implementing AI in Ontario public sector, what documentation is required before deployment?", answer: 'Algorithmic Impact Assessment and privacy impact assessment', options: ['Only technical specifications of the AI model', 'Algorithmic Impact Assessment and privacy impact assessment', 'User acceptance testing results only', 'Vendor certification of AI compliance'] },
    { module: 3, question: "What is the key difference between AI transparency and AI explainability?", answer: 'Transparency is about disclosing AI use; explainability is about understanding how decisions are made', options: ['They are the same concept with different terminology', 'Transparency is about disclosing AI use; explainability is about understanding how decisions are made', 'Transparency applies to vendors; explainability applies to users', 'Explainability is only required for machine learning systems'] },
    { module: 3, question: "Under responsible AI principles, what is 'fairness' in AI systems?", answer: 'AI systems that avoid discriminatory outcomes and treat individuals equitably', options: ['AI systems that give everyone identical results', 'AI systems that avoid discriminatory outcomes and treat individuals equitably', 'AI systems that operate at the same speed for all users', 'AI systems that cost the same for all organizations'] },
    { module: 3, question: "Your organization is procuring an AI system from a vendor. What is a critical requirement under Ontario's AI governance?", answer: 'Vendor must provide documentation on data sources, training methods, and limitations', options: ['Vendor must be headquartered in Ontario', 'Vendor must provide documentation on data sources, training methods, and limitations', 'AI system must be open source', 'Vendor must provide free updates for 10 years'] },
    { module: 3, question: "What does 'human-in-the-loop' mean in AI governance?", answer: 'Humans maintain oversight and can intervene in AI decision-making processes', options: ['Humans must manually input all data into AI systems', 'Humans maintain oversight and can intervene in AI decision-making processes', 'AI systems must be trained by human experts', 'Humans must approve the purchase of AI software'] },
    { module: 3, question: "Which principle of Ontario's AI directive requires that individuals affected by AI decisions can seek recourse?", answer: 'Accountability and responsibility', options: ['Transparency', 'Accountability and responsibility', 'Privacy and security', 'Benefit to Ontarians'] },
    { module: 3, question: "When should an Algorithmic Impact Assessment be updated?", answer: 'When there are significant changes to the AI system, data sources, or use cases', options: ['Only at initial deployment', 'When there are significant changes to the AI system, data sources, or use cases', 'Every fiscal year regardless of changes', 'Only when problems are reported'] },
    { module: 3, question: "What is a key consideration for AI systems that process personal information?", answer: 'Compliance with both AI governance principles and privacy legislation', options: ['AI systems automatically comply with privacy laws', 'Compliance with both AI governance principles and privacy legislation', 'Only technical security controls are needed', 'Privacy laws don\'t apply to automated processing'] },
    { module: 3, question: "Under Ontario's AI directive, what should happen if an AI system produces unexpectedly biased results after deployment?", answer: 'Immediately assess impact, notify affected parties, and remediate the bias', options: ['Continue operating while investigating the cause', 'Immediately assess impact, notify affected parties, and remediate the bias', 'Wait for complaints before taking action', 'Only address bias in the next system update'] },
    { module: 3, question: "What is the purpose of AI model documentation and record-keeping?", answer: 'Enable auditability, accountability, and continuous improvement', options: ['Satisfy vendor contract requirements', 'Enable auditability, accountability, and continuous improvement', 'Provide marketing material for stakeholders', 'Meet data storage compliance requirements'] },
    
    // Module 4 - Data Management & Compliance (15 questions)
    { module: 4, question: "An employee at your municipal office receives a request to share resident tax assessment data with a US-based analytics firm for a data processing project. Under MFIPPA Section 30.1 and Ontario's Data Classification Framework, what is the appropriate response?", answer: 'Deny the request - personal information must be stored and accessed only in Canada unless specific exemptions apply', options: ['Approve if the US firm signs a confidentiality agreement', 'Deny the request - personal information must be stored and accessed only in Canada unless specific exemptions apply', 'Approve if residents are notified of the transfer', 'Request approval from the municipal council only'] },
    { module: 4, question: "Under PIPEDA, your private sector organization plans to transfer customer data to a cloud service provider with servers in multiple countries. What is the primary compliance requirement you must fulfill?", answer: 'Ensure the receiving organization provides a comparable level of protection through contractual safeguards', options: ['Obtain explicit consent from every customer before transfer', 'Ensure the receiving organization provides a comparable level of protection through contractual safeguards', 'Only transfer data to countries with identical privacy laws', 'Notify the Privacy Commissioner of Canada about all transfers'] },
    { module: 4, question: "According to Ontario's Data Classification Framework, which classification level requires the highest security controls?", answer: 'High (Confidential) - unauthorized disclosure could cause serious harm', options: ['Low (Public) - already publicly available', 'Medium (Internal) - for internal use only', 'High (Confidential) - unauthorized disclosure could cause serious harm', 'All levels require identical security controls'] },
    { module: 4, question: "What is the primary purpose of a records retention schedule?", answer: 'Define how long different types of records must be kept and when they can be destroyed', options: ['Ensure all records are kept indefinitely for historical purposes', 'Define how long different types of records must be kept and when they can be destroyed', 'Maximize storage capacity utilization', 'Comply with email archiving requirements only'] },
    { module: 4, question: "Your organization is implementing a data lifecycle management program. What is the correct order of the data lifecycle phases?", answer: 'Creation, Storage, Use, Sharing, Archiving, Destruction', options: ['Storage, Use, Archiving, Creation, Destruction', 'Creation, Storage, Use, Sharing, Archiving, Destruction', 'Creation, Use, Storage, Destruction', 'Collection, Processing, Deletion'] },
    { module: 4, question: "Under MFIPPA, what is required before destroying records that contain personal information?", answer: 'Ensure retention period has expired and use secure destruction methods', options: ['Notify all individuals whose information will be destroyed', 'Ensure retention period has expired and use secure destruction methods', 'Obtain approval from the Privacy Commissioner', 'Records can never be destroyed once created'] },
    { module: 4, question: "What is the main difference between data encryption at rest and data encryption in transit?", answer: 'At rest protects stored data; in transit protects data being transmitted', options: ['At rest is stronger encryption than in transit', 'At rest protects stored data; in transit protects data being transmitted', 'At rest is for databases only; in transit is for emails only', 'There is no practical difference between them'] },
    { module: 4, question: "Your organization discovers backup tapes containing personal information that should have been destroyed years ago. What is the appropriate action?", answer: 'Immediately secure the tapes and destroy them using approved methods, then document the incident', options: ['Continue storing them since they\'re already past retention', 'Immediately secure the tapes and destroy them using approved methods, then document the incident', 'Transfer them to long-term archival storage', 'Only destroy if someone requests their information'] },
    { module: 4, question: "What is pseudonymization in the context of data management?", answer: 'Replacing identifying information with artificial identifiers while maintaining data utility', options: ['Complete removal of all personal information', 'Replacing identifying information with artificial identifiers while maintaining data utility', 'Encrypting all data fields uniformly', 'Storing data in multiple locations'] },
    { module: 4, question: "Under Ontario's data residency requirements for public sector organizations, where must personal information be stored?", answer: 'In Canada, with limited exceptions requiring specific authorization', options: ['Anywhere with adequate security controls', 'In Canada, with limited exceptions requiring specific authorization', 'Only in Ontario, never outside the province', 'In any country with privacy legislation'] },
    { module: 4, question: "What is the purpose of data loss prevention (DLP) tools?", answer: 'Detect and prevent unauthorized transmission of sensitive information', options: ['Automatically back up all organizational data', 'Detect and prevent unauthorized transmission of sensitive information', 'Improve data storage efficiency', 'Recover deleted files'] },
    { module: 4, question: "Your organization is developing a data governance framework. Which component should be established first?", answer: 'Data governance roles, responsibilities, and decision-making authority', options: ['Technology tools for data management', 'Data governance roles, responsibilities, and decision-making authority', 'Data quality metrics and dashboards', 'Data sharing agreements with partners'] },
    { module: 4, question: "What is the principle of data minimization?", answer: 'Collect and retain only the minimum data necessary for specified purposes', options: ['Reduce the size of data files through compression', 'Collect and retain only the minimum data necessary for specified purposes', 'Minimize the number of people who access data', 'Store data for the minimum required time only'] },
    { module: 4, question: "When conducting a data inventory, what information is most critical to document?", answer: 'Data types, locations, owners, classification levels, and retention periods', options: ['Only the total volume of data stored', 'Data types, locations, owners, classification levels, and retention periods', 'Names of all individuals in the database', 'Storage costs and vendor contracts'] },
    { module: 4, question: "What is the recommended approach for disposing of electronic devices containing sensitive data?", answer: 'Use certified data wiping tools or physical destruction, then document the process', options: ['Delete files and empty the recycle bin', 'Format the hard drive once', 'Use certified data wiping tools or physical destruction, then document the process', 'Remove the hard drive and store it indefinitely'] },
];

// Fisher-Yates shuffle algorithm for proper randomization
const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

interface AssessmentProps {
    progress: { assessment: { completed: boolean, score: number, passed: boolean } };
    onSubmit: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ progress, onSubmit, onNavigate }) => {
    // Shuffle questions and their options once when component mounts
    const questions = useMemo(() => 
        shuffle(assessmentQuestions).map(q => ({
            ...q,
            options: shuffle(q.options)
        })),
    []);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    
    const handleAnswerChange = (qIndex: number, answer: string) => {
        setAnswers(prev => ({ ...prev, [qIndex]: answer }));
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                correctAnswers++;
            }
        });
        const score = Math.round((correctAnswers / questions.length) * 100);
        onSubmit(score);
    };
    
    const getOptionClass = (qIndex: number, option: string) => {
        if (answers[qIndex] === option) return 'selected';
        return '';
    }

    if (progress.assessment.completed) {
        return (
             <section className="animate-fade-in">
                 <div className="max-w-4xl mx-auto bg-surface border border-border p-8">
                    <div className="text-center">
                        {progress.assessment.passed 
                            ? <CheckCircleIcon className="w-16 h-16 text-green mx-auto mb-4" />
                            : <XCircleIcon className="w-16 h-16 text-red mx-auto mb-4" />
                        }
                        <h2 className="text-3xl font-bold font-mono text-text-primary mb-4 uppercase">Assessment Results</h2>
                        <div className={`text-5xl font-bold font-mono mb-4 ${progress.assessment.passed ? 'text-green' : 'text-red'}`}>
                            {progress.assessment.score}%
                        </div>
                        <div className="text-lg text-text-secondary mb-8">
                            {progress.assessment.passed 
                                ? "Congratulations! You have successfully passed the assessment." 
                                : "A score of 80% is required to pass. Please review the modules and try again."}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                             <button onClick={() => onNavigate('dashboard')} className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2.5 px-6 border border-border">Back to Dashboard</button>
                             {progress.assessment.passed && (
                                 <button onClick={() => onNavigate('certificate')} className="w-full sm:w-auto btn-primary font-semibold py-2.5 px-6">View Certificate</button>
                             )}
                        </div>
                    </div>
                </div>
             </section>
        )
    }

    return (
        <section className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="bg-surface border border-border p-6 sm:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-mono text-text-primary mb-2 uppercase">Final Assessment</h1>
                        <p className="text-text-secondary">Complete this assessment to earn your certificate. A score of 80% is required to pass.</p>
                    </div>
                    <div className="space-y-8">
                        {questions.map((q, index) => (
                            <div key={index} className="bg-background border border-border p-6">
                                <p className="font-semibold text-lg mb-4 text-text-primary">{index + 1}. {q.question}</p>
                                <div className="space-y-3">
                                    {q.options.map(option => (
                                        <label key={option} className={`quiz-option flex items-center p-4 cursor-pointer ${getOptionClass(index, option)}`}>
                                            <input type="radio" name={`q${index}`} value={option} onChange={() => handleAnswerChange(index, option)} checked={answers[index] === option} className="hidden"/>
                                            <span className="text-text-primary font-mono">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8 border-t border-border pt-6">
                        <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} className="btn-primary px-8 py-3 text-base">
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Assessment;