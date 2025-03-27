
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageSrc,
  buttonText = "Discover more",
  onButtonClick,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden shadow-md h-full flex flex-col", className)}>
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="p-6">
        <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      
      {buttonText && (
        <CardFooter className="p-6 pt-0">
          <button
            onClick={onButtonClick}
            className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 transition-colors"
          >
            {buttonText}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </CardFooter>
      )}
    </Card>
  );
};

export default InfoCard;
