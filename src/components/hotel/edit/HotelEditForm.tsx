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
    console.log('HotelEditForm - Amenities:', JSON.stringify(selectedHotel.amenities, null, 2));
    
    Object.entries(selectedHotel.amenities).forEach(([key, value]) => {
      if (key.includes('Images')) {
        console.log(`HotelEditForm - ${key}:`, JSON.stringify(value, null, 2));
        if (Array.isArray(value) && value.length > 0) {
          console.log(`First image in ${key}:`, JSON.stringify(value[0], null, 2));
        }
      }
    });
  }, [selectedHotel]);

  const initials = selectedHotel.name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <motion.div
      key="edit-form"
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
