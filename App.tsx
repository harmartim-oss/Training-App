/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TrainingPortal from './components/training/TrainingPortal';


const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'training'>('landing');

  const navigateToTraining = () => {
    setView('training');
  };

  const navigateToLanding = () => {
    setView('landing');
  }

  return (
    <>
      {view === 'landing' && <LandingPage onNavigateToTraining={navigateToTraining} />}
      {view === 'training' && <TrainingPortal onNavigateToLanding={navigateToLanding} />}
    </>
  );
};

export default App;