
import React, { Suspense } from 'react';
import PageContainer from '@/components/pages/index/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';

// Lazy load the HotelAddPage component
const HotelAddPage = React.lazy(() => import('@/components/hotel/add/HotelAddPage'));

const HotelAddSkeleton = () => (
  <div className="w-full h-full p-4 space-y-6">
    <Skeleton className="h-12 w-60 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-lg" />
    <Skeleton className="h-[calc(100vh-160px)] w-full bg-indigo-100/30 dark:bg-indigo-900/5 rounded-xl" />
  </div>
);

const HotelAdd = () => {
  return (
    <PageContainer>
      <Suspense fallback={<HotelAddSkeleton />}>
        <HotelAddPage />
      </Suspense>
    </PageContainer>
  );
};

export default HotelAdd;
