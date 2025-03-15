
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Gallery, FileInfo } from '@/models/FileModel';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { Pencil, Upload, Image, FileImage } from 'lucide-react';
import { useFileSelection } from '@/hooks/upload/useFileSelection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { IconSelector } from '@/components/gallery/IconSelector';

interface EditGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gallery: Gallery | null;
  onUpdateGallery: (gallery: Gallery) => void;
  files?: FileInfo[];
}

export const EditGalleryDialog: React.FC<EditGalleryDialogProps> = ({
  open,
  onOpenChange,
  gallery,
  onUpdateGallery,
  files = [],
}) => {
  const [name, setName] = useState(gallery?.name || '');
  const [description, setDescription] = useState(gallery?.description || '');
  const [coverImage, setCoverImage] = useState<string | undefined>(gallery?.coverImageUrl);
  const [selectedIconName, setSelectedIconName] = useState<string | undefined>(gallery?.iconName);
  const [coverImageSource, setCoverImageSource] = useState<'upload' | 'icon' | 'gallery'>('upload');
  
  // Use the file selection hook for cover image upload
  const { selectedFile, filePreview, isImage, handleFile, resetFileSelection } = useFileSelection();

  // Reset form when gallery changes
  React.useEffect(() => {
    if (gallery) {
      setName(gallery.name);
      setDescription(gallery.description || '');
      setCoverImage(gallery.coverImageUrl);
      setSelectedIconName(gallery.iconName);
      
      // Determine initial tab based on gallery data
      if (gallery.coverImageUrl) {
        setCoverImageSource('upload');
      } else if (gallery.iconName) {
        setCoverImageSource('icon');
      } else {
        setCoverImageSource('upload');
      }
      
      resetFileSelection();
    }
  }, [gallery, resetFileSelection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gallery) return;
    
    onUpdateGallery({
      ...gallery,
      name,
      description,
      coverImageUrl: coverImageSource === 'upload' ? coverImage : undefined,
      iconName: coverImageSource === 'icon' ? selectedIconName : undefined
    });
    
    onOpenChange(false);
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
    setSelectedIconName(undefined);
    setCoverImageSource('upload');
  };
  
  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    setSelectedIconName(iconName);
    setCoverImage(undefined);
    setCoverImageSource('icon');
  };
  
  // Handle gallery image selection
  const handleGalleryImageSelect = (file: FileInfo) => {
    setCoverImage(file.url);
    setSelectedIconName(undefined);
    setCoverImageSource('upload');
  };

  if (!gallery) return null;

  // Filter only image files
  const galleryImageFiles = files.filter(file => file.type.startsWith('image/'));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit Gallery
          </DialogTitle>
          <DialogDescription>
            Update the details of your gallery
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Gallery Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter gallery name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter gallery description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cover Image</Label>
            
            <Tabs defaultValue={coverImageSource} onValueChange={(value) => setCoverImageSource(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </TabsTrigger>
                <TabsTrigger value="icon" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span>Icon</span>
                </TabsTrigger>
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <FileImage className="h-4 w-4" />
                  <span>Gallery</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-4">
                {coverImage && coverImageSource === 'upload' ? (
                  <div className="relative w-full h-40 mb-2 border rounded-md overflow-hidden">
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImage(undefined)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <FileDropzone
                    onFileSelected={handleFile}
                    selectedFile={selectedFile}
                    filePreview={filePreview}
                    isImage={isImage}
                    onImageUpload={handleImageUpload}
                    accept="image/*"
                    maxFiles={1}
                    className="h-40"
                  />
                )}
              </TabsContent>
              
              <TabsContent value="icon" className="mt-4">
                <IconSelector selectedIcon={selectedIconName} onSelectIcon={handleIconSelect} />
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-4">
                {galleryImageFiles.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2">
                    {galleryImageFiles.map((file) => (
                      <div 
                        key={file.id}
                        className={`relative border rounded-md overflow-hidden cursor-pointer transition-all ${
                          coverImage === file.url ? 'ring-2 ring-primary' : 'hover:opacity-80'
                        }`}
                        onClick={() => handleGalleryImageSelect(file)}
                      >
                        <div className="aspect-square">
                          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                        </div>
                        {coverImage === file.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Selected</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No image files in your galleries</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
