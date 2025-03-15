
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

interface PageDataProps {
  pageData: any | null;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PageData = ({ pageData }: PageDataProps) => {
  if (!pageData) return null;
  
  return (
    <motion.div 
      className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{pageData.title}</h3>
      <Separator className="my-3" />
      <p className="text-gray-600">{pageData.content}</p>
    </motion.div>
  );
};

export default PageData;
