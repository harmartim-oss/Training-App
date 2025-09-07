/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../hooks/useQuiz';

interface TextInputQuestionProps {
  question: QuizQuestion;
  questionId: string;
  questionNumber: number;
  onAnswerChange?: (questionId: string, answer: string) => void;
  showResult?: boolean;
  userAnswer?: string;
  score?: number; // Score out of 100 for this question
}

// Simple text similarity scoring function
const calculateTextSimilarity = (userText: string, sampleText: string): number => {
  if (!userText.trim()) return 0;
  
  const normalize = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '').trim();
  const userNormalized = normalize(userText);
  const sampleNormalized = normalize(sampleText);
  
  if (userNormalized === sampleNormalized) return 100;
  
  // Simple keyword matching approach
  const userWords = userNormalized.split(/\s+/);
  const sampleWords = sampleNormalized.split(/\s+/);
  
  let matchedWords = 0;
  const keyWords = sampleWords.filter(word => word.length > 3); // Focus on meaningful words
  
  keyWords.forEach(keyword => {
    if (userWords.some(userWord => 
      userWord.includes(keyword) || keyword.includes(userWord) || 
      Math.abs(userWord.length - keyword.length) <= 2 && 
      userWord.split('').filter((char, i) => char === keyword[i]).length >= Math.min(userWord.length, keyword.length) * 0.7
    )) {
      matchedWords++;
    }
  });
  
  const keywordScore = keyWords.length > 0 ? (matchedWords / keyWords.length) * 70 : 0;
  
  // Length similarity bonus
  const lengthRatio = Math.min(userText.length, sampleText.length) / Math.max(userText.length, sampleText.length);
  const lengthScore = lengthRatio * 30;
  
  return Math.min(100, Math.round(keywordScore + lengthScore));
};

const TextInputQuestion: React.FC<TextInputQuestionProps> = ({
  question,
  questionId,
  questionNumber,
  onAnswerChange,
  showResult = false,
  userAnswer = '',
  score
}) => {
  const [textInput, setTextInput] = useState(userAnswer);
  const [showSample, setShowSample] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  useEffect(() => {
    if (showResult && question.sampleAnswer && textInput) {
      const similarity = calculateTextSimilarity(textInput, question.sampleAnswer);
      setCalculatedScore(similarity);
    }
  }, [showResult, textInput, question.sampleAnswer]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextInput(value);
    if (onAnswerChange) {
      onAnswerChange(questionId, value);
    }
  };

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return 'text-success';
    if (scoreValue >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreMessage = (scoreValue: number) => {
    if (scoreValue >= 90) return '🎉 Excellent response!';
    if (scoreValue >= 80) return '👍 Good understanding!';
    if (scoreValue >= 60) return '📚 Reasonable attempt, could improve';
    if (scoreValue >= 40) return '💡 Some understanding shown, needs more detail';
    return '🔄 Consider reviewing the material and trying again';
  };

  return (
    <div className="quiz-question">
      <div className="flex items-start mb-4">
        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
          {questionNumber}
        </div>
        <div className="flex-1">
          <div className="bg-learning-tip border-l-4 border-learning-tip-border p-4 rounded-r-lg mb-4">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center">
              ✏️ Written Response Question
            </h4>
            <p className="font-medium text-text-primary">
              {question.question}
            </p>
          </div>

          <div className="ml-4">
            <div className="mb-4">
              <label htmlFor={`text-input-${questionId}`} className="block text-sm font-medium text-text-secondary mb-2">
                Your Answer:
              </label>
              <textarea
                id={`text-input-${questionId}`}
                value={textInput}
                onChange={handleTextChange}
                disabled={showResult}
                placeholder="Write your detailed response here..."
                className="w-full min-h-[120px] p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-vertical disabled:bg-surface-elevated disabled:cursor-not-allowed"
                maxLength={1000}
              />
              <div className="text-right text-xs text-text-muted mt-1">
                {textInput.length}/1000 characters
              </div>
            </div>

            {showResult && calculatedScore !== null && (
              <div className="bg-surface-elevated border border-border rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">AI Assessment Score:</span>
                  <span className={`font-bold text-lg ${getScoreColor(calculatedScore)}`}>
                    {calculatedScore}%
                  </span>
                </div>
                <p className={`text-sm ${getScoreColor(calculatedScore)}`}>
                  {getScoreMessage(calculatedScore)}
                </p>
              </div>
            )}

            {question.sampleAnswer && (
              <div className="mb-4">
                {!showSample && !showResult && (
                  <button
                    onClick={() => setShowSample(true)}
                    className="btn-secondary py-2 px-4 text-sm font-medium"
                  >
                    📋 View Sample Answer
                  </button>
                )}

                {(showSample || showResult) && (
                  <div className="bg-learning-success border-l-4 border-learning-success-border p-4 rounded-r-lg">
                    <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                      📝 Sample Answer:
                    </h5>
                    <p className="text-text-secondary whitespace-pre-line">
                      {question.sampleAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {question.explanation && (showSample || showResult) && (
              <div className="p-4 bg-surface-elevated rounded-lg border border-border">
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

export default TextInputQuestion;