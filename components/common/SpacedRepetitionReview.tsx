/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { useSpacedRepetition, ReviewItem } from '../../hooks/useSpacedRepetition';

interface SpacedRepetitionReviewProps {
  onClose?: () => void;
  maxReviews?: number;
}

const SpacedRepetitionReview: React.FC<SpacedRepetitionReviewProps> = ({
  onClose,
  maxReviews = 10
}) => {
  const { dueItems, reviewItem, streakCount, getDueCount } = useSpacedRepetition();
  const [currentItem, setCurrentItem] = useState<ReviewItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (dueItems.length > 0 && currentIndex < Math.min(dueItems.length, maxReviews)) {
      setCurrentItem(dueItems[currentIndex]);
      setShowAnswer(false);
    } else if (reviewedCount > 0) {
      setIsComplete(true);
    }
  }, [dueItems, currentIndex, maxReviews, reviewedCount]);

  const handleQualityRating = (quality: number) => {
    if (!currentItem) return;

    reviewItem(currentItem.id, quality);
    setReviewedCount(prev => prev + 1);
    
    const nextIndex = currentIndex + 1;
    if (nextIndex < Math.min(dueItems.length, maxReviews)) {
      setCurrentIndex(nextIndex);
    } else {
      setIsComplete(true);
    }
  };

  const getQualityLabel = (quality: number) => {
    const labels = {
      0: 'No recall',
      1: 'Incorrect, easy recall',
      2: 'Incorrect, hard recall', 
      3: 'Correct, very hard recall',
      4: 'Correct, hard recall',
      5: 'Correct, easy recall'
    };
    return labels[quality as keyof typeof labels];
  };

  const getQualityColor = (quality: number) => {
    if (quality <= 2) return 'bg-red-500 hover:bg-red-600';
    if (quality <= 3) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-green-500 hover:bg-green-600';
  };

  const formatTimeAgo = (date: Date | null) => {
    if (!date) return 'Never reviewed';
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (dueItems.length === 0) {
    return (
      <div className="spaced-repetition-review bg-surface border border-border rounded-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            All Caught Up!
          </h2>
          <p className="text-text-secondary">
            No reviews are due right now. Great job staying consistent!
          </p>
        </div>

        <div className="bg-background rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-text-primary mb-2">
            📊 Your Progress
          </h3>
          <div className="flex justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{streakCount}</div>
              <div className="text-text-secondary">Day Streak</div>
            </div>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="btn-primary">
            Continue Learning
          </button>
        )}
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="spaced-repetition-review bg-surface border border-border rounded-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-6xl mb-4 block">✅</span>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Review Session Complete!
          </h2>
          <p className="text-text-secondary">
            You reviewed {reviewedCount} concepts. Your knowledge is getting stronger!
          </p>
        </div>

        <div className="bg-background rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-text-primary mb-3">
            📊 Session Summary
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{reviewedCount}</div>
              <div className="text-text-secondary">Items Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{streakCount}</div>
              <div className="text-text-secondary">Day Streak</div>
            </div>
          </div>
          
          {getDueCount() > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 You still have {getDueCount()} more items to review when you're ready!
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          {getDueCount() > 0 && (
            <button 
              onClick={() => {
                setCurrentIndex(reviewedCount);
                setIsComplete(false);
                setShowAnswer(false);
              }}
              className="btn-secondary"
            >
              Review More
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="btn-primary">
              Continue Learning
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="spaced-repetition-review bg-surface border border-border rounded-lg p-8 max-w-2xl mx-auto text-center">
        <div className="text-text-secondary">Loading review item...</div>
      </div>
    );
  }

  return (
    <div className="spaced-repetition-review bg-surface border border-border rounded-lg p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-text-primary">🔄 Review Session</h2>
            <span className="text-sm text-text-secondary">
              {currentIndex + 1} of {Math.min(dueItems.length, maxReviews)}
            </span>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
              ✕
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-background rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / Math.min(dueItems.length, maxReviews)) * 100}%` }}
          ></div>
        </div>

        {/* Streak indicator */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>🔥 {streakCount} day streak</span>
          {currentItem.lastReviewed && (
            <span>• Last reviewed: {formatTimeAgo(currentItem.lastReviewed)}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            From: {currentItem.concept}
          </h3>
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-text-primary font-medium">{currentItem.content}</p>
          </div>
        </div>

        {!showAnswer ? (
          <div className="text-center">
            <p className="text-text-secondary mb-4">
              Think about this concept, then reveal to check your understanding.
            </p>
            <button 
              onClick={() => setShowAnswer(true)}
              className="btn-primary"
            >
              Show Answer
            </button>
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-3">
              How well did you remember this?
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {[5, 4, 3, 2, 1, 0].map((quality) => (
                <button
                  key={quality}
                  onClick={() => handleQualityRating(quality)}
                  className={`${getQualityColor(quality)} text-white p-3 rounded-lg text-left transition-colors`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {quality}: {getQualityLabel(quality)}
                    </span>
                    <span className="text-sm opacity-75">
                      {quality >= 4 ? 'Easy' : quality >= 3 ? 'Good' : 'Again'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-background rounded-lg text-sm text-text-secondary">
              <p>💡 <strong>Tip:</strong> Be honest with your rating. It helps optimize your learning schedule.</p>
            </div>
          </div>
        )}
      </div>

      {/* Item metadata */}
      <div className="bg-background rounded-lg p-3 text-xs text-text-secondary">
        <div className="flex justify-between">
          <span>Difficulty: {currentItem.difficulty}</span>
          <span>Repetitions: {currentItem.repetitions}</span>
          <span>Interval: {currentItem.interval} days</span>
        </div>
      </div>
    </div>
  );
};

export default SpacedRepetitionReview;