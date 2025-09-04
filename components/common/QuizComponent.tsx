/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { QuizQuestions, QuizResult } from '../../hooks/useQuiz';

interface QuizComponentProps {
  questions: QuizQuestions;
  answers: { [key: string]: string };
  result: QuizResult | null;
  onAnswerChange: (questionId: string, answer: string) => void;
  onCheckAnswers: () => void;
  onRetake?: () => void;
  getOptionClass: (questionId: string, optionKey: string) => string;
  canSubmit: boolean;
  showExplanations?: boolean;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  answers,
  result,
  onAnswerChange,
  onCheckAnswers,
  onRetake,
  getOptionClass,
  canSubmit,
  showExplanations = false
}) => {
  return (
    <div className="bg-background border border-border p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-text-primary font-mono uppercase">
        Knowledge Check
      </h3>
      
      <div className="space-y-6">
        {Object.entries(questions).map(([questionId, question]) => (
          <div key={questionId}>
            <p className="font-medium mb-3 text-text-primary">
              {question.question}
            </p>
            <div className="space-y-3">
              {Object.entries(question.options).map(([optionKey, optionValue]) => (
                <label
                  key={`${questionId}-${optionKey}`}
                  htmlFor={`${questionId}-${optionKey}`}
                  className={`quiz-option flex items-center p-4 cursor-pointer ${getOptionClass(questionId, optionKey)}`}
                >
                  <input
                    type="radio"
                    id={`${questionId}-${optionKey}`}
                    name={questionId}
                    value={optionKey}
                    onChange={() => onAnswerChange(questionId, optionKey)}
                    checked={answers[questionId] === optionKey}
                    className="hidden"
                    disabled={!!result}
                  />
                  <span className="text-text-primary font-mono">{optionValue}</span>
                </label>
              ))}
            </div>
            
            {showExplanations && result && question.explanation && (
              <div className="mt-4 p-3 bg-surface-elevated rounded-lg">
                <p className="text-sm text-text-secondary">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!result && (
        <button
          onClick={onCheckAnswers}
          disabled={!canSubmit}
          className="mt-6 btn-primary py-2 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Answers
        </button>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className={`p-4 font-mono ${result.score >= 80 ? 'bg-success/10 border-success' : 'bg-warning/10 border-warning'} border-l-4`}>
            <h4 className="font-semibold mb-1 text-text-primary">
              RESULT: {result.score}%
            </h4>
            <p className="text-sm text-text-secondary">
              {result.score >= 80 
                ? "Excellent work! You've demonstrated strong understanding of the material."
                : "Good effort! Review the correct answers highlighted above and consider retaking the quiz."
              }
            </p>
          </div>
          
          {onRetake && result.score < 80 && (
            <button
              onClick={onRetake}
              className="btn-secondary py-2 px-6 text-sm"
            >
              Retake Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;