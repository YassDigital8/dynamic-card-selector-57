
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BenefitCardProps {
  title: string;
  imageSrc: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  imageSrc,
  buttonText = "Discover More",
  onButtonClick,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden shadow-md h-full flex flex-col", className)}>
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
      </CardHeader>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button 
          onClick={onButtonClick}
          className="bg-amber-500 hover:bg-amber-600 text-white border-0"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BenefitCard;
