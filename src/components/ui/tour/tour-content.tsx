
import React from "react";
import { Button } from "../button";
import { Card } from "../card";
import { X } from "lucide-react";

interface TourContentProps {
  step: number;
  totalSteps: number;
  title: string;
  content: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

export const TourContent: React.FC<TourContentProps> = ({
  step,
  totalSteps,
  title,
  content,
  onNext,
  onPrev,
  onClose
}) => {
  return (
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
    </Card>
  );
};
