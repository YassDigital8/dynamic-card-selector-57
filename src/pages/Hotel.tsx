
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HotelPage from '@/components/hotel/HotelPage';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Building } from 'lucide-react';
import { motion } from 'framer-motion';

const Hotel = () => {
  return (
    <StandardLayout>
      <div className="w-full h-full py-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BreadcrumbNav items={[
            { label: 'Hotel Network', icon: Building }
          ]} />
          <HotelPage />
        </motion.div>
      </div>
    </StandardLayout>
  );
};

export default Hotel;
