
import { FileInfo } from '@/models/FileModel';

export const useGalleryFiles = () => {
  // Enhanced gallery files with various media types (images, videos, PDFs, etc.)
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
      galleryName: 'Room Images',
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
      galleryName: 'Room Images',
      metadata: {
        title: 'Executive Suite',
        altText: 'Executive suite with living area',
        caption: 'Premium suite',
        description: 'Luxurious suite with separate living area'
      }
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
      name: 'Bathroom',
      type: 'image/jpeg',
      size: 8500,
      uploadedBy: 'admin',
      uploadedOn: '2023-07-10',
      galleryId: '1',
      galleryName: 'Room Images',
      metadata: {
        title: 'Modern Bathroom',
        altText: 'Luxury bathroom with shower and bathtub',
        caption: 'Room bathroom',
        description: 'Modern bathroom with premium fixtures'
      }
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1621293954908-907159247fc8',
      name: 'Room View',
      type: 'image/jpeg',
      size: 9200,
      uploadedBy: 'admin',
      uploadedOn: '2023-07-15',
      galleryId: '1',
      galleryName: 'Room Images',
      metadata: {
        title: 'Sea View',
        altText: 'Room with beautiful sea view',
        caption: 'Scenic view',
        description: 'Room with panoramic ocean view'
      }
    },
    // New enhanced files with more variety
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
      name: 'Festival Event',
      type: 'image/jpeg',
      size: 15200,
      uploadedBy: 'admin',
      uploadedOn: '2023-08-01',
      galleryId: '2',
      galleryName: 'Event Images',
      metadata: {
        title: 'Dubai Shopping Festival',
        altText: 'Crowd at shopping festival event',
        caption: 'Annual event',
        description: 'Main shopping festival with performances and discounts'
      }
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      name: 'Wildlife Tour',
      type: 'image/jpeg',
      size: 18400,
      uploadedBy: 'admin',
      uploadedOn: '2023-08-03',
      galleryId: '2',
      galleryName: 'Event Images',
      metadata: {
        title: 'Desert Safari',
        altText: 'Desert wildlife during safari tour',
        caption: 'Adventure experience',
        description: 'Close encounter with desert wildlife during evening safari'
      }
    },
    {
      id: '7',
      url: 'https://example.com/sample-video.mp4',
      name: 'Opera Performance',
      type: 'video/mp4',
      size: 25000,
      uploadedBy: 'admin',
      uploadedOn: '2023-08-05',
      galleryId: '2',
      galleryName: 'Event Media',
      metadata: {
        title: 'La Traviata at Dubai Opera',
        altText: 'Video clip of opera performance',
        caption: 'Cultural highlight',
        description: 'Short clip of the renowned opera performance at Dubai Opera'
      }
    },
    {
      id: '8',
      url: 'https://example.com/concert-promo.mp4',
      name: 'Coldplay Concert Promo',
      type: 'video/mp4',
      size: 32000,
      uploadedBy: 'admin',
      uploadedOn: '2023-08-10',
      galleryId: '2',
      galleryName: 'Event Media',
      metadata: {
        title: 'Coldplay World Tour Promo',
        altText: 'Promotional video for Coldplay concert',
        caption: 'Coming soon',
        description: 'Official promotional video for the upcoming Coldplay concert'
      }
    },
    {
      id: '9',
      url: 'https://example.com/event-brochure.pdf',
      name: 'Event Brochure',
      type: 'application/pdf',
      size: 8500,
      uploadedBy: 'admin',
      uploadedOn: '2023-08-15',
      galleryId: '3',
      galleryName: 'Documents',
      metadata: {
        title: 'Events & Attractions Brochure',
        description: 'Official brochure with all upcoming events and attractions'
      }
    },
    {
      id: '10',
      url: 'https://example.com/venue-map.pdf',
      name: 'Venue Map',
      type: 'application/pdf',
      size: 5200,
      uploadedBy: 'admin',
      uploadedOn: '2023-08-20',
      galleryId: '3',
      galleryName: 'Documents',
      metadata: {
        title: 'Coca-Cola Arena Venue Map',
        description: 'Detailed map of the Coca-Cola Arena with seating arrangements'
      }
    },
    {
      id: '11',
      url: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937',
      name: 'Cultural Festival',
      type: 'image/jpeg',
      size: 14300,
      uploadedBy: 'admin',
      uploadedOn: '2023-09-01',
      galleryId: '2',
      galleryName: 'Event Images',
      metadata: {
        title: 'Syrian Cultural Festival',
        altText: 'Traditional dance performance at cultural festival',
        caption: 'Cultural celebration',
        description: 'Traditional performances at the Syrian Cultural Festival'
      }
    },
    {
      id: '12',
      url: 'https://example.com/attraction-audio.mp3',
      name: 'Audio Guide',
      type: 'audio/mpeg',
      size: 18000,
      uploadedBy: 'admin',
      uploadedOn: '2023-09-05',
      galleryId: '3',
      galleryName: 'Audio Content',
      metadata: {
        title: 'Burj Khalifa Audio Guide',
        description: 'Official audio guide for Burj Khalifa tour'
      }
    }
  ];

  return { galleryFiles };
};
