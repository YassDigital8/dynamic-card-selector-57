
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TourHighlight } from "./tour/tour-highlight";
import { TourContent } from "./tour/tour-content";
import { TourArrow } from "./tour/tour-arrow";
import { 
  calculateTooltipPosition, 
  getTooltipStyles,
  TargetPosition,
  TooltipPosition
} from "./tour/tour-position-utils";
import { useIsMobile } from "@/hooks/use-mobile";

export interface TourTooltipProps {
  step: number;
  totalSteps: number;
  title: string;
  content: React.ReactNode;
  targetRef: React.RefObject<HTMLElement>;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  position?: "top" | "bottom" | "left" | "right";
  isVisible: boolean;
  needsConfirmation?: boolean;
  onConfirm?: () => void;
}

export const TourTooltip: React.FC<TourTooltipProps> = ({
  step,
  totalSteps,
  title,
  content,
  targetRef,
  onNext,
  onPrev,
  onClose,
  position = "bottom",
  isVisible,
  needsConfirmation = false,
  onConfirm
}) => {
  const [tooltipPosition, setTooltipPosition] = React.useState<TooltipPosition>({
    top: 0,
    left: 0
  });
  
  const [highlightPosition, setHighlightPosition] = React.useState<TargetPosition>({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });

  const isMobile = useIsMobile();

  // Handle next click with prevention of event bubbling
  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Next button clicked");
    onNext();
  };

  // Handle previous click with prevention of event bubbling
  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Previous button clicked");
    onPrev();
  };

  // Handle close with prevention of event bubbling
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Close button clicked");
    onClose();
  };

  // Handle confirm with prevention of event bubbling
  const handleConfirmClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Confirm button clicked");
    if (onConfirm) {
      onConfirm();
    }
  };

  React.useEffect(() => {
    if (targetRef.current && isVisible) {
      const updatePosition = () => {
        const rect = targetRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Update highlight position
        setHighlightPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });

        // Calculate tooltip position based on target element and desired position
        const adjustedPosition = isMobile && (position === "left" || position === "right") ? "bottom" : position;
        setTooltipPosition(calculateTooltipPosition(rect, adjustedPosition));
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
  }, [targetRef, position, isVisible, isMobile]);

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  // Log positions for debugging
  React.useEffect(() => {
    if (isVisible) {
      console.log("Tooltip position:", tooltipPosition);
      console.log("Highlight position:", highlightPosition);
      console.log("Is mobile:", isMobile);
      console.log("Viewport size:", window.innerWidth, "x", window.innerHeight);
    }
  }, [tooltipPosition, highlightPosition, isVisible, isMobile]);

  if (!isVisible) {
    return null;
  }

  // Determine effective position based on device
  const effectivePosition = isMobile && (position === "left" || position === "right") ? "bottom" : position;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/30 z-[99] pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            // Allow clicking through the backdrop only if we don't need confirmation
            if (!needsConfirmation) {
              handleCloseClick(e);
            }
          }}
        >
          <TourHighlight position={highlightPosition} isVisible={isVisible} />

          <motion.div
            style={getTooltipStyles(tooltipPosition, effectivePosition)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            className="pointer-events-auto z-[100]"
            onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling to parent
          >
            <TourContent
              step={step}
              totalSteps={totalSteps}
              title={title}
              content={content}
              onNext={handleNextClick}
              onPrev={handlePrevClick}
              onClose={handleCloseClick}
              needsConfirmation={needsConfirmation}
              onConfirm={handleConfirmClick}
            />
            <TourArrow position={effectivePosition} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
