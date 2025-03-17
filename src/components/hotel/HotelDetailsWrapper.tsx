
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelDetails from './HotelDetails';
import { Hotel } from '@/models/HotelModel';

interface HotelDetailsWrapperProps {
  hotel: Hotel;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelDetailsWrapper: React.FC<HotelDetailsWrapperProps> = ({
  hotel,
  onEdit,
  onBack
}) => {
  // Enhanced animation variants for the wrapper
  const wrapperVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.95,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      key="details"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={wrapperVariants}
      className="w-full h-full"
    >
      <motion.div
        variants={cardVariants}
      >
        <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-md overflow-hidden bg-white dark:bg-slate-900">
          <HotelDetails hotel={hotel} onEdit={onEdit} onBack={onBack} />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default HotelDetailsWrapper;
