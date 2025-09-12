/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { QuizQuestions, QuizQuestion, QuizResult } from '../../hooks/useQuiz';
import { useMobileDetection, getQuizClasses, getDeviceOptimizedClasses } from '../../hooks/useMobileDetection';
import ResponsiveContainer from './ResponsiveContainer';
import ScenarioQuestion from './ScenarioQuestion';
import TextInputQuestion from './TextInputQuestion';
import ImageQuestion from './ImageQuestion';
import DragDropQuestion from './DragDropQuestion';

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
  const detection = useMobileDetection();
  const quizClasses = getQuizClasses(detection);
  const questionCount = Object.keys(questions).length;
  const answeredCount = Object.keys(answers).length;

  return (
    <ResponsiveContainer variant="quiz" className="mb-8">
      <div className={quizClasses.container}>
        {/* Quiz Header - Responsive */}
        <div className="text-center mb-6">
          <h3 className={`
            font-bold text-text-primary font-mono uppercase flex items-center justify-center gap-2
            ${detection.screenSize === 'mobile' ? 'text-xl' : 'text-3xl'}
          `}>
            <span>📝</span>
            <span className={detection.screenSize === 'mobile' ? 'hidden' : ''}>Knowledge</span>
            <span>Assessment</span>
          </h3>
          <p className={`
            text-text-secondary 
            ${detection.screenSize === 'mobile' ? 'text-sm mb-4' : 'text-lg mb-8'}
          `}>
            Test your understanding with {questionCount} questions. 
            {detection.screenSize !== 'mobile' && ' Good luck! 🚀'}
          </p>
        </div>

        {/* Progress Indicator for Mobile */}
        {detection.screenSize === 'mobile' && (
          <div className="mb-6 bg-surface-elevated rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-text-secondary">Progress</span>
              <span className="text-xs font-medium text-primary">
                {answeredCount}/{questionCount}
              </span>
            </div>
            <div className="progress-mobile">
              <div 
                className="fill" 
                style={{ width: `${(answeredCount / questionCount) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Questions Container */}
        <div className={quizClasses.container}>
          {Object.entries(questions).map(([questionId, question]: [string, QuizQuestion], index) => {
            const questionType = question.type || 'multiple-choice';
            
            // Render different question types
            switch (questionType) {
              case 'scenario':
                return (
                  <ScenarioQuestion
                    key={questionId}
                    question={question}
                    questionId={questionId}
                    questionNumber={index + 1}
                    onAnswerChange={onAnswerChange}
                    showResult={!!result}
                    userAnswer={answers[questionId]}
                  />
                );
              
              case 'text-input':
                return (
                  <TextInputQuestion
                    key={questionId}
                    question={question}
                    questionId={questionId}
                    questionNumber={index + 1}
                    onAnswerChange={onAnswerChange}
                    showResult={!!result}
                    userAnswer={answers[questionId]}
                  />
                );
              
              case 'image-based':
                return (
                  <ImageQuestion
                    key={questionId}
                    question={question}
                    questionId={questionId}
                    questionNumber={index + 1}
                    onAnswerChange={onAnswerChange}
                    showResult={!!result}
                    userAnswer={answers[questionId]}
                    getOptionClass={getOptionClass}
                  />
                );
              
              case 'drag-drop':
                return (
                  <DragDropQuestion
                    key={questionId}
                    question={question}
                    questionId={questionId}
                    questionNumber={index + 1}
                    onAnswerChange={onAnswerChange}
                    showResult={!!result}
                    userAnswer={answers[questionId]}
                  />
                );
              
              default:
                // Enhanced Multiple choice with responsive design
                return (
                  <div key={questionId} className={quizClasses.question}>
                    {/* Question Header - Mobile Optimized */}
                    <div className={`
                      flex items-start gap-3 mb-4
                      ${detection.screenSize === 'mobile' ? 'flex-col' : 'flex-row'}
                    `}>
                      <div className={`
                        bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0
                        ${detection.screenSize === 'mobile' ? 'w-6 h-6 text-xs self-start' : 'w-8 h-8 text-sm'}
                      `}>
                        {index + 1}
                      </div>
                      <p className={`
                        font-medium text-text-primary flex-1
                        ${detection.screenSize === 'mobile' ? 'text-sm leading-relaxed' : 'text-base'}
                      `}>
                        {question.question}
                      </p>
                    </div>

                    {/* Options - Touch Optimized */}
                    <div className={`
                      ${quizClasses.options}
                      ${detection.screenSize === 'mobile' ? 'space-y-2' : 'space-y-3'}
                      ${detection.screenSize === 'mobile' ? '' : 'ml-11'}
                    `}>
                      {Object.entries(question.options).map(([optionKey, optionValue]) => (
                        <label
                          key={`${questionId}-${optionKey}`}
                          htmlFor={`${questionId}-${optionKey}`}
                          className={`
                            ${quizClasses.option}
                            ${getOptionClass(questionId, optionKey)}
                            ${detection.touchDevice ? 'touch-manipulation tap-highlight-transparent' : ''}
                            ${getDeviceOptimizedClasses(detection)}
                          `}
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
                          <span className={`
                            ${quizClasses.optionText}
                            font-medium
                            ${answers[questionId] === optionKey ? 'text-primary' : 'text-text-primary'}
                          `}>
                            {optionValue}
                          </span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Explanation - Mobile Optimized */}
                    {showExplanations && result && question.explanation && (
                      <div className={`
                        mt-4 p-4 bg-surface-elevated rounded-lg border border-border
                        ${detection.screenSize === 'mobile' ? '' : 'ml-11'}
                      `}>
                        <p className={`
                          text-text-secondary
                          ${detection.screenSize === 'mobile' ? 'text-xs' : 'text-sm'}
                        `}>
                          <strong className="text-primary">💡 Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
            }
          })}
        </div>

        {/* Submit Button - Mobile Optimized */}
        {!result && (
          <div className="mt-8 text-center">
            <button
              onClick={onCheckAnswers}
              disabled={!canSubmit}
              className={`
                ${quizClasses.button}
                btn-primary font-semibold
                ${getDeviceOptimizedClasses(detection)}
                disabled:opacity-50 disabled:cursor-not-allowed
                ${detection.touchDevice ? 'touch-manipulation' : ''}
              `}
            >
              {canSubmit ? (
                <>
                  <span>✨</span>
                  <span className={detection.screenSize === 'mobile' ? 'ml-1' : 'ml-2'}>
                    Check {detection.screenSize === 'mobile' ? 'Answers' : 'My Answers'}
                  </span>
                </>
              ) : (
                <span>
                  Answer {answeredCount}/{questionCount} questions
                </span>
              )}
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs text-text-muted">
                Debug: {answeredCount}/{questionCount} answers
              </div>
            )}
          </div>
        )}

        {/* Results - Mobile Optimized */}
        {result && (
          <div className={`
            quiz-result p-6 rounded-xl border-2 mt-8
            ${result.score >= 80 ? 'border-success bg-success bg-opacity-5' : 'border-warning bg-warning bg-opacity-5'}
            ${detection.screenSize === 'mobile' ? 'p-4' : 'p-6'}
          `}>
            <h4 className={`
              font-bold mb-3 flex items-center gap-2
              ${result.score >= 80 ? 'text-success' : 'text-warning'}
              ${detection.screenSize === 'mobile' ? 'text-lg justify-center' : 'text-xl'}
            `}>
              <span>{result.score >= 80 ? '🎉' : '📚'}</span>
              <span>{result.score >= 80 ? 'Excellent!' : 'Good Effort!'}</span>
              <span className="font-mono">({result.score}%)</span>
            </h4>
            <p className={`
              text-text-secondary text-center
              ${detection.screenSize === 'mobile' ? 'text-sm leading-relaxed' : 'text-base'}
            `}>
              {result.score >= 80 
                ? "Outstanding work! You've demonstrated strong understanding and can proceed to the next module."
                : "You're on the right track! Review the explanations and try again with different questions."
              }
            </p>
            
            {onRetake && result.score < 80 && (
              <div className="mt-6 text-center">
                <button
                  onClick={onRetake}
                  className={`
                    btn-secondary font-semibold
                    ${getDeviceOptimizedClasses(detection)}
                    ${detection.touchDevice ? 'touch-manipulation' : ''}
                  `}
                >
                  🔄 Try Different Questions
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
};

export default QuizComponent;