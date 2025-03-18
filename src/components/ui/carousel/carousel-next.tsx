
import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCarousel } from "./carousel-context"
import { useIsMobile } from "@/hooks/use-mobile"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
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
            ? "right-1 top-1/2 -translate-y-1/2" 
            : "-right-4 sm:-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollNext && "opacity-50 pointer-events-none",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { CarouselNext }
