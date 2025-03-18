
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import HotelAddForm from '../HotelAddForm';
import HotelEditForm from '../HotelEditForm';
import HotelDetailsWrapper from '../HotelDetailsWrapper';
import HotelEmptyState from '../HotelEmptyState';
import { Hotel, HotelFormData } from '@/models/HotelModel';

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
  // Panel animation variants
  const panelVariants = {
    collapsed: { 
      opacity: 0,
      x: 0,
      width: 0,
      display: "none",
      transition: { 
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    expanded: { 
      opacity: 1, 
      x: 0,
      width: "100%",
      display: "block",
      transition: { 
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.15 }
    }
  };

  // Determine if we should show content (either a selected hotel, add form, or edit form)
  const showContent = selectedHotel || showAddForm || isEditing;

  // This will handle the render conditions for the empty state
  const shouldShowEmptyState = !showContent;

  // If no content to show and not expanded, don't render anything
  if (!showContent && !isExpanded) {
    return null;
  }

  return (
    <motion.div 
      className="lg:col-span-9"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={panelVariants}
      style={{ gridColumn: isExpanded ? "span 9 / span 9" : "span 0 / span 0" }}
    >
      {isExpanded && (
        <motion.div 
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mb-4"
        >
          <Button 
            variant="outline" 
            onClick={onBackToList}
            className="group mb-4 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to hotels
          </Button>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
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
            key="details"
            hotel={selectedHotel} 
            onEdit={onCancelEdit} 
            onBack={onBackToList}
          />
        )}

        {shouldShowEmptyState && isExpanded && (
          <HotelEmptyState
            key="empty-state"
            selectedPOS={selectedPOS}
            posName={posName}
            hasHotels={hasHotels}
            onAddHotel={onAddHotel}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HotelContentPanel;
