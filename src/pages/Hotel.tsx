
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HotelPage from '@/components/hotel/HotelPage';
import { Building } from 'lucide-react';

const Hotel = () => {
  return (
    <StandardLayout 
      pageTitle="Hotel Network"
      pageDescription="Manage hotels and accommodations"
    >
      <div className="w-full h-full py-2">
        <HotelPage />
      </div>
    </StandardLayout>
  );
};

export default Hotel;
