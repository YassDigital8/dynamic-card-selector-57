
import React from 'react';
import { motion } from 'framer-motion';
import { ContractDocument } from '@/models/HotelModel';
import { CommercialDealsView } from '../commercial';

interface CarouselItemCommercialProps {
  contractDocuments?: ContractDocument[];
  itemVariants: any;
}

const CarouselItemCommercial: React.FC<CarouselItemCommercialProps> = ({
  contractDocuments = [],
  itemVariants
}) => {
  return (
    <div className="h-full flex items-center justify-center p-3 sm:p-6">
      <motion.div
        variants={itemVariants}
        className="space-y-4 w-full"
      >
        <CommercialDealsView 
          contractDocuments={contractDocuments} 
        />
      </motion.div>
    </div>
  );
};

export default CarouselItemCommercial;
