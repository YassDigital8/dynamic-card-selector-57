
import React, { useState, useEffect } from 'react';
import HotelPageContainer from './HotelPageContainer';
import { Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HotelPage = () => {
  const [showKeyboardTip, setShowKeyboardTip] = useState(true);
  
  // Hide keyboard tip after 5 seconds
  useEffect(() => {
    if (showKeyboardTip) {
      const timer = setTimeout(() => {
        setShowKeyboardTip(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showKeyboardTip]);

  return (
    <div className="w-full h-[calc(100vh-120px)] relative">
      <HotelPageContainer />
      
      <AnimatePresence>
        {showKeyboardTip && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 right-4 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 
                      p-3 rounded-lg shadow-md flex items-center gap-2 border border-indigo-200 dark:border-indigo-800"
          >
            <Keyboard className="h-4 w-4" />
            <span className="text-sm">Pro tip: Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-indigo-800 rounded border border-indigo-300 dark:border-indigo-700 mx-1 text-xs font-mono">/</kbd> to quickly search</span>
            <button 
              onClick={() => setShowKeyboardTip(false)}
              className="ml-2 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelPage;
