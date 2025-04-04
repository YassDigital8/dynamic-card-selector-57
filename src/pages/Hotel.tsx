
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HotelPage from '@/components/hotel/HotelPage';

const Hotel = () => {
  return (
    <StandardLayout 
      pageTitle="Hotel"
      pageDescription="Manage hotels and accommodations"
    >
      <div className="w-full h-full py-2">
        <HotelPage />
      </div>
    </StandardLayout>
  );
};

export default Hotel;
