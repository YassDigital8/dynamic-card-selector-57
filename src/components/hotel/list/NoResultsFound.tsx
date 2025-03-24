
import React from 'react';
import { motion } from 'framer-motion';

interface NoResultsFoundProps {
  springConfig: any;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ springConfig }) => {
  return (
    <motion.div
      key="no-results"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={springConfig}
      className="p-8 text-center border border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20"
    >
      <p className="text-muted-foreground">No hotels match your search criteria</p>
    </motion.div>
  );
};

export default NoResultsFound;
