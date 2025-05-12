
import React from 'react';

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height
}) => {
  return (
    <div className="flex justify-center">
      <img 
        src={src} 
        alt={alt} 
        width={width}
        height={height}
        className="rounded-md max-w-full"
      />
    </div>
  );
};

export default ImageComponent;
