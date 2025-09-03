/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Nav from './Nav';
import Module1 from './Module1';
import Module2 from './Module2';
import Module3 from './Module3';
import Module4 from './Module4';
import Assessment from './Assessment';
import Certificate from './Certificate';
import { getTutorChat, sendMessage } from '../../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon } from '../icons';


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

interface Message {
  role: 'user' | 'model';
  text: string;
}

const StudyAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm your AI study assistant. How can I help you with the course material today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const chatInstance = useRef<any>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    // Initialize chat instance with error handling
    useEffect(() => {
        try {
            chatInstance.current = getTutorChat();
        } catch (error) {
            console.warn("AI Study Assistant unavailable:", error);
            setIsAvailable(false);
            setMessages([{ role: 'model', text: "AI Study Assistant is currently unavailable. Please continue with your training modules." }]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !isAvailable) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (!chatInstance.current) {
                throw new Error("Chat service not available");
            }
            const stream = await sendMessage(chatInstance.current, input);
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '...' }]); 

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length-1].text = "Sorry, the AI assistant is currently unavailable. Please continue with your training.";
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
                className="assistant-fab no-print"
                aria-label="Toggle AI Study Assistant"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8" />}
            </button>
            <div className={`assistant-modal no-print ${isOpen ? 'open' : ''}`}>
                <header className="assistant-header">
                    <h3>AI Study Assistant</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <CloseIcon className="w-6 h-6"/>
                    </button>
                </header>
                <div className="assistant-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.role === 'user' ? 'message-user' : 'message-model'}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="assistant-input-area">
                    <form onSubmit={handleSend} className="assistant-input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            disabled={isLoading}
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
                progress={userProgress}
            />
            <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto">
                {renderSection()}
            </main>
            <StudyAssistant />
        </div>
    );
};

export default TrainingPortal;
