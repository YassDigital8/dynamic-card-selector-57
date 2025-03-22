
import React, { Suspense, useState, useEffect } from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';

// Lazy load the HotelPage component
const HotelPage = React.lazy(() => import('@/components/hotel/HotelPage'));

const HotelPageSkeleton = () => (
  <div className="w-full h-full p-4 space-y-6">
    <Skeleton className="h-12 w-60 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-lg" />
    <div className="flex flex-col sm:flex-row gap-4 h-[calc(100vh-160px)]">
      <div className="h-full w-full sm:w-2/5 lg:w-1/3 p-2">
        <Skeleton className="h-full w-full bg-indigo-100/40 dark:bg-indigo-900/10 rounded-xl" />
      </div>
      <div className="h-full w-full sm:w-3/5 lg:w-2/3 p-2">
        <Skeleton className="h-full w-full bg-indigo-100/30 dark:bg-indigo-900/5 rounded-xl">
          <div className="p-6 flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full bg-indigo-100/60 dark:bg-indigo-900/20" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 bg-indigo-100/60 dark:bg-indigo-900/20 rounded" />
              <Skeleton className="h-4 w-28 bg-indigo-100/50 dark:bg-indigo-900/15 rounded" />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  </div>
);

const Hotel = () => {
  // Track if the component has mounted
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    console.log('Hotel page mounting');
    // Set mounted state after a short delay to ensure all hooks have initialized
    const timer = setTimeout(() => {
      console.log('Hotel page now marked as mounted');
      setIsMounted(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isMounted) {
    console.log('Showing loading indicator while mounting');
    return (
      <PageContainer>
        <HotelLoadingIndicator message="Initializing hotel module..." />
      </PageContainer>
    );
  }

  console.log('Rendering full hotel page component');
  return (
    <PageContainer>
      <Suspense fallback={<HotelPageSkeleton />}>
        <HotelPage />
      </Suspense>
    </PageContainer>
  );
};

export default Hotel;
