
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Upload, Camera, X } from 'lucide-react';
import { FileDropzone } from '@/components/gallery/FileDropzone';
import { useToast } from '@/hooks/use-toast';
import { useFileSelection } from '@/hooks/upload/useFileSelection';

interface ProfilePictureUploadProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ onImageUploaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const { toast } = useToast();
  
  const {
    selectedFile,
    filePreview,
    isImage,
    handleFile,
    resetFileSelection
  } = useFileSelection();

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    resetFileSelection();
  };

  const handleConfirmSelection = () => {
    if (filePreview && isImage) {
      onImageUploaded(filePreview);
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully",
      });
      handleCloseDialog();
    } else {
      toast({
        variant: "destructive",
        title: "Invalid image",
        description: "Please select a valid image file",
      });
    }
  };

  // Mock take photo function (would be replaced with actual webcam integration)
  const handleTakePhoto = () => {
    toast({
      description: "Camera access is not available in this demo",
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2"
        onClick={handleOpenDialog}
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Change Photo
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="camera">
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <FileDropzone
                onFileSelected={handleFile}
                selectedFile={selectedFile}
                filePreview={filePreview}
                isImage={isImage}
                accept="image/*"
              />
            </TabsContent>

            <TabsContent value="camera" className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-4">
                  Camera access would be available here in a real implementation
                </p>
                <Button onClick={handleTakePhoto}>
                  Take Photo
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleCloseDialog} className="gap-1">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSelection} 
              disabled={!filePreview || !isImage}
              className="gap-1"
            >
              <Upload className="h-4 w-4" />
              Update Picture
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePictureUpload;
