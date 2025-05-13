
import { ReactNode, useRef } from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: any;
  plugins?: any[];
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

export type CarouselApi = any;

export interface CarouselContextProps {
  carousel: ReturnType<typeof useRef<HTMLDivElement>>;
  api: CarouselApi;
  opts: any;
  orientation: 'horizontal' | 'vertical';
  slideCount: number;
  activeIndex: number;
}
