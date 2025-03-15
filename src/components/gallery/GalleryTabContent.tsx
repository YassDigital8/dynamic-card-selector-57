
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Gallery as GalleryModel, FileInfo } from '@/models/FileModel';
import { GalleryList } from '@/components/gallery/GalleryList';
import { Gallery } from '@/components/gallery/Gallery';
import { UploadComponent } from '@/components/gallery/UploadComponent';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { EditGalleryDialog } from '@/components/gallery/EditGalleryDialog';

interface GalleryTabContentProps {
  activeTab: string;
  galleries: GalleryModel[];
  files: FileInfo[];
  selectedGallery: GalleryModel | null;
  galleryFileTypes: Record<string, string[]>;
  onSelectGallery: (gallery: GalleryModel) => void;
  onFileUploaded: (file: FileInfo) => void;
  onViewFile: (file: FileInfo) => void;
  onUpdateGallery: (gallery: GalleryModel) => void;
}

export const GalleryTabContent: React.FC<GalleryTabContentProps> = ({
  activeTab,
  galleries,
  files,
  selectedGallery,
  galleryFileTypes,
  onSelectGallery,
  onFileUploaded,
  onViewFile,
  onUpdateGallery
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const filteredFiles = selectedGallery 
    ? files.filter(file => file.galleryId === selectedGallery.id)
    : files;

  return (
    <>
      <TabsContent value="galleries" className="mt-0">
        <GalleryList 
          galleries={galleries} 
          fileTypes={galleryFileTypes}
          onSelectGallery={onSelectGallery} 
        />
      </TabsContent>
      
      <TabsContent value="browse" className="mt-0">
        {selectedGallery ? (
          <>
            <div className="mb-4 p-4 bg-muted/30 rounded-lg flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{selectedGallery.name}</h2>
                {selectedGallery.description && (
                  <p className="text-sm text-muted-foreground">{selectedGallery.description}</p>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditDialogOpen(true)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Gallery
              </Button>
            </div>
            <Gallery files={filteredFiles} />
            
            <EditGalleryDialog
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
              gallery={selectedGallery}
              onUpdateGallery={onUpdateGallery}
            />
          </>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg mb-4">
            <h2 className="text-lg font-semibold">All Files</h2>
            <p className="text-sm text-muted-foreground">
              Select a gallery from the Galleries tab for filtered results, or browse all files here.
            </p>
            <Gallery files={files} />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="upload" className="mt-0">
        <div className="mb-4 p-4 bg-muted/30 rounded-lg">
          <h2 className="text-lg font-semibold">Upload Files</h2>
          <p className="text-sm text-muted-foreground">Select a gallery and upload files to it</p>
        </div>
        <UploadComponent 
          onFileUploaded={onFileUploaded} 
          galleries={galleries}
          selectedGalleryId={selectedGallery?.id}
          onViewFile={onViewFile}
        />
      </TabsContent>
    </>
  );
};
