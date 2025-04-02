
import React from 'react';
import { Event } from '@/models/EventModel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Ticket } from 'lucide-react';
import { calculateInventoryPercentage, calculateTicketsSold } from '../utils/inventoryUtils';

interface TicketTypesTabProps {
  event: Event;
}

const TicketTypesTab: React.FC<TicketTypesTabProps> = ({ event }) => {
  return (
    <div className="py-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Ticket Types</h3>
        
        {event.ticketInfo && event.ticketInfo.length > 0 ? (
          <div className="space-y-4">
            {event.ticketInfo.map((ticket) => (
              <Card key={ticket.id} className="p-4 border border-muted">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      <span className="font-medium">{ticket.name}</span>
                      <Badge variant={ticket.available ? "default" : "secondary"} className="ml-2">
                        {ticket.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <span className="font-semibold">${ticket.price.toFixed(2)}</span>
                  </div>
                  
                  {ticket.description && (
                    <div className="text-sm text-muted-foreground">
                      {ticket.description}
                    </div>
                  )}
                  
                  {ticket.totalInventory !== undefined && ticket.remainingInventory !== undefined && (
                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">Total</div>
                          <div className="font-semibold">{ticket.totalInventory}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Sold</div>
                          <div className="font-semibold">
                            {calculateTicketsSold(ticket.totalInventory, ticket.remainingInventory)}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Remaining</div>
                          <div className="font-semibold">{ticket.remainingInventory}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Sold ({Math.round(100 - calculateInventoryPercentage(ticket.remainingInventory, ticket.totalInventory))}%)</span>
                          <span>Remaining ({Math.round(calculateInventoryPercentage(ticket.remainingInventory, ticket.totalInventory))}%)</span>
                        </div>
                        <Progress 
                          value={calculateInventoryPercentage(ticket.remainingInventory, ticket.totalInventory)} 
                          className="h-2 w-full" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-4 border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground">No ticket types defined</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TicketTypesTab;
