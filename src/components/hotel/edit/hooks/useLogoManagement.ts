
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { handleFileUpload } from '../utils/imageHandling';

export const useLogoManagement = (initialLogo?: string) => {
  const [customLogo, setCustomLogo] = useState<string | undefined>(initialLogo);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleFileUploadWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFileUpload(file, toast, (dataUrl) => {
      setCustomLogo(dataUrl);
      setIsLogoDialogOpen(false);
    });
  };
  
  const handleRemoveLogo = () => {
    setCustomLogo(undefined);
    setIsLogoDialogOpen(false);
    toast({
      title: "Logo removed",
      description: "Hotel logo has been removed",
    });
  };

  const handleLogoClick = () => {
    setIsLogoDialogOpen(true);
  };

  return {
    customLogo,
    isLogoDialogOpen,
    setIsLogoDialogOpen,
    handleFileUpload: handleFileUploadWrapper,
    handleRemoveLogo,
    handleLogoClick
  };
};
