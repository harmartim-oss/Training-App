/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Add error handling for better debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element with id 'root'");
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Could not find root element. Please check if the HTML contains a div with id="root".</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app successfully mounted');
} catch (error) {
  console.error('Failed to mount React app:', error);
  rootElement.innerHTML = '<div style="padding: 20px; color: red;">Error mounting React app. Check console for details.</div>';
}