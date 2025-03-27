
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ContactSectionProps {
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
                alt="Contact Media Team" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Contact Our Media Team
              </h2>
              
              <p className="text-gray-600 mb-2">
                Are you looking for the latest news and information about Cham Wings Airlines?
              </p>
              
              <p className="text-gray-600 mb-6">
                The media center provides you with a comprehensive information that includes the latest news and press releases, photo archives and quality video clips.
              </p>
              
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Discover More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
