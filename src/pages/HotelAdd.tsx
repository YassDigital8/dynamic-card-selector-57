
import React from 'react';
import { Hotel, Building } from 'lucide-react';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { HotelAddPage } from '@/components/hotel/add';
import StandardLayout from '@/components/layout/StandardLayout';

const HotelAdd = () => {
  return (
    <StandardLayout>
      <div className="container mx-auto py-4">
        <BreadcrumbNav items={[
          { label: 'Hotel Network', href: '/hotel', icon: Building },
          { label: 'Add New Hotel', icon: Hotel }
        ]} />
        <HotelAddPage />
      </div>
    </StandardLayout>
  );
};

export default HotelAdd;
