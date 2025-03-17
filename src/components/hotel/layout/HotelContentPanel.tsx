
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
  // Enhanced panel animation variants
  const panelVariants = {
    collapsed: { 
      opacity: 0,
      x: 40,
      width: 0,
      display: "none",
      transition: { 
        duration: 0.4, 
        ease: "easeInOut",
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    expanded: { 
      opacity: 1, 
      x: 0,
      width: "100%",
      display: "block",
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Button animation variants with enhanced transitions
  const buttonVariants = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        delay: 0.2,
        type: "spring",
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
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
      layout
    >
      {isExpanded && (
        <motion.div 
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          className="mb-4"
        >
          <Button 
            variant="outline" 
            onClick={onBackToList}
            className="group mb-4 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <motion.span 
              className="flex items-center"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to hotels
            </motion.span>
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
