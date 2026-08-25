import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number; // delay in ms
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  staggerChildren?: number;
}

export function FadeInView({ 
  children, 
  delay = 0, 
  className = "", 
  threshold = 0.1,
  direction = 'up',
  staggerChildren
}: FadeInViewProps) {
  
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
      scale: 0.96,
      filter: 'blur(12px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.19, 1, 0.22, 1], // Custom cinematic easing
        delay: delay / 1000,
        staggerChildren: staggerChildren ? staggerChildren / 1000 : undefined
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: "0px 0px -50px 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
