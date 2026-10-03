import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const ClaySectionBubbles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle 3D spatial parallax drift (gentle, tactile, and natural)
  const yBall1 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-32, 38]);
  const yBall2 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [28, -32]);
  const yBall3 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-22, 28]);
  const yBall4 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [32, -26]);

  const bubbleHoverAnim = {
    scale: 1.15,
    opacity: 0.95,
    zIndex: 25,
    transition: {
      type: 'spring' as const,
      stiffness: 420,
      damping: 10,
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

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 1. Unified 3D Matcha Clay Ball (Top-Right) */}
      <motion.div 
        className="clay-ball hidden sm:block top-6 -right-6 lg:-right-10 w-24 h-24 lg:w-32 lg:h-32 opacity-75 will-change-transform cursor-pointer pointer-events-auto"
        style={{
          y: yBall1,
          ['--ball-light' as any]: '#F5FAEA',
          ['--ball-base' as any]: '#DFEBDC',
          ['--ball-dark' as any]: '#C7DBC2',
          ['--ball-shadow' as any]: 'rgba(141,155,109,0.32)',
          ['--ball-inset' as any]: 'rgba(156,172,124,0.4)',
        }}
        whileHover={bubbleHoverAnim}
        whileTap={bubbleTapAnim}
      />

      {/* 2. Unified 3D Warm Peach Clay Ball (Top-Left) */}
      <motion.div 
        className="clay-ball hidden sm:block top-8 -left-6 lg:-left-10 w-20 h-20 lg:w-28 lg:h-28 opacity-70 will-change-transform cursor-pointer pointer-events-auto"
        style={{
          y: yBall2,
          ['--ball-light' as any]: '#FDEEE8',
          ['--ball-base' as any]: '#F8D8CC',
          ['--ball-dark' as any]: '#EBBFAA',
          ['--ball-shadow' as any]: 'rgba(231,111,81,0.25)',
          ['--ball-inset' as any]: 'rgba(226,143,114,0.35)',
        }}
        whileHover={bubbleHoverAnim}
        whileTap={bubbleTapAnim}
      />

      {/* 3. Unified 3D Coral/Peach Accent Ball (Bottom-Right) */}
      <motion.div 
        className="clay-ball hidden sm:block bottom-8 -right-4 lg:right-6 w-18 h-18 lg:w-24 lg:h-24 opacity-65 will-change-transform cursor-pointer pointer-events-auto"
        style={{
          y: yBall3,
          ['--ball-light' as any]: '#FDEEE8',
          ['--ball-base' as any]: '#F8D8CC',
          ['--ball-dark' as any]: '#EBBFAA',
          ['--ball-shadow' as any]: 'rgba(231,111,81,0.24)',
          ['--ball-inset' as any]: 'rgba(226,143,114,0.32)',
        }}
        whileHover={bubbleHoverAnim}
        whileTap={bubbleTapAnim}
      />

      {/* 4. Unified 3D Matcha Celadon Ball (Bottom-Left) */}
      <motion.div 
        className="clay-ball hidden sm:block bottom-6 left-2 lg:left-8 w-20 h-20 lg:w-26 lg:h-26 opacity-75 will-change-transform cursor-pointer pointer-events-auto"
        style={{
          y: yBall4,
          ['--ball-light' as any]: '#F5FAEA',
          ['--ball-base' as any]: '#DFEBDC',
          ['--ball-dark' as any]: '#C7DBC2',
          ['--ball-shadow' as any]: 'rgba(141,155,109,0.3)',
          ['--ball-inset' as any]: 'rgba(156,172,124,0.38)',
        }}
        whileHover={bubbleHoverAnim}
        whileTap={bubbleTapAnim}
      />
    </div>
  );
};
