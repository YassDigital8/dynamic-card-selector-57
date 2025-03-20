
import React, { memo, useState } from 'react';
import { Hotel } from '@/models/HotelModel';
import { HotelHeader, LocationCard, AmenitiesCard, RoomTypesCard } from './details';

interface HotelDetailsProps {
  hotel: Hotel;
  onEdit: () => void;
  onSave?: () => void;
  onBack?: () => void;
  onDelete?: () => void;
  onLogoChange?: (hotelId: string, logo: string | null) => void;
}

const HotelDetails: React.FC<HotelDetailsProps> = memo(({ 
  hotel, 
  onEdit, 
  onSave, 
  onBack, 
  onDelete,
  onLogoChange
}) => {
  const [customLogo, setCustomLogo] = useState<string | null>(hotel.logoUrl || null);
  
  const handleLogoChange = (logo: string | null) => {
    setCustomLogo(logo);
    if (onLogoChange) {
      onLogoChange(hotel.id, logo);
    }
  };

  return (
    <div className="space-y-6">
      <HotelHeader 
        name={hotel.name}
        posKey={hotel.posKey}
        country={hotel.country}
        governorate={hotel.governorate}
        rating={hotel.rating}
        onEdit={onEdit}
        onBack={onBack}
        onSave={onSave}
        onDelete={onDelete}
        customLogo={customLogo || undefined}
        onLogoChange={handleLogoChange}
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
});

HotelDetails.displayName = 'HotelDetails';

export default HotelDetails;
