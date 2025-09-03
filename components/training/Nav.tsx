/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo, DashboardIcon, ModuleIcon1, ModuleIcon2, ModuleIcon3, ModuleIcon4, AssessmentIcon, CertificateIcon, LogoutIcon } from '../icons';

interface User {
    fullname: string;
}

interface NavProps {
    activeSection: string;
    onNavigate: (section: string) => void;
    currentUser: User;
    onLogout: () => void;
}

const Nav: React.FC<NavProps> = ({ activeSection, onNavigate, currentUser, onLogout }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6"/> },
        { id: 'module1', label: 'Module 1', icon: <ModuleIcon1 className="w-6 h-6"/> },
        { id: 'module2', label: 'Module 2', icon: <ModuleIcon2 className="w-6 h-6"/> },
        { id: 'module3', label: 'Module 3', icon: <ModuleIcon3 className="w-6 h-6"/> },
        { id: 'module4', label: 'Module 4', icon: <ModuleIcon4 className="w-6 h-6"/> },
        { id: 'assessment', label: 'Assessment', icon: <AssessmentIcon className="w-6 h-6"/> },
        { id: 'certificate', label: 'Certificate', icon: <CertificateIcon className="w-6 h-6"/> },
    ];
    
    return (
        <aside className="no-print bg-background w-24 flex-shrink-0 flex flex-col p-4 border-r border-border items-center">
            <div className="mb-10 pt-2">
                <ODDILogo className="w-10 h-10 text-primary" />
            </div>
            
            <nav className="flex-1 flex flex-col gap-4 items-center w-full">
                {navItems.map(item => (
                    <button 
                        key={item.id}
                        onClick={() => onNavigate(item.id)} 
                        title={item.label}
                        className={`relative flex items-center justify-center w-14 h-14 text-left rounded-lg transition-all duration-200 text-base font-medium group ${
                            activeSection === item.id 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                        }`}
                    >
                        {item.icon}
                        <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto border-t border-border pt-4 w-full flex flex-col items-center">
                <button 
                    onClick={onLogout} 
                    title="Logout"
                    className="flex items-center justify-center w-14 h-14 text-left rounded-lg transition-all duration-200 text-base font-medium text-text-secondary hover:bg-surface hover:text-text-primary group"
                >
                    <LogoutIcon className="w-6 h-6"/>
                    <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default Nav;