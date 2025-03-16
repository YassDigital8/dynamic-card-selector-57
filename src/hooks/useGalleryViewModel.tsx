
import { useState, useMemo, useEffect } from 'react';
import { FileInfo, Gallery } from '@/models/FileModel';
import { useToast } from './use-toast';

export const useGalleryViewModel = () => {
  const [activeTab, setActiveTab] = useState("galleries");
  const [isCreateGalleryOpen, setIsCreateGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const { toast } = useToast();
  
  // When selectedGallery becomes null, switch back to galleries tab
  useEffect(() => {
    if (!selectedGallery && activeTab === "browse") {
      setActiveTab("galleries");
    }
  }, [selectedGallery, activeTab]);
  
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

  const handleUpdateGallery = (updatedGallery: Gallery) => {
    setGalleries(prev => 
      prev.map(gallery => 
        gallery.id === updatedGallery.id ? updatedGallery : gallery
      )
    );
    
    if (selectedGallery?.id === updatedGallery.id) {
      setSelectedGallery(updatedGallery);
    }
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
    
    // If the deleted file was the selected file, clear the selection
    if (selectedFile?.id === fileToDelete.id) {
      setSelectedFile(null);
    }
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
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    setSelectedGallery,
    selectedFile,
    galleries,
    files,
    galleryFileTypes,
    handleFileUpload,
    handleCreateGallery,
    handleViewFile,
    handleSelectGallery,
    handleUpdateGallery,
    handleDeleteFile,
    handleMoveFile
  };
};
