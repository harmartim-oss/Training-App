/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module1: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
    const [quizResult, setQuizResult] = useState<{ score: number, feedback: any } | null>(null);
    const questions = {
        q1: { question: "Under PIPEDA, when must an organization identify the purposes for collecting personal information?", answer: 'b', options: { a: "After collection is complete", b: "Before or at the time of collection", c: "Only when requested by individuals" }},
        q2: { question: "What is the timeline for initial breach notification under Bill 194?", answer: 'b', options: { a: "72 hours", b: "24 hours", c: "30 days" }},
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
                    <h1 className="text-3xl font-bold font-mono text-text-primary mb-2 uppercase">Module 1: Ontario Privacy Law</h1>
                    <p className="text-text-secondary mb-8">Understanding PIPEDA, FIPPA, and the new Bill 194.</p>

                    <div className="border-t border-b border-border py-6 mb-8">
                        <h3 className="font-semibold text-primary mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                        <ul className="text-text-secondary space-y-2">
                            <li><span className="text-primary mr-2">›</span>Understand PIPEDA's 10 Fair Information Principles</li>
                            <li><span className="text-primary mr-2">›</span>Learn FIPPA requirements for municipal organizations</li>
                            <li><span className="text-primary mr-2">›</span>Master new Bill 194 privacy impact assessment requirements</li>
                        </ul>
                    </div>

                    <div className="space-y-8 mb-8 text-text-secondary leading-relaxed">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">PIPEDA Overview</h3>
                            <p>The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy legislation governing how private sector organizations collect, use, and disclose personal information in commercial activities. It is founded on 10 Fair Information Principles that form the ground rules for handling personal data.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">FIPPA for Municipalities</h3>
                            <p>The Freedom of Information and Protection of Privacy Act (FIPPA) governs how Ontario's public sector institutions, including municipalities, handle personal information. It ensures both transparency through freedom of information requests and robust privacy protection for citizen data.</p>
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
                                                <input type="radio" id={`${qId}-${key}`} name={qId} value={key} onChange={() => handleQuizChange(qId, key)} checked={quizAnswers[qId] === key} className="hidden" disabled={!!quizResult} />
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
                        <button onClick={() => onNavigate('dashboard')} className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border">
                            Dashboard
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

export default Module1;