
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export function Logo({ showText = false, className }: LogoProps) {
  const { effectiveTheme } = useTheme();
  
  return (
    <motion.div 
      className={cn("flex items-center gap-2", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-8 w-8">
        {/* New Cham Wings Airlines logo */}
        <img 
          src="/lovable-uploads/8d41fa29-3180-4df3-9844-3322321967de.png" 
          alt="Cham Wings Airlines Logo" 
          className="h-full w-full object-contain"
        />
      </div>
      
      {showText && (
        <div className="text-xl font-bold text-sidebar-primary transition-colors duration-300">
          {effectiveTheme === 'dark' ? (
            <span>Admin Portal</span>
          ) : (
            <span className="text-blue-800">CHAM WINGS</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
