
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fadeInVariants } from './animations';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PathConfigOptionProps {
  title: string;
  description: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  apiReachable?: boolean;
  onRetryConnection?: () => void;
}

const PathConfigOption = ({
  title,
  description,
  options,
  value,
  onChange,
  loading,
  apiReachable = true,
  onRetryConnection
}: PathConfigOptionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInVariants}
    >
      <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-4 pb-3 px-4">
          <div className="space-y-2 md:space-y-3">
            <div>
              <h3 className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">{title}</h3>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            
            {!apiReachable && onRetryConnection && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 p-2 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 flex-1 text-[10px] md:text-xs">
                  <p className="text-amber-800 dark:text-amber-300">
                    Unable to connect to API. Showing mock data.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 px-2 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/30"
                    onClick={onRetryConnection}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Retry Connection
                  </Button>
                </div>
              </div>
            )}
            
            <Select
              value={value}
              onValueChange={onChange}
              disabled={loading || options.length === 0}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-8 md:h-10 text-[10px] md:text-xs">
                <SelectValue placeholder={loading ? "Loading..." : "Select an option..."} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-[40vh]">
                {options.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-[10px] md:text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PathConfigOption;
