
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';
import { FileInfo } from '@/models/FileModel';
import { Check } from 'lucide-react';
import { useGalleryFiles } from '@/components/hotel/form/room-types/useGalleryFiles';

interface GalleryTabProps {
  itemLabel: string;
  onSelectFile: (file: FileInfo) => void;
  selectedFiles: FileInfo[];
  multiSelect?: boolean;
  onConfirmSelection: () => void;
  onCancel: () => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({
  itemLabel,
  onSelectFile,
  selectedFiles,
  multiSelect = false,
  onConfirmSelection,
  onCancel
}) => {
  const { files } = useGalleryViewModel();
  const { galleryFiles } = useGalleryFiles(); // Get enhanced gallery files
  
  // Combine user files with enhanced gallery files
  const combinedFiles = [...files];
  
  // Only add enhanced files if they're not already in the user's files
  const enhancedFiles = galleryFiles.filter(gf => 
    !files.some(f => f.id === gf.id)
  );
  
  // Use combined files for the gallery
  const allGalleryFiles = [...combinedFiles, ...enhancedFiles];

  const isFileSelected = (file: FileInfo): boolean => {
    return selectedFiles.some(f => f.id === file.id);
  };

  return (
    <>
      {allGalleryFiles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {allGalleryFiles.filter(file => file.type.startsWith('image/')).map((file) => (
            <div 
              key={file.id} 
              className={`cursor-pointer border rounded-md overflow-hidden hover:border-primary transition-colors ${
                isFileSelected(file) 
                  ? 'ring-2 ring-primary border-primary' 
                  : ''
              }`}
              onClick={() => onSelectFile(file)}
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img 
                  src={file.url} 
                  alt={file.metadata?.altText || file.name} 
                  className="h-full w-full object-cover"
                />
                {multiSelect && isFileSelected(file) && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{file.metadata?.title || file.name}</p>
                {multiSelect && (
                  <p className="text-xs text-muted-foreground">
                    {isFileSelected(file) ? 'Selected' : 'Click to select'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No images available in your gallery</p>
          <p className="text-sm text-muted-foreground mt-2">Upload images first to select from gallery</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        {multiSelect && (
          <Button 
            type="button"
            onClick={onConfirmSelection}
            disabled={selectedFiles.length === 0}
          >
            Add {selectedFiles.length} Image{selectedFiles.length !== 1 ? 's' : ''}
          </Button>
        )}
      </div>
    </>
  );
};
