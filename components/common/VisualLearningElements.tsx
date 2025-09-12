/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ConceptIcon, ScenarioIcon, ImplementationIcon, ProgressIcon, InteractiveIcon, VisualFrameworkIcon } from '../icons';

interface ProcessFlowProps {
    steps: Array<{
        title: string;
        description: string;
        icon?: React.ReactNode;
        status?: 'completed' | 'current' | 'pending';
    }>;
    title: string;
}

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps, title }) => {
    return (
        <div className="visual-learning-component process-flow">
            <h4 className="visual-learning-title">
                <VisualFrameworkIcon className="w-5 h-5 text-primary" />
                {title}
            </h4>
            <div className="process-flow-container">
                {steps.map((step, index) => (
                    <div key={index} className="process-step">
                        <div className={`step-indicator ${step.status || 'pending'}`}>
                            {step.icon ? step.icon : (
                                <span className="step-number">{index + 1}</span>
                            )}
                        </div>
                        <div className="step-content">
                            <h5 className="step-title">{step.title}</h5>
                            <p className="step-description">{step.description}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="step-connector"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface ComparisonTableProps {
    title: string;
    columns: string[];
    rows: Array<{
        label: string;
        values: string[];
        highlight?: boolean;
    }>;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, columns, rows }) => {
    return (
        <div className="visual-learning-component comparison-table">
            <h4 className="visual-learning-title">
                <ConceptIcon className="w-5 h-5 text-primary" />
                {title}
            </h4>
            <div className="table-container">
                <table className="comparison-table-content">
                    <thead>
                        <tr>
                            <th className="row-header"></th>
                            {columns.map((column, index) => (
                                <th key={index} className="column-header">{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className={row.highlight ? 'highlighted-row' : ''}>
                                <td className="row-label">{row.label}</td>
                                {row.values.map((value, valueIndex) => (
                                    <td key={valueIndex} className="cell-content">{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface InfoGraphicProps {
    title: string;
    sections: Array<{
        icon: React.ReactNode;
        title: string;
        content: string[];
        color?: string;
    }>;
    layout?: 'grid' | 'flow' | 'circular';
}

export const InfoGraphic: React.FC<InfoGraphicProps> = ({ title, sections, layout = 'grid' }) => {
    return (
        <div className={`visual-learning-component infographic ${layout}`}>
            <h4 className="visual-learning-title">
                <InteractiveIcon className="w-5 h-5 text-primary" />
                {title}
            </h4>
            <div className={`infographic-container ${layout}`}>
                {sections.map((section, index) => (
                    <div key={index} className={`infographic-section ${section.color || 'default'}`}>
                        <div className="section-icon">
                            {section.icon}
                        </div>
                        <h5 className="section-title">{section.title}</h5>
                        <div className="section-content">
                            {section.content.map((item, itemIndex) => (
                                <p key={itemIndex} className="content-item">{item}</p>
                            ))}
                        </div>
                        {layout === 'flow' && index < sections.length - 1 && (
                            <div className="flow-arrow">→</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface InteractiveScenarioProps {
    title: string;
    scenario: string;
    considerations: string[];
    solution?: string;
    learningPoints: string[];
}

export const InteractiveScenario: React.FC<InteractiveScenarioProps> = ({ 
    title, 
    scenario, 
    considerations, 
    solution, 
    learningPoints 
}) => {
    const [showSolution, setShowSolution] = React.useState(false);

    return (
        <div className="visual-learning-component interactive-scenario">
            <h4 className="visual-learning-title">
                <ScenarioIcon className="w-5 h-5 text-primary" />
                {title}
            </h4>
            <div className="scenario-container">
                <div className="scenario-description">
                    <h5>📋 Scenario</h5>
                    <p>{scenario}</p>
                </div>
                
                <div className="scenario-considerations">
                    <h5>💭 Key Considerations</h5>
                    <ul>
                        {considerations.map((consideration, index) => (
                            <li key={index}>{consideration}</li>
                        ))}
                    </ul>
                </div>

                {solution && (
                    <div className="scenario-solution">
                        <button 
                            className="solution-toggle"
                            onClick={() => setShowSolution(!showSolution)}
                        >
                            {showSolution ? '🔼 Hide Solution' : '🔽 Show Solution Approach'}
                        </button>
                        {showSolution && (
                            <div className="solution-content">
                                <h5>✅ Solution Approach</h5>
                                <p>{solution}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="learning-points">
                    <h5>🎯 Key Learning Points</h5>
                    <ul>
                        {learningPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

interface ProgressVisualizerProps {
    title: string;
    currentStep: number;
    totalSteps: number;
    stepLabels: string[];
    description?: string;
}

export const ProgressVisualizer: React.FC<ProgressVisualizerProps> = ({ 
    title, 
    currentStep, 
    totalSteps, 
    stepLabels, 
    description 
}) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="visual-learning-component progress-visualizer">
            <h4 className="visual-learning-title">
                <ProgressIcon className="w-5 h-5 text-primary" />
                {title}
            </h4>
            <div className="progress-container">
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{currentStep} of {totalSteps}</span>
                </div>
                
                <div className="progress-steps">
                    {stepLabels.map((label, index) => (
                        <div key={index} className={`progress-step-item ${
                            index < currentStep ? 'completed' : 
                            index === currentStep ? 'current' : 'pending'
                        }`}>
                            <div className="step-circle">{index + 1}</div>
                            <span className="step-label">{label}</span>
                        </div>
                    ))}
                </div>
                
                {description && (
                    <p className="progress-description">{description}</p>
                )}
            </div>
        </div>
    );
};

interface ConceptMapProps {
    title: string;
    centralConcept: string;
    connections: Array<{
        concept: string;
        relationship: string;
        description: string;
    }>;
}

export const ConceptMap: React.FC<ConceptMapProps> = ({ title, centralConcept, connections }) => {
    return (
        <div className="visual-learning-component concept-map">
            <h4 className="visual-learning-title">
                <ConceptIcon className="w-5 h-5 text-primary" />
                {title}
            </h4>
            <div className="concept-map-container">
                <div className="central-concept">
                    {centralConcept}
                </div>
                <div className="concept-connections">
                    {connections.map((connection, index) => (
                        <div key={index} className="connection-item" style={{
                            transform: `rotate(${(360 / connections.length) * index}deg)`,
                            transformOrigin: '50% 150px'
                        }}>
                            <div className="connection-line"></div>
                            <div className="connected-concept" style={{
                                transform: `rotate(-${(360 / connections.length) * index}deg)`
                            }}>
                                <div className="concept-title">{connection.concept}</div>
                                <div className="relationship">{connection.relationship}</div>
                                <div className="concept-description">{connection.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};