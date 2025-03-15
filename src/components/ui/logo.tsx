
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
      className={cn("flex items-center gap-2", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showText && (
        <div className="text-base md:text-xl font-bold transition-colors duration-300" style={{ color: '#0EA5E9' }}>
          <span>{isMobile ? "ADMIN" : "ADMIN DASHBOARD"}</span>
        </div>
      )}
    </motion.div>
  );
}
