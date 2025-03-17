
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelForm from './HotelForm';
import { HotelFormData } from '@/models/HotelModel';

interface HotelAddFormProps {
  isLoading: boolean;
  onSubmit: (data: HotelFormData) => void;
  selectedPOS: string;
  posName?: string;
}

const HotelAddForm: React.FC<HotelAddFormProps> = ({
  isLoading,
  onSubmit,
  selectedPOS,
  posName
}) => {
  return (
    <motion.div
      key="add-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-blue-100 dark:border-blue-900 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          Add New Hotel {selectedPOS && selectedPOS !== 'all' && posName ? `(${posName})` : ''}
        </h2>
        <HotelForm onSubmit={onSubmit} isLoading={isLoading} />
      </Card>
    </motion.div>
  );
};

export default HotelAddForm;
