
import React, { useEffect } from 'react';
import { FileInfo } from '@/models/FileModel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Trash2, Share2, Check } from 'lucide-react';
import { FilePreview } from './FilePreview';
import { useDrag, useGlobalDragState } from '@/hooks/gallery/useDragAndDrop';

interface DraggableFileCardProps {
  file: FileInfo;
  onView: () => void;
  onShare: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  showCheckbox?: boolean;
  onSelect?: () => void;  // Add this prop for handling selection
}

export const DraggableFileCard: React.FC<DraggableFileCardProps> = ({ 
  file, 
  onView, 
  onShare,
  onDelete,
  isSelected = false,
  showCheckbox = false,
  onSelect
}) => {
  const { isDragging: globalIsDragging, resetDragState } = useGlobalDragState();
  const { dragRef, isDragging: isThisCardDragging } = useDrag<FileInfo>(file);

  // Clean up drag state if component unmounts while dragging
  useEffect(() => {
    return () => {
      if (isThisCardDragging) {
        resetDragState();
      }
    };
  }, [isThisCardDragging, resetDragState]);

  const handleView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onView();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare(e);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(e);
  };

  const handleCardClick = () => {
    if (showCheckbox && onSelect) {
      onSelect();
    }
  };

  return (
    <Card 
      ref={dragRef}
      className={`overflow-hidden h-full flex flex-col transition-all cursor-pointer ${
        isThisCardDragging ? 'opacity-50 scale-95 shadow-lg' : ''
      } ${isSelected ? 'ring-2 ring-primary' : ''}`}
      data-file-id={file.id}
      draggable="true"
      onClick={handleCardClick}
    >
      <div className="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        {showCheckbox && (
          <div className="absolute top-2 left-2 z-10">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'bg-white border border-gray-300'}`}>
              {isSelected && <Check className="h-3 w-3" />}
            </div>
          </div>
        )}
        <FilePreview file={file} />
      </div>
      <CardContent className="p-3 flex-1 flex flex-col">
        <div className="mb-2 flex-1">
          <h3 className="font-medium text-sm truncate" title={file.metadata?.title || file.name}>
            {file.metadata?.title || file.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{file.name}</p>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{file.size} KB</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
