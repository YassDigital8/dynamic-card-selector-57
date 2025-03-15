
import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Gallery } from '@/models/FileModel';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { 
  Image, FolderOpen, Library, BookImage, GalleryHorizontal, 
  GalleryVertical, Folder, Images
} from 'lucide-react';

interface CreateGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGallery: (gallery: Gallery) => void;
}

type GalleryIcon = {
  name: string;
  component: React.ReactNode;
};

export const CreateGalleryDialog: React.FC<CreateGalleryDialogProps> = ({ 
  open, 
  onOpenChange,
  onCreateGallery
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverType, setCoverType] = useState<'icon' | 'image'>('icon');
  const [selectedIcon, setSelectedIcon] = useState<string | null>('FolderOpen');
  
  const { selectedFile, filePreview, isImage, handleFile } = useFileSelection();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { userInfo } = useAuthentication();
  const { toast } = useToast();

  // Gallery icons options
  const galleryIcons: GalleryIcon[] = [
    { name: 'FolderOpen', component: <FolderOpen className="h-full w-full" /> },
    { name: 'Image', component: <Image className="h-full w-full" /> },
    { name: 'Images', component: <Images className="h-full w-full" /> },
    { name: 'Folder', component: <Folder className="h-full w-full" /> },
    { name: 'GalleryHorizontal', component: <GalleryHorizontal className="h-full w-full" /> },
    { name: 'GalleryVertical', component: <GalleryVertical className="h-full w-full" /> },
    { name: 'Library', component: <Library className="h-full w-full" /> },
    { name: 'BookImage', component: <BookImage className="h-full w-full" /> },
  ];

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
      // Reset selected icon when an image is selected
      setSelectedIcon(null);
    }
  };

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
      if (coverType === 'icon' && selectedIcon) {
        newGallery.iconName = selectedIcon;
      } else if (coverType === 'image' && filePreview) {
        newGallery.coverImageUrl = filePreview;
      }
      
      // Simulate API call
      setTimeout(() => {
        onCreateGallery(newGallery);
        
        // Reset form
        setName('');
        setDescription('');
        setSelectedIcon('FolderOpen');
        handleFile(null);
        setCoverType('icon');
        
        toast({
          title: "Gallery created",
          description: `"${name}" gallery has been created successfully.`,
        });
        
        setIsSubmitting(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Gallery</DialogTitle>
          <DialogDescription>
            Create a new gallery to organize your files and media
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gallery-name">Gallery Name</Label>
            <Input 
              id="gallery-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter gallery name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gallery-description">Description (Optional)</Label>
            <Textarea 
              id="gallery-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter gallery description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Gallery Cover</Label>
            <Tabs defaultValue="icon" value={coverType} onValueChange={(value) => setCoverType(value as 'icon' | 'image')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="icon">Choose Icon</TabsTrigger>
                <TabsTrigger value="image">Upload Image</TabsTrigger>
              </TabsList>
              
              <TabsContent value="icon" className="pt-4">
                <div className="grid grid-cols-4 gap-2">
                  {galleryIcons.map((icon) => (
                    <div
                      key={icon.name}
                      onClick={() => setSelectedIcon(icon.name)}
                      className={`cursor-pointer h-14 w-full rounded-md p-2 flex items-center justify-center border-2 transition-colors ${
                        selectedIcon === icon.name
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon.component}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="image" className="pt-4">
                <div className="flex flex-col items-center">
                  {filePreview ? (
                    <div className="mb-3 w-32 h-32 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={filePreview}
                        alt="Gallery cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mb-3 w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md">
                      <Image className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUpload}
                    className="mt-2"
                  >
                    {filePreview ? 'Change Image' : 'Upload Image'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Gallery'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
