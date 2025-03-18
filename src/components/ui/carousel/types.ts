
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import { UseEmblaCarouselType } from "embla-carousel-react"

export interface CarouselProps {
  opts?: EmblaOptionsType
  plugins?: EmblaPluginType[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: UseEmblaCarouselType[1]) => void
}

export interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement> | null
  api: UseEmblaCarouselType[1] | undefined
  opts?: EmblaOptionsType
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  activeIndex: number
  slideCount: number
}

// Export type for use in other components
export type CarouselApi = UseEmblaCarouselType[1]
