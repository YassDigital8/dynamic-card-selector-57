
import React, { useState } from 'react';
import { ArrowLeft, Pencil, Globe, Save, Trash2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StarRating from '../card/StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getHotelAvatar } from '../card/HotelCardUtils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useToast } from '@/hooks/use-toast';

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
  onLogoChange
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

  // Mock function for the file upload handler
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
          
          {/* Hotel Logo - Larger size with edit functionality */}
          <div className="relative group">
            <Avatar className="h-20 w-20 border border-indigo-100 dark:border-indigo-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            {/* Edit Logo Button Overlay */}
            <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-0 right-0 bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700 rounded-full h-6 w-6 p-0 shadow-sm"
                >
                  <Pencil className="h-3 w-3" />
                  <span className="sr-only">Edit Logo</span>
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Hotel Logo</DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32 border border-indigo-100 dark:border-indigo-800 shadow-md">
                      <AvatarImage src={avatarUrl} alt={name} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-2xl">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="logo-upload" className="mb-2">Upload new logo</Label>
                    <Input 
                      id="logo-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="cursor-pointer" 
                    />
                  </div>
                </div>
                
                <DialogFooter className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={handleRemoveLogo} 
                    size="sm"
                    className="mr-auto"
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Remove Logo
                  </Button>
                  
                  <DialogClose asChild>
                    <Button type="button" variant="outline" size="sm">
                      <X className="mr-1 h-3.5 w-3.5" />
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            
            {/* Star Rating */}
            {typeof rating === 'number' && rating > 0 && (
              <div className="flex items-center">
                <StarRating rating={rating} size="md" />
                <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)} stars</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Globe className="mr-1 h-4 w-4 text-indigo-500" />
              <span>
                {posKey} · {country}, {governorate}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {onSave && (
            <Button
              onClick={onSave}
              variant="default"
              size="sm"
              className="text-xs h-8 bg-green-600 hover:bg-green-700"
            >
              <Save className="mr-1 h-3.5 w-3.5" />
              Save Hotel
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={onDelete}
              variant="destructive"
              size="sm"
              className="text-xs h-8"
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </Button>
          )}
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="text-xs h-8"
          >
            <Pencil className="mr-1 h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;
