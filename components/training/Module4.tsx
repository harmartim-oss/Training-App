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

const Module4: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const questions: QuizQuestions = {
        q1: { 
            question: "Under MFIPPA, where must Ontario municipalities generally store personal information?", 
            answer: 'b', 
            options: { 
                a: "Anywhere in North America", 
                b: "Within Canada, unless adequate safeguards are in place", 
                c: "Within Ontario only" 
            },
            explanation: "MFIPPA requires personal information collected by Ontario municipalities to be stored and accessed only in Canada, with limited exceptions where adequate safeguards exist."
        },
        q2: { 
            question: "What is the typical retention period for employee files after termination in Ontario?", 
            answer: 'c', 
            options: { 
                a: "3 years", 
                b: "5 years", 
                c: "7 years" 
            },
            explanation: "Ontario employment standards generally require employee records to be retained for 7 years after termination."
        },
    };

    const quiz = useQuiz(questions);

    return (
        <section className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="bg-surface border border-border p-6 sm:p-8">
                    <h1 className="text-3xl font-bold font-mono text-text-primary mb-2 uppercase">Module 4: Data Management</h1>
                    <p className="text-text-secondary mb-8">Ensuring data is classified, retained, and handled securely.</p>

                    <div className="border-t border-b border-border py-6 mb-8">
                        <h3 className="font-semibold text-primary mb-2 text-lg font-mono uppercase">Learning Objectives</h3>
                        <ul className="text-text-secondary space-y-2">
                            <li><span className="text-primary mr-2">›</span>Implement data classification and handling procedures</li>
                            <li><span className="text-primary mr-2">›</span>Establish records management and retention policies</li>
                            <li><span className="text-primary mr-2">›</span>Ensure cross-border data storage compliance</li>
                        </ul>
                    </div>

                    <div className="space-y-8 mb-8 text-text-secondary leading-relaxed">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">Data Classification</h3>
                            <p>Proper data classification is fundamental to implementing appropriate security controls and ensuring regulatory compliance.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-text-primary font-mono">Records Retention</h3>
                            <p>Proper records management ensures compliance with legal requirements while optimizing storage costs and reducing security risks.</p>
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
                        <button onClick={() => onNavigate('module3')} className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border">
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

export default Module4;