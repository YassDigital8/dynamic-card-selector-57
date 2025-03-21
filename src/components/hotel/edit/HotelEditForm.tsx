
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelForm from '../HotelForm';
import { Hotel, HotelFormData, AmenityImage } from '@/models/HotelModel';
import { LogoDialog } from '../details/header';
import { useToast } from '@/hooks/use-toast';
import { EditFormHeader } from './';
import { EditFormButtons } from './';

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
  const [customLogo, setCustomLogo] = useState<string | undefined>(selectedHotel.logoUrl);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const { toast } = useToast();

  // Debug - log selected hotel's amenities for troubleshooting
  useEffect(() => {
    console.log('HotelEditForm - Initial hotel data for hotel ID:', selectedHotel.id);
    console.log('HotelEditForm - Amenities:', JSON.stringify(selectedHotel.amenities, null, 2));
    
    // Check for image arrays in the amenities
    Object.entries(selectedHotel.amenities).forEach(([key, value]) => {
      if (key.includes('Images')) {
        console.log(`HotelEditForm - ${key}:`, JSON.stringify(value, null, 2));
        if (Array.isArray(value) && value.length > 0) {
          console.log(`First image in ${key}:`, JSON.stringify(value[0], null, 2));
        }
      }
    });
  }, [selectedHotel]);

  // Generate initials for the fallback
  const initials = selectedHotel.name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCustomLogo(e.target.result as string);
        setIsLogoDialogOpen(false);
        toast({
          title: "Logo updated",
          description: "Hotel logo has been updated successfully",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveLogo = () => {
    setCustomLogo(undefined);
    setIsLogoDialogOpen(false);
    toast({
      title: "Logo removed",
      description: "Hotel logo has been removed",
    });
  };

  const handleSubmit = (data: HotelFormData) => {
    // Debug - log the form data before submission
    console.log('HotelEditForm - Form data before submission:', JSON.stringify(data, null, 2));
    
    // Validate image arrays before submission
    if (data.amenities) {
      Object.entries(data.amenities).forEach(([key, value]) => {
        if (key.includes('Images')) {
          console.log(`HotelEditForm - Submitting ${key}:`, JSON.stringify(value, null, 2));
          if (Array.isArray(value)) {
            console.log(`Found ${value.length} images in ${key}:`, value.length > 0 ? JSON.stringify(value[0], null, 2) : 'empty array');
          } else {
            console.error(`WARNING: ${key} is not an array:`, value);
          }
        }
      });
    }
    
    // Create a deep copy to ensure we don't mutate the original data
    const processedData = JSON.parse(JSON.stringify(data));
    
    // Ensure amenity images data is correctly structured
    const amenityKeysWithImages = ['bar', 'gym', 'spa', 'restaurant', 'breakfast', 'swimmingPool'];
    amenityKeysWithImages.forEach(amenityKey => {
      const imagesKey = `${amenityKey}Images` as keyof typeof processedData.amenities;
      const images = processedData.amenities[imagesKey];
      
      // Ensure images is always an array
      if (!Array.isArray(images)) {
        console.log(`Initializing empty array for ${imagesKey} (was ${typeof images})`);
        processedData.amenities[imagesKey] = [] as AmenityImage[];
        return;
      }
      
      console.log(`Processing ${images.length} images for ${amenityKey}`);
      
      // Process each image in the array to ensure valid structure
      const validatedImages = images.map((img: any, index: number) => {
        if (typeof img !== 'object' || !img) {
          return {
            url: typeof img === 'string' ? img : '',
            id: `${amenityKey}-${index}-${Date.now()}`
          };
        }
        
        return {
          ...img,
          url: img.url || '',
          id: img.id || `${amenityKey}-${index}-${Date.now()}`
        };
      }).filter((img: any) => img.url);
      
      // Assign the validated images back to the processed data
      processedData.amenities[imagesKey] = validatedImages;
      
      console.log(`Validated ${validatedImages.length} images for ${amenityKey}`);
    });
    
    // Include the logo URL in the form data
    processedData.logoUrl = customLogo;
    
    console.log('Final processed data:', JSON.stringify(processedData, null, 2));
    
    // Submit the processed form data to the parent component
    onSubmit(processedData);
  };

  const handleLogoClick = () => {
    setIsLogoDialogOpen(true);
  };

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
        
        {/* Bottom buttons */}
        <div className="mt-6 flex justify-end">
          <EditFormButtons
            isLoading={isLoading}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        </div>

        {/* Logo Dialog */}
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
