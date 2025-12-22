/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BloomsLevel,
  BloomsLevelIndicators,
  getBloomsLevelColor,
  getBloomsLevelIcon,
  CognitiveLevel
} from '../../config/bloomsTaxonomy';

interface BloomsTaxonomyIndicatorProps {
  level: BloomsLevel;
  showDescription?: boolean;
  showExamples?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const BloomsTaxonomyIndicator: React.FC<BloomsTaxonomyIndicatorProps> = ({
  level,
  showDescription = false,
  showExamples = false,
  size = 'medium',
  className = ''
}) => {
  const indicator = BloomsLevelIndicators.find(i => i.level === level);
  if (!indicator) return null;

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      <div
        className={`inline-flex items-center gap-2 rounded-full font-semibold ${sizeClasses[size]}`}
        style={{
          backgroundColor: `${indicator.color}20`,
          color: indicator.color,
          border: `1px solid ${indicator.color}40`
        }}
      >
        <span>{indicator.icon}</span>
        <span>{indicator.level}</span>
      </div>
      {showDescription && (
        <div className="text-sm text-text-secondary italic">
          {indicator.description}
        </div>
      )}
      {showExamples && indicator.examples && (
        <div className="text-xs text-text-secondary">
          <div className="font-semibold mb-1">Examples:</div>
          <ul className="list-disc list-inside space-y-1">
            {indicator.examples.map((example, idx) => (
              <li key={idx}>{example}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface LearningObjectivesDisplayProps {
  moduleId: number;
  objectives: any[];
  type: 'course' | 'lesson';
  className?: string;
}

export const LearningObjectivesDisplay: React.FC<LearningObjectivesDisplayProps> = ({
  moduleId,
  objectives,
  type,
  className = ''
}) => {
  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {type === 'course' ? '🎯 Module Learning Objectives' : '📝 Lesson-Level Objectives'}
        </h3>
        <p className="text-sm text-text-secondary">
          {type === 'course'
            ? 'Broad competencies you will develop by completing this module'
            : 'Specific, measurable skills you will master through this module'}
        </p>
      </div>
      
      <div className="space-y-4">
        {objectives.map((objective, idx) => (
          <div
            key={objective.id}
            className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <BloomsTaxonomyIndicator level={objective.bloomsLevel} size="small" />
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: objective.cognitiveLevel === CognitiveLevel.LOWER_ORDER ? '#10B98120' : '#EF444420',
                      color: objective.cognitiveLevel === CognitiveLevel.LOWER_ORDER ? '#10B981' : '#EF4444'
                    }}
                  >
                    {objective.cognitiveLevel}
                  </span>
                </div>
                <p className="text-text-primary font-medium mb-2">{objective.statement}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-text-secondary">
                  <div>
                    <span className="font-semibold">Action:</span> {objective.action}
                  </div>
                  <div>
                    <span className="font-semibold">Condition:</span> {objective.condition}
                  </div>
                  <div>
                    <span className="font-semibold">Criteria:</span> {objective.criteria}
                  </div>
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  <span className="font-semibold">Assessment:</span> {objective.assessmentMethod}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CognitiveProgressIndicatorProps {
  completedObjectives: string[];
  className?: string;
}

export const CognitiveProgressIndicator: React.FC<CognitiveProgressIndicatorProps> = ({
  completedObjectives,
  className = ''
}) => {
  const calculateProgress = () => {
    // This would integrate with the bloomsTaxonomy config
    // For now, showing a simple implementation
    return {
      lowerOrder: 65,
      higherOrder: 40,
      overallLevel: 'Core Knowledge Established'
    };
  };

  const progress = calculateProgress();

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-text-primary mb-4">📊 Your Cognitive Progress</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">Lower-Order Thinking Skills</span>
            <span className="text-sm font-bold text-green">{progress.lowerOrder}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-3 overflow-hidden border border-border">
            <div
              className="h-full bg-green transition-all duration-500"
              style={{ width: `${progress.lowerOrder}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-1">Remember, Understand, Apply</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">Higher-Order Thinking Skills</span>
            <span className="text-sm font-bold text-primary">{progress.higherOrder}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-3 overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress.higherOrder}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-1">Analyze, Evaluate, Create</p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-sm font-semibold text-text-primary">Current Level</p>
              <p className="text-lg font-bold text-primary">{progress.overallLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BloomsTaxonomyLegendProps {
  className?: string;
}

export const BloomsTaxonomyLegend: React.FC<BloomsTaxonomyLegendProps> = ({ className = '' }) => {
  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-text-primary mb-4">🎓 Bloom's Taxonomy Guide</h3>
      <p className="text-sm text-text-secondary mb-4">
        This training program uses Bloom's Taxonomy to structure learning from foundational knowledge 
        to advanced critical thinking and creation skills.
      </p>
      
      <div className="space-y-3">
        {BloomsLevelIndicators.map((indicator) => (
          <div key={indicator.level} className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{
                backgroundColor: `${indicator.color}20`,
                border: `2px solid ${indicator.color}40`
              }}
            >
              {indicator.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-text-primary">{indicator.level}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${indicator.color}20`, color: indicator.color }}
                >
                  {[BloomsLevel.REMEMBER, BloomsLevel.UNDERSTAND, BloomsLevel.APPLY].includes(indicator.level)
                    ? 'Foundation'
                    : 'Advanced'}
                </span>
              </div>
              <p className="text-xs text-text-secondary">{indicator.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
