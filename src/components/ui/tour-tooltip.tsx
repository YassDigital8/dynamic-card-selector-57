
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Card } from "./card";
import { X } from "lucide-react";

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
  const [tooltipPosition, setTooltipPosition] = React.useState({
    top: 0,
    left: 0
  });

  React.useEffect(() => {
    if (targetRef.current && isVisible) {
      const updatePosition = () => {
        const rect = targetRef.current?.getBoundingClientRect();
        if (!rect) return;

        let top = 0;
        let left = 0;

        switch (position) {
          case "top":
            top = rect.top - 10;
            left = rect.left + rect.width / 2;
            break;
          case "bottom":
            top = rect.bottom + 10;
            left = rect.left + rect.width / 2;
            break;
          case "left":
            top = rect.top + rect.height / 2;
            left = rect.left - 10;
            break;
          case "right":
            top = rect.top + rect.height / 2;
            left = rect.right + 10;
            break;
        }

        setTooltipPosition({ top, left });
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    }
  }, [targetRef, position, isVisible]);

  const getTooltipStyles = () => {
    const baseStyles = {
      position: "fixed",
      zIndex: 100,
      transform: "translate(-50%, -50%)",
      maxWidth: "320px",
      width: "100%"
    } as React.CSSProperties;

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          top: tooltipPosition.top - 100,
          left: tooltipPosition.left,
          transform: "translate(-50%, 0)"
        };
      case "bottom":
        return {
          ...baseStyles,
          top: tooltipPosition.top + 30,
          left: tooltipPosition.left,
          transform: "translate(-50%, 0)"
        };
      case "left":
        return {
          ...baseStyles,
          top: tooltipPosition.top,
          left: tooltipPosition.left - 180,
          transform: "translate(0, -50%)"
        };
      case "right":
        return {
          ...baseStyles,
          top: tooltipPosition.top,
          left: tooltipPosition.left + 180,
          transform: "translate(0, -50%)"
        };
      default:
        return baseStyles;
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

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
          <motion.div
            style={getTooltipStyles()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            className="pointer-events-auto"
          >
            <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                  onClick={onClose}
                >
                  <X size={14} />
                </Button>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {title}
                  </h3>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {content}
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Step {step + 1} of {totalSteps}
                  </div>
                  <div className="flex gap-2">
                    {step > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onPrev}
                      >
                        Previous
                      </Button>
                    )}
                    {step < totalSteps - 1 ? (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={onNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={onClose}
                      >
                        Finish
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div style={getArrowStyles()} />
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
