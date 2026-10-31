import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';

/**
 * Animated numerical counter that triggers when scrolled into view.
 * Accessible for screen readers via aria-label with the final value.
 */
export function AnimatedStatNumber({ value, suffix = '', prefix = '', className = '', duration = 1200 }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const count = useCountUp(typeof value === 'number' ? value : parseInt(value, 10) || 0, isVisible, duration);

  const displayString = `${prefix}${count}${suffix}`;
  const finalString = `${prefix}${value}${suffix}`;

  return (
    <span
      ref={ref}
      aria-label={finalString}
      className={`tabular-nums font-extrabold ${className}`}
    >
      {displayString}
    </span>
  );
}

