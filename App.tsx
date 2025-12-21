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
  };

  const navigateToLanding = () => {
    setView('landing');
  }

  const navigateToAdmin = () => {
    setView('admin-login');
  };

  const handleAdminLogin = (email: string) => {
    setAdminEmail(email);
    setView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setAdminEmail('');
    setView('landing');
  };

  // Check URL for admin route (simple routing)
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/admin')) {
      setView('admin-login');
    }
  }, []);

  return (
    <>
      {view === 'landing' && <LandingPage onNavigateToTraining={navigateToTraining} onNavigateToAdmin={navigateToAdmin} />}
      {view === 'training' && <TrainingPortal onNavigateToLanding={navigateToLanding} />}
      {view === 'admin-login' && <AdminLogin onLogin={handleAdminLogin} onBackToPortal={navigateToLanding} />}
      {view === 'admin-dashboard' && <AdminDashboard onLogout={handleAdminLogout} adminEmail={adminEmail} />}
    </>
  );
};

export default App;