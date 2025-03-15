
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
  isVisible
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
        setTooltipPosition(calculateTooltipPosition(rect, position));
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
  }, [targetRef, position, isVisible]);

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            // Allow clicking through the backdrop
          }}
        >
          <TourHighlight position={highlightPosition} isVisible={isVisible} />

          <motion.div
            style={getTooltipStyles(tooltipPosition, position)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            className="pointer-events-auto"
          >
            <TourContent
              step={step}
              totalSteps={totalSteps}
              title={title}
              content={content}
              onNext={onNext}
              onPrev={onPrev}
              onClose={onClose}
            />
            <TourArrow position={position} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
