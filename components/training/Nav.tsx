/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo, DashboardIcon, ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4, AssessmentIcon, CertificateIcon, LogoutIcon, CheckCircleIcon, CalculatorIcon } from '../icons';

interface User {
    fullname: string;
}

interface Progress {
    module1: { completed: boolean; score: number; progress: number };
    module2: { completed: boolean; score: number; progress: number };
    module3: { completed: boolean; score: number; progress: number };
    module4: { completed: boolean; score: number; progress: number };
    assessment: { completed: boolean; score: number; passed: boolean };
}

interface NavProps {
    activeSection: string;
    onNavigate: (section: string) => void;
    currentUser: User;
    onLogout: () => void;
    onNavigateToLanding?: () => void;
    progress?: Progress;
}

const Nav: React.FC<NavProps> = ({ activeSection, onNavigate, currentUser, onLogout, onNavigateToLanding, progress }) => {
    
    const getModuleStatus = (moduleId: string) => {
        if (!progress || moduleId === 'dashboard' || moduleId === 'certificate') return 'available';
        
        const moduleKey = moduleId as keyof Omit<Progress, 'assessment'>;
        const moduleProgress = progress[moduleKey];
        
        if (moduleProgress?.completed) return 'completed';
        
        // Check if module is unlocked based on previous modules
        const moduleOrder = ['module1', 'module2', 'module3', 'module4'];
        const currentIndex = moduleOrder.indexOf(moduleId);
        
        if (currentIndex === 0) return 'available';
        if (currentIndex > 0) {
            const prevModuleKey = moduleOrder[currentIndex - 1] as keyof Omit<Progress, 'assessment'>;
            return progress[prevModuleKey]?.completed ? 'available' : 'locked';
        }
        
        if (moduleId === 'assessment') {
            const allModulesCompleted = moduleOrder.every(mid => progress[mid as keyof Omit<Progress, 'assessment'>]?.completed);
            return allModulesCompleted ? 'available' : 'locked';
        }
        
        return 'available';
    };

    const getProgressPercentage = (moduleId: string): number => {
        if (!progress || moduleId === 'dashboard' || moduleId === 'certificate') return 0;
        
        if (moduleId === 'assessment') {
            return progress.assessment?.completed ? 100 : 0;
        }
        
        const moduleKey = moduleId as keyof Omit<Progress, 'assessment'>;
        return progress[moduleKey]?.progress || 0;
    };

    const navSections = [
        {
            title: 'Overview',
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5"/> }
            ]
        },
        {
            title: 'Training Modules',
            items: [
                { id: 'module1', label: 'Privacy Laws & Frameworks', icon: <ModuleIcon1 className="w-5 h-5"/> },
                { id: 'module2', label: 'Cybersecurity & Incident Response', icon: <ModuleIcon2 className="w-5 h-5"/> },
                { id: 'module3', label: 'AI Governance & Responsible Use', icon: <ModuleIcon3 className="w-5 h-5"/> },
                { id: 'module4', label: 'Secure Data & Records Management', icon: <ModuleIcon4 className="w-5 h-5"/> },
            ]
        },
        {
            title: 'Professional Tools',
            items: [
                { id: 'legal-budget-calculator', label: 'Legal Budget Calculator', icon: <CalculatorIcon className="w-5 h-5"/> }
            ]
        },
        {
            title: 'Completion',
            items: [
                { id: 'assessment', label: 'Final Assessment', icon: <AssessmentIcon className="w-5 h-5"/> },
                { id: 'certificate', label: 'Certificate', icon: <CertificateIcon className="w-5 h-5"/> }
            ]
        }
    ];
    
    return (
        <aside className="no-print nav-enhanced flex-shrink-0 flex flex-col border-r border-border">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-4">
                    <ODDILogo className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="hidden lg:block">
                        <button
                            onClick={onNavigateToLanding}
                            className="text-left hover:text-primary transition-colors"
                            title="Back to Landing Page"
                        >
                            <h1 className="font-bold text-sm text-text-primary hover:text-primary">ODDI Portal</h1>
                            <p className="text-xs text-text-secondary">Training Dashboard</p>
                        </button>
                    </div>
                    {/* Mobile back button */}
                    {onNavigateToLanding && (
                        <button
                            onClick={onNavigateToLanding}
                            className="lg:hidden text-text-secondary hover:text-primary transition-colors p-1"
                            title="Back to Landing Page"
                        >
                            ←
                        </button>
                    )}
                </div>
                <div className="hidden lg:block bg-surface-elevated rounded-lg p-3">
                    <p className="text-xs font-semibold text-text-secondary mb-1">Welcome back,</p>
                    <p className="text-sm font-bold text-text-primary truncate">{currentUser.fullname}</p>
                </div>
            </div>
            
            <nav className="flex-1 py-4 overflow-y-auto">
                {navSections.map(section => (
                    <div key={section.title} className="mb-6">
                        <h3 className="nav-section-header hidden lg:block">{section.title}</h3>
                        <div className="px-2 space-y-1">
                            {section.items.map(item => {
                                const status = getModuleStatus(item.id);
                                const progressPercentage = getProgressPercentage(item.id);
                                const isActive = activeSection === item.id;
                                const isLocked = status === 'locked';
                                
                                return (
                                    <button 
                                        key={item.id}
                                        onClick={() => !isLocked && onNavigate(item.id)} 
                                        disabled={isLocked}
                                        className={`nav-item ${
                                            isActive ? 'nav-item-active' : ''
                                        } ${
                                            status === 'completed' ? 'nav-item-completed' : ''
                                        } ${
                                            isLocked ? 'nav-item-locked' : ''
                                        }`}
                                    >
                                        <div className={`nav-progress-ring ${status}`}>
                                            {status === 'completed' ? (
                                                <CheckCircleIcon className="w-4 h-4" />
                                            ) : (
                                                <span>{progressPercentage > 0 ? Math.round(progressPercentage) : item.icon}</span>
                                            )}
                                        </div>
                                        <div className="nav-item-text hidden lg:block flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{item.label}</span>
                                                {status === 'completed' && (
                                                    <CheckCircleIcon className="w-4 h-4 text-success" />
                                                )}
                                            </div>
                                            {progressPercentage > 0 && progressPercentage < 100 && (
                                                <div className="mt-1 w-full bg-background rounded-full h-1">
                                                    <div 
                                                        className="bg-primary h-full rounded-full transition-all duration-500" 
                                                        style={{ width: `${progressPercentage}%` }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button 
                    onClick={onLogout} 
                    className="nav-item w-full text-danger hover:bg-danger hover:text-white"
                >
                    <LogoutIcon className="w-5 h-5 flex-shrink-0"/>
                    <span className="nav-item-text hidden lg:block ml-3">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Nav;