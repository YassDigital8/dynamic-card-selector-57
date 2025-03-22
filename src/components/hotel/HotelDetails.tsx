
import React, { memo, useState } from 'react';
import { Hotel } from '@/models/HotelModel';
import { HotelHeader, LocationCard, AmenitiesCard, RoomTypesCard } from './details';
import ContactDetailsCard from './details/ContactDetailsCard';

interface HotelDetailsProps {
  hotel: Hotel;
  onEdit: () => void;
  onSave?: () => void;
  onBack?: () => void;
  onDelete?: () => void;
  onLogoChange?: (hotelId: string, logo: string | null) => void;
  isEditing?: boolean;
}

const HotelDetails: React.FC<HotelDetailsProps> = memo(({ 
  hotel, 
  onEdit, 
  onSave, 
  onBack, 
  onDelete,
  onLogoChange,
  isEditing = false
}) => {
  const [customLogo, setCustomLogo] = useState<string | null>(hotel.logoUrl || null);
  
  const handleLogoChange = (logo: string | null) => {
    setCustomLogo(logo);
    if (onLogoChange) {
      onLogoChange(hotel.id, logo);
    }
  };

  const handleEdit = () => {
    // This is the only place that should trigger the edit mode
    onEdit();
  };

  return (
    <div className="space-y-6">
      <HotelHeader 
        name={hotel.name}
        posKey={hotel.posKey}
        country={hotel.country}
        governorate={hotel.governorate}
        rating={hotel.rating}
        onEdit={handleEdit}
        onBack={onBack}
        onSave={onSave}
        onDelete={onDelete}
        customLogo={customLogo || undefined}
        onLogoChange={handleLogoChange}
        isEditing={isEditing}
      />

      <LocationCard 
        country={hotel.country} 
        governorate={hotel.governorate} 
        streetAddress={hotel.streetAddress} 
        posKey={hotel.posKey} 
      />

      <AmenitiesCard amenities={hotel.amenities} />

      <ContactDetailsCard 
        contactDetails={hotel.contactDetails} 
        socialMedia={hotel.socialMedia} 
      />

      <RoomTypesCard roomTypes={hotel.roomTypes} updatedAt={hotel.updatedAt} />
    </div>
  );
};

HotelDetails.displayName = 'HotelDetails';

export default HotelDetails;
