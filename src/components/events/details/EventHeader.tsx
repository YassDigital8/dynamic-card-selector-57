
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Package } from 'lucide-react';
import { Event } from '@/models/EventModel';

interface EventHeaderProps {
  event: Event;
  onBack: () => void;
  onEdit: (event: Event) => void;
  onViewInventory: (event: Event) => void;
}

const EventHeader: React.FC<EventHeaderProps> = ({ 
  event, 
  onBack, 
  onEdit, 
  onViewInventory 
}) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onViewInventory(event)} className="gap-1">
          <Package className="h-4 w-4" />
          Manage Inventory
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(event)} className="gap-1">
          <Edit className="h-4 w-4" />
          Edit Event
        </Button>
      </div>
    </div>
  );
};

export default EventHeader;
