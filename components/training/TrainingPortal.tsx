/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Module1 from './Module1';
import Module2 from './Module2';
import Module3 from './Module3';
import Module4 from './Module4';
import Assessment from './Assessment';
import Certificate from './Certificate';

interface User {
    fullname: string;
    organizationType: string;
    organizationName: string;
    email: string;
    loginDate: string;
}

interface Progress {
    module1: { completed: boolean; score: number; progress: number };
    module2: { completed: boolean; score: number; progress: number };
    module3: { completed: boolean; score: number; progress: number };
    module4: { completed: boolean; score: number; progress: number };
    assessment: { completed: boolean; score: number; passed: boolean };
}

const initialProgress: Progress = {
    module1: { completed: false, score: 0, progress: 0 },
    module2: { completed: false, score: 0, progress: 0 },
    module3: { completed: false, score: 0, progress: 0 },
    module4: { completed: false, score: 0, progress: 0 },
    assessment: { completed: false, score: 0, passed: false }
};

interface TrainingPortalProps {
    onNavigateToLanding: () => void;
}

const TrainingPortal: React.FC<TrainingPortalProps> = ({ onNavigateToLanding }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProgress, setUserProgress] = useState<Progress>(initialProgress);
    const [activeSection, setActiveSection] = useState('login');

    useEffect(() => {
        const savedUser = localStorage.getItem('cyberTrainingUser');
        const savedProgress = localStorage.getItem('cyberTrainingProgress');
        
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            setCurrentUser(user);
            setActiveSection('dashboard');
            if (savedProgress) {
                setUserProgress(JSON.parse(savedProgress));
            }
        } else {
            setActiveSection('login');
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('cyberTrainingUser', JSON.stringify(currentUser));
            localStorage.setItem('cyberTrainingProgress', JSON.stringify(userProgress));
        }
    }, [currentUser, userProgress]);

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setUserProgress(initialProgress); // Reset progress on new login
        setActiveSection('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setUserProgress(initialProgress);
        localStorage.removeItem('cyberTrainingUser');
        localStorage.removeItem('cyberTrainingProgress');
        onNavigateToLanding();
    };
    
    const handleCompleteModule = (module: keyof Omit<Progress, 'assessment'>, score: number) => {
        setUserProgress(prev => ({
            ...prev,
            [module]: { ...prev[module], completed: true, score, progress: 100 }
        }));
        const nextModuleNum = parseInt(module.replace('module', ''), 10) + 1;
        if (nextModuleNum <= 4) {
            setActiveSection(`module${nextModuleNum}`);
        } else {
            setActiveSection('assessment');
        }
    };

    const handleSubmitAssessment = (score: number) => {
        const passed = score >= 80;
        setUserProgress(prev => ({
            ...prev,
            assessment: { completed: true, score, passed }
        }));
        setActiveSection('assessment'); // Stay on assessment page to show results
    }

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard progress={userProgress} onNavigate={setActiveSection} />;
            case 'module1':
                return <Module1 onComplete={(score) => handleCompleteModule('module1', score)} onNavigate={setActiveSection} />;
            case 'module2':
                 return <Module2 onComplete={(score) => handleCompleteModule('module2', score)} onNavigate={setActiveSection} />;
            case 'module3':
                 return <Module3 onComplete={(score) => handleCompleteModule('module3', score)} onNavigate={setActiveSection} />;
            case 'module4':
                 return <Module4 onComplete={(score) => handleCompleteModule('module4', score)} onNavigate={setActiveSection} />;
            case 'assessment':
                 return <Assessment onSubmit={handleSubmitAssessment} progress={userProgress} onNavigate={setActiveSection}/>;
            case 'certificate':
                 return <Certificate user={currentUser!} progress={userProgress} />;
            default:
                return <Login onLogin={handleLogin} />;
        }
    }

    if (!currentUser) {
        return <Login onLogin={handleLogin} />;
    }
    
    return (
        <div className="flex min-h-screen bg-background text-text-primary">
            <Nav 
                activeSection={activeSection} 
                onNavigate={setActiveSection} 
                currentUser={currentUser}
                onLogout={handleLogout}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-background">
                {renderSection()}
            </main>
        </div>
    );
};

export default TrainingPortal;