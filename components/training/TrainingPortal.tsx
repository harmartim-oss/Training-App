/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Module1 from './Module1';
import Module2 from './Module2';
import Module3 from './Module3';
import Module4 from './Module4';
import Assessment from './Assessment';
import Certificate from './Certificate';
import StudyGuide from './StudyGuide';
import ExamStudyGuide from './ExamStudyGuide';
import PracticeExam from './PracticeExam';
import AccountDetails from './AccountDetails';
import SubscriptionManagement from './SubscriptionManagement';
import CPDTracking from './CPDTracking';
import { createAIAssistant, EducationalAssistant } from '../../services/aiAssistantService';
import { ChatIcon, CloseIcon, SendIcon } from '../icons';
import { User, LoginUser, SubscriptionTier } from '../../types';


interface TrainingPortalProps {
    onNavigateToLanding: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
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

const StudyAssistant: React.FC<{ currentModule?: string; userProgress?: Progress; userTier?: string }> = ({ currentModule, userProgress, userTier = 'basic' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const aiAssistant = useRef<EducationalAssistant | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // Get contextual welcome message based on current module and progress
    const getWelcomeMessage = () => {
        const completedModules = userProgress ? Object.values(userProgress).filter(m => 'completed' in m && m.completed).length : 0;
        const contextualInfo = currentModule ? ` You're currently working on ${currentModule}.` : '';
        
        if (completedModules === 0) {
            return `Hello! 👋 I'm your AI study assistant for the Ontario Certified Cyber Resilience Professional (OCRP) program.${contextualInfo} I'm here to help you understand the training material, clarify concepts, and guide you through your learning journey. Feel free to ask me anything about privacy laws, cybersecurity fundamentals, AI governance, or data management!`;
        } else {
            return `Welcome back! 🚀 I see you've completed ${completedModules} module${completedModules > 1 ? 's' : ''} - great progress!${contextualInfo} How can I help you with your OCRP certification today?`;
        }
    };

    // Initialize AI assistant
    useEffect(() => {
        try {
            aiAssistant.current = createAIAssistant(userTier);
            setMessages([{ role: 'model', text: getWelcomeMessage() }]);
            setIsAvailable(true);
        } catch (error) {
            console.warn("AI Study Assistant unavailable:", error);
            setIsAvailable(false);
            setMessages([{ 
                role: 'model', 
                text: "🤖 AI Study Assistant is temporarily unavailable. You can continue with your training modules in the meantime. For immediate help, review the learning objectives and explanations provided in each module." 
            }]);
        }
    }, [currentModule, userProgress, userTier]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Quick action buttons for common questions
    const quickActions = [
        { text: "Explain key concepts from this module", icon: "📚" },
        { text: "Help me prepare for the quiz", icon: "🎯" },
        { text: "What are the main learning objectives?", icon: "✅" },
        { text: "Give me study tips", icon: "💡" }
    ];

    const handleQuickAction = (actionText: string) => {
        if (!isAvailable || isLoading) return;
        
        // Add context about current module if available
        const contextualPrompt = currentModule 
            ? `${actionText} for ${currentModule.replace('module', 'Module ')}`
            : actionText;
            
        setInput(contextualPrompt);
        setTimeout(() => {
            const form = document.querySelector('.assistant-input-form') as HTMLFormElement;
            form?.requestSubmit();
        }, 100);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !isAvailable || !aiAssistant.current) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Add context about current module and progress to the prompt
            let contextualPrompt = currentInput;
            if (currentModule) {
                contextualPrompt += ` (Current context: working on ${currentModule.replace('module', 'Module ')})`;
            }
            
            setMessages(prev => [...prev, { role: 'model', text: '🤔 Thinking...' }]); 
            
            const response = await aiAssistant.current.generateResponse(contextualPrompt);
            
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = response;
                return newMessages;
            });
        } catch (error) {
            console.error(error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length-1].text = "😔 Sorry, I'm having trouble generating a response right now. Please try asking your question in a different way, or refer to the explanations provided in each module.";
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`floating-action-button no-print ${!isAvailable ? 'opacity-75' : ''} ${!isOpen ? 'pulse-animation' : ''}`}
                aria-label="Toggle AI Study Assistant"
                title="AI Study Assistant"
            >
                {isOpen ? <CloseIcon className="w-6 h-6"/> : <ChatIcon className="w-6 h-6" />}
            </button>
            <div className={`assistant-modal no-print ${isOpen ? 'open' : ''}`}>
                <header className="assistant-header">
                    <h3>🤖 AI Study Assistant</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <CloseIcon className="w-6 h-6"/>
                    </button>
                </header>
                
                {/* Quick Actions */}
                {isAvailable && messages.length <= 2 && (
                    <div className="assistant-quick-actions">
                        <p className="text-sm text-text-secondary mb-3">Quick actions:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickAction(action.text)}
                                    className="text-left p-2 text-xs bg-surface hover:bg-surface-elevated border border-border rounded-lg transition-colors"
                                    disabled={isLoading}
                                >
                                    <span className="block">{action.icon} {action.text}</span>
                                </button>
                            ))}
                        </div>
                        <hr className="my-4 border-border" />
                    </div>
                )}
                
                <div className="assistant-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.role === 'user' ? 'message-user' : 'message-model'}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message-bubble message-model typing-indicator">
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="assistant-input-area">
                    <form onSubmit={handleSend} className="assistant-input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={isAvailable ? "Ask me anything about the course material..." : "AI Assistant unavailable"}
                            disabled={isLoading || !isAvailable}
                            aria-label="Your message"
                        />
                        <button type="submit" disabled={isLoading || !input.trim() || !isAvailable} aria-label="Send message">
                           <SendIcon className="w-6 h-6"/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};


const TrainingPortal: React.FC<TrainingPortalProps> = ({ onNavigateToLanding }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProgress, setUserProgress] = useState<Progress>(initialProgress);
    const [activeSection, setActiveSection] = useState('login');
    const [authView, setAuthView] = useState<'login' | 'signup'>('login');

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

    const handleLogin = (user: LoginUser) => {
        // Convert LoginUser to User with default subscription tier
        const fullUser: User = {
            ...user,
            subscriptionTier: 'basic',
            registrationDate: new Date().toISOString(),
            isEnterprise: false
        };
        setCurrentUser(fullUser);
        setUserProgress(initialProgress); // Reset progress on new login
        setActiveSection('dashboard');
    };

    const handleSignUp = (user: User) => {
        setCurrentUser(user);
        setUserProgress(initialProgress);
        setActiveSection('dashboard');
        setAuthView('login'); // Reset for next time
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setUserProgress(initialProgress);
        localStorage.removeItem('cyberTrainingUser');
        localStorage.removeItem('cyberTrainingProgress');
        onNavigateToLanding();
    };

    const handleUpdateUser = (updatedUser: User) => {
        setCurrentUser(updatedUser);
        localStorage.setItem('cyberTrainingUser', JSON.stringify(updatedUser));
    };

    const handleUpgradeSubscription = (tier: SubscriptionTier) => {
        if (currentUser) {
            const updatedUser = { ...currentUser, subscriptionTier: tier };
            setCurrentUser(updatedUser);
            localStorage.setItem('cyberTrainingUser', JSON.stringify(updatedUser));
        }
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
                return <Dashboard progress={userProgress} onNavigate={setActiveSection} currentUser={currentUser} />;
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
            case 'study-guide':
                 return <StudyGuide userTier={currentUser?.subscriptionTier || 'basic'} onUpgrade={() => setAuthView('signup')} />;
            case 'exam-study-guide':
                 return <ExamStudyGuide onNavigate={setActiveSection} />;
            case 'practice-exam':
                 return <PracticeExam userTier={currentUser?.subscriptionTier || 'basic'} onUpgrade={() => setAuthView('signup')} />;
            case 'account-details':
                 return <AccountDetails user={currentUser!} onNavigate={setActiveSection} onUpdateUser={handleUpdateUser} />;
            case 'subscription':
                 return <SubscriptionManagement user={currentUser!} onNavigate={setActiveSection} onUpgradeSubscription={handleUpgradeSubscription} />;
            case 'cpd-tracking':
                 return <CPDTracking user={currentUser!} onNavigate={setActiveSection} />;
            default:
                if (authView === 'signup') {
                    return <SignUp onSignUp={handleSignUp} onBackToLogin={() => setAuthView('login')} />;
                }
                return <Login onLogin={handleLogin} onSignUp={() => setAuthView('signup')} />;
        }
    }

    if (!currentUser) {
        if (authView === 'signup') {
            return <SignUp onSignUp={handleSignUp} onBackToLogin={() => setAuthView('login')} />;
        }
        return <Login onLogin={handleLogin} onSignUp={() => setAuthView('signup')} />;
    }
    
    return (
        <div className="flex min-h-screen bg-background text-text-primary">
            <Nav 
                activeSection={activeSection} 
                onNavigate={setActiveSection} 
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigateToLanding={onNavigateToLanding}
                progress={userProgress}
            />
            <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto">
                {renderSection()}
            </main>
            <StudyAssistant currentModule={activeSection} userProgress={userProgress} userTier={currentUser?.subscriptionTier} />
        </div>
    );
};

export default TrainingPortal;
