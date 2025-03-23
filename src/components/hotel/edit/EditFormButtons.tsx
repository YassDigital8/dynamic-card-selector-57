
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditFormButtonsProps {
  isLoading: boolean;
  onCancel: () => void;
  onDelete?: () => void;
}

const EditFormButtons: React.FC<EditFormButtonsProps> = ({
  isLoading,
  onCancel,
  onDelete,
}) => {
  return (
    <motion.div 
      className="flex space-x-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Button
        variant="outline"
        onClick={onCancel}
        className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all"
        type="button"
        size="sm"
      >
        <X className="mr-1 h-3.5 w-3.5 text-slate-500" />
        Cancel
      </Button>
      <Button 
        type="submit" 
        form="hotel-form" 
        disabled={isLoading}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white transition-all"
        size="sm"
      >
        <Save className="mr-1 h-3.5 w-3.5" />
        {isLoading ? "Saving..." : "Save Hotel"}
      </Button>
      {onDelete && (
        <Button 
          type="button" 
          variant="destructive"
          onClick={onDelete}
          size="sm"
          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all"
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Delete
        </Button>
      )}
    </motion.div>
  );
};

export default EditFormButtons;
