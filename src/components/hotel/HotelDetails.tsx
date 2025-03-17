
import React from 'react';
import { Hotel } from '@/models/HotelModel';
import { HotelHeader, LocationCard, AmenitiesCard, RoomTypesCard } from './details';

interface HotelDetailsProps {
  hotel: Hotel;
  onEdit: () => void;
  onBack?: () => void;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, onEdit, onBack }) => {
  return (
    <div className="space-y-6">
      <HotelHeader 
        name={hotel.name}
        posKey={hotel.posKey}
        country={hotel.country}
        governorate={hotel.governorate}
        onEdit={onEdit}
        onBack={onBack}
      />

      <LocationCard 
        country={hotel.country} 
        governorate={hotel.governorate} 
        streetAddress={hotel.streetAddress} 
        posKey={hotel.posKey} 
      />

      <AmenitiesCard amenities={hotel.amenities} />

      <RoomTypesCard roomTypes={hotel.roomTypes} updatedAt={hotel.updatedAt} />
    </div>
  );
};

export default HotelDetails;
