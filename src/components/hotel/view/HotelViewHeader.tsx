
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Share, Star } from 'lucide-react';
import { Hotel } from '@/models/HotelModel';
import { getHotelAvatar } from '../card/HotelCardUtils';

interface HotelViewHeaderProps {
  hotel: Hotel;
}

const HotelViewHeader: React.FC<HotelViewHeaderProps> = ({ hotel }) => {
  const navigate = useNavigate();
  
  // Get hotel avatar for the header
  const avatarUrl = hotel.logoUrl || getHotelAvatar(hotel.name);
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/hotel')}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            
            {/* Hotel Avatar */}
            <div className="h-14 w-14 rounded-full border-2 border-white dark:border-slate-700 overflow-hidden shadow-md bg-white dark:bg-slate-800 flex-shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt={hotel.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900">
                  <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                    {hotel.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                {hotel.name}
              </h1>
              <div className="flex items-center text-sm text-indigo-500 dark:text-indigo-400">
                <span className="mr-2">{hotel.governorate}, {hotel.country}</span>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
                  <span>{hotel.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 ml-auto">
            <Button 
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800"
            >
              <Share className="mr-1 h-4 w-4" />
              Share
            </Button>
            <Button 
              onClick={() => navigate(`/hotel/edit/${hotel.id}`)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit Hotel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelViewHeader;
