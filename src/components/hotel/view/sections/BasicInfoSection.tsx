
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';

interface BasicInfoSectionProps {
  hotel: Hotel;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ hotel }) => {
  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hotel Name</h3>
            <p className="text-gray-800 dark:text-gray-200">{hotel.name}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">POS Key</h3>
            <p className="text-gray-800 dark:text-gray-200">{hotel.posKey}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</h3>
            <p className="text-gray-800 dark:text-gray-200">{hotel.country}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Governorate</h3>
            <p className="text-gray-800 dark:text-gray-200">{hotel.governorate}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Street Address</h3>
            <p className="text-gray-800 dark:text-gray-200">{hotel.streetAddress}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Star Rating</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg 
                  key={index}
                  className={`w-5 h-5 ${index < hotel.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
