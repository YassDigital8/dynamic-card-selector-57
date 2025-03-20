
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileInfo } from '@/models/FileModel';

interface GalleryTabProps {
  files: FileInfo[];
  selectedFiles: FileInfo[];
  onSelectFile: (file: FileInfo) => void;
  onCancel: () => void;
  onConfirmSelection: () => void;
  multiSelect: boolean;
  isFileSelected: (file: FileInfo) => boolean;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  files,
  selectedFiles,
  onSelectFile,
  onCancel,
  onConfirmSelection,
  multiSelect,
  isFileSelected
}) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No images available in your gallery</p>
        <p className="text-sm text-muted-foreground mt-2">Upload images first to select from gallery</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {files.filter(file => file.type.startsWith('image/')).map((file) => (
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
    </div>
  );
};

export default GalleryTab;
