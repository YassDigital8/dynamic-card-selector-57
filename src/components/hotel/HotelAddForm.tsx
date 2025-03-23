
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HotelForm from './HotelForm';
import { HotelFormData } from '@/models/HotelModel';
import { X } from 'lucide-react';

interface HotelAddFormProps {
  isLoading: boolean;
  onSubmit: (data: HotelFormData) => void;
  onCancel?: () => void;
  selectedPOS: string;
  posName?: string;
}

const HotelAddForm: React.FC<HotelAddFormProps> = ({
  isLoading,
  onSubmit,
  onCancel,
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Add New Hotel {selectedPOS && selectedPOS !== 'all' && posName ? `(${posName})` : ''}
          </h2>
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-blue-200 dark:border-blue-800"
              type="button"
              size="sm"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Cancel
            </Button>
          )}
        </div>
        <HotelForm onSubmit={onSubmit} isLoading={isLoading} showButtons={false} />
      </Card>
    </motion.div>
  );
};

export default HotelAddForm;
