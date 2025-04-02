import { useState, useEffect } from 'react';
import { useGalleryNavigation } from './gallery/useGalleryNavigation';
import { useGalleries } from './gallery/useGalleries';
import { useFiles } from './gallery/useFiles';
import { FileInfo, Gallery } from '@/models/FileModel';
import { useGalleryFiles } from '@/components/hotel/form/room-types/useGalleryFiles';

export const useGalleryViewModel = () => {
  // Use the navigation hook for tab and selection state
  const {
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    setSelectedGallery,
    selectedFile,
    handleSelectGallery,
    handleViewFile
  } = useGalleryNavigation();
  
  // Get enhanced gallery files
  const { galleryFiles: enhancedGalleryFiles } = useGalleryFiles();
  
  // Initialize state for files and galleries to break circular dependency
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
  
  // Use the galleries hook for gallery operations
  const {
    galleries,
    setGalleries,
    handleCreateGallery,
    handleUpdateGallery,
    galleryFileTypes
  } = useGalleries(files);
  
  // Use the files hook for file operations, now with the galleries and setGalleries
  const {
    handleFileUpload,
    handleDeleteFile,
    handleMoveFile
  } = useFiles(galleries, setGalleries);
  
  // Override the setFiles from state with the one from the files hook
  const filesOperations = useFiles(galleries, setGalleries);
  
  // Merge enhanced gallery files with user files after initial render
  useEffect(() => {
    if (files.length === 0 || files.length === 2) {  // Only add if we're using the initial files
      // Add enhanced files that aren't already in the user's files
      const newEnhancedFiles = enhancedGalleryFiles.filter(
        enhancedFile => !files.some(file => file.id === enhancedFile.id)
      );
      
      if (newEnhancedFiles.length > 0) {
        console.log('Adding enhanced gallery files:', newEnhancedFiles.length);
        setFiles(prevFiles => [...prevFiles, ...newEnhancedFiles]);
      }
    }
  }, [enhancedGalleryFiles]);
  
  // Create a synchronization effect to keep files in sync
  const updateFiles = (newFile: FileInfo) => {
    // Update local files state
    setFiles(prevFiles => {
      const existingFileIndex = prevFiles.findIndex(f => f.id === newFile.id);
      if (existingFileIndex >= 0) {
        // Replace existing file
        return prevFiles.map(f => f.id === newFile.id ? newFile : f);
      } else {
        // Add new file
        return [newFile, ...prevFiles];
      }
    });
    
    // Also call the real file upload handler
    filesOperations.handleFileUpload(newFile);
  };
  
  const deleteFile = (fileToDelete: FileInfo) => {
    // Update local files state
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileToDelete.id));
    
    // Also call the real file delete handler
    filesOperations.handleDeleteFile(fileToDelete);
  };
  
  const moveFile = (fileToMove: FileInfo, toGalleryId: string) => {
    // Update local files state
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileToMove.id ? { ...file, galleryId: toGalleryId } : file
      )
    );
    
    // Also call the real file move handler
    filesOperations.handleMoveFile(fileToMove, toGalleryId);
  };
  
  return {
    // Navigation state
    activeTab,
    setActiveTab,
    isCreateGalleryOpen,
    setIsCreateGalleryOpen,
    selectedGallery,
    setSelectedGallery,
    selectedFile,
    
    // Data
    galleries,
    files,
    galleryFileTypes,
    
    // Operations
    handleFileUpload: updateFiles,
    handleCreateGallery,
    handleViewFile,
    handleSelectGallery,
    handleUpdateGallery,
    handleDeleteFile: deleteFile,
    handleMoveFile: moveFile
  };
};
