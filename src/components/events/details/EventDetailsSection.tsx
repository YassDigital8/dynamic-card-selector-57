
import React from 'react';
import { Calendar, MapPin, Wallet, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Event } from '@/models/EventModel';

interface EventDetailsSectionProps {
  event: Event;
  formatPrice: (price: number) => string;
  calculateInventoryPercentage: (remaining?: number, total?: number) => number;
}

const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ 
  event, 
  formatPrice, 
  calculateInventoryPercentage 
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Event Details</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <div>{event.location.address}</div>
            <div>{event.location.city}, {event.location.country}</div>
          </div>
        </div>
        
        {(event.price !== undefined || (event.ticketInfo && event.ticketInfo.length > 0)) && (
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <div>
              {event.ticketInfo && event.ticketInfo.length > 0 ? (
                <span>Multiple ticket options available</span>
              ) : (
                <span>{formatPrice(event.price || 0)}</span>
              )}
            </div>
          </div>
        )}
        
        {event.totalInventory && event.remainingInventory !== undefined && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>
                {event.remainingInventory} of {event.totalInventory} spots remaining
              </span>
            </div>
            <Progress 
              value={calculateInventoryPercentage(event.remainingInventory, event.totalInventory)} 
              className="h-2 w-full" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsSection;
