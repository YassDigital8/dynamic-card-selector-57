
import React from 'react';
import { Building, Hotel, PencilLine } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';
import HotelEditPage from '@/components/hotel/edit/HotelEditPage';
import StandardLayout from '@/components/layout/StandardLayout';

const HotelEdit = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { allHotels } = useHotelNetwork();
  
  // Find the current hotel name if available
  const hotelName = allHotels.find(h => h.id === hotelId)?.name || 'Edit Hotel';
  
  return (
    <StandardLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>Hotel Network</span>
          <span className="mx-1">/</span>
          <Hotel className="h-4 w-4" />
          <span>{hotelName}</span>
          <span className="mx-1">/</span>
          <PencilLine className="h-4 w-4" />
          <span>Edit</span>
        </div>
        {hotelId && <HotelEditPage hotelId={hotelId} />}
      </div>
    </StandardLayout>
  );
};

export default HotelEdit;
