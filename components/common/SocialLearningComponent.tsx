/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  lastActivity: Date;
  progress: number; // Average progress of group members
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  groupId: string;
  moduleId?: string;
  createdAt: Date;
  replies: Reply[];
  likes: number;
  tags: string[];
  isPinned: boolean;
  isResolved: boolean;
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  isHelpful: boolean;
}

export interface PeerChallenge {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  challengeType: 'quiz' | 'scenario' | 'project' | 'discussion';
  difficulty: 'easy' | 'medium' | 'hard';
  participants: string[];
  deadline: Date;
  rewards: {
    points: number;
    badge?: string;
  };
  status: 'open' | 'in-progress' | 'completed';
}

interface SocialLearningComponentProps {
  userId: string;
  currentUser: any;
  onJoinGroup?: (groupId: string) => void;
  onCreateDiscussion?: (discussion: Partial<Discussion>) => void;
}

const SocialLearningComponent: React.FC<SocialLearningComponentProps> = ({
  userId,
  currentUser,
  onJoinGroup,
  onCreateDiscussion
}) => {
  const [activeTab, setActiveTab] = useState<'groups' | 'discussions' | 'challenges' | 'leaderboard'>('groups');
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [challenges, setChallenges] = useState<PeerChallenge[]>([]);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);

  // Mock data - in real implementation, this would come from an API
  useEffect(() => {
    // Sample study groups
    setStudyGroups([
      {
        id: 'group1',
        name: 'Municipal Privacy Officers',
        description: 'A group for municipal employees working on privacy compliance and MFIPPA implementation.',
        memberCount: 24,
        isPublic: true,
        tags: ['Municipal', 'MFIPPA', 'Privacy'],
        createdAt: new Date('2025-01-01'),
        lastActivity: new Date('2025-01-16'),
        progress: 67
      },
      {
        id: 'group2',
        name: 'Small Business Cyber Security',
        description: 'Supporting small businesses in implementing cybersecurity best practices under PIPEDA.',
        memberCount: 18,
        isPublic: true,
        tags: ['Small Business', 'PIPEDA', 'Cybersecurity'],
        createdAt: new Date('2024-12-15'),
        lastActivity: new Date('2025-01-15'),
        progress: 45
      },
      {
        id: 'group3',
        name: 'AI Governance Pioneers',
        description: 'Early adopters working on implementing Ontario\'s AI directive in their organizations.',
        memberCount: 12,
        isPublic: true,
        tags: ['AI Governance', 'Innovation', 'Policy'],
        createdAt: new Date('2025-01-10'),
        lastActivity: new Date('2025-01-17'),
        progress: 78
      }
    ]);

    // Sample discussions
    setDiscussions([
      {
        id: 'disc1',
        title: 'MFIPPA Section 30.1 - Cloud Storage Challenges',
        content: 'Has anyone successfully navigated the Canadian storage requirements for municipal data? Looking for practical implementation tips.',
        author: 'Sarah Chen',
        authorId: 'user123',
        groupId: 'group1',
        moduleId: 'module1',
        createdAt: new Date('2025-01-15'),
        replies: [
          {
            id: 'reply1',
            content: 'We implemented a hybrid solution with Canadian-based primary storage and geo-restricted backups. Happy to share our policy template.',
            author: 'Mike Johnson',
            authorId: 'user456',
            createdAt: new Date('2025-01-15'),
            likes: 8,
            isHelpful: true
          },
          {
            id: 'reply2',
            content: 'Check with your legal team about cross-border data agreements. Some vendors offer Canadian data residency guarantees.',
            author: 'Lisa Wang',
            authorId: 'user789',
            createdAt: new Date('2025-01-16'),
            likes: 5,
            isHelpful: true
          }
        ],
        likes: 12,
        tags: ['MFIPPA', 'Cloud Storage', 'Compliance'],
        isPinned: true,
        isResolved: false
      },
      {
        id: 'disc2',
        title: 'Quick Win: Privacy Training for Staff',
        content: 'What\'s the most effective way to train frontline staff on privacy basics? Looking for ideas that work in practice.',
        author: 'David Rodriguez',
        authorId: 'user321',
        groupId: 'group2',
        moduleId: 'module1',
        createdAt: new Date('2025-01-14'),
        replies: [
          {
            id: 'reply3',
            content: 'We use monthly 15-minute lunch-and-learns with real-world scenarios. Much more effective than annual training sessions.',
            author: 'Jennifer Lee',
            authorId: 'user654',
            createdAt: new Date('2025-01-14'),
            likes: 6,
            isHelpful: true
          }
        ],
        likes: 9,
        tags: ['Training', 'Staff Education', 'Best Practices'],
        isPinned: false,
        isResolved: true
      }
    ]);

    // Sample challenges
    setChallenges([
      {
        id: 'challenge1',
        title: 'Privacy Breach Response Simulation',
        description: 'Work in teams to develop a comprehensive breach response plan for a fictional municipal data incident.',
        moduleId: 'module1',
        challengeType: 'scenario',
        difficulty: 'hard',
        participants: ['user123', 'user456', 'user789'],
        deadline: new Date('2025-01-25'),
        rewards: {
          points: 500,
          badge: 'Crisis Navigator'
        },
        status: 'open'
      },
      {
        id: 'challenge2',
        title: 'AI Risk Assessment Quiz Challenge',
        description: 'Test your knowledge of AI governance principles with this competitive quiz.',
        moduleId: 'module3',
        challengeType: 'quiz',
        difficulty: 'medium',
        participants: ['user321', 'user654'],
        deadline: new Date('2025-01-22'),
        rewards: {
          points: 200,
          badge: 'AI Expert'
        },
        status: 'in-progress'
      }
    ]);

    // Mock user's joined groups
    setUserGroups(['group1']);
  }, []);

  const handleJoinGroup = (groupId: string) => {
    if (!userGroups.includes(groupId)) {
      setUserGroups([...userGroups, groupId]);
      // Update member count
      setStudyGroups(groups => groups.map(g => 
        g.id === groupId ? { ...g, memberCount: g.memberCount + 1 } : g
      ));
      onJoinGroup?.(groupId);
    }
  };

  const handleLeaveGroup = (groupId: string) => {
    setUserGroups(userGroups.filter(id => id !== groupId));
    setStudyGroups(groups => groups.map(g => 
      g.id === groupId ? { ...g, memberCount: g.memberCount - 1 } : g
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="social-learning bg-surface border border-border rounded-lg p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">👥 Social Learning</h2>
        <p className="text-text-secondary">Connect, collaborate, and learn together with your peers</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-6">
        {[
          { id: 'groups', label: 'Study Groups', icon: '👥' },
          { id: 'discussions', label: 'Discussions', icon: '💬' },
          { id: 'challenges', label: 'Challenges', icon: '🏆' },
          { id: 'leaderboard', label: 'Leaderboard', icon: '📊' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          {/* My Groups */}
          {userGroups.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">My Study Groups</h3>
              <div className="grid gap-4">
                {studyGroups.filter(group => userGroups.includes(group.id)).map((group) => (
                  <div key={group.id} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">{group.name}</h4>
                        <p className="text-sm text-text-secondary mt-1">{group.description}</p>
                      </div>
                      <button
                        onClick={() => handleLeaveGroup(group.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Leave
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span>👥 {group.memberCount} members</span>
                      <span>📈 {group.progress}% avg progress</span>
                      <span>🕒 Active {formatTimeAgo(group.lastActivity)}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {group.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Groups */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Discover Study Groups</h3>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="btn-primary text-sm"
              >
                Create Group
              </button>
            </div>
            <div className="grid gap-4">
              {studyGroups.filter(group => !userGroups.includes(group.id)).map((group) => (
                <div key={group.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">{group.name}</h4>
                      <p className="text-sm text-text-secondary mt-1">{group.description}</p>
                    </div>
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="btn-primary text-sm"
                    >
                      Join
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>👥 {group.memberCount} members</span>
                    <span>📈 {group.progress}% avg progress</span>
                    <span>🕒 Active {formatTimeAgo(group.lastActivity)}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {group.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-text-primary">Recent Discussions</h3>
            <button
              onClick={() => setShowCreateDiscussion(true)}
              className="btn-primary text-sm"
            >
              Start Discussion
            </button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {discussion.isPinned && <span className="text-yellow-500">📌</span>}
                      {discussion.isResolved && <span className="text-green-500">✅</span>}
                      <h4 className="font-semibold text-text-primary">{discussion.title}</h4>
                    </div>
                    
                    <p className="text-text-secondary text-sm mb-3">{discussion.content}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span>👤 {discussion.author}</span>
                      <span>🕒 {formatTimeAgo(discussion.createdAt)}</span>
                      <span>💬 {discussion.replies.length} replies</span>
                      <span>❤️ {discussion.likes} likes</span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {discussion.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Recent Replies Preview */}
                    {discussion.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-border">
                        <div className="text-xs text-text-secondary mb-2">Recent reply:</div>
                        <div className="bg-surface p-2 rounded text-sm">
                          <p className="text-text-primary">{discussion.replies[discussion.replies.length - 1].content}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                            <span>👤 {discussion.replies[discussion.replies.length - 1].author}</span>
                            <span>🕒 {formatTimeAgo(discussion.replies[discussion.replies.length - 1].createdAt)}</span>
                            {discussion.replies[discussion.replies.length - 1].isHelpful && (
                              <span className="text-green-600">✨ Helpful</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">Peer Challenges</h3>
          
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-background border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-text-primary">{challenge.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span>👥 {challenge.participants.length} participants</span>
                      <span>⏰ Deadline: {challenge.deadline.toLocaleDateString()}</span>
                      <span>🎁 {challenge.rewards.points} points</span>
                      {challenge.rewards.badge && (
                        <span>🏆 {challenge.rewards.badge} badge</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      challenge.status === 'open' ? 'bg-green-100 text-green-600' :
                      challenge.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {challenge.status.replace('-', ' ').toUpperCase()}
                    </span>
                    
                    {challenge.status === 'open' && (
                      <button className="btn-primary text-sm">
                        Join Challenge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary">Community Leaderboard</h3>
          
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>This Week's Top Learners</span>
                <span>Points Earned</span>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {[
                { rank: 1, name: 'Sarah Chen', points: 2850, avatar: '👩‍💼', streak: 12 },
                { rank: 2, name: 'Mike Johnson', points: 2650, avatar: '👨‍💻', streak: 8 },
                { rank: 3, name: 'Lisa Wang', points: 2400, avatar: '👩‍🎓', streak: 15 },
                { rank: 4, name: 'David Rodriguez', points: 2200, avatar: '👨‍🏫', streak: 6 },
                { rank: 5, name: 'Jennifer Lee', points: 2100, avatar: '👩‍⚕️', streak: 9 },
                { rank: 6, name: 'You', points: 1950, avatar: '👤', streak: 5 }
              ].map((user) => (
                <div key={user.rank} className={`p-4 flex items-center justify-between ${
                  user.name === 'You' ? 'bg-primary/5 border-l-4 border-primary' : ''
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                      user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {user.rank <= 3 ? (user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉') : user.rank}
                    </div>
                    <span className="text-2xl">{user.avatar}</span>
                    <div>
                      <div className="font-medium text-text-primary">{user.name}</div>
                      <div className="text-sm text-text-secondary">🔥 {user.streak} day streak</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{user.points.toLocaleString()}</div>
                    <div className="text-sm text-text-secondary">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLearningComponent;