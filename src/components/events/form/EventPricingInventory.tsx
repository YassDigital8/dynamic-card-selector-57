
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from './eventFormSchema';
import { v4 as uuidv4 } from 'uuid';

interface EventPricingInventoryProps {
  form: UseFormReturn<EventFormSchema>;
}

const EventPricingInventory: React.FC<EventPricingInventoryProps> = ({ form }) => {
  const [hasMultipleTicketTypes, setHasMultipleTicketTypes] = useState<boolean>(
    !!form.getValues('ticketInfo')?.length
  );

  const ticketInfo = form.watch('ticketInfo') || [];

  const addTicketType = () => {
    const currentTickets = form.getValues('ticketInfo') || [];
    form.setValue('ticketInfo', [
      ...currentTickets,
      {
        id: uuidv4(),
        name: '',
        price: 0,
        description: '',
        available: true,
        totalInventory: 0,
        remainingInventory: 0
      }
    ]);
  };

  const removeTicketType = (index: number) => {
    const currentTickets = [...(form.getValues('ticketInfo') || [])];
    currentTickets.splice(index, 1);
    form.setValue('ticketInfo', currentTickets);
    
    // If we removed the last ticket type, disable multiple ticket types
    if (currentTickets.length === 0) {
      setHasMultipleTicketTypes(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium">Pricing & Inventory</h3>
        
        {!hasMultipleTicketTypes ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalInventory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Maximum number of attendees"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="multiple-ticket-types"
                checked={hasMultipleTicketTypes}
                onCheckedChange={(checked) => {
                  setHasMultipleTicketTypes(checked);
                  if (checked && !form.getValues('ticketInfo')?.length) {
                    addTicketType();
                  }
                }}
              />
              <label htmlFor="multiple-ticket-types" className="text-sm font-medium">
                Enable multiple ticket types
              </label>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormDescription>
                Define different ticket types with their own pricing and inventory
              </FormDescription>
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiple-ticket-types"
                  checked={hasMultipleTicketTypes}
                  onCheckedChange={(checked) => {
                    setHasMultipleTicketTypes(checked);
                    if (!checked) {
                      form.setValue('ticketInfo', []);
                    } else if (checked && !form.getValues('ticketInfo')?.length) {
                      addTicketType();
                    }
                  }}
                />
                <label htmlFor="multiple-ticket-types" className="text-sm font-medium">
                  Multiple ticket types
                </label>
              </div>
            </div>

            <div className="space-y-3">
              {ticketInfo.map((ticket, index) => (
                <Card key={ticket.id} className="border border-muted">
                  <CardHeader className="pb-3 pt-3 px-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Ticket Type {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTicketType(index)}
                      className="h-8 w-8 p-0 text-muted-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 pt-0">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name={`ticketInfo.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Adult, Child, VIP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name={`ticketInfo.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Price ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="0.00"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`ticketInfo.${index}.totalInventory`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="Available tickets"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`ticketInfo.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Description (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`ticketInfo.${index}.available`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                            <div className="space-y-0.5">
                              <FormLabel className="text-xs">Available for sale</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={addTicketType}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Ticket Type
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPricingInventory;
