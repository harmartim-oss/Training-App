/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';

export interface ReviewItem {
  id: string;
  content: string;
  concept: string;
  moduleId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date | null;
  nextReview: Date;
  interval: number; // days
  repetitions: number;
  easinessFactor: number;
}

export interface SpacedRepetitionState {
  items: ReviewItem[];
  dueItems: ReviewItem[];
  streakCount: number;
  lastReviewDate: Date | null;
}

const initialState: SpacedRepetitionState = {
  items: [],
  dueItems: [],
  streakCount: 0,
  lastReviewDate: null
};

// SuperMemo 2 algorithm implementation
const calculateNextInterval = (
  interval: number,
  repetitions: number,
  easinessFactor: number,
  quality: number
): { newInterval: number; newEasinessFactor: number; newRepetitions: number } => {
  let newEasinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEasinessFactor = Math.max(1.3, newEasinessFactor);

  let newRepetitions = repetitions;
  let newInterval = interval;

  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1;
  } else {
    newRepetitions += 1;
    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEasinessFactor);
    }
  }

  return { newInterval, newEasinessFactor, newRepetitions };
};

export const useSpacedRepetition = () => {
  const [state, setState] = useState<SpacedRepetitionState>(initialState);

  useEffect(() => {
    const saved = localStorage.getItem('spacedRepetitionState');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      const items = parsed.items.map((item: any) => ({
        ...item,
        lastReviewed: item.lastReviewed ? new Date(item.lastReviewed) : null,
        nextReview: new Date(item.nextReview)
      }));
      
      setState({
        ...parsed,
        items,
        lastReviewDate: parsed.lastReviewDate ? new Date(parsed.lastReviewDate) : null
      });
      
      updateDueItems(items);
    }
  }, []);

  const saveState = (newState: SpacedRepetitionState) => {
    localStorage.setItem('spacedRepetitionState', JSON.stringify(newState));
    setState(newState);
  };

  const updateDueItems = (items: ReviewItem[]) => {
    const now = new Date();
    const due = items.filter(item => item.nextReview <= now);
    setState(prev => ({ ...prev, dueItems: due }));
  };

  const addReviewItem = (item: Omit<ReviewItem, 'lastReviewed' | 'nextReview' | 'interval' | 'repetitions' | 'easinessFactor'>) => {
    const newItem: ReviewItem = {
      ...item,
      lastReviewed: null,
      nextReview: new Date(),
      interval: 1,
      repetitions: 0,
      easinessFactor: 2.5
    };

    const newItems = [...state.items, newItem];
    saveState({ ...state, items: newItems });
    updateDueItems(newItems);
  };

  const reviewItem = (itemId: string, quality: number) => {
    const now = new Date();
    const updatedItems = state.items.map(item => {
      if (item.id === itemId) {
        const { newInterval, newEasinessFactor, newRepetitions } = calculateNextInterval(
          item.interval,
          item.repetitions,
          item.easinessFactor,
          quality
        );

        const nextReview = new Date();
        nextReview.setDate(now.getDate() + newInterval);

        return {
          ...item,
          lastReviewed: now,
          nextReview,
          interval: newInterval,
          repetitions: newRepetitions,
          easinessFactor: newEasinessFactor
        };
      }
      return item;
    });

    // Update streak
    const newStreakCount = state.lastReviewDate && 
      (now.getTime() - state.lastReviewDate.getTime()) <= 86400000 * 2 // 2 days
      ? state.streakCount + 1
      : 1;

    const newState = {
      ...state,
      items: updatedItems,
      streakCount: newStreakCount,
      lastReviewDate: now
    };

    saveState(newState);
    updateDueItems(updatedItems);
  };

  const getDueCount = () => state.dueItems.length;

  const getNextReviewTime = () => {
    if (state.items.length === 0) return null;
    const earliest = state.items
      .filter(item => !state.dueItems.includes(item))
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())[0];
    return earliest?.nextReview || null;
  };

  return {
    ...state,
    addReviewItem,
    reviewItem,
    getDueCount,
    getNextReviewTime,
    updateDueItems: () => updateDueItems(state.items)
  };
};