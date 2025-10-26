/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';
import { CheckCircleIcon, XCircleIcon } from '../icons';

const assessmentQuestions = [
    // Module 1 - Privacy & Legal Framework
    { module: 1, question: "Your organization is implementing a new customer relationship management (CRM) system. According to PIPEDA's Fair Information Principles, when must you identify the specific purposes for collecting customer email addresses and phone numbers?", answer: 'Before or at the time of collection, and documented in the privacy policy', options: ['After the CRM system is fully operational', 'Before or at the time of collection, and documented in the privacy policy', 'Only when a customer requests the information', 'Within 30 days of initial collection'] },
    { module: 1, question: "A data breach at your municipal office has exposed the personal information of 500 residents. Under Ontario's Bill 194 amendments to MFIPPA, what are your complete notification obligations?", answer: 'Notify affected individuals and IPC immediately; provide detailed report to IPC within 30 days', options: ['Notify affected individuals and IPC immediately; provide detailed report to IPC within 30 days', 'Only notify the IPC within 7 days if the breach poses real risk of significant harm', 'Notify affected individuals within 72 hours; no IPC notification required', 'Complete internal investigation before any external notification'] },
    // Module 2 - Cybersecurity Fundamentals
    { module: 2, question: "During an active ransomware incident affecting your organization's file servers, what is the most critical action to take during the containment phase to prevent further damage?", answer: 'Immediately isolate affected systems from the network and disable network shares', options: ['Begin restoring data from backups immediately', 'Immediately isolate affected systems from the network and disable network shares', 'Document all affected files before taking action', 'Negotiate with the attackers to stop the spread'] },
    { module: 2, question: "As an IT administrator, you're implementing access controls for a new healthcare records system. Which security principle requires that a front-desk clerk should only access patient contact information but not medical histories?", answer: 'Principle of Least Privilege - grant minimum access required for job function', options: ['Role-Based Access Control - assign based on job title only', 'Principle of Least Privilege - grant minimum access required for job function', 'Zero Trust Architecture - verify every access attempt', 'Multi-Factor Authentication - require additional verification'] },
    // Module 3 - AI Governance & Ethics
    { module: 3, question: "Ontario's Responsible Use of AI Directive became effective on December 1, 2024. Before this date, which organizations were already required to follow these AI governance principles?", answer: 'Ontario Public Service (OPS) ministries and designated provincial agencies', options: ['All private companies operating in Ontario', 'Ontario Public Service (OPS) ministries and designated provincial agencies', 'Only organizations receiving provincial grants', 'All organizations using AI technology in Ontario'] },
    { module: 3, question: "Your ministry is deploying an AI system to automatically process social assistance applications. Under Ontario's AI directive, which principle mandates that human case workers must review and approve all decisions that significantly impact applicants' benefits?", answer: 'AI use is accountable and responsible - requiring meaningful human oversight', options: ['AI use is transparent - ensuring explainable decisions', 'AI use is safe, secure, and respects privacy', 'AI use is accountable and responsible - requiring meaningful human oversight', 'AI is used to benefit the people of Ontario'] },
    // Module 4 - Data Management & Compliance
    { module: 4, question: "An employee at your municipal office receives a request to share resident tax assessment data with a US-based analytics firm for a data processing project. Under MFIPPA Section 30.1 and Ontario's Data Classification Framework, what is the appropriate response?", answer: 'Deny the request - personal information must be stored and accessed only in Canada unless specific exemptions apply', options: ['Approve if the US firm signs a confidentiality agreement', 'Deny the request - personal information must be stored and accessed only in Canada unless specific exemptions apply', 'Approve if residents are notified of the transfer', 'Request approval from the municipal council only'] },
    { module: 4, question: "Under PIPEDA, your private sector organization plans to transfer customer data to a cloud service provider with servers in multiple countries. What is the primary compliance requirement you must fulfill?", answer: 'Ensure the receiving organization provides a comparable level of protection through contractual safeguards', options: ['Obtain explicit consent from every customer before transfer', 'Ensure the receiving organization provides a comparable level of protection through contractual safeguards', 'Only transfer data to countries with identical privacy laws', 'Notify the Privacy Commissioner of Canada about all transfers'] },
];

// Simple shuffle function
const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

interface AssessmentProps {
    progress: { assessment: { completed: boolean, score: number, passed: boolean } };
    onSubmit: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ progress, onSubmit, onNavigate }) => {
    const questions = useMemo(() => shuffle(assessmentQuestions), []);
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
                                    {shuffle(q.options).map(option => (
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