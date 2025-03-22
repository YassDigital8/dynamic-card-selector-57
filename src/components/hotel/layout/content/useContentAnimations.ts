
import { useMemo } from 'react';

export const useContentAnimations = () => {
  // Animation variants for content transitions
  const contentVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      x: 10,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25
      }
    }
  }), []);

  return { contentVariants };
};

export default useContentAnimations;
