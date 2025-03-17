
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
  Swimming
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    airConditioning: <AirVent className="h-4 w-4" />,
    bar: <GlassWater className="h-4 w-4" />,
    gym: <Dumbbell className="h-4 w-4" />,
    parking: <HotelIcon className="h-4 w-4" />,
    spa: <Bath className="h-4 w-4" />,
    restaurant: <Utensils className="h-4 w-4" />,
    breakfast: <Coffee className="h-4 w-4" />,
    wifi: <Wifi className="h-4 w-4" />,
    swimmingPool: <Swimming className="h-4 w-4" />,
    petsAllowed: <PawPrint className="h-4 w-4" />,
    extraBed: <BedDouble className="h-4 w-4" />
  };

  return (
    <div className="tooltip" data-tip={formatAmenityName(amenity)}>
      {iconMap[amenity]}
    </div>
  );
};

const formatAmenityName = (amenity: keyof HotelAmenities): string => {
  // Convert camelCase to Title Case with spaces
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Hotel Network</h2>
      {hotels.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/50 rounded-lg border border-dashed">
          <h3 className="text-lg font-medium mb-2">No Hotels Yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your hotel network is empty. Add your first hotel to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <motion.div 
              key={hotel.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => onSelectHotel(hotel)}
            >
              <Card 
                className={`h-full ${selectedHotel?.id === hotel.id ? 'border-primary ring-1 ring-primary' : ''}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Flag className="mr-1 h-3.5 w-3.5" />
                    <span>{hotel.country}</span>
                    <span className="px-1">•</span>
                    <span>{hotel.governorate}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span className="truncate">{hotel.streetAddress}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(hotel.amenities) as Array<keyof HotelAmenities>).map(amenity => (
                      <AmenityIcon key={amenity} amenity={amenity} value={hotel.amenities[amenity]} />
                    ))}
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-3.5 w-3.5" />
                      <span>{hotel.roomTypes.length} room types</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditHotel(hotel);
                        }}
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
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {hotelToDelete?.name}? This action cannot be undone.
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
