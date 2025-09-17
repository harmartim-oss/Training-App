/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';

export interface LearningProfile {
  userId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pacePreference: 'slow' | 'normal' | 'fast';
  strengths: string[];
  weaknesses: string[];
  completedModules: string[];
  timeSpent: Record<string, number>; // moduleId -> minutes
  averageScores: Record<string, number>; // moduleId -> score
  preferredSessionLength: number; // minutes
  lastActiveDate: Date;
  totalStudyTime: number; // minutes
}

export interface AdaptiveRecommendation {
  type: 'content' | 'pace' | 'review' | 'break';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
  reasoning: string;
  moduleId?: string;
  estimatedTime?: number;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  modules: string[];
  estimatedDuration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  adaptations: string[];
}

const initialProfile: LearningProfile = {
  userId: '',
  learningStyle: 'visual',
  difficulty: 'intermediate',
  pacePreference: 'normal',
  strengths: [],
  weaknesses: [],
  completedModules: [],
  timeSpent: {},
  averageScores: {},
  preferredSessionLength: 30,
  lastActiveDate: new Date(),
  totalStudyTime: 0
};

export const useAdaptiveLearning = (userId: string) => {
  const [profile, setProfile] = useState<LearningProfile>(initialProfile);
  const [recommendations, setRecommendations] = useState<AdaptiveRecommendation[]>([]);
  const [adaptedPath, setAdaptedPath] = useState<LearningPath | null>(null);

  useEffect(() => {
    if (userId) {
      loadProfile(userId);
    }
  }, [userId]);

  const loadProfile = (id: string) => {
    const saved = localStorage.getItem(`adaptiveLearning_${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({
        ...parsed,
        userId: id,
        lastActiveDate: new Date(parsed.lastActiveDate)
      });
    } else {
      setProfile(prev => ({ ...prev, userId: id }));
    }
  };

  const saveProfile = (newProfile: LearningProfile) => {
    localStorage.setItem(`adaptiveLearning_${newProfile.userId}`, JSON.stringify(newProfile));
    setProfile(newProfile);
  };

  const updateLearningStyle = (style: LearningProfile['learningStyle']) => {
    const updated = { ...profile, learningStyle: style };
    saveProfile(updated);
    generateRecommendations(updated);
  };

  const updateDifficulty = (difficulty: LearningProfile['difficulty']) => {
    const updated = { ...profile, difficulty };
    saveProfile(updated);
    generateAdaptedPath(updated);
  };

  const recordStudySession = (moduleId: string, timeSpent: number, score?: number) => {
    const updated = {
      ...profile,
      timeSpent: {
        ...profile.timeSpent,
        [moduleId]: (profile.timeSpent[moduleId] || 0) + timeSpent
      },
      totalStudyTime: profile.totalStudyTime + timeSpent,
      lastActiveDate: new Date()
    };

    if (score !== undefined) {
      const currentAvg = profile.averageScores[moduleId] || 0;
      const sessionCount = Math.floor(profile.timeSpent[moduleId] / 30) + 1; // Rough estimate
      updated.averageScores[moduleId] = (currentAvg * (sessionCount - 1) + score) / sessionCount;
    }

    saveProfile(updated);
    analyzePerformance(updated, moduleId, score);
  };

  const markModuleComplete = (moduleId: string, score: number) => {
    const updated = {
      ...profile,
      completedModules: [...profile.completedModules, moduleId],
      averageScores: {
        ...profile.averageScores,
        [moduleId]: score
      }
    };

    // Analyze performance to update strengths/weaknesses
    if (score >= 80) {
      const moduleArea = getModuleArea(moduleId);
      if (moduleArea && !updated.strengths.includes(moduleArea)) {
        updated.strengths.push(moduleArea);
      }
    } else if (score < 60) {
      const moduleArea = getModuleArea(moduleId);
      if (moduleArea && !updated.weaknesses.includes(moduleArea)) {
        updated.weaknesses.push(moduleArea);
      }
    }

    saveProfile(updated);
    generateRecommendations(updated);
  };

  const getModuleArea = (moduleId: string): string | null => {
    const moduleAreas = {
      'module1': 'Privacy Laws',
      'module2': 'Cybersecurity',
      'module3': 'AI Governance',
      'module4': 'Data Management'
    };
    return moduleAreas[moduleId as keyof typeof moduleAreas] || null;
  };

  const analyzePerformance = (currentProfile: LearningProfile, moduleId: string, score?: number) => {
    const timeInModule = currentProfile.timeSpent[moduleId] || 0;
    const avgScore = currentProfile.averageScores[moduleId] || 0;

    // If spending too much time but low scores, suggest difficulty adjustment
    if (timeInModule > 60 && avgScore < 60) {
      const recommendation: AdaptiveRecommendation = {
        type: 'pace',
        priority: 'high',
        title: 'Consider Reviewing Fundamentals',
        description: `You've spent ${timeInModule} minutes on this module with an average score of ${avgScore.toFixed(0)}%.`,
        action: 'Review prerequisite materials or consider easier difficulty',
        reasoning: 'Extended study time with low scores suggests content may be too advanced',
        moduleId
      };
      
      setRecommendations(prev => [recommendation, ...prev.slice(0, 4)]);
    }

    // If completing quickly with high scores, suggest advancing
    if (timeInModule < 20 && avgScore > 85) {
      const recommendation: AdaptiveRecommendation = {
        type: 'pace',
        priority: 'medium',
        title: 'Consider Advanced Content',
        description: `You're mastering this content quickly with ${avgScore.toFixed(0)}% average.`,
        action: 'Try advanced difficulty or additional practice',
        reasoning: 'Fast completion with high scores suggests you can handle more challenge',
        moduleId
      };
      
      setRecommendations(prev => [recommendation, ...prev.slice(0, 4)]);
    }
  };

  const generateRecommendations = (currentProfile: LearningProfile) => {
    const newRecommendations: AdaptiveRecommendation[] = [];

    // Session length recommendations
    const avgSessionTime = currentProfile.totalStudyTime / Math.max(currentProfile.completedModules.length, 1);
    if (avgSessionTime > 45 && currentProfile.preferredSessionLength < 40) {
      newRecommendations.push({
        type: 'break',
        priority: 'medium',
        title: 'Take Regular Breaks',
        description: 'You tend to study for long periods. Consider shorter, more frequent sessions.',
        action: 'Try 25-minute focused sessions with 5-minute breaks',
        reasoning: 'Research shows spaced practice improves retention'
      });
    }

    // Learning style adaptations
    if (currentProfile.learningStyle === 'visual') {
      newRecommendations.push({
        type: 'content',
        priority: 'low',
        title: 'Visual Learning Resources',
        description: 'Based on your visual learning preference, try our interactive diagrams and infographics.',
        action: 'Access visual study materials in each module',
        reasoning: 'Visual learners benefit from diagrams, charts, and visual representations'
      });
    }

    // Weakness-based recommendations
    currentProfile.weaknesses.forEach(weakness => {
      newRecommendations.push({
        type: 'review',
        priority: 'high',
        title: `Strengthen ${weakness} Knowledge`,
        description: `Your performance in ${weakness} suggests additional review would be beneficial.`,
        action: `Focus on ${weakness} practice exercises and review materials`,
        reasoning: 'Targeted practice in weak areas improves overall competency'
      });
    });

    setRecommendations(newRecommendations.slice(0, 5));
  };

  const generateAdaptedPath = (currentProfile: LearningProfile) => {
    const basePath: LearningPath = {
      id: 'ocrp_adaptive',
      name: 'Adaptive OCRP Path',
      description: 'Personalized learning path based on your profile and progress',
      modules: ['module1', 'module2', 'module3', 'module4'],
      estimatedDuration: 600, // 10 hours base
      difficulty: currentProfile.difficulty,
      adaptations: []
    };

    // Adjust based on difficulty
    if (currentProfile.difficulty === 'beginner') {
      basePath.estimatedDuration = 800; // More time for beginners
      basePath.adaptations.push('Extended explanations and examples');
      basePath.adaptations.push('Additional practice exercises');
    } else if (currentProfile.difficulty === 'advanced') {
      basePath.estimatedDuration = 480; // Less time for advanced
      basePath.adaptations.push('Advanced case studies and scenarios');
      basePath.adaptations.push('Leadership and implementation focus');
    }

    // Adjust based on learning style
    switch (currentProfile.learningStyle) {
      case 'visual':
        basePath.adaptations.push('Enhanced visual diagrams and infographics');
        break;
      case 'auditory':
        basePath.adaptations.push('Audio explanations and discussions');
        break;
      case 'kinesthetic':
        basePath.adaptations.push('Hands-on exercises and simulations');
        break;
      case 'reading':
        basePath.adaptations.push('Detailed text-based resources');
        break;
    }

    // Adjust module order based on strengths/weaknesses
    if (currentProfile.weaknesses.includes('Privacy Laws')) {
      // Start with foundational content
      basePath.adaptations.push('Extra focus on privacy law fundamentals');
    }

    setAdaptedPath(basePath);
  };

  const getPersonalizedContent = (moduleId: string, baseContent: string) => {
    let adaptedContent = baseContent;

    // Add visual elements for visual learners
    if (profile.learningStyle === 'visual') {
      adaptedContent += '\n\n📊 Check out the visual diagrams and charts for this concept.';
    }

    // Add audio cues for auditory learners
    if (profile.learningStyle === 'auditory') {
      adaptedContent += '\n\n🎧 Consider reading this content aloud or discussing with colleagues.';
    }

    // Add practical exercises for kinesthetic learners
    if (profile.learningStyle === 'kinesthetic') {
      adaptedContent += '\n\n🤚 Try the hands-on exercises and real-world scenarios for this topic.';
    }

    return adaptedContent;
  };

  const shouldRecommendReview = (moduleId: string): boolean => {
    const score = profile.averageScores[moduleId];
    const timeSpent = profile.timeSpent[moduleId] || 0;
    
    // Recommend review if score is low or it's been a while since completion
    return score < 70 || (timeSpent > 0 && !profile.completedModules.includes(moduleId));
  };

  return {
    profile,
    recommendations,
    adaptedPath,
    updateLearningStyle,
    updateDifficulty,
    recordStudySession,
    markModuleComplete,
    getPersonalizedContent,
    shouldRecommendReview,
    generateRecommendations: () => generateRecommendations(profile),
    generateAdaptedPath: () => generateAdaptedPath(profile)
  };
};