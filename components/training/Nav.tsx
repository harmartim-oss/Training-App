/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ODDILogo } from '../icons';

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
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
        { id: 'module1', label: 'Module 1', icon: 'fa-balance-scale' },
        { id: 'module2', label: 'Module 2', icon: 'fa-shield-alt' },
        { id: 'module3', label: 'Module 3', icon: 'fa-robot' },
        { id: 'module4', label: 'Module 4', icon: 'fa-database' },
        { id: 'assessment', label: 'Assessment', icon: 'fa-graduation-cap' },
        { id: 'certificate', label: 'Certificate', icon: 'fa-award' },
    ];
    
    return (
        <aside className="no-print bg-sidebar w-64 flex-shrink-0 flex flex-col p-4">
            <div className="flex items-center gap-3 mb-8 px-2">
                <ODDILogo className="w-4 h-4 text-white" />
                <span className="text-base font-bold tracking-tight text-slate-200">
                    ODDI Training
                </span>
            </div>
            
            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map(item => (
                    <button 
                        key={item.id}
                        onClick={() => onNavigate(item.id)} 
                        className={`flex items-center gap-4 w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm ${
                            activeSection === item.id 
                                ? 'bg-primary/20 text-white font-semibold' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                        }`}
                    >
                        <i className={`fas ${item.icon} w-4 text-center text-xs`}></i>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto">
                <div className="border-t border-slate-700 pt-4 px-2">
                    <p className="text-sm font-medium text-slate-200 truncate">{currentUser.fullname}</p>
                    <button onClick={onLogout} className="text-sm text-slate-400 hover:text-blue-300 transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Nav;