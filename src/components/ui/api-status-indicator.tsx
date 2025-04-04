
import React from 'react';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApiStatusIndicatorProps {
  isLive: boolean | null;
  className?: string;
  role?: string;
}

export const ApiStatusIndicator: React.FC<ApiStatusIndicatorProps> = ({ 
  isLive, 
  className,
  role
}) => {
  if (isLive === null) {
    return (
      <div className={cn("flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5 bg-gray-100 dark:bg-gray-800", className)}>
        <Circle className="h-2 w-2 text-gray-400 animate-pulse" />
        <span className="text-gray-600 dark:text-gray-300">Checking...</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5", 
      isLive 
        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
        : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      className
    )}>
      <Circle 
        className={cn(
          "h-2 w-2 fill-current", 
          isLive ? "text-green-500" : "text-amber-500"
        )} 
      />
      <div className="flex items-center gap-1">
        <span>{isLive ? "Live Mode" : "Demo Mode"}</span>
        {role && (
          <span className="ml-1 border-l border-green-300 pl-1 dark:border-green-700">{role}</span>
        )}
      </div>
    </div>
  );
};

export default ApiStatusIndicator;
