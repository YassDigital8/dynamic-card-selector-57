
import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./carousel-context"

const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { api, slideCount, activeIndex } = useCarousel()

  const dots = React.useMemo(() => {
    return Array.from({ length: slideCount }).map((_, index) => {
      const isActive = activeIndex === index
      return { isActive, index }
    })
  }, [activeIndex, slideCount])

  return (
    <div 
      ref={ref}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {dots.map((dot) => (
        <button
          key={dot.index}
          type="button"
          onClick={() => api?.scrollTo(dot.index)}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            dot.isActive 
              ? "bg-purple-600 dark:bg-purple-400 w-3" 
              : "bg-gray-300 dark:bg-gray-600 hover:bg-purple-400 dark:hover:bg-purple-500"
          )}
          aria-label={`Go to slide ${dot.index + 1}`}
          aria-current={dot.isActive}
        />
      ))}
    </div>
  )
})
CarouselIndicators.displayName = "CarouselIndicators"

export { CarouselIndicators }
