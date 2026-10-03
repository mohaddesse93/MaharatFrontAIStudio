import React from 'react';

interface ClayDividerProps {
  /** Top background color of the preceding section */
  fillTop?: string;
  /** Bottom background color of the succeeding section */
  fillBottom?: string;
  /** Curve style variation */
  variant?: 'wave' | 'curve' | 'crest' | 'dip' | 'balls';
  /** Flip horizontally */
  flip?: boolean;
  className?: string;
}

export const ClayDivider: React.FC<ClayDividerProps> = ({
  fillTop = '#FAF9F5',
  fillBottom = '#F4F1EA',
  variant = 'wave',
  flip = false,
  className = '',
}) => {
  if (variant === 'balls') {
    return (
      <div className={`py-6 px-4 ${className}`} aria-hidden="true">
        <div className="clay-divider">
          <span className="clay-divider-ball" style={{ background: '#98E8DE' }}></span>
          <span className="clay-divider-ball" style={{ background: '#F0B49E' }}></span>
          <span className="clay-divider-ball" style={{ background: '#E9D9AE' }}></span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-10 ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      {variant === 'wave' && (
        <svg
          viewBox="0 0 1440 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 block"
          preserveAspectRatio="none"
        >
          {/* Subtle clay shadow/depth ridge */}
          <path
            d="M0 24C240 60 480 8 720 36C960 64 1200 16 1440 38V76H0V24Z"
            fill="rgba(45, 65, 45, 0.04)"
          />
          {/* Main clay organic curve */}
          <path
            d="M0 28C240 64 480 12 720 40C960 68 1200 20 1440 42V76H0V28Z"
            fill={fillBottom}
          />
          {/* Soft tactile clay rim highlight */}
          <path
            d="M0 28C240 64 480 12 720 40C960 68 1200 20 1440 42"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {variant === 'curve' && (
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-11 md:h-14 block"
          preserveAspectRatio="none"
        >
          {/* Soft clay shadow */}
          <path
            d="M0 16C380 56 1060 56 1440 16V64H0V16Z"
            fill="rgba(45, 65, 45, 0.035)"
          />
          {/* Main surface */}
          <path
            d="M0 20C380 60 1060 60 1440 20V64H0V20Z"
            fill={fillBottom}
          />
          {/* Highlight line */}
          <path
            d="M0 20C380 60 1060 60 1440 20"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2"
          />
        </svg>
      )}

      {variant === 'crest' && (
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-15 block"
          preserveAspectRatio="none"
        >
          {/* Depth shadow */}
          <path
            d="M0 48C320 10 680 58 1040 22C1240 4 1360 28 1440 38V70H0V48Z"
            fill="rgba(45, 65, 45, 0.035)"
          />
          {/* Main curved clay shelf */}
          <path
            d="M0 52C320 14 680 62 1040 26C1240 8 1360 32 1440 42V70H0V52Z"
            fill={fillBottom}
          />
          {/* Rim light */}
          <path
            d="M0 52C320 14 680 62 1040 26C1240 8 1360 32 1440 42"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};
