
import { useState, useMemo } from 'react';
import { Gallery, FileInfo } from '@/models/FileModel';
import { useToast } from '@/hooks/use-toast';

export interface UseGalleriesReturn {
  galleries: Gallery[];
  setGalleries: React.Dispatch<React.SetStateAction<Gallery[]>>;
  handleCreateGallery: (gallery: Gallery) => void;
  handleUpdateGallery: (updatedGallery: Gallery) => void;
  galleryFileTypes: Record<string, string[]>;
}

export const useGalleries = (files: FileInfo[]): UseGalleriesReturn => {
  const { toast } = useToast();
  
  // Sample data - in a real app this would come from an API
  const [galleries, setGalleries] = useState<Gallery[]>([
    {
      id: '1',
      name: 'Product Images',
      description: 'All product marketing images',
      createdBy: 'admin',
      createdOn: '2024-04-10T10:30:00',
      coverImageUrl: '/lovable-uploads/3a621cb8-d92e-4aba-9238-fa2fc37b23a7.png',
      fileCount: 1
    },
    {
      id: '2',
      name: 'Documentation',
      description: 'User manuals and documentation',
      createdBy: 'admin',
      createdOn: '2024-04-09T14:20:00',
      fileCount: 1
    }
  ]);

  // Create a map of gallery IDs to file types they contain
  const galleryFileTypes = useMemo(() => {
    const typeMap: Record<string, string[]> = {};
    
    files.forEach(file => {
      if (!typeMap[file.galleryId]) {
        typeMap[file.galleryId] = [];
      }
      
      if (!typeMap[file.galleryId].includes(file.type)) {
        typeMap[file.galleryId].push(file.type);
      }
    });
    
    return typeMap;
  }, [files]);

  const handleCreateGallery = (gallery: Gallery) => {
    setGalleries(prev => [gallery, ...prev]);
  };

  const handleUpdateGallery = (updatedGallery: Gallery) => {
    setGalleries(prev => 
      prev.map(gallery => 
        gallery.id === updatedGallery.id ? updatedGallery : gallery
      )
    );
  };

  return {
    galleries,
    setGalleries,
    handleCreateGallery,
    handleUpdateGallery,
    galleryFileTypes
  };
};
