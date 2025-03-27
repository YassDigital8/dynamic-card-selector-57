
import React from 'react';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-10", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Learn More About The History And Work Of Cham Wings Airlines
        </h2>
        
        <p className="text-gray-700 mb-10 max-w-4xl">
          Since its launch, Cham Wings has been to achieve excellence in every flight, ensuring comfort and safety, and connecting travelers to their favorite destinations in a distinctive way. We are proud of our services and our team that always strives to meet passengers' satisfaction.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Our History" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Our History</h3>
              <p className="text-gray-600 mb-4">
                Cham Wings Airlines has been made a milestone as the first private airline in Syria and has succeeded in building a remarkable experience. This success comes from our continuous understanding of the aviation industry to meet the needs of travelers.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-blue-800">
                Discover more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Our Mission, Vision, Values" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Mission, Vision, Values</h3>
              <p className="text-gray-600 mb-4">
                Our commitment goes beyond the sky, as we seek to build a prestigious and serious link with our travelers. And at our constant pursuit that the journey is more than just a transition from one place to another, we strive to make it a future full of excellence.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-blue-800">
                Discover more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Our Fleet" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Fleet</h3>
              <p className="text-gray-600 mb-4">
                Our modern fleet includes Airbus A320 aircraft, equipped with the latest technologies to provide a safe and comfortable travel experience. With our commitment to maintain the highest safety and quality standards, giving our travelers peace of mind and comfort on every flight.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-blue-800">
                Discover more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
              alt="Our Responsibility" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Responsibility</h3>
              <p className="text-gray-600 mb-4">
                We strive to focus on community initiatives, provide diverse job opportunities, and nurture future leaders. We also pay special attention to environmental issues to remain an excellent partner in achieving our dreams of a better future for generations.
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-blue-800">
                Discover more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
