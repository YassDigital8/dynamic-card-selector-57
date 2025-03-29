
import React, { useState } from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { useEventsAttractions } from '@/hooks/events/useEventsAttractions';
import EventCard from '@/components/events/EventCard';
import EventForm from '@/components/events/EventForm';
import EventDetails from '@/components/events/EventDetails';
import DeleteEventDialog from '@/components/events/DeleteEventDialog';
import { Input } from '@/components/ui/input';
import { Event, EventFormData } from '@/models/EventModel';
import { motion } from 'framer-motion';

const EventsAttractions = () => {
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
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  // Handle search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission for adding a new event
  const handleAddSubmit = async (data: EventFormData) => {
    const result = await addEvent(data);
    if (result.success && 'event' in result) {
      setShowAddForm(false);
      setSelectedEvent(result.event);
    }
  };

  // Handle form submission for editing an event
  const handleEditSubmit = async (data: EventFormData) => {
    if (selectedEvent) {
      const result = await updateEvent(selectedEvent.id, data);
      if (result.success && 'event' in result) {
        setIsEditing(false);
        setSelectedEvent(result.event);
      }
    }
  };

  // Handle event deletion
  const handleDelete = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setEventToDelete(event);
    }
  };

  const confirmDelete = async () => {
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

  const handleAddNewClick = () => {
    setShowAddForm(true);
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
    setShowAddForm(false);
    setIsEditing(false);
  };

  // Render content based on current state
  const renderContent = () => {
    if (showAddForm) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventForm 
            onSubmit={handleAddSubmit} 
            onCancel={handleBackToList} 
            isLoading={isLoading} 
          />
        </motion.div>
      );
    }

    if (selectedEvent) {
      if (isEditing) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EventForm 
              initialData={selectedEvent} 
              onSubmit={handleEditSubmit} 
              onCancel={() => setIsEditing(false)} 
              isLoading={isLoading} 
            />
          </motion.div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <EventDetails 
            event={selectedEvent} 
            onBack={handleBackToList}
            onEdit={handleStartEdit}
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <Button onClick={handleAddNewClick} className="gap-1 whitespace-nowrap">
            <PlusCircle className="h-4 w-4" />
            Add New Event
          </Button>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={handleSelectEvent}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <h3 className="text-lg font-medium">No events found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? 'Try a different search term' : 'Add your first event to get started'}
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <StandardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events & Attractions</h1>
          <p className="text-muted-foreground mt-2">
            Discover and manage events and attractions for your travelers
          </p>
        </div>

        {renderContent()}

        <DeleteEventDialog
          event={eventToDelete}
          isOpen={!!eventToDelete}
          onClose={() => setEventToDelete(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </StandardLayout>
  );
};

export default EventsAttractions;
