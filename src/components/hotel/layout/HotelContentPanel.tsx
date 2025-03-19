
import React from 'react';
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
  onCancelEdit
}) => {
  // Determine if we should show content (either a selected hotel, add form, or edit form)
  const showContent = selectedHotel || showAddForm || isEditing;
  const isMobile = useIsMobile();

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

  return (
    <motion.div 
      className="h-full w-full p-2 sm:p-4 overflow-visible relative"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
    >
      {isExpanded && showContent && (
        <motion.div 
          className="mb-2 sm:mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="outline" 
            onClick={onBackToList}
            size={isMobile ? "sm" : "default"}
            className="group mb-2 sm:mb-4 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <ArrowLeft className={`mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-1`} />
            <span className="text-xs sm:text-sm">Back to hotels</span>
          </Button>
        </motion.div>
      )}
      
      {/* Direct component rendering without any exit animations or waiting */}
      {showAddForm && (
        <HotelAddForm
          key="add-form"
          isLoading={isLoading}
          onSubmit={onSubmitAdd}
          selectedPOS={selectedPOS}
          posName={posName}
        />
      )}

      {isEditing && selectedHotel && (
        <HotelEditForm
          key="edit-form"
          selectedHotel={selectedHotel}
          isLoading={isLoading}
          onSubmit={onSubmitEdit}
          onCancel={onCancelEdit}
        />
      )}

      {!showAddForm && !isEditing && selectedHotel && (
        <HotelDetailsWrapper 
          key={`hotel-details-${selectedHotel.id}`}
          hotel={selectedHotel} 
          onEdit={onCancelEdit} 
          onBack={onBackToList}
        />
      )}

      {/* Only render NoHotelSelected when no content is shown, and it's not in a collapsed state */}
      {!showContent && isExpanded && hasHotels && (
        <div className="relative min-h-[calc(100vh-200px)] overflow-auto pt-0 -mt-4">
          <NoHotelSelected
            key="no-hotel-selected"
            hasHotels={hasHotels}
            onAddHotel={onAddHotel}
          />
        </div>
      )}

      {!showContent && isExpanded && !hasHotels && (
        <HotelEmptyState
          key="empty-state"
          selectedPOS={selectedPOS}
          posName={posName}
          hasHotels={hasHotels}
          onAddHotel={onAddHotel}
        />
      )}
    </motion.div>
  );
};

export default HotelContentPanel;
