
import type { ReactNode } from "react"
// Remove the embla-carousel import to fix the build error
// import type { EmblaOptionsType } from "embla-carousel"

export interface CarouselProps {
  opts?: any // Replace EmblaOptionsType with any to fix the build error
  plugins?: any[] // Replace EmblaPluginType[] with any[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: any) => void // Replace EmblaCarouselType with any
  children?: ReactNode
}

export interface CarouselContextProps extends Required<Pick<CarouselProps, "orientation">> {
  carouselRef: ReturnType<typeof useRef<HTMLElement>>
  api?: any // Replace EmblaCarouselType with any
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

export interface CarouselControlProps {
  orientation?: "horizontal" | "vertical"
  children?: ReactNode
}

