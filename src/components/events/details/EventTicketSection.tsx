
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { TicketInfo } from '@/models/EventModel';

interface EventTicketSectionProps {
  tickets: TicketInfo[];
  formatPrice: (price: number) => string;
  calculateInventoryPercentage: (remaining?: number, total?: number) => number;
}

const EventTicketSection: React.FC<EventTicketSectionProps> = ({ 
  tickets, 
  formatPrice, 
  calculateInventoryPercentage 
}) => {
  if (!tickets || tickets.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Ticket Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tickets.map(ticket => (
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
  );
};

export default EventTicketSection;
