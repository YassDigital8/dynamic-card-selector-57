
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HotelPage from '@/components/hotel/HotelPage';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Building, Home } from 'lucide-react';

const Hotel = () => {
  return (
    <StandardLayout>
      <div className="w-full h-full py-2">
        <BreadcrumbNav items={[
          { label: 'Home', icon: Home, href: '/' },
          { label: 'Hotel Network', icon: Building }
        ]} />
        <HotelPage />
      </div>
    </StandardLayout>
  );
};

export default Hotel;
