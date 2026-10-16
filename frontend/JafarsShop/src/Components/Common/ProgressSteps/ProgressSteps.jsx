// ProgressSteps.jsx
// Reusable horizontal step rail for multi-step forms.
import React from 'react';
import './ProgressSteps.css';

/**
 * @param {object} props
 * @param {Array<{label: string}>} props.steps - step definitions with labels.
 * @param {number} props.current - zero-based index of the active step.
 */
export default function ProgressSteps({ steps = [], current = 0 }) {
  return (
    <nav className="progress-steps" aria-label="Progress" >
      <ol className="progress-steps__list">
        {steps.map((step, index) => {
          const isCompleted = index < current;
          const isActive = index === current;
          const stateClass = isCompleted
            ? 'progress-steps__step--completed'
            : isActive
            ? 'progress-steps__step--active'
            : '';

          return (
            <li
              key={step.label || index}
              className={`progress-steps__step ${stateClass}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="progress-steps__indicator" aria-hidden="true">
                {isCompleted ? '✓' : index + 1}
              </span>
              <span className="progress-steps__label">{step.label}</span>
            </li>
          );
        })}
      </ol>
      <div className="progress-steps__bar" aria-hidden="true">
        <div
          className="progress-steps__bar-fill"
          style={{ width: `${((current) / Math.max(steps.length - 1, 1)) * 100}%` }}
        />
      </div>
    </nav>
  );
}