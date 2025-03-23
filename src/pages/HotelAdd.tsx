
import React from 'react';
import { Hotel, Building } from 'lucide-react';
import { HotelAddPage } from '@/components/hotel/add';
import AdminLayout from '@/components/layout/AdminLayout';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';

const HotelAdd = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <BreadcrumbNav items={[
          { label: 'Hotel Network', href: '/hotel', icon: Building },
          { label: 'Add New Hotel', icon: Hotel }
        ]} />
        <HotelAddPage />
      </div>
    </AdminLayout>
  );
};

export default HotelAdd;
