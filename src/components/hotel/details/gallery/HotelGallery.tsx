
import React from 'react';
import { Hotel } from '@/models/HotelModel';
import useAmenityImageMapping from './useAmenityImageMapping';
import EmptyGalleryState from './EmptyGalleryState';
import GalleryTabs from './GalleryTabs';

interface HotelGalleryProps {
  hotel: Hotel;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ hotel }) => {
  const { amenityCategories } = useAmenityImageMapping(hotel);
  
  if (amenityCategories.length === 0) {
    return <EmptyGalleryState />;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 text-center">Hotel Gallery</h3>
      <GalleryTabs amenityCategories={amenityCategories} />
    </div>
  );
};

export default HotelGallery;
