
import React from 'react';
import { Hotel } from '@/models/HotelModel';
import { HotelGallery as GalleryComponent } from './gallery';

interface HotelGalleryProps {
  hotel: Hotel;
}

// This is a pass-through component to maintain compatibility with existing code
const HotelGallery: React.FC<HotelGalleryProps> = ({ hotel }) => {
  return <GalleryComponent hotel={hotel} />;
};

export default HotelGallery;
