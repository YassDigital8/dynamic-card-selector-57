
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, Ticket, Phone, Globe, Mail, ArrowLeft, Edit, Wallet, Users } from 'lucide-react';
import { Event } from '@/models/EventModel';
import { EventTypeIcon } from '@/components/events';
import { Progress } from "@/components/ui/progress";

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onEdit: (event: Event) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onEdit }) => {
  // Format price display
  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };
  
  // Calculate inventory percentage for progress bar
  const calculateInventoryPercentage = (remaining?: number, total?: number) => {
    if (!remaining || !total || total === 0) return 0;
    return (remaining / total) * 100;
  };
  
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
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(event)} className="gap-1">
          <Edit className="h-4 w-4" />
          Edit Event
        </Button>
      </div>

      <Card className="overflow-hidden">
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
              
              {/* Base price badge */}
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
          
          {/* Sold out overlay */}
          {isSoldOut() && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2 uppercase font-bold">
                Sold Out
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="space-y-4 pt-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">About this Event</h2>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* Price information */}
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
                
                {/* Inventory information */}
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
            
            {event.contactDetails && event.contactDetails.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <div className="space-y-2">
                  {event.contactDetails.map(contact => (
                    <div key={contact.id} className="flex items-center gap-2">
                      {contact.type === 'phone' && <Phone className="h-5 w-5 text-muted-foreground" />}
                      {contact.type === 'email' && <Mail className="h-5 w-5 text-muted-foreground" />}
                      {contact.type === 'website' && <Globe className="h-5 w-5 text-muted-foreground" />}
                      <span>{contact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {event.ticketInfo && event.ticketInfo.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-2">Ticket Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.ticketInfo.map(ticket => (
                    <Card key={ticket.id} className={!ticket.available ? "opacity-75" : ""}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Ticket className="h-4 w-4" />
                            {ticket.name}
                          </div>
                          <span className="text-lg font-bold">
                            {formatPrice(ticket.price)}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {ticket.description || "Standard admission"}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2">
                        {ticket.totalInventory !== undefined && ticket.remainingInventory !== undefined && (
                          <div className="space-y-1">
                            <div className="text-sm flex justify-between">
                              <span>Availability:</span>
                              <span>
                                {ticket.remainingInventory} of {ticket.totalInventory} remaining
                              </span>
                            </div>
                            <Progress 
                              value={calculateInventoryPercentage(ticket.remainingInventory, ticket.totalInventory)} 
                              className="h-2 w-full" 
                            />
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Badge variant={ticket.available ? "default" : "secondary"}>
                          {ticket.available ? (
                            ticket.remainingInventory === 0 ? "Sold Out" : "Available"
                          ) : "Unavailable"}
                        </Badge>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
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
