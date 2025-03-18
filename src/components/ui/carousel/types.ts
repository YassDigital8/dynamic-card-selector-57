
import { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel-react"

export interface CarouselProps {
  opts?: EmblaOptionsType
  plugins?: EmblaPluginType[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: EmblaCarouselType) => void
}

export interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement> | null
  api: EmblaCarouselType | undefined
  opts?: EmblaOptionsType
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  activeIndex: number
  slideCount: number
}
