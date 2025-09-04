/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useQuiz, QuizQuestions } from '../../hooks/useQuiz';
import QuizComponent from '../common/QuizComponent';

interface ModuleProps {
    onComplete: (score: number) => void;
    onNavigate: (section: string) => void;
}

const Module3: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const questions: QuizQuestions = {
        q1: { 
            question: "Which principle requires that AI use follows a 'problem-first' rather than 'technology-first' approach?", 
            answer: 'b', 
            options: { 
                a: "AI is used to benefit the people of Ontario", 
                b: "AI use is justified and proportionate", 
                c: "AI use is transparent" 
            },
            explanation: "The 'justified and proportionate' principle ensures AI is used only when necessary and appropriate for the specific problem at hand."
        },
        q2: { 
            question: "What is the first step in AI risk management according to Ontario's directive?", 
            answer: 'b', 
            options: { 
                a: "Identify risks", 
                b: "State objectives and establish context", 
                c: "Assess risks" 
            },
            explanation: "Establishing clear objectives and context is essential before any risk identification or assessment can be meaningful."
        },
    };

    const quiz = useQuiz(questions);

    return (
        <section className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="bg-surface border border-border p-6 sm:p-8">
                    <h1 className="text-3xl font-bold font-mono text-text-primary mb-2 uppercase">Module 3: AI Usage and Governance</h1>
                    <p className="text-text-secondary mb-8">Navigating Ontario's Responsible Use of AI Directive.</p>

                    <div className="border-t border-b border-border py-6 mb-8">
                        <h3 className="font-semibold text-primary mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                        <ul className="text-text-secondary space-y-2">
                            <li><span className="text-primary mr-2">›</span>Understand Ontario's Responsible Use of AI Directive</li>
                            <li><span className="text-primary mr-2">›</span>Apply the six principles of responsible AI use</li>
                            <li><span className="text-primary mr-2">›</span>Implement AI risk management frameworks</li>
                        </ul>
                    </div>

                    <div className="space-y-8 mb-8 text-text-secondary leading-relaxed">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">Ontario's AI Directive</h3>
                            <p>This directive, effective December 2024, applies to all Ontario ministries and provincial agencies using AI systems in policy, program, or service delivery.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">AI Risk Management</h3>
                            <p>A structured 5-step process is required: State Objectives, Identify Risks, Assess Risks, Plan & Act, and Report & Monitor.</p>
                        </div>
                    </div>

                    <QuizComponent
                        questions={questions}
                        answers={quiz.answers}
                        result={quiz.result}
                        onAnswerChange={quiz.handleAnswerChange}
                        onCheckAnswers={quiz.checkAnswers}
                        onRetake={quiz.resetQuiz}
                        getOptionClass={quiz.getOptionClass}
                        canSubmit={quiz.canSubmit}
                        showExplanations={true}
                    />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-6">
                        <button onClick={() => onNavigate('module2')} className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border">
                            Previous Module
                        </button>
                        <button onClick={() => onComplete(quiz.result?.score ?? 0)} disabled={!quiz.result} className="w-full sm:w-auto btn-primary font-semibold py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed">
                            Complete Module
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Module3;