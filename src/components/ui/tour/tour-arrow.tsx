
import React from "react";

interface TourArrowProps {
  position: "top" | "bottom" | "left" | "right";
}

export const TourArrow: React.FC<TourArrowProps> = ({ position }) => {
  const getArrowStyles = () => {
    const baseStyles = {
      position: "absolute",
      width: 0,
      height: 0,
      borderStyle: "solid"
    } as React.CSSProperties;

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: "10px 10px 0 10px",
          borderColor: "white transparent transparent transparent"
        };
      case "bottom":
        return {
          ...baseStyles,
          top: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: "0 10px 10px 10px",
          borderColor: "transparent transparent white transparent"
        };
      case "left":
        return {
          ...baseStyles,
          right: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: "10px 0 10px 10px",
          borderColor: "transparent transparent transparent white"
        };
      case "right":
        return {
          ...baseStyles,
          left: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: "10px 10px 10px 0",
          borderColor: "transparent white transparent transparent"
        };
      default:
        return baseStyles;
    }
  };

  return <div style={getArrowStyles()} />;
};
