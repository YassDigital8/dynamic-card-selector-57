
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Package } from 'lucide-react';
import { Event } from '@/models/EventModel';

interface EventInventoryHeaderProps {
  event: Event;
  onBack: () => void;
}

const EventInventoryHeader: React.FC<EventInventoryHeaderProps> = ({ event, onBack }) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
        <ArrowLeft className="h-4 w-4" />
        Back to event details
      </Button>
      <Button variant="outline" size="sm" className="gap-1">
        <Download className="h-4 w-4" />
        Export Inventory Report
      </Button>
    </div>
  );
};

export default EventInventoryHeader;
