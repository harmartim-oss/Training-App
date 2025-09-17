/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

export interface AdaptiveQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'scenario' | 'matching' | 'ranking' | 'simulation' | 'case-study';
  difficulty: 'easy' | 'medium' | 'hard';
  moduleId: string;
  concept: string;
  question: string;
  options?: string[];
  correctAnswer: any;
  explanation: string;
  timeLimit?: number; // seconds
  points: number;
  hints?: string[];
  relatedContent?: string[];
  adaptiveRules?: {
    correctNext?: string[]; // Question IDs to show if answered correctly
    incorrectNext?: string[]; // Question IDs to show if answered incorrectly
  };
}

export interface ScenarioQuestion extends AdaptiveQuestion {
  scenario: {
    context: string;
    situation: string;
    stakeholders: string[];
    constraints?: string[];
  };
  tasks: {
    id: string;
    instruction: string;
    expectedAnswer: string;
    points: number;
  }[];
}

export interface SimulationQuestion extends AdaptiveQuestion {
  simulation: {
    title: string;
    description: string;
    environment: string;
    tools: string[];
    objectives: string[];
  };
  steps: {
    id: string;
    instruction: string;
    validation: string;
    feedback: string;
  }[];
}

interface EnhancedAssessmentProps {
  moduleId: string;
  assessmentType: 'formative' | 'summative' | 'diagnostic' | 'adaptive';
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  onComplete: (result: AssessmentResult) => void;
  onProgress?: (progress: number) => void;
}

interface AssessmentResult {
  score: number;
  totalPoints: number;
  timeSpent: number;
  questionsAnswered: number;
  conceptMastery: { concept: string; mastery: number }[];
  recommendations: string[];
  detailedFeedback: {
    strengths: string[];
    improvements: string[];
    nextSteps: string[];
  };
}

const EnhancedAssessment: React.FC<EnhancedAssessmentProps> = ({
  moduleId,
  assessmentType,
  userLevel,
  onComplete,
  onProgress
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // For simulation questions

  // Generate adaptive questions based on module and user level
  useEffect(() => {
    const generatedQuestions = generateAdaptiveQuestions(moduleId, userLevel, assessmentType);
    setQuestions(generatedQuestions);
    setStartTime(new Date());
    setQuestionStartTime(new Date());
  }, [moduleId, userLevel, assessmentType]);

  // Timer for time-limited questions
  useEffect(() => {
    if (questions[currentQuestionIndex]?.timeLimit && timeRemaining === null) {
      setTimeRemaining(questions[currentQuestionIndex].timeLimit);
    }

    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Auto-submit when time runs out
      handleNext();
    }
  }, [timeRemaining, currentQuestionIndex, questions]);

  // Progress tracking
  useEffect(() => {
    const progress = (currentQuestionIndex / questions.length) * 100;
    onProgress?.(progress);
  }, [currentQuestionIndex, questions.length, onProgress]);

  const generateAdaptiveQuestions = (moduleId: string, level: string, type: string): AdaptiveQuestion[] => {
    // Mock question generation - in real implementation, this would use AI or a question bank
    const baseQuestions: AdaptiveQuestion[] = [
      {
        id: 'q1',
        type: 'multiple-choice',
        difficulty: 'easy',
        moduleId: 'module1',
        concept: 'PIPEDA Principles',
        question: 'Which of these is NOT one of PIPEDA\'s Fair Information Principles?',
        options: [
          'Accountability',
          'Consent',
          'Data Minimization',
          'Accuracy'
        ],
        correctAnswer: 'Data Minimization',
        explanation: 'Data Minimization is a GDPR principle. PIPEDA uses "Limiting Collection" instead.',
        points: 10,
        hints: [
          'Think about the specific wording used in Canadian privacy law',
          'PIPEDA predates GDPR and uses different terminology'
        ]
      },
      {
        id: 'q2',
        type: 'scenario',
        difficulty: 'medium',
        moduleId: 'module1',
        concept: 'Breach Response',
        question: 'You discover that a USB drive containing citizen personal information has been lost. What are your immediate actions?',
        options: [
          'Assess the scope and impact',
          'Notify the media immediately',
          'Wait 30 days before taking action',
          'Only notify if more than 500 people affected'
        ],
        correctAnswer: 'Assess the scope and impact',
        explanation: 'The first step is always to assess scope and impact to determine appropriate response actions.',
        points: 15,
        timeLimit: 120
      },
      {
        id: 'q3',
        type: 'matching',
        difficulty: 'hard',
        moduleId: 'module1',
        concept: 'Jurisdiction',
        question: 'Match each privacy law to its correct jurisdiction:',
        options: [
          'PIPEDA - Private sector, federal',
          'MFIPPA - Municipal, Ontario',
          'PHIPA - Health sector, Ontario',
          'FIPPA - Provincial government, Ontario'
        ],
        correctAnswer: {
          'PIPEDA': 'Private sector, federal',
          'MFIPPA': 'Municipal, Ontario',
          'PHIPA': 'Health sector, Ontario',
          'FIPPA': 'Provincial government, Ontario'
        },
        explanation: 'Each privacy law has specific jurisdictional boundaries in the Canadian federal system.',
        points: 20
      },
      {
        id: 'q4',
        type: 'ranking',
        difficulty: 'medium',
        moduleId: 'module2',
        concept: 'Incident Response',
        question: 'Rank these incident response steps in correct order:',
        options: [
          'Recovery and lessons learned',
          'Detection and analysis',
          'Containment',
          'Preparation',
          'Eradication'
        ],
        correctAnswer: [
          'Preparation',
          'Detection and analysis',
          'Containment',
          'Eradication',
          'Recovery and lessons learned'
        ],
        explanation: 'This follows the standard NIST incident response framework sequence.',
        points: 25
      }
    ];

    // Filter and adapt questions based on level and type
    let filteredQuestions = baseQuestions.filter(q => q.moduleId === moduleId);
    
    // Adjust difficulty based on user level
    if (level === 'beginner') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty !== 'hard');
    } else if (level === 'advanced') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty !== 'easy');
    }

    return filteredQuestions;
  };

  const handleAnswer = (questionId: string, answer: any) => {
    const questionEndTime = new Date();
    const timeSpent = (questionEndTime.getTime() - questionStartTime.getTime()) / 1000;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        answer,
        timeSpent,
        hintsUsed: hintsUsed.includes(questionId) ? 1 : 0
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(new Date());
      setTimeRemaining(null);
      setShowHint(false);
    } else {
      // Assessment complete
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionStartTime(new Date());
      setTimeRemaining(null);
      setShowHint(false);
    }
  };

  const useHint = () => {
    const questionId = questions[currentQuestionIndex].id;
    if (!hintsUsed.includes(questionId)) {
      setHintsUsed([...hintsUsed, questionId]);
    }
    setShowHint(true);
  };

  const completeAssessment = () => {
    const endTime = new Date();
    const totalTimeSpent = (endTime.getTime() - startTime.getTime()) / 1000;
    
    // Calculate score and detailed results
    let totalScore = 0;
    let totalPoints = 0;
    const conceptMastery: { concept: string; mastery: number }[] = [];
    
    questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (userAnswer && isCorrectAnswer(question, userAnswer.answer)) {
        let points = question.points;
        // Reduce points for hint usage
        if (userAnswer.hintsUsed > 0) {
          points *= 0.8;
        }
        // Time bonus for quick answers (if time limit exists)
        if (question.timeLimit && userAnswer.timeSpent < question.timeLimit * 0.5) {
          points *= 1.1;
        }
        totalScore += points;
      }
    });

    // Calculate concept mastery
    const conceptGroups = questions.reduce((groups, question) => {
      if (!groups[question.concept]) {
        groups[question.concept] = { total: 0, correct: 0 };
      }
      groups[question.concept].total++;
      
      const userAnswer = answers[question.id];
      if (userAnswer && isCorrectAnswer(question, userAnswer.answer)) {
        groups[question.concept].correct++;
      }
      
      return groups;
    }, {} as Record<string, { total: number; correct: number }>);

    Object.entries(conceptGroups).forEach(([concept, stats]) => {
      conceptMastery.push({
        concept,
        mastery: (stats.correct / stats.total) * 100
      });
    });

    // Generate recommendations
    const recommendations = generateRecommendations(conceptMastery, totalScore / totalPoints);
    
    // Generate detailed feedback
    const detailedFeedback = generateDetailedFeedback(conceptMastery, answers, questions);

    const result: AssessmentResult = {
      score: Math.round((totalScore / totalPoints) * 100),
      totalPoints,
      timeSpent: totalTimeSpent,
      questionsAnswered: Object.keys(answers).length,
      conceptMastery,
      recommendations,
      detailedFeedback
    };

    setIsComplete(true);
    onComplete(result);
  };

  const isCorrectAnswer = (question: AdaptiveQuestion, userAnswer: any): boolean => {
    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return userAnswer === question.correctAnswer;
      case 'matching':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      case 'ranking':
        return JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
      default:
        return false;
    }
  };

  const generateRecommendations = (conceptMastery: { concept: string; mastery: number }[], overallScore: number): string[] => {
    const recommendations: string[] = [];
    
    if (overallScore < 60) {
      recommendations.push('Review the foundational concepts before proceeding');
      recommendations.push('Consider additional practice exercises');
    } else if (overallScore < 80) {
      recommendations.push('Good progress! Focus on areas with lower mastery');
      recommendations.push('Try the practice scenarios for reinforcement');
    } else {
      recommendations.push('Excellent work! You\'re ready for advanced content');
      recommendations.push('Consider helping peers in study groups');
    }

    // Concept-specific recommendations
    conceptMastery.forEach(({ concept, mastery }) => {
      if (mastery < 70) {
        recommendations.push(`Review materials for: ${concept}`);
      }
    });

    return recommendations;
  };

  const generateDetailedFeedback = (
    conceptMastery: { concept: string; mastery: number }[],
    answers: Record<string, any>,
    questions: AdaptiveQuestion[]
  ) => {
    const strengths: string[] = [];
    const improvements: string[] = [];
    const nextSteps: string[] = [];

    // Identify strengths
    conceptMastery.forEach(({ concept, mastery }) => {
      if (mastery >= 80) {
        strengths.push(`Strong understanding of ${concept}`);
      }
    });

    // Identify improvement areas
    conceptMastery.forEach(({ concept, mastery }) => {
      if (mastery < 70) {
        improvements.push(`Need more practice with ${concept}`);
      }
    });

    // Calculate hint usage
    const hintsUsedCount = Object.values(answers).reduce((count, answer: any) => 
      count + (answer.hintsUsed || 0), 0
    );
    
    if (hintsUsedCount === 0) {
      strengths.push('Confident problem-solving without hints');
    } else if (hintsUsedCount > questions.length / 2) {
      improvements.push('Consider reviewing concepts before attempting questions');
    }

    // Generate next steps
    const avgMastery = conceptMastery.reduce((sum, { mastery }) => sum + mastery, 0) / conceptMastery.length;
    
    if (avgMastery >= 80) {
      nextSteps.push('Ready to advance to the next module');
      nextSteps.push('Consider peer tutoring opportunities');
    } else if (avgMastery >= 60) {
      nextSteps.push('Review weak areas before proceeding');
      nextSteps.push('Complete additional practice exercises');
    } else {
      nextSteps.push('Recommend reviewing module content');
      nextSteps.push('Schedule study time with instructor');
    }

    return { strengths, improvements, nextSteps };
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return null;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <p className="text-lg text-text-primary">{question.question}</p>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-background cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="text-primary"
                  />
                  <span className="text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'ranking':
        return (
          <div className="space-y-4">
            <p className="text-lg text-text-primary">{question.question}</p>
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Drag to reorder (1 = first):</p>
              {/* Simplified ranking - in real implementation, would use drag & drop */}
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <select className="w-16 p-1 border border-border rounded">
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <span className="text-text-primary">{option}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <p className="text-lg text-text-primary">{question.question}</p>
            <p className="text-text-secondary">Question type: {question.type}</p>
          </div>
        );
    }
  };

  if (questions.length === 0) {
    return (
      <div className="enhanced-assessment bg-surface border border-border rounded-lg p-8 text-center">
        <div className="text-text-secondary">Loading assessment...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="enhanced-assessment bg-surface border border-border rounded-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">🎯 Enhanced Assessment</h2>
            <p className="text-text-secondary capitalize">{assessmentType} Assessment • {userLevel} Level</p>
          </div>
          
          {timeRemaining !== null && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <div className="text-yellow-800 font-bold">⏰ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</div>
              <div className="text-yellow-600 text-sm">Time Remaining</div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-background rounded-full h-3 mb-4">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
            'bg-red-100 text-red-600'
          }`}>
            {currentQuestion.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-text-secondary">
            Concept: {currentQuestion.concept}
          </span>
          <span className="text-sm text-primary font-medium">
            {currentQuestion.points} points
          </span>
        </div>

        {renderQuestion()}

        {/* Hints */}
        {currentQuestion.hints && (
          <div className="mt-6">
            {!showHint ? (
              <button
                onClick={useHint}
                className="btn-secondary text-sm"
                disabled={hintsUsed.includes(currentQuestion.id)}
              >
                💡 {hintsUsed.includes(currentQuestion.id) ? 'Hint Used' : 'Use Hint'} 
                {hintsUsed.includes(currentQuestion.id) ? '' : '(Reduces points)'}
              </button>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 Hint:</h4>
                <p className="text-blue-700">{currentQuestion.hints[0]}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span>🎯</span>
          <span>Take your time and think through each answer</span>
        </div>
        
        <button
          onClick={handleNext}
          className="btn-primary"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default EnhancedAssessment;