
import React from 'react';
import { Event } from '@/models/EventModel';
import EventDetails from '@/components/events/EventDetails';
import EventForm from '@/components/events/EventForm';
import { EventFormData } from '@/models/EventModel';
import { motion } from 'framer-motion';

interface EventDetailsWrapperProps {
  selectedEvent: Event | null;
  isEditing: boolean;
  isLoading: boolean;
  onBack: () => void;
  onEdit: (event: Event) => void;
  onEditSubmit: (data: EventFormData) => void;
}

const EventDetailsWrapper: React.FC<EventDetailsWrapperProps> = ({
  selectedEvent,
  isEditing,
  isLoading,
  onBack,
  onEdit,
  onEditSubmit
}) => {
  if (!selectedEvent) return null;

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
          />
        </motion.div>
      )}
    </>
  );
};

export default EventDetailsWrapper;
