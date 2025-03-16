
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ApiErrorAlertProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

const ApiErrorAlert = ({ error, onRetry, className }: ApiErrorAlertProps) => {
  if (!error) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      <Alert variant="error" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <AlertDescription className="text-[10px] sm:text-xs md:text-sm">
            {error}
          </AlertDescription>
        </div>
        
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry} 
            className="text-[10px] h-6 sm:text-xs md:text-sm px-2 py-0.5 ml-auto"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </Alert>
    </motion.div>
  );
};

export default ApiErrorAlert;
