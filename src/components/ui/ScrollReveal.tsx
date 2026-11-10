import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setIsVisible(true), delayMs);
          } else {
            setIsVisible(true);
          }
          observer.disconnect(); // Disconnect immediately once revealed
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.08,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [delayMs]);

  return (
    <div
      ref={elementRef}
      className={`reveal-init ${isVisible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
