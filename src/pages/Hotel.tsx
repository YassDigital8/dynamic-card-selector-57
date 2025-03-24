
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import { HotelPage } from '@/components/hotel/HotelPage';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Building } from 'lucide-react';

const Hotel = () => {
  return (
    <StandardLayout>
      <div className="container mx-auto py-6">
        <BreadcrumbNav items={[
          { label: 'Hotel Network', icon: Building }
        ]} />
        <HotelPage />
      </div>
    </StandardLayout>
  );
};

export default Hotel;
