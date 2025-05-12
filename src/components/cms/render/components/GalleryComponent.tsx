
import React from 'react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryComponentProps {
  images: GalleryImage[];
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({
  images = []
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow">
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-48 object-cover transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryComponent;
