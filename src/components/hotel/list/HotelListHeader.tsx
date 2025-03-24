
import React from 'react';
import { motion } from 'framer-motion';

interface HotelListHeaderProps {
  count: number;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({ count }) => {
  const springConfig = {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    mass: 0.7
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="flex items-center justify-between mb-4"
    >
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        Hotels ({count})
      </h2>
    </motion.div>
  );
};

export default HotelListHeader;
