
import { useState, useMemo } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';

export const useGalleryViewModel = () => {
  const [activeTab, setActiveTab] = useState("galleries");
  const [isCreateGalleryOpen, setIsCreateGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  
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

  const handleCreateGallery = (gallery: Gallery) => {
    setGalleries(prev => [gallery, ...prev]);
    setIsCreateGalleryOpen(false);
  };

  const handleViewFile = (file: FileInfo) => {
    setSelectedFile(file);
    setSelectedGallery(galleries.find(g => g.id === file.galleryId) || null);
    setActiveTab("browse");
  };

  const handleSelectGallery = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setActiveTab("browse");
  };

  return {
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    selectedFile,
    galleries,
    files,
    galleryFileTypes,
    handleFileUpload,
    handleCreateGallery,
    handleViewFile,
    handleSelectGallery
  };
};
