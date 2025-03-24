
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContentBackButtonProps {
  onBackToList: () => void;
}

const ContentBackButton: React.FC<ContentBackButtonProps> = ({ onBackToList }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="mb-4 sticky top-0 z-20 bg-background pt-2 pb-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Button 
        variant="ghost" 
        onClick={onBackToList}
        size={isMobile ? "sm" : "default"}
        className="group font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
        type="button"
      >
        <ArrowLeft className={`mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1`} />
        <span>Back to list</span>
      </Button>
    </motion.div>
  );
};

export default ContentBackButton;
