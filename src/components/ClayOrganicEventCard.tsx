import React, { useId } from 'react';

export interface ClayOrganicEventCardProps {
  variant?: number;
  imageSrc: string;
  imageAlt: string;
  category: string;
  dateFa: string;
  title: string;
  onOpenDetails: () => void;
  className?: string;
}

export const ClayOrganicEventCard: React.FC<ClayOrganicEventCardProps> = ({
  variant = 0,
  imageSrc,
  imageAlt,
  category,
  dateFa,
  title,
  onOpenDetails,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');

  // Organic Sculpted Clay Outer Boundaries (Handmade clay stone with wavy undulating curves)
  const outerPaths = [
    // Shape 0
    `M 335 34 
     C 260 14, 135 18, 65 42 
     C 20 62, 12 120, 18 200 
     C 24 285, 12 375, 52 435 
     C 95 488, 225 482, 315 448 
     C 378 418, 388 330, 380 230 
     C 372 130, 375 48, 335 34 Z`,

    // Shape 1
    `M 320 28 
     C 245 28, 125 12, 60 48 
     C 14 74, 20 155, 28 240 
     C 36 315, 16 395, 62 445 
     C 115 495, 240 480, 320 440 
     C 380 405, 376 315, 368 215 
     C 360 115, 365 26, 320 28 Z`,

    // Shape 2
    `M 345 38 
     C 265 18, 140 28, 72 52 
     C 18 72, 22 148, 18 230 
     C 14 315, 25 390, 68 440 
     C 120 492, 245 486, 325 442 
     C 375 405, 372 318, 368 218 
     C 364 118, 372 52, 345 38 Z`,
  ];

  // Carved Recessed Window for Event Image (Sculpted scooped cavity like Hero slider)
  const innerRecessPaths = [
    `M 200 42 
     C 285 40, 348 52, 355 96 
     C 362 140, 350 200, 285 214 
     C 220 224, 110 224, 58 202 
     C 22 180, 26 130, 38 88 
     C 48 50, 115 44, 200 42 Z`,

    `M 195 38 
     C 280 36, 342 50, 350 94 
     C 358 138, 346 198, 282 212 
     C 218 222, 108 222, 56 198 
     C 22 176, 26 128, 36 86 
     C 46 48, 112 40, 195 38 Z`,

    `M 202 44 
     C 288 42, 350 56, 356 98 
     C 362 142, 352 202, 286 216 
     C 222 226, 112 226, 60 204 
     C 24 182, 28 132, 40 90 
     C 50 52, 118 46, 202 44 Z`,
  ];

  const outerPath = outerPaths[variant % outerPaths.length];
  const innerPath = innerRecessPaths[variant % innerRecessPaths.length];

  const clipOuterId = `clip-event-outer-${uid}`;
  const clipRecessId = `clip-event-recess-${uid}`;
  const filterRecessId = `filter-event-recess-${uid}`;
  const gradOuterId = `grad-event-outer-${uid}`;

  return (
    <div className={`relative w-full transition-transform duration-300 hover:-translate-y-2 ${className}`}>
      {/* 3D SCULPTED CLAY SVG (Matching Hero Section) */}
      <svg
        viewBox="0 0 395 490"
        shapeRendering="geometricPrecision"
        className="w-full h-auto overflow-visible select-none"
        style={{
          filter: `
            drop-shadow(20px 28px 50px rgba(141, 155, 109, 0.42))
            drop-shadow(-8px -8px 22px rgba(141, 155, 109, 0.16))
            drop-shadow(0 10px 20px rgba(35, 55, 38, 0.15))
          `,
        }}
      >
        <defs>
          <linearGradient id={gradOuterId} x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#F1F7E3" />
            <stop offset="55%" stopColor="#E7EFDA" />
            <stop offset="100%" stopColor="#DCE7C6" />
          </linearGradient>

          <radialGradient id={`glow-${uid}`} cx="28%" cy="22%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <clipPath id={clipOuterId}>
            <path d={outerPath} />
          </clipPath>

          <clipPath id={clipRecessId}>
            <path d={innerPath} />
          </clipPath>

          <filter id={filterRecessId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="4" dy="6" stdDeviation="6" floodColor="rgba(80,105,70,0.45)" />
            <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.18)" />
          </filter>
        </defs>

        {/* LAYER 1: Base Clay Body */}
        <g clipPath={`url(#${clipOuterId})`}>
          <path d={outerPath} fill={`url(#${gradOuterId})`} />
          <path d={outerPath} fill={`url(#glow-${uid})`} style={{ mixBlendMode: 'soft-light' }} />

          {/* Deep Inset Shadows */}
          <path
            d={outerPath}
            fill="none"
            stroke="rgba(156, 172, 124, 0.38)"
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

          {/* Bright Inset Highlights */}
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

        {/* Outer Edge Soft Bevel */}
        <path
          d={outerPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* LAYER 2: 3D Recessed Depressed Basin for Event Image */}
        <path
          d={innerPath}
          fill="rgba(0,0,0,0.08)"
          style={{
            transform: 'translate(2px, 3px)',
            filter: 'blur(5px)',
          }}
        />

        {/* Image Clipped Inside the Recessed Window */}
        <g clipPath={`url(#${clipRecessId})`}>
          <rect x="25" y="30" width="345" height="205" fill="#DFE7D8" />
          <image
            href={imageSrc}
            x="25"
            y="30"
            width="345"
            height="205"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>

        {/* Recess Depth Shadow Overlay */}
        <path
          d={innerPath}
          fill="none"
          stroke="rgba(80,105,70,0.45)"
          strokeWidth="10"
          style={{
            filter: `url(#${filterRecessId})`,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Recess Bottom Highlight Rim */}
        <path
          d={innerPath}
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="220 280"
          strokeDashoffset="120"
          style={{ mixBlendMode: 'screen' }}
        />
      </svg>

      {/* Category Chip Over Basin */}
      <div className="absolute top-[8%] right-[10%] z-20 pointer-events-none">
        <span className="clay-chip text-[11px] shadow-md font-bold">
          {category}
        </span>
      </div>

      {/* Event Details Content nestled comfortably on the lower clay plate */}
      <div className="absolute bottom-5 inset-x-7 z-10 flex flex-col justify-between pt-2">
        <div>
          <span className="text-[11px] font-bold text-[#8A765F] block mb-1">
            {dateFa}
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-[#5F4D3C] line-clamp-2 min-h-[48px] leading-snug">
            {title}
          </h3>
        </div>

        <div className="pt-3 mt-2 border-t border-[#D5E2C4]/70">
          <button
            onClick={onOpenDetails}
            className="clay-btn w-full py-2.5 text-xs font-bold"
          >
            <span>مشاهده جزئیات رویداد</span>
            <span className="text-xs">←</span>
          </button>
        </div>
      </div>
    </div>
  );
};
