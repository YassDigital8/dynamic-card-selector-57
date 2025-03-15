
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
  const isMobile = window.innerWidth < 640; // Using Tailwind's sm breakpoint

  // On mobile, prefer top/bottom positioning
  const effectivePosition = isMobile && (position === "left" || position === "right") 
    ? "bottom" 
    : position;

  // Calculate scroll position
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollX = window.scrollX || document.documentElement.scrollLeft;

  // Add scroll position to rect coordinates to get absolute position
  const absoluteTop = targetRect.top + scrollY;
  const absoluteLeft = targetRect.left + scrollX;

  switch (effectivePosition) {
    case "top":
      top = absoluteTop - 10;
      left = absoluteLeft + targetRect.width / 2;
      break;
    case "bottom":
      top = absoluteTop + targetRect.height + 10;
      left = absoluteLeft + targetRect.width / 2;
      break;
    case "left":
      top = absoluteTop + targetRect.height / 2;
      left = absoluteLeft - 10;
      break;
    case "right":
      top = absoluteTop + targetRect.height / 2;
      left = absoluteLeft + targetRect.width + 10;
      break;
  }

  return { top, left };
};

export const getTooltipStyles = (
  tooltipPosition: TooltipPosition,
  position: "top" | "bottom" | "left" | "right"
): React.CSSProperties => {
  const isMobile = window.innerWidth < 640; // Using Tailwind's sm breakpoint
  const maxWidth = isMobile ? window.innerWidth * 0.9 : 350;
  
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

  // Calculate viewport dimensions
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Adjust position to ensure tooltip stays within viewport bounds
  let top = tooltipPosition.top;
  let left = tooltipPosition.left;
  const buffer = 20; // Buffer space from viewport edges
  
  switch (effectivePosition) {
    case "top":
      // Ensure tooltip doesn't go above viewport
      top = Math.max(tooltipPosition.top - (isMobile ? 80 : 100), buffer);
      left = tooltipPosition.left;
      
      // Ensure tooltip doesn't go off sides of viewport
      if (left - maxWidth/2 < buffer) left = maxWidth/2 + buffer;
      if (left + maxWidth/2 > viewportWidth - buffer) left = viewportWidth - maxWidth/2 - buffer;
      
      return {
        ...baseStyles,
        top: top,
        left: left,
        transform: "translate(-50%, 0)"
      };
    case "bottom":
      // Ensure tooltip doesn't go below viewport
      top = Math.min(tooltipPosition.top + (isMobile ? 20 : 30), viewportHeight - buffer);
      left = tooltipPosition.left;
      
      // Ensure tooltip doesn't go off sides of viewport
      if (left - maxWidth/2 < buffer) left = maxWidth/2 + buffer;
      if (left + maxWidth/2 > viewportWidth - buffer) left = viewportWidth - maxWidth/2 - buffer;
      
      return {
        ...baseStyles,
        top: top,
        left: left,
        transform: "translate(-50%, 0)"
      };
    case "left":
      top = tooltipPosition.top;
      left = tooltipPosition.left - (isMobile ? 120 : 180);
      
      // Ensure tooltip doesn't go off left side of viewport
      if (left < buffer) left = buffer;
      
      return {
        ...baseStyles,
        top: top,
        left: left,
        transform: "translate(0, -50%)"
      };
    case "right":
      top = tooltipPosition.top;
      left = tooltipPosition.left + (isMobile ? 120 : 180);
      
      // Ensure tooltip doesn't go off right side of viewport
      if (left + maxWidth > viewportWidth - buffer) left = viewportWidth - maxWidth - buffer;
      
      return {
        ...baseStyles,
        top: top,
        left: left,
        transform: "translate(0, -50%)"
      };
    default:
      return baseStyles;
  }
};
