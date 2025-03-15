
import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

interface TourHighlightProps {
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  isVisible: boolean;
}

export const TourHighlight: React.FC<TourHighlightProps> = ({
  position,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Highlight effect around the target element */}
      <motion.div
        className="absolute rounded-md pointer-events-none"
        style={{
          top: position.top - 4,
          left: position.left - 4,
          width: position.width + 8,
          height: position.height + 8,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 15px 5px rgba(59, 130, 246, 0.8)",
          zIndex: 51
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Animated cursor pointer */}
      <motion.div
        className="absolute z-52 pointer-events-none"
        style={{
          top: position.top + position.height / 2,
          left: position.left + position.width / 2,
        }}
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ 
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <MousePointerClick className="h-8 w-8 text-white drop-shadow-lg" />
      </motion.div>
    </>
  );
};
