
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SeasonalPrice {
  id: string;
  seasonName: string;
  startDate: string;
  endDate: string;
  price: number;
}

interface SeasonalPricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  seasonalPrices: SeasonalPrice[];
  onSave: (prices: SeasonalPrice[]) => void;
  basePrice?: number;
}

const SeasonalPricingDialog: React.FC<SeasonalPricingDialogProps> = ({
  isOpen,
  onClose,
  seasonalPrices,
  onSave,
  basePrice = 0
}) => {
  const [prices, setPrices] = useState<SeasonalPrice[]>(seasonalPrices);
  const [newSeason, setNewSeason] = useState<Partial<SeasonalPrice>>({
    seasonName: '',
    price: basePrice,
  });
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setPrices(seasonalPrices);
      setNewSeason({
        seasonName: '',
        price: basePrice,
      });
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [isOpen, seasonalPrices, basePrice]);

  const handleAddSeason = () => {
    if (!newSeason.seasonName || !startDate || !endDate || newSeason.price === undefined) {
      return;
    }

    if (startDate > endDate) {
      alert('Start date must be before end date');
      return;
    }

    const newSeasonWithDates: SeasonalPrice = {
      id: `season-${Date.now()}`,
      seasonName: newSeason.seasonName,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      price: newSeason.price,
    };

    setPrices([...prices, newSeasonWithDates]);

    // Reset form
    setNewSeason({
      seasonName: '',
      price: basePrice,
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleRemoveSeason = (id: string) => {
    setPrices(prices.filter(price => price.id !== id));
  };

  const handleSave = () => {
    onSave(prices);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Seasonal Pricing</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div className="space-y-4">
            <h3 className="font-medium">Current Seasonal Prices</h3>
            
            {prices.length === 0 ? (
              <p className="text-sm text-muted-foreground">No seasonal prices set</p>
            ) : (
              <div className="space-y-2">
                {prices.map(price => (
                  <div key={price.id} className="flex items-center justify-between gap-2 p-3 border rounded-md group hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex-1">
                      <div className="font-medium">{price.seasonName}</div>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4">
                        <span>
                          {format(new Date(price.startDate), 'MMM dd, yyyy')} - {format(new Date(price.endDate), 'MMM dd, yyyy')}
                        </span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          ${price.price}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSeason(price.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Add New Season</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="season-name">Season Name</Label>
                <Input
                  id="season-name"
                  value={newSeason.seasonName}
                  onChange={e => setNewSeason({...newSeason, seasonName: e.target.value})}
                  placeholder="e.g. Summer 2023"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="season-price">Price per Night</Label>
                <Input
                  id="season-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newSeason.price}
                  onChange={e => setNewSeason({...newSeason, price: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={date => startDate ? date < startDate : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Button 
              onClick={handleAddSeason}
              disabled={!newSeason.seasonName || !startDate || !endDate || newSeason.price === undefined}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Season
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeasonalPricingDialog;
