
import React from 'react';
import { Event } from '@/models/EventModel';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateInventoryPercentage, calculateTicketsSold } from '../utils/inventoryUtils';

interface InventoryOverviewTabProps {
  event: Event;
}

const InventoryOverviewTab: React.FC<InventoryOverviewTabProps> = ({ event }) => {
  return (
    <div className="py-4 space-y-6">
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
    </div>
  );
};

export default InventoryOverviewTab;
