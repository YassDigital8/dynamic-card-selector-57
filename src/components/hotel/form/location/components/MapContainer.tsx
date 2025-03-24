
import React from 'react';

interface MapContainerProps {
  mapRef: React.RefObject<HTMLDivElement>;
}

const MapContainer: React.FC<MapContainerProps> = ({ mapRef }) => {
  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px] rounded-md border border-slate-200 dark:border-slate-800"
    />
  );
};

export default MapContainer;
