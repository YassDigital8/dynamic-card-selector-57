
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export function Logo({ showText = true, className }: LogoProps) {
  const { effectiveTheme } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn("flex items-center gap-2 md:gap-3", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showText && (
        <motion.div 
          className="text-sm md:text-lg lg:text-xl font-bold tracking-wide logo-text whitespace-nowrap"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-blue-600 dark:text-blue-400">ADMIN</span>
          <span className="text-gray-700 dark:text-gray-300"> DASHBOARD</span>
        </motion.div>
      )}
    </motion.div>
  );
}
