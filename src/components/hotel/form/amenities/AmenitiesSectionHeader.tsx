
import React from 'react';

const AmenitiesSectionHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-medium text-foreground">Amenities</h3>
      <p className="text-sm text-muted-foreground">
        Select amenities available at your hotel. For amenities with images, you can add photos that will appear in the hotel gallery.
      </p>
    </div>
  );
};

export default AmenitiesSectionHeader;
