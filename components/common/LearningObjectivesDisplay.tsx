/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LearningObjective, ModuleLearningDesign } from '../../types';
import { getBloomsLevel, getBloomsLevelIcon, sortByBloomsOrder } from '../../utils/bloomsTaxonomy';

interface LearningObjectivesDisplayProps {
    moduleDesign: ModuleLearningDesign;
    showCourseLevel?: boolean;
    showLessonLevel?: boolean;
    compact?: boolean;
}

/**
 * Enhanced Learning Objectives Display Component
 * Displays SMART learning objectives aligned to Bloom's Taxonomy
 */
const LearningObjectivesDisplay: React.FC<LearningObjectivesDisplayProps> = ({
    moduleDesign,
    showCourseLevel = true,
    showLessonLevel = true,
    compact = false
}) => {
    const renderObjective = (objective: LearningObjective, index: number) => {
        const bloomsDescriptor = getBloomsLevel(objective.bloomsLevel);
        const icon = getBloomsLevelIcon(objective.bloomsLevel);
        
        return (
            <div 
                key={objective.id}
                className="learning-objective-item"
                style={{
                    borderLeft: `4px solid ${bloomsDescriptor.color}`,
                    padding: '12px 16px',
                    marginBottom: '12px',
                    backgroundColor: `${bloomsDescriptor.color}20`,
                    borderRadius: '4px'
                }}
            >
                <div className="objective-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>{icon}</span>
                    <span style={{ 
                        fontSize: '0.75rem', 
                        textTransform: 'uppercase', 
                        fontWeight: 'bold',
                        color: '#555'
                    }}>
                        {bloomsDescriptor.level} ({bloomsDescriptor.order}/6)
                    </span>
                    <span style={{ 
                        marginLeft: 'auto', 
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: objective.objectiveType === 'course-level' ? '#4A90E2' : '#7ED321',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        {objective.objectiveType === 'course-level' ? 'COURSE' : 'LESSON'}
                    </span>
                </div>
                
                {!compact && (
                    <div className="objective-description" style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>
                        <em>{bloomsDescriptor.description}</em>
                    </div>
                )}
                
                <div className="objective-statement" style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: '1.5',
                    color: '#333',
                    fontWeight: '500'
                }}>
                    {objective.fullStatement}
                </div>
                
                {!compact && (
                    <div className="objective-components" style={{ 
                        marginTop: '12px', 
                        fontSize: '0.8rem',
                        paddingLeft: '12px',
                        borderLeft: '2px solid #e0e0e0'
                    }}>
                        <div style={{ marginBottom: '4px' }}>
                            <strong>Condition:</strong> <span style={{ color: '#555' }}>{objective.condition}</span>
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                            <strong>Action:</strong> <span style={{ color: '#555' }}>{objective.action}</span>
                        </div>
                        <div>
                            <strong>Criteria:</strong> <span style={{ color: '#555' }}>{objective.criteria}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="learning-objectives-enhanced" style={{ marginBottom: '2rem' }}>
            <div className="objectives-header" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem'
                }}>
                    <span style={{ marginRight: '8px' }}>🎯</span>
                    Learning Objectives
                </h3>
                
                <div className="module-goal" style={{ 
                    padding: '16px', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '8px',
                    marginBottom: '16px'
                }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>
                        Module Goal
                    </div>
                    <div style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                        {moduleDesign.overarchingGoal}
                    </div>
                </div>
                
                <div className="cognitive-level-info" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    fontSize: '0.85rem',
                    color: '#666',
                    marginBottom: '16px'
                }}>
                    <div>
                        <strong>Cognitive Level:</strong> {moduleDesign.cognitiveLevel}
                    </div>
                    <div>
                        <strong>Target Bloom's Levels:</strong> {moduleDesign.targetLevels.map(level => {
                            const icon = getBloomsLevelIcon(level);
                            return <span key={level} style={{ marginLeft: '4px' }}>{icon}</span>;
                        })}
                    </div>
                </div>
            </div>
            
            {showCourseLevel && moduleDesign.courseLevelObjectives.length > 0 && (
                <div className="course-level-objectives" style={{ marginBottom: '2rem' }}>
                    <h4 style={{ 
                        fontSize: '1.1rem', 
                        marginBottom: '1rem',
                        color: '#4A90E2',
                        fontWeight: 'bold'
                    }}>
                        📊 Course-Level Objectives
                    </h4>
                    <div style={{ 
                        fontSize: '0.85rem', 
                        color: '#666', 
                        marginBottom: '1rem',
                        fontStyle: 'italic'
                    }}>
                        Broad, overarching goals that integrate multiple skills and knowledge areas. 
                        Mastery typically requires completing several lesson-level objectives.
                    </div>
                    {sortByBloomsOrder(moduleDesign.courseLevelObjectives).map((objective, index) => 
                        renderObjective(objective, index)
                    )}
                </div>
            )}
            
            {showLessonLevel && moduleDesign.lessonLevelObjectives.length > 0 && (
                <div className="lesson-level-objectives">
                    <h4 style={{ 
                        fontSize: '1.1rem', 
                        marginBottom: '1rem',
                        color: '#7ED321',
                        fontWeight: 'bold'
                    }}>
                        📝 Lesson-Level Objectives
                    </h4>
                    <div style={{ 
                        fontSize: '0.85rem', 
                        color: '#666', 
                        marginBottom: '1rem',
                        fontStyle: 'italic'
                    }}>
                        Specific, measurable skills and knowledge that build cumulatively toward course-level goals. 
                        Progress from foundational (Remember) to advanced (Create) cognitive levels.
                    </div>
                    {sortByBloomsOrder(moduleDesign.lessonLevelObjectives).map((objective, index) => 
                        renderObjective(objective, index)
                    )}
                </div>
            )}
            
            <div className="blooms-taxonomy-guide" style={{ 
                marginTop: '2rem',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
            }}>
                <h5 style={{ fontSize: '0.9rem', marginBottom: '12px', fontWeight: 'bold' }}>
                    📚 Bloom's Taxonomy Reference
                </h5>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    fontSize: '0.75rem'
                }}>
                    {Object.values(getBloomsLevel('remember')).map((level) => {
                        if (typeof level === 'object' && 'level' in level) return null;
                        return null;
                    })}
                    {(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'] as const).map(level => {
                        const descriptor = getBloomsLevel(level);
                        const icon = getBloomsLevelIcon(level);
                        return (
                            <div 
                                key={level}
                                style={{
                                    padding: '8px',
                                    backgroundColor: descriptor.color,
                                    borderRadius: '4px',
                                    borderLeft: `4px solid ${descriptor.color.replace('20', '')}`
                                }}
                            >
                                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                    {icon} {descriptor.level} ({descriptor.order})
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#555' }}>
                                    {descriptor.description}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LearningObjectivesDisplay;
