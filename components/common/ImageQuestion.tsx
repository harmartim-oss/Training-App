/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { QuizQuestion } from '../../hooks/useQuiz';

interface ImageQuestionProps {
  question: QuizQuestion;
  questionId: string;
  questionNumber: number;
  onAnswerChange?: (questionId: string, answer: string) => void;
  showResult?: boolean;
  userAnswer?: string;
  getOptionClass?: (questionId: string, optionKey: string) => string;
}

const ImageQuestion: React.FC<ImageQuestionProps> = ({
  question,
  questionId,
  questionNumber,
  onAnswerChange,
  showResult = false,
  userAnswer,
  getOptionClass
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleOptionSelect = (optionKey: string) => {
    if (onAnswerChange && !showResult) {
      onAnswerChange(questionId, optionKey);
    }
  };

  return (
    <div className="quiz-question">
      <div className="flex items-start mb-4">
        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
          {questionNumber}
        </div>
        <div className="flex-1">
          <div className="bg-learning-important border-l-4 border-learning-important-border p-4 rounded-r-lg mb-4">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center">
              🖼️ Image-Based Question
            </h4>
            <p className="font-medium text-text-primary">
              {question.question}
            </p>
          </div>

          {/* Image Display */}
          {question.imageUrl && (
            <div className="ml-4 mb-6">
              <div className="bg-white border border-border rounded-lg p-4 max-w-2xl">
                {!imageLoaded && !imageError && (
                  <div className="w-full h-64 bg-surface-elevated border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-text-muted text-sm">Loading image...</p>
                    </div>
                  </div>
                )}
                
                {imageError && (
                  <div className="w-full h-64 bg-surface-elevated border-2 border-dashed border-danger rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-danger text-4xl">📷</span>
                      <p className="text-danger text-sm mt-2">Image failed to load</p>
                    </div>
                  </div>
                )}

                <img
                  src={question.imageUrl}
                  alt="Question illustration"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`max-w-full h-auto rounded-lg shadow-sm ${!imageLoaded ? 'hidden' : ''}`}
                  style={{ maxHeight: '400px' }}
                />
                
                {imageLoaded && (
                  <p className="text-xs text-text-muted mt-2 text-center">
                    Click to view full size
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Answer Options */}
          <div className="ml-4">
            <h5 className="font-medium text-text-primary mb-3">Select your answer:</h5>
            <div className="space-y-3">
              {Object.entries(question.options).map(([optionKey, optionValue]) => (
                <label
                  key={`${questionId}-${optionKey}`}
                  htmlFor={`${questionId}-${optionKey}`}
                  className={`quiz-option flex items-center cursor-pointer ${
                    getOptionClass ? getOptionClass(questionId, optionKey) : 
                    (userAnswer === optionKey ? 'selected' : '')
                  }`}
                  onClick={() => handleOptionSelect(optionKey)}
                >
                  <input
                    type="radio"
                    id={`${questionId}-${optionKey}`}
                    name={questionId}
                    value={optionKey}
                    onChange={() => handleOptionSelect(optionKey)}
                    checked={userAnswer === optionKey}
                    className="hidden"
                    disabled={showResult}
                  />
                  <span className="text-text-primary font-medium">{optionValue}</span>
                </label>
              ))}
            </div>

            {question.explanation && showResult && (
              <div className="mt-6 p-4 bg-surface-elevated rounded-lg border border-border">
                <p className="text-sm text-text-secondary">
                  <strong className="text-primary">💡 Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageQuestion;