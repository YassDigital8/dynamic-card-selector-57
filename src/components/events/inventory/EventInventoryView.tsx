
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Event } from '@/models/EventModel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventInventoryHeader from './EventInventoryHeader';
import { InventoryOverviewTab, TicketTypesTab, TransactionsTab } from './tabs';

interface EventInventoryViewProps {
  event: Event;
  onBack: () => void;
}

const EventInventoryView: React.FC<EventInventoryViewProps> = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <EventInventoryHeader event={event} onBack={onBack} />

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Management
              </div>
              <div className="text-sm font-normal text-muted-foreground">
                Event: {event.title}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <InventoryOverviewTab event={event} />
              </TabsContent>
              
              <TabsContent value="tickets">
                <TicketTypesTab event={event} />
              </TabsContent>
              
              <TabsContent value="transactions">
                <TransactionsTab event={event} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventInventoryView;
