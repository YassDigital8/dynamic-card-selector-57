
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormSchema } from '../eventFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Ban, AlertCircle, Lock } from 'lucide-react';
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
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Ticket Type {index + 1}
          {isExistingTicket && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Only availability can be modified for existing tickets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0 text-muted-foreground"
          disabled={isExistingTicket}
        >
          {isExistingTicket ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-not-allowed">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Existing ticket types cannot be deleted</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name={`ticketInfo.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs flex items-center gap-1">
                  Name
                  {isExistingTicket && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Name cannot be modified for existing tickets</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Adult, Child, VIP" 
                    {...field} 
                    disabled={isExistingTicket}
                    className={isExistingTicket ? "bg-muted cursor-not-allowed" : ""}
                  />
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
                  <FormLabel className="text-xs flex items-center gap-1">
                    Price ($)
                    {isExistingTicket && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Price cannot be modified for existing tickets</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isExistingTicket}
                      className={isExistingTicket ? "bg-muted cursor-not-allowed" : ""}
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
                <FormLabel className="text-xs flex items-center gap-1">
                  Description (optional)
                  {isExistingTicket && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Description cannot be modified for existing tickets</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Brief description" 
                    {...field} 
                    disabled={isExistingTicket}
                    className={isExistingTicket ? "bg-muted cursor-not-allowed" : ""}
                  />
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
                  {isExistingTicket && (
                    <p className="text-xs text-muted-foreground">
                      You can only toggle availability for this ticket type
                    </p>
                  )}
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
