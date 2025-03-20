
import React, { Suspense } from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the HotelPage component
const HotelPage = React.lazy(() => import('@/components/hotel/HotelPage'));

const HotelPageSkeleton = () => (
  <div className="w-full h-full p-4 space-y-6">
    <Skeleton className="h-12 w-60 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-lg" />
    <div className="flex flex-col sm:flex-row gap-4 h-[calc(100vh-160px)]">
      <Skeleton className="h-full w-full sm:w-2/5 bg-indigo-100/40 dark:bg-indigo-900/10 rounded-xl" />
      <Skeleton className="h-full w-full sm:w-3/5 bg-indigo-100/30 dark:bg-indigo-900/5 rounded-xl" />
    </div>
  </div>
);

const Hotel = () => {
  return (
    <PageContainer>
      <Suspense fallback={<HotelPageSkeleton />}>
        <HotelPage />
      </Suspense>
    </PageContainer>
  );
};

export default Hotel;
