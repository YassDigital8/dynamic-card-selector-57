
import { AnimationProps } from 'framer-motion';

export const springConfig = {
  type: "spring" as const,
  stiffness: 280,
  damping: 24,
  mass: 0.9
};

export const cardVariants = {
  hover: { 
    y: -4, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  },
  tap: { 
    scale: 0.98, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25 
    }
  },
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: springConfig
  }
};

export const containerAnimation: AnimationProps = {
  variants: cardVariants,
  whileHover: "hover",
  whileTap: "tap",
  initial: "hidden",
  animate: "show",
  layout: true
};
