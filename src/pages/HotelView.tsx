
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from '@/components/layout/AdminLayout';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';
import { useToast } from '@/hooks/use-toast';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';
import { HotelViewHeader, HotelViewAccordion, ErrorState } from '@/components/hotel/view';

const HotelView = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { toast } = useToast();
  const { allHotels } = useHotelNetwork();
  
  const { data: hotel, isLoading } = useQuery({
    queryKey: ['hotel', hotelId, allHotels],
    queryFn: () => {
      const foundHotel = allHotels.find(hotel => hotel.id === hotelId);
      if (!foundHotel) {
        throw new Error('Hotel not found');
      }
      return foundHotel;
    },
    enabled: !!hotelId && !!allHotels.length,
  });
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <HotelLoadingIndicator />
        </div>
      </AdminLayout>
    );
  }
  
  if (!hotel) {
    toast({
      title: "Error",
      description: "Failed to load hotel details. Please try again.",
      variant: "destructive",
    });
    
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <ErrorState />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-6 space-y-6">
        <HotelViewHeader hotel={hotel} />
        <HotelViewAccordion hotel={hotel} />
      </div>
    </AdminLayout>
  );
};

export default HotelView;
