
import React from 'react';
import { motion } from 'framer-motion';
import HotelEditForm from '../../HotelEditForm';
import { Hotel, HotelFormData } from '@/models/HotelModel';

interface EditFormContentProps {
  selectedHotel: Hotel;
  isLoading: boolean;
  onSubmitEdit: (data: HotelFormData) => void;
  onCancelEdit: () => void;
  contentVariants: any;
}

const EditFormContent: React.FC<EditFormContentProps> = ({
  selectedHotel,
  isLoading,
  onSubmitEdit,
  onCancelEdit,
  contentVariants
}) => {
  return (
    <motion.div
      key={`edit-form-${selectedHotel.id}-${selectedHotel.updatedAt.getTime()}`}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={contentVariants}
      className="flex-1"
    >
      <HotelEditForm
        selectedHotel={selectedHotel}
        isLoading={isLoading}
        onSubmit={onSubmitEdit}
        onCancel={onCancelEdit}
      />
    </motion.div>
  );
};

export default EditFormContent;
