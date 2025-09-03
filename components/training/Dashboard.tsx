/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { PrivacyIcon, ShieldIcon, AIIcon, DatabaseIcon, CheckCircleIcon, CircleIcon } from '../icons';

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
        { id: 'module1', title: 'Privacy Laws & Frameworks', icon: PrivacyIcon },
        { id: 'module2', title: 'Cybersecurity & Incident Response', icon: ShieldIcon },
        { id: 'module3', title: 'AI Governance & Responsible Use', icon: AIIcon },
        { id: 'module4', title: 'Secure Data & Records Management', icon: DatabaseIcon },
    ];

    const completedCount = modules.filter(m => progress[m.id as keyof Omit<Progress, 'assessment'>].completed).length;
    const totalModules = modules.length;
    const overallProgress = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    const getStatus = (moduleProgress: { completed: boolean }) => {
        return moduleProgress.completed 
            ? { text: 'Completed', icon: CheckCircleIcon, className: 'text-primary' }
            : { text: 'Not Started', icon: CircleIcon, className: 'text-tertiary' };
    };

    return (
        <section className="animate-fade-in container py-xl">
            <h1 className="font-bold text-primary mb-xl">Training Dashboard</h1>
            
            <div className="card shadow-lg p-xl mb-xl">
                <h3 className="font-semibold text-primary mb-lg">Overall Progress</h3>
                <div className="w-full bg-neutral-200 rounded-full h-4 mb-base overflow-hidden">
                    <div 
                        className="bg-primary h-4 rounded-full transition-all duration-500" 
                        style={{ width: `${overallProgress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-small text-secondary">
                    <span>{Math.round(overallProgress)}% Complete</span>
                    <span>{completedCount} of {totalModules} modules completed</span>
                </div>
            </div>

            <h2 className="font-semibold text-primary mb-lg">Training Modules</h2>
            <div className="grid grid-cols-2 gap-lg mb-xl">
                {modules.map((module, index) => {
                    const moduleProgress = progress[module.id as keyof Omit<Progress, 'assessment'>];
                    const status = getStatus(moduleProgress);
                    const IconComponent = module.icon;
                    const StatusIconComponent = status.icon;
                    return (
                        <div key={module.id} className={`card card-interactive flex flex-col p-xl animate-fade-in animate-delay-${(index + 1) * 100}`}>
                            <div className="flex items-start justify-between mb-lg">
                                <div className="bg-primary text-inverse p-base rounded-lg">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-sm text-small">
                                    <StatusIconComponent className={`w-4 h-4 ${status.className}`} />
                                    <span className={status.className}>{status.text}</span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-primary mb-base flex-grow">{module.title}</h3>
                            <button onClick={() => onNavigate(module.id)} className="btn btn-primary">
                                {moduleProgress.completed ? 'Review Module' : 'Start Module'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Dashboard;