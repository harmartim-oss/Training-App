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

const Module2: React.FC<ModuleProps> = ({ onComplete, onNavigate }) => {
    const questions: QuizQuestions = {
        q1: { 
            question: "Which phase comes immediately after 'Identification' in the incident response process?", 
            answer: 'b', 
            options: { a: "Eradication", b: "Containment", c: "Recovery" },
            explanation: "Containment is critical to prevent the incident from spreading and causing further damage."
        },
        q2: { 
            question: "What does AES-256 refer to?", 
            answer: 'b', 
            options: { a: "A type of firewall", b: "An encryption standard for data at rest", c: "A password policy" },
            explanation: "AES-256 (Advanced Encryption Standard with 256-bit keys) is a symmetric encryption algorithm widely used for securing data."
        },
    };

    const quiz = useQuiz(questions);

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
                         <button onClick={() => onNavigate('module1')} className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-2 px-6 border border-border">
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

export default Module2;