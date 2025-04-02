
import { useState } from 'react';
import { Event } from '@/models/EventModel';
import { useEventsAttractions } from '@/hooks/events/useEventsAttractions';

export enum EventViewState {
  LIST = 'list',
  DETAILS = 'details',
  ADD = 'add',
  EDIT = 'edit'
}

export const useEventPageState = () => {
  const {
    events,
    selectedEvent,
    isLoading,
    isEditing,
    setSelectedEvent,
    setIsEditing,
    addEvent,
    updateEvent,
    deleteEvent
  } = useEventsAttractions();

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  // Filter events based on search query and category
  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.hasTime && event.startTime?.includes(searchQuery.toLowerCase()));
    
    // Filter by category
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    
    // Return true if both conditions are met
    return matchesSearch && matchesCategory;
  });

  // Get current view state
  const getCurrentViewState = (): EventViewState => {
    if (showAddForm) return EventViewState.ADD;
    if (selectedEvent) {
      return isEditing ? EventViewState.EDIT : EventViewState.DETAILS;
    }
    return EventViewState.LIST;
  };

  // Navigation handlers
  const handleShowList = () => {
    setSelectedEvent(null);
    setShowAddForm(false);
    setIsEditing(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowAddForm(false);
    setIsEditing(false);
  };

  const handleStartEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setShowAddForm(false);
  };

  // CRUD operations
  const handleAddSubmit = async (data: any) => {
    const result = await addEvent(data);
    if (result.success && 'event' in result) {
      setShowAddForm(false);
      setSelectedEvent(result.event);
    }
  };

  const handleEditSubmit = async (data: any) => {
    if (selectedEvent) {
      const result = await updateEvent(selectedEvent.id, data);
      if (result.success && 'event' in result) {
        setIsEditing(false);
        setSelectedEvent(result.event);
      }
    }
  };

  const handleStartDelete = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setEventToDelete(event);
    }
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      const result = await deleteEvent(eventToDelete.id);
      if (result.success) {
        if (selectedEvent && selectedEvent.id === eventToDelete.id) {
          setSelectedEvent(null);
        }
        setEventToDelete(null);
      }
    }
  };

  return {
    events: filteredEvents,
    selectedEvent,
    eventToDelete,
    isLoading,
    isEditing,
    searchQuery,
    selectedCategory,
    viewState: getCurrentViewState(),
    setSearchQuery,
    setSelectedCategory,
    setEventToDelete,
    handleShowList,
    handleShowAddForm,
    handleSelectEvent,
    handleStartEdit,
    handleAddSubmit,
    handleEditSubmit,
    handleStartDelete,
    handleConfirmDelete
  };
};
