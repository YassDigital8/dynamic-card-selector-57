
import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from './animations';

interface AddPageOptionProps {
  onAddPageClick?: () => void;
}

const AddPageOption = ({ onAddPageClick }: AddPageOptionProps) => {
  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="border border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
      onClick={onAddPageClick}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <PlusCircle className="h-8 w-8 text-green-600" />
        <h3 className="font-medium text-green-800">Add New Page</h3>
        <p className="text-sm text-gray-600">
          Create a new page directly without configuring paths
        </p>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            if (onAddPageClick) onAddPageClick();
          }}
          className="mt-3 w-full gap-2 shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all"
        >
          <PlusCircle className="h-5 w-5" />
          Add Page Now
        </Button>
      </div>
    </motion.div>
  );
};

export default AddPageOption;
