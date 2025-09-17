/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';
import { useGamification } from '../../hooks/useGamification';
import { useAdaptiveLearning } from '../../hooks/useAdaptiveLearning';

interface AnalyticsData {
  totalStudyTime: number;
  sessionsCompleted: number;
  averageSessionLength: number;
  strongestAreas: string[];
  improvementAreas: string[];
  learningVelocity: number;
  retentionRate: number;
  engagementScore: number;
  streakData: { date: string; active: boolean }[];
  moduleProgress: { moduleId: string; completion: number; score: number }[];
  timeDistribution: { module: string; time: number }[];
  weeklyProgress: { week: string; points: number; time: number }[];
}

interface LearningAnalyticsProps {
  userId: string;
  currentUser: any;
}

const LearningAnalytics: React.FC<LearningAnalyticsProps> = ({ userId, currentUser }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'performance' | 'insights'>('overview');

  const { getDueCount, items } = useSpacedRepetition();
  const gamification = useGamification(userId);
  const { profile, recommendations } = useAdaptiveLearning(userId);

  useEffect(() => {
    generateAnalytics();
  }, [selectedTimeframe, profile, gamification, items]);

  const generateAnalytics = () => {
    // Calculate metrics based on available data
    const totalStudyTime = gamification.totalStudyTime;
    const sessionsCompleted = Object.keys(profile.timeSpent).length;
    const averageSessionLength = sessionsCompleted > 0 ? totalStudyTime / sessionsCompleted : 0;

    // Calculate learning velocity (modules completed per week)
    const weeksSinceStart = Math.max(1, Math.ceil(totalStudyTime / (7 * 60))); // Rough estimate
    const learningVelocity = gamification.modulesCompleted / weeksSinceStart;

    // Calculate retention rate based on spaced repetition performance
    const retentionRate = items.length > 0 
      ? (items.filter(item => item.repetitions > 0).length / items.length) * 100 
      : 0;

    // Calculate engagement score
    const engagementScore = Math.min(100, 
      (gamification.streak * 10) + 
      (gamification.totalPoints / 10) + 
      (retentionRate / 2)
    );

    // Generate streak data for visualization
    const streakData = generateStreakData();

    // Module progress data
    const moduleProgress = Object.entries(profile.averageScores).map(([moduleId, score]) => ({
      moduleId,
      completion: profile.completedModules.includes(moduleId) ? 100 : 
                 (profile.timeSpent[moduleId] || 0) > 0 ? 75 : 0,
      score
    }));

    // Time distribution
    const timeDistribution = Object.entries(profile.timeSpent).map(([module, time]) => ({
      module: module.replace('module', 'Module '),
      time
    }));

    // Weekly progress (simplified)
    const weeklyProgress = generateWeeklyProgress();

    setAnalyticsData({
      totalStudyTime,
      sessionsCompleted,
      averageSessionLength,
      strongestAreas: profile.strengths,
      improvementAreas: profile.weaknesses,
      learningVelocity,
      retentionRate,
      engagementScore,
      streakData,
      moduleProgress,
      timeDistribution,
      weeklyProgress
    });
  };

  const generateStreakData = () => {
    // Generate last 30 days of streak data
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simplified: assume active if within current streak
      const dayIndex = 29 - i;
      const isActive = dayIndex >= (30 - gamification.streak);
      
      data.push({
        date: date.toISOString().split('T')[0],
        active: isActive
      });
    }
    
    return data;
  };

  const generateWeeklyProgress = () => {
    // Generate last 8 weeks of progress data
    const weeks = [];
    const pointsPerWeek = Math.max(1, gamification.totalPoints / 8);
    const timePerWeek = Math.max(1, gamification.totalStudyTime / 8);

    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7));
      
      weeks.push({
        week: `Week ${8-i}`,
        points: Math.round(pointsPerWeek * (8-i) * (0.8 + Math.random() * 0.4)),
        time: Math.round(timePerWeek * (8-i) * (0.8 + Math.random() * 0.4))
      });
    }
    
    return weeks;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600' };
    if (score >= 60) return { level: 'Good', color: 'text-blue-600' };
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-600' };
    return { level: 'Needs Improvement', color: 'text-red-600' };
  };

  if (!analyticsData) {
    return (
      <div className="learning-analytics bg-surface border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="text-text-secondary">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-analytics bg-surface border border-border rounded-lg p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">📊 Learning Analytics</h2>
            <p className="text-text-secondary">Track your progress and optimize your learning</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="px-3 py-2 border border-border rounded-lg text-sm"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {[
            { id: 'overview', label: 'Overview', icon: '📈' },
            { id: 'progress', label: 'Progress', icon: '🎯' },
            { id: 'performance', label: 'Performance', icon: '⭐' },
            { id: 'insights', label: 'Insights', icon: '💡' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">{formatTime(analyticsData.totalStudyTime)}</div>
              <div className="text-sm text-text-secondary">Total Study Time</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">{gamification.modulesCompleted}/4</div>
              <div className="text-sm text-text-secondary">Modules Completed</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">{gamification.streak}</div>
              <div className="text-sm text-text-secondary">Current Streak</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">{gamification.level}</div>
              <div className="text-sm text-text-secondary">Level</div>
            </div>
          </div>

          {/* Engagement Score */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Engagement Score</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-border rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${analyticsData.engagementScore}%` }}
                ></div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{Math.round(analyticsData.engagementScore)}</div>
                <div className={`text-sm ${getEngagementLevel(analyticsData.engagementScore).color}`}>
                  {getEngagementLevel(analyticsData.engagementScore).level}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Activity Heatmap (Last 30 Days)</h3>
            <div className="grid grid-cols-10 gap-1">
              {analyticsData.streakData.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${
                    day.active ? 'bg-primary' : 'bg-border'
                  }`}
                  title={day.date}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-2">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Module Progress */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Module Progress</h3>
            <div className="space-y-4">
              {analyticsData.moduleProgress.map((module) => (
                <div key={module.moduleId} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-primary">
                      {module.moduleId.replace('module', 'Module ')}
                    </span>
                    <span className="text-text-secondary">
                      {module.completion}% • Score: {Math.round(module.score)}%
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Distribution */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Time Distribution</h3>
            <div className="space-y-3">
              {analyticsData.timeDistribution.map((item) => (
                <div key={item.module} className="flex justify-between items-center">
                  <span className="text-text-primary">{item.module}</span>
                  <span className="text-text-secondary">{formatTime(item.time)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Progress</h3>
            <div className="flex items-end gap-2 h-40">
              {analyticsData.weeklyProgress.map((week, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-primary rounded-t w-full min-h-1"
                    style={{ height: `${(week.points / Math.max(...analyticsData.weeklyProgress.map(w => w.points))) * 120}px` }}
                  ></div>
                  <div className="text-xs text-text-secondary mt-2 transform -rotate-45">
                    {week.week}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">{analyticsData.retentionRate.toFixed(1)}%</div>
              <div className="text-sm text-text-secondary">Knowledge Retention</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">{analyticsData.learningVelocity.toFixed(1)}</div>
              <div className="text-sm text-text-secondary">Modules/Week</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">{formatTime(analyticsData.averageSessionLength)}</div>
              <div className="text-sm text-text-secondary">Avg. Session</div>
            </div>
          </div>

          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">💪 Strengths</h3>
              {analyticsData.strongestAreas.length > 0 ? (
                <div className="space-y-2">
                  {analyticsData.strongestAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-text-primary">{area}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary">Complete more modules to identify your strengths.</p>
              )}
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">📈 Areas for Improvement</h3>
              {analyticsData.improvementAreas.length > 0 ? (
                <div className="space-y-2">
                  {analyticsData.improvementAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <span className="text-yellow-500">⚠</span>
                      <span className="text-text-primary">{area}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary">Keep up the great work! No major improvement areas identified.</p>
              )}
            </div>
          </div>

          {/* Review Status */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">🔄 Spaced Repetition Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{getDueCount()}</div>
                <div className="text-sm text-text-secondary">Reviews Due</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{items.length}</div>
                <div className="text-sm text-text-secondary">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{gamification.reviewsCompleted}</div>
                <div className="text-sm text-text-secondary">Reviews Completed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* AI Recommendations */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">🤖 Personalized Recommendations</h3>
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-border p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">{rec.title}</h4>
                        <p className="text-text-secondary text-sm mt-1">{rec.description}</p>
                        <p className="text-primary text-sm mt-2">{rec.action}</p>
                        <p className="text-text-muted text-xs mt-1">{rec.reasoning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">Continue learning to receive personalized recommendations.</p>
            )}
          </div>

          {/* Learning Insights */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">📊 Learning Insights</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-text-primary">Study Pattern</h4>
                <p className="text-text-secondary text-sm">
                  Your preferred session length is {profile.preferredSessionLength} minutes. 
                  You've maintained a {gamification.streak}-day learning streak.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-text-primary">Learning Style</h4>
                <p className="text-text-secondary text-sm">
                  You're identified as a {profile.learningStyle} learner at {profile.difficulty} level.
                  This affects how content is presented to you.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium text-text-primary">Progress Trend</h4>
                <p className="text-text-secondary text-sm">
                  You're completing modules at {analyticsData.learningVelocity.toFixed(1)} modules per week.
                  Your knowledge retention rate is {analyticsData.retentionRate.toFixed(1)}%.
                </p>
              </div>
            </div>
          </div>

          {/* Achievements Overview */}
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">🏆 Achievements Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-text-primary mb-2">Unlocked ({gamification.achievements.length})</h4>
                <div className="space-y-2">
                  {gamification.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-2">
                      <span className="text-xl">{achievement.icon}</span>
                      <span className="text-text-primary text-sm">{achievement.title}</span>
                    </div>
                  ))}
                  {gamification.achievements.length > 3 && (
                    <div className="text-text-secondary text-sm">
                      +{gamification.achievements.length - 3} more
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-2">Next to Unlock</h4>
                <div className="space-y-2">
                  {gamification.getAvailableAchievements().slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-2">
                      <span className="text-xl opacity-50">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className="text-text-primary text-sm">{achievement.title}</div>
                        <div className="text-text-muted text-xs">
                          {achievement.criteria.current || 0}/{achievement.criteria.target}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningAnalytics;