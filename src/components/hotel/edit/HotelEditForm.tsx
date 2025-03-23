
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelForm from '../HotelForm';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { LogoDialog } from '../details/header';
import { EditFormHeader } from './';
import { EditFormButtons } from './';
import { useLogoManagement } from './hooks/useLogoManagement';
import { useFormSubmission } from './hooks/useFormSubmission';

interface HotelEditFormProps {
  selectedHotel: Hotel;
  isLoading: boolean;
  onSubmit: (data: HotelFormData) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const HotelEditForm: React.FC<HotelEditFormProps> = ({
  selectedHotel,
  isLoading,
  onSubmit,
  onCancel,
  onDelete
}) => {
  const { 
    customLogo, 
    isLogoDialogOpen, 
    setIsLogoDialogOpen, 
    handleFileUpload, 
    handleRemoveLogo, 
    handleLogoClick 
  } = useLogoManagement(selectedHotel.logoUrl);
  
  const { handleSubmit } = useFormSubmission({
    selectedHotel,
    customLogo,
    onSubmit
  });

  useEffect(() => {
    console.log('HotelEditForm - Initial hotel data for hotel ID:', selectedHotel.id);
    
    // Debug amenity image arrays specifically
    if (selectedHotel.amenities) {
      const imageKeys = Object.keys(selectedHotel.amenities).filter(k => k.includes('Images'));
      console.log('Available image arrays:', imageKeys);
      
      imageKeys.forEach(key => {
        const images = selectedHotel.amenities[key as keyof typeof selectedHotel.amenities];
        if (Array.isArray(images)) {
          console.log(`${key} has ${images.length} images`);
        } else {
          console.warn(`${key} is not a valid array:`, images);
        }
      });
    }
  }, [selectedHotel]);

  const initials = selectedHotel.name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <motion.div
      key={`edit-form-${selectedHotel.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-blue-100 dark:border-blue-900 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <EditFormHeader 
            hotelName={selectedHotel.name}
            customLogo={customLogo}
            onLogoClick={handleLogoClick}
            initials={initials}
          />
          <EditFormButtons
            isLoading={isLoading}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        </div>
        
        <HotelForm
          initialData={{...selectedHotel, logoUrl: customLogo}}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          showButtons={false}
        />
        
        <div className="mt-6 flex justify-end">
          <EditFormButtons
            isLoading={isLoading}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        </div>

        <LogoDialog 
          isOpen={isLogoDialogOpen}
          onOpenChange={setIsLogoDialogOpen}
          onLogoUpload={handleFileUpload}
          onLogoRemove={handleRemoveLogo}
          avatarUrl={customLogo || ''}
          hotelName={selectedHotel.name}
          initials={initials}
        />
      </Card>
    </motion.div>
  );
};

export default HotelEditForm;
