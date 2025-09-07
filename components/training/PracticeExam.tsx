/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PracticeExam as PracticeExamType } from '../../types';
import { hasFeatureAccess } from '../../config/pricing';

interface PracticeExamProps {
    userTier: string;
    onUpgrade?: () => void;
}

const practiceExams: PracticeExamType[] = [
    {
        id: 'final-practice-exam',
        title: 'OCRP Final Practice Examination',
        description: 'Comprehensive practice exam covering all four modules. Simulate the real certification experience.',
        moduleIds: ['module1', 'module2', 'module3', 'module4'],
        questionCount: 80,
        timeLimit: 120, // 2 hours
        passingScore: 80,
        attempts: 3,
        isPremium: true
    },
    {
        id: 'module1-practice',
        title: 'Privacy & Legal Framework Practice Quiz',
        description: 'Focused practice questions for Module 1 covering PIPEDA, MFIPPA, and data breach notification laws.',
        moduleIds: ['module1'],
        questionCount: 20,
        timeLimit: 30,
        passingScore: 75,
        attempts: 5,
        isPremium: true
    },
    {
        id: 'module2-practice',
        title: 'Cybersecurity Fundamentals Practice Quiz',
        description: 'Test your knowledge of risk assessment, system hardening, and incident response.',
        moduleIds: ['module2'],
        questionCount: 25,
        timeLimit: 35,
        passingScore: 75,
        attempts: 5,
        isPremium: true
    },
    {
        id: 'module3-practice',
        title: 'AI Governance Practice Quiz',
        description: 'Practice questions on Ontario\'s AI directive and responsible AI deployment.',
        moduleIds: ['module3'],
        questionCount: 15,
        timeLimit: 25,
        passingScore: 75,
        attempts: 5,
        isPremium: true
    },
    {
        id: 'module4-practice',
        title: 'Data Management Practice Quiz',
        description: 'Test your understanding of data classification, retention, and cross-border compliance.',
        moduleIds: ['module4'],
        questionCount: 20,
        timeLimit: 30,
        passingScore: 75,
        attempts: 5,
        isPremium: true
    },
    {
        id: 'quick-assessment',
        title: 'Quick Knowledge Check',
        description: 'Free 10-question assessment to test your basic understanding.',
        moduleIds: ['module1', 'module2'],
        questionCount: 10,
        timeLimit: 15,
        passingScore: 70,
        attempts: 10,
        isPremium: false
    }
];

const PracticeExam: React.FC<PracticeExamProps> = ({ userTier, onUpgrade }) => {
    const [selectedExam, setSelectedExam] = useState<PracticeExamType | null>(null);
    const [examAttempts, setExamAttempts] = useState<Record<string, number>>({});
    const hasPracticeExamAccess = hasFeatureAccess(userTier, 'practiceExamAccess');

    const getAttemptsUsed = (examId: string) => examAttempts[examId] || 0;
    const getRemainingAttempts = (exam: PracticeExamType) => exam.attempts - getAttemptsUsed(exam.id);

    const handleStartExam = (exam: PracticeExamType) => {
        if (exam.isPremium && !hasPracticeExamAccess) {
            onUpgrade?.();
            return;
        }

        const remaining = getRemainingAttempts(exam);
        if (remaining <= 0) {
            alert('No more attempts remaining for this exam.');
            return;
        }

        setSelectedExam(exam);
    };

    const handleCompleteExam = (examId: string, score: number) => {
        setExamAttempts(prev => ({
            ...prev,
            [examId]: (prev[examId] || 0) + 1
        }));
        setSelectedExam(null);
        
        // Show results
        const exam = practiceExams.find(e => e.id === examId);
        const passed = score >= (exam?.passingScore || 70);
        alert(`Exam completed! Score: ${score}% - ${passed ? 'PASSED' : 'FAILED'}`);
    };

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const getDifficultyLevel = (questionCount: number) => {
        if (questionCount <= 15) return { level: 'Beginner', color: 'text-green-600' };
        if (questionCount <= 30) return { level: 'Intermediate', color: 'text-yellow-600' };
        return { level: 'Advanced', color: 'text-red-600' };
    };

    if (selectedExam) {
        return (
            <ExamInterface
                exam={selectedExam}
                onComplete={handleCompleteExam}
                onCancel={() => setSelectedExam(null)}
            />
        );
    }

    return (
        <div className="practice-exam-container bg-surface border border-border rounded-lg">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold font-mono text-text-primary uppercase tracking-wider">
                            Practice Examinations
                        </h3>
                        <p className="text-text-secondary mt-2">
                            Test your knowledge and prepare for the OCRP certification with realistic practice exams.
                        </p>
                    </div>
                    {!hasPracticeExamAccess && (
                        <div className="text-center">
                            <div className="text-sm text-text-muted mb-2">Premium Feature</div>
                            <button
                                onClick={onUpgrade}
                                className="btn-primary text-sm px-4 py-2"
                            >
                                Upgrade Plan
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                    {practiceExams.map((exam) => {
                        const isLocked = exam.isPremium && !hasPracticeExamAccess;
                        const remainingAttempts = getRemainingAttempts(exam);
                        const difficulty = getDifficultyLevel(exam.questionCount);
                        const attemptsUsed = getAttemptsUsed(exam.id);

                        return (
                            <div
                                key={exam.id}
                                className={`border border-border rounded-lg p-6 transition-all duration-300 ${
                                    isLocked ? 'opacity-75 bg-surface-elevated' : 'hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-lg font-semibold text-text-primary">
                                                {exam.title}
                                            </h4>
                                            {exam.isPremium && (
                                                <span className="bg-primary/20 text-primary px-2 py-1 text-xs font-bold rounded uppercase">
                                                    Premium
                                                </span>
                                            )}
                                            {isLocked && (
                                                <span className="text-text-muted">🔒</span>
                                            )}
                                        </div>
                                        
                                        <p className="text-text-secondary mb-4">
                                            {exam.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Exam Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="text-center p-3 bg-surface-elevated rounded">
                                        <div className="text-lg font-bold text-text-primary">{exam.questionCount}</div>
                                        <div className="text-xs text-text-muted uppercase">Questions</div>
                                    </div>
                                    <div className="text-center p-3 bg-surface-elevated rounded">
                                        <div className="text-lg font-bold text-text-primary">{formatTime(exam.timeLimit)}</div>
                                        <div className="text-xs text-text-muted uppercase">Time Limit</div>
                                    </div>
                                    <div className="text-center p-3 bg-surface-elevated rounded">
                                        <div className="text-lg font-bold text-text-primary">{exam.passingScore}%</div>
                                        <div className="text-xs text-text-muted uppercase">Pass Score</div>
                                    </div>
                                    <div className="text-center p-3 bg-surface-elevated rounded">
                                        <div className={`text-lg font-bold ${difficulty.color}`}>{difficulty.level}</div>
                                        <div className="text-xs text-text-muted uppercase">Difficulty</div>
                                    </div>
                                </div>

                                {/* Module Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {exam.moduleIds.map((moduleId) => (
                                        <span
                                            key={moduleId}
                                            className="bg-border text-text-secondary px-2 py-1 text-xs rounded"
                                        >
                                            {moduleId.replace('module', 'Module ')}
                                        </span>
                                    ))}
                                </div>

                                {/* Attempts Counter */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-sm text-text-secondary">
                                        Attempts: {attemptsUsed}/{exam.attempts}
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        {remainingAttempts} remaining
                                    </div>
                                </div>

                                {/* Progress Bar for Attempts */}
                                <div className="w-full bg-border rounded-full h-2 mb-4">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(attemptsUsed / exam.attempts) * 100}%` }}
                                    ></div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleStartExam(exam)}
                                    disabled={remainingAttempts <= 0 && !isLocked}
                                    className={`w-full py-3 px-4 font-semibold rounded transition-colors ${
                                        isLocked
                                            ? 'bg-border text-text-muted cursor-not-allowed'
                                            : remainingAttempts <= 0
                                            ? 'bg-border text-text-muted cursor-not-allowed'
                                            : 'btn-primary'
                                    }`}
                                >
                                    {isLocked ? (
                                        '🔒 Start Exam'
                                    ) : remainingAttempts <= 0 ? (
                                        'No Attempts Remaining'
                                    ) : (
                                        'Start Exam'
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {!hasPracticeExamAccess && (
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded text-center">
                        <h4 className="font-semibold text-primary mb-2">Unlock Practice Examinations</h4>
                        <p className="text-sm text-text-secondary mb-3">
                            Access comprehensive practice exams with detailed explanations and unlimited retakes. Perfect your knowledge before the final certification.
                        </p>
                        <button
                            onClick={onUpgrade}
                            className="btn-primary px-6 py-2"
                        >
                            Upgrade to Premium
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Simple exam interface component for demonstration
const ExamInterface: React.FC<{
    exam: PracticeExamType;
    onComplete: (examId: string, score: number) => void;
    onCancel: () => void;
}> = ({ exam, onComplete, onCancel }) => {
    const [timeRemaining, setTimeRemaining] = useState(exam.timeLimit * 60); // Convert to seconds
    const [currentQuestion, setCurrentQuestion] = useState(1);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    // Time's up - auto submit
                    onComplete(exam.id, Math.floor(Math.random() * 40 + 50)); // Random score for demo
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [exam.id, onComplete]);

    const formatTimeRemaining = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmitExam = () => {
        const confirmed = window.confirm('Are you sure you want to submit your exam? This action cannot be undone.');
        if (confirmed) {
            // Generate a random score for demonstration
            const score = Math.floor(Math.random() * 40 + 50);
            onComplete(exam.id, score);
        }
    };

    return (
        <div className="exam-interface bg-surface border border-border rounded-lg">
            {/* Exam Header */}
            <div className="p-6 border-b border-border bg-primary/5">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-text-primary">{exam.title}</h3>
                        <p className="text-text-secondary">Question {currentQuestion} of {exam.questionCount}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-primary">
                            {formatTimeRemaining(timeRemaining)}
                        </div>
                        <div className="text-sm text-text-secondary">Time Remaining</div>
                    </div>
                </div>
            </div>

            {/* Exam Content */}
            <div className="p-6">
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-text-primary mb-4">
                        Sample Question: Which of the following is a core principle of PIPEDA?
                    </h4>
                    <div className="space-y-3">
                        {[
                            'A) Organizations can collect personal information without consent',
                            'B) Personal information must be collected for identified purposes',
                            'C) Personal information can be used for any business purpose',
                            'D) Individuals have no rights regarding their personal information'
                        ].map((option, index) => (
                            <label key={index} className="flex items-center gap-3 p-3 border border-border rounded hover:bg-surface-elevated cursor-pointer">
                                <input type="radio" name="question" value={option} className="text-primary" />
                                <span className="text-text-primary">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-text-secondary hover:text-primary transition-colors"
                        >
                            Exit Exam
                        </button>
                        <button
                            onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
                            disabled={currentQuestion === 1}
                            className="px-4 py-2 bg-surface-elevated border border-border text-text-primary rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                    </div>
                    
                    <div className="flex gap-3">
                        <button
                            onClick={() => setCurrentQuestion(Math.min(exam.questionCount, currentQuestion + 1))}
                            disabled={currentQuestion === exam.questionCount}
                            className="px-4 py-2 bg-surface-elevated border border-border text-text-primary rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                        <button
                            onClick={handleSubmitExam}
                            className="btn-primary px-6 py-2"
                        >
                            Submit Exam
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeExam;