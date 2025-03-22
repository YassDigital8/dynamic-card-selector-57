
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';
import HotelLoadingIndicator from '../HotelLoadingIndicator';
import { 
  ContentBackButton,
  AddFormContent, 
  EditFormContent, 
  DetailsContent, 
  EmptyStateContent 
} from './content';
import useContentAnimations from './content/useContentAnimations';

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
  const { contentVariants } = useContentAnimations();
  
  // Determine if we should show content (either a selected hotel, add form, or edit form)
  const showContent = selectedHotel || showAddForm || isEditing;

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
        <ContentBackButton onBackToList={onBackToList} />
      )}
      
      <AnimatePresence mode="wait">
        {showAddForm && (
          <AddFormContent 
            isLoading={isLoading}
            onSubmitAdd={onSubmitAdd}
            selectedPOS={selectedPOS}
            posName={posName}
            contentVariants={contentVariants}
          />
        )}

        {isEditing && selectedHotel && (
          <EditFormContent 
            selectedHotel={selectedHotel}
            isLoading={isLoading}
            onSubmitEdit={handleEditSubmit}
            onCancelEdit={onCancelEdit}
            contentVariants={contentVariants}
          />
        )}

        {!showAddForm && !isEditing && selectedHotel && (
          <DetailsContent 
            hotel={selectedHotel}
            onStartEdit={onStartEdit}
            onBackToList={onBackToList}
            onUpdateHotel={onUpdateHotel}
            isEditing={isEditing}
            contentVariants={contentVariants}
          />
        )}

        {!showContent && isExpanded && (
          <EmptyStateContent 
            hasHotels={hasHotels}
            selectedPOS={selectedPOS}
            posName={posName}
            onAddHotel={onAddHotel}
            contentVariants={contentVariants}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HotelContentPanel;
