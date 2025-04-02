
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Package, Search, Filter } from 'lucide-react';
import { Event, TicketInfo } from '@/models/EventModel';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';

interface InventoryDashboardProps {
  events: Event[];
  onBack: () => void;
  onSelectEvent: (event: Event) => void;
}

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ 
  events, 
  onBack,
  onSelectEvent 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate overall inventory metrics
  const totalInventory = events.reduce((sum, event) => sum + (event.totalInventory || 0), 0);
  const remainingInventory = events.reduce((sum, event) => sum + (event.remainingInventory || 0), 0);
  const soldTickets = totalInventory - remainingInventory;
  const sellThroughRate = totalInventory > 0 ? Math.round((soldTickets / totalInventory) * 100) : 0;

  // Calculate low inventory events (less than 20% remaining)
  const lowInventoryEvents = events.filter(event => {
    if (!event.totalInventory || event.remainingInventory === undefined) return false;
    const percentRemaining = (event.remainingInventory / event.totalInventory) * 100;
    return percentRemaining < 20 && event.remainingInventory > 0;
  });

  // Calculate inventory percentage
  const calculateInventoryPercentage = (remaining?: number, total?: number) => {
    if (!remaining || !total || total === 0) return 0;
    return (remaining / total) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export Inventory Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Dashboard
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Overall Inventory Status</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Total Events</span>
                        <span className="text-2xl font-bold">{events.length}</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Total Capacity</span>
                        <span className="text-2xl font-bold">{totalInventory}</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Tickets Sold</span>
                        <span className="text-2xl font-bold">{soldTickets}</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Sell-Through Rate</span>
                        <span className="text-2xl font-bold">{sellThroughRate}%</span>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sold ({sellThroughRate}%)</span>
                      <span>Remaining ({100 - sellThroughRate}%)</span>
                    </div>
                    <Progress 
                      value={100 - calculateInventoryPercentage(remainingInventory, totalInventory)} 
                      className="h-3 w-full" 
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Low Inventory Events</h3>
                    {lowInventoryEvents.length > 0 ? (
                      <div className="space-y-2">
                        {lowInventoryEvents.map(event => (
                          <Card key={event.id} className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-sm text-muted-foreground">
                                  {event.remainingInventory} / {event.totalInventory} tickets remaining
                                </div>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => onSelectEvent(event)}>
                                Manage
                              </Button>
                            </div>
                            <Progress 
                              value={calculateInventoryPercentage(event.remainingInventory, event.totalInventory)} 
                              className="h-2 w-full mt-2" 
                            />
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No events with low inventory</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="py-4 space-y-6">
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                <Card className="border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Sold</TableHead>
                        <TableHead>Remaining</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => {
                        const soldOut = event.remainingInventory === 0;
                        const percentSold = event.totalInventory && event.remainingInventory !== undefined 
                          ? Math.round(((event.totalInventory - event.remainingInventory) / event.totalInventory) * 100)
                          : 0;
                          
                        return (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.totalInventory || "N/A"}</TableCell>
                            <TableCell>
                              {event.totalInventory && event.remainingInventory !== undefined
                                ? event.totalInventory - event.remainingInventory
                                : "N/A"}
                            </TableCell>
                            <TableCell>{event.remainingInventory ?? "N/A"}</TableCell>
                            <TableCell>
                              {soldOut ? (
                                <Badge variant="destructive">Sold Out</Badge>
                              ) : percentSold > 80 ? (
                                <Badge variant="warning">Almost Sold</Badge>
                              ) : (
                                <Badge variant="success">Available</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline" onClick={() => onSelectEvent(event)}>
                                Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="tickets" className="py-4 space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Ticket Type Inventory</h3>
                  
                  <Card className="border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Ticket Type</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Sold</TableHead>
                          <TableHead>Remaining</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEvents.flatMap((event) => 
                          event.ticketInfo 
                            ? event.ticketInfo.map((ticket: TicketInfo) => {
                                const soldOut = ticket.remainingInventory === 0 || !ticket.available;
                                const percentSold = ticket.totalInventory && ticket.remainingInventory !== undefined 
                                  ? Math.round(((ticket.totalInventory - ticket.remainingInventory) / ticket.totalInventory) * 100)
                                  : 0;
                                  
                                return (
                                  <TableRow key={`${event.id}-${ticket.id}`}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{ticket.name}</TableCell>
                                    <TableCell>${ticket.price.toFixed(2)}</TableCell>
                                    <TableCell>{ticket.totalInventory || "N/A"}</TableCell>
                                    <TableCell>
                                      {ticket.totalInventory && ticket.remainingInventory !== undefined
                                        ? ticket.totalInventory - ticket.remainingInventory
                                        : "N/A"}
                                    </TableCell>
                                    <TableCell>{ticket.remainingInventory ?? "N/A"}</TableCell>
                                    <TableCell>
                                      {!ticket.available ? (
                                        <Badge variant="secondary">Unavailable</Badge>
                                      ) : soldOut ? (
                                        <Badge variant="destructive">Sold Out</Badge>
                                      ) : percentSold > 80 ? (
                                        <Badge variant="warning">Almost Sold</Badge>
                                      ) : (
                                        <Badge variant="success">Available</Badge>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                            })
                            : []
                        )}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryDashboard;
