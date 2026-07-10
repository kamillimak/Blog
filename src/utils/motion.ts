export const respectReducedMotion = false;

export const shouldReduceMotion = () =>
  respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
