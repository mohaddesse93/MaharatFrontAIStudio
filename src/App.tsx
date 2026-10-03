import React, { useState, useEffect } from 'react';
import { WidgetCustomization } from './types';
import { DEFAULT_CONFIG_FA, CLAY_PALETTES } from './constants';
import { ClayHeroWidget } from './components/ClayHeroWidget';
import { SiteHeader } from './components/SiteHeader';
import { FacultySection } from './components/FacultySection';
import { EventsSection } from './components/EventsSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { StoryModal } from './components/StoryModal';
import { DEFAULT_GENERAL_SETTINGS, mockSchoolInfo } from './mockData';
import { Users, GraduationCap, Award, Sparkles, Layers, Phone, BookOpen } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { createContainerVariants, createCardVariants, defaultViewport } from './utils/motionVariants';

const STORAGE_KEY = 'maharat_clay_widget_config_v2';

export default function App() {
  const [config, setConfig] = useState<WidgetCustomization>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG_FA,
          ...parsed,
          statBoxOffset: parsed.statBoxOffset ?? 60,
          heroWidth: parsed.heroWidth ?? 1150,
          menuTopOffset: 1, // Set to 1px as requested by user ("یک دونه")
          heroTopGap: 16, // Gap between menu and hero section: 16px as requested
          leafTopOffset: 19, // Distance between leaf and hero box: +19px as requested
          leafRightOffset: parsed.leafRightOffset ?? 0, // Horizontal offset of leaf
          showDaricheh: parsed.showDaricheh ?? true,
          darichehSub: parsed.darichehSub ?? 'ورود به',
          darichehTitle: parsed.darichehTitle ?? 'دریچه',
          darichehUrl: parsed.darichehUrl ?? 'http://194.48.198.146/auth/login',
          darichehRotate: parsed.darichehRotate ?? -10,
          darichehTop: parsed.darichehTop ?? 14,
          darichehLeft: parsed.darichehLeft ?? 35,
          showClockWidget: parsed.showClockWidget ?? true,
          clockSize: parsed.clockSize ?? 'normal',
          clockColor: parsed.clockColor ?? '#E76F51',
          clockTop: parsed.clockTop ?? 84,
          clockRight: parsed.clockRight ?? 14,
          clockRotate: parsed.clockRotate ?? 8,
          sliderBadgeSize: 'normal', // Balanced between small and large
          sliderBadgeOffset: 6, // Exactly 6px offset as requested by user
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG_FA;
  });

  // Tactile hover expand and bounce spring animation for clay bubbles
  const bubbleHoverAnim = {
    scale: 1.15,
    opacity: 0.95,
    zIndex: 25,
    transition: {
      type: 'spring' as const,
      stiffness: 420,
      damping: 10, // low damping produces an elastic, playful clay bounce
      mass: 0.65,
    },
  };

  const bubbleTapAnim = {
    scale: 0.92,
    transition: {
      type: 'spring' as const,
      stiffness: 550,
      damping: 14,
    },
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const shouldReduceMotion = useReducedMotion();
  const containerVariants = createContainerVariants(0.12);
  const cardVariants = createCardVariants(!!shouldReduceMotion);

  // Parallax scrolling for background clay bubbles
  const { scrollY } = useScroll();
  const heroY1 = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, 50]);
  const heroY2 = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, -40]);
  const heroY3 = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, 45]);
  const heroY4 = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, -32]);
  const heroY5 = useTransform(scrollY, [0, 600], shouldReduceMotion ? [0, 0] : [0, 30]);

  // Track active section on scroll for smooth navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'faculty', 'events', 'workshops', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          if (scrollPos >= el.offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#243325] selection:bg-[#7D9179]/25 selection:text-[#192A1A]">
      {/* Site Header with Navigation Bar */}
      <SiteHeader
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenAbout={() => setIsStoryOpen(true)}
        activeSection={activeSection}
        menuTopOffset={config.menuTopOffset ?? 1}
        onMenuTopOffsetChange={(offset) => setConfig((prev) => ({ ...prev, menuTopOffset: offset }))}
      />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section 
          id="hero" 
          className="relative px-3 sm:px-6 lg:px-8 pb-16 overflow-hidden transition-[padding-top] duration-200"
          style={{
            paddingTop: `${config.heroTopGap ?? 16}px`,
          }}
        >
          {/* Decorative Clay Bubbles with 3D Spatial Parallax Scrolling (اطراف باکس هیرو) */}
          {/* 1. Top-Right Matcha Bubble */}
          <motion.div 
            className="clay-ball hidden sm:block top-4 -right-6 lg:-right-10 w-28 h-28 lg:w-36 lg:h-36 opacity-75 will-change-transform cursor-pointer pointer-events-auto"
            style={{
              y: heroY1,
              ['--ball-light' as any]: '#F5FAEA',
              ['--ball-base' as any]: '#DFEBDC',
              ['--ball-dark' as any]: '#C7DBC2',
              ['--ball-shadow' as any]: 'rgba(141,155,109,0.32)',
              ['--ball-inset' as any]: 'rgba(156,172,124,0.4)',
            }}
            whileHover={bubbleHoverAnim}
            whileTap={bubbleTapAnim}
          />

          {/* 2. Top-Left Warm Peach Bubble */}
          <motion.div 
            className="clay-ball hidden sm:block top-8 -left-6 lg:-left-10 w-24 h-24 lg:w-32 lg:h-32 opacity-70 will-change-transform cursor-pointer pointer-events-auto"
            style={{
              y: heroY2,
              ['--ball-light' as any]: '#FDEEE8',
              ['--ball-base' as any]: '#F8D8CC',
              ['--ball-dark' as any]: '#EBBFAA',
              ['--ball-shadow' as any]: 'rgba(231,111,81,0.25)',
              ['--ball-inset' as any]: 'rgba(226,143,114,0.35)',
            }}
            whileHover={bubbleHoverAnim}
            whileTap={bubbleTapAnim}
          />

          {/* 3. Bottom-Right Coral Accent Bubble */}
          <motion.div 
            className="clay-ball hidden sm:block bottom-8 -right-4 lg:right-6 w-20 h-20 lg:w-28 lg:h-28 opacity-65 will-change-transform cursor-pointer pointer-events-auto"
            style={{
              y: heroY3,
              ['--ball-light' as any]: '#FDEEE8',
              ['--ball-base' as any]: '#F8D8CC',
              ['--ball-dark' as any]: '#EBBFAA',
              ['--ball-shadow' as any]: 'rgba(231,111,81,0.24)',
              ['--ball-inset' as any]: 'rgba(226,143,114,0.32)',
            }}
            whileHover={bubbleHoverAnim}
            whileTap={bubbleTapAnim}
          />

          {/* 4. Bottom-Left Matcha Celadon Bubble */}
          <motion.div 
            className="clay-ball hidden sm:block bottom-6 left-2 lg:left-8 w-22 h-22 lg:w-28 lg:h-28 opacity-75 will-change-transform cursor-pointer pointer-events-auto"
            style={{
              y: heroY4,
              ['--ball-light' as any]: '#F5FAEA',
              ['--ball-base' as any]: '#DFEBDC',
              ['--ball-dark' as any]: '#C7DBC2',
              ['--ball-shadow' as any]: 'rgba(141,155,109,0.3)',
              ['--ball-inset' as any]: 'rgba(156,172,124,0.38)',
            }}
            whileHover={bubbleHoverAnim}
            whileTap={bubbleTapAnim}
          />

          {/* 5. Mid-Left Subtle Amber Bubble */}
          <motion.div 
            className="clay-ball hidden xl:block top-1/2 -left-8 w-16 h-16 opacity-55 will-change-transform cursor-pointer pointer-events-auto"
            style={{
              y: heroY5,
              ['--ball-light' as any]: '#FFF8EE',
              ['--ball-base' as any]: '#F6E5CC',
              ['--ball-dark' as any]: '#E8CEAA',
              ['--ball-shadow' as any]: 'rgba(185,133,78,0.25)',
              ['--ball-inset' as any]: 'rgba(195,148,95,0.35)',
            }}
            whileHover={bubbleHoverAnim}
            whileTap={bubbleTapAnim}
          />

          {/* 3D Clay Organic Curved Hero Widget with Recessed Slider */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
            <ClayHeroWidget
              config={config}
              onOpenStory={() => setIsStoryOpen(true)}
            />
          </div>
        </section>

        {/* SECTION 2: FACULTY & STAFF (کادر آموزشی و اجرایی) */}
        <FacultySection />

        {/* SECTION 4: EVENTS (رویدادها) */}
        <EventsSection />

        {/* SECTION 5: WORKSHOPS (کارگاه های مهارتی) */}
        <WorkshopsSection />

        {/* SECTION 6: CONTACT US & INQUIRY (تماس با ما) */}
        <ContactSection />
      </main>

      {/* Comprehensive Site Footer */}
      <SiteFooter
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Full School Introduction Modal ("معرفی مدرسه") */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* Clay Theme & Color Customizer Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onChange={setConfig}
      />
    </div>
  );
}
