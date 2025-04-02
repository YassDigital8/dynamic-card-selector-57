
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import DeleteEventDialog from '@/components/events/DeleteEventDialog';
import { EventViewState, useEventPageState } from './events/useEventPageState';
import EventListView from './events/EventListView';
import EventDetailsWrapper from './events/EventDetailsWrapper';
import EventAddForm from './events/EventAddForm';

const EventsAttractions = () => {
  const {
    events,
    selectedEvent,
    eventToDelete,
    isLoading,
    isEditing,
    searchQuery,
    selectedCategory,
    viewState,
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
  } = useEventPageState();

  // Render content based on current state
  const renderContent = () => {
    switch (viewState) {
      case EventViewState.ADD:
        return (
          <EventAddForm
            isLoading={isLoading}
            onSubmit={handleAddSubmit}
            onCancel={handleShowList}
          />
        );
      case EventViewState.DETAILS:
      case EventViewState.EDIT:
        return (
          <EventDetailsWrapper
            selectedEvent={selectedEvent}
            isEditing={isEditing}
            isLoading={isLoading}
            onBack={handleShowList}
            onEdit={handleStartEdit}
            onEditSubmit={handleEditSubmit}
          />
        );
      case EventViewState.LIST:
      default:
        return (
          <EventListView
            events={events}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onAddNewClick={handleShowAddForm}
            onSelectEvent={handleSelectEvent}
            onEditEvent={handleStartEdit}
            onDeleteEvent={handleStartDelete}
          />
        );
    }
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
          onConfirm={handleConfirmDelete}
        />
      </div>
    </StandardLayout>
  );
};

export default EventsAttractions;
