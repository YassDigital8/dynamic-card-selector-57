
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HotelForm from './HotelForm';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { Save, X, Trash2 } from 'lucide-react';

interface HotelEditFormProps {
  selectedHotel: Hotel;
  isLoading: boolean;
  onSubmit: (data: HotelFormData) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const HotelEditForm: React.FC<HotelEditFormProps> = ({
  selectedHotel,
  isLoading,
  onSubmit,
  onCancel,
  onDelete
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Edit Hotel</h2>
          <div className="flex space-x-2">
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
            <Button 
              type="submit" 
              form="hotel-form" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Save className="mr-1 h-3.5 w-3.5" />
              {isLoading ? "Saving..." : "Save Hotel"}
            </Button>
            {onDelete && (
              <Button 
                type="button" 
                variant="destructive"
                onClick={onDelete}
                size="sm"
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
              </Button>
            )}
          </div>
        </div>
        <HotelForm
          initialData={selectedHotel}
          onSubmit={onSubmit}
          isLoading={isLoading}
          showButtons={true}
        />
        <div className="mt-6 flex justify-end space-x-2">
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
          <Button 
            type="submit" 
            form="hotel-form" 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Save className="mr-1 h-3.5 w-3.5" />
            {isLoading ? "Saving..." : "Save Hotel"}
          </Button>
          {onDelete && (
            <Button 
              type="button" 
              variant="destructive"
              onClick={onDelete}
              size="sm"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default HotelEditForm;
