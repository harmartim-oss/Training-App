/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4, CheckCircleIcon, XCircleIcon } from '../icons';

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
        { id: 'module1', title: 'Privacy Laws & Frameworks', icon: <ModuleIcon1 className="w-8 h-8 text-primary" /> },
        { id: 'module2', title: 'Cybersecurity & Incident Response', icon: <ModuleIcon2 className="w-8 h-8 text-primary" /> },
        { id: 'module3', title: 'AI Governance & Responsible Use', icon: <ModuleIcon3 className="w-8 h-8 text-primary" /> },
        { id: 'module4', title: 'Secure Data & Records Management', icon: <ModuleIcon4 className="w-8 h-8 text-primary" /> },
    ];

    const completedCount = modules.filter(m => progress[m.id as keyof Omit<Progress, 'assessment'>].completed).length;
    const totalModules = modules.length;
    const overallProgress = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    const getStatus = (moduleProgress: { completed: boolean }) => {
        return moduleProgress.completed 
            ? { text: 'Completed', icon: <CheckCircleIcon className="w-5 h-5 text-green" /> }
            : { text: 'Not Started', icon: <XCircleIcon className="w-5 h-5 text-text-secondary/50" /> };
    };

    return (
        <section className="animate-fade-in">
            <h1 className="text-4xl font-bold font-mono text-text-primary mb-8 uppercase tracking-wider">Training Dashboard</h1>
            
            <div className="bg-surface border border-border p-6 mb-10">
                <h3 className="text-xl font-semibold font-mono mb-4 text-primary uppercase">Overall Progress</h3>
                <div className="w-full bg-background rounded-none h-4 mb-2 border-2 border-border p-0.5">
                    <div className="bg-primary h-full transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-text-secondary font-mono">
                    <span>{Math.round(overallProgress)}% COMPLETE</span>
                    <span>{completedCount} OF {totalModules} MODULES</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold font-mono text-text-primary mb-6 uppercase tracking-wider">Modules</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {modules.map(module => {
                    const moduleProgress = progress[module.id as keyof Omit<Progress, 'assessment'>];
                    const status = getStatus(moduleProgress);
                    return (
                        <div key={module.id} className="card-interactive bg-surface border border-border p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    {module.icon}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary font-mono">
                                    {status.icon}
                                    <span>{status.text}</span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg font-mono text-text-primary mb-2 flex-grow uppercase">{module.title}</h3>
                            <button onClick={() => onNavigate(module.id)} className="w-full mt-4 btn-primary py-2.5 px-4 text-sm">
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