import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 85%', 'end 50%'],
  });

  const words = text.split(' ');

  return (
    <div ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const filter = useTransform(progress, range, ['blur(8px)', 'blur(0px)']);
  
  return (
    <span className="relative mr-[0.25em] mt-[0.15em] inline-block">
      <motion.span style={{ opacity, y, filter }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};
