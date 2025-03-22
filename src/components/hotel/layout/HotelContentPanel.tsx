
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import HotelAddForm from '../HotelAddForm';
import HotelEditForm from '../HotelEditForm';
import HotelDetailsWrapper from '../HotelDetailsWrapper';
import HotelEmptyState from '../HotelEmptyState';
import NoHotelSelected from '../NoHotelSelected';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import HotelLoadingIndicator from '../HotelLoadingIndicator';

interface HotelContentPanelProps {
  selectedHotel: Hotel | null;
  isLoading: boolean;
  isEditing: boolean;
  showAddForm: boolean;
  isExpanded: boolean;
  selectedPOS: string;
  posName?: string;
  hasHotels: boolean;
  onAddHotel: () => void;
  onBackToList: () => void;
  onSubmitAdd: (data: HotelFormData) => void;
  onSubmitEdit: (data: HotelFormData) => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onUpdateHotel?: (id: string, data: Partial<Hotel>) => void;
}

const HotelContentPanel: React.FC<HotelContentPanelProps> = ({
  selectedHotel,
  isLoading,
  isEditing,
  showAddForm,
  isExpanded,
  selectedPOS,
  posName,
  hasHotels,
  onAddHotel,
  onBackToList,
  onSubmitAdd,
  onSubmitEdit,
  onCancelEdit,
  onStartEdit,
  onUpdateHotel
}) => {
  const { toast } = useToast();
  
  // Determine if we should show content (either a selected hotel, add form, or edit form)
  const showContent = selectedHotel || showAddForm || isEditing;
  const isMobile = useIsMobile();

  // Log when hotel data changes for debugging
  useEffect(() => {
    if (selectedHotel) {
      console.log('HotelContentPanel received updated hotel:', selectedHotel.id);
    }
  }, [selectedHotel]);
  
  // Function to handle successful edits
  const handleEditSubmit = (data: HotelFormData) => {
    onSubmitEdit(data);
    
    // Show success toast to indicate changes are saved
    toast({
      title: "Hotel Updated",
      description: "Your changes have been saved successfully.",
      variant: "default",
    });
  };

  // Refined animation variants for smoother content transitions
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: 10,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25
      }
    }
  };

  // Generate a unique ID for the hotel details to force a refresh when data changes
  const hotelDetailsKey = selectedHotel 
    ? `hotel-details-${selectedHotel.id}-${selectedHotel.updatedAt.getTime()}`
    : 'no-hotel';

  // If loading, show the loading indicator
  if (isLoading && selectedHotel) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <HotelLoadingIndicator message="Loading hotel details..." />
      </div>
    );
  }

  return (
    <motion.div 
      className="h-full w-full p-2 sm:p-4 overflow-hidden relative flex flex-col"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      {isExpanded && showContent && (
        <motion.div 
          className="mb-2 sm:mb-4 sticky top-0 z-20 bg-background pt-2 pb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="outline" 
            onClick={onBackToList}
            size={isMobile ? "sm" : "default"}
            className="group mb-2 sm:mb-4 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            type="button"
          >
            <ArrowLeft className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1`} />
            <span className="text-xs sm:text-sm">Back to hotels</span>
          </Button>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {showAddForm && (
          <motion.div
            key="add-form"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="flex-1"
          >
            <HotelAddForm
              isLoading={isLoading}
              onSubmit={onSubmitAdd}
              selectedPOS={selectedPOS}
              posName={posName}
            />
          </motion.div>
        )}

        {isEditing && selectedHotel && (
          <motion.div
            key={`edit-form-${selectedHotel.id}-${selectedHotel.updatedAt.getTime()}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="flex-1"
          >
            <HotelEditForm
              selectedHotel={selectedHotel}
              isLoading={isLoading}
              onSubmit={handleEditSubmit}
              onCancel={onCancelEdit}
            />
          </motion.div>
        )}

        {!showAddForm && !isEditing && selectedHotel && (
          <motion.div
            key={hotelDetailsKey}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="flex-1"
          >
            <HotelDetailsWrapper 
              hotel={selectedHotel} 
              onEdit={onStartEdit} 
              onBack={onBackToList}
              onUpdateHotel={onUpdateHotel}
              isEditing={isEditing}
            />
          </motion.div>
        )}

        {!showContent && isExpanded && hasHotels && (
          <motion.div
            key="no-hotel-selected"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="flex-1 relative h-full"
          >
            <NoHotelSelected
              hasHotels={hasHotels}
              onAddHotel={onAddHotel}
            />
          </motion.div>
        )}

        {!showContent && isExpanded && !hasHotels && (
          <motion.div
            key="empty-state"
            initial="hidden"
            animate="visible" 
            exit="hidden"
            variants={contentVariants}
            className="flex-1 relative h-full"
          >
            <HotelEmptyState
              selectedPOS={selectedPOS}
              posName={posName}
              hasHotels={hasHotels}
              onAddHotel={onAddHotel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HotelContentPanel;
