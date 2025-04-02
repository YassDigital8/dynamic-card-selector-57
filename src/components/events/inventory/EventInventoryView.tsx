
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Ticket, Package, History } from 'lucide-react';
import { Event } from '@/models/EventModel';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EventInventoryViewProps {
  event: Event;
  onBack: () => void;
}

const EventInventoryView: React.FC<EventInventoryViewProps> = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate overall inventory percentage
  const calculateInventoryPercentage = (remaining?: number, total?: number) => {
    if (!remaining || !total || total === 0) return 0;
    return (remaining / total) * 100;
  };
  
  // Calculate tickets sold
  const calculateTicketsSold = (total?: number, remaining?: number) => {
    if (!total || !remaining) return 0;
    return total - remaining;
  };
  
  // Format date for mock transactions
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Generate mock transaction data
  const generateTransactions = () => {
    const now = new Date();
    const transactions = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      transactions.push({
        id: `txn-${i}`,
        date,
        ticketType: event.ticketInfo?.[i % (event.ticketInfo?.length || 1)]?.name || 'Standard',
        quantity: Math.floor(Math.random() * 3) + 1,
        total: Math.floor(Math.random() * 200) + 50,
        status: i % 4 === 0 ? 'Refunded' : 'Completed'
      });
    }
    
    return transactions;
  };
  
  const transactions = generateTransactions();

  return (
    <div className="space-y-6">
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
              
              <TabsContent value="overview" className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Overall Inventory Status</h3>
                  
                  {/* Overall inventory status */}
                  {event.totalInventory && event.remainingInventory !== undefined ? (
                    <Card className="p-4 border border-muted">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Capacity:</span>
                          <span className="font-semibold">{event.totalInventory}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Tickets Sold:</span>
                          <span className="font-semibold">{calculateTicketsSold(event.totalInventory, event.remainingInventory)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Tickets Remaining:</span>
                          <span className="font-semibold">{event.remainingInventory}</span>
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Sold ({Math.round(100 - calculateInventoryPercentage(event.remainingInventory, event.totalInventory))}%)</span>
                            <span>Remaining ({Math.round(calculateInventoryPercentage(event.remainingInventory, event.totalInventory))}%)</span>
                          </div>
                          <Progress 
                            value={calculateInventoryPercentage(event.remainingInventory, event.totalInventory)} 
                            className="h-3 w-full" 
                          />
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <div className="text-center p-4 border border-dashed rounded-lg">
                      <p className="text-muted-foreground">No inventory information available</p>
                    </div>
                  )}
                  
                  {/* Sales summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Tickets Sold</span>
                        <span className="text-2xl font-bold">
                          {event.totalInventory && event.remainingInventory 
                            ? calculateTicketsSold(event.totalInventory, event.remainingInventory) 
                            : 0}
                        </span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Revenue</span>
                        <span className="text-2xl font-bold">
                          ${event.price && event.totalInventory && event.remainingInventory 
                            ? (event.price * calculateTicketsSold(event.totalInventory, event.remainingInventory)).toFixed(2) 
                            : '0.00'}
                        </span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Sell-Through Rate</span>
                        <span className="text-2xl font-bold">
                          {event.totalInventory && event.remainingInventory 
                            ? `${Math.round(100 - calculateInventoryPercentage(event.remainingInventory, event.totalInventory))}%` 
                            : '0%'}
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tickets" className="py-4 space-y-6">
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
              </TabsContent>
              
              <TabsContent value="transactions" className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Recent Transactions
                  </h3>
                  
                  <Card className="border border-muted overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Ticket Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell>{transaction.ticketType}</TableCell>
                            <TableCell>{transaction.quantity}</TableCell>
                            <TableCell>${transaction.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={transaction.status === 'Completed' ? "default" : "destructive"}>
                                {transaction.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventInventoryView;
