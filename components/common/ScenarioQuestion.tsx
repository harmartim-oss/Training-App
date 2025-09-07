/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { QuizQuestion } from '../../hooks/useQuiz';

interface ScenarioQuestionProps {
  question: QuizQuestion;
  questionId: string;
  questionNumber: number;
  onAnswerChange?: (questionId: string, answer: string) => void;
  showResult?: boolean;
  userAnswer?: string;
}

const ScenarioQuestion: React.FC<ScenarioQuestionProps> = ({
  question,
  questionId,
  questionNumber,
  onAnswerChange,
  showResult = false,
  userAnswer
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    if (onAnswerChange && question.scenarioAnswer) {
      onAnswerChange(questionId, 'revealed');
    }
  };

  return (
    <div className="quiz-question">
      <div className="flex items-start mb-4">
        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
          {questionNumber}
        </div>
        <div className="flex-1">
          <div className="bg-learning-info border-l-4 border-learning-info-border p-4 rounded-r-lg mb-4">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center">
              🎭 Scenario-Based Question
            </h4>
            <p className="font-medium text-text-primary">
              {question.question}
            </p>
          </div>

          <div className="ml-4">
            {!showAnswer && !showResult && (
              <button
                onClick={handleRevealAnswer}
                className="btn-secondary py-2 px-4 text-sm font-medium mb-4"
              >
                💡 Click to reveal suggested approach
              </button>
            )}

            {(showAnswer || showResult || userAnswer === 'revealed') && question.scenarioAnswer && (
              <div className="bg-learning-success border-l-4 border-learning-success-border p-4 rounded-r-lg">
                <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                  ✅ Suggested Approach:
                </h5>
                <p className="text-text-secondary whitespace-pre-line">
                  {question.scenarioAnswer}
                </p>
              </div>
            )}

            {question.explanation && (showAnswer || showResult || userAnswer === 'revealed') && (
              <div className="mt-4 p-4 bg-surface-elevated rounded-lg border border-border">
                <p className="text-sm text-text-secondary">
                  <strong className="text-primary">💡 Additional Context:</strong> {question.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioQuestion;