import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  as: Element = 'div',
  className = '',
  delay = 0,
  children,
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => (
    typeof window === 'undefined' || !('IntersectionObserver' in window)
  ));

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={elementRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Element>
  );
}
