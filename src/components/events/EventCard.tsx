
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Star, Edit, Trash2, DollarSign } from 'lucide-react';
import { Event } from '@/models/EventModel';
import { motion } from 'framer-motion';
import { EventTypeIcon } from '@/components/events';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSelect, onEdit, onDelete }) => {
  // Format price display
  const displayPrice = () => {
    if (event.ticketInfo && event.ticketInfo.length > 0) {
      const prices = event.ticketInfo.map(t => t.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (minPrice === maxPrice) {
        return `$${minPrice.toFixed(2)}`;
      }
      return `From $${minPrice.toFixed(2)}`;
    }
    
    return event.price ? `$${event.price.toFixed(2)}` : "Free";
  };
  
  // Determine if sold out
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          <div className="absolute top-3 right-3 bg-black/70 text-white py-1 px-2 rounded text-xs font-medium">
            {event.category}
          </div>
          {event.featured && (
            <div className="absolute top-3 left-3 bg-amber-500 text-white py-1 px-2 rounded text-xs font-medium">
              Featured
            </div>
          )}
          {event.eventType && (
            <div className="absolute bottom-3 left-3 bg-primary/80 text-white py-1 px-2 rounded-full text-xs font-medium flex items-center gap-1.5">
              <EventTypeIcon eventType={event.eventType} className="text-white" size={14} />
              <span>{event.eventType}</span>
            </div>
          )}
          
          {/* Price indicator */}
          <div className="absolute bottom-3 right-3 bg-white/90 text-black py-1 px-2 rounded text-xs font-semibold flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            {displayPrice()}
          </div>
          
          {/* Sold out indicator */}
          {isSoldOut() && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm px-3 py-1.5 uppercase font-bold">
                Sold Out
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{event.rating} rating</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-2 pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location.city}, {event.location.country}</span>
            </div>
            
            {/* Inventory information */}
            {event.totalInventory && event.remainingInventory !== undefined && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Ticket className="h-3.5 w-3.5" />
                {event.remainingInventory === 0 ? (
                  <span className="text-red-500 font-medium">Sold out</span>
                ) : (
                  <span>
                    {event.remainingInventory} / {event.totalInventory} spots left
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => onSelect(event)}>
            <Ticket className="h-4 w-4" />
            Details
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(event)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(event.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;
