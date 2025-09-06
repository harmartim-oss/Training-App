/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { QuizQuestions, QuizQuestion, QuizResult } from '../../hooks/useQuiz';

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
      <div className="quiz-container">
        <h3 className="text-3xl font-bold mb-4 text-text-primary font-mono uppercase">
          📝 Knowledge Assessment
        </h3>
        <p className="text-text-secondary mb-8 text-lg">
          Test your understanding with {Object.keys(questions).length} randomly selected questions. Good luck! 🚀
        </p>
        
        <div className="space-y-8">
          {Object.entries(questions).map(([questionId, question]: [string, QuizQuestion], index) => (
            <div key={questionId} className="quiz-question">
              <div className="flex items-start mb-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="font-medium text-text-primary flex-1">
                  {question.question}
                </p>
              </div>
              <div className="space-y-3 ml-11">
                {Object.entries(question.options).map(([optionKey, optionValue]) => (
                  <label
                    key={`${questionId}-${optionKey}`}
                    htmlFor={`${questionId}-${optionKey}`}
                    className={`quiz-option flex items-center cursor-pointer ${getOptionClass(questionId, optionKey)}`}
                    onClick={() => {
                      if (!result) {
                        onAnswerChange(questionId, optionKey);
                      }
                    }}
                  >
                    <input
                      type="radio"
                      id={`${questionId}-${optionKey}`}
                      name={questionId}
                      value={optionKey}
                      onChange={() => {
                        if (!result) {
                          onAnswerChange(questionId, optionKey);
                        }
                      }}
                      checked={answers[questionId] === optionKey}
                      className="hidden"
                      disabled={!!result}
                    />
                    <span className="text-text-primary font-medium">{optionValue}</span>
                  </label>
                ))}
              </div>
              
              {showExplanations && result && question.explanation && (
                <div className="mt-6 ml-11 p-4 bg-surface-elevated rounded-lg border border-border">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-primary">💡 Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!result && (
          <div className="mt-8 text-center">
            <button
              onClick={onCheckAnswers}
              disabled={!canSubmit}
              className="btn-primary py-3 px-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canSubmit ? '✨ Check My Answers' : `Answer ${Object.keys(answers).length}/${Object.keys(questions).length} questions`}
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs text-text-muted">
                Debug: {Object.keys(answers).length}/{Object.keys(questions).length} answers
              </div>
            )}
          </div>
        )}

        {result && (
          <div className={`quiz-result ${result.score < 80 ? 'failed' : ''}`}>
            <h4 className={`font-bold mb-2 ${result.score >= 80 ? 'text-success' : 'text-warning'}`}>
              {result.score >= 80 ? '🎉 Excellent!' : '📚 Good Effort!'} Score: {result.score}%
            </h4>
            <p className="text-text-secondary">
              {result.score >= 80 
                ? "Outstanding work! You've demonstrated strong understanding of the material and can proceed to the next module."
                : "You're on the right track! Review the explanations above and try again. Each attempt uses different questions to help reinforce your learning."
              }
            </p>
            
            {onRetake && result.score < 80 && (
              <div className="mt-6 text-center">
                <button
                  onClick={onRetake}
                  className="btn-secondary py-3 px-6 text-lg font-semibold"
                >
                  🔄 Try Different Questions
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;