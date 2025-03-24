
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Trash2, X } from 'lucide-react';

interface EditFormButtonsProps {
  isLoading: boolean;
  onCancel: () => void;
  onDelete?: () => void;
}

const EditFormButtons: React.FC<EditFormButtonsProps> = ({
  isLoading,
  onCancel,
  onDelete
}) => {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onCancel}
        disabled={isLoading}
        className="border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <X className="w-4 h-4 mr-1" />
        Cancel
      </Button>
      
      {onDelete && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={isLoading}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      )}
      
      <Button
        type="submit"
        size="sm"
        form="hotel-form"
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 dark:from-blue-600 dark:to-indigo-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-1" />
            Save Changes
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default EditFormButtons;
