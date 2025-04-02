
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Event } from '@/models/EventModel';
import { EventTypeIcon } from '@/components/events';

interface EventImageBannerProps {
  event: Event;
  formatPrice: (price: number) => string;
  isSoldOut: () => boolean;
}

const EventImageBanner: React.FC<EventImageBannerProps> = ({ 
  event, 
  formatPrice, 
  isSoldOut 
}) => {
  return (
    <div className="h-64 relative overflow-hidden">
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="w-fit">{event.category}</Badge>
          {event.eventType && (
            <Badge variant="secondary" className="w-fit flex items-center gap-1.5">
              <EventTypeIcon eventType={event.eventType} size={14} />
              <span>{event.eventType}</span>
            </Badge>
          )}
          
          {event.price !== undefined && (
            <Badge variant="outline" className="bg-white/90 text-black border-white">
              {formatPrice(event.price)}
            </Badge>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white">{event.title}</h1>
        <div className="flex items-center gap-2 text-white mt-1">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span>{event.rating} rating</span>
        </div>
      </div>
      
      {isSoldOut() && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <Badge variant="destructive" className="text-lg px-4 py-2 uppercase font-bold">
            Sold Out
          </Badge>
        </div>
      )}
    </div>
  );
};

export default EventImageBanner;
