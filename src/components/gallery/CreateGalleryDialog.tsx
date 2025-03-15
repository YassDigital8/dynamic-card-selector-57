
import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Gallery, FileInfo } from '@/models/FileModel';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useToast } from '@/hooks/use-toast';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { GalleryForm } from '@/components/gallery/GalleryForm';
import { CoverImageSelector } from '@/components/gallery/CoverImageSelector';

interface CreateGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGallery: (gallery: Gallery) => void;
}

export const CreateGalleryDialog: React.FC<CreateGalleryDialogProps> = ({ 
  open, 
  onOpenChange,
  onCreateGallery
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverType, setCoverType] = useState<'upload' | 'icon' | 'gallery'>('icon');
  const [selectedIconName, setSelectedIconName] = useState<string | undefined>('FolderOpen');
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  
  const { selectedFile, filePreview, isImage, handleFile, resetFileSelection } = useFileSelection();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { userInfo } = useAuthentication();
  const { toast } = useToast();

  // Empty array for gallery files since this is just creating a new gallery
  const galleryImageFiles: FileInfo[] = [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gallery name is required",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would create the gallery on the server
      // For now, we'll create a mock gallery object
      const newGallery: Gallery = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim() || undefined,
        createdBy: userInfo?.email || 'unknown',
        createdOn: new Date().toISOString(),
        fileCount: 0
      };

      // Add cover image or icon based on selection
      if (coverType === 'icon' && selectedIconName) {
        newGallery.iconName = selectedIconName;
      } else if ((coverType === 'upload' || coverType === 'gallery') && coverImage) {
        newGallery.coverImageUrl = coverImage;
      }
      
      // Simulate API call
      setTimeout(() => {
        onCreateGallery(newGallery);
        
        // Reset form
        setName('');
        setDescription('');
        setSelectedIconName('FolderOpen');
        setCoverImage(undefined);
        handleFile(null);
        setCoverType('icon');
        
        toast({
          title: "Gallery created",
          description: `"${name}" gallery has been created successfully.`,
        });
        
        setIsSubmitting(false);
        onOpenChange(false);
      }, 500);
      
    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create gallery. Please try again.",
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
    setSelectedIconName(undefined);
  };
  
  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    setSelectedIconName(iconName);
    setCoverImage(undefined);
  };
  
  // Handle gallery image selection
  const handleGalleryImageSelect = (file: FileInfo) => {
    setCoverImage(file.url);
    setSelectedIconName(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Gallery</DialogTitle>
          <DialogDescription>
            Create a new gallery to organize your files and media
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <CoverImageSelector
              coverImage={coverImage}
              selectedIconName={selectedIconName}
              coverImageSource={coverType}
              onCoverImageSourceChange={setCoverType}
              onImageUpload={handleImageUpload}
              onIconSelect={handleIconSelect}
              onGalleryImageSelect={handleGalleryImageSelect}
              selectedFile={selectedFile}
              filePreview={filePreview}
              isImage={isImage}
              handleFile={handleFile}
              galleryImageFiles={galleryImageFiles}
            />

            <GalleryForm
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              onCancel={() => onOpenChange(false)}
              onSubmit={handleSubmit}
              submitLabel={isSubmitting ? 'Creating...' : 'Create Gallery'}
              cancelLabel="Cancel"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
