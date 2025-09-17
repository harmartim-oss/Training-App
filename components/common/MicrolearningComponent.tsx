/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';

export interface MicrolearningUnit {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  estimatedTime: number; // minutes
  type: 'concept' | 'example' | 'practice' | 'review';
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites?: string[];
  relatedUnits?: string[];
}

interface MicrolearningComponentProps {
  unit: MicrolearningUnit;
  moduleId: string;
  onComplete: (unitId: string, timeSpent: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const MicrolearningComponent: React.FC<MicrolearningComponentProps> = ({
  unit,
  moduleId,
  onComplete,
  onNext,
  onPrevious,
  isFirst,
  isLast
}) => {
  const [startTime] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentKeyPoint, setCurrentKeyPoint] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const { addReviewItem } = useSpacedRepetition();

  const typeIcons = {
    concept: '💡',
    example: '📋',
    practice: '🎯',
    review: '🔄'
  };

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-red-600 bg-red-100'
  };

  const handleComplete = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // minutes
    
    // Add key points to spaced repetition system
    unit.keyPoints.forEach((point, index) => {
      addReviewItem({
        id: `${unit.id}_point_${index}`,
        content: point,
        concept: unit.title,
        moduleId,
        difficulty: unit.difficulty
      });
    });

    setIsCompleted(true);
    onComplete(unit.id, timeSpent);
  };

  const nextKeyPoint = () => {
    if (currentKeyPoint < unit.keyPoints.length - 1) {
      setCurrentKeyPoint(currentKeyPoint + 1);
    } else {
      setShowSummary(true);
    }
  };

  const previousKeyPoint = () => {
    if (currentKeyPoint > 0) {
      setCurrentKeyPoint(currentKeyPoint - 1);
    } else {
      setShowSummary(false);
    }
  };

  return (
    <div className="microlearning-unit bg-surface border border-border rounded-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{typeIcons[unit.type]}</span>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{unit.title}</h2>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[unit.difficulty]}`}>
                  {unit.difficulty.toUpperCase()}
                </span>
                <span>⏱️ {unit.estimatedTime} min</span>
                <span className="capitalize">{unit.type}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: showSummary 
                  ? '100%' 
                  : `${((currentKeyPoint + 1) / unit.keyPoints.length) * 100}%` 
              }}
            ></div>
          </div>
          <span className="text-sm text-text-secondary">
            {showSummary ? 'Summary' : `${currentKeyPoint + 1}/${unit.keyPoints.length}`}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {!showSummary ? (
          <div className="space-y-6">
            {/* Main content */}
            <div className="prose prose-sm max-w-none">
              <div 
                className="text-text-primary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: unit.content }}
              />
            </div>

            {/* Current Key Point */}
            <div className="bg-background border-l-4 border-primary p-4 rounded-r-lg">
              <h3 className="text-sm font-semibold text-primary mb-2">
                Key Point {currentKeyPoint + 1}
              </h3>
              <p className="text-text-primary">{unit.keyPoints[currentKeyPoint]}</p>
            </div>

            {/* Navigation for key points */}
            <div className="flex justify-between items-center">
              <button
                onClick={previousKeyPoint}
                disabled={currentKeyPoint === 0}
                className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous Point
              </button>
              
              <div className="flex gap-1">
                {unit.keyPoints.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentKeyPoint ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextKeyPoint}
                className="btn-primary text-sm"
              >
                {currentKeyPoint === unit.keyPoints.length - 1 ? 'View Summary' : 'Next Point'} →
              </button>
            </div>
          </div>
        ) : (
          /* Summary View */
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                📝 Unit Summary
              </h3>
              <p className="text-text-secondary">
                Review the key concepts from this learning unit
              </p>
            </div>

            <div className="grid gap-4">
              {unit.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-text-primary text-sm">{point}</p>
                </div>
              ))}
            </div>

            {/* Completion Actions */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-3">
                🎯 What's Next?
              </h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>✅ Key concepts have been added to your review schedule</p>
                <p>🔄 You'll see these again using spaced repetition for better retention</p>
                <p>📊 Your progress has been tracked for this unit</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowSummary(false)}
                className="btn-secondary text-sm"
              >
                ← Review Content
              </button>

              {!isCompleted && (
                <button
                  onClick={handleComplete}
                  className="btn-primary text-sm"
                >
                  Complete Unit ✓
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {isCompleted && (
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-success">✅</span>
            <span>Unit completed! Great work!</span>
          </div>
          
          <div className="flex gap-3">
            {!isFirst && (
              <button onClick={onPrevious} className="btn-secondary text-sm">
                ← Previous Unit
              </button>
            )}
            {!isLast && (
              <button onClick={onNext} className="btn-primary text-sm">
                Next Unit →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Related Units */}
      {unit.relatedUnits && unit.relatedUnits.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-text-primary mb-3">
            🔗 Related Learning Units
          </h4>
          <div className="flex flex-wrap gap-2">
            {unit.relatedUnits.map((relatedId) => (
              <span
                key={relatedId}
                className="px-3 py-1 bg-background text-text-secondary text-xs rounded-full border border-border"
              >
                {relatedId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MicrolearningComponent;