import React, { useEffect, useState } from 'react';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const fullHex = cleanHex.length === 3 ? cleanHex.split('').map(c => c + c).join('') : cleanHex;
  const num = parseInt(fullHex, 16);
  if (isNaN(num)) return { r: 36, g: 157, b: 143 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function adjustColorBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
  const factor = percent / 100;
  const newR = clamp(r + 255 * factor);
  const newG = clamp(g + 255 * factor);
  const newB = clamp(b + 255 * factor);
  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
}

interface ClockWidgetProps {
  color?: string;
  size?: 'small' | 'normal' | 'large';
  rotate?: number;
  className?: string;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({
  color = '#249D8F',
  size = 'normal',
  rotate = 8,
  className = '',
}) => {
  // Start with null to prevent SSR / hydration mismatch
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date());
    const initialUpdateId = window.setTimeout(updateTime);
    const intervalId = window.setInterval(updateTime, 1000);

    return () => {
      window.clearTimeout(initialUpdateId);
      window.clearInterval(intervalId);
    };
  }, []);

  const hours = time ? pad(time.getHours()) : '--';
  const minutes = time ? pad(time.getMinutes()) : '--';
  const seconds = time ? pad(time.getSeconds()) : '--';

  const day = time
    ? time.toLocaleDateString('fa-IR', { weekday: 'long' })
    : 'در حال بارگذاری';
  const date = time
    ? time.toLocaleDateString('fa-IR', {
        day: 'numeric',
        month: 'long',
      })
    : '';

  // Generate dynamic 3D clay palette based on selected color
  const lighterColor = adjustColorBrightness(color, 20);
  const darkerColor = adjustColorBrightness(color, -25);
  const deepestColor = adjustColorBrightness(color, -40);
  const { r, g, b } = hexToRgb(color);

  // Warm coral accent for seconds if warm tone
  const isWarmTone = r > 180 && b < 140;
  const accentColor = isWarmTone ? '#FFF2EB' : '#D2FFF9';

  const sizeClasses = {
    small: 'w-[145px] sm:w-[155px] min-h-[140px] p-3',
    normal: 'w-[170px] sm:w-[190px] md:w-[205px] min-h-[160px] sm:min-h-[175px] p-3.5 sm:p-4.5',
    large: 'w-[205px] sm:w-[225px] md:w-[245px] min-h-[190px] sm:min-h-[205px] p-4.5 sm:p-5.5',
  }[size];

  const timeFontClasses = {
    small: 'text-xl sm:text-2xl font-black',
    normal: 'text-2xl sm:text-3xl md:text-[34px] font-black',
    large: 'text-3xl sm:text-4xl md:text-[42px] font-black',
  }[size];

  const secFontClasses = {
    small: 'text-xs sm:text-[13px] font-extrabold',
    normal: 'text-sm sm:text-base font-extrabold',
    large: 'text-base sm:text-lg font-black',
  }[size];

  const dayFontClasses = {
    small: 'text-xs font-black',
    normal: 'text-[13px] sm:text-[15px] font-black',
    large: 'text-base sm:text-lg font-black',
  }[size];

  const dateFontClasses = {
    small: 'text-[10px] sm:text-[11px] font-bold',
    normal: 'text-[11px] sm:text-xs md:text-[13px] font-bold',
    large: 'text-xs sm:text-sm font-bold',
  }[size];

  return (
    <div
      className={`daricheh-widget group transition-transform duration-300 hover:scale-105 select-none ${sizeClasses} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center center',
        ['--daricheh-raised' as any]: `linear-gradient(150deg, ${lighterColor} 0%, ${color} 55%, ${darkerColor} 100%)`,
        ['--daricheh-clay' as any]: `
          0 16px 28px rgba(${r}, ${g}, ${b}, 0.38),
          0 3px 8px rgba(0, 0, 0, 0.2),
          inset 0 2px 4px rgba(255, 255, 255, 0.75),
          inset 0 -3px 6px ${deepestColor}
        `,
      }}
      role="timer"
      aria-live="polite"
      aria-label={`ساعت فعلی ${hours}:${minutes}:${seconds}`}
      title="ساعت هوشمند خمیری مدرسه"
    >
      {/* 3 layered shapes for 3D clay depth with organic fluid morphing */}
      <div 
        className="daricheh-blob-shadow" 
        style={{
          boxShadow: `0 14px 34px rgba(${r}, ${g}, ${b}, 0.42)`,
        }}
        aria-hidden="true" 
      />
      <div className="daricheh-blob-base" aria-hidden="true" />
      <div className="daricheh-blob-sheen" aria-hidden="true" />

      {/* Widget foreground content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center text-white">
        {/* Live Time Row with Larger Numbers */}
        <div className="flex items-baseline justify-center gap-1 leading-none mb-1" dir="ltr">
          <time className={`font-mono tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] ${timeFontClasses}`}>
            {hours}
            <span className="daricheh-colon mx-0.5">:</span>
            {minutes}
          </time>
          <span 
            className={`font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${secFontClasses}`}
            style={{ color: accentColor }}
          >
            :{seconds}
          </span>
        </div>

        {/* Divider */}
        <div className="w-10 sm:w-14 h-[2px] rounded-full bg-white/50 my-1.5" aria-hidden="true" />

        {/* Day & Date in Persian with Larger Bold Typography */}
        <p className={`text-white/95 tracking-wide m-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${dayFontClasses}`}>
          {day}
        </p>
        {date && (
          <p className={`text-white/85 m-0 mt-0.5 opacity-95 ${dateFontClasses}`}>
            {date}
          </p>
        )}
      </div>
    </div>
  );
};
