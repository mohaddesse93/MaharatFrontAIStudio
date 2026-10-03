import React, { useState } from 'react';
import { X, Copy, Check, Code, FileText, Layers } from 'lucide-react';
import { WidgetCustomization } from '../types';
import { CLAY_PALETTES } from '../constants';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WidgetCustomization;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'react' | 'html' | 'svg'>('react');
  const [copied, setCopied] = useState(false);

  const basePal = CLAY_PALETTES[config.clayTheme] || CLAY_PALETTES.sage;
  const activeBgLight = config.customClayBg || basePal.bgLight;
  const activeBgDark = config.customClayBg || basePal.bgDark;
  const activeTextPrimary = config.customTextColor || basePal.textPrimary;
  const activeTextSecondary = config.customTextColor ? `${config.customTextColor}B3` : basePal.textSecondary;
  const activeBtnBorder = config.customTextColor || basePal.btnBorder;

  // SVG Paths
  const outerPath = `M 115 105 C 195 62, 320 68, 450 92 C 580 116, 715 65, 850 74 C 930 79, 976 122, 966 210 C 956 295, 978 410, 928 498 C 876 585, 740 542, 605 556 C 475 570, 350 612, 210 596 C 100 580, 42 492, 42 370 C 42 248, 52 140, 115 105 Z`;
  const innerPath = `M 720 98 C 800 98, 875 116, 908 152 C 938 188, 938 290, 922 385 C 906 468, 878 502, 808 506 C 736 510, 630 504, 566 444 C 496 384, 502 300, 528 236 C 554 172, 634 98, 720 98 Z`;

  const reactSnippet = `// 3D Clay Organic Hero Widget with Recessed Slider ("فرورفتگی خمیری همراه با اسلایدر")
import React, { useState, useEffect } from 'react';

const SLIDES = ${JSON.stringify(config.slides.map(s => ({ id: s.id, url: s.url, title: s.titleEn })), null, 2)};

export const ClayHeroCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[1040px] mx-auto animate-clay-fade-in-up">
      {/* Botanical sprout accent in top-right */}
      <svg 
        width="56" height="56" viewBox="0 0 64 64" fill="none"
        className="absolute -top-5 right-10 z-20 pointer-events-none drop-shadow-sm"
      >
        <path d="M32 10 C32 10, 38 18, 38 27 C38 33, 34 37, 30 38 C28 35, 27 30, 28 23 C29 16, 32 10, 32 10 Z" fill="${basePal.accentLeaf}" />
        <path d="M17 18 C17 18, 25 19, 30 25 C33 29, 32 34, 28 36 C25 34, 21 31, 20 25 C19 19, 17 18, 17 18 Z" fill="${basePal.accentLeaf}" opacity="0.88" />
        <path d="M48 24 C48 24, 43 27, 39 32 C36 36, 38 39, 41 40 C44 39, 47 36, 48 31 C49 26, 48 24, 48 24 Z" fill="${basePal.accentLeaf}" opacity="0.75" />
      </svg>

      {/* Main 3D Clay Card */}
      <div className="relative w-full aspect-[1000/620]">
        <svg viewBox="0 0 1000 620" className="w-full h-full filter drop-shadow-[0_25px_35px_rgba(40,55,42,0.12)]">
          <defs>
            <linearGradient id="clayOuter" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="${activeBgLight}" />
              <stop offset="100%" stopColor="${activeBgDark}" />
            </linearGradient>

            <clipPath id="innerCutout">
              <path d="${innerPath}" />
            </clipPath>

            <linearGradient id="recessRim" x1="30%" y1="15%" x2="80%" y2="85%">
              <stop offset="0%" stopColor="rgba(38,55,40,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
            </linearGradient>
          </defs>

          {/* Outer organic clay body */}
          <path d="${outerPath}" fill="url(#clayOuter)" />

          {/* Recessed photo slider window with carved 3D bevel and inner shadow */}
          <g>
            <g clipPath="url(#innerCutout)">
              {SLIDES.map((slide, idx) => (
                <image
                  key={slide.id}
                  href={slide.url}
                  x="480"
                  y="60"
                  width="480"
                  height="480"
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    opacity: idx === currentSlide ? 1 : 0,
                    transition: 'opacity 750ms ease-out',
                  }}
                />
              ))}
              
              {/* Inner 3D depression shadows */}
              <path 
                d="${innerPath}" fill="none" stroke="rgba(38,55,40,0.35)" strokeWidth="22" 
                style={{ filter: 'blur(16px)', mixBlendMode: 'multiply', transform: 'translate(-5px, -6px)' }} 
              />
              <path 
                d="${innerPath}" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="16" 
                style={{ filter: 'blur(12px)', mixBlendMode: 'screen', transform: 'translate(6px, 6px)' }} 
              />
            </g>

            {/* Clay carved rim lip */}
            <path d="${innerPath}" fill="none" stroke="url(#recessRim)" strokeWidth="7" />
          </g>
        </svg>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start text-left pl-[8%] pr-[52%] pointer-events-none">
          <span className="mb-3 tracking-[0.25em] text-xs font-semibold uppercase text-[${activeTextSecondary}]">${config.subtitle}</span>
          <h1 className="text-3xl lg:text-[42px] font-semibold text-[${activeTextPrimary}] leading-tight mb-4 font-serif">
            ${config.title.replace('\n', '<br />')}
          </h1>
          <p className="text-sm text-[${activeTextSecondary}] leading-relaxed mb-8 max-w-[420px]">
            ${config.description}
          </p>
          <button className="pointer-events-auto px-6 py-3 rounded-full border border-[${activeBtnBorder}] text-[${activeTextPrimary}] text-sm hover:opacity-80 transition-colors">
            ${config.buttonText} →
          </button>
        </div>
      </div>
    </div>
  );
};`;

  const htmlSnippet = `<!-- 3D Clay Organic Hero Container with Recessed Shape -->
<div style="position: relative; width: 100%; max-width: 1040px; margin: 0 auto; aspect-ratio: 1000/620;">
  <svg viewBox="0 0 1000 620" style="width: 100%; height: 100%; filter: drop-shadow(0 25px 35px rgba(40,55,42,0.14));">
    <defs>
      <linearGradient id="clayOuter" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#EEF3EB" />
        <stop offset="100%" stop-color="#DFE8DB" />
      </linearGradient>
      <clipPath id="innerCutout">
        <path d="${innerPath}" />
      </clipPath>
    </defs>
    <!-- Outer Clay Card -->
    <path d="${outerPath}" fill="url(#clayOuter)" />
    <!-- Recessed Window with image slide -->
    <g clip-path="url(#innerCutout)">
      <image href="${config.slides[0]?.url || ''}" x="480" y="60" width="480" height="480" preserveAspectRatio="xMidYMid slice" />
    </g>
    <!-- Carved Lip / Bevel -->
    <path d="${innerPath}" fill="none" stroke="rgba(40,60,40,0.3)" stroke-width="7" />
  </svg>
</div>`;

  const svgPathsSnippet = `<!-- Outer Clay Path (Wavy organic curves / پیچ و خم) -->
<path d="${outerPath}" />

<!-- Inner Recessed Cutout Path (وسطش فرورفتگی داره) -->
<path d="${innerPath}" />`;

  const codeToShow = activeTab === 'react' ? reactSnippet : activeTab === 'html' ? htmlSnippet : svgPathsSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToShow);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#1E241E] text-[#E8ECE7] rounded-3xl shadow-2xl border border-[#323D32] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#2C382C] flex items-center justify-between bg-[#171C17]">
          <div className="flex items-center gap-2.5">
            <Code className="w-5 h-5 text-[#88B084]" />
            <div>
              <h3 className="text-base font-semibold text-white">
                Export 3D Clay Widget Code
              </h3>
              <p className="text-xs text-[#95A894]">
                Drop this exact widget directly onto the first page of your website
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#2C382C] text-[#8EA08D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-[#2C382C] bg-[#1B211B]">
          <div className="flex gap-2">
            {[
              { id: 'react', label: 'React / Next.js Component', icon: Code },
              { id: 'html', label: 'HTML + Tailwind', icon: FileText },
              { id: 'svg', label: 'Pure SVG Paths', icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2 px-3 text-xs font-medium border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-[#88B084] text-white bg-[#252E25] rounded-t-lg'
                      : 'border-transparent text-[#7F947E] hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#374A36] hover:bg-[#435941] text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-5 flex-1 overflow-auto bg-[#141814] font-mono text-xs leading-relaxed text-[#A4B8A3]">
          <pre className="whitespace-pre overflow-x-auto selection:bg-[#88B084]/30 selection:text-white">
            {codeToShow}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2C382C] bg-[#171C17] flex items-center justify-between text-xs text-[#7F947E]">
          <span>Designed with authentic 3D clay curves and carved recessed depth.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2A342A] text-white hover:bg-[#344234] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
