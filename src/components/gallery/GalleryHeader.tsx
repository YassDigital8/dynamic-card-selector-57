
import React from 'react';

interface GalleryHeaderProps {
  title: string;
  description: string;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};
