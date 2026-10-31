import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ScrollRevealCard
 * Wraps content with an IntersectionObserver trigger that gracefully fades and rises on entry.
 * Adds subtle medical hover lift and refined glow transition.
 */
export function ScrollRevealCard({
  children,
  delay = 0,
  className = '',
  hoverEffect = true,
  threshold = 0.1
}) {
  const [ref, isVisible] = useScrollReveal({ threshold });

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      style={delayStyle}
      className={`reveal-init ${isVisible ? 'reveal-active' : ''} ${
        hoverEffect ? 'medical-card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

