
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Hotel } from '@/models/HotelModel';
import { MapPin, Star, Building, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

interface BasicInfoSectionProps {
  hotel: Hotel;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ hotel }) => {
  const infoItems = [
    { icon: Building, label: "Hotel Name", value: hotel.name },
    { icon: Hash, label: "POS Key", value: hotel.posKey },
    { icon: MapPin, label: "Country", value: hotel.country },
    { icon: MapPin, label: "Governorate", value: hotel.governorate },
    { icon: MapPin, label: "Street Address", value: hotel.streetAddress }
  ];

  return (
    <Card className="border-0 shadow-none mb-4">
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <motion.div 
              key={`${item.label}-${index}`}
              className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <item.icon className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{item.label}</h3>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Star Rating with special styling */}
          <motion.div 
            className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Star Rating</h3>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star 
                      key={`star-${index}`}
                      className={`w-5 h-5 ${index < hotel.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
