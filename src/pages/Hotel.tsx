
import React, { Suspense } from 'react';
import PageContainer from '@/components/pages/index/page-container';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar } from '@/components/ui/avatar';

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
  return (
    <PageContainer>
      <Suspense fallback={<HotelPageSkeleton />}>
        <HotelPage />
      </Suspense>
    </PageContainer>
  );
};

export default Hotel;
