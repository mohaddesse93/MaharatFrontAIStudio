import React, { useState } from 'react';
import { Users, GraduationCap, Send, Instagram, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { mockTeachers } from '../mockData';
import type { Teacher } from '../types/school';
import { motion, useReducedMotion } from 'framer-motion';
import { createContainerVariants, createCardVariants, createHeaderVariants, defaultViewport } from '../utils/motionVariants';
import { ClaySectionBubbles } from './ClaySectionBubbles';
import { ClayOrganicCard } from './ClayOrganicCard';

export const FacultySection: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = createContainerVariants(0.12);
  const cardVariants = createCardVariants(!!shouldReduceMotion);
  const headerVariants = createHeaderVariants(!!shouldReduceMotion);

  return (
    <section 
      id="faculty" 
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
              <Users className="w-3.5 h-3.5 text-[#249D8F]" />
              <span>کادر آموزشی و اجرایی</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5F4D3C] tracking-tight">
            <span className="clay-underline">همراهان دلسوز و متعهد در مسیر رشد کودکان</span>
          </h2>
        </motion.div>

        {/* Faculty Grid with Framer Motion Staggered Entrance */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-9"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {mockTeachers.map((teacher, index) => {
            const isWarmPeach = teacher.role === 'معاونت آموزشی';
            const theme = isWarmPeach ? 'peach' : 'matcha';
            const variantIndex = (index % 3) as 0 | 1 | 2;

            return (
              <motion.div
                key={teacher.id}
                variants={cardVariants}
                className="clay-wrap"
              >
                <ClayOrganicCard
                  variant={variantIndex}
                  theme={theme}
                  hasRecessedBasin={true}
                  recessedImageSrc={teacher.avatar}
                  recessedImageAlt={teacher.name}
                  recessedBadge={
                    <span className="clay-chip text-[11px] shadow-md font-bold">
                      {teacher.role}
                    </span>
                  }
                  className="max-w-[390px] mx-auto"
                >
                  <div className="w-full flex flex-col items-center text-center">
                    {/* Name */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#5F4D3C] mt-2 mb-1">
                      {teacher.name}
                    </h3>

                    {/* Education */}
                    {teacher.education && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#8A765F] font-semibold mb-2">
                        <GraduationCap className="w-3.5 h-3.5 text-[#249D8F]" />
                        <span>{teacher.education}</span>
                      </div>
                    )}
                  </div>

                  {/* Socials & View Resume Button */}
                  <div className="w-full pt-4 border-t border-[#D3E0C1]/70 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      {teacher.socials.some(s => s.telegram) && (
                        <a
                          href="https://t.me/maharat_school"
                          target="_blank"
                          rel="noreferrer"
                          className="clay-social !w-9 !h-9 text-xs"
                          title="پیام در تلگرام"
                          aria-label="تلگرام"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {teacher.socials.some(s => s.instagram) && (
                        <a
                          href="https://instagram.com/maharat_school"
                          target="_blank"
                          rel="noreferrer"
                          className="clay-social !w-9 !h-9 text-xs"
                          title="صفحه اینستاگرام"
                          aria-label="اینستاگرام"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedTeacher(teacher)}
                      className="clay-btn clay-btn--soft px-3.5 py-1.5 text-xs font-bold"
                    >
                      <span>رزومه کامل</span>
                      <span className="text-[10px]">←</span>
                    </button>
                  </div>
                </ClayOrganicCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            dir="rtl"
            className="w-full max-w-lg clay-card clay-card--lg p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            style={{
              ['--clay-bg' as any]: 'linear-gradient(150deg, #F5F9EC 0%, #EBF2DF 55%, #DEE9D0 100%)',
              ['--clay-shadow-outer' as any]: 'rgba(100,115,80,0.45)',
            }}
          >
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-5 left-5 clay-arrow !w-8 !h-8"
              aria-label="بستن پنجره"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-5 mb-6 text-center sm:text-right">
              <div className="w-24 h-24 rounded-2xl p-2 bg-gradient-to-br from-white to-[#D9E7CE] shadow-[6px_8px_16px_rgba(141,155,109,0.38),inset_2px_3px_5px_rgba(255,255,255,0.9)]">
                <img
                  src={selectedTeacher.avatar}
                  alt={selectedTeacher.name}
                  className="w-full h-full object-cover rounded-xl aspect-square"
                />
              </div>
              <div>
                <span className="clay-chip text-xs mb-2">
                  {selectedTeacher.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#5F4D3C]">
                  {selectedTeacher.name}
                </h3>
                <p className="text-xs text-[#8A765F] mt-1 font-medium">
                  {selectedTeacher.education}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#5F4D3C] leading-relaxed">
              <div className="clay-stat p-4">
                <h4 className="font-bold text-[#46382B] mb-1.5 text-xs">
                  سوابق و چشم‌انداز تربیتی:
                </h4>
                <p className="text-xs sm:text-sm text-[#73604C]">{selectedTeacher.bio}</p>
              </div>

              <div className="clay-stat p-4">
                <h4 className="font-bold text-[#1E7E72] mb-1 text-xs">
                  پیام به اولیای گرامی:
                </h4>
                <p className="text-xs sm:text-sm text-[#586A51]">
                  «هدف ما در دبستان مهارت، ساختن کودکانی مستقل است که از یادگیری لذت می‌برند و آمادهٔ روبه‌رو شدن با چالش‌های دنیای مدرن هستند.»
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="clay-btn px-6 py-2 text-xs"
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
