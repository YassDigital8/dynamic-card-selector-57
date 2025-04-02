
import React from 'react';
import { Event } from '@/models/EventModel';
import EventDetails from '@/components/events/EventDetails';
import EventForm from '@/components/events/EventForm';
import { EventFormData } from '@/models/EventModel';
import { EventInventoryView } from '@/components/events/inventory';
import { motion } from 'framer-motion';

interface EventDetailsWrapperProps {
  selectedEvent: Event | null;
  isEditing: boolean;
  isLoading: boolean;
  viewInventory?: boolean;
  onBack: () => void;
  onEdit: (event: Event) => void;
  onEditSubmit: (data: EventFormData) => void;
  onViewInventory: (event: Event) => void;
}

const EventDetailsWrapper: React.FC<EventDetailsWrapperProps> = ({
  selectedEvent,
  isEditing,
  isLoading,
  viewInventory,
  onBack,
  onEdit,
  onEditSubmit,
  onViewInventory
}) => {
  if (!selectedEvent) return null;

  if (viewInventory) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <EventInventoryView 
          event={selectedEvent} 
          onBack={onBack}
        />
      </motion.div>
    );
  }

  return (
    <>
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventForm 
            initialData={selectedEvent} 
            onSubmit={onEditSubmit} 
            onCancel={() => onBack()} 
            isLoading={isLoading} 
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventDetails 
            event={selectedEvent} 
            onBack={onBack}
            onEdit={onEdit}
            onViewInventory={onViewInventory}
          />
        </motion.div>
      )}
    </>
  );
};

export default EventDetailsWrapper;
