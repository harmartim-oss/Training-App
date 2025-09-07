/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4, CheckCircleIcon, XCircleIcon, AssessmentIcon, ClockIcon, TrophyIcon } from '../icons';

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
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onNavigate }) => {
    
    const modules = [
        { 
            id: 'module1', 
            title: 'Privacy Laws & Frameworks', 
            description: 'Navigate PIPEDA, MFIPPA, and new data breach notification laws',
            icon: <ModuleIcon1 className="w-8 h-8 text-primary" />,
            estimatedTime: '2-3 hours'
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
        <section className="animate-fade-in max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold font-mono text-text-primary mb-4 uppercase tracking-wider">
                    Training Dashboard
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl">
                    Welcome to your Ontario Certified Cyber Resilience Professional journey. 
                    Complete all modules to earn your certification.
                </p>
                
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
    );
};

export default Dashboard;