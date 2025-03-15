
import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TourArrowProps {
  position: "top" | "bottom" | "left" | "right";
}

export const TourArrow: React.FC<TourArrowProps> = ({ position }) => {
  const isMobile = useIsMobile();
  
  // On mobile, adjust position for left/right to bottom
  const effectivePosition = isMobile && (position === "left" || position === "right") 
    ? "bottom" 
    : position;
  
  const getArrowStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "absolute",
      width: 0,
      height: 0,
      borderStyle: "solid",
    };

    switch (effectivePosition) {
      case "top":
        return {
          ...baseStyles,
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: "8px 8px 0 8px",
          borderColor: "white transparent transparent transparent",
        };
      case "bottom":
        return {
          ...baseStyles,
          top: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: "0 8px 8px 8px",
          borderColor: "transparent transparent white transparent",
        };
      case "left":
        return {
          ...baseStyles,
          right: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: "8px 0 8px 8px",
          borderColor: "transparent transparent transparent white",
        };
      case "right":
        return {
          ...baseStyles,
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: "8px 8px 8px 0",
          borderColor: "transparent white transparent transparent",
        };
      default:
        return baseStyles;
    }
  };

  return <motion.div style={getArrowStyles()} className="dark:border-gray-900" />;
};
