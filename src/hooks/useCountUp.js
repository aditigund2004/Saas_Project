import { useState, useEffect } from 'react';

/**
 * Animated counter hook that smoothly counts up to target value.
 * Immediately renders target if prefers-reduced-motion is true.
 *
 * @param {number} target - Numerical target
 * @param {boolean} shouldStart - Boolean flag (e.g. from isVisible)
 * @param {number} duration - Total animation time in ms
 * @returns {number} Current animated value
 */
export function useCountUp(target, shouldStart = true, duration = 1200) {
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return target;
    }
    return 0;
  });

  useEffect(() => {
    if (!shouldStart) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, shouldStart, duration]);

  return count;
}

