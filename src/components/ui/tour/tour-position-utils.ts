
export interface TargetPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TooltipPosition {
  top: number;
  left: number;
}

export const calculateTooltipPosition = (
  targetRect: DOMRect,
  position: "top" | "bottom" | "left" | "right"
): TooltipPosition => {
  let top = 0;
  let left = 0;
  
  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;

  // On mobile, prefer top/bottom positioning
  const effectivePosition = isMobile && (position === "left" || position === "right") 
    ? "bottom" 
    : position;

  switch (effectivePosition) {
    case "top":
      top = targetRect.top - 10;
      left = targetRect.left + targetRect.width / 2;
      break;
    case "bottom":
      top = targetRect.bottom + 10;
      left = targetRect.left + targetRect.width / 2;
      break;
    case "left":
      top = targetRect.top + targetRect.height / 2;
      left = targetRect.left - 10;
      break;
    case "right":
      top = targetRect.top + targetRect.height / 2;
      left = targetRect.right + 10;
      break;
  }

  return { top, left };
};

export const getTooltipStyles = (
  tooltipPosition: TooltipPosition,
  position: "top" | "bottom" | "left" | "right"
): React.CSSProperties => {
  const isMobile = window.innerWidth < 768;
  const maxWidth = isMobile ? window.innerWidth * 0.85 : 320;
  
  // On mobile, prefer top/bottom positioning
  const effectivePosition = isMobile && (position === "left" || position === "right") 
    ? "bottom" 
    : position;
  
  const baseStyles = {
    position: "fixed",
    zIndex: 100,
    transform: "translate(-50%, -50%)",
    maxWidth: `${maxWidth}px`,
    width: "100%"
  } as React.CSSProperties;

  switch (effectivePosition) {
    case "top":
      return {
        ...baseStyles,
        top: tooltipPosition.top - (isMobile ? 80 : 100),
        left: tooltipPosition.left,
        transform: "translate(-50%, 0)"
      };
    case "bottom":
      return {
        ...baseStyles,
        top: tooltipPosition.top + (isMobile ? 20 : 30),
        left: tooltipPosition.left,
        transform: "translate(-50%, 0)"
      };
    case "left":
      return {
        ...baseStyles,
        top: tooltipPosition.top,
        left: tooltipPosition.left - (isMobile ? 120 : 180),
        transform: "translate(0, -50%)"
      };
    case "right":
      return {
        ...baseStyles,
        top: tooltipPosition.top,
        left: tooltipPosition.left + (isMobile ? 120 : 180),
        transform: "translate(0, -50%)"
      };
    default:
      return baseStyles;
  }
};
