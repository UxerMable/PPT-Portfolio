import React, { useRef, useEffect, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: string; // Tailwind class, e.g., 'delay-100'
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = '', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${delay} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;