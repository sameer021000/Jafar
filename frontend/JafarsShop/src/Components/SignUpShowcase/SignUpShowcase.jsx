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
    desc: 'Build your verified shop identity on the platform',
  },
  {
    id: 'location',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: 'Shop Location',
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
    title: 'Shop Gallery',
    desc: 'Upload up to 4 showcase images of your shop',
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
    desc: 'Admin team verifies and activates your listing',
  },
];

const APPROVAL_STEPS = [
  {
    id: 'review',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
    label: '24–48 Hour Review',
    desc: 'Your application is reviewed within 24–48 hours of submission',
  },
  {
    id: 'contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.39 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Stay Reachable',
    desc: 'Admin may contact you via registered phone or email — please stay available',
  },
  {
    id: 'docs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    label: 'Additional Verification',
    desc: 'Extra business documents or details may be requested if required',
  },
  {
    id: 'approved',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    label: 'Approval & Go Live',
    desc: 'Once approved, you receive confirmation and can begin managing your inventory',
  },
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
          Register your Gold-Plated Ornaments Shop and manage your inventory across the Jafar platform.
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

      {/* ── After-submission approval process ── */}
      <div className="showcase__approval">
        <p className="showcase__approval-heading">After Submission</p>
        <ul className="showcase__approval-list">
          {APPROVAL_STEPS.map((step) => (
            <li key={step.id} className="showcase__approval-item">
              <span className="showcase__approval-icon">{step.icon}</span>
              <span className="showcase__approval-text">
                <strong className="showcase__approval-label">{step.label}</strong>
                <span className="showcase__approval-desc">{step.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}