
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BenefitsSectionProps {
  className?: string;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-12 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-10">
          Cham Wings Is Your Best Choice
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Loyalty Program" 
              className="w-full h-48 object-cover"
            />
            <CardHeader className="p-4">
              <h3 className="text-lg font-semibold text-blue-800">Exclusive Benefits With The Loyalty Program</h3>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                Discover More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Business Class" 
              className="w-full h-48 object-cover"
            />
            <CardHeader className="p-4">
              <h3 className="text-lg font-semibold text-blue-800">More Comfort With Business Class</h3>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                Discover More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Travel Experience" 
              className="w-full h-48 object-cover"
            />
            <CardHeader className="p-4">
              <h3 className="text-lg font-semibold text-blue-800">Travel Experience</h3>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                Discover More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
