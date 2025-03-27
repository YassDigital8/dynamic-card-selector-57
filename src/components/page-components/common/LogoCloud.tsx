
import React from 'react';
import { cn } from '@/lib/utils';

interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  title?: string;
  className?: string;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({
  logos,
  title,
  className
}) => {
  return (
    <div className={cn("py-8", className)}>
      {title && (
        <h3 className="text-lg font-medium text-gray-700 text-center mb-6">{title}</h3>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center p-4">
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ) : (
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-h-12 max-w-full object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCloud;
