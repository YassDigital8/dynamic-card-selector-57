
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface HotelLoadingIndicatorProps {
  message?: string;
}

const HotelLoadingIndicator: React.FC<HotelLoadingIndicatorProps> = ({ 
  message = "Loading hotel data..."
}) => {
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader2 className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
      </motion.div>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </motion.div>
  );
};

export default HotelLoadingIndicator;
