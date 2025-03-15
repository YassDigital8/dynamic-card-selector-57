
import { useState } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from '@/hooks/useAuthentication';

interface UseGalleryFormProps {
  onComplete: (gallery: Gallery) => void;
  onCancel: () => void;
  initialData?: Partial<Gallery>;
  mode?: 'create' | 'edit';
}

export const useGalleryForm = ({
  onComplete,
  onCancel,
  initialData = {},
  mode = 'create'
}: UseGalleryFormProps) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverType, setCoverType] = useState<'upload' | 'icon' | 'gallery'>(
    initialData.coverImageUrl ? 'upload' : initialData.iconName ? 'icon' : 'icon'
  );
  const [selectedIconName, setSelectedIconName] = useState<string | undefined>(initialData.iconName || 'FolderOpen');
  const [coverImage, setCoverImage] = useState<string | undefined>(initialData.coverImageUrl);
  
  const { userInfo } = useAuthentication();
  const { toast } = useToast();

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
      // Create the gallery object
      const gallery: Gallery = {
        id: initialData.id || Date.now().toString(),
        name: name.trim(),
        description: description.trim() || undefined,
        createdBy: initialData.createdBy || userInfo?.email || 'unknown',
        createdOn: initialData.createdOn || new Date().toISOString(),
        fileCount: initialData.fileCount || 0
      };

      // Add cover image or icon based on selection
      if (coverType === 'icon' && selectedIconName) {
        gallery.iconName = selectedIconName;
        gallery.coverImageUrl = undefined;
      } else if ((coverType === 'upload' || coverType === 'gallery') && coverImage) {
        gallery.coverImageUrl = coverImage;
        gallery.iconName = undefined;
      }
      
      // Simulate API call
      setTimeout(() => {
        onComplete(gallery);
        
        // Show success message
        toast({
          title: mode === 'create' ? "Gallery created" : "Gallery updated",
          description: `"${name}" gallery has been ${mode === 'create' ? 'created' : 'updated'} successfully.`,
        });
        
        setIsSubmitting(false);
        onCancel();
      }, 500);
      
    } catch (error) {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${mode === 'create' ? 'create' : 'update'} gallery. Please try again.`,
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

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedIconName('FolderOpen');
    setCoverImage(undefined);
    setCoverType('icon');
  };

  return {
    name,
    setName,
    description,
    setDescription,
    isSubmitting,
    coverType,
    setCoverType,
    selectedIconName,
    coverImage,
    handleSubmit,
    handleImageUpload,
    handleIconSelect,
    handleGalleryImageSelect,
    resetForm,
    submitLabel: isSubmitting 
      ? (mode === 'create' ? 'Creating...' : 'Updating...') 
      : (mode === 'create' ? 'Create Gallery' : 'Update Gallery'),
    cancelLabel: 'Cancel'
  };
};
