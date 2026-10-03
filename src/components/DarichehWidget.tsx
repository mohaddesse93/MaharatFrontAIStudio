import React from 'react';

interface DarichehWidgetProps {
  subTitle?: string;
  title?: string;
  url?: string;
  rotate?: number;
  className?: string;
}

export const DarichehWidget: React.FC<DarichehWidgetProps> = ({
  subTitle = 'ورود به',
  title = 'دریچه',
  url = 'http://194.48.198.146/auth/login',
  rotate = -10,
  className = '',
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`daricheh-widget group transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center center',
      }}
      role="link"
      aria-label={`${subTitle} ${title}`}
      title="ورود به سامانه دریچه"
    >
      {/* 3 layered shapes for 3D clay depth with organic fluid morphing */}
      <div className="daricheh-blob-shadow" aria-hidden="true" />
      <div className="daricheh-blob-base" aria-hidden="true" />
      <div className="daricheh-blob-sheen" aria-hidden="true" />

      {/* Widget foreground content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-3 sm:px-5 sm:py-4 text-center text-white select-none">
        {/* Line 1: ورود به */}
        <div className="text-xs sm:text-[13px] md:text-sm font-bold text-white/95 leading-tight drop-shadow-[0_1px_1px_rgba(10,50,45,0.3)]">
          {subTitle}
        </div>

        {/* Line 2: دریچه */}
        <div className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none tracking-tight mt-1 drop-shadow-[0_2px_4px_rgba(10,50,45,0.45)]">
          {title}
        </div>
      </div>
    </a>
  );
};
