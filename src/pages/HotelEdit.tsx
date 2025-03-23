
import React, { Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageContainer from '@/components/pages/index/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';

// Lazy load the HotelEditPage component
const HotelEditPage = React.lazy(() => import('@/components/hotel/edit/HotelEditPage'));

const HotelEditSkeleton = () => (
  <div className="w-full h-full p-4 space-y-6">
    <Skeleton className="h-12 w-60 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-lg" />
    <Skeleton className="h-[calc(100vh-160px)] w-full bg-indigo-100/30 dark:bg-indigo-900/5 rounded-xl" />
  </div>
);

const HotelEdit = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  
  // If no hotelId is provided, redirect to the hotel list
  if (!hotelId) {
    return <Navigate to="/hotel" replace />;
  }

  return (
    <PageContainer>
      <Suspense fallback={<HotelEditSkeleton />}>
        <HotelEditPage hotelId={hotelId} />
      </Suspense>
    </PageContainer>
  );
};

export default HotelEdit;
