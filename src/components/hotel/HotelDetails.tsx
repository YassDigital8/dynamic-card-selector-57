
import React, { memo, useState } from 'react';
import { Hotel } from '@/models/HotelModel';
import { 
  HotelHeader, 
  LocationCard, 
  AmenitiesCard, 
  RoomTypesCard,
  ContractDocumentsCard 
} from './details';
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

const HotelDetails = memo(({ 
  hotel, 
  onEdit, 
  onSave, 
  onBack, 
  onDelete,
  onLogoChange,
  isEditing = false
}: HotelDetailsProps) => {
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

  // Get the extra bed price from the extraBedPolicy if available
  const extraBedPrice = hotel.extraBedPolicy?.pricePerNight;

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

      <AmenitiesCard 
        amenities={hotel.amenities} 
        extraBedPrice={extraBedPrice}
      />

      <ContactDetailsCard 
        contactDetails={hotel.contactDetails} 
        socialMedia={hotel.socialMedia} 
      />

      {/* Add the new ContractDocumentsCard component */}
      <ContractDocumentsCard 
        contractDocuments={hotel.contractDocuments} 
      />

      <RoomTypesCard roomTypes={hotel.roomTypes} updatedAt={hotel.updatedAt} />
    </div>
  );
});

HotelDetails.displayName = 'HotelDetails';

export default HotelDetails;
