
import { useGalleryNavigation } from './gallery/useGalleryNavigation';
import { useGalleries } from './gallery/useGalleries';
import { useFiles } from './gallery/useFiles';
import { FileInfo, Gallery } from '@/models/FileModel';

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
  
  // Use the files hook for file operations
  // Note: We need to initialize with empty galleries first, then we'll update
  const placeholderSetGalleries = () => {};
  const {
    files,
    handleFileUpload,
    handleDeleteFile,
    handleMoveFile
  } = useFiles([], placeholderSetGalleries);
  
  // Use the galleries hook for gallery operations
  const {
    galleries,
    setGalleries,
    handleCreateGallery,
    handleUpdateGallery,
    galleryFileTypes
  } = useGalleries(files);
  
  // Update the files hook with the real galleries and setGalleries
  const filesHook = useFiles(galleries, setGalleries);
  
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
    files: filesHook.files,
    galleryFileTypes,
    
    // Operations
    handleFileUpload: filesHook.handleFileUpload,
    handleCreateGallery,
    handleViewFile,
    handleSelectGallery,
    handleUpdateGallery,
    handleDeleteFile: filesHook.handleDeleteFile,
    handleMoveFile: filesHook.handleMoveFile
  };
};
