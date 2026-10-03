import React, { useState, useEffect, useRef } from 'react';
import { WidgetCustomization } from '../types';
import { CLAY_PALETTES } from '../constants';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, Phone, GraduationCap, Sparkles } from 'lucide-react';
import { DarichehWidget } from './DarichehWidget';
import { ClockWidget } from './ClockWidget';

interface ClayHeroWidgetProps {
  config: WidgetCustomization;
  onOpenStory: () => void;
  className?: string;
}

function adjustHexBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex.length === 3 ? cleanHex.split('').map(c => c + c).join('') : cleanHex, 16);
  if (isNaN(num)) return hex;
  const r = Math.min(255, Math.max(0, ((num >> 16) & 255) + Math.round(255 * (percent / 100))));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 255) + Math.round(255 * (percent / 100))));
  const b = Math.min(255, Math.max(0, (num & 255) + Math.round(255 * (percent / 100))));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex.length === 3 ? cleanHex.split('').map(c => c + c).join('') : cleanHex, 16);
  if (isNaN(num)) return `rgba(38, 55, 40, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const ClayHeroWidget: React.FC<ClayHeroWidgetProps> = ({
  config,
  onOpenStory,
  className = '',
}) => {
  const basePalette = CLAY_PALETTES[config.clayTheme] || CLAY_PALETTES.sage;
  const palette = {
    ...basePalette,
    ...(config.customClayBg ? {
      bgLight: config.customClayBg,
      bgDark: adjustHexBrightness(config.customClayBg, -8),
      recessShadowColor: hexToRgba(adjustHexBrightness(config.customClayBg, -65), 0.35),
    } : {}),
    ...(config.customTextColor ? {
      textPrimary: config.customTextColor,
      textSecondary: hexToRgba(config.customTextColor, 0.72),
      btnBorder: hexToRgba(config.customTextColor, 0.55),
      btnHoverBg: hexToRgba(config.customTextColor, 0.12),
      accentLeaf: adjustHexBrightness(config.customTextColor, 28),
    } : {}),
  };
  const isRtl = config.language === 'fa';

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play interval
  useEffect(() => {
    if (!config.autoPlaySlider || isPaused || config.slides.length <= 1) return;
    const intervalTime = (config.sliderInterval || 4.5) * 1000;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.slides.length);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [config.autoPlaySlider, isPaused, config.slides.length, config.sliderInterval]);

  // Keep index within bounds if slides array changes
  useEffect(() => {
    if (currentSlide >= config.slides.length) {
      setCurrentSlide(0);
    }
  }, [config.slides.length, currentSlide]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? config.slides.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % config.slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 40) {
      handleNext();
    } else if (diffX < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Recess depth multipliers for the inner depression ("فرورفتگی")
  const depthMultipliers = {
    subtle: { shadowBlur: 14, shadowOffset: 4, opacity: 0.22, bevelWidth: 4 },
    medium: { shadowBlur: 22, shadowOffset: 8, opacity: 0.34, bevelWidth: 7 }, // Exact image match
    deep: { shadowBlur: 32, shadowOffset: 12, opacity: 0.46, bevelWidth: 10 },
    sculpted: { shadowBlur: 42, shadowOffset: 16, opacity: 0.58, bevelWidth: 14 },
  };

  const depth = depthMultipliers[config.recessDepth] || depthMultipliers.medium;

  // Master SVG Paths (designed on 1000 x 620 coordinate plane)
  // Outer organic clay card path with characteristic curves ("پیچ و خم") - Mirrored to place basin on Left
  const outerPath = `M 885 105 
    C 805 62, 680 68, 550 92 
    C 420 116, 285 65, 150 74 
    C 70 79, 24 122, 34 210 
    C 44 295, 22 410, 72 498 
    C 124 585, 260 542, 395 556 
    C 525 570, 650 612, 790 596 
    C 900 580, 958 492, 958 370 
    C 958 248, 948 140, 885 105 Z`;

  // Left-side carved recessed window ("وسطش فرورفتگی داره") - comfortably nested with solid clay borders
  const innerPathLeft = `M 275 105 
    C 350 105, 442 122, 472 155 
    C 498 190, 495 285, 478 375 
    C 460 455, 432 488, 350 492 
    C 265 496, 165 488, 106 435 
    C 68 380, 72 285, 90 220 
    C 110 160, 195 105, 275 105 Z`;

  // Mask / Cutout ID uniqueness
  const clipId = `recess-clip-${config.recessDepth}`;
  const filterId = `clay-recess-shadow-${config.recessDepth}`;

  const activeSlideData = config.slides[currentSlide] || config.slides[0];
  const heroWidth = config.heroWidth || 1150;
  const statBoxSize = config.statBoxSize || 'large';
  const statBoxOffset = config.statBoxOffset ?? 60;
  const sliderBadgeSize = config.sliderBadgeSize || 'normal';
  const sliderBadgeOffset = config.sliderBadgeOffset ?? 6;
  const leafTopOffset = config.leafTopOffset ?? 19;
  const leafRightOffset = config.leafRightOffset ?? 0;
  const showDaricheh = config.showDaricheh ?? true;
  const darichehSub = config.darichehSub || 'ورود به';
  const darichehTitle = config.darichehTitle || 'دریچه';
  const darichehUrl = config.darichehUrl || 'http://194.48.198.146/auth/login';
  const darichehRotate = config.darichehRotate ?? -10;
  const darichehTop = config.darichehTop ?? 14;
  const darichehLeft = config.darichehLeft ?? 35;
  const showClockWidget = config.showClockWidget ?? true;
  const clockSize = config.clockSize || 'normal';
  const clockColor = config.clockColor || '#E76F51';
  const clockTop = config.clockTop ?? 84;
  const clockRight = config.clockRight ?? 14;
  const clockRotate = config.clockRotate ?? 8;

  const badgeSizeStyles = {
    small: {
      chip: 'px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px]',
      title: 'max-w-[100px] sm:max-w-[150px] text-[10px] sm:text-[11px]',
      dotActive: 'w-4 sm:w-5 h-1.5 sm:h-2',
      dotInactive: 'w-1.5 sm:w-2 h-1.5 sm:h-2',
      gap: 'gap-1.5 sm:gap-2',
    },
    normal: {
      chip: 'px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs md:text-sm',
      title: 'max-w-[130px] sm:max-w-[190px] text-[11px] sm:text-xs md:text-sm',
      dotActive: 'w-5 sm:w-6 h-2 sm:h-2.5',
      dotInactive: 'w-2 sm:w-2.5 h-2 sm:h-2.5',
      gap: 'gap-2 sm:gap-2.5',
    },
    large: {
      chip: 'px-4.5 sm:px-5.5 py-2 text-xs sm:text-sm md:text-[15px]',
      title: 'max-w-[160px] sm:max-w-[220px] text-xs sm:text-sm md:text-[15px]',
      dotActive: 'w-6 sm:w-7 h-2.5 sm:h-3',
      dotInactive: 'w-2.5 sm:w-3 h-2.5 sm:h-3',
      gap: 'gap-2.5 sm:gap-3',
    },
    xlarge: {
      chip: 'px-5.5 sm:px-6.5 py-2.5 text-sm sm:text-base md:text-[16px]',
      title: 'max-w-[190px] sm:max-w-[260px] text-sm sm:text-base md:text-[16px]',
      dotActive: 'w-7 sm:w-8 h-3 sm:h-3.5',
      dotInactive: 'w-3 sm:w-3.5 h-3 sm:h-3.5',
      gap: 'gap-3 sm:gap-3.5',
    },
  }[sliderBadgeSize];

  const statCardClasses = {
    normal: {
      wrap: 'max-w-[420px]',
      card: '!py-2 sm:!py-2.5 !px-2 sm:!px-2.5',
      num: 'text-lg sm:text-xl md:text-2xl font-extrabold',
      label: 'text-[10px] sm:text-xs font-bold',
    },
    large: {
      wrap: 'max-w-[470px]',
      card: '!py-2.5 sm:!py-3.5 md:!py-4 !px-2.5 sm:!px-3.5',
      num: 'text-xl sm:text-2xl md:text-3xl lg:text-[33px] font-black',
      label: 'text-xs sm:text-[13px] md:text-sm font-bold',
    },
    xlarge: {
      wrap: 'max-w-[510px]',
      card: '!py-3.5 sm:!py-4.5 md:!py-5 !px-3 sm:!px-4',
      num: 'text-2xl sm:text-3xl md:text-4xl lg:text-[37px] font-black',
      label: 'text-xs sm:text-sm md:text-base font-extrabold',
    },
  }[statBoxSize];

  return (
    <div 
      className={`relative w-full mx-auto select-none animate-clay-fade-in-up will-change-transform transition-[max-width] duration-300 ${className}`}
      style={{ maxWidth: `${heroWidth}px` }}
    >
      {/* Decorative Botanical Leaf Accent directly per user's exact SVG code */}
      {config.showSproutAccent && (
        <div 
          className="absolute right-12 sm:right-20 md:right-28 z-25 pointer-events-none animate-sprout-entrance transition-all duration-200"
          style={{
            top: `calc(12px + ${leafTopOffset}px)`,
            transform: leafRightOffset !== 0 ? `translateX(${-leafRightOffset}px)` : undefined,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 56"
            className="w-12 h-13 sm:w-14 sm:h-15 md:w-16 md:h-17 lg:w-20 lg:h-21 drop-shadow-[0_2px_6px_rgba(40,65,45,0.15)]"
            fill="none"
            stroke="#8ea694"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 12 40 C 17 27, 30 17, 40 13 C 36 25, 28 35, 16 42" />
            <path d="M 20 35 C 26 29, 32 21, 38 15" strokeWidth="1.2" opacity="0.6" />
            <path d="M 7 37 C 4 23, 8 11, 14 5 C 18 17, 17 29, 10 38" />
            <path d="M 24 45 C 34 43, 42 47, 48 53 C 38 55, 30 52, 22 47" />
          </svg>
        </div>
      )}

      {/* 3D Organic Fluid Clay Morphing "دریچه" Widget (سمت چپ بالای هیرو) */}
      {showDaricheh && (
        <div
          className="absolute z-30 pointer-events-auto select-none transition-all duration-300"
          style={{
            top: `${darichehTop}px`,
            left: `${darichehLeft}px`,
          }}
        >
          <DarichehWidget
            subTitle={darichehSub}
            title={darichehTitle}
            url={darichehUrl}
            rotate={darichehRotate}
            className="w-[125px] sm:w-[145px] md:w-[160px] min-h-[105px] sm:min-h-[120px]"
          />
        </div>
      )}

      {/* 3D Organic Fluid Clay Morphing "ساعت" Widget (سمت راست بالای هیرو) */}
      {showClockWidget && (
        <div
          className="absolute z-30 pointer-events-auto select-none transition-all duration-300"
          style={{
            top: `${clockTop}px`,
            right: `${clockRight}px`,
          }}
        >
          <ClockWidget
            color={clockColor}
            size={clockSize}
            rotate={clockRotate}
          />
        </div>
      )}

      {/* Main 3D Clay Organic Card Container */}
      <div
        className="relative w-full aspect-[1000/620] transition-transform duration-500 hover:-translate-y-1.5"
      >
        {/* SVG Foundation: Clay Surface & 3D Recessed Depressed Window */}
        <svg
          viewBox="0 0 1000 620"
          shapeRendering="geometricPrecision"
          className="w-full h-full overflow-visible"
          style={{
            filter: `
              drop-shadow(26px 36px 65px rgba(141, 155, 109, 0.45))
              drop-shadow(-10px -10px 28px rgba(141, 155, 109, 0.16))
              drop-shadow(0 14px 24px rgba(35, 55, 38, 0.18))
            `,
          }}
        >
          <defs>
            {/* Outer card gradient: 150deg organic clay tone */}
            <linearGradient id="clayOuterGradient" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor={palette.bgLight} />
              <stop offset="55%" stopColor={palette.bgLight} stopOpacity="0.96" />
              <stop offset="100%" stopColor={palette.bgDark} />
            </linearGradient>

            {/* Subtle top-left light wash for realistic clay pillowing */}
            <radialGradient id="clayHighlightGlow" cx="28%" cy="22%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Outer card clip for 3D Inset Shadows along organic curves */}
            <clipPath id="outerCardClip">
              <path d={outerPath} />
            </clipPath>

            {/* Inner recess clip path for the photo slider - Direct explicit path, 100% cross-browser */}
            <clipPath id={clipId}>
              <path d={innerPathLeft} />
            </clipPath>

            {/* 3D Carved Recess Shadow Filter ("فرورفتگی عمیق خمیری") */}
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              {/* Top-left dark shadow falling INTO the depression */}
              <feDropShadow 
                dx="6" 
                dy="8" 
                stdDeviation={depth.shadowBlur} 
                floodColor={palette.recessShadowColor} 
              />
              <feDropShadow 
                dx="2" 
                dy="3" 
                stdDeviation={depth.shadowBlur / 2} 
                floodColor="rgba(0,0,0,0.18)" 
              />
            </filter>

            {/* Inset shadow gradient for the carved lip/rim */}
            <linearGradient id="recessRimBevel" x1="30%" y1="15%" x2="80%" y2="85%">
              <stop offset="0%" stopColor={palette.recessShadowColor} stopOpacity={depth.opacity * 1.5} />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
              <stop offset="100%" stopColor={palette.recessHighlightColor} stopOpacity="0.7" />
            </linearGradient>

            {/* Ambient clay texture / micro-diffuse pattern */}
            <linearGradient id="clayLipShine" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* LAYER 1: Base Clay Body with 3D Pillowed Inset Shadows & Volume inside outerCardClip */}
          <g clipPath="url(#outerCardClip)">
            {/* 1. Base Gradient Fill */}
            <path
              d={outerPath}
              fill="url(#clayOuterGradient)"
              className="transition-colors duration-500"
            />

            {/* 2. Soft Pillowed Volume Highlight */}
            <path
              d={outerPath}
              fill="url(#clayHighlightGlow)"
              style={{ mixBlendMode: 'soft-light' }}
            />

            {/* 3. 3D Dark Inset Shadow along Bottom & Right Curves (Simulating Light from Top-Left) */}
            <path
              d={outerPath}
              fill="none"
              stroke="rgba(156, 172, 124, 0.45)"
              strokeWidth="42"
              style={{
                transform: 'translate(-14px, -16px)',
                filter: 'blur(16px)',
                mixBlendMode: 'multiply',
              }}
            />
            <path
              d={outerPath}
              fill="none"
              stroke="rgba(90, 110, 75, 0.28)"
              strokeWidth="20"
              style={{
                transform: 'translate(-7px, -9px)',
                filter: 'blur(7px)',
                mixBlendMode: 'multiply',
              }}
            />

            {/* 4. 3D Bright Inset Highlight along Top & Left Curves */}
            <path
              d={outerPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="38"
              style={{
                transform: 'translate(14px, 16px)',
                filter: 'blur(14px)',
                mixBlendMode: 'screen',
              }}
            />
            <path
              d={outerPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="16"
              style={{
                transform: 'translate(6px, 7px)',
                filter: 'blur(4px)',
                mixBlendMode: 'screen',
              }}
            />
          </g>

          {/* LAYER 2: Outer Edge Soft Bevel (Clay Tactile Rim) */}
          <path
            d={outerPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* LAYER 3: The 3D Recessed Depressed Basin ("فرورفتگی") on Left */}
          {/* A. Outer Bevel & Depression Shadow Cast onto the Clay Bed */}
          <path
            d={innerPathLeft}
            fill="rgba(0,0,0,0.08)"
            style={{
              transform: `translate(${depth.shadowOffset * 0.4}px, ${depth.shadowOffset * 0.5}px)`,
              filter: 'blur(8px)',
            }}
          />

          {/* B. The Image SLIDER inside the Recessed Window */}
          <g clipPath={`url(#${clipId})`}>
            <rect
              x="55"
              y="85"
              width="455"
              height="430"
              fill="#E3EAE0"
            />

            {/* Render all slides with smooth crossfade inside the carved recessed shape */}
            {config.slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <image
                  key={slide.id || idx}
                  href={slide.url}
                  xlinkHref={slide.url}
                  x="55"
                  y="85"
                  width="455"
                  height="430"
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 750ms cubic-bezier(0.16, 1, 0.3, 1)',
                    imageRendering: 'auto',
                  }}
                />
              );
            })}
            
            {/* C. Realistic 3D Inset Shadows OVER the images along the carved walls */}
            {/* 1) Top/Right interior shadow wall: Casts inward into the recess */}
            <path
              d={innerPathLeft}
              fill="none"
              stroke={palette.recessShadowColor}
              strokeWidth={depth.bevelWidth * 3.5}
              style={{
                filter: `blur(${depth.shadowBlur * 0.75}px)`,
                mixBlendMode: 'multiply',
                transform: `translate(${depth.shadowOffset * 0.6}px, -${depth.shadowOffset * 0.7}px)`,
              }}
            />

            {/* 2) Darker concentrated inner rim crevice */}
            <path
              d={innerPathLeft}
              fill="none"
              stroke="rgba(20, 30, 20, 0.45)"
              strokeWidth={depth.bevelWidth * 1.5}
              style={{
                filter: 'blur(3px)',
                mixBlendMode: 'multiply',
                transform: `translate(${depth.shadowOffset * 0.3}px, -${depth.shadowOffset * 0.4}px)`,
              }}
            />

            {/* 3) Bottom/Left reflective interior bounce */}
            <path
              d={innerPathLeft}
              fill="none"
              stroke={palette.recessHighlightColor}
              strokeWidth={depth.bevelWidth * 2.2}
              style={{
                filter: `blur(${depth.shadowBlur * 0.5}px)`,
                mixBlendMode: 'screen',
                transform: `translate(-${depth.shadowOffset * 0.7}px, ${depth.shadowOffset * 0.8}px)`,
              }}
            />
          </g>

          {/* D. Sculpted 3D Clay Rim Lip (The Physical Chamfer/Bevel of the Hole) */}
          <path
            d={innerPathLeft}
            fill="none"
            stroke="url(#recessRimBevel)"
            strokeWidth={depth.bevelWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
            }}
          />

          <path
            d={innerPathLeft}
            fill="none"
            stroke="url(#clayLipShine)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{
              mixBlendMode: 'overlay',
            }}
          />
        </svg>

        {/* INTERACTIVE SLIDER OVERLAY WITH LEFT AND RIGHT ARROWS INSIDE SLIDER */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '6.5%',
            width: '43.5%',
            top: '16%',
            bottom: '18%',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {config.slides.length > 1 && (
            <>
              {/* Right Arrow button inside slider */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-30 pointer-events-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/35 shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-all duration-200 focus:outline-none cursor-pointer"
                title={isRtl ? 'اسلاید بعدی' : 'Next slide'}
                aria-label="اسلاید بعدی"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              {/* Left Arrow button inside slider */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-30 pointer-events-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/75 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/35 shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-all duration-200 focus:outline-none cursor-pointer"
                title={isRtl ? 'اسلاید قبلی' : 'Previous slide'}
                aria-label="اسلاید قبلی"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              {/* Matcha Clay Slide indicator badge: Title on the Right, Dots on the Left */}
              {activeSlideData && (
                <div 
                  className="absolute inset-x-0 flex justify-center pointer-events-auto z-30 transition-all duration-300"
                  style={{
                    top: `calc(97% + ${sliderBadgeOffset}px)`,
                  }}
                >
                  <div 
                    dir="rtl"
                    className={`clay-chip flex items-center ${badgeSizeStyles.gap} ${badgeSizeStyles.chip} rounded-full font-bold shadow-md border transition-all duration-200`}
                    style={{
                      background: 'linear-gradient(150deg, #F5FAEA 0%, #E6EFE0 55%, #D7E5CF 100%)',
                      borderColor: 'rgba(141, 155, 109, 0.45)',
                      color: '#264323',
                      boxShadow: '0 4px 12px rgba(80, 105, 70, 0.28), inset 0 1px 2px rgba(255,255,255,0.9)',
                    }}
                  >
                    {/* 1. Slide Title Text (On the Right) */}
                    <span className={`truncate ${badgeSizeStyles.title} font-bold text-[#1F331D]`}>
                      {isRtl ? activeSlideData.titleFa : activeSlideData.titleEn}
                    </span>

                    <span className="text-[#8D9B6D]">·</span>

                    {/* 2. Clay Tactile Pagination Dots (On the Left) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 px-0.5" dir="ltr">
                      {config.slides.map((_, idx) => {
                        const isActive = idx === currentSlide;
                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center p-0.5"
                            aria-label={`اسلاید ${idx + 1}`}
                            title={isRtl ? config.slides[idx]?.titleFa : config.slides[idx]?.titleEn}
                          >
                            {isActive ? (
                              /* Active teal capsule pill from image.png */
                              <div 
                                className={`${badgeSizeStyles.dotActive} rounded-full transition-all duration-300`}
                                style={{
                                  background: 'linear-gradient(150deg, #2EC1AF 0%, #20998B 55%, #187D71 100%)',
                                  boxShadow: '0 2px 5px rgba(24, 125, 113, 0.45), inset 0 1px 1px rgba(255,255,255,0.6)',
                                }}
                              />
                            ) : (
                              /* Inactive recessed circular pit from image.png */
                              <div 
                                className={`${badgeSizeStyles.dotInactive} rounded-full transition-all duration-300 hover:scale-125`}
                                style={{
                                  background: '#CFDAC9',
                                  boxShadow: 'inset 1px 1.5px 3px rgba(80, 100, 75, 0.45), 0 1px 1px rgba(255,255,255,0.85)',
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* HTML Content Overlay: Positioned safely to the right of the slider with generous inner padding */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none p-3 sm:p-5 md:p-6"
          style={{
            paddingRight: '9%',
            paddingLeft: '51%',
            paddingTop: '6%',
            paddingBottom: '6%',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          }}
        >
          {/* Top Pill Badge: سال تحصیلی ۱۴۰۵-۱۴۰۶ (Moved higher up with more breathing room) */}
          <div className="mb-2.5 sm:mb-4 md:mb-5 pointer-events-auto w-full flex justify-center text-center">
            <span 
              className="clay-chip text-[10px] sm:text-xs md:text-sm font-bold px-4 py-1.5 shadow-xs inline-block"
              style={{
                background: 'linear-gradient(150deg, #F2F8ED 0%, #E4EEDF 100%)',
                color: '#249D8F',
              }}
            >
              سال تحصیلی ۱۴۰۵–۱۴۰۶
            </span>
          </div>

          {/* Heading: جایی برای بازی و یادگیری (Centered & Larger) */}
          <h1
            className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[40px] font-black leading-[1.2] tracking-tight mb-1 sm:mb-2 text-[#5F4D3C]"
            style={{ textWrap: 'balance' }}
          >
            <span>جایی برای </span>
            <span className="text-[#249D8F] inline-block font-black">بازی</span>
            <span> و </span>
            <span className="text-[#E76F51] inline-block font-black">یادگیری</span>
          </h1>

          {/* Subheading: دبستان پسرانه مهارت - Centered directly under the sentence above & Larger */}
          <div className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-[35px] xl:text-[37px] font-black text-[#B9854E] tracking-tight mt-1.5 sm:mt-2.5 mb-3.5 sm:mb-5 md:mb-6 drop-shadow-[0_1px_3px_rgba(185,133,78,0.25)]">
            دبستان پسرانه مهارت
          </div>

          {/* Description Paragraph (Centered & Larger) with distinct vertical distance */}
          <p
            className="w-full text-center text-xs sm:text-sm md:text-base lg:text-[17px] leading-relaxed mt-2 sm:mt-3 mb-5 sm:mb-6 md:mb-7 text-[#73604C] font-semibold max-w-[480px] mx-auto line-clamp-2 md:line-clamp-none"
          >
            {config.description ? config.description.replace(/\.$/, '') : 'اولین مدرسه تخصصی مهارت‌محور با رویکرد آموزش پروژه‌محور در مشهد'}
          </p>

          {/* Action Buttons: "معرفی مدرسه" and "تماس با ما" (Centered & Larger) */}
          <div className="pointer-events-auto flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap w-full">
            {/* Button 1: معرفی مدرسه (Teal with GraduationCap) */}
            <button
              onClick={onOpenStory}
              className="clay-btn px-5 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-[15px] font-black shadow-md cursor-pointer inline-flex items-center justify-center transition-transform hover:-translate-y-0.5 active:translate-y-0"
              title="معرفی مدرسه و آشنایی با رویکرد آموزشی"
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5" />
              <span>معرفی مدرسه</span>
            </button>

            {/* Button 2: تماس با ما (Warm Coral Clay #E56A4A with white text) */}
            <a
              href="#contact"
              className="clay-btn px-5 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-[15px] font-black !text-white inline-flex items-center justify-center transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-md"
              style={{
                background: 'linear-gradient(150deg, #F07A5A 0%, #E56A4A 55%, #D45636 100%)',
                color: '#FFFFFF',
                boxShadow: '0 6px 18px rgba(229, 106, 74, 0.42), inset 0 1px 2px rgba(255, 255, 255, 0.55), inset 0 -2px 4px rgba(150, 45, 20, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                textShadow: '0 1px 2px rgba(120, 30, 10, 0.3)',
              }}
              title="مشاهده آدرس، شماره‌های تماس و فرم ثبت‌نام"
            >
              <span className="text-white font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">تماس با ما</span>
            </a>
          </div>

          {/* 3 Tactile 3D Clay Stat Boxes with Configurable Size & Shifted Lower into Open Space */}
          <div 
            className={`pointer-events-auto grid grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 w-full ${statCardClasses.wrap} mx-auto transition-all duration-300`}
            style={{
              marginTop: `${statBoxOffset}px`,
            }}
          >
            {/* Stat Box 1: 240 دانش‌آموز (Mint & Teal Color Combination) */}
            <div 
              className={`clay-card ${statCardClasses.card} text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-1 shadow-sm`}
              style={{
                ['--clay-bg' as any]: 'linear-gradient(150deg, #F1F8ED 0%, #E5F1DF 55%, #D7EAD0 100%)',
                ['--clay-shadow-outer' as any]: 'rgba(141,155,109,0.38)',
                ['--clay-shadow-soft' as any]: 'rgba(141,155,109,0.12)',
                ['--clay-inset-dark' as any]: 'rgba(156,172,124,0.3)',
                ['--clay-inset-light' as any]: 'rgba(255,255,255,0.95)',
              }}
            >
              <div className={`${statCardClasses.num} text-[#249D8F] font-mono leading-none mb-1`}>
                ۲۴۰
              </div>
              <div className={`${statCardClasses.label} text-[#6D5E4E]`}>
                دانش‌آموز
              </div>
            </div>

            {/* Stat Box 2: 18 کادر آموزشی (Warm Peach & Coral Color Combination) */}
            <div 
              className={`clay-card ${statCardClasses.card} text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-1 shadow-sm`}
              style={{
                ['--clay-bg' as any]: 'linear-gradient(150deg, #FDF0E9 0%, #FBE4D9 55%, #F5D7C8 100%)',
                ['--clay-shadow-outer' as any]: 'rgba(231,111,81,0.32)',
                ['--clay-shadow-soft' as any]: 'rgba(231,111,81,0.12)',
                ['--clay-inset-dark' as any]: 'rgba(226,143,114,0.3)',
                ['--clay-inset-light' as any]: 'rgba(255,255,255,0.95)',
              }}
            >
              <div className={`${statCardClasses.num} text-[#E76F51] font-mono leading-none mb-1`}>
                ۱۸
              </div>
              <div className={`${statCardClasses.label} text-[#6D5E4E]`}>
                کادر آموزشی
              </div>
            </div>

            {/* Stat Box 3: 10 سال تجربه (Warm Golden Amber Color Combination) */}
            <div 
              className={`clay-card ${statCardClasses.card} text-center flex flex-col items-center justify-center transition-transform hover:-translate-y-1 shadow-sm`}
              style={{
                ['--clay-bg' as any]: 'linear-gradient(150deg, #FFF6E8 0%, #FDEED6 55%, #F8E2BF 100%)',
                ['--clay-shadow-outer' as any]: 'rgba(185,133,78,0.32)',
                ['--clay-shadow-soft' as any]: 'rgba(185,133,78,0.12)',
                ['--clay-inset-dark' as any]: 'rgba(195,148,95,0.3)',
                ['--clay-inset-light' as any]: 'rgba(255,255,255,0.95)',
              }}
            >
              <div className={`${statCardClasses.num} text-[#B9854E] font-mono leading-none mb-1`}>
                ۱۰
              </div>
              <div className={`${statCardClasses.label} text-[#6D5E4E]`}>
                سال تجربه
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

