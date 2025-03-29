
import { useState, useCallback } from 'react';
import { Event, EventFormData } from '@/models/EventModel';
import { useToast } from '@/hooks/use-toast';
import { demoEvents } from './demoEvents';

export const useEventsAttractions = () => {
  const [events, setEvents] = useState<Event[]>(demoEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Add a new event
  const addEvent = useCallback(async (eventData: EventFormData) => {
    setIsLoading(true);
    try {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
      
      toast({
        title: "Event Added Successfully",
        description: `${newEvent.title} has been added to your events listing`,
      });
      
      setIsLoading(false);
      return { success: true, event: newEvent };
    } catch (error) {
      console.error('Error adding event:', error);
      
      toast({
        title: "Failed to Add Event",
        description: "There was an error adding your event. Please try again.",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return { success: false, error };
    }
  }, [toast]);

  // Update an existing event
  const updateEvent = useCallback(async (id: string, eventData: EventFormData) => {
    setIsLoading(true);
    try {
      let updatedEvent: Event | undefined;
      
      setEvents(prevEvents => {
        const updated = prevEvents.map(event => {
          if (event.id === id) {
            updatedEvent = {
              ...event,
              ...eventData,
              updatedAt: new Date()
            };
            return updatedEvent;
          }
          return event;
        });
        return updated;
      });
      
      toast({
        title: "Event Updated Successfully",
        description: `${updatedEvent?.title || 'Event'} has been updated`,
      });
      
      setIsLoading(false);
      return { success: true, event: updatedEvent };
    } catch (error) {
      console.error('Error updating event:', error);
      
      toast({
        title: "Failed to Update Event",
        description: "There was an error updating your event. Please try again.",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return { success: false, error };
    }
  }, [toast]);

  // Delete an event
  const deleteEvent = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const eventToDelete = events.find(event => event.id === id);
      
      if (!eventToDelete) {
        throw new Error('Event not found');
      }
      
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      
      toast({
        title: "Event Deleted Successfully",
        description: `${eventToDelete.title} has been removed`,
      });
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error deleting event:', error);
      
      toast({
        title: "Failed to Delete Event",
        description: "There was an error deleting the event. Please try again.",
        variant: "destructive"
      });
      
      setIsLoading(false);
      return { success: false, error };
    }
  }, [events, toast]);

  return {
    events,
    selectedEvent,
    isLoading,
    isEditing,
    setSelectedEvent,
    setIsEditing,
    addEvent,
    updateEvent,
    deleteEvent
  };
};
