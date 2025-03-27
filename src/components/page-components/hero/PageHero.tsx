
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  backgroundImage?: string;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  backgroundImage = "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png", 
  className 
}) => {
  return (
    <div 
      className={cn(
        "relative w-full h-80 bg-cover bg-center flex items-center", 
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="absolute inset-0 bg-blue-900/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
      </div>
    </div>
  );
};

export default PageHero;
