
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Ticket } from 'lucide-react';
import { Event } from '@/models/EventModel';
import {
  EventHeader,
  EventImageBanner,
  EventDetailsSection,
  EventContactSection,
  EventTicketSection,
  formatPrice,
  calculateInventoryPercentage
} from './details';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onEdit: (event: Event) => void;
  onViewInventory: (event: Event) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onEdit, onViewInventory }) => {
  // Determine if the event is sold out
  const isSoldOut = () => {
    if (event.remainingInventory === 0) {
      return true;
    }
    
    if (event.ticketInfo && event.ticketInfo.length > 0) {
      return event.ticketInfo.every(ticket => 
        ticket.remainingInventory === 0 || !ticket.available
      );
    }
    
    return false;
  };

  return (
    <div className="space-y-4">
      <EventHeader 
        event={event} 
        onBack={onBack} 
        onEdit={onEdit} 
        onViewInventory={onViewInventory} 
      />

      <Card className="overflow-hidden">
        <EventImageBanner 
          event={event} 
          formatPrice={formatPrice}
          isSoldOut={isSoldOut}
        />

        <CardContent className="space-y-4 pt-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">About this Event</h2>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EventDetailsSection 
              event={event} 
              formatPrice={formatPrice}
              calculateInventoryPercentage={calculateInventoryPercentage}
            />
            
            <EventContactSection contacts={event.contactDetails || []} />
          </div>

          {event.ticketInfo && event.ticketInfo.length > 0 && (
            <>
              <Separator />
              <EventTicketSection 
                tickets={event.ticketInfo} 
                formatPrice={formatPrice}
                calculateInventoryPercentage={calculateInventoryPercentage}
              />
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button className="gap-1" disabled={isSoldOut()}>
            <Ticket className="h-4 w-4" />
            {isSoldOut() ? "Sold Out" : "Book Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventDetails;
