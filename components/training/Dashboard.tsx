/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4, CheckCircleIcon, XCircleIcon, AssessmentIcon } from '../icons';

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
            description: 'Navigate PIPEDA, FIPPA, and new data breach notification laws',
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
                score: moduleProgress.score 
            }
            : { 
                text: 'Not Started', 
                icon: <XCircleIcon className="w-5 h-5 text-text-secondary/50" />,
                badge: 'not-started' 
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
                                    <div className="flex items-center gap-2 text-sm font-mono">
                                        {status.icon}
                                        <span className={status.badge === 'completed' ? 'text-success font-semibold' : 'text-text-secondary'}>
                                            {status.text}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="font-semibold text-xl font-mono text-text-primary mb-2 uppercase">
                                        Module {index + 1}: {module.title}
                                    </h3>
                                    <p className="text-text-secondary mb-4 leading-relaxed">
                                        {module.description}
                                    </p>
                                    <div className="text-sm text-text-muted">
                                        <span className="font-semibold">Estimated time:</span> {module.estimatedTime}
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