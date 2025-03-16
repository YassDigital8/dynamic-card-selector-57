
import React, { useState } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { GalleryList } from './GalleryList';
import { UploadComponent } from './UploadComponent';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Plus, Edit, ArrowLeft, Trash2, Share2 } from 'lucide-react';
import { EditGalleryDialog } from './EditGalleryDialog';
import { FileList } from './FileList';
import { ShareDialog } from './ShareDialog';
import { useToast } from '@/hooks/use-toast';

interface GalleryTabContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  galleries: Gallery[];
  files: FileInfo[];
  selectedGallery: Gallery | null;
  setSelectedGallery: (gallery: Gallery | null) => void;
  galleryFileTypes: Record<string, string[]>;
  onSelectGallery: (gallery: Gallery) => void;
  onFileUploaded: (file: FileInfo) => void;
  onViewFile: (file: FileInfo) => void;
  onUpdateGallery: (gallery: Gallery) => void;
  onDeleteFile?: (file: FileInfo) => void;
}

export const GalleryTabContent: React.FC<GalleryTabContentProps> = ({
  activeTab,
  setActiveTab,
  galleries,
  files,
  selectedGallery,
  setSelectedGallery,
  galleryFileTypes,
  onSelectGallery,
  onFileUploaded,
  onViewFile,
  onUpdateGallery,
  onDeleteFile
}) => {
  const [isEditGalleryOpen, setIsEditGalleryOpen] = useState(false);
  const [isShareGalleryOpen, setIsShareGalleryOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredFiles = selectedGallery
    ? files.filter(file => file.galleryId === selectedGallery.id)
    : [];

  // Handler for the "Add Files" button
  const handleAddFiles = () => {
    // Switch to upload tab while keeping the selected gallery
    setActiveTab('upload');
  };

  // Handler for viewing a file after upload
  const handleViewFile = (file: FileInfo) => {
    // Set the selected gallery to the gallery the file belongs to
    const fileGallery = galleries.find(g => g.id === file.galleryId);
    if (fileGallery) {
      setSelectedGallery(fileGallery);
    }
    
    // Call the parent component's onViewFile
    onViewFile(file);
    
    // Switch to browse tab
    setActiveTab('browse');
  };

  // Handler for deleting a file
  const handleDeleteFile = (file: FileInfo) => {
    if (onDeleteFile) {
      onDeleteFile(file);
      
      // Show a toast notification for successful deletion
      toast({
        description: (
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span>File deleted successfully</span>
          </div>
        ),
      });
    }
  };

  return (
    <div className="space-y-4">
      {activeTab === 'galleries' && (
        <GalleryList 
          galleries={galleries}
          onSelectGallery={onSelectGallery}
          fileTypes={galleryFileTypes}
        />
      )}
      
      {activeTab === 'upload' && (
        <UploadComponent 
          onFileUploaded={onFileUploaded}
          galleries={galleries}
          selectedGalleryId={selectedGallery?.id}
          onViewFile={handleViewFile}
        />
      )}
      
      {activeTab === 'browse' && selectedGallery && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setSelectedGallery(null);
                  setActiveTab('galleries');
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h2 className="text-xl font-semibold">{selectedGallery.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsShareGalleryOpen(true)}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditGalleryOpen(true)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Gallery
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddFiles}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Files
              </Button>
            </div>
          </div>
          
          {selectedGallery.description && (
            <Alert className="mb-4">
              <AlertDescription>{selectedGallery.description}</AlertDescription>
            </Alert>
          )}
          
          {filteredFiles.length > 0 ? (
            <FileList 
              files={filteredFiles}
              onViewFile={onViewFile}
              onDeleteFile={handleDeleteFile}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border rounded-md">
              <p className="text-muted-foreground mb-4">No files in this gallery</p>
              <Button
                onClick={handleAddFiles}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Files
              </Button>
            </div>
          )}
          
          <EditGalleryDialog
            open={isEditGalleryOpen}
            onOpenChange={setIsEditGalleryOpen}
            gallery={selectedGallery}
            onUpdateGallery={onUpdateGallery}
            files={files}
          />
          
          <ShareDialog
            open={isShareGalleryOpen}
            onOpenChange={setIsShareGalleryOpen}
            item={selectedGallery}
            itemType="gallery"
          />
        </>
      )}
    </div>
  );
};
