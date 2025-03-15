
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export function Logo({ showText = false, className }: LogoProps) {
  const { effectiveTheme } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className={cn("flex items-center gap-1 md:gap-2", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showText && (
        <div className="text-[10px] md:text-sm lg:text-xl font-bold transition-colors duration-300 logo-text whitespace-nowrap">
          {isMobile ? "ADMIN" : "ADMIN DASHBOARD"}
        </div>
      )}
    </motion.div>
  );
}
