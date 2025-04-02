
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
    },
    // New enhanced gallery items
    {
      id: '3',
      name: 'dubai_festival.jpg',
      type: 'image/jpeg',
      size: 145,
      url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-08T16:45:00',
      galleryId: '1',
      metadata: {
        title: 'Dubai Shopping Festival',
        altText: 'Crowd at the Dubai Shopping Festival',
        caption: 'Annual event highlight',
        description: 'Shoppers enjoying discounts and entertainment at the annual festival',
        dimensions: {
          width: 1200,
          height: 800
        }
      }
    },
    {
      id: '4',
      name: 'cultural_event.jpg',
      type: 'image/jpeg',
      size: 132,
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-07T09:15:00',
      galleryId: '1',
      metadata: {
        title: 'Syrian Cultural Event',
        altText: 'Traditional dancers at Syrian cultural event',
        caption: 'Cultural celebration',
        description: 'Traditional Syrian dancers performing at the cultural festival',
        dimensions: {
          width: 1600,
          height: 1067
        }
      }
    },
    {
      id: '5',
      name: 'event_promo.mp4',
      type: 'video/mp4',
      size: 256000,
      url: 'https://example.com/event_promo.mp4',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-06T14:30:00',
      galleryId: '1',
      metadata: {
        title: 'Event Promotional Video',
        altText: 'Promotional video for upcoming events',
        caption: 'Upcoming events',
        description: 'A montage of all the exciting events happening this season'
      }
    },
    {
      id: '6',
      name: 'schedule.pdf',
      type: 'application/pdf',
      size: 87,
      url: '/placeholder.svg',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-05T11:20:00',
      galleryId: '2',
      metadata: {
        title: 'Event Schedule',
        description: 'Complete schedule of all events for the upcoming month'
      }
    },
    {
      id: '7',
      name: 'opera_tour.mp3',
      type: 'audio/mpeg',
      size: 45000,
      url: 'https://example.com/opera_tour.mp3',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-04T16:10:00',
      galleryId: '2',
      metadata: {
        title: 'Dubai Opera Audio Tour',
        description: 'Audio guide explaining the history and architecture of Dubai Opera'
      }
    },
    {
      id: '8',
      name: 'attraction_overview.mp4',
      type: 'video/mp4',
      size: 375000,
      url: 'https://example.com/attraction_overview.mp4',
      uploadedBy: 'admin',
      uploadedOn: '2024-04-03T13:45:00',
      galleryId: '1',
      metadata: {
        title: 'Top Attractions Overview',
        altText: 'Video overview of top attractions',
        caption: 'Must-visit places',
        description: 'A comprehensive overview of must-visit attractions in Dubai'
      }
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
