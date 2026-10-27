import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to trigger entrance animations once when an element enters the viewport.
 * Automatically respects `prefers-reduced-motion` for instant display.
 * 
 * @param {Object} options - IntersectionObserver configuration
 * @returns {[React.RefObject, boolean]}
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const elementRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;

    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Check if element is already in viewport on mount
    const rect = currentElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Only trigger once to avoid annoying re-animation during scroll
        observer.unobserve(entry.target);
      }
    }, {
      threshold,
      rootMargin
    });

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, isVisible]);

  return [elementRef, isVisible];
}
