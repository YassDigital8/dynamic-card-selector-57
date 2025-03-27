
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NewsletterSectionProps {
  className?: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-10 bg-blue-900 text-white", className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="col-span-1">
            <p className="text-sm">
              Be the first to get exclusive updates on new travel destinations, special offers and holiday packages with our newsletter.
            </p>
            
            <Button variant="outline" className="mt-4 border-white text-white hover:bg-white hover:text-blue-900">
              Subscribe Now
            </Button>
          </div>
          
          <div className="col-span-1">
            <p className="text-sm">
              Your feedback matters to us! We truly value hearing your feedback and opinion.
            </p>
            
            <Button variant="outline" className="mt-4 border-white text-white hover:bg-white hover:text-blue-900">
              Give Feedback
            </Button>
          </div>
          
          <div className="col-span-1 flex justify-center md:justify-end">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Cham Wings Logo" 
              className="h-16 w-auto"
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-4">
          {['instagram', 'facebook', 'twitter', 'youtube', 'linkedin', 'tiktok', 'snapchat'].map((social) => (
            <a key={social} href={`#${social}`} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
              <span className="sr-only">{social}</span>
              <div className="w-5 h-5"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
