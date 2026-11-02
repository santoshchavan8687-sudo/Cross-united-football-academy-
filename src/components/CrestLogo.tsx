import React from 'react';

interface CrestLogoProps {
  className?: string;
  size?: number;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({ className = '', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`inline-block select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients for metallic 3D academy shield look */}
        <radialGradient id="crestDarkBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="85%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="redCross" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>

        <path
          id="crestTextPath"
          d="M 28,100 A 72,72 0 0,1 172,100"
          fill="none"
        />
      </defs>

      {/* Outer Circle Ring */}
      <circle cx="100" cy="100" r="95" fill="url(#crestDarkBg)" stroke="#334155" strokeWidth="4" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

      {/* Top Arced Text: CROSS UNITED */}
      <text
        fill="#ffffff"
        fontSize="17.5"
        fontWeight="900"
        fontFamily="'Montserrat', sans-serif"
        letterSpacing="2.5"
      >
        <textPath href="#crestTextPath" startOffset="50%" textAnchor="middle">
          CROSS UNITED
        </textPath>
      </text>

      {/* Wings / Laurel accents on left and right */}
      <g fill="#cbd5e1" opacity="0.9">
        {/* Left Wing Feathers */}
        <path d="M 42,95 C 48,102 56,108 65,112 C 58,118 48,124 38,120 C 44,112 43,103 42,95 Z" />
        <path d="M 35,110 C 42,118 52,123 60,126 C 52,132 40,136 32,130 C 37,122 36,115 35,110 Z" />
        <path d="M 46,126 C 54,132 64,136 72,138 C 64,144 52,147 42,142 C 48,135 47,129 46,126 Z" />

        {/* Right Wing Feathers */}
        <path d="M 158,95 C 152,102 144,108 135,112 C 142,118 152,124 162,120 C 156,112 157,103 158,95 Z" />
        <path d="M 165,110 C 158,118 148,123 140,126 C 148,132 160,136 168,130 C 163,122 164,115 165,110 Z" />
        <path d="M 154,126 C 146,132 136,136 128,138 C 136,144 148,147 158,142 C 152,135 153,129 154,126 Z" />
      </g>

      {/* Inner Central Shield */}
      <path
        d="M 68,78 L 132,78 C 132,118 116,142 100,154 C 84,142 68,118 68,78 Z"
        fill="#0b1329"
        stroke="url(#shieldBorder)"
        strokeWidth="3.5"
      />

      {/* Shield Inner Inset */}
      <path
        d="M 72,82 L 128,82 C 128,116 114,138 100,148 C 86,138 72,116 72,82 Z"
        fill="#111827"
        opacity="0.8"
      />

      {/* Bold Red Cross Emblem */}
      <g>
        {/* White Outline for Cross */}
        <path
          d="M 94,84 L 106,84 L 106,96 L 122,96 L 122,108 L 106,108 L 106,136 L 94,136 L 94,108 L 78,108 L 78,96 L 94,96 Z"
          fill="#ffffff"
        />
        {/* Red Cross Fill */}
        <path
          d="M 95.5,85.5 L 104.5,85.5 L 104.5,97.5 L 120.5,97.5 L 120.5,106.5 L 104.5,106.5 L 104.5,134.5 L 95.5,134.5 L 95.5,106.5 L 79.5,106.5 L 79.5,97.5 L 95.5,97.5 Z"
          fill="url(#redCross)"
        />
      </g>

      {/* Football Icon at Bottom of Shield / Crest */}
      <g transform="translate(100, 153)">
        {/* Ball Circle */}
        <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
        {/* Center Pentagon */}
        <polygon
          points="0,-6 5.7,-1.8 3.5,5.2 -3.5,5.2 -5.7,-1.8"
          fill="#0f172a"
        />
        {/* Outer Lines to edges */}
        <line x1="0" y1="-6" x2="0" y2="-17.5" stroke="#0f172a" strokeWidth="1.8" />
        <line x1="5.7" y1="-1.8" x2="16" y2="-5.5" stroke="#0f172a" strokeWidth="1.8" />
        <line x1="3.5" y1="5.2" x2="11.5" y2="13.5" stroke="#0f172a" strokeWidth="1.8" />
        <line x1="-3.5" y1="5.2" x2="-11.5" y2="13.5" stroke="#0f172a" strokeWidth="1.8" />
        <line x1="-5.7" y1="-1.8" x2="-16" y2="-5.5" stroke="#0f172a" strokeWidth="1.8" />
        {/* Outer Edge Patches */}
        <path d="M -8,-15.5 Q 0,-17 8,-15.5 L 4,-10 L -4,-10 Z" fill="#0f172a" opacity="0.9" />
        <path d="M 16,3 L 17.5,-2 L 13.5,-7 L 11,-2 Z" fill="#0f172a" opacity="0.9" />
        <path d="M -16,3 L -17.5,-2 L -13.5,-7 L -11,-2 Z" fill="#0f172a" opacity="0.9" />
      </g>
    </svg>
  );
};
