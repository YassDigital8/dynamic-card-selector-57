
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HotelSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const HotelSearch: React.FC<HotelSearchProps> = ({
  searchTerm,
  onSearchChange,
  disabled = false,
  className
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchTerm) {
          onSearchChange('');
        } else {
          inputRef.current?.blur();
        }
      } else if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, onSearchChange]);

  // Handle input focus and blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  // Clear search input
  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <motion.div 
      className={cn(
        "relative w-full bg-white dark:bg-slate-950 rounded-lg transition-all duration-300",
        isFocused && "ring-2 ring-indigo-300 dark:ring-indigo-600",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search className={cn(
        "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
        isFocused ? "text-indigo-500 dark:text-indigo-400" : "text-gray-400"
      )} />
      
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search hotels by name, country, city... (Press / to focus)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "pl-10 pr-10 py-6 h-auto border shadow-sm",
          isFocused ? "border-indigo-300 dark:border-indigo-600" : "border-transparent",
          "focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg text-base",
          disabled && "opacity-70 cursor-not-allowed"
        )}
        disabled={disabled}
      />
      
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full 
            bg-gray-200 dark:bg-gray-700 flex items-center justify-center
            hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
        </button>
      )}
      
      {isFocused && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 mr-8">
          {searchTerm ? "Esc to clear" : "Esc to cancel"}
        </div>
      )}
    </motion.div>
  );
};

export default HotelSearch;
