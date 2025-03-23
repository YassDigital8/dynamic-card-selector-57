
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
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card className="p-6 border-indigo-100 dark:border-indigo-900 shadow-lg rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-indigo-50 dark:border-indigo-950">
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
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <HotelForm
              initialData={{...selectedHotel, logoUrl: customLogo}}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              showButtons={false}
            />
          </motion.div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-indigo-50 dark:border-indigo-950 flex justify-end">
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
