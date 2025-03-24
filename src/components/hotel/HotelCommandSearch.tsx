
import React, { useEffect, useState } from 'react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search, Hotel as HotelIcon, MapPin } from 'lucide-react';
import { Hotel } from '@/models/HotelModel';
import { useToast } from '@/hooks/use-toast';

interface HotelCommandSearchProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
}

const HotelCommandSearch: React.FC<HotelCommandSearchProps> = ({ hotels, onSelectHotel }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (hotel: Hotel) => {
    onSelectHotel(hotel);
    setOpen(false);
    toast({
      title: "Hotel Selected",
      description: `${hotel.name} has been selected.`,
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="fixed right-4 top-4 z-30 h-8 gap-1"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline-flex">Search hotels...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search hotels by name, country or location..." />
        <CommandList>
          <CommandEmpty>No hotels found.</CommandEmpty>
          <CommandGroup heading="Hotels">
            {hotels.map((hotel) => (
              <CommandItem
                key={hotel.id}
                value={`${hotel.name} ${hotel.country} ${hotel.governorate} ${hotel.streetAddress}`}
                onSelect={() => handleSelect(hotel)}
              >
                <div className="flex items-center">
                  <HotelIcon className="mr-2 h-4 w-4 text-indigo-500" />
                  <span className="font-medium">{hotel.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    <MapPin className="inline-block h-3 w-3 mr-1" />
                    {hotel.country}, {hotel.governorate}, {hotel.streetAddress}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default HotelCommandSearch;
