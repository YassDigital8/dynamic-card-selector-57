
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HotelLoadingIndicator from '@/components/hotel/HotelLoadingIndicator';
import { useToast } from '@/hooks/use-toast';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';
import { HotelViewHeader, HotelViewAccordion, ErrorState } from '@/components/hotel/view';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Building, Hotel } from 'lucide-react';
import StandardLayout from '@/components/layout/StandardLayout';

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
      <StandardLayout>
        <div className="container mx-auto py-6">
          <BreadcrumbNav items={[
            { label: 'Hotel Network', href: '/hotel', icon: Building },
            { label: 'Loading...', icon: Hotel }
          ]} />
          <HotelLoadingIndicator />
        </div>
      </StandardLayout>
    );
  }
  
  if (!hotel) {
    toast({
      title: "Error",
      description: "Failed to load hotel details. Please try again.",
      variant: "destructive",
    });
    
    return (
      <StandardLayout>
        <div className="container mx-auto py-6">
          <BreadcrumbNav items={[
            { label: 'Hotel Network', href: '/hotel', icon: Building },
            { label: 'Hotel Not Found', icon: Hotel }
          ]} />
          <ErrorState />
        </div>
      </StandardLayout>
    );
  }
  
  return (
    <StandardLayout>
      <div className="container mx-auto py-6 space-y-6">
        <BreadcrumbNav items={[
          { label: 'Hotel Network', href: '/hotel', icon: Building },
          { label: hotel.name || 'Hotel Details', icon: Hotel }
        ]} />
        <HotelViewHeader hotel={hotel} />
        <HotelViewAccordion hotel={hotel} />
      </div>
    </StandardLayout>
  );
};

export default HotelView;
