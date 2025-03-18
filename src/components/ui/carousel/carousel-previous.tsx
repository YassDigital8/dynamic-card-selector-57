
import * as React from "react"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCarousel } from "./carousel-context"
import { useIsMobile } from "@/hooks/use-mobile"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, activeIndex, slideCount } = useCarousel()
  const isMobile = useIsMobile()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full shadow-md bg-background/90 backdrop-blur-sm border-border",
        orientation === "horizontal"
          ? isMobile 
            ? "left-1 top-1/2 -translate-y-1/2" 
            : "-left-4 sm:-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollPrev && "opacity-50 pointer-events-none",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      aria-controls="carousel-items"
      aria-disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

export { CarouselPrevious }
