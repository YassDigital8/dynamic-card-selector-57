
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HotelForm from './HotelForm';
import { Hotel, HotelFormData } from '@/models/HotelModel';
import { Save, X, Trash2, Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogoDialog } from './details/header';
import { getHotelAvatar } from './card/HotelCardUtils';
import { useToast } from '@/hooks/use-toast';

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

  // Get a consistent avatar for this hotel
  const avatarUrl = customLogo || getHotelAvatar(selectedHotel.name);
  
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
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar 
                className="h-16 w-16 border border-blue-100 dark:border-blue-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsLogoDialogOpen(true)}
              >
                <AvatarImage src={avatarUrl} alt={selectedHotel.name} />
                <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLogoDialogOpen(true)}
                className="absolute bottom-0 right-0 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 rounded-full h-6 w-6 p-0 shadow-sm"
              >
                <Image className="h-3 w-3" />
                <span className="sr-only">Edit Logo</span>
              </Button>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Edit Hotel</h2>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-blue-200 dark:border-blue-800"
              type="button"
              size="sm"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              form="hotel-form" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Save className="mr-1 h-3.5 w-3.5" />
              {isLoading ? "Saving..." : "Save Hotel"}
            </Button>
            {onDelete && (
              <Button 
                type="button" 
                variant="destructive"
                onClick={onDelete}
                size="sm"
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
              </Button>
            )}
          </div>
        </div>
        <HotelForm
          initialData={{...selectedHotel, logoUrl: customLogo}}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          showButtons={false}
        />
        
        {/* Bottom buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-blue-200 dark:border-blue-800"
            type="button"
            size="sm"
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="hotel-form" 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Save className="mr-1 h-3.5 w-3.5" />
            {isLoading ? "Saving..." : "Save Hotel"}
          </Button>
          {onDelete && (
            <Button 
              type="button" 
              variant="destructive"
              onClick={onDelete}
              size="sm"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </Button>
          )}
        </div>

        {/* Logo Dialog */}
        <LogoDialog 
          isOpen={isLogoDialogOpen}
          onOpenChange={setIsLogoDialogOpen}
          onLogoUpload={handleFileUpload}
          onLogoRemove={handleRemoveLogo}
          avatarUrl={avatarUrl}
          hotelName={selectedHotel.name}
          initials={initials}
        />
      </Card>
    </motion.div>
  );
};

export default HotelEditForm;
