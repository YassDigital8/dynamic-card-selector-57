
import { FileInfo } from '@/models/FileModel';

export const useGalleryFiles = () => {
  // Mock gallery files with correct FileInfo properties
  const galleryFiles: FileInfo[] = [
    {
      id: '1',
      url: '/lovable-uploads/07012bd6-4cd0-4959-bc2a-1caa5128aba0.png',
      name: 'Hotel Room',
      type: 'image/png',
      size: 10000,
      uploadedBy: 'admin',
      uploadedOn: '2023-06-15',
      galleryId: '1',
      metadata: {
        title: 'Deluxe Room',
        altText: 'Deluxe hotel room with king size bed',
        caption: 'Luxury accommodation',
        description: 'Spacious deluxe room with modern amenities'
      }
    },
    {
      id: '2',
      url: '/lovable-uploads/8d41fa29-3180-4df3-9844-3322321967de.png',
      name: 'Suite Room',
      type: 'image/png',
      size: 12000,
      uploadedBy: 'admin',
      uploadedOn: '2023-06-20',
      galleryId: '1',
      metadata: {
        title: 'Executive Suite',
        altText: 'Executive suite with living area',
        caption: 'Premium suite',
        description: 'Luxurious suite with separate living area'
      }
    }
  ];

  return { galleryFiles };
};
