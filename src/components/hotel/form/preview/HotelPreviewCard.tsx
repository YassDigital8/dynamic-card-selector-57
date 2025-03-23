
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '../formSchema';
import { Hotel } from '@/models/HotelModel';
import { Separator } from '@/components/ui/separator';
import StarRating from '../../card/StarRating';
import { MapPin, Users, Home, Bed } from 'lucide-react';
import HotelCardAmenities from '../../card/HotelCardAmenities';

const HotelPreviewCard: React.FC = () => {
  const form = useFormContext<FormValues>();
  
  // Watch form values for live preview
  const name = useWatch({ control: form.control, name: 'name' });
  const rating = useWatch({ control: form.control, name: 'rating' });
  const country = useWatch({ control: form.control, name: 'country' });
  const governorate = useWatch({ control: form.control, name: 'governorate' });
  const amenities = useWatch({ control: form.control, name: 'amenities' });
  const roomTypes = useWatch({ control: form.control, name: 'roomTypes' });
  const logoUrl = useWatch({ control: form.control, name: 'logoUrl' });
  
  // Calculate total rooms and capacity
  const totalRooms = roomTypes?.length || 0;
  const maxCapacity = roomTypes?.reduce((sum, room) => sum + (room.maxAdults || 0), 0) || 0;
  
  // Get first room image for card display
  const firstRoomWithImage = roomTypes?.find(room => 
    (room.images && room.images.length > 0) || room.imageUrl
  );
  const previewImage = firstRoomWithImage?.images?.[0] || firstRoomWithImage?.imageUrl;
  
  // Create initials from hotel name if no logo
  const initials = name
    ? name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()
    : '';
  
  return (
    <Card className="overflow-hidden border-blue-100 dark:border-blue-900 shadow-md">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 text-center">
        <h3 className="font-medium text-lg">Preview Card</h3>
        <p className="text-xs text-blue-100">How your hotel will appear in listings</p>
      </div>
      
      <CardContent className="p-0">
        <div className="relative">
          {previewImage ? (
            <div className="h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img
                src={previewImage}
                alt={name || 'Hotel room'}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
              <Home className="h-20 w-20 text-blue-300 dark:text-blue-700" />
            </div>
          )}
          
          {rating !== undefined && rating > 0 && (
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-md p-1 shadow-md">
              <StarRating rating={rating} size="sm" />
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3">
            {logoUrl ? (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={logoUrl} alt={name || 'Hotel logo'} className="h-full w-full object-cover" />
              </div>
            ) : initials ? (
              <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                {initials}
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
            
            <div>
              <h3 className="font-semibold truncate">
                {name || 'Hotel Name'}
              </h3>
              {(country || governorate) && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">
                    {governorate}{country && governorate && ', '}{country}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <Home className="h-4 w-4 text-blue-500" />
              <span>{totalRooms} Room Type{totalRooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span>Up to {maxCapacity} Guests</span>
            </div>
            {amenities?.extraBed && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4 text-blue-500" />
                <span>Extra Beds Available</span>
              </div>
            )}
          </div>
          
          {amenities && (
            <div>
              <HotelCardAmenities amenities={amenities as Hotel['amenities']} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelPreviewCard;
