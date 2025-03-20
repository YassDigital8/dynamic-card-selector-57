
import React, { lazy, Suspense } from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the HotelPage component to improve initial page load
const HotelPage = lazy(() => import('@/components/hotel/HotelPage'));

const LoadingSkeleton = () => (
  <div className="container mx-auto py-6 space-y-6">
    <Skeleton className="h-12 w-full md:w-3/4 rounded-lg" />
    <div className="grid grid-cols-1 gap-6">
      <Skeleton className="h-[calc(100vh-200px)] rounded-lg" />
    </div>
  </div>
);

const Hotel = () => {
  return (
    <PageContainer>
      <Suspense fallback={<LoadingSkeleton />}>
        <HotelPage />
      </Suspense>
    </PageContainer>
  );
};

export default Hotel;
