// SignUpShowcase.jsx
// Premium animated showcase panel — left side of the sign-up screen.
import React from 'react';
import './SignUpShowcase.css';

const FEATURES = [
  {
    id: 'profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: 'Merchant Profile',
    desc: 'Build your verified store identity on the platform',
  },
  {
    id: 'location',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: 'Store Location',
    desc: 'Add address and contact details for customer reach',
  },
  {
    id: 'images',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: 'Store Gallery',
    desc: 'Upload up to 4 showcase images of your store',
  },
  {
    id: 'review',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Admin Review',
    desc: 'Jafar team verifies and activates your listing',
  },
];

const STEPS = [
  { num: 1, label: 'Your Details' },
  { num: 2, label: 'Store Details' },
];

export default function SignUpShowcase({ phase = 1 }) {
  return (
    <aside className="showcase" aria-hidden="true">
      {/* ── Animated background orbs ── */}
      <span className="showcase__orb showcase__orb--1" />
      <span className="showcase__orb showcase__orb--2" />
      <span className="showcase__orb showcase__orb--3" />

      {/* ── Diamond grid watermark ── */}
      <span className="showcase__grid-bg" />

      {/* ── Header ── */}
      <header className="showcase__header">
        <div className="showcase__emblem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 21 8.5 18 19 6 19 3 8.5 12 2" />
            <line x1="12" y1="2" x2="12" y2="19" />
            <line x1="3" y1="8.5" x2="21" y2="8.5" />
            <line x1="7.5" y1="19" x2="12" y2="8.5" />
            <line x1="16.5" y1="19" x2="12" y2="8.5" />
          </svg>
        </div>
        <h2 className="showcase__title">Jafar Works</h2>
        <p className="showcase__subtitle">Store Partner Portal</p>
        <p className="showcase__copy">
          Register your jewellery store and manage your presence across the Jafar platform.
        </p>
      </header>

      {/* ── Feature cards ── */}
      <ul className="showcase__features">
        {FEATURES.map((f) => (
          <li key={f.id} className="showcase__feature">
            <span className="showcase__feature-icon">{f.icon}</span>
            <span className="showcase__feature-text">
              <strong className="showcase__feature-title">{f.title}</strong>
              <span className="showcase__feature-desc">{f.desc}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* ── Step progress indicator ── */}
      <div className="showcase__steps">
        {STEPS.map((step, idx) => {
          const isDone = step.num < phase;
          const isActive = step.num === phase;
          return (
            <React.Fragment key={step.num}>
              <div className={`showcase__step ${isDone ? 'showcase__step--done' : ''} ${isActive ? 'showcase__step--active' : ''}`}>
                <div className="showcase__step-dot">
                  {isDone ? (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 8 6.5 12 13 4" />
                    </svg>
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>
                <span className="showcase__step-label">{step.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`showcase__step-connector ${isDone ? 'showcase__step-connector--done' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </aside>
  );
}