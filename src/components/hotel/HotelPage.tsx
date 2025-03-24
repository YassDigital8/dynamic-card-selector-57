
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HotelPageContainer from './HotelPageContainer';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Building } from 'lucide-react';

const HotelPage = () => {
  return (
    <StandardLayout>
      <div className="container mx-auto py-6">
        <BreadcrumbNav items={[
          { label: 'Hotel Network', icon: Building }
        ]} />
        <HotelPageContainer />
      </div>
    </StandardLayout>
  );
};

export default HotelPage;
