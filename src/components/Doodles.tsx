import React from 'react';

// Hand-drawn gold crown doodle from the flyer
export const CrownDoodle: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 28,
  color = '#eab308',
}) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    {/* Crown outline */}
    <path
      d="M 4 28 C 12 30, 36 30, 44 28 L 41 9 L 30 18 L 24 5 L 18 18 L 7 9 Z"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Balls on crown peaks */}
    <circle cx="7" cy="8" r="2.2" fill={color} />
    <circle cx="24" cy="4" r="2.4" fill={color} />
    <circle cx="41" cy="8" r="2.2" fill={color} />
    {/* Bottom accent arc */}
    <path
      d="M 6 31 C 16 33, 32 33, 42 31"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn curved arrow doodle pointing downwards / inwards
export const CurvedArrowDoodle: React.FC<{
  className?: string;
  size?: number;
  color?: string;
  direction?: 'down-left' | 'up-right' | 'left-down' | 'curve-up';
}> = ({ className = '', size = 32, color = '#15803d', direction = 'down-left' }) => {
  if (direction === 'down-left') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M 42 8 C 34 8, 14 10, 10 32"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 6 24 L 10 33 L 19 30"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === 'curve-up') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M 12 42 C 16 28, 28 14, 40 10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 32 8 L 42 10 L 40 20"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // default curved arrow for QR code
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 40 40 C 35 24, 25 14, 12 12"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 18 6 L 10 12 L 16 20"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn 3 motion flick marks
export const MotionMarks: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#15803d',
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path d="M 6 8 L 16 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 4 15 L 18 13" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 8 22 L 20 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Footballer dynamic silhouette kicking ball for the Coaching Starts box
export const StrikerSilhouette: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 72,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Motion speed streaks behind player */}
    <g stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.6">
      <path d="M 85 85 L 75 75" />
      <path d="M 92 82 L 80 70" />
      <path d="M 96 74 L 84 62" />
    </g>

    {/* Soccer ball on turf */}
    <circle cx="28" cy="80" r="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
    {/* Ball mini patch */}
    <polygon points="28,77 30,79 29,82 27,82 26,79" fill="#0f172a" />

    {/* Silhouette player in mid-kick */}
    <g fill="#0f172a">
      {/* Head */}
      <circle cx="68" cy="24" r="7" />
      {/* Torso tilted forward */}
      <path d="M 62 31 C 65 31, 71 33, 67 48 C 63 56, 57 60, 52 64 L 46 54 C 50 48, 54 40, 56 33 Z" />
      {/* Kicking right leg forward towards ball */}
      <path d="M 52 64 L 40 70 L 32 76 L 36 78 L 45 74 L 56 67 Z" />
      {/* Planted left leg extended back */}
      <path d="M 56 62 L 68 70 L 76 80 L 80 81 L 78 77 L 70 67 L 60 58 Z" />
      {/* Left arm balancing back */}
      <path d="M 67 36 L 79 38 L 88 44 L 86 46 L 76 42 L 66 40 Z" />
      {/* Right arm bent forward */}
      <path d="M 58 35 L 50 41 L 43 47 L 41 45 L 48 39 L 56 34 Z" />
    </g>
  </svg>
);

// High-fidelity vector QR Code pointing to academy WhatsApp / registration
export const AcademyQRCode: React.FC<{ size?: number; className?: string }> = ({
  size = 72,
  className = '',
}) => {
  return (
    <div
      className={`bg-white p-1.5 rounded-md border border-slate-300 shadow-xs flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill="white" />

        {/* Top-Left Finder Pattern */}
        <rect x="6" y="6" width="28" height="28" fill="#0f172a" rx="2" />
        <rect x="11" y="11" width="18" height="18" fill="white" rx="1" />
        <rect x="15" y="15" width="10" height="10" fill="#0f172a" rx="1" />

        {/* Top-Right Finder Pattern */}
        <rect x="66" y="6" width="28" height="28" fill="#0f172a" rx="2" />
        <rect x="71" y="11" width="18" height="18" fill="white" rx="1" />
        <rect x="75" y="15" width="10" height="10" fill="#0f172a" rx="1" />

        {/* Bottom-Left Finder Pattern */}
        <rect x="6" y="66" width="28" height="28" fill="#0f172a" rx="2" />
        <rect x="11" y="71" width="18" height="18" fill="white" rx="1" />
        <rect x="15" y="75" width="10" height="10" fill="#0f172a" rx="1" />

        {/* Realistic QR Data Bits Matrix */}
        <g fill="#0f172a">
          {/* Timing horizontal */}
          <rect x="38" y="10" width="5" height="5" />
          <rect x="48" y="10" width="5" height="5" />
          <rect x="56" y="10" width="5" height="5" />
          <rect x="42" y="18" width="5" height="5" />
          <rect x="52" y="18" width="5" height="5" />

          {/* Timing vertical */}
          <rect x="10" y="38" width="5" height="5" />
          <rect x="10" y="48" width="5" height="5" />
          <rect x="10" y="56" width="5" height="5" />
          <rect x="18" y="42" width="5" height="5" />
          <rect x="18" y="52" width="5" height="5" />

          {/* Center alignment square */}
          <rect x="40" y="40" width="20" height="20" fill="none" stroke="#0f172a" strokeWidth="4" rx="1" />
          <rect x="46" y="46" width="8" height="8" />

          {/* Data blocks */}
          <rect x="38" y="28" width="5" height="5" />
          <rect x="46" y="28" width="5" height="5" />
          <rect x="54" y="28" width="5" height="5" />
          <rect x="68" y="38" width="5" height="5" />
          <rect x="76" y="38" width="5" height="5" />
          <rect x="84" y="38" width="5" height="5" />

          <rect x="68" y="46" width="5" height="5" />
          <rect x="80" y="46" width="5" height="5" />
          <rect x="74" y="54" width="5" height="5" />
          <rect x="86" y="54" width="5" height="5" />

          <rect x="28" y="42" width="5" height="5" />
          <rect x="28" y="52" width="5" height="5" />
          <rect x="34" y="48" width="5" height="5" />

          <rect x="40" y="68" width="5" height="5" />
          <rect x="48" y="68" width="5" height="5" />
          <rect x="56" y="68" width="5" height="5" />
          <rect x="42" y="78" width="5" height="5" />
          <rect x="52" y="78" width="5" height="5" />
          <rect x="60" y="78" width="5" height="5" />

          <rect x="68" y="68" width="5" height="5" />
          <rect x="82" y="68" width="5" height="5" />
          <rect x="74" y="76" width="5" height="5" />
          <rect x="86" y="76" width="5" height="5" />
          <rect x="70" y="84" width="5" height="5" />
          <rect x="78" y="84" width="5" height="5" />
          <rect x="86" y="84" width="5" height="5" />
        </g>
      </svg>
    </div>
  );
};
