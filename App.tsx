/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TrainingPortal from './components/training/TrainingPortal';
import AdminLogin from './components/training/AdminLogin';
import AdminDashboard from './components/training/AdminDashboard';


const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'training' | 'admin-login' | 'admin-dashboard'>('landing');
  const [adminEmail, setAdminEmail] = useState<string>('');

  const navigateToTraining = () => {
    setView('training');
    window.history.pushState({}, '', `${import.meta.env.BASE_URL}training`);
  };

  const navigateToLanding = () => {
    setView('landing');
    window.history.pushState({}, '', import.meta.env.BASE_URL);
  }

  const navigateToAdmin = () => {
    setView('admin-login');
    window.history.pushState({}, '', `${import.meta.env.BASE_URL}admin`);
  };

  const handleAdminLogin = (email: string) => {
    setAdminEmail(email);
    setView('admin-dashboard');
    window.history.pushState({}, '', `${import.meta.env.BASE_URL}admin/dashboard`);
  };

  const handleAdminLogout = () => {
    setAdminEmail('');
    setView('landing');
    window.history.pushState({}, '', import.meta.env.BASE_URL);
  };

  // Handle initial routing and session storage redirect
  React.useEffect(() => {
    const basePath = import.meta.env.BASE_URL || '/';
    
    // Check for redirect from 404.html
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      const path = redirect.replace(basePath, '');
      
      if (path.includes('admin')) {
        setView('admin-login');
        return;
      } else if (path.includes('training')) {
        setView('training');
        return;
      }
    }
    
    // Check URL for routing
    const path = window.location.pathname.replace(basePath, '');
    if (path.includes('admin')) {
      setView('admin-login');
    } else if (path.includes('training')) {
      setView('training');
    }
  }, []);

  // Handle browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const basePath = import.meta.env.BASE_URL || '/';
      const path = window.location.pathname.replace(basePath, '');
      
      if (path.includes('admin/dashboard')) {
        setView('admin-dashboard');
      } else if (path.includes('admin')) {
        setView('admin-login');
      } else if (path.includes('training')) {
        setView('training');
      } else {
        setView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {view === 'landing' && <LandingPage onNavigateToTraining={navigateToTraining} />}
      {view === 'training' && <TrainingPortal onNavigateToLanding={navigateToLanding} />}
      {view === 'admin-login' && <AdminLogin onLogin={handleAdminLogin} onBackToPortal={navigateToLanding} />}
      {view === 'admin-dashboard' && <AdminDashboard onLogout={handleAdminLogout} adminEmail={adminEmail} />}
    </>
  );
};

export default App;