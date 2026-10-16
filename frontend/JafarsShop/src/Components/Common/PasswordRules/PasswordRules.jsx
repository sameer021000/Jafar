// PasswordRules.jsx
// Live password rule checklist with a strength meter.
import React from 'react';
import { getPasswordChecks } from '../../../Utils/Validation';
import './PasswordRules.css';

/**
 * @param {object} props
 * @param {string} props.value - current password value
 * @param {string} [props.id] - optional id for the container
 */
export default function PasswordRules({ value, id }) {
  const checks = getPasswordChecks(value);
  const passedCount = checks.filter((check) => check.passed).length;

  let strength = 'Weak';
  let strengthClass = 'password-rules__strength--weak';
  if (passedCount >= 5) {
    strength = 'Strong';
    strengthClass = 'password-rules__strength--strong';
  } else if (passedCount >= 3) {
    strength = 'Fair';
    strengthClass = 'password-rules__strength--fair';
  }

  const strengthWidth = `${(passedCount / checks.length) * 100}%`;

  return (
    <div className="password-rules" id={id} role="status" aria-live="polite">
      <div className="password-rules__header">
        <span className="password-rules__title">Password requirements</span>
        <span className={`password-rules__strength ${strengthClass}`}>
          {strength}
        </span>
      </div>

      <div className="password-rules__meter" aria-hidden="true">
        <div className="password-rules__meter-fill" style={{ width: strengthWidth }} />
      </div>

      <ul className="password-rules__list">
        {checks.map((check) => (
          <li
            key={check.id}
            className={`password-rules__item ${check.passed ? 'password-rules__item--passed' : ''}`}
            data-checked={check.passed}
          >
            <span className="password-rules__icon" aria-hidden="true">
              {check.passed ? '✓' : '○'}
            </span>
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}