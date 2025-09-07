/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef, useEffect } from 'react';
import { QuizQuestion } from '../../hooks/useQuiz';

interface DragDropQuestionProps {
  question: QuizQuestion;
  questionId: string;
  questionNumber: number;
  onAnswerChange?: (questionId: string, answer: string) => void;
  showResult?: boolean;
  userAnswer?: string;
}

interface DragItem {
  id: string;
  content: string;
  correctZone: string;
  currentZone?: string;
}

const DragDropQuestion: React.FC<DragDropQuestionProps> = ({
  question,
  questionId,
  questionNumber,
  onAnswerChange,
  showResult = false,
  userAnswer
}) => {
  const [dragItems, setDragItems] = useState<DragItem[]>(() => {
    if (question.dragItems) {
      return question.dragItems.map(item => ({ ...item, currentZone: 'source' }));
    }
    return [];
  });
  
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropZones] = useState(['Zone A', 'Zone B', 'Zone C']); // Can be customized based on question

  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize from user answer if available
    if (userAnswer && question.dragItems) {
      try {
        const savedState = JSON.parse(userAnswer);
        setDragItems(savedState);
      } catch (e) {
        // Invalid saved state, use default
      }
    }
  }, [userAnswer, question.dragItems]);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetZone: string) => {
    e.preventDefault();
    
    if (!draggedItem || showResult) return;

    const newDragItems = dragItems.map(item => {
      if (item.id === draggedItem) {
        return { ...item, currentZone: targetZone };
      }
      return item;
    });

    setDragItems(newDragItems);
    setDraggedItem(null);

    // Save state
    if (onAnswerChange) {
      onAnswerChange(questionId, JSON.stringify(newDragItems));
    }
  };

  const getItemsInZone = (zone: string) => {
    return dragItems.filter(item => item.currentZone === zone);
  };

  const getZoneClass = (zone: string, item: DragItem) => {
    if (!showResult) return '';
    
    if (item.correctZone === zone) {
      return 'border-success bg-learning-success';
    } else {
      return 'border-danger bg-learning-important';
    }
  };

  const calculateScore = () => {
    if (!question.dragItems) return 0;
    
    const correctPlacements = dragItems.filter(item => 
      item.currentZone === item.correctZone
    ).length;
    
    return Math.round((correctPlacements / question.dragItems.length) * 100);
  };

  return (
    <div className="quiz-question">
      <div className="flex items-start mb-4">
        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
          {questionNumber}
        </div>
        <div className="flex-1">
          <div className="bg-learning-info border-l-4 border-learning-info-border p-4 rounded-r-lg mb-6">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center">
              🎯 Drag & Drop Exercise
            </h4>
            <p className="font-medium text-text-primary">
              {question.question}
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Drag items from the source area to the appropriate zones below.
            </p>
          </div>

          <div className="ml-4">
            {/* Source Area */}
            <div className="mb-6">
              <h5 className="font-medium text-text-primary mb-3">📦 Available Items:</h5>
              <div 
                className="min-h-[100px] p-4 bg-surface border-2 border-dashed border-border rounded-lg"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'source')}
              >
                <div className="flex flex-wrap gap-2">
                  {getItemsInZone('source').map(item => (
                    <div
                      key={item.id}
                      draggable={!showResult}
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className={`p-3 bg-primary text-white rounded-lg cursor-move select-none transition-transform hover:scale-105 ${
                        showResult ? 'cursor-not-allowed opacity-75' : ''
                      }`}
                    >
                      {item.content}
                    </div>
                  ))}
                  {getItemsInZone('source').length === 0 && (
                    <p className="text-text-muted italic">All items have been placed</p>
                  )}
                </div>
              </div>
            </div>

            {/* Drop Zones */}
            <div className="space-y-4">
              <h5 className="font-medium text-text-primary">🎯 Drop Zones:</h5>
              {dropZones.map((zone, index) => (
                <div key={zone} className="border-2 border-border rounded-lg">
                  <div className="bg-surface-elevated px-4 py-2 rounded-t-lg border-b border-border">
                    <h6 className="font-medium text-text-primary">{zone}</h6>
                  </div>
                  <div
                    className="min-h-[80px] p-4"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, zone)}
                  >
                    <div className="flex flex-wrap gap-2">
                      {getItemsInZone(zone).map(item => (
                        <div
                          key={item.id}
                          draggable={!showResult}
                          onDragStart={(e) => handleDragStart(e, item.id)}
                          className={`p-3 bg-accent text-white rounded-lg select-none transition-all ${
                            showResult ? 
                              `cursor-not-allowed ${getZoneClass(zone, item)}` : 
                              'cursor-move hover:scale-105'
                          }`}
                        >
                          {item.content}
                          {showResult && (
                            <span className="ml-2">
                              {item.correctZone === zone ? '✅' : '❌'}
                            </span>
                          )}
                        </div>
                      ))}
                      {getItemsInZone(zone).length === 0 && (
                        <p className="text-text-muted italic">Drop items here</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            {showResult && (
              <div className="mt-6 p-4 bg-surface-elevated rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">Exercise Score:</span>
                  <span className={`font-bold text-lg ${
                    calculateScore() >= 80 ? 'text-success' : 
                    calculateScore() >= 60 ? 'text-warning' : 'text-danger'
                  }`}>
                    {calculateScore()}%
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {calculateScore() >= 80 ? 
                    '🎉 Excellent! You correctly placed most items.' :
                    calculateScore() >= 60 ?
                    '👍 Good attempt! Review the correct placements above.' :
                    '📚 Keep practicing! The correct placements are shown above.'
                  }
                </p>
              </div>
            )}

            {question.explanation && showResult && (
              <div className="mt-4 p-4 bg-surface-elevated rounded-lg border border-border">
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

export default DragDropQuestion;