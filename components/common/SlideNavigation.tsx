/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

export interface Slide {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface SlideNavigationProps {
    slides: Slide[];
    onComplete?: () => void;
    moduleTitle: string;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({ slides, onComplete, moduleTitle }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [visitedSlides, setVisitedSlides] = useState<Set<number>>(new Set([0]));

    const currentSlide = slides[currentSlideIndex];
    const isFirstSlide = currentSlideIndex === 0;
    const isLastSlide = currentSlideIndex === slides.length - 1;
    const progress = ((currentSlideIndex + 1) / slides.length) * 100;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && !isLastSlide) {
                goToNextSlide();
            } else if (e.key === 'ArrowLeft' && !isFirstSlide) {
                goToPreviousSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlideIndex, isFirstSlide, isLastSlide]);

    const goToNextSlide = () => {
        if (currentSlideIndex < slides.length - 1) {
            const nextIndex = currentSlideIndex + 1;
            setCurrentSlideIndex(nextIndex);
            setVisitedSlides(prev => new Set([...prev, nextIndex]));
        }
    };

    const goToPreviousSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlideIndex(index);
        setVisitedSlides(prev => new Set([...prev, index]));
    };

    const handleComplete = () => {
        if (onComplete) {
            onComplete();
        }
    };

    return (
        <div className="slide-navigation-container">
            {/* Progress Header */}
            <div className="slide-progress-header">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-text-primary">
                            {currentSlide.title}
                        </h2>
                        <span className="text-sm text-text-muted">
                            Slide {currentSlideIndex + 1} of {slides.length}
                        </span>
                    </div>
                    <div className="text-sm text-text-muted">
                        {Math.round(progress)}% Complete
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="slide-progress-bar">
                    <div 
                        className="slide-progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Slide Content with Animation */}
            <div className="slide-content" key={currentSlide.id}>
                {currentSlide.content}
            </div>

            {/* Navigation Controls */}
            <div className="slide-navigation-controls">
                <div className="flex items-center justify-between gap-4">
                    {/* Previous Button */}
                    <button
                        onClick={goToPreviousSlide}
                        disabled={isFirstSlide}
                        className="slide-nav-button slide-nav-prev"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Previous</span>
                    </button>

                    {/* Slide Indicators */}
                    <div className="slide-indicators">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                className={`slide-indicator ${
                                    index === currentSlideIndex ? 'active' : ''
                                } ${visitedSlides.has(index) ? 'visited' : ''}`}
                                title={`${slide.title} (${index + 1}/${slides.length})`}
                                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                            >
                                {visitedSlides.has(index) && index !== currentSlideIndex && (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Next/Complete Button */}
                    {isLastSlide ? (
                        <button
                            onClick={handleComplete}
                            className="slide-nav-button slide-nav-complete"
                        >
                            <span>Complete</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={goToNextSlide}
                            className="slide-nav-button slide-nav-next"
                        >
                            <span>Next</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Keyboard Hints */}
            <div className="slide-keyboard-hints">
                <span className="text-xs text-text-muted">
                    Use ← → arrow keys to navigate
                </span>
            </div>
        </div>
    );
};

export default SlideNavigation;
