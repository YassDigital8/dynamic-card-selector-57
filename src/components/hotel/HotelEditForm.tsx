
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HotelForm from './HotelForm';
import { Hotel, HotelFormData } from '@/models/HotelModel';

interface HotelEditFormProps {
  selectedHotel: Hotel;
  isLoading: boolean;
  onSubmit: (data: HotelFormData) => void;
  onCancel: () => void;
}

const HotelEditForm: React.FC<HotelEditFormProps> = ({
  selectedHotel,
  isLoading,
  onSubmit,
  onCancel
}) => {
  return (
    <motion.div
      key="edit-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-blue-100 dark:border-blue-900 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Edit Hotel</h2>
        <HotelForm
          initialData={selectedHotel}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="mr-2 border-blue-200 dark:border-blue-800"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default HotelEditForm;
