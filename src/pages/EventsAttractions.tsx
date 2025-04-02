
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import DeleteEventDialog from '@/components/events/DeleteEventDialog';
import { EventViewState, useEventPageState } from './events/useEventPageState';
import EventListView from './events/EventListView';
import EventDetailsWrapper from './events/EventDetailsWrapper';
import EventAddForm from './events/EventAddForm';
import { InventoryDashboard } from '@/components/events/inventory';

const EventsAttractions = () => {
  const {
    events,
    selectedEvent,
    eventToDelete,
    isLoading,
    isEditing,
    viewInventory,
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
    handleViewInventory,
    handleAddSubmit,
    handleEditSubmit,
    handleStartDelete,
    handleConfirmDelete,
    showInventoryDashboard,
    setShowInventoryDashboard
  } = useEventPageState();

  // Render content based on current state
  const renderContent = () => {
    if (showInventoryDashboard) {
      return (
        <InventoryDashboard 
          events={events} 
          onBack={() => setShowInventoryDashboard(false)} 
          onSelectEvent={(event) => {
            handleSelectEvent(event);
            handleViewInventory(event);
            setShowInventoryDashboard(false);
          }}
        />
      );
    }
    
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
      case EventViewState.INVENTORY:
        return (
          <EventDetailsWrapper
            selectedEvent={selectedEvent}
            isEditing={isEditing}
            viewInventory={viewState === EventViewState.INVENTORY}
            isLoading={isLoading}
            onBack={handleShowList}
            onEdit={handleStartEdit}
            onViewInventory={handleViewInventory}
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
            onViewInventoryDashboard={() => setShowInventoryDashboard(true)}
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
