
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGalleryViewModel } from '@/hooks/useGalleryViewModel';
import { FileInfo } from '@/models/FileModel';

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
  
  // We'll use all available files
  const galleryFiles = files;

  const isFileSelected = (file: FileInfo): boolean => {
    return selectedFiles.some(f => f.id === file.id);
  };

  return (
    <>
      {galleryFiles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryFiles.filter(file => file.type.startsWith('image/')).map((file) => (
            <div 
              key={file.id} 
              className={`cursor-pointer border rounded-md overflow-hidden hover:border-primary transition-colors ${
                multiSelect && isFileSelected(file) 
                  ? 'ring-2 ring-primary border-primary' 
                  : ''
              }`}
              onClick={() => onSelectFile(file)}
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={file.url} 
                  alt={file.metadata?.altText || file.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{file.metadata?.title || file.name}</p>
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
