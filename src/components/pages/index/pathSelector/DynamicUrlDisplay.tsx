
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';
import { fadeInVariants } from './animations';

interface DynamicUrlDisplayProps {
  selectedPOS: string;
  selectedLanguage: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
}

const DynamicUrlDisplay = ({
  selectedPOS,
  selectedLanguage,
  selectedSlug = '',
  selectedSubSlug = ''
}: DynamicUrlDisplayProps) => {
  // Generate dynamic URL for display - POS comes first, then language
  const dynamicUrl = selectedPOS && selectedLanguage ? 
    `${selectedPOS.toLowerCase()}/${selectedLanguage.toLowerCase()}${selectedSlug ? '/' + selectedSlug : ''}${selectedSubSlug ? '/' + selectedSubSlug : ''}` 
    : '';

  if (!selectedPOS || !selectedLanguage) return null;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      className="mb-6 overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-1">
        <Link className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current URL Path</span>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">
        {dynamicUrl || "URL will appear here as you make selections"}
      </div>
    </motion.div>
  );
};

export default DynamicUrlDisplay;
