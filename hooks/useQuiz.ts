/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useCallback, useMemo } from 'react';

export interface QuizQuestion {
  question: string;
  answer: string;
  options: { [key: string]: string };
  explanation?: string;
  type?: 'multiple-choice' | 'scenario' | 'text-input' | 'image-based' | 'drag-drop' | 'matching';
  scenarioAnswer?: string; // For scenario-based questions with click-to-reveal
  sampleAnswer?: string; // For text input questions to compare against
  imageUrl?: string; // For image-based questions
  dragItems?: Array<{ id: string; content: string; correctZone: string }>; // For drag-drop
  matchPairs?: Array<{ left: string; right: string }>; // For matching exercises
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
  selectedQuestions: QuizQuestions;
  handleAnswerChange: (questionId: string, answer: string) => void;
  checkAnswers: () => void;
  resetQuiz: () => void;
  getOptionClass: (questionId: string, optionKey: string) => string;
  isQuizComplete: boolean;
  canSubmit: boolean;
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to randomly select questions
function selectRandomQuestions(allQuestions: QuizQuestions, count: number = 5): QuizQuestions {
  const questionKeys = Object.keys(allQuestions);
  const totalQuestions = questionKeys.length;
  
  // If we have fewer questions than requested, return all
  if (totalQuestions <= count) {
    return allQuestions;
  }
  
  // Randomly select question keys
  const shuffledKeys = shuffleArray(questionKeys);
  const selectedKeys = shuffledKeys.slice(0, count);
  
  // Build selected questions object
  const selectedQuestions: QuizQuestions = {};
  selectedKeys.forEach((key, index) => {
    // Rename keys to maintain consistency (q1, q2, etc.)
    const newKey = `q${index + 1}`;
    selectedQuestions[newKey] = allQuestions[key];
  });
  
  return selectedQuestions;
}

export function useQuiz(allQuestions: QuizQuestions, questionCount: number = 5): UseQuizReturn {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [quizSeed, setQuizSeed] = useState(Math.random()); // Used to trigger new randomization
  
  // Memoize the selected questions to prevent re-randomization on re-renders
  const selectedQuestions = useMemo(() => {
    return selectRandomQuestions(allQuestions, questionCount);
  }, [allQuestions, questionCount, quizSeed]);

  const handleAnswerChange = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const checkAnswers = useCallback(() => {
    let score = 0;
    const feedback: { [key: string]: { correct: boolean } } = {};
    const totalQuestions = Object.keys(selectedQuestions).length;
    const pointsPerQuestion = totalQuestions > 0 ? 100 / totalQuestions : 0;

    Object.keys(selectedQuestions).forEach(questionId => {
      const isCorrect = answers[questionId] === selectedQuestions[questionId].answer;
      feedback[questionId] = { correct: isCorrect };
      if (isCorrect) {
        score += pointsPerQuestion;
      }
    });

    setResult({ score: Math.round(score), feedback });
  }, [answers, selectedQuestions]);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setResult(null);
    setQuizSeed(Math.random()); // Generate new random questions
  }, []);

  const getOptionClass = useCallback((questionId: string, optionKey: string) => {
    if (answers[questionId] === optionKey && !result) {
      return 'selected';
    }
    if (result) {
      const question = selectedQuestions[questionId];
      const isAnswer = question.answer === optionKey;
      const isSelected = answers[questionId] === optionKey;

      if (isAnswer) return 'correct';
      if (isSelected && !isAnswer) return 'incorrect';
    }
    return '';
  }, [answers, result, selectedQuestions]);

  const isQuizComplete = Object.keys(answers).length === Object.keys(selectedQuestions).length;
  const canSubmit = isQuizComplete && !result;

  return {
    answers,
    result,
    selectedQuestions,
    handleAnswerChange,
    checkAnswers,
    resetQuiz,
    getOptionClass,
    isQuizComplete,
    canSubmit
  };
}