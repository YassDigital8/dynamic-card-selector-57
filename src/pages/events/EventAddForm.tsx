
import React from 'react';
import EventForm from '@/components/events/EventForm';
import { EventFormData } from '@/models/EventModel';
import { motion } from 'framer-motion';

interface EventAddFormProps {
  isLoading: boolean;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}

const EventAddForm: React.FC<EventAddFormProps> = ({ isLoading, onSubmit, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <EventForm 
        onSubmit={onSubmit} 
        onCancel={onCancel} 
        isLoading={isLoading} 
      />
    </motion.div>
  );
};

export default EventAddForm;
