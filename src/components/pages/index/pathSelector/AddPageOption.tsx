
import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from './animations';
import { useIsMobile } from '@/hooks/use-mobile';

interface AddPageOptionProps {
  onAddPageClick?: () => void;
}

const AddPageOption = ({ onAddPageClick }: AddPageOptionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="border border-green-200 rounded-lg p-2 md:p-4 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
      onClick={onAddPageClick}
    >
      <div className="flex flex-col items-center text-center gap-2 md:gap-3">
        <PlusCircle className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-green-600`} />
        <h3 className="font-medium text-green-800 text-xs md:text-base">Add New Page</h3>
        {!isMobile && (
          <p className="text-xs text-gray-600">
            Create a new page directly without configuring paths
          </p>
        )}
        {isMobile && (
          <p className="text-[10px] text-gray-600">
            Create a new page directly
          </p>
        )}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            if (onAddPageClick) onAddPageClick();
          }}
          className={`mt-1 md:mt-3 w-full gap-1 md:gap-2 shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all ${isMobile ? 'text-xs py-1 px-2' : ''}`}
        >
          <PlusCircle className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`} />
          {isMobile ? "Add Page" : "Add Page Now"}
        </Button>
      </div>
    </motion.div>
  );
};

export default AddPageOption;
