import type { Variants } from 'framer-motion';

/**
 * Container variant that staggers child cards/boxes
 * Default stagger: 100ms (0.10s), within the requested 80–120ms range.
 */
export const createContainerVariants = (
  staggerDelay = 0.12,
  delayChildren = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Card / Box variant with gentle fade-in and upward motion
 * Soft cubic-bezier easing for buttery smooth entrance
 */
export const createCardVariants = (shouldReduceMotion = false): Variants => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Section Header animation variant
 */
export const createHeaderVariants = (shouldReduceMotion = false): Variants => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Standard viewport options for scroll-triggering
 */
export const defaultViewport = {
  once: false,
  amount: 0.12,
  margin: '0px 0px -50px 0px',
};
