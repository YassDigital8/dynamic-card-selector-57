
import React from 'react';
import { 
  AirVent, 
  Utensils, 
  Coffee, 
  Wifi, 
  PawPrint, 
  Pencil,
  Trash2,
  MapPin,
  Flag,
  Users,
  Dumbbell,
  GlassWater,
  Hotel as HotelIcon,
  Bath,
  BedDouble,
  Waves,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Hotel, HotelAmenities } from '@/models/HotelModel';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface HotelListProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
  onEditHotel: (hotel: Hotel) => void;
  onDeleteHotel: (id: string) => void;
}

const AmenityIcon = ({ 
  amenity, 
  value 
}: { 
  amenity: keyof HotelAmenities; 
  value: boolean;
}) => {
  if (!value) return null;
  
  const iconMap = {
    airConditioning: <AirVent className="h-4 w-4 text-blue-500" />,
    bar: <GlassWater className="h-4 w-4 text-purple-500" />,
    gym: <Dumbbell className="h-4 w-4 text-green-500" />,
    parking: <HotelIcon className="h-4 w-4 text-gray-500" />,
    spa: <Bath className="h-4 w-4 text-pink-500" />,
    restaurant: <Utensils className="h-4 w-4 text-amber-500" />,
    breakfast: <Coffee className="h-4 w-4 text-brown-500" />,
    wifi: <Wifi className="h-4 w-4 text-indigo-500" />,
    swimmingPool: <Waves className="h-4 w-4 text-cyan-500" />,
    petsAllowed: <PawPrint className="h-4 w-4 text-orange-500" />,
    extraBed: <BedDouble className="h-4 w-4 text-violet-500" />
  };

  return (
    <div className="tooltip" data-tip={formatAmenityName(amenity)}>
      {iconMap[amenity]}
    </div>
  );
};

const formatAmenityName = (amenity: keyof HotelAmenities): string => {
  return amenity
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  selectedHotel,
  onSelectHotel,
  onEditHotel,
  onDeleteHotel
}) => {
  const [hotelToDelete, setHotelToDelete] = React.useState<Hotel | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleDeleteClick = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (hotelToDelete) {
      onDeleteHotel(hotelToDelete.id);
      setConfirmDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  // Filter hotels based on search term
  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.governorate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Hotels ({filteredHotels.length})
        </h2>
        <Badge variant="outline" className="text-xs">
          {hotels.length} total
        </Badge>
      </div>
      
      {hotels.length > 0 && (
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      )}
      
      {hotels.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-lg border border-dashed">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <HotelIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">No Hotels Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            No hotels in this region. Add your first hotel to get started.
          </p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredHotels.map((hotel) => (
            <motion.div 
              key={hotel.id} 
              variants={item}
              className="cursor-pointer"
              onClick={() => onSelectHotel(hotel)}
            >
              <Card 
                className={`h-full transition-all duration-200 hover:shadow-md ${
                  selectedHotel?.id === hotel.id 
                  ? 'border-blue-400 dark:border-blue-500 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900' 
                  : 'hover:border-blue-200 dark:hover:border-blue-800'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      {hotel.name}
                    </CardTitle>
                    <Badge variant="outline" className="uppercase text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      {hotel.posKey}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Flag className="mr-1 h-3.5 w-3.5 text-indigo-500" />
                    <span>{hotel.country}</span>
                    <span className="px-1">•</span>
                    <span>{hotel.governorate}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3.5 w-3.5 text-pink-500" />
                    <span className="truncate">{hotel.streetAddress}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-white/50 dark:bg-slate-800/50 p-2 rounded-md">
                    {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>)
                      .filter(amenity => hotel.amenities[amenity])
                      .map(amenity => (
                        <AmenityIcon key={amenity} amenity={amenity} value={hotel.amenities[amenity]} />
                      ))}
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <Users className="mr-1 h-3.5 w-3.5 text-blue-500" />
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditHotel(hotel);
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(hotel);
                        }}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="border-red-100 dark:border-red-900">
          <DialogHeader>
            <DialogTitle className="text-destructive">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{hotelToDelete?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelList;
