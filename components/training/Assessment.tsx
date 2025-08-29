/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';

const assessmentQuestions = [
    // Module 1
    { module: 1, question: "Which of PIPEDA's 10 Fair Information Principles states that an individual's knowledge and consent are required for the collection of personal information?", answer: 'Consent', options: ['Accountability', 'Identifying Purposes', 'Consent', 'Limiting Collection'] },
    { module: 1, question: "Under Bill 194, how long do organizations have to provide a detailed breach report to the IPC after the initial notification?", answer: '30 Days', options: ['24 Hours', '7 Days', '30 Days', '90 Days'] },
    // Module 2
    { module: 2, question: "What is the primary goal of the 'Containment' phase in incident response?", answer: 'Isolate affected systems', options: ['Remove malware', 'Restore systems', 'Isolate affected systems', 'Document the incident'] },
    { module: 2, question: "The principle of providing users with only the minimum access needed for their job is known as:", answer: 'Least Privilege', options: ['Zero Trust', 'Least Privilege', 'Role-Based Access', 'MFA'] },
    // Module 3
    { module: 3, question: "What is the effective date for Ontario's Responsible Use of AI Directive?", answer: 'December 1, 2024', options: ['July 1, 2025', 'January 29, 2025', 'December 1, 2024', 'Immediately'] },
    { module: 3, question: "Which AI principle focuses on maintaining human oversight and accessible complaint processes?", answer: 'AI use is accountable and responsible', options: ['AI use is transparent...', 'AI use is safe, secure...', 'AI is used to benefit...', 'AI use is accountable and responsible'] },
    // Module 4
    { module: 4, question: "Under the Ontario Data Classification Framework, which category would Social Insurance Numbers (SIN) fall into?", answer: 'Confidential Data', options: ['Confidential Data', 'Restricted Data', 'Internal Data', 'Public Data'] },
    { module: 4, question: "What is a key requirement for private sector organizations under PIPEDA when transferring data cross-border?", answer: 'Ensure a comparable level of protection', options: ['Store data only in the US', 'Notify the IPC of all transfers', 'Ensure a comparable level of protection', 'It is not allowed'] },
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
                 <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
                    <div className="text-center">
                        <i className={`fas ${progress.assessment.passed ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-6xl mb-4`}></i>
                        <h2 className="text-3xl font-bold text-text-primary mb-4">Assessment Results</h2>
                        <div className={`text-5xl font-bold mb-4 ${progress.assessment.passed ? 'text-green-600' : 'text-red-600'}`}>
                            {progress.assessment.score}%
                        </div>
                        <div className="text-lg text-text-secondary mb-8">
                            {progress.assessment.passed 
                                ? "Congratulations! You have successfully passed the assessment." 
                                : "A score of 80% is required to pass. Please review the modules and try again."}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                             <button onClick={() => onNavigate('dashboard')} className="w-full sm:w-auto bg-slate-100 text-text-secondary font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-200 transition-colors">Back to Dashboard</button>
                             {progress.assessment.passed && (
                                 <button onClick={() => onNavigate('certificate')} className="w-full sm:w-auto bg-green-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-green-500 transition-colors">View Certificate</button>
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
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-text-primary mb-2">Final Assessment</h1>
                        <p className="text-text-secondary">Complete this assessment to earn your certificate. A score of 80% is required to pass.</p>
                    </div>
                    <div className="space-y-8">
                        {questions.map((q, index) => (
                            <div key={index} className="bg-background border border-border p-6 rounded-lg">
                                <p className="font-semibold text-lg mb-4 text-text-primary">{index + 1}. {q.question}</p>
                                <div className="space-y-3">
                                    {shuffle(q.options).map(option => (
                                        <label key={option} className={`quiz-option flex items-center p-4 rounded-lg cursor-pointer ${getOptionClass(index, option)}`}>
                                            <input type="radio" name={`q${index}`} value={option} onChange={() => handleAnswerChange(index, option)} checked={answers[index] === option} className="hidden"/>
                                            <span className="text-text-primary">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8 border-t border-border pt-6">
                        <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} className="btn-primary px-8 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Assessment;