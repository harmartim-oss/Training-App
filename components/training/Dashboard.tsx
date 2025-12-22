/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4, CheckCircleIcon, XCircleIcon, AssessmentIcon, ClockIcon, TrophyIcon, UserIcon, SettingsIcon, CreditCardIcon, LogoutIcon } from '../icons';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';
import { useGamification } from '../../hooks/useGamification';
import { useAdaptiveLearning } from '../../hooks/useAdaptiveLearning';
import SpacedRepetitionReview from '../common/SpacedRepetitionReview';
import LearningAnalytics from '../common/LearningAnalytics';
import SessionTimer from '../common/SessionTimer';
import { getCPDRequirementForTier, calculateCPDProgress } from '../../config/cpd';
import { CognitiveProgressIndicator } from '../common/BloomsTaxonomyIndicator';

interface Progress {
    module1: { completed: boolean; score: number; progress: number };
    module2: { completed: boolean; score: number; progress: number };
    module3: { completed: boolean; score: number; progress: number };
    module4: { completed: boolean; score: number; progress: number };
    assessment: { completed: boolean; score: number; passed: boolean };
}

interface DashboardProps {
    progress: Progress;
    onNavigate: (section: string) => void;
    currentUser?: any; // User info including subscription tier
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onNavigate, currentUser }) => {
    const [showReviewSession, setShowReviewSession] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
    
    const userId = currentUser?.email || 'demo-user';
    const { getDueCount, updateDueItems } = useSpacedRepetition();
    const gamification = useGamification(userId);
    const { profile, recommendations } = useAdaptiveLearning(userId);

    useEffect(() => {
        updateDueItems();
    }, []);

    useEffect(() => {
        // Show achievement notification if there are new achievements
        if (gamification.newAchievements.length > 0) {
            setShowAchievements(true);
        }
    }, [gamification.newAchievements]);
    
    const modules = [
        { 
            id: 'module1', 
            title: 'Privacy Laws & Frameworks', 
            description: 'Navigate PIPEDA, MFIPPA, PHIPA, FIPPA, and FOI request processes',
            icon: <ModuleIcon1 className="w-8 h-8 text-primary" />,
            estimatedTime: '3-4 hours'
        },
        { 
            id: 'module2', 
            title: 'Cybersecurity & Incident Response', 
            description: 'Implement risk assessments and manage active security threats',
            icon: <ModuleIcon2 className="w-8 h-8 text-primary" />,
            estimatedTime: '3-4 hours'
        },
        { 
            id: 'module3', 
            title: 'AI Governance & Responsible Use', 
            description: 'Apply Ontario\'s directive for the ethical deployment of AI systems',
            icon: <ModuleIcon3 className="w-8 h-8 text-primary" />,
            estimatedTime: '2-3 hours'
        },
        { 
            id: 'module4', 
            title: 'Secure Data & Records Management', 
            description: 'Master data classification, retention policies, and cross-border compliance',
            icon: <ModuleIcon4 className="w-8 h-8 text-primary" />,
            estimatedTime: '3-4 hours'
        },
    ];

    const completedCount = modules.filter(m => progress[m.id as keyof Omit<Progress, 'assessment'>].completed).length;
    const totalModules = modules.length;
    const overallProgress = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    const getStatus = (moduleProgress: { completed: boolean; score: number }) => {
        return moduleProgress.completed 
            ? { 
                text: 'Completed', 
                icon: <CheckCircleIcon className="w-5 h-5 text-success" />,
                badge: 'completed',
                score: moduleProgress.score,
                className: 'status-indicator completed'
            }
            : { 
                text: 'Not Started', 
                icon: <XCircleIcon className="w-5 h-5 text-text-secondary/50" />,
                badge: 'not-started',
                className: 'status-indicator not-started'
            };
    };

    const isModuleLocked = (moduleId: string): boolean => {
        const moduleOrder = ['module1', 'module2', 'module3', 'module4'];
        const currentIndex = moduleOrder.indexOf(moduleId);
        
        if (currentIndex <= 0) return false;
        
        const prevModuleKey = moduleOrder[currentIndex - 1] as keyof Omit<Progress, 'assessment'>;
        return !progress[prevModuleKey]?.completed;
    };

    return (
        <>
            {showReviewSession && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="max-w-4xl w-full max-h-screen overflow-y-auto">
                        <SpacedRepetitionReview 
                            onClose={() => setShowReviewSession(false)}
                            maxReviews={10}
                        />
                    </div>
                </div>
            )}

            {showAnalytics && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="max-w-6xl w-full max-h-screen overflow-y-auto">
                        <div className="bg-surface rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-text-primary">Learning Analytics</h2>
                                <button 
                                    onClick={() => setShowAnalytics(false)}
                                    className="text-text-secondary hover:text-text-primary"
                                >
                                    ✕
                                </button>
                            </div>
                            <LearningAnalytics userId={userId} currentUser={currentUser} />
                        </div>
                    </div>
                </div>
            )}

            {/* Level Up Animation */}
            {gamification.levelUpAnimation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-surface rounded-lg p-8 text-center animate-bounce">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-primary mb-2">Level Up!</h2>
                        <p className="text-text-secondary">You've reached Level {gamification.level}!</p>
                    </div>
                </div>
            )}

            {/* Achievement Notifications */}
            {gamification.newAchievements.length > 0 && showAchievements && (
                <div className="fixed top-4 right-4 z-50 space-y-2">
                    {gamification.newAchievements.map((achievement) => (
                        <div key={achievement.id} className="bg-surface border border-border rounded-lg p-4 shadow-lg animate-slide-in-right max-w-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{achievement.icon}</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-text-primary">Achievement Unlocked!</h3>
                                    <p className="text-sm text-text-secondary">{achievement.title}</p>
                                    <p className="text-xs text-primary">+{achievement.points} points</p>
                                </div>
                                <button 
                                    onClick={() => setShowAchievements(false)}
                                    className="text-text-secondary hover:text-text-primary"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <section className="animate-fade-in max-w-7xl mx-auto">
                {/* Enhanced Header Section with Gamification */}
                <div className="mb-12">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold font-mono text-text-primary mb-4 uppercase tracking-wider">
                                Training Dashboard
                            </h1>
                            <p className="text-lg text-text-secondary max-w-2xl">
                                Welcome to your Ontario Certified Cyber Resilience Professional journey. 
                                Complete all modules to earn your certification.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Level and XP Display */}
                            <div className="bg-surface border border-border rounded-lg p-3 text-center">
                                <div className="text-sm text-text-secondary">Level</div>
                                <div className="text-xl font-bold text-primary">{gamification.level}</div>
                                <div className="w-20 bg-background rounded-full h-2 mt-1">
                                    <div 
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${gamification.getProgressToNextLevel()}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-text-secondary mt-1">
                                    {gamification.currentXP}/{gamification.nextLevelXP} XP
                                </div>
                            </div>

                            {/* Streak Display */}
                            <div className="bg-surface border border-border rounded-lg p-3 text-center">
                                <div className="text-sm text-text-secondary">Streak</div>
                                <div className="text-xl font-bold text-primary flex items-center gap-1 justify-center">
                                    🔥 {gamification.streak}
                                </div>
                                <div className="text-xs text-text-secondary">days</div>
                            </div>

                            {/* Points Display */}
                            <div className="bg-surface border border-border rounded-lg p-3 text-center">
                                <div className="text-sm text-text-secondary">Points</div>
                                <div className="text-xl font-bold text-primary">{gamification.totalPoints}</div>
                                <div className="text-xs text-text-secondary">total</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Bar */}
                    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
                        <div className="flex flex-wrap gap-3">
                            {getDueCount() > 0 && (
                                <button
                                    onClick={() => setShowReviewSession(true)}
                                    className="btn-primary text-sm flex items-center gap-2"
                                >
                                    🔄 Review ({getDueCount()})
                                </button>
                            )}
                            
                            <button
                                onClick={() => setShowAnalytics(true)}
                                className="btn-secondary text-sm flex items-center gap-2"
                            >
                                📊 Analytics
                            </button>

                            {recommendations.length > 0 && (
                                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                                    <span className="text-blue-600">💡</span>
                                    <span className="text-sm text-blue-800">
                                        {recommendations[0].title}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CPD Status Quick View */}
                    {(() => {
                        const cpdRequirement = getCPDRequirementForTier(currentUser?.subscriptionTier || 'basic');
                        if (cpdRequirement.annualHoursRequired > 0) {
                            const cpdHours = currentUser?.cpdHours || {
                                total: 0,
                                required: cpdRequirement.annualHoursRequired,
                                byCategory: { training: 0, thirdParty: 0, formalStudy: 0, conferences: 0, other: 0 },
                                periodStart: new Date().toISOString().split('T')[0],
                                periodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            };
                            const progress = calculateCPDProgress(cpdHours, cpdRequirement);

                            return (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl">📊</div>
                                            <div>
                                                <h3 className="font-semibold text-text-primary">CPD Progress</h3>
                                                <p className="text-sm text-text-secondary">
                                                    {cpdHours.total} of {cpdRequirement.annualHoursRequired} hours completed
                                                </p>
                                                <div className="w-40 bg-background rounded-full h-2 mt-1">
                                                    <div 
                                                        className={`h-2 rounded-full transition-all ${
                                                            progress >= 100 ? 'bg-success' : 'bg-primary'
                                                        }`}
                                                        style={{ width: `${Math.min(100, progress)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onNavigate('cpd-tracking')}
                                            className="btn-secondary text-sm"
                                        >
                                            Manage CPD →
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })()}

                    {/* Session Timer */}
                    <div className="mb-6">
                        <SessionTimer 
                            sessionDuration={25}
                            onSessionComplete={() => {
                                // Award XP for completing a study session
                                gamification.awardPoints(50, 'Study Session Completed');
                                gamification.updateStreak();
                            }}
                        />
                    </div>
                    
                    {/* Motivational Message */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-primary-light to-surface-elevated border border-border-light rounded-lg">
                    <p className="text-text-primary font-medium">
                        {completedCount === 0 ? 
                            "🚀 Ready to start your cybersecurity certification journey? Begin with Module 1 to master privacy fundamentals!" :
                            completedCount === totalModules ?
                            "🎉 Congratulations! You've completed all modules. Take the final assessment to earn your certification!" :
                            `💪 Great progress! You've completed ${completedCount} out of ${totalModules} modules. Keep going!`
                        }
                    </p>
                </div>
            </div>
            
            {/* Overall Progress Section */}
            <div className="module-card-enhanced p-8 mb-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-semibold font-mono mb-2 text-primary uppercase">Overall Progress</h3>
                        <p className="text-text-secondary">Track your journey through the OCRP certification program</p>
                    </div>
                    <div className="mt-4 lg:mt-0 text-right">
                        <div className="text-3xl font-bold text-primary">{Math.round(overallProgress)}%</div>
                        <div className="text-sm text-text-secondary">{completedCount} of {totalModules} modules</div>
                        {overallProgress > 0 && (
                            <div className="text-xs text-text-muted mt-1">
                                {overallProgress < 25 ? "🌱 Getting Started" :
                                 overallProgress < 50 ? "📈 Building Knowledge" :
                                 overallProgress < 75 ? "💪 Making Progress" :
                                 overallProgress < 100 ? "🏃‍♂️ Almost There" : "🎯 Ready for Assessment"}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="progress-bar-enhanced">
                    <div 
                        className="progress-fill-enhanced" 
                        style={{ width: `${overallProgress}%` }}
                    ></div>
                </div>
                
                <div className="flex justify-between text-sm text-text-secondary font-mono mt-2">
                    <span>Started</span>
                    <span>In Progress</span>
                    <span>Completed</span>
                </div>
                
                {/* Learning Path Visualization */}
                <div className="mt-6 p-4 bg-surface-elevated rounded-lg">
                    <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">Learning Path</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Privacy Laws', 'Cybersecurity', 'AI Governance', 'Data Management', 'Assessment'].map((topic, index) => (
                            <div key={topic} className={`px-3 py-1 rounded-full text-xs font-medium ${
                                index < completedCount ? 'bg-success text-white' :
                                index === completedCount ? 'bg-primary text-white' :
                                'bg-surface border border-border text-text-muted'
                            }`}>
                                {index < completedCount ? '✓' : index === completedCount ? '🔄' : '○'} {topic}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Bloom's Taxonomy Cognitive Progress */}
                <div className="mt-6">
                    <CognitiveProgressIndicator 
                        completedObjectives={
                            // Track completed objectives based on module completion
                            Object.keys(progress)
                                .filter(key => key.startsWith('module') && progress[key as keyof Progress]?.completed)
                                .map(key => `m${key.replace('module', '')}-completed`)
                        }
                    />
                </div>
            </div>

            {/* Modules Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold font-mono text-text-primary uppercase tracking-wider">
                        Training Modules
                    </h2>
                    <div className="text-sm text-text-secondary">
                        Estimated total time: 10-14 hours
                    </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                    {modules.map((module, index) => {
                        const moduleProgress = progress[module.id as keyof Omit<Progress, 'assessment'>];
                        const status = getStatus(moduleProgress);
                        const isLocked = isModuleLocked(module.id);
                        
                        return (
                            <div 
                                key={module.id} 
                                className={`module-card-enhanced p-6 ${
                                    status.badge === 'completed' ? 'completed' : ''
                                } ${isLocked ? 'opacity-50' : ''}`}
                            >
                                {status.badge === 'completed' && (
                                    <div className="module-card-completed-badge">
                                        ✓ Score: {status.score}%
                                    </div>
                                )}
                                
                                <div className="flex items-start justify-between mb-6">
                                    <div className="module-icon-container">
                                        {module.icon}
                                    </div>
                                    <div className={status.className}>
                                        {status.icon}
                                        <span>{status.text}</span>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="font-semibold text-xl font-mono text-text-primary mb-2 uppercase">
                                        Module {index + 1}: {module.title}
                                    </h3>
                                    <p className="text-text-secondary mb-4 leading-relaxed">
                                        {module.description}
                                    </p>
                                    
                                    {/* Enhanced module info with visual indicators */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="w-4 h-4" />
                                            <span className="font-semibold">Time:</span> {module.estimatedTime}
                                        </div>
                                        
                                        {/* Difficulty indicator */}
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold">Level:</span>
                                            <div className="flex gap-1">
                                                {Array.from({ length: 3 }, (_, i) => (
                                                    <div key={i} className={`w-2 h-2 rounded-full ${
                                                        i < (index === 0 ? 1 : index === 1 ? 2 : 3) 
                                                            ? 'bg-primary' 
                                                            : 'bg-border'
                                                    }`} />
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {status.badge === 'completed' && (
                                            <div className="flex items-center gap-1 text-success">
                                                <TrophyIcon className="w-4 h-4" />
                                                <span className="font-semibold">Score:</span> {status.score}%
                                            </div>
                                        )}
                                        
                                        {/* Prerequisites indicator */}
                                        {isLocked && (
                                            <div className="flex items-center gap-1 text-warning">
                                                <span className="text-xs">🔒</span>
                                                <span className="font-semibold text-xs">Complete previous module</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Learning outcomes preview */}
                                    {!isLocked && status.badge !== 'completed' && (
                                        <div className="mt-4 p-3 bg-surface-elevated rounded-lg border border-border-light">
                                            <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">You'll Learn:</p>
                                            <ul className="text-sm text-text-secondary space-y-1">
                                                {index === 0 && (
                                                    <>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>PIPEDA's 10 Fair Information Principles</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>MFIPPA compliance requirements</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Privacy Impact Assessment processes</li>
                                                    </>
                                                )}
                                                {index === 1 && (
                                                    <>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Cybersecurity frameworks and controls</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Incident response procedures</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Risk assessment methodologies</li>
                                                    </>
                                                )}
                                                {index === 2 && (
                                                    <>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Ontario's AI governance directive</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Ethical AI implementation</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Algorithmic Impact Assessments</li>
                                                    </>
                                                )}
                                                {index === 3 && (
                                                    <>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Data classification systems</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Records retention policies</li>
                                                        <li className="flex items-center gap-2"><span className="text-primary">▸</span>Cross-border data compliance</li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Module Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                                        <span>Progress</span>
                                        <span>{moduleProgress.completed ? '100%' : moduleProgress.progress}%</span>
                                    </div>
                                    <div className="w-full bg-border rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-500 ease-out ${
                                                moduleProgress.completed 
                                                    ? 'bg-gradient-to-r from-success to-primary' 
                                                    : 'bg-gradient-to-r from-primary to-accent'
                                            }`}
                                            style={{ 
                                                width: `${moduleProgress.completed ? 100 : moduleProgress.progress}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => onNavigate(module.id)} 
                                    disabled={isLocked}
                                    className={`w-full mt-4 py-3 px-6 text-base font-semibold rounded-lg transition-all duration-200 ${
                                        isLocked 
                                            ? 'bg-border text-text-muted cursor-not-allowed'
                                            : 'btn-primary'
                                    }`}
                                >
                                    {isLocked 
                                        ? 'Complete previous module first' 
                                        : moduleProgress.completed 
                                            ? 'Review Module' 
                                            : 'Start Module'
                                    }
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Study Materials Section */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold font-mono text-text-primary mb-6 uppercase tracking-wider">
                    Study Materials
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Exam Study Guide Card */}
                    <div className="module-card-enhanced p-6 border-2 border-primary">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="module-icon-container bg-primary/10">
                                <span className="text-2xl">📖</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">Exam Study Guide</h4>
                                <p className="text-sm text-text-secondary">Complete exam preparation guide</p>
                            </div>
                        </div>
                        <p className="text-text-secondary mb-4 text-sm">
                            Comprehensive review of all modules with key concepts, summaries, and practice questions. Free for all users!
                        </p>
                        <button 
                            onClick={() => onNavigate('exam-study-guide')} 
                            className="btn-primary w-full py-2 px-4"
                        >
                            View Study Guide
                        </button>
                    </div>
                    
                    {/* Study Guide Card */}
                    <div className="module-card-enhanced p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="module-icon-container">
                                <span className="text-2xl">📚</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">Study Guides</h4>
                                <p className="text-sm text-text-secondary">Comprehensive study materials and quick reference cards</p>
                            </div>
                        </div>
                        <p className="text-text-secondary mb-4 text-sm">
                            Download PDF guides and interactive materials to enhance your learning experience.
                        </p>
                        <button 
                            onClick={() => onNavigate('study-guide')} 
                            className="btn-primary w-full py-2 px-4"
                        >
                            Access Study Guides
                        </button>
                        {currentUser?.subscriptionTier === 'basic' && (
                            <div className="mt-2 text-xs text-text-muted text-center">
                                🔒 Premium feature - upgrade to access
                            </div>
                        )}
                    </div>

                    {/* Practice Exam Card */}
                    <div className="module-card-enhanced p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="module-icon-container">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">Practice Exams</h4>
                                <p className="text-sm text-text-secondary">Test your knowledge with realistic practice examinations</p>
                            </div>
                        </div>
                        <p className="text-text-secondary mb-4 text-sm">
                            Practice with module-specific quizzes and comprehensive final exam simulations.
                        </p>
                        <button 
                            onClick={() => onNavigate('practice-exam')} 
                            className="btn-primary w-full py-2 px-4"
                        >
                            Take Practice Exams
                        </button>
                        {currentUser?.subscriptionTier === 'basic' && (
                            <div className="mt-2 text-xs text-text-muted text-center">
                                🔒 Premium feature - upgrade to access
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Management Section */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold font-mono text-text-primary mb-6 uppercase tracking-wider">
                    Account Management
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Account Details Card */}
                    <div className="module-card-enhanced p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="module-icon-container">
                                <UserIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">Account Details</h4>
                                <p className="text-sm text-text-secondary">View and edit your profile information</p>
                            </div>
                        </div>
                        <p className="text-text-secondary mb-4 text-sm">
                            Update your personal information, organization details, and contact preferences.
                        </p>
                        <button 
                            onClick={() => onNavigate('account-details')} 
                            className="btn-secondary w-full py-2 px-4"
                        >
                            Manage Profile
                        </button>
                    </div>

                    {/* Subscription Management Card */}
                    <div className="module-card-enhanced p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="module-icon-container">
                                <CreditCardIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">Subscription</h4>
                                <p className="text-sm text-text-secondary">Manage your training plan and billing</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-text-secondary text-sm mb-2">
                                Current Plan: <span className="font-semibold text-text-primary capitalize">{currentUser?.subscriptionTier}</span>
                            </p>
                            {currentUser?.subscriptionTier === 'basic' && (
                                <p className="text-sm text-warning">
                                    🔓 Upgrade for full access to study materials and practice exams
                                </p>
                            )}
                        </div>
                        <button 
                            onClick={() => onNavigate('subscription')} 
                            className={`w-full py-2 px-4 ${
                                currentUser?.subscriptionTier === 'basic' 
                                    ? 'btn-primary' 
                                    : 'btn-secondary'
                            }`}
                        >
                            {currentUser?.subscriptionTier === 'basic' ? 'Upgrade Plan' : 'Manage Subscription'}
                        </button>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="module-card-enhanced p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="module-icon-container">
                                <SettingsIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">Quick Actions</h4>
                                <p className="text-sm text-text-secondary">Account settings and preferences</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button 
                                onClick={() => onNavigate('account-details')} 
                                className="btn-ghost w-full py-2 px-4 text-left flex items-center gap-2 text-sm"
                            >
                                <UserIcon className="w-4 h-4" />
                                Edit Profile
                            </button>
                            <div className="border-t border-border my-2"></div>
                            <p className="text-xs text-text-muted">
                                Welcome, {currentUser?.fullname}
                            </p>
                            <p className="text-xs text-text-muted">
                                Member since {currentUser?.registrationDate ? new Date(currentUser.registrationDate).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assessment Section */}
            {completedCount === totalModules && (
                <div className="module-card-enhanced p-8 text-center">
                    <div className="module-icon-container mx-auto mb-6">
                        <AssessmentIcon className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-mono text-text-primary mb-4 uppercase">
                        Final Assessment
                    </h3>
                    <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                        You've completed all training modules! Take the final assessment to earn your 
                        Ontario Certified Cyber Resilience Professional (OCRP) certification.
                    </p>
                    <button 
                        onClick={() => onNavigate('assessment')} 
                        className="btn-primary py-3 px-8 text-lg font-semibold"
                    >
                        {progress.assessment.completed ? 'Review Assessment' : 'Take Final Assessment'}
                    </button>
                </div>
            )}
        </section>
        </>
    );
};

export default Dashboard;