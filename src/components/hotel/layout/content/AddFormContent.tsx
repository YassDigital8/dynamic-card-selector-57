
import React from 'react';
import { motion } from 'framer-motion';
import HotelAddForm from '../../HotelAddForm';
import { HotelFormData } from '@/models/HotelModel';

interface AddFormContentProps {
  isLoading: boolean;
  onSubmitAdd: (data: HotelFormData) => void;
  selectedPOS: string;
  posName?: string;
  contentVariants: any;
}

const AddFormContent: React.FC<AddFormContentProps> = ({
  isLoading,
  onSubmitAdd,
  selectedPOS,
  posName,
  contentVariants
}) => {
  return (
    <motion.div
      key="add-form"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={contentVariants}
      className="flex-1 overflow-auto"
    >
      <HotelAddForm
        isLoading={isLoading}
        onSubmit={onSubmitAdd}
        selectedPOS={selectedPOS}
        posName={posName}
      />
    </motion.div>
  );
};

export default AddFormContent;
