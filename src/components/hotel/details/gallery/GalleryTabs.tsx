
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AmenityImage } from '@/models/HotelModel';
import AmenityCategory from './AmenityCategory';

interface GalleryTabsProps {
  amenityCategories: [string, AmenityImage[]][];
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({ amenityCategories }) => {
  return (
    <Tabs defaultValue={amenityCategories[0][0]}>
      <TabsList className="w-full h-auto flex flex-wrap justify-center mb-4">
        {amenityCategories.map(([category]) => (
          <TabsTrigger 
            key={category} 
            value={category}
            className="px-4 py-2 m-1 data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/40"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {amenityCategories.map(([category, images]) => (
        <AmenityCategory 
          key={category} 
          category={category} 
          images={images} 
        />
      ))}
    </Tabs>
  );
};

export default GalleryTabs;
