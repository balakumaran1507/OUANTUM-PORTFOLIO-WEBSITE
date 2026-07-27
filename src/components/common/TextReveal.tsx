import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  stagger?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * TextReveal, words clip upward from behind an overflow:hidden mask.
 * Triggers once when the element scrolls into view (IntersectionObserver).
 */
const TextReveal = ({
  children,
  delay = 0,
  duration = 0.65,
  stagger = 0.05,
  style,
  className,
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '0.28em',
        rowGap: '0.1em',
        ...style,
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 1.15 }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
