import { useEffect, useState, useRef } from 'react';

const StatsCounter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasStarted = useRef(false);

  const startCountUp = () => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const currentElement = elementRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startCountUp();
        }
      },
      { threshold: 0.1 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return (
    <span ref={elementRef} className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-brand-orange-light text-glow-orange tracking-tight">
      {count}{suffix}
    </span>
  );
};

export default StatsCounter;
