
import React, { useState, useEffect } from 'react';
import { 
  CommandDialog, 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
import { Hotel } from '@/models/HotelModel';
import { Building, MapPin, Star, Phone, Calendar } from 'lucide-react';

interface HotelCommandSearchProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
}

const HotelCommandSearch: React.FC<HotelCommandSearchProps> = ({ hotels, onSelectHotel }) => {
  const [open, setOpen] = useState(false);
  
  // Open command dialog when user presses Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !e.ctrlKey && !e.metaKey)) {
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
  };

  // Group hotels by country
  const hotelsByCountry = hotels.reduce((acc: Record<string, Hotel[]>, hotel) => {
    if (!acc[hotel.country]) {
      acc[hotel.country] = [];
    }
    acc[hotel.country].push(hotel);
    return acc;
  }, {});

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-lg border-0">
        <CommandInput placeholder="Search hotels by name, country or city..." />
        <CommandList>
          <CommandEmpty>No hotels found.</CommandEmpty>
          
          {Object.entries(hotelsByCountry).map(([country, countryHotels]) => (
            <React.Fragment key={country}>
              <CommandGroup heading={country}>
                {countryHotels.map((hotel) => (
                  <CommandItem 
                    key={hotel.id} 
                    value={`${hotel.name} ${hotel.country} ${hotel.city} ${hotel.governorate}`}
                    onSelect={() => handleSelect(hotel)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Building className="mr-2 h-4 w-4 text-indigo-500" />
                        <span>{hotel.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{hotel.city}, {hotel.governorate}</span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default HotelCommandSearch;
