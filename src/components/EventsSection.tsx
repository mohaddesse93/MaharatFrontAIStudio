import React, { useState, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { EVENTS } from '../mockData';
import type { Event } from '../types/school';
import { motion, useReducedMotion } from 'framer-motion';
import { createContainerVariants, createCardVariants, createHeaderVariants, defaultViewport } from '../utils/motionVariants';
import { ClaySectionBubbles } from './ClaySectionBubbles';
import { ClayOrganicEventCard } from './ClayOrganicEventCard';

export const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const containerVariants = createContainerVariants(0.12);
  const cardVariants = createCardVariants(!!shouldReduceMotion);
  const headerVariants = createHeaderVariants(!!shouldReduceMotion);

  const categories = ['همه', 'جشن‌ها و مراسم', 'علمی و فناوری', 'ورزش و تندرستی', 'هنر و فرهنگ'];

  const filteredEvents = activeCategory === 'همه'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section 
      id="events" 
      className="py-20 sm:py-24 relative overflow-hidden"
    >
      {/* Unified 3D Clay Bubbles and Ambient Glow */}
      <ClaySectionBubbles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with smooth motion */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="inline-flex mb-3">
            <span className="clay-chip text-xs">
              <Calendar className="w-3.5 h-3.5 text-[#249D8F]" />
              <span>رویدادها و خاطرات مدرسه</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5F4D3C] tracking-tight">
            <span className="clay-underline">رویدادها و لحظات پرشور یادگیری</span>
          </h2>
        </motion.div>

        {/* Category Pills Filter & Navigation Controls */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'clay-btn px-4 py-2 text-white'
                      : 'clay-chip hover:opacity-85'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Left & Right Clay Arrow Navigation Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollCarousel('right')}
              className="clay-arrow"
              title="رویدادهای قبلی"
              aria-label="رویدادهای قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('left')}
              className="clay-arrow"
              title="رویدادهای بعدی"
              aria-label="رویدادهای بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Side-by-side Horizontal Event Cards with Scroll & Arrows */}
        <div className="relative">
          {/* Left & Right floating side arrows on larger screens */}
          <button
            onClick={() => scrollCarousel('right')}
            className="hidden 2xl:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 clay-arrow !w-12 !h-12 shadow-xl items-center justify-center"
            title="رویدادهای قبلی"
            aria-label="رویدادهای قبلی"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollCarousel('left')}
            className="hidden 2xl:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 clay-arrow !w-12 !h-12 shadow-xl items-center justify-center"
            title="رویدادهای بعدی"
            aria-label="رویدادهای بعدی"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Track: Side-by-side with clay-wrap and clay-card */}
          <motion.div
            ref={carouselRef}
            className="clay-carousel flex gap-6 overflow-x-auto pb-8 pt-3 px-2 snap-x snap-mandatory"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {filteredEvents.map((event, idx) => {
              return (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  className="clay-wrap snap-start shrink-0 w-[85vw] sm:w-[330px] md:w-[360px] lg:w-[370px]"
                >
                  <ClayOrganicEventCard
                    variant={idx % 3}
                    imageSrc={event.image}
                    imageAlt={event.title}
                    category={event.category}
                    dateFa={event.dateFa}
                    title={event.title}
                    onOpenDetails={() => setSelectedEvent(event)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            dir="rtl"
            className="w-full max-w-2xl clay-card clay-card--lg overflow-hidden relative max-h-[92vh] flex flex-col p-0"
            style={{
              ['--clay-bg' as any]: 'linear-gradient(150deg, #F5F9EC 0%, #EBF2DF 55%, #DEE9D0 100%)',
            }}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-[#E5ECE2] shrink-0 overflow-hidden">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 left-4 clay-arrow !w-9 !h-9 text-xs"
                aria-label="بستن"
              >
                ✕
              </button>
              <div className="absolute bottom-4 right-4">
                <span className="clay-chip text-xs">
                  {selectedEvent.category} · {selectedEvent.dateFa}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <h3 className="text-2xl font-extrabold text-[#5F4D3C]">
                {selectedEvent.title}
              </h3>

              <div className="clay-stat p-4">
                <p className="text-sm sm:text-base text-[#5F4D3C] leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="font-bold text-xs sm:text-sm text-[#46382B]">
                  بخش‌های ویژه و دستاوردهای دانش‌آموزان:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedEvent.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-2xl bg-[#E6EFE2] text-xs text-[#2A4426] font-semibold shadow-[inset_1px_2px_4px_rgba(255,255,255,0.8),inset_-1px_-2px_4px_rgba(156,172,124,0.25)]">
                      <Check className="w-4 h-4 text-[#249D8F] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D5E1C3] flex items-center justify-between">
                <span className="text-xs text-[#8A765F]">
                  تقویم رسمی سال تحصیلی دبستان مهارت
                </span>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="clay-btn px-6 py-2 text-xs"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
