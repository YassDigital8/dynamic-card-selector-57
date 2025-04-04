
import React from 'react';
import { Hotel, Building } from 'lucide-react';
import { HotelAddPage } from '@/components/hotel/add';
import StandardLayout from '@/components/layout/StandardLayout';

const HotelAdd = () => {
  return (
    <StandardLayout>
      <div className="container mx-auto py-4">
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>Hotel Network</span>
          <span className="mx-1">/</span>
          <Hotel className="h-4 w-4" />
          <span>Add New Hotel</span>
        </div>
        <HotelAddPage />
      </div>
    </StandardLayout>
  );
};

export default HotelAdd;
