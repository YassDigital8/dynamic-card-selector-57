
import { ReactNode } from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: any;
  plugins?: any[];
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

export type CarouselApi = {
  slideNodes: () => HTMLElement[];
  selectedScrollSnap: () => number;
  on: (event: string, callback: () => void) => void;
  scrollNext: () => void;
  scrollPrev: () => void;
  canScrollNext: () => boolean;
  canScrollPrev: () => boolean;
  scrollTo: (index: number) => void; // <-- Added scrollTo method
}

export interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement>;
  api: CarouselApi | null;
  opts: any;
  orientation: 'horizontal' | 'vertical';
  slideCount: number;
  activeIndex: number;
  scrollNext: () => void;
  scrollPrev: () => void;
  canScrollNext: boolean;
  canScrollPrev: boolean;
}
