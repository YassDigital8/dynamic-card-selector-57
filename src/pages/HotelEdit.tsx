
import React from 'react';
import { Building, Hotel, PencilLine } from 'lucide-react';
import { HotelEditPage } from '@/components/hotel/edit';
import AdminLayout from '@/components/layout/AdminLayout';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { useParams } from 'react-router-dom';
import { useHotelNetwork } from '@/hooks/hotel/useHotelNetwork';

const HotelEdit = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { allHotels } = useHotelNetwork();
  
  // Find the current hotel name if available
  const hotelName = allHotels.find(h => h.id === hotelId)?.name || 'Edit Hotel';
  
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <BreadcrumbNav items={[
          { label: 'Hotel Network', href: '/hotel', icon: Building },
          { label: hotelName, href: `/hotel/view/${hotelId}`, icon: Hotel },
          { label: 'Edit', icon: PencilLine }
        ]} />
        <HotelEditPage />
      </div>
    </AdminLayout>
  );
};

export default HotelEdit;
