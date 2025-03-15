
import React, { useState } from 'react';
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
      
      // Simulate API call
      setTimeout(() => {
        onCreateGallery(newGallery);
        
        // Reset form
        setName('');
        setDescription('');
        
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
