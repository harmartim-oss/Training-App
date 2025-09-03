/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module2: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
    const [quizResult, setQuizResult] = useState<{ score: number, feedback: any } | null>(null);
    const questions = {
        q1: { question: "Which phase comes immediately after 'Identification' in the incident response process?", answer: 'b', options: { a: "Eradication", b: "Containment", c: "Recovery" }},
        q2: { question: "What does AES-256 refer to?", answer: 'b', options: { a: "A type of firewall", b: "An encryption standard for data at rest", c: "A password policy" }},
    };

    const handleQuizChange = (qId: string, value: string) => {
        setQuizAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const checkModuleQuiz = () => {
        let score = 0;
        const feedback: { [key: string]: { correct: boolean } } = {};
        Object.keys(questions).forEach(qId => {
            const isCorrect = quizAnswers[qId] === questions[qId as keyof typeof questions].answer;
            feedback[qId] = { correct: isCorrect };
            if (isCorrect) score += 50;
        });
        setQuizResult({ score, feedback });
    };

    const getOptionClass = (qId: string, optionKey: string) => {
        if (quizAnswers[qId] === optionKey && !quizResult) {
            return 'selected';
        }
        if (quizResult) {
            const question = questions[qId as keyof typeof questions];
            const isAnswer = question.answer === optionKey;
            const isSelected = quizAnswers[qId] === optionKey;

            if(isAnswer) return 'correct';
            if(isSelected && !isAnswer) return 'incorrect';
        }
        return '';
    }

    return (
        <section className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="bg-surface border border-border p-6 sm:p-8">
                    <h1 className="text-3xl font-bold font-mono text-text-primary mb-2 uppercase">Module 2: Cybersecurity Fundamentals</h1>
                    <p className="text-text-secondary mb-8">Protecting digital assets through risk assessment and security controls.</p>

                    <div className="border-t border-b border-border py-6 mb-8">
                        <h3 className="font-semibold text-primary mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                        <ul className="text-text-secondary space-y-2">
                            <li><span className="text-primary mr-2">›</span>Implement risk assessment and management frameworks</li>
                            <li><span className="text-primary mr-2">›</span>Develop incident response procedures</li>
                            <li><span className="text-primary mr-2">›</span>Master data encryption and access controls</li>
                        </ul>
                    </div>

                     <div className="space-y-8 mb-8 text-text-secondary leading-relaxed">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">Risk Assessment Framework</h3>
                            <p>A systematic approach to identifying, analyzing, and managing cybersecurity risks is essential for both businesses and municipalities.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">Incident Response</h3>
                            <p>A well-defined incident response plan is crucial for minimizing damage and recovery time during a cybersecurity incident.</p>
                        </div>
                    </div>

                    <div className="bg-background border border-border p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-text-primary font-mono uppercase">Knowledge Check</h3>
                         <div className="space-y-6">
                            {Object.entries(questions).map(([qId, qData]) => (
                                <div key={qId}>
                                    <p className="font-medium mb-3 text-text-primary">{qData.question}</p>
                                    <div className="space-y-3">
                                        {Object.entries(qData.options).map(([key, value]) => (
                                            <label htmlFor={`${qId}-${key}`} className={`quiz-option flex items-center p-4 cursor-pointer ${getOptionClass(qId, key)}`}>
                                                <input type="radio" id={`${qId}-${key}`} name={qId} value={key} onChange={() => handleQuizChange(qId, key)} checked={quizAnswers[qId] === key} className="hidden" disabled={!!quizResult}/>
                                                <span className="text-text-primary font-mono">{value}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!quizResult && (
                           <button onClick={checkModuleQuiz} disabled={Object.keys(quizAnswers).length !== Object.keys(questions).length} className="mt-6 btn-primary py-2 px-6 text-sm">Check Answers</button>
                        )}
                        
                        {quizResult && (
                            <div className={`mt-6 p-4 font-mono ${quizResult.score === 100 ? 'bg-green/10 border-green' : 'bg-red/10 border-red'} border-l-4`}>
                                <h4 className="font-semibold mb-1 text-text-primary">RESULT: {quizResult.score}%</h4>
                                <p className="text-sm text-text-secondary">Review the correct answers highlighted in green.</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-6">
                         <button onClick={() => onNavigate('module1')} className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border">
                            Previous Module
                        </button>
                        <button onClick={() => onComplete(quizResult?.score ?? 0)} disabled={!quizResult} className="w-full sm:w-auto btn-primary font-semibold py-2 px-6">
                            Complete Module
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Module2;