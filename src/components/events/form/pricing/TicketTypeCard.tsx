
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../eventFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Ban } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TicketTypeCardProps {
  ticket: any;
  index: number;
  form: UseFormReturn<EventFormSchema>;
  onRemove: () => void;
}

export const TicketTypeCard: React.FC<TicketTypeCardProps> = ({ 
  ticket, 
  index, 
  form, 
  onRemove 
}) => {
  // Determine if this is an existing ticket with sales
  const isExistingTicket = !!ticket.id;
  const hasInventorySet = ticket.totalInventory > 0;
  const shouldDisableInventory = isExistingTicket && hasInventorySet;
  
  return (
    <Card key={ticket.id} className="border border-muted">
      <CardHeader className="pb-3 pt-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Ticket Type {index + 1}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
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
                  <FormLabel className="text-xs flex items-center gap-1">
                    Quantity
                    {shouldDisableInventory && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Ban className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Inventory cannot be modified after tickets have been created</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Available tickets"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={shouldDisableInventory}
                      className={shouldDisableInventory ? "bg-muted cursor-not-allowed" : ""}
                    />
                  </FormControl>
                  {shouldDisableInventory && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Inventory cannot be changed after creation
                    </p>
                  )}
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
  );
};
