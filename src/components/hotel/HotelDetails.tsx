
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
import { motion } from 'framer-motion';

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

  // Animation variants for staggered card reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
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
      </motion.div>

      <motion.div variants={itemVariants}>
        <LocationCard 
          country={hotel.country} 
          governorate={hotel.governorate} 
          streetAddress={hotel.streetAddress} 
          posKey={hotel.posKey} 
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AmenitiesCard amenities={hotel.amenities} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ContactDetailsCard 
          contactDetails={hotel.contactDetails} 
          socialMedia={hotel.socialMedia} 
        />
      </motion.div>

      {/* Contract Documents Card */}
      <motion.div variants={itemVariants}>
        <ContractDocumentsCard 
          contractDocuments={hotel.contractDocuments} 
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RoomTypesCard roomTypes={hotel.roomTypes} updatedAt={hotel.updatedAt} />
      </motion.div>
    </motion.div>
  );
});

HotelDetails.displayName = 'HotelDetails';

export default HotelDetails;
