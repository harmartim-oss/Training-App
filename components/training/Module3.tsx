/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module3: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
    const [quizResult, setQuizResult] = useState<{ score: number, feedback: any } | null>(null);
    const questions = {
        q1: { question: "Which principle requires that AI use follows a 'problem-first' rather than 'technology-first' approach?", answer: 'b', options: { a: "AI is used to benefit the people of Ontario", b: "AI use is justified and proportionate", c: "AI use is transparent" }},
        q2: { question: "What is the first step in AI risk management according to Ontario's directive?", answer: 'b', options: { a: "Identify risks", b: "State objectives and establish context", c: "Assess risks" }},
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
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
                    <h1 className="text-3xl font-bold text-text-primary mb-2">Module 3: AI Usage and Governance</h1>
                    <p className="text-text-secondary mb-6">Navigating Ontario's Responsible Use of AI Directive.</p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <h3 className="font-semibold text-primary mb-2 text-lg">Learning Objectives</h3>
                        <ul className="text-blue-800 space-y-1 list-disc list-inside">
                            <li>Understand Ontario's Responsible Use of AI Directive</li>
                            <li>Apply the six principles of responsible AI use</li>
                            <li>Implement AI risk management frameworks</li>
                        </ul>
                    </div>

                    <div className="space-y-8 mb-8 text-text-secondary leading-relaxed">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary">Ontario's AI Directive</h3>
                            <p>This directive, effective December 2024, applies to all Ontario ministries and provincial agencies using AI systems in policy, program, or service delivery.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary">AI Risk Management</h3>
                            <p>A structured 5-step process is required: State Objectives, Identify Risks, Assess Risks, Plan & Act, and Report & Monitor.</p>
                        </div>
                    </div>

                    <div className="bg-background border border-border rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-text-primary">📝 Knowledge Check</h3>
                        <div className="space-y-6">
                            {Object.entries(questions).map(([qId, qData]) => (
                                <div key={qId}>
                                    <p className="font-medium mb-3 text-text-primary">{qData.question}</p>
                                    <div className="space-y-3">
                                        {Object.entries(qData.options).map(([key, value]) => (
                                            <label htmlFor={`${qId}-${key}`} className={`quiz-option flex items-center p-4 rounded-lg cursor-pointer ${getOptionClass(qId, key)}`}>
                                                <input type="radio" id={`${qId}-${key}`} name={qId} value={key} onChange={() => handleQuizChange(qId, key)} checked={quizAnswers[qId] === key} className="hidden" disabled={!!quizResult}/>
                                                <div className="text-text-primary">{value}</div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!quizResult && (
                           <button onClick={checkModuleQuiz} disabled={Object.keys(quizAnswers).length !== Object.keys(questions).length} className="mt-6 btn-primary py-2 px-6 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">Check Answers</button>
                        )}
                        
                        {quizResult && (
                            <div className={`mt-6 p-4 rounded-lg ${quizResult.score === 100 ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'} border`}>
                                <h4 className="font-semibold mb-2 text-text-primary">Results: You scored {quizResult.score}%</h4>
                                <p className="text-sm text-text-secondary">Review the correct answers highlighted in green.</p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-6">
                        <button onClick={() => onNavigate('module2')} className="w-full sm:w-auto bg-slate-100 text-text-secondary font-semibold py-2 px-6 rounded-lg hover:bg-slate-200 transition-colors">
                            Previous Module
                        </button>
                        <button onClick={() => onComplete(quizResult?.score ?? 0)} disabled={!quizResult} className="w-full sm:w-auto bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors">
                            Complete Module <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Module3;