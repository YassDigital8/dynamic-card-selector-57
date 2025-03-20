
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHotelAvatar } from '../card/HotelCardUtils';
import { useToast } from '@/hooks/use-toast';
import { HotelAvatar, HotelInfo, HeaderActions, LogoDialog } from './header';

interface HotelHeaderProps {
  name: string;
  posKey: string;
  country: string;
  governorate: string;
  rating?: number;
  onEdit: () => void;
  onBack?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  customLogo?: string;
  onLogoChange?: (logo: string | null) => void;
  isEditing?: boolean;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({
  name,
  posKey,
  country,
  governorate,
  rating,
  onEdit,
  onBack,
  onSave,
  onDelete,
  customLogo,
  onLogoChange,
  isEditing = false
}) => {
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Get a consistent avatar for this hotel
  const avatarUrl = customLogo || getHotelAvatar(name);
  
  // Generate initials for the fallback
  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Handle the file upload
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
      if (e.target?.result && onLogoChange) {
        onLogoChange(e.target.result as string);
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
    if (onLogoChange) {
      onLogoChange(null);
      setIsLogoDialogOpen(false);
      toast({
        title: "Logo removed",
        description: "Hotel logo has been removed",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          
          {/* Hotel Logo with edit functionality - only when in edit mode */}
          <HotelAvatar 
            name={name}
            customLogo={customLogo}
            onEditClick={() => setIsLogoDialogOpen(true)}
            isEditing={isEditing}
          />
          
          {/* Hotel Information */}
          <HotelInfo 
            name={name}
            posKey={posKey}
            country={country}
            governorate={governorate}
            rating={rating}
          />
        </div>
        
        {/* Header Action Buttons */}
        <HeaderActions 
          onEdit={onEdit}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
      
      {/* Logo Dialog - only shown when edit button is clicked */}
      <LogoDialog 
        isOpen={isLogoDialogOpen}
        onOpenChange={setIsLogoDialogOpen}
        onLogoUpload={handleFileUpload}
        onLogoRemove={handleRemoveLogo}
        avatarUrl={avatarUrl}
        hotelName={name}
        initials={initials}
      />
    </div>
  );
};

export default HotelHeader;
