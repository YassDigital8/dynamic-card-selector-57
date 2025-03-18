
import React from 'react';
import { Hotel as HotelIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hotel } from '@/models/HotelModel';
import { getHotelAvatar } from './HotelCardUtils';

interface HotelCardHeaderProps {
  hotel: Hotel;
  useGridView: boolean;
}

const HotelCardHeader: React.FC<HotelCardHeaderProps> = ({ hotel, useGridView }) => {
  return (
    <CardHeader className={`pb-2 ${useGridView ? 'p-3' : ''}`}>
      <div className={`${useGridView ? 'flex flex-col' : 'flex items-center space-x-3'}`}>
        <motion.div 
          layoutId={`hotel-image-${hotel.id}`}
          className={`${useGridView ? 'w-full h-32 mb-3 overflow-hidden rounded-lg' : 'h-12 w-12'}`}
        >
          {useGridView ? (
            <img 
              src={getHotelAvatar(hotel.name)} 
              alt={hotel.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/300x150/indigo/white?text=Hotel';
              }}
            />
          ) : (
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={getHotelAvatar(hotel.name)} alt={hotel.name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700">
                <HotelIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          )}
        </motion.div>
        <div className="flex-1">
          <motion.div layoutId={`hotel-title-${hotel.id}`}>
            <CardTitle className={`${useGridView ? 'text-base' : 'text-lg'} text-indigo-700 dark:text-indigo-300`}>
              {hotel.name}
            </CardTitle>
          </motion.div>
          <motion.div layoutId={`hotel-badge-${hotel.id}`}>
            <Badge variant="outline" className="uppercase text-xs bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium mt-1">
              {hotel.posKey}
            </Badge>
          </motion.div>
        </div>
      </div>
    </CardHeader>
  );
};

export default React.memo(HotelCardHeader);
