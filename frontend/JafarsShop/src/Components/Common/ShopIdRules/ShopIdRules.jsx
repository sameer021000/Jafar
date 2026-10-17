// ShopIdRules.jsx
// Live Shop ID rule checklist — mirrors PasswordRules pattern.
import React from 'react';
import { getShopIdChecks } from '../../../Utils/Validation';
import './ShopIdRules.css';

/**
 * @param {object} props
 * @param {string} props.value  - current shopId value
 * @param {string} [props.id]   - optional container id
 */
export default function ShopIdRules({ value, id }) {
  const checks = getShopIdChecks(value);
  const passedCount = checks.filter((c) => c.passed).length;
  const total = checks.length;
  const fillWidth = `${(passedCount / total) * 100}%`;

  let statusLabel = 'Invalid';
  let statusClass = 'shopid-rules__status--invalid';
  if (passedCount === total) {
    statusLabel = 'Valid';
    statusClass = 'shopid-rules__status--valid';
  } else if (passedCount >= Math.ceil(total / 2)) {
    statusLabel = 'Almost';
    statusClass = 'shopid-rules__status--almost';
  }

  return (
    <div className="shopid-rules" id={id} role="status" aria-live="polite">
      <div className="shopid-rules__header">
        <span className="shopid-rules__title">Shop ID Requirements</span>
        <span className={`shopid-rules__status ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className="shopid-rules__meter" aria-hidden="true">
        <div className="shopid-rules__meter-fill" style={{ width: fillWidth }} />
      </div>

      <ul className="shopid-rules__list">
        {checks.map((check) => (
          <li
            key={check.id}
            className={`shopid-rules__item ${check.passed ? 'shopid-rules__item--passed' : ''}`}
          >
            <span className="shopid-rules__icon" aria-hidden="true">
              {check.passed ? '✓' : '○'}
            </span>
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
