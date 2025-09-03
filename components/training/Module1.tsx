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
    const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');
    
    const questions = {
        q1: { 
            question: "Under PIPEDA, when must an organization identify the purposes for collecting personal information?", 
            answer: 'b', 
            options: { 
                a: "After collection is complete", 
                b: "Before or at the time of collection", 
                c: "Only when requested by individuals" 
            },
            explanation: "PIPEDA requires organizations to identify purposes before or at the time of collection to ensure transparency."
        },
        q2: { 
            question: "What is the timeline for initial breach notification under Bill 194?", 
            answer: 'b', 
            options: { 
                a: "72 hours", 
                b: "24 hours", 
                c: "30 days" 
            },
            explanation: "Bill 194 requires initial breach notification to the Privacy Commissioner within 24 hours."
        },
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

    const contentSections = [
        {
            title: "PIPEDA Overview",
            content: [
                "The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy legislation governing how private sector organizations collect, use, and disclose personal information in commercial activities.",
                "PIPEDA is founded on 10 Fair Information Principles that form the ground rules for handling personal data:",
                "• Accountability • Identifying Purposes • Consent • Limiting Collection • Limiting Use, Disclosure, and Retention • Accuracy • Safeguards • Openness • Individual Access • Challenging Compliance"
            ]
        },
        {
            title: "FIPPA for Municipalities", 
            content: [
                "The Freedom of Information and Protection of Privacy Act (FIPPA) governs how Ontario's public sector institutions, including municipalities, handle personal information.",
                "Key FIPPA requirements include:",
                "• Transparency through freedom of information requests",
                "• Robust privacy protection for citizen data",
                "• Mandatory privacy impact assessments for new programs",
                "• Strict rules for cross-border data sharing"
            ]
        },
        {
            title: "Bill 194 - New Requirements",
            content: [
                "Bill 194 introduces significant updates to Ontario's privacy landscape:",
                "• Mandatory 24-hour breach notification to Privacy Commissioner",
                "• Enhanced individual rights including data portability",
                "• Stricter consent requirements for data collection",
                "• Increased penalties for non-compliance (up to $10M or 2% of global revenue)"
            ]
        }
    ];

    return (
        <section className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb mb-6">
                    <button onClick={() => onNavigate('dashboard')} className="hover:text-primary transition-colors">
                        Dashboard
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="text-primary font-semibold">Module 1: Privacy Laws & Frameworks</span>
                </div>

                {/* Progress Indicator */}
                <div className="progress-indicator mb-8">
                    <div className={`progress-step ${currentSection === 'content' ? 'current' : 'completed'}`}>
                        1
                    </div>
                    <div className={`progress-connector ${currentSection === 'quiz' ? 'completed' : ''}`}></div>
                    <div className={`progress-step ${currentSection === 'quiz' ? 'current' : 'pending'}`}>
                        2
                    </div>
                    <div className="ml-4 text-sm text-text-secondary">
                        {currentSection === 'content' ? 'Learning Content' : 'Knowledge Check'}
                    </div>
                </div>

                <div className="module-container">
                    {/* Module Header */}
                    <div className="module-header">
                        <h1 className="text-4xl font-bold font-mono mb-2 uppercase relative z-10">
                            Module 1: Privacy Laws & Frameworks
                        </h1>
                        <p className="text-lg opacity-90 relative z-10">
                            Understanding PIPEDA, FIPPA, and the new Bill 194
                        </p>
                    </div>

                    {/* Learning Objectives */}
                    <div className="p-6 sm:p-8">
                        <div className="learning-objectives">
                            <h3 className="font-semibold text-primary mb-4 text-xl font-mono uppercase">
                                Learning Objectives
                            </h3>
                            <ul className="text-text-secondary space-y-2">
                                <li>Understand PIPEDA's 10 Fair Information Principles</li>
                                <li>Learn FIPPA requirements for municipal organizations</li>
                                <li>Master new Bill 194 privacy impact assessment requirements</li>
                                <li>Apply privacy laws to real-world scenarios</li>
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
                                
                                <div className="text-center py-8">
                                    <button 
                                        onClick={() => setCurrentSection('quiz')}
                                        className="btn-primary py-3 px-8 text-lg font-semibold"
                                    >
                                        Proceed to Knowledge Check
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Quiz Section */
                            <div className="quiz-container">
                                <h3 className="text-2xl font-semibold mb-6 text-text-primary font-mono uppercase">
                                    Knowledge Check
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Test your understanding of the privacy laws and frameworks covered in this module.
                                </p>
                                
                                <div className="space-y-8">
                                    {Object.entries(questions).map(([qId, qData], index) => (
                                        <div key={qId} className="quiz-question">
                                            <p className="font-semibold mb-4 text-text-primary text-lg">
                                                Question {index + 1}: {qData.question}
                                            </p>
                                            <div className="space-y-3">
                                                {Object.entries(qData.options).map(([key, value]) => (
                                                    <label 
                                                        key={key}
                                                        htmlFor={`${qId}-${key}`} 
                                                        className={`quiz-option flex items-center p-4 cursor-pointer ${getOptionClass(qId, key)}`}
                                                    >
                                                        <input 
                                                            type="radio" 
                                                            id={`${qId}-${key}`} 
                                                            name={qId} 
                                                            value={key} 
                                                            onChange={() => handleQuizChange(qId, key)} 
                                                            checked={quizAnswers[qId] === key} 
                                                            className="hidden" 
                                                            disabled={!!quizResult} 
                                                        />
                                                        <span className="text-text-primary">{value}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {quizResult && (
                                                <div className="mt-4 p-3 bg-surface-elevated rounded-lg">
                                                    <p className="text-sm text-text-secondary">
                                                        <strong>Explanation:</strong> {qData.explanation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {!quizResult && (
                                    <div className="text-center mt-8">
                                        <button 
                                            onClick={checkModuleQuiz} 
                                            disabled={Object.keys(quizAnswers).length !== Object.keys(questions).length} 
                                            className="btn-primary py-3 px-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Check Answers
                                        </button>
                                    </div>
                                )}
                                
                                {quizResult && (
                                    <div className={`quiz-result ${quizResult.score < 80 ? 'failed' : ''}`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xl font-bold text-text-primary">
                                                Quiz Results
                                            </h4>
                                            <div className={`text-2xl font-bold ${quizResult.score >= 80 ? 'text-success' : 'text-warning'}`}>
                                                {quizResult.score}%
                                            </div>
                                        </div>
                                        <p className="text-text-secondary mb-4">
                                            {quizResult.score >= 80 
                                                ? "Excellent work! You've demonstrated a strong understanding of privacy laws and frameworks."
                                                : "Good effort! Review the explanations above and consider retaking the quiz to improve your score."
                                            }
                                        </p>
                                        {quizResult.score < 80 && (
                                            <button 
                                                onClick={() => {
                                                    setQuizResult(null);
                                                    setQuizAnswers({});
                                                }}
                                                className="btn-secondary py-2 px-6 mr-4"
                                            >
                                                Retake Quiz
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="text-center mt-6">
                                    <button 
                                        onClick={() => setCurrentSection('content')}
                                        className="btn-secondary py-2 px-6 mr-4"
                                    >
                                        ← Back to Content
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Module Navigation */}
                    <div className="module-navigation">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button 
                                onClick={() => onNavigate('dashboard')} 
                                className="w-full sm:w-auto bg-surface hover:bg-border transition-colors text-text-primary font-bold uppercase tracking-widest py-3 px-6 border border-border rounded-lg"
                            >
                                ← Dashboard
                            </button>
                            <div className="text-sm text-text-secondary">
                                Module 1 of 4 • Privacy Laws & Frameworks
                            </div>
                            <button 
                                onClick={() => onComplete(quizResult?.score ?? 0)} 
                                disabled={!quizResult || quizResult.score < 80} 
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

export default Module1;