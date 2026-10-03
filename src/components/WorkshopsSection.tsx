import React, { useState } from 'react';
import { Palette, FlaskConical, Code2, Hammer, Sparkles, Clock, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { mockWorkshops } from '../mockData';
import type { Workshop } from '../types/school';
import { motion, useReducedMotion } from 'framer-motion';
import { createContainerVariants, createCardVariants, createHeaderVariants, defaultViewport } from '../utils/motionVariants';
import { ClaySectionBubbles } from './ClaySectionBubbles';
import { ClayOrganicCard } from './ClayOrganicCard';

interface WorkshopsSectionProps {
  onSelectWorkshop?: (workshop: Workshop) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({ onSelectWorkshop }) => {
  const [activeWorkshop, setActiveWorkshop] = useState<Workshop | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const containerVariants = createContainerVariants(0.10);
  const cardVariants = createCardVariants(!!shouldReduceMotion);
  const headerVariants = createHeaderVariants(!!shouldReduceMotion);

  const renderIcon = (iconName: string, className: string, color: string) => {
    switch (iconName) {
      case 'FlaskConical':
        return <FlaskConical className={className} style={{ color }} />;
      case 'Code2':
        return <Code2 className={className} style={{ color }} />;
      case 'Hammer':
        return <Hammer className={className} style={{ color }} />;
      case 'Palette':
      default:
        return <Palette className={className} style={{ color }} />;
    }
  };

  return (
    <section 
      id="workshops" 
      className="py-20 sm:py-24 relative overflow-hidden"
    >
      {/* Unified 3D Clay Bubbles and Ambient Glow */}
      <ClaySectionBubbles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="inline-flex mb-3">
            <span className="clay-chip text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#249D8F]" />
              <span>آموزش عملی و دست‌ورزی</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5F4D3C] tracking-tight">
            <span className="clay-underline">کارگاه‌های مهارتی تخصصی</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8A765F] leading-relaxed max-w-2xl mx-auto">
            کشف استعداد و تقویت تفکر نقادانه از طریق آزمون، آزمایش، برنامه‌نویسی و ساخت دست‌سازه‌ها
          </p>
        </motion.div>

        {/* 4 Workshops Cards with Framer Motion Stagger */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {mockWorkshops.map((ws, idx) => {
            const isPeach = idx % 2 === 1;
            const theme = isPeach ? 'peach' : 'matcha';
            const variantIndex = (idx % 3) as 0 | 1 | 2;

            return (
              <motion.div
                key={ws.id}
                variants={cardVariants}
                className="clay-wrap"
              >
                <ClayOrganicCard
                  variant={variantIndex}
                  theme={theme}
                  hasRecessedBasin={false}
                  className="max-w-[390px] mx-auto"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Icon + Chip */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div 
                          className="w-13 h-13 rounded-[22px_28px_20px_26px/26px_20px_26px_22px] flex items-center justify-center shadow-[inset_2px_3px_6px_rgba(255,255,255,0.95),inset_-2px_-3px_6px_rgba(156,172,124,0.35),4px_6px_12px_rgba(141,155,109,0.25)]"
                          style={{ backgroundColor: ws.bgColor }}
                        >
                          {renderIcon(ws.icon, 'w-6 h-6', ws.color)}
                        </div>
                        <span className="clay-chip text-[11px] shadow-sm font-bold">
                          {ws.ageGroup}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#5F4D3C] mb-2.5">
                        {ws.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#73604C] leading-relaxed mb-6">
                        {ws.description}
                      </p>
                    </div>

                    {/* Bottom CTA button */}
                    <div className="pt-4 border-t border-[#D3E0C1]/70 mt-auto">
                      <button
                        onClick={() => setActiveWorkshop(ws)}
                        className="clay-btn w-full py-2.5 text-xs font-bold"
                      >
                        <span>جزئیات و سرفصل‌ها</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </ClayOrganicCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Workshop Details Modal */}
      {activeWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            dir="rtl"
            className="w-full max-w-lg clay-card clay-card--lg p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            style={{
              ['--clay-bg' as any]: 'linear-gradient(150deg, #F5F9EC 0%, #EBF2DF 55%, #DEE9D0 100%)',
            }}
          >
            <button
              onClick={() => setActiveWorkshop(null)}
              className="absolute top-5 left-5 clay-arrow !w-8 !h-8"
              aria-label="بستن"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[inset_2px_3px_6px_rgba(255,255,255,0.9),inset_-2px_-3px_6px_rgba(156,172,124,0.35)] shrink-0"
                style={{ backgroundColor: activeWorkshop.bgColor }}
              >
                {renderIcon(activeWorkshop.icon, 'w-7 h-7', activeWorkshop.color)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#5F4D3C]">
                  {activeWorkshop.title}
                </h3>
                <p className="text-xs text-[#8A765F] mt-0.5">
                  {activeWorkshop.description}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#5F4D3C]">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="clay-stat p-3">
                  <span className="text-[#8A765F] block mb-1">مدت زمان هفتگی:</span>
                  <strong className="font-bold text-[#5F4D3C] text-sm">{activeWorkshop.hours}</strong>
                </div>
                <div className="clay-stat p-3">
                  <span className="text-[#8A765F] block mb-1">گروه سنی:</span>
                  <strong className="font-bold text-[#5F4D3C] text-sm">{activeWorkshop.ageGroup}</strong>
                </div>
              </div>

              {activeWorkshop.skillsTaught && (
                <div className="clay-stat p-4">
                  <h4 className="font-bold text-[#46382B] mb-2.5 text-xs">
                    سرفصل‌ها و مهارت‌های تدریس‌شده در این کارگاه:
                  </h4>
                  <ul className="space-y-2">
                    {activeWorkshop.skillsTaught.map((skill, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#249D8F] shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#D5E1C3]">
              <a
                href="#contact"
                onClick={() => setActiveWorkshop(null)}
                className="clay-btn px-6 py-2.5 text-xs font-bold"
              >
                ثبت‌نام در کارگاه
              </a>
              <button
                onClick={() => setActiveWorkshop(null)}
                className="text-xs font-semibold text-[#8A765F] hover:text-[#5F4D3C]"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
