
import { useState } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';

export interface UseFilesReturn {
  files: FileInfo[];
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
  handleFileUpload: (newFile: FileInfo) => void;
  handleDeleteFile: (fileToDelete: FileInfo) => void;
  handleMoveFile: (fileToMove: FileInfo, toGalleryId: string) => void;
}

export const useFiles = (
  galleries: Gallery[],
  setGalleries: React.Dispatch<React.SetStateAction<Gallery[]>>
): UseFilesReturn => {
  const { toast } = useToast();
  
  const [files, setFiles] = useState<FileInfo[]>([
    {
      id: '1',
      name: 'hotapplecider.jpg',
      type: 'image/jpeg',
      size: 35,
      url: '/lovable-uploads/3a621cb8-d92e-4aba-9238-fa2fc37b23a7.png',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-10T10:30:00',
      galleryId: '1',
      metadata: {
        title: 'Hot Apple Cider',
        altText: 'A cup of hot apple cider with cinnamon sticks',
        caption: 'Enjoy the warmth of autumn',
        description: 'Freshly brewed hot apple cider with cinnamon sticks and spices',
        dimensions: {
          width: 300,
          height: 479
        }
      }
    },
    {
      id: '2',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 120,
      url: '/placeholder.svg',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-09T14:20:00',
      galleryId: '2'
    }
  ]);

  const handleFileUpload = (newFile: FileInfo) => {
    setFiles(prevFiles => [newFile, ...prevFiles]);
    
    setGalleries(prevGalleries => 
      prevGalleries.map(gallery => 
        gallery.id === newFile.galleryId 
          ? { ...gallery, fileCount: gallery.fileCount + 1 } 
          : gallery
      )
    );
  };

  const handleDeleteFile = (fileToDelete: FileInfo) => {
    // Remove the file from the files array
    setFiles(prevFiles => 
      prevFiles.filter(file => file.id !== fileToDelete.id)
    );
    
    // Update the file count in the gallery
    setGalleries(prevGalleries => 
      prevGalleries.map(gallery => 
        gallery.id === fileToDelete.galleryId 
          ? { ...gallery, fileCount: Math.max(0, gallery.fileCount - 1) } 
          : gallery
      )
    );
  };

  const handleMoveFile = (fileToMove: FileInfo, toGalleryId: string) => {
    // Make sure we're not moving to the same gallery
    if (fileToMove.galleryId === toGalleryId) return;
    
    // Update the file with the new gallery ID
    const updatedFile = { ...fileToMove, galleryId: toGalleryId };
    
    // Update the files array
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileToMove.id ? updatedFile : file
      )
    );
    
    // Update file counts in both galleries
    setGalleries(prevGalleries => 
      prevGalleries.map(gallery => {
        if (gallery.id === fileToMove.galleryId) {
          // Decrement count in source gallery
          return { ...gallery, fileCount: Math.max(0, gallery.fileCount - 1) };
        } else if (gallery.id === toGalleryId) {
          // Increment count in destination gallery
          return { ...gallery, fileCount: gallery.fileCount + 1 };
        }
        return gallery;
      })
    );
    
    // Show toast notification
    toast({
      description: "File moved successfully",
    });
  };

  return {
    files,
    setFiles,
    handleFileUpload,
    handleDeleteFile,
    handleMoveFile
  };
};
