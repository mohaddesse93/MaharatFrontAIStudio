import React, { useId } from 'react';

export interface ClayOrganicCardProps {
  variant?: 0 | 1 | 2;
  theme?: 'matcha' | 'peach';
  aspectRatio?: string; // e.g. '380/540' or '380/460'
  className?: string;
  hasRecessedBasin?: boolean;
  recessedImageSrc?: string;
  recessedImageAlt?: string;
  recessedBadge?: React.ReactNode;
  children: React.ReactNode;
}

export const ClayOrganicCard: React.FC<ClayOrganicCardProps> = ({
  variant = 0,
  theme = 'matcha',
  aspectRatio = '380/540',
  className = '',
  hasRecessedBasin = false,
  recessedImageSrc,
  recessedImageAlt = '',
  recessedBadge,
  children,
}) => {
  const uid = useId().replace(/:/g, '');

  // 3 Distinct Asymmetric Organic Clay Shapes (Hand-sculpted with smooth cubic beziers)
  const outerPaths = [
    // Variant 0: Sculpted clay with graceful top dip and natural lobes
    `M 315 36 
     C 240 16, 140 22, 75 46 
     C 24 70, 12 135, 20 220 
     C 26 305, 14 395, 55 468 
     C 98 532, 220 542, 310 498 
     C 372 462, 382 365, 376 260 
     C 370 150, 368 54, 315 36 Z`,

    // Variant 1: Organic wave with tilted shoulder and rounded base
    `M 295 30 
     C 215 34, 130 14, 68 50 
     C 16 78, 22 168, 32 258 
     C 40 336, 18 422, 68 482 
     C 120 538, 245 526, 320 478 
     C 376 438, 370 338, 360 228 
     C 352 122, 348 26, 295 30 Z`,

    // Variant 2: Natural organic clay droplet/stone contour
    `M 322 42 
     C 246 18, 134 30, 78 54 
     C 20 76, 26 160, 22 248 
     C 16 338, 28 420, 78 472 
     C 130 532, 255 528, 324 476 
     C 370 432, 366 332, 362 222 
     C 360 118, 365 60, 322 42 Z`,
  ];

  // Recessed carved depression window (Basin for photo) - Sculpted with smooth clay lip
  const innerRecessPaths = [
    `M 190 48 
     C 248 46, 286 68, 288 122 
     C 290 176, 268 232, 222 240 
     C 168 248, 112 228, 106 174 
     C 100 118, 138 50, 190 48 Z`,

    `M 192 46 
     C 252 44, 288 66, 290 118 
     C 292 172, 270 230, 224 238 
     C 170 246, 110 224, 108 170 
     C 106 116, 140 48, 192 46 Z`,

    `M 188 48 
     C 246 44, 284 66, 286 120 
     C 288 174, 266 230, 220 238 
     C 166 246, 110 226, 104 172 
     C 98 118, 136 50, 188 48 Z`,
  ];

  const outerPath = outerPaths[variant % outerPaths.length];
  const innerPath = innerRecessPaths[variant % innerRecessPaths.length];

  // Palette definitions matching Hero Section
  const isPeach = theme === 'peach';
  const palette = isPeach
    ? {
        bgLight: '#FDEEE8',
        bgMid: '#FBE3D8',
        bgDark: '#F6D8C9',
        outerShadow1: 'rgba(231,111,81,0.36)',
        outerShadow2: 'rgba(231,111,81,0.14)',
        insetDark: 'rgba(226,143,114,0.35)',
        recessShadow: 'rgba(180,90,65,0.42)',
        recessHighlight: 'rgba(255,255,255,0.85)',
      }
    : {
        bgLight: '#F1F7E3',
        bgMid: '#E7EFDA',
        bgDark: '#DCE7C6',
        outerShadow1: 'rgba(141,155,109,0.42)',
        outerShadow2: 'rgba(141,155,109,0.16)',
        insetDark: 'rgba(156,172,124,0.38)',
        recessShadow: 'rgba(80,105,70,0.45)',
        recessHighlight: 'rgba(255,255,255,0.92)',
      };

  const clipOuterId = `clip-outer-${uid}`;
  const clipRecessId = `clip-recess-${uid}`;
  const filterRecessId = `filter-recess-${uid}`;
  const gradOuterId = `grad-outer-${uid}`;

  return (
    <div 
      className={`relative w-full transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
      style={{ aspectRatio }}
    >
      {/* 3D SCULPTED CLAY SVG FOUNDATION (Identical to Hero Section) */}
      <svg
        viewBox="0 0 390 540"
        shapeRendering="geometricPrecision"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          filter: `
            drop-shadow(20px 28px 50px ${palette.outerShadow1})
            drop-shadow(-8px -8px 22px ${palette.outerShadow2})
            drop-shadow(0 10px 20px rgba(35, 55, 38, 0.15))
          `,
        }}
      >
        <defs>
          {/* Base organic clay gradient */}
          <linearGradient id={gradOuterId} x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor={palette.bgLight} />
            <stop offset="55%" stopColor={palette.bgMid} />
            <stop offset="100%" stopColor={palette.bgDark} />
          </linearGradient>

          {/* Pillowed volume highlight glow */}
          <radialGradient id={`glow-${uid}`} cx="28%" cy="22%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Outer clay clip for 3D pillowed inset lighting */}
          <clipPath id={clipOuterId}>
            <path d={outerPath} />
          </clipPath>

          {/* Inner recess clip for photo window */}
          {hasRecessedBasin && (
            <clipPath id={clipRecessId}>
              <path d={innerPath} />
            </clipPath>
          )}

          {/* Recess carved drop-shadow filter (Cast INTO the clay cavity) */}
          <filter id={filterRecessId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="4" dy="6" stdDeviation="6" floodColor={palette.recessShadow} />
            <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.18)" />
          </filter>
        </defs>

        {/* LAYER 1: Base Clay Plate with 3D Pillowed Volume & Inset Shadows */}
        <g clipPath={`url(#${clipOuterId})`}>
          {/* 1. Base Gradient */}
          <path d={outerPath} fill={`url(#${gradOuterId})`} />

          {/* 2. Soft Pillowed Volume Glow */}
          <path d={outerPath} fill={`url(#glow-${uid})`} style={{ mixBlendMode: 'soft-light' }} />

          {/* 3. Deep Inset Shadow along Bottom & Right Curves */}
          <path
            d={outerPath}
            fill="none"
            stroke={palette.insetDark}
            strokeWidth="32"
            style={{
              transform: 'translate(-10px, -12px)',
              filter: 'blur(12px)',
              mixBlendMode: 'multiply',
            }}
          />
          <path
            d={outerPath}
            fill="none"
            stroke="rgba(80, 100, 70, 0.3)"
            strokeWidth="16"
            style={{
              transform: 'translate(-5px, -7px)',
              filter: 'blur(5px)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* 4. Bright Pillowed Inset Highlight along Top & Left Curves */}
          <path
            d={outerPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="28"
            style={{
              transform: 'translate(10px, 12px)',
              filter: 'blur(10px)',
              mixBlendMode: 'screen',
            }}
          />
          <path
            d={outerPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="12"
            style={{
              transform: 'translate(4px, 5px)',
              filter: 'blur(3px)',
              mixBlendMode: 'screen',
            }}
          />
        </g>

        {/* LAYER 2: Crisp Tactile Clay Edge Highlight */}
        <path
          d={outerPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* LAYER 3: 3D Recessed Depressed Window (if enabled) */}
        {hasRecessedBasin && (
          <>
            {/* Outer cast shadow for the depression */}
            <path
              d={innerPath}
              fill="rgba(0,0,0,0.08)"
              style={{
                transform: 'translate(2px, 3px)',
                filter: 'blur(5px)',
              }}
            />

            {/* The Photo Clipped inside the Recessed Window */}
            {recessedImageSrc && (
              <g clipPath={`url(#${clipRecessId})`}>
                <rect x="75" y="30" width="240" height="235" fill="#DFE7D8" />
                <image
                  href={recessedImageSrc}
                  x="75"
                  y="30"
                  width="240"
                  height="235"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            )}

            {/* Recess Depth Shadow Overlay (Shadow falling onto photo from top-left) */}
            <path
              d={innerPath}
              fill="none"
              stroke={palette.recessShadow}
              strokeWidth="10"
              style={{
                filter: `url(#${filterRecessId})`,
                mixBlendMode: 'multiply',
              }}
            />

            {/* Recess Crisp Bottom-Right Highlight Rim */}
            <path
              d={innerPath}
              fill="none"
              stroke={palette.recessHighlight}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="220 280"
              strokeDashoffset="120"
              style={{ mixBlendMode: 'screen' }}
            />
          </>
        )}
      </svg>

      {/* Recessed Badge Overlay (Positioned right at bottom of the carved basin) */}
      {hasRecessedBasin && recessedBadge && (
        <div className="absolute top-[41%] inset-x-0 flex justify-center z-10 pointer-events-none">
          {recessedBadge}
        </div>
      )}

      {/* HTML Content Overlay: Clean, interactive, positioned comfortably within safe clay bounds */}
      <div className={`relative z-10 w-full h-full flex flex-col justify-between ${hasRecessedBasin ? 'pt-[47%] px-8 pb-7' : 'p-7 sm:p-8'}`}>
        {children}
      </div>
    </div>
  );
};
