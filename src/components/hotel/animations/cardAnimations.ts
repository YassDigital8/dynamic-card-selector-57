
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
  hidden: { opacity: 0, y: 5 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: springConfig
  }
};

// Separate animation props for use with motion components
export const containerAnimation = {
  variants: cardVariants,
  whileHover: "hover",
  whileTap: "tap",
  initial: "hidden",
  animate: "show",
  layout: true
};

// Staggered children animation variants
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.05
    }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};
