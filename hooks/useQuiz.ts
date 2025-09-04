/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useCallback } from 'react';

export interface QuizQuestion {
  question: string;
  answer: string;
  options: { [key: string]: string };
  explanation?: string;
}

export interface QuizQuestions {
  [questionId: string]: QuizQuestion;
}

export interface QuizResult {
  score: number;
  feedback: { [questionId: string]: { correct: boolean } };
}

export interface UseQuizReturn {
  answers: { [key: string]: string };
  result: QuizResult | null;
  handleAnswerChange: (questionId: string, answer: string) => void;
  checkAnswers: () => void;
  resetQuiz: () => void;
  getOptionClass: (questionId: string, optionKey: string) => string;
  isQuizComplete: boolean;
  canSubmit: boolean;
}

export function useQuiz(questions: QuizQuestions): UseQuizReturn {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswerChange = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const checkAnswers = useCallback(() => {
    let score = 0;
    const feedback: { [key: string]: { correct: boolean } } = {};
    const totalQuestions = Object.keys(questions).length;
    const pointsPerQuestion = totalQuestions > 0 ? 100 / totalQuestions : 0;

    Object.keys(questions).forEach(questionId => {
      const isCorrect = answers[questionId] === questions[questionId].answer;
      feedback[questionId] = { correct: isCorrect };
      if (isCorrect) {
        score += pointsPerQuestion;
      }
    });

    setResult({ score: Math.round(score), feedback });
  }, [answers, questions]);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setResult(null);
  }, []);

  const getOptionClass = useCallback((questionId: string, optionKey: string) => {
    if (answers[questionId] === optionKey && !result) {
      return 'selected';
    }
    if (result) {
      const question = questions[questionId];
      const isAnswer = question.answer === optionKey;
      const isSelected = answers[questionId] === optionKey;

      if (isAnswer) return 'correct';
      if (isSelected && !isAnswer) return 'incorrect';
    }
    return '';
  }, [answers, result, questions]);

  const isQuizComplete = Object.keys(answers).length === Object.keys(questions).length;
  const canSubmit = isQuizComplete && !result;

  return {
    answers,
    result,
    handleAnswerChange,
    checkAnswers,
    resetQuiz,
    getOptionClass,
    isQuizComplete,
    canSubmit
  };
}