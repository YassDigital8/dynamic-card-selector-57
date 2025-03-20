
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import HotelForm from '../HotelForm';
import { Hotel, HotelFormData } from '@/models/HotelModel';
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
    // Include the logo URL in the form data
    onSubmit({
      ...data,
      logoUrl: customLogo
    });
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
