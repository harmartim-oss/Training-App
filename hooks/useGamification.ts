/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'consistency' | 'mastery' | 'social' | 'special';
  points: number;
  criteria: {
    type: 'modules_completed' | 'days_streak' | 'total_score' | 'time_spent' | 'reviews_completed' | 'perfect_scores' | 'help_others';
    target: number;
    current?: number;
  };
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  moduleId?: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalPoints: number;
  weeklyPoints: number;
  level: number;
  badges: Badge[];
  completedModules: number;
  streak: number;
}

export interface GamificationState {
  totalPoints: number;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  achievements: Achievement[];
  badges: Badge[];
  streak: number;
  longestStreak: number;
  totalStudyTime: number;
  modulesCompleted: number;
  perfectScores: number;
  reviewsCompleted: number;
}

const initialState: GamificationState = {
  totalPoints: 0,
  level: 1,
  currentXP: 0,
  nextLevelXP: 100,
  achievements: [],
  badges: [],
  streak: 0,
  longestStreak: 0,
  totalStudyTime: 0,
  modulesCompleted: 0,
  perfectScores: 0,
  reviewsCompleted: 0
};

const achievements: Achievement[] = [
  {
    id: 'first_module',
    title: 'First Steps',
    description: 'Complete your first training module',
    icon: '🎯',
    category: 'progress',
    points: 50,
    criteria: { type: 'modules_completed', target: 1 },
    rarity: 'common'
  },
  {
    id: 'all_modules',
    title: 'OCRP Graduate',
    description: 'Complete all 4 training modules',
    icon: '🎓',
    category: 'progress',
    points: 500,
    criteria: { type: 'modules_completed', target: 4 },
    rarity: 'epic'
  },
  {
    id: 'week_streak',
    title: 'Consistent Learner',
    description: 'Study for 7 consecutive days',
    icon: '🔥',
    category: 'consistency',
    points: 100,
    criteria: { type: 'days_streak', target: 7 },
    rarity: 'rare'
  },
  {
    id: 'month_streak',
    title: 'Dedication Master',
    description: 'Study for 30 consecutive days',
    icon: '🏆',
    category: 'consistency',
    points: 1000,
    criteria: { type: 'days_streak', target: 30 },
    rarity: 'legendary'
  },
  {
    id: 'perfect_score',
    title: 'Perfectionist',
    description: 'Score 100% on any module assessment',
    icon: '⭐',
    category: 'mastery',
    points: 200,
    criteria: { type: 'perfect_scores', target: 1 },
    rarity: 'rare'
  },
  {
    id: 'study_marathon',
    title: 'Study Marathon',
    description: 'Study for 20 hours total',
    icon: '📚',
    category: 'progress',
    points: 300,
    criteria: { type: 'time_spent', target: 1200 }, // 20 hours in minutes
    rarity: 'rare'
  },
  {
    id: 'review_master',
    title: 'Review Master',
    description: 'Complete 100 spaced repetition reviews',
    icon: '🔄',
    category: 'consistency',
    points: 250,
    criteria: { type: 'reviews_completed', target: 100 },
    rarity: 'rare'
  },
  {
    id: 'high_achiever',
    title: 'High Achiever',
    description: 'Maintain 85%+ average across all modules',
    icon: '💎',
    category: 'mastery',
    points: 400,
    criteria: { type: 'total_score', target: 85 },
    rarity: 'epic'
  }
];

export const useGamification = (userId: string) => {
  const [state, setState] = useState<GamificationState>(initialState);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);

  useEffect(() => {
    if (userId) {
      loadState(userId);
    }
  }, [userId]);

  const loadState = (id: string) => {
    const saved = localStorage.getItem(`gamification_${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setState({
        ...parsed,
        achievements: parsed.achievements.map((a: any) => ({
          ...a,
          unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined
        })),
        badges: parsed.badges.map((b: any) => ({
          ...b,
          earnedAt: new Date(b.earnedAt)
        }))
      });
    }
  };

  const saveState = (newState: GamificationState) => {
    localStorage.setItem(`gamification_${userId}`, JSON.stringify(newState));
    setState(newState);
  };

  const calculateLevel = (totalXP: number) => {
    // Progressive XP requirements: 100, 250, 450, 700, 1000, 1350, 1750, etc.
    let level = 1;
    let requiredXP = 100;
    let currentXP = totalXP;

    while (currentXP >= requiredXP) {
      currentXP -= requiredXP;
      level++;
      requiredXP = level * 100 + (level - 1) * 50; // Increasing requirements
    }

    return {
      level,
      currentXP,
      nextLevelXP: requiredXP
    };
  };

  const awardPoints = (points: number, reason: string) => {
    const newTotalPoints = state.totalPoints + points;
    const levelInfo = calculateLevel(newTotalPoints);
    
    const leveledUp = levelInfo.level > state.level;
    if (leveledUp) {
      setLevelUpAnimation(true);
      setTimeout(() => setLevelUpAnimation(false), 3000);
    }

    const newState = {
      ...state,
      totalPoints: newTotalPoints,
      level: levelInfo.level,
      currentXP: levelInfo.currentXP,
      nextLevelXP: levelInfo.nextLevelXP
    };

    saveState(newState);
    return leveledUp;
  };

  const checkAchievements = (updatedState: GamificationState) => {
    const newlyUnlocked: Achievement[] = [];

    achievements.forEach(achievement => {
      const alreadyUnlocked = updatedState.achievements.some(a => a.id === achievement.id);
      if (alreadyUnlocked) return;

      let criteria = { ...achievement.criteria };
      let isUnlocked = false;

      switch (criteria.type) {
        case 'modules_completed':
          criteria.current = updatedState.modulesCompleted;
          isUnlocked = updatedState.modulesCompleted >= criteria.target;
          break;
        case 'days_streak':
          criteria.current = updatedState.streak;
          isUnlocked = updatedState.streak >= criteria.target;
          break;
        case 'time_spent':
          criteria.current = updatedState.totalStudyTime;
          isUnlocked = updatedState.totalStudyTime >= criteria.target;
          break;
        case 'perfect_scores':
          criteria.current = updatedState.perfectScores;
          isUnlocked = updatedState.perfectScores >= criteria.target;
          break;
        case 'reviews_completed':
          criteria.current = updatedState.reviewsCompleted;
          isUnlocked = updatedState.reviewsCompleted >= criteria.target;
          break;
        case 'total_score':
          // This would need to be calculated from module scores
          // For now, we'll handle this separately
          break;
      }

      if (isUnlocked) {
        const unlockedAchievement = {
          ...achievement,
          criteria,
          unlockedAt: new Date()
        };
        newlyUnlocked.push(unlockedAchievement);
        awardPoints(achievement.points, `Achievement: ${achievement.title}`);
      }
    });

    if (newlyUnlocked.length > 0) {
      const finalState = {
        ...updatedState,
        achievements: [...updatedState.achievements, ...newlyUnlocked]
      };
      saveState(finalState);
      setNewAchievements(newlyUnlocked);
      
      // Clear notification after 5 seconds
      setTimeout(() => setNewAchievements([]), 5000);
    }
  };

  const completeModule = (moduleId: string, score: number, timeSpent: number) => {
    const isPerfectScore = score === 100;
    const badge: Badge = {
      id: `${moduleId}_completion`,
      title: `${moduleId.replace('module', 'Module ')} Complete`,
      description: `Completed with ${score}% score`,
      icon: score >= 90 ? '🌟' : score >= 80 ? '✅' : '🎯',
      earnedAt: new Date(),
      moduleId
    };

    const updatedState = {
      ...state,
      modulesCompleted: state.modulesCompleted + 1,
      totalStudyTime: state.totalStudyTime + timeSpent,
      badges: [...state.badges, badge],
      perfectScores: isPerfectScore ? state.perfectScores + 1 : state.perfectScores
    };

    saveState(updatedState);
    awardPoints(100 + (score >= 90 ? 50 : score >= 80 ? 25 : 0), 'Module completion');
    checkAchievements(updatedState);
  };

  const updateStreak = (newStreak: number) => {
    const updatedState = {
      ...state,
      streak: newStreak,
      longestStreak: Math.max(state.longestStreak, newStreak)
    };

    saveState(updatedState);
    
    // Award points for milestone streaks
    if (newStreak > 0 && newStreak % 7 === 0) {
      awardPoints(50, `${newStreak}-day streak`);
    }
    
    checkAchievements(updatedState);
  };

  const completeReview = () => {
    const updatedState = {
      ...state,
      reviewsCompleted: state.reviewsCompleted + 1
    };

    saveState(updatedState);
    awardPoints(5, 'Spaced repetition review');
    checkAchievements(updatedState);
  };

  const addStudyTime = (minutes: number) => {
    const updatedState = {
      ...state,
      totalStudyTime: state.totalStudyTime + minutes
    };

    saveState(updatedState);
    
    // Award points for study time (1 point per 5 minutes)
    const pointsToAward = Math.floor(minutes / 5);
    if (pointsToAward > 0) {
      awardPoints(pointsToAward, 'Study time');
    }
    
    checkAchievements(updatedState);
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressToNextLevel = () => {
    return (state.currentXP / state.nextLevelXP) * 100;
  };

  const getAvailableAchievements = () => {
    return achievements.filter(achievement => 
      !state.achievements.some(a => a.id === achievement.id)
    ).map(achievement => {
      let current = 0;
      switch (achievement.criteria.type) {
        case 'modules_completed':
          current = state.modulesCompleted;
          break;
        case 'days_streak':
          current = state.streak;
          break;
        case 'time_spent':
          current = state.totalStudyTime;
          break;
        case 'perfect_scores':
          current = state.perfectScores;
          break;
        case 'reviews_completed':
          current = state.reviewsCompleted;
          break;
      }
      
      return {
        ...achievement,
        criteria: {
          ...achievement.criteria,
          current
        }
      };
    });
  };

  return {
    ...state,
    newAchievements,
    levelUpAnimation,
    completeModule,
    updateStreak,
    completeReview,
    addStudyTime,
    awardPoints,
    getRarityColor,
    getProgressToNextLevel,
    getAvailableAchievements
  };
};