
import type { UseEmblaCarouselType } from "embla-carousel-react"
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel"

export type CarouselApi = UseEmblaCarouselType[1]

export interface CarouselProps {
  opts?: EmblaOptionsType
  plugins?: EmblaPluginType[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement>
  api: CarouselApi
  opts?: EmblaOptionsType
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  activeIndex: number
  slideCount: number
}
