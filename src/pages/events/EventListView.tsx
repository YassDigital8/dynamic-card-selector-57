
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Event } from '@/models/EventModel';
import EventCard from '@/components/events/EventCard';
import { CategoryFilter } from '@/components/events/filters';
import { motion } from 'framer-motion';

interface EventListViewProps {
  events: Event[];
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onAddNewClick: () => void;
  onSelectEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

const EventListView: React.FC<EventListViewProps> = ({
  events,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onAddNewClick,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={onCategoryChange}
          />
        </div>
        <Button onClick={onAddNewClick} className="gap-1 whitespace-nowrap">
          <PlusCircle className="h-4 w-4" />
          Add New Event
        </Button>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={onSelectEvent}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try different search terms or filters' 
              : 'Add your first event to get started'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default EventListView;
