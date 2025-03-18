
import React from "react";
import { cn } from "@/lib/utils";
import { useCarousel } from "./carousel-context";

interface CarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "dots" | "bars" | "numbers";
}

export const CarouselIndicators = ({
  className,
  variant = "dots",
  ...props
}: CarouselIndicatorsProps) => {
  const { api, activeIndex, slideCount } = useCarousel();

  const handleIndicatorClick = (idx: number) => {
    api?.scrollTo(idx);
  };

  const renderIndicators = () => {
    return Array.from({ length: slideCount }).map((_, idx) => {
      const isActive = idx === activeIndex;

      // Different variants
      if (variant === "numbers") {
        return (
          <button
            key={idx}
            onClick={() => handleIndicatorClick(idx)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
            aria-current={isActive ? "true" : "false"}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx + 1}
          </button>
        );
      }

      if (variant === "bars") {
        return (
          <button
            key={idx}
            onClick={() => handleIndicatorClick(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              isActive
                ? "w-8 bg-primary"
                : "w-4 bg-muted hover:bg-muted/80 hover:w-6"
            )}
            aria-current={isActive ? "true" : "false"}
            aria-label={`Go to slide ${idx + 1}`}
          />
        );
      }

      // Default dots
      return (
        <button
          key={idx}
          onClick={() => handleIndicatorClick(idx)}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            isActive
              ? "bg-primary"
              : "bg-muted hover:bg-muted/80"
          )}
          aria-current={isActive ? "true" : "false"}
          aria-label={`Go to slide ${idx + 1}`}
        />
      );
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2 justify-center mt-3",
        variant === "bars" && "h-1.5",
        className
      )}
      {...props}
    >
      {renderIndicators()}
    </div>
  );
};
