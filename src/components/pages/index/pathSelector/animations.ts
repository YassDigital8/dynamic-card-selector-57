
export const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
};

export const buttonVariants = {
  hover: { 
    scale: 1.03,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    scale: 0.97
  }
};
