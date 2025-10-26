/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

interface SessionTimerProps {
  sessionDuration?: number; // in minutes, default 25 (Pomodoro-style)
  onSessionComplete?: () => void;
  autoStart?: boolean;
  className?: string;
}

const SessionTimer: React.FC<SessionTimerProps> = ({
  sessionDuration = 25,
  onSessionComplete,
  autoStart = false,
  className = ''
}) => {
  const [seconds, setSeconds] = useState(sessionDuration * 60);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            setIsActive(false);
            if (onSessionComplete) {
              onSessionComplete();
            }
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, seconds, onSessionComplete]);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return ((sessionDuration * 60 - seconds) / (sessionDuration * 60)) * 100;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setSeconds(sessionDuration * 60);
    setIsActive(false);
    setIsPaused(false);
  };

  const getStatusColor = (): string => {
    const percentage = getProgressPercentage();
    if (percentage < 50) return 'text-success';
    if (percentage < 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-sm font-semibold text-text-primary">Session Timer</h3>
        </div>
        {seconds === 0 && (
          <span className="text-xs px-2 py-1 bg-success/20 text-success rounded-full font-medium">
            ✓ Complete
          </span>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className={`text-4xl font-mono font-bold ${getStatusColor()} transition-colors duration-300`}>
          {formatTime(seconds)}
        </div>
        <div className="text-xs text-text-secondary mt-1">
          {isActive && !isPaused ? 'Active' : isPaused ? 'Paused' : 'Ready'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="flex-1 btn-primary text-xs py-2"
            disabled={seconds === 0}
          >
            <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex-1 btn-secondary text-xs py-2"
          >
            <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="btn-secondary text-xs py-2 px-4"
          title="Reset Timer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Session Info */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Session Length: {sessionDuration} min</span>
          <span>Remaining: {Math.ceil(seconds / 60)} min</span>
        </div>
      </div>
    </div>
  );
};

export default SessionTimer;
