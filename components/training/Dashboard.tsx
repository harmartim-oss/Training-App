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
            ? { text: 'Completed', icon: CheckCircleIcon, className: 'text-green-500' }
            : { text: 'Not Started', icon: CircleIcon, className: 'text-gray-400' };
    };

    return (
        <section className="animate-fade-in">
            <h1 className="text-3xl font-bold text-text-primary mb-6">Training Dashboard</h1>
            
            <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-text-primary">Overall Progress</h3>
                <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
                    <div className="bg-primary h-4 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                    <span>{Math.round(overallProgress)}% Complete</span>
                    <span>{completedCount} of {totalModules} modules completed</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-text-primary mb-4">Modules</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {modules.map(module => {
                    const moduleProgress = progress[module.id as keyof Omit<Progress, 'assessment'>];
                    const status = getStatus(moduleProgress);
                    const IconComponent = module.icon;
                    const StatusIconComponent = status.icon;
                    return (
                        <div key={module.id} className="card-interactive bg-card border border-border rounded-xl p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <IconComponent className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <StatusIconComponent className={`w-4 h-4 ${status.className}`} />
                                    <span>{status.text}</span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg text-text-primary mb-2 flex-grow">{module.title}</h3>
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