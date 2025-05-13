
import * as React from 'react';
import { cn } from '@/lib/utils';
import { type CarouselApi, type CarouselContextProps, type CarouselProps } from './types';

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = 'horizontal', opts, setApi, className, children, ...props }, ref) => {
    const [carouselRef, api] = React.useState<CarouselApi | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [slideCount, setSlideCount] = React.useState(0);
    
    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);
    
    React.useEffect(() => {
      if (!api) return;
      
      // Set the slide count
      setSlideCount(api.slideNodes().length);
      
      // Set initial active index
      setActiveIndex(api.selectedScrollSnap());
      
      // Subscribe to scroll events
      api.on('select', () => {
        setActiveIndex(api.selectedScrollSnap());
      });
    }, [api]);

    const contextValue = React.useMemo<CarouselContextProps>(
      () => ({
        carousel: carouselRef,
        api,
        opts,
        orientation,
        slideCount,
        activeIndex,
      }),
      [carouselRef, api, opts, orientation, slideCount, activeIndex]
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

export { Carousel };
